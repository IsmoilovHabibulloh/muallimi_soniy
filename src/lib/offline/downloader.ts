import { getMediaUrls } from "./media-manifest";

/**
 * Fon yuklovchi — sayt ochilganda barcha media kontentni (shrift, rasm,
 * audio ~150 MB) navbat bilan ms-media-v1 keshiga yuklab boradi.
 *
 * Jahon tajribasidan olingan qoidalar:
 * - Cache Storage media uchun, IndexedDB esa "ledger" (qaysi fayl tayyor)
 *   uchun — progress hisoblashda cache.keys() enumeratsiya qilinmaydi
 *   (2000 ta entry'da sekin, iOS'da injiq).
 * - Faqat to'liq 200 javob keshlanadi (206 hech qachon).
 * - Parallellik 4 — HTTP/2 multiplexing'ni to'ydiradi, UI'ni bo'g'maydi.
 * - Audio ijro paytida avtomatik pauza (bandwidth talashmaslik uchun),
 *   ijro tugagach ~2.5s dan keyin davom etadi.
 * - Internet uzilsa to'xtaydi, qaytsa davom etadi; xato fayllar navbat
 *   oxiriga qaytadi (sessiyada 5 urinish), qolgani keyingi sessiyada.
 * - navigator.storage.persist() — brauzer keshni bosim ostida o'chirmasin.
 */

const MEDIA_CACHE = "ms-media-v1";
const DB_NAME = "ms-offline";
const STORE_FILES = "files";
const STORE_META = "meta";
const LS_PAUSED = "ms-offline-paused";
const CONCURRENCY = 4;
const MAX_ATTEMPTS = 5;
const AUDIO_RESUME_DELAY_MS = 2500;
const FAILURE_BACKOFF_MS = 15000;

export type DownloadPhase =
  | "idle"
  | "unsupported"
  | "scanning"
  | "running"
  | "paused"
  | "audio"
  | "offline"
  | "done";

export interface DownloadSnapshot {
  phase: DownloadPhase;
  total: number;
  done: number;
  failed: number;
  bytesDone: number;
}

interface LedgerEntry {
  url: string;
  status: "done" | "failed";
  bytes: number;
  updatedAt: number;
}

// ── IndexedDB mini-helpers ──

function reqToPromise<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function openDb(): Promise<IDBDatabase> {
  const req = indexedDB.open(DB_NAME, 1);
  req.onupgradeneeded = () => {
    const db = req.result;
    if (!db.objectStoreNames.contains(STORE_FILES)) {
      db.createObjectStore(STORE_FILES, { keyPath: "url" });
    }
    if (!db.objectStoreNames.contains(STORE_META)) {
      db.createObjectStore(STORE_META, { keyPath: "key" });
    }
  };
  return reqToPromise(req);
}

function hashString(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36);
}

function contentTypeFor(url: string): string {
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase();
  switch (ext) {
    case "mp3":
      return "audio/mpeg";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "ttf":
      return "font/ttf";
    case "otf":
      return "font/otf";
    default:
      return "application/octet-stream";
  }
}

const IDLE_SNAPSHOT: DownloadSnapshot = {
  phase: "idle",
  total: 0,
  done: 0,
  failed: 0,
  bytesDone: 0,
};

type Listener = () => void;

class OfflineDownloader {
  private started = false;
  private supported = true;
  private scanning = false;
  private userPaused = false;
  private audioActive = false;
  private backoffUntil = 0;

  private queue: string[] = [];
  private attempts = new Map<string, number>();
  private active = 0;
  private total = 0;
  private done = 0;
  private failed = 0;
  private bytesDone = 0;

  private db: IDBDatabase | null = null;
  private snapshot: DownloadSnapshot = IDLE_SNAPSHOT;
  private listeners = new Set<Listener>();
  private audioResumeTimer: ReturnType<typeof setTimeout> | null = null;

  // ── Public API ──

  subscribe = (fn: Listener): (() => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };

  getSnapshot = (): DownloadSnapshot => this.snapshot;

  pause = () => {
    this.userPaused = true;
    try {
      localStorage.setItem(LS_PAUSED, "1");
    } catch {}
    this.notify();
  };

  resume = () => {
    this.userPaused = false;
    try {
      localStorage.removeItem(LS_PAUSED);
    } catch {}
    this.notify();
    this.pump();
  };

  async start(): Promise<void> {
    if (this.started) return;
    this.started = true;

    if (
      typeof window === "undefined" ||
      !("caches" in window) ||
      !("indexedDB" in window)
    ) {
      this.supported = false;
      this.notify();
      return;
    }

    // Kesh bosim ostida o'chirilmasin (Chrome/Firefox; Safari'da heuristik)
    navigator.storage?.persist?.().catch(() => {});

    try {
      this.userPaused = localStorage.getItem(LS_PAUSED) === "1";
    } catch {}

    window.addEventListener("online", () => {
      this.notify();
      this.pump();
    });
    window.addEventListener("offline", () => this.notify());
    window.addEventListener("ms:audio-active", (e) => {
      const active = Boolean((e as CustomEvent).detail);
      if (this.audioResumeTimer) {
        clearTimeout(this.audioResumeTimer);
        this.audioResumeTimer = null;
      }
      if (active) {
        this.audioActive = true;
        this.notify();
      } else {
        // Ijro tugagach biroz kutamiz — foydalanuvchi ketma-ket bosishi mumkin
        this.audioResumeTimer = setTimeout(() => {
          this.audioActive = false;
          this.notify();
          this.pump();
        }, AUDIO_RESUME_DELAY_MS);
      }
    });

    try {
      await this.scan();
    } catch {
      // IDB ochilmasa (private mode va h.k.) — yuklovchisiz davom etamiz,
      // SW runtime keshlash baribir ishlayveradi.
      this.supported = false;
      this.notify();
      return;
    }
    this.pump();
  }

  // ── Ichki qismlar ──

  private async scan(): Promise<void> {
    this.scanning = true;
    this.notify();

    const urls = getMediaUrls();
    const urlSet = new Set(urls);
    this.db = await openDb();

    // Manifest o'zgargan bo'lsa (yangi dars qo'shildi / fayl olib tashlandi)
    // — eski ledger yozuvlari va keshdagi ortiqcha fayllarni tozalaymiz.
    const signature = `${urls.length}:${hashString(urls.join("\n"))}`;
    const metaTx = this.db.transaction(STORE_META, "readonly");
    const storedSig = await reqToPromise(
      metaTx.objectStore(STORE_META).get("manifest-signature")
    ).catch(() => undefined);

    const entries: LedgerEntry[] = await reqToPromise(
      this.db.transaction(STORE_FILES, "readonly").objectStore(STORE_FILES).getAll()
    );

    if ((storedSig as { value?: string } | undefined)?.value !== signature) {
      const stale = entries.filter((e) => !urlSet.has(e.url));
      if (stale.length) {
        const tx = this.db.transaction(STORE_FILES, "readwrite");
        for (const e of stale) tx.objectStore(STORE_FILES).delete(e.url);
      }
      try {
        const cache = await caches.open(MEDIA_CACHE);
        const keys = await cache.keys();
        for (const req of keys) {
          const u = new URL(req.url);
          const key = decodeURIComponent(u.pathname) + u.search;
          if (!urlSet.has(key)) await cache.delete(req);
        }
      } catch {}
      const tx = this.db.transaction(STORE_META, "readwrite");
      tx.objectStore(STORE_META).put({ key: "manifest-signature", value: signature });
    }

    const doneEntries = entries.filter(
      (e) => e.status === "done" && urlSet.has(e.url)
    );
    const doneSet = new Set(doneEntries.map((e) => e.url));

    // iOS keshni o'chirib yuborgan bo'lishi mumkin (7 kunlik siyosat) —
    // tasodifiy 5 ta "done" faylni tekshiramiz; yo'q bo'lsa hammasini
    // qayta tekshirib chiqamiz.
    if (doneEntries.length > 0) {
      const cache = await caches.open(MEDIA_CACHE);
      const samples = [...doneSet]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      let missing = 0;
      for (const url of samples) {
        if (!(await cache.match(url, { ignoreVary: true }))) missing++;
      }
      if (missing > 0) {
        // Kesh yo'qolgan — ledger'ni haqiqat bilan moslaymiz
        const tx = this.db.transaction(STORE_FILES, "readwrite");
        for (const e of doneEntries) {
          if (!(await cache.match(e.url, { ignoreVary: true }))) {
            tx.objectStore(STORE_FILES).delete(e.url);
            doneSet.delete(e.url);
          }
        }
      }
    }

    this.total = urls.length;
    this.done = doneSet.size;
    this.bytesDone = doneEntries
      .filter((e) => doneSet.has(e.url))
      .reduce((sum, e) => sum + (e.bytes || 0), 0);
    this.failed = 0;
    this.queue = urls.filter((u) => !doneSet.has(u));
    this.scanning = false;
    this.notify();
  }

  private canRun(): boolean {
    return (
      !this.userPaused &&
      !this.audioActive &&
      navigator.onLine &&
      Date.now() >= this.backoffUntil
    );
  }

  private pump(): void {
    if (!this.supported || this.scanning) return;
    while (this.active < CONCURRENCY && this.queue.length > 0 && this.canRun()) {
      const url = this.queue.shift()!;
      void this.download(url);
    }
  }

  private async download(url: string): Promise<void> {
    this.active++;
    this.notify();
    let consecutiveFailure = false;
    try {
      const cache = await caches.open(MEDIA_CACHE);
      let bytes = 0;

      const existing = await cache.match(url, { ignoreVary: true });
      if (existing) {
        // SW runtime'da allaqachon keshlangan (foydalanuvchi tinglagan)
        bytes = parseInt(existing.headers.get("Content-Length") ?? "0", 10) || 0;
      } else {
        const res = await fetch(url, { credentials: "same-origin" });
        if (res.status === 404 || res.status === 410) {
          // Fayl serverda yo'q — qayta urinish behuda
          this.attempts.set(url, MAX_ATTEMPTS);
          throw new Error(`HTTP ${res.status}`);
        }
        if (!res.ok || res.status !== 200) throw new Error(`HTTP ${res.status}`);
        const buf = await res.arrayBuffer();
        bytes = buf.byteLength;
        // SW fetch'ni intercept qilib o'zi keshlagan bo'lishi mumkin —
        // qayta tekshirib, bo'lmasa o'zimiz yozamiz (SW hali faol bo'lmagan
        // birinchi tashrifda ham ishlashi uchun).
        if (!(await cache.match(url, { ignoreVary: true }))) {
          await cache.put(
            url,
            new Response(buf, {
              status: 200,
              headers: {
                "Content-Type":
                  res.headers.get("Content-Type") ?? contentTypeFor(url),
                "Content-Length": String(buf.byteLength),
              },
            })
          );
        }
      }

      if (this.db) {
        const tx = this.db.transaction(STORE_FILES, "readwrite");
        tx.objectStore(STORE_FILES).put({
          url,
          status: "done",
          bytes,
          updatedAt: Date.now(),
        } satisfies LedgerEntry);
      }
      this.done++;
      this.bytesDone += bytes;
    } catch {
      consecutiveFailure = true;
      const tries = (this.attempts.get(url) ?? 0) + 1;
      this.attempts.set(url, tries);
      if (tries < MAX_ATTEMPTS) {
        this.queue.push(url);
      } else {
        this.failed++;
        if (this.db) {
          const tx = this.db.transaction(STORE_FILES, "readwrite");
          tx.objectStore(STORE_FILES).put({
            url,
            status: "failed",
            bytes: 0,
            updatedAt: Date.now(),
          } satisfies LedgerEntry);
        }
      }
    } finally {
      this.active--;
      if (consecutiveFailure && this.active === 0) {
        // Server/tarmoq yotgan ko'rinadi — biroz nafas olamiz
        this.backoffUntil = Date.now() + FAILURE_BACKOFF_MS;
        setTimeout(() => this.pump(), FAILURE_BACKOFF_MS + 50);
      }
      this.notify();
      this.pump();
    }
  }

  private computePhase(): DownloadPhase {
    if (!this.supported) return "unsupported";
    if (this.scanning) return "scanning";
    if (!this.started || this.total === 0) return "idle";
    if (this.queue.length === 0 && this.active === 0) return "done";
    if (this.userPaused) return "paused";
    if (typeof navigator !== "undefined" && !navigator.onLine) return "offline";
    if (this.audioActive) return "audio";
    return "running";
  }

  private notify(): void {
    this.snapshot = {
      phase: this.computePhase(),
      total: this.total,
      done: this.done,
      failed: this.failed,
      bytesDone: this.bytesDone,
    };
    this.listeners.forEach((fn) => fn());
  }
}

let instance: OfflineDownloader | null = null;

export function getOfflineDownloader(): OfflineDownloader {
  if (!instance) instance = new OfflineDownloader();
  return instance;
}

export { IDLE_SNAPSHOT };

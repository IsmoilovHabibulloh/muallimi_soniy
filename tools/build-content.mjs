// ============================================================================
//  build-content.mjs — Yagona kontent paketi generatori (Muallimi Soniy)
// ----------------------------------------------------------------------------
//  Web repodagi YAGONA HAQIQAT MANBAI (elements.ts / mock-data.ts / types.ts /
//  muqaddima.ts / legal-content.ts / i18n / globals.css / public/audio,fonts)
//  dan barcha platformalar (Web, iOS Swift, Android Kotlin) iste'mol qiladigan
//  3 qismli kontent paketini quradi:
//
//      public/content/manifest.json                 ← master manifest (versiya,
//                                                     har fayl sha256 + bytes)
//      public/content/sahifalar/book.json           ← 1-QISM: sahifalar
//      public/content/audiolar/audio-manifest.json  ← 2-QISM: audiolar (13 pack)
//      public/content/sozlamalar/i18n.json          ← 3-QISM: sozlamalar
//      public/content/sozlamalar/legal.json
//      public/content/sozlamalar/settings.json
//
//  Audio/shrift BINAR fayllar ko'chirilmaydi (dublikat bo'lmasin) — ular
//  joyida qoladi (public/audio/, public/fonts/) va manifestlarda nisbiy yo'l
//  + bytes + sha256 bilan ro'yxatlanadi. Platformalar yo'llarni o'z BAZA
//  URL'iga (GitHub raw: .../main/public/) nisbatan hal qiladi.
//
//  Ishga tushirish (muallimus-soniy/ ildizidan):
//      npm run content        (yoki: node tools/build-content.mjs)
//
//  Kontent o'zgarganda: CONTENT_VERSION ni oshiring va qayta ishga tushiring,
//  natijani git'ga push qiling. Platformalar manifest.json'dagi contentVersion
//  ni lokal saqlangan versiya bilan solishtirib yangilanadi.
//
//  Eski tools/export-ios-json.mjs va public/ios/ ni almashtiradi (2026-06-10).
// ============================================================================

import { register } from "node:module";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  statSync,
  existsSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// --- Sozlama -----------------------------------------------------------------
const CONTENT_VERSION = "2.8.1"; // kontent o'zgarganda oshiring
const SCHEMA_VERSION = 2; // paket TUZILISHI o'zgarganda oshiring

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const publicDir = join(repoRoot, "public");
const outDir = join(publicDir, "content");

// --- TS importlarni Node uchun hal qiluvchi hook -------------------------------
// Web fayllar kengaytmasiz import qiladi (`from "./types"`). Node ESM kengaytma
// talab qiladi — kengaytmasiz nisbiy importlarga ".ts" qo'shamiz.
const resolveHook = `
export async function resolve(spec, ctx, next) {
  try { return await next(spec, ctx); }
  catch (e) {
    if (/^\\.\\.?\\//.test(spec) && !/\\.[a-z0-9]+$/i.test(spec)) {
      return next(spec + ".ts", ctx);
    }
    throw e;
  }
}`;
register("data:text/javascript," + encodeURIComponent(resolveHook), import.meta.url);

// --- Manba ma'lumotlari (register'dan KEYIN, dinamik import) -------------------
const { chapters, lessons, PAGE_MAP } = await import("../src/lib/data/mock-data.ts");
const { PAGE_ELEMENTS } = await import("../src/lib/data/elements.ts");
const { LEGAL_CONTENT } = await import("../src/lib/data/legal-content.ts");
const { MUQADDIMA_PARAGRAPHS } = await import("../src/lib/data/muqaddima.ts");
const { DEFAULT_SETTINGS, ELEMENT_COLORS, ELEMENT_LABELS } = await import(
  "../src/lib/data/types.ts"
);

const LOCALES = ["uz-latn", "uz-cyrl", "ru", "en"];

// --- Yordamchilar --------------------------------------------------------------

/** "/audio/x.mp3" → "audio/x.mp3" (platformalar o'z bazasiga nisbatan hal qiladi) */
function relPath(u) {
  return typeof u === "string" && u.startsWith("/") ? u.slice(1) : u;
}

function sha256Bytes(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

/** public/ ostidagi faylning {bytes, sha256} ma'lumoti. Yo'q bo'lsa — XATO. */
function fileInfo(relativePath) {
  const abs = join(publicDir, relativePath);
  if (!existsSync(abs)) {
    throw new Error(`Fayl diskda yo'q: public/${relativePath} (manba ma'lumotlarda xato yo'lmi?)`);
  }
  const buf = readFileSync(abs);
  return { bytes: buf.length, sha256: sha256Bytes(buf) };
}

function writeJson(relName, data, pretty) {
  const p = join(outDir, relName);
  mkdirSync(dirname(p), { recursive: true });
  const text = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  writeFileSync(p, text);
  return p;
}

/** Yozilgan paket faylining manifest yozuvi */
function packagedFileEntry(relName) {
  const buf = readFileSync(join(outDir, relName));
  return { path: `content/${relName}`, bytes: buf.length, sha256: sha256Bytes(buf) };
}

// ============================================================================
//  1-QISM: SAHIFALAR — book.json
//  (sxema avvalgi public/ios/book.json bilan BIR XIL — Swift/Kotlin Codable
//   modellari o'zgarmaydi)
// ============================================================================
console.log("→ sahifalar/book.json qurilmoqda...");

const pages = {};
let elementCount = 0;
for (const [num, els] of Object.entries(PAGE_ELEMENTS)) {
  pages[num] = els.map((el) =>
    el.audioUrl ? { ...el, audioUrl: relPath(el.audioUrl) } : el
  );
  elementCount += els.length;
}

const lessonsOut = {};
let lessonCount = 0;
const lessonList = []; // pack tartibi uchun (bob/dars tartibida)
for (const ch of [...chapters].sort((a, b) => a.order - b.order)) {
  const arr = lessons[ch.id] || [];
  lessonsOut[ch.id] = arr.map((ls) => ({ ...ls, audioUrl: relPath(ls.audioUrl) }));
  lessonCount += arr.length;
  for (const ls of [...arr].sort((a, b) => a.order - b.order)) {
    lessonList.push({ ...ls, chapterId: ch.id });
  }
}

const book = {
  chapters,
  lessons: lessonsOut,
  pageMap: PAGE_MAP,
  pages,
  extras: { muqaddimaParagraphs: MUQADDIMA_PARAGRAPHS },
};

// 52 ta global o'qish sahifasi (PAGE_MAP slotlari; 25 va 30 ikki darsda takror)
const bookPageCount = Object.values(PAGE_MAP).reduce((s, a) => s + a.length, 0);

// ============================================================================
//  2-QISM: AUDIOLAR — audio-manifest.json
//  Har dars uchun pack: to'liq dars mp3 + shu dars sahifalaridagi barcha
//  element chunk'lari. Har faylga bytes + sha256 (yaxlitlik tekshiruvi uchun).
//  FAQAT ilova ishlatadigan fayllar kiradi (backup'lar emas).
// ============================================================================
console.log("→ audiolar/audio-manifest.json qurilmoqda (sha256 hisoblanmoqda)...");

const fileInfoCache = new Map();
function cachedFileInfo(relativePath) {
  if (!fileInfoCache.has(relativePath)) {
    fileInfoCache.set(relativePath, fileInfo(relativePath));
  }
  return fileInfoCache.get(relativePath);
}

const packs = [];
const globalAudioSet = new Set();
let packOrder = 0;

for (const ls of lessonList) {
  packOrder++;
  const filePaths = [];
  const seen = new Set();
  const add = (url) => {
    if (!url) return;
    const p = relPath(url);
    if (!seen.has(p)) {
      seen.add(p);
      filePaths.push(p);
    }
  };

  add(ls.audioUrl); // to'liq dars audiosi (bor bo'lsa) — birinchi
  for (const pageNum of PAGE_MAP[ls.id] || []) {
    for (const el of PAGE_ELEMENTS[pageNum] || []) {
      add(el.audioUrl);
    }
  }

  const files = filePaths.map((p) => {
    const info = cachedFileInfo(p);
    globalAudioSet.add(p);
    return { path: p, bytes: info.bytes, sha256: info.sha256 };
  });

  packs.push({
    id: ls.id,
    lessonId: ls.id,
    chapterId: ls.chapterId,
    order: packOrder,
    title: ls.title,
    files,
    fileCount: files.length,
    sizeBytes: files.reduce((s, f) => s + f.bytes, 0),
  });
}

// Global yig'indilar — pack'lararo takrorlar (25/30-sahifa chunk'lari ikki
// pack'da) BIR marta hisoblanadi.
const uniqueAudioBytes = [...globalAudioSet].reduce(
  (s, p) => s + cachedFileInfo(p).bytes,
  0
);

const audioManifest = {
  packs,
  totals: {
    uniqueFiles: globalAudioSet.size,
    uniqueBytes: uniqueAudioBytes,
    note:
      "pack'lar orasida takror fayllar bor (25/30-sahifalar ikki darsga tegishli) — " +
      "yuklovchi mavjud faylni o'tkazib yuborsa, jami trafik uniqueBytes bo'ladi",
  },
};

// ============================================================================
//  3-QISM: SOZLAMALAR — i18n.json, legal.json, settings.json
// ============================================================================
console.log("→ sozlamalar/ qurilmoqda...");

const i18n = {};
for (const loc of LOCALES) {
  const p = join(repoRoot, "src", "lib", "i18n", "messages", `${loc}.json`);
  i18n[loc] = JSON.parse(readFileSync(p, "utf8"));
}

// i18n paritet tekshiruvi: barcha til fayllarida kalitlar BIR XIL bo'lishi shart
const refKeys = Object.keys(i18n["uz-latn"]).sort().join("\n");
for (const loc of LOCALES) {
  const keys = Object.keys(i18n[loc]).sort().join("\n");
  if (keys !== refKeys) {
    throw new Error(`i18n kalitlar nomuvofiq: ${loc} uz-latn bilan bir xil emas`);
  }
}

// --- Tema tokenlari globals.css dan (yagona haqiqat manbai — CSS) ------------
// DIQQAT: marker REGEX bilan SELEKTOR sifatida qidiriladi (satr boshida) —
// oddiy indexOf kommentlardagi eslatmalarga tushib ketadi (2026-06-10 da
// shu xato dark temani light nusxasi qilib qo'ygan edi).
function parseThemeTokens(cssText, selectorRegex) {
  const m = selectorRegex.exec(cssText);
  if (!m) throw new Error(`globals.css: ${selectorRegex} selektori topilmadi`);
  const open = cssText.indexOf("{", m.index);
  const close = cssText.indexOf("}", open);
  const body = cssText.slice(open + 1, close);
  const tokens = {};
  for (const t of body.matchAll(/--color-([a-z-]+):\s*([^;]+);/g)) {
    tokens[t[1]] = t[2].trim();
  }
  if (Object.keys(tokens).length === 0) {
    throw new Error(`globals.css: ${selectorRegex} blokida --color-* token yo'q`);
  }
  return tokens;
}

const css = readFileSync(join(repoRoot, "src", "app", "globals.css"), "utf8");
const lightTokens = parseThemeTokens(css, /^@theme\s*\{/m);
const darkOverrides = parseThemeTokens(css, /^html\[data-theme="dark"\]\s*\{/m);
const darkTokens = { ...lightTokens, ...darkOverrides };
// Sog'lomlik tekshiruvi: dark light'dan farq qilishi SHART
if (darkTokens["primary"] === lightTokens["primary"]) {
  throw new Error("Tema parse xatosi: dark tokenlar light bilan bir xil chiqdi");
}

// --- Shriftlar (5 ta; rollari CLAUDE.md "shrift" bo'limlaridan) ---------------
const FONTS = [
  {
    path: "fonts/NotoNaskhArabic-MuallimiSoniy.ttf",
    family: "Noto Naskh Arabic Muallimi",
    role: "universal-arabic",
    buildRevision: 2, // globals.css dagi ?v=N cache-buster bilan sinxron
    note: "Custom build: shadda+kasra/kasratan GSUB ligaturalari o'chirilgan (kasra harf OSTIDA chiqadi). BUTUN kitob shu shriftda. Yuklab olgach sha256 tekshiring.",
  },
  {
    path: "fonts/NotoNaskhArabic-VariableFont_wght.ttf",
    family: "Noto Naskh Arabic",
    role: "fallback-and-mad-base",
    note: "Asl Noto Naskh — custom shrift build manbasi va mad sahifalar bazasi.",
  },
  {
    path: "fonts/AmiriQuran.ttf",
    family: "Amiri Quran",
    role: "mad-damma",
    note: "Mad sahifalarda (17-21) FAQAT damma U+064F uchun (unicode-range) — kattaroq damma.",
  },
  {
    path: "fonts/Amiri-Regular.ttf",
    family: "Amiri",
    role: "bismillah-ligature",
    note: "Bismillah ligaturasi U+FDFD uchun.",
  },
  {
    path: "fonts/UthmanicHafs.otf",
    family: "UthmanicHafs",
    role: "mad-stack-fallback",
    note: "Mad shrift stack zaxirasi (KFGQPC).",
  },
];

const settings = {
  defaults: DEFAULT_SETTINGS,
  constraints: {
    repeatCount: { min: 1, max: 10 },
    playbackSpeeds: [0.5, 1.0, 1.5],
    locales: LOCALES,
    themes: ["light", "dark", "system"],
    // HAQIQIY matn masshtabi — globals.css html[data-font-size] --font-scale
    // qiymatlari. Platformalar SHUNI qo'llaydi.
    fontScales: { small: 0.875, medium: 1, large: 1.125 },
    // Sozlamalar ekranidagi tanlov tugmalarida ko'rinadigan "A" harfi
    // o'lchami (rem) — FAQAT preview, matn masshtabi EMAS.
    fontSizePreviewRem: { small: 0.8125, medium: 1, large: 1.25 },
  },
  behaviors: {
    // SettingsProvider.tsx dagi kod qoidalari — platformalar AYNAN takrorlashi shart
    repeatCountResetsOnLaunch: true, // har ishga tushishda 1× ga qaytadi
    speedLockedTo1x: true, // tezlik UI olib tashlangan, doim 1.0
    themeFallback: "light", // data buzilsa ham DOIM light
    i18nFallbackChain: ["uz-latn", "<key>"], // topilmasa uz-latn, keyin kalit o'zi
    storageKeys: {
      settings: "muallimi-settings",
      progress: "muallimi-progress",
      welcomeSeen: "muallimi-welcome-seen",
      hintSeen: "muallimi-hint-seen", // lesson reader'dagi "bosib ko'ring" hint
    },
  },
  theme: {
    light: lightTokens,
    dark: darkTokens,
    metaThemeColor: { light: lightTokens["bg-dark"], dark: darkTokens["bg-dark"] },
  },
  elements: {
    colors: ELEMENT_COLORS,
    labels: ELEMENT_LABELS,
  },
  fonts: {
    files: FONTS.map((f) => ({ ...f, ...fileInfo(f.path) })),
    stacks: {
      universalArabic: [
        "Noto Naskh Arabic Muallimi",
        "Noto Naskh Arabic",
        "Scheherazade New",
        "Traditional Arabic",
        "serif",
      ],
      madArabic: ["MadDammaFont", "Noto Naskh Arabic", "Amiri Quran", "UthmanicHafs", "serif"],
      // "MadDammaFont" — alohida fayl EMAS: AmiriQuran.ttf'ning ikkinchi
      // @font-face ro'yxati, FAQAT damma U+064F uchun (mad sahifalarda
      // kattaroq damma). Platformalar shu mapping bilan o'zlarida qursin.
      madDammaFace: {
        family: "MadDammaFont",
        file: "fonts/AmiriQuran.ttf",
        unicodeRange: "U+064F",
      },
    },
  },
};

// ============================================================================
//  Yozish + MASTER MANIFEST
// ============================================================================
mkdirSync(outDir, { recursive: true });

writeJson("sahifalar/book.json", book, false); // minified — yuklash hajmi kichik
writeJson("audiolar/audio-manifest.json", audioManifest, false);
writeJson("sozlamalar/i18n.json", i18n, true);
writeJson("sozlamalar/legal.json", LEGAL_CONTENT, true);
writeJson("sozlamalar/settings.json", settings, true);

console.log("→ manifest.json qurilmoqda...");

const sahifalarFiles = [packagedFileEntry("sahifalar/book.json")];
const audiolarFiles = [packagedFileEntry("audiolar/audio-manifest.json")];
const sozlamalarFiles = [
  packagedFileEntry("sozlamalar/i18n.json"),
  packagedFileEntry("sozlamalar/legal.json"),
  packagedFileEntry("sozlamalar/settings.json"),
];

// contentHash — barcha paket fayllari hash'laridan yagona hash (atomik
// yaxlitlik belgisi: versiya raqami unutilsa ham o'zgarishni ko'rsatadi)
const allEntries = [...sahifalarFiles, ...audiolarFiles, ...sozlamalarFiles];
const contentHash = sha256Bytes(
  Buffer.from(allEntries.map((f) => f.sha256).join(""))
);

const manifest = {
  schemaVersion: SCHEMA_VERSION,
  contentVersion: CONTENT_VERSION,
  generatedAt: new Date().toISOString(),
  contentHash,
  parts: {
    sahifalar: {
      files: sahifalarFiles,
      counts: {
        chapters: chapters.length,
        lessons: lessonCount,
        pageKeys: Object.keys(pages).length, // 50 (0,1,3..50 — "2" yo'q)
        bookPages: bookPageCount, // 52 (PAGE_MAP slotlari; 25/30 takror)
        elements: elementCount,
        muqaddimaParagraphs: MUQADDIMA_PARAGRAPHS.length,
      },
    },
    audiolar: {
      files: audiolarFiles,
      totals: {
        packs: packs.length,
        uniqueFiles: globalAudioSet.size,
        uniqueBytes: uniqueAudioBytes,
      },
    },
    sozlamalar: {
      files: sozlamalarFiles,
      fonts: settings.fonts.files.map(({ path, bytes, sha256 }) => ({
        path,
        bytes,
        sha256,
      })),
    },
  },
};

writeJson("manifest.json", manifest, true);

// --- Xulosa --------------------------------------------------------------------
const kb = (n) => (n / 1024).toFixed(1) + " KB";
const mb = (n) => (n / 1e6).toFixed(1) + " MB";
console.log("\n✅ Tayyor → public/content/  (versiya: " + CONTENT_VERSION + ")");
for (const f of allEntries) console.log(`   ${f.path.padEnd(40)} ${kb(f.bytes)}`);
console.log(
  `\n   Sahifalar: ${manifest.parts.sahifalar.counts.pageKeys} kalit / ` +
    `${bookPageCount} o'qish sahifasi, elementlar: ${elementCount}`
);
console.log(
  `   Audiolar: ${packs.length} pack, ${globalAudioSet.size} unikal fayl, ${mb(uniqueAudioBytes)}`
);
console.log(`   Shriftlar: ${FONTS.length} ta (sozlamalar/settings.json ichida)`);
console.log("\n   Endi natijani git'ga push qiling. Platformalar manba URL'i:");
console.log("   https://raw.githubusercontent.com/IsmoilovHabibulloh/muallimi_soniy/main/public/");

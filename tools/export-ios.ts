// iOS/Android uchun JSON eksport: book.json, audio-manifest.json, i18n.json, legal.json, manifest.json
// Ishga tushirish (repo root'dan): npx tsx tools/export-ios.ts
import * as fs from "node:fs";
import * as path from "node:path";
import { PAGE_ELEMENTS } from "../src/lib/data/elements.ts";
import { chapters, lessons } from "../src/lib/data/mock-data.ts";
import { LEGAL_CONTENT } from "../src/lib/data/legal-content.ts";

// PAGE_MAP — mock-data.ts da eksport qilinmagan, shu sababli inline (1:1 nusxa)
const PAGE_MAP: Record<string, number[]> = {
  ls_muqova: [0],
  ls_muqaddima: [1],
  ls_alifbo: [3, 4],
  ls_harflar_1: [5, 6, 7, 8, 9, 10],
  ls_harflar_2: [11, 12, 13, 14, 15, 16],
  ls_madlar: [17, 18, 19, 20],
  ls_tashdid: [21, 22, 23],
  ls_tanvin: [24, 25],
  ls_alif: [25, 26, 27, 28, 29, 30],
  ls_vasl: [30, 31, 32, 33],
  ls_kalimalar: [34, 35],
  ls_suralar: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
  ls_duolar: [48, 49, 50],
};

const ROOT = process.cwd(); // repo root (muallimus-soniy)
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(PUBLIC, "ios");
fs.mkdirSync(OUT, { recursive: true });

// audioUrl normalizatsiya: "/audio/edit/x.mp3" -> "audio/edit/x.mp3"
const norm = (u: string | undefined | null): string | null =>
  u ? u.replace(/^\//, "") : null;

// ---- MUQADDIMA_PARAGRAPHS (RenderedPage.tsx ichidagi hardcoded prose) ----
let muqaddimaParagraphs: string[] = [];
try {
  const src = fs.readFileSync(
    path.join(ROOT, "src/components/lesson/RenderedPage.tsx"),
    "utf8"
  );
  const m = src.match(/MUQADDIMA_PARAGRAPHS\s*[:=][^=]*?(\[[\s\S]*?\])\s*;/);
  if (m) {
    // eslint-disable-next-line no-eval
    muqaddimaParagraphs = eval(m[1]) as string[];
  }
} catch (e) {
  console.warn("Muqaddima paragraflari topilmadi:", (e as Error).message);
}

// ---- book.json ----
const pages: Record<string, unknown[]> = {};
let totalElements = 0;
for (const [num, els] of Object.entries(PAGE_ELEMENTS)) {
  pages[num] = els.map((e) => ({ ...e, audioUrl: norm(e.audioUrl) }));
  totalElements += els.length;
}
const book = {
  version: "1.0.0",
  chapters,
  lessons,
  pageMap: PAGE_MAP,
  pages,
  extras: { muqaddimaParagraphs },
};
fs.writeFileSync(path.join(OUT, "book.json"), JSON.stringify(book));

// ---- i18n.json (4 til birlashtirilgan) ----
const locales = ["uz-latn", "uz-cyrl", "ru", "en"];
const i18n: Record<string, unknown> = {};
for (const loc of locales) {
  i18n[loc] = JSON.parse(
    fs.readFileSync(path.join(ROOT, `src/lib/i18n/messages/${loc}.json`), "utf8")
  );
}
fs.writeFileSync(path.join(OUT, "i18n.json"), JSON.stringify(i18n));

// ---- legal.json ----
fs.writeFileSync(path.join(OUT, "legal.json"), JSON.stringify(LEGAL_CONTENT));

// ---- audio-manifest.json (dars bo'yicha fayllar ro'yxati + hajm) ----
const packs: unknown[] = [];
let grandTotalBytes = 0;
let missingFiles = 0;
for (const ch of chapters) {
  for (const ls of lessons[ch.id] ?? []) {
    const fileSet = new Set<string>();
    const lf = norm(ls.audioUrl);
    if (lf) fileSet.add(lf);
    for (const num of PAGE_MAP[ls.id] ?? []) {
      for (const e of PAGE_ELEMENTS[num] ?? []) {
        const f = norm(e.audioUrl);
        if (f) fileSet.add(f);
      }
    }
    const files = [...fileSet];
    let sizeBytes = 0;
    for (const f of files) {
      try {
        sizeBytes += fs.statSync(path.join(PUBLIC, f)).size;
      } catch {
        missingFiles++;
      }
    }
    grandTotalBytes += sizeBytes;
    packs.push({
      id: ls.id,
      lessonId: ls.id,
      chapterId: ch.id,
      title: ls.title,
      files,
      fileCount: files.length,
      sizeBytes,
    });
  }
}
const audioManifest = { version: "1.0.0", packs };
fs.writeFileSync(
  path.join(OUT, "audio-manifest.json"),
  JSON.stringify(audioManifest)
);

// ---- manifest.json (versiya + fayllar) ----
const manifest = {
  version: "1.0.0",
  files: ["book.json", "i18n.json", "legal.json", "audio-manifest.json"],
};
fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest));

// ---- Hisobot ----
const mb = (b: number) => (b / 1024 / 1024).toFixed(1);
console.log("✅ Eksport tugadi → public/ios/");
console.log(`   chapters: ${chapters.length}`);
console.log(
  `   lessons: ${Object.values(lessons).reduce((a, l) => a + l.length, 0)}`
);
console.log(`   pages (PAGE_ELEMENTS kalitlari): ${Object.keys(pages).length}`);
console.log(`   jami elementlar: ${totalElements}`);
console.log(`   muqaddima paragraflari: ${muqaddimaParagraphs.length}`);
console.log(`   audio paketlar: ${packs.length}`);
console.log(`   audio jami: ${mb(grandTotalBytes)} MB`);
if (missingFiles) console.warn(`   ⚠️ topilmagan audio fayllar: ${missingFiles}`);

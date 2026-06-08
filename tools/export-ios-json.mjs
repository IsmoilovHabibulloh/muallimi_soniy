// ============================================================================
//  export-ios-json.mjs — Web kontentini iOS/Apple ilovasi uchun JSON'ga eksport
// ----------------------------------------------------------------------------
//  Maqsad: web repodagi yagona haqiqat manbai (elements.ts / mock-data.ts /
//  legal-content.ts / i18n) dan iOS ilova birinchi ishga tushganda GitHub'dan
//  yuklab oladigan JSON fayllarni hosil qilish:
//
//      public/ios/book.json      — { chapters, lessons, pageMap, pages, extras }
//      public/ios/i18n.json      — 4 tilning xabarlari (locale bo'yicha)
//      public/ios/legal.json     — huquqiy matnlar (4 til)
//      public/ios/manifest.json  — { version, files, checksums, counts }
//
//  Ishga tushirish (muallimus-soniy/ ildizidan):
//      node tools/export-ios-json.mjs
//
//  Bu skript FAQAT bir marta (yoki kontent yangilanganda) ishga tushiriladi.
//  Natija fayllarni git'ga push qiling — iOS shu tayyor JSON'larni yuklaydi.
//  Kontent o'zgarsa: VERSION ni oshiring va qayta ishga tushiring.
// ============================================================================

import { register } from "node:module";
import { readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// --- Sozlama -----------------------------------------------------------------
const VERSION = "1.0.0"; // kontent yangilanganda oshiring (iOS manifest bilan solishtiradi)

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const outDir = join(repoRoot, "public", "ios");

// --- TS importlarni Node uchun hал qiluvchi hook ------------------------------
// Web fayllar kengaytmasiz import qiladi (`from "./types"`). Node ESM kengaytma
// talab qiladi — shu sababli kengaytmasiz nisbiy importlarga ".ts" qo'shamiz.
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

// --- Manba ma'lumotlarini import qilish (register'dan KEYIN, dinamik) ---------
const { chapters, lessons, PAGE_MAP } = await import("../src/lib/data/mock-data.ts");
const { PAGE_ELEMENTS } = await import("../src/lib/data/elements.ts");
const { LEGAL_CONTENT } = await import("../src/lib/data/legal-content.ts");

const LOCALES = ["uz-latn", "uz-cyrl", "ru", "en"];

// --- Yordamchilar ------------------------------------------------------------

// Audio yo'lini nisbiy qiladi:  "/audio/edit/03_alifbo/e02_ba.mp3"
//                            →  "audio/edit/03_alifbo/e02_ba.mp3"
// (iOS audio'ni o'z bazasiga nisbatan hал qiladi.)
function relAudio(u) {
  return typeof u === "string" && u.startsWith("/") ? u.slice(1) : u;
}

function sha256(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function writeJson(name, data, pretty) {
  const p = join(outDir, name);
  writeFileSync(p, pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data));
  return p;
}

// RenderedPage.tsx ichidagi hardcoded MUQADDIMA_PARAGRAPHS arrayini ajratib olish
// (u element emas, oddiy prose — shuning uchun book.json extras'iga qo'shiladi).
function extractMuqaddimaParagraphs() {
  const src = readFileSync(
    join(repoRoot, "src", "components", "lesson", "RenderedPage.tsx"),
    "utf8"
  );
  const marker = "const MUQADDIMA_PARAGRAPHS";
  const start = src.indexOf(marker);
  if (start === -1) {
    throw new Error("MUQADDIMA_PARAGRAPHS topilmadi (RenderedPage.tsx o'zgardimi?)");
  }
  const arrStart = src.indexOf("[", start);
  const arrEnd = src.indexOf("\n];", arrStart);
  if (arrStart === -1 || arrEnd === -1) {
    throw new Error("MUQADDIMA_PARAGRAPHS array chegarasi topilmadi");
  }
  const literal = src.slice(arrStart, arrEnd + 2); // "[" ... "]"
  const result = new Function("return " + literal)();
  if (!Array.isArray(result) || result.some((x) => typeof x !== "string")) {
    throw new Error("MUQADDIMA_PARAGRAPHS string array emas");
  }
  return result;
}

// --- 1) book.json ------------------------------------------------------------
console.log("→ book.json qurilmoqda...");

// pages: PAGE_ELEMENTS, element audio yo'llari nisbiy qilingan
const pages = {};
let elementCount = 0;
for (const [num, els] of Object.entries(PAGE_ELEMENTS)) {
  pages[num] = els.map((el) =>
    el.audioUrl ? { ...el, audioUrl: relAudio(el.audioUrl) } : el
  );
  elementCount += els.length;
}

// lessons: lesson audio yo'llari ham nisbiy qilingan
const lessonsOut = {};
let lessonCount = 0;
for (const [chId, arr] of Object.entries(lessons)) {
  lessonsOut[chId] = arr.map((ls) => ({ ...ls, audioUrl: relAudio(ls.audioUrl) }));
  lessonCount += arr.length;
}

const muqaddimaParagraphs = extractMuqaddimaParagraphs();

const book = {
  chapters, // [Chapter, ...] (order bilan)
  lessons: lessonsOut, // { ch_id: [Lesson, ...] }
  pageMap: PAGE_MAP, // { ls_id: [rasm raqamlari] }
  pages, // { "0": [Element], "1": [Element], ... }  (kalit — string raqam)
  extras: { muqaddimaParagraphs }, // 9 paragraf (elementlarda yo'q)
};

// --- 2) i18n.json ------------------------------------------------------------
console.log("→ i18n.json qurilmoqda...");
const i18n = {};
for (const loc of LOCALES) {
  const p = join(repoRoot, "src", "lib", "i18n", "messages", `${loc}.json`);
  i18n[loc] = JSON.parse(readFileSync(p, "utf8"));
}

// --- 3) legal.json -----------------------------------------------------------
console.log("→ legal.json qurilmoqda...");
const legal = LEGAL_CONTENT;

// --- Yozish ------------------------------------------------------------------
mkdirSync(outDir, { recursive: true });
const bookPath = writeJson("book.json", book, false); // minified (yuklash hajmi kichik)
const i18nPath = writeJson("i18n.json", i18n, true);
const legalPath = writeJson("legal.json", legal, true);

// --- 4) manifest.json (checksumlar yozilgan fayllardan hisoblanadi) ----------
console.log("→ manifest.json qurilmoqda...");
const contentFiles = ["book.json", "i18n.json", "legal.json"];
const checksums = {};
for (const f of contentFiles) checksums[f] = sha256(join(outDir, f));

const manifest = {
  version: VERSION,
  files: contentFiles,
  checksums,
  counts: {
    chapters: chapters.length,
    lessons: lessonCount,
    pages: Object.keys(pages).length,
    elements: elementCount,
    muqaddimaParagraphs: muqaddimaParagraphs.length,
  },
};
const manifestPath = writeJson("manifest.json", manifest, true);

// --- Xulosa ------------------------------------------------------------------
const kb = (p) => (statSync(p).size / 1024).toFixed(1) + " KB";
console.log("\n✅ Tayyor → public/ios/");
console.log(`   book.json      ${kb(bookPath)}`);
console.log(`   i18n.json      ${kb(i18nPath)}`);
console.log(`   legal.json     ${kb(legalPath)}`);
console.log(`   manifest.json  ${kb(manifestPath)}`);
console.log(
  `\n   Boblar: ${manifest.counts.chapters}, Darslar: ${manifest.counts.lessons}, ` +
    `Sahifa kalitlari: ${manifest.counts.pages}, Elementlar: ${manifest.counts.elements}`
);
console.log("\n   Endi shu fayllarni git'ga push qiling. iOS manba URL'i:");
console.log(
  "   https://raw.githubusercontent.com/IsmoilovHabibulloh/muallimi_soniy/main/muallimus-soniy/public/ios/"
);

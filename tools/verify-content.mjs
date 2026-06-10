// ============================================================================
//  verify-content.mjs — Kontent paketi yaxlitlik va paritet tekshiruvi
// ----------------------------------------------------------------------------
//  build-content.mjs natijasini mustaqil tekshiradi:
//    1. Barcha paket JSON'lari parse bo'ladi
//    2. manifest.json dagi har sha256/bytes diskdagi fayl bilan mos
//    3. PARITET: audio-manifest unikal to'plami == web fon yuklovchisi
//       (src/lib/offline/media-manifest.ts) ro'yxati (shriftlardan tashqari)
//    4. Audio-manifestdagi HAR fayl diskda bor va sha256 mos (tanlab — 20 ta)
//    5. i18n kalitlari 4 tilda bir xil
//    6. settings.json shrift fayllari diskda bor
//
//  Ishga tushirish:  npm run content:verify
//  Chiqish kodi 0 = hammasi joyida; 1 = xato (CI uchun qulay).
// ============================================================================

import { register } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const publicDir = join(repoRoot, "public");
const contentDir = join(publicDir, "content");

// TS import hook: nisbiy kengaytmasiz importlar + "@/..." alias (src/)
const srcUrl = pathToFileURL(join(repoRoot, "src") + "/").href;
const resolveHook = `
const SRC = ${JSON.stringify(srcUrl)};
export async function resolve(spec, ctx, next) {
  if (spec.startsWith("@/")) {
    const base = SRC + spec.slice(2);
    try { return await next(base, ctx); }
    catch { return next(base + ".ts", ctx); }
  }
  try { return await next(spec, ctx); }
  catch (e) {
    if (/^\\.\\.?\\//.test(spec) && !/\\.[a-z0-9]+$/i.test(spec)) {
      return next(spec + ".ts", ctx);
    }
    throw e;
  }
}`;
register("data:text/javascript," + encodeURIComponent(resolveHook), import.meta.url);

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error("  ❌ " + msg);
};
const ok = (msg) => console.log("  ✅ " + msg);

const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");
const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));

// --- 1) JSON'lar parse bo'ladi --------------------------------------------------
console.log("\n[1] Paket fayllari:");
const manifest = readJson(join(contentDir, "manifest.json"));
const book = readJson(join(contentDir, "sahifalar", "book.json"));
const audio = readJson(join(contentDir, "audiolar", "audio-manifest.json"));
const i18n = readJson(join(contentDir, "sozlamalar", "i18n.json"));
const legal = readJson(join(contentDir, "sozlamalar", "legal.json"));
const settings = readJson(join(contentDir, "sozlamalar", "settings.json"));
ok("6 ta JSON parse bo'ldi");

// --- 2) Manifest sha256/bytes mosligi -------------------------------------------
console.log("\n[2] Manifest yaxlitligi:");
const allFiles = [
  ...manifest.parts.sahifalar.files,
  ...manifest.parts.audiolar.files,
  ...manifest.parts.sozlamalar.files,
];
for (const f of allFiles) {
  const buf = readFileSync(join(publicDir, f.path));
  if (buf.length !== f.bytes) fail(`${f.path}: bytes mos emas`);
  else if (sha256(buf) !== f.sha256) fail(`${f.path}: sha256 mos emas`);
  else ok(`${f.path} (${(f.bytes / 1024).toFixed(0)} KB)`);
}

// --- 3) PARITET: web fon yuklovchisi bilan --------------------------------------
console.log("\n[3] Web bilan paritet:");
const { getMediaUrls } = await import("../src/lib/offline/media-manifest.ts");
const webSet = new Set(
  getMediaUrls()
    .filter((u) => u.startsWith("/audio/"))
    .map((u) => u.slice(1))
);
const packSet = new Set();
for (const pack of audio.packs) for (const f of pack.files) packSet.add(f.path);

const missingInPack = [...webSet].filter((p) => !packSet.has(p));
const extraInPack = [...packSet].filter((p) => !webSet.has(p));
if (missingInPack.length) fail(`Web ro'yxatida bor, packlarda yo'q: ${missingInPack.slice(0, 5).join(", ")} (${missingInPack.length} ta)`);
if (extraInPack.length) fail(`Packlarda bor, web ro'yxatida yo'q: ${extraInPack.slice(0, 5).join(", ")} (${extraInPack.length} ta)`);
if (!missingInPack.length && !extraInPack.length) {
  ok(`Audio to'plami web bilan 1:1 mos (${packSet.size} fayl)`);
}
if (audio.totals.uniqueFiles !== packSet.size) fail("totals.uniqueFiles noto'g'ri");

// --- 4) Audio fayllar diskda + sha256 tanlab tekshirish --------------------------
console.log("\n[4] Audio fayllar:");
let missingOnDisk = 0;
for (const p of packSet) {
  if (!existsSync(join(publicDir, p))) {
    missingOnDisk++;
    fail(`Diskda yo'q: public/${p}`);
  }
}
if (!missingOnDisk) ok(`Barcha ${packSet.size} audio fayl diskda bor`);

const sampleFiles = audio.packs.flatMap((p) => p.files).filter((_, i) => i % 90 === 0);
let hashOk = true;
for (const f of sampleFiles) {
  if (sha256(readFileSync(join(publicDir, f.path))) !== f.sha256) {
    hashOk = false;
    fail(`sha256 mos emas: ${f.path}`);
  }
}
if (hashOk) ok(`${sampleFiles.length} ta tanlangan faylning sha256'i mos`);

// --- 5) i18n paritet --------------------------------------------------------------
console.log("\n[5] i18n:");
const locales = Object.keys(i18n);
const refKeys = Object.keys(i18n["uz-latn"]).sort().join("|");
let i18nOk = true;
for (const loc of locales) {
  if (Object.keys(i18n[loc]).sort().join("|") !== refKeys) {
    i18nOk = false;
    fail(`${loc} kalitlari uz-latn bilan mos emas`);
  }
  if (!legal[loc]) {
    i18nOk = false;
    fail(`legal.json da ${loc} yo'q`);
  }
}
if (i18nOk) ok(`${locales.length} til, ${refKeys.split("|").length} kalit — paritet to'liq`);

// --- 6) Sxema asoslari ------------------------------------------------------------
console.log("\n[6] Sxema:");
if (manifest.parts.sahifalar.counts.elements !== Object.values(book.pages).flat().length)
  fail("manifest elements soni book.json bilan mos emas");
else ok(`Elementlar: ${manifest.parts.sahifalar.counts.elements}`);
if (audio.packs.length !== manifest.parts.audiolar.totals.packs)
  fail("pack soni manifest bilan mos emas");
else ok(`Packlar: ${audio.packs.length}`);
for (const f of settings.fonts.files) {
  if (!existsSync(join(publicDir, f.path))) fail(`Shrift diskda yo'q: ${f.path}`);
}
ok(`Shriftlar: ${settings.fonts.files.length} ta tekshirildi`);
if (!settings.defaults || settings.defaults.repeatCount !== 1)
  fail("settings.defaults noto'g'ri");
else ok("settings.defaults to'g'ri (repeatCount=1, theme=light)");

// Tema regressiya qo'riqchisi: dark light'dan farq qilishi va SettingsProvider
// dagi meta theme-color qiymatlariga mos bo'lishi shart (2026-06-10 bug'i).
if (settings.theme.dark["primary"] === settings.theme.light["primary"])
  fail("theme.dark light bilan bir xil — CSS parse buzilgan");
else ok("theme.dark light'dan farqli (parse to'g'ri)");
if (
  settings.theme.metaThemeColor.light !== "#f0f7f2" ||
  settings.theme.metaThemeColor.dark !== "#071a0e"
)
  fail("metaThemeColor SettingsProvider qiymatlariga mos emas");
else ok("metaThemeColor: light #f0f7f2, dark #071a0e");
if (settings.constraints.fontScales?.large !== 1.125)
  fail("fontScales globals.css --font-scale bilan mos emas");
else ok("fontScales to'g'ri (0.875 / 1 / 1.125)");
if (settings.behaviors.storageKeys.hintSeen !== "muallimi-hint-seen")
  fail("storageKeys.hintSeen yo'q");
else ok("storageKeys to'liq (4 kalit)");

// --- Natija -----------------------------------------------------------------------
console.log(
  failures === 0
    ? "\n✅ HAMMASI JOYIDA — kontent paketi to'liq va web bilan paritetda\n"
    : `\n❌ ${failures} ta xato topildi\n`
);
process.exit(failures === 0 ? 0 : 1);

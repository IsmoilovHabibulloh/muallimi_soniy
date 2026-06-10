import { chapters, lessons } from "@/lib/data/mock-data";
import { PAGE_ELEMENTS } from "@/lib/data/elements";

/**
 * Offline manifest — ilova haqiqatda ishlatadigan barcha URL'lar.
 *
 * Manba — bundle ichidagi data modullari (elements.ts, mock-data.ts).
 * public/ papkasini ko'r-ko'rona skan qilmaymiz: u yerda app hech qachon
 * so'ramaydigan zaxira (backup) audio fayllar ham bor. Faqat darslarda
 * chaqiriladigan fayllar fonda yuklab olinadi.
 */

/** globals.css dagi @font-face'lar bilan 1:1 (cache-buster query bilan). */
const FONT_URLS = [
  "/fonts/NotoNaskhArabic-MuallimiSoniy.ttf?v=2",
  "/fonts/NotoNaskhArabic-VariableFont_wght.ttf",
  "/fonts/Amiri-Regular.ttf",
  "/fonts/UthmanicHafs.otf",
  "/fonts/AmiriQuran.ttf",
];

// Eslatma: /images/N.jpg fayllar manifestga KIRITILMAGAN — barcha sahifalar
// (0,1,3-50) RenderedPage registry'siga ega, rasm fallback hech qachon
// ishlamaydi (PageView.tsx: hasRenderer). Agar kelajakda renderer'siz sahifa
// qo'shilsa, uning rasmini bu yerga qo'shish kerak.

/** Per-element audio chunklar — kitob tartibida (sahifa 0,1,3,...). */
function getChunkAudioUrls(): string[] {
  const urls = new Set<string>();
  const pageNums = Object.keys(PAGE_ELEMENTS)
    .map(Number)
    .sort((a, b) => a - b);
  for (const pg of pageNums) {
    for (const el of PAGE_ELEMENTS[pg] ?? []) {
      if (el.audioUrl) urls.add(el.audioUrl);
    }
  }
  return [...urls];
}

/** To'liq dars audiolari (audio control bar "to'liq ijro"). */
function getLessonAudioUrls(): string[] {
  const urls = new Set<string>();
  for (const chapterLessons of Object.values(lessons)) {
    for (const lesson of chapterLessons) {
      if (lesson.audioUrl) urls.add(lesson.audioUrl);
    }
  }
  return [...urls];
}

/** Barcha sahifa route'lari — offline navigatsiya uchun HTML keshlanadi. */
export function getRouteUrls(): string[] {
  const routes = ["/", "/home", "/darslar", "/sozlamalar"];
  for (const chapter of chapters) {
    for (const lesson of lessons[chapter.id] ?? []) {
      routes.push(`/lesson/${chapter.id}/${lesson.id}`);
    }
  }
  return routes;
}

/**
 * Media URL'lar — yuklab olish ustuvorligi tartibida:
 * 1) shriftlar (UI darhol to'liq ko'rinishi uchun)
 * 2) per-element audio chunklar (asosiy o'qish tajribasi)
 * 3) to'liq dars audiolari (eng katta fayllar — oxirida)
 *
 * Ikonkalar/manifest.json bu yerda YO'Q — ular Serwist precache'ida
 * (app/serwist/[path]/route.ts dagi globPatterns).
 */
export function getMediaUrls(): string[] {
  // Dedupe shart: ayrim dars audiolari elements.ts da element sifatida ham
  // ishlatiladi — takrorlansa progress "1762/1763" kabi noto'g'ri ko'rinadi.
  return [
    ...new Set([...FONT_URLS, ...getChunkAudioUrls(), ...getLessonAudioUrls()]),
  ];
}

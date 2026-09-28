import type { ReadingBg, ArabicFont } from "@/lib/data/types";

/**
 * O'qish ekranining fon palitralari.
 *
 * ⚠️ Bu ro'yxat `globals.css` dagi `[data-reading-bg="..."]` bloklariga
 * 1:1 mos bo'lishi SHART — birini o'zgartirsangiz ikkinchisini ham
 * yangilang. `bg`/`fg` faqat sozlama tugmasidagi namuna kvadrati uchun;
 * haqiqiy ranglar CSS token'laridan keladi.
 *
 * Ikki joyda ishlatiladi: sozlamalar sahifasi va dars ichidagi
 * "O'qish sozlamalari" oynasi.
 */
export const READING_BGS: {
  value: ReadingBg;
  labelKey: string;
  bg: string;
  fg: string;
}[] = [
  { value: "oq", labelKey: "bg_oq", bg: "#ffffff", fg: "#12211a" },
  { value: "yashil", labelKey: "bg_yashil", bg: "#edf7f0", fg: "#0f1f17" },
  { value: "sepiya", labelKey: "bg_sepiya", bg: "#f6efe0", fg: "#3a2f21" },
  { value: "kulrang", labelKey: "bg_kulrang", bg: "#e9ecee", fg: "#1f272c" },
  { value: "tungi", labelKey: "bg_tungi", bg: "#0d1117", fg: "#e8eee9" },
];

/** Shrift o'lchami tugmalari (namuna "A" harfi rem o'lchamida). */
export const FONT_SIZES: {
  value: "small" | "medium" | "large";
  rem: number;
  labelKey: string;
}[] = [
  { value: "small", rem: 0.8125, labelKey: "small" },
  { value: "medium", rem: 1, labelKey: "medium" },
  { value: "large", rem: 1.25, labelKey: "large" },
];

/**
 * Suralar bo'limidagi arab shrifti tanlovi (iOS ilovadagi "Arab shrifti").
 * `sample` — tugmadagi namuna matn (iOS bilan bir xil).
 *
 * ⚠️ `globals.css` dagi `[data-arabic-font="..."]` qoidalariga mos bo'lishi
 * shart. `naskh` — standart (UthmanicHafs, mushaf), alohida CSS qoidasi
 * yo'q; `scheherazade` faqat `.quran-scope` ichida almashadi.
 */
export const ARABIC_FONTS: {
  value: ArabicFont;
  label: string;
  sample: string;
  /** Namunani ko'rsatish uchun CSS font stack */
  stack: string;
}[] = [
  {
    value: "naskh",
    label: "Naskh",
    sample: "بَ بِ بُ رَبِّ كِتَابٌ",
    stack: '"UthmanicHafs", "Noto Naskh Arabic Muallimi", serif',
  },
  {
    value: "scheherazade",
    label: "Scheherazade",
    sample: "بَ بِ بُ رَبِّ كِتَابٌ",
    stack: '"Scheherazade New", "UthmanicHafs", serif',
  },
];

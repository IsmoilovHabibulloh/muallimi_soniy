import { Chapter, Lesson, Page } from "./types";
import { PAGE_ELEMENTS } from "./elements";

export const chapters: Chapter[] = [
  {
    id: "ch_muqaddima",
    title: {
      "uz-latn": "Muqaddima",
      "uz-cyrl": "Муқаддима",
      ru: "Введение",
      en: "Introduction",
    },
    order: 1,
    icon: "📖",
    lessonCount: 2,
  },
  {
    id: "ch_harflar",
    title: {
      "uz-latn": "Harflar",
      "uz-cyrl": "Ҳарфлар",
      ru: "Буквы",
      en: "Letters",
    },
    order: 2,
    icon: "🔤",
    lessonCount: 3,
  },
  {
    id: "ch_madlar",
    title: {
      "uz-latn": "Madlar",
      "uz-cyrl": "Мадлар",
      ru: "Долгие гласные",
      en: "Long Vowels",
    },
    order: 3,
    icon: "🔊",
    lessonCount: 1,
  },
  {
    id: "ch_tashdid",
    title: {
      "uz-latn": "Tashdid",
      "uz-cyrl": "Ташдид",
      ru: "Ташдид",
      en: "Tashdid",
    },
    order: 4,
    icon: "✏️",
    lessonCount: 1,
  },
  {
    id: "ch_tanvin",
    title: {
      "uz-latn": "Tanvin",
      "uz-cyrl": "Танвин",
      ru: "Танвин",
      en: "Tanwin",
    },
    order: 5,
    icon: "🔡",
    lessonCount: 1,
  },
  {
    id: "ch_alif",
    title: {
      "uz-latn": "Alif hamza va alif lom",
      "uz-cyrl": "Алиф ҳамза ва алиф лом",
      ru: "Алиф хамза и алиф лам",
      en: "Alif Hamza & Alif Lam",
    },
    order: 6,
    icon: "ا",
    lessonCount: 1,
  },
  {
    id: "ch_vasl",
    title: {
      "uz-latn": "Vasl, vaqf, idgʻom",
      "uz-cyrl": "Васл, вақф, идғом",
      ru: "Васл, вакф, идгам",
      en: "Wasl, Waqf, Idgham",
    },
    order: 7,
    icon: "🔗",
    lessonCount: 1,
  },
  {
    id: "ch_kalimalar",
    title: {
      "uz-latn": "Kalimalarning asl nusxalari",
      "uz-cyrl": "Калималарнинг асл нусхалари",
      ru: "Оригиналы слов",
      en: "Original Words",
    },
    order: 8,
    icon: "📝",
    lessonCount: 1,
  },
  {
    id: "ch_suralar",
    title: {
      "uz-latn": "Suralarning asl nusxalari",
      "uz-cyrl": "Сураларнинг асл нусхалари",
      ru: "Оригиналы сур",
      en: "Original Surahs",
    },
    order: 9,
    icon: "📜",
    lessonCount: 1,
  },
  {
    id: "ch_duolar",
    title: {
      "uz-latn": "Sano, tashahhud, duolar",
      "uz-cyrl": "Сано, ташаҳҳуд, дуолар",
      ru: "Сана, ташаххуд, дуа",
      en: "Sana, Tashahhud, Duas",
    },
    order: 10,
    icon: "🤲",
    lessonCount: 1,
  },
];

export const lessons: Record<string, Lesson[]> = {
  ch_muqaddima: [
    {
      id: "ls_muqova",
      chapterId: "ch_muqaddima",
      title: {
        "uz-latn": "Muqova",
        "uz-cyrl": "Муқова",
        ru: "Обложка",
        en: "Cover",
      },
      order: 1,
      audioUrl: "/audio/01. muqova.mp3",
      pageCount: 1,
    },
    {
      id: "ls_muqaddima",
      chapterId: "ch_muqaddima",
      title: {
        "uz-latn": "Muqaddima",
        "uz-cyrl": "Муқаддима",
        ru: "Введение",
        en: "Introduction",
      },
      order: 2,
      audioUrl: "/audio/02. Muqaddima.mp3",
      pageCount: 1,
    },
  ],
  ch_harflar: [
    {
      id: "ls_alifbo",
      chapterId: "ch_harflar",
      title: {
        "uz-latn": "Alifbo va harakat",
        "uz-cyrl": "Алифбо ва ҳаракат",
        ru: "Алфавит и огласовки",
        en: "Alphabet & Diacritics",
      },
      order: 1,
      audioUrl: "/audio/03. alifbo.mp3",
      pageCount: 2,
    },
    {
      id: "ls_harflar_1",
      chapterId: "ch_harflar",
      title: {
        "uz-latn": "Harflar (1-qism)",
        "uz-cyrl": "Ҳарфлар (1-қисм)",
        ru: "Буквы (часть 1)",
        en: "Letters (Part 1)",
      },
      order: 2,
      audioUrl: "/audio/05. ro.mp3",
      pageCount: 6,
    },
    {
      id: "ls_harflar_2",
      chapterId: "ch_harflar",
      title: {
        "uz-latn": "Harflar (2-qism)",
        "uz-cyrl": "Ҳарфлар (2-қисм)",
        ru: "Буквы (часть 2)",
        en: "Letters (Part 2)",
      },
      order: 3,
      audioUrl: "/audio/17. qo.mp3",
      pageCount: 6,
    },
  ],
  ch_madlar: [
    {
      id: "ls_madlar",
      chapterId: "ch_madlar",
      title: {
        "uz-latn": "Madlar",
        "uz-cyrl": "Мадлар",
        ru: "Долгие гласные",
        en: "Long Vowels",
      },
      order: 1,
      audioUrl: "/audio/32. madli 01.mp3",
      pageCount: 5,
    },
  ],
  ch_tashdid: [
    {
      id: "ls_tashdid",
      chapterId: "ch_tashdid",
      title: {
        "uz-latn": "Tashdid",
        "uz-cyrl": "Ташдид",
        ru: "Ташдид",
        en: "Tashdid",
      },
      order: 1,
      audioUrl: "/audio/34. tashdid.mp3",
      pageCount: 3,
    },
  ],
  ch_tanvin: [
    {
      id: "ls_tanvin",
      chapterId: "ch_tanvin",
      title: {
        "uz-latn": "Tanvin",
        "uz-cyrl": "Танвин",
        ru: "Танвин",
        en: "Tanwin",
      },
      order: 1,
      audioUrl: "/audio/35. tanvin.mp3",
      pageCount: 3,
    },
  ],
  ch_alif: [
    {
      id: "ls_alif",
      chapterId: "ch_alif",
      title: {
        "uz-latn": "Alif hamza va alif lom",
        "uz-cyrl": "Алиф ҳамза ва алиф лом",
        ru: "Алиф хамза и алиф лам",
        en: "Alif Hamza & Alif Lam",
      },
      order: 1,
      audioUrl: "/audio/36. tanvinli tashdid.mp3",
      pageCount: 6,
    },
  ],
  ch_vasl: [
    {
      id: "ls_vasl",
      chapterId: "ch_vasl",
      title: {
        "uz-latn": "Vasl, vaqf, idgʻom",
        "uz-cyrl": "Васл, вақф, идғом",
        ru: "Васл, вакф, идгам",
        en: "Wasl, Waqf, Idgham",
      },
      order: 1,
      audioUrl: null,
      pageCount: 4,
    },
  ],
  ch_kalimalar: [
    {
      id: "ls_kalimalar",
      chapterId: "ch_kalimalar",
      title: {
        "uz-latn": "Kalimalarning asl nusxalari",
        "uz-cyrl": "Калималарнинг асл нусхалари",
        ru: "Оригиналы слов",
        en: "Original Words",
      },
      order: 1,
      audioUrl: null,
      pageCount: 2,
    },
  ],
  ch_suralar: [
    {
      id: "ls_suralar",
      chapterId: "ch_suralar",
      title: {
        "uz-latn": "Suralarning asl nusxalari",
        "uz-cyrl": "Сураларнинг асл нусхалари",
        ru: "Оригиналы сур",
        en: "Original Surahs",
      },
      order: 1,
      audioUrl: null,
      pageCount: 12,
    },
  ],
  ch_duolar: [
    {
      id: "ls_duolar",
      chapterId: "ch_duolar",
      title: {
        "uz-latn": "Sano, tashahhud, duolar",
        "uz-cyrl": "Сано, ташаҳҳуд, дуолар",
        ru: "Сана, ташаххуд, дуа",
        en: "Sana, Tashahhud, Duas",
      },
      order: 1,
      audioUrl: null,
      pageCount: 3,
    },
  ],
};

// Mapping: chapterId+lessonId → page image numbers
const PAGE_MAP: Record<string, number[]> = {
  ls_muqova: [0],
  ls_muqaddima: [1], // Pages 1 & 2 merged into single page 1 (continuous text)
  ls_alifbo: [3, 4],
  ls_harflar_1: [5, 6, 7, 8, 9, 10],
  ls_harflar_2: [11, 12, 13, 14, 15, 16],
  ls_madlar: [17, 18, 19, 20, 21],
  ls_tashdid: [21, 22, 23],
  ls_tanvin: [23, 24, 25],
  ls_alif: [25, 26, 27, 28, 29, 30],
  ls_vasl: [30, 31, 32, 33],
  ls_kalimalar: [34, 35],
  ls_suralar: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
  ls_duolar: [48, 49, 50],
};

export function getPages(lessonId: string): Page[] {
  const pageNumbers = PAGE_MAP[lessonId] || [];
  return pageNumbers.map((num, idx) => ({
    id: `pg_${lessonId}_${num}`,
    lessonId,
    order: idx + 1,
    imageUrl: `/images/${num}.jpg`,
    elements: PAGE_ELEMENTS[num] || [],
  }));
}

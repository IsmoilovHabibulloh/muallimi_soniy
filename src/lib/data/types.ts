export type ElementType = "harf" | "bogin" | "soz" | "jumla";

export type Locale = "uz-latn" | "uz-cyrl" | "ru" | "en";

export type Theme = "light" | "dark" | "system";

export type FontSize = "small" | "medium" | "large";

export type PlaybackSpeed = 0.5 | 1.0 | 1.5;

export interface LocalizedString {
  "uz-latn": string;
  "uz-cyrl": string;
  ru: string;
  en: string;
}

export interface Chapter {
  id: string;
  title: LocalizedString;
  order: number;
  icon: string;
  lessonCount: number;
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: LocalizedString;
  order: number;
  audioUrl: string | null;
  pageCount: number;
}

export interface Page {
  id: string;
  lessonId: string;
  order: number;
  imageUrl: string;
  elements: Element[];
}

export interface Element {
  id: string;
  type: ElementType;
  arabic: string;
  uzbek: string;
  audioUrl?: string;
  start: number;
  end: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface UserSettings {
  repeatCount: number;
  speed: PlaybackSpeed;
  locale: Locale;
  theme: Theme;
  fontSize: FontSize;
  loopMode: boolean;
  sequentialMode: boolean;
}

export interface UserProgress {
  lastChapterId: string | null;
  lastLessonId: string | null;
  lastPageIndex: number;
  completedLessons: string[];
}

export const DEFAULT_SETTINGS: UserSettings = {
  repeatCount: 1,
  speed: 1.0,
  locale: "uz-latn",
  theme: "light",
  fontSize: "medium",
  loopMode: false,
  sequentialMode: false,
};

export const DEFAULT_PROGRESS: UserProgress = {
  lastChapterId: null,
  lastLessonId: null,
  lastPageIndex: 0,
  completedLessons: [],
};

export const ELEMENT_COLORS: Record<ElementType, string> = {
  harf: "#a78bfa",
  bogin: "#38bdf8",
  soz: "#34d399",
  jumla: "#fbbf24",
};

export const ELEMENT_LABELS: Record<ElementType, LocalizedString> = {
  harf: { "uz-latn": "HARF", "uz-cyrl": "ҲАРФ", ru: "БУКВА", en: "LETTER" },
  bogin: {
    "uz-latn": "BOʻGʻIN",
    "uz-cyrl": "БЎҒИН",
    ru: "СЛОГ",
    en: "SYLLABLE",
  },
  soz: { "uz-latn": "SOʻZ", "uz-cyrl": "СЎЗ", ru: "СЛОВО", en: "WORD" },
  jumla: {
    "uz-latn": "JUMLA",
    "uz-cyrl": "ЖУМЛА",
    ru: "ПРЕДЛОЖЕНИЕ",
    en: "SENTENCE",
  },
};

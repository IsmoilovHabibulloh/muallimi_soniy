import {
  chapters as mockChapters,
  lessons as mockLessons,
  getPages as mockGetPages,
} from "./mock-data";
import type { Chapter, Lesson, Page } from "./types";

export interface BookPage extends Page {
  chapter: Chapter;
  lesson: Lesson;
  globalIndex: number;
  lessonPageIndex: number;
}

let cachedBookPages: BookPage[] | null = null;

export async function getAllBookPages(): Promise<BookPage[]> {
  if (cachedBookPages) return cachedBookPages;
  const pages: BookPage[] = [];
  let globalIndex = 0;
  for (const chapter of mockChapters) {
    const chapterLessons = mockLessons[chapter.id] || [];
    for (const lesson of chapterLessons) {
      const lessonPages = mockGetPages(lesson.id);
      lessonPages.forEach((page, lessonPageIndex) => {
        pages.push({ ...page, chapter, lesson, globalIndex, lessonPageIndex });
        globalIndex++;
      });
    }
  }
  cachedBookPages = pages;
  return pages;
}

/** Mundarija uchun: dars global sahifa oralig'i bilan (1-asoslangan). */
export interface OutlineLesson {
  lesson: Lesson;
  /** Kitob bo'ylab birinchi sahifa raqami (1..52) */
  globalStart: number;
  /** Kitob bo'ylab oxirgi sahifa raqami (1..52) */
  globalEnd: number;
}

export interface OutlineChapter {
  chapter: Chapter;
  lessons: OutlineLesson[];
  globalStart: number;
  globalEnd: number;
}

export interface BookOutline {
  chapters: OutlineChapter[];
  totalPages: number;
}

let cachedOutline: BookOutline | null = null;

/** Butun kitob mundarijasi GLOBAL sahifa raqamlari bilan — reader'dagi
    "X / 52" indikator bilan 1:1 mos. TOC UI'lari shu funksiyadan oladi. */
export async function getBookOutline(): Promise<BookOutline> {
  if (cachedOutline) return cachedOutline;
  const pages = await getAllBookPages();
  const chapters: OutlineChapter[] = [];
  for (const p of pages) {
    let oc = chapters[chapters.length - 1];
    if (!oc || oc.chapter.id !== p.chapter.id) {
      oc = {
        chapter: p.chapter,
        lessons: [],
        globalStart: p.globalIndex + 1,
        globalEnd: p.globalIndex + 1,
      };
      chapters.push(oc);
    }
    let ol = oc.lessons[oc.lessons.length - 1];
    if (!ol || ol.lesson.id !== p.lesson.id) {
      ol = {
        lesson: p.lesson,
        globalStart: p.globalIndex + 1,
        globalEnd: p.globalIndex + 1,
      };
      oc.lessons.push(ol);
    }
    ol.globalEnd = p.globalIndex + 1;
    oc.globalEnd = p.globalIndex + 1;
  }
  cachedOutline = { chapters, totalPages: pages.length };
  return cachedOutline;
}

export async function getChapters(): Promise<Chapter[]> {
  return mockChapters;
}

export async function getLessons(chapterId: string): Promise<Lesson[]> {
  return mockLessons[chapterId] || [];
}

export async function getAllLessons(): Promise<Record<string, Lesson[]>> {
  return mockLessons;
}

export async function getLesson(
  lessonId: string
): Promise<Lesson | undefined> {
  for (const lessons of Object.values(mockLessons)) {
    const found = lessons.find((l) => l.id === lessonId);
    if (found) return found;
  }
  return undefined;
}

export async function getPages(lessonId: string): Promise<Page[]> {
  return mockGetPages(lessonId);
}

export async function getChapter(
  chapterId: string
): Promise<Chapter | undefined> {
  return mockChapters.find((c) => c.id === chapterId);
}

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

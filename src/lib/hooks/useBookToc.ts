"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getBookOutline,
  type BookOutline,
  type OutlineLesson,
} from "@/lib/data/data-provider";
import { useProgress } from "@/providers/ProgressProvider";

export interface BookTocState {
  outline: BookOutline | null;
  loading: boolean;
  /** Foydalanuvchi to'xtagan joy — GLOBAL sahifa raqami (1-asoslangan). */
  resumeGlobalPage: number;
  resumeLessonId: string | null;
  /** Davom etish havolasi (?page=lessonPageIndex bilan). */
  resumeHref: string;
  hasProgress: boolean;
  /** Dars tugaganmi — completedLessons YOKI o'qib o'tib ketilgan
      (lesson.globalEnd < resumeGlobalPage) bo'lsa true. */
  isLessonDone: (l: OutlineLesson) => boolean;
}

/** TOC yuzalari (darslar sahifasi, TocSheet, BookHeroCard) uchun yagona
    ma'lumot manbai — global raqamlar reader "X / Y" bilan 1:1 mos. */
export function useBookToc(): BookTocState {
  const { progress, isLessonComplete } = useProgress();
  const [outline, setOutline] = useState<BookOutline | null>(null);

  useEffect(() => {
    getBookOutline().then(setOutline);
  }, []);

  return useMemo(() => {
    const hasProgress = Boolean(progress.lastLessonId && progress.lastChapterId);

    let resumeGlobalPage = 1;
    let resumeLessonId: string | null = null;
    let resumeHref = "";

    if (outline) {
      const first = outline.chapters[0]?.lessons[0];
      let target: OutlineLesson | undefined;
      let targetChapterId = outline.chapters[0]?.chapter.id;

      if (hasProgress) {
        for (const oc of outline.chapters) {
          const found = oc.lessons.find(
            (ol) => ol.lesson.id === progress.lastLessonId
          );
          if (found) {
            target = found;
            targetChapterId = oc.chapter.id;
            break;
          }
        }
      }
      if (!target) target = first;

      if (target) {
        const span = target.globalEnd - target.globalStart;
        // Eski/buzilgan lastPageIndex diapazondan chiqsa — dars boshiga clamp.
        const pageIdx = hasProgress
          ? Math.max(0, Math.min(progress.lastPageIndex || 0, span))
          : 0;
        resumeGlobalPage = target.globalStart + pageIdx;
        resumeLessonId = target.lesson.id;
        resumeHref = `/lesson/${targetChapterId}/${target.lesson.id}?page=${pageIdx}`;
      }
    }

    const isLessonDone = (l: OutlineLesson) =>
      isLessonComplete(l.lesson.id) || l.globalEnd < resumeGlobalPage;

    return {
      outline,
      loading: !outline,
      resumeGlobalPage,
      resumeLessonId,
      resumeHref,
      hasProgress,
      isLessonDone,
    };
  }, [outline, progress.lastLessonId, progress.lastChapterId, progress.lastPageIndex, isLessonComplete]);
}

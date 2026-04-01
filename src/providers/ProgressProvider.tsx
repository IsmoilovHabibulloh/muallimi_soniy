"use client";

import React, { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import type { UserProgress } from "@/lib/data/types";
import { DEFAULT_PROGRESS } from "@/lib/data/types";

interface ProgressContextType {
  progress: UserProgress;
  setLastViewed: (
    chapterId: string,
    lessonId: string,
    pageIndex: number
  ) => void;
  markLessonComplete: (lessonId: string) => void;
  isLessonComplete: (lessonId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType>(null!);

export function useProgress() {
  return useContext(ProgressContext);
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useLocalStorage<UserProgress>(
    "muallimi-progress",
    DEFAULT_PROGRESS
  );

  const setLastViewed = useCallback(
    (chapterId: string, lessonId: string, pageIndex: number) => {
      setProgress((prev) => ({
        ...prev,
        lastChapterId: chapterId,
        lastLessonId: lessonId,
        lastPageIndex: pageIndex,
      }));
    },
    [setProgress]
  );

  const markLessonComplete = useCallback(
    (lessonId: string) => {
      setProgress((prev) => ({
        ...prev,
        completedLessons: prev.completedLessons.includes(lessonId)
          ? prev.completedLessons
          : [...prev.completedLessons, lessonId],
      }));
    },
    [setProgress]
  );

  const isLessonComplete = useCallback(
    (lessonId: string) => progress.completedLessons.includes(lessonId),
    [progress.completedLessons]
  );

  return (
    <ProgressContext.Provider
      value={{ progress, setLastViewed, markLessonComplete, isLessonComplete }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

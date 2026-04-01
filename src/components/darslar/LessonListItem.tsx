"use client";

import Link from "next/link";
import { BookOpen, CheckCircle, Volume2 } from "lucide-react";
import { useProgress } from "@/providers/ProgressProvider";
import type { Lesson, Locale } from "@/lib/data/types";

interface Props {
  lesson: Lesson;
  chapterId: string;
  locale: Locale;
}

export function LessonListItem({ lesson, chapterId, locale }: Props) {
  const { isLessonComplete } = useProgress();
  const completed = isLessonComplete(lesson.id);

  return (
    <Link
      href={`/lesson/${chapterId}/${lesson.id}`}
      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
    >
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
          completed ? "bg-primary/20" : "bg-white/5"
        }`}
      >
        {completed ? (
          <CheckCircle size={16} className="text-primary" />
        ) : (
          <BookOpen size={16} className="text-text-muted" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-main truncate">
          {lesson.title[locale]}
        </p>
        <p className="text-xs text-text-muted">
          {lesson.pageCount} sahifa
        </p>
      </div>
      {lesson.audioUrl && (
        <Volume2 size={14} className="text-primary/60 shrink-0" />
      )}
    </Link>
  );
}

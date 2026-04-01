"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Chapter, Lesson, Locale } from "@/lib/data/types";
import { LessonListItem } from "./LessonListItem";

interface Props {
  chapter: Chapter;
  lessons: Lesson[];
  locale: Locale;
  defaultOpen?: boolean;
}

export function ChapterAccordion({
  chapter,
  lessons,
  locale,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="glass overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <span className="text-2xl">{chapter.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-text-main truncate">
            {chapter.title[locale]}
          </h3>
          <p className="text-xs text-text-muted">
            {lessons.length} dars
          </p>
        </div>
        <ChevronDown
          size={18}
          className={`text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-white/5">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <LessonListItem
                key={lesson.id}
                lesson={lesson}
                chapterId={chapter.id}
                locale={locale}
              />
            ))
          ) : (
            <p className="text-xs text-text-muted px-4 py-3">
              Hozircha dars yoʻq
            </p>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";
import { useBookToc } from "@/lib/hooks/useBookToc";

/* "Davom etish" kartasi — mundarija tepasida bitta bosishda oxirgi o'qilgan
   sahifaga qaytaradi. Progress yo'q bo'lsa "Boshlash" (1-sahifa). */
export function ResumeCard() {
  const { settings, t } = useSettings();
  const { outline, loading, resumeHref, resumeGlobalPage, resumeLessonId, hasProgress } =
    useBookToc();

  if (loading || !outline || !resumeHref) return null;

  let lessonTitle = "";
  for (const oc of outline.chapters) {
    const found = oc.lessons.find((ol) => ol.lesson.id === resumeLessonId);
    if (found) {
      lessonTitle = found.lesson.title[settings.locale];
      break;
    }
  }

  const pct = Math.min(100, (resumeGlobalPage / outline.totalPages) * 100);

  return (
    <Link
      href={resumeHref}
      className="glass-green rounded-[20px] p-4 mt-4 flex items-center gap-3.5 active:scale-[0.98] transition-transform block"
    >
      <span className="w-11 h-11 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
        <Play size={20} className="text-primary ml-0.5" fill="currentColor" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[0.625rem] font-bold uppercase tracking-[0.1em] text-primary">
          {t(hasProgress ? "continue" : "start")}
        </span>
        <span className="block text-sm font-semibold text-text-main truncate mt-0.5">
          {lessonTitle}
        </span>
        <span className="block text-xs text-text-muted tabular-nums mt-0.5">
          {t("page")} {resumeGlobalPage} / {outline.totalPages} ·{" "}
          {Math.round(pct)}%
        </span>
        <span className="block h-1 rounded-full bg-white/10 overflow-hidden mt-2">
          <span
            className="block h-full rounded-full bg-primary"
            style={{ width: `${pct}%` }}
          />
        </span>
      </span>
      <ChevronRight size={18} className="text-text-muted shrink-0" />
    </Link>
  );
}

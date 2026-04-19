"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { useProgress } from "@/providers/ProgressProvider";
import { useSettings } from "@/providers/SettingsProvider";
import { chapters, lessons } from "@/lib/data/mock-data";

export function BookHeroCard() {
  const { progress } = useProgress();
  const { t } = useSettings();

  const allLessons = chapters.flatMap((ch) => lessons[ch.id] || []);
  const totalPages = allLessons.reduce((sum, l) => sum + l.pageCount, 0);

  const hasProgress = Boolean(progress.lastLessonId && progress.lastChapterId);

  const targetLesson = hasProgress
    ? allLessons.find((l) => l.id === progress.lastLessonId) ?? allLessons[0]
    : allLessons[0];
  const targetChapterId = hasProgress
    ? progress.lastChapterId!
    : chapters[0].id;

  if (!targetLesson) return null;

  const lessonsBefore = allLessons.slice(
    0,
    allLessons.findIndex((l) => l.id === targetLesson.id)
  );
  const pagesBeforeCurrent = lessonsBefore.reduce(
    (s, l) => s + l.pageCount,
    0
  );
  const currentGlobalPage = hasProgress
    ? pagesBeforeCurrent + progress.lastPageIndex + 1
    : 1;
  const progressPct = Math.min(100, (currentGlobalPage / totalPages) * 100);

  return (
    <div className="px-5 pb-2">
      <Link
        href={`/lesson/${targetChapterId}/${targetLesson.id}`}
        className="block group"
      >
        <div className="glass-green rounded-[28px] px-6 py-7 text-center transition-transform active:scale-[0.98]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt={t("app_name")}
            className="w-24 h-24 mx-auto mb-4 object-contain"
          />

          <h2 className="text-[22px] font-extrabold text-text-main tracking-tight">
            {t("app_name")}
          </h2>
          <p className="text-[13px] text-text-muted mt-1">{t("book_author")}</p>

          <div className="mt-5 mb-5">
            <div className="h-1.5 w-full rounded-full bg-primary/15 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-[12px] text-text-muted mt-2">
              {t("page")} {currentGlobalPage} / {totalPages}
            </p>
          </div>

          <button
            type="button"
            tabIndex={-1}
            className="w-full py-3.5 rounded-2xl font-bold text-[15px] text-white flex items-center justify-center gap-2 transition-all hover:brightness-110"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))",
              boxShadow:
                "0 4px 20px var(--color-primary-glow), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            <Play size={18} className="ml-0.5" fill="currentColor" />
            {t(hasProgress ? "continue" : "start")}
          </button>
        </div>
      </Link>
    </div>
  );
}

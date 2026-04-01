"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { useProgress } from "@/providers/ProgressProvider";
import { useSettings } from "@/providers/SettingsProvider";
import { GlassCard } from "@/components/ui/GlassCard";
import { chapters, lessons } from "@/lib/data/mock-data";

export function LastViewedCard() {
  const { progress } = useProgress();
  const { t, settings } = useSettings();

  if (!progress.lastLessonId || !progress.lastChapterId) return null;

  const chapter = chapters.find((c) => c.id === progress.lastChapterId);
  const lessonList = lessons[progress.lastChapterId] || [];
  const lesson = lessonList.find((l) => l.id === progress.lastLessonId);

  if (!chapter || !lesson) return null;

  const locale = settings.locale;

  return (
    <div className="px-5 pb-2">
      <Link
        href={`/lesson/${chapter.id}/${lesson.id}`}
        className="block"
      >
        <GlassCard green className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Play size={20} className="text-primary ml-0.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-primary font-medium">{t("continue")}</p>
            <p className="text-sm font-semibold text-text-main truncate">
              {lesson.title[locale]}
            </p>
            <p className="text-xs text-text-muted truncate">
              {chapter.title[locale]} &middot; {t("page")} {progress.lastPageIndex + 1}
            </p>
          </div>
        </GlassCard>
      </Link>
    </div>
  );
}

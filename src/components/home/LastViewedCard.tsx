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
  const locale = settings.locale;

  const hasProgress = Boolean(progress.lastLessonId && progress.lastChapterId);

  const chapter = hasProgress
    ? chapters.find((c) => c.id === progress.lastChapterId)
    : chapters[0];
  const lessonList = chapter ? lessons[chapter.id] || [] : [];
  const lesson = hasProgress
    ? lessonList.find((l) => l.id === progress.lastLessonId)
    : lessonList[0];

  if (!chapter || !lesson) return null;

  const labelKey = hasProgress ? "continue" : "start";
  const subtitle = hasProgress
    ? `${chapter.title[locale]} \u00b7 ${t("page")} ${progress.lastPageIndex + 1}`
    : t("start_subtitle");

  return (
    <div className="px-5 pb-2">
      <Link href={`/lesson/${chapter.id}/${lesson.id}`} className="block">
        <GlassCard green className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Play size={20} className="text-primary ml-0.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-primary font-medium">{t(labelKey)}</p>
            <p className="text-sm font-semibold text-text-main truncate">
              {lesson.title[locale]}
            </p>
            <p className="text-xs text-text-muted truncate">{subtitle}</p>
          </div>
        </GlassCard>
      </Link>
    </div>
  );
}

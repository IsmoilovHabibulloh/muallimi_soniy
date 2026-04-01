"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { useSettings } from "@/providers/SettingsProvider";
import { getChapters, getLessons } from "@/lib/data/data-provider";
import type { Chapter, Lesson } from "@/lib/data/types";

export function ChaptersGrid() {
  const { t, settings } = useSettings();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessonsMap, setLessonsMap] = useState<Record<string, Lesson[]>>({});

  useEffect(() => {
    getChapters().then(setChapters);
  }, []);

  useEffect(() => {
    if (chapters.length === 0) return;
    Promise.all(
      chapters.map(async (ch) => {
        const ls = await getLessons(ch.id);
        return [ch.id, ls] as const;
      })
    ).then((entries) => setLessonsMap(Object.fromEntries(entries)));
  }, [chapters]);

  return (
    <div className="px-5 pb-6">
      <h2 className="text-lg font-semibold text-text-main mb-3">
        {t("all_chapters")}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {chapters.map((ch, i) => {
          const chLessons = lessonsMap[ch.id] || [];
          const firstLesson = chLessons[0];
          const href = firstLesson
            ? `/lesson/${ch.id}/${firstLesson.id}`
            : `/darslar`;

          return (
            <Link key={ch.id} href={href} className="block">
              <GlassCard
                className="h-full animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` } as React.CSSProperties}
              >
                <div className="text-3xl mb-2">{ch.icon}</div>
                <h3 className="text-sm font-semibold text-text-main leading-tight">
                  {ch.title[settings.locale]}
                </h3>
                <p className="text-xs text-text-muted mt-1">
                  {chLessons.length > 0
                    ? `${chLessons.reduce((s, l) => s + l.pageCount, 0)} ${t("pages")}`
                    : t("no_lessons")}
                </p>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { ChapterAccordion } from "@/components/darslar/ChapterAccordion";
import { useSettings } from "@/providers/SettingsProvider";
import { getChapters, getLessons } from "@/lib/data/data-provider";
import { Spinner } from "@/components/ui/Spinner";
import type { Chapter, Lesson } from "@/lib/data/types";

export default function DarslarPage() {
  const { t, settings } = useSettings();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessonsMap, setLessonsMap] = useState<Record<string, Lesson[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChapters().then((chs) => {
      setChapters(chs);
      Promise.all(
        chs.map(async (ch) => {
          const ls = await getLessons(ch.id);
          return [ch.id, ls] as const;
        })
      ).then((entries) => {
        setLessonsMap(Object.fromEntries(entries));
        setLoading(false);
      });
    });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-lg mx-auto px-5 pt-6 pb-6">
      <h1 className="text-2xl font-bold text-text-main mb-4">{t("lessons")}</h1>
      <div className="space-y-3">
        {chapters.map((ch, i) => (
          <ChapterAccordion
            key={ch.id}
            chapter={ch}
            lessons={lessonsMap[ch.id] || []}
            locale={settings.locale}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";
import { ChapterAccordion } from "@/components/darslar/ChapterAccordion";
import { getChapters, getLessons } from "@/lib/data/data-provider";
import { Spinner } from "@/components/ui/Spinner";
import type { Chapter, Lesson } from "@/lib/data/types";

interface Props {
  open: boolean;
  onClose: () => void;
  currentChapterId?: string;
}

export function TocSheet({ open, onClose, currentChapterId }: Props) {
  const { t, settings } = useSettings();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessonsMap, setLessonsMap] = useState<Record<string, Lesson[]>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open || loaded) return;
    getChapters().then((chs) => {
      setChapters(chs);
      Promise.all(
        chs.map(async (ch) => {
          const ls = await getLessons(ch.id);
          return [ch.id, ls] as const;
        })
      ).then((entries) => {
        setLessonsMap(Object.fromEntries(entries));
        setLoaded(true);
      });
    });
  }, [open, loaded]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-bg-dark shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/5 shrink-0">
          <h2 className="text-lg font-bold text-text-main">{t("lessons")}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95"
            aria-label="Close"
          >
            <X size={18} className="text-text-main" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {!loaded ? (
            <Spinner />
          ) : (
            <div className="space-y-3">
              {chapters.map((ch) => (
                <ChapterAccordion
                  key={ch.id}
                  chapter={ch}
                  lessons={lessonsMap[ch.id] || []}
                  locale={settings.locale}
                  defaultOpen={ch.id === currentChapterId}
                />
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

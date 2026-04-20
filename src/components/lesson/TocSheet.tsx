"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, BookOpen, CheckCircle, Volume2 } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";
import { useProgress } from "@/providers/ProgressProvider";
import { getChapters, getLessons } from "@/lib/data/data-provider";
import { Spinner } from "@/components/ui/Spinner";
import type { Chapter, Lesson } from "@/lib/data/types";

interface Props {
  open: boolean;
  onClose: () => void;
  currentChapterId?: string;
  currentLessonId?: string;
  currentLessonPageIndex?: number;
}

export function TocSheet({
  open,
  onClose,
  currentChapterId,
  currentLessonId,
  currentLessonPageIndex,
}: Props) {
  const { t, settings } = useSettings();
  const { isLessonComplete } = useProgress();
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
            <div className="space-y-5">
              {chapters.map((ch) => {
                const chLessons = lessonsMap[ch.id] || [];
                const isCurrentChapter = ch.id === currentChapterId;
                return (
                  <section key={ch.id}>
                    <div
                      className={`flex items-center gap-3 px-2 pb-2 ${
                        isCurrentChapter ? "text-primary" : "text-text-main"
                      }`}
                    >
                      <span className="text-xl">{ch.icon}</span>
                      <h3 className="text-sm font-bold uppercase tracking-wide truncate">
                        {ch.title[settings.locale]}
                      </h3>
                    </div>

                    <div className="glass overflow-hidden">
                      {chLessons.length === 0 && (
                        <p className="text-xs text-text-muted px-4 py-3">
                          {t("no_lessons")}
                        </p>
                      )}
                      {chLessons.map((lesson, lIdx) => {
                        const completed = isLessonComplete(lesson.id);
                        const isCurrentLesson = lesson.id === currentLessonId;
                        return (
                          <div
                            key={lesson.id}
                            className={`px-4 py-3 ${
                              lIdx > 0 ? "border-t border-white/5" : ""
                            }`}
                          >
                            <Link
                              href={`/lesson/${ch.id}/${lesson.id}`}
                              onClick={onClose}
                              className="flex items-center gap-3"
                            >
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                  completed
                                    ? "bg-primary/20"
                                    : isCurrentLesson
                                      ? "bg-primary/15"
                                      : "bg-white/5"
                                }`}
                              >
                                {completed ? (
                                  <CheckCircle size={16} className="text-primary" />
                                ) : (
                                  <BookOpen
                                    size={16}
                                    className={
                                      isCurrentLesson
                                        ? "text-primary"
                                        : "text-text-muted"
                                    }
                                  />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm truncate ${
                                    isCurrentLesson
                                      ? "text-primary font-semibold"
                                      : "text-text-main"
                                  }`}
                                >
                                  {lesson.title[settings.locale]}
                                </p>
                                <p className="text-xs text-text-muted">
                                  {lesson.pageCount} {t("pages")}
                                </p>
                              </div>
                              {lesson.audioUrl && (
                                <Volume2
                                  size={14}
                                  className="text-primary/60 shrink-0"
                                />
                              )}
                            </Link>

                            <div className="flex flex-wrap gap-1.5 mt-2.5 ml-11">
                              {Array.from(
                                { length: lesson.pageCount },
                                (_, i) => {
                                  const isCurrentPage =
                                    isCurrentLesson &&
                                    currentLessonPageIndex === i;
                                  return (
                                    <Link
                                      key={i}
                                      href={`/lesson/${ch.id}/${lesson.id}?page=${i}`}
                                      onClick={onClose}
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium tabular-nums transition-colors ${
                                        isCurrentPage
                                          ? "bg-primary text-white"
                                          : "bg-white/5 text-text-muted hover:bg-primary/20 hover:text-text-main"
                                      }`}
                                      aria-label={`${t("page")} ${i + 1}`}
                                    >
                                      {i + 1}
                                    </Link>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

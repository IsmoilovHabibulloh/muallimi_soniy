"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, CheckCircle2, Volume2 } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";
import { useBookToc } from "@/lib/hooks/useBookToc";
import { chapterIcon } from "./chapter-icons";
import { Spinner } from "@/components/ui/Spinner";
import type { OutlineChapter, OutlineLesson } from "@/lib/data/data-provider";

/* Yagona kitob mundarijasi — /darslar sahifasi ("page") va lesson ichidagi
   TocSheet ("sheet") ikkalasi shu komponentdan quriladi. Qoidalar:
   - Sahifa raqamlari DOIM GLOBAL (1..52) — reader "X / 52" bilan 1:1.
   - Bir darsli boblar BITTA birlashgan qator (nom takrori yo'q).
   - Sheet'da faqat JORIY dars ostida global raqamli sahifa chiplari. */

interface BookTocProps {
  variant: "page" | "sheet";
  /** Sheet: reader'dagi joriy dars (live). Page variantida hook'dagi resume ishlatiladi. */
  currentLessonId?: string;
  /** Sheet: reader'dagi joriy global sahifa (1-asoslangan). */
  currentGlobalPage?: number;
  /** Navigatsiyadan keyin chaqiriladi (sheet yopish uchun). */
  onNavigate?: () => void;
}

function LeaderDots() {
  return (
    <span
      aria-hidden
      className="flex-1 min-w-4 self-center border-b-2 border-dotted border-text-muted/30 mx-1 translate-y-[0.2em]"
    />
  );
}

function PageNumber({
  text,
  isCurrent,
  done,
}: {
  text: string;
  isCurrent: boolean;
  done: boolean;
}) {
  if (isCurrent) {
    return (
      <span className="min-w-7 h-6 px-1.5 rounded-full bg-primary text-white text-xs font-semibold tabular-nums flex items-center justify-center shrink-0">
        {text}
      </span>
    );
  }
  return (
    <span
      className={`text-xs tabular-nums shrink-0 ${
        done ? "text-text-muted" : "text-text-main/80"
      }`}
    >
      {text}
    </span>
  );
}

function PageChips({
  chapterId,
  ol,
  currentGlobalPage,
  onNavigate,
  pageLabel,
}: {
  chapterId: string;
  ol: OutlineLesson;
  currentGlobalPage?: number;
  onNavigate?: () => void;
  pageLabel: string;
}) {
  const count = ol.globalEnd - ol.globalStart + 1;
  return (
    <div className="pl-11 pr-4 pb-3 flex flex-wrap gap-1.5">
      {Array.from({ length: count }, (_, i) => {
        const global = ol.globalStart + i;
        const isCur = global === currentGlobalPage;
        return (
          <Link
            key={global}
            href={`/lesson/${chapterId}/${ol.lesson.id}?page=${i}`}
            onClick={onNavigate}
            aria-label={`${pageLabel} ${global}`}
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-medium tabular-nums transition-colors active:scale-95 ${
              isCur
                ? "bg-primary text-white shadow-[0_2px_10px_var(--color-primary-glow)]"
                : "bg-white/5 text-text-muted hover:bg-primary/20 hover:text-text-main"
            }`}
          >
            {global}
          </Link>
        );
      })}
    </div>
  );
}

export function BookToc({
  variant,
  currentLessonId,
  currentGlobalPage,
  onNavigate,
}: BookTocProps) {
  const { settings, t } = useSettings();
  const { outline, loading, resumeLessonId, resumeGlobalPage, isLessonDone } =
    useBookToc();
  const currentRowRef = useRef<HTMLDivElement>(null);

  const activeLessonId =
    variant === "sheet" ? currentLessonId : resumeLessonId;
  const activeGlobalPage =
    variant === "sheet" ? currentGlobalPage : resumeGlobalPage;

  // Sheet ochilganda joriy qatorni markazga keltirish — slide-in (300ms)
  // tugagach, poyga bo'lmasligi uchun.
  useEffect(() => {
    if (variant !== "sheet" || loading) return;
    const timer = setTimeout(() => {
      currentRowRef.current?.scrollIntoView({
        block: "center",
        behavior: "instant",
      });
    }, 320);
    return () => clearTimeout(timer);
  }, [variant, loading]);

  if (loading || !outline) return <Spinner />;

  const renderRow = (
    oc: OutlineChapter,
    ol: OutlineLesson,
    opts: { combined: boolean }
  ) => {
    const isCurrent = ol.lesson.id === activeLessonId;
    const done = !isCurrent && isLessonDone(ol);
    const Icon = chapterIcon(oc.chapter.id);
    const multiPage = ol.globalEnd > ol.globalStart;
    // Birlashgan qatorda diapazon ("17–20"), ichki qatorda boshlanish raqami.
    const numText = isCurrent
      ? String(activeGlobalPage ?? ol.globalStart)
      : opts.combined && multiPage
        ? `${ol.globalStart}–${ol.globalEnd}`
        : String(ol.globalStart);
    const title = opts.combined
      ? oc.chapter.title[settings.locale]
      : ol.lesson.title[settings.locale];

    return (
      <div key={ol.lesson.id} ref={isCurrent ? currentRowRef : undefined}>
        <Link
          href={`/lesson/${oc.chapter.id}/${ol.lesson.id}`}
          onClick={onNavigate}
          className={`relative flex items-center gap-2.5 pr-4 transition-colors hover:bg-white/10 ${
            opts.combined ? "px-4 min-h-12" : "pl-11 min-h-11"
          } ${isCurrent ? "bg-primary/20" : ""}`}
        >
          {isCurrent && (
            <span className="absolute left-0 inset-y-2 w-[3px] rounded-r-full bg-primary" />
          )}
          {opts.combined && (
            <Icon
              size={18}
              strokeWidth={1.75}
              className={`shrink-0 ${isCurrent ? "text-primary" : "text-text-muted"}`}
            />
          )}
          <span
            className={`text-sm truncate ${
              isCurrent ? "font-semibold text-text-main" : "text-text-main"
            }`}
          >
            {title}
          </span>
          <LeaderDots />
          <span className="flex items-center gap-1.5 shrink-0">
            {ol.lesson.audioUrl && (
              <Volume2 size={12} className="text-primary/60" />
            )}
            {done && (
              <Check size={14} strokeWidth={2.5} className="text-primary" />
            )}
            <PageNumber text={numText} isCurrent={isCurrent} done={done} />
          </span>
        </Link>
        {variant === "sheet" && isCurrent && (
          <PageChips
            chapterId={oc.chapter.id}
            ol={ol}
            currentGlobalPage={activeGlobalPage}
            onNavigate={onNavigate}
            pageLabel={t("page")}
          />
        )}
      </div>
    );
  };

  return (
    <div className="glass rounded-[20px] overflow-hidden divide-y divide-white/5">
      {outline.chapters.map((oc) => {
        const Icon = chapterIcon(oc.chapter.id);
        // Bir darsli bob → bitta birlashgan qator.
        if (oc.lessons.length === 1) {
          return renderRow(oc, oc.lessons[0], { combined: true });
        }
        // Ko'p darsli bob → bo'lim sarlavhasi + ichki dars qatorlari.
        const allDone = oc.lessons.every(
          (ol) => ol.lesson.id !== activeLessonId && isLessonDone(ol)
        );
        return (
          <div key={oc.chapter.id}>
            <div className="flex items-center gap-2.5 px-4 pt-3.5 pb-1.5">
              <Icon
                size={16}
                strokeWidth={1.75}
                className="text-text-muted shrink-0"
              />
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-text-muted truncate">
                {oc.chapter.title[settings.locale]}
              </span>
              <span className="flex-1" />
              {allDone && (
                <CheckCircle2 size={12} className="text-primary shrink-0" />
              )}
              <span className="text-[0.6875rem] tabular-nums text-text-muted shrink-0">
                {oc.globalStart}–{oc.globalEnd}
              </span>
            </div>
            {oc.lessons.map((ol) => renderRow(oc, ol, { combined: false }))}
          </div>
        );
      })}
    </div>
  );
}

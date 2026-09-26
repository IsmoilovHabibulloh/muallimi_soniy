"use client";

import { useEffect, useRef, useState, useCallback, useMemo, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ListOrdered, Languages } from "lucide-react";
import { HorizontalPager } from "@/components/lesson/HorizontalPager";
import { PageIndicator } from "@/components/lesson/PageIndicator";
import { AudioControls } from "@/components/lesson/AudioControls";
import { TocSheet } from "@/components/lesson/TocSheet";
import { hasTarjima } from "@/components/lesson/TarjimaView";
import { SurahPlayContext } from "@/components/lesson/SurahBanner";
import { AYAH_TARJIMA } from "@/lib/data/tarjima";
import { Spinner } from "@/components/ui/Spinner";
import { useSettings } from "@/providers/SettingsProvider";
import { useProgress } from "@/providers/ProgressProvider";
import { useAudio } from "@/lib/audio/useAudio";
import {
  updateMediaSession,
  setMediaSessionHandlers,
  clearMediaSession,
} from "@/lib/audio/mediaSession";
import { getAllBookPages, type BookPage } from "@/lib/data/data-provider";
import type { Element } from "@/lib/data/types";

interface Props {
  params: Promise<{ chapterId: string; lessonId: string }>;
}

/** Ketma-ket ijro bandi — element va u turgan global sahifa indeksi */
interface SeqItem {
  el: Element;
  pageIndex: number;
}

function buildMask(top: boolean, bottom: boolean): string {
  const topPart = top ? "transparent, black 24px" : "black 0";
  const bottomPart = bottom ? "black calc(100% - 24px), transparent" : "black 100%";
  return `linear-gradient(to bottom, ${topPart}, ${bottomPart})`;
}

export default function LessonPage({ params }: Props) {
  const { chapterId, lessonId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const startPageParam = parseInt(searchParams.get("page") || "0", 10) || 0;
  const { settings, t } = useSettings();
  const { setLastViewed, markLessonComplete } = useProgress();

  const [bookPages, setBookPages] = useState<BookPage[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [activeElement, setActiveElement] = useState<Element | null>(null);
  const [loading, setLoading] = useState(true);
  // Ketma-ket ijro — sahifani ham biladi, chunki sura ikki sahifaga
  // bo'linishi mumkin (masalan Layl 37→38, Kofirun 45→46).
  const sequentialRef = useRef<{
    active: boolean;
    index: number;
    items: SeqItem[];
  } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [tarjimaMode, setTarjimaMode] = useState(false);
  const [playingSurah, setPlayingSurah] = useState<number | null>(null);
  const [scrolledFromTop, setScrolledFromTop] = useState(false);
  const [hasMoreBelow, setHasMoreBelow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const audio = useAudio();

  // Fade mask'lar JORIY slide'ning scroll holatiga qarab (har slide o'zi
  // scroll bo'ladi — HorizontalPager'ga qarang).
  useEffect(() => {
    const wrap = scrollRef.current;
    if (!wrap) return;
    const el = wrap.querySelector<HTMLElement>(
      `[data-page-slide="${currentPageIndex}"]`
    );
    if (!el) return;
    const update = () => {
      setScrolledFromTop(el.scrollTop > 4);
      setHasMoreBelow(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [currentPageIndex, loading, bookPages.length]);

  const currentBookPage = bookPages[currentPageIndex];
  const currentLesson = currentBookPage?.lesson;
  const currentChapter = currentBookPage?.chapter;

  const pageElements = useMemo(
    () => bookPages.map((p) => ({ ...p })),
    [bookPages]
  );

  // Load all book pages once and jump to the right starting index
  useEffect(() => {
    getAllBookPages().then((all) => {
      setBookPages(all);
      const startIdx = all.findIndex(
        (p) => p.lesson.id === lessonId && p.lessonPageIndex === startPageParam
      );
      const fallbackIdx = all.findIndex((p) => p.lesson.id === lessonId);
      setCurrentPageIndex(
        startIdx >= 0 ? startIdx : fallbackIdx >= 0 ? fallbackIdx : 0
      );
      setLoading(false);
    });
  }, [lessonId, startPageParam]);

  // Tarjima rejimi sessiyalararo eslab qolinadi (faqat shu qurilmada).
  useEffect(() => {
    try {
      setTarjimaMode(localStorage.getItem("muallimi-tarjima") === "1");
    } catch {}
  }, []);

  const toggleTarjima = useCallback(() => {
    setTarjimaMode((v) => {
      const next = !v;
      try {
        localStorage.setItem("muallimi-tarjima", next ? "1" : "0");
      } catch {}
      return next;
    });
  }, []);

  // Show hint for first-time users
  useEffect(() => {
    if (!loading) {
      const hintSeen = localStorage.getItem("muallimi-hint-seen");
      if (!hintSeen && currentBookPage?.elements.length) {
        setShowHint(true);
        const timer = setTimeout(() => {
          setShowHint(false);
          localStorage.setItem("muallimi-hint-seen", "1");
        }, 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, currentBookPage]);

  // Preload current lesson audio (changes as user crosses lesson boundaries).
  // NOTE: do NOT include `audio` in deps — it's a fresh object on every render
  // and would re-fire this effect, interrupting per-element chunk playback
  // mid-flight (loadAudio internally stops the current source).
  useEffect(() => {
    if (currentLesson?.audioUrl) {
      audio.loadAudio(currentLesson.audioUrl).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLesson?.audioUrl]);

  // Sync URL with current lesson (so refresh / share keeps position).
  // When the user crosses a lesson boundary via prev/next/swipe, we must
  // include `?page=<lessonPageIndex>` so the init effect re-lands on the
  // exact target page — otherwise it would reset to the new lesson's first
  // page (e.g. prev from p.11 → first page of harflar_1 instead of p.10).
  useEffect(() => {
    if (loading || !currentBookPage) return;
    if (
      currentChapter!.id !== chapterId ||
      currentLesson!.id !== lessonId
    ) {
      const expectedPath = `/lesson/${currentChapter!.id}/${currentLesson!.id}?page=${currentBookPage.lessonPageIndex}`;
      router.replace(expectedPath);
    }
  }, [loading, currentBookPage, currentChapter, currentLesson, chapterId, lessonId, router]);

  // Sync settings → audio engine. Tezlik UI'si olib tashlangan — doim 1x
  // (eski saqlangan 0.5x/1.5x qiymatlar ham qo'llanmaydi).
  useEffect(() => {
    audio.setSpeed(1);
    audio.setRepeatCount(settings.repeatCount);
    audio.setLoopMode(settings.loopMode);
  }, [settings.repeatCount, settings.loopMode, audio]);

  // Save progress (per-lesson page index). Darsning OXIRGI sahifasiga
  // yetilganda dars "tugagan" deb belgilanadi (TOC'dagi ✓ shu yerdan).
  useEffect(() => {
    if (!loading && currentBookPage) {
      setLastViewed(
        currentChapter!.id,
        currentLesson!.id,
        currentBookPage.lessonPageIndex
      );
      const next = bookPages[currentPageIndex + 1];
      if (!next || next.lesson.id !== currentLesson!.id) {
        markLessonComplete(currentLesson!.id);
      }
    }
  }, [loading, currentBookPage, currentChapter, currentLesson, setLastViewed, markLessonComplete, bookPages, currentPageIndex]);

  // MediaSession
  useEffect(() => {
    if (activeElement && currentLesson) {
      updateMediaSession({
        title: activeElement.arabic,
        artist: activeElement.uzbek,
        album: currentLesson.title[settings.locale],
      });
    }
    return () => clearMediaSession();
  }, [activeElement, currentLesson, settings.locale]);

  const cancelSequential = useCallback(() => {
    if (sequentialRef.current) {
      sequentialRef.current.active = false;
      sequentialRef.current = null;
    }
    audio.setOnSegmentComplete(null);
    setPlayingSurah(null);
  }, [audio]);

  // Umumiy ketma-ket ijro: bandlar ro'yxatini boshidan oxirigacha o'qiydi
  // va kerak bo'lsa sahifani ham surib boradi.
  const runSequence = useCallback(
    (items: SeqItem[]) => {
      if (items.length === 0) return;
      const fallbackSrc = currentLesson?.audioUrl;
      sequentialRef.current = { active: true, index: 0, items };

      const playAtIndex = (idx: number) => {
        const seq = sequentialRef.current;
        if (!seq || !seq.active) return;
        if (idx >= seq.items.length) {
          seq.active = false;
          sequentialRef.current = null;
          audio.setOnSegmentComplete(null);
          setActiveElement(null);
          setPlayingSurah(null);
          return;
        }
        seq.index = idx;
        const { el, pageIndex } = seq.items[idx];
        // Sura keyingi sahifada davom etsa — o'sha sahifaga o'tamiz.
        // handlePageChange EMAS: u ijroni bekor qilib yuborardi.
        setCurrentPageIndex(pageIndex);
        setActiveElement(el);
        const src = el.audioUrl || fallbackSrc;
        if (src) {
          audio.playSegment(src, el.start, el.end).catch(() => {});
        }
      };

      audio.setOnSegmentComplete(() => {
        const seq = sequentialRef.current;
        if (!seq || !seq.active) return;
        playAtIndex(seq.index + 1);
      });

      playAtIndex(0);
    },
    [audio, currentLesson]
  );

  // Sura raqami → uning barcha element'lari (kitob tartibida, sahifa
  // chegarasidan o'tib). Manba — AYAH_TARJIMA (element → sura/oyat).
  const surahItems = useMemo(() => {
    const map = new Map<number, SeqItem[]>();
    bookPages.forEach((page, pageIndex) => {
      page.elements.forEach((el) => {
        const t = AYAH_TARJIMA[el.id];
        if (!t || !t.s || el.start === el.end) return;
        const list = map.get(t.s);
        if (list) list.push({ el, pageIndex });
        else map.set(t.s, [{ el, pageIndex }]);
      });
    });
    return map;
  }, [bookPages]);

  // Sura nomiga bosilganda — surani boshidan oxirigacha o'qish.
  // Ijrodagi suraning nomi qayta bosilsa — to'xtatadi.
  const handlePlaySurah = useCallback(
    (surah: number, lead?: Element) => {
      const wasPlaying = playingSurah === surah;
      cancelSequential();
      audio.stop();
      setActiveElement(null);
      if (wasPlaying) return;

      const verses = surahItems.get(surah) ?? [];
      if (verses.length === 0) return;
      // Sura nomi audiosi bor sahifalarda (37, 38, 44) avval nom o'qiladi.
      const leadItem: SeqItem[] =
        lead && lead.audioUrl && lead.start !== lead.end
          ? [{ el: lead, pageIndex: currentPageIndex }]
          : [];
      setPlayingSurah(surah);
      runSequence([...leadItem, ...verses]);
    },
    [playingSurah, cancelSequential, audio, surahItems, currentPageIndex, runSequence]
  );

  // AudioControls'dagi play — joriy sahifani boshidan oxirigacha o'qiydi.
  const startSequentialPlay = useCallback(() => {
    if (!currentBookPage) return;
    const fallbackSrc = currentLesson?.audioUrl;
    const items = currentBookPage.elements
      .filter((e) => (e.audioUrl || fallbackSrc) && e.start !== e.end)
      .map((el) => ({ el, pageIndex: currentPageIndex }));
    runSequence(items);
  }, [currentBookPage, currentLesson, currentPageIndex, runSequence]);

  const handleElementClick = useCallback(
    async (el: Element) => {
      cancelSequential();
      setActiveElement(el);
      if (showHint) {
        setShowHint(false);
        localStorage.setItem("muallimi-hint-seen", "1");
      }
      const audioSrc = el.audioUrl || currentLesson?.audioUrl;
      if (audioSrc && el.start !== el.end) {
        try {
          await audio.playSegment(audioSrc, el.start, el.end);
        } catch {
          console.warn("Audio yuklanmadi:", audioSrc);
        }
      }
    },
    [currentLesson, audio, showHint, cancelSequential]
  );

  const handlePrevElement = useCallback(() => {
    if (!currentBookPage || !activeElement) return;
    const idx = currentBookPage.elements.findIndex(
      (e) => e.id === activeElement.id
    );
    if (idx > 0) handleElementClick(currentBookPage.elements[idx - 1]);
  }, [activeElement, currentBookPage, handleElementClick]);

  const handleNextElement = useCallback(() => {
    if (!currentBookPage || !activeElement) return;
    const idx = currentBookPage.elements.findIndex(
      (e) => e.id === activeElement.id
    );
    if (idx < currentBookPage.elements.length - 1)
      handleElementClick(currentBookPage.elements[idx + 1]);
  }, [activeElement, currentBookPage, handleElementClick]);

  // MediaSession handlers
  useEffect(() => {
    setMediaSessionHandlers({
      onPlay: () => audio.resume(),
      onPause: () => audio.pause(),
      onPrev: handlePrevElement,
      onNext: handleNextElement,
    });
  }, [audio, handlePrevElement, handleNextElement]);

  const handlePageChange = useCallback(
    (idx: number) => {
      cancelSequential();
      setCurrentPageIndex(idx);
      setActiveElement(null);
      audio.stop();
    },
    [audio, cancelSequential]
  );

  // Keyboard arrow navigation
  useEffect(() => {
    if (loading || tocOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft" && currentPageIndex > 0) {
        handlePageChange(currentPageIndex - 1);
      } else if (e.key === "ArrowRight" && currentPageIndex < bookPages.length - 1) {
        handlePageChange(currentPageIndex + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, tocOpen, currentPageIndex, bookPages.length, handlePageChange]);

  const surahPlay = useMemo(
    () => ({ onPlaySurah: handlePlaySurah, playingSurah }),
    [handlePlaySurah, playingSurah]
  );

  if (loading || !currentBookPage) return <Spinner />;

  const pageHasTarjima = hasTarjima(currentBookPage.elements);

  const hasAudio = Boolean(
    currentLesson?.audioUrl ||
      currentBookPage.elements.some((e) => e.audioUrl)
  );

  // O'qish foni (sozlamalardagi "Fon") faqat shu ekranga qo'llanadi.
  return (
    <div
      data-reading-bg={settings.readingBg}
      style={{ background: "var(--color-bg-dark)" }}
      className="flex flex-col h-dvh overflow-hidden pb-[env(safe-area-inset-bottom)]"
    >
      {/* Header */}
      <header className="shrink-0 z-30 border-b border-white/10">
        <div className="flex items-center gap-3 px-4 pt-[max(env(safe-area-inset-top),1.25rem)] pb-3 short:pt-1.5 short:pb-1.5 max-w-3xl mx-auto w-full">
          <button
            onClick={() => router.push("/home")}
            className="w-10 h-10 short:w-8 short:h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95"
            aria-label="Back"
          >
            <ArrowLeft size={18} className="text-text-main" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base short:text-sm font-semibold text-text-main truncate">
              {currentLesson?.title[settings.locale] || ""}
            </h1>
            <p className="text-xs text-text-muted truncate short:hidden">
              {currentChapter?.title[settings.locale] || ""}
            </p>
          </div>
          {pageHasTarjima && (
            <button
              onClick={toggleTarjima}
              aria-pressed={tarjimaMode}
              className={`h-10 short:h-8 px-2.5 rounded-xl flex items-center gap-1.5 transition-colors active:scale-95 ${
                tarjimaMode ? "bg-primary/20" : "bg-white/5 hover:bg-white/10"
              }`}
              style={
                tarjimaMode ? { color: "var(--color-primary)" } : undefined
              }
            >
              <Languages
                size={18}
                className={tarjimaMode ? "" : "text-text-main"}
              />
              <span
                className={`hidden sm:inline text-xs font-medium ${
                  tarjimaMode ? "" : "text-text-main"
                }`}
              >
                {t("tarjima")}
              </span>
            </button>
          )}
          <button
            onClick={() => setTocOpen(true)}
            className="w-10 h-10 short:w-8 short:h-8 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95"
            aria-label={t("lessons")}
          >
            <ListOrdered size={20} className="text-text-main" />
          </button>
        </div>
      </header>

      <TocSheet
        open={tocOpen}
        onClose={() => setTocOpen(false)}
        currentLessonId={currentLesson?.id}
        currentGlobalPage={currentPageIndex + 1}
      />

      {/* Pager — markazlashgan o'qish ustuni (desktopda cho'zilib ketmaydi).
          Scroll har slide ichida — bu konteyner scroll EMAS. */}
      <div
        ref={scrollRef}
        className="flex-1 px-3 pt-2 short:pt-1 overflow-hidden min-h-0"
        style={{
          maskImage: buildMask(scrolledFromTop, hasMoreBelow),
          WebkitMaskImage: buildMask(scrolledFromTop, hasMoreBelow),
        }}
      >
        <div className="max-w-xl mx-auto w-full h-full">
          <SurahPlayContext.Provider value={surahPlay}>
            <HorizontalPager
              pages={pageElements}
              currentIndex={currentPageIndex}
              activeElementId={activeElement?.id ?? null}
              onPageChange={handlePageChange}
              onElementClick={handleElementClick}
              onBackgroundClick={() => setActiveElement(null)}
              tarjimaMode={tarjimaMode}
            />
          </SurahPlayContext.Provider>
        </div>
      </div>

      {/* Page indicator (whole-book) */}
      {bookPages.length > 1 && (
        <div className="shrink-0 max-w-xl mx-auto w-full">
          <PageIndicator
            total={bookPages.length}
            current={currentPageIndex}
            onSelect={handlePageChange}
          />
        </div>
      )}

      {/* Audio controls */}
      {hasAudio && (
        <div className="shrink-0 max-w-xl mx-auto w-full">
          <AudioControls
            isPlaying={audio.isPlaying}
            currentTime={audio.currentTime}
            duration={audio.duration}
            bufferProgress={audio.bufferProgress}
            onPlayPause={() => {
              if (audio.isPlaying) {
                audio.pause();
                return;
              }
              if (sequentialRef.current?.active && activeElement) {
                audio.resume();
                return;
              }
              if (activeElement && activeElement.start < activeElement.end) {
                const audioSrc = activeElement.audioUrl || currentLesson?.audioUrl;
                if (audioSrc) {
                  audio.playSegment(audioSrc, activeElement.start, activeElement.end);
                }
                return;
              }
              startSequentialPlay();
            }}
            onPrev={handlePrevElement}
            onNext={handleNextElement}
            onSeek={audio.seek}
          />
        </div>
      )}

      {/* Onboarding hint */}
      {showHint && !activeElement && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40 glass-bright px-5 py-3 animate-fade-in"
          onClick={() => {
            setShowHint(false);
            localStorage.setItem("muallimi-hint-seen", "1");
          }}
        >
          <p className="text-sm text-text-main text-center font-medium">
            Rangli tugmalarni bosib audio eshiting
          </p>
        </div>
      )}
    </div>
  );
}

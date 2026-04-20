"use client";

import { useEffect, useRef, useState, useCallback, useMemo, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ListOrdered } from "lucide-react";
import { HorizontalPager } from "@/components/lesson/HorizontalPager";
import { PageIndicator } from "@/components/lesson/PageIndicator";
import { AudioControls } from "@/components/lesson/AudioControls";
import { TocSheet } from "@/components/lesson/TocSheet";
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
  const { setLastViewed } = useProgress();

  const [bookPages, setBookPages] = useState<BookPage[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [activeElement, setActiveElement] = useState<Element | null>(null);
  const [isFullPlayback, setIsFullPlayback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [scrolledFromTop, setScrolledFromTop] = useState(false);
  const [hasMoreBelow, setHasMoreBelow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const audio = useAudio();

  useEffect(() => {
    const el = scrollRef.current;
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
  }, [currentPageIndex]);

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

  // Preload current lesson audio (changes as user crosses lesson boundaries)
  useEffect(() => {
    if (currentLesson?.audioUrl) {
      audio.loadAudio(currentLesson.audioUrl).catch(() => {});
    }
  }, [currentLesson?.audioUrl, audio]);

  // Sync URL with current lesson (so refresh / share keeps position)
  useEffect(() => {
    if (loading || !currentBookPage) return;
    const expectedPath = `/lesson/${currentChapter!.id}/${currentLesson!.id}`;
    if (
      currentChapter!.id !== chapterId ||
      currentLesson!.id !== lessonId
    ) {
      router.replace(expectedPath);
    }
  }, [loading, currentBookPage, currentChapter, currentLesson, chapterId, lessonId, router]);

  // Sync settings → audio engine
  useEffect(() => {
    audio.setSpeed(settings.speed);
    audio.setRepeatCount(settings.repeatCount);
    audio.setLoopMode(settings.loopMode);
  }, [settings.speed, settings.repeatCount, settings.loopMode, audio]);

  // Save progress (per-lesson page index)
  useEffect(() => {
    if (!loading && currentBookPage) {
      setLastViewed(
        currentChapter!.id,
        currentLesson!.id,
        currentBookPage.lessonPageIndex
      );
    }
  }, [loading, currentBookPage, currentChapter, currentLesson, setLastViewed]);

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

  // Auto-highlight element with audio currentTime (full playback only)
  useEffect(() => {
    if (!isFullPlayback || !audio.isPlaying) {
      if (isFullPlayback && !audio.isPlaying) {
        setIsFullPlayback(false);
        setActiveElement(null);
      }
      return;
    }
    if (!currentBookPage) return;
    const t = audio.currentTime;
    const match = currentBookPage.elements.find(
      (el) => el.start < el.end && t >= el.start && t < el.end
    );
    if (match && match.id !== activeElement?.id) {
      setActiveElement(match);
    }
  }, [audio.currentTime, audio.isPlaying, isFullPlayback, currentBookPage, activeElement?.id]);

  const handleElementClick = useCallback(
    async (el: Element) => {
      setIsFullPlayback(false);
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
    [currentLesson, audio, showHint]
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
      setCurrentPageIndex(idx);
      setActiveElement(null);
      audio.stop();
    },
    [audio]
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

  if (loading || !currentBookPage) return <Spinner />;

  const hasAudio = Boolean(
    currentLesson?.audioUrl ||
      currentBookPage.elements.some((e) => e.audioUrl)
  );

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 pt-6 pb-3 shrink-0 z-30 border-b border-white/10">
        <button
          onClick={() => router.push("/home")}
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft size={18} className="text-text-main" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-semibold text-text-main truncate">
            {currentLesson?.title[settings.locale] || ""}
          </h1>
          <p className="text-xs text-text-muted truncate">
            {currentChapter?.title[settings.locale] || ""}
          </p>
        </div>
        <button
          onClick={() => setTocOpen(true)}
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95"
          aria-label={t("lessons")}
        >
          <ListOrdered size={20} className="text-text-main" />
        </button>
      </header>

      <TocSheet
        open={tocOpen}
        onClose={() => setTocOpen(false)}
        currentChapterId={currentChapter?.id}
        currentLessonId={currentLesson?.id}
        currentLessonPageIndex={currentBookPage?.lessonPageIndex}
      />

      {/* Pager */}
      <div
        ref={scrollRef}
        className="flex-1 px-3 pt-2 overflow-y-auto min-h-0"
        style={{
          maskImage: buildMask(scrolledFromTop, hasMoreBelow),
          WebkitMaskImage: buildMask(scrolledFromTop, hasMoreBelow),
        }}
      >
        <HorizontalPager
          pages={pageElements}
          currentIndex={currentPageIndex}
          activeElementId={activeElement?.id ?? null}
          onPageChange={handlePageChange}
          onElementClick={handleElementClick}
          onBackgroundClick={() => setActiveElement(null)}
        />
      </div>

      {/* Page indicator (whole-book) */}
      {bookPages.length > 1 && (
        <div className="shrink-0">
          <PageIndicator
            total={bookPages.length}
            current={currentPageIndex}
            onSelect={handlePageChange}
          />
        </div>
      )}

      {/* Audio controls */}
      {hasAudio && (
        <div className="shrink-0">
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
              if (!isFullPlayback && activeElement && activeElement.start < activeElement.end) {
                const audioSrc = activeElement.audioUrl || currentLesson?.audioUrl;
                if (audioSrc) {
                  audio.playSegment(audioSrc, activeElement.start, activeElement.end);
                }
              } else if (currentLesson?.audioUrl) {
                setIsFullPlayback(true);
                setActiveElement(null);
                audio.playFull(currentLesson.audioUrl);
              }
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

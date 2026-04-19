"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
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
import { getPages, getLesson, getChapter } from "@/lib/data/data-provider";
import type { Page, Element, Lesson, Chapter } from "@/lib/data/types";

interface Props {
  params: Promise<{ chapterId: string; lessonId: string }>;
}

export default function LessonPage({ params }: Props) {
  const { chapterId, lessonId } = use(params);
  const router = useRouter();
  const { settings, t } = useSettings();
  const { setLastViewed } = useProgress();

  const [pages, setPages] = useState<Page[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [activeElement, setActiveElement] = useState<Element | null>(null);
  const [isFullPlayback, setIsFullPlayback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  const audio = useAudio();

  // Load data
  useEffect(() => {
    Promise.all([
      getPages(lessonId),
      getLesson(lessonId),
      getChapter(chapterId),
    ]).then(([p, l, c]) => {
      setPages(p);
      setLesson(l ?? null);
      setChapter(c ?? null);
      setLoading(false);
    });
  }, [lessonId, chapterId]);

  // Show hint for first-time users
  useEffect(() => {
    if (!loading) {
      const hintSeen = localStorage.getItem("muallimi-hint-seen");
      if (!hintSeen && pages[0]?.elements.length > 0) {
        setShowHint(true);
        const timer = setTimeout(() => {
          setShowHint(false);
          localStorage.setItem("muallimi-hint-seen", "1");
        }, 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, pages]);

  // Preload audio
  useEffect(() => {
    if (lesson?.audioUrl) {
      audio.loadAudio(lesson.audioUrl).catch(() => {});
    }
  }, [lesson?.audioUrl, audio]);

  // Sync settings → audio engine
  useEffect(() => {
    audio.setSpeed(settings.speed);
    audio.setRepeatCount(settings.repeatCount);
    audio.setLoopMode(settings.loopMode);
  }, [settings.speed, settings.repeatCount, settings.loopMode, audio]);

  // Save progress
  useEffect(() => {
    if (!loading) {
      setLastViewed(chapterId, lessonId, currentPageIndex);
    }
  }, [currentPageIndex, chapterId, lessonId, loading, setLastViewed]);

  // MediaSession
  useEffect(() => {
    if (activeElement && lesson) {
      updateMediaSession({
        title: activeElement.arabic,
        artist: activeElement.uzbek,
        album: lesson.title[settings.locale],
      });
    }
    return () => clearMediaSession();
  }, [activeElement, lesson, settings.locale]);

  // Auto-highlight: sync active element with audio currentTime (only in full playback)
  useEffect(() => {
    if (!isFullPlayback || !audio.isPlaying) {
      if (isFullPlayback && !audio.isPlaying) {
        setIsFullPlayback(false);
        setActiveElement(null);
      }
      return;
    }
    const currentPage = pages[currentPageIndex];
    if (!currentPage) return;
    const t = audio.currentTime;
    const match = currentPage.elements.find(
      (el) => el.start < el.end && t >= el.start && t < el.end
    );
    if (match && match.id !== activeElement?.id) {
      setActiveElement(match);
    }
  }, [audio.currentTime, audio.isPlaying, isFullPlayback, currentPageIndex, pages, activeElement?.id]);



  const handleElementClick = useCallback(
    async (el: Element) => {
      setIsFullPlayback(false);
      setActiveElement(el);
      if (showHint) {
        setShowHint(false);
        localStorage.setItem("muallimi-hint-seen", "1");
      }
      const audioSrc = el.audioUrl || lesson?.audioUrl;
      if (audioSrc && el.start !== el.end) {
        try {
          await audio.playSegment(audioSrc, el.start, el.end);
        } catch {
          console.warn("Audio yuklanmadi:", audioSrc);
        }
      }
    },
    [lesson, audio, showHint]
  );

  const handlePrevElement = useCallback(() => {
    const currentPage = pages[currentPageIndex];
    if (!currentPage || !activeElement) return;
    const idx = currentPage.elements.findIndex(
      (e) => e.id === activeElement.id
    );
    if (idx > 0) handleElementClick(currentPage.elements[idx - 1]);
  }, [activeElement, currentPageIndex, pages, handleElementClick]);

  const handleNextElement = useCallback(() => {
    const currentPage = pages[currentPageIndex];
    if (!currentPage || !activeElement) return;
    const idx = currentPage.elements.findIndex(
      (e) => e.id === activeElement.id
    );
    if (idx < currentPage.elements.length - 1)
      handleElementClick(currentPage.elements[idx + 1]);
  }, [activeElement, currentPageIndex, pages, handleElementClick]);

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

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 pt-6 pb-3 shrink-0 z-30">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft size={18} className="text-text-main" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-semibold text-text-main truncate">
            {lesson?.title[settings.locale] || ""}
          </h1>
          <p className="text-xs text-text-muted truncate">
            {chapter?.title[settings.locale] || ""}
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
        currentChapterId={chapterId}
      />

      {/* Pager — scrollable with fade edges */}
      <div
        className="flex-1 px-3 pt-2 overflow-y-auto min-h-0"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 24px, black calc(100% - 24px), transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 24px, black calc(100% - 24px), transparent)",
        }}
      >
        <HorizontalPager
          pages={pages}
          currentIndex={currentPageIndex}
          activeElementId={activeElement?.id ?? null}
          onPageChange={handlePageChange}
          onElementClick={handleElementClick}
          onBackgroundClick={() => setActiveElement(null)}
        />
      </div>

      {/* Page indicator */}
      {pages.length > 1 && (
        <div className="shrink-0">
          <PageIndicator
            total={pages.length}
            current={currentPageIndex}
            onSelect={handlePageChange}
          />
        </div>
      )}

      {/* Audio controls */}
      {(lesson?.audioUrl || pages[currentPageIndex]?.elements.some(e => e.audioUrl)) && (
        <div className="shrink-0"><AudioControls
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
              const audioSrc = activeElement.audioUrl || lesson?.audioUrl;
              if (audioSrc) {
                audio.playSegment(audioSrc, activeElement.start, activeElement.end);
              }
            } else if (lesson?.audioUrl) {
              setIsFullPlayback(true);
              setActiveElement(null);
              audio.playFull(lesson.audioUrl);
            }
          }}
          onPrev={handlePrevElement}
          onNext={handleNextElement}
          onSeek={audio.seek}
        /></div>
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

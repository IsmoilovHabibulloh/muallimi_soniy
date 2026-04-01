"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { HorizontalPager } from "@/components/lesson/HorizontalPager";
import { PageIndicator } from "@/components/lesson/PageIndicator";
import { ElementBottomSheet } from "@/components/lesson/ElementBottomSheet";
import { AudioControls } from "@/components/lesson/AudioControls";
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
  const { settings } = useSettings();
  const { setLastViewed } = useProgress();

  const [pages, setPages] = useState<Page[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [activeElement, setActiveElement] = useState<Element | null>(null);
  const [loading, setLoading] = useState(true);

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

  // Sequential: auto-play next element
  useEffect(() => {
    audio.setOnSegmentComplete(() => {
      if (!settings.sequentialMode || !activeElement) return;
      const currentPage = pages[currentPageIndex];
      if (!currentPage) return;
      const idx = currentPage.elements.findIndex(
        (e) => e.id === activeElement.id
      );
      if (idx >= 0 && idx < currentPage.elements.length - 1) {
        handleElementClick(currentPage.elements[idx + 1]);
      } else {
        setActiveElement(null);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeElement, currentPageIndex, pages, settings.sequentialMode]);

  const handleElementClick = useCallback(
    async (el: Element) => {
      setActiveElement(el);
      const audioSrc = el.audioUrl || lesson?.audioUrl;
      if (audioSrc) {
        try {
          await audio.playSegment(audioSrc, el.start, el.end);
        } catch {
          // silent
        }
      }
    },
    [lesson, audio]
  );

  const handleReplay = useCallback(() => {
    if (activeElement) {
      const audioSrc = activeElement.audioUrl || lesson?.audioUrl;
      if (audioSrc) {
        audio.playSegment(audioSrc, activeElement.start, activeElement.end);
      }
    }
  }, [activeElement, lesson, audio]);

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
    <div className="flex flex-col min-h-dvh">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 glass rounded-none border-t-0 border-x-0 sticky top-0 z-30">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95"
        >
          <ArrowLeft size={18} className="text-text-main" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-text-main truncate">
            {lesson?.title[settings.locale] || ""}
          </h1>
          <p className="text-xs text-text-muted truncate">
            {chapter?.title[settings.locale] || ""}
          </p>
        </div>
      </header>

      {/* Pager */}
      <div className="flex-1 px-3 pt-2">
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
        <PageIndicator
          total={pages.length}
          current={currentPageIndex}
          onSelect={handlePageChange}
        />
      )}

      {/* Audio controls */}
      {(lesson?.audioUrl || pages[currentPageIndex]?.elements.some(e => e.audioUrl)) && (
        <AudioControls
          isPlaying={audio.isPlaying}
          currentTime={audio.currentTime}
          duration={audio.duration}
          bufferProgress={audio.bufferProgress}
          onPlayPause={() => {
            const audioSrc = activeElement?.audioUrl || lesson?.audioUrl;
            if (activeElement && audioSrc) {
              if (audio.isPlaying) {
                audio.pause();
              } else {
                audio.playSegment(
                  audioSrc,
                  activeElement.start,
                  activeElement.end
                );
              }
            } else {
              audio.togglePlayPause();
            }
          }}
          onPrev={handlePrevElement}
          onNext={handleNextElement}
          onSeek={audio.seek}
        />
      )}

      {/* Bottom sheet */}
      {activeElement && (
        <ElementBottomSheet
          element={activeElement}
          repeatIndex={audio.repeatIndex}
          isPlaying={audio.isPlaying}
          onReplay={handleReplay}
          onClose={() => {
            setActiveElement(null);
            audio.stop();
          }}
        />
      )}
    </div>
  );
}

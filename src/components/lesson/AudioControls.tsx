"use client";

import { Play, Pause, SkipBack, SkipForward, Repeat } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";

interface Props {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  bufferProgress: number;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
}

function formatTime(s: number) {
  const min = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

/* Progress chizig'i — vizual ingichka, lekin bosish maydoni katta (py-2). */
function ProgressBar({
  progress,
  bufferProgress,
  duration,
  onSeek,
}: {
  progress: number;
  bufferProgress: number;
  duration: number;
  onSeek: (time: number) => void;
}) {
  return (
    <div
      className="relative py-2 cursor-pointer flex-1 min-w-0"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        onSeek(Math.max(0, Math.min(1, pct)) * duration);
      }}
    >
      <div className="relative h-1 rounded-full bg-white/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-white/10"
          style={{ width: `${bufferProgress}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50"
          style={{ left: `${progress}%`, marginLeft: -6 }}
        />
      </div>
    </div>
  );
}

/* Bitta qatorli ixcham player: prev/play/next + vaqt + progress + vaqt +
   loop. Tezlik tugmalari yo'q (foydalanuvchi qarori 2026-06-10). `short`
   (telefon yonbosh) rejimida o'lchamlar kichrayadi. */
export function AudioControls({
  isPlaying,
  currentTime,
  duration,
  bufferProgress,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
}: Props) {
  const { settings, setLoopMode, t } = useSettings();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="glass rounded-2xl short:rounded-xl px-3 py-1.5 short:py-1 mx-4 short:mx-3 mb-3 short:mb-1.5 flex items-center gap-2">
      <button
        onClick={onPrev}
        aria-label="Oldingi element"
        className="p-1.5 text-text-muted hover:text-text-main transition-colors shrink-0"
      >
        <SkipBack size={18} />
      </button>
      <button
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pauza" : "Ijro"}
        className="w-10 h-10 short:w-8 short:h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors active:scale-95 shrink-0"
      >
        {isPlaying ? (
          <Pause size={18} className="text-bg-dark" />
        ) : (
          <Play size={18} className="text-bg-dark ml-0.5" />
        )}
      </button>
      <button
        onClick={onNext}
        aria-label="Keyingi element"
        className="p-1.5 text-text-muted hover:text-text-main transition-colors shrink-0"
      >
        <SkipForward size={18} />
      </button>

      <span className="text-[0.6875rem] text-text-muted tabular-nums shrink-0 w-8 text-right">
        {formatTime(currentTime)}
      </span>
      <ProgressBar
        progress={progress}
        bufferProgress={bufferProgress}
        duration={duration}
        onSeek={onSeek}
      />
      <span className="text-[0.6875rem] text-text-muted tabular-nums shrink-0 w-8">
        {formatTime(duration)}
      </span>

      <button
        onClick={() => setLoopMode(!settings.loopMode)}
        className={`p-1.5 rounded-lg transition-all shrink-0 ${
          settings.loopMode
            ? "bg-primary/20 text-primary"
            : "text-text-muted hover:text-text-secondary"
        }`}
        title={t("loop")}
        aria-label={t("loop")}
      >
        <Repeat size={16} />
      </button>
    </div>
  );
}

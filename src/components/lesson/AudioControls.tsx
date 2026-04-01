"use client";

import { Play, Pause, SkipBack, SkipForward, Repeat, ListOrdered } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";
import type { PlaybackSpeed } from "@/lib/data/types";

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

const SPEEDS: PlaybackSpeed[] = [0.5, 1.0, 1.5];

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
  const { settings, setSpeed, setLoopMode, setSequentialMode, t } =
    useSettings();

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="glass rounded-2xl p-4 mx-4 mb-3">
      {/* Progress bar */}
      <div className="relative mb-3">
        <div
          className="h-1 rounded-full bg-white/10 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            onSeek(pct * duration);
          }}
        >
          {/* Buffer */}
          <div
            className="absolute h-1 rounded-full bg-white/10"
            style={{ width: `${bufferProgress}%` }}
          />
          {/* Playback */}
          <div
            className="absolute h-1 rounded-full bg-primary"
            style={{ width: `${progress}%` }}
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50"
            style={{ left: `${progress}%`, marginLeft: -6 }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-text-muted mt-1.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={onPrev}
          className="text-text-muted hover:text-text-main transition-colors"
        >
          <SkipBack size={20} />
        </button>
        <button
          onClick={onPlayPause}
          className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors active:scale-95"
        >
          {isPlaying ? (
            <Pause size={20} className="text-bg-dark" />
          ) : (
            <Play size={20} className="text-bg-dark ml-0.5" />
          )}
        </button>
        <button
          onClick={onNext}
          className="text-text-muted hover:text-text-main transition-colors"
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Speed + Loop + Sequential */}
      <div className="flex items-center justify-between mt-3">
        {/* Speed */}
        <div className="flex items-center gap-1">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                settings.speed === s
                  ? "bg-primary/20 text-primary"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Loop & Sequential */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLoopMode(!settings.loopMode)}
            className={`p-1.5 rounded-lg transition-all ${
              settings.loopMode
                ? "bg-primary/20 text-primary"
                : "text-text-muted hover:text-text-secondary"
            }`}
            title={t("loop")}
          >
            <Repeat size={16} />
          </button>
          <button
            onClick={() => setSequentialMode(!settings.sequentialMode)}
            className={`p-1.5 rounded-lg transition-all ${
              settings.sequentialMode
                ? "bg-primary/20 text-primary"
                : "text-text-muted hover:text-text-secondary"
            }`}
            title={t("sequential")}
          >
            <ListOrdered size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

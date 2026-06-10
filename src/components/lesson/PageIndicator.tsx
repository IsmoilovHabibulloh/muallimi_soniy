"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef } from "react";

interface Props {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export function PageIndicator({ total, current, onSelect }: Props) {
  const canPrev = current > 0;
  const canNext = current < total - 1;
  const barRef = useRef<HTMLDivElement>(null);

  const handleSeek = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const bar = barRef.current;
      if (!bar) return;
      const rect = bar.getBoundingClientRect();
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const idx = Math.round(ratio * (total - 1));
      if (idx !== current) onSelect(idx);
    },
    [total, current, onSelect]
  );

  const progressPct = ((current + 1) / total) * 100;

  return (
    <div className="flex items-center gap-3 short:gap-2 px-5 short:px-3 py-2 short:py-1">
      <button
        onClick={() => canPrev && onSelect(current - 1)}
        disabled={!canPrev}
        className="w-9 h-9 short:w-7 short:h-7 rounded-full bg-white/5 flex items-center justify-center transition-all hover:bg-white/10 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 shrink-0"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} className="text-text-main" />
      </button>

      <div
        ref={barRef}
        onClick={handleSeek}
        onTouchStart={handleSeek}
        className="flex-1 h-2 rounded-full bg-white/10 cursor-pointer relative group"
        role="slider"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current + 1}
      >
        <div
          className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPct}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-md shadow-primary/40 transition-all duration-300 ease-out group-hover:scale-110"
          style={{ left: `${progressPct}%` }}
        />
      </div>

      <p className="text-[0.6875rem] text-text-muted tabular-nums shrink-0 min-w-[3.25rem] text-center">
        {current + 1} / {total}
      </p>

      <button
        onClick={() => canNext && onSelect(current + 1)}
        disabled={!canNext}
        className="w-9 h-9 short:w-7 short:h-7 rounded-full bg-white/5 flex items-center justify-center transition-all hover:bg-white/10 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 shrink-0"
        aria-label="Next page"
      >
        <ChevronRight size={18} className="text-text-main" />
      </button>
    </div>
  );
}

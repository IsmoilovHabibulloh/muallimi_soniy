"use client";

interface Props {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export function PageIndicator({ total, current, onSelect }: Props) {
  return (
    <div className="flex items-center justify-center gap-1.5 py-3">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`rounded-full transition-all duration-200 ${
            i === current
              ? "w-6 h-2 bg-primary"
              : "w-2 h-2 bg-white/20 hover:bg-white/30"
          }`}
        />
      ))}
    </div>
  );
}

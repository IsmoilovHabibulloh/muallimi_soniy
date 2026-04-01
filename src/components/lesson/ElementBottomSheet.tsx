"use client";

import { X, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useSettings } from "@/providers/SettingsProvider";
import type { Element } from "@/lib/data/types";
import { ELEMENT_COLORS, ELEMENT_LABELS } from "@/lib/data/types";

interface Props {
  element: Element;
  repeatIndex: number;
  isPlaying: boolean;
  onReplay: () => void;
  onClose: () => void;
}

export function ElementBottomSheet({
  element,
  repeatIndex,
  isPlaying,
  onReplay,
  onClose,
}: Props) {
  const { settings, t } = useSettings();
  const color = ELEMENT_COLORS[element.type];
  const label = ELEMENT_LABELS[element.type][settings.locale];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-slide-up">
      <div className="max-w-lg mx-auto px-4 pb-4">
        <div className="glass-green rounded-2xl p-5 relative">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X size={16} className="text-text-muted" />
          </button>

          {/* Arabic */}
          <p
            className="arabic-text text-center mb-2"
            style={{
              fontSize:
                element.type === "harf"
                  ? 52
                  : element.type === "bogin"
                    ? 42
                    : element.type === "soz"
                      ? 34
                      : 26,
            }}
          >
            {element.arabic}
          </p>

          {/* Uzbek translation */}
          <p className="text-center text-text-secondary text-sm mb-3">
            {element.uzbek}
          </p>

          {/* Badge + Repeat indicator */}
          <div className="flex items-center justify-center gap-4">
            <Badge label={label} color={color} />

            {/* Repeat dots */}
            <div className="flex items-center gap-1">
              {Array.from({ length: settings.repeatCount }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i < repeatIndex
                      ? "bg-primary scale-110"
                      : "bg-white/20"
                  }`}
                  style={
                    i === repeatIndex - 1 && isPlaying
                      ? { animation: "pulse-glow 0.6s ease-in-out" }
                      : undefined
                  }
                />
              ))}
            </div>
          </div>

          {/* Replay button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={onReplay}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition-colors active:scale-95"
            >
              <RotateCcw size={14} />
              {t("replay")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

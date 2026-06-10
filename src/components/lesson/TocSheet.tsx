"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";
import { useBookToc } from "@/lib/hooks/useBookToc";
import { BookToc } from "@/components/toc/BookToc";

interface Props {
  open: boolean;
  onClose: () => void;
  currentLessonId?: string;
  /** Reader'dagi joriy GLOBAL sahifa (1-asoslangan) — "X / 52" bilan aynan. */
  currentGlobalPage?: number;
}

/* Mundarija drawer — o'ngdan slide-in. Ichki ro'yxat /darslar bilan
   AYNAN bir xil (BookToc); farq: header'da joriy pozitsiya + progress
   chizig'i, joriy dars ostida global raqamli sahifa chiplari. */
export function TocSheet({
  open,
  onClose,
  currentLessonId,
  currentGlobalPage,
}: Props) {
  const { t } = useSettings();
  const { outline } = useBookToc();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const total = outline?.totalPages ?? 0;
  const pct =
    total && currentGlobalPage
      ? Math.min(100, (currentGlobalPage / total) * 100)
      : 0;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-bg-dark shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="shrink-0 border-b border-white/5">
          <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-3">
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-text-main">
                {t("contents")}
              </h2>
              {Boolean(currentGlobalPage && total) && (
                <p className="text-xs text-text-muted tabular-nums">
                  {t("page")} {currentGlobalPage} / {total}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors active:scale-95 shrink-0"
              aria-label="Close"
            >
              <X size={18} className="text-text-main" />
            </button>
          </div>
          {/* Reader indikatorining vizual aksi — drawer ochilganda pozitsiya darhol his qilinadi */}
          <div className="h-1 bg-white/10">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {open && (
            <BookToc
              variant="sheet"
              currentLessonId={currentLessonId}
              currentGlobalPage={currentGlobalPage}
              onNavigate={onClose}
            />
          )}
        </div>
      </aside>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { Languages, Minus, Plus, X } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";
import { READING_BGS, FONT_SIZES, ARABIC_FONTS } from "@/lib/reading-bg";

interface Props {
  open: boolean;
  onClose: () => void;
  /** Joriy sahifada tarjima bormi (suralar bo'limi) */
  tarjimaAvailable: boolean;
  tarjimaMode: boolean;
  onToggleTarjima: () => void;
}

/**
 * "O'qish sozlamalari" — dars ekranining pastki oynasi.
 *
 * Foydalanuvchi 2026-09-27 da so'radi: o'qish sozlamalari uchun
 * sozlamalar sahifasiga chiqib-kirib yurmasin. Shu sababli matn
 * o'lchami, fon, takrorlash soni va tarjima shu yerda ham boshqariladi.
 *
 * Bir xil `useSettings` state'ini ishlatadi — bu yerdagi o'zgarish
 * /sozlamalar sahifasida ham ko'rinadi va saqlanadi. Sozlamalarni
 * ikki joyda alohida saqlamang.
 *
 * Lesson sahifasining ildiz div'i ICHIDA render qilinadi (portal EMAS) —
 * shunda `data-reading-bg` palitrasini meros qilib oladi va tanlangan
 * fon oynaning o'zida ham darhol ko'rinadi.
 */
export function ReadingSettingsSheet({
  open,
  onClose,
  tarjimaAvailable,
  tarjimaMode,
  onToggleTarjima,
}: Props) {
  const {
    t,
    settings,
    setFontSize,
    setReadingBg,
    setRepeatCount,
    setArabicFont,
  } = useSettings();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center sm:justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("reading_settings")}
        className="relative w-full sm:max-w-md glass rounded-t-[28px] sm:rounded-[28px] max-h-[85dvh] overflow-y-auto animate-slide-up pb-[calc(env(safe-area-inset-bottom)+1.5rem)]"
        style={{ background: "var(--color-bg-dark)" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="flex items-center justify-between px-5 pt-2 pb-3">
          <h2 className="text-base font-semibold text-text-main">
            {t("reading_settings")}
          </h2>
          <button
            onClick={onClose}
            aria-label={t("close")}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95"
          >
            <X size={16} className="text-text-muted" />
          </button>
        </div>

        <div className="px-5 space-y-5">
          {/* ── Matn o'lchami ── */}
          <section>
            <h3 className="text-xs font-medium text-text-muted mb-2">
              {t("font_size")}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {FONT_SIZES.map((fs) => {
                const selected = settings.fontSize === fs.value;
                return (
                  <button
                    key={fs.value}
                    onClick={() => setFontSize(fs.value)}
                    className={`flex flex-col items-center gap-1 py-2.5 rounded-xl font-medium transition-all active:scale-95 ${
                      selected
                        ? "bg-primary/20 text-primary border border-primary/40"
                        : "bg-white/5 text-text-muted border border-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span
                      className="h-6 flex items-end font-bold leading-none"
                      style={{ fontSize: `${fs.rem}rem` }}
                    >
                      A
                    </span>
                    <span className="text-[0.625rem] opacity-80">
                      {t(fs.labelKey)}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Arab shrifti (suralar) ── */}
          <section>
            <h3 className="text-xs font-medium text-text-muted mb-2">
              {t("arabic_font")}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {ARABIC_FONTS.map((f) => {
                const selected = settings.arabicFont === f.value;
                return (
                  <button
                    key={f.value}
                    onClick={() => setArabicFont(f.value)}
                    className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl transition-all active:scale-95 ${
                      selected
                        ? "bg-primary/20 border border-primary/40"
                        : "bg-white/5 border border-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span
                      dir="rtl"
                      className="text-[1.05rem] leading-[1.9] text-center"
                      style={{
                        fontFamily: f.stack,
                        color: "var(--color-text-main)",
                      }}
                    >
                      {f.sample}
                    </span>
                    <span
                      className={`text-[0.625rem] leading-tight ${
                        selected ? "text-primary font-medium" : "text-text-muted"
                      }`}
                    >
                      {f.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[0.625rem] text-text-muted mt-1.5">
              {t("arabic_font_desc")}
            </p>
          </section>

          {/* ── Fon ── */}
          <section>
            <h3 className="text-xs font-medium text-text-muted mb-2">
              {t("background")}
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {READING_BGS.map((bg) => {
                const selected = settings.readingBg === bg.value;
                return (
                  <button
                    key={bg.value}
                    onClick={() => setReadingBg(bg.value)}
                    className={`flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl transition-all active:scale-95 ${
                      selected
                        ? "bg-primary/20 border border-primary/40"
                        : "bg-white/5 border border-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border border-black/10"
                      style={{ background: bg.bg, color: bg.fg }}
                    >
                      A
                    </span>
                    <span
                      className={`text-[0.5625rem] leading-tight text-center ${
                        selected ? "text-primary font-medium" : "text-text-muted"
                      }`}
                    >
                      {t(bg.labelKey)}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Takrorlash soni ── */}
          <section>
            <h3 className="text-xs font-medium text-text-muted mb-2">
              {t("repeat_count")}
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setRepeatCount(Math.max(1, settings.repeatCount - 1))
                }
                disabled={settings.repeatCount <= 1}
                aria-label={t("decrease")}
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-main disabled:opacity-30 active:scale-95 transition-all hover:bg-white/10"
              >
                <Minus size={18} />
              </button>
              <div className="flex-1 rounded-xl bg-white/5 border border-white/5 py-1.5 text-center">
                <span className="text-xl font-bold text-primary tabular-nums">
                  {settings.repeatCount}
                </span>
                <span className="text-sm font-semibold text-primary/70">×</span>
              </div>
              <button
                onClick={() =>
                  setRepeatCount(Math.min(10, settings.repeatCount + 1))
                }
                disabled={settings.repeatCount >= 10}
                aria-label={t("increase")}
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-main disabled:opacity-30 active:scale-95 transition-all hover:bg-white/10"
              >
                <Plus size={18} />
              </button>
            </div>
            <p className="text-[0.625rem] text-text-muted mt-1.5">
              {t("repeat_reset_hint")}
            </p>
          </section>

          {/* ── Tarjima (faqat suralar bo'limida) ── */}
          {tarjimaAvailable && (
            <section>
              <button
                onClick={onToggleTarjima}
                aria-pressed={tarjimaMode}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl border transition-all active:scale-[0.98] ${
                  tarjimaMode
                    ? "bg-primary/20 border-primary/40"
                    : "bg-white/5 border-white/5 hover:bg-white/10"
                }`}
              >
                <Languages
                  size={18}
                  className={tarjimaMode ? "text-primary" : "text-text-muted"}
                />
                <span
                  className={`flex-1 text-left text-sm font-medium ${
                    tarjimaMode ? "text-primary" : "text-text-main"
                  }`}
                >
                  {t("tarjima")}
                </span>
                <span
                  className="w-10 h-6 rounded-full flex items-center px-0.5 transition-colors"
                  style={{
                    background: tarjimaMode
                      ? "var(--color-primary)"
                      : "var(--color-border-card)",
                  }}
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      tarjimaMode ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </span>
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

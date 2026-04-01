"use client";

import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";
import { GlassCard } from "@/components/ui/GlassCard";
import { LEGAL_CONTENT } from "@/lib/data/legal-content";
import type { Locale, FontSize } from "@/lib/data/types";

const LANGUAGES: { value: Locale; label: string }[] = [
  { value: "uz-latn", label: "Oʻzbekcha (lotin)" },
  { value: "uz-cyrl", label: "Ўзбекча (кирилл)" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" },
];

const FONT_SIZES: { value: FontSize; label: string }[] = [
  { value: "small", label: "A" },
  { value: "medium", label: "A" },
  { value: "large", label: "A" },
];

const ABOUT_LABELS: Record<string, { title: string; items: { icon: string; label: string; sub?: string; key?: "privacyPolicy" | "termsOfUse" | "aboutApp" }[] }> = {
  "uz-latn": {
    title: "Ilova haqida",
    items: [
      { icon: "📖", label: "Muallimi Soniy", sub: "v1.0.0 • MYSTAR MChJ" },
      { icon: "🔒", label: "Maxfiylik siyosati", key: "privacyPolicy" },
      { icon: "📋", label: "Foydalanish shartlari", key: "termsOfUse" },
      { icon: "ℹ️", label: "Dastur haqida", key: "aboutApp" },
    ],
  },
  "uz-cyrl": {
    title: "Илова ҳақида",
    items: [
      { icon: "📖", label: "Муаллими Соний", sub: "v1.0.0 • MYSTAR МЧЖ" },
      { icon: "🔒", label: "Махфийлик сиёсати", key: "privacyPolicy" },
      { icon: "📋", label: "Фойдаланиш шартлари", key: "termsOfUse" },
      { icon: "ℹ️", label: "Дастур ҳақида", key: "aboutApp" },
    ],
  },
  ru: {
    title: "О приложении",
    items: [
      { icon: "📖", label: "Муаллими Соний", sub: "v1.0.0 • MYSTAR ООО" },
      { icon: "🔒", label: "Политика конфиденциальности", key: "privacyPolicy" },
      { icon: "📋", label: "Условия использования", key: "termsOfUse" },
      { icon: "ℹ️", label: "О программе", key: "aboutApp" },
    ],
  },
  en: {
    title: "About App",
    items: [
      { icon: "📖", label: "Muallimi Soniy", sub: "v1.0.0 • MYSTAR LLC" },
      { icon: "🔒", label: "Privacy Policy", key: "privacyPolicy" },
      { icon: "📋", label: "Terms of Use", key: "termsOfUse" },
      { icon: "ℹ️", label: "About", key: "aboutApp" },
    ],
  },
};

export default function SozlamalarPage() {
  const { t, settings, setRepeatCount, setLocale, setFontSize, setTheme } = useSettings();
  const [openModal, setOpenModal] = useState<"privacyPolicy" | "termsOfUse" | "aboutApp" | null>(null);

  const aboutData = ABOUT_LABELS[settings.locale] || ABOUT_LABELS["uz-latn"];
  const legalContent = LEGAL_CONTENT[settings.locale] || LEGAL_CONTENT["uz-latn"];
  const modalContent = openModal ? legalContent[openModal] : null;
  const modalItem = openModal ? aboutData.items.find((i) => i.key === openModal) : null;

  return (
    <div className="max-w-lg mx-auto px-5 pt-6 pb-6">
      <h1 className="text-2xl font-bold text-text-main mb-4">{t("settings")}</h1>

      <div className="space-y-4">
        {/* Repeat Count */}
        <GlassCard>
          <label className="text-sm font-medium text-text-secondary">
            {t("repeat_count")}
          </label>
          <div className="flex items-center gap-4 mt-3">
            <input
              type="range"
              min={1}
              max={10}
              value={settings.repeatCount}
              onChange={(e) => setRepeatCount(Number(e.target.value))}
              className="flex-1 accent-primary h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg"
            />
            <span className="text-lg font-bold text-primary w-8 text-center">
              {settings.repeatCount}
            </span>
          </div>
        </GlassCard>

        {/* Language */}
        <GlassCard>
          <label className="text-sm font-medium text-text-secondary">
            {t("language")}
          </label>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.value}
                onClick={() => setLocale(lang.value)}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  settings.locale === lang.value
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "bg-white/5 text-text-muted border border-white/5 hover:bg-white/10"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Theme */}
        <GlassCard>
          <label className="text-sm font-medium text-text-secondary">
            {t("theme")}
          </label>
          <div className="flex gap-2 mt-3">
            {([
              { value: "dark" as const, icon: "🌙" },
              { value: "light" as const, icon: "☀️" },
              { value: "system" as const, icon: "📱" },
            ]).map((th) => (
              <button
                key={th.value}
                onClick={() => setTheme(th.value)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                  settings.theme === th.value
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "bg-white/5 text-text-muted border border-white/5 hover:bg-white/10"
                }`}
              >
                <span>{th.icon}</span>
                {t(th.value)}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Font Size */}
        <GlassCard>
          <label className="text-sm font-medium text-text-secondary">
            {t("font_size")}
          </label>
          <div className="flex gap-2 mt-3">
            {FONT_SIZES.map((fs) => (
              <button
                key={fs.value}
                onClick={() => setFontSize(fs.value)}
                className={`flex-1 py-2.5 rounded-xl font-medium transition-all ${
                  settings.fontSize === fs.value
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "bg-white/5 text-text-muted border border-white/5 hover:bg-white/10"
                }`}
                style={{
                  fontSize: fs.value === "small" ? 14 : fs.value === "medium" ? 16 : 20,
                }}
              >
                {fs.label}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* About App */}
        <div>
          <h2 className="text-lg font-semibold text-text-main mb-3 mt-2">
            {aboutData.title}
          </h2>
          <GlassCard className="!p-0 overflow-hidden">
            {aboutData.items.map((item, i) => (
              <button
                key={i}
                onClick={() => item.key && setOpenModal(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-white/5 transition-colors ${
                  i < aboutData.items.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-main">{item.label}</p>
                  {item.sub && (
                    <p className="text-xs text-text-muted">{item.sub}</p>
                  )}
                </div>
                {item.key && (
                  <ChevronRight size={16} className="text-text-muted shrink-0" />
                )}
              </button>
            ))}
          </GlassCard>
        </div>
      </div>

      {/* Modal */}
      {openModal && modalContent && modalItem && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOpenModal(null)}
        >
          <div
            className="glass-green max-w-lg w-full mx-4 mb-4 sm:mb-0 rounded-2xl max-h-[85vh] flex flex-col animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/10 shrink-0">
              <h3 className="text-base font-semibold text-text-main">
                {modalItem.icon} {modalItem.label}
              </h3>
              <button
                onClick={() => setOpenModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={16} className="text-text-muted" />
              </button>
            </div>
            <div className="px-5 py-4 overflow-y-auto">
              <pre className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap font-sans">
                {modalContent}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

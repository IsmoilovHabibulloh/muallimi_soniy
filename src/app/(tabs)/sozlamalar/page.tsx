"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Check,
  ChevronRight,
  FileText,
  Info,
  Languages,
  Minus,
  MonitorSmartphone,
  Moon,
  Plus,
  Repeat2,
  ShieldCheck,
  Sun,
  SunMoon,
  Type,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";
import { GlassCard } from "@/components/ui/GlassCard";
import { LEGAL_CONTENT } from "@/lib/data/legal-content";
import type { Locale, FontSize, Theme } from "@/lib/data/types";

const APP_VERSION = "1.0.0";

const LANGUAGES: { value: Locale; label: string; sub?: string }[] = [
  { value: "uz-latn", label: "Oʻzbekcha", sub: "Lotin yozuvi" },
  { value: "uz-cyrl", label: "Ўзбекча", sub: "Кирилл ёзуви" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" },
];

const THEMES: { value: Theme; icon: LucideIcon; labelKey: string }[] = [
  { value: "light", icon: Sun, labelKey: "light" },
  { value: "dark", icon: Moon, labelKey: "dark" },
  { value: "system", icon: MonitorSmartphone, labelKey: "system" },
];

const FONT_SIZES: { value: FontSize; rem: number; labelKey: string }[] = [
  { value: "small", rem: 0.8125, labelKey: "small" },
  { value: "medium", rem: 1, labelKey: "medium" },
  { value: "large", rem: 1.25, labelKey: "large" },
];

type LegalKey = "privacyPolicy" | "termsOfUse" | "aboutApp";

const LEGAL_ITEMS: { key: LegalKey; icon: LucideIcon; labelKey: string }[] = [
  { key: "privacyPolicy", icon: ShieldCheck, labelKey: "privacy_policy" },
  { key: "termsOfUse", icon: FileText, labelKey: "terms_of_use" },
  { key: "aboutApp", icon: Info, labelKey: "about_app" },
];

function SectionHeader({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-main leading-tight">
          {title}
        </p>
        <p className="text-xs text-text-muted mt-0.5 leading-snug">{desc}</p>
      </div>
    </div>
  );
}

export default function SozlamalarPage() {
  const { t, settings, setRepeatCount, setLocale, setFontSize, setTheme } =
    useSettings();
  const [openModal, setOpenModal] = useState<LegalKey | null>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const legalContent =
    LEGAL_CONTENT[settings.locale] || LEGAL_CONTENT["uz-latn"];
  const modalItem = openModal
    ? LEGAL_ITEMS.find((i) => i.key === openModal)
    : null;

  // Modal ochiq payt: Escape bilan yopish + fon scroll'ini bloklash.
  // Kontent doim tepadan boshlanadi (brauzer scroll-anchoring'iga qarshi).
  useEffect(() => {
    if (!openModal) return;
    modalScrollRef.current?.scrollTo(0, 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenModal(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openModal]);

  return (
    <div className="max-w-lg mx-auto px-5 pt-6 pb-4">
      <h1 className="text-2xl font-bold text-text-main">{t("settings")}</h1>
      <p className="text-sm text-text-muted mt-1 mb-5">
        {t("settings_subtitle")}
      </p>

      <div className="space-y-4">
        {/* ── Takrorlash soni ── */}
        <GlassCard>
          <SectionHeader
            icon={Repeat2}
            title={t("repeat_count")}
            desc={t("repeat_desc")}
          />
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setRepeatCount(Math.max(1, settings.repeatCount - 1))}
              disabled={settings.repeatCount <= 1}
              aria-label={t("decrease")}
              className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-main disabled:opacity-30 active:scale-95 transition-all hover:bg-white/10"
            >
              <Minus size={18} />
            </button>
            <div className="flex-1 rounded-xl bg-white/5 border border-white/5 py-2 text-center">
              <span className="text-2xl font-bold text-primary tabular-nums">
                {settings.repeatCount}
              </span>
              <span className="text-base font-semibold text-primary/70">×</span>
            </div>
            <button
              onClick={() => setRepeatCount(Math.min(10, settings.repeatCount + 1))}
              disabled={settings.repeatCount >= 10}
              aria-label={t("increase")}
              className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-main disabled:opacity-30 active:scale-95 transition-all hover:bg-white/10"
            >
              <Plus size={18} />
            </button>
          </div>
          <p className="text-[0.6875rem] text-text-muted text-center mt-2">
            {t("repeat_reset_hint")}
          </p>
        </GlassCard>

        {/* ── Til ── */}
        <GlassCard className="!p-0 overflow-hidden">
          <div className="p-4 pb-3">
            <SectionHeader
              icon={Languages}
              title={t("language")}
              desc={t("language_desc")}
            />
          </div>
          <div>
            {LANGUAGES.map((lang) => {
              const selected = settings.locale === lang.value;
              return (
                <button
                  key={lang.value}
                  onClick={() => setLocale(lang.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left border-t border-white/5 transition-colors ${
                    selected ? "bg-primary/20" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        selected ? "text-primary" : "text-text-main"
                      }`}
                    >
                      {lang.label}
                    </p>
                    {lang.sub && (
                      <p className="text-xs text-text-muted">{lang.sub}</p>
                    )}
                  </div>
                  {selected ? (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Check size={14} className="text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-white/10 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </GlassCard>

        {/* ── Ko'rinish (tema) ── */}
        <GlassCard>
          <SectionHeader
            icon={SunMoon}
            title={t("theme")}
            desc={t("theme_desc")}
          />
          <div className="grid grid-cols-3 gap-2 mt-4">
            {THEMES.map((th) => {
              const selected = settings.theme === th.value;
              const Icon = th.icon;
              return (
                <button
                  key={th.value}
                  onClick={() => setTheme(th.value)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-medium transition-all active:scale-95 ${
                    selected
                      ? "bg-primary/20 text-primary border border-primary/40"
                      : "bg-white/5 text-text-muted border border-white/5 hover:bg-white/10"
                  }`}
                >
                  <Icon size={20} />
                  {t(th.labelKey)}
                </button>
              );
            })}
          </div>
        </GlassCard>

        {/* ── Shrift o'lchami ── */}
        <GlassCard>
          <SectionHeader
            icon={Type}
            title={t("font_size")}
            desc={t("font_size_desc")}
          />
          <div className="grid grid-cols-3 gap-2 mt-4">
            {FONT_SIZES.map((fs) => {
              const selected = settings.fontSize === fs.value;
              return (
                <button
                  key={fs.value}
                  onClick={() => setFontSize(fs.value)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-xl font-medium transition-all active:scale-95 ${
                    selected
                      ? "bg-primary/20 text-primary border border-primary/40"
                      : "bg-white/5 text-text-muted border border-white/5 hover:bg-white/10"
                  }`}
                >
                  <span
                    className="h-7 flex items-end font-bold leading-none"
                    style={{ fontSize: `${fs.rem}rem` }}
                  >
                    A
                  </span>
                  <span className="text-[0.6875rem] opacity-80">
                    {t(fs.labelKey)}
                  </span>
                </button>
              );
            })}
          </div>
        </GlassCard>

        {/* ── Ilova haqida ── */}
        <GlassCard className="!p-0 overflow-hidden">
          <div className="p-4 pb-3">
            <SectionHeader
              icon={Info}
              title={t("about_section")}
              desc={`${t("app_name")} · v${APP_VERSION}`}
            />
          </div>
          <div>
            {LEGAL_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setOpenModal(item.key)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left border-t border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-text-secondary" />
                  </div>
                  <p className="flex-1 text-sm font-medium text-text-main">
                    {t(item.labelKey)}
                  </p>
                  <ChevronRight size={16} className="text-text-muted shrink-0" />
                </button>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* ── Footer ── */}
      <div className="mt-6 text-center">
        <p className="text-xs font-medium text-text-muted">
          {t("app_name")} · v{APP_VERSION}
        </p>
        <p className="text-[0.6875rem] text-text-muted opacity-70 mt-0.5">
          {t("footer_company")}
        </p>
      </div>

      {/* ── Modal (huquqiy matnlar) ──
          Portal: (tabs) layout'dagi main maskImage stacking context yaratadi —
          modal main ichida qolsa pastki 100px fade'ga tushadi va tab bar
          ustida ko'rinadi. body'ga chiqarish shart. */}
      {openModal && modalItem && createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm sm:p-4"
          onClick={() => setOpenModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t(modalItem.labelKey)}
            className="glass w-full max-w-lg rounded-t-[28px] rounded-b-none sm:rounded-[28px] max-h-[85vh] flex flex-col animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-white/10 sm:hidden shrink-0" />
            <div className="flex items-center gap-3 px-5 pt-4 pb-3 border-b border-white/10 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <modalItem.icon size={18} className="text-primary" />
              </div>
              <h3 className="flex-1 text-base font-semibold text-text-main">
                {t(modalItem.labelKey)}
              </h3>
              <button
                onClick={() => setOpenModal(null)}
                aria-label={t("close")}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all shrink-0"
              >
                <X size={16} className="text-text-muted" />
              </button>
            </div>
            <div
              ref={modalScrollRef}
              className="px-5 py-4 overflow-y-auto pb-[max(env(safe-area-inset-bottom),1.25rem)]"
            >
              <pre className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap font-sans">
                {legalContent[openModal]}
              </pre>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

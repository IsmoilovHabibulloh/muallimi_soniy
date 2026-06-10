"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import type {
  UserSettings,
  Locale,
  Theme,
  FontSize,
  PlaybackSpeed,
} from "@/lib/data/types";
import { DEFAULT_SETTINGS } from "@/lib/data/types";

import uzLatn from "@/lib/i18n/messages/uz-latn.json";
import uzCyrl from "@/lib/i18n/messages/uz-cyrl.json";
import ru from "@/lib/i18n/messages/ru.json";
import en from "@/lib/i18n/messages/en.json";

const messages: Record<Locale, Record<string, string>> = {
  "uz-latn": uzLatn,
  "uz-cyrl": uzCyrl,
  ru,
  en,
};

interface SettingsContextType {
  settings: UserSettings;
  setRepeatCount: (n: number) => void;
  setSpeed: (s: PlaybackSpeed) => void;
  setLocale: (l: Locale) => void;
  setTheme: (t: Theme) => void;
  setFontSize: (f: FontSize) => void;
  setLoopMode: (b: boolean) => void;
  setSequentialMode: (b: boolean) => void;
  t: (key: string) => string;
  isLoaded: boolean;
}

const SettingsContext = createContext<SettingsContextType>(null!);

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings, isLoaded] = useLocalStorage<UserSettings>(
    "muallimi-settings",
    DEFAULT_SETTINGS
  );

  // Takrorlash soni sessiyalararo SAQLANMAYDI — har ochilishda 1 dan
  // boshlanadi (foydalanuvchi qarori 2026-06-10). Sessiya davomida
  // o'zgartirish odatdagidek ishlaydi.
  useEffect(() => {
    if (!isLoaded) return;
    setSettings((prev) =>
      prev.repeatCount === 1 ? prev : { ...prev, repeatCount: 1 }
    );
    // faqat storage birinchi yuklanganda
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // Apply theme to DOM. DEFAULT = LIGHT: noma'lum/buzilgan qiymat ham
  // light'ga tushadi. Status-bar (meta theme-color) faol temaga ergashadi.
  useEffect(() => {
    const root = document.documentElement;
    const apply = (theme: "light" | "dark") => {
      root.setAttribute("data-theme", theme);
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", theme === "dark" ? "#071a0e" : "#f0f7f2");
    };
    if (settings.theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      apply(mq.matches ? "dark" : "light");
      const listener = (e: MediaQueryListEvent) =>
        apply(e.matches ? "dark" : "light");
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    }
    apply(settings.theme === "dark" ? "dark" : "light");
  }, [settings.theme]);

  // Apply font size to DOM
  useEffect(() => {
    document.documentElement.setAttribute("data-font-size", settings.fontSize);
  }, [settings.fontSize]);

  const t = useMemo(() => {
    const msgs = messages[settings.locale] || messages["uz-latn"];
    return (key: string) => msgs[key] || key;
  }, [settings.locale]);

  const update = (patch: Partial<UserSettings>) =>
    setSettings((prev) => ({ ...prev, ...patch }));

  const value: SettingsContextType = {
    settings,
    setRepeatCount: (repeatCount) => update({ repeatCount }),
    setSpeed: (speed) => update({ speed }),
    setLocale: (locale) => update({ locale }),
    setTheme: (theme) => update({ theme }),
    setFontSize: (fontSize) => update({ fontSize }),
    setLoopMode: (loopMode) => update({ loopMode }),
    setSequentialMode: (sequentialMode) => update({ sequentialMode }),
    t,
    isLoaded,
  };

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

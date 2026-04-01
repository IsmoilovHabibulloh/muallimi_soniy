"use client";

import { useSettings } from "@/providers/SettingsProvider";

export function GreetingHeader() {
  const { t } = useSettings();
  const hour = new Date().getHours();
  const greetingKey =
    hour < 12 ? "greeting_morning" : hour < 18 ? "greeting_day" : "greeting_evening";

  return (
    <div className="px-5 pt-6 pb-2">
      <h1 className="text-2xl font-bold text-text-main">{t(greetingKey)}</h1>
      <p className="text-sm text-text-muted mt-1">{t("app_subtitle")}</p>
    </div>
  );
}

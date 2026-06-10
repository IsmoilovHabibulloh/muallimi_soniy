"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Settings } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";

const tabs = [
  { key: "home", href: "/home", icon: Home },
  { key: "lessons", href: "/darslar", icon: BookOpen },
  { key: "settings", href: "/sozlamalar", icon: Settings },
] as const;

export function BottomTabBar() {
  const pathname = usePathname();
  const { t } = useSettings();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 rounded-none safe-area-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto h-16 px-4">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(`/${tab.key === "lessons" ? "darslar" : tab.key === "settings" ? "sozlamalar" : tab.key}`);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                isActive ? "text-primary" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[0.625rem] font-medium">{t(tab.key)}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

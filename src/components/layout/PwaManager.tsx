"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { getOfflineDownloader } from "@/lib/offline/downloader";
import { useSettings } from "@/providers/SettingsProvider";

/**
 * PWA boshqaruvchisi:
 * 1) Sahifa ochilgach 4 soniyadan keyin fon yuklovchini ishga tushiradi
 *    (sahifa o'z resurslarini olib bo'lishini kutamiz).
 * 2) SW yangilanish oqimi: yangi versiya "waiting" holatga kelganda toast
 *    ko'rsatadi; foydalanuvchi tasdiqlasa — skipWaiting + sahifa yangilanadi.
 *    (Avtomatik skipWaiting sessiya o'rtasida eski sahifa / yangi kesh
 *    ziddiyatini keltirib chiqarishi mumkin — shu sababli so'raymiz.)
 */
export function PwaManager() {
  const { t } = useSettings();
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const timer = window.setTimeout(() => {
      void getOfflineDownloader().start();
    }, 4000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sw = window.serwist;
    if (!sw) return;
    const onWaiting = () => setUpdateReady(true);
    sw.addEventListener("waiting", onWaiting);
    return () => sw.removeEventListener("waiting", onWaiting);
  }, []);

  const applyUpdate = () => {
    const sw = window.serwist;
    if (!sw) return;
    sw.addEventListener("controlling", () => window.location.reload());
    void sw.messageSkipWaiting();
    setUpdateReady(false);
  };

  if (!updateReady) return null;

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] z-[70] animate-slide-up">
      <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lg">
        <p className="text-sm font-medium text-text-main">{t("update_ready")}</p>
        <button
          onClick={applyUpdate}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-sm font-semibold active:scale-95 transition-all"
        >
          <RefreshCw size={14} />
          {t("update_now")}
        </button>
      </div>
    </div>
  );
}

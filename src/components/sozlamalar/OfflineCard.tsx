"use client";

import { CheckCircle2, CloudDownload, Pause, Play } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";
import { GlassCard } from "@/components/ui/GlassCard";
import { useOfflineDownload } from "@/lib/offline/useOfflineDownload";
import type { DownloadPhase } from "@/lib/offline/downloader";

const STATUS_KEY: Record<DownloadPhase, string> = {
  idle: "offline_idle",
  unsupported: "offline_unsupported",
  scanning: "offline_scanning",
  running: "offline_running",
  paused: "offline_paused",
  audio: "offline_audio_wait",
  offline: "offline_offline",
  done: "offline_done",
};

function formatMB(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(bytes > 100 * 1024 * 1024 ? 0 : 1)} MB`;
}

export function OfflineCard() {
  const { t } = useSettings();
  const { snapshot, pause, resume } = useOfflineDownload();
  const { phase, total, done, failed, bytesDone } = snapshot;

  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const isDone = phase === "done" && failed === 0;
  const showPause = phase === "running" || phase === "audio";
  const showResume = phase === "paused";

  return (
    <GlassCard>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
          {isDone ? (
            <CheckCircle2 size={18} className="text-primary" />
          ) : (
            <CloudDownload size={18} className="text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-main leading-tight">
            {t("offline_title")}
          </p>
          <p className="text-xs text-text-muted mt-0.5 leading-snug">
            {t("offline_desc")}
          </p>
        </div>
      </div>

      <div className="mt-4">
        {/* Progress bar */}
        <div className="h-2 rounded-full bg-white/5 border border-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2 gap-2">
          <p className="text-xs text-text-muted flex-1 min-w-0 truncate">
            {t(STATUS_KEY[phase])}
          </p>
          {total > 0 && (
            <p className="text-xs font-medium text-text-secondary tabular-nums shrink-0">
              {done} / {total} {t("offline_files")}
              {bytesDone > 0 && ` · ${formatMB(bytesDone)}`}
            </p>
          )}
        </div>

        {phase === "done" && failed > 0 && (
          <p className="text-[0.6875rem] text-text-muted mt-1">
            {t("offline_done_partial")}
          </p>
        )}

        {(showPause || showResume) && (
          <button
            onClick={showPause ? pause : resume}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-text-main hover:bg-white/10 active:scale-[0.98] transition-all"
          >
            {showPause ? <Pause size={15} /> : <Play size={15} />}
            {showPause ? t("offline_pause") : t("offline_resume")}
          </button>
        )}
      </div>
    </GlassCard>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import {
  getOfflineDownloader,
  IDLE_SNAPSHOT,
  type DownloadSnapshot,
} from "./downloader";

export function useOfflineDownload(): {
  snapshot: DownloadSnapshot;
  pause: () => void;
  resume: () => void;
} {
  const downloader = getOfflineDownloader();
  const snapshot = useSyncExternalStore(
    downloader.subscribe,
    downloader.getSnapshot,
    () => IDLE_SNAPSHOT
  );
  return { snapshot, pause: downloader.pause, resume: downloader.resume };
}

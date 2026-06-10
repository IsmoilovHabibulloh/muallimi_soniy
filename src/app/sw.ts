/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { defaultCache } from "@serwist/turbopack/worker";
import type { PrecacheEntry, RuntimeCaching, SerwistGlobalConfig } from "serwist";
import {
  CacheFirst,
  CacheableResponsePlugin,
  RangeRequestsPlugin,
  Serwist,
} from "serwist";

// Eslatma: bu fayl esbuild bilan alohida bundle qilinadi — "@/..." alias
// ishlatmang, faqat paket importlari.

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

/**
 * Media keshi — deploy'lar osha BARQAROR bucket (nomi versiyalanmaydi).
 * Uni fon yuklovchi (src/lib/offline/downloader.ts) to'ldiradi; SW yangilanishi
 * uni hech qachon o'chirmaydi — 100+ MB audio qayta yuklanmasin.
 *
 * - CacheableResponsePlugin({ statuses: [200] }): 206 (partial) javob keshga
 *   tushmasin — cache.put() 206 da xato beradi, qisman fayl esa keshni buzadi
 *   (quran.com shu xatoga uchib MP3 keshlashni o'chirgan).
 * - RangeRequestsPlugin: Safari <audio> har doim Range so'raydi — plugin
 *   keshlangan to'liq javobdan 206 + Content-Range sintez qiladi, aks holda
 *   Safari'da offline ijro ishlamaydi.
 */
const MEDIA_CACHE = "ms-media-v1";

const mediaCache: RuntimeCaching = {
  matcher: ({ sameOrigin, url: { pathname } }) =>
    sameOrigin &&
    (pathname.startsWith("/audio/") ||
      pathname.startsWith("/images/") ||
      pathname.startsWith("/fonts/")),
  handler: new CacheFirst({
    cacheName: MEDIA_CACHE,
    matchOptions: { ignoreVary: true },
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new RangeRequestsPlugin(),
    ],
  }),
};

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  // skipWaiting: false — yangi versiya foydalanuvchi tasdig'ini kutadi
  // (PwaManager toast). Aks holda sessiya o'rtasida eski HTML yangi chunk'lar
  // bilan ziddiyatga tushishi mumkin.
  skipWaiting: false,
  clientsClaim: true,
  // navigationPreload o'chirilgan: sahifalarimiz precache'dan keshdan chiqadi,
  // parallel preload so'rovi sekin tarmoqlarda bandwidth isrofi bo'lardi.
  navigationPreload: false,
  // Tartib muhim: mediaCache defaultCache'dan OLDIN — aks holda defaultCache
  // ning audio entry'si (maxEntries: 32!) fayllarimizni evict qilib yuboradi.
  runtimeCaching: [mediaCache, ...defaultCache],
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

// Eski qo'lda yozilgan SW (public/sw.js) keshlarini tozalash
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("muallimi-soniy-"))
            .map((key) => caches.delete(key))
        )
      )
  );
});

serwist.addEventListeners();

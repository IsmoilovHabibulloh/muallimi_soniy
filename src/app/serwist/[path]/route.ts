import { readFileSync } from "node:fs";
import path from "node:path";
import { createSerwistRoute } from "@serwist/turbopack";
import { getRouteUrls } from "@/lib/offline/media-manifest";

/**
 * Serwist service worker route handler (Turbopack-mos yondashuv).
 * SW manbasi: src/app/sw.ts → /serwist/sw.js URL'da xizmat qiladi
 * (Service-Worker-Allowed: / header bilan, scope "/" bo'la oladi).
 */

// Har deploy'da yangi revision — precache'langan sahifa HTML'lari yangilanadi.
// BUILD_ID hali yozilmagan bo'lsa (build vaqti), randomUUID ham xuddi shu
// "deploy'ga bitta" semantikani beradi.
const revision = (() => {
  try {
    return readFileSync(path.join(process.cwd(), ".next", "BUILD_ID"), "utf8").trim();
  } catch {
    return crypto.randomUUID();
  }
})();

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute({
    swSrc: "src/app/sw.ts",
    useNativeEsbuild: true,
    // DIQQAT: default globPatterns ichida "public/**/*" bor — u 243 MB
    // audio/rasmni precache'ga tortib yuborardi (SW o'rnatilishini minutlab
    // bloklaydi). Media alohida barqaror keshda (ms-media-v1, fon yuklovchi
    // to'ldiradi), shu sababli bu yerda faqat app shell:
    globPatterns: [
      ".next/static/**/*.{js,css}",
      "public/*.{png,json,svg,ico}",
    ],
    additionalPrecacheEntries: [
      // Barcha sahifa HTML'lari — offline sovuq start har qaysi URL'da ishlaydi
      ...getRouteUrls().map((url) => ({ url, revision })),
      { url: "/~offline", revision },
    ],
  });

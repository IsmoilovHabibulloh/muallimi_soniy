import Link from "next/link";

/**
 * Offline fallback sahifasi — SW keshda topilmagan hujjat so'rovi uchun
 * (sw.ts dagi fallbacks). Barcha asosiy route'lar precache'langani sababli
 * bu sahifa kamdan-kam ko'rinadi (faqat noma'lum URL + internet yo'q holatda).
 */
export default function OfflinePage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center">
      <div className="text-5xl mb-4">📡</div>
      <h1 className="text-xl font-bold text-text-main">Internet aloqasi yoʻq</h1>
      <p className="text-sm text-text-muted mt-2 max-w-xs">
        Bu sahifa hali qurilmangizga saqlanmagan. Saqlangan darslarga bosh
        sahifadan kirishingiz mumkin.
      </p>
      <Link
        href="/home"
        className="mt-6 px-6 py-3 rounded-xl bg-primary/20 text-primary font-semibold text-sm active:scale-95 transition-all"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}

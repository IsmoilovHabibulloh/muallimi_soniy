"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Headphones, X } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";
import type { Element } from "@/lib/data/types";

interface SurahPlay {
  /** Sura to'liq o'qish (yoki o'sha sura ijroda bo'lsa — to'xtatish) */
  onPlaySurah: (surah: number, lead?: Element) => void;
  /** Hozir ketma-ket o'qilayotgan sura (banner shu bo'yicha yonadi) */
  playingSurah: number | null;
  /**
   * Ixtiyoriy element ketma-ketligini o'qish — kalimalar uchun.
   * `key` odatda sarlavha elementining id'si (toggle uchun ishlatiladi).
   */
  onPlayGroup: (key: string, elements: Element[]) => void;
  /** Hozir o'qilayotgan guruh kaliti */
  playingGroup: string | null;
  /** Bir martalik eslatma ("sura nomini bosing") hali ko'rsatilishi kerakmi */
  surahHint: boolean;
  /** Eslatmani yopish — qayta chiqmaydi (localStorage) */
  dismissSurahHint: () => void;
}

export const SurahPlayContext = createContext<SurahPlay | null>(null);

/**
 * Bezakli ramka — ikki chiziqli chegara + ikki chetida `۞` rozetka.
 * Sura nomlari ham, kalima nomlari ham shundan quriladi (yagona uslub).
 */
function BannerFrame({
  highlighted,
  children,
}: {
  highlighted: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`surah-banner${
        highlighted ? " surah-banner-playing" : ""
      } relative flex items-center justify-center rounded-lg`}
    >
      <span className="surah-banner-rosette absolute left-1.5">۞</span>
      <span className="surah-banner-rosette absolute right-1.5">۞</span>
      {children}
    </div>
  );
}

/**
 * Bitta element uchun ramkali sarlavha — kalimalar bo'limi (34, 35-sahifalar).
 *
 * Foydalanuvchi 2026-09-28 da so'radi: "Kalimalarning nomlarini ham shunday
 * alohida ramkaga olishimiz kerakday ko'rindi" (sura nomlaridagi ramka).
 *
 * `parts` berilsa — nom bosilganda nom + barcha bo'laklar KETMA-KET
 * o'qiladi (suralardagidek; foydalanuvchi 2026-09-28 da so'radi), qayta
 * bosilsa to'xtaydi. Bo'lakni alohida bosish avvalgidek faqat o'sha
 * bo'lakni o'qiydi.
 *
 * `SurahBanner` dan farqi — guruh `AYAH_TARJIMA` dan emas, renderer bergan
 * element ro'yxatidan tuziladi (kalimalarda sura raqami yo'q).
 */
export function TitleBanner({
  element,
  parts = [],
  isActive,
  onClick,
}: {
  element: Element;
  /**
   * Sarlavhadan keyingi qismlar. Berilsa, nom bosilganda nom + qismlar
   * KETMA-KET o'qiladi (suralardagidek). Qismlarni alohida bosish
   * avvalgidek faqat o'sha qismni o'qiydi.
   */
  parts?: Element[];
  /** Kontekst bo'lmaganda ishlatiladigan zaxira holat/klik */
  isActive: boolean;
  onClick: () => void;
}) {
  const ctx = useContext(SurahPlayContext);
  const groupPlayable = Boolean(ctx && parts.length);
  const highlighted = isActive || ctx?.playingGroup === element.id;

  return (
    <div className="w-full my-0.5">
      <BannerFrame highlighted={highlighted}>
        <button
          type="button"
          onClick={(ev) => {
            ev.stopPropagation();
            if (groupPlayable) ctx!.onPlayGroup(element.id, [element, ...parts]);
            else onClick();
          }}
          title={groupPlayable ? "Kalimani to'liq tinglash" : undefined}
          className="element-spring w-full px-7 py-[0.125rem] rounded-lg"
        >
          <h4
            className="arabic-text font-bold text-center leading-snug text-[clamp(0.78rem,3.8cqi,0.98rem)]"
            style={{
              color: highlighted ? "#ffffff" : "var(--color-text-secondary)",
            }}
          >
            {element.arabic}
          </h4>
        </button>
      </BannerFrame>
    </div>
  );
}

interface Props {
  /** Arabcha sura nomi. `lead` berilsa, o'sha elementning matni olinadi. */
  text?: string;
  /** Sura raqami — bosilganda shu sura to'liq o'qiladi */
  surah?: number;
  /**
   * Sura nomi audiosi bor element (37, 38, 44-sahifalar) — ketma-ketlik
   * boshida o'qiladi, so'ng bismillah va oyatlar.
   */
  lead?: Element;
  /** Banner ostidagi arabcha/chig'atoy izoh (RTL) */
  sub?: string;
  /** Banner ostidagi lotin/kirill izoh — "Fotiha — Ochuvchi · Makkiy · 7 oyat" */
  note?: string;
  /**
   * Sahifadagi BIRINCHI banner — bir martalik eslatma shu banner ostida
   * chiqadi (MushafPage/TarjimaView beradi).
   */
  hint?: boolean;
}

/**
 * Bir martalik eslatma — "sura nomiga bossangiz, sura to'liq o'qiladi".
 *
 * Foydalanuvchi 2026-10-20 da so'radi: banner bosilganda sura to'liq
 * o'qilishi (2026-09-26) foydalanuvchiga ko'rinmas edi. Pufakcha banner
 * ostida, strelkasi bannerga qaragan. "Tushunarli" (yoki X) bosilganda,
 * yoki foydalanuvchi banner'ni o'zi bosganda yopiladi va qayta chiqmaydi
 * (`localStorage["muallimi-surah-hint-seen"]`, lesson sahifasida).
 */
function SurahHint({ onClose }: { onClose: () => void }) {
  const { t } = useSettings();
  return (
    <div className="relative mt-2 mx-auto w-fit max-w-full animate-fade-in" role="status">
      <span
        aria-hidden
        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-primary"
      />
      <div className="relative flex items-center gap-2 rounded-xl bg-primary pl-3 pr-1.5 py-1.5 text-white shadow-lg">
        <Headphones size={16} className="shrink-0" />
        <p className="text-[0.8125rem] leading-snug font-medium">{t("surah_hint")}</p>
        <button
          type="button"
          onClick={(ev) => {
            ev.stopPropagation();
            onClose();
          }}
          className="shrink-0 rounded-lg bg-white/20 px-2 py-1 text-[0.75rem] font-semibold active:scale-95 transition-transform"
        >
          {t("surah_hint_ok")}
        </button>
        <button
          type="button"
          aria-label={t("surah_hint_ok")}
          onClick={(ev) => {
            ev.stopPropagation();
            onClose();
          }}
          className="shrink-0 w-6 h-6 flex items-center justify-center rounded-md opacity-80 active:scale-95"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

/**
 * Sura nomi banneri — mushafdagidek ramka ichida, ikki chetida rozetka.
 *
 * Foydalanuvchi 2026-09-26 da so'radi: sura nomlari alohida ajralib tursin
 * (Qur'on sahifasidagi bezakli ramka), VA nomga bosilganda sura TO'LIQ
 * o'qilsin — oyatni bosganda esa avvalgidek faqat o'sha oyat.
 *
 * Suralar bo'limidagi (36-47 sahifalar) BARCHA sura sarlavhalari va
 * `TarjimaView` shu komponentdan foydalanadi — boshqa uslub yozmang.
 *
 * Ramka ikki chiziqli: tashqi `border` + ichki `inset` soya
 * (`.surah-banner`, globals.css). Rozetka — `۞` (U+06DE), arab
 * shriftidagi Qur'on gul belgisi.
 */
export function SurahBanner({ text, surah, lead, sub, note, hint }: Props) {
  const ctx = useContext(SurahPlayContext);
  const label = lead?.arabic ?? text ?? "";
  const playable = Boolean(surah && ctx);
  const isPlaying = Boolean(surah && ctx?.playingSurah === surah);

  const name = (
    <h3
      className="arabic-text font-bold text-center leading-snug text-[clamp(0.85rem,4.2cqi,1.1rem)]"
      style={{ color: isPlaying ? "#ffffff" : "var(--color-text-secondary)" }}
    >
      {label}
    </h3>
  );

  return (
    <div className="w-full my-1">
      <BannerFrame highlighted={isPlaying}>
        {playable ? (
          <button
            type="button"
            onClick={(ev) => {
              ev.stopPropagation();
              ctx!.onPlaySurah(surah!, lead);
            }}
            title="Surani to'liq tinglash"
            className="element-spring w-full px-7 py-[0.125rem] rounded-lg"
          >
            {name}
          </button>
        ) : (
          <div className="w-full px-7 py-[0.125rem]">{name}</div>
        )}
      </BannerFrame>
      {sub && (
        <p
          className="surah-sub arabic-text text-center text-[0.625rem] text-text-muted mt-0.5 leading-tight"
          dir="rtl"
        >
          {sub}
        </p>
      )}
      {note && (
        <p className="text-center text-[0.6875rem] text-text-muted mt-0.5 leading-tight">
          {note}
        </p>
      )}
      {hint && playable && ctx!.surahHint && (
        <SurahHint onClose={ctx!.dismissSurahHint} />
      )}
    </div>
  );
}

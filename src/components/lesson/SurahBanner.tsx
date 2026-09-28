"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Element } from "@/lib/data/types";

interface SurahPlay {
  /** Sura to'liq o'qish (yoki o'sha sura ijroda bo'lsa — to'xtatish) */
  onPlaySurah: (surah: number, lead?: Element) => void;
  /** Hozir ketma-ket o'qilayotgan sura (banner shu bo'yicha yonadi) */
  playingSurah: number | null;
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
 * `SurahBanner` dan farqi: bosilganda FAQAT o'sha elementning audiosi ijro
 * etiladi (sura kabi ketma-ket o'qish YO'Q) — kalimalar uchun avvalgi
 * xatti-harakat saqlanadi.
 */
export function TitleBanner({
  element,
  isActive,
  onClick,
}: {
  element: Element;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div className="w-full my-0.5">
      <BannerFrame highlighted={isActive}>
        <button
          type="button"
          onClick={(ev) => {
            ev.stopPropagation();
            onClick();
          }}
          className="element-spring w-full px-7 py-[0.125rem] rounded-lg"
        >
          <h4
            className="arabic-text font-bold text-center leading-snug text-[clamp(0.78rem,3.8cqi,0.98rem)]"
            style={{
              color: isActive ? "#ffffff" : "var(--color-text-secondary)",
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
export function SurahBanner({ text, surah, lead, sub, note }: Props) {
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
    </div>
  );
}

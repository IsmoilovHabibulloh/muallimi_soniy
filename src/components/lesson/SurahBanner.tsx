"use client";

import { createContext, useContext } from "react";
import type { Element } from "@/lib/data/types";

interface SurahPlay {
  /** Sura to'liq o'qish (yoki o'sha sura ijroda bo'lsa — to'xtatish) */
  onPlaySurah: (surah: number, lead?: Element) => void;
  /** Hozir ketma-ket o'qilayotgan sura (banner shu bo'yicha yonadi) */
  playingSurah: number | null;
}

export const SurahPlayContext = createContext<SurahPlay | null>(null);

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
      <div
        className={`surah-banner${
          isPlaying ? " surah-banner-playing" : ""
        } relative flex items-center justify-center rounded-lg`}
      >
        <span className="surah-banner-rosette absolute left-1.5">۞</span>
        <span className="surah-banner-rosette absolute right-1.5">۞</span>
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
      </div>
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

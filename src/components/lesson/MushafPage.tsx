"use client";

import type { KeyboardEvent } from "react";
import { AYAH_TARJIMA } from "@/lib/data/tarjima";
import type { Element } from "@/lib/data/types";
import { SurahBanner } from "./SurahBanner";

/**
 * Mushaf ko'rinishi — suralar bo'limi (36-47 sahifalar).
 *
 * Foydalanuvchi 2026-10-20 da so'radi: suralar Qur'oni Karimdagidek
 * (Tafsiri Hilol ilovasining "Mushaf" ko'rinishi) o'ngdan chapga UZLUKSIZ
 * oqib o'qilsin — oyatlar qator-qator emas, bir paragrafda, har oyat
 * oxirida bezakli raqam doirasi bilan. Tarjima yoqilganda esa avvalgi
 * oyat-oyat ro'yxat (`TarjimaView`) ko'rinadi.
 *
 * Tuzilma `AYAH_TARJIMA` (sura/oyat raqami) asosida AVTOMATIK quriladi —
 * sahifa elementlari kitob tartibida keladi:
 *   - `*_title` element (tarjimasiz) → keyingi banner'ning `lead`i
 *   - bismillah (oyat 0, Fotihada oyat 1) → sura banneri + markazda alohida qator
 *   - ta'avvuz (sura 0) → markazda alohida qator
 *   - qolgan oyatlar → bitta oqar paragraf (sahifaga bo'lingan sura
 *     davomi bannersiz boshlanadi — kitobdagidek)
 *
 * Oyatni bosish avvalgidek faqat o'sha oyatni o'qiydi; bir audio chunkni
 * bo'lishgan oyatlar (Ixlos 3+4) birga yonadi.
 */

/** Banner matni/izohi — `lead` elementi bo'lmagan suralar uchun */
const BANNERS: Record<number, { text: string; sub?: string }> = {
  1: { text: "سُورَةُ الْفَاتِحَة" },
  2: { text: "اَوَّلُ سُورَةِ الْبَقَرَة" },
  94: { text: "سورة الشرح", sub: "شرح سوره‌سی" },
  95: { text: "سورة التين", sub: "تین سوره‌سی" },
  96: { text: "سورة العلق", sub: "علق سوره‌سی" },
  97: { text: "سورة القدر", sub: "قدر سوره‌سی" },
  98: { text: "سورة البينة", sub: "بیّنه سوره‌سی" },
  99: { text: "سورة الزلزلة", sub: "زلزله سوره‌سی" },
  100: { text: "سورة العاديات", sub: "عادیات سوره‌سی" },
  101: { text: "سورة القارعة", sub: "قارعه سوره‌سی" },
  102: { text: "سورة التكاثر", sub: "تکاثر سوره‌سی" },
  103: { text: "سورة العصر", sub: "عصر سوره‌سی" },
  106: { text: "سُورَةُ قُرَيْشٍ" },
  107: { text: "سُورَةُ الْمَاعُونِ" },
  108: { text: "سُورَةُ الْكَوْثَرِ" },
  109: { text: "سُورَةُ الْكَافِرُونَ" },
  110: { text: "سُورَةُ النَّصْرِ" },
  111: { text: "سُورَةُ الْمَسَدِ" },
  112: { text: "سُورَةُ الْإِخْلَاصِ" },
  113: { text: "سُورَةُ الْفَلَقِ" },
  114: { text: "سُورَةُ النَّاسِ" },
};

/** Sajda oyatlari — oyat oxirida ۩ belgisi */
const SAJDA = new Set(["96:19"]);

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const toArabic = (n: number) =>
  String(n)
    .split("")
    .map((d) => ARABIC_DIGITS[Number(d)])
    .join("");

type Item = { el: Element; num?: number; sajda?: boolean };
type Block =
  | { kind: "banner"; surah: number; lead?: Element }
  | { kind: "line"; item: Item }
  | { kind: "flow"; surah: number; items: Item[] };

function buildBlocks(elements: Element[]): Block[] {
  const blocks: Block[] = [];
  let lead: Element | undefined;

  for (const el of elements) {
    const t = AYAH_TARJIMA[el.id];
    if (!t) {
      // sura nomi elementi (sh_title, du_title, ...) — banner'ga o'tadi
      lead = el;
      continue;
    }
    if (t.s === 0) {
      blocks.push({ kind: "line", item: { el } });
      continue;
    }
    const isBism = t.a === 0 || (t.s === 1 && t.a === 1);
    if (isBism) {
      blocks.push({ kind: "banner", surah: t.s, lead });
      lead = undefined;
      blocks.push({ kind: "line", item: { el, num: t.a || undefined } });
      continue;
    }
    const item: Item = { el, num: t.a, sajda: SAJDA.has(`${t.s}:${t.a}`) };
    const last = blocks[blocks.length - 1];
    if (last?.kind === "flow" && last.surah === t.s) last.items.push(item);
    else blocks.push({ kind: "flow", surah: t.s, items: [item] });
  }
  return blocks;
}

/** Bir audio chunkni bo'lishgan elementlar (Ixlos 3+4) birga yonadi */
function sameAudio(a: Element, b: Element) {
  return (
    Boolean(a.audioUrl) &&
    a.audioUrl === b.audioUrl &&
    a.start === b.start &&
    a.end === b.end
  );
}

function Ayah({
  item,
  on,
  onPlay,
}: {
  item: Item;
  on: boolean;
  onPlay: (el: Element) => void;
}) {
  const play = () => onPlay(item.el);
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={(ev) => {
        ev.stopPropagation();
        play();
      }}
      onKeyDown={(ev: KeyboardEvent) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          play();
        }
      }}
      className="mushaf-ayah cursor-pointer rounded-md px-1 transition-colors"
      style={{
        backgroundColor: on ? "var(--color-primary)" : "transparent",
        color: on ? "#ffffff" : "var(--color-text-main)",
        boxShadow: on ? "0 4px 14px var(--color-primary-glow)" : "none",
      }}
    >
      {item.el.arabic}
      {item.sajda && <span className="mushaf-sajda">{" ۩"}</span>}
      {item.num !== undefined && (
        <>
          {" "}
          <span className="mushaf-num">{toArabic(item.num)}</span>
        </>
      )}
    </span>
  );
}

interface Props {
  elements: Element[];
  activeId: string | null;
  onElementClick: (el: Element) => void;
}

export function MushafPage({ elements, activeId, onElementClick }: Props) {
  const active = activeId ? elements.find((e) => e.id === activeId) : undefined;
  const isActive = (el: Element) =>
    el.id === activeId || (active !== undefined && sameAudio(el, active));

  const blocks = buildBlocks(elements);
  const firstBanner = blocks.findIndex((b) => b.kind === "banner");

  return (
    <div className="flex flex-col items-center w-full gap-1">
      {blocks.map((b, i) => {
        if (b.kind === "banner") {
          const cfg = BANNERS[b.surah];
          return (
            <SurahBanner
              key={`b${i}`}
              surah={b.surah}
              lead={b.lead}
              text={cfg?.text}
              sub={cfg?.sub}
              hint={i === firstBanner}
            />
          );
        }
        if (b.kind === "line") {
          return (
            <p
              key={b.item.el.id}
              dir="rtl"
              className="arabic-text mushaf-text text-center w-full"
            >
              <Ayah item={b.item} on={isActive(b.item.el)} onPlay={onElementClick} />
            </p>
          );
        }
        return (
          <p
            key={b.items[0].el.id}
            dir="rtl"
            className="arabic-text mushaf-text mushaf-flow w-full"
          >
            {b.items.map((it, j) => (
              <span key={it.el.id}>
                {j > 0 && " "}
                <Ayah item={it} on={isActive(it.el)} onPlay={onElementClick} />
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

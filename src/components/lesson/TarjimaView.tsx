"use client";

import { useMemo } from "react";
import { Volume2 } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";
import { AYAH_TARJIMA, SURAH_INFO } from "@/lib/data/tarjima";
import type { Element } from "@/lib/data/types";

interface Props {
  elements: Element[];
  activeElementId: string | null;
  onElementClick: (element: Element) => void;
  onBackgroundClick: () => void;
}

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

function toArabicNumber(n: number): string {
  return String(n)
    .split("")
    .map((d) => ARABIC_DIGITS[Number(d)])
    .join("");
}

/** Sahifada tarjimasi bor element bormi? */
export function hasTarjima(elements: Element[]): boolean {
  return elements.some((e) => e.id in AYAH_TARJIMA);
}

/**
 * Tarjima ko'rinishi — suralar bo'limi (36-47 sahifalar) uchun.
 *
 * Kitob layouti (Page36..Page47) bir qatorga 2-3 oyatni sig'diradi — bu
 * bosma sahifaga o'xshatish uchun. Tarjima rejimida esa har oyat O'Z
 * qatorida, ostida ma'nosi bilan turadi: harflarni endi o'rganayotgan
 * o'quvchi o'qiyotgan narsasining ma'nosini darhol ko'radi.
 *
 * Audio o'zgarmaydi — bosilganda o'sha elementning chunki ijro etiladi,
 * takrorlash soni sozlamalardagi qiymat bo'yicha (AudioEngine hal qiladi).
 */
export function TarjimaView({
  elements,
  activeElementId,
  onElementClick,
  onBackgroundClick,
}: Props) {
  const { settings } = useSettings();
  const cyrl = settings.locale === "uz-cyrl";

  // Sura sarlavhasi sura O'ZGARGAN joyda chiqadi. Sahifada sura o'rtasidan
  // boshlansa ham (masalan Layl 8-oyatdan — 38-sahifa) tepada sarlavha
  // turadi, shu sababli ro'yxat oldindan tuziladi.
  const rows = useMemo(() => {
    // sarlavha element'lari (sh_title, du_title, ...) tarjimasiz — ular
    // o'rniga sura sarlavhasi bloki chiqadi
    const items = elements
      .map((el) => ({ el, t: AYAH_TARJIMA[el.id] }))
      .filter((r) => Boolean(r.t));
    return items.map((r, i) => ({
      ...r,
      info: r.t.s ? SURAH_INFO[r.t.s] : undefined,
      showHead: Boolean(r.t.s) && (i === 0 || items[i - 1].t.s !== r.t.s),
    }));
  }, [elements]);

  return (
    <div
      className="w-full bg-white/[0.05] rounded-2xl border border-white/10 p-3"
      style={{ containerType: "inline-size" }}
      onClick={onBackgroundClick}
    >
      <div className="flex flex-col gap-1.5">
        {rows.map(({ el, t, info, showHead }) => {
          const isActive = activeElementId === el.id;

          return (
            <div key={el.id} className="w-full">
              {showHead && info && (
                <div className="flex flex-col items-center gap-0.5 pt-2 pb-2.5">
                  <div className="flex flex-row-reverse items-center justify-center gap-2">
                    <span className="text-text-muted text-[0.625rem] opacity-60">
                      ❀
                    </span>
                    <h3 className="arabic-text text-[clamp(0.9rem,4.2cqi,1.1rem)] font-bold text-text-secondary">
                      {info.ar}
                    </h3>
                    <span className="text-text-muted text-[0.625rem] opacity-60">
                      ❀
                    </span>
                  </div>
                  <p className="text-[0.6875rem] text-text-muted text-center">
                    {cyrl ? info.cy : info.uz}
                    {(cyrl ? info.meanCy : info.mean) &&
                      ` — ${cyrl ? info.meanCy : info.mean}`}
                    {` · ${cyrl ? info.placeCy : info.place} · ${info.ayahs} ${
                      cyrl ? "оят" : "oyat"
                    }`}
                  </p>
                </div>
              )}

              <button
                onClick={(ev) => {
                  ev.stopPropagation();
                  onElementClick(el);
                }}
                className={`element-spring w-full rounded-xl px-3 py-2 text-left border ${
                  isActive ? "bg-primary/20" : "bg-white/5 border-white/5"
                }`}
                style={{
                  ...(isActive
                    ? {
                        borderColor: "var(--color-primary)",
                        boxShadow: "0 6px 20px var(--color-primary-glow)",
                      }
                    : {}),
                }}
              >
                <p
                  dir="rtl"
                  className="arabic-text font-bold leading-[1.9] text-right text-[clamp(0.9rem,4.4cqi,1.15rem)]"
                  style={{
                    color: "var(--color-text-main)",
                    overflowWrap: "anywhere",
                  }}
                >
                  {el.arabic}
                  {t.a > 0 && (
                    <span
                      className="arabic-text mx-1 opacity-70"
                      style={{ fontSize: "0.72em" }}
                    >
                      {" "}
                      ﴿{toArabicNumber(t.a)}﴾
                    </span>
                  )}
                </p>

                <div className="flex items-start gap-1.5 mt-1">
                  <Volume2
                    size={13}
                    className="shrink-0 mt-[0.2rem] text-primary"
                    style={{ opacity: isActive ? 1 : 0.45 }}
                  />
                  <p className="text-primary text-[clamp(0.75rem,3.4cqi,0.875rem)] leading-snug font-medium">
                    {t.a > 0 && (
                      <span className="opacity-70">{t.a}. </span>
                    )}
                    {cyrl ? t.cy : t.uz}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

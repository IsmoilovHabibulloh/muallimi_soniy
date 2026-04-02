"use client";

import type { Element } from "@/lib/data/types";
import { ELEMENT_COLORS } from "@/lib/data/types";

interface RenderedPageProps {
  pageNumber: number;
  elements: Element[];
  activeElementId: string | null;
  onElementClick: (element: Element) => void;
  onBackgroundClick: () => void;
}

// ========== MUQADDIMA COMPONENTS ==========

function MuqaddimaWord({
  el,
  isActive,
  hasActive,
  onClick,
}: {
  el: Element;
  isActive: boolean;
  hasActive: boolean;
  onClick: () => void;
}) {
  const color = ELEMENT_COLORS[el.type];
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="element-spring rounded px-0.5 py-0 inline leading-relaxed transition-all"
      style={{
        color: isActive ? color : "var(--color-text-main)",
        backgroundColor: isActive ? `${color}18` : "transparent",
        borderBottom: isActive ? `2px solid ${color}` : "2px solid transparent",
        boxShadow: isActive ? `0 2px 12px ${color}30` : "none",
        transform: isActive ? "scale(1.05)" : "none",
        opacity: hasActive && !isActive ? 0.6 : 1,
      }}
    >
      {el.arabic}
    </button>
  );
}

function MuqaddimaParagraph({
  elements,
  startIdx,
  endIdx,
  pageNum,
  activeId,
  hasActive,
  onClick,
}: {
  elements: Element[];
  startIdx: number;
  endIdx: number;
  pageNum: number;
  activeId: string | null;
  hasActive: boolean;
  onClick: (el: Element) => void;
}) {
  const prefix = `p${pageNum}_`;
  const wordEls: Element[] = [];
  for (let i = startIdx; i <= endIdx; i++) {
    const id = `${prefix}${String(i).padStart(3, "0")}`;
    const el = elements.find((e) => e.id === id);
    if (el) wordEls.push(el);
  }

  return (
    <p className="text-sm leading-relaxed text-text-main text-justify indent-6">
      {wordEls.map((el) => (
        <span key={el.id} className="inline">
          <MuqaddimaWord
            el={el}
            isActive={activeId === el.id}
            hasActive={hasActive}
            onClick={() => onClick(el)}
          />{" "}
        </span>
      ))}
    </p>
  );
}

// ========== SHARED COMPONENTS ==========

function ArabicEl({
  el,
  isActive,
  hasActive,
  onClick,
  size = "lg",
}: {
  el: Element;
  isActive: boolean;
  hasActive: boolean;
  onClick: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}) {
  const color = ELEMENT_COLORS[el.type];
  const sizeClasses: Record<string, string> = {
    sm: "text-lg px-1.5 py-0.5",
    md: "text-xl px-2 py-0.5",
    lg: "text-2xl px-2.5 py-1",
    xl: "text-3xl px-3 py-1",
    "2xl": "text-4xl px-3 py-1.5",
    "3xl": "text-5xl px-4 py-2",
    "4xl": "text-6xl px-5 py-2",
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`arabic-text element-spring rounded-lg inline-flex items-center justify-center leading-relaxed ${sizeClasses[size]}`}
      style={{
        fontFamily: "var(--font-arabic)",
        color: isActive ? color : "var(--color-text-main)",
        backgroundColor: isActive ? `${color}18` : "transparent",
        border: isActive ? `2px solid ${color}` : "2px solid transparent",
        boxShadow: isActive ? `0 4px 20px ${color}40` : "none",
        transform: isActive ? "scale(1.1)" : "none",
        opacity: hasActive && !isActive ? 0.5 : 1,
      }}
    >
      {el.arabic}
    </button>
  );
}

function Divider() {
  return <div className="w-full border-b-2 border-dotted border-white/10 my-2" />;
}

function Title({ text, sub }: { text: string; sub?: string }) {
  return (
    <div className="text-center my-2">
      <h3 className="arabic-text text-xl font-bold text-text-secondary">{text}</h3>
      {sub && <p className="text-xs text-text-muted mt-0.5">{sub}</p>}
    </div>
  );
}

function Row({
  els,
  all,
  activeId,
  hasActive,
  onClick,
  size = "xl",
  gap = "gap-3",
}: {
  els: Element[];
  all?: Element[];
  activeId: string | null;
  hasActive: boolean;
  onClick: (el: Element) => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  gap?: string;
}) {
  return (
    <div className={`flex flex-row-reverse flex-wrap justify-center ${gap}`}>
      {els.map((el) => (
        <ArabicEl
          key={el.id}
          el={el}
          isActive={activeId === el.id}
          hasActive={hasActive}
          onClick={() => onClick(el)}
          size={size}
        />
      ))}
    </div>
  );
}

// Helper: get element by suffix id from page elements
function usePageElements(elements: Element[], pageNum: number) {
  const prefix = `p${pageNum}_`;
  const el = (id: string) => elements.find((e) => e.id === `${prefix}${id}`);
  const els = (ids: string[]) => ids.map((id) => el(id)).filter(Boolean) as Element[];
  return { el, els };
}

// Shared page props
interface PP {
  elements: Element[];
  activeId: string | null;
  hasActive: boolean;
  onElementClick: (el: Element) => void;
}

// ========== LETTER PAGE TEMPLATE ==========
// Most pages 5-16 follow: section header (3 harakat forms) → words → divider → next section

function LetterSection({
  title,
  harakatEls,
  wordRows,
  activeId,
  hasActive,
  onClick,
}: {
  title?: string;
  harakatEls: Element[];
  wordRows: Element[][];
  activeId: string | null;
  hasActive: boolean;
  onClick: (el: Element) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      {title && <Title text={title} />}
      <Row els={harakatEls} activeId={activeId} hasActive={hasActive} onClick={onClick} size="2xl" gap="gap-5" />
      {wordRows.map((row, i) => (
        <Row key={i} els={row} activeId={activeId} hasActive={hasActive} onClick={onClick} size="xl" gap="gap-3" />
      ))}
    </div>
  );
}

// ========== PAGE RENDERERS ==========

function Page1({ elements, activeId, hasActive, onElementClick }: PP) {
  const bismillah = elements.find((e) => e.id === "p1_000");
  return (
    <div className="flex flex-col gap-4">
      {bismillah && (
        <button
          onClick={(e) => { e.stopPropagation(); onElementClick(bismillah); }}
          className="arabic-text text-2xl text-center leading-relaxed element-spring rounded-lg py-2 px-4 mx-auto"
          style={{
            fontFamily: "var(--font-arabic)",
            color: activeId === bismillah.id ? ELEMENT_COLORS.jumla : "var(--color-text-main)",
            backgroundColor: activeId === bismillah.id ? `${ELEMENT_COLORS.jumla}18` : "transparent",
            border: activeId === bismillah.id ? `2px solid ${ELEMENT_COLORS.jumla}` : "2px solid transparent",
            boxShadow: activeId === bismillah.id ? `0 4px 20px ${ELEMENT_COLORS.jumla}40` : "none",
            opacity: hasActive && activeId !== bismillah.id ? 0.5 : 1,
          }}
        >
          {bismillah.arabic}
        </button>
      )}
      <h2 className="text-lg font-bold text-text-secondary text-center mb-2">MUQADDIMA</h2>
      <MuqaddimaParagraph elements={elements} startIdx={1} endIdx={104} pageNum={1} activeId={activeId} hasActive={hasActive} onClick={onElementClick} />
      <MuqaddimaParagraph elements={elements} startIdx={105} endIdx={175} pageNum={1} activeId={activeId} hasActive={hasActive} onClick={onElementClick} />
      <MuqaddimaParagraph elements={elements} startIdx={176} endIdx={276} pageNum={1} activeId={activeId} hasActive={hasActive} onClick={onElementClick} />
      <MuqaddimaParagraph elements={elements} startIdx={277} endIdx={372} pageNum={1} activeId={activeId} hasActive={hasActive} onClick={onElementClick} />
    </div>
  );
}

function Page2({ elements, activeId, hasActive, onElementClick }: PP) {
  return (
    <div className="flex flex-col gap-4">
      <MuqaddimaParagraph elements={elements} startIdx={1} endIdx={26} pageNum={2} activeId={activeId} hasActive={hasActive} onClick={onElementClick} />
      <MuqaddimaParagraph elements={elements} startIdx={27} endIdx={154} pageNum={2} activeId={activeId} hasActive={hasActive} onClick={onElementClick} />
      <MuqaddimaParagraph elements={elements} startIdx={155} endIdx={237} pageNum={2} activeId={activeId} hasActive={hasActive} onClick={onElementClick} />
      <MuqaddimaParagraph elements={elements} startIdx={238} endIdx={258} pageNum={2} activeId={activeId} hasActive={hasActive} onClick={onElementClick} />
      <MuqaddimaParagraph elements={elements} startIdx={259} endIdx={287} pageNum={2} activeId={activeId} hasActive={hasActive} onClick={onElementClick} />
    </div>
  );
}

function Page3({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 3);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="arabic-text text-2xl text-text-main mb-2 font-bold text-center leading-relaxed">
        بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ
      </div>
      <Row els={els(["01","02","03","04","05","06","07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-1" />
      <Row els={els(["08","09","10","11","12","13","14"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-1" />
      <Row els={els(["15","16","17","18","19","20","21"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-1" />
      <Row els={els(["22","23","24","25","26","27","28"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-1" />
      <Divider />
      <Title text="حَرَكَاتْ" sub="Harakatlar" />
      <Row els={els(["29","30","31"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="3xl" gap="gap-6" />
      <Divider />
      <Row els={els(["32","33","34"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="3xl" gap="gap-6" />
      <Row els={els(["35","36","37"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-6" />
    </div>
  );
}

function Page4({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 4);
  return (
    <div className="flex flex-col items-center gap-2">
      <Title text="تکرار" sub="Takrorlash" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="3xl" gap="gap-6" />
      <Divider />
      <Row els={els(["04","05","06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="3xl" gap="gap-6" />
    </div>
  );
}

function Page5({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 5);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="رَ زَ مَ" sub="Ro, Za, Ma — so'zlar" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Title text="حرف نون" sub="Nun harfi" />
      <Row els={els(["04","05","06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["07","08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["10","11"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Title text="حرف یاء" sub="Ya harfi" />
      <Row els={els(["12","13","14"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["15","16"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["17","18"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page6({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 6);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="حرف باء" sub="Ba harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Title text="حرف كاف" sub="Kaf harfi" />
      <Row els={els(["10","11","12"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["13","14"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["15","16"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["17","18","19"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page7({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 7);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="حرف لام" sub="Lam harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["07","08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Title text="حرف واو" sub="Vav harfi" />
      <Row els={els(["11","12","13"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["14","15"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["16","17"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["18"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page8({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 8);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="حرف هاء" sub="Ha harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["06","07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Title text="حرف فاء" sub="Fa harfi" />
      <Row els={els(["10","11","12"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["13","14","15"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["16","17"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["18"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page9({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 9);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="حرف قاف" sub="Qof harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Title text="حرف شین" sub="Shin harfi" />
      <Row els={els(["08","09","10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["11","12","13"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["14","15"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page10({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 10);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="حرف سین" sub="Sin harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["06","07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Title text="حرف ثاء" sub="Tho harfi" />
      <Row els={els(["08","09","10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["11","12"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["13","14"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["15"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page11({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 11);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="حرف صاد" sub="Sod harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["06","07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Title text="حرف طاء" sub="To harfi" />
      <Row els={els(["08","09","10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["11","12","13"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["14","15"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page12({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 12);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="حرف جیم" sub="Jim harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Title text="حرف خاء" sub="Xo harfi" />
      <Row els={els(["08","09","10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["11","12"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["13","14","15"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page13({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 13);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="حرف حاء" sub="Ha harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["06","07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["08"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Title text="حرف غین" sub="G'ayn harfi" />
      <Row els={els(["09","10","11"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["12","13"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["14","15"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["16"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page14({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 14);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="حرف عین" sub="Ayn harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["05","06","07","08"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Title text="حرف دال" sub="Dal harfi" />
      <Row els={els(["09","10","11"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["12","13","14"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["15"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page15({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 15);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="حرف ضاد" sub="Dod harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Title text="حرف ذال" sub="Zal harfi" />
      <Row els={els(["08","09","10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["11","12"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["13","14"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page16({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 16);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="حرف ظاء" sub="Zo harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["06","07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["10","11"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

// ========== PAGES 17-21: MADLAR ==========

function Page17({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 17);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="حروف مدّی" sub="Mad harflari" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Divider />
      <div className="grid grid-cols-3 gap-2 w-full">
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs text-text-muted">Alif mad</p>
          <Row els={els(["04","05"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-2" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs text-text-muted">Ya mad</p>
          <Row els={els(["06","07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-2" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs text-text-muted">Vav mad</p>
          <Row els={els(["08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-2" />
        </div>
      </div>
      <Divider />
      <Row els={els(["10","11","12"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page18({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 18);
  return (
    <div className="flex flex-col items-center gap-2">
      <Title text="مدّی حرفلر" sub="Mad birikmalar" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-4" />
      <Row els={els(["04","05","06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-4" />
      <Divider />
      <Row els={els(["07","08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-4" />
    </div>
  );
}

function Page19({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 19);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="مدّی سوزلر" sub="Madli so'zlar" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["04","05","06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Row els={els(["08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page20({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 20);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="مدّی سوزلر (دوام)" sub="Madli so'zlar davomi" />
      <Row els={els(["01","02"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["03","04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Divider />
      <Row els={els(["05","06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Divider />
      <Row els={els(["08","09","10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

// ========== PAGES 21-25: TASHDID + TANVIN ==========

function Page21({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 21);
  return (
    <div className="flex flex-col items-center gap-1">
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Title text="تشدید" sub="Tashdid" />
      <Row els={els(["04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <Row els={els(["05","06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["07","08"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["09","10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page22({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 22);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="تشدید (دوام)" sub="Tashdid davomi" />
      <Row els={els(["01","02"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["03","04","05","06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-2" />
      <Divider />
      <Row els={els(["07","08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <Row els={els(["11","12"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
    </div>
  );
}

function Page23({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 23);
  return (
    <div className="flex flex-col items-center gap-1">
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Divider />
      <Title text="تنوین" sub="Tanvin" />
      <Row els={els(["04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <Row els={els(["05","06","07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="3xl" gap="gap-6" />
    </div>
  );
}

function Page24({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 24);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="تنوین مثاللر" sub="Tanvin misollari" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["04","05","06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Row els={els(["07","08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["10","11"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page25({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 25);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="تنوینلی تشدید" sub="Tanvinli tashdid" />
      <Row els={els(["01"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["02","03","04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["05"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["06","07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Divider />
      <Title text="الف و همزه" sub="Alif va Hamza" />
      <Row els={els(["08"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["09","10","11","12","13","14"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-2" />
    </div>
  );
}

// ========== PAGES 26-33: ALIF HAMZA, VASL, VAQF, IDG'OM ==========

function Page26({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 26);
  return (
    <div className="flex flex-col items-center gap-1">
      <Title text="همزه مثاللر" sub="Hamza misollari" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["04","05","06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Row els={els(["07","08"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["09","10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page27({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 27);
  return (
    <div className="flex flex-col items-center gap-2">
      <Title text="الف لام" sub="Alif Lom" />
      <Row els={els(["01","02"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Row els={els(["03","04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Row els={els(["05","06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page28({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 28);
  return (
    <div className="flex flex-col items-center gap-2">
      <Title text="الف لام (دوام)" sub="Alif Lom davomi" />
      <Row els={els(["01","02"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Row els={els(["03","04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Divider />
      <Row els={els(["05","06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page29({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 29);
  return (
    <div className="flex flex-col items-center gap-2">
      <Title text="بسملة و جمله‌لر" sub="Bismilla va jumlalar" />
      <Row els={els(["01"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["02"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Divider />
      <Row els={els(["04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

function Page30({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 30);
  return (
    <div className="flex flex-col items-center gap-2">
      <Title text="وصل" sub="Vasl" />
      <Row els={els(["01"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <Row els={els(["02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["04","05"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
    </div>
  );
}

function Page31({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 31);
  return (
    <div className="flex flex-col items-center gap-2">
      <Title text="وقف" sub="Vaqf (to'xtash)" />
      <Row els={els(["01"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <Row els={els(["02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["05"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
    </div>
  );
}

function Page32({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 32);
  return (
    <div className="flex flex-col items-center gap-2">
      <Title text="إدغام" sub="Idg'om" />
      <Row els={els(["01"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <Row els={els(["02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["05"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
    </div>
  );
}

function Page33({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 33);
  return (
    <div className="flex flex-col items-center gap-3">
      <Title text="تجوید قاعدالر" sub="Tajvid qoidalari" />
      <Row els={els(["01"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["02"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
      <Row els={els(["04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-3" />
    </div>
  );
}

// ========== PAGES 34-35: KALIMALAR ==========

function Page34({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 34);
  return (
    <div className="flex flex-col items-center gap-1">
      <Row els={els(["01"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <p className="text-xs text-text-muted">Kalima Tayyiba</p>
      <Row els={els(["02"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <p className="text-xs text-text-muted">Kalima Shahoda</p>
      <Row els={els(["03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" />
      <Row els={els(["04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" />
      <Divider />
      <Row els={els(["05"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" />
      <Divider />
      <Row els={els(["07"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <Row els={els(["08"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
    </div>
  );
}

function Page35({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 35);
  return (
    <div className="flex flex-col items-center gap-1">
      <Row els={els(["01"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["02"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" />
      <Divider />
      <Row els={els(["03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" />
      <Divider />
      <Row els={els(["05"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" />
    </div>
  );
}

// ========== PAGES 36-47: SURALAR ==========
// Common layout: surah title → bismillah → ayahs

function SurahPage({
  elements,
  pageNum,
  activeId,
  hasActive,
  onElementClick,
  hasBismillah = false,
}: PP & { pageNum: number; hasBismillah?: boolean }) {
  const { els } = usePageElements(elements, pageNum);
  const allIds = elements.map((e) => e.id.replace(`p${pageNum}_`, ""));

  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* Title */}
      <Row els={els([allIds[0]])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      {hasBismillah && (
        <Row els={els([allIds[1]])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      )}
      <Divider />
      {/* Ayahs */}
      {allIds.slice(hasBismillah ? 2 : 1).map((id) => (
        <Row key={id} els={els([id])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      ))}
    </div>
  );
}

function Page36(props: PP) {
  const { els } = usePageElements(props.elements, 36);
  return (
    <div className="flex flex-col items-center gap-1">
      <Row els={els(["01"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Row els={els(["02"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <Title text="سورة الفاتحة" sub="Fotiha surasi" />
      <Row els={els(["03"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["04"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["05"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["06"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Row els={els(["07"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Row els={els(["08"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Row els={els(["09"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
    </div>
  );
}

function Page37(props: PP) { return <SurahPage {...props} pageNum={37} />; }
function Page38(props: PP) { return <SurahPage {...props} pageNum={38} />; }
function Page39(props: PP) { return <SurahPage {...props} pageNum={39} />; }
function Page40(props: PP) { return <SurahPage {...props} pageNum={40} />; }
function Page41(props: PP) { return <SurahPage {...props} pageNum={41} />; }
function Page42(props: PP) { return <SurahPage {...props} pageNum={42} />; }
function Page43(props: PP) { return <SurahPage {...props} pageNum={43} />; }
function Page44(props: PP) { return <SurahPage {...props} pageNum={44} />; }
function Page45(props: PP) { return <SurahPage {...props} pageNum={45} />; }
function Page46(props: PP) { return <SurahPage {...props} pageNum={46} />; }
function Page47(props: PP) { return <SurahPage {...props} pageNum={47} />; }

// ========== PAGES 48-50: DUOLAR ==========

function Page48(props: PP) {
  const { els } = usePageElements(props.elements, 48);
  return (
    <div className="flex flex-col items-center gap-1">
      <Row els={els(["01"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <Row els={els(["02"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Row els={els(["03"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Row els={els(["04"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <Row els={els(["05"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <Row els={els(["06"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Row els={els(["07"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Row els={els(["08"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
    </div>
  );
}

function Page49(props: PP) {
  const { els } = usePageElements(props.elements, 49);
  return (
    <div className="flex flex-col items-center gap-1">
      <Row els={els(["01"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <Row els={els(["02"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Row els={els(["03"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["04"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Divider />
      <Row els={els(["05"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Row els={els(["06"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
    </div>
  );
}

function Page50(props: PP) {
  const { els } = usePageElements(props.elements, 50);
  return (
    <div className="flex flex-col items-center gap-1">
      <Row els={els(["01"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="lg" gap="gap-3" />
      <Divider />
      <Row els={els(["02"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Row els={els(["03"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Row els={els(["04"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["05"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
      <Row els={els(["06"])} activeId={props.activeId} hasActive={props.hasActive} onClick={props.onElementClick} size="md" gap="gap-2" />
    </div>
  );
}

// ========== REGISTRY ==========

const PAGE_RENDERERS: Record<number, React.ComponentType<PP>> = {
  1: Page1, 2: Page2,
  3: Page3, 4: Page4, 5: Page5, 6: Page6, 7: Page7,
  8: Page8, 9: Page9, 10: Page10, 11: Page11, 12: Page12,
  13: Page13, 14: Page14, 15: Page15, 16: Page16,
  17: Page17, 18: Page18, 19: Page19, 20: Page20,
  21: Page21, 22: Page22, 23: Page23, 24: Page24, 25: Page25,
  26: Page26, 27: Page27, 28: Page28, 29: Page29, 30: Page30,
  31: Page31, 32: Page32, 33: Page33,
  34: Page34, 35: Page35,
  36: Page36, 37: Page37, 38: Page38, 39: Page39, 40: Page40,
  41: Page41, 42: Page42, 43: Page43, 44: Page44, 45: Page45,
  46: Page46, 47: Page47,
  48: Page48, 49: Page49, 50: Page50,
};

export function hasRenderer(pageNumber: number): boolean {
  return pageNumber in PAGE_RENDERERS;
}

export function RenderedPage({
  pageNumber,
  elements,
  activeElementId,
  onElementClick,
  onBackgroundClick,
}: RenderedPageProps) {
  const hasActive = activeElementId !== null;
  const PageRenderer = PAGE_RENDERERS[pageNumber];

  if (!PageRenderer) return null;

  return (
    <div
      className="w-full bg-white/[0.05] rounded-2xl border border-white/10 p-4"
      onClick={onBackgroundClick}
    >
      <PageRenderer
        elements={elements}
        activeId={activeElementId}
        hasActive={hasActive}
        onElementClick={onElementClick}
      />
    </div>
  );
}

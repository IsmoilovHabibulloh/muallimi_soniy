"use client";

import type { CSSProperties } from "react";
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

const MUQADDIMA_PARAGRAPHS: string[] = [
  "Qo‘lingizdagi ushbu kitobcha va uning muallifiga chin ma’noda baxtli taqdir nasib etgan. 1868-yilning 26-sentyabrida Qozon uyezdining Toshsuv qishlog‘ida tug‘ilib, Qozondagi “Qosimiya” madrasasida ta’lim olgan Ahmad Hodiy Maqsudiy rahmatullohi alayhi hali ancha yoshligida ushbu qo‘llanmani tuzar ekan, u asrlar osha avloddan-avlodga Alloh taoloning Kalomi asosida arab alifbosida xat-savod o‘rgatish bilan birga dastlabki qur’oniy saboq berishda davom etishini Parvardigori olamdan so‘ragani aniq. Hozirgi paytda bu sohada ko‘plab biri-biridan qiziqarli, salmoqli darslik va qo‘llanmalar yaratilganiga qaramasdan, muallifning boshqa asarlari, jumladan, “Ibodati islomiya” singari bu mo‘’jaz kitobcha ham sodda, o‘zlashtirishga oson va dilga yaqinligi bilan hanuzgacha ko‘plab musulmon diyorlarida ilm toliblarini o‘ziga tortib kelayotgani, albatta, bu duoning ijobatidir.",
  "O‘zbekiston Respublikasi Fanlar akademiyasi Sharqshunoslik instituti ko‘lyozmalar xazinasida saqlanayotgan hujjatlarga va boshqa manbalarga asosan, kitobchaning Markaziy Osiyo hududida tarqalish tarixi quyidagicha kechganini taxmin qilish mumkin. 1902-yilda Toshkentda rus-tuzem maktablari o‘zbek sinflari uchun Saidrasul Saidazizov (1866–1933) “Ustodi avval” (“Birinchi ustoz”) qo‘llanmasi nashrdan chiqadi. Bu Urta Osiyoda tovush usuli (usuli savtiya)da tuzilgan birinchi darslik bo‘lib, oktyabr inqilobiga qadar rus-tuzem maktablaridagina emas, yangi usuldagi maktablarda ham o‘zbek tilidan asosiy savod chiqarish kitobi sifatida qo‘llangan.",
  "O‘sha davrda Rossiyada Ahmad Hodiy Maqsudiyning ruscha-tatarcha “Muallimi avval” qo‘llanmasi keng shuhrat qozongan edi. Kitobchaning bizning yurtimizda nashr etilgan keyingi barcha nashrlariga asos bo‘lib xizmat qilgan nusxasi sarvarag‘ida buni tasdiqlovchi rasmiy ma’lumotlar keltiriladi. Ushbu alifbo 1913-yil 9-aprelda muayyan raqamli hujjat bilan tatar va rus-tatar maktablarida sinfda foydalanishga kiritilgani qayd etilgach, yana bunday ta’kidlanadi: “Un to‘rtinchi nashri. Birinchi nashriga 1892-yil 28-yanvarda Petrograd senzurasi ruxsat bergan. ‘Umid’ shirkati matbaasi. Qozon, 1917 y.”. Bundan kelib chiqadiki, birinchi nashriga ruxsat berilgach, kitobcha yigirma yildan ko‘proq muddat mobaynida norasmiy ravishda xalq ta’limi sohasida obru qozonib ulgurgach, davlat unga maktablar uchun rasmiy qo‘llanma maqomini berishga majbur bo‘lgan.",
  "Shu davrdan e’tiboran kitobcha Rossiya imperiyasi, keyinchalik sobiq Sovet Ittifoqi hududidagi musulmon o‘lkalarda avval lotin, so‘ngra kirill alifbosi muomalaga kiritilganiga qadar shu vazifani bajarib keldi. Kitobcha 1917-yilga qadar o‘n to‘rt marta, keyingi davrlarda yana necha o‘nlab bora nashr etilganining o‘zi buning yorqin isbotidir. Jumladan, 1913-yili Toshkentda ham faqat noshir Ali Asg‘ar (Kalinin) ismi ko‘rsatilgan “Muallimi soniy” kitobchasi paydo bo‘ladiki, u mazmunan aynan Maqsudiyning biz fikr yuritayotgan qo‘llanmasiga muvofiq kelardi. Albatta, qo‘llanmaning keyingi nashrlari muallif ismi sharifi bilan qayta-qayta chiqib turdi. O‘shandan buyon u faqat bizdagina emas, balki boshqa ko‘plab mamlakatlarda avlodlarga tengsiz beminnat muallimlik qilib keladi.",
  "Shularni hisobga olgan holda, mazkur qo‘llanmani holicha, ya’ni nusxa ko‘chirilaverishidan xiralashib qolgan xatini tiniqlashtirgan va boshqa juz’iy texnik xatolarni tuzatgan holda, o‘quvchilarga taqdim etishga qaror qilindi.",
  "Albatta, bugungi kunda Madina bosma mushaflar keng ommalashgani bois dastalab ushbu kitobchani ham ularga monand o‘zgartirish rejasi ham yo‘q emasdi. Birok, bir jihati, uzoq davr davomida xalqlarga qadrdon bo‘lib, yaxshi xizmat kilib kelayotgan kitobchani asl xolicha saqlab kolish uni yaratgan va shu asosda ilm maydoniga qadam qo‘ygan ajdodlarimiz xotirasiga hurmat va minnatdorlik belgisi bo‘lib tuyuldi. Shunga ko‘ra, qo‘llanmaning asl ruhiyatini saqlab qolish maqsadidan kelib chiqib, kitobga deyarli o‘zgarish kiritilmadi. Faqatgina suralarning xati diyorimizda Madina bosma mushaflar ommalashgani bois harflar ko‘zga moslashishi oson bo‘lishi uchun Madina bosma xatida, harakatlari esa Qozon bosma holatida qoldi. Shuningdek, asosiy maqsad o‘quvchi arab xatini shunchaki o‘qishnigina emas, balki boshdanok har bir harfni maxraji (joy-joyidan) chiqarishni yaxshi o‘rganish orqali Qur’on suralari qiroatiga go‘zal talaffuz bilan kirishuvini ko‘zlab, kitobga ovoz tushirilgan disk ham ilova qilinmoqda.",
  "Talaba darsni o‘zlashtirish jarayonida diskdagi ovozga diqqat qilgan holda, harflarning talaffuz sifati hamda fatha, kasra, zammadan iborat harakatlarning ado etilishiga e’tibor qaratmog‘i lozim. Chunki Qur’on qiroatida aksar xatolar (zod) o‘rniga (zo) tovushi, (sod) o‘rniga (sin) yoki (se) tovushiga o‘xshatib, maxrajidan boshqa joydan chiqarilishi; jarangli (be) jarangsiz (pe) tovushiga o‘xshatib talaffuz etilishi; sukunli “mim”, “nun” va “lom” harflarining qalqala bo‘lib tebranib qolishi kabi sifatlar va harakatlarda lablarning keragicha harakatlanmay, ixtilos (harakatning 2/3 qismi yo‘qolib, 1/3 qismi talaffuzda namoyon) bo‘lishi kabi holatlar yuz berishida kuzatiladi.",
  "Shu jihatlarga e’tibor qaratilsa, ushbu ilovali qo‘llanma Qur’oni karimni to‘g‘ri o‘qishni o‘rganishda yana bir muhim vosita bo‘lib xizmat qiladi, degan umiddamiz.",
  "Garchi Qur’oni karim kalimalaridan boshqa so‘zlarni talaffuz qilishda tajvid qoidalariga rioya qilish vojib bo‘lmasa-da, maqsad Qur’oni karimni to‘g‘ri o‘qishga odatlantirish bo‘lgani uchun imon kalimalari ham tajvid asosida o‘qib ko‘rsatildi.",
];

// ========== SHARED COMPONENTS ==========

function ArabicEl({
  el,
  isActive,
  hasActive,
  onClick,
  size = "lg",
  mad = false,
}: {
  el: Element;
  isActive: boolean;
  hasActive: boolean;
  onClick: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  /** Mad sahifalarida: mad-arabic-text class (tikka fatha/kasra, katta damma) */
  mad?: boolean;
}) {
  // Active state uses primary green for all element types (per UX decision).
  // Type-specific colors (ELEMENT_COLORS) reserved for legend / future use.
  void ELEMENT_COLORS;
  void el.type;
  // Fluid sizing: scales with CARD container width via cqi so letters fill
  // ~75-80% of the card at typical phone sizes. Mins keep 7-item 2xl rows
  // fitting at 250px container; max values match original fixed sizes.
  const sizeClasses: Record<string, string> = {
    sm: "text-[clamp(0.8125rem,5cqi,1.125rem)] px-[clamp(0.1875rem,1.2cqi,0.375rem)] py-[clamp(0.0625rem,0.5cqi,0.125rem)]",
    md: "text-[clamp(1rem,5.6cqi,1.25rem)] px-[clamp(0.25rem,1.6cqi,0.5rem)] py-[clamp(0.0625rem,0.5cqi,0.125rem)]",
    lg: "text-[clamp(1.125rem,6.6cqi,1.5rem)] px-[clamp(0.3125rem,1.8cqi,0.625rem)] py-[clamp(0.125rem,0.6cqi,0.25rem)]",
    xl: "text-[clamp(1.25rem,7.8cqi,1.875rem)] px-[clamp(0.375rem,2.2cqi,0.75rem)] py-[clamp(0.125rem,0.7cqi,0.25rem)]",
    "2xl": "text-[clamp(1.25rem,8.2cqi,2.25rem)] px-[clamp(0.25rem,1.8cqi,0.75rem)] py-[clamp(0.1875rem,0.8cqi,0.375rem)]",
    "3xl": "text-[clamp(1.625rem,12cqi,3rem)] px-[clamp(0.5rem,3cqi,1rem)] py-[clamp(0.25rem,1cqi,0.5rem)]",
    "4xl": "text-[clamp(2rem,14cqi,3.75rem)] px-[clamp(0.625rem,3.6cqi,1.25rem)] py-[clamp(0.25rem,1.2cqi,0.5rem)]",
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`${mad ? "mad-arabic-text" : "arabic-text"} element-spring rounded-lg inline-flex items-center justify-center leading-relaxed ${mad ? "" : "font-bold"} ${sizeClasses[size]}`}
      style={{
        color: isActive ? "#ffffff" : "var(--color-text-main)",
        backgroundColor: isActive ? "var(--color-primary)" : "transparent",
        border: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
        boxShadow: isActive ? "0 8px 28px var(--color-primary-glow)" : "none",
        transform: isActive ? "scale(1.18)" : "none",
        textShadow: isActive ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
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

// Map legacy fixed Tailwind gap classes → fluid clamp() keyed on card
// container width (cqi) so gaps scale with card, not viewport. Max values
// equal the original fixed size; mins keep 7-item 2xl rows fitting at 250px
// container.
const FLUID_GAP: Record<string, string> = {
  "gap-1": "gap-[clamp(0.125rem,0.9cqi,0.25rem)]",
  "gap-1.5": "gap-[clamp(0.1875rem,1.6cqi,0.375rem)]",
  "gap-2": "gap-[clamp(0.25rem,2cqi,0.5rem)]",
  "gap-3": "gap-[clamp(0.375rem,2.8cqi,0.75rem)]",
  "gap-5": "gap-[clamp(0.625rem,4.2cqi,1.25rem)]",
  "gap-6": "gap-[clamp(0.75rem,5cqi,1.5rem)]",
};

function Row({
  els,
  all,
  activeId,
  hasActive,
  onClick,
  size = "xl",
  gap = "gap-3",
  mad = false,
}: {
  els: Element[];
  all?: Element[];
  activeId: string | null;
  hasActive: boolean;
  onClick: (el: Element) => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  gap?: string;
  /** Mad sahifalarida: mad-arabic-text class (tikka harakat, katta damma) */
  mad?: boolean;
}) {
  const gapClass = FLUID_GAP[gap] ?? gap;
  return (
    <div className={`flex w-full flex-row-reverse flex-wrap justify-center ${gapClass}`}>
      {els.map((el) => (
        <ArabicEl
          key={el.id}
          el={el}
          isActive={activeId === el.id}
          hasActive={hasActive}
          onClick={() => onClick(el)}
          size={size}
          mad={mad}
        />
      ))}
    </div>
  );
}

// Position-labelled row — shows labels (Boshida / O'rtasida / Oxirida) above
// each element. els order maps to labels order; both render RTL visually.
function PositionRow({
  els,
  labels,
  activeId,
  hasActive,
  onClick,
  size = "2xl",
}: {
  els: Element[];
  labels: string[];
  activeId: string | null;
  hasActive: boolean;
  onClick: (el: Element) => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}) {
  return (
    <div className="flex flex-row-reverse justify-center gap-6">
      {els.map((el, i) => (
        <div key={el.id} className="flex flex-col items-center gap-1.5">
          <p className="text-[11px] uppercase tracking-wide text-text-muted">
            {labels[i]}
          </p>
          <ArabicEl
            el={el}
            isActive={activeId === el.id}
            hasActive={hasActive}
            onClick={() => onClick(el)}
            size={size}
          />
        </div>
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

// Cover page (muqova) — 3 interactive title buttons + static author/reader.
function Page0({ elements, activeId, hasActive, onElementClick }: PP) {
  const titleMain = elements.find((e) => e.id === "p0_m01_title_main");
  const yoki      = elements.find((e) => e.id === "p0_m02_yoki");
  const titleSub  = elements.find((e) => e.id === "p0_m03_title_sub");

  const coverBtn = (el: Element | undefined, sizeClass: string) => {
    if (!el) return null;
    const isActive = activeId === el.id;
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onElementClick(el);
        }}
        className={`arabic-text element-spring rounded-2xl font-bold leading-tight px-5 py-2 ${sizeClass}`}
        style={{
          fontFamily: "var(--font-arabic)",
          color: isActive ? "#ffffff" : "var(--color-primary-dark)",
          backgroundColor: isActive ? "var(--color-primary)" : "transparent",
          boxShadow: isActive ? "0 8px 28px var(--color-primary-glow)" : "none",
          transform: isActive ? "scale(1.05)" : "none",
          textShadow: isActive ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {el.arabic}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-10 min-h-[60vh]">
      <div>
        <p className="text-xs uppercase tracking-widest text-text-muted">Muallif</p>
        <p
          className="arabic-text text-xl mt-2"
          style={{ color: "var(--color-el-jumla)" }}
        >
          أحمد هادي مقصودي
        </p>
      </div>

      {coverBtn(titleMain, "text-6xl")}

      <CoverDivider />

      {yoki && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onElementClick(yoki);
          }}
          className="arabic-text element-spring rounded-xl px-4 py-1 text-2xl"
          style={{
            fontFamily: "var(--font-arabic)",
            color: activeId === yoki.id ? "#ffffff" : "var(--color-text-main)",
            backgroundColor: activeId === yoki.id ? "var(--color-primary)" : "transparent",
            boxShadow: activeId === yoki.id ? "0 6px 20px var(--color-primary-glow)" : "none",
            textShadow: activeId === yoki.id ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
          }}
        >
          {yoki.arabic}
        </button>
      )}

      <CoverDivider />

      {coverBtn(titleSub, "text-5xl")}

      <p className="text-sm text-text-muted mt-6 flex items-center gap-2">
        <span aria-hidden="true">🎧</span>
        <span>O&apos;qidi: Jahongir qori Nematov</span>
      </p>
    </div>
  );
}

function CoverDivider() {
  return (
    <div className="flex items-center gap-2 w-full max-w-[200px]">
      <div
        className="flex-1 h-px"
        style={{ background: "var(--color-el-jumla)", opacity: 0.5 }}
      />
      <span style={{ color: "var(--color-el-jumla)", opacity: 0.7 }}>◇ ◇ ◇</span>
      <div
        className="flex-1 h-px"
        style={{ background: "var(--color-el-jumla)", opacity: 0.5 }}
      />
    </div>
  );
}

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
          }}
        >
          {bismillah.arabic}
        </button>
      )}
      <h2 className="text-lg font-bold text-text-secondary text-center mb-2">MUQADDIMA</h2>
      {MUQADDIMA_PARAGRAPHS.map((text, i) => (
        <p key={i} className="text-sm leading-relaxed text-text-main text-justify indent-6">
          {text}
        </p>
      ))}
    </div>
  );
}

function SentenceBtn({
  el,
  isActive,
  hasActive,
  onClick,
  size = "md",
}: {
  el: Element;
  isActive: boolean;
  hasActive: boolean;
  onClick: () => void;
  size?: "md" | "lg";
}) {
  const sizeClass = size === "lg" ? "text-2xl" : "text-xl";
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`arabic-text element-spring rounded-lg font-bold text-center leading-relaxed px-4 py-1 ${sizeClass}`}
      style={{
        fontFamily: "var(--font-arabic)",
        color: isActive ? "#ffffff" : "var(--color-text-main)",
        backgroundColor: isActive ? "var(--color-primary)" : "transparent",
        boxShadow: isActive ? "0 6px 20px var(--color-primary-glow)" : "none",
        textShadow: isActive ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
      }}
    >
      {el.arabic}
    </button>
  );
}

function RuleBlock({
  el,
  isActive,
  hasActive,
  onClick,
  children,
}: {
  el: Element;
  isActive: boolean;
  hasActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  void el;
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="element-spring rounded-xl px-4 py-1 text-sm leading-relaxed text-center w-full max-w-[560px]"
      style={{
        color: isActive ? "#ffffff" : "var(--color-text-muted)",
        backgroundColor: isActive ? "var(--color-primary)" : "transparent",
        boxShadow: isActive ? "0 6px 20px var(--color-primary-glow)" : "none",
        textShadow: isActive ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function Page3({ elements, activeId, hasActive, onElementClick }: PP) {
  const auzubillah = elements.find((e) => e.id === "p3_i01_auzubillah");
  const bismillah = elements.find((e) => e.id === "p3_i02_bismillah");
  const rule1 = elements.find((e) => e.id === "p3_i03_rule1");
  const misol = elements.find((e) => e.id === "p3_i04_misol");
  const rule2 = elements.find((e) => e.id === "p3_i05_rule2");
  const { els } = usePageElements(elements, 3);
  return (
    <div className="flex flex-col items-center gap-1">
      {auzubillah && (
        <SentenceBtn
          el={auzubillah}
          isActive={activeId === auzubillah.id}
          hasActive={hasActive}
          onClick={() => onElementClick(auzubillah)}
          size="md"
        />
      )}
      {bismillah && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onElementClick(bismillah);
          }}
          className="element-spring rounded-xl px-1 sm:px-6 py-2 transition-all font-bismillah max-w-full"
          aria-label={bismillah.uzbek}
          style={{
            color: activeId === bismillah.id ? "#ffffff" : "var(--color-text-main)",
            backgroundColor: activeId === bismillah.id ? "var(--color-primary)" : "transparent",
            boxShadow: activeId === bismillah.id ? "0 6px 20px var(--color-primary-glow)" : "none",
            textShadow: activeId === bismillah.id ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
            fontSize: "clamp(1rem, 5.8vw, 2.25rem)",
            lineHeight: 1.4,
          }}
        >
          <span aria-hidden="true">﷽</span>
        </button>
      )}
      {rule1 && (
        <div className="w-full flex justify-center mt-1">
          <RuleBlock
            el={rule1}
            isActive={activeId === rule1.id}
            hasActive={hasActive}
            onClick={() => onElementClick(rule1)}
          >
            {rule1.uzbek}
          </RuleBlock>
        </div>
      )}
      {misol && (
        <div className="w-full flex justify-center">
          <RuleBlock
            el={misol}
            isActive={activeId === misol.id}
            hasActive={hasActive}
            onClick={() => onElementClick(misol)}
          >
            <span>Misol uchun </span>
            <span className="arabic-text" style={{ fontFamily: "var(--font-arabic)" }}>
              اب. اج, اس
            </span>
          </RuleBlock>
        </div>
      )}
      {rule2 && (
        <div className="w-full flex justify-center mb-1">
          <RuleBlock
            el={rule2}
            isActive={activeId === rule2.id}
            hasActive={hasActive}
            onClick={() => onElementClick(rule2)}
          >
            {rule2.uzbek}
          </RuleBlock>
        </div>
      )}
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

// Page 4 — Za / Mim / Ta amaliyoti (image 4.jpg). 40 elements.
function Page4({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 4);
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Za section (13 items) */}
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07","08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-2" />
      <Row els={els(["10","11","12","13"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Divider />
      {/* Mim section (19 items) */}
      <Row els={els(["14","15","16"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["17","18","19","20","21","22"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="xl" gap="gap-2" />
      <Row els={els(["23","24","25","26","27","28"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["29","30","31","32"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Divider />
      {/* Ta section (8 items) */}
      <Row els={els(["33","34","35"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["36","37","38","39","40"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
    </div>
  );
}

function Page5({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 5);
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Ro davom — 9 so'z (2 qator) */}
      <Row els={els(["01","02","03","04","05"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["06","07","08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Divider />
      {/* Nun — 20 element */}
      <Title text="حرف نون" sub="Nun harfi" />
      <Row els={els(["10","11","12"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["13","14","15","16","17","18"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["19","20","21","22","23","24"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["25","26","27","28","29"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Divider />
      {/* Ya — 18 element */}
      <Title text="حرف یاء" sub="Ya harfi" />
      <Row els={els(["30","31","32"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["33","34","35","36","37","38"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["39","40","41","42","43"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["44","45","46","47"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
    </div>
  );
}

function Page6({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 6);
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Ba — 18 element */}
      <Title text="حرف باء" sub="Ba harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07","08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["10","11","12","13","14"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["15","16","17","18"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Divider />
      {/* Kaf — 21 element */}
      <Title text="حرف كاف" sub="Kaf harfi" />
      <Row els={els(["19","20","21"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["22","23","24","25"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["26","27","28","29","30"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["31","32","33","34","35"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["36","37","38","39"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
    </div>
  );
}

function Page7({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 7);
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Lam — 26 element */}
      <Title text="حرف لام" sub="Lam harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07","08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["10","11","12","13","14","15"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["16","17","18","19","20","21"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["22","23","24","25","26"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      {/* Vav — 23 element */}
      <Title text="حرف واو" sub="Vav harfi" />
      <Row els={els(["27","28","29"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["30","31","32","33"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-2" />
      <Row els={els(["34","35","36","37","38","39"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["40","41","42","43","44","45"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["46","47","48","49"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
    </div>
  );
}

function Page8({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 8);
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Ha (ه) — 21 element */}
      <Title text="حرف هاء" sub="Ha harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07","08","09","10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["11","12","13","14","15","16"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["17","18","19","20","21"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      {/* Fa (ف) — 25 element */}
      <Title text="حرف فاء" sub="Fa harfi" />
      <Row els={els(["22","23","24"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["25","26","27","28","29","30"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["31","32","33","34","35","36"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["37","38","39","40","41","42"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["43","44","45","46"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
    </div>
  );
}

function Page9({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 9);
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Qof (ق) — 26 element */}
      <Title text="حرف قاف" sub="Qof harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07","08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["10","11","12","13","14","15","16"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(["17","18","19","20"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      <Row els={els(["21","22","23","24","25","26"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      {/* Shin (ش) — 24 element */}
      <Title text="حرف شین" sub="Shin harfi" />
      <Row els={els(["27","28","29"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["30","31","32","33","34","35"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["36","37","38","39","40","41"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["42","43","44","45","46"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["47","48","49","50"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
    </div>
  );
}

function Page10({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 10);
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Sin (س) — 23 element */}
      <Title text="حرف سین" sub="Sin harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07","08"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["09","10","11","12","13","14"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["15","16","17","18","19"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["20","21","22","23"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      {/* Tsa (ث) — 30 element */}
      <Title text="حرف ثاء" sub="Tho harfi" />
      <Row els={els(["24","25","26"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["27","28","29","30","31","32"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["33","34","35","36","37","38"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["39","40","41","42","43"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["44","45","46","47"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      <Row els={els(["48","49","50","51","52","53"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
    </div>
  );
}

function Page11({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 11);
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Sod (ص) — 20 element */}
      <Title text="حرف صاد" sub="Sod harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07","08","09","10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["11","12","13","14"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      <Row els={els(["15","16","17","18","19","20"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      {/* Tho (ط) — 29 element */}
      <Title text="حرف طاء" sub="To harfi" />
      <Row els={els(["21","22","23"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["24","25","26","27","28","29"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["30","31","32","33","34","35"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["36","37","38","39"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["40","41","42","43"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      <Row els={els(["44","45","46","47","48","49"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
    </div>
  );
}

function Page12({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 12);
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Jim (ج) — 18 element */}
      <Title text="حرف جیم" sub="Jim harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07","08"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["09","10","11","12","13","14"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["15","16","17","18"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      {/* Xo (خ) — 23 element */}
      <Title text="حرف خاء" sub="Xo harfi" />
      <Row els={els(["19","20","21"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["22","23","24","25","26","27"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["28","29","30","31","32","33"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["34","35","36","37"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["38","39","40","41"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
    </div>
  );
}

function Page13({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 13);
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Ha (ح) — 28 element: 3 header + 6 + 5 + 4 + 4 + 6 taqqoslash */}
      <Title text="حرف حاء" sub="Ha harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07","08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["10","11","12","13","14"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["15","16","17","18"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["19","20","21","22"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      {/* Taqqoslash: خَلْقُ-حَلْقُ، خَتْمُ-حَتْمُ، اَرْخَمْ-اَرْحَمْ */}
      <Row els={els(["23","24","25","26","27","28"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      {/* G'ayn (غ) — 18 element: 3 header + 6 + 5 + 4 */}
      <Title text="حرف غین" sub="G'ayn harfi" />
      <Row els={els(["29","30","31"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["32","33","34","35","36","37"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["38","39","40","41","42"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["43","44","45","46"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
    </div>
  );
}

function Page14({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 14);
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Ayn (ع) — 27 element */}
      <Title text="حرف عین" sub="Ayn harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07","08","09","10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["11","12","13","14","15","16"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["17","18","19","20","21"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      <Row els={els(["22","23","24","25","26","27"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Divider />
      {/* Dal (د) — 23 element */}
      <Title text="حرف دال" sub="Dal harfi" />
      <Row els={els(["28","29","30"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["31","32","33","34","35","36"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["37","38","39","40","41","42"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["43","44","45","46"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["47","48","49","50"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
    </div>
  );
}

function Page15({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 15);
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Dod (ض) — 25 element: 3 header + 6 + 6 + 4 + 6 taqqoslash */}
      <Title text="حرف ضاد" sub="Dod harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07","08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(["10","11","12","13","14","15"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-0.5" />
      <Row els={els(["16","17","18","19"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Divider />
      {/* Taqqoslash: دَرْسُ-ضَرْسُ، وَدْعُ-وَضْعُ، بَعْدُ-بَعْضُ */}
      <Row els={els(["20","21","22","23","24","25"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Divider />
      {/* Zal (ذ) — 29 element: 3 header + 8 + 6 + 6 + 6 taqqoslash */}
      <Title text="حرف ذال" sub="Zal harfi" />
      <Row els={els(["26","27","28"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["29","30","31","32","33","34","35","36"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-0.5" />
      <Row els={els(["37","38","39","40","41","42"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(["43","44","45","46","47","48"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Divider />
      {/* Taqqoslash: ذِفْرُ-زِفْرُ، بَذْلُ-بَزْلُ، اَبْذَلُ-اَبْزَلُ */}
      <Row els={els(["49","50","51","52","53","54"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
    </div>
  );
}

function Page16({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 16);
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Zo (ظ) — 49 element */}
      <Title text="حرف ظاء" sub="Zo harfi" />
      <Row els={els(["01","02","03"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="2xl" gap="gap-5" />
      <Row els={els(["04","05","06","07","08","09"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["10","11","12","13","14","15"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["16","17","18","19","20","21"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["22","23","24","25","26","27"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["28","29","30","31","32","33"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["34","35","36","37"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Divider />
      {/* Taqqoslash qatori — 12 so'z, 6 juftlik (ذ/ظ, ح-ظ/ح-ض, ظ/ض va ز/ظ) */}
      <Row els={els(["38","39","40","41","42","43"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <Row els={els(["44","45","46","47","48","49"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
    </div>
  );
}

// ========== PAGES 17-21: MADLAR ==========

// Kitob muqaddimasidagi mad yozilishi qoidalari (32. madli 01.mp3 0-29s da
// ovoz bilan aytiladi). Mad mavzusining butun boblarida (17-21) tepada
// ko'rsatiladi — foydalanuvchi kitob o'rgatgan qoidani UI dan ham o'qiydi.
// `rule` element bor bo'lsa — click qilib audio (muqaddima narration) ijro
// etiladi; bo'lmasa statik ko'rsatiladi.
function MadRule({
  rule,
  isActive,
  hasActive,
  onClick,
}: {
  rule?: Element;
  isActive?: boolean;
  hasActive?: boolean;
  onClick?: (el: Element) => void;
}) {
  const clickable = !!rule && !!onClick;
  const content = (
    <>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold text-text-main">
          Mad yozilishi qoidalari
          <span className="ml-1 text-text-muted font-normal">
            (kitob muqaddimasidan)
          </span>
        </p>
        {clickable && (
          <span
            className="flex shrink-0 items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary"
            aria-hidden
          >
            <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor">
              <path d="M2 1.5v7l6-3.5z" />
            </svg>
            eshitish
          </span>
        )}
      </div>
      {/* Audio narration (0-29s) verbatim — 6 gap. 4-5 asosiy qoidalar bold. */}
      <div className="mt-1 space-y-1 text-[11px] leading-snug text-text-muted">
        <p>
          Bungacha yozilgan arabcha so&apos;zlar madsiz so&apos;zlar edi.
          Endi arabcha so&apos;zlarining madliylari ko&apos;rsatiladi.
        </p>
        <p>
          Arabcha so&apos;zlar madliy bo&apos;lganda fatha, kasra va zamma
          alomatlari boshqacha yoziladi:
        </p>
        <ul className="pl-3.5 list-disc space-y-0.5 marker:text-primary">
          <li className="text-text-main">
            <span className="font-semibold">
              Fatha va kasra alomatlari yonboshlatilmay, balki tikka
              yoziladi.
            </span>
          </li>
          <li className="text-text-main">
            <span className="font-semibold">
              Zamma alomati odatiy zammadan ko&apos;ra kattaroq,
              yo&apos;g&apos;onroq yoziladi.
            </span>
          </li>
        </ul>
        <p>O&apos;quvchilar bu o&apos;zgarishlarga diqqat qilishlari kerak.</p>
      </div>
    </>
  );

  const baseClass =
    "w-full rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-left element-spring";
  const activeStyle: CSSProperties = isActive
    ? {
        borderColor: "var(--color-primary)",
        backgroundColor: "rgba(34, 197, 94, 0.12)",
        boxShadow: "0 8px 24px var(--color-primary-glow)",
      }
    : {};

  if (clickable) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick!(rule!);
        }}
        className={baseClass}
        style={activeStyle}
      >
        {content}
      </button>
    );
  }
  return <div className={baseClass}>{content}</div>;
}

// Tashdid qoidasi banner — `MadRule` ga o'xshash. Tashdid mavzusi boshida
// (sahifa 21) tepada turadi va to'liq qoidani vizual + matn bilan tushuntiradi.
// Vizual: 3 ta `ـَّ ـِّ ـُّ` markerlari (chiziq = harf, alomatlar = harf
// ustiga/ostiga qo'yiladi). `rule` element bor bo'lsa — click qilib audio
// (intro narration: "Ushbu tashdid alomatlari qo'yilgan harflar ikkilantirib
// o'qiladi") ijro etiladi. Tanvin sahifalarida ham xuddi shu pattern'ni
// (TanvinRule) qo'llash kerak.
function TashdidRule({
  rule,
  isActive,
  hasActive,
  onClick,
}: {
  rule?: Element;
  isActive?: boolean;
  hasActive?: boolean;
  onClick?: (el: Element) => void;
}) {
  const clickable = !!rule && !!onClick;
  const content = (
    <>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold text-text-main">
          Tashdid qoidasi
          <span className="ml-1 text-text-muted font-normal">(kitobdan)</span>
        </p>
        {clickable && (
          <span
            className="flex shrink-0 items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary"
            aria-hidden
          >
            <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor">
              <path d="M2 1.5v7l6-3.5z" />
            </svg>
            eshitish
          </span>
        )}
      </div>

      {/* Vizual demo: chiziq = harf; alomatlar uning ustiga/ostiga qo'yiladi.
          Custom Noto Naskh (uni06510650 ligature olib tashlangan) kasra'ni
          shadda+harf ostida an'anaviy joyga chizadi. */}
      <div className="my-3 flex flex-row-reverse justify-center gap-8 text-text-main">
        <span
          className="arabic-text text-[2.5rem] leading-none"
          style={{ fontFamily: "var(--font-arabic)" }}
        >
          ـَّ
        </span>
        <span
          className="arabic-text text-[2.5rem] leading-none"
          style={{ fontFamily: "var(--font-arabic)" }}
        >
          ـِّ
        </span>
        <span
          className="arabic-text text-[2.5rem] leading-none"
          style={{ fontFamily: "var(--font-arabic)" }}
        >
          ـُّ
        </span>
      </div>

      {/* Audio narration (0-9.9s) verbatim — kitobdagi chig'atoy turkiy
          matnning zamonaviy o'zbek talqini. Hech narsa qo'shilmaydi. */}
      <p className="text-[11px] leading-snug text-text-main">
        Tashdidli harflar ustiga ushbu tashdid alomatlari qo&apos;yilgan
        harflar ikkilantirib o&apos;qiladi.
      </p>
    </>
  );

  const baseClass =
    "w-full rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-left element-spring";
  const activeStyle: CSSProperties = isActive
    ? {
        borderColor: "var(--color-primary)",
        backgroundColor: "rgba(34, 197, 94, 0.12)",
        boxShadow: "0 8px 24px var(--color-primary-glow)",
      }
    : {};

  if (clickable) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick!(rule!);
        }}
        className={baseClass}
        style={activeStyle}
      >
        {content}
      </button>
    );
  }
  return <div className={baseClass}>{content}</div>;
}

// Tanvin qoidasi banner — `TashdidRule`/`MadRule` ga mos. Sahifa 23 da
// tashdid davomidan so'ng paydo bo'ladi: title + 3 tanvin belgisi (an/in/un
// tovush demolari) + chig'atoy izoh (audio narration verbatim) + 3 misol
// juftliklari (اً = اَنْ pattern).
function TanvinRule({
  rule,
  signs,
  examples,
  activeId,
  hasActive,
  onClick,
}: {
  rule?: Element;
  signs: Element[];
  examples: Element[];
  activeId: string | null;
  hasActive: boolean;
  onClick: (el: Element) => void;
}) {
  const ruleClickable = !!rule;
  const ruleActive = !!rule && activeId === rule.id;

  return (
    <div className="w-full rounded-xl border border-primary/20 bg-primary/5 px-3 py-1.5">
      {/* Title bar with eshitish badge — click bilan to'liq narration ijro */}
      {ruleClickable && rule ? (
        <button
          onClick={(e) => { e.stopPropagation(); onClick(rule); }}
          className="w-full flex items-center justify-between gap-2 element-spring rounded-md"
          style={{
            backgroundColor: ruleActive ? "rgba(34,197,94,0.12)" : "transparent",
            boxShadow: ruleActive ? "0 6px 20px var(--color-primary-glow)" : "none",
          }}
        >
          <h3 className="arabic-text text-base font-bold text-text-secondary" style={{ fontFamily: "var(--font-arabic)" }}>
            {rule.arabic}
          </h3>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
            <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor">
              <path d="M2 1.5v7l6-3.5z" />
            </svg>
            eshitish
          </span>
        </button>
      ) : (
        <h3 className="arabic-text text-base font-bold text-text-secondary text-center" style={{ fontFamily: "var(--font-arabic)" }}>
          تنوينلي حرفلر
        </h3>
      )}

      {/* Chig'atoy izoh — audio narration verbatim. Static, faqat o'qish. */}
      <p className="mt-1 text-[10px] leading-snug text-text-main/85 text-center px-1">
        Ushbu uch tanvin alomatlarining biri qoʻyilgan harflardan soʻng
        <span className="mx-1 font-semibold">bir sukunli nun</span>
        ortirib oʻqiladi.
      </p>

      {/* 3 ustun: har ustun — belgi (clickable) + label + misol juftligi.
          Sign click → "an/in/un" demo; misol click → bir xil demo (kitobdagi
          misolni ko'rsatadi). Vizual zichlik: 3 ta cell yonma-yon. */}
      <div className="mt-1.5 flex flex-row-reverse justify-around items-stretch gap-2">
        {signs.map((sign, i) => {
          const ex = examples[i];
          const signActive = activeId === sign.id;
          const exActive = ex && activeId === ex.id;
          const expandMatch = ex?.uzbek.match(/=\s*(.+?)\)/);
          const expand = expandMatch ? expandMatch[1] : "";
          return (
            <div key={sign.id} className="flex flex-1 flex-col items-center gap-0.5">
              {/* Belgi — katta vizual */}
              <button
                onClick={(e) => { e.stopPropagation(); onClick(sign); }}
                className="element-spring rounded-md px-2 py-0.5"
                style={{
                  backgroundColor: signActive ? "var(--color-primary)" : "transparent",
                  color: signActive ? "#ffffff" : "var(--color-text-main)",
                  boxShadow: signActive ? "0 6px 20px var(--color-primary-glow)" : "none",
                  transform: signActive ? "scale(1.08)" : "none",
                }}
              >
                <span
                  className="arabic-text leading-none text-[clamp(1.5rem,7.5cqi,2rem)]"
                  style={{ fontFamily: "var(--font-arabic)" }}
                >
                  {sign.arabic}
                </span>
              </button>
              {/* Uzbek label (kichik) */}
              <span className="text-[9px] leading-tight text-text-muted whitespace-nowrap">
                {sign.uzbek.replace(/\s*\([^)]+\)/, "")}
              </span>
              {/* Misol juftligi — A = (AN) format */}
              {ex && (
                <button
                  onClick={(e) => { e.stopPropagation(); onClick(ex); }}
                  dir="rtl"
                  className="inline-flex items-baseline gap-1 px-1.5 py-0.5 rounded-md element-spring"
                  style={{
                    backgroundColor: exActive ? "var(--color-primary)" : "transparent",
                    color: exActive ? "#ffffff" : "var(--color-text-main)",
                    boxShadow: exActive ? "0 4px 14px var(--color-primary-glow)" : "none",
                    transform: exActive ? "scale(1.06)" : "none",
                    border: exActive ? "2px solid var(--color-primary)" : "2px solid transparent",
                  }}
                >
                  <span className="arabic-text font-bold text-base" style={{ fontFamily: "var(--font-arabic)" }}>
                    {ex.arabic}
                  </span>
                  <span className="text-xs opacity-70">=</span>
                  <span
                    className="arabic-text text-sm"
                    style={{ fontFamily: "var(--font-arabic)", opacity: 0.7 }}
                  >
                    {expand}
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Page17({ elements, activeId, hasActive, onElementClick }: PP) {
  const { el, els } = usePageElements(elements, 17);
  const introRule = el("intro_rule");
  const introTitle = el("intro_title");

  // 28 harf × 3 mad shakl = 84 syllable, 3 tashqi ustun × 10 qator grid.
  // Kitobga mos tartib: o'ng ustun (alef, tsa, kha, ra, sha, tho, gha, ka,
  // na, ya), o'rta ustun (ba, ja, da, za, sa, zho, fa, la, wa), chap ustun
  // (ta, hha, dza, sin, dho, ayn, qa, ma, ha). Row 10 faqat ي da bor.
  const rightCol: string[][] = [
    ["01","02","03"], ["10","11","12"], ["19","20","21"],
    ["28","29","30"], ["37","38","39"], ["46","47","48"],
    ["55","56","57"], ["64","65","66"], ["73","74","75"],
    ["82","83","84"],
  ];
  const middleCol: string[][] = [
    ["04","05","06"], ["13","14","15"], ["22","23","24"],
    ["31","32","33"], ["40","41","42"], ["49","50","51"],
    ["58","59","60"], ["67","68","69"], ["76","77","78"],
  ];
  const leftCol: string[][] = [
    ["07","08","09"], ["16","17","18"], ["25","26","27"],
    ["34","35","36"], ["43","44","45"], ["52","53","54"],
    ["61","62","63"], ["70","71","72"], ["79","80","81"],
  ];

  // 3 ta syllable bir qatorda — nowrap (Row dagi flex-wrap chalkashtirmasin)
  // `mad` prop — mad-arabic-text class (tikka harakat, katta damma)
  const MadRow = ({ ids }: { ids: string[] }) => (
    <div className="flex flex-row-reverse justify-center gap-[clamp(0.125rem,0.8cqi,0.25rem)]">
      {els(ids).map((el) => (
        <ArabicEl
          key={el.id}
          el={el}
          isActive={activeId === el.id}
          hasActive={hasActive}
          onClick={() => onElementClick(el)}
          size="sm"
          mad
        />
      ))}
    </div>
  );

  const renderCol = (rows: string[][]) => (
    <div className="flex flex-1 flex-col gap-1 min-w-0">
      {rows.map((row, i) => (
        <MadRow key={i} ids={row} />
      ))}
    </div>
  );

  const HeaderLetter = ({ ch }: { ch: string }) => (
    <div className="flex flex-1 justify-center">
      {/* Headerlar uchun oddiy arab shrifti — mushaf fontida ي nuqtasiz
          chiqadi (Quranic imlo), darslikda esa nuqtali ي kerak. */}
      <span
        className="arabic-text font-bold text-[clamp(1.5rem,10cqi,2.5rem)] text-text-secondary"
        style={{ fontFamily: "var(--font-arabic)" }}
      >
        {ch}
      </span>
    </div>
  );

  // Title click — "Madliy harflar" (30.5-31.9s chunk) ijro etadi
  const titleActive = introTitle && activeId === introTitle.id;
  const TitleBlock = () => (
    introTitle ? (
      <button
        onClick={(e) => { e.stopPropagation(); onElementClick(introTitle); }}
        className="text-center my-2 rounded-lg px-3 py-1 element-spring"
        style={{
          backgroundColor: titleActive ? "rgba(34,197,94,0.12)" : "transparent",
          boxShadow: titleActive ? "0 6px 20px var(--color-primary-glow)" : "none",
        }}
      >
        <h3 className="mad-arabic-text text-xl text-text-secondary">
          {introTitle.arabic}
        </h3>
        <p className="text-xs text-text-muted mt-0.5">{introTitle.uzbek}</p>
      </button>
    ) : (
      <Title text="مدلي حرفلر" sub="Madli harflar" />
    )
  );

  return (
    <div className="flex flex-col items-center gap-1">
      <MadRule
        rule={introRule}
        isActive={introRule ? activeId === introRule.id : false}
        hasActive={hasActive}
        onClick={onElementClick}
      />
      <TitleBlock />
      {/* Header row: 3 mad letters (static, not clickable) */}
      <div className="flex w-full flex-row-reverse">
        <HeaderLetter ch="ا" />
        <HeaderLetter ch="ي" />
        <HeaderLetter ch="و" />
      </div>
      <Divider />
      {/* 3 outer columns with dividers, RTL flow */}
      <div className="flex w-full flex-row-reverse items-start gap-1">
        {renderCol(rightCol)}
        <div className="w-px self-stretch bg-white/10" />
        {renderCol(middleCol)}
        <div className="w-px self-stretch bg-white/10" />
        {renderCol(leftCol)}
      </div>
    </div>
  );
}

function Page18({ elements, activeId, hasActive, onElementClick }: PP) {
  const { el, els } = usePageElements(elements, 18);
  const outro = el("outro");

  // 17-sahifaning takrorlash mashqi: 9 qator × 3 tashqi cell, har cell
  // ichida 3 syllable. Cell ichida syllable tartibi (RTL) — uu / ii / aa.
  // Element ID lar p18 da rowma-row, RTL: o'ng cell (1-3), o'rta (4-6),
  // chap (7-9), keyingi qator (10-18) va h.k.
  const rightCol: string[][] = [
    ["01","02","03"], ["10","11","12"], ["19","20","21"],
    ["28","29","30"], ["37","38","39"], ["46","47","48"],
    ["55","56","57"], ["64","65","66"], ["73","74","75"],
  ];
  const middleCol: string[][] = [
    ["04","05","06"], ["13","14","15"], ["22","23","24"],
    ["31","32","33"], ["40","41","42"], ["49","50","51"],
    ["58","59","60"], ["67","68","69"], ["76","77","78"],
  ];
  const leftCol: string[][] = [
    ["07","08","09"], ["16","17","18"], ["25","26","27"],
    ["34","35","36"], ["43","44","45"], ["52","53","54"],
    ["61","62","63"], ["70","71","72"], ["79","80","81"],
  ];

  const MadRow = ({ ids }: { ids: string[] }) => (
    <div className="flex flex-row-reverse justify-center gap-[clamp(0.125rem,0.8cqi,0.25rem)]">
      {els(ids).map((el) => (
        <ArabicEl
          key={el.id}
          el={el}
          isActive={activeId === el.id}
          hasActive={hasActive}
          onClick={() => onElementClick(el)}
          size="sm"
          mad
        />
      ))}
    </div>
  );

  const renderCol = (rows: string[][]) => (
    <div className="flex flex-1 flex-col gap-1 min-w-0">
      {rows.map((row, i) => (
        <MadRow key={i} ids={row} />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-1">
      {/* MadRule yo'q — 17-sahifada ko'rsatilgan, takror kerak emas.
          3 outer columns with dividers, RTL flow — header qatori yo'q
          (kitob 18-sahifasida ham yo'q) */}
      <div className="flex w-full flex-row-reverse items-start gap-1">
        {renderCol(rightCol)}
        <div className="w-px self-stretch bg-white/10" />
        {renderCol(middleCol)}
        <div className="w-px self-stretch bg-white/10" />
        {renderCol(leftCol)}
      </div>
      {/* Pastki izoh — kitob ostidagi chig'atoy turkiy tildagi tavsiya.
          Click bilan `p18_outro` chunk (32. madli 01.mp3 262.9-271.7s)
          ijro etiladi. */}
      {outro ? (
        <button
          onClick={(e) => { e.stopPropagation(); onElementClick(outro); }}
          className="mt-2 mx-3 rounded-lg px-3 py-2 element-spring text-center"
          style={{
            backgroundColor: activeId === outro.id ? "rgba(34,197,94,0.12)" : "transparent",
            boxShadow: activeId === outro.id ? "0 6px 20px var(--color-primary-glow)" : "none",
          }}
        >
          <p className="text-[11px] leading-snug text-text-muted">
            {outro.uzbek}
          </p>
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
            <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor">
              <path d="M2 1.5v7l6-3.5z" />
            </svg>
            eshitish
          </span>
        </button>
      ) : (
        <p className="mt-2 text-[11px] leading-snug text-text-muted text-center px-3">
          Ushbu darsda yozilgan harflarning har qaysisini xatosiz mad
          qilmaguncha keyingi darslarni ko&apos;rsatma talabaga.
        </p>
      )}
    </div>
  );
}

function Page19({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 19);

  // 12 qator (kitobga mos): yuqori bo'lim — 9 qator (R1-R9), divider, pastki
  // bo'lim — 3 qator (R10-R12). Word counts: 6-6-7-7-6-6-6-6-6 / 6-5-4.
  // Mad-style: <ArabicEl mad /> orqali Amiri Quran font damma uchun (kattaroq),
  // kasra/fatha tikka chiqadi (Noto Naskh).
  const MadWordRow = ({ ids, size = "sm" }: { ids: string[]; size?: "sm" | "md" }) => (
    <div className="flex w-full flex-row-reverse flex-wrap justify-center gap-[clamp(0.1875rem,1.4cqi,0.375rem)]">
      {els(ids).map((el) => (
        <ArabicEl
          key={el.id}
          el={el}
          isActive={activeId === el.id}
          hasActive={hasActive}
          onClick={() => onElementClick(el)}
          size={size}
          mad
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-0.5">
      {/* MadRule yo'q — 17-sahifada ko'rsatilgan, takror kerak emas. */}
      <Title text="مدّی سوزلر" sub="Madli so'zlar" />
      {/* Yuqori bo'lim: 9 qator (R1-R9) */}
      <MadWordRow ids={["01","02","03","04","05","06"]} size="md" />
      <MadWordRow ids={["07","08","09","10","11","12"]} size="md" />
      <MadWordRow ids={["13","14","15","16","17","18","19"]} size="sm" />
      <MadWordRow ids={["20","21","22","23","24","25","26"]} size="sm" />
      <MadWordRow ids={["27","28","29","30","31","32"]} size="sm" />
      <MadWordRow ids={["33","34","35","36","37","38"]} size="sm" />
      <MadWordRow ids={["39","40","41","42","43","44"]} size="sm" />
      <MadWordRow ids={["45","46","47","48","49","50"]} size="md" />
      <MadWordRow ids={["51","52","53","54","55","56"]} size="md" />
      <Divider />
      {/* Pastki bo'lim: 3 qator (R10-R12) — fe'l shakllari */}
      <MadWordRow ids={["57","58","59","60","61","62"]} size="md" />
      <MadWordRow ids={["63","64","65","66","67"]} size="sm" />
      <MadWordRow ids={["68","69","70","71"]} size="sm" />
    </div>
  );
}

function Page20({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 20);
  // 48 element, 11 row, 3 ta block:
  //   Top:    Row 1-4 (15 ta uzun fe'l shakl)
  //   Mid:    Row 5-8 (18 ta past fe'l + ism shakllari)
  //   Bottom: Row 9-11 (15 ta ya-mad so'z; "ي ، يـ = ى" qoidasi bilan)
  return (
    <div className="flex flex-col items-center gap-1">
      {/* MadRule yo'q — 17-sahifada ko'rsatilgan, takror kerak emas. */}
      <Title text="مدّی سوزلر (دوام)" sub="Madli so'zlar davomi" />
      {/* ── Top: uzun fe'l shakllari (15 ta) ── */}
      <Row els={els(["01","02","03","04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" mad />
      <Row els={els(["05","06","07","08"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" mad />
      <Row els={els(["09","10","11","12"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" mad />
      <Row els={els(["13","14","15"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" mad />
      <Divider />
      {/* ── Mid: past fe'l + ism shakllari (18 ta) ── */}
      <Row els={els(["16","17","18","19","20","21"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" mad />
      <Row els={els(["22","23","24","25"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" mad />
      <Row els={els(["26","27","28","29"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" mad />
      <Row els={els(["30","31","32","33"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" mad />
      {/* ── Ya nuqtasiz qoidasi banner ── */}
      <YaNuqtasizRule />
      {/* ── Bottom: ya-mad so'zlari (15 ta) ── */}
      <Row els={els(["34","35","36","37","38","39"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" mad />
      <Row els={els(["40","41","42","43","44"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" mad />
      <Row els={els(["45","46","47","48"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-2" mad />
    </div>
  );
}

// "ي ، يـ = ى" — kitob 20-sahifasi o'rtasidagi qoida banner.
// Ya nuqtasiz (ى) yozilsa ham, oddiy ya (ي / يـ) sifatida o'qiladi.
function YaNuqtasizRule() {
  return (
    <div className="my-2 w-full rounded-xl border border-primary/20 bg-primary/5 px-3 py-2">
      <div className="flex items-center justify-center gap-3">
        <span
          className="arabic-text text-2xl font-bold text-text-main"
          style={{ fontFamily: "var(--font-arabic)" }}
        >
          ي ، يـ
        </span>
        <span className="text-text-muted text-lg">=</span>
        <span
          className="arabic-text text-2xl font-bold text-text-main"
          style={{ fontFamily: "var(--font-arabic)" }}
        >
          ى
        </span>
      </div>
      <p className="mt-1 text-center text-[11px] leading-snug text-text-muted">
        Nuqtasiz <span className="arabic-text">ى</span> ham xuddi
        oddiy <span className="arabic-text">ي</span> kabi o&apos;qiladi.
      </p>
    </div>
  );
}

// ========== PAGES 21-25: TASHDID + TANVIN ==========

// Sahifa 21 — Mad davomi (3 qator) + Tashdid boshlanishi (intro + 3 ربب + 6×7 mashq).
// Sahifaning yuqori qismi `33. madli 02.mp3` chunklaridan, pastki qismi
// `34. tashdid.mp3` chunklaridan ijro etiladi.
function Page21({ elements, activeId, hasActive, onElementClick }: PP) {
  const { el, els } = usePageElements(elements, 21);
  const intro = el("t_intro");

  return (
    <div className="flex flex-col items-center gap-1">
      {/* ─── Mad davomi (15 so'z, 3 qator) ─── */}
      <Row els={els(["m01","m02","m03","m04"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="lg" gap="gap-3" />
      <Row els={els(["m05","m06","m07","m08","m09","m10"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      {/* Row 3 — 5 uzun so'z (tabiin/tawarikh/tarawih/mukramin/muslimin); sm bilan 1 qatorga sig'adi */}
      <Row els={els(["m11","m12","m13","m14","m15"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />

      <Divider />

      {/* ─── Tashdid mavzusi boshi: to'liq qoida banner (vizual + matn) ─── */}
      <TashdidRule
        rule={intro}
        isActive={intro ? activeId === intro.id : false}
        hasActive={hasActive}
        onClick={onElementClick}
      />

      {/* 3 ربب juftliklari kitobdek: "رَبَّ - (رَبْبَ)" formatida.
          Bosilganda tashdid shaklining audiosi (rabba/rabbi/rabbu) ijro etadi.
          Yonidagi (رَبْبَ) — tashdidning ochilgan (uncontracted) shakli. */}
      <div className="flex flex-row-reverse justify-center gap-3 my-2 items-baseline flex-wrap">
        {[
          { id: "t_rab1", tash: "رَبَّ", expand: "رَبْبَ" },
          { id: "t_rab2", tash: "رَبِّ", expand: "رَبْبِ" },
          { id: "t_rab3", tash: "رَبُّ", expand: "رَبْبُ" },
        ].map(({ id, tash, expand }) => {
          const elem = el(id);
          if (!elem) return null;
          const isActive = activeId === elem.id;
          return (
            <button
              key={id}
              onClick={(e) => { e.stopPropagation(); onElementClick(elem); }}
              dir="rtl"
              className="inline-flex items-baseline gap-1.5 px-2 py-1 rounded-lg element-spring"
              style={{
                backgroundColor: isActive ? "var(--color-primary)" : "transparent",
                color: isActive ? "#ffffff" : "var(--color-text-main)",
                boxShadow: isActive ? "0 6px 20px var(--color-primary-glow)" : "none",
                transform: isActive ? "scale(1.1)" : "none",
                border: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
              }}
            >
              <span className="arabic-text font-bold text-2xl" style={{ fontFamily: "var(--font-arabic)" }}>
                {tash}
              </span>
              <span className="text-base opacity-70">-</span>
              <span
                className="arabic-text text-lg"
                style={{ fontFamily: "var(--font-arabic)", opacity: 0.7 }}
              >
                ({expand})
              </span>
            </button>
          );
        })}
      </div>

      <Divider />

      {/* 6 mashq qatori × 7 so'z = 42 element. Zich joylash uchun size="sm". */}
      <Row els={els(["t11","t12","t13","t14","t15","t16","t17"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["t21","t22","t23","t24","t25","t26","t27"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["t31","t32","t33","t34","t35","t36","t37"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["t41","t42","t43","t44","t45","t46","t47"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["t51","t52","t53","t54","t55","t56","t57"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["t61","t62","t63","t64","t65","t66","t67"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
    </div>
  );
}

function Page22({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 22);
  // 10 qator × 6 so'z. R1-R4: aktiv past fe'l. R5-R8: passiv. R9-R10: Form V.
  // 4 ta 6-so'zli qator dagi tashdidli so'zlar size="sm" da bir qatorga sig'adi.
  const rowIds = (n: number) => [1, 2, 3, 4, 5, 6].map((w) => `r${n}_w${w}`);
  return (
    <div className="flex flex-col items-center gap-1">
      <Row els={els(rowIds(1))} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(rowIds(2))} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(rowIds(3))} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(rowIds(4))} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Divider />
      <Row els={els(rowIds(5))} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(rowIds(6))} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(rowIds(7))} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(rowIds(8))} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Divider />
      <Row els={els(rowIds(9))} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(rowIds(10))} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
    </div>
  );
}

// Sahifa 23 — Tashdid davomi (R1-R8, 40 so'z) + Tanvin boshlanishi.
// Yuqori bo'lim: V bob masdari → V bob ism fail → IX bob → X bob.
// Pastki bo'lim: tanvin intro + 3 belgisi + chig'atoy izoh + 3 misol.
// Spacing tight: gap-0.5 + custom my-1 dividerlar bilan barcha 47 element
// bitta viewportga sig'adi (677→608px).
function Page23({ elements, activeId, hasActive, onElementClick }: PP) {
  const { el, els } = usePageElements(elements, 23);
  const tnIntro = el("tn_intro");
  const Sep = () => <div className="w-full border-b-2 border-dotted border-white/10 my-1" />;
  return (
    <div className="flex flex-col items-center gap-0.5">
      {/* ─── Tashdid davomi (40 so'z) ─── */}
      {/* R1: V bob masdari (تَفَعُّلْ) — 6 so'z */}
      <Row els={els(["t01","t02","t03","t04","t05","t06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      {/* R2: V bob masdari davomi — 5 so'z */}
      <Row els={els(["t07","t08","t09","t10","t11"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      {/* R3: V bob ism fail (مُتَفَعِّلْ) — 5 so'z */}
      <Row els={els(["t12","t13","t14","t15","t16"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />

      <Sep />

      {/* R4-R6: V bob ism fail davomi — 3 × 5 so'z */}
      <Row els={els(["t17","t18","t19","t20","t21"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["t22","t23","t24","t25","t26"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["t27","t28","t29","t30","t31"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      {/* R7: IX bob (اِفْعَلَّ — ranglar/holatlar) — 5 so'z */}
      <Row els={els(["t32","t33","t34","t35","t36"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      {/* R8: X bob idgham bilan (اِسْتَفْعَلَ + tashdid) — 4 so'z */}
      <Row els={els(["t37","t38","t39","t40"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />

      <Sep />

      {/* ─── Tanvin boshlanishi: intro banner + 3 belgisi + 3 misol ─── */}
      <TanvinRule
        rule={tnIntro}
        signs={els(["tn_fath","tn_kasr","tn_damm"])}
        examples={els(["tn_an","tn_in","tn_un"])}
        activeId={activeId}
        hasActive={hasActive}
        onClick={onElementClick}
      />
    </div>
  );
}

// Sahifa 24 — Tanvin alifboi: 28×3 = 84 syllable + 30 so'z.
// 3 ta blok (fatha-an, kasra-in, damma-un), har blok 3 qator (9+10+9 = 28).
// Pastki bo'lim: 5 qator × 6 so'z = 30 ta misol.
// Hammasi 114 element bitta viewportga sig'ishi uchun size="sm" + gap-0.5.
function Page24({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 24);
  const Sep = () => <div className="w-full border-b-2 border-dotted border-white/10 my-1" />;
  const block1Ids = (n: number, count: number) =>
    Array.from({ length: count }, (_, i) => `r${n}_${String(i + (n === 1 ? 1 : n === 2 ? 10 : 20)).padStart(2, "0")}`);
  // Manually list — counts differ across rows (9/10/9).
  const r1 = ["r1_01","r1_02","r1_03","r1_04","r1_05","r1_06","r1_07","r1_08","r1_09"];
  const r2 = ["r2_10","r2_11","r2_12","r2_13","r2_14","r2_15","r2_16","r2_17","r2_18","r2_19"];
  const r3 = ["r3_20","r3_21","r3_22","r3_23","r3_24","r3_25","r3_26","r3_27","r3_28"];
  const r4 = ["r4_01","r4_02","r4_03","r4_04","r4_05","r4_06","r4_07","r4_08","r4_09"];
  const r5 = ["r5_10","r5_11","r5_12","r5_13","r5_14","r5_15","r5_16","r5_17","r5_18","r5_19"];
  const r6 = ["r6_20","r6_21","r6_22","r6_23","r6_24","r6_25","r6_26","r6_27","r6_28"];
  const r7 = ["r7_01","r7_02","r7_03","r7_04","r7_05","r7_06","r7_07","r7_08","r7_09"];
  const r8 = ["r8_10","r8_11","r8_12","r8_13","r8_14","r8_15","r8_16","r8_17","r8_18","r8_19"];
  const r9 = ["r9_20","r9_21","r9_22","r9_23","r9_24","r9_25","r9_26","r9_27","r9_28"];
  void block1Ids;
  return (
    <div className="flex flex-col items-center gap-0.5">
      {/* Block 1: fatha tanvin (-an) */}
      <Row els={els(r1)} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(r2)} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(r3)} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Sep />
      {/* Block 2: kasra tanvin (-in) */}
      <Row els={els(r4)} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(r5)} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(r6)} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Sep />
      {/* Block 3: damma tanvin (-un) */}
      <Row els={els(r7)} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(r8)} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(r9)} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Sep />
      {/* Pastki bo'lim: 30 ta so'z (5 qator × 6) */}
      <Row els={els(["w01","w02","w03","w04","w05","w06"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["w07","w08","w09","w10","w11","w12"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["w13","w14","w15","w16","w17","w18"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["w19","w20","w21","w22","w23","w24"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["w25","w26","w27","w28","w29","w30"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
    </div>
  );
}

function Page25({ elements, activeId, hasActive, onElementClick }: PP) {
  const { el, els } = usePageElements(elements, 25);
  const title = el("title");
  const Sep = () => <div className="w-full border-b-2 border-dotted border-white/10 my-0.5" />;

  // Header signs row — visual only (ـًّ ـٍّ ـٌّ above row 1, RTL: fatha → kasra → damma)
  const SignsHeader = () => (
    <div dir="rtl" className="flex justify-center items-center gap-[clamp(0.85rem,4.5cqi,1.6rem)] -mb-1 pb-0.5 border-b border-text-muted/20 w-[55%]">
      <span className="arabic-text text-text-muted text-[clamp(0.95rem,5cqi,1.25rem)] leading-none" style={{ fontFamily: "var(--font-arabic)" }}>ـًّ</span>
      <span className="arabic-text text-text-muted text-[clamp(0.95rem,5cqi,1.25rem)] leading-none" style={{ fontFamily: "var(--font-arabic)" }}>ـٍّ</span>
      <span className="arabic-text text-text-muted text-[clamp(0.95rem,5cqi,1.25rem)] leading-none" style={{ fontFamily: "var(--font-arabic)" }}>ـٌّ</span>
    </div>
  );

  // R1 misol — har bir element kitobda "رَبٌّ - (رَبُّنْ)" formatda. Click bilan
  // tanvin+tashdid o'qilishi ijro etiladi; expansion (رَبُّنْ) faqat vizual.
  const RabbCell = ({ id, expand }: { id: string; expand: string }) => {
    const e = el(id);
    if (!e) return null;
    const isActive = activeId === e.id;
    return (
      <button
        onClick={(ev) => { ev.stopPropagation(); onElementClick(e); }}
        dir="rtl"
        className="inline-flex items-baseline gap-0.5 px-1.5 py-0 rounded-md element-spring"
        style={{
          backgroundColor: isActive ? "var(--color-primary)" : "transparent",
          color: isActive ? "#ffffff" : "var(--color-text-main)",
          boxShadow: isActive ? "0 4px 14px var(--color-primary-glow)" : "none",
          transform: isActive ? "scale(1.06)" : "none",
          border: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
        }}
      >
        <span className="arabic-text font-bold text-[clamp(0.85rem,5cqi,1.1rem)]" style={{ fontFamily: "var(--font-arabic)" }}>
          {e.arabic}
        </span>
        <span className="text-[10px] opacity-60">−</span>
        <span className="arabic-text text-[clamp(0.65rem,3.5cqi,0.85rem)] opacity-60" style={{ fontFamily: "var(--font-arabic)" }}>
          ({expand})
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center gap-0">
      {/* ── Tanvinli tashdid sarlavhasi (clickable) ── */}
      {title && (
        <button
          onClick={(e) => { e.stopPropagation(); onElementClick(title); }}
          className="element-spring rounded-md px-2 py-0"
          style={{
            backgroundColor: activeId === title.id ? "var(--color-primary)" : "transparent",
            color: activeId === title.id ? "#ffffff" : "var(--color-text-secondary)",
            boxShadow: activeId === title.id ? "0 6px 20px var(--color-primary-glow)" : "none",
          }}
        >
          <h3 className="arabic-text text-sm font-bold" style={{ fontFamily: "var(--font-arabic)" }}>
            {title.arabic}
          </h3>
        </button>
      )}

      {/* ── Header: 3 ta tanvin+tashdid signs (vizual marker) ── */}
      <SignsHeader />

      {/* ── R1: 3 ربب misol (RTL: rabban, rabbin, rabbun — fatha → kasra → damma) ── */}
      <div dir="rtl" className="flex w-full justify-around items-center gap-1 mt-0.5">
        <RabbCell id="r1_w3_an" expand="رَبَّنْ" />
        <RabbCell id="r1_w2_in" expand="رَبِّنْ" />
        <RabbCell id="r1_w1_un" expand="رَبُّنْ" />
      </div>

      {/* ── R2-R4: tanvin fatha/kasra/damma (har birida 6 so'z) ── */}
      <Row els={els(["r2_w1","r2_w2","r2_w3","r2_w4","r2_w5","r2_w6"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["r3_w1","r3_w2","r3_w3","r3_w4","r3_w5","r3_w6"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["r4_w1","r4_w2","r4_w3","r4_w4","r4_w5","r4_w6"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />

      {/* ── R5-R7: prefix mu- bilan uzunroq so'zlar (5 ta har biri) ── */}
      <Row els={els(["r5_w1","r5_w2","r5_w3","r5_w4","r5_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(["r6_w1","r6_w2","r6_w3","r6_w4","r6_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(["r7_w1","r7_w2","r7_w3","r7_w4","r7_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />

      <Sep />

      {/* ── Alif va Hamza (yangi bob — vizual intro + audio) ── */}
      <AlifHamzaIntro
        title={el("ah_title")}
        subtitle={el("ah_subtitle")}
        forms={els(["ah_f1","ah_f2","ah_f3","ah_f4","ah_f5","ah_f6","ah_f7","ah_f8","ah_f9"])}
        row1={els(["ah_p1_w1","ah_p1_w2","ah_p1_w3","ah_p1_w4"])}
        row2={els(["ah_p2_w1","ah_p2_w2","ah_p2_w3","ah_p2_w4"])}
        activeId={activeId}
        hasActive={hasActive}
        onClick={onElementClick}
      />
    </div>
  );
}

// Alif va Hamza chapter intro banner — page 25 pastki yarmida.
// title (clickable, `37. alif va hamza.mp3` ning birinchi 2.3s) + chig'atoy izoh
// ("9 ko'rinishda yoziladi") + 9 forms row (RTL, har biri clickable) +
// 2 numbered practice rows (eski/yangi imlo, so'zlar clickable).
function AlifHamzaIntro({
  title,
  subtitle,
  forms,
  row1,
  row2,
  activeId,
  hasActive,
  onClick,
}: {
  title?: Element;
  subtitle?: Element;
  forms: Element[];
  row1: Element[];
  row2: Element[];
  activeId: string | null;
  hasActive: boolean;
  onClick: (el: Element) => void;
}) {
  const FormCell = ({ el }: { el: Element }) => {
    const isActive = activeId === el.id;
    return (
      <button
        onClick={(e) => { e.stopPropagation(); onClick(el); }}
        className="element-spring rounded-md px-1 py-0 inline-flex items-center justify-center"
        style={{
          backgroundColor: isActive ? "var(--color-primary)" : "transparent",
          color: isActive ? "#ffffff" : "var(--color-text-main)",
          boxShadow: isActive ? "0 4px 14px var(--color-primary-glow)" : "none",
          transform: isActive ? "scale(1.12)" : "none",
        }}
      >
        <span className="arabic-text font-bold text-[clamp(0.85rem,4.8cqi,1.15rem)] leading-none" style={{ fontFamily: "var(--font-arabic)" }}>
          {el.arabic}
        </span>
      </button>
    );
  };

  const NumberedRow = ({ num, els: rowEls }: { num: string; els: Element[] }) => (
    <div dir="rtl" className="flex w-full items-center gap-1">
      <span className="arabic-text text-[10px] text-text-muted shrink-0 w-[16px] text-center" style={{ fontFamily: "var(--font-arabic)" }}>
        {num})
      </span>
      <div dir="rtl" className="flex flex-1 justify-around items-center gap-0.5">
        {rowEls.map((e) => (
          <ArabicEl
            key={e.id}
            el={e}
            isActive={activeId === e.id}
            hasActive={hasActive}
            onClick={() => onClick(e)}
            size="sm"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center gap-0">
      {/* Title (clickable — narration of "الف و همزة") */}
      {title && (
        <button
          onClick={(e) => { e.stopPropagation(); onClick(title); }}
          className="element-spring rounded-md px-2 py-0"
          style={{
            backgroundColor: activeId === title.id ? "var(--color-primary)" : "transparent",
            color: activeId === title.id ? "#ffffff" : "var(--color-text-secondary)",
            boxShadow: activeId === title.id ? "0 6px 20px var(--color-primary-glow)" : "none",
          }}
        >
          <h3 className="arabic-text text-sm font-bold" style={{ fontFamily: "var(--font-arabic)" }}>
            {title.arabic}
          </h3>
        </button>
      )}
      {/* Chig'atoy izoh (clickable narration) */}
      {subtitle ? (
        <button
          onClick={(e) => { e.stopPropagation(); onClick(subtitle); }}
          className="element-spring rounded-md px-2 py-0"
          style={{
            backgroundColor: activeId === subtitle.id ? "var(--color-primary)" : "transparent",
            color: activeId === subtitle.id ? "#ffffff" : "var(--color-text-muted)",
            boxShadow: activeId === subtitle.id ? "0 4px 14px var(--color-primary-glow)" : "none",
          }}
        >
          <span className="arabic-text text-[10px] text-center leading-tight" style={{ fontFamily: "var(--font-arabic)" }}>
            {subtitle.arabic}
          </span>
        </button>
      ) : (
        <p className="arabic-text text-[10px] text-text-muted text-center leading-tight" style={{ fontFamily: "var(--font-arabic)" }}>
          الف و همزة توقّز (٩) كورينيشده يازيلادى
        </p>
      )}
      {/* 9 ta shakl bir qatorda, RTL — chap tomonda kichik raqam (١) */}
      <div dir="rtl" className="flex w-full justify-around items-center gap-0.5 mt-0.5">
        <span className="arabic-text text-[10px] text-text-muted shrink-0 w-[16px] text-center" style={{ fontFamily: "var(--font-arabic)" }}>
          ١
        </span>
        {forms.map((f) => <FormCell key={f.id} el={f} />)}
      </div>
      {/* 2 ta numbered mashq qator: eski va yangi imlo */}
      <NumberedRow num="١" els={row1} />
      <NumberedRow num="٢" els={row2} />
    </div>
  );
}

// ========== PAGES 26-33: ALIF HAMZA, VASL, VAQF, IDG'OM ==========

// Numbered row helper for p26 — shows a small ٣) / ٤) ... marker on the right
// side of the row (RTL: at the visual right edge, matching kitob layout).
function P26NumberedRow({
  num,
  els,
  activeId,
  hasActive,
  onClick,
  size = "sm",
  gap = "gap-1.5",
}: {
  num?: string;
  els: Element[];
  activeId: string | null;
  hasActive: boolean;
  onClick: (el: Element) => void;
  size?: "sm" | "md" | "lg";
  gap?: string;
}) {
  const gapClass = FLUID_GAP[gap] ?? gap;
  return (
    <div dir="rtl" className="flex w-full items-center gap-1">
      <span className="arabic-text text-[10px] text-text-muted shrink-0 w-[14px] text-center" style={{ fontFamily: "var(--font-arabic)" }}>
        {num ? `${num})` : ""}
      </span>
      <div dir="rtl" className={`flex flex-1 justify-around items-center ${gapClass}`}>
        {els.map((e) => (
          <ArabicEl
            key={e.id}
            el={e}
            isActive={activeId === e.id}
            hasActive={hasActive}
            onClick={() => onClick(e)}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}

function Page26({ elements, activeId, hasActive, onElementClick }: PP) {
  const { els } = usePageElements(elements, 26);
  const Sep = () => <div className="w-full border-b-2 border-dotted border-white/10 my-1" />;
  return (
    <div className="flex flex-col items-center gap-0.5">
      {/* ── Top section: 7 numbered rows (R3-R9) + 3 unnumbered continuation rows ── */}
      <P26NumberedRow num="٣" els={els(["r3_w1","r3_w2","r3_w3","r3_w4"])}        activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <P26NumberedRow num="٤" els={els(["r4_w1","r4_w2","r4_w3","r4_w4"])}        activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <P26NumberedRow num="٥" els={els(["r5_w1","r5_w2","r5_w3","r5_w4"])}        activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <P26NumberedRow num="٦" els={els(["r6_w1","r6_w2","r6_w3","r6_w4","r6_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <P26NumberedRow num="٧" els={els(["r7_w1","r7_w2","r7_w3","r7_w4","r7_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <P26NumberedRow num="٨" els={els(["r8_w1","r8_w2","r8_w3","r8_w4","r8_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <P26NumberedRow num="٩" els={els(["r9_w1","r9_w2","r9_w3","r9_w4","r9_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <P26NumberedRow els={els(["c1_w1","c1_w2","c1_w3","c1_w4","c1_w5"])}         activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <P26NumberedRow els={els(["c2_w1","c2_w2","c2_w3","c2_w4","c2_w5","c2_w6"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <P26NumberedRow els={els(["c3_w1","c3_w2","c3_w3","c3_w4","c3_w5"])}         activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />

      <Sep />

      {/* ── Bottom section: 2 numbered rows (al-mar'/al-juz' declension) ── */}
      <P26NumberedRow els={els(["b1_w1","b1_w2","b1_w3","b1_w4"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
      <P26NumberedRow els={els(["b2_w1","b2_w2","b2_w3","b2_w4"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="md" gap="gap-1.5" />
    </div>
  );
}

// Page 27 — Ta-marbuta (ة ـة = ت) + Muqaddara (Alif/Yā/Vāv yashirin)
// Yuqori bo'lim: header + 5+5+6 = 17 element (`38. t-marbuta.mp3` dan)
// Pastki bo'lim: 3 ta sub-bo'lim (Alif/Yā/Vāv Muqaddara) — 32 element
// (`39. yoz-o'qiladigan.mp3` dan, 28-sahifa bilan ulushli).
function Page27({ elements, activeId, hasActive, onElementClick }: PP) {
  const { el, els } = usePageElements(elements, 27);
  const Sep = () => <div className="w-full border-b-2 border-dotted border-white/10 my-0.5" />;

  // Clickable block title — narration audio (kitobning sub-sarlavhasi)
  const BlockTitle = ({ el: titleEl }: { el?: Element }) => {
    if (!titleEl) return null;
    const isActive = activeId === titleEl.id;
    return (
      <button
        onClick={(e) => { e.stopPropagation(); onElementClick(titleEl); }}
        className="element-spring rounded-md px-3 py-0 mt-0.5"
        style={{
          backgroundColor: isActive ? "var(--color-primary)" : "transparent",
          color: isActive ? "#ffffff" : "var(--color-text-secondary)",
          boxShadow: isActive ? "0 6px 20px var(--color-primary-glow)" : "none",
        }}
      >
        <h3 className="arabic-text text-[13px] font-bold leading-tight" style={{ fontFamily: "var(--font-arabic)" }}>
          {titleEl.arabic}
        </h3>
      </button>
    );
  };

  // R3 — 3 juftlik singular/plural, har juftlik orasida tire (statik visual)
  const PairRow = ({ pairs }: { pairs: Array<[Element | undefined, Element | undefined]> }) => (
    <div dir="rtl" className="flex w-full flex-row-reverse flex-wrap justify-center items-center gap-[clamp(0.25rem,2cqi,0.5rem)]">
      {pairs.map((pair, i) => {
        const [a, b] = pair;
        if (!a || !b) return null;
        return (
          <div key={i} className="flex flex-row-reverse items-center gap-[clamp(0.125rem,0.9cqi,0.25rem)]">
            <ArabicEl el={a} isActive={activeId === a.id} hasActive={hasActive} onClick={() => onElementClick(a)} size="sm" />
            <span className="text-text-muted text-[12px] select-none" style={{ opacity: 0.7 }}>—</span>
            <ArabicEl el={b} isActive={activeId === b.id} hasActive={hasActive} onClick={() => onElementClick(b)} size="sm" />
            {i < pairs.length - 1 && (
              <span className="text-text-muted text-[10px] mx-0.5 select-none" style={{ opacity: 0.6 }}>،</span>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-0">
      {/* ── Yuqori bo'lim: `ة ـة = ت` qoidasi ── */}
      <BlockTitle el={el("head")} />
      <Row els={els(["r1_w1","r1_w2","r1_w3","r1_w4","r1_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["r2_w1","r2_w2","r2_w3","r2_w4","r2_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <PairRow pairs={[
        [el("r3_w1"), el("r3_w2")],
        [el("r3_w3"), el("r3_w4")],
        [el("r3_w5"), el("r3_w6")],
      ]} />

      <Sep />

      {/* ── Subtitle: yozilmasa-da o'qiladigan harflar ── */}
      <BlockTitle el={el("subtitle")} />

      {/* ── Alif Muqaddara ── */}
      <BlockTitle el={el("alif_intro")} />
      <Row els={els(["alif_r1_w1","alif_r1_w2","alif_r1_w3","alif_r1_w4"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["alif_r2_w1","alif_r2_w2","alif_r2_w3","alif_r2_w4","alif_r2_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["alif_r3_w1","alif_r3_w2","alif_r3_w3","alif_r3_w4","alif_r3_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />

      {/* ── Yā Muqaddara ── */}
      <BlockTitle el={el("ya_intro")} />
      <Row els={els(["ya_r1_w1","ya_r1_w2","ya_r1_w3","ya_r1_w4","ya_r1_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />

      {/* ── Vāv Muqaddara ── */}
      <BlockTitle el={el("vav_intro")} />
      <Row els={els(["vav_r1_w1","vav_r1_w2","vav_r1_w3","vav_r1_w4","vav_r1_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["vav_r2_w1","vav_r2_w2","vav_r2_w3","vav_r2_w4"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-2" />
    </div>
  );
}

function Page28({ elements, activeId, hasActive, onElementClick }: PP) {
  const { el, els } = usePageElements(elements, 28);
  const Sep = () => <div className="w-full border-b-2 border-dotted border-white/10 my-0.5" />;

  // Clickable block title — large arabic text, click ijro etadi (title + narration audio)
  const BlockTitle = ({ el: titleEl }: { el?: Element }) => {
    if (!titleEl) return null;
    const isActive = activeId === titleEl.id;
    return (
      <button
        onClick={(e) => { e.stopPropagation(); onElementClick(titleEl); }}
        className="element-spring rounded-md px-3 py-0"
        style={{
          backgroundColor: isActive ? "var(--color-primary)" : "transparent",
          color: isActive ? "#ffffff" : "var(--color-text-secondary)",
          boxShadow: isActive ? "0 6px 20px var(--color-primary-glow)" : "none",
        }}
      >
        <h3 className="arabic-text text-sm font-bold leading-tight" style={{ fontFamily: "var(--font-arabic)" }}>
          {titleEl.arabic}
        </h3>
      </button>
    );
  };

  // Statik chig'atoy izoh — click yo'q, kitobdagi subtitle ko'rsatadi
  const SubText = ({ children }: { children: React.ReactNode }) => (
    <p className="arabic-text text-[9.5px] text-text-muted text-center leading-tight px-2" style={{ fontFamily: "var(--font-arabic)" }}>
      {children}
    </p>
  );

  // Clickable chig'atoy izoh — audio mavjud bo'lsa, bosilganda ijro etadi
  const ClickableSubText = ({ el: subEl }: { el?: Element }) => {
    if (!subEl) return null;
    const isActive = activeId === subEl.id;
    return (
      <button
        onClick={(e) => { e.stopPropagation(); onElementClick(subEl); }}
        className="element-spring rounded-md px-2 py-0"
        style={{
          backgroundColor: isActive ? "var(--color-primary)" : "transparent",
          color: isActive ? "#ffffff" : "var(--color-text-muted)",
          boxShadow: isActive ? "0 4px 14px var(--color-primary-glow)" : "none",
        }}
      >
        <span className="arabic-text text-[9.5px] text-center leading-tight" style={{ fontFamily: "var(--font-arabic)" }}>
          {subEl.arabic}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center gap-0">
      {/* ============ BLOCK 1 — Yaa Alifiyya ============ */}
      <BlockTitle el={el("b1_intro")} />
      <ClickableSubText el={el("b1_sub1")} />

      {/* Row 1: 6 so'z */}
      <Row els={els(["r1_w1","r1_w2","r1_w3","r1_w4","r1_w5","r1_w6"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      {/* Row 2: 5 so'z */}
      <Row els={els(["r2_w1","r2_w2","r2_w3","r2_w4","r2_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      {/* Row 3: 4 so'z */}
      <Row els={els(["r3_w1","r3_w2","r3_w3","r3_w4"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-2" />

      <ClickableSubText el={el("b1_sub2")} />
      {/* Row 4: 5 so'z (sawwayha turi — biroz uzunroq) */}
      <Row els={els(["r4_w1","r4_w2","r4_w3","r4_w4","r4_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />

      <Sep />

      {/* ============ BLOCK 2 — Vav Alifiyya ============ */}
      <BlockTitle el={el("b2_intro")} />
      <ClickableSubText el={el("b2_sub")} />

      {/* Row 5: 6 so'z */}
      <Row els={els(["r5_w1","r5_w2","r5_w3","r5_w4","r5_w5","r5_w6"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />

      <Sep />

      {/* ============ BLOCK 3 — Yozilsada o'qilmaydigan harflar ============ */}
      <BlockTitle el={el("b3_title")} />
      <ClickableSubText el={el("b3_sub1")} />

      {/* Row 6: 5 so'z */}
      <Row els={els(["r6_w1","r6_w2","r6_w3","r6_w4","r6_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />

      <ClickableSubText el={el("b3_sub2")} />

      {/* Row 7: 5 so'z */}
      <Row els={els(["r7_w1","r7_w2","r7_w3","r7_w4","r7_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
    </div>
  );
}

// Page 29 — Yozilsada o'qilmaydigan harflar (alif/lam o'rta).
// 3 ta bo'lim, har biri chig'atoy title narration + so'z gridiga ega.
// Audio: 40. yozilsa-o'qilmaydi.mp3 76.58-316.55s.
//   S1 (76.58-157.41s): O'rta alif o'qilmaydi — 4 qator (5+3+3+3 = 14 so'z)
//   S2 (160.50-216.30s): O'rta lam o'qilmaydi — 3 qator (5+5+4 = 14 so'z)
//   S3 (216.30-316.55s): "huva al-X" — 4 qator (4+4+3+3 = 14 phrase)
function Page29({ elements, activeId, hasActive, onElementClick }: PP) {
  const { el, els } = usePageElements(elements, 29);
  const Sep = () => <div className="w-full border-b-2 border-dotted border-white/10 my-0.5" />;

  // Chig'atoy rule narration — clickable title above each section's word grid.
  // Compact: text-[10px] approx, no vertical padding so 11 rows + 3 titles fit in viewport.
  const SectionTitle = ({ id }: { id: string }) => {
    const t = el(id);
    if (!t) return null;
    const isActive = activeId === t.id;
    return (
      <button
        onClick={(e) => { e.stopPropagation(); onElementClick(t); }}
        className="element-spring rounded-md px-2 py-0 w-full"
        style={{
          backgroundColor: isActive ? "var(--color-primary)" : "transparent",
          color: isActive ? "#ffffff" : "var(--color-text-muted)",
          boxShadow: isActive ? "0 6px 20px var(--color-primary-glow)" : "none",
        }}
      >
        <p
          className="arabic-text text-[clamp(0.6rem,2.9cqi,0.78rem)] text-center leading-tight"
          style={{ fontFamily: "var(--font-arabic)" }}
        >
          {t.arabic}
        </p>
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center gap-0">
      {/* ── Section 1: O'rta alif o'qilmaydi ── */}
      <SectionTitle id="s1_title" />
      <Row els={els(["s1_r1_w1","s1_r1_w2","s1_r1_w3","s1_r1_w4","s1_r1_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(["s1_r2_w1","s1_r2_w2","s1_r2_w3"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["s1_r3_w1","s1_r3_w2","s1_r3_w3"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["s1_r4_w1","s1_r4_w2","s1_r4_w3"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />

      <Sep />

      {/* ── Section 2: O'rta lam o'qilmaydi ── */}
      <SectionTitle id="s2_title" />
      <Row els={els(["s2_r1_w1","s2_r1_w2","s2_r1_w3","s2_r1_w4","s2_r1_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(["s2_r2_w1","s2_r2_w2","s2_r2_w3","s2_r2_w4","s2_r2_w5"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(["s2_r3_w1","s2_r3_w2","s2_r3_w3","s2_r3_w4"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />

      <Sep />

      {/* ── Section 3: Boshqa so'z qo'shilganda alif+lam ham o'qilmaydi ── */}
      <SectionTitle id="s3_title" />
      <Row els={els(["s3_r1_w1","s3_r1_w2","s3_r1_w3","s3_r1_w4"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(["s3_r2_w1","s3_r2_w2","s3_r2_w3","s3_r2_w4"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1" />
      <Row els={els(["s3_r3_w1","s3_r3_w2","s3_r3_w3"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["s3_r4_w1","s3_r4_w2","s3_r4_w3"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
    </div>
  );
}

// Page 30 — Alif Lom vasl continuation (top) + Vasl section intro (bottom).
// Top: 21 phrases (2-word vasl combos) in 6 rows. Bottom: 8 phrases (3-word
// vasl combos) in 4 rows × 2 cols. Chig'atoy rules + Vasl title = static text
// (not in audio — narrator skips them). Audio: 37. alif va hamza.mp3 119-217s.
function Page30({ elements, activeId, hasActive, onElementClick }: PP) {
  const { el, els } = usePageElements(elements, 30);
  const topHeader = el("top_header");
  return (
    <div className="flex flex-col items-center gap-1.5 w-full">
      {/* Top chig'atoy rule — clickable narration */}
      {topHeader && (
        <button
          onClick={(e) => { e.stopPropagation(); onElementClick(topHeader); }}
          className="w-full rounded-lg border border-primary/15 px-2.5 py-1.5 text-center element-spring"
          style={{
            backgroundColor: activeId === topHeader.id ? "var(--color-primary)" : "rgba(76,175,80,0.04)",
            color: activeId === topHeader.id ? "#ffffff" : "var(--color-text-main)",
            boxShadow: activeId === topHeader.id ? "0 6px 20px var(--color-primary-glow)" : "none",
          }}
        >
          <p className="arabic-text text-[10.5px] leading-snug" style={{ fontFamily: "var(--font-arabic)" }}>
            {topHeader.arabic}
          </p>
        </button>
      )}

      {/* TOP: 6 rows of alif-lom vasl examples (RTL: right to left) */}
      <Row els={els(["r1_w1","r1_w2","r1_w3","r1_w4"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["r2_w1","r2_w2","r2_w3"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["r3_w1","r3_w2","r3_w3"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["r4_w1","r4_w2","r4_w3","r4_w4"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["r5_w1","r5_w2","r5_w3","r5_w4"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />
      <Row els={els(["r6_w1","r6_w2","r6_w3"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-1.5" />

      <Divider />

      {/* Vasl section title — static text */}
      <div className="text-center">
        <h3 className="arabic-text text-base font-bold text-text-secondary" style={{ fontFamily: "var(--font-arabic)" }}>
          وصل - قوشیش
        </h3>
        <p className="text-[9px] uppercase tracking-wide text-text-muted mt-0.5">
          Vasl — qo&apos;shish
        </p>
      </div>

      {/* Vasl chig'atoy rule — static */}
      <div className="w-full rounded-lg border border-primary/15 bg-primary/[0.04] px-2.5 py-1.5">
        <p className="arabic-text text-[10px] leading-snug text-text-main/85 text-center" style={{ fontFamily: "var(--font-arabic)" }}>
          وصل ـ ایکّی اوچ یا کی تورت سوزلرنی بر-بریکه قوشیب اوقیش دیمکدر. ایکّی سوز برکه قوشیب اوقیلگانده هر دائم اورتالریده بر ایکی یا کی اوچ حرف اوقیلمی قالادی. قویده دیکی مثاللرده اوچته سوز برکه وصل قیلینهدی:
        </p>
      </div>

      {/* BOTTOM: 4 rows × 2 columns of 3-word vasl examples */}
      <Row els={els(["b1_w1","b1_w2"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-2" />
      <Row els={els(["b2_w1","b2_w2"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-2" />
      <Row els={els(["b3_w1","b3_w2"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-2" />
      <Row els={els(["b4_w1","b4_w2"])} activeId={activeId} hasActive={hasActive} onClick={onElementClick} size="sm" gap="gap-2" />

      {/* Footnote — static text */}
      <div className="w-full mt-1">
        <p className="arabic-text text-[10px] leading-snug text-text-muted text-center" style={{ fontFamily: "var(--font-arabic)" }}>
          (٭) بُو سُوزْ بِئْسَ لِسْمُ دیب اوقیلادی
        </p>
      </div>
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
  0: Page0,
  1: Page1,
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
      style={{ containerType: "inline-size" }}
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

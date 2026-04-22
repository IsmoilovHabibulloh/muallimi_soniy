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
}: {
  el: Element;
  isActive: boolean;
  hasActive: boolean;
  onClick: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}) {
  // Active state uses primary green for all element types (per UX decision).
  // Type-specific colors (ELEMENT_COLORS) reserved for legend / future use.
  void ELEMENT_COLORS;
  void el.type;
  // Fluid sizing: scales with viewport width via clamp() so rows never orphan
  // a letter on narrow phones. Mins tuned so 7-item 2xl rows fit at 320px;
  // max values match the previous fixed sizes on ≥640px.
  const sizeClasses: Record<string, string> = {
    sm: "text-[clamp(0.8125rem,3.2vw,1.125rem)] px-[clamp(0.125rem,0.6vw,0.375rem)] py-[clamp(0.0625rem,0.3vw,0.125rem)]",
    md: "text-[clamp(0.875rem,3.6vw,1.25rem)] px-[clamp(0.125rem,0.7vw,0.5rem)] py-[clamp(0.0625rem,0.3vw,0.125rem)]",
    lg: "text-[clamp(1rem,4.2vw,1.5rem)] px-[clamp(0.1875rem,0.9vw,0.625rem)] py-[clamp(0.125rem,0.4vw,0.25rem)]",
    xl: "text-[clamp(1.125rem,4.8vw,1.875rem)] px-[clamp(0.1875rem,1vw,0.75rem)] py-[clamp(0.125rem,0.4vw,0.25rem)]",
    "2xl": "text-[clamp(1.25rem,5.4vw,2.25rem)] px-[clamp(0.1875rem,1vw,0.75rem)] py-[clamp(0.1875rem,0.5vw,0.375rem)]",
    "3xl": "text-[clamp(1.625rem,6.6vw,3rem)] px-[clamp(0.25rem,1.4vw,1rem)] py-[clamp(0.25rem,0.6vw,0.5rem)]",
    "4xl": "text-[clamp(2rem,7.8vw,3.75rem)] px-[clamp(0.375rem,1.8vw,1.25rem)] py-[clamp(0.25rem,0.6vw,0.5rem)]",
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`arabic-text element-spring rounded-lg inline-flex items-center justify-center leading-relaxed font-bold ${sizeClasses[size]}`}
      style={{
        fontFamily: "var(--font-arabic)",
        color: isActive ? "#ffffff" : "var(--color-text-main)",
        backgroundColor: isActive ? "var(--color-primary)" : "transparent",
        border: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
        boxShadow: isActive ? "0 8px 28px var(--color-primary-glow)" : "none",
        transform: isActive ? "scale(1.18)" : "none",
        opacity: hasActive && !isActive ? 0.25 : 1,
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

// Map legacy fixed Tailwind gap classes → fluid clamp() so rows stay together
// on narrow phones. Max values equal the original fixed size; min kept small
// enough that 7-item 2xl rows fit at 320px without wrapping.
const FLUID_GAP: Record<string, string> = {
  "gap-1": "gap-[clamp(0.125rem,0.8vw,0.25rem)]",
  "gap-1.5": "gap-[clamp(0.1875rem,1vw,0.375rem)]",
  "gap-2": "gap-[clamp(0.25rem,1.2vw,0.5rem)]",
  "gap-3": "gap-[clamp(0.375rem,1.6vw,0.75rem)]",
  "gap-5": "gap-[clamp(0.625rem,2.4vw,1.25rem)]",
  "gap-6": "gap-[clamp(0.75rem,3vw,1.5rem)]",
};

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
          opacity: hasActive && !isActive ? 0.3 : 1,
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
            opacity: hasActive && activeId !== yoki.id ? 0.3 : 1,
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
            opacity: hasActive && activeId !== bismillah.id ? 0.5 : 1,
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
        opacity: hasActive && !isActive ? 0.25 : 1,
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
        opacity: hasActive && !isActive ? 0.3 : 1,
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
            opacity: hasActive && activeId !== bismillah.id ? 0.25 : 1,
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

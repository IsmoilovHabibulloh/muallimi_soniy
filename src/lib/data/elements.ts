import type { Element, ElementType } from "./types";

// Compact element builder: [id, type, arabic, uzbek, audioUrl, start, end, x, y, w, h]
type ED = [string, ElementType, string, string, string | null, number, number, number, number, number, number];

function make(pg: number, data: ED[]): Element[] {
  return data.map(([id, type, arabic, uzbek, audioUrl, start, end, x, y, w, h]) => ({
    id: `p${pg}_${id}`,
    type,
    arabic,
    uzbek,
    ...(audioUrl ? { audioUrl } : {}),
    start,
    end,
    x,
    y,
    width: w,
    height: h,
  }));
}

// Audio paths
const A = {
  muqova: "/audio/01. muqova.mp3",
  // Muqova (Sahifa 1) per-element chunks — see Materiallar/muqova/muqova.md
  mq: (name: string) => `/audio/edit/01_muqova/${name}.mp3`,
  alifbo: "/audio/03. alifbo.mp3",
  // Page 3 (alifbo) per-element chunks — see Materiallar/harflar/alifbo.md
  e: (name: string) => `/audio/edit/03_alifbo/${name}.mp3`,
  // Page 3+4 harakat chunks — see Materiallar/harflar/harakat.md
  h: (name: string) => `/audio/edit/04_harakat/${name}.mp3`,
  // Page 3+4 Ra harakat + birikma chunks — see Materiallar/harflar/ro.md
  r: (name: string) => `/audio/edit/05_ro/${name}.mp3`,
  // Page 4 Za chunks — see Materiallar/harflar/za.md
  z: (name: string) => `/audio/edit/06_za/${name}.mp3`,
  // Page 4 Mim chunks
  m: (name: string) => `/audio/edit/07_ma/${name}.mp3`,
  // Page 4 Ta chunks + Page 5 Ro continuation chunks (t09-t17)
  t: (name: string) => `/audio/edit/08_ta/${name}.mp3`,
  // Page 5 Nun chunks
  n: (name: string) => `/audio/edit/09_na/${name}.mp3`,
  // Page 5 Ya chunks
  y: (name: string) => `/audio/edit/10_ya/${name}.mp3`,
  // Page 6 Ba chunks
  b: (name: string) => `/audio/edit/11_ba/${name}.mp3`,
  // Page 6 Kaf chunks
  k: (name: string) => `/audio/edit/12_ka/${name}.mp3`,
  // Page 7 Lam chunks
  l: (name: string) => `/audio/edit/13_la/${name}.mp3`,
  // Page 7 Vav chunks
  v: (name: string) => `/audio/edit/14_va/${name}.mp3`,
  // Page 8 Ha (ه) chunks
  hh: (name: string) => `/audio/edit/15_ha/${name}.mp3`,
  // Page 8 Fa (ف) chunks
  f: (name: string) => `/audio/edit/16_fa/${name}.mp3`,
  // Page 9 Qof (ق) chunks
  q: (name: string) => `/audio/edit/17_qo/${name}.mp3`,
  // Page 9 Shin (ش) chunks
  sh: (name: string) => `/audio/edit/18_sha/${name}.mp3`,
  // Page 10 Sin (س) chunks
  s: (name: string) => `/audio/edit/19_sa/${name}.mp3`,
  // Page 10 Tsa (ث) chunks
  th: (name: string) => `/audio/edit/20_tsa/${name}.mp3`,
  // Page 11 Sod (ص) chunks
  so: (name: string) => `/audio/edit/21_so/${name}.mp3`,
  // Page 11 Tho (ط) chunks
  to_: (name: string) => `/audio/edit/22_to/${name}.mp3`,
  // Page 15 Dod (ض) chunks
  do_: (name: string) => `/audio/edit/29_dod/${name}.mp3`,
  // Page 15 Zal (ذ) chunks
  za_: (name: string) => `/audio/edit/30_zal/${name}.mp3`,
  // Page 12 Jim (ج) chunks
  j: (name: string) => `/audio/edit/23_ja/${name}.mp3`,
  // Page 12 Xo (خ) chunks
  x: (name: string) => `/audio/edit/24_xo/${name}.mp3`,
  // Page 13 Ha (ح) chunks
  ha_: (name: string) => `/audio/edit/25_ha/${name}.mp3`,
  // Page 13 G'ayn (غ) chunks
  gho_: (name: string) => `/audio/edit/26_gho/${name}.mp3`,
  // Page 14 Ayn (ع) chunks
  ay: (name: string) => `/audio/edit/27_ayn/${name}.mp3`,
  // Page 14 Dal (د) chunks
  da: (name: string) => `/audio/edit/28_dal/${name}.mp3`,
  // Page 16 Zo (ظ) chunks
  zh: (name: string) => `/audio/edit/31_zho/${name}.mp3`,
  // Page 17 Madli 01 chunks — 28 harf × 3 mad shakl = 84 syllable
  md1: (name: string) => `/audio/edit/32_madli_01/${name}.mp3`,
  // Page 18-21 Madli 02 chunks — mad davomi so'zlari
  md2: (name: string) => `/audio/edit/33_madli_02/${name}.mp3`,
  // Page 21-23 Tashdid chunks — intro + ربب + 6 qator × 7 + p23 davomi
  td: (name: string) => `/audio/edit/34_tashdid/${name}.mp3`,
  // Page 23 Tanvin chunks — intro narration + an/in/un sound demos
  tn: (name: string) => `/audio/edit/35_tanvin/${name}.mp3`,
  harakat: "/audio/04. harakat.mp3",
  ro: "/audio/05. ro.mp3",
  za: "/audio/06. za.mp3",
  ma: "/audio/07. ma.mp3",
  ta: "/audio/08. ta.mp3",
  na: "/audio/09. na.mp3",
  ya: "/audio/10. ya.mp3",
  ba: "/audio/11. ba.mp3",
  ka: "/audio/12. ka.mp3",
  la: "/audio/13. la.mp3",
  va: "/audio/14. va.mp3",
  ha5: "/audio/15. ha.mp3",
  fa: "/audio/16. fa.mp3",
  qo: "/audio/17. qo.mp3",
  sha: "/audio/18. sha.mp3",
  sin: "/audio/19. sa.mp3",
  tho: "/audio/20. sa.mp3",
  sod: "/audio/21. so.mp3",
  to: "/audio/22. to.mp3",
  jim: "/audio/23. ja.mp3",
  xo: "/audio/24. xo.mp3",
  ha: "/audio/25. ha.mp3",
  gho: "/audio/26. g'o.mp3",
  ayn: "/audio/27. ayn.mp3",
  dal: "/audio/28. da.mp3",
  dod: "/audio/29. zo.mp3",
  zol: "/audio/30. za.mp3",
  zho: "/audio/31. zo.mp3",
  mad1: "/audio/32. madli 01.mp3",
  mad2: "/audio/33. madli 02.mp3",
  tash: "/audio/34. tashdid.mp3",
  tanv: "/audio/35. tanvin.mp3",
  tantash: "/audio/36. tanvinli tashdid.mp3",
  muq: "/audio/02. Muqaddima.mp3",
};

// ============================================================
// PAGE 0 — Muqova (cover)
// Audio: 01. muqova.mp3 (5.7s) — 3 ta sarlavhani o'qiydi:
//   معلم ثانى → ياكى → الفباء عربى
// Muallif va o'quvchi ismi audio'da yo'q — static qoldiriladi.
// ============================================================
const p0: ED[] = [
  ["m01_title_main", "jumla", "معلم ثانى",  "Muallimi Soniy", A.mq("m01_muallimi_soniy"), 0, 1.64, 0, 0, 0, 0],
  ["m02_yoki",       "jumla", "ياكى",        "yoki",           A.mq("m02_yoki"),           0, 0.69, 0, 0, 0, 0],
  ["m03_title_sub",  "jumla", "الفباء عربى", "Alifbo arabiy",  A.mq("m03_alifbo_arabiy"),  0, 1.44, 0, 0, 0, 0],
];

// ============================================================
// PAGE 1 — Muqaddima (p1 + p2 merged)
// Read-along sahifa: faqat Bismillah tugmasi qoladi; prose matnlar
// hardcoded MUQADDIMA_PARAGRAPHS arrayida (RenderedPage.tsx).
// To'liq audio AudioControls orqali ijro etiladi.
// ============================================================
const p1: ED[] = [
  ["000", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ", "Bismillahir rohmanir rohim", A.muq, 0, 5, 0, 0, 0, 0],
];

// ============================================================
// PAGE 3 — Alifbo: Alphabet grid + harakats + ra
// ============================================================
const p3: ED[] = [
  // Intros (top of page): isteozah + bismillah + rule explanations
  ["i01_auzubillah", "jumla", "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", "Auzubillah", A.e("intro_a_auzubillah"), 0, 5.43, 0, 0, 100, 8],
  ["i02_bismillah",  "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",         "Bismillah",  A.e("intro_b_bismillah"),  0, 5.35, 0, 0, 100, 8],
  ["i03_rule1",      "jumla", "qoida_1", "Harfni joy-joyidan chiqarishlik uchun chiqarmoqchi boʻlayotgan harfimizni sukunli qilib oldiga fathali alif olib kelamiz.", A.e("intro_02_explain_1"), 0, 8.80, 0, 0, 100, 8],
  ["i04_misol",      "jumla", "misol",   "Misol uchun اب. اج, اس", A.e("intro_03_misol"), 0, 3.08, 0, 0, 100, 8],
  ["i05_rule2",      "jumla", "qoida_2", "Shunda harfni joyidan chiqarishlik ham qulay, ham oson boʻladi.", A.e("intro_04_explain_2"), 0, 4.50, 0, 0, 100, 8],

  // Alphabet — each element uses a chunked audio file from
  // /audio/edit/03_alifbo/ (cut from 03. alifbo.mp3 per PDF timings).
  // start = 0, end = chunk duration in seconds.
  // Row 1: ا ب ت ث ج ح خ
  ["01", "harf", "ا", "Alif",  A.e("e01_alif"),  0, 0.41, 88, 14, 7, 5],
  ["02", "harf", "ب", "Ba",    A.e("e02_ba"),    0, 0.65, 76, 14, 7, 5],
  ["03", "harf", "ت", "Ta",    A.e("e03_ta"),    0, 0.51, 64, 14, 7, 5],
  ["04", "harf", "ث", "Tha",   A.e("e04_tha"),   0, 0.47, 52, 14, 7, 5],
  ["05", "harf", "ج", "Jim",   A.e("e05_jim"),   0, 0.51, 40, 14, 7, 5],
  ["06", "harf", "ح", "Ha",    A.e("e06_ha"),    0, 0.69, 28, 14, 7, 5],
  ["07", "harf", "خ", "Xo",    A.e("e07_xo"),    0, 1.27, 16, 14, 7, 5],
  // Row 2: د ذ ر ز س ش ص
  ["08", "harf", "د", "Dal",   A.e("e08_dal"),   0, 1.43, 88, 22, 7, 5],
  ["09", "harf", "ذ", "Zal",   A.e("e09_zal"),   0, 0.49, 76, 22, 7, 5],
  ["10", "harf", "ر", "Ro",    A.e("e10_ro"),    0, 1.60, 64, 22, 7, 5],
  ["11", "harf", "ز", "Za",    A.e("e11_za"),    0, 0.99, 52, 22, 7, 5],
  ["12", "harf", "س", "Sin",   A.e("e12_sin"),   0, 1.05, 40, 22, 7, 5],
  ["13", "harf", "ش", "Shin",  A.e("e13_shin"),  0, 1.11, 28, 22, 7, 5],
  ["14", "harf", "ص", "Sod",   A.e("e14_sod"),   0, 1.06, 16, 22, 7, 5],
  // Row 3: ض ط ظ ع غ ف ق
  ["15", "harf", "ض", "Dod",   A.e("e15_dod"),   0, 1.93, 88, 30, 7, 5],
  ["16", "harf", "ط", "To",    A.e("e16_to"),    0, 1.29, 76, 30, 7, 5],
  ["17", "harf", "ظ", "Zo",    A.e("e17_zo"),    0, 0.94, 64, 30, 7, 5],
  ["18", "harf", "ع", "Ayn",   A.e("e18_ayn"),   0, 0.87, 52, 30, 7, 5],
  ["19", "harf", "غ", "G'ayn", A.e("e19_gayn"),  0, 0.91, 40, 30, 7, 5],
  ["20", "harf", "ف", "Fa",    A.e("e20_fa"),    0, 0.99, 28, 30, 7, 5],
  ["21", "harf", "ق", "Qof",   A.e("e21_qof"),   0, 0.55, 16, 30, 7, 5],
  // Row 4: ك ل م ن و ه ي
  ["22", "harf", "ك", "Kaf",   A.e("e22_kaf"),   0, 0.51, 88, 38, 7, 5],
  ["23", "harf", "ل", "Lam",   A.e("e23_lam"),   0, 0.67, 76, 38, 7, 5],
  ["24", "harf", "م", "Mim",   A.e("e24_mim"),   0, 0.69, 64, 38, 7, 5],
  ["25", "harf", "ن", "Nun",   A.e("e25_nun"),   0, 1.49, 52, 38, 7, 5],
  ["26", "harf", "و", "Vav",   A.e("e26_vav"),   0, 1.33, 40, 38, 7, 5],
  ["27", "harf", "ه", "He",    A.e("e27_he"),    0, 0.67, 28, 38, 7, 5],
  ["28", "harf", "ي", "Ya",    A.e("e28_ya"),    0, 0.81, 16, 38, 7, 5],
  // Harakat section: اَ اِ اُ
  ["29", "harf", "اَ", "Alif fatha", A.h("h01_fatha"), 0, 0.51, 72, 56, 10, 7],
  ["30", "harf", "اِ", "Alif kasra", A.h("h02_kasra"), 0, 0.52, 44, 56, 10, 7],
  ["31", "harf", "اُ", "Alif damma", A.h("h03_damma"), 0, 0.54, 16, 56, 10, 7],
  // Ra — kitobdagi asl shakl: standalone + 2 connected forms (har xil harakat bilan)
  // رَ (alohida, fatha) | ـرِ (bog'langan, kasra) | ـرُ (bog'langan, damma)
  ["32", "harf", "رَ",  "Ra fatha (alohida)", A.r("r01_fatha"), 0, 0.68, 72, 69, 10, 7],
  ["33", "harf", "ـرِ", "Ra kasra (bogʻlangan)", A.r("r02_kasra"), 0, 0.60, 44, 69, 10, 7],
  ["34", "harf", "ـرُ", "Ra damma (bogʻlangan)", A.r("r03_damma"), 0, 0.65, 16, 69, 10, 7],
  // Combined: اَرْ اِرْ اُرْ
  ["35", "bogin", "اَرْ", "Ar", A.r("r04_ar"), 0, 0.70, 72, 82, 10, 7],
  ["36", "bogin", "اِرْ", "Ir", A.r("r05_ir"), 0, 0.63, 44, 82, 10, 7],
  ["37", "bogin", "اُرْ", "Ur", A.r("r06_ur"), 0, 0.66, 16, 82, 10, 7],
];

// ============================================================
// PAGE 4 — Za / Mim / Ta amaliyoti (image 4.jpg)
// Audio: Za → 06. za.mp3, Mim → 07. ma.mp3, Ta → 08. ta.mp3
// Placeholder timings (0, 2) — to be replaced with per-element timings
// once the cut scripts for za / ma / ta audios are done.
// ============================================================
const p4: ED[] = [
  // ── Za (ز) section — 13 elements — audio from 06. za.mp3 ──
  ["01", "harf",  "زَ",   "Za fatha", A.z("z01_fatha"), 0, 0.71, 72, 8, 10, 7],
  ["02", "harf",  "زِ",   "Za kasra", A.z("z02_kasra"), 0, 0.68, 50, 8, 10, 7],
  ["03", "harf",  "زُ",   "Za damma", A.z("z03_damma"), 0, 0.75, 28, 8, 10, 7],
  ["04", "bogin", "اَزْ", "Az",  A.z("z04_az"),  0, 0.73, 84, 18, 10, 6],
  ["05", "bogin", "اِزْ", "Iz",  A.z("z05_iz"),  0, 0.75, 68, 18, 10, 6],
  ["06", "bogin", "اُزْ", "Uz",  A.z("z06_uz"),  0, 0.79, 52, 18, 10, 6],
  ["07", "bogin", "زَرْ", "Zar", A.z("z07_zar"), 0, 0.63, 36, 18, 10, 6],
  ["08", "bogin", "زِرْ", "Zir", A.z("z08_zir"), 0, 0.59, 20, 18, 10, 6],
  ["09", "bogin", "زُرْ", "Zur", A.z("z09_zur"), 0, 0.33,  4, 18, 10, 6],
  ["10", "soz", "اَزْرُ", "Azru", A.z("z10_azru"), 0, 1.13, 84, 28, 12, 6],
  ["11", "soz", "اِزْرُ", "Izru", A.z("z11_izru"), 0, 1.07, 64, 28, 12, 6],
  ["12", "soz", "اُزْرُ", "Uzru", A.z("z12_uzru"), 0, 1.15, 44, 28, 12, 6],
  ["13", "soz", "اُرْزُ", "Urzu", A.z("z13_urzu"), 0, 1.13, 24, 28, 12, 6],

  // ── Mim (م) section — 19 elements — audio from 07. ma.mp3 ──
  ["14", "harf",  "مَ",   "Ma (boshida)",   A.m("m01_fatha"), 0, 0.88, 72, 40, 10, 7],
  ["15", "harf",  "ـمِـ", "Mi (oʻrtasida)", A.m("m02_kasra"), 0, 0.88, 50, 40, 10, 7],
  ["16", "harf",  "ـمُ",  "Mu (oxirida)",   A.m("m03_damma"), 0, 0.98, 28, 40, 10, 7],
  ["17", "bogin", "اَمْ", "Am",  A.m("m04_am"),  0, 0.63, 84, 50, 10, 6],
  ["18", "bogin", "اِمْ", "Im",  A.m("m05_im"),  0, 0.69, 68, 50, 10, 6],
  ["19", "bogin", "اُمْ", "Um",  A.m("m06_um"),  0, 0.71, 52, 50, 10, 6],
  ["20", "bogin", "مُرْ", "Mur", A.m("m07_mur"), 0, 0.59, 36, 50, 10, 6],
  ["21", "bogin", "مُزْ", "Muz", A.m("m08_muz"), 0, 0.67, 20, 50, 10, 6],
  ["22", "bogin", "رُمْ", "Rum", A.m("m09_rum"), 0, 0.71,  4, 50, 10, 6],
  ["23", "soz",   "اَمَرَ", "Amara", A.m("m10_amara"), 0, 0.94, 85, 60, 12, 6],
  ["24", "soz",   "اُمَرَ", "Umara", A.m("m11_umara"), 0, 1.02, 70, 60, 12, 6],
  ["25", "soz",   "اَمْرُ", "Amru",  A.m("m12_amru"),  0, 1.15, 55, 60, 12, 6],
  ["26", "soz",   "اِمْرُ", "Imru",  A.m("m13_imru"),  0, 1.12, 40, 60, 12, 6],
  ["27", "soz",   "رَمْزُ", "Ramzu", A.m("m14_ramzu"), 0, 1.31, 25, 60, 12, 6],
  ["28", "soz",   "اِرْم",  "Irm",   A.m("m15_irm"),   0, 1.07, 10, 60, 12, 6],
  ["29", "soz",   "مَرْمَرْ", "Marmar", A.m("m16_marmar"), 0, 1.37, 80, 70, 14, 6],
  ["30", "soz",   "رَمْزَمْ", "Ramzam", A.m("m17_ramzam"), 0, 1.33, 60, 70, 14, 6],
  ["31", "soz",   "زَمْزَمْ", "Zamzam", A.m("m18_zamzam"), 0, 1.33, 40, 70, 14, 6],
  ["32", "soz",   "اَرْزَمْ", "Arzam",  A.m("m19_arzam"),  0, 1.29, 20, 70, 14, 6],

  // ── Ta (ت) section — 8 elements — audio from 08. ta.mp3 ──
  ["33", "harf",  "تَ",   "Ta (boshida)",   A.t("t01_fatha"), 0, 0.76, 72, 82, 10, 7],
  ["34", "harf",  "ـتِـ", "Ti (oʻrtasida)", A.t("t02_kasra"), 0, 0.90, 50, 82, 10, 7],
  ["35", "harf",  "ـتُ",  "Tu (oxirida)",   A.t("t03_damma"), 0, 0.59, 28, 82, 10, 7],
  ["36", "bogin", "مَتْ", "Mat",    A.t("t04_mat"),   0, 0.71, 82, 92, 10, 6],
  ["37", "bogin", "مِتْ", "Mit",    A.t("t05_mit"),   0, 0.69, 66, 92, 10, 6],
  ["38", "bogin", "مُتْ", "Mut",    A.t("t06_mut"),   0, 0.73, 50, 92, 10, 6],
  ["39", "soz",   "تَمَرْ", "Tamar", A.t("t07_tamar"), 0, 0.89, 30, 92, 14, 6],
  ["40", "soz",   "تَرِرْ", "Tarir", A.t("t08_tarir"), 0, 0.85, 10, 92, 14, 6],
];

// ============================================================
// PAGE 5 — Ro davom (08. ta.mp3 dan) + Nun + Ya
// Audio manbalar:
//   - Ro davom (9 ta so'z): 08. ta.mp3 ning 20.4s+ qismi → 08_ta/t09-t17
//   - Nun bo'limi (20 ta): 09. na.mp3 → 09_na/n01-n20
//   - Ya bo'limi (18 ta): 10. ya.mp3 → 10_ya/y01-y18
// Boundaries: silence-detect (-40dB/0.10s va -30dB/0.15s) + buffer -50/+100 ms.
// ============================================================
const p5: ED[] = [
  // ── Ro davom (yuqori bo'lim, 08. ta.mp3 dan) — 9 so'z ──
  // Row 1 (5 so'z) — har xil shaxslar/jinslarda "amara" fe'l shakllari
  ["01", "soz", "زُرْتَ",   "Zurta (sen m)",   A.t("t09_zurta"),   0, 1.22, 82,  4, 14, 5],
  ["02", "soz", "اَمَرْتِ", "Amarti (sen f)",  A.t("t10_amarti"),  0, 1.24, 64,  4, 14, 5],
  ["03", "soz", "مَرَرْتُ", "Marartu (men)",   A.t("t11_marartu"), 0, 1.42, 46,  4, 14, 5],
  ["04", "soz", "اُمِرْتُ", "Umirtu (passiv)", A.t("t12_umirtu"),  0, 1.28, 28,  4, 14, 5],
  ["05", "soz", "اَمَرَتْ", "Amarat (u f)",    A.t("t13_amarat"),  0, 1.07, 10,  4, 14, 5],
  // Row 2 (4 so'z)
  ["06", "soz", "اَمَرْتُمْ", "Amartum", A.t("t14_amartum"), 0, 1.41, 80, 13, 16, 5],
  ["07", "soz", "اُمِرْتُمْ", "Umirtum", A.t("t15_umirtum"), 0, 1.48, 58, 13, 16, 5],
  ["08", "soz", "مَرَرْتُمْ", "Mararum", A.t("t16_mararum"), 0, 1.68, 36, 13, 16, 5],
  ["09", "soz", "مُرِرْتُمْ", "Murirum", A.t("t17_murirum"), 0, 1.61, 14, 13, 16, 5],

  // ── Nun (ن) bo'limi (09. na.mp3) — 20 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["10", "harf", "نَ",     "Na (boshida)",   A.n("n01_fatha"), 0, 0.69, 72, 28, 10, 6],
  ["11", "harf", "ـنِـ",   "Ni (oʻrtasida)", A.n("n02_kasra"), 0, 0.72, 46, 28, 10, 6],
  ["12", "harf", "ـنُ",    "Nu (oxirida)",   A.n("n03_damma"), 0, 0.79, 20, 28, 10, 6],
  // Row 1 (6 bogin)
  ["13", "bogin", "اَنْ", "An",  A.n("n04_an"),   0, 0.77, 84, 38, 10, 5],
  ["14", "bogin", "اِنْ", "In",  A.n("n05_in"),   0, 0.77, 68, 38, 10, 5],
  ["15", "bogin", "زِنْ", "Zin", A.n("n06_zin"),  0, 0.98, 52, 38, 10, 5],
  ["16", "bogin", "مَنْ", "Man", A.n("n07_man"),  0, 0.90, 36, 38, 10, 5],
  ["17", "bogin", "مِنْ", "Min", A.n("n08_min"),  0, 0.95, 20, 38, 10, 5],
  ["18", "bogin", "نَمْ", "Nam", A.n("n09_nam"),  0, 0.96,  4, 38, 10, 5],
  // Row 2 (6 so'z)
  ["19", "soz", "اَنْتَ",   "Anta",   A.n("n10_anta"),   0, 1.52, 82, 48, 14, 5],
  ["20", "soz", "نِمْتَ",   "Nimta",  A.n("n11_nimta"),  0, 1.39, 66, 48, 14, 5],
  ["21", "soz", "اَنْتُمْ", "Antum",  A.n("n12_antum"),  0, 1.82, 50, 48, 14, 5],
  ["22", "soz", "نِمْتُمْ", "Nimtum", A.n("n13_nimtum"), 0, 1.62, 34, 48, 14, 5],
  ["23", "soz", "نَزِرُ",   "Naziru", A.n("n14_naziru"), 0, 1.25, 18, 48, 14, 5],
  ["24", "soz", "نَزِنُ",   "Nazinu", A.n("n15_nazinu"), 0, 1.24,  2, 48, 14, 5],
  // Row 3 (5 so'z)
  ["25", "soz", "اَمَرْنَا", "Amarna",  A.n("n16_amarna"),  0, 1.26, 82, 58, 16, 5],
  ["26", "soz", "اُمِرْنَا", "Umirna",  A.n("n17_umirna"),  0, 1.35, 62, 58, 16, 5],
  ["27", "soz", "مَرَرْنَا", "Mararna", A.n("n18_mararna"), 0, 1.44, 42, 58, 16, 5],
  ["28", "soz", "مُرِرْنَا", "Murirna", A.n("n19_murirna"), 0, 1.31, 22, 58, 16, 5],
  ["29", "soz", "اَمْرَرْنَا", "Amrarna", A.n("n20_amrarna"), 0, 1.65,  2, 58, 16, 5],

  // ── Ya (ي) bo'limi (10. ya.mp3) — 18 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["30", "harf", "يَ",     "Ya (boshida)",   A.y("y01_fatha"), 0, 0.72, 72, 70, 10, 6],
  ["31", "harf", "ـيِـ",   "Yi (oʻrtasida)", A.y("y02_kasra"), 0, 0.79, 46, 70, 10, 6],
  ["32", "harf", "ـيُ",    "Yu (oxirida)",   A.y("y03_damma"), 0, 0.72, 20, 70, 10, 6],
  // Row 1 (6 so'z)
  ["33", "soz", "اَيْ",   "Ay",    A.y("y04_ay"),    0, 0.72, 84, 80, 12, 5],
  ["34", "soz", "اَيْمُ", "Aymu",  A.y("y05_aymu"),  0, 1.24, 68, 80, 12, 5],
  ["35", "soz", "زَيْتُ", "Zaytu", A.y("y06_zaytu"), 0, 1.42, 52, 80, 12, 5],
  ["36", "soz", "مَيْتُ", "Maytu", A.y("y07_maytu"), 0, 1.33, 36, 80, 12, 5],
  ["37", "soz", "رَأْيُ", "Ra'yu", A.y("y08_rayu"),  0, 1.37, 20, 80, 12, 5],
  ["38", "soz", "رَمَى",  "Rama",  A.y("y09_rama"),  0, 1.30,  4, 80, 12, 5],
  // Row 2 (5 so'z)
  ["39", "soz", "يَمَنْ",   "Yaman",  A.y("y10_yaman"),  0, 1.07, 82, 88, 14, 5],
  ["40", "soz", "مَرْيَمْ", "Maryam", A.y("y11_maryam"), 0, 1.33, 62, 88, 16, 5],
  ["41", "soz", "مَيْزَرْ", "Mayzar", A.y("y12_mayzar"), 0, 1.28, 42, 88, 16, 5],
  ["42", "soz", "مَيْمَنْ", "Maymun", A.y("y13_maymun"), 0, 1.40, 22, 88, 16, 5],
  ["43", "soz", "اَيْمَنْ", "Ayman",  A.y("y14_ayman"),  0, 1.36,  2, 88, 16, 5],
  // Row 3 (4 so'z)
  ["44", "soz", "اَمْرَيْنِ",   "Amrayni",   A.y("y15_amrayni"),   0, 2.13, 78, 96, 18, 5],
  ["45", "soz", "زَيْتَيْنِ",   "Zaytayni",  A.y("y16_zaytayni"),  0, 1.85, 54, 96, 18, 5],
  ["46", "soz", "اَيْمَيْنِ",   "Aymayni",   A.y("y17_aymayni"),   0, 1.68, 28, 96, 18, 5],
  ["47", "soz", "مَيْتَيْنِ",   "Maytayni",  A.y("y18_maytayni"),  0, 1.83,  4, 96, 18, 5],
];

// ============================================================
// PAGE 6 — Ba (11. ba.mp3) + Kaf (12. ka.mp3)
// Ba: 3 header + 15 so'z = 18 element
// Kaf: 3 header + 18 so'z = 21 element
// ============================================================
const p6: ED[] = [
  // ── Ba (ب) bo'limi (11. ba.mp3) — 18 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["01", "harf", "بَ",    "Ba (boshida)",   A.b("b01_fatha"), 0, 0.64, 72, 4, 10, 6],
  ["02", "harf", "ـبِـ",  "Bi (oʻrtasida)", A.b("b02_kasra"), 0, 0.63, 46, 4, 10, 6],
  ["03", "harf", "ـبُ",   "Bu (oxirida)",   A.b("b03_damma"), 0, 0.73, 20, 4, 10, 6],
  // Row 1 (6 so'z): اَبْ، اِبْنُ، بِنْتُ، بَيْتُ، بَيْنَ، رَيْبْ
  ["04", "soz", "اَبْ",    "Ab (ota)",       A.b("b04_ab"),    0, 0.66, 84, 14, 12, 5],
  ["05", "soz", "اِبْنُ",  "Ibnu (o'g'il)",  A.b("b05_ibnu"),  0, 0.97, 68, 14, 12, 5],
  ["06", "soz", "بِنْتُ",  "Bintu (qiz)",    A.b("b06_bintu"), 0, 1.48, 52, 14, 12, 5],
  ["07", "soz", "بَيْتُ",  "Baytu (uy)",     A.b("b07_baytu"), 0, 1.38, 36, 14, 12, 5],
  ["08", "soz", "بَيْنُ",  "Baynu",          A.b("b08_bayna"), 0, 1.24, 20, 14, 12, 5],
  ["09", "soz", "رَيْبُ",  "Roybu",          A.b("b09_rayb"),  0, 1.26,  4, 14, 12, 5],
  // Row 2 (5 so'z): زَيْنَبْ، بَرْبَرْ، بَيْرَمْ، اَبْرَمْ، مِنْبَرْ
  ["10", "soz", "زَيْنَبْ", "Zaynab",         A.b("b10_zaynab"), 0, 1.34, 82, 24, 14, 5],
  ["11", "soz", "بَرْبَرْ", "Barbar",         A.b("b11_barbar"), 0, 1.20, 64, 24, 14, 5],
  ["12", "soz", "بَيْرَمْ", "Bayram",         A.b("b12_bayram"), 0, 1.37, 46, 24, 14, 5],
  ["13", "soz", "اَبْرَمْ", "Abram",          A.b("b13_abram"),  0, 1.22, 28, 24, 14, 5],
  ["14", "soz", "مِنْبَرْ", "Minbar",         A.b("b14_minbar"), 0, 1.79, 10, 24, 14, 5],
  // Row 3 (4 so'z): بَاَمْرَيْنِ، بِبَيْتَيْنِ، مِنْبَرَيْنِ، زَيْنَبَيْنِ
  ["15", "soz", "بَاَمْرَيْنِ",   "Ba-amrayni",     A.b("b15_baamrayni"),   0, 1.86, 78, 34, 18, 5],
  ["16", "soz", "بِبَيْتَيْنِ",   "Bibaytayni",     A.b("b16_bibaytayni"),  0, 1.82, 56, 34, 18, 5],
  ["17", "soz", "مِنْبَرَيْنِ",   "Minbarayni",     A.b("b17_minbarayni"),  0, 2.21, 32, 34, 18, 5],
  ["18", "soz", "زَيْنَبَيْنِ",   "Zaynabayni",     A.b("b18_zaynabayni"),  0, 1.94,  8, 34, 18, 5],

  // ── Kaf (ك) bo'limi (12. ka.mp3) — 21 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["19", "harf", "كَ",    "Ka (boshida)",   A.k("k01_fatha"), 0, 0.51, 72, 50, 10, 6],
  ["20", "harf", "ـكِـ",  "Ki (oʻrtasida)", A.k("k02_kasra"), 0, 0.52, 46, 50, 10, 6],
  ["21", "harf", "ـكُ",   "Ku (oxirida)",   A.k("k03_damma"), 0, 0.52, 20, 50, 10, 6],
  // Row 1 (4 so'z): كَمْ، كُمْ، كُنْ، كَيْ
  ["22", "soz", "كَمْ",   "Kam (qancha)",   A.k("k04_kam"),   0, 0.69, 82, 60, 12, 5],
  ["23", "soz", "كُمْ",   "Kum (sizlar)",   A.k("k05_kum"),   0, 0.75, 60, 60, 12, 5],
  ["24", "soz", "كُنْ",   "Kun (bo'l)",     A.k("k06_kun"),   0, 0.82, 38, 60, 12, 5],
  ["25", "soz", "كَيْ",   "Kay (toki)",     A.k("k07_kay"),   0, 0.76, 16, 60, 12, 5],
  // Row 2 (5 so'z): بَكْرُ، مَكْرُ، كَرْمُ، كَنْزُ، تَرْكُ
  ["26", "soz", "بَكْرُ", "Bakru",          A.k("k08_bakru"), 0, 1.12, 84, 70, 14, 5],
  ["27", "soz", "مَكْرُ", "Makru (hiyla)",  A.k("k09_makru"), 0, 1.14, 66, 70, 14, 5],
  ["28", "soz", "كَرْمُ", "Karmu (uzum)",   A.k("k10_karmu"), 0, 1.11, 48, 70, 14, 5],
  ["29", "soz", "كَنْزُ", "Kanzu (xazina)", A.k("k11_kanzu"), 0, 1.51, 30, 70, 14, 5],
  ["30", "soz", "تَرْكُ", "Tarku (tark)",   A.k("k12_tarku"), 0, 1.11, 12, 70, 14, 5],
  // Row 3 (5 so'z): كَتَبَ، يَكْتُبُ، تَرَكَ، يَتْرُكُ، كَتَبْتُمْ
  ["31", "soz", "كَتَبَ",   "Kataba (yozdi)",       A.k("k13_kataba"),   0, 0.91, 82, 80, 14, 5],
  ["32", "soz", "يَكْتُبُ", "Yaktubu (yozadi)",     A.k("k14_yaktubu"),  0, 1.35, 64, 80, 16, 5],
  ["33", "soz", "تَرَكَ",   "Taraka (tark qildi)",  A.k("k15_taraka"),   0, 0.96, 46, 80, 14, 5],
  ["34", "soz", "يَتْرُكُ", "Yatruku (tark qiladi)",A.k("k16_yatruku"),  0, 1.43, 26, 80, 16, 5],
  ["35", "soz", "كَتَبْتُمْ","Katabtum (yozdingiz)", A.k("k17_katabtum"), 0, 1.46,  6, 80, 18, 5],
  // Row 4 (4 so'z): اَمْرَكَ، اَمَرَتْكَ، كُنْتُ، مُمْكِنْ
  ["36", "soz", "اَمَرَكَ",  "Amaraka",            A.k("k18_amraka"),   0, 1.19, 80, 90, 16, 5],
  ["37", "soz", "اَمَرَتْكَ","Amaratka",           A.k("k19_amaratka"), 0, 1.43, 58, 90, 18, 5],
  ["38", "soz", "كُنْتُ",    "Kuntu (men bo'ldim)",A.k("k20_kuntu"),    0, 1.50, 38, 90, 14, 5],
  ["39", "soz", "مُمْكِنْ",  "Mumkin",             A.k("k21_mumkin"),   0, 1.57, 18, 90, 14, 5],
];

// ============================================================
// PAGE 7 — Lam + Vav
// ============================================================
const p7: ED[] = [
  // ── Lam (ل) bo'limi (13. la.mp3) — 26 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["01", "harf", "لَ",    "La (boshida)",   A.l("l01_fatha"), 0, 0.65, 72, 3, 10, 6],
  ["02", "harf", "ـلِـ",  "Li (oʻrtasida)", A.l("l02_kasra"), 0, 0.70, 46, 3, 10, 6],
  ["03", "harf", "ـلُ",   "Lu (oxirida)",   A.l("l03_damma"), 0, 0.69, 20, 3, 10, 6],
  // Row 1 (6 bo'g'in): اَلْ، بَلْ، لَمْ، لُمْ، لَنْ، كِلْ
  ["04", "bogin", "اَلْ",  "Al",               A.l("l04_al"),  0, 0.77, 84, 13, 12, 5],
  ["05", "bogin", "بَلْ",  "Bal",              A.l("l05_bal"), 0, 0.92, 68, 13, 12, 5],
  ["06", "bogin", "لَمْ",  "Lam (yo'q)",       A.l("l06_lam"), 0, 0.89, 52, 13, 12, 5],
  ["07", "bogin", "لُمْ",  "Lum (qorala)",     A.l("l07_lum"), 0, 0.89, 36, 13, 12, 5],
  ["08", "bogin", "لَنْ",  "Lan (qilmaydi)",   A.l("l08_lan"), 0, 0.93, 20, 13, 12, 5],
  ["09", "bogin", "كِلْ",  "Kil (o'lcha)",     A.l("l09_kil"), 0, 0.73,  4, 13, 12, 5],
  // Row 2 (6 so'z): نَزَلَ، لَزِمَ، كَمُلَ، اَنْزَلَ، اَلْزَمَ، اَكْمَلَ
  ["10", "soz", "نَزَلَ",    "Tushdi",         A.l("l10_nazala"),  0, 1.07, 84, 22, 14, 5],
  ["11", "soz", "لَزِمَ",    "Lozim bo'ldi",   A.l("l11_lazima"),  0, 1.15, 68, 22, 14, 5],
  ["12", "soz", "كَمُلَ",    "Komil bo'ldi",   A.l("l12_kamala"),  0, 0.99, 52, 22, 14, 5],
  ["13", "soz", "اَنْزَلَ",  "Tushirdi",       A.l("l13_anzala"),  0, 1.76, 34, 22, 16, 5],
  ["14", "soz", "اَلْزَمَ",  "Majbur qildi",   A.l("l14_alzam"),   0, 1.41, 18, 22, 14, 5],
  ["15", "soz", "اَكْمَلَ",  "Tugatdi",        A.l("l15_akmal"),   0, 1.25,  2, 22, 14, 5],
  // Row 3 (6 so'z): اَكَلَتْ، اَكَلْنَا، اَكَلْتَ، اَكَلْتِ، اَكَلْتُ، اَكَلْتُمْ
  ["16", "soz", "اَكَلَتْ",   "U yedi (ayol)",     A.l("l16_akalat"),  0, 1.37, 84, 31, 14, 5],
  ["17", "soz", "اَكَلْنَا",  "Biz yedik",         A.l("l17_akalna"),  0, 1.25, 68, 31, 14, 5],
  ["18", "soz", "اَكَلْتَ",   "Sen yeding (erk.)", A.l("l18_akalta"),  0, 1.24, 52, 31, 14, 5],
  ["19", "soz", "اَكَلْتِ",   "Sen yeding (ayol)", A.l("l19_akalti"),  0, 1.30, 36, 31, 14, 5],
  ["20", "soz", "اَكَلْتُ",   "Men yedim",         A.l("l20_akaltu"),  0, 1.32, 20, 31, 14, 5],
  ["21", "soz", "اَكَلْتُمْ", "Sizlar yedingiz",   A.l("l21_akaltum"), 0, 1.60,  2, 31, 16, 5],
  // Row 4 (5 so'z): بُلْبُلْ، يَلْمَلَمْ، تَزَلْزَلَ، يَتَزَلْزَلُ، مُتَزَلْزِلْ
  ["22", "soz", "بُلْبُلْ",      "Bulbul",          A.l("l22_bulbul"),      0, 1.44, 84, 40, 16, 5],
  ["23", "soz", "يَلْمَلَمْ",    "Yalamlam (joy)",  A.l("l23_yalmalam"),    0, 1.57, 64, 40, 16, 5],
  ["24", "soz", "تَزَلْزَلَ",    "Silkindi",        A.l("l24_tazalzala"),   0, 1.63, 44, 40, 16, 5],
  ["25", "soz", "يَتَزَلْزَلُ",  "Silkinadi",       A.l("l25_yatazalzalu"), 0, 2.12, 24, 40, 18, 5],
  ["26", "soz", "مُتَزَلْزِلْ",  "Tebranuvchi",     A.l("l26_mutazalzil"),  0, 2.14,  2, 40, 18, 5],

  // ── Vav (و) bo'limi (14. va.mp3) — 23 element ──
  // Headers — non-connector (isolated shakllar)
  ["27", "harf", "وَ", "Va fatha",  A.v("v01_fatha"), 0, 0.70, 72, 51, 10, 6],
  ["28", "harf", "وِ", "Vi kasra",  A.v("v02_kasra"), 0, 0.79, 46, 51, 10, 6],
  ["29", "harf", "وُ", "Vu damma",  A.v("v03_damma"), 0, 0.77, 20, 51, 10, 6],
  // Row 1 (4 bo'g'in): اَوْ، رَوْ، نَوْ، لَوْ
  ["30", "bogin", "اَوْ", "Aw (yoki)",  A.v("v04_aw"),  0, 0.75, 80, 61, 12, 5],
  ["31", "bogin", "رَوْ", "Raw",        A.v("v05_raw"), 0, 0.89, 58, 61, 12, 5],
  ["32", "bogin", "نَوْ", "Naw",        A.v("v06_naw"), 0, 0.96, 36, 61, 12, 5],
  ["33", "bogin", "لَوْ", "Law (agar)", A.v("v07_law"), 0, 0.95, 14, 61, 12, 5],
  // Row 2 (6 so'z): وَرَمْ، وَتَرْ، وَمَنْ، وَلَنْ، وَلَمْ، وَكَمْ
  ["34", "soz", "وَرَمْ",  "Shish",          A.v("v08_waram"), 0, 1.12, 84, 70, 14, 5],
  ["35", "soz", "وَتَرْ",  "Vatar (tor)",    A.v("v09_watar"), 0, 1.01, 68, 70, 14, 5],
  ["36", "soz", "وَمَنْ",  "Va kim",         A.v("v10_waman"), 0, 1.08, 52, 70, 14, 5],
  ["37", "soz", "وَلَنْ",  "Va qilmaydi",    A.v("v11_walan"), 0, 1.09, 36, 70, 14, 5],
  ["38", "soz", "وَلَمْ",  "Va qilmadi",     A.v("v12_walam"), 0, 1.06, 20, 70, 14, 5],
  ["39", "soz", "وَكَمْ",  "Va qancha",      A.v("v13_wakam"), 0, 1.17,  4, 70, 14, 5],
  // Row 3 (6 so'z): اَوْلُ، رَوْمُ، يَوْمُ، كَوْنُ، وَيْلُ، وَزْنُ
  ["40", "soz", "اَوْلُ",   "Avlu",           A.v("v14_awlu"),   0, 1.19, 84, 79, 14, 5],
  ["41", "soz", "رَوْمُ",   "Maqsad",         A.v("v15_rawmu"),  0, 1.35, 68, 79, 14, 5],
  ["42", "soz", "يَوْمُ",   "Kun",            A.v("v16_yawmu"),  0, 1.35, 52, 79, 14, 5],
  ["43", "soz", "كَوْنُ",   "Borliq",         A.v("v17_kawnu"),  0, 1.23, 36, 79, 14, 5],
  ["44", "soz", "وَيْلُ",   "Voy",            A.v("v18_waylu"),  0, 1.31, 20, 79, 14, 5],
  ["45", "soz", "وَزْنُ",   "Vazn",           A.v("v19_waznu"),  0, 1.33,  4, 79, 14, 5],
  // Row 4 (4 so'z): كَوْكَبْ، مَوْكِبْ، اَوْلَمْتُمْ، اَوْتَرْتُمْ
  ["46", "soz", "كَوْكَبْ",    "Yulduz",              A.v("v20_kawkab"),   0, 1.19, 82, 88, 16, 5],
  ["47", "soz", "مَوْكِبْ",    "Yurish",              A.v("v21_mawkib"),   0, 1.50, 60, 88, 16, 5],
  ["48", "soz", "اَوْلَمْتُمْ", "Ziyofat qildingiz",   A.v("v22_awlamtum"), 0, 2.02, 36, 88, 18, 5],
  ["49", "soz", "اَوْتَرْتُمْ", "Vitr o'qidingiz",     A.v("v23_awtartum"), 0, 2.00, 12, 88, 18, 5],
];

// ============================================================
// PAGE 8 — Ha (ه) + Fa (ف)
// ============================================================
const p8: ED[] = [
  // ── Ha (ه) bo'limi (15. ha.mp3) — 21 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["01", "harf", "هَ",    "Ha (boshida)",   A.hh("h01_fatha"), 0, 0.76, 72, 4, 10, 6],
  ["02", "harf", "ـهِـ",  "Hi (oʻrtasida)", A.hh("h02_kasra"), 0, 0.73, 46, 4, 10, 6],
  ["03", "harf", "ـهُ",   "Hu (oxirida)",   A.hh("h03_damma"), 0, 0.76, 20, 4, 10, 6],
  // Row 1 (7 so'z): هَبْ، هَمْ، هَلْ، هُوَ، هِيَ، هُمْ، زَهْ
  ["04", "soz", "هَبْ",  "Hab (ber)",         A.hh("h04_hab"),  0, 0.77, 86, 14, 10, 5],
  ["05", "soz", "هَمْ",  "Ham (g'am)",        A.hh("h05_ham"),  0, 0.89, 72, 14, 10, 5],
  ["06", "soz", "هَلْ",  "Hal (so'roq)",      A.hh("h06_hal"),  0, 0.95, 58, 14, 10, 5],
  ["07", "soz", "هُوَ",  "Huwa (u)",          A.hh("h07_huwa"), 0, 0.89, 44, 14, 10, 5],
  ["08", "soz", "هِيَ",  "Hiya (u ayol)",     A.hh("h08_hiya"), 0, 0.97, 30, 14, 10, 5],
  ["09", "soz", "هُمْ",  "Hum (ular)",        A.hh("h09_hum"),  0, 0.93, 16, 14, 10, 5],
  ["10", "soz", "زَهْ",  "Zah",               A.hh("h10_zah"),  0, 1.10,  2, 14, 10, 5],
  // Row 2 (6 so'z): اَهَمْ، وَهَبْ، لَهَبْ، وَهَمْ، لَهُمْ، بِهِمْ
  ["11", "soz", "اَهَمْ", "Aham (muhim)",     A.hh("h11_aham"),  0, 1.02, 84, 26, 12, 5],
  ["12", "soz", "وَهَبْ", "Wahab (hadya)",    A.hh("h12_wahab"), 0, 1.19, 68, 26, 12, 5],
  ["13", "soz", "لَهَبْ", "Lahab (olov)",     A.hh("h13_lahab"), 0, 1.12, 52, 26, 12, 5],
  ["14", "soz", "وَهَمْ", "Waham (gumon)",    A.hh("h14_waham"), 0, 1.22, 36, 26, 12, 5],
  ["15", "soz", "لَهُمْ", "Lahum (ularga)",   A.hh("h15_lahum"), 0, 1.23, 20, 26, 12, 5],
  ["16", "soz", "بِهِمْ", "Bihim (ular b-n)", A.hh("h16_bihim"), 0, 1.23,  4, 26, 12, 5],
  // Row 3 (5 so'z): مِنْهُ، مِنْهُمْ، اِلَيْهِ، اِلَيْهِمْ، اَمْهِلْهُمْ
  ["17", "soz", "مِنْهُ",      "Minhu (undan)",          A.hh("h17_minhu"),    0, 1.58, 84, 38, 12, 5],
  ["18", "soz", "مِنْهُمْ",    "Minhum (ulardan)",       A.hh("h18_minhum"),   0, 1.69, 66, 38, 14, 5],
  ["19", "soz", "اِلَيْهِ",    "Ilayhi (unga)",          A.hh("h19_ilayhi"),   0, 1.55, 48, 38, 14, 5],
  ["20", "soz", "اِلَيْهِمْ",  "Ilayhim (ularga)",       A.hh("h20_ilayhim"),  0, 1.74, 28, 38, 16, 5],
  ["21", "soz", "اَمْهِلْهُمْ","Amhilhum (muhlat ber)",  A.hh("h21_amhilhum"), 0, 2.38,  6, 38, 20, 5],

  // ── Fa (ف) bo'limi (16. fa.mp3) — 25 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["22", "harf", "فَ",    "Fa (boshida)",   A.f("f01_fatha"), 0, 0.68, 72, 54, 10, 6],
  ["23", "harf", "ـفِـ",  "Fi (oʻrtasida)", A.f("f02_kasra"), 0, 0.66, 46, 54, 10, 6],
  ["24", "harf", "ـفُ",   "Fu (oxirida)",   A.f("f03_damma"), 0, 0.84, 20, 54, 10, 6],
  // Row 1 (6 so'z): فَمْ، فَنْ، كَفْ، فَلَكْ، كَفَنْ، نَفَرْ
  ["25", "soz", "فَمْ",    "Fam (og'iz)",    A.f("f04_fam"),   0, 0.86, 84, 64, 12, 5],
  ["26", "soz", "فَنْ",    "Fan",            A.f("f05_fan"),   0, 0.89, 68, 64, 12, 5],
  ["27", "soz", "كَفْ",    "Kaf (kaft)",     A.f("f06_kaf"),   0, 0.82, 52, 64, 12, 5],
  ["28", "soz", "فَلَكْ",  "Falak",          A.f("f07_falak"), 0, 0.71, 36, 64, 12, 5],
  ["29", "soz", "كَفَنْ",  "Kafan",          A.f("f08_kafan"), 0, 1.07, 20, 64, 12, 5],
  ["30", "soz", "نَفَرْ",  "Nafar (odam)",   A.f("f09_nafar"), 0, 1.07,  4, 64, 12, 5],
  // Row 2 (6 so'z): فَوْرُ، فَوْزُ، فَهْمُ، فِكْرُ، زِفْرُ، كِفْلُ
  ["31", "soz", "فَوْرُ",  "Fawru (tezlik)", A.f("f10_fawru"), 0, 1.20, 84, 74, 12, 5],
  ["32", "soz", "فَوْزُ",  "Fawzu (yutuq)",  A.f("f11_fawzu"), 0, 1.38, 68, 74, 12, 5],
  ["33", "soz", "فَهْمُ",  "Fahmu (fahm)",   A.f("f12_fahmu"), 0, 1.31, 52, 74, 12, 5],
  ["34", "soz", "فِكْرُ",  "Fikru (fikr)",   A.f("f13_fikru"), 0, 1.11, 36, 74, 12, 5],
  ["35", "soz", "زِفْرُ",  "Zifru",          A.f("f14_zifru"), 0, 1.33, 20, 74, 12, 5],
  ["36", "soz", "كِفْلُ",  "Kiflu (nasib)",  A.f("f15_kiflu"), 0, 1.21,  4, 74, 12, 5],
  // Row 3 (6 so'z): فُلْفُلْ، نَوْفَرُ، نَوْفَلْ، فَهِمَ، يَفْهَمُ، اِفْهَمْ
  ["37", "soz", "فُلْفُلْ", "Fulful (murch)",      A.f("f16_fulful"),  0, 1.42, 84, 84, 14, 5],
  ["38", "soz", "نَوْفَرُ", "Nawfaru",             A.f("f17_nawfaru"), 0, 1.49, 68, 84, 14, 5],
  ["39", "soz", "نَوْفَلْ", "Nawfal (ism)",        A.f("f18_nawfal"),  0, 1.57, 52, 84, 14, 5],
  ["40", "soz", "فَهِمَ",   "Fahima (tushundi)",   A.f("f19_fahima"),  0, 1.09, 36, 84, 14, 5],
  ["41", "soz", "يَفْهَمُ", "Yafhamu (tushunadi)", A.f("f20_yafhamu"), 0, 1.55, 20, 84, 14, 5],
  ["42", "soz", "اِفْهَمْ", "Ifham (tushun!)",     A.f("f21_ifham"),   0, 1.46,  4, 84, 14, 5],
  // Row 4 (4 so'z): اِفْتَتَنَ، يَفْتَتِنُ، اِفْتَكَرَ، يَفْتَكِرُ
  ["43", "soz", "اِفْتَتَنَ", "Iftatana (maftun bo'ldi)", A.f("f22_iftatana"),  0, 1.62, 80, 94, 18, 5],
  ["44", "soz", "يَفْتَتِنُ", "Yaftatinu",                A.f("f23_yaftatinu"), 0, 1.83, 58, 94, 18, 5],
  ["45", "soz", "اِفْتَكَرَ", "Iftakara (o'yladi)",       A.f("f24_iftakara"),  0, 1.57, 36, 94, 18, 5],
  ["46", "soz", "يَفْتَكِرُ", "Yaftakiru",                A.f("f25_yaftakiru"), 0, 1.74, 14, 94, 18, 5],
];

// ============================================================
// PAGE 9 — Qof (ق) + Shin (ش)
// ============================================================
const p9: ED[] = [
  // ── Qof (ق) bo'limi (17. qo.mp3) — 26 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["01", "harf", "قَ",    "Qo (boshida)",   A.q("q01_fatha"), 0, 0.53, 72, 4, 10, 6],
  ["02", "harf", "ـقِـ",  "Qi (oʻrtasida)", A.q("q02_kasra"), 0, 0.57, 46, 4, 10, 6],
  ["03", "harf", "ـقُ",   "Qu (oxirida)",   A.q("q03_damma"), 0, 0.57, 20, 4, 10, 6],
  // Row 1 (6 so'z): زُقْ، قِنْ، قُلْ، قُمْ، قِفْ، قِهْ
  ["04", "soz", "زُقْ",  "Zuq",          A.q("q04_zuq"), 0, 0.86, 86, 13, 10, 5],
  ["05", "soz", "قِنْ",  "Qin",          A.q("q05_qin"), 0, 0.77, 72, 13, 10, 5],
  ["06", "soz", "قُلْ",  "Qul (ayt)",    A.q("q06_qul"), 0, 0.74, 58, 13, 10, 5],
  ["07", "soz", "قُمْ",  "Qum (tur)",    A.q("q07_qum"), 0, 0.76, 44, 13, 10, 5],
  ["08", "soz", "قِفْ",  "Qif (to'xta)", A.q("q08_qif"), 0, 0.83, 30, 13, 10, 5],
  ["09", "soz", "قِهْ",  "Qih",          A.q("q09_qih"), 0, 0.75, 16, 13, 10, 5],
  // Row 2 (7 so'z): قَلْبُ، قَبْلُ، فَوْقُ، قَلَمُ، قَمَرُ، لَقَبُ، قُمْقُمْ
  ["10", "soz", "قَلْبُ",   "Qalbu (yurak)",   A.q("q10_qalbu"),  0, 1.21, 88, 22, 12, 5],
  ["11", "soz", "قَبْلُ",   "Qablu (oldin)",   A.q("q11_qablu"),  0, 1.07, 74, 22, 12, 5],
  ["12", "soz", "فَوْقُ",   "Fawqu (yuqori)",  A.q("q12_fawqu"),  0, 1.32, 60, 22, 12, 5],
  ["13", "soz", "قَلَمُ",   "Qalamu",          A.q("q13_qalamu"), 0, 0.95, 46, 22, 12, 5],
  ["14", "soz", "قَمَرُ",   "Qamaru (oy)",     A.q("q14_qamaru"), 0, 0.87, 32, 22, 12, 5],
  ["15", "soz", "لَقَبُ",   "Laqabu",          A.q("q15_laqabu"), 0, 1.05, 18, 22, 12, 5],
  ["16", "soz", "قُمْقُمْ",  "Qumqum",          A.q("q16_qumqum"), 0, 1.40,  4, 22, 12, 5],
  // Row 3 (4 so'z): اِقْتَرَبَ، يَقْتَرِبُ، اِنْقَلَبَ، يَنْقَلِبُ
  ["17", "soz", "اِقْتَرَبَ", "Iqtaraba (yaqinlashdi)",     A.q("q17_iqtaraba"),  0, 1.51, 80, 31, 18, 5],
  ["18", "soz", "يَقْتَرِبُ", "Yaqtaribu (yaqinlashadi)",   A.q("q18_yaqtaribu"), 0, 1.66, 58, 31, 18, 5],
  ["19", "soz", "اِنْقَلَبَ",  "Inqalaba (ag'darildi)",      A.q("q19_inqalaba"),  0, 1.79, 34, 31, 18, 5],
  ["20", "soz", "يَنْقَلِبُ",  "Yanqalibu (ag'dariladi)",    A.q("q20_yanqalibu"), 0, 1.94, 10, 31, 18, 5],
  // Row 4 (6 so'z, 3 juftlik): كَمَرْ-قَمَرْ، فَلَكْ-فَلَقْ، فَرْكُ-فَرْقُ
  ["21", "soz", "كَمَرْ", "Kamar",        A.q("q21_kamar"), 0, 0.81, 86, 42, 10, 5],
  ["22", "soz", "قَمَرْ", "Qamar (oy)",   A.q("q22_qamar"), 0, 0.84, 74, 42, 10, 5],
  ["23", "soz", "فَلَكْ", "Falak",        A.q("q23_falak"), 0, 0.78, 58, 42, 10, 5],
  ["24", "soz", "فَلَقْ", "Falaq",        A.q("q24_falaq"), 0, 0.85, 46, 42, 10, 5],
  ["25", "soz", "فَرْكُ", "Farku",        A.q("q25_farku"), 0, 1.18, 28, 42, 10, 5],
  ["26", "soz", "فَرْقُ", "Farqu (farq)", A.q("q26_farqu"), 0, 1.17, 14, 42, 10, 5],

  // ── Shin (ش) bo'limi (18. sha.mp3) — 24 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["27", "harf", "شَ",    "Sha (boshida)",   A.sh("s01_fatha"), 0, 0.83, 72, 52, 10, 6],
  ["28", "harf", "ـشِـ",  "Shi (oʻrtasida)", A.sh("s02_kasra"), 0, 0.63, 46, 52, 10, 6],
  ["29", "harf", "ـشُ",   "Shu (oxirida)",   A.sh("s03_damma"), 0, 0.68, 20, 52, 10, 6],
  // Row 1 (6 so'z): رَشْ، بُشْ، شَرْ، شَقْ، شَمْ، شَكْ
  ["30", "soz", "رَشْ", "Rash",          A.sh("s04_rash"), 0, 0.86, 86, 62, 10, 5],
  ["31", "soz", "بُشْ", "Bush",          A.sh("s05_bush"), 0, 0.93, 72, 62, 10, 5],
  ["32", "soz", "شَرْ", "Shar (yomon)",  A.sh("s06_shar"), 0, 0.79, 58, 62, 10, 5],
  ["33", "soz", "شَقْ", "Shaq",          A.sh("s07_shaq"), 0, 0.76, 44, 62, 10, 5],
  ["34", "soz", "شَمْ", "Sham",          A.sh("s08_sham"), 0, 0.96, 30, 62, 10, 5],
  ["35", "soz", "شَكْ", "Shak (shubha)", A.sh("s09_shak"), 0, 0.64, 16, 62, 10, 5],
  // Row 2 (6 so'z): بِشْرُ، شِرْبُ، شَهْرُ، نَشْرُ، شُكْرُ، شُرْبُ
  ["36", "soz", "بِشْرُ", "Bishru (quvonch)",   A.sh("s10_bishru"), 0, 1.24, 87, 71, 12, 5],
  ["37", "soz", "شِرْبُ", "Shirbu (ichish)",    A.sh("s11_shirbu"), 0, 1.20, 73, 71, 12, 5],
  ["38", "soz", "شَهْرُ", "Shahru (oy)",        A.sh("s12_shahru"), 0, 1.33, 59, 71, 12, 5],
  ["39", "soz", "نَشْرُ", "Nashru (nashr)",     A.sh("s13_nashru"), 0, 1.22, 45, 71, 12, 5],
  ["40", "soz", "شُكْرُ", "Shukru (shukr)",     A.sh("s14_shukru"), 0, 1.35, 31, 71, 12, 5],
  ["41", "soz", "شُرْبُ", "Shurbu (ichimlik)",  A.sh("s15_shurbu"), 0, 1.20, 17, 71, 12, 5],
  // Row 3 (5 so'z): مَشْرَبْ، مَشْرِبْ، مَشْرِقْ، مُشْتَهِرْ، مُشْتَرَكْ
  ["42", "soz", "مَشْرَبْ",   "Mashrab (ichimlik joyi)",  A.sh("s16_mashrab"),   0, 1.41, 86, 80, 14, 5],
  ["43", "soz", "مَشْرِبْ",   "Mashrib (ichuvchi)",       A.sh("s17_mashrib"),   0, 1.36, 68, 80, 14, 5],
  ["44", "soz", "مَشْرِقْ",   "Mashriq (sharq)",          A.sh("s18_mashriq"),   0, 1.30, 50, 80, 14, 5],
  ["45", "soz", "مُشْتَهِرْ",  "Mushtahir (mashhur)",      A.sh("s19_mushtahir"), 0, 1.56, 30, 80, 16, 5],
  ["46", "soz", "مُشْتَرَكْ",  "Mushtarak (umumiy)",       A.sh("s20_mushtarak"), 0, 1.48, 10, 80, 16, 5],
  // Row 4 (4 so'z): اِشْتَهَرَ، يَشْتَهِرُ، اِبْرَنْشَقَ، يَبْرَنْشِقُ
  ["47", "soz", "اِشْتَهَرَ",   "Ishtahara (mashhur bo'ldi)",    A.sh("s21_ishtahara"),   0, 1.58, 82, 90, 18, 5],
  ["48", "soz", "يَشْتَهِرُ",   "Yashtahiru (mashhur bo'ladi)",  A.sh("s22_yashtahiru"), 0, 1.73, 58, 90, 18, 5],
  ["49", "soz", "اِبْرَنْشَقَ",  "Ibranshaqa (yorildi)",           A.sh("s23_ibranshaqa"),  0, 2.25, 32, 90, 20, 5],
  ["50", "soz", "يَبْرَنْشِقُ",  "Yabranshiqu (yoriladi)",         A.sh("s24_yabranshiqu"), 0, 2.37,  8, 90, 20, 5],
];

// ============================================================
// PAGE 10 — Sin (س) + Tsa (ث)
// ============================================================
const p10: ED[] = [
  // ── Sin (س) bo'limi (19. sa.mp3) — 23 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["01", "harf", "سَ",    "Sa (boshida)",   A.s("si01_fatha"), 0, 0.64, 72, 3, 10, 6],
  ["02", "harf", "ـسِـ",  "Si (oʻrtasida)", A.s("si02_kasra"), 0, 0.64, 46, 3, 10, 6],
  ["03", "harf", "ـسُ",   "Su (oxirida)",   A.s("si03_damma"), 0, 0.66, 20, 3, 10, 6],
  // Row 1 (5 so'z): بَسْ سَمْ سِرْ سِنْ سِلْ
  ["04", "soz", "بَسْ", "Bas",           A.s("si04_bas"), 0, 0.92, 86, 11, 10, 5],
  ["05", "soz", "سَمْ", "Sam (zahar)",   A.s("si05_sam"), 0, 0.84, 70, 11, 10, 5],
  ["06", "soz", "سِرْ", "Sir",           A.s("si06_sir"), 0, 0.69, 54, 11, 10, 5],
  ["07", "soz", "سِنْ", "Sin (yosh)",    A.s("si07_sin"), 0, 0.85, 38, 11, 10, 5],
  ["08", "soz", "سِلْ", "Sil",           A.s("si08_sil"), 0, 0.86, 22, 11, 10, 5],
  // Row 2 (6 so'z): سَفَرْ سَقَرْ سَبَقْ سَلَفْ سَمَكْ فَرَسْ
  ["09", "soz", "سَفَرْ", "Safar (sayohat)",  A.s("si09_safar"), 0, 0.97, 86, 19, 11, 5],
  ["10", "soz", "سَقَرْ", "Saqar",            A.s("si10_saqar"), 0, 1.03, 72, 19, 11, 5],
  ["11", "soz", "سَبَقْ", "Sabaq (dars)",     A.s("si11_sabaq"), 0, 0.94, 58, 19, 11, 5],
  ["12", "soz", "سَلَفْ", "Salaf (o'tgan)",   A.s("si12_salaf"), 0, 0.98, 44, 19, 11, 5],
  ["13", "soz", "سَمَكْ", "Samak (baliq)",    A.s("si13_samak"), 0, 0.81, 30, 19, 11, 5],
  ["14", "soz", "فَرَسْ", "Faras (ot)",       A.s("si14_faras"), 0, 1.10, 16, 19, 11, 5],
  // Row 3 (5 so'z): مَسْلَكْ مَسْكَنْ مُسْلِمْ مُسْرِفْ سِمْسِمْ
  ["15", "soz", "مَسْلَكْ",  "Maslak (yo'l)",        A.s("si15_maslak"), 0, 1.11, 85, 27, 13, 5],
  ["16", "soz", "مَسْكَنْ",  "Maskan (turar-joy)",   A.s("si16_maskan"), 0, 1.39, 68, 27, 13, 5],
  ["17", "soz", "مُسْلِمْ",  "Muslim",               A.s("si17_muslim"), 0, 1.45, 51, 27, 13, 5],
  ["18", "soz", "مُسْرِفْ",  "Musrif (isrofchi)",    A.s("si18_musrif"), 0, 1.46, 34, 27, 13, 5],
  ["19", "soz", "سِمْسِمْ",  "Simsim (kunjut)",      A.s("si19_simsim"), 0, 1.56, 17, 27, 13, 5],
  // Row 4 (4 so'z): اَسْلَمَ يُسْلِمُ اِسْتَيْسَرَ يَسْتَيْسِرُ
  ["20", "soz", "اَسْلَمَ",      "Aslama (taslim bo'ldi)",      A.s("si20_aslama"),     0, 1.34, 85, 35, 15, 5],
  ["21", "soz", "يُسْلِمُ",      "Yuslimu (taslim bo'ladi)",    A.s("si21_yuslimu"),    0, 1.42, 65, 35, 15, 5],
  ["22", "soz", "اِسْتَيْسَرَ",  "Istaysara (oson bo'ldi)",     A.s("si22_istaysara"),  0, 1.99, 42, 35, 19, 5],
  ["23", "soz", "يَسْتَيْسِرُ",  "Yastaysiru (oson bo'ladi)",   A.s("si23_yastaysiru"), 0, 2.11, 18, 35, 19, 5],

  // ── Tsa (ث) bo'limi (20. sa.mp3) — 30 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["24", "harf", "ثَ",    "Tha (boshida)",   A.th("th01_fatha"), 0, 0.66, 72, 43, 10, 6],
  ["25", "harf", "ـثِـ",  "Thi (oʻrtasida)", A.th("th02_kasra"), 0, 0.75, 46, 43, 10, 6],
  ["26", "harf", "ـثُ",   "Thu (oxirida)",   A.th("th03_damma"), 0, 0.67, 20, 43, 10, 6],
  // Row 1 (6 so'z): بَثْ ثِبْ ثَمْ ثِنْ ثَمَرُ ثَمَنٌ
  ["27", "soz", "بَثْ",    "Bath",             A.th("th04_bath"),     0, 0.95, 88, 51, 8, 5],
  ["28", "soz", "ثِبْ",    "Thib",             A.th("th05_thib"),     0, 0.75, 74, 51, 8, 5],
  ["29", "soz", "ثَمْ",    "Tham",             A.th("th06_tham"),     0, 0.95, 60, 51, 8, 5],
  ["30", "soz", "ثِنْ",    "Thin",             A.th("th07_thin"),     0, 0.91, 46, 51, 8, 5],
  ["31", "soz", "ثَمَرُ",  "Thamaru (meva)",    A.th("th08_thamaru"),  0, 0.97, 30, 51, 12, 5],
  ["32", "soz", "ثَمَنٌ",  "Thamanun (narx)",   A.th("th09_thamanun"), 0, 1.10, 12, 51, 12, 5],
  // Row 2 (6 so'z): ثَوْرُ ثَوْبُ ثَيْبُ مِثْلُ مُثْلُ مَثَلٌ
  ["33", "soz", "ثَوْرُ",  "Thawru (ho'kiz)",   A.th("th10_thawru"),   0, 1.29, 88, 59, 11, 5],
  ["34", "soz", "ثَوْبُ",  "Thawbu (kiyim)",    A.th("th11_thawbu"),   0, 1.25, 72, 59, 11, 5],
  ["35", "soz", "ثَيْبُ",  "Thaybu",            A.th("th12_thaybu"),   0, 1.28, 56, 59, 11, 5],
  ["36", "soz", "مِثْلُ",  "Mithlu (misli)",    A.th("th13_mithlu"),   0, 1.26, 40, 59, 11, 5],
  ["37", "soz", "مُثْلُ",  "Muthlu",            A.th("th14_muthlu"),   0, 1.33, 24, 59, 11, 5],
  ["38", "soz", "مَثَلٌ",  "Mathalun (misol)",  A.th("th15_mathalun"), 0, 1.07,  8, 59, 11, 5],
  // Row 3 (5 so'z): كَوْثَرُ اَكْثَرَ يُكْثِرُ اَثْبَتَ يُثْبِتُ
  ["39", "soz", "كَوْثَرُ", "Kawtharu (mo'l-ko'l)",    A.th("th16_kawtharu"), 0, 1.27, 84, 67, 14, 5],
  ["40", "soz", "اَكْثَرَ", "Aksara (ko'paytirdi)",    A.th("th17_aksara"),   0, 1.30, 66, 67, 14, 5],
  ["41", "soz", "يُكْثِرُ", "Yuksiru (ko'paytiradi)",  A.th("th18_yuksiru"),  0, 1.39, 48, 67, 14, 5],
  ["42", "soz", "اَثْبَتَ", "Asbata (tasdiqladi)",     A.th("th19_asbata"),   0, 1.37, 30, 67, 14, 5],
  ["43", "soz", "يُثْبِتُ", "Yusbitu (tasdiqlaydi)",   A.th("th20_yusbitu"),  0, 1.45, 12, 67, 14, 5],
  // Row 4 (4 so'z): اِسْتَكْثَرَ يَسْتَكْثِرُ اِسْتَثْقَلَ يَسْتَثْقِلُ
  ["44", "soz", "اِسْتَكْثَرَ",  "Istaksara (ko'p so'radi)",    A.th("th21_istaksara"),  0, 1.91, 80, 75, 18, 5],
  ["45", "soz", "يَسْتَكْثِرُ",  "Yastaksiru (ko'p so'raydi)",  A.th("th22_yastaksiru"), 0, 2.00, 58, 75, 18, 5],
  ["46", "soz", "اِسْتَثْقَلَ",  "Istasqala (og'ir topdi)",     A.th("th23_istasqala"),  0, 2.06, 32, 75, 20, 5],
  ["47", "soz", "يَسْتَثْقِلُ",  "Yastasqilu (og'ir topadi)",   A.th("th24_yastasqilu"), 0, 2.11,  8, 75, 20, 5],
  // Row 5 (6 so'z, 3 juftlik — sin vs tsa taqqoslash): سَمَرُ-ثَمَرُ، سَبْتُ-ثَبْتُ، سَلْسُ-ثَلْثُ
  ["48", "soz", "سَمَرُ", "Samaru (suhbat)",       A.th("th25_samar"),  0, 0.89, 86, 87, 12, 5],
  ["49", "soz", "ثَمَرُ", "Thamaru (meva)",        A.th("th26_thamar"), 0, 0.91, 72, 87, 12, 5],
  ["50", "soz", "سَبْتُ", "Sabtu (shanba)",        A.th("th27_sabt"),   0, 1.20, 58, 87, 12, 5],
  ["51", "soz", "ثَبْتُ", "Thabtu (ro'yxat)",      A.th("th28_thabt"),  0, 1.19, 44, 87, 12, 5],
  ["52", "soz", "سَلْسُ", "Salsu (yumshoq)",       A.th("th29_sals"),   0, 1.40, 30, 87, 12, 5],
  ["53", "soz", "ثَلْثُ", "Thalthu (uchdan bir)",  A.th("th30_thalth"), 0, 1.46, 16, 87, 12, 5],
];

// ============================================================
// PAGE 11 — Sod (ص) + Tho (ط)
// ============================================================
const p11: ED[] = [
  // ── Sod (ص) bo'limi (21. so.mp3) — 20 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["01", "harf", "صَ",    "So (boshida)",   A.so("so01_fatha"), 0, 0.74, 72, 3, 10, 6],
  ["02", "harf", "ـصِـ",  "Si (oʻrtasida)", A.so("so02_kasra"), 0, 0.70, 46, 3, 10, 6],
  ["03", "harf", "ـصُ",   "Su (oxirida)",   A.so("so03_damma"), 0, 0.72, 20, 3, 10, 6],
  // Row 2 (7 so'z): صُمْ صِفْ فَصْ صَرَفْ صَبَرْ بَصَرْ قَصَبْ
  ["04", "soz", "قَصَبْ",  "Qasab (qamish)",     A.so("so10_qasab"), 0, 0.93, 87, 11, 11, 5],
  ["05", "soz", "بَصَرْ",  "Basar (ko'rish)",    A.so("so09_basar"), 0, 1.05, 75, 11, 11, 5],
  ["06", "soz", "صَبَرْ",  "Sabar (sabr qildi)", A.so("so08_sabar"), 0, 1.09, 63, 11, 11, 5],
  ["07", "soz", "صَرَفْ",  "Saraf (sarfladi)",   A.so("so07_saraf"), 0, 1.12, 51, 11, 11, 5],
  ["08", "soz", "فَصْ",    "Fas (yonoq)",        A.so("so06_fas"),   0, 0.93, 40, 11, 9,  5],
  ["09", "soz", "صِفْ",    "Sif (ta'rifla)",     A.so("so05_sif"),   0, 0.86, 28, 11, 9,  5],
  ["10", "soz", "صُمْ",    "Sum (ro'za tut)",    A.so("so04_sum"),   0, 0.94, 14, 11, 10, 5],
  // Row 3 (4 so'z): نَصَرْ يَنْصُرُ اِسْتَبْصَرَ يَسْتَبْصِرُ
  ["11", "soz", "نَصَرَ",       "Nasara (yordam berdi)",      A.so("so11_nasar"),      0, 1.13, 85, 19, 12, 5],
  ["12", "soz", "يَنْصُرُ",     "Yansuru (yordam beradi)",    A.so("so12_yansuru"),    0, 1.70, 66, 19, 14, 5],
  ["13", "soz", "اِسْتَبْصَرَ",  "Istabsara (bilib oldi)",     A.so("so13_istabsara"),  0, 1.84, 40, 19, 20, 5],
  ["14", "soz", "يَسْتَبْصِرُ",  "Yastabsiru (bilib oladi)",   A.so("so14_yastabsiru"), 0, 1.90, 14, 19, 20, 5],
  // Row 4 (6 so'z, 3 juftlik — sin vs sod taqqoslash): سَفَرْ-صَفَرْ، سَيْفْ-صَيْفْ، اِنْتَسَبَ-اِنْتَصَبَ
  ["15", "soz", "سَفَرْ",       "Safar (sayohat)",               A.so("so15_safar_sin"),     0, 0.98, 87, 27, 12, 5],
  ["16", "soz", "صَفَرْ",       "Safar (Safar oyi)",             A.so("so16_safar_sod"),     0, 1.08, 73, 27, 12, 5],
  ["17", "soz", "سَيْفُ",       "Sayfu (qilich)",                A.so("so17_sayf_sin"),      0, 1.34, 59, 27, 11, 5],
  ["18", "soz", "صَيْفُ",       "Sayfu (yoz)",                   A.so("so18_sayf_sod"),      0, 1.38, 46, 27, 11, 5],
  ["19", "soz", "اِنْتَسَبَ",    "Intasaba (nasab aniqladi)",    A.so("so19_intasaba_sin"),  0, 1.93, 25, 27, 18, 5],
  ["20", "soz", "اِنْتَصَبَ",    "Intasaba (tik turdi)",         A.so("so20_intasaba_sod"),  0, 1.94,  4, 27, 18, 5],

  // ── Tho (ط) bo'limi (22. to.mp3) — 29 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["21", "harf", "طَ",    "To (boshida)",   A.to_("to01_fatha"), 0, 0.52, 72, 40, 10, 6],
  ["22", "harf", "ـطِـ",  "Ti (oʻrtasida)", A.to_("to02_kasra"), 0, 0.57, 46, 40, 10, 6],
  ["23", "harf", "ـطُ",   "Tu (oxirida)",   A.to_("to03_damma"), 0, 0.55, 20, 40, 10, 6],
  // Row 5 (6 so'z): طَلْ طَيْ شَطْ بَطْ قَطْ فَقَطْ
  ["24", "soz", "طَلْ",    "Tal (shudring)",    A.to_("to04_tal"),   0, 0.81, 87, 48, 10, 5],
  ["25", "soz", "طَيْ",    "Tay (o'rash)",      A.to_("to05_tay"),   0, 0.82, 73, 48, 10, 5],
  ["26", "soz", "شَطْ",    "Shat (qirg'oq)",    A.to_("to06_shat"),  0, 0.77, 59, 48, 10, 5],
  ["27", "soz", "بَطْ",    "Bat (o'rdak)",      A.to_("to07_bat"),   0, 0.80, 45, 48, 10, 5],
  ["28", "soz", "قَطْ",    "Qat (aslo)",        A.to_("to08_qat"),   0, 0.72, 31, 48, 10, 5],
  ["29", "soz", "فَقَطْ",  "Faqat (faqatgina)", A.to_("to09_faqat"), 0, 0.99, 14, 48, 12, 5],
  // Row 6 (6 so'z): وَطَنْ طَلَبْ طَرَفْ طُهْرْ طِفْلُ مَطَرْ
  ["30", "soz", "وَطَنْ",   "Watan (vatan)",      A.to_("to10_watan"), 0, 1.12, 86, 56, 12, 5],
  ["31", "soz", "طَلَبْ",   "Talab (so'radi)",    A.to_("to11_talab"), 0, 0.90, 72, 56, 12, 5],
  ["32", "soz", "طَرَفْ",   "Taraf (chet)",       A.to_("to12_taraf"), 0, 0.97, 58, 56, 12, 5],
  ["33", "soz", "طُهْرُ",   "Tuhru (poklik)",     A.to_("to13_tuhr"),  0, 1.23, 44, 56, 12, 5],
  ["34", "soz", "طِفْلُ",   "Tiflu (bola)",       A.to_("to14_tiflu"), 0, 1.21, 30, 56, 12, 5],
  ["35", "soz", "مَطَرْ",   "Matar (yomg'ir)",    A.to_("to15_matar"), 0, 1.04, 14, 56, 12, 5],
  // Row 7 (4 so'z): مَطْلَبْ مَسْقَطْ مَوْطِنْ مَرْبِطْ
  ["36", "soz", "مَطْلَبْ", "Matlab (maqsad)",       A.to_("to16_matlab"), 0, 1.28, 80, 64, 16, 5],
  ["37", "soz", "مَسْقَطْ", "Masqat (tushish joyi)", A.to_("to17_masqat"), 0, 1.27, 58, 64, 16, 5],
  ["38", "soz", "مَوْطِنْ", "Mawtin (vatan)",         A.to_("to18_mawtin"), 0, 1.60, 36, 64, 16, 5],
  ["39", "soz", "مَرْبِطْ", "Marbit (bog'lash joyi)", A.to_("to19_marbit"), 0, 1.41, 14, 64, 16, 5],
  // Row 8 (4 so'z): اِصْطَبَرْ يَصْطَبِرُ اِسْتَوْطَنَ يَسْتَوْطِنُ
  ["40", "soz", "اِصْطَبَرَ",   "Istabara (sabr qildi)",   A.to_("to20_istabar"),    0, 1.67, 80, 72, 18, 5],
  ["41", "soz", "يَصْطَبِرُ",   "Yastabiru (sabr qiladi)", A.to_("to21_yastabiru"),  0, 1.79, 58, 72, 18, 5],
  ["42", "soz", "اِسْتَوْطَنَ", "Istawtana (makon tutdi)", A.to_("to22_istawtana"),  0, 1.97, 32, 72, 22, 5],
  ["43", "soz", "يَسْتَوْطِنُ", "Yastawtinu (makon tutadi)",A.to_("to23_yastawtinu"), 0, 2.12,  6, 72, 22, 5],
  // Row 9 (6 so'z, 3 juftlik — ta vs tho taqqoslash): تَرَفْ-طَرَفْ، سَبْتُ-سَبْطُ، مُسْتَتِرْ-مُسْتَطِرْ
  ["44", "soz", "تَرَفْ",      "Taraf (noz-ne'mat)",    A.to_("to24_taraf_ta"),      0, 0.90, 87, 80, 11, 5],
  ["45", "soz", "طَرَفْ",      "Taraf (chet)",          A.to_("to25_taraf_tho"),     0, 0.94, 74, 80, 11, 5],
  ["46", "soz", "سَبْتُ",      "Sabtu (shanba)",        A.to_("to26_sabtu_ta"),      0, 1.17, 60, 80, 11, 5],
  ["47", "soz", "سَبْطُ",      "Sabtu (o'ralgan soch)", A.to_("to27_sabtu_tho"),     0, 1.10, 47, 80, 11, 5],
  ["48", "soz", "مُسْتَتِرْ",  "Mustatir (yashiringan)",A.to_("to28_mustatir_ta"),   0, 1.51, 28, 80, 17, 5],
  ["49", "soz", "مُسْتَطِرْ",  "Mustatir (yozilgan)",   A.to_("to29_mustatir_tho"),  0, 1.53,  5, 80, 17, 5],
];

// ============================================================
// PAGE 12 — Jim (ج) + Xo (خ)
// ============================================================
const p12: ED[] = [
  // ── Jim (ج) bo'limi (23. ja.mp3) — 18 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["01", "harf", "جَ",    "Ja (boshida)",   A.j("ja01_fatha"), 0, 0.65, 72, 3, 10, 6],
  ["02", "harf", "ـجِـ",  "Ji (oʻrtasida)", A.j("ja02_kasra"), 0, 0.68, 46, 3, 10, 6],
  ["03", "harf", "ـجُ",   "Ju (oxirida)",   A.j("ja03_damma"), 0, 0.73, 20, 3, 10, 6],
  // Row 2 (5 so'z): جَمْ جَرْ جِنْ جَبْ جُلْ
  ["04", "soz", "جَمْ",    "Jam",          A.j("ja04_jam"), 0, 0.94, 86, 11, 10, 5],
  ["05", "soz", "جَرْ",    "Jar",          A.j("ja05_jar"), 0, 0.86, 72, 11, 10, 5],
  ["06", "soz", "جِنْ",    "Jin (jin)",    A.j("ja06_jin"), 0, 0.94, 58, 11, 10, 5],
  ["07", "soz", "جَبْ",    "Jab",          A.j("ja07_jab"), 0, 0.84, 43, 11, 10, 5],
  ["08", "soz", "جُلْ",    "Jul",          A.j("ja08_jul"), 0, 0.91, 14, 11, 10, 5],
  // Row 3 (6 so'z): جَبَلْ جَمَلْ اَجْرْ فَجْرْ جَوْهَرْ جَوْرَبْ
  ["09", "soz", "جَبَلْ",  "Jabal (tog')",        A.j("ja09_jabal"),  0, 1.07, 87, 19, 11, 5],
  ["10", "soz", "جَمَلْ",  "Jamal (tuya)",        A.j("ja10_jamal"),  0, 1.10, 73, 19, 11, 5],
  ["11", "soz", "اَجْرُ",  "Ajru (mukofot)",      A.j("ja11_ajr"),    0, 1.05, 59, 19, 11, 5],
  ["12", "soz", "فَجْرُ",  "Fajru (tong)",        A.j("ja12_fajr"),   0, 1.07, 45, 19, 11, 5],
  ["13", "soz", "جَوْهَرْ", "Jawhar (gavhar)",     A.j("ja13_jawhar"), 0, 1.31, 27, 19, 14, 5],
  ["14", "soz", "جَوْرَبْ", "Jawrab (paypoq)",     A.j("ja14_jawrab"), 0, 1.31,  8, 19, 14, 5],
  // Row 4 (4 so'z): تَجَوْرَبَ يَتَجَوْرَبُ اِسْتَجْلَبَ يَسْتَجْلِبُ (past/present juftliklar)
  ["15", "soz", "تَجَوْرَبَ",   "Tajawraba (paypoq kiydi)",   A.j("ja15_tajawraba"),   0, 1.49, 80, 27, 18, 5],
  ["16", "soz", "يَتَجَوْرَبُ", "Yatajawrabu (paypoq kiyadi)",A.j("ja16_yatajawrabu"), 0, 1.86, 57, 27, 21, 5],
  ["17", "soz", "اِسْتَجْلَبَ", "Istajlaba (jalb qildi)",     A.j("ja17_istajlaba"),   0, 1.84, 30, 27, 20, 5],
  ["18", "soz", "يَسْتَجْلِبُ", "Yastajlibu (jalb qiladi)",   A.j("ja18_yastajlibu"),  0, 1.93,  6, 27, 20, 5],

  // ── Xo (خ) bo'limi (24. xo.mp3) — 23 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["19", "harf", "خَ",    "Xa (boshida)",   A.x("xo01_fatha"), 0, 0.74, 72, 45, 10, 6],
  ["20", "harf", "ـخِـ",  "Xi (oʻrtasida)", A.x("xo02_kasra"), 0, 0.64, 46, 45, 10, 6],
  ["21", "harf", "ـخُ",   "Xu (oxirida)",   A.x("xo03_damma"), 0, 0.75, 20, 45, 10, 6],
  // Row 2 (6 so'z): خَبْ خَلْ خَرَجْ خَبَرْ خَشَبْ خَلَفْ
  ["22", "soz", "خَبْ",    "Xab",                   A.x("xo04_xab"),    0, 0.81, 87, 54, 10, 5],
  ["23", "soz", "خَلْ",    "Xal (sirka)",           A.x("xo05_xal"),    0, 0.98, 73, 54, 10, 5],
  ["24", "soz", "خَرَجْ",  "Xaraj (chiqdi)",        A.x("xo06_xaraj"),  0, 0.96, 58, 54, 12, 5],
  ["25", "soz", "خَبَرْ",  "Xabar (xabar)",         A.x("xo07_xabar"),  0, 0.96, 43, 54, 12, 5],
  ["26", "soz", "خَشَبْ",  "Xashab (yog'och)",      A.x("xo08_xashab"), 0, 1.02, 28, 54, 12, 5],
  ["27", "soz", "خَلَفْ",  "Xalaf (orqa)",          A.x("xo09_xalaf"),  0, 1.05, 13, 54, 12, 5],
  // Row 3 (6 so'z, damma ending): خَيْرُ خَتْمُ خَمْرُ خَوْفُ مَخْرَجُ مُخْبِرُ
  ["28", "soz", "خَيْرُ",   "Xayru (yaxshilik)",         A.x("xo10_xayru"),   0, 1.37, 87, 62, 11, 5],
  ["29", "soz", "خَتْمُ",   "Xatmu (tamom, muhr)",       A.x("xo11_xatmu"),   0, 1.26, 73, 62, 11, 5],
  ["30", "soz", "خَمْرُ",   "Xamru (may)",               A.x("xo12_xamru"),   0, 1.25, 59, 62, 11, 5],
  ["31", "soz", "خَوْفُ",   "Xawfu (qo'rquv)",           A.x("xo13_xawfu"),   0, 1.45, 45, 62, 11, 5],
  ["32", "soz", "مَخْرَجُ", "Maxraju (chiqish joyi)",    A.x("xo14_maxraju"), 0, 1.34, 27, 62, 15, 5],
  ["33", "soz", "مُخْبِرُ", "Muxbiru (xabar beruvchi)",  A.x("xo15_muxbiru"), 0, 1.24,  8, 62, 15, 5],
  // Row 4 (4 so'z, past/present juftliklar — form IV أفعل): اَخْرَجَ يُخْرِجُ اَخْبَرَ يُخْبِرُ
  ["34", "soz", "اَخْرَجَ", "Axraja (chiqardi)",        A.x("xo16_axraja"),  0, 1.29, 82, 71, 15, 5],
  ["35", "soz", "يُخْرِجُ", "Yuxriju (chiqaradi)",      A.x("xo17_yuxriju"), 0, 1.39, 61, 71, 15, 5],
  ["36", "soz", "اَخْبَرَ", "Axbara (xabar berdi)",     A.x("xo18_axbara"),  0, 1.27, 39, 71, 15, 5],
  ["37", "soz", "يُخْبِرُ", "Yuxbiru (xabar beradi)",   A.x("xo19_yuxbiru"), 0, 1.36, 15, 71, 15, 5],
  // Row 5 (4 so'z, past/present juftliklar — form X استفعل): اِسْتَخْبَرَ يَسْتَخْبِرُ اِسْتَخْرَجَ يَسْتَخْرِجُ
  ["38", "soz", "اِسْتَخْبَرَ", "Istaxbara (xabar izladi)",   A.x("xo20_istaxbara"),  0, 1.85, 78, 80, 20, 5],
  ["39", "soz", "يَسْتَخْبِرُ", "Yastaxbiru (xabar izlaydi)", A.x("xo21_yastaxbiru"), 0, 2.00, 54, 80, 22, 5],
  ["40", "soz", "اِسْتَخْرَجَ", "Istaxraja (chiqarib oldi)",  A.x("xo22_istaxraja"),  0, 1.88, 30, 80, 20, 5],
  ["41", "soz", "يَسْتَخْرِجُ", "Yastaxriju (chiqarib oladi)",A.x("xo23_yastaxriju"), 0, 1.99,  6, 80, 22, 5],
];

// ============================================================
// PAGE 13 — Ha (ح) + G'ayn (غ)
// ============================================================
const p13: ED[] = [
  // ── Ha (ح) bo'limi (25. ha.mp3) — 28 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["01", "harf", "حَ",    "Ha (boshida)",   A.ha_("ha01_fatha"), 0, 0.68, 72, 3, 10, 6],
  ["02", "harf", "ـحِـ",  "Hi (oʻrtasida)", A.ha_("ha02_kasra"), 0, 0.70, 46, 3, 10, 6],
  ["03", "harf", "ـحُ",   "Hu (oxirida)",   A.ha_("ha03_damma"), 0, 0.74, 20, 3, 10, 6],
  // Row 1 (6 so'z): حَى حِلْ حَجْ حَسَنْ حَسْبْ حَسَفْ
  ["04", "soz", "حَى",     "Hâ",                  A.ha_("ha04_haa"),    0, 0.81, 87, 11, 10, 5],
  ["05", "soz", "حِلْ",    "Hil (yech)",          A.ha_("ha05_hil"),    0, 0.76, 73, 11, 10, 5],
  ["06", "soz", "حَجْ",    "Haj",                 A.ha_("ha06_haj"),    0, 0.71, 59, 11, 10, 5],
  ["07", "soz", "حَسَنْ",  "Hasan (yaxshi)",      A.ha_("ha07_hasan"),  0, 0.95, 45, 11, 11, 5],
  ["08", "soz", "حَسْبْ",  "Hasb (kifoya)",       A.ha_("ha08_hasb"),   0, 0.88, 30, 11, 11, 5],
  ["09", "soz", "حَسَفْ",  "Hasaf (qoldiq)",      A.ha_("ha09_hasaf"),  0, 0.87, 14, 11, 11, 5],
  // Row 2 (5 so'z): مُحْسِنْ مَحْشَرْ مِنْحَرْ مَحْفَلْ اَحْسَنْ
  ["10", "soz", "مُحْسِنْ", "Muhsin (yaxshilik qiluvchi)", A.ha_("ha10_muhsin"),  0, 1.42, 84, 19, 14, 5],
  ["11", "soz", "مَحْشَرْ", "Mahshar (to'planish joyi)",   A.ha_("ha11_mahshar"), 0, 1.28, 66, 19, 14, 5],
  ["12", "soz", "مِنْحَرْ", "Minhar (qurbonlik joyi)",     A.ha_("ha12_minhar"),  0, 1.29, 48, 19, 14, 5],
  ["13", "soz", "مَحْفَلْ", "Mahfal (yig'in)",             A.ha_("ha13_mahfal"),  0, 1.41, 30, 19, 14, 5],
  ["14", "soz", "اَحْسَنْ", "Ahsan (eng yaxshi)",          A.ha_("ha14_ahsan"),   0, 1.37, 12, 19, 14, 5],
  // Row 3 (4 so'z): اِمْتَحَنَ يَمْتَحِنُ اِحْتَمَلَ يَحْتَمِلُ
  ["15", "soz", "اِمْتَحَنَ",  "Imtahana (sinadi)",       A.ha_("ha15_imtahana"),  0, 1.60, 80, 27, 18, 5],
  ["16", "soz", "يَمْتَحِنُ", "Yamtahinu (sinaydi)",     A.ha_("ha16_yamtahinu"), 0, 1.70, 58, 27, 18, 5],
  ["17", "soz", "اِحْتَمَلَ",  "Ihtamala (chidadi)",      A.ha_("ha17_ihtamala"),  0, 1.54, 36, 27, 18, 5],
  ["18", "soz", "يَحْتَمِلُ", "Yahtamilu (chidaydi)",    A.ha_("ha18_yahtamilu"), 0, 1.70, 12, 27, 18, 5],
  // Row 4 (4 so'z): اِسْتَحْسَنَ يَسْتَحْسِنُ اِحْرَنْجَمَ يَحْرَنْجِمُ
  ["19", "soz", "اِسْتَحْسَنَ",  "Istahsana (yaxshi topdi)",  A.ha_("ha19_istahsana"),  0, 1.94, 78, 35, 20, 5],
  ["20", "soz", "يَسْتَحْسِنُ", "Yastahsinu (yaxshi topadi)",A.ha_("ha20_yastahsinu"), 0, 2.21, 54, 35, 22, 5],
  ["21", "soz", "اِحْرَنْجَمَ",  "Ihranjama (to'planishdi)",  A.ha_("ha21_ihranjama"),  0, 2.04, 30, 35, 20, 5],
  ["22", "soz", "يَحْرَنْجِمُ", "Yahranjimu (to'planadilar)",A.ha_("ha22_yahranjimu"), 0, 2.16,  6, 35, 22, 5],
  // Row 5 (6 so'z, 3 juftlik — kha vs ha taqqoslash): خَلْقُ-حَلْقُ، خَتْمُ-حَتْمُ، اَرْخَمْ-اَرْحَمْ
  ["23", "soz", "خَلْقُ",   "Xalqu (yaratish)",        A.ha_("ha23_khalqu_kha"),  0, 1.27, 87, 46, 11, 5],
  ["24", "soz", "حَلْقُ",   "Halqu (tomoq)",           A.ha_("ha24_halqu_ha"),    0, 1.26, 74, 46, 11, 5],
  ["25", "soz", "خَتْمُ",   "Xatmu (tamomlash)",       A.ha_("ha25_khatmu_kha"),  0, 1.16, 60, 46, 11, 5],
  ["26", "soz", "حَتْمُ",   "Hatmu (qat'iylik)",       A.ha_("ha26_hatmu_ha"),    0, 1.20, 47, 46, 11, 5],
  ["27", "soz", "اَرْخَمْ", "Arkham (yumshoqroq)",     A.ha_("ha27_arkham_kha"),  0, 1.35, 28, 46, 13, 5],
  ["28", "soz", "اَرْحَمْ", "Arham (rahmliroq)",       A.ha_("ha28_arham_ha"),    0, 1.38,  6, 46, 13, 5],

  // ── G'ayn (غ) bo'limi (26. g'o.mp3) — 18 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["29", "harf", "غَ",    "G'a (boshida)",   A.gho_("gho01_fatha"), 0, 0.77, 72, 55, 10, 6],
  ["30", "harf", "ـغِـ",  "G'i (oʻrtasida)", A.gho_("gho02_kasra"), 0, 0.73, 46, 55, 10, 6],
  ["31", "harf", "ـغُ",   "G'u (oxirida)",   A.gho_("gho03_damma"), 0, 0.72, 20, 55, 10, 6],
  // Row 1 (6 so'z): غَمْ غَبْ غِلْ غَيْرُ بَغْلُ فَرْغُ
  ["32", "soz", "غَمْ",    "G'am (qayg'u)",       A.gho_("gho04_gham"),   0, 0.94, 87, 63, 10, 5],
  ["33", "soz", "غَبْ",    "G'ab (yo'q bo'l)",    A.gho_("gho05_ghab"),   0, 0.88, 73, 63, 10, 5],
  ["34", "soz", "غِلْ",    "G'ill (hasad)",       A.gho_("gho06_ghil"),   0, 0.97, 59, 63, 10, 5],
  ["35", "soz", "غَيْرُ",  "G'oyru (boshqa)",     A.gho_("gho07_ghayru"), 0, 1.29, 44, 63, 12, 5],
  ["36", "soz", "بَغْلُ",  "Baghlu (xachir)",     A.gho_("gho08_baghlu"), 0, 1.34, 28, 63, 12, 5],
  ["37", "soz", "فَرْغُ",  "Farghu (bo'sh joy)",  A.gho_("gho09_farghu"), 0, 1.27, 12, 63, 12, 5],
  // Row 2 (5 so'z): غَبْغَبْ مَبْلَغْ مَغْرِبْ اِغْلِبْ اِغْفِرْ
  ["38", "soz", "غَبْغَبْ", "G'abg'ab (jo'g'i)",         A.gho_("gho10_ghabghab"), 0, 1.30, 84, 71, 14, 5],
  ["39", "soz", "مَبْلَغْ", "Mablag' (summa)",           A.gho_("gho11_mablag"),   0, 1.38, 66, 71, 14, 5],
  ["40", "soz", "مَغْرِبْ", "Maghrib (g'arb, shom)",     A.gho_("gho12_maghrib"),  0, 1.28, 48, 71, 14, 5],
  ["41", "soz", "اِغْلِبْ", "Ig'lib (yengib ol!)",       A.gho_("gho13_ighlib"),   0, 1.24, 30, 71, 14, 5],
  ["42", "soz", "اِغْفِرْ", "Ig'fir (kechir!)",          A.gho_("gho14_ighfir"),   0, 1.22, 12, 71, 14, 5],
  // Row 3 (4 so'z, past/present juftliklar): اِشْتَغَلَ يَشْتَغِلُ اِسْتَغْفَرَ يَسْتَغْفِرُ
  ["43", "soz", "اِشْتَغَلَ",   "Ishtaghala (band bo'ldi)",      A.gho_("gho15_ishtaghala"),   0, 1.51, 80, 79, 18, 5],
  ["44", "soz", "يَشْتَغِلُ",   "Yashtaghilu (band bo'ladi)",    A.gho_("gho16_yashtaghilu"),  0, 1.64, 58, 79, 18, 5],
  ["45", "soz", "اِسْتَغْفَرَ", "Istaghfara (kechirim so'radi)", A.gho_("gho17_istaghfara"),   0, 1.94, 32, 79, 22, 5],
  ["46", "soz", "يَسْتَغْفِرُ", "Yastaghfiru (kechirim so'raydi)",A.gho_("gho18_yastaghfiru"), 0, 2.02,  6, 79, 22, 5],
];

// ============================================================
// PAGE 14 — Ayn (ع) + Dal (د)
// ============================================================
const p14: ED[] = [
  // ── Ayn (ع) bo'limi (27. ayn.mp3) — 27 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["01", "harf", "عَ",    "Ayn (boshida)",   A.ay("ay01_fatha"), 0, 0.65, 72, 3, 10, 6],
  ["02", "harf", "ـعِـ",  "Ayn (oʻrtasida)", A.ay("ay02_kasra"), 0, 0.67, 46, 3, 10, 6],
  ["03", "harf", "ـعُ",   "Ayn (oxirida)",   A.ay("ay03_damma"), 0, 0.72, 20, 3, 10, 6],
  // Row 1 (7 so'z): بِعْ عَنْ عَمْ سَعْ مَعَ عَرَبْ عَجَمْ
  ["04", "soz", "بِعْ",   "Bi'",   A.ay("ay04_bi3"),   0, 0.81, 91, 11, 8,  5],
  ["05", "soz", "عَنْ",   "An",    A.ay("ay05_3an"),   0, 0.84, 80, 11, 9,  5],
  ["06", "soz", "عَمْ",   "Am",    A.ay("ay06_3am"),   0, 0.87, 68, 11, 9,  5],
  ["07", "soz", "سَعْ",   "Sa'",   A.ay("ay07_sa3"),   0, 0.90, 56, 11, 9,  5],
  ["08", "soz", "مَعَ",   "Maa",   A.ay("ay08_ma3a"),  0, 1.01, 43, 11, 10, 5],
  ["09", "soz", "عَرَبْ", "Arab",  A.ay("ay09_3arab"), 0, 1.02, 28, 11, 11, 5],
  ["10", "soz", "عَجَمْ", "Ajam",  A.ay("ay10_3ajam"), 0, 1.09, 14, 11, 11, 5],
  // Row 2 (6 so'z): عَجَبْ عَمَلْ عِلْمُ عُمْرُ جَمْعُ جَعْلُ
  ["11", "soz", "عَجَبْ", "Ajab", A.ay("ay11_3ajab"), 0, 1.01, 87, 19, 11, 5],
  ["12", "soz", "عَمَلْ", "Amal", A.ay("ay12_3amal"), 0, 1.04, 73, 19, 11, 5],
  ["13", "soz", "عِلْمُ", "Ilm",  A.ay("ay13_3ilmu"), 0, 1.34, 59, 19, 11, 5],
  ["14", "soz", "عُمْرُ", "Umr",  A.ay("ay14_3umru"), 0, 1.31, 45, 19, 11, 5],
  ["15", "soz", "جَمْعُ", "Jam'", A.ay("ay15_jam3u"), 0, 1.41, 31, 19, 11, 5],
  ["16", "soz", "جَعْلُ", "Ja'l", A.ay("ay16_ja3lu"), 0, 1.34, 17, 19, 11, 5],
  // Row 3 (5 so'z): عَبْعَبْ عَسْكَرْ عَیْلَمْ جَعْفَرْ عَنْبَرْ — barchasi sukun bilan tugaydi
  ["17", "soz", "عَبْعَبْ", "Ab'ab", A.ay("ay17_3ab3ab"),  0, 1.19, 85, 27, 13, 5],
  ["18", "soz", "عَسْكَرْ", "Askar", A.ay("ay18_3askaru"), 0, 1.29, 69, 27, 13, 5],
  ["19", "soz", "عَیْلَمْ", "Aylam", A.ay("ay19_3aylam"),  0, 1.40, 52, 27, 13, 5],
  ["20", "soz", "جَعْفَرْ", "Jafar", A.ay("ay20_ja3faru"), 0, 1.40, 35, 27, 13, 5],
  ["21", "soz", "عَنْبَرْ", "Ambar", A.ay("ay21_3anbaru"), 0, 1.58, 18, 27, 13, 5],
  // Row 4 (6 so'z, 3 juftlik — ğayn vs ayn taqqoslash): غَیْنُ-عَیْنُ، بَغْلُ-بَعْلُ، بَلْغُ-بَلْعُ
  ["22", "soz", "غَیْنُ", "G'ayn", A.ay("ay22_ghaynu"), 0, 1.36, 87, 35, 12, 5],
  ["23", "soz", "عَیْنُ", "Ayn",   A.ay("ay23_3aynu"),  0, 1.21, 73, 35, 12, 5],
  ["24", "soz", "بَغْلُ", "Bag'l", A.ay("ay24_baghlu"), 0, 1.32, 59, 35, 11, 5],
  ["25", "soz", "بَعْلُ", "Ba'l",  A.ay("ay25_ba3lu"),  0, 1.30, 45, 35, 11, 5],
  ["26", "soz", "بَلْغُ", "Balg'", A.ay("ay26_balghu"), 0, 1.40, 30, 35, 12, 5],
  ["27", "soz", "بَلْعُ", "Bal'",  A.ay("ay27_bal3u"),  0, 1.40, 16, 35, 12, 5],

  // ── Dal (د) bo'limi (28. da.mp3) — 23 element ──
  // Headers — non-connector harf, isolated shakllar
  ["28", "harf", "دَ",    "Da",  A.da("da01_fatha"), 0, 0.64, 72, 45, 10, 6],
  ["29", "harf", "دِ",    "Di",  A.da("da02_kasra"), 0, 0.67, 46, 45, 10, 6],
  ["30", "harf", "دُ",    "Du",  A.da("da03_damma"), 0, 0.72, 20, 45, 10, 6],
  // Row 1 (6 so'z): دُمْ دُبْ دُفْ رِدْ زِدْ تَدْ
  ["31", "soz", "دُمْ", "Dum", A.da("da04_dum"), 0, 0.94, 87, 53, 11, 5],
  ["32", "soz", "دُبْ", "Dub", A.da("da05_dub"), 0, 0.77, 73, 53, 11, 5],
  ["33", "soz", "دُفْ", "Duf", A.da("da06_duf"), 0, 1.01, 59, 53, 11, 5],
  ["34", "soz", "رِدْ", "Rid", A.da("da07_rid"), 0, 0.70, 45, 53, 11, 5],
  ["35", "soz", "زِدْ", "Zid", A.da("da08_zid"), 0, 1.16, 31, 53, 11, 5],
  ["36", "soz", "تَدْ", "Tad", A.da("da09_tad"), 0, 0.68, 17, 53, 11, 5],
  // Row 2 (6 so'z): دَرْسُ دَفْعُ دَبْغُ دَلْكُ دَهْرُ دَهْنُ
  ["37", "soz", "دَرْسُ", "Dars",  A.da("da10_darasu"), 0, 1.23, 87, 61, 11, 5],
  ["38", "soz", "دَفْعُ", "Daf'",  A.da("da11_daf3u"),  0, 1.31, 73, 61, 11, 5],
  ["39", "soz", "دَبْغُ", "Dabg'", A.da("da12_dabghu"), 0, 1.23, 59, 61, 11, 5],
  ["40", "soz", "دَلْكُ", "Dalk",  A.da("da13_dalku"),  0, 1.27, 45, 61, 11, 5],
  ["41", "soz", "دَهْرُ", "Dahr",  A.da("da14_dahru"),  0, 1.26, 31, 61, 11, 5],
  ["42", "soz", "دَهْنُ", "Dahn",  A.da("da15_dahnu"),  0, 1.36, 17, 61, 11, 5],
  // Row 3 (4 so'z): دُلْدُلْ فُدْفُدْ هُدْهُدْ اُشْدُدْ
  ["43", "soz", "دُلْدُلْ", "Duldul", A.da("da16_duldul"), 0, 1.47, 82, 69, 14, 5],
  ["44", "soz", "فُدْفُدْ", "Fudfud", A.da("da17_fudfud"), 0, 1.21, 64, 69, 14, 5],
  ["45", "soz", "هُدْهُدْ", "Hudhud", A.da("da18_hudhud"), 0, 1.35, 46, 69, 14, 5],
  ["46", "soz", "اُشْدُدْ", "Ushdud", A.da("da19_ushdud"), 0, 1.32, 28, 69, 14, 5],
  // Row 4 (4 so'z, past/present juftliklar): اِعْتَدَلَ-يَعْتَدِلُ، اِسْتَرْشَدَ-يَسْتَرْشِدُ
  ["47", "soz", "اِعْتَدَلَ",   "I'tadala",   A.da("da20_i3tadala"),   0, 1.62, 80, 77, 18, 5],
  ["48", "soz", "يَعْتَدِلُ",   "Ya'tadilu",  A.da("da21_ya3tadilu"),  0, 1.69, 60, 77, 18, 5],
  ["49", "soz", "اِسْتَرْشَدَ", "Istarshada", A.da("da22_istarshada"), 0, 1.92, 38, 77, 20, 5],
  ["50", "soz", "يَسْتَرْشِدُ", "Yastarshidu",A.da("da23_yastarshid"), 0, 2.01, 16, 77, 20, 5],
];

// ============================================================
// PAGE 15 — Dod (ض) + Zal (ذ)
// Dod (connector): header pozitsion — ضَ / ـضِـ / ـضُ
// Zal (non-connector): header isolated — ذَ / ذِ / ذُ
// ============================================================
const p15: ED[] = [
  // ── Dod (ض) ─── 25 element: 3 header + 6 + 6 + 4 + 6 ──
  ["01", "harf", "ضَ",   "Dod (boshida)",    A.do_("do01_fatha"),     0, 0.72, 72, 4, 10, 6],
  ["02", "harf", "ـضِـ", "Dod (oʻrtasida)",  A.do_("do02_kasra"),     0, 0.82, 44, 4, 10, 6],
  ["03", "harf", "ـضُ",  "Dod (oxirida)",    A.do_("do03_damma"),     0, 0.78, 16, 4, 10, 6],
  // Row 2 (6 ism — oxiri damma): ضَيْفُ عَضَلُ ضَهْبُ ضَبْطُ ضَعْفُ عَرَضُ
  ["04", "soz", "ضَيْفُ", "Mehmon",           A.do_("do04_dayf"),      0, 1.39, 84, 13, 12, 5],
  ["05", "soz", "عَضْلُ", "Mushak",           A.do_("do05_adal"),      0, 1.33, 70, 13, 12, 5],
  ["06", "soz", "ضَهْبُ", "Pishirish",        A.do_("do06_dahb"),      0, 1.48, 56, 13, 12, 5],
  ["07", "soz", "ضَبْطُ", "Nazorat",          A.do_("do07_dabt"),      0, 1.29, 42, 13, 12, 5],
  ["08", "soz", "ضَعْفُ", "Zaiflik",          A.do_("do08_daf"),       0, 1.39, 28, 13, 12, 5],
  ["09", "soz", "عَرَضُ", "Ko'rsatish",       A.do_("do09_arad"),      0, 1.17, 14, 13, 12, 5],
  // Row 3 (ض-ر-ب: 2 ism + 1 imperativ + 3 present fe'l)
  ["10", "soz", "مَضْرِبْ", "Urish joyi",     A.do_("do10_madrib"),    0, 1.40, 84, 22, 12, 5],
  ["11", "soz", "مِضْرَبْ", "Urish asbobi / kaltak", A.do_("do11_mudrib"), 0, 1.50, 70, 22, 12, 5],
  ["12", "soz", "اِضْرِبْ", "Ur!",            A.do_("do12_idrib"),     0, 1.37, 56, 22, 12, 5],
  ["13", "soz", "تَضْرِبُ", "Sen urasan",     A.do_("do13_tadribu"),   0, 1.42, 42, 22, 12, 5],
  ["14", "soz", "اَضْرِبُ", "Men uraman",     A.do_("do14_adribu"),    0, 1.42, 28, 22, 12, 5],
  ["15", "soz", "نَضْرِبُ", "Biz uramiz",     A.do_("do15_nadribu"),   0, 1.56, 14, 22, 12, 5],
  // Row 4 (4 so'z — Form VIII + Form X)
  ["16", "soz", "اِضْطَرَبَ",   "Bezovtalandi",    A.do_("do16_idtaraba"),   0, 1.89, 80, 31, 16, 5],
  ["17", "soz", "يَضْطَرِبُ",  "Bezovtalanadi",   A.do_("do17_yadtaribu"),  0, 1.85, 62, 31, 16, 5],
  ["18", "soz", "اِسْتَضْعَفَ",  "Zaif deb bildi",  A.do_("do18_istadafa"),   0, 1.99, 44, 31, 16, 5],
  ["19", "soz", "يَسْتَضْعِفُ", "Zaif deb biladi", A.do_("do19_yastadifu"),  0, 2.16, 26, 31, 16, 5],
  // Row 5 (6 so'z, 3 juftlik — dal/dod taqqoslash)
  ["20", "soz", "دَرْسُ",  "Dars (د)",         A.do_("do20_darsu_dal"),  0, 1.22, 84, 41, 10, 5],
  ["21", "soz", "ضَرْسُ",  "Oziq tish (ض)",    A.do_("do21_darsu_dod"),  0, 1.33, 72, 41, 10, 5],
  ["22", "soz", "وَدْعُ",  "Xayrlashuv (د)",   A.do_("do22_wadu_dal"),   0, 1.17, 58, 41, 10, 5],
  ["23", "soz", "وَضْعُ",  "Holat (ض)",        A.do_("do23_wadu_dod"),   0, 1.29, 46, 41, 10, 5],
  ["24", "soz", "بَعْدُ",  "Keyin (د)",        A.do_("do24_badu_dal"),   0, 1.33, 32, 41, 10, 5],
  ["25", "soz", "بَعْضُ",  "Ba'zi (ض)",        A.do_("do25_badu_dod"),   0, 1.29, 20, 41, 10, 5],

  // ── Zal (ذ) ─── 29 element: 3 header + 8 + 6 + 6 + 6 ──
  ["26", "harf", "ذَ", "Zal fatha",  A.za_("za01_fatha"),  0, 0.67, 72, 52, 10, 6],
  ["27", "harf", "ذِ", "Zal kasra",  A.za_("za02_kasra"),  0, 0.68, 44, 52, 10, 6],
  ["28", "harf", "ذُ", "Zal damma",  A.za_("za03_damma"),  0, 0.70, 16, 52, 10, 6],
  // Row 2 (8 qisqa so'z)
  ["29", "soz", "اِذْ",   "O'shanda",          A.za_("za04_idh"),      0, 0.73, 88, 61, 10, 5],
  ["30", "soz", "مُذْ",   "...dan beri",       A.za_("za05_mudh"),     0, 0.88, 78, 61, 10, 5],
  ["31", "soz", "خُذْ",   "Ol!",               A.za_("za06_khudh"),    0, 0.95, 68, 61, 10, 5],
  ["32", "soz", "عُذْ",   "Panoh qidir!",      A.za_("za07_udh"),      0, 0.94, 58, 61, 10, 5],
  ["33", "soz", "ذُبْ",   "Eri!",              A.za_("za08_dhub"),     0, 0.85, 48, 61, 10, 5],
  ["34", "soz", "ذُقْ",   "Tat!",              A.za_("za09_dhuq"),     0, 0.83, 38, 61, 10, 5],
  ["35", "soz", "ذَرْ",   "Qoldir!",           A.za_("za10_dhar"),     0, 0.82, 28, 61, 10, 5],
  ["36", "soz", "مُنْذُ",  "...dan beri",       A.za_("za11_mundh"),    0, 1.59, 16, 61, 10, 5],
  // Row 3 (6 ism — oxiri damma)
  ["37", "soz", "اِذْنُ",   "Ruxsat",           A.za_("za12_idhnu"),    0, 1.18, 84, 70, 12, 5],
  ["38", "soz", "بَذْلُ",   "Sarflash",         A.za_("za13_badhlu"),   0, 1.33, 70, 70, 12, 5],
  ["39", "soz", "ذِكْرُ",   "Zikr",             A.za_("za14_dhikru"),   0, 1.18, 56, 70, 12, 5],
  ["40", "soz", "ذِهْنُ",   "Aql / xotira",     A.za_("za15_dhihnu"),   0, 1.37, 42, 70, 12, 5],
  ["41", "soz", "ذَهَبْ",   "Oltin",            A.za_("za16_dhahab"),   0, 1.28, 28, 70, 12, 5],
  ["42", "soz", "مَذْهَبْ",  "Mazhab",           A.za_("za17_madhhab"),  0, 1.38, 14, 70, 12, 5],
  // Row 4 (3 juft past/present fe'l — oxirgi juft Form IV "olib ketdi / ketkazadi")
  ["43", "soz", "ذَهَلَ",   "Hayratlandi",      A.za_("za18_dhahala"),  0, 1.15, 84, 79, 12, 5],
  ["44", "soz", "يَذْهَلُ",  "Hayratlanadi",     A.za_("za19_yadhhalu"), 0, 1.47, 70, 79, 12, 5],
  ["45", "soz", "بَذَلَ",   "Sarfladi",         A.za_("za20_badhala"),  0, 1.09, 56, 79, 12, 5],
  ["46", "soz", "يَبْذُلُ",  "Sarflaydi",        A.za_("za21_yabdhulu"), 0, 1.47, 42, 79, 12, 5],
  ["47", "soz", "اَذْهَبَ",  "Olib ketdi",       A.za_("za22_idhhab"),   0, 1.39, 28, 79, 12, 5],
  ["48", "soz", "يُذْهِبُ",  "Olib ketadi",      A.za_("za23_yadhhabu"), 0, 1.59, 14, 79, 12, 5],
  // Row 5 (6 so'z, 3 juftlik — zal/zain taqqoslash)
  ["49", "soz", "ذِفْرُ",   "Dum (ذ)",          A.za_("za24_dhifru"),      0, 1.22, 84, 88, 10, 5],
  ["50", "soz", "زِفْرُ",   "Qichqiriq (ز)",    A.za_("za25_zifru"),       0, 1.21, 72, 88, 10, 5],
  ["51", "soz", "بَذْلُ",   "Sarflash (ذ)",     A.za_("za26_badhlu_zal"),  0, 1.24, 58, 88, 10, 5],
  ["52", "soz", "بَزْلُ",   "Ajratish (ز)",     A.za_("za27_bazlu_zain"),  0, 1.30, 46, 88, 10, 5],
  ["53", "soz", "اَبْذَلُ",  "Sarflayman (ذ)",  A.za_("za28_abdhalu"),     0, 1.30, 32, 88, 10, 5],
  ["54", "soz", "اَبْزَلُ",  "Ajrataman (ز)",   A.za_("za29_abzalu"),      0, 1.30, 20, 88, 10, 5],
];

// ============================================================
// PAGE 16 — Zo (ظ) — 49 element
// ============================================================
const p16: ED[] = [
  // ── Zo (ظ) bo'limi (31. zo.mp3) — 49 element ──
  // Headers — pozitsion shakllar (connector harf)
  ["01", "harf", "ظَ",    "Zo (boshida)",   A.zh("zh01_fatha"), 0, 0.67, 60, 5, 10, 6],
  ["02", "harf", "ـظِـ",  "Zi (oʻrtasida)", A.zh("zh02_kasra"), 0, 0.72, 48, 5, 10, 6],
  ["03", "harf", "ـظُ",   "Zu (oxirida)",   A.zh("zh03_damma"), 0, 0.72, 36, 5, 10, 6],
  // Row 1 (6 so'z): ظَنْ ظِلْ فَظْ حَظْ عَظْ لَظْ
  ["04", "soz", "ظَنْ",    "Zan (gumon)",        A.zh("zh04_zan"), 0, 0.97, 87, 16, 10, 5],
  ["05", "soz", "ظِلْ",    "Zil (soya)",         A.zh("zh05_zil"), 0, 0.96, 73, 16, 10, 5],
  ["06", "soz", "فَظْ",    "Faz (qo'pol)",       A.zh("zh06_faz"), 0, 0.90, 59, 16, 10, 5],
  ["07", "soz", "حَظْ",    "Haz (nasiba)",       A.zh("zh07_haz"), 0, 0.97, 45, 16, 10, 5],
  ["08", "soz", "عَظْ",    "Az (tishla)",        A.zh("zh08_az"),  0, 0.92, 31, 16, 10, 5],
  ["09", "soz", "لَظْ",    "Laz (olov)",         A.zh("zh09_laz"), 0, 1.00, 15, 16, 10, 5],
  // Row 2 (6 so'z): ظَفَرْ نَظَرْ حَظَرْ ظَمَرْ ظَلْفْ عِظَمْ
  ["10", "soz", "ظَفَرْ",   "Zafar (g'alaba)",     A.zh("zh10_zafar"), 0, 1.05, 87, 25, 12, 5],
  ["11", "soz", "نَظَرْ",   "Nazar (qaradi)",      A.zh("zh11_nazar"), 0, 1.10, 73, 25, 12, 5],
  ["12", "soz", "حَظَرْ",   "Hazar (taqiqladi)",   A.zh("zh12_hazar"), 0, 1.18, 59, 25, 12, 5],
  ["13", "soz", "ظَمَرْ",   "Zamar",               A.zh("zh13_zamar"), 0, 1.14, 45, 25, 12, 5],
  ["14", "soz", "ظَلْفْ",   "Zalf (tuyoq)",        A.zh("zh14_zalf"),  0, 1.04, 31, 25, 12, 5],
  ["15", "soz", "عِظَمْ",   "Izam (suyaklar)",     A.zh("zh15_izam"),  0, 1.18, 15, 25, 12, 5],
  // Row 3 (6 so'z): نَظْمُ ظَلْفُ ظِلْفُ خِظْلُ ظُلْمُ ظُهْرُ
  ["16", "soz", "نَظْمُ",   "Nazmu (tartib)",      A.zh("zh16_nizam"), 0, 1.34, 87, 34, 14, 5],
  ["17", "soz", "ظَلْفُ",   "Zalfu (tuyoq)",       A.zh("zh17_zalfu"), 0, 1.52, 72, 34, 12, 5],
  ["18", "soz", "ظِلْفُ",   "Zilfu (tuyoq)",       A.zh("zh18_zilf"),  0, 1.42, 58, 34, 12, 5],
  ["19", "soz", "خِظْلُ",   "Xizlu",               A.zh("zh19_hazl"),  0, 1.35, 44, 34, 12, 5],
  ["20", "soz", "ظُلْمُ",   "Zulmu (zulm)",        A.zh("zh20_zulmu"), 0, 1.36, 30, 34, 12, 5],
  ["21", "soz", "ظُهْرُ",   "Zuhru (peshin)",      A.zh("zh21_zuhru"), 0, 1.42, 15, 34, 12, 5],
  // Row 4 (6 so'z): اَظْهَرْ اَظْفَرْ مَظْهَرْ مَنْظَرْ مُظْهِرْ مُظْلِمْ
  ["22", "soz", "اَظْهَرْ",  "Azhar (oshkor qildi)",      A.zh("zh22_azhar"),  0, 1.36, 86, 43, 14, 5],
  ["23", "soz", "اَظْفَرْ",  "Azfar (g'olib qildi)",      A.zh("zh23_azfar"),  0, 1.37, 72, 43, 14, 5],
  ["24", "soz", "مَظْهَرْ",  "Mazhar (ko'rinish joyi)",   A.zh("zh24_mazhar"), 0, 1.50, 58, 43, 14, 5],
  ["25", "soz", "مَنْظَرْ",  "Manzar (manzara)",          A.zh("zh25_manzar"), 0, 1.74, 44, 43, 14, 5],
  ["26", "soz", "مُظْهِرْ",  "Muzhir (oshkor qiluvchi)",  A.zh("zh26_muzhir"), 0, 1.37, 30, 43, 14, 5],
  ["27", "soz", "مُظْلِمْ",  "Muzlim (qorong'i)",         A.zh("zh27_muzlim"), 0, 1.48, 14, 43, 14, 5],
  // Row 5 (6 so'z, past/present juftliklar): ظَهَرَ يَظْهَرُ نَظَرَ يَنْظُرُ ظَلَمَ يَظْلِمُ
  ["28", "soz", "ظَهَرَ",    "Zahara (zohir bo'ldi)",   A.zh("zh28_zahara"),  0, 1.20, 87, 52, 12, 5],
  ["29", "soz", "يَظْهَرُ",  "Yazharu (zohir bo'ladi)", A.zh("zh29_yazharu"), 0, 1.51, 72, 52, 14, 5],
  ["30", "soz", "نَظَرَ",    "Nazara (qaradi)",         A.zh("zh30_nazara"),  0, 1.18, 58, 52, 12, 5],
  ["31", "soz", "يَنْظُرُ",  "Yanzuru (qaraydi)",       A.zh("zh31_yanzuru"), 0, 1.71, 43, 52, 14, 5],
  ["32", "soz", "ظَلَمَ",    "Zalama (zulm qildi)",     A.zh("zh32_zalama"),  0, 1.16, 29, 52, 12, 5],
  ["33", "soz", "يَظْلِمُ",  "Yazlimu (zulm qiladi)",   A.zh("zh33_yazlimu"), 0, 1.51, 14, 52, 14, 5],
  // Row 6 (4 so'z, past/present juftliklar): اِنْتَظَمَ يَنْتَظِمُ اِسْتَعْظَمَ يَسْتَعْظِمُ
  ["34", "soz", "اِنْتَظَمَ",    "Intazama (tartibga tushdi)",   A.zh("zh34_intazama"),   0, 1.96, 82, 62, 18, 5],
  ["35", "soz", "يَنْتَظِمُ",    "Yantazimu (tartibga tushadi)", A.zh("zh35_yantazimu"),  0, 2.11, 60, 62, 18, 5],
  ["36", "soz", "اِسْتَعْظَمَ",  "Istazama (ulug' dedi)",         A.zh("zh36_istazama"),   0, 2.01, 37, 62, 20, 5],
  ["37", "soz", "يَسْتَعْظِمُ",  "Yastazimu (ulug' deydi)",       A.zh("zh37_yastazimu"),  0, 2.36, 14, 62, 20, 5],
  // ── Taqqoslash qatori 1 (6 so'z, 3 juftlik — ذ/ظ, ح-ظ/ح-ض, ظ/ض) ──
  ["38", "soz", "ذَفَرْ",   "Zafar (yomon hid)",     A.zh("zh38_zafar_zal"), 0, 1.04, 86, 74, 12, 5],
  ["39", "soz", "ظَفَرْ",   "Zafar (g'alaba)",       A.zh("zh39_zafar_zo"),  0, 1.07, 72, 74, 12, 5],
  ["40", "soz", "حَظَرْ",   "Hazar (taqiqladi)",     A.zh("zh40_hazar_zo"),  0, 1.02, 58, 74, 12, 5],
  ["41", "soz", "حَضَرْ",   "Hadar (hozir bo'ldi)",  A.zh("zh41_hadar_dod"), 0, 1.05, 44, 74, 12, 5],
  ["42", "soz", "ظَهْرُ",   "Zahru (orqa)",          A.zh("zh42_zahr_zo"),   0, 1.38, 30, 74, 12, 5],
  ["43", "soz", "ضَهْرُ",   "Dahru",                 A.zh("zh43_dahr_dod"),  0, 1.40, 14, 74, 12, 5],
  // ── Taqqoslash qatori 2 (6 so'z, 3 juftlik — ز/ظ) ──
  ["44", "soz", "ذَهَبْ",    "Zahab (oltin)",         A.zh("zh44_zahr_za"),   0, 1.05, 86, 83, 12, 5],
  ["45", "soz", "طَهَرْ",    "Tohar (tozalandi)",     A.zh("zh45_zahr_zo2"),  0, 1.15, 72, 83, 12, 5],
  ["46", "soz", "اَزْهَرْ",  "Azhar (gulladi)",       A.zh("zh46_azhar_za"),  0, 1.31, 58, 83, 14, 5],
  ["47", "soz", "اَظْهَرْ",  "Azhar (oshkor qildi)",  A.zh("zh47_azhar_zo"),  0, 1.33, 44, 83, 14, 5],
  ["48", "soz", "اَعْزَمْ",  "A'zam (qat'iy qildi)",  A.zh("zh48_azam_za"),   0, 1.42, 30, 83, 14, 5],
  ["49", "soz", "اَعْظَمْ",  "A'zam (ulug'roq)",      A.zh("zh49_azam_zo"),   0, 1.52, 14, 83, 14, 5],
];

// ============================================================
// PAGE 17 — Madli harflar (Long Vowels) — to'liq jadval
// 28 harf × 3 mad shakl (fatha+alif, kasra+ya, damma+waw) = 84 syllable
// Har syllable alohida chunk, `32. madli 01.mp3` dan kesilgan.
// Qator tartibi kitobga mos: ا ب ت | ث ج ح | خ د ذ | ر ز س | ش ص ض
//                            | ط ظ ع | غ ف ق | ك ل م | ن و ه | ي
// E'tibor: 9-qator kitobda و oldin, ه keyin (standart abjadiydan farq).
// ============================================================
const p17: ED[] = [
  // Muqaddima — kitob mad qoidalarini tushuntiradi (0-29s)
  ["intro_rule",  "jumla", "Mad yozilishi qoidalari",
    "Bungacha yozilgan arabcha so'zlar madsiz so'zlar edi...",
    A.md1("intro_rule"),  0, 29.60, 0, 0, 0, 0],
  // Sarlavha — "Madliy harflar" (30.5-31.9s)
  ["intro_title", "jumla", "مدلي حرفلر", "Madli harflar",
    A.md1("intro_title"), 0,  1.50, 0, 0, 0, 0],
  // Row 1: ا ب ت
  ["01", "bogin", "آ",   "Aa",   A.md1("m01_alif_aa"), 0, 0.80, 0, 0, 10, 5],
  ["02", "bogin", "إٖى", "Ii",   A.md1("m02_alif_ii"), 0, 0.87, 0, 0, 10, 5],
  ["03", "bogin", "أُو", "Uu",   A.md1("m03_alif_uu"), 0, 0.83, 0, 0, 10, 5],
  ["04", "bogin", "بٰا", "Baa",  A.md1("m04_ba_aa"),   0, 0.93, 0, 0, 10, 5],
  ["05", "bogin", "بٖى", "Bii",  A.md1("m05_ba_ii"),   0, 0.91, 0, 0, 10, 5],
  ["06", "bogin", "بُو", "Buu",  A.md1("m06_ba_uu"),   0, 0.84, 0, 0, 10, 5],
  ["07", "bogin", "تٰا", "Taa",  A.md1("m07_ta_aa"),   0, 0.83, 0, 0, 10, 5],
  ["08", "bogin", "تٖى", "Tii",  A.md1("m08_ta_ii"),   0, 0.85, 0, 0, 10, 5],
  ["09", "bogin", "تُو", "Tuu",  A.md1("m09_ta_uu"),   0, 0.78, 0, 0, 10, 5],
  // Row 2: ث ج ح
  ["10", "bogin", "ثٰا", "Tsaa", A.md1("m10_tsa_aa"),  0, 0.82, 0, 0, 10, 5],
  ["11", "bogin", "ثٖى", "Tsii", A.md1("m11_tsa_ii"),  0, 0.79, 0, 0, 10, 5],
  ["12", "bogin", "ثُو", "Tsuu", A.md1("m12_tsa_uu"),  0, 0.79, 0, 0, 10, 5],
  ["13", "bogin", "جٰا", "Jaa",  A.md1("m13_ja_aa"),   0, 0.90, 0, 0, 10, 5],
  ["14", "bogin", "جٖى", "Jii",  A.md1("m14_ja_ii"),   0, 0.98, 0, 0, 10, 5],
  ["15", "bogin", "جُو", "Juu",  A.md1("m15_ja_uu"),   0, 0.95, 0, 0, 10, 5],
  ["16", "bogin", "حٰا", "Ḥaa",  A.md1("m16_hha_aa"),  0, 0.95, 0, 0, 10, 5],
  ["17", "bogin", "حٖى", "Ḥii",  A.md1("m17_hha_ii"),  0, 0.94, 0, 0, 10, 5],
  ["18", "bogin", "حُو", "Ḥuu",  A.md1("m18_hha_uu"),  0, 0.76, 0, 0, 10, 5],
  // Row 3: خ د ذ
  ["19", "bogin", "خٰا", "Xaa",  A.md1("m19_kha_aa"),  0, 1.08, 0, 0, 10, 5],
  ["20", "bogin", "خٖى", "Xii",  A.md1("m20_kha_ii"),  0, 0.90, 0, 0, 10, 5],
  ["21", "bogin", "خُو", "Xuu",  A.md1("m21_kha_uu"),  0, 0.88, 0, 0, 10, 5],
  ["22", "bogin", "دٰا", "Daa",  A.md1("m22_da_aa"),   0, 0.94, 0, 0, 10, 5],
  ["23", "bogin", "دٖى", "Dii",  A.md1("m23_da_ii"),   0, 0.98, 0, 0, 10, 5],
  ["24", "bogin", "دُو", "Duu",  A.md1("m24_da_uu"),   0, 0.97, 0, 0, 10, 5],
  ["25", "bogin", "ذٰا", "Zaa",  A.md1("m25_dza_aa"),  0, 0.99, 0, 0, 10, 5],
  ["26", "bogin", "ذٖى", "Zii",  A.md1("m26_dza_ii"),  0, 1.03, 0, 0, 10, 5],
  ["27", "bogin", "ذُو", "Zuu",  A.md1("m27_dza_uu"),  0, 1.04, 0, 0, 10, 5],
  // Row 4: ر ز س
  ["28", "bogin", "رٰا", "Raa",  A.md1("m28_ra_aa"),   0, 1.01, 0, 0, 10, 5],
  ["29", "bogin", "رٖى", "Rii",  A.md1("m29_ra_ii"),   0, 0.97, 0, 0, 10, 5],
  ["30", "bogin", "رُو", "Ruu",  A.md1("m30_ra_uu"),   0, 0.94, 0, 0, 10, 5],
  ["31", "bogin", "زٰا", "Zaa",  A.md1("m31_za_aa"),   0, 1.07, 0, 0, 10, 5],
  ["32", "bogin", "زٖى", "Zii",  A.md1("m32_za_ii"),   0, 1.08, 0, 0, 10, 5],
  ["33", "bogin", "زُو", "Zuu",  A.md1("m33_za_uu"),   0, 1.10, 0, 0, 10, 5],
  ["34", "bogin", "سٰا", "Saa",  A.md1("m34_sa_aa"),   0, 1.09, 0, 0, 10, 5],
  ["35", "bogin", "سٖى", "Sii",  A.md1("m35_sa_ii"),   0, 1.07, 0, 0, 10, 5],
  ["36", "bogin", "سُو", "Suu",  A.md1("m36_sa_uu"),   0, 0.95, 0, 0, 10, 5],
  // Row 5: ش ص ض
  ["37", "bogin", "شٰا", "Shaa", A.md1("m37_sha_aa"),  0, 1.09, 0, 0, 10, 5],
  ["38", "bogin", "شٖى", "Shii", A.md1("m38_sha_ii"),  0, 1.06, 0, 0, 10, 5],
  ["39", "bogin", "شُو", "Shuu", A.md1("m39_sha_uu"),  0, 0.97, 0, 0, 10, 5],
  ["40", "bogin", "صٰا", "Soo",  A.md1("m40_ssa_aa"),  0, 1.04, 0, 0, 10, 5],
  ["41", "bogin", "صٖى", "Sii",  A.md1("m41_ssa_ii"),  0, 1.12, 0, 0, 10, 5],
  ["42", "bogin", "صُو", "Suu",  A.md1("m42_ssa_uu"),  0, 1.03, 0, 0, 10, 5],
  ["43", "bogin", "ضٰا", "Dhoo", A.md1("m43_dho_aa"),  0, 1.12, 0, 0, 10, 5],
  ["44", "bogin", "ضٖى", "Dhii", A.md1("m44_dho_ii"),  0, 1.08, 0, 0, 10, 5],
  ["45", "bogin", "ضُو", "Dhuu", A.md1("m45_dho_uu"),  0, 1.03, 0, 0, 10, 5],
  // Row 6: ط ظ ع
  ["46", "bogin", "طٰا", "Too",  A.md1("m46_tho_aa"),  0, 0.97, 0, 0, 10, 5],
  ["47", "bogin", "طٖى", "Tii",  A.md1("m47_tho_ii"),  0, 0.99, 0, 0, 10, 5],
  ["48", "bogin", "طُو", "Tuu",  A.md1("m48_tho_uu"),  0, 0.94, 0, 0, 10, 5],
  ["49", "bogin", "ظٰا", "Zoo",  A.md1("m49_zho_aa"),  0, 1.12, 0, 0, 10, 5],
  ["50", "bogin", "ظٖى", "Zii",  A.md1("m50_zho_ii"),  0, 1.01, 0, 0, 10, 5],
  ["51", "bogin", "ظُو", "Zuu",  A.md1("m51_zho_uu"),  0, 0.98, 0, 0, 10, 5],
  ["52", "bogin", "عٰا", "Aa",   A.md1("m52_ayn_aa"),  0, 0.98, 0, 0, 10, 5],
  ["53", "bogin", "عٖى", "Ii",   A.md1("m53_ayn_ii"),  0, 1.04, 0, 0, 10, 5],
  ["54", "bogin", "عُو", "Uu",   A.md1("m54_ayn_uu"),  0, 1.04, 0, 0, 10, 5],
  // Row 7: غ ف ق
  ["55", "bogin", "غٰا", "G'aa", A.md1("m55_gha_aa"),  0, 1.18, 0, 0, 10, 5],
  ["56", "bogin", "غٖى", "G'ii", A.md1("m56_gha_ii"),  0, 0.96, 0, 0, 10, 5],
  ["57", "bogin", "غُو", "G'uu", A.md1("m57_gha_uu"),  0, 1.03, 0, 0, 10, 5],
  ["58", "bogin", "فٰا", "Faa",  A.md1("m58_fa_aa"),   0, 1.01, 0, 0, 10, 5],
  ["59", "bogin", "فٖى", "Fii",  A.md1("m59_fa_ii"),   0, 0.99, 0, 0, 10, 5],
  ["60", "bogin", "فُو", "Fuu",  A.md1("m60_fa_uu"),   0, 0.83, 0, 0, 10, 5],
  ["61", "bogin", "قٰا", "Qaa",  A.md1("m61_qa_aa"),   0, 0.94, 0, 0, 10, 5],
  ["62", "bogin", "قٖى", "Qii",  A.md1("m62_qa_ii"),   0, 0.93, 0, 0, 10, 5],
  ["63", "bogin", "قُو", "Quu",  A.md1("m63_qa_uu"),   0, 0.84, 0, 0, 10, 5],
  // Row 8: ك ل م
  ["64", "bogin", "كٰا", "Kaa",  A.md1("m64_ka_aa"),   0, 0.97, 0, 0, 10, 5],
  ["65", "bogin", "كٖى", "Kii",  A.md1("m65_ka_ii"),   0, 0.92, 0, 0, 10, 5],
  ["66", "bogin", "كُو", "Kuu",  A.md1("m66_ka_uu"),   0, 0.94, 0, 0, 10, 5],
  ["67", "bogin", "لٰا", "Laa",  A.md1("m67_la_aa"),   0, 1.01, 0, 0, 10, 5],
  ["68", "bogin", "لٖى", "Lii",  A.md1("m68_la_ii"),   0, 1.07, 0, 0, 10, 5],
  ["69", "bogin", "لُو", "Luu",  A.md1("m69_la_uu"),   0, 0.95, 0, 0, 10, 5],
  ["70", "bogin", "مٰا", "Maa",  A.md1("m70_ma_aa"),   0, 1.02, 0, 0, 10, 5],
  ["71", "bogin", "مٖى", "Mii",  A.md1("m71_ma_ii"),   0, 1.03, 0, 0, 10, 5],
  ["72", "bogin", "مُو", "Muu",  A.md1("m72_ma_uu"),   0, 0.92, 0, 0, 10, 5],
  // Row 9: ن و ه (kitob tartibi — و ه dan oldin)
  ["73", "bogin", "نٰا", "Naa",  A.md1("m73_na_aa"),   0, 0.99, 0, 0, 10, 5],
  ["74", "bogin", "نٖى", "Nii",  A.md1("m74_na_ii"),   0, 0.96, 0, 0, 10, 5],
  ["75", "bogin", "نُو", "Nuu",  A.md1("m75_na_uu"),   0, 0.92, 0, 0, 10, 5],
  ["76", "bogin", "وٰا", "Voo",  A.md1("m76_wa_aa"),   0, 1.04, 0, 0, 10, 5],
  ["77", "bogin", "وٖى", "Vii",  A.md1("m77_wa_ii"),   0, 1.02, 0, 0, 10, 5],
  ["78", "bogin", "وُو", "Vuu",  A.md1("m78_wa_uu"),   0, 0.97, 0, 0, 10, 5],
  ["79", "bogin", "هٰا", "Haa",  A.md1("m79_ha_aa"),   0, 1.11, 0, 0, 10, 5],
  ["80", "bogin", "هٖى", "Hii",  A.md1("m80_ha_ii"),   0, 1.09, 0, 0, 10, 5],
  ["81", "bogin", "هُو", "Huu",  A.md1("m81_ha_uu"),   0, 1.03, 0, 0, 10, 5],
  // Row 10: ي (yolg'iz, 3 syllable)
  ["82", "bogin", "يٰا", "Yaa",  A.md1("m82_ya_aa"),   0, 1.11, 0, 0, 10, 5],
  ["83", "bogin", "يٖى", "Yii",  A.md1("m83_ya_ii"),   0, 0.99, 0, 0, 10, 5],
  ["84", "bogin", "يُو", "Yuu",  A.md1("m84_ya_uu"),   0, 0.92, 0, 0, 10, 5],
];

// ============================================================
// PAGE 18 — Madli harflar mashqi (random aralash 81 syllable)
// 17-sahifaning takrorlash mashqi: o'sha 28 harfning mad shakllari
// random tartibda, 9 qator × 3 tashqi cell × 3 syllable = 81.
// Audio chunklari 17-sahifa bilan bir xil (`32_madli_01/m01..m84.mp3`).
// Alif faqat ii shaklida (إٖى), dho ii shakli yo'q — kitob shu joylash-
// uvni qoldirgan; o'qituvchi bu sahifani amaliyot deb sanaydi.
//
// Outro narration: kitob ostidagi tavsiya — "Ushbu darsda yozilgan
// harflarning har qaysisini xatosiz mad qilmaguncha keyingi darslarni
// ko'rsatma talabaga". `32. madli 01.mp3` ning 262.9-271.7s qismidan
// kesilgan (8.81s) — tasdiq foydalanuvchi tinglovi orqali.
// ============================================================
const p18: ED[] = [
  // Outro tavsiya (sahifa pastida, click bilan ijro etiladi)
  ["outro", "jumla",
    "اوشبو درسده يازيلگان حرفلرنينگ هر قايسيسي خطاسيز مد قيلينماگونچه كيينگي درسلر كورسه تلميذي",
    "Ushbu darsda yozilgan harflarning har qaysisini xatosiz mad qilmaguncha keyingi darslarni ko'rsatma talabaga.",
    A.md1("p18_outro"), 0, 8.81, 0, 0, 0, 0],
  // Row 1 — O'ng cell: ba_uu / ya_ii / ba_aa
  ["01", "bogin", "بُو", "Buu",  A.md1("m06_ba_uu"),   0, 0.84, 0, 0, 10, 5],
  ["02", "bogin", "يٖى", "Yii",  A.md1("m83_ya_ii"),   0, 0.99, 0, 0, 10, 5],
  ["03", "bogin", "بٰا", "Baa",  A.md1("m04_ba_aa"),   0, 0.93, 0, 0, 10, 5],
  // Row 1 — O'rta cell: ya_uu / ba_ii / ya_aa
  ["04", "bogin", "يُو", "Yuu",  A.md1("m84_ya_uu"),   0, 0.92, 0, 0, 10, 5],
  ["05", "bogin", "بٖى", "Bii",  A.md1("m05_ba_ii"),   0, 0.91, 0, 0, 10, 5],
  ["06", "bogin", "يٰا", "Yaa",  A.md1("m82_ya_aa"),   0, 1.11, 0, 0, 10, 5],
  // Row 1 — Chap cell: ta_uu / ha_ii / ta_aa
  ["07", "bogin", "تُو", "Tuu",  A.md1("m09_ta_uu"),   0, 0.78, 0, 0, 10, 5],
  ["08", "bogin", "هٖى", "Hii",  A.md1("m80_ha_ii"),   0, 1.09, 0, 0, 10, 5],
  ["09", "bogin", "تٰا", "Taa",  A.md1("m07_ta_aa"),   0, 0.83, 0, 0, 10, 5],
  // Row 2 — O'ng cell: ha_uu / ta_ii / ha_aa
  ["10", "bogin", "هُو", "Huu",  A.md1("m81_ha_uu"),   0, 1.03, 0, 0, 10, 5],
  ["11", "bogin", "تٖى", "Tii",  A.md1("m08_ta_ii"),   0, 0.85, 0, 0, 10, 5],
  ["12", "bogin", "هٰا", "Haa",  A.md1("m79_ha_aa"),   0, 1.11, 0, 0, 10, 5],
  // Row 2 — O'rta cell: tsa_uu / wa_ii / tsa_aa
  ["13", "bogin", "ثُو", "Tsuu", A.md1("m12_tsa_uu"),  0, 0.79, 0, 0, 10, 5],
  ["14", "bogin", "وٖى", "Vii",  A.md1("m77_wa_ii"),   0, 1.02, 0, 0, 10, 5],
  ["15", "bogin", "ثٰا", "Tsaa", A.md1("m10_tsa_aa"),  0, 0.82, 0, 0, 10, 5],
  // Row 2 — Chap cell: wa_uu / tsa_ii / wa_aa
  ["16", "bogin", "وُو", "Vuu",  A.md1("m78_wa_uu"),   0, 0.97, 0, 0, 10, 5],
  ["17", "bogin", "ثٖى", "Tsii", A.md1("m11_tsa_ii"),  0, 0.79, 0, 0, 10, 5],
  ["18", "bogin", "وٰا", "Voo",  A.md1("m76_wa_aa"),   0, 1.04, 0, 0, 10, 5],
  // Row 3 — O'ng cell: ja_uu / na_ii / ja_aa
  ["19", "bogin", "جُو", "Juu",  A.md1("m15_ja_uu"),   0, 0.95, 0, 0, 10, 5],
  ["20", "bogin", "نٖى", "Nii",  A.md1("m74_na_ii"),   0, 0.96, 0, 0, 10, 5],
  ["21", "bogin", "جٰا", "Jaa",  A.md1("m13_ja_aa"),   0, 0.90, 0, 0, 10, 5],
  // Row 3 — O'rta cell: na_uu / ja_ii / na_aa
  ["22", "bogin", "نُو", "Nuu",  A.md1("m75_na_uu"),   0, 0.92, 0, 0, 10, 5],
  ["23", "bogin", "جٖى", "Jii",  A.md1("m14_ja_ii"),   0, 0.98, 0, 0, 10, 5],
  ["24", "bogin", "نٰا", "Naa",  A.md1("m73_na_aa"),   0, 0.99, 0, 0, 10, 5],
  // Row 3 — Chap cell: hha_uu / ma_ii / hha_aa
  ["25", "bogin", "حُو", "Ḥuu",  A.md1("m18_hha_uu"),  0, 0.76, 0, 0, 10, 5],
  ["26", "bogin", "مٖى", "Mii",  A.md1("m71_ma_ii"),   0, 1.03, 0, 0, 10, 5],
  ["27", "bogin", "حٰا", "Ḥaa",  A.md1("m16_hha_aa"),  0, 0.95, 0, 0, 10, 5],
  // Row 4 — O'ng cell: ma_uu / hha_ii / ma_aa
  ["28", "bogin", "مُو", "Muu",  A.md1("m72_ma_uu"),   0, 0.92, 0, 0, 10, 5],
  ["29", "bogin", "حٖى", "Ḥii",  A.md1("m17_hha_ii"),  0, 0.94, 0, 0, 10, 5],
  ["30", "bogin", "مٰا", "Maa",  A.md1("m70_ma_aa"),   0, 1.02, 0, 0, 10, 5],
  // Row 4 — O'rta cell: kha_uu / la_ii / kha_aa
  ["31", "bogin", "خُو", "Xuu",  A.md1("m21_kha_uu"),  0, 0.88, 0, 0, 10, 5],
  ["32", "bogin", "لٖى", "Lii",  A.md1("m68_la_ii"),   0, 1.07, 0, 0, 10, 5],
  ["33", "bogin", "خٰا", "Xaa",  A.md1("m19_kha_aa"),  0, 1.08, 0, 0, 10, 5],
  // Row 4 — Chap cell: la_uu / kha_ii / la_aa
  ["34", "bogin", "لُو", "Luu",  A.md1("m69_la_uu"),   0, 0.95, 0, 0, 10, 5],
  ["35", "bogin", "خٖى", "Xii",  A.md1("m20_kha_ii"),  0, 0.90, 0, 0, 10, 5],
  ["36", "bogin", "لٰا", "Laa",  A.md1("m67_la_aa"),   0, 1.01, 0, 0, 10, 5],
  // Row 5 — O'ng cell: da_uu / ka_ii / da_aa
  ["37", "bogin", "دُو", "Duu",  A.md1("m24_da_uu"),   0, 0.97, 0, 0, 10, 5],
  ["38", "bogin", "كٖى", "Kii",  A.md1("m65_ka_ii"),   0, 0.92, 0, 0, 10, 5],
  ["39", "bogin", "دٰا", "Daa",  A.md1("m22_da_aa"),   0, 0.94, 0, 0, 10, 5],
  // Row 5 — O'rta cell: ka_uu / da_ii / ka_aa
  ["40", "bogin", "كُو", "Kuu",  A.md1("m66_ka_uu"),   0, 0.94, 0, 0, 10, 5],
  ["41", "bogin", "دٖى", "Dii",  A.md1("m23_da_ii"),   0, 0.98, 0, 0, 10, 5],
  ["42", "bogin", "كٰا", "Kaa",  A.md1("m64_ka_aa"),   0, 0.97, 0, 0, 10, 5],
  // Row 5 — Chap cell: dza_uu / qa_ii / dza_aa
  ["43", "bogin", "ذُو", "Zuu",  A.md1("m27_dza_uu"),  0, 1.04, 0, 0, 10, 5],
  ["44", "bogin", "قٖى", "Qii",  A.md1("m62_qa_ii"),   0, 0.93, 0, 0, 10, 5],
  ["45", "bogin", "ذٰا", "Zaa",  A.md1("m25_dza_aa"),  0, 0.99, 0, 0, 10, 5],
  // Row 6 — O'ng cell: qa_uu / dza_ii / qa_aa
  ["46", "bogin", "قُو", "Quu",  A.md1("m63_qa_uu"),   0, 0.84, 0, 0, 10, 5],
  ["47", "bogin", "ذٖى", "Zii",  A.md1("m26_dza_ii"),  0, 1.03, 0, 0, 10, 5],
  ["48", "bogin", "قٰا", "Qaa",  A.md1("m61_qa_aa"),   0, 0.94, 0, 0, 10, 5],
  // Row 6 — O'rta cell: ra_uu / fa_ii / ra_aa
  ["49", "bogin", "رُو", "Ruu",  A.md1("m30_ra_uu"),   0, 0.94, 0, 0, 10, 5],
  ["50", "bogin", "فٖى", "Fii",  A.md1("m59_fa_ii"),   0, 0.99, 0, 0, 10, 5],
  ["51", "bogin", "رٰا", "Raa",  A.md1("m28_ra_aa"),   0, 1.01, 0, 0, 10, 5],
  // Row 6 — Chap cell: fa_uu / ra_ii / fa_aa
  ["52", "bogin", "فُو", "Fuu",  A.md1("m60_fa_uu"),   0, 0.83, 0, 0, 10, 5],
  ["53", "bogin", "رٖى", "Rii",  A.md1("m29_ra_ii"),   0, 0.97, 0, 0, 10, 5],
  ["54", "bogin", "فٰا", "Faa",  A.md1("m58_fa_aa"),   0, 1.01, 0, 0, 10, 5],
  // Row 7 — O'ng cell: za_uu / gha_ii / za_aa
  ["55", "bogin", "زُو", "Zuu",  A.md1("m33_za_uu"),   0, 1.10, 0, 0, 10, 5],
  ["56", "bogin", "غٖى", "G'ii", A.md1("m56_gha_ii"),  0, 0.96, 0, 0, 10, 5],
  ["57", "bogin", "زٰا", "Zaa",  A.md1("m31_za_aa"),   0, 1.07, 0, 0, 10, 5],
  // Row 7 — O'rta cell: gha_uu / za_ii / gha_aa
  ["58", "bogin", "غُو", "G'uu", A.md1("m57_gha_uu"),  0, 1.03, 0, 0, 10, 5],
  ["59", "bogin", "زٖى", "Zii",  A.md1("m32_za_ii"),   0, 1.08, 0, 0, 10, 5],
  ["60", "bogin", "غٰا", "G'aa", A.md1("m55_gha_aa"),  0, 1.18, 0, 0, 10, 5],
  // Row 7 — Chap cell: sa_uu / ayn_ii / sa_aa
  ["61", "bogin", "سُو", "Suu",  A.md1("m36_sa_uu"),   0, 0.95, 0, 0, 10, 5],
  ["62", "bogin", "عٖى", "Ii",   A.md1("m53_ayn_ii"),  0, 1.04, 0, 0, 10, 5],
  ["63", "bogin", "سٰا", "Saa",  A.md1("m34_sa_aa"),   0, 1.09, 0, 0, 10, 5],
  // Row 8 — O'ng cell: ayn_uu / sa_ii / ayn_aa
  ["64", "bogin", "عُو", "Uu",   A.md1("m54_ayn_uu"),  0, 1.04, 0, 0, 10, 5],
  ["65", "bogin", "سٖى", "Sii",  A.md1("m35_sa_ii"),   0, 1.07, 0, 0, 10, 5],
  ["66", "bogin", "عٰا", "Aa",   A.md1("m52_ayn_aa"),  0, 0.98, 0, 0, 10, 5],
  // Row 8 — O'rta cell: sha_uu / zho_ii / sha_aa
  ["67", "bogin", "شُو", "Shuu", A.md1("m39_sha_uu"),  0, 0.97, 0, 0, 10, 5],
  ["68", "bogin", "ظٖى", "Zii",  A.md1("m50_zho_ii"),  0, 1.01, 0, 0, 10, 5],
  ["69", "bogin", "شٰا", "Shaa", A.md1("m37_sha_aa"),  0, 1.09, 0, 0, 10, 5],
  // Row 8 — Chap cell: zho_uu / sha_ii / zho_aa
  ["70", "bogin", "ظُو", "Zuu",  A.md1("m51_zho_uu"),  0, 0.98, 0, 0, 10, 5],
  ["71", "bogin", "شٖى", "Shii", A.md1("m38_sha_ii"),  0, 1.06, 0, 0, 10, 5],
  ["72", "bogin", "ظٰا", "Zoo",  A.md1("m49_zho_aa"),  0, 1.12, 0, 0, 10, 5],
  // Row 9 — O'ng cell: ssa_uu / tho_ii / ssa_aa
  ["73", "bogin", "صُو", "Suu",  A.md1("m42_ssa_uu"),  0, 1.03, 0, 0, 10, 5],
  ["74", "bogin", "طٖى", "Tii",  A.md1("m47_tho_ii"),  0, 0.99, 0, 0, 10, 5],
  ["75", "bogin", "صٰا", "Soo",  A.md1("m40_ssa_aa"),  0, 1.04, 0, 0, 10, 5],
  // Row 9 — O'rta cell: tho_uu / ssa_ii / tho_aa
  ["76", "bogin", "طُو", "Tuu",  A.md1("m48_tho_uu"),  0, 0.94, 0, 0, 10, 5],
  ["77", "bogin", "صٖى", "Sii",  A.md1("m41_ssa_ii"),  0, 1.12, 0, 0, 10, 5],
  ["78", "bogin", "طٰا", "Too",  A.md1("m46_tho_aa"),  0, 0.97, 0, 0, 10, 5],
  // Row 9 — Chap cell: dho_uu / alif_ii / dho_aa
  ["79", "bogin", "ضُو", "Dhuu", A.md1("m45_dho_uu"),  0, 1.03, 0, 0, 10, 5],
  ["80", "bogin", "إٖى", "Ii",   A.md1("m02_alif_ii"), 0, 0.87, 0, 0, 10, 5],
  ["81", "bogin", "ضٰا", "Dhoo", A.md1("m43_dho_aa"),  0, 1.12, 0, 0, 10, 5],
];

// ============================================================
// PAGE 19 — Madli so'zlar (71 ta)
// Audio: 33. madli 02.mp3 (0:00.74-2:58.66 = page 19 diapazoni)
// Layout: 12 qator. Yuqori bo'lim (R1-R9, divider'gacha) — ism va aktiv
// participle shakllar; pastki bo'lim (R10-R12) — fe'l shakllari (passiv,
// imperfekt singular/plural). Mad-style harakat: fatha+alif → ٰا (U+0670 +
// alif), kasra+ya → ٖى (U+0656 + ya), damma+waw → ُو (U+064F qoladi, font
// damma'ni kattalashtiradi).
// ============================================================
const p19: ED[] = [
  // R1: مَالْ حَالْ نَارْ جَاهْ شَامْ سَامْ — fatha+alif mad, sukun oxirida
  ["01", "soz", "مٰالْ",  "Mol",         A.md2("m19r1_w1_mol"),  0, 1.37, 0, 0, 12, 5],
  ["02", "soz", "حٰالْ",  "Hol",         A.md2("m19r1_w2_hol"),  0, 1.40, 0, 0, 12, 5],
  ["03", "soz", "نٰارْ",  "Olov",        A.md2("m19r1_w3_nor"),  0, 1.22, 0, 0, 12, 5],
  ["04", "soz", "جٰاهْ",  "Maqom",       A.md2("m19r1_w4_joh"),  0, 1.17, 0, 0, 12, 5],
  ["05", "soz", "شٰامْ",  "Shom",        A.md2("m19r1_w5_shom"), 0, 1.25, 0, 0, 12, 5],
  ["06", "soz", "سٰامْ",  "Sam",         A.md2("m19r1_w6_som"),  0, 1.32, 0, 0, 12, 5],
  // R2: بَارٖى عَالٖى رَاضٖى قَاضٖى هَادٖى حَالٖى — fatha+alif + kasra+ya mad
  ["07", "soz", "بٰارٖى", "Bori",        A.md2("m19r2_w1_bori"), 0, 1.51, 0, 0, 12, 5],
  ["08", "soz", "عٰالٖى", "Oliy",        A.md2("m19r2_w2_oli"),  0, 1.56, 0, 0, 12, 5],
  ["09", "soz", "رٰاضٖى", "Rozi",        A.md2("m19r2_w3_rozi"), 0, 1.74, 0, 0, 12, 5],
  ["10", "soz", "قٰاضٖى", "Qozi",        A.md2("m19r2_w4_qozi"), 0, 1.67, 0, 0, 12, 5],
  ["11", "soz", "هٰادٖى", "Hidoyatchi",  A.md2("m19r2_w5_hodi"), 0, 1.67, 0, 0, 12, 5],
  ["12", "soz", "حٰالٖى", "Holim",       A.md2("m19r2_w6_holi"), 0, 1.70, 0, 0, 12, 5],
  // R3: كَلَامْ سَلَامْ حَلَالْ حَرَامْ جَلَالْ جَمَالْ كَمَالْ — 2-bo'g'inli
  ["13", "soz", "كَلٰامْ", "Kalom",       A.md2("m19r3_w1_kalom"),  0, 1.43, 0, 0, 12, 5],
  ["14", "soz", "سَلٰامْ", "Salom",       A.md2("m19r3_w2_salom"),  0, 1.69, 0, 0, 12, 5],
  ["15", "soz", "حَلٰالْ", "Halol",       A.md2("m19r3_w3_halol"),  0, 1.79, 0, 0, 12, 5],
  ["16", "soz", "حَرٰامْ", "Harom",       A.md2("m19r3_w4_harom"),  0, 1.66, 0, 0, 12, 5],
  ["17", "soz", "جَلٰالْ", "Jalol",       A.md2("m19r3_w5_jalol"),  0, 1.76, 0, 0, 12, 5],
  ["18", "soz", "جَمٰالْ", "Jamol",       A.md2("m19r3_w6_jamol"),  0, 1.61, 0, 0, 12, 5],
  ["19", "soz", "كَمٰالْ", "Kamol",       A.md2("m19r3_w7_kamol"),  0, 1.68, 0, 0, 12, 5],
  // R4: اِمَامْ حِسَابْ نِظَامْ غُرَابْ غُلَامْ غُبَارْ تُرَابْ — kasra/damma + mad
  ["20", "soz", "اِمٰامْ", "Imom",        A.md2("m19r4_w1_imom"),   0, 1.56, 0, 0, 12, 5],
  ["21", "soz", "حِسٰابْ", "Hisob",       A.md2("m19r4_w2_hisob"),  0, 1.53, 0, 0, 12, 5],
  ["22", "soz", "نِظٰامْ", "Nizom",       A.md2("m19r4_w3_nizom"),  0, 1.65, 0, 0, 12, 5],
  ["23", "soz", "غُرٰابْ", "Qarg'a",      A.md2("m19r4_w4_gurob"),  0, 1.47, 0, 0, 12, 5],
  ["24", "soz", "غُلٰامْ", "G'ulom",      A.md2("m19r4_w5_gulom"),  0, 1.70, 0, 0, 12, 5],
  ["25", "soz", "غُبٰارْ", "G'ubor",      A.md2("m19r4_w6_gubor"),  0, 1.48, 0, 0, 12, 5],
  ["26", "soz", "تُرٰابْ", "Tuproq",      A.md2("m19r4_w7_turob"),  0, 1.43, 0, 0, 12, 5],
  // R5: اَمْوَالْ اَحْوَالْ اَعْمَالْ اَعْلَامْ اَمْوَاتْ اَمْرَاضْ — ko'plik shakllar
  ["27", "soz", "اَمْوٰالْ", "Mol-mulklar", A.md2("m19r5_w1_amvol"), 0, 1.82, 0, 0, 14, 5],
  ["28", "soz", "اَحْوٰالْ", "Ahvollar",    A.md2("m19r5_w2_ahvol"), 0, 2.06, 0, 0, 14, 5],
  ["29", "soz", "اَعْمٰالْ", "Amallar",     A.md2("m19r5_w3_amol"),  0, 1.98, 0, 0, 14, 5],
  ["30", "soz", "اَعْلٰامْ", "Bayroqlar",   A.md2("m19r5_w4_alom"),  0, 2.02, 0, 0, 14, 5],
  ["31", "soz", "اَمْوٰاتْ", "O'liklar",    A.md2("m19r5_w5_amvot"), 0, 2.16, 0, 0, 14, 5],
  ["32", "soz", "اَمْرٰاضْ", "Kasalliklar", A.md2("m19r5_w6_amroz"), 0, 2.08, 0, 0, 14, 5],
  // R6: قَوَاعِدْ عَوَامِلْ شَوَاهِدْ جَوَاهِرْ كَوَاكِبْ مَكَاتِبْ — 4-bo'g'inli ism shakllari
  ["33", "soz", "قَوٰاعِدْ", "Qoidalar",     A.md2("m19r6_w1_qavoid"),    0, 1.61, 0, 0, 14, 5],
  ["34", "soz", "عَوٰامِلْ", "Sabablar",     A.md2("m19r6_w2_avomil"),    0, 1.70, 0, 0, 14, 5],
  ["35", "soz", "شَوٰاهِدْ", "Guvohlar",     A.md2("m19r6_w3_shavohid"),  0, 1.66, 0, 0, 14, 5],
  ["36", "soz", "جَوٰاهِرْ", "Javohirlar",   A.md2("m19r6_w4_javohir"),   0, 1.67, 0, 0, 14, 5],
  ["37", "soz", "كَوٰاكِبْ", "Yulduzlar",    A.md2("m19r6_w5_kavokib"),   0, 1.52, 0, 0, 14, 5],
  ["38", "soz", "مَكٰاتِبْ", "Maktablar",    A.md2("m19r6_w6_makotib"),   0, 1.57, 0, 0, 14, 5],
  // R7: اِكْرَامْ اِعْلَامْ اِخْلَاصْ اِظْهَارْ اِصْلَاحْ اِفْسَادْ — IV bob masdari
  ["39", "soz", "اِكْرٰامْ", "Hurmat",       A.md2("m19r7_w1_ikrom"),  0, 1.71, 0, 0, 14, 5],
  ["40", "soz", "اِعْلٰامْ", "E'lon",        A.md2("m19r7_w2_ilom"),   0, 1.88, 0, 0, 14, 5],
  ["41", "soz", "اِخْلٰاصْ", "Ixlos",        A.md2("m19r7_w3_ihlos"),  0, 1.78, 0, 0, 14, 5],
  ["42", "soz", "اِظْهٰارْ", "Izhor",        A.md2("m19r7_w4_izhor"),  0, 1.75, 0, 0, 14, 5],
  ["43", "soz", "اِصْلٰاحْ", "Isloh",        A.md2("m19r7_w5_islox"),  0, 1.97, 0, 0, 14, 5],
  ["44", "soz", "اِفْسٰادْ", "Buzg'unchilik", A.md2("m19r7_w6_ifsod"), 0, 1.82, 0, 0, 14, 5],
  // R8: عَالِمْ صَابِرْ مَاهِرْ طَالِبْ فَاتِحْ صَالِحْ — اسم فاعل (active participle)
  ["45", "soz", "عٰالِمْ",  "Olim",          A.md2("m19r8_w1_olim"),  0, 1.45, 0, 0, 12, 5],
  ["46", "soz", "صٰابِرْ",  "Sabrli",        A.md2("m19r8_w2_sobir"), 0, 1.43, 0, 0, 12, 5],
  ["47", "soz", "مٰاهِرْ",  "Mohir",         A.md2("m19r8_w3_mohir"), 0, 1.43, 0, 0, 12, 5],
  ["48", "soz", "طٰالِبْ",  "Talab qiluvchi", A.md2("m19r8_w4_tolib"), 0, 1.36, 0, 0, 12, 5],
  ["49", "soz", "فٰاتِحْ",  "Fath etuvchi",  A.md2("m19r8_w5_fotih"), 0, 1.42, 0, 0, 12, 5],
  ["50", "soz", "صٰالِحْ",  "Solih",         A.md2("m19r8_w6_solih"), 0, 1.56, 0, 0, 12, 5],
  // R9: قَامَ طَافَ تَابَ قُولٖى طُوفٖى تُوبٖى — 3 past fe'l + 3 fem imperative
  ["51", "soz", "قٰامَ",   "Qoim bo'ldi",     A.md2("m19r9_w1_qom"),   0, 1.56, 0, 0, 12, 5],
  ["52", "soz", "طٰافَ",   "Aylandi",         A.md2("m19r9_w2_tof"),   0, 1.70, 0, 0, 12, 5],
  ["53", "soz", "تٰابَ",   "Tavba qildi",     A.md2("m19r9_w3_tob"),   0, 1.52, 0, 0, 12, 5],
  ["54", "soz", "قُولٖى",  "Ayt (a.)",        A.md2("m19r9_w4_quli"),  0, 1.63, 0, 0, 12, 5],
  ["55", "soz", "طُوفٖى",  "Aylan (a.)",      A.md2("m19r9_w5_tufi"),  0, 1.60, 0, 0, 12, 5],
  ["56", "soz", "تُوبٖى",  "Tavba qil (a.)",  A.md2("m19r9_w6_tubo"),  0, 1.51, 0, 0, 12, 5],
  // R10: يُقَالُ يُطَافُ تُتَابُ يَقُولُ تَقُومُ يَطُوفُ — passive/active imperfect
  ["57", "soz", "يُقٰالُ",  "Aytiladi",       A.md2("m19r10_w1_yuqolu"), 0, 1.52, 0, 0, 14, 5],
  ["58", "soz", "يُطٰافُ",  "Aylaniladi",     A.md2("m19r10_w2_yutofu"), 0, 1.53, 0, 0, 14, 5],
  ["59", "soz", "تُتٰابُ",  "Tavba qilinadi", A.md2("m19r10_w3_tutobu"), 0, 1.46, 0, 0, 14, 5],
  ["60", "soz", "يَقُولُ",  "Aytadi",         A.md2("m19r10_w4_yaqulu"), 0, 1.35, 0, 0, 14, 5],
  ["61", "soz", "تَقُومُ",  "Qoim bo'ladi",   A.md2("m19r10_w5_taqumu"), 0, 1.52, 0, 0, 14, 5],
  ["62", "soz", "يَطُوفُ",  "Aylanadi",       A.md2("m19r10_w6_yatufu"), 0, 1.47, 0, 0, 14, 5],
  // R11: يَتُوبَانِ يَقُولُونَ تَقُومُونَ يَطُوفُونَ تَقُولُونَ — dual + plural imperfect
  ["63", "soz", "يَتُوبٰانِ", "Ikkisi tavba qiladi", A.md2("m19r11_w1_yatuboni"), 0, 1.80, 0, 0, 16, 5],
  ["64", "soz", "يَقُولُونَ", "Aytadilar",          A.md2("m19r11_w2_yaquluna"), 0, 1.84, 0, 0, 16, 5],
  ["65", "soz", "تَقُومُونَ", "Qoim bo'lasizlar",   A.md2("m19r11_w3_taqumuna"), 0, 1.93, 0, 0, 16, 5],
  ["66", "soz", "يَطُوفُونَ", "Aylanadilar",        A.md2("m19r11_w4_yatufuna"), 0, 1.90, 0, 0, 16, 5],
  ["67", "soz", "تَقُولُونَ", "Aytasizlar",         A.md2("m19r11_w5_taquluna"), 0, 1.84, 0, 0, 16, 5],
  // R12: يَنْصُرُونَ تَدْخُلُونَ يَعْلَمُونَ تَعْمَلُونَ — plural imperfect (4 letter root)
  ["68", "soz", "يَنْصُرُونَ", "Yordam berishadi", A.md2("m19r12_w1_yansuruna"), 0, 2.38, 0, 0, 16, 5],
  ["69", "soz", "تَدْخُلُونَ", "Kirasizlar",       A.md2("m19r12_w2_tadhuluna"), 0, 1.99, 0, 0, 16, 5],
  ["70", "soz", "يَعْلَمُونَ", "Bilishadi",        A.md2("m19r12_w3_yalamuna"),  0, 2.02, 0, 0, 16, 5],
  ["71", "soz", "تَعْمَلُونَ", "Qilasizlar",       A.md2("m19r12_w4_tamaluna"),  0, 2.05, 0, 0, 16, 5],
];

// ============================================================
// PAGE 20 — Madlar words continued
// ============================================================
// PAGE 20 — Mad davomi: 4 section (15 + 18 ta + divider + 15 ta)
// Audio: 33. madli 02.mp3 — 03:04 dan 05:25 gacha. 48 ta chunk
// (`/audio/edit/33_madli_02/p20_NN_*.mp3`).
//
// Tartib (kitobga mos, RTL: o'ngdan chap):
//   Row 1 (4 ta):  يَشْهَدُونَ يَرْجِعُونَ تَضْرِبُونَ تَجْلِسُونَ
//   Row 2 (4 ta):  يُكْرِمُونَ تُسْلِمُونَ تُخْلِصُونَ تُكْرِمُونَ
//   Row 3 (4 ta):  يَنْصُرُونَ تَضْرِبُونَ يَجْتَمِعُونَ تَكْتَسِبُونَ
//   Row 4 (3 ta):  يَحْتَسِبُونَ تَسْتَشْهِدُونَ يَسْتَخْرِجُونَ
//   ───────────────
//   Row 5 (6 ta):  اُشْكُرَا اُنْصُرَا اِعْلَمَا اُشْكُرِى اُنْصُرِى اِعْلَمِى
//   Row 6 (4 ta):  مُكْرِمَانِ مُسْلِمَانِ مُخْلِصَانِ مُنْفِقَانِ
//   Row 7 (4 ta):  مُكْرِمُونَ مُسْلِمُونَ مُخْلِصُونَ مُنْفِقُونَ
//   Row 8 (4 ta):  مُسْلِمَاتْ مُخْلِصَاتْ مَنْصُورُونَ مَطْلُوبُونَ
//   ─── ya nuqtasiz divider: ي ، يـ = ى ───
//   Row 9 (6 ta):  مِيلْ نِيلْ فِيلْ حِينْ سِينْ شِينْ
//   Row 10 (5 ta): كَرِيمْ عَلِيمْ سَمِيعْ عَزِيزْ حَكِيمْ
//   Row 11 (4 ta): مِسْكِينْ مُعْطِيرْ عِفْرِيتْ اِدْرِيسْ
const p20: ED[] = [
  // ── Row 1 (4 ta uzun fe'l) ──
  ["01", "soz", "يَشْهَدُونَ",   "Guvohlik beradilar",     A.md2("p20_01_yashhaduuna"),     0, 2.10, 0, 0, 0, 0],
  ["02", "soz", "يَرْجِعُونَ",   "Qaytadilar",             A.md2("p20_03_yarjiuuna"),       0, 2.10, 0, 0, 0, 0],
  ["03", "soz", "تَضْرِبُونَ",   "Urasizlar",              A.md2("p20_02_tadribuuna_1"),    0, 2.00, 0, 0, 0, 0],
  ["04", "soz", "تَجْلِسُونَ",   "O'tirasizlar",           A.md2("p20_04_tajlisuuna"),      0, 2.00, 0, 0, 0, 0],
  // ── Row 2 (4 ta) ──
  ["05", "soz", "يُكْرِمُونَ",   "Hurmat qiladilar",       A.md2("p20_05_yukrimuuna"),      0, 1.80, 0, 0, 0, 0],
  ["06", "soz", "تُسْلِمُونَ",   "Salom berasizlar",       A.md2("p20_06_tuslimuuna"),      0, 1.95, 0, 0, 0, 0],
  ["07", "soz", "تُخْلِصُونَ",   "Ixlos qilasizlar",       A.md2("p20_07_tukhlisuuna"),     0, 2.10, 0, 0, 0, 0],
  ["08", "soz", "تُكْرِمُونَ",   "Hurmat qilasizlar",      A.md2("p20_08_tukrimuuna"),      0, 1.40, 0, 0, 0, 0],
  // ── Row 3 (4 ta) ──
  ["09", "soz", "يَنْصُرُونَ",   "Yordam beradilar",       A.md2("p20_09_yansuruuna"),      0, 2.40, 0, 0, 0, 0],
  ["10", "soz", "تَضْرِبُونَ",   "Urasizlar (takror)",     A.md2("p20_10_tadribuuna_2"),    0, 2.25, 0, 0, 0, 0],
  ["11", "soz", "يَجْتَمِعُونَ", "Yig'iladilar",           A.md2("p20_11_yajtamiuuna"),     0, 2.25, 0, 0, 0, 0],
  ["12", "soz", "تَكْتَسِبُونَ", "Kasb qilasizlar",        A.md2("p20_12_taktasibuuna"),    0, 1.70, 0, 0, 0, 0],
  // ── Row 4 (3 ta) ──
  ["13", "soz", "يَحْتَسِبُونَ", "Hisob qiladilar",        A.md2("p20_13_yahtasibuuna"),    0, 1.70, 0, 0, 0, 0],
  ["14", "soz", "تَسْتَشْهِدُونَ","Guvohlik so'raysizlar", A.md2("p20_14_tastashhaduuna"),  0, 2.70, 0, 0, 0, 0],
  ["15", "soz", "يَسْتَخْرِجُونَ","Chiqaradilar",          A.md2("p20_15_yastakhrijuuna"),  0, 1.65, 0, 0, 0, 0],

  // ── Row 5 (6 ta past dual/feminine fe'llar) ──
  ["16", "soz", "اُشْكُرَا",   "Ikkalangiz shukr qilinglar",   A.md2("p20_16_ushkuraa"),  0, 1.55, 0, 0, 0, 0],
  ["17", "soz", "اُنْصُرَا",   "Ikkalangiz yordam beringlar",  A.md2("p20_17_unsuraa"),   0, 2.05, 0, 0, 0, 0],
  ["18", "soz", "اِعْلَمَا",   "Ikkalangiz biling",            A.md2("p20_18_ilamaa"),    0, 1.70, 0, 0, 0, 0],
  ["19", "soz", "اُشْكُرِى",   "Sen (ayol) shukr qil",         A.md2("p20_19_ushkurii"),  0, 1.72, 0, 0, 0, 0],
  ["20", "soz", "اُنْصُرِى",   "Sen (ayol) yordam ber",        A.md2("p20_20_unsurii"),   0, 2.15, 0, 0, 0, 0],
  ["21", "soz", "اِعْلَمِى",   "Sen (ayol) bil",               A.md2("p20_21_ilamii"),    0, 1.80, 0, 0, 0, 0],
  // ── Row 6 (4 ta dual ism) ──
  ["22", "soz", "مُكْرِمَانِ", "Ikki hurmat qiluvchi",         A.md2("p20_22_mukrimaani"),  0, 1.85, 0, 0, 0, 0],
  ["23", "soz", "مُسْلِمَانِ", "Ikki musulmon",                A.md2("p20_23_muslimaani"),  0, 2.00, 0, 0, 0, 0],
  ["24", "soz", "مُخْلِصَانِ", "Ikki ixlosli",                 A.md2("p20_24_mukhlisaani"), 0, 2.05, 0, 0, 0, 0],
  ["25", "soz", "مُنْفِقَانِ", "Ikki sarflovchi",              A.md2("p20_25_munfiqaani"),  0, 2.45, 0, 0, 0, 0],
  // ── Row 7 (4 ta erkak ko'plik) ──
  ["26", "soz", "مُكْرِمُونَ", "Hurmat qiluvchilar",           A.md2("p20_26_mukrimuuna"),  0, 1.80, 0, 0, 0, 0],
  ["27", "soz", "مُسْلِمُونَ", "Musulmonlar",                  A.md2("p20_27_muslimuuna"),  0, 2.10, 0, 0, 0, 0],
  ["28", "soz", "مُخْلِصُونَ", "Ixlosli kishilar",             A.md2("p20_28_mukhlisuuna"), 0, 2.00, 0, 0, 0, 0],
  ["29", "soz", "مُنْفِقُونَ", "Sarflovchilar",                A.md2("p20_29_munfiquuna"),  0, 2.45, 0, 0, 0, 0],
  // ── Row 8 (4 ta — 2 ayol ko'plik + 2 passiv) ──
  ["30", "soz", "مُسْلِمَاتْ", "Musulma ayollar",              A.md2("p20_30_muslimaat"),   0, 1.95, 0, 0, 0, 0],
  ["31", "soz", "مُخْلِصَاتْ", "Ixlosli ayollar",              A.md2("p20_31_mukhlisaat"),  0, 1.95, 0, 0, 0, 0],
  ["32", "soz", "مَنْصُورُونَ", "Yordam berilganlar",          A.md2("p20_32_mansuuruuna"), 0, 2.35, 0, 0, 0, 0],
  ["33", "soz", "مَطْلُوبُونَ", "Talab qilinganlar",           A.md2("p20_33_matluubuuna"), 0, 2.20, 0, 0, 0, 0],

  // ── Row 9 (6 ta qisqa ya-mad so'z) ──
  ["34", "soz", "مِيلْ",   "Mil",                A.md2("p20_34_miil"),   0, 1.20, 0, 0, 0, 0],
  ["35", "soz", "نِيلْ",   "Nil",                A.md2("p20_35_niil"),   0, 1.35, 0, 0, 0, 0],
  ["36", "soz", "فِيلْ",   "Fil",                A.md2("p20_36_fiil"),   0, 1.25, 0, 0, 0, 0],
  ["37", "soz", "حِينْ",   "Vaqt",               A.md2("p20_37_hiin"),   0, 1.25, 0, 0, 0, 0],
  ["38", "soz", "سِينْ",   "Sin (harf)",         A.md2("p20_38_siin"),   0, 1.25, 0, 0, 0, 0],
  ["39", "soz", "شِينْ",   "Shin (harf)",        A.md2("p20_39_shiin"),  0, 1.35, 0, 0, 0, 0],
  // ── Row 10 (5 ta o'rta ya-mad so'z) ──
  ["40", "soz", "كَرِيمْ", "Saxiy",              A.md2("p20_40_kariim"), 0, 1.30, 0, 0, 0, 0],
  ["41", "soz", "عَلِيمْ", "Biluvchi",           A.md2("p20_41_aliim"),  0, 1.35, 0, 0, 0, 0],
  ["42", "soz", "سَمِيعْ", "Eshituvchi",         A.md2("p20_42_samii"),  0, 1.25, 0, 0, 0, 0],
  ["43", "soz", "عَزِيزْ", "Aziz",               A.md2("p20_43_aziiz"),  0, 1.45, 0, 0, 0, 0],
  ["44", "soz", "حَكِيمْ", "Hakim (donolik)",    A.md2("p20_44_hakiim"), 0, 1.40, 0, 0, 0, 0],
  // ── Row 11 (4 ta uzun ya-mad so'z) ──
  ["45", "soz", "مِسْكِينْ", "Miskin (kambag'al)", A.md2("p20_45_miskiin"), 0, 1.85, 0, 0, 0, 0],
  ["46", "soz", "مِعْطِيرْ", "Mi'tiyr (atir idish)", A.md2("p20_46_mutiir"),  0, 1.85, 0, 0, 0, 0],
  ["47", "soz", "عِفْرِيتْ", "Ifrit",              A.md2("p20_47_ifriit"),  0, 1.65, 0, 0, 0, 0],
  ["48", "soz", "اِدْرِيسْ", "Idris (ism)",        A.md2("p20_48_idriis"),  0, 1.70, 0, 0, 0, 0],
];

// ============================================================
// PAGE 21 — Mad davomi (15 so'z) + Tashdid boshlanishi (1+3+42 = 46 element)
// ============================================================
const p21: ED[] = [
  // ── Mad davomi (3 qator, 15 so'z) — manba: 33. madli 02.mp3 ────
  // Row 1: تَعْلِيمْ تَدْرِيسْ تَبْرِيكْ تَحْسِينْ
  ["m01", "soz", "تَعْلِيمْ",  "Ta'lim",     A.md2("m21r1_w1_talim"),    0, 2.17, 0, 0, 0, 0],
  ["m02", "soz", "تَدْرِيسْ",  "Tadris",     A.md2("m21r1_w2_tadris"),   0, 1.72, 0, 0, 0, 0],
  ["m03", "soz", "تَبْرِيكْ",  "Tabrik",     A.md2("m21r1_w3_tabrik"),   0, 1.37, 0, 0, 0, 0],
  ["m04", "soz", "تَحْسِينْ",  "Yaxshilash", A.md2("m21r1_w4_tahsin"),   0, 1.79, 0, 0, 0, 0],
  // Row 2: بِيعَة مِيلَة عِيشَة يَبِيعُ يَمِيلُ تَعِيشُ
  ["m05", "soz", "بِيعَة",    "Sotish",      A.md2("m21r2_w1_biya"),     0, 1.23, 0, 0, 0, 0],
  ["m06", "soz", "مِيلَة",    "Egilish",     A.md2("m21r2_w2_mila"),     0, 1.29, 0, 0, 0, 0],
  ["m07", "soz", "عِيشَة",    "Yashash",     A.md2("m21r2_w3_isha"),     0, 1.26, 0, 0, 0, 0],
  ["m08", "soz", "يَبِيعُ",   "Sotadi",      A.md2("m21r2_w4_yabi"),     0, 1.35, 0, 0, 0, 0],
  ["m09", "soz", "يَمِيلُ",   "Egiladi",     A.md2("m21r2_w5_yamil"),    0, 1.36, 0, 0, 0, 0],
  ["m10", "soz", "تَعِيشُ",   "Yashaysan",   A.md2("m21r2_w6_taish"),    0, 1.33, 0, 0, 0, 0],
  // Row 3: تَبِيعِينَ تَوَارِيخْ تَرَاوِيح مُكْرَمِينَ مُسْلِمِينَ
  ["m11", "soz", "تَبِيعِينَ", "Sotasan (a)", A.md2("m21r3_w1_tabiin"),   0, 1.74, 0, 0, 0, 0],
  ["m12", "soz", "تَوَارِيخْ", "Tariхlar",    A.md2("m21r3_w2_tawarikh"), 0, 1.77, 0, 0, 0, 0],
  ["m13", "soz", "تَرَاوِيحْ", "Tarovih",     A.md2("m21r3_w3_tarawih"),  0, 2.03, 0, 0, 0, 0],
  ["m14", "soz", "مُكْرَمِينَ","Hurmatlilar", A.md2("m21r3_w4_mukramin"), 0, 1.97, 0, 0, 0, 0],
  ["m15", "soz", "مُسْلِمِينَ","Musulmonlar", A.md2("m21r3_w5_muslimin"), 0, 2.00, 0, 0, 0, 0],

  // ── Tashdid boshlanishi — manba: 34. tashdid.mp3 ────
  // Sarlavha + tushuntirish (audio narration)
  ["t_intro", "jumla", "تشدیدلی حرفلر", "Tashdidli harflar ustiga ushbu tashdid alomatlari qoʻyilgan harflar ikkilantirib oʻqiladi",
    A.td("t_intro"), 0, 7.75, 0, 0, 0, 0],
  // 3 ربب misoli: رَبَّ — رَبِّ — رَبُّ (kitobda har biri yonida (رَبْبَ) shakli)
  ["t_rab1", "soz", "رَبَّ", "Rabba (= رَبْبَ)", A.td("t_rab1_rabba"), 0, 0.90, 0, 0, 0, 0],
  ["t_rab2", "soz", "رَبِّ", "Rabbi (= رَبْبِ)", A.td("t_rab2_rabbi"), 0, 0.95, 0, 0, 0, 0],
  ["t_rab3", "soz", "رَبُّ", "Rabbu (= رَبْبُ)", A.td("t_rab3_rabbu"), 0, 0.95, 0, 0, 0, 0],
  // Row 1 (fatha+tashdid+fatha): اِنَّ اَنَّ اَمَّ بَرَّ جَرَّ حَجَّ شَكَّ
  ["t11", "soz", "اِنَّ", "Inna",   A.td("t_r1_w1_inna"),   0, 1.55, 0, 0, 0, 0],
  ["t12", "soz", "اَنَّ", "Anna",   A.td("t_r1_w2_anna"),   0, 1.25, 0, 0, 0, 0],
  ["t13", "soz", "اَمَّ", "Amma",   A.td("t_r1_w3_amma"),   0, 1.27, 0, 0, 0, 0],
  ["t14", "soz", "بَرَّ", "Barra",  A.td("t_r1_w4_barra"),  0, 1.11, 0, 0, 0, 0],
  ["t15", "soz", "جَرَّ", "Jarra",  A.td("t_r1_w5_jarra"),  0, 1.14, 0, 0, 0, 0],
  ["t16", "soz", "حَجَّ", "Hajja",  A.td("t_r1_w6_hajja"),  0, 1.12, 0, 0, 0, 0],
  ["t17", "soz", "شَكَّ", "Shakka", A.td("t_r1_w7_shakka"), 0, 1.18, 0, 0, 0, 0],
  // Row 2 (fatha+tashdid+damma): بَرُّ جَرُّ حَجُّ شَكُّ ذَمُّ حَقُّ شَرُّ
  ["t21", "soz", "بَرُّ", "Barru",  A.td("t_r2_w1_barru"),  0, 1.01, 0, 0, 0, 0],
  ["t22", "soz", "جَرُّ", "Jarru",  A.td("t_r2_w2_jarru"),  0, 1.11, 0, 0, 0, 0],
  ["t23", "soz", "حَجُّ", "Hajju",  A.td("t_r2_w3_hajju"),  0, 1.08, 0, 0, 0, 0],
  ["t24", "soz", "شَكُّ", "Shakku", A.td("t_r2_w4_shakku"), 0, 1.16, 0, 0, 0, 0],
  ["t25", "soz", "ذَمُّ", "Zammu",  A.td("t_r2_w5_zammu"),  0, 1.52, 0, 0, 0, 0],
  ["t26", "soz", "حَقُّ", "Haqqu",  A.td("t_r2_w6_haqqu"),  0, 1.11, 0, 0, 0, 0],
  ["t27", "soz", "شَرُّ", "Sharru", A.td("t_r2_w7_sharru"), 0, 1.09, 0, 0, 0, 0],
  // Row 3 (kasra+tashdid+damma): بِرُّ سِرُّ سِتُّ عِزُّ طِلُّ حِلُّ حِسُّ
  ["t31", "soz", "بِرُّ", "Birru",  A.td("t_r3_w1_birru"),  0, 1.06, 0, 0, 0, 0],
  ["t32", "soz", "سِرُّ", "Sirru",  A.td("t_r3_w2_sirru"),  0, 1.08, 0, 0, 0, 0],
  ["t33", "soz", "سِتُّ", "Sittu",  A.td("t_r3_w3_sittu"),  0, 1.12, 0, 0, 0, 0],
  ["t34", "soz", "عِزُّ", "Izzu",   A.td("t_r3_w4_izzu"),   0, 1.08, 0, 0, 0, 0],
  ["t35", "soz", "طِلُّ", "Tillu",  A.td("t_r3_w5_tillu"),  0, 1.03, 0, 0, 0, 0],
  ["t36", "soz", "حِلُّ", "Hillu",  A.td("t_r3_w6_hillu"),  0, 1.18, 0, 0, 0, 0],
  ["t37", "soz", "حِسُّ", "Hissu",  A.td("t_r3_w7_hissu"),  0, 1.10, 0, 0, 0, 0],
  // Row 4 (damma+tashdid+damma): بُرُّ دُرُّ خُفُّ كُلُّ دُبُّ زُقُّ اُمُّ
  ["t41", "soz", "بُرُّ", "Burru",  A.td("t_r4_w1_burru"),  0, 0.97, 0, 0, 0, 0],
  ["t42", "soz", "دُرُّ", "Durru",  A.td("t_r4_w2_durru"),  0, 1.11, 0, 0, 0, 0],
  ["t43", "soz", "خُفُّ", "Khuffu", A.td("t_r4_w3_khuffu"), 0, 1.07, 0, 0, 0, 0],
  ["t44", "soz", "كُلُّ", "Kullu",  A.td("t_r4_w4_kullu"),  0, 1.12, 0, 0, 0, 0],
  ["t45", "soz", "دُبُّ", "Dubbu",  A.td("t_r4_w5_dubbu"),  0, 1.16, 0, 0, 0, 0],
  ["t46", "soz", "زُقُّ", "Zuqqu",  A.td("t_r4_w6_zuqqu"),  0, 1.20, 0, 0, 0, 0],
  ["t47", "soz", "اُمُّ", "Ummu",   A.td("t_r4_w7_ummu"),   0, 1.44, 0, 0, 0, 0],
  // Row 5 (damma+tashdid+fatha): بُرَّ ذُمَّ سُبَّ فُكَّ سُرَّ سُمَّ ثُمَّ
  ["t51", "soz", "بُرَّ", "Burra",  A.td("t_r5_w1_burra"),  0, 1.04, 0, 0, 0, 0],
  ["t52", "soz", "ذُمَّ", "Zumma",  A.td("t_r5_w2_zumma"),  0, 1.75, 0, 0, 0, 0],
  ["t53", "soz", "سُبَّ", "Subba",  A.td("t_r5_w3_subba"),  0, 1.10, 0, 0, 0, 0],
  ["t54", "soz", "فُكَّ", "Fukka",  A.td("t_r5_w4_fukka"),  0, 1.10, 0, 0, 0, 0],
  ["t55", "soz", "سُرَّ", "Surra",  A.td("t_r5_w5_surra"),  0, 1.07, 0, 0, 0, 0],
  ["t56", "soz", "سُمَّ", "Summa",  A.td("t_r5_w6_summa"),  0, 1.46, 0, 0, 0, 0],
  ["t57", "soz", "ثُمَّ", "Thumma", A.td("t_r5_w7_thumma"), 0, 1.64, 0, 0, 0, 0],
  // Row 6 (damma+tashdid+kasra): بُرِّ دُرِّ خُفِّ كُلِّ دُبِّ زُقِّ ضُرِّ
  ["t61", "soz", "بُرِّ", "Burri",  A.td("t_r6_w1_burri"),  0, 1.00, 0, 0, 0, 0],
  ["t62", "soz", "دُرِّ", "Durri",  A.td("t_r6_w2_durri"),  0, 1.01, 0, 0, 0, 0],
  ["t63", "soz", "خُفِّ", "Khuffi", A.td("t_r6_w3_khuffi"), 0, 1.08, 0, 0, 0, 0],
  ["t64", "soz", "كُلِّ", "Kulli",  A.td("t_r6_w4_kulli"),  0, 1.01, 0, 0, 0, 0],
  ["t65", "soz", "دُبِّ", "Dubbi",  A.td("t_r6_w5_dubbi"),  0, 1.16, 0, 0, 0, 0],
  ["t66", "soz", "زُقِّ", "Zuqqi",  A.td("t_r6_w6_zuqqi"),  0, 1.14, 0, 0, 0, 0],
  ["t67", "soz", "ضُرِّ", "Zurri",  A.td("t_r6_w7_zurri"),  0, 1.06, 0, 0, 0, 0],
];

// ============================================================
// PAGE 22 — Tashdid mashqi: 10 qator × 6 so'z = 60 element
// Audio: 34. tashdid.mp3 (1:47.5–4:04.0), chunklar 34_tashdid/p22_*
// R1-R4: fatha+tashdid+fatha — past fe'l aktiv (faaala)
// R5-R8: damma+tashdid+kasra — passive shakli (fuiila)
// R9-R10: تَفَعَّلَ (Form V) past fe'l, oxiri sukun bilan
// ============================================================
const p22: ED[] = [
  // ─── Row 1 (aktiv): دَبَّرَ كَثَّرَ فَجَّرَ وَحَّدَ سَخَّرَ أَدَّبَ ───
  ["r1_w1", "soz", "دَبَّرَ",  "Rejaladi",         A.td("p22_r1_w1_dabbara"),   0, 1.25, 0, 0, 0, 0],
  ["r1_w2", "soz", "كَثَّرَ",  "Koʻpaytirdi",      A.td("p22_r1_w2_kaththara"), 0, 1.14, 0, 0, 0, 0],
  ["r1_w3", "soz", "فَجَّرَ",  "Yorildi",           A.td("p22_r1_w3_fajjara"),   0, 1.66, 0, 0, 0, 0],
  ["r1_w4", "soz", "وَحَّدَ",  "Birlashtirdi",     A.td("p22_r1_w4_wahhada"),   0, 1.25, 0, 0, 0, 0],
  ["r1_w5", "soz", "سَخَّرَ",  "Boʻysundirdi",     A.td("p22_r1_w5_sakhkhara"), 0, 1.22, 0, 0, 0, 0],
  ["r1_w6", "soz", "أَدَّبَ",  "Tarbiyaladi",      A.td("p22_r1_w6_addaba"),    0, 1.13, 0, 0, 0, 0],
  // ─── Row 2: حَرَّمَ رَزَّقَ يَسَّرَ بَشَّرَ فَصَّلَ فَضَّلَ ───
  ["r2_w1", "soz", "حَرَّمَ",  "Man qildi",        A.td("p22_r2_w1_harrama"),   0, 1.13, 0, 0, 0, 0],
  ["r2_w2", "soz", "رَزَّقَ",  "Rizq berdi",       A.td("p22_r2_w2_razzaqa"),   0, 1.27, 0, 0, 0, 0],
  ["r2_w3", "soz", "يَسَّرَ",  "Osonlashtirdi",    A.td("p22_r2_w3_yassara"),   0, 1.20, 0, 0, 0, 0],
  ["r2_w4", "soz", "بَشَّرَ",  "Xushxabar berdi",  A.td("p22_r2_w4_bashshara"), 0, 1.21, 0, 0, 0, 0],
  ["r2_w5", "soz", "فَصَّلَ",  "Batafsil bayon qildi", A.td("p22_r2_w5_fassala"), 0, 1.16, 0, 0, 0, 0],
  ["r2_w6", "soz", "فَضَّلَ",  "Ustun qildi",      A.td("p22_r2_w6_faddala"),   0, 1.23, 0, 0, 0, 0],
  // ─── Row 3: عَطَّرَ عَظَّمَ نَعَّمَ كَفَّنَ لَقَّبَ ذَكَّرَ ───
  ["r3_w1", "soz", "عَطَّرَ",  "Xushboʻy qildi",   A.td("p22_r3_w1_attara"),    0, 1.17, 0, 0, 0, 0],
  ["r3_w2", "soz", "عَظَّمَ",  "Ulugʻladi",        A.td("p22_r3_w2_azzama"),    0, 1.25, 0, 0, 0, 0],
  ["r3_w3", "soz", "نَعَّمَ",  "Huzur berdi",      A.td("p22_r3_w3_naama"),     0, 1.32, 0, 0, 0, 0],
  ["r3_w4", "soz", "كَفَّنَ",  "Kafanladi",        A.td("p22_r3_w4_kaffana"),   0, 1.18, 0, 0, 0, 0],
  ["r3_w5", "soz", "لَقَّبَ",  "Laqab berdi",      A.td("p22_r3_w5_laqqaba"),   0, 1.20, 0, 0, 0, 0],
  ["r3_w6", "soz", "ذَكَّرَ",  "Eslatdi",          A.td("p22_r3_w6_dhakkara"),  0, 1.19, 0, 0, 0, 0],
  // ─── Row 4: شَمَّرَ عَلَّمَ كَمَّلَ صَنَّفَ صَوَّرَ غَيَّرَ ───
  ["r4_w1", "soz", "شَمَّرَ",  "Tirishdi",         A.td("p22_r4_w1_shammara"),  0, 1.53, 0, 0, 0, 0],
  ["r4_w2", "soz", "عَلَّمَ",  "Oʻrgatdi",         A.td("p22_r4_w2_allama"),    0, 1.18, 0, 0, 0, 0],
  ["r4_w3", "soz", "كَمَّلَ",  "Mukammal qildi",   A.td("p22_r4_w3_kammala"),   0, 1.44, 0, 0, 0, 0],
  ["r4_w4", "soz", "صَنَّفَ",  "Tasnifladi",       A.td("p22_r4_w4_sannafa"),   0, 1.69, 0, 0, 0, 0],
  ["r4_w5", "soz", "صَوَّرَ",  "Suratga oldi",     A.td("p22_r4_w5_sawwara"),   0, 1.25, 0, 0, 0, 0],
  ["r4_w6", "soz", "غَيَّرَ",  "Oʻzgartirdi",      A.td("p22_r4_w6_ghayyara"),  0, 1.32, 0, 0, 0, 0],

  // ─── Row 5 (passiv): دُبِّرَ كُثِّرَ فُجِّرَ وُحِّدَ سُخِّرَ أُدِّبَ ───
  ["r5_w1", "soz", "دُبِّرَ",  "Rejalandi",        A.td("p22_r5_w1_dubbira"),   0, 1.24, 0, 0, 0, 0],
  ["r5_w2", "soz", "كُثِّرَ",  "Koʻpaytirildi",    A.td("p22_r5_w2_kuththira"), 0, 1.10, 0, 0, 0, 0],
  ["r5_w3", "soz", "فُجِّرَ",  "Yorildirildi",     A.td("p22_r5_w3_fujjira"),   0, 1.11, 0, 0, 0, 0],
  ["r5_w4", "soz", "وُحِّدَ",  "Birlashtirildi",   A.td("p22_r5_w4_wuhhida"),   0, 1.25, 0, 0, 0, 0],
  ["r5_w5", "soz", "سُخِّرَ",  "Boʻysundirildi",   A.td("p22_r5_w5_sukhkhira"), 0, 1.23, 0, 0, 0, 0],
  ["r5_w6", "soz", "أُدِّبَ",  "Tarbiyalandi",     A.td("p22_r5_w6_uddiba"),    0, 1.08, 0, 0, 0, 0],
  // ─── Row 6: حُرِّمَ رُزِّقَ يُسِّرَ بُشِّرَ فُصِّلَ فُضِّلَ ───
  ["r6_w1", "soz", "حُرِّمَ",  "Man qilindi",      A.td("p22_r6_w1_hurrima"),   0, 1.02, 0, 0, 0, 0],
  ["r6_w2", "soz", "رُزِّقَ",  "Rizq berildi",     A.td("p22_r6_w2_ruzziqa"),   0, 1.24, 0, 0, 0, 0],
  ["r6_w3", "soz", "يُسِّرَ",  "Osonlashtirildi",  A.td("p22_r6_w3_yussira"),   0, 1.22, 0, 0, 0, 0],
  ["r6_w4", "soz", "بُشِّرَ",  "Xushxabar berildi",A.td("p22_r6_w4_bushshira"), 0, 1.14, 0, 0, 0, 0],
  ["r6_w5", "soz", "فُصِّلَ",  "Batafsil qilindi", A.td("p22_r6_w5_fussila"),   0, 1.10, 0, 0, 0, 0],
  ["r6_w6", "soz", "فُضِّلَ",  "Ustun qilindi",    A.td("p22_r6_w6_fuddila"),   0, 1.18, 0, 0, 0, 0],
  // ─── Row 7: عُطِّرَ عُظِّمَ نُعِّمَ كُفِّنَ لُقِّبَ ذُكِّرَ ───
  ["r7_w1", "soz", "عُطِّرَ",  "Xushboʻy qilindi", A.td("p22_r7_w1_uttira"),    0, 1.16, 0, 0, 0, 0],
  ["r7_w2", "soz", "عُظِّمَ",  "Ulugʻlandi",       A.td("p22_r7_w2_uzzima"),    0, 1.23, 0, 0, 0, 0],
  ["r7_w3", "soz", "نُعِّمَ",  "Huzur berildi",    A.td("p22_r7_w3_nuima"),     0, 1.26, 0, 0, 0, 0],
  ["r7_w4", "soz", "كُفِّنَ",  "Kafanlandi",       A.td("p22_r7_w4_kuffina"),   0, 1.11, 0, 0, 0, 0],
  ["r7_w5", "soz", "لُقِّبَ",  "Laqab berildi",    A.td("p22_r7_w5_luqqiba"),   0, 1.13, 0, 0, 0, 0],
  ["r7_w6", "soz", "ذُكِّرَ",  "Eslatildi",        A.td("p22_r7_w6_dhukkira"),  0, 1.27, 0, 0, 0, 0],
  // ─── Row 8: عُلِّمَ كُمِّلَ شُمِّرَ صُنِّفَ صُوِّرَ غُيِّرَ ───
  ["r8_w1", "soz", "عُلِّمَ",  "Oʻrgatildi",       A.td("p22_r8_w1_ullima"),    0, 1.12, 0, 0, 0, 0],
  ["r8_w2", "soz", "كُمِّلَ",  "Mukammal qilindi", A.td("p22_r8_w2_kummila"),   0, 1.43, 0, 0, 0, 0],
  ["r8_w3", "soz", "شُمِّرَ",  "Tayyorlandi",      A.td("p22_r8_w3_shummira"),  0, 1.64, 0, 0, 0, 0],
  ["r8_w4", "soz", "صُنِّفَ",  "Tasniflandi",      A.td("p22_r8_w4_sunnifa"),   0, 1.58, 0, 0, 0, 0],
  ["r8_w5", "soz", "صُوِّرَ",  "Tasvirlandi",      A.td("p22_r8_w5_suwwira"),   0, 1.21, 0, 0, 0, 0],
  ["r8_w6", "soz", "غُيِّرَ",  "Oʻzgartirildi",    A.td("p22_r8_w6_ghuyyira"),  0, 1.25, 0, 0, 0, 0],

  // ─── Row 9 (Form V past fe'l): تَدَبُّرْ تَكَبُّرْ تَحَجُّرْ تَوَحُّدْ تَسَخُّنْ تَبَدُّلْ ───
  ["r9_w1", "soz", "تَدَبُّرْ", "Mulohaza qilish",   A.td("p22_r9_w1_tadabbur"),   0, 1.18, 0, 0, 0, 0],
  ["r9_w2", "soz", "تَكَبُّرْ", "Kibrlanish",        A.td("p22_r9_w2_takabbur"),   0, 1.21, 0, 0, 0, 0],
  ["r9_w3", "soz", "تَحَجُّرْ", "Toshqotish",        A.td("p22_r9_w3_tahajjur"),   0, 1.32, 0, 0, 0, 0],
  ["r9_w4", "soz", "تَوَحُّدْ", "Yagonalashish",     A.td("p22_r9_w4_tawahhud"),   0, 1.36, 0, 0, 0, 0],
  ["r9_w5", "soz", "تَسَخُّنْ", "Qizib ketish",      A.td("p22_r9_w5_tasakhkhun"), 0, 1.85, 0, 0, 0, 0],
  ["r9_w6", "soz", "تَبَدُّلْ", "Oʻzgarish",         A.td("p22_r9_w6_tabaddul"),   0, 1.55, 0, 0, 0, 0],
  // ─── Row 10: تَحَرُّزْ تَعَزُّزْ تَيَسُّرْ تَعَشُّقْ تَعَصُّبْ تَفَضُّلْ ───
  ["r10_w1", "soz", "تَحَرُّزْ", "Saqlanish",        A.td("p22_r10_w1_taharruz"),  0, 1.32, 0, 0, 0, 0],
  ["r10_w2", "soz", "تَعَزُّزْ", "Aziz boʻlish",     A.td("p22_r10_w2_taazzuz"),   0, 1.42, 0, 0, 0, 0],
  ["r10_w3", "soz", "تَيَسُّرْ", "Osonlashish",      A.td("p22_r10_w3_tayassur"),  0, 1.22, 0, 0, 0, 0],
  ["r10_w4", "soz", "تَعَشُّقْ", "Sevib qolish",     A.td("p22_r10_w4_taashshuq"), 0, 1.24, 0, 0, 0, 0],
  ["r10_w5", "soz", "تَعَصُّبْ", "Taassub",          A.td("p22_r10_w5_taassub"),   0, 1.33, 0, 0, 0, 0],
  ["r10_w6", "soz", "تَفَضُّلْ", "Marhamat",         A.td("p22_r10_w6_tafaddul"),  0, 1.49, 0, 0, 0, 0],
];

// ============================================================
// PAGE 23 — Tashdid davomi (40 so'z) + Tanvin boshlanishi
// Tashdid manba: 34. tashdid.mp3 ning 4:06-5:53 qismi.
//   R1-R2: V bob masdari (تَفَعُّلْ) — 6 + 5 = 11 so'z
//   R3-R6: V bob ism fail (مُتَفَعِّلْ) — 4 × 5 = 20 so'z
//   R7:    IX bob (اِفْعَلَّ — ranglar/holatlar) — 5 so'z
//   R8:    X bob idgham (اِسْتَفْعَلَ tashdid bilan) — 4 so'z
// Tanvin manba: 35. tanvin.mp3 ning 0:02-0:16 qismi (intro + an/in/un).
// ============================================================
const p23: ED[] = [
  // ── R1: V bob masdari (تَفَعُّلْ) — 6 so'z ──
  ["t01", "soz", "تَوَطُّرْ", "Tavatturr",   A.td("p23_r1_w1_tawatturr"), 0, 1.15, 0, 0, 0, 0],
  ["t02", "soz", "تَنَعُّمْ", "Tana'um",     A.td("p23_r1_w2_tanaum"),    0, 1.35, 0, 0, 0, 0],
  ["t03", "soz", "تَوَغُّلْ", "Tavaghghul",  A.td("p23_r1_w3_tawaghul"),  0, 1.37, 0, 0, 0, 0],
  ["t04", "soz", "تَنَفُّسْ", "Tanaffus",    A.td("p23_r1_w4_tanaffus"),  0, 1.46, 0, 0, 0, 0],
  ["t05", "soz", "تَرَقُّبْ", "Taraqqub",    A.td("p23_r1_w5_taraqqub"),  0, 1.32, 0, 0, 0, 0],
  ["t06", "soz", "تَفَكُّرْ", "Tafakkur",    A.td("p23_r1_w6_tafakkur"),  0, 1.22, 0, 0, 0, 0],
  // ── R2: V bob masdari davomi — 5 so'z ──
  ["t07", "soz", "تَعَلُّمْ", "Ta'allum",    A.td("p23_r2_w1_taallum"),   0, 1.34, 0, 0, 0, 0],
  ["t08", "soz", "تَكَمُّلْ", "Takammul",    A.td("p23_r2_w2_takammul"),  0, 1.65, 0, 0, 0, 0],
  ["t09", "soz", "تَفَنُّنْ", "Tafannun",    A.td("p23_r2_w3_tafannun"),  0, 1.77, 0, 0, 0, 0],
  ["t10", "soz", "تَصَوُّرْ", "Tasavvur",    A.td("p23_r2_w4_tasawwur"),  0, 1.32, 0, 0, 0, 0],
  ["t11", "soz", "تَغَيُّرْ", "Tag'ayyur",   A.td("p23_r2_w5_taghayyur"), 0, 1.34, 0, 0, 0, 0],
  // ── R3: V bob ism fail (مُتَفَعِّلْ) — 5 so'z ──
  ["t12", "soz", "مُتَكَبِّرْ", "Mutakabbir",   A.td("p23_r3_w1_mutakabbir"),    0, 1.60, 0, 0, 0, 0],
  ["t13", "soz", "مُتَكَثِّرْ", "Mutakaththir", A.td("p23_r3_w2_mutakaththir"),  0, 1.59, 0, 0, 0, 0],
  ["t14", "soz", "مُتَحَجِّرْ", "Mutahajjir",   A.td("p23_r3_w3_mutahajjir"),    0, 1.60, 0, 0, 0, 0],
  ["t15", "soz", "مُتَوَحِّدْ", "Mutavahhid",   A.td("p23_r3_w4_mutawahhid"),    0, 1.66, 0, 0, 0, 0],
  ["t16", "soz", "مُتَسَخِّنْ", "Mutasakhkhin", A.td("p23_r3_w5_mutasakhkhin"),  0, 1.63, 0, 0, 0, 0],
  // ── R4: V bob ism fail davomi — 5 so'z ──
  ["t17", "soz", "مُتَبَدِّلْ", "Mutabaddil",   A.td("p23_r4_w1_mutabaddil"),    0, 1.66, 0, 0, 0, 0],
  ["t18", "soz", "مُتَهَذِّبْ", "Mutahadhdhib", A.td("p23_r4_w2_mutahadhdhib"),  0, 1.72, 0, 0, 0, 0],
  ["t19", "soz", "مُتَحَرِّزْ", "Mutaharriz",   A.td("p23_r4_w3_mutaharriz"),    0, 1.66, 0, 0, 0, 0],
  ["t20", "soz", "مُتَعَزِّزْ", "Muta'azziz",   A.td("p23_r4_w4_mutaazziz"),     0, 1.89, 0, 0, 0, 0],
  ["t21", "soz", "مُتَيَسِّرْ", "Mutayassir",   A.td("p23_r4_w5_mutayassir"),    0, 1.63, 0, 0, 0, 0],
  // ── R5: V bob ism fail davomi — 5 so'z ──
  ["t22", "soz", "مُتَوَطِّنْ", "Mutavattin",   A.td("p23_r5_w1_mutawattin"),    0, 1.67, 0, 0, 0, 0],
  ["t23", "soz", "مُتَنَعِّمْ", "Mutana'im",    A.td("p23_r5_w2_mutanaim"),      0, 1.78, 0, 0, 0, 0],
  ["t24", "soz", "مُتَوَغِّلْ", "Mutavaghghil", A.td("p23_r5_w3_mutawaghil"),    0, 1.72, 0, 0, 0, 0],
  ["t25", "soz", "مُتَنَفِّسْ", "Mutanaffis",   A.td("p23_r5_w4_mutanaffis"),    0, 1.76, 0, 0, 0, 0],
  ["t26", "soz", "مُتَفَكِّرْ", "Mutafakkir",   A.td("p23_r5_w5_mutafakkir"),    0, 1.61, 0, 0, 0, 0],
  // ── R6: V bob ism fail davomi — 5 so'z ──
  ["t27", "soz", "مُتَعَلِّمْ", "Muta'allim",   A.td("p23_r6_w1_mutaallim"),     0, 1.82, 0, 0, 0, 0],
  ["t28", "soz", "مُتَكَمِّلْ", "Mutakammil",   A.td("p23_r6_w2_mutakammil"),    0, 2.12, 0, 0, 0, 0],
  ["t29", "soz", "مُتَفَنِّنْ", "Mutafannin",   A.td("p23_r6_w3_mutafannin"),    0, 2.25, 0, 0, 0, 0],
  ["t30", "soz", "مُتَصَوِّرْ", "Mutasavvir",   A.td("p23_r6_w4_mutasawwir"),    0, 1.66, 0, 0, 0, 0],
  ["t31", "soz", "مُتَغَيِّرْ", "Mutag'ayyir",  A.td("p23_r6_w5_mutaghayyir"),   0, 1.66, 0, 0, 0, 0],
  // ── R7: IX bob ranglar/holatlar (اِفْعَلَّ) — 5 so'z ──
  ["t32", "soz", "اِسْوَدَّ", "Iswadda",  A.td("p23_r7_w1_iswadda"),  0, 1.43, 0, 0, 0, 0],
  ["t33", "soz", "اِصْفَرَّ", "Isfarra",  A.td("p23_r7_w2_isfarra"),  0, 1.45, 0, 0, 0, 0],
  ["t34", "soz", "اِحْمَرَّ", "Ihmarra",  A.td("p23_r7_w3_ihmarra"),  0, 1.48, 0, 0, 0, 0],
  ["t35", "soz", "اِغْتَرَّ", "Ightarra", A.td("p23_r7_w4_ightarra"), 0, 1.45, 0, 0, 0, 0],
  ["t36", "soz", "اِهْتَزَّ", "Ihtazza",  A.td("p23_r7_w5_ihtazza"),  0, 1.52, 0, 0, 0, 0],
  // ── R8: X bob idgham bilan (اِسْتَفْعَلَ + tashdid) — 4 so'z ──
  ["t37", "soz", "اِسْتَرَدَّ", "Istaradda", A.td("p23_r8_w1_istaradda"), 0, 1.59, 0, 0, 0, 0],
  ["t38", "soz", "اِسْتَحَبَّ", "Istahabba", A.td("p23_r8_w2_istahabba"), 0, 1.68, 0, 0, 0, 0],
  ["t39", "soz", "اِسْتَحَلَّ", "Istahalla", A.td("p23_r8_w3_istahalla"), 0, 1.79, 0, 0, 0, 0],
  ["t40", "soz", "اِسْتَدَلَّ", "Istadalla", A.td("p23_r8_w4_istadalla"), 0, 1.71, 0, 0, 0, 0],

  // ── Tanvin boshlanishi ──
  // Title button — intro narration: "Tanvinli harflar ustida bu uch tanvin
  // alomatlarining biri qoʻyilgan harflardan soʻng bir sukunli nun artirib
  // oʻqiladi". Click bilan to'liq audio (7.47s) ijro etiladi.
  ["tn_intro", "jumla", "تنوينلي حرفلر",
    "Tanvinli harflar ustida bu uch tanvin alomatlarining biri qoʻyilgan harflardan soʻng bir sukunli nun ortirib oʻqiladi.",
    A.tn("p23_intro_tanvin"), 0, 9.10, 0, 0, 0, 0],
  // 3 tanvin shakllari — har biri tegishli "an/in/un" tovushini ijro etadi
  ["tn_fath", "harf", "ـً", "Fathali tanvin (an)", A.tn("p23_an_demo"), 0, 0.64, 0, 0, 0, 0],
  ["tn_kasr", "harf", "ـٍ", "Kasrali tanvin (in)", A.tn("p23_in_demo"), 0, 0.68, 0, 0, 0, 0],
  ["tn_damm", "harf", "ـٌ", "Dammali tanvin (un)", A.tn("p23_un_demo"), 0, 0.72, 0, 0, 0, 0],
  // 3 misol juftliklari (A=(AN)) — "alif fatha tanvin = an" pattern
  ["tn_an", "bogin", "اً", "An (= اَنْ)", A.tn("p23_an_demo"), 0, 0.64, 0, 0, 0, 0],
  ["tn_in", "bogin", "اٍ", "In (= اِنْ)", A.tn("p23_in_demo"), 0, 0.68, 0, 0, 0, 0],
  ["tn_un", "bogin", "اٌ", "Un (= اُنْ)", A.tn("p23_un_demo"), 0, 0.72, 0, 0, 0, 0],
];

// ============================================================
// PAGE 24 — Tanvin alifboi (28×3 = 84 syllable) + 30 so'z
// ============================================================
// Yuqori bo'lim: 3 ta blok × 28 ta tanvin syllable
//   Block 1 (R1-R3): fatha tanvin -an (`اً بًا تًا...`)
//   Block 2 (R4-R6): kasra tanvin -in (`اٍ بٍ تٍ...`)
//   Block 3 (R7-R9): damma tanvin -un (`اٌ بٌ تٌ...`)
// Pastki bo'lim (R10-R14): 30 ta misol so'z (5 qator × 6) — har juftlik
// raf'/jarr/nasb yoki turli holatlar.
// Audio: 35. tanvin.mp3 (3:10) ning 20.4-189.7s qismi (23-sahifadan keyin).
const p24: ED[] = [
  // ── Block 1: fatha tanvin (-an), R1 (9 ta) ──
  ["r1_01", "bogin", "اً",  "an",   A.tn("p24_r1_01_alif_an"),  0, 0.69, 0, 0, 0, 0],
  ["r1_02", "bogin", "بًا", "ban",  A.tn("p24_r1_02_ba_an"),    0, 0.70, 0, 0, 0, 0],
  ["r1_03", "bogin", "تًا", "tan",  A.tn("p24_r1_03_ta_an"),    0, 0.66, 0, 0, 0, 0],
  ["r1_04", "bogin", "ثًا", "tsan", A.tn("p24_r1_04_tsa_an"),   0, 0.65, 0, 0, 0, 0],
  ["r1_05", "bogin", "جًا", "jan",  A.tn("p24_r1_05_jim_an"),   0, 0.78, 0, 0, 0, 0],
  ["r1_06", "bogin", "حًا", "han",  A.tn("p24_r1_06_ha_an"),    0, 0.76, 0, 0, 0, 0],
  ["r1_07", "bogin", "خًا", "khan", A.tn("p24_r1_07_kha_an"),   0, 0.75, 0, 0, 0, 0],
  ["r1_08", "bogin", "دًا", "dan",  A.tn("p24_r1_08_dal_an"),   0, 0.77, 0, 0, 0, 0],
  ["r1_09", "bogin", "ذًا", "zan",  A.tn("p24_r1_09_zal_an"),   0, 0.76, 0, 0, 0, 0],
  // R2 (10 ta)
  ["r2_10", "bogin", "رًا", "ran",   A.tn("p24_r2_10_ra_an"),    0, 0.78, 0, 0, 0, 0],
  ["r2_11", "bogin", "زًا", "zan",   A.tn("p24_r2_11_za_an"),    0, 0.83, 0, 0, 0, 0],
  ["r2_12", "bogin", "سًا", "san",   A.tn("p24_r2_12_sa_an"),    0, 0.81, 0, 0, 0, 0],
  ["r2_13", "bogin", "شًا", "shan",  A.tn("p24_r2_13_sha_an"),   0, 0.82, 0, 0, 0, 0],
  ["r2_14", "bogin", "صًا", "sodan", A.tn("p24_r2_14_sod_an"),   0, 0.83, 0, 0, 0, 0],
  ["r2_15", "bogin", "ضًا", "dodan", A.tn("p24_r2_15_dod_an"),   0, 0.84, 0, 0, 0, 0],
  ["r2_16", "bogin", "طًا", "thoan", A.tn("p24_r2_16_tho_an"),   0, 0.71, 0, 0, 0, 0],
  ["r2_17", "bogin", "ظًا", "zhoan", A.tn("p24_r2_17_zo_an"),    0, 0.83, 0, 0, 0, 0],
  ["r2_18", "bogin", "عًا", "aynan", A.tn("p24_r2_18_ayn_an"),   0, 0.76, 0, 0, 0, 0],
  ["r2_19", "bogin", "غًا", "ghoan", A.tn("p24_r2_19_ghayn_an"), 0, 0.78, 0, 0, 0, 0],
  // R3 (9 ta)
  ["r3_20", "bogin", "فًا", "fan",  A.tn("p24_r3_20_fa_an"),    0, 0.67, 0, 0, 0, 0],
  ["r3_21", "bogin", "قًا", "qan",  A.tn("p24_r3_21_qof_an"),   0, 0.73, 0, 0, 0, 0],
  ["r3_22", "bogin", "كًا", "kan",  A.tn("p24_r3_22_kaf_an"),   0, 0.72, 0, 0, 0, 0],
  ["r3_23", "bogin", "لًا", "lan",  A.tn("p24_r3_23_lam_an"),   0, 0.77, 0, 0, 0, 0],
  ["r3_24", "bogin", "مًا", "man",  A.tn("p24_r3_24_mim_an"),   0, 0.77, 0, 0, 0, 0],
  ["r3_25", "bogin", "نًا", "nan",  A.tn("p24_r3_25_nun_an"),   0, 0.83, 0, 0, 0, 0],
  ["r3_26", "bogin", "وًا", "wan",  A.tn("p24_r3_26_waw_an"),   0, 0.77, 0, 0, 0, 0],
  ["r3_27", "bogin", "هًا", "han",  A.tn("p24_r3_27_ha2_an"),   0, 0.81, 0, 0, 0, 0],
  ["r3_28", "bogin", "يًا", "yan",  A.tn("p24_r3_28_ya_an"),    0, 0.81, 0, 0, 0, 0],

  // ── Block 2: kasra tanvin (-in), R4 (9 ta) ──
  ["r4_01", "bogin", "اٍ",  "in",   A.tn("p24_r4_01_alif_in"),  0, 0.66, 0, 0, 0, 0],
  ["r4_02", "bogin", "بٍ", "bin",   A.tn("p24_r4_02_ba_in"),    0, 0.81, 0, 0, 0, 0],
  ["r4_03", "bogin", "تٍ", "tin",   A.tn("p24_r4_03_ta_in"),    0, 0.69, 0, 0, 0, 0],
  ["r4_04", "bogin", "ثٍ", "tsin",  A.tn("p24_r4_04_tsa_in"),   0, 0.70, 0, 0, 0, 0],
  ["r4_05", "bogin", "جٍ", "jin",   A.tn("p24_r4_05_jim_in"),   0, 0.81, 0, 0, 0, 0],
  ["r4_06", "bogin", "حٍ", "hin",   A.tn("p24_r4_06_ha_in"),    0, 0.80, 0, 0, 0, 0],
  ["r4_07", "bogin", "خٍ", "khin",  A.tn("p24_r4_07_kha_in"),   0, 0.82, 0, 0, 0, 0],
  ["r4_08", "bogin", "دٍ", "din",   A.tn("p24_r4_08_dal_in"),   0, 0.84, 0, 0, 0, 0],
  ["r4_09", "bogin", "ذٍ", "zin",   A.tn("p24_r4_09_zal_in"),   0, 0.85, 0, 0, 0, 0],
  // R5 (10 ta)
  ["r5_10", "bogin", "رٍ", "rin",   A.tn("p24_r5_10_ra_in"),    0, 0.82, 0, 0, 0, 0],
  ["r5_11", "bogin", "زٍ", "zin",   A.tn("p24_r5_11_za_in"),    0, 0.86, 0, 0, 0, 0],
  ["r5_12", "bogin", "سٍ", "sin",   A.tn("p24_r5_12_sa_in"),    0, 0.80, 0, 0, 0, 0],
  ["r5_13", "bogin", "شٍ", "shin",  A.tn("p24_r5_13_sha_in"),   0, 0.79, 0, 0, 0, 0],
  ["r5_14", "bogin", "صٍ", "sodin", A.tn("p24_r5_14_sod_in"),   0, 0.79, 0, 0, 0, 0],
  ["r5_15", "bogin", "ضٍ", "dodin", A.tn("p24_r5_15_dod_in"),   0, 0.82, 0, 0, 0, 0],
  ["r5_16", "bogin", "طٍ", "thoin", A.tn("p24_r5_16_tho_in"),   0, 0.73, 0, 0, 0, 0],
  ["r5_17", "bogin", "ظٍ", "zhoin", A.tn("p24_r5_17_zo_in"),    0, 0.89, 0, 0, 0, 0],
  ["r5_18", "bogin", "عٍ", "aynin", A.tn("p24_r5_18_ayn_in"),   0, 0.86, 0, 0, 0, 0],
  ["r5_19", "bogin", "غٍ", "ghoin", A.tn("p24_r5_19_ghayn_in"), 0, 0.88, 0, 0, 0, 0],
  // R6 (9 ta)
  ["r6_20", "bogin", "فٍ", "fin",   A.tn("p24_r6_20_fa_in"),    0, 0.77, 0, 0, 0, 0],
  ["r6_21", "bogin", "قٍ", "qin",   A.tn("p24_r6_21_qof_in"),   0, 1.06, 0, 0, 0, 0],
  ["r6_22", "bogin", "كٍ", "kin",   A.tn("p24_r6_22_kaf_in"),   0, 0.73, 0, 0, 0, 0],
  ["r6_23", "bogin", "لٍ", "lin",   A.tn("p24_r6_23_lam_in"),   0, 0.77, 0, 0, 0, 0],
  ["r6_24", "bogin", "مٍ", "min",   A.tn("p24_r6_24_mim_in"),   0, 0.75, 0, 0, 0, 0],
  ["r6_25", "bogin", "نٍ", "nin",   A.tn("p24_r6_25_nun_in"),   0, 0.80, 0, 0, 0, 0],
  ["r6_26", "bogin", "وٍ", "win",   A.tn("p24_r6_26_waw_in"),   0, 0.77, 0, 0, 0, 0],
  ["r6_27", "bogin", "هٍ", "hin",   A.tn("p24_r6_27_ha2_in"),   0, 0.81, 0, 0, 0, 0],
  ["r6_28", "bogin", "يٍ", "yin",   A.tn("p24_r6_28_ya_in"),    0, 0.84, 0, 0, 0, 0],

  // ── Block 3: damma tanvin (-un), R7 (9 ta) ──
  ["r7_01", "bogin", "اٌ",  "un",   A.tn("p24_r7_01_alif_un"),  0, 0.62, 0, 0, 0, 0],
  ["r7_02", "bogin", "بٌ", "bun",   A.tn("p24_r7_02_ba_un"),    0, 0.74, 0, 0, 0, 0],
  ["r7_03", "bogin", "تٌ", "tun",   A.tn("p24_r7_03_ta_un"),    0, 0.70, 0, 0, 0, 0],
  ["r7_04", "bogin", "ثٌ", "tsun",  A.tn("p24_r7_04_tsa_un"),   0, 0.70, 0, 0, 0, 0],
  ["r7_05", "bogin", "جٌ", "jun",   A.tn("p24_r7_05_jim_un"),   0, 0.86, 0, 0, 0, 0],
  ["r7_06", "bogin", "حٌ", "hun",   A.tn("p24_r7_06_ha_un"),    0, 0.67, 0, 0, 0, 0],
  ["r7_07", "bogin", "خٌ", "khun",  A.tn("p24_r7_07_kha_un"),   0, 0.77, 0, 0, 0, 0],
  ["r7_08", "bogin", "دٌ", "dun",   A.tn("p24_r7_08_dal_un"),   0, 0.80, 0, 0, 0, 0],
  ["r7_09", "bogin", "ذٌ", "zun",   A.tn("p24_r7_09_zal_un"),   0, 0.81, 0, 0, 0, 0],
  // R8 (10 ta)
  ["r8_10", "bogin", "رٌ", "run",   A.tn("p24_r8_10_ra_un"),    0, 0.85, 0, 0, 0, 0],
  ["r8_11", "bogin", "زٌ", "zun",   A.tn("p24_r8_11_za_un"),    0, 0.90, 0, 0, 0, 0],
  ["r8_12", "bogin", "سٌ", "sun",   A.tn("p24_r8_12_sa_un"),    0, 0.91, 0, 0, 0, 0],
  ["r8_13", "bogin", "شٌ", "shun",  A.tn("p24_r8_13_sha_un"),   0, 0.86, 0, 0, 0, 0],
  ["r8_14", "bogin", "صٌ", "sodun", A.tn("p24_r8_14_sod_un"),   0, 0.82, 0, 0, 0, 0],
  ["r8_15", "bogin", "ضٌ", "dodun", A.tn("p24_r8_15_dod_un"),   0, 0.93, 0, 0, 0, 0],
  ["r8_16", "bogin", "طٌ", "thoun", A.tn("p24_r8_16_tho_un"),   0, 0.68, 0, 0, 0, 0],
  ["r8_17", "bogin", "ظٌ", "zhoun", A.tn("p24_r8_17_zo_un"),    0, 0.84, 0, 0, 0, 0],
  ["r8_18", "bogin", "عٌ", "aynun", A.tn("p24_r8_18_ayn_un"),   0, 0.80, 0, 0, 0, 0],
  ["r8_19", "bogin", "غٌ", "ghoun", A.tn("p24_r8_19_ghayn_un"), 0, 0.82, 0, 0, 0, 0],
  // R9 (9 ta)
  ["r9_20", "bogin", "فٌ", "fun",   A.tn("p24_r9_20_fa_un"),    0, 0.66, 0, 0, 0, 0],
  ["r9_21", "bogin", "قٌ", "qun",   A.tn("p24_r9_21_qof_un"),   0, 0.70, 0, 0, 0, 0],
  ["r9_22", "bogin", "كٌ", "kun",   A.tn("p24_r9_22_kaf_un"),   0, 0.64, 0, 0, 0, 0],
  ["r9_23", "bogin", "لٌ", "lun",   A.tn("p24_r9_23_lam_un"),   0, 0.77, 0, 0, 0, 0],
  ["r9_24", "bogin", "مٌ", "mun",   A.tn("p24_r9_24_mim_un"),   0, 0.79, 0, 0, 0, 0],
  ["r9_25", "bogin", "نٌ", "nun",   A.tn("p24_r9_25_nun_un"),   0, 0.83, 0, 0, 0, 0],
  ["r9_26", "bogin", "وٌ", "wun",   A.tn("p24_r9_26_waw_un"),   0, 0.81, 0, 0, 0, 0],
  ["r9_27", "bogin", "هٌ", "hun",   A.tn("p24_r9_27_ha2_un"),   0, 0.94, 0, 0, 0, 0],
  ["r9_28", "bogin", "يٌ", "yun",   A.tn("p24_r9_28_ya_un"),    0, 0.83, 0, 0, 0, 0],

  // ── Pastki bo'lim: 30 ta so'z (R10-R14) ──
  // R10: fawt + thawb (har juftlik raf'/jarr/nasb)
  ["w01", "soz", "فَوْتُ",   "Fawtu (raf')",  A.tn("p24_w01_fawtu"),   0, 1.13, 0, 0, 0, 0],
  ["w02", "soz", "فَوْتٍ",   "Fawtin (jarr)", A.tn("p24_w02_fawtin"),  0, 1.16, 0, 0, 0, 0],
  ["w03", "soz", "فَوْتًا",  "Fawtan (nasb)", A.tn("p24_w03_fawtan"),  0, 1.21, 0, 0, 0, 0],
  ["w04", "soz", "ثَوْبُ",   "Tsawbu (raf')", A.tn("p24_w04_thawbu"),  0, 1.24, 0, 0, 0, 0],
  ["w05", "soz", "ثَوْبٍ",   "Tsawbin (jarr)", A.tn("p24_w05_thawbin"),0, 1.32, 0, 0, 0, 0],
  ["w06", "soz", "ثَوْبًا",  "Tsawban (nasb)", A.tn("p24_w06_thawban"),0, 1.31, 0, 0, 0, 0],
  // R11: 'awdh, tawd, farq, lawh, fawj, layth (aralash holat)
  ["w07", "soz", "عَوْذٌ",   "'Awzun",  A.tn("p24_w07_awdhun"),  0, 1.40, 0, 0, 0, 0],
  ["w08", "soz", "طَوْدٌ",   "Thoudun", A.tn("p24_w08_tawdun"),  0, 1.22, 0, 0, 0, 0],
  ["w09", "soz", "فَرْقًا",  "Farqan",  A.tn("p24_w09_farqan"),  0, 1.38, 0, 0, 0, 0],
  ["w10", "soz", "لَوْحٌ",   "Lawhun",  A.tn("p24_w10_lawhun"),  0, 1.29, 0, 0, 0, 0],
  ["w11", "soz", "فَوْجٌ",   "Fawjun",  A.tn("p24_w11_fawjun"),  0, 1.17, 0, 0, 0, 0],
  ["w12", "soz", "لَيْثًا",  "Laythan", A.tn("p24_w12_laythan"), 0, 1.41, 0, 0, 0, 0],
  // R12: hawd, 'ard, 'arsh, qaws, fawz, dawr
  ["w13", "soz", "حَوْضٌ",   "Hawdun",  A.tn("p24_w13_hawdun"),  0, 1.29, 0, 0, 0, 0],
  ["w14", "soz", "عَرْضٍ",   "'Ardin",  A.tn("p24_w14_ardin"),   0, 1.23, 0, 0, 0, 0],
  ["w15", "soz", "عَرْشًا",  "'Arshan", A.tn("p24_w15_arshan"),  0, 1.22, 0, 0, 0, 0],
  ["w16", "soz", "قَوْسٌ",   "Qawsun",  A.tn("p24_w16_qawsun"),  0, 1.32, 0, 0, 0, 0],
  ["w17", "soz", "فَوْزٍ",   "Fawzin",  A.tn("p24_w17_fawzin"),  0, 1.30, 0, 0, 0, 0],
  ["w18", "soz", "دَوْرًا",  "Dawran",  A.tn("p24_w18_dawran"),  0, 1.31, 0, 0, 0, 0],
  // R13: shawq, khawf, fargh, shar', ghayz, sawt
  ["w19", "soz", "شَوْقٌ",   "Shawqun", A.tn("p24_w19_shawqun"), 0, 1.44, 0, 0, 0, 0],
  ["w20", "soz", "خَوْفٍ",   "Khawfin", A.tn("p24_w20_khawfin"), 0, 1.49, 0, 0, 0, 0],
  ["w21", "soz", "فَرْغًا",  "Farghan", A.tn("p24_w21_farghan"), 0, 1.37, 0, 0, 0, 0],
  ["w22", "soz", "شَرْعُ",   "Shar'u",  A.tn("p24_w22_sharu"),   0, 1.32, 0, 0, 0, 0],
  ["w23", "soz", "غَيْظٍ",   "Ghayzin", A.tn("p24_w23_ghayzin"), 0, 1.41, 0, 0, 0, 0],
  ["w24", "soz", "سَوْطًا",  "Sawthan", A.tn("p24_w24_sawtan"),  0, 1.39, 0, 0, 0, 0],
  // R14: sharah, dalw, lawn, nawm, hawl, dark
  ["w25", "soz", "شَرَهْ",   "Sharah",  A.tn("p24_w25_sharah"),  0, 1.41, 0, 0, 0, 0],
  ["w26", "soz", "دَلْوٍ",   "Dalwin",  A.tn("p24_w26_dalwin"),  0, 1.23, 0, 0, 0, 0],
  ["w27", "soz", "لَوْنًا",  "Lawnan",  A.tn("p24_w27_lawnan"),  0, 1.47, 0, 0, 0, 0],
  ["w28", "soz", "نَوْمٌ",   "Nawmun",  A.tn("p24_w28_nawmun"),  0, 1.40, 0, 0, 0, 0],
  ["w29", "soz", "حَوْلٍ",   "Hawlin",  A.tn("p24_w29_hawlin"),  0, 1.45, 0, 0, 0, 0],
  ["w30", "soz", "دَرْكًا",  "Darkan",  A.tn("p24_w30_darkan"),  0, 1.35, 0, 0, 0, 0],
];

// ============================================================
// PAGE 25 — Tanvin+Tashdid + Alif Hamza start
// ============================================================
const p25: ED[] = [
  // Tanvin + Tashdid
  ["01", "jumla", "تنوینلی تشدید", "Tanvinli tashdid", A.tantash, 0, 4, 44, 4, 30, 5],
  ["02", "soz", "رَبًّا", "Rabb (nasb)", A.tantash, 6, 9, 82, 16, 14, 5],
  ["03", "soz", "رَبٍّ", "Rabb (jarr)", A.tantash, 9, 12, 54, 16, 14, 5],
  ["04", "soz", "رَبٌّ", "Rabb (raf')", A.tantash, 12, 15, 24, 16, 14, 5],
  ["05", "soz", "حَبًّا", "Sevgi (nasb)", A.tantash, 16, 19, 82, 24, 14, 5],
  ["06", "soz", "مُبَيِّضًا", "Oqartiruvchi", A.tantash, 28, 32, 82, 40, 20, 5],
  ["07", "soz", "مُسْوَدًّا", "Qorayuvchi", A.tantash, 32, 36, 54, 40, 20, 5],
  // Alif va Hamza section
  ["08", "jumla", "الف و همزة", "Alif va Hamza", null, 0, 0, 44, 62, 26, 5],
  ["09", "harf", "ا", "Alif", null, 0, 0, 88, 74, 8, 6],
  ["10", "harf", "أ", "Alif hamza ustida", null, 0, 0, 76, 74, 8, 6],
  ["11", "harf", "إ", "Alif hamza ostida", null, 0, 0, 62, 74, 8, 6],
  ["12", "harf", "ؤ", "Vav hamza", null, 0, 0, 36, 74, 8, 6],
  ["13", "harf", "ئ", "Ya hamza", null, 0, 0, 24, 74, 8, 6],
  ["14", "harf", "ء", "Hamza mustaqil", null, 0, 0, 12, 74, 8, 6],
];

// ============================================================
// PAGE 26 — Alif Hamza examples
// ============================================================
const p26: ED[] = [
  ["01", "soz", "أَمَرَ", "Buyurdi", null, 0, 0, 82, 8, 14, 5],
  ["02", "soz", "أَخَذَ", "Oldi", null, 0, 0, 56, 8, 14, 5],
  ["03", "soz", "قَرَأَ", "O'qidi", null, 0, 0, 30, 8, 14, 5],
  ["04", "soz", "إِذَا", "Qachonki", null, 0, 0, 82, 24, 12, 5],
  ["05", "soz", "إِنَّ", "Albatta", null, 0, 0, 56, 24, 12, 5],
  ["06", "soz", "إِيمَانْ", "Iymon", null, 0, 0, 30, 24, 16, 5],
  ["07", "soz", "سُؤَالْ", "Savol", null, 0, 0, 82, 44, 14, 5],
  ["08", "soz", "رُؤُوسْ", "Boshlar", null, 0, 0, 56, 44, 16, 5],
  ["09", "soz", "مَسْئُولْ", "Mas'ul", null, 0, 0, 82, 60, 18, 5],
  ["10", "soz", "شَيْئًا", "Biror narsa", null, 0, 0, 44, 60, 16, 5],
];

// ============================================================
// PAGE 27-30 — Alif Hamza + Alif Lam continued
// ============================================================
const p27: ED[] = [
  ["01", "soz", "الْكِتَابَ", "Kitob (al)", null, 0, 0, 82, 12, 18, 5],
  ["02", "soz", "الْقُرْآنُ", "Qur'on", null, 0, 0, 50, 12, 18, 5],
  ["03", "soz", "الرَّحْمٰنُ", "Ar-Rahman", null, 0, 0, 82, 32, 20, 5],
  ["04", "soz", "الشَّمْسُ", "Quyosh", null, 0, 0, 50, 32, 18, 5],
  ["05", "soz", "النَّاسُ", "Odamlar", null, 0, 0, 82, 52, 16, 5],
  ["06", "soz", "اللَّهُ", "Alloh", null, 0, 0, 50, 52, 14, 5],
];

const p28: ED[] = [
  ["01", "soz", "الصَّلَاةَ", "Namoz", null, 0, 0, 82, 12, 18, 5],
  ["02", "soz", "الزَّكَاةَ", "Zakot", null, 0, 0, 50, 12, 18, 5],
  ["03", "soz", "الْمُؤْمِنِينَ", "Mo'minlar", null, 0, 0, 82, 36, 24, 5],
  ["04", "soz", "الْمُسْلِمِينَ", "Musulmonlar", null, 0, 0, 40, 36, 24, 5],
  ["05", "soz", "الْحَمْدُ", "Hamd", null, 0, 0, 82, 60, 16, 5],
  ["06", "soz", "لِلَّهِ", "Alloh uchun", null, 0, 0, 56, 60, 14, 5],
];

const p29: ED[] = [
  ["01", "soz", "بِسْمِ اللَّهِ", "Alloh nomi bilan", null, 0, 0, 56, 8, 28, 5],
  ["02", "soz", "الرَّحْمٰنِ", "Rahmon", null, 0, 0, 56, 20, 20, 5],
  ["03", "soz", "الرَّحِيمِ", "Rahim", null, 0, 0, 56, 32, 20, 5],
  ["04", "soz", "إِنَّ اللَّهَ", "Albatta Alloh", null, 0, 0, 56, 52, 24, 5],
];

const p30: ED[] = [
  // Vasl section elements
  ["01", "jumla", "وصل", "Vasl", null, 0, 0, 56, 8, 16, 5],
  ["02", "soz", "اُدْخُلُوا", "Kiringlar", null, 0, 0, 82, 24, 20, 5],
  ["03", "soz", "اِجْتَمَعُوا", "Yig'ildilar", null, 0, 0, 44, 24, 22, 5],
  ["04", "soz", "اِسْتَغْفِرُوا", "Istig'for qiling", null, 0, 0, 82, 44, 24, 5],
  ["05", "soz", "اِهْدِنَا", "Bizni hidoyat qil", null, 0, 0, 44, 44, 18, 5],
];

// ============================================================
// PAGES 31-33 — Vasl, Vaqf, Idg'om
// ============================================================
const p31: ED[] = [
  ["01", "jumla", "وقف", "Vaqf (to'xtash)", null, 0, 0, 56, 8, 16, 5],
  ["02", "soz", "الْعَالَمِينَ", "Olamlar", null, 0, 0, 82, 28, 22, 5],
  ["03", "soz", "الرَّحِيمِ", "Rahim", null, 0, 0, 44, 28, 20, 5],
  ["04", "soz", "يَوْمِ الدِّينِ", "Qiyomat kuni", null, 0, 0, 56, 52, 24, 5],
  ["05", "soz", "الْمُسْتَقِيمَ", "To'g'ri yo'l", null, 0, 0, 56, 72, 24, 5],
];

const p32: ED[] = [
  ["01", "jumla", "إدغام", "Idg'om", null, 0, 0, 56, 8, 18, 5],
  ["02", "soz", "مِنْ نِعْمَةٍ", "Ne'matlardan", null, 0, 0, 82, 28, 22, 5],
  ["03", "soz", "مِنْ رَبِّكَ", "Rabbingdan", null, 0, 0, 44, 28, 20, 5],
  ["04", "soz", "قَدْ تَبَيَّنَ", "Ayon bo'ldi", null, 0, 0, 56, 52, 22, 5],
  ["05", "soz", "يَوْمَئِذٍ", "O'sha kuni", null, 0, 0, 56, 72, 20, 5],
];

const p33: ED[] = [
  ["01", "soz", "إِخْفَاء", "Ixfo (yashirish)", null, 0, 0, 56, 12, 18, 5],
  ["02", "soz", "إِقْلَاب", "Iqlab (almashtirish)", null, 0, 0, 56, 32, 18, 5],
  ["03", "soz", "إِظْهَار", "Izhhor (ochiq aytish)", null, 0, 0, 56, 52, 18, 5],
  ["04", "soz", "غُنَّة", "G'unna (burun ovozi)", null, 0, 0, 56, 72, 16, 5],
];

// ============================================================
// PAGES 34-35 — Kalimalar (Islamic declarations)
// ============================================================
const p34: ED[] = [
  ["01", "jumla", "كَلِمَاتُ إِيمَانِ", "Iymon kalimalari", null, 0, 0, 50, 3, 30, 5],
  ["02", "jumla", "لَا إِلٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ", "Kalima Tayyiba", null, 0, 0, 50, 10, 60, 6],
  ["03", "jumla", "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ", "Kalima Shahoda (1-qism)", null, 0, 0, 50, 20, 60, 6],
  ["04", "jumla", "وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", "Kalima Shahoda (2-qism)", null, 0, 0, 50, 26, 60, 6],
  ["05", "jumla", "كَلِمَةُ التَّوْحِيدِ", "Kalima Tavhid", null, 0, 0, 50, 34, 28, 5],
  ["06", "jumla", "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", "Tavhid kalimasining boshi", null, 0, 0, 50, 40, 60, 6],
  ["07", "jumla", "كَلِمَةُ رَدِّ الْكُفْرِ", "Kufr rad kalimasi", null, 0, 0, 50, 60, 30, 5],
  ["08", "jumla", "كَلِمَةُ الِاسْتِغْفَارِ", "Istig'for kalimasi", null, 0, 0, 50, 78, 30, 5],
  ["09", "jumla", "اسْتَغْفِرُ اللَّهَ", "Astaghfirulloh", null, 0, 0, 50, 84, 30, 6],
];

const p35: ED[] = [
  ["01", "jumla", "كَلِمَةُ التَّمْجِيدِ", "Tamjid kalimasi", null, 0, 0, 50, 4, 28, 5],
  ["02", "jumla", "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", "Havqala", null, 0, 0, 50, 12, 50, 6],
  ["03", "jumla", "إِيمَانُ مُجْمَلْ", "Imon mujmal", null, 0, 0, 50, 28, 26, 5],
  ["04", "jumla", "آمَنْتُ بِاللَّهِ", "Allohga ishondim", null, 0, 0, 50, 36, 30, 6],
  ["05", "jumla", "إِيمَانُ مُفَصَّلْ", "Imon mufassal", null, 0, 0, 50, 56, 26, 5],
  ["06", "jumla", "آمَنْتُ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ", "Alloh, farishtalari, kitoblari", null, 0, 0, 50, 64, 60, 6],
];

// ============================================================
// PAGES 36-47 — Suralar (Qur'an surahs)
// ============================================================
const p36: ED[] = [
  ["01", "jumla", "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", "A'uzubillah", null, 0, 0, 50, 3, 60, 5],
  ["02", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ", "Bismillah", null, 0, 0, 50, 10, 50, 5],
  ["03", "jumla", "اَلْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", "Fotiha: 1-oyat", null, 0, 0, 50, 18, 50, 6],
  ["04", "jumla", "الرَّحْمٰنِ الرَّحِيمِ", "Fotiha: 2-oyat", null, 0, 0, 50, 24, 36, 6],
  ["05", "jumla", "مَالِكِ يَوْمِ الدِّينِ", "Fotiha: 3-oyat", null, 0, 0, 50, 30, 36, 6],
  ["06", "jumla", "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "Fotiha: 4-oyat", null, 0, 0, 50, 36, 50, 6],
  ["07", "jumla", "اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", "Fotiha: 5-oyat", null, 0, 0, 50, 42, 50, 6],
  ["08", "jumla", "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ", "Fotiha: 6-oyat", null, 0, 0, 50, 48, 54, 6],
  ["09", "jumla", "غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", "Fotiha: 7-oyat", null, 0, 0, 50, 54, 56, 6],
];

const p37: ED[] = [
  ["01", "jumla", "سُورَةُ الْبَقَرَة", "Baqara surasi", null, 0, 0, 50, 5, 30, 5],
  ["02", "jumla", "ذٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ", "Bu kitobda shubha yo'q", null, 0, 0, 50, 16, 50, 6],
  ["03", "jumla", "هُدًى لِلْمُتَّقِينَ", "Taqvodorlar uchun hidoyat", null, 0, 0, 50, 28, 36, 6],
];

const p38: ED[] = [
  ["01", "jumla", "سُورَةُ الْإِخْلَاصِ", "Ixlos surasi", null, 0, 0, 50, 5, 30, 5],
  ["02", "jumla", "قُلْ هُوَ اللَّهُ أَحَدٌ", "1-oyat", null, 0, 0, 50, 16, 40, 6],
  ["03", "jumla", "اللَّهُ الصَّمَدُ", "2-oyat", null, 0, 0, 50, 28, 30, 6],
  ["04", "jumla", "لَمْ يَلِدْ وَلَمْ يُولَدْ", "3-oyat", null, 0, 0, 50, 40, 40, 6],
  ["05", "jumla", "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", "4-oyat", null, 0, 0, 50, 52, 46, 6],
];

const p39: ED[] = [
  ["01", "jumla", "سُورَةُ الْفَلَقِ", "Falaq surasi", null, 0, 0, 50, 5, 28, 5],
  ["02", "jumla", "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", "1-oyat", null, 0, 0, 50, 16, 44, 6],
  ["03", "jumla", "مِنْ شَرِّ مَا خَلَقَ", "2-oyat", null, 0, 0, 50, 28, 36, 6],
  ["04", "jumla", "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ", "3-oyat", null, 0, 0, 50, 40, 48, 6],
  ["05", "jumla", "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", "4-oyat", null, 0, 0, 50, 52, 52, 6],
  ["06", "jumla", "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", "5-oyat", null, 0, 0, 50, 64, 50, 6],
];

const p40: ED[] = [
  ["01", "jumla", "سُورَةُ النَّاسِ", "Nos surasi", null, 0, 0, 50, 5, 28, 5],
  ["02", "jumla", "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", "1-oyat", null, 0, 0, 50, 16, 44, 6],
  ["03", "jumla", "مَلِكِ النَّاسِ", "2-oyat", null, 0, 0, 50, 28, 28, 6],
  ["04", "jumla", "إِلٰهِ النَّاسِ", "3-oyat", null, 0, 0, 50, 40, 28, 6],
  ["05", "jumla", "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", "4-oyat", null, 0, 0, 50, 52, 50, 6],
  ["06", "jumla", "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", "5-oyat", null, 0, 0, 50, 64, 54, 6],
  ["07", "jumla", "مِنَ الْجِنَّةِ وَالنَّاسِ", "6-oyat", null, 0, 0, 50, 76, 42, 6],
];

const p41: ED[] = [
  ["01", "jumla", "سُورَةُ الْكَوْثَرِ", "Kavsar surasi", null, 0, 0, 50, 5, 30, 5],
  ["02", "jumla", "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", "1-oyat", null, 0, 0, 50, 18, 46, 6],
  ["03", "jumla", "فَصَلِّ لِرَبِّكَ وَانْحَرْ", "2-oyat", null, 0, 0, 50, 34, 42, 6],
  ["04", "jumla", "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", "3-oyat", null, 0, 0, 50, 50, 46, 6],
];

const p42: ED[] = [
  ["01", "jumla", "سُورَةُ الْعَصْرِ", "Asr surasi", null, 0, 0, 50, 5, 28, 5],
  ["02", "jumla", "وَالْعَصْرِ", "1-oyat", null, 0, 0, 50, 18, 20, 6],
  ["03", "jumla", "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", "2-oyat", null, 0, 0, 50, 30, 46, 6],
  ["04", "jumla", "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ", "3-oyat (1-qism)", null, 0, 0, 50, 44, 56, 6],
  ["05", "jumla", "وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ", "3-oyat (2-qism)", null, 0, 0, 50, 56, 56, 6],
];

const p43: ED[] = [
  ["01", "jumla", "سُورَةُ الْفِيلِ", "Fil surasi", null, 0, 0, 50, 5, 26, 5],
  ["02", "jumla", "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", "1-oyat", null, 0, 0, 50, 16, 60, 6],
  ["03", "jumla", "أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ", "2-oyat", null, 0, 0, 50, 30, 56, 6],
];

const p44: ED[] = [
  ["01", "jumla", "سُورَةُ قُرَيْشٍ", "Quraysh surasi", null, 0, 0, 50, 5, 28, 5],
  ["02", "jumla", "لِإِيلَافِ قُرَيْشٍ", "1-oyat", null, 0, 0, 50, 18, 34, 6],
  ["03", "jumla", "إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ", "2-oyat", null, 0, 0, 50, 30, 54, 6],
  ["04", "jumla", "فَلْيَعْبُدُوا رَبَّ هٰذَا الْبَيْتِ", "3-oyat", null, 0, 0, 50, 44, 50, 6],
  ["05", "jumla", "الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ", "4-oyat", null, 0, 0, 50, 58, 60, 6],
];

const p45: ED[] = [
  ["01", "jumla", "سُورَةُ الْمَاعُونِ", "Mo'un surasi", null, 0, 0, 50, 5, 30, 5],
  ["02", "jumla", "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ", "1-oyat", null, 0, 0, 50, 16, 54, 6],
  ["03", "jumla", "فَذٰلِكَ الَّذِي يَدُعُّ الْيَتِيمَ", "2-oyat", null, 0, 0, 50, 28, 50, 6],
  ["04", "jumla", "وَلَا يَحُضُّ عَلٰى طَعَامِ الْمِسْكِينِ", "3-oyat", null, 0, 0, 50, 40, 56, 6],
];

const p46: ED[] = [
  ["01", "jumla", "سُورَةُ النَّصْرِ", "Nasr surasi", null, 0, 0, 50, 5, 28, 5],
  ["02", "jumla", "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", "1-oyat", null, 0, 0, 50, 18, 52, 6],
  ["03", "jumla", "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا", "2-oyat", null, 0, 0, 50, 34, 60, 6],
  ["04", "jumla", "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ", "3-oyat (1-qism)", null, 0, 0, 50, 52, 52, 6],
  ["05", "jumla", "إِنَّهُ كَانَ تَوَّابًا", "3-oyat (2-qism)", null, 0, 0, 50, 64, 38, 6],
];

const p47: ED[] = [
  ["01", "jumla", "سُورَةُ الْكَافِرُونَ", "Kofirun surasi", null, 0, 0, 50, 5, 32, 5],
  ["02", "jumla", "قُلْ يَا أَيُّهَا الْكَافِرُونَ", "1-oyat", null, 0, 0, 50, 16, 46, 6],
  ["03", "jumla", "لَا أَعْبُدُ مَا تَعْبُدُونَ", "2-oyat", null, 0, 0, 50, 28, 44, 6],
  ["04", "jumla", "وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ", "3-oyat", null, 0, 0, 50, 40, 50, 6],
  ["05", "jumla", "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", "6-oyat", null, 0, 0, 50, 64, 44, 6],
];

// ============================================================
// PAGES 48-50 — Duolar (Prayers)
// ============================================================
const p48: ED[] = [
  ["01", "jumla", "الثَّنَاءُ", "Sano", null, 0, 0, 50, 4, 20, 5],
  ["02", "jumla", "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ", "Sano boshi", null, 0, 0, 50, 12, 54, 6],
  ["03", "jumla", "وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ", "Sano davomi", null, 0, 0, 50, 20, 54, 6],
  ["04", "jumla", "وَلَا إِلٰهَ غَيْرُكَ", "Sano oxiri", null, 0, 0, 50, 28, 36, 6],
  ["05", "jumla", "التَّشَهُّدُ", "Tashahhud", null, 0, 0, 50, 38, 22, 5],
  ["06", "jumla", "اَلتَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ", "Tashahhud boshi", null, 0, 0, 50, 48, 60, 6],
  ["07", "jumla", "اَلسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ", "Salom Payg'ambarga", null, 0, 0, 50, 58, 60, 6],
  ["08", "jumla", "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ", "Shahodat", null, 0, 0, 50, 76, 50, 6],
];

const p49: ED[] = [
  ["01", "jumla", "الصَّلَاةُ الْإِبْرَاهِيمِيَّةُ", "Ibrahimiya salavoti", null, 0, 0, 50, 4, 36, 5],
  ["02", "jumla", "اللَّهُمَّ صَلِّ عَلٰى مُحَمَّدٍ", "Allohim Muhammad(s)ga salavot yubor", null, 0, 0, 50, 14, 50, 6],
  ["03", "jumla", "وَعَلٰى آلِ مُحَمَّدٍ", "Va Muhammad(s) oilasiga", null, 0, 0, 50, 24, 40, 6],
  ["04", "jumla", "كَمَا صَلَّيْتَ عَلٰى إِبْرَاهِيمَ", "Ibrohim(a)ga salavot yuborganday", null, 0, 0, 50, 34, 50, 6],
  ["05", "jumla", "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً", "Rabbano duo (1)", null, 0, 0, 50, 60, 52, 6],
  ["06", "jumla", "وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", "Rabbano duo (2)", null, 0, 0, 50, 72, 60, 6],
];

const p50: ED[] = [
  ["01", "jumla", "دُعَاءُ الْقُنُوتِ", "Qunut duosi", null, 0, 0, 50, 4, 28, 5],
  ["02", "jumla", "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ", "Allohim, Sendan yordam so'raymiz", null, 0, 0, 50, 14, 50, 6],
  ["03", "jumla", "وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ", "Mag'firat so'raymiz", null, 0, 0, 50, 24, 50, 6],
  ["04", "jumla", "وَنَتَوَكَّلُ عَلَيْكَ", "Senga tavakkal qilamiz", null, 0, 0, 50, 36, 40, 6],
  ["05", "jumla", "وَنُثْنِي عَلَيْكَ الْخَيْرَ", "Senga yaxshilik sanab maqtaymiz", null, 0, 0, 50, 48, 46, 6],
  ["06", "jumla", "وَنَشْكُرُكَ وَلَا نَكْفُرُكَ", "Shukr qilamiz, inkor qilmaymiz", null, 0, 0, 50, 60, 48, 6],
];

// ============================================================
// Export all page elements
// ============================================================
export const PAGE_ELEMENTS: Record<number, Element[]> = {
  // Muqova: 3 ta sarlavha tugmasi (to'liq audio — lesson.audioUrl).
  0: make(0, p0),
  // Muqaddima: read-along sahifa — faqat Bismillah element, qolgan matn
  // RenderedPage.tsx da hardcoded (MUQADDIMA_PARAGRAPHS).
  1: make(1, p1),
  3: make(3, p3),
  4: make(4, p4),
  5: make(5, p5),
  6: make(6, p6),
  7: make(7, p7),
  8: make(8, p8),
  9: make(9, p9),
  10: make(10, p10),
  11: make(11, p11),
  12: make(12, p12),
  13: make(13, p13),
  14: make(14, p14),
  15: make(15, p15),
  16: make(16, p16),
  17: make(17, p17),
  18: make(18, p18),
  19: make(19, p19),
  20: make(20, p20),
  21: make(21, p21),
  22: make(22, p22),
  23: make(23, p23),
  24: make(24, p24),
  25: make(25, p25),
  26: make(26, p26),
  27: make(27, p27),
  28: make(28, p28),
  29: make(29, p29),
  30: make(30, p30),
  31: make(31, p31),
  32: make(32, p32),
  33: make(33, p33),
  34: make(34, p34),
  35: make(35, p35),
  36: make(36, p36),
  37: make(37, p37),
  38: make(38, p38),
  39: make(39, p39),
  40: make(40, p40),
  41: make(41, p41),
  42: make(42, p42),
  43: make(43, p43),
  44: make(44, p44),
  45: make(45, p45),
  46: make(46, p46),
  47: make(47, p47),
  48: make(48, p48),
  49: make(49, p49),
  50: make(50, p50),
};

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
  // Page 25 Tanvinli tashdid chunks — title + 3 rabb + R2-R7 (37 chunks)
  tt: (name: string) => `/audio/edit/36_tanvinli_tashdid/${name}.mp3`,
  // Page 25 (bottom) + 26 Alif va Hamza chunks — title + 9 forms + 2 practice rows
  ah: (name: string) => `/audio/edit/37_alif_hamza/${name}.mp3`,
  // Page 27 (yuqori) Ta-marbuta chunks — head + 16 so'z (`ة ـة = ت` qoidasi)
  tm: (name: string) => `/audio/edit/38_t_marbuta/${name}.mp3`,
  // Page 27 (pastki) + 28 Muqaddara/Yoz-o'qiladigan chunks (Alif/Yā/Vāv Muqaddara)
  yoz: (name: string) => `/audio/edit/39_yoz_oqiladigan/${name}.mp3`,
  // Page 28-29 Yozilsa-o'qilmaydigan aliflar/lamlar chunks (28: Block 3, 29: Shamsiya)
  yo: (name: string) => `/audio/edit/40_yozilsa_oqilmaydi/${name}.mp3`,
  // Page 30 Vasl bo'limi (title + chig'atoy rule) — source 41. vasl.mp3
  vasl: (name: string) => `/audio/edit/41_vasl/${name}.mp3`,
  // Page 31 Vaqf bo'limi — title 42.vaqf.mp3, words from 56. Fotiha.mp3
  vaqf: (name: string) => `/audio/edit/42_vaqf/${name}.mp3`,
  // Page 32 Idg'om bo'limi — title 44. idg'om.mp3, words from Layl/Zalzala suras
  idgom: (name: string) => `/audio/edit/44_idgom/${name}.mp3`,
  // Page 33 top — Arab harflari ismi (29 letter names) — source 47. harflar nomi.mp3
  harflar: (name: string) => `/audio/edit/47_harflar/${name}.mp3`,
  // Page 33 bottom — Muqatta'at Qur'aniya — source 48. ayrim suralar boshi.mp3
  muqatta: (name: string) => `/audio/edit/48_suralar_boshi/${name}.mp3`,
  // Page 34 Iymon kalimalari — sources 49-52. kalimalar 01-04.mp3
  kl: (name: string) => `/audio/edit/49_kalimalar_01/${name}.mp3`,
  // Page 35 — Tamjid + Iman mujmal/mufassal (sources 53-55. kalimalar 05-07.mp3)
  kl5: (name: string) => `/audio/edit/53_kalimalar_05/${name}.mp3`,
  // Page 36 Surat al-Fatiha + Surat al-Baqarah (1-5) — sources 56. Fotiha.mp3 + 57. Baqara.mp3
  sb: (name: string) => `/audio/edit/56_fotiha_baqara/${name}.mp3`,
  // Page 37 Surah Ash-Shams chunks — source 58. Shams.mp3
  shams: (name: string) => `/audio/edit/58_shams/${name}.mp3`,
  // Page 37+38 Surah Al-Layl chunks — source 59. Layl.mp3 (p37: bismillah + ayahs 1-7 + a8 fragment; p38: ayahs 8-21)
  layl: (name: string) => `/audio/edit/59_layl/${name}.mp3`,
  // Page 38 Surah Ad-Duha chunks (bismillah + ayahs 1-10; ayah 11 is on p39) — source 60. Zuho.mp3
  zuho: (name: string) => `/audio/edit/60_zuho/${name}.mp3`,
  // Page 39 Surah Ash-Sharh chunks — source 61. Sharh.mp3 (62s, Bismillah + 8 ayat)
  sharh: (name: string) => `/audio/edit/61_sharh/${name}.mp3`,
  // Page 39 Surah At-Tin chunks — source 62. Tiyn.mp3 (81s, Bismillah + 8 ayat)
  tiyn: (name: string) => `/audio/edit/62_tiyn/${name}.mp3`,
  // Page 39 (header) + 40 (top) Suratu-l Alaq — source 63. Alaq.mp3 (147s, Bismillah + 19 ayat)
  alq: (name: string) => `/audio/edit/63_alaq/${name}.mp3`,
  // Page 40 (bottom) Suratu-l Qadr — source 64. Qadr.mp3 (49.84s, Bismillah + 5 ayat)
  qdr: (name: string) => `/audio/edit/64_qadr/${name}.mp3`,
  // Page 41 Suratu-l Bayyina — source 65. Bayyina.mp3 (170s, Bismillah + 8 ayat)
  bayy: (name: string) => `/audio/edit/65_bayyina/${name}.mp3`,
  // Page 42 (top) Surah Az-Zalzalah — source 66. Zalzala.mp3 (87.51s, Bismillah + 8 ayat)
  zz: (name: string) => `/audio/edit/66_zalzala/${name}.mp3`,
  // Page 42 (bottom) Surah Al-'Adiyat — source 67. Adiya.mp3 (91.48s, Bismillah + 11 ayat)
  ad: (name: string) => `/audio/edit/67_adiya/${name}.mp3`,
  // Page 43 (top) Surah Al-Qari'ah — source 68. Qoria.mp3 (89.36s, Bismillah + 11 ayat)
  qr: (name: string) => `/audio/edit/68_qoria/${name}.mp3`,
  // Page 43 (mid) Surah At-Takathur — source 69. Takasur.mp3 (71.89s, Bismillah + 8 ayat)
  tk: (name: string) => `/audio/edit/69_takasur/${name}.mp3`,
  // Page 43 (bottom — Bismillah only, title header section) + Page 44 (body) Surah Al-'Asr — source 70. Asr.mp3 (33.78s, Bismillah + 3 ayat)
  asr: (name: string) => `/audio/edit/70_asr/${name}.mp3`,
  // Page 44 (mid) Surah Al-Humazah — source 71. Humaza.mp3 (75.96s, Bismillah + 9 ayat)
  hu: (name: string) => `/audio/edit/71_humaza/${name}.mp3`,
  // Page 44 (bottom) Surah Al-Fil — source 72. Fil.mp3 (48.95s, Bismillah + 5 ayat)
  fi: (name: string) => `/audio/edit/72_fil/${name}.mp3`,
  // Page 45 (top) Surah Quraysh — source 73. Quraysh.mp3 (48.59s, Bismillah + 4 ayat)
  qur: (name: string) => `/audio/edit/73_quraysh/${name}.mp3`,
  // Page 45 (mid) Surah Al-Ma'un — source 74. Mauvn.mp3 (62.20s, Bismillah + 7 ayat)
  mau: (name: string) => `/audio/edit/74_mauvn/${name}.mp3`,
  // Page 45 (lower-mid) Surah Al-Kawthar — source 75. Kavsar.mp3 (29.54s, Bismillah + 3 ayat)
  kau: (name: string) => `/audio/edit/75_kavsar/${name}.mp3`,
  // Page 45 (bottom — Bismillah only, header section) + p46 body Surah Al-Kafirun — source 76. Kafirun.mp3 (65.36s, Bismillah + 6 ayat)
  kaf: (name: string) => `/audio/edit/76_kafirun/${name}.mp3`,
  // Page 46 (mid) Surah An-Nasr — source 77. Nasr.mp3 (44.72s, Bismillah + 3 ayat)
  nas: (name: string) => `/audio/edit/77_nasr/${name}.mp3`,
  // Page 46 (lower-mid) Surah Al-Masad — source 78. Masad.mp3 (51.41s, Bismillah + 5 ayat)
  msd: (name: string) => `/audio/edit/78_masad/${name}.mp3`,
  // Page 46 (bottom) + p47 body Surah Al-Ikhlas — source 79. Ixlos.mp3 (26.17s, Bismillah + 4 ayat)
  ixl: (name: string) => `/audio/edit/79_ixlos/${name}.mp3`,
  // Page 47 (mid) Surah Al-Falaq — source 80. Falaq.mp3 (46.13s, Bismillah + 5 ayat)
  flq: (name: string) => `/audio/edit/80_falaq/${name}.mp3`,
  // Page 47 (bottom) Surah An-Nas — source 81. Nos.mp3 (54.96s, Bismillah + 6 ayat)
  nss: (name: string) => `/audio/edit/81_nos/${name}.mp3`,
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
  ["i03_rule1",      "jumla", "حرفنی جای-جایدن چیقاریشلیک اوچون چیقارماقچی بولایاتگان حرفیمیزنی سکونلی قیلیب آلدیگه فتحه‌لی الف اولیب کیله‌میز", "Harfni joy-joyidan chiqarishlik uchun chiqarmoqchi boʻlayotgan harfimizni sukunli qilib oldiga fathali alif olib kelamiz.", A.e("intro_02_explain_1"), 0, 8.80, 0, 0, 100, 8],
  ["i04_misol",      "jumla", "مثال اوچون: اب. اج, اس", "Misol uchun اب. اج, اس", A.e("intro_03_misol"), 0, 3.08, 0, 0, 100, 8],
  ["i05_rule2",      "jumla", "شونده حرفنی جایدن چیقاریشلیک هم قولای، هم آسان بولادی", "Shunda harfni joyidan chiqarishlik ham qulay, ham oson boʻladi.", A.e("intro_04_explain_2"), 0, 4.50, 0, 0, 100, 8],

  // Alphabet — each element uses a chunked audio file from
  // /audio/edit/03_alifbo/ (cut from 03. alifbo.mp3 per PDF timings).
  // start = 0, end = chunk duration in seconds.
  // Row 1: ا ب ت ث ج ح خ
  ["01", "harf", "ا", "Alif",  A.e("e01_alif"),  0, 0.66, 88, 14, 7, 5],
  ["02", "harf", "ب", "Ba",    A.e("e02_ba"),    0, 0.90, 76, 14, 7, 5],
  ["03", "harf", "ت", "Ta",    A.e("e03_ta"),    0, 0.76, 64, 14, 7, 5],
  ["04", "harf", "ث", "Tha",   A.e("e04_tha"),   0, 0.72, 52, 14, 7, 5],
  ["05", "harf", "ج", "Jim",   A.e("e05_jim"),   0, 0.76, 40, 14, 7, 5],
  ["06", "harf", "ح", "Ha",    A.e("e06_ha"),    0, 1.19, 28, 14, 7, 5],
  ["07", "harf", "خ", "Xo",    A.e("e07_xo"),    0, 1.52, 16, 14, 7, 5],
  // Row 2: د ذ ر ز س ش ص
  ["08", "harf", "د", "Dal",   A.e("e08_dal"),   0, 1.68, 88, 22, 7, 5],
  ["09", "harf", "ذ", "Zal",   A.e("e09_zal"),   0, 1.15, 76, 22, 7, 5],
  ["10", "harf", "ر", "Ro",    A.e("e10_ro"),    0, 1.85, 64, 22, 7, 5],
  ["11", "harf", "ز", "Za",    A.e("e11_za"),    0, 1.24, 52, 22, 7, 5],
  ["12", "harf", "س", "Sin",   A.e("e12_sin"),   0, 1.30, 40, 22, 7, 5],
  ["13", "harf", "ش", "Shin",  A.e("e13_shin"),  0, 1.36, 28, 22, 7, 5],
  ["14", "harf", "ص", "Sod",   A.e("e14_sod"),   0, 1.31, 16, 22, 7, 5],
  // Row 3: ض ط ظ ع غ ف ق
  ["15", "harf", "ض", "Dod",   A.e("e15_dod"),   0, 2.18, 88, 30, 7, 5],
  ["16", "harf", "ط", "To",    A.e("e16_to"),    0, 1.54, 76, 30, 7, 5],
  ["17", "harf", "ظ", "Zo",    A.e("e17_zo"),    0, 1.19, 64, 30, 7, 5],
  ["18", "harf", "ع", "Ayn",   A.e("e18_ayn"),   0, 1.12, 52, 30, 7, 5],
  ["19", "harf", "غ", "G'ayn", A.e("e19_gayn"),  0, 1.21, 40, 30, 7, 5],
  ["20", "harf", "ف", "Fa",    A.e("e20_fa"),    0, 1.24, 28, 30, 7, 5],
  ["21", "harf", "ق", "Qof",   A.e("e21_qof"),   0, 0.80, 16, 30, 7, 5],
  // Row 4: ك ل م ن و ه ي
  ["22", "harf", "ك", "Kaf",   A.e("e22_kaf"),   0, 0.76, 88, 38, 7, 5],
  ["23", "harf", "ل", "Lam",   A.e("e23_lam"),   0, 0.92, 76, 38, 7, 5],
  ["24", "harf", "م", "Mim",   A.e("e24_mim"),   0, 0.94, 64, 38, 7, 5],
  ["25", "harf", "ن", "Nun",   A.e("e25_nun"),   0, 1.74, 52, 38, 7, 5],
  ["26", "harf", "و", "Vav",   A.e("e26_vav"),   0, 1.58, 40, 38, 7, 5],
  ["27", "harf", "ه", "He",    A.e("e27_he"),    0, 0.92, 28, 38, 7, 5],
  ["28", "harf", "ي", "Ya",    A.e("e28_ya"),    0, 1.06, 16, 38, 7, 5],
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
  ["tn_fath", "harf", "ـً", "فتحه‌لی تنوین (an)", A.tn("p23_an_demo"), 0, 0.64, 0, 0, 0, 0],
  ["tn_kasr", "harf", "ـٍ", "کسره‌لی تنوین (in)", A.tn("p23_in_demo"), 0, 0.68, 0, 0, 0, 0],
  ["tn_damm", "harf", "ـٌ", "ضمّه‌لی تنوین (un)", A.tn("p23_un_demo"), 0, 0.72, 0, 0, 0, 0],
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
  // ⚠️ Audio so'zlarni KITOB RTL TARTIBIGA TESKARI o'qiydi (LTR vizual tartib).
  // 2026-05-19 da whisper transcribe orqali aniqlandi, tools/cut_p24.sh tuzatildi.
  // R10: fawt + thawb (har juftlik raf'/jarr/nasb — barchasi tanvin bilan)
  ["w01", "soz", "فَوْتٌ",   "Fawtun (raf')",  A.tn("p24_w01_fawtu"),   0, 1.41, 0, 0, 0, 0],
  ["w02", "soz", "فَوْتٍ",   "Fawtin (jarr)", A.tn("p24_w02_fawtin"),  0, 1.40, 0, 0, 0, 0],
  ["w03", "soz", "فَوْتًا",  "Fawtan (nasb)", A.tn("p24_w03_fawtan"),  0, 1.41, 0, 0, 0, 0],
  ["w04", "soz", "ثَوْبٌ",   "Tsawbun (raf')", A.tn("p24_w04_thawbu"),  0, 1.34, 0, 0, 0, 0],
  ["w05", "soz", "ثَوْبٍ",   "Tsawbin (jarr)", A.tn("p24_w05_thawbin"),0, 1.32, 0, 0, 0, 0],
  ["w06", "soz", "ثَوْبًا",  "Tsawban (nasb)", A.tn("p24_w06_thawban"),0, 1.28, 0, 0, 0, 0],
  // R11: 'awdh, tawd, farq, lawh, fawj, layth (aralash holat)
  ["w07", "soz", "عَوْذٌ",   "'Awzun",  A.tn("p24_w07_awdhun"),  0, 1.48, 0, 0, 0, 0],
  ["w08", "soz", "طَوْدٌ",   "Thoudun", A.tn("p24_w08_tawdun"),  0, 1.29, 0, 0, 0, 0],
  ["w09", "soz", "فَرْقًا",  "Farqan",  A.tn("p24_w09_farqan"),  0, 1.37, 0, 0, 0, 0],
  ["w10", "soz", "لَوْحٌ",   "Lawhun",  A.tn("p24_w10_lawhun"),  0, 1.47, 0, 0, 0, 0],
  ["w11", "soz", "فَوْجٌ",   "Fawjun",  A.tn("p24_w11_fawjun"),  0, 1.34, 0, 0, 0, 0],
  ["w12", "soz", "لَيْثًا",  "Laythan", A.tn("p24_w12_laythan"), 0, 1.49, 0, 0, 0, 0],
  // R12: hawd, 'ard, 'arsh, qaws, fawz, dawr
  ["w13", "soz", "حَوْضٌ",   "Hawdun",  A.tn("p24_w13_hawdun"),  0, 1.40, 0, 0, 0, 0],
  ["w14", "soz", "عَرْضٍ",   "'Ardin",  A.tn("p24_w14_ardin"),   0, 1.41, 0, 0, 0, 0],
  ["w15", "soz", "عَرْشًا",  "'Arshan", A.tn("p24_w15_arshan"),  0, 1.39, 0, 0, 0, 0],
  ["w16", "soz", "قَوْسٌ",   "Qawsun",  A.tn("p24_w16_qawsun"),  0, 1.31, 0, 0, 0, 0],
  ["w17", "soz", "فَوْزٍ",   "Fawzin",  A.tn("p24_w17_fawzin"),  0, 1.36, 0, 0, 0, 0],
  ["w18", "soz", "دَوْرًا",  "Dawran",  A.tn("p24_w18_dawran"),  0, 1.39, 0, 0, 0, 0],
  // R13: shawq, khawf, fargh, shar', ghayz, sawt
  ["w19", "soz", "شَوْقٌ",   "Shawqun", A.tn("p24_w19_shawqun"), 0, 1.50, 0, 0, 0, 0],
  ["w20", "soz", "خَوْفٍ",   "Khawfin", A.tn("p24_w20_khawfin"), 0, 1.52, 0, 0, 0, 0],
  ["w21", "soz", "فَرْغًا",  "Farghan", A.tn("p24_w21_farghan"), 0, 1.42, 0, 0, 0, 0],
  ["w22", "soz", "شَرْعٌ",   "Shar'un", A.tn("p24_w22_sharu"),   0, 1.45, 0, 0, 0, 0],
  ["w23", "soz", "غَيْظٍ",   "Ghayzin", A.tn("p24_w23_ghayzin"), 0, 1.57, 0, 0, 0, 0],
  ["w24", "soz", "سَوْطًا",  "Sawthan", A.tn("p24_w24_sawtan"),  0, 1.69, 0, 0, 0, 0],
  // R14: sharah, dalw, lawn, nawm, hawl, dark
  ["w25", "soz", "شَرَهْ",   "Sharah",  A.tn("p24_w25_sharah"),  0, 1.45, 0, 0, 0, 0],
  ["w26", "soz", "دَلْوٍ",   "Dalwin",  A.tn("p24_w26_dalwin"),  0, 1.53, 0, 0, 0, 0],
  ["w27", "soz", "لَوْنًا",  "Lawnan",  A.tn("p24_w27_lawnan"),  0, 1.50, 0, 0, 0, 0],
  ["w28", "soz", "نَوْمٌ",   "Nawmun",  A.tn("p24_w28_nawmun"),  0, 1.56, 0, 0, 0, 0],
  ["w29", "soz", "حَوْلٍ",   "Hawlin",  A.tn("p24_w29_hawlin"),  0, 1.38, 0, 0, 0, 0],
  ["w30", "soz", "دَرْكًا",  "Darkan",  A.tn("p24_w30_darkan"),  0, 1.49, 0, 0, 0, 0],
];

// ============================================================
// PAGE 25 — Tanvinli tashdid (top) + Alif va Hamza (bottom — start of new chapter)
// Audio top:    36. tanvinli tashdid.mp3 (1:57) — title + 3 rabb + R2-R7 (37 chunks)
// Audio bottom: 37. alif va hamza.mp3 (0-55s)  — title + 9 forms + 2 practice rows (18 chunks)
// ============================================================
const p25: ED[] = [
  // ── Title ──
  ["title", "jumla", "تنوينلي تشديد", "Tanvinli tashdid", A.tt("p25_title"), 0, 2.00, 0, 0, 0, 0],

  // ── R1: 3 ربب misol — har biri (رَبَّنْ) shaklida yoyilgan ko'rinadi ──
  // Source audio order: rabban (fatha) → rabbin (kasra) → rabbun (damma).
  // File names match content (the spoken word), not source position.
  ["r1_w1_un", "soz", "رَبٌّ",  "Rabbun (raf')",  A.tt("p25_r1_w1_rabbun"), 0, 1.20, 0, 0, 0, 0],
  ["r1_w2_in", "soz", "رَبٍّ",  "Rabbin (jarr)",  A.tt("p25_r1_w2_rabbin"), 0, 1.12, 0, 0, 0, 0],
  ["r1_w3_an", "soz", "رَبًّا", "Rabban (nasb)", A.tt("p25_r1_w3_rabban"), 0, 1.15, 0, 0, 0, 0],

  // ── R2: tanvin fatha, 6 so'z (RTL audio order) ──
  ["r2_w1", "soz", "حَبًّا", "Habban", A.tt("p25_r2_w1_habban"), 0, 1.21, 0, 0, 0, 0],
  ["r2_w2", "soz", "بَرًّا", "Barran", A.tt("p25_r2_w2_barran"), 0, 1.18, 0, 0, 0, 0],
  ["r2_w3", "soz", "جَرًّا", "Jarran", A.tt("p25_r2_w3_jarran"), 0, 1.25, 0, 0, 0, 0],
  ["r2_w4", "soz", "مَسًّا", "Massan", A.tt("p25_r2_w4_massan"), 0, 1.24, 0, 0, 0, 0],
  ["r2_w5", "soz", "كَفًّا", "Kaffan", A.tt("p25_r2_w5_kaffan"), 0, 1.17, 0, 0, 0, 0],
  ["r2_w6", "soz", "مَنًّا", "Mannan", A.tt("p25_r2_w6_mannan"), 0, 1.57, 0, 0, 0, 0],

  // ── R3: tanvin kasra, 6 so'z ──
  ["r3_w1", "soz", "سِتٍّ", "Sittin", A.tt("p25_r3_w1_sittin"), 0, 1.32, 0, 0, 0, 0],
  ["r3_w2", "soz", "سِرٍّ", "Sirrin", A.tt("p25_r3_w2_sirrin"), 0, 1.21, 0, 0, 0, 0],
  ["r3_w3", "soz", "حِلٍّ", "Hillin", A.tt("p25_r3_w3_hillin"), 0, 1.25, 0, 0, 0, 0],
  ["r3_w4", "soz", "حِسٍّ", "Hissin", A.tt("p25_r3_w4_hissin"), 0, 1.25, 0, 0, 0, 0],
  ["r3_w5", "soz", "عِزٍّ", "'Izzin", A.tt("p25_r3_w5_izzin"),  0, 1.30, 0, 0, 0, 0],
  ["r3_w6", "soz", "بِرٍّ", "Birrin", A.tt("p25_r3_w6_birrin"), 0, 1.30, 0, 0, 0, 0],

  // ── R4: tanvin damma, 6 so'z ──
  ["r4_w1", "soz", "دُرٌّ", "Durrun",  A.tt("p25_r4_w1_durrun"),  0, 1.35, 0, 0, 0, 0],
  ["r4_w2", "soz", "ذُلٌّ", "Dhullun", A.tt("p25_r4_w2_dhullun"), 0, 1.37, 0, 0, 0, 0],
  ["r4_w3", "soz", "أُمٌّ", "Ummun",   A.tt("p25_r4_w3_ummun"),   0, 1.60, 0, 0, 0, 0],
  ["r4_w4", "soz", "خُفٌّ", "Khuffun", A.tt("p25_r4_w4_khuffun"), 0, 1.25, 0, 0, 0, 0],
  ["r4_w5", "soz", "بُرٌّ", "Burrun",  A.tt("p25_r4_w5_burrun"),  0, 1.22, 0, 0, 0, 0],
  ["r4_w6", "soz", "كُلٌّ", "Kullun",  A.tt("p25_r4_w6_kullun"),  0, 1.28, 0, 0, 0, 0],

  // ── R5: form II passive participles (ranglar — colors), 5 so'z ──
  ["r5_w1", "soz", "مُبَيَّضًا", "Mubayyaḍan",  A.tt("p25_r5_w1_mubayyadan"),  0, 1.85, 0, 0, 0, 0],
  ["r5_w2", "soz", "مُسَوَّدٍ",  "Musawwadin",  A.tt("p25_r5_w2_musawwadin"),  0, 1.82, 0, 0, 0, 0],
  ["r5_w3", "soz", "مُصَفَّرٌ",  "Musaffarun",  A.tt("p25_r5_w3_musaffarun"),  0, 1.78, 0, 0, 0, 0],
  ["r5_w4", "soz", "مُحَمَّرًا", "Muḥammaran",  A.tt("p25_r5_w4_muhammaran"),  0, 1.87, 0, 0, 0, 0],
  ["r5_w5", "soz", "مُخَضَّرٍ",  "Mukhaḍḍarin", A.tt("p25_r5_w5_mukhaddarin"), 0, 1.78, 0, 0, 0, 0],

  // ── R6: form VII/VIII participles (mixed tanvins), 5 so'z ──
  ["r6_w1", "soz", "مُهْتَزًّا", "Muhtazzan",  A.tt("p25_r6_w1_muhtazzan"),  0, 1.78, 0, 0, 0, 0],
  ["r6_w2", "soz", "مُحْتَجٍّ",  "Muḥtajjin",  A.tt("p25_r6_w2_muhtajjin"),  0, 1.81, 0, 0, 0, 0],
  ["r6_w3", "soz", "مُنْسَدٌّ",  "Munsaddun",  A.tt("p25_r6_w3_munsaddun"),  0, 2.27, 0, 0, 0, 0],
  ["r6_w4", "soz", "مُضْطَرٍّ",  "Muḍṭarrin",  A.tt("p25_r6_w4_mudtarrin"),  0, 2.09, 0, 0, 0, 0],
  ["r6_w5", "soz", "مُخْتَصٌّ",  "Mukhtaṣṣun", A.tt("p25_r6_w5_mukhtassun"), 0, 1.94, 0, 0, 0, 0],

  // ── R7: form X participles (mixed tanvins), 5 so'z ──
  ["r7_w1", "soz", "مُسْتَرِدًّا", "Mustariddan",  A.tt("p25_r7_w1_mustariddan"), 0, 1.97, 0, 0, 0, 0],
  ["r7_w2", "soz", "مُسْتَحِبٍّ",  "Mustaḥibbin",  A.tt("p25_r7_w2_mustahibbin"), 0, 2.00, 0, 0, 0, 0],
  ["r7_w3", "soz", "مُسْتَحِلٌّ",  "Mustaḥillun",  A.tt("p25_r7_w3_mustahillun"), 0, 2.09, 0, 0, 0, 0],
  ["r7_w4", "soz", "مُسْتَدِلًّا", "Mustadillan",  A.tt("p25_r7_w4_mustadillan"), 0, 2.04, 0, 0, 0, 0],
  ["r7_w5", "soz", "مُسْتَعِدٍّ",  "Musta'iddin",  A.tt("p25_r7_w5_mustaiddin"),  0, 3.35, 0, 0, 0, 0],

  // ── Alif va Hamza chapter intro (audio: 37. alif va hamza.mp3 0-55s) ──
  // Title + 9 forms + 2 numbered practice rows (old / new spelling).
  // Timings remapped 2026-05-19: source has uzbek explanations between forms
  // — old cuts were 1 position ahead. New mapping uses sound-region centers.
  ["ah_title",  "jumla", "الف و همزة", "Alif va Hamza", A.ah("p25_ah_title"), 0, 1.90, 0, 0, 0, 0],
  ["ah_subtitle", "jumla", "الف و همزة توقّز (٩) كورينيشده يازيلادى",
    "Alif va hamza 9 ko'rinishda yoziladi", A.ah("p25_ah_subtitle"), 0, 3.80, 0, 0, 0, 0],
  // 9 graphic forms (RTL order). Audio uchun manba yozuvda alohida harf
  // talaffuzi yo'q (faqat misol so'zlar bor), shuning uchun audio: null.
  // Vizual ko'rinish saqlanadi, click bo'lganida hech narsa eshitilmaydi.
  ["ah_f1", "harf", "ا",   "Alif",                       null, 0, 0, 0, 0, 0, 0],
  ["ah_f2", "harf", "أ",   "Alif (hamza ustida)",        null, 0, 0, 0, 0, 0, 0],
  ["ah_f3", "harf", "ـا",  "Alif (oxiri)",               null, 0, 0, 0, 0, 0, 0],
  ["ah_f4", "harf", "إ",   "Alif (hamza ostida)",        null, 0, 0, 0, 0, 0, 0],
  ["ah_f5", "harf", "ؤ",   "Vov + hamza",                null, 0, 0, 0, 0, 0, 0],
  ["ah_f6", "harf", "ئ",   "Yo + hamza",                 null, 0, 0, 0, 0, 0, 0],
  ["ah_f7", "harf", "ـئ",  "Yo + hamza (oxiri)",         null, 0, 0, 0, 0, 0, 0],
  ["ah_f8", "harf", "ـئـ", "Yo + hamza (oʻrtasida)",     null, 0, 0, 0, 0, 0, 0],
  ["ah_f9", "harf", "ء",   "Hamza (yolg'iz)",            null, 0, 0, 0, 0, 0, 0],
  // Practice row 1 (older spelling — alif WITHOUT hamza marker). Audio
  // re-cut from 7-16s region of source (was incorrectly mapped to 31-42s,
  // which contains page 26 content).
  ["ah_p1_w1", "soz", "اَمَرَ",   "Amara",   A.ah("p25_ah_p1_w1_amara"),   0, 0.85, 0, 0, 0, 0],
  ["ah_p1_w2", "soz", "اَخَذَ",   "Akhadha", A.ah("p25_ah_p1_w2_akhadha"), 0, 1.65, 0, 0, 0, 0],
  ["ah_p1_w3", "soz", "قَرَاَ",   "Qara'a",  A.ah("p25_ah_p1_w3_qaraa"),   0, 0.95, 0, 0, 0, 0],
  ["ah_p1_w4", "soz", "يَقْرَاُ", "Yaqra'u", A.ah("p25_ah_p1_w4_yaqrau"),  0, 1.30, 0, 0, 0, 0],
  // Practice row 2 (modern spelling — alif WITH hamza marker). Re-cut from
  // 19-28s region of source.
  ["ah_p2_w1", "soz", "اَمَرَ",   "Amara",   A.ah("p25_ah_p2_w1_amara"),   0, 0.90, 0, 0, 0, 0],
  ["ah_p2_w2", "soz", "اَخَذَ",   "Akhadha", A.ah("p25_ah_p2_w2_akhadha"), 0, 0.96, 0, 0, 0, 0],
  ["ah_p2_w3", "soz", "قَرَأَ",   "Qara'a",  A.ah("p25_ah_p2_w3_qaraa"),   0, 0.92, 0, 0, 0, 0],
  ["ah_p2_w4", "soz", "يَقْرَأُ", "Yaqra'u", A.ah("p25_ah_p2_w4_yaqrau"),  0, 1.30, 0, 0, 0, 0],
];

// ============================================================
// PAGE 26 — Alif Hamza misollari (audio: 37. alif va hamza.mp3 ~59-216s)
// Top: 10 visual rows (R3-R9 numbered + 3 unnumbered continuation rows) +
// Bottom: 2 rows after divider (al-mar' / al-juz' declension forms).
// Numbering continues from p25 (which had R1, R2 of the practice section).
// ============================================================
const p26: ED[] = [
  // ── R3 (eski, no explicit hamza): yaʔmuru yaʔkhudhu maʔmuur maʔkhuudh ──
  // 2026-05-19: re-cut from source ~31-42s region (was incorrectly at 59-68s).
  ["r3_w1", "soz", "يَامُرُ",  "Yaʔmuru (buyuradi)",   A.ah("p26_r3_w1_yamuru"),   0, 1.20, 0, 0, 0, 0],
  ["r3_w2", "soz", "يَاخُذُ",  "Yaʔkhudhu (oladi)",    A.ah("p26_r3_w2_yakhudhu"), 0, 1.45, 0, 0, 0, 0],
  ["r3_w3", "soz", "مَامُورْ", "Maʔmuur (buyurilgan)", A.ah("p26_r3_w3_mamuur"),   0, 1.70, 0, 0, 0, 0],
  ["r3_w4", "soz", "مَاخُوذْ", "Maʔkhuudh (olingan)",  A.ah("p26_r3_w4_makhuudh"), 0, 2.10, 0, 0, 0, 0],

  // ── R4 (yangi, hamza belgisi bilan): same 4 words ──
  ["r4_w1", "soz", "يَأْمُرُ",  "Yaʔmuru (buyuradi)",   A.ah("p26_r4_w1_yamuru"),   0, 1.25, 0, 0, 0, 0],
  ["r4_w2", "soz", "يَأْخُذُ",  "Yaʔkhudhu (oladi)",    A.ah("p26_r4_w2_yakhudhu"), 0, 1.50, 0, 0, 0, 0],
  ["r4_w3", "soz", "مَأْمُورْ", "Maʔmuur (buyurilgan)", A.ah("p26_r4_w3_mamuur"),   0, 1.65, 0, 0, 0, 0],
  ["r4_w4", "soz", "مَأْخُوذْ", "Maʔkhuudh (olingan)",  A.ah("p26_r4_w4_makhuudh"), 0, 2.05, 0, 0, 0, 0],

  // ── R5: hamza-on-ya at end (ـئ): quri'a qaari'a mubtadi' mustahzi' ──
  ["r5_w1", "soz", "قُرِئَ",     "Quriʔa (o'qildi)",     A.ah("p26_r5_w1_qurie"),     0, 0.90, 0, 0, 0, 0],
  ["r5_w2", "soz", "قَارِئَ",    "Qaariʔa (o'quvchi)",   A.ah("p26_r5_w2_qaariea"),   0, 0.95, 0, 0, 0, 0],
  ["r5_w3", "soz", "مُبْتَدِئْ", "Mubtadiʔ (boshlovchi)", A.ah("p26_r5_w3_mubtadie"),  0, 1.30, 0, 0, 0, 0],
  ["r5_w4", "soz", "مُسْتَهْزِئْ", "Mustahziʔ (masxara qiluvchi)", A.ah("p26_r5_w4_mustahzie"), 0, 1.75, 0, 0, 0, 0],

  // ── R6: hamza-on-waw (ؤ): yuʔminu muʔmin muʔadhdhin muʔallif luʔluʔ ──
  ["r6_w1", "soz", "يُؤْمِنُ",   "Yuʔminu (iymon keltiradi)", A.ah("p26_r6_w1_yuminu"),    0, 1.35, 0, 0, 0, 0],
  ["r6_w2", "soz", "مُؤْمِنْ",   "Muʔmin (mo'min)",           A.ah("p26_r6_w2_mumin"),     0, 1.35, 0, 0, 0, 0],
  ["r6_w3", "soz", "مُؤَذِّنْ",  "Muʔadhdhin (azonchi)",      A.ah("p26_r6_w3_muadhdhin"), 0, 1.50, 0, 0, 0, 0],
  ["r6_w4", "soz", "مُؤَلِّفْ",  "Muʔallif (muallif)",        A.ah("p26_r6_w4_muallif"),   0, 1.30, 0, 0, 0, 0],
  ["r6_w5", "soz", "لُؤْلُؤْ",   "Luʔluʔ (marvarid)",         A.ah("p26_r6_w5_luulue"),    0, 1.05, 0, 0, 0, 0],

  // ── R7: hamza-on-ya middle (ـئـ after long alif): qaa'il qaa'im saa'il maa'il ra'iis ──
  ["r7_w1", "soz", "قَائِلْ",  "Qaaʔil (so'zlovchi)",     A.ah("p26_r7_w1_qaail"), 0, 2.30, 0, 0, 0, 0],
  ["r7_w2", "soz", "قَائِمْ",  "Qaaʔim (tik turuvchi)",   A.ah("p26_r7_w2_qaaim"), 0, 2.30, 0, 0, 0, 0],
  ["r7_w3", "soz", "سَائِلْ",  "Saaʔil (so'rovchi)",      A.ah("p26_r7_w3_saail"), 0, 2.30, 0, 0, 0, 0],
  ["r7_w4", "soz", "مَائِلْ",  "Maaʔil (egiluvchi)",      A.ah("p26_r7_w4_maail"), 0, 2.30, 0, 0, 0, 0],
  ["r7_w5", "soz", "رَئِيسْ",  "Raʔiis (rais, boshliq)",  A.ah("p26_r7_w5_raiis"), 0, 1.75, 0, 0, 0, 0],

  // ── R8: hamza middle sukun (ـئْـ): biʔsa biʔr saʔila yasʔal masʔuul ──
  ["r8_w1", "soz", "بِئْسَ",     "Biʔsa (qanchalik yomon!)", A.ah("p26_r8_w1_bisa"),   0, 1.15, 0, 0, 0, 0],
  ["r8_w2", "soz", "بِئْرُ",     "Biʔr (quduq)",             A.ah("p26_r8_w2_bir"),    0, 1.15, 0, 0, 0, 0],
  ["r8_w3", "soz", "سَأَلَ",     "Saʔala (so'radi)",         A.ah("p26_r8_w3_saala"),  0, 1.10, 0, 0, 0, 0],
  ["r8_w4", "soz", "يَسْئَلْ",   "Yasʔal (so'raydi)",        A.ah("p26_r8_w4_yasal"),  0, 1.35, 0, 0, 0, 0],
  ["r8_w5", "soz", "مَسْئُولْ",  "Masʔuul (mas'ul)",         A.ah("p26_r8_w5_masuul"), 0, 1.80, 0, 0, 0, 0],

  // ── R9: hamza after long alif (ـاءَ): shaa'a saa'a jaa'a yashaa'u masaa'u ──
  ["r9_w1", "soz", "شَاءَ",     "Shaaʔa (xohladi)",       A.ah("p26_r9_w1_shaaa"),   0, 2.25, 0, 0, 0, 0],
  ["r9_w2", "soz", "سَاءَ",     "Saaʔa (yomon bo'ldi)",   A.ah("p26_r9_w2_saaa"),    0, 2.35, 0, 0, 0, 0],
  ["r9_w3", "soz", "جَاءَ",     "Jaaʔa (keldi)",          A.ah("p26_r9_w3_jaaa"),    0, 2.30, 0, 0, 0, 0],
  ["r9_w4", "soz", "يَشَاءُ",   "Yashaaʔu (xohlaydi)",    A.ah("p26_r9_w4_yashaau"), 0, 2.25, 0, 0, 0, 0],
  ["r9_w5", "soz", "مَسَاءُ",   "Masaaʔu (oqshom)",       A.ah("p26_r9_w5_masaau"),  0, 2.40, 0, 0, 0, 0],

  // ── C1 (continuation 1, no number): hamza at end after fatha+sukun-ya (ـَىْءُ) ──
  ["c1_w1", "soz", "شِىْءَ",     "Shiʔa (irodalandi)",      A.ah("p26_c1_w1_shia"),  0, 1.95, 0, 0, 0, 0],
  ["c1_w2", "soz", "جِيءَ",     "Jiʔa (keltirildi)",        A.ah("p26_c1_w2_jia"),   0, 2.20, 0, 0, 0, 0],
  ["c1_w3", "soz", "يَجِىْءُ",   "Yajiiʔu (keladi)",         A.ah("p26_c1_w3_yajii"), 0, 2.20, 0, 0, 0, 0],
  ["c1_w4", "soz", "يُسِىْءُ",   "Yusiiʔu (yomonlik qiladi)", A.ah("p26_c1_w4_yusii"), 0, 2.40, 0, 0, 0, 0],
  ["c1_w5", "soz", "مُسِىْءُ",   "Musiiʔu (yomon)",         A.ah("p26_c1_w5_musii"), 0, 2.45, 0, 0, 0, 0],

  // ── C2: hamza at end, various preceding vowels — har biri alohida audio ──
  ["c2_w1", "soz", "شَيْءُ",     "Shayʔu (narsa)",     A.ah("p26_c2_w1_shay"),  0, 1.25, 0, 0, 0, 0],
  ["c2_w2", "soz", "فَيْءُ",     "Fayʔu (soya)",       A.ah("p26_c2_w2_fay"),   0, 1.20, 0, 0, 0, 0],
  ["c2_w3", "soz", "مِلْءُ",     "Milʔu (to'liqlik)",  A.ah("p26_c2_w3_mil"),   0, 1.30, 0, 0, 0, 0],
  ["c2_w4", "soz", "بَرْءُ",     "Barʔu (sog'ayish)",  A.ah("p26_c2_w4_bar"),   0, 1.20, 0, 0, 0, 0],
  ["c2_w5", "soz", "جُزْءُ",     "Juzʔu (qism)",       A.ah("p26_c2_w5_juz"),   0, 1.35, 0, 0, 0, 0],
  ["c2_w6", "soz", "قِرَاءَةٌ", "Qiraaʔatun (o'qish)", A.ah("p26_c2_w6_qiraa"), 0, 2.80, 0, 0, 0, 0],

  // ── C3: hamza after long waw (ـوءُ) — har biri alohida audio ──
  ["c3_w1", "soz", "سُوءُ",     "Suuʔu (yomonlik)",        A.ah("p26_c3_w1_suu"),   0, 2.10, 0, 0, 0, 0],
  ["c3_w2", "soz", "يَسُوءُ",   "Yasuuʔu (yomon bo'ladi)", A.ah("p26_c3_w2_yasuu"), 0, 2.15, 0, 0, 0, 0],
  ["c3_w3", "soz", "وَضُوءُ",   "Waḍuuʔu (tahorat)",       A.ah("p26_c3_w3_wadu"),  0, 2.20, 0, 0, 0, 0],
  ["c3_w4", "soz", "قُرُوءُ",   "Quruuʔu (hayz davrlari)", A.ah("p26_c3_w4_quru"),  0, 2.20, 0, 0, 0, 0],
  ["c3_w5", "soz", "مُرُوءَةٌ", "Muruuʔatun (mardlik)",    A.ah("p26_c3_w5_muru"),  0, 2.55, 0, 0, 0, 0],

  // ── Bottom R1 (after divider): al-mar' declension — nominative/accusative/genitive/nominative-tanvin ──
  ["b1_w1", "soz", "اَلْمَرْءُ", "Al-marʔu (kishi, raf')",         A.ah("p26_b1_w1_almaru"), 0, 1.65, 0, 0, 0, 0],
  ["b1_w2", "soz", "اِمْرَأً",   "Imraʔan (kishi, nasb tanvin)",    A.ah("p26_b1_w2_imraan"), 0, 1.50, 0, 0, 0, 0],
  ["b1_w3", "soz", "اِمْرِئٍ",   "Imriʔin (kishi, jarr tanvin)",    A.ah("p26_b1_w3_imriin"), 0, 1.65, 0, 0, 0, 0],
  ["b1_w4", "soz", "اِمْرُؤٌ",   "Imruʔun (kishi, raf' tanvin)",    A.ah("p26_b1_w4_imruun"), 0, 1.65, 0, 0, 0, 0],

  // ── Bottom R2: al-juz' + 3 possessive forms (hamza seat changes with vowel) ──
  ["b2_w1", "soz", "اَلْجُزْءُ", "Al-juzʔu (qism)",          A.ah("p26_b2_w1_aljuzu"), 0, 1.90, 0, 0, 0, 0],
  ["b2_w2", "soz", "جُزْأَهَا", "Juzʔahaa (uning qismini)", A.ah("p26_b2_w2_juzaha"), 0, 1.90, 0, 0, 0, 0],
  ["b2_w3", "soz", "جُزْئِهَا", "Juzʔihaa (uning qismidan)", A.ah("p26_b2_w3_juziha"), 0, 1.90, 0, 0, 0, 0],
  ["b2_w4", "soz", "جُزْؤُهَا", "Juzʔuhaa (uning qismi)",   A.ah("p26_b2_w4_juzuha"), 0, 1.95, 0, 0, 0, 0],
];

// ============================================================
// PAGE 27 — Ta-marbuta (ة ـة = ت) + Muqaddara (Alif/Yā/Vāv yashirin)
// Yuqori bo'lim audio: 38. t-marbuta.mp3 (82s)
// Pastki bo'lim audio: 39. yoz-o'qiladigan.mp3 (188s, ulushli 28-sahifa bilan)
// Vaqtlar silencedetect (-30dB / d=0.5–0.7) bilan aniqlangan, foydalanuvchi
// qayta eshitib tasdiqlasa o'zgarishi mumkin.
// ============================================================
const p27: ED[] = [
  // ── Yuqori bo'lim: `ة ـة = ت` qoidasi (head + 5 + 5 + 6 = 17 element) ──
  // 2026-05-19 REMAPPED: source audio order is 16 words (read once) + rule
  // narration + 16 words (read again). Cuts re-aligned to single-word reads.
  ["head",   "harf", "ة ـة = ت",   "Ta marbuta = ta (sukun bilan o'qiladi)", A.tm("p27_head"),             0, 1.15, 0, 0, 0, 0],
  // R1 (5 so'z): عَزِيزَةٌ فَرِيدَةٌ حَمِيدَةٌ سَعِيدَةٌ شَهِيدَةٌ
  ["r1_w1",  "soz",  "عَزِيزَةٌ",   "Azizatun (aziz)",         A.tm("p27_r1_w1_azizatun"),   0, 1.80, 0, 0, 0, 0],
  ["r1_w2",  "soz",  "فَرِيدَةٌ",   "Faridatun (yagona)",      A.tm("p27_r1_w2_faridatun"),  0, 1.75, 0, 0, 0, 0],
  ["r1_w3",  "soz",  "حَمِيدَةٌ",   "Hamidatun (maqtangan)",    A.tm("p27_r1_w3_hamidatun"),  0, 1.85, 0, 0, 0, 0],
  ["r1_w4",  "soz",  "سَعِيدَةٌ",   "Saidatun (baxtli)",        A.tm("p27_r1_w4_saidatun"),   0, 1.85, 0, 0, 0, 0],
  ["r1_w5",  "soz",  "شَهِيدَةٌ",   "Shahidatun (shohid)",      A.tm("p27_r1_w5_shahidatun"), 0, 1.85, 0, 0, 0, 0],
  // R2 (5 so'z): جَمِيلَةٌ حَلِيمَةٌ سَلِيمَةٌ شَرِيفَةٌ نَعِيمَةٌ
  ["r2_w1",  "soz",  "جَمِيلَةٌ",   "Jamilatun (go'zal)",       A.tm("p27_r2_w1_jamilatun"),  0, 1.95, 0, 0, 0, 0],
  ["r2_w2",  "soz",  "حَلِيمَةٌ",   "Halimatun (yumshoq)",      A.tm("p27_r2_w2_halimatun"),  0, 1.80, 0, 0, 0, 0],
  ["r2_w3",  "soz",  "سَلِيمَةٌ",   "Salimatun (sog'lom)",       A.tm("p27_r2_w3_salimatun"),  0, 1.80, 0, 0, 0, 0],
  ["r2_w4",  "soz",  "شَرِيفَةٌ",   "Sharifatun (sharafli)",    A.tm("p27_r2_w4_sharifatun"), 0, 1.85, 0, 0, 0, 0],
  ["r2_w5",  "soz",  "نَعِيمَةٌ",   "Naimatun (ne'mat)",        A.tm("p27_r2_w5_naimatun"),   0, 1.80, 0, 0, 0, 0],
  // R3 (6 so'z, 3 juftlik): singular / plural — `marratun-marraatun, karratun-karraatun, hurratun-hurraatun`
  ["r3_w1",  "soz",  "مَرَّةٌ",     "Marratun (bir marta)",     A.tm("p27_r3_w1_marratun"),   0, 1.45, 0, 0, 0, 0],
  ["r3_w2",  "soz",  "مَرَّاتٌ",    "Marrātun (ko'p marta)",     A.tm("p27_r3_w2_marraatun"),  0, 1.85, 0, 0, 0, 0],
  ["r3_w3",  "soz",  "كَرَّةٌ",     "Karratun (bir karra)",     A.tm("p27_r3_w3_karratun"),   0, 1.40, 0, 0, 0, 0],
  ["r3_w4",  "soz",  "كَرَّاتٌ",    "Karrātun (ko'p karra)",     A.tm("p27_r3_w4_karraatun"),  0, 1.70, 0, 0, 0, 0],
  ["r3_w5",  "soz",  "حُرَّةٌ",     "Hurratun (hur ayol)",      A.tm("p27_r3_w5_hurratun"),   0, 1.30, 0, 0, 0, 0],
  ["r3_w6",  "soz",  "حُرَّاتٌ",    "Hurrātun (hur ayollar)",    A.tm("p27_r3_w6_hurraatun"),  0, 1.60, 0, 0, 0, 0],

  // ── Pastki bo'lim: Muqaddara (yashirin) qoidalari ──
  // Section divider + sub-title (clickable narration)
  ["subtitle", "jumla", "يازلماسه‌ده اوقيلاديگان حرفلر", "Yozilmasa-da o'qiladigan harflar", A.yoz("p27_subtitle"), 0, 3.00, 0, 0, 0, 0],

  // ── Alif Muqaddara (Alif yashirin) ──
  // intro: `اَلِف مُقَدَّرَة` + tushuntirish ("ustiga fatha tikka qilib yozilgan harflar alif kabi cho'zib o'qiladi")
  ["alif_intro", "jumla", "اَلِف مُقَدَّرَة", "Alif Muqaddara (yashirin alif) — fatha tikka qilib yozilgan harflar alif kabi cho'zib o'qiladi", A.yoz("p27_alif_intro"), 0, 1.80, 0, 0, 0, 0],
  // R1: إِلٰهُ (اِلٰاهُ) رَحْمٰنْ قُرْءَانْ هٰذَا — 4 so'z (birinchisi qavs bilan to'liq forma)
  ["alif_r1_w1", "soz", "إِلٰهٌ (اِلٰاهٌ)", "Ilāhun (ma'bud)",     A.yoz("p27_alif_r1_w1_ilah"),   0, 1.35, 0, 0, 0, 0],
  ["alif_r1_w2", "soz", "رَحْمٰنْ",          "Rahmān",              A.yoz("p27_alif_r1_w2_rahman"), 0, 1.65, 0, 0, 0, 0],
  ["alif_r1_w3", "soz", "قُرْءَانْ",         "Qur'ān",              A.yoz("p27_alif_r1_w3_quran"),  0, 1.50, 0, 0, 0, 0],
  ["alif_r1_w4", "soz", "هٰذَا",             "Hāzā (bu)",            A.yoz("p27_alif_r1_w4_haza"),   0, 1.45, 0, 0, 0, 0],
  // R2: ذٰلِكَ هٰؤُلَاءِ لٰكِنْ ءَامَنَ ءَادَمُ — 5 so'z
  ["alif_r2_w1", "soz", "ذٰلِكَ",            "Zālika (anavi)",       A.yoz("p27_alif_r1_w5_zalika"),  0, 1.40, 0, 0, 0, 0],
  ["alif_r2_w2", "soz", "هٰؤُلَاءِ",         "Hā'ulā'i (bular)",      A.yoz("p27_alif_r2_w1_haulai"), 0, 3.75, 0, 0, 0, 0],
  ["alif_r2_w3", "soz", "لٰكِنْ",            "Lākin (lekin)",         A.yoz("p27_alif_r2_w2_lakin"),   0, 1.40, 0, 0, 0, 0],
  ["alif_r2_w4", "soz", "ءَامَنَ",          "Āmana (iymon keltirdi)", A.yoz("p27_alif_r2_w3_amana"),   0, 1.25, 0, 0, 0, 0],
  ["alif_r2_w5", "soz", "ءَادَمُ",          "Ādamu (Odam a.s.)",     A.yoz("p27_alif_r2_w4_adam"),    0, 1.30, 0, 0, 0, 0],
  // R3: اٰخَرُ اٰمَنَّا اِبْرٰهِيمْ اِسْمٰعِيلْ اِسْحٰقْ — 5 so'z
  ["alif_r3_w1", "soz", "اٰخَرُ",           "Āxaru (boshqa)",        A.yoz("p27_alif_r2_w5_akhar"),   0, 1.35, 0, 0, 0, 0],
  ["alif_r3_w2", "soz", "اٰمَنَّا",         "Āmannā (iymon keltirdik)", A.yoz("p27_alif_r3_w1_amanna"), 0, 2.05, 0, 0, 0, 0],
  ["alif_r3_w3", "soz", "اِبْرٰهِيمْ",       "Ibrāhīm",                A.yoz("p27_alif_r3_w2_ibr"),     0, 2.15, 0, 0, 0, 0],
  ["alif_r3_w4", "soz", "اِسْمٰعِيلْ",       "Ismā'īl",                A.yoz("p27_alif_r3_w3_ism"),     0, 2.20, 0, 0, 0, 0],
  ["alif_r3_w5", "soz", "اِسْحٰقْ",         "Ishāq",                  A.yoz("p27_alif_r3_w4_ishaq"),   0, 1.60, 0, 0, 0, 0],

  // ── Yā Muqaddara (Yā yashirin) ──
  // intro: `يَائ مُقَدَّرَة` + tushuntirish (kasra tikka → ya kabi cho'zib o'qiladi)
  ["ya_intro", "jumla", "يَائ مُقَدَّرَة", "Yā Muqaddara (yashirin yā) — ostiga kasra tikka qilib yozilgan harflar ya kabi cho'zib o'qiladi", A.yoz("p27_ya_intro"), 0, 1.65, 0, 0, 0, 0],
  // R1: بِهٖ (بِهٖی) بِاَمْرِهٖ بِحُكْمِهٖ بِقُدْرَتِهٖ هٰذِهٖ
  ["ya_r1_w1", "soz", "بِهٖ (بِهٖی)", "Bihī (u bilan)",     A.yoz("p27_ya_r1_w1_bihi"),       0, 1.05, 0, 0, 0, 0],
  ["ya_r1_w2", "soz", "بِاَمْرِهٖ",   "Bi-amrihī (uning amri bilan)", A.yoz("p27_ya_r1_w2_biamrihi"),  0, 1.65, 0, 0, 0, 0],
  ["ya_r1_w3", "soz", "بِحُكْمِهٖ",   "Bi-hukmihī (uning hukmi bilan)", A.yoz("p27_ya_r1_w3_bihukmihi"), 0, 1.70, 0, 0, 0, 0],
  ["ya_r1_w4", "soz", "بِقُدْرَتِهٖ",  "Bi-qudratihī (uning qudrati bilan)", A.yoz("p27_ya_r1_w4_biqudratihi"), 0, 2.15, 0, 0, 0, 0],
  ["ya_r1_w5", "soz", "هٰذِهٖ",        "Hāzihī (bu)",         A.yoz("p27_ya_r1_w5_hazihi"),     0, 1.65, 0, 0, 0, 0],

  // ── Vāv Muqaddara (Vāv yashirin) ──
  // intro: `وَاو مُقَدَّرَة` + tushuntirish (damma yo'g'on → vav kabi cho'zib o'qiladi)
  ["vav_intro", "jumla", "وَاو مُقَدَّرَة", "Vāv Muqaddara (yashirin vāv) — damma yo'g'on qilib yozilgan harflar vāv kabi cho'zib o'qiladi", A.yoz("p27_vav_intro"), 0, 1.80, 0, 0, 0, 0],
  // R1: لَهُ (لَهُو) اَمْرُهُ حُكْمُهُ قُدْرَتُهُ مَالُهُ
  ["vav_r1_w1", "soz", "لَهُ (لَهُو)", "Lahū (uning)",           A.yoz("p27_vav_r1_w1_lahu"),     0, 1.05, 0, 0, 0, 0],
  ["vav_r1_w2", "soz", "اَمْرُهُ",      "Amruhū (uning amri)",     A.yoz("p27_vav_r1_w2_amruhu"),   0, 1.55, 0, 0, 0, 0],
  ["vav_r1_w3", "soz", "حُكْمُهُ",      "Hukmuhū (uning hukmi)",   A.yoz("p27_vav_r1_w3_hukmuhu"),  0, 1.55, 0, 0, 0, 0],
  ["vav_r1_w4", "soz", "قُدْرَتُهُ",    "Qudratuhū (uning qudrati)", A.yoz("p27_vav_r1_w4_qudratuhu"), 0, 1.90, 0, 0, 0, 0],
  ["vav_r1_w5", "soz", "مَالُهُ",        "Māluhū (uning moli)",     A.yoz("p27_vav_r1_w5_maluhu"),   0, 1.70, 0, 0, 0, 0],
  // R2: دَاوُدْ طَاوُسْ رُؤُسْ يَقْرَؤُنْ — 4 so'z
  ["vav_r2_w1", "soz", "دَاوُدْ",        "Dāvud (a.s.)",            A.yoz("p27_vav_r2_w1_daud"),     0, 1.55, 0, 0, 0, 0],
  ["vav_r2_w2", "soz", "طَاوُسْ",        "Tāvus (tovus qush)",       A.yoz("p27_vav_r2_w2_taus"),     0, 1.70, 0, 0, 0, 0],
  ["vav_r2_w3", "soz", "رُؤُسْ",         "Ru'ūs (boshlar)",          A.yoz("p27_vav_r2_w3_ruus"),     0, 1.55, 0, 0, 0, 0],
  ["vav_r2_w4", "soz", "يَقْرَؤُنُ",     "Yaqra'ūnu (o'qiydilar)",    A.yoz("p27_vav_r2_w4_yaqra"),    0, 1.95, 0, 0, 0, 0],
];

// ============================================================
// PAGE 28 — Yaa Alifiyya + Vav Alifiyya + Yozilsada o'qilmaydigan harflar
// Audio:
//   - 39. yoz-o'qiladigan.mp3 — Block 1 (Yaa, 20 word) + Block 2 (Vav, 6 word)
//   - 40. yozilsa-o'qilmaydi.mp3 (0-55s) — Block 3 (Yozilsada o'qilmaydi, 10 word)
// ============================================================
const p28: ED[] = [
  // Block 1 — Yaa Alifiyya (b1_intro: arabcha sarlavha; R2 audio kitobga TESKARI o'qiladi)
  ["b1_intro", "jumla", "يَاء اَلِفِيَّه", "Yaa Alifiyya — bu so'zlarning oxiridagi ya' alif kabi o'qiladi", A.yoz("p28_b1_intro"), 0, 1.80, 0, 0, 0, 0],
  // Subtitle 1 (chig'atoy narration after b1_intro, before R1)
  ["b1_sub1", "jumla", "اوشبو سوزلرنينگ آخرده‌گی یالری الف کبی اوقیلادی",
    "Ushbu so'zlarning oxiridagi 'ya' alif kabi o'qiladi", A.yoz("p28_b1_sub1"), 0, 4.55, 0, 0, 0, 0],

  // Row 1: اِلى عَلى لَدى مَتى اَنّى حَتّى
  ["r1_w1", "soz", "اِلى",   "Ila (gacha)",    A.yoz("p28_r1_w1_ila"),    0, 0.90, 0, 0, 0, 0],
  ["r1_w2", "soz", "عَلى",   "Ala (ustida)",   A.yoz("p28_r1_w2_ala"),    0, 1.00, 0, 0, 0, 0],
  ["r1_w3", "soz", "لَدى",   "Lada (yonida)",  A.yoz("p28_r1_w3_lada"),   0, 1.05, 0, 0, 0, 0],
  ["r1_w4", "soz", "مَتى",   "Mata (qachon)",  A.yoz("p28_r1_w4_mata"),   0, 1.05, 0, 0, 0, 0],
  ["r1_w5", "soz", "اَنّى",  "Anna (chunki)",  A.yoz("p28_r1_w5_anna"),   0, 1.55, 0, 0, 0, 0],
  ["r1_w6", "soz", "حَتّى",  "Hatta",          A.yoz("p28_r1_w6_hatta"),  0, 1.40, 0, 0, 0, 0],

  // Row 2: عِيسى مُوسى اَعْلى تَعالى شَتّى — audio TESKARI (shatta→taala→ala→musa→isa)
  ["r2_w1", "soz", "عِيسى",   "Iysa",            A.yoz("p28_r2_w1_isa"),    0, 1.45, 0, 0, 0, 0],
  ["r2_w2", "soz", "مُوسى",   "Musa",            A.yoz("p28_r2_w2_musa"),   0, 1.45, 0, 0, 0, 0],
  ["r2_w3", "soz", "اَعْلى",  "A'la (yuqori)",   A.yoz("p28_r2_w3_ala2"),   0, 1.30, 0, 0, 0, 0],
  ["r2_w4", "soz", "تَعالى",  "Ta'ala",          A.yoz("p28_r2_w4_taala"),  0, 1.50, 0, 0, 0, 0],
  ["r2_w5", "soz", "شَتّى",   "Shatta (turli)",  A.yoz("p28_r2_w5_shatta"), 0, 1.50, 0, 0, 0, 0],

  // Row 3: يَحْيى مُرْتَضى يَتَزَكّى فَتَرْضى
  ["r3_w1", "soz", "يَحْيى",     "Yahya",          A.yoz("p28_r3_w1_yahya"),     0, 1.40, 0, 0, 0, 0],
  ["r3_w2", "soz", "مُرْتَضى",   "Murtada",        A.yoz("p28_r3_w2_murtada"),   0, 1.65, 0, 0, 0, 0],
  ["r3_w3", "soz", "يَتَزَكّى",  "Yatazakka",      A.yoz("p28_r3_w3_yatazakka"), 0, 1.85, 0, 0, 0, 0],
  ["r3_w4", "soz", "فَتَرْضى",   "Fatarda",        A.yoz("p28_r3_w4_fatarda"),   0, 1.60, 0, 0, 0, 0],

  // Subtitle 2 (between R3 and R4)
  ["b1_sub2", "jumla", "شونينگدك اوشبو سوزلرده‌گی یال هم الف کبی اوقیلادی",
    "Shuningdek ushbu so'zlardagi 'ya' ham alif kabi o'qiladi", A.yoz("p28_b1_sub2"), 0, 4.30, 0, 0, 0, 0],

  // Row 4: سَوَّيهَا دَسَّيهَا زَكَّيهَا فَسَوَّيهَا عُقْبَيهَا
  ["r4_w1", "soz", "سَوَّيهَا",    "Sawwayha",     A.yoz("p28_r4_w1_sawwayha"),   0, 2.05, 0, 0, 0, 0],
  ["r4_w2", "soz", "دَسَّيهَا",    "Dassayha",     A.yoz("p28_r4_w2_dassayha"),   0, 2.15, 0, 0, 0, 0],
  ["r4_w3", "soz", "زَكَّيهَا",    "Zakkayha",     A.yoz("p28_r4_w3_zakkayha"),   0, 2.25, 0, 0, 0, 0],
  ["r4_w4", "soz", "فَسَوَّيهَا",  "Fasawwayha",   A.yoz("p28_r4_w4_fasawwayha"), 0, 2.20, 0, 0, 0, 0],
  ["r4_w5", "soz", "عُقْبَيهَا",   "Uqbayha",      A.yoz("p28_r4_w5_uqbayha"),    0, 2.05, 0, 0, 0, 0],

  // Block 2 — Vav Alifiyya (b2_intro: arabcha sarlavha, b2_sub: chig'atoy izoh)
  ["b2_intro", "jumla", "واو اَلِفِيَّه", "Vav Alifiyya — bu so'zlardagi vovlar alif kabi o'qiladi", A.yoz("p28_b2_intro"), 0, 1.75, 0, 0, 0, 0],
  ["b2_sub", "jumla", "اوشبو سوزلرده‌گی واولر هم الف کبی اوقیلادی",
    "Ushbu so'zlardagi vovlar ham alif kabi o'qiladi", A.yoz("p28_b2_sub"), 0, 4.40, 0, 0, 0, 0],

  // Row 5: صَلٰوةٌ زَكٰوةٌ ذَكٰوةٌ حَيٰوةٌ غَدٰوةٌ رِبٰوا
  ["r5_w1", "soz", "صَلٰوةٌ", "Salat (namoz)",     A.yoz("p28_r5_w1_salat"),  0, 1.45, 0, 0, 0, 0],
  ["r5_w2", "soz", "زَكٰوةٌ", "Zakat",             A.yoz("p28_r5_w2_zakat"),  0, 1.55, 0, 0, 0, 0],
  ["r5_w3", "soz", "ذَكٰوةٌ", "Zakat (so'yish)",   A.yoz("p28_r5_w3_dhakat"), 0, 1.60, 0, 0, 0, 0],
  ["r5_w4", "soz", "حَيٰوةٌ", "Hayot",             A.yoz("p28_r5_w4_hayat"),  0, 1.50, 0, 0, 0, 0],
  ["r5_w5", "soz", "غَدٰوةٌ", "Ghadat (erta)",     A.yoz("p28_r5_w5_ghadat"), 0, 1.50, 0, 0, 0, 0],
  ["r5_w6", "soz", "رِبٰوا",  "Ribo (sudxo'rlik)", A.yoz("p28_r5_w6_riba"),   0, 1.05, 0, 0, 0, 0],

  // Block 3 — Yozilsada o'qilmaydigan harflar
  ["b3_title", "jumla", "يَازِلْسَه‌ده اُوقِيلْمَيْدِيگَان حَرْفْلَر", "Yozilsada o'qilmaydigan harflar", A.yo("p28_b3_title"), 0, 3.00, 0, 0, 0, 0],
  ["b3_sub1", "jumla", "اوشبو سوزلر باشيده‌گی الفلر واو بيلان يازيلسه‌لرده عادي ضمّة کبی اوقیلادی",
    "Ushbu so'zlar boshidagi aliflar vov bilan yozilsalarda oddiy zamma kabi o'qiladi", A.yo("p28_b3_sub1"), 0, 7.10, 0, 0, 0, 0],

  // Row 6: اُولُو اُولى اُولاَتِ اُولاَءِ اُولئك
  ["r6_w1", "soz", "اُولُو",   "Ulu (egalari)", A.yo("p28_r6_w1_ulu"),    0, 0.90, 0, 0, 0, 0],
  ["r6_w2", "soz", "اُولى",   "Ula",            A.yo("p28_r6_w2_ula"),    0, 0.90, 0, 0, 0, 0],
  ["r6_w3", "soz", "اُولاَتِ", "Ulati",          A.yo("p28_r6_w3_ulati"),  0, 1.00, 0, 0, 0, 0],
  ["r6_w4", "soz", "اُولاَءِ", "Ulai",           A.yo("p28_r6_w4_ulai"),   0, 1.75, 0, 0, 0, 0],
  ["r6_w5", "soz", "اُولئك",  "Ulaika (anavi)", A.yo("p28_r6_w5_ulaika"), 0, 2.00, 0, 0, 0, 0],

  // Subtitle 2 (between R6 and R7)
  ["b3_sub2", "jumla", "اوشبو سوزلرکبی سوزلرنينگ آخرلريده‌گی جمع (کوپليك علامتى بولگان) واولريدن کيينگى الفلر هم اوقيلميدى",
    "Ushbu so'zlardagi ko'plik vovidan keyingi aliflar ham o'qilmaydi", A.yo("p28_b3_sub2"), 0, 9.80, 0, 0, 0, 0],

  // Row 7: اَمَنُوا اَمِنُوا قَالُوا اِعْلَمُوا اِعْمَلُوا
  ["r7_w1", "soz", "اَمَنُوا",  "Amanu (ishondilar)",      A.yo("p28_r7_w1_amanu"),  0, 1.35, 0, 0, 0, 0],
  ["r7_w2", "soz", "اَمِنُوا",  "Aminu (xavfsiz bo'ldi)",  A.yo("p28_r7_w2_aminu"),  0, 1.35, 0, 0, 0, 0],
  ["r7_w3", "soz", "قَالُوا",   "Qalu (dedilar)",          A.yo("p28_r7_w3_qalu"),   0, 1.30, 0, 0, 0, 0],
  ["r7_w4", "soz", "اِعْلَمُوا", "I'lamu (biling)",         A.yo("p28_r7_w4_ilamu"),  0, 1.45, 0, 0, 0, 0],
  ["r7_w5", "soz", "اِعْمَلُوا", "I'malu (qiling)",         A.yo("p28_r7_w5_imalu"),  0, 1.55, 0, 0, 0, 0],
];

// Page 29 — Yozilsada o'qilmaydigan harflar (alif/lam o'rta).
// Source: 40. yozilsa-o'qilmaydi.mp3 ning 76.58s-316.55s qismi.
// 3 bo'lim:
//   S1: Sozlar ichidagi o'rta alif o'qilmaydi (5+3+3+3 = 14 element)
//   S2: Sozlar ichidagi o'rta lam o'qilmaydi (5+5+4 = 14 element)
//   S3: Boshqa so'z qo'shilganda alif va lam ikkalasi ham o'qilmaydi (4+4+3+3 = 14 element)
// Har bo'lim title (chig'atoy narration, clickable) bilan boshlanadi.
// Jami: 3 title + 42 so'z = 45 element.
// VAQTLAR: silencedetect -30dB/0.30s avto-kesilgan, foydalanuvchi eshitib
// tasdiqlashi/tuzatishi kerak.
const p29: ED[] = [
  // 2026-05-19 REMAPPED: source 40.yozilsa from 50-214s; durations fixed.
  // ===== Section 1: O'rta alif o'qilmaydi =====
  ["s1_title", "jumla", "اوشبو سوزلر کبی سوزلرده اورتاده‌گی الفلر هم اوقیلمیدی",
    "Bu so'zlardek so'zlarda o'rtadagi aliflar ham o'qilmaydi", A.yo("p29_s1_title"), 0, 5.30, 0, 0, 0, 0],
  // R1: 5 so'z
  ["s1_r1_w1", "soz", "بِالْغَيْبِ",      "Bilg'ayb",          A.yo("p29_s1_r1_w1_bilghayb"),    0, 1.70, 0, 0, 0, 0],
  ["s1_r1_w2", "soz", "وَبِالْاٰخِرَةِ",  "Va bil-aakhirati",  A.yo("p29_s1_r1_w2_wabilakhira"), 0, 2.10, 0, 0, 0, 0],
  ["s1_r1_w3", "soz", "كَالْفَرَاشِ",     "Kal-faraashi",      A.yo("p29_s1_r1_w3_kalfarash"),   0, 2.00, 0, 0, 0, 0],
  ["s1_r1_w4", "soz", "وَالْعَصْرِ",      "Val-asri",          A.yo("p29_s1_r1_w4_walasr"),      0, 1.40, 0, 0, 0, 0],
  ["s1_r1_w5", "soz", "وَانْحَرْ",        "Vanhar",            A.yo("p29_s1_r1_w5_wanhar"),      0, 1.20, 0, 0, 0, 0],
  // R2: 3 phrase (+0.4s tail buffer to capture trailing soft consonants)
  ["s1_r2_w1", "soz", "وَالْمُشْرِكِينَ",  "Val-mushrikiyna",    A.yo("p29_s1_r2_w1_walmushrikin"), 0, 2.95, 0, 0, 0, 0],
  ["s1_r2_w2", "soz", "رَبِّ الْعَالَمِينَ", "Rabbil-aalamiyna",  A.yo("p29_s1_r2_w2_rabbilalam"),   0, 3.40, 0, 0, 0, 0],
  ["s1_r2_w3", "soz", "صِرَاطَ الَّذِينَ",  "Sirootal-ladhiyna",  A.yo("p29_s1_r2_w3_siratalladhin"),0, 3.20, 0, 0, 0, 0],
  // R3: 3 phrase
  ["s1_r3_w1", "soz", "غَيْرِ الْمَغْضُوبِ", "G'oyril-mag'duwbi",  A.yo("p29_s1_r3_w1_ghayrilmaghdub"),0, 3.30, 0, 0, 0, 0],
  ["s1_r3_w2", "soz", "هُمُ الْمُفْلِحُونَ",  "Humul-muflihuwna",   A.yo("p29_s1_r3_w2_humulmuflihun"), 0, 3.40, 0, 0, 0, 0],
  ["s1_r3_w3", "soz", "لَيْلَةُ الْقَدْرِ",   "Laylatul-qadri",     A.yo("p29_s1_r3_w3_laylatulqadr"),  0, 2.80, 0, 0, 0, 0],
  // R4: 3 phrase
  ["s1_r4_w1", "soz", "حَذَرَ الْمَوْتِ",        "Hadhara-l-mawti",        A.yo("p29_s1_r4_w1_hadharalmawt"),         0, 2.75, 0, 0, 0, 0],
  ["s1_r4_w2", "soz", "وَاِذَا اسْتَسْقَى",       "Va idhastasqo",          A.yo("p29_s1_r4_w2_waidhastasqa"),          0, 3.00, 0, 0, 0, 0],
  ["s1_r4_w3", "soz", "اَنْفُسَكُمُ اسْتَكْبَرْتُمْ", "Anfusakumustakbartum",  A.yo("p29_s1_r4_w3_anfusakumistakbartum"),  0, 4.80, 0, 0, 0, 0],

  // ===== Section 2: O'rta lam o'qilmaydi =====
  ["s2_title", "jumla", "اوشبو سوزلر کبی سوزلرده اورتاده‌گی لاملر هم اوقیلمیدی",
    "Bu so'zlardek so'zlarda o'rtadagi lamlar ham o'qilmaydi", A.yo("p29_s2_title"), 0, 5.60, 0, 0, 0, 0],
  // R1: 5 ta -ar/u ot
  ["s2_r1_w1", "soz", "اَلتَّبَعُ", "At-tabau",   A.yo("p29_s2_r1_w1_attabau"),   0, 2.05, 0, 0, 0, 0],
  ["s2_r1_w2", "soz", "اَلثَّمَرُ", "Ath-thamaru", A.yo("p29_s2_r1_w2_aththamaru"), 0, 1.35, 0, 0, 0, 0],
  ["s2_r1_w3", "soz", "اَلدَّخَلُ", "Ad-daxalu",   A.yo("p29_s2_r1_w3_addakhalu"),  0, 1.40, 0, 0, 0, 0],
  ["s2_r1_w4", "soz", "اَلذَّهَبُ", "Az-zahabu",   A.yo("p29_s2_r1_w4_adhdhahabu"), 0, 1.45, 0, 0, 0, 0],
  ["s2_r1_w5", "soz", "اَلرَّصَدُ", "Ar-rasadu",   A.yo("p29_s2_r1_w5_arrasadu"),   0, 1.42, 0, 0, 0, 0],
  // R2: 5 ta
  ["s2_r2_w1", "soz", "اَلزَّبَدُ", "Az-zabadu",   A.yo("p29_s2_r2_w1_azzabadu"),   0, 1.42, 0, 0, 0, 0],
  ["s2_r2_w2", "soz", "اَلسَّفَرُ", "As-safaru",   A.yo("p29_s2_r2_w2_assafaru"),   0, 1.38, 0, 0, 0, 0],
  ["s2_r2_w3", "soz", "اَلشَّجَرُ", "Ash-shajaru", A.yo("p29_s2_r2_w3_ashshajaru"), 0, 1.38, 0, 0, 0, 0],
  ["s2_r2_w4", "soz", "اَلصَّفَرُ", "As-safaru",   A.yo("p29_s2_r2_w4_assofaru"),   0, 1.40, 0, 0, 0, 0],
  ["s2_r2_w5", "soz", "اَلضَّرَرُ", "Ad-dararu",   A.yo("p29_s2_r2_w5_addhararu"),  0, 1.50, 0, 0, 0, 0],
  // R3: 4 ta
  ["s2_r3_w1", "soz", "اَلطَّلَبُ", "At-talabu",   A.yo("p29_s2_r3_w1_attalabu"),   0, 1.40, 0, 0, 0, 0],
  ["s2_r3_w2", "soz", "اَلظَّفَرُ", "Az-zafaru",   A.yo("p29_s2_r3_w2_azhzhafaru"), 0, 1.41, 0, 0, 0, 0],
  ["s2_r3_w3", "soz", "اَللَّهَبُ", "Al-lahabu",   A.yo("p29_s2_r3_w3_allahabu"),   0, 1.41, 0, 0, 0, 0],
  ["s2_r3_w4", "soz", "اَلنَّسَبُ", "An-nasabu",   A.yo("p29_s2_r3_w4_annasabu"),   0, 1.83, 0, 0, 0, 0],

  // ===== Section 3: Boshqa so'z qo'shilganda alif+lam ikkalasi ham o'qilmaydi =====
  ["s3_title", "jumla", "اوشبو سوزلر کبی سوزلرگه باشقه بر سوز قوشیب اوقیغانده الفلری هم لاملری هم اوقیلمیدی",
    "Bu so'zlardek so'zlarga boshqa bir so'z qo'shib o'qilganda aliflari ham lamlari ham o'qilmaydi",
    A.yo("p29_s3_title"), 0, 10.10, 0, 0, 0, 0],
  // R1: 4 phrase (huva al-X)
  ["s3_r1_w1", "soz", "هُوَ التَّبَعُ", "Huva-t-tabau",   A.yo("p29_s3_r1_w1_huwattabau"),     0, 1.62, 0, 0, 0, 0],
  ["s3_r1_w2", "soz", "هُوَ الثَّمَرُ", "Huva-th-thamaru", A.yo("p29_s3_r1_w2_huwaththamaru"),  0, 1.68, 0, 0, 0, 0],
  ["s3_r1_w3", "soz", "هُوَ الدَّخَلُ", "Huva-d-daxalu",   A.yo("p29_s3_r1_w3_huwaddakhalu"),   0, 1.69, 0, 0, 0, 0],
  ["s3_r1_w4", "soz", "هُوَ الذَّهَبُ", "Huva-z-zahabu",   A.yo("p29_s3_r1_w4_huwadhdhahabu"),  0, 1.95, 0, 0, 0, 0],
  // R2: 4 phrase
  ["s3_r2_w1", "soz", "هُوَ الرَّصَدُ", "Huva-r-rasadu",   A.yo("p29_s3_r2_w1_huwarrasadu"),    0, 1.68, 0, 0, 0, 0],
  ["s3_r2_w2", "soz", "هُوَ الزَّبَدُ", "Huva-z-zabadu",   A.yo("p29_s3_r2_w2_huwazzabadu"),    0, 1.70, 0, 0, 0, 0],
  ["s3_r2_w3", "soz", "هُوَ السَّفَرُ", "Huva-s-safaru",   A.yo("p29_s3_r2_w3_huwassafaru"),    0, 1.50, 0, 0, 0, 0],
  ["s3_r2_w4", "soz", "هُوَ الشَّجَرُ", "Huva-sh-shajaru", A.yo("p29_s3_r2_w4_huwashshajaru"),  0, 1.58, 0, 0, 0, 0],
  // R3: 3 phrase
  ["s3_r3_w1", "soz", "هُوَ الصَّفَرُ", "Huva-s-safaru",   A.yo("p29_s3_r3_w1_huwassofaru"),    0, 1.63, 0, 0, 0, 0],
  ["s3_r3_w2", "soz", "هُوَ الضَّرَرُ", "Huva-d-dararu",   A.yo("p29_s3_r3_w2_huwaddhararu"),   0, 1.78, 0, 0, 0, 0],
  ["s3_r3_w3", "soz", "هُوَ الطَّلَبُ", "Huva-t-talabu",   A.yo("p29_s3_r3_w3_huwattalabu"),    0, 1.71, 0, 0, 0, 0],
  // R4: 3 phrase
  ["s3_r4_w1", "soz", "هُوَ الظَّفَرُ", "Huva-z-zafaru",   A.yo("p29_s3_r4_w1_huwazhzhafaru"),  0, 1.73, 0, 0, 0, 0],
  ["s3_r4_w2", "soz", "هُوَ اللَّهَبُ", "Huva-l-lahabu",   A.yo("p29_s3_r4_w2_huwallahabu"),    0, 1.71, 0, 0, 0, 0],
  ["s3_r4_w3", "soz", "هُوَ النَّسَبُ", "Huva-n-nasabu",   A.yo("p29_s3_r4_w3_huwannasabu"),    0, 1.95, 0, 0, 0, 0],
];

const p30: ED[] = [
  // ────────────────────────────────────────────────────────────────
  // TOP: Alif-lom vasl misollar (21 ibora, 6 qator)
  // Audio words: 37. alif va hamza.mp3 ning 119.31-188.84s qismi.
  // Header narration: 40. yozilsa-o'qilmaydi.mp3 ning 216.25-229.25s qismi (12.95s).
  // ────────────────────────────────────────────────────────────────

  // Top section chig'atoy header (clickable)
  ["top_header", "jumla", "اوشبو سوزلر کبی سوزلر قوشیب اوقیلگانده اورتالریده گی فتحه کسره ضمه و سکون یازیلماگان هر قاندی حرف اوقیلمی توشریب قالدیریلادی",
    "Bu so'zlardek so'zlarni qo'shib o'qilganda, o'rtalarida fatha/kasra/damma/sukunsiz yozilmagan harflar o'qilmay tushiriladi",
    A.yo("p30_top_header"), 0, 13.00, 0, 0, 0, 0],


  // 2026-05-19 REMAPPED: TOP 21 phrases now from source 40 (230-316s), not source 37.
  // ── Row 1 (4 ibora) — هٰذَا الْبَلَدُ ، مَا الْقَارِعَةُ ، مَا الْحُطَمَةُ ، هٰذَا الَّذِى ──
  ["r1_w1", "soz", "هٰذَا الْبَلَدُ",   "Bu shahar",        A.yo("p30_r1_w1_hadhalbaladu"), 0, 2.10, 0, 0, 0, 0],
  ["r1_w2", "soz", "مَا الْقَارِعَةُ",   "Qiyomat nimadir",  A.yo("p30_r1_w2_malqariatu"),   0, 2.20, 0, 0, 0, 0],
  ["r1_w3", "soz", "مَا الْحُطَمَةُ",    "Hutama nimadir",   A.yo("p30_r1_w3_malhutamatu"),  0, 1.85, 0, 0, 0, 0],
  ["r1_w4", "soz", "هٰذَا الَّذِى",      "Bu kishi",         A.yo("p30_r1_w4_hadhalladhi"),  0, 2.30, 0, 0, 0, 0],

  // ── Row 2 (3 ibora) — مَنْ ذَا الَّذِى ، تَحْتَهَا الْأَنْهَارُ ، فَقُلْنَا اضْرِبْ ──
  ["r2_w1", "soz", "مَنْ ذَا الَّذِى",      "Bu kim",                A.yo("p30_r2_w1_mandhalladhi"),  0, 2.80, 0, 0, 0, 0],
  ["r2_w2", "soz", "تَحْتَهَا الْأَنْهَارُ", "Tagidan daryolar",      A.yo("p30_r2_w2_tahtahalanhar"), 0, 2.92, 0, 0, 0, 0],
  ["r2_w3", "soz", "فَقُلْنَا اضْرِبْ",      "Aytdik: ur",            A.yo("p30_r2_w3_faqulnadrib"),   0, 2.20, 0, 0, 0, 0],

  // ── Row 3 (3 ibora) — بِئْسَ الِاسْمُ (٭) ، اِهْدِنَا الصِّرَاطَ ، يَا أَيُّهَا النَّاسُ ──
  ["r3_w1", "soz", "بِئْسَ الِاسْمُ",       "Yomon nom",             A.yo("p30_r3_w1_bisalismu"),    0, 1.95, 0, 0, 0, 0],
  ["r3_w2", "soz", "اِهْدِنَا الصِّرَاطَ",   "Yo'lga hidoyat qil",    A.yo("p30_r3_w2_ihdinasirata"), 0, 2.65, 0, 0, 0, 0],
  ["r3_w3", "soz", "يَا أَيُّهَا النَّاسُ",  "Ey odamlar",            A.yo("p30_r3_w3_yaayyuhannas"), 0, 4.95, 0, 0, 0, 0],

  // ── Row 4 (4 ibora) — اِلَى النَّاسِ ، عَلَى النَّاسِ ، فِى الْأَرْضِ ، فِى الصُّدُورِ ──
  ["r4_w1", "soz", "اِلَى النَّاسِ",     "Odamlarga",        A.yo("p30_r4_w1_ilannas"),  0, 2.50, 0, 0, 0, 0],
  ["r4_w2", "soz", "عَلَى النَّاسِ",     "Odamlar ustida",   A.yo("p30_r4_w2_alannas"),  0, 2.45, 0, 0, 0, 0],
  ["r4_w3", "soz", "فِى الْأَرْضِ",       "Yerda",            A.yo("p30_r4_w3_filard"),   0, 1.30, 0, 0, 0, 0],
  ["r4_w4", "soz", "فِى الصُّدُورِ",      "Ko'ksilarda",      A.yo("p30_r4_w4_fissudur"), 0, 1.78, 0, 0, 0, 0],

  // ── Row 5 (4 ibora) — قَالُوا اتَّخَذَ ، قَالُوا ادْعُ ، لَقُوا الَّذِينَ ، اُوتُوا الْكِتَابَ ──
  ["r5_w1", "soz", "قَالُوا اتَّخَذَ",    "Aytdilar: oldi",        A.yo("p30_r5_w1_qaluttakhadha"), 0, 2.25, 0, 0, 0, 0],
  ["r5_w2", "soz", "قَالُوا ادْعُ",       "Aytdilar: duo qil",     A.yo("p30_r5_w2_qaludu"),        0, 1.48, 0, 0, 0, 0],
  ["r5_w3", "soz", "لَقُوا الَّذِينَ",    "Kishilarga uchradilar", A.yo("p30_r5_w3_laqulladhina"),  0, 2.35, 0, 0, 0, 0],
  ["r5_w4", "soz", "اُوتُوا الْكِتَابَ",   "Kitob berildilar",      A.yo("p30_r5_w4_utulkitab"),     0, 2.40, 0, 0, 0, 0],

  // ── Row 6 (3 ibora) — وَأَقِيمُوا الصَّلٰوةَ ، وَآتُوا الزَّكٰوةَ ، وَعَمِلُوا الصّٰلِحٰت ──
  ["r6_w1", "soz", "وَاَقِيمُوا الصَّلٰوةَ", "Namozni qoyim qilinglar", A.yo("p30_r6_w1_waaqimusalat"),   0, 2.85, 0, 0, 0, 0],
  ["r6_w2", "soz", "وَاٰتُوا الزَّكٰوةَ",    "Zakotni beringlar",       A.yo("p30_r6_w2_waatuzakat"),     0, 2.85, 0, 0, 0, 0],
  ["r6_w3", "soz", "وَعَمِلُوا الصّٰلِحٰت",  "Va solihlikni qildilar",  A.yo("p30_r6_w3_waamilussalihat"), 0, 3.75, 0, 0, 0, 0],

  // ────────────────────────────────────────────────────────────────
  // BOTTOM: Vasl bo'limi — 3 so'zli misollar (8 ibora, 4 qator × 2 ustun)
  // Audio words: 37. alif va hamza.mp3 193.28-216.05s.
  // Vasl title + chig'atoy rule audio: 41. vasl.mp3 0-4.1s va 4.4-18.65s.
  // ────────────────────────────────────────────────────────────────

  // Vasl title (clickable, manba 41. vasl.mp3 0-2.30s — faqat "Vasl Qoshish")
  ["vasl_title", "jumla", "وصل - قوشیش", "Vasl — Qo'shish",
    A.vasl("p30_vasl_title"), 0, 2.30, 0, 0, 0, 0],
  // Vasl chig'atoy rule (clickable, manba 41. vasl.mp3 3.00-40.00s — 37s to'liq qoida)
  ["vasl_rule", "jumla", "وصل ـ ایکّی اوچ یا کی تورت سوزلرنی بر-بریکه قوشیب اوقیش دیمکدر. ایکّی سوز برکه قوشیب اوقیلگانده هر دائم اورتالریده بر ایکی یا کی اوچ حرف اوقیلمی قالادی. قویده دیکی مثاللرده اوچته سوز برکه وصل قیلینهدی:",
    "Vasl — ikki, uch yoki to'rt so'zni bir-biriga qo'shib o'qish demakdir...",
    A.vasl("p30_vasl_rule"), 0, 38.00, 0, 0, 0, 0],

  // 2026-05-19 REMAPPED: 8 vasl phrases now from source 41.vasl (42-91s), not source 37.
  // ── Row 1 — اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ (o'ng) | وَهٰذَا الْبَلَدُ الْأَمِينَ (chap) ──
  ["b1_w1", "soz", "اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", "To'g'ri yo'lga hidoyat qil", A.vasl("p30_b1_w1_ihdinasiratmust"),  0, 5.00, 0, 0, 0, 0],
  ["b1_w2", "soz", "وَهٰذَا الْبَلَدِ الْأَمِينِ",        "Va bu xavfsiz shahar (At-Tin 95:3)", A.vasl("p30_b1_w2_wahadhalbaladamn"), 0, 4.60, 0, 0, 0, 0],

  // ── Row 2 — نَارُ اللهِ الْمُوقَدَةُ (o'ng) | كَمَثَلِ الَّذِى اسْتَوْقَدَ (chap) ──
  ["b2_w1", "soz", "نَارُ اللهِ الْمُوقَدَةُ",      "Allohning yondirilgan o'ti", A.vasl("p30_b2_w1_narullahimuqadah"), 0, 4.40, 0, 0, 0, 0],
  ["b2_w2", "soz", "كَمَثَلِ الَّذِى اسْتَوْقَدَ",  "Yondirgan kishi misli",      A.vasl("p30_b2_w2_kamathalillistwq"), 0, 3.70, 0, 0, 0, 0],

  // ── Row 3 — فَاتَّقُوا النَّارَ الَّتِى (o'ng) | هُوَ التَّوَّابُ الرَّحِيمُ (chap) ──
  ["b3_w1", "soz", "فَاتَّقُوا النَّارَ الَّتِى", "U do'zaxdan saqlaninglar", A.vasl("p30_b3_w1_fattaqunnaarallti"), 0, 4.20, 0, 0, 0, 0],
  ["b3_w2", "soz", "هُوَ التَّوَّابُ الرَّحِيمُ", "U tavbalar qabuluvchi",   A.vasl("p30_b3_w2_huwattawwabrahim"),  0, 4.20, 0, 0, 0, 0],

  // ── Row 4 — ذُو الْفَضْلِ الْعَظِيمِ (o'ng) | اَنْتَ الْعَزِيزُ الْحَكِيمُ (chap) ──
  ["b4_w1", "soz", "ذُو الْفَضْلِ الْعَظِيمِ",   "Buyuk fazl egasi",       A.vasl("p30_b4_w1_dhulfadlazeem"),    0, 4.00, 0, 0, 0, 0],
  ["b4_w2", "soz", "اَنْتَ الْعَزِيزُ الْحَكِيمُ", "Sen Aziz va Hakimsan",  A.vasl("p30_b4_w2_antalazeezhakeem"), 0, 5.20, 0, 0, 0, 0],
];

// ============================================================
// PAGES 31-33 — Vasl, Vaqf, Idg'om
// ============================================================
const p31: ED[] = [
  // 2026-05-19: title 42.vaqf 0-0.85s, definition 3-32s, words 1-9 from 36.5-60s.
  // Vaqf misollari: 9 oyat oxiri (Quran).
  ["01", "jumla", "وقف",            "Vaqf (to'xtash)", A.vaqf("p31_title"),       0, 0.85, 56,  8, 16, 5],
  ["definition", "jumla", "وقف ـ تنفّش (توختاش). قرآنی اوقیغانده توختاش الامتلریده بر آز توختاب نفس آلیب داوام ایتیلادی",
    "Vaqf — tinish (to'xtash). Qur'on o'qiganda to'xtash alomatlarida bir oz to'xtab, nafas olib davom etiladi",
    A.vaqf("p31_definition"), 0, 29.00, 0, 0, 0, 0],
  // 9 ta vaqf misollar (har biri oyat oxiri)
  ["02", "soz", "نَسْتَعِينُ",  "Nasta'in (yordam so'raymiz)",       A.vaqf("p31_w1_nastain"),   0, 2.20, 0, 0, 0, 0],
  ["03", "soz", "يُؤْمِنُونَ",  "Yu'minun (iymon keltirurlar)",      A.vaqf("p31_w2_yuminun"),   0, 2.10, 0, 0, 0, 0],
  ["04", "soz", "يَعْلَمُونَ",  "Ya'lamun (bilurlar)",               A.vaqf("p31_w3_yalamun"),   0, 2.10, 0, 0, 0, 0],
  ["05", "soz", "يُسْرَى",      "Yusra (yengillik)",                 A.vaqf("p31_w4_yusra"),     0, 1.50, 0, 0, 0, 0],
  ["06", "soz", "أَبَدًا",      "Abadan (abadiy)",                   A.vaqf("p31_w5_abadan"),    0, 1.30, 0, 0, 0, 0],
  ["07", "soz", "تَوَّابًا",    "Tawwaba (tavbalarni qabul qiluvchi)", A.vaqf("p31_w6_tawwaba"),  0, 1.95, 0, 0, 0, 0],
  ["08", "soz", "غِشَاوَةٌ",    "Ghishawa (parda)",                  A.vaqf("p31_w7_ghishawa"),  0, 1.70, 0, 0, 0, 0],
  ["09", "soz", "حَامِيَةٌ",    "Hamiya (qaynoq)",                   A.vaqf("p31_w8_hamiya"),    0, 1.75, 0, 0, 0, 0],
  ["10", "soz", "مُمَدَّدَةٌ",   "Mumaddada (uzaytirilgan)",          A.vaqf("p31_w9_mumaddada"), 0, 1.85, 0, 0, 0, 0],
];

const p32: ED[] = [
  // 2026-05-22: 32-sahifa to'liq qayta yozildi. Eski (min ni'matin, min rabbika,
  // qad tabayyana, yawma'idhin) — Layl/Zalzaladan olingan misollar — kitobdagi
  // matn bilan mos kelmas edi. Yangi 12 misol kitobdan to'g'ridan-to'g'ri olingan,
  // audio: 44. idg'om.mp3 (49.19s) ning to'liq qismi. Har misolda 2 ko'rinish:
  // "asl shakl" (RTL o'qish, audio'da o'qiladi) va "(idg'om transformatsiya)"
  // (mim/lam/ra/waw/ya/nun ga aylantirilgan kompakt shakl, statik vizual).
  //
  // Audio chunks silencedetect -32dB/0.30s + Whisper medium tasdiq bilan kesilgan.
  ["title", "jumla", "اِدْغَام", "Idg'om (qo'shish)", A.idgom("p32_title"), 0, 0.70, 0, 0, 0, 0],

  // Row 1: nun-sukun + mim → mim-shadda  |  nun-sukun + nun → nun-shadda
  ["e01_minmasad",  "soz", "مِنْ مَسَدٍ",        "Min masadin (ipdan)",         A.idgom("p32_e01_minmasad"),  0, 1.75, 0, 0, 0, 0],
  ["e02_lannumin",  "soz", "لَنْ نُؤْمِنَ",       "Lan nu'mina (iymon keltirmaymiz)", A.idgom("p32_e02_lannumin"), 0, 2.00, 0, 0, 0, 0],

  // Row 2: nun-sukun + waw → waw-shadda  |  nun-sukun + ya → ya-shadda
  ["e03_minwali",   "soz", "مِنْ وَلِيٍّ",        "Min waliyyin (do'stdan)",     A.idgom("p32_e03_minwali"),   0, 1.90, 0, 0, 0, 0],
  ["e04_wamanya",   "soz", "وَمَنْ يَعْمَلْ",     "Wa man ya'mal (kim qilsa)",   A.idgom("p32_e04_wamanya"),   0, 2.15, 0, 0, 0, 0],

  // Row 3: nun-sukun + lam → lam-shadda  |  nun-sukun + ra → ra-shadda
  ["e05_wamanlam",  "soz", "وَمَنْ لَمْ",         "Wa man lam (kim emas)",        A.idgom("p32_e05_wamanlam"),  0, 1.40, 0, 0, 0, 0],
  ["e06_minrabb",   "soz", "مِنْ رَبِّهِمْ",      "Min rabbihim (Rablaridan)",   A.idgom("p32_e06_minrabb"),   0, 2.00, 0, 0, 0, 0],

  // Row 4: tanvin + mim → idg'om mim  |  tanvin + nun → idg'om nun
  ["e07_hudamin",   "soz", "هُدًى مِنْ",          "Hudan min (hidoyat...dan)",   A.idgom("p32_e07_hudamin"),   0, 2.00, 0, 0, 0, 0],
  ["e08_shaynkr",   "soz", "شَيْئًا نُكْرًا",     "Shay'an nukran (yomon ish)",  A.idgom("p32_e08_shaynkr"),   0, 2.85, 0, 0, 0, 0],

  // Row 5: tanvin + waw → idg'om waw  |  tanvin + ya → idg'om ya
  ["e09_ilahwah",   "soz", "اِلٰهٌ وَاحِدٌ",      "Ilahun wahidun (yagona iloh)", A.idgom("p32_e09_ilahwah"),  0, 3.00, 0, 0, 0, 0],
  ["e10_khayyar",   "soz", "خَيْرًا يَرَهُ",      "Khayran yarahu (yaxshilikni ko'radi)", A.idgom("p32_e10_khayyar"), 0, 2.50, 0, 0, 0, 0],

  // Row 6: tanvin + lam → idg'om lam  |  tanvin + ra → idg'om ra
  ["e11_hudalmu",   "soz", "هُدًى لِلْمُتَّقِينَ", "Hudan lil-muttaqin (taqvodorlar uchun hidoyat)", A.idgom("p32_e11_hudalmu"), 0, 3.20, 0, 0, 0, 0],
  ["e12_ghafrah",   "soz", "غَفُورٌ رَحِيمٌ",    "Ghafurun rahim (ko'p kechiruvchi, mehribon)", A.idgom("p32_e12_ghafrah"), 0, 2.95, 0, 0, 0, 0],
];

// Idg'om misollar uchun "transformatsiya" matni (UI da statik vizual sifatida
// ko'rsatiladi: "asl - (transformatsiya)"). Audio'da reciter faqat asl shaklni
// o'qigan. Idg'om qoidalari: nun-sukun/tanvin + (mim/lam/ra/waw/ya/nun) →
// keyingi harf shadda bilan.
export const P32_IDGOM_TRANSFORM: Record<string, string> = {
  e01_minmasad: "مِمْ مَسَدٍ",            // nun→mim (assimilation)
  e02_lannumin: "لَنُّؤْمِنَ",            // nun + nun → nun-shadda
  e03_minwali:  "مِوَّلِيٍّ",              // nun + waw → waw-shadda
  e04_wamanya:  "وَمَيَّعْمَلْ",          // nun + ya → ya-shadda
  e05_wamanlam: "وَمَلَّمْ",              // nun + lam → lam-shadda
  e06_minrabb:  "مِرَّبِّهِمْ",            // nun + ra → ra-shadda
  e07_hudamin:  "هُدَمْ مِنْ",            // tanvin n + mim → mim (assimilation)
  e08_shaynkr:  "شَيْئَنُّكْرًا",         // tanvin n + nun → nun-shadda
  e09_ilahwah:  "اِلٰهُوَّاحِدٌ",          // tanvin n + waw → waw-shadda
  e10_khayyar:  "خَيْرَيَّرَهُ",          // tanvin n + ya → ya-shadda
  e11_hudalmu:  "هُدَلِّلْمُتَّقِينَ",     // tanvin n + lam → lam-shadda
  e12_ghafrah:  "غَفُورُرَّحِيمٌ",        // tanvin n + ra → ra-shadda
};

// ============================================================
// PAGE 33 — Arab harflari ismi (29) + Muqatta'at Qur'aniya (14)
// Top audio:    47. harflar nomi.mp3 (38.77s — 29 letter names)
// Bottom audio: 48. ayrim suralar boshi.mp3 (122s — title + subtitle + 14 muqatta)
// ============================================================
const p33: ED[] = [
  // ── TOP: Arab harflari ismi (29 ta) ──
  // 2026-05-22: top_title ga audio biriktirildi (avval null edi). Chunklar
  // qayta kesilgan (`tools/cut_p33_harflar.sh`) — eski p33_h01_alif aslida
  // TITLE'ni o'z ichiga olardi, endi to'g'ri pozitsiyalar:
  //   top_title: 0.20-2.00s — "Arab harflarining ismlari"
  //   h01_alif:  3.75-4.40s — "Alif"
  //   ...har bir harf 0.65-1.15s, silencedetect boundary'lardan kesilgan.
  ["top_title", "jumla", "عرب حرفلرینینگ اسملری", "Arab harflarining ismlari",
    A.harflar("p33_top_title"), 0, 1.80, 0, 0, 0, 0],
  ["h01", "harf", "ا",  "Alif",     A.harflar("p33_h01_alif"),     0, 0.65, 0, 0, 0, 0],
  ["h02", "harf", "ب",  "Ba",       A.harflar("p33_h02_ba"),       0, 0.80, 0, 0, 0, 0],
  ["h03", "harf", "ت",  "Ta",       A.harflar("p33_h03_ta"),       0, 0.85, 0, 0, 0, 0],
  ["h04", "harf", "ث",  "Tsa",      A.harflar("p33_h04_tsa"),      0, 0.85, 0, 0, 0, 0],
  ["h05", "harf", "ج",  "Jim",      A.harflar("p33_h05_jim"),      0, 0.90, 0, 0, 0, 0],
  ["h06", "harf", "ح",  "Ha",       A.harflar("p33_h06_ha"),       0, 0.80, 0, 0, 0, 0],
  ["h07", "harf", "خ",  "Kho",      A.harflar("p33_h07_kha"),      0, 0.90, 0, 0, 0, 0],
  ["h08", "harf", "د",  "Dol",      A.harflar("p33_h08_dal"),      0, 0.90, 0, 0, 0, 0],
  ["h09", "harf", "ذ",  "Zol",      A.harflar("p33_h09_zal"),      0, 1.05, 0, 0, 0, 0],
  ["h10", "harf", "ر",  "Ro",       A.harflar("p33_h10_ra"),       0, 0.80, 0, 0, 0, 0],
  ["h11", "harf", "ز",  "Zo",       A.harflar("p33_h11_za"),       0, 0.90, 0, 0, 0, 0],
  ["h12", "harf", "س",  "Sin",      A.harflar("p33_h12_sin"),      0, 0.95, 0, 0, 0, 0],
  ["h13", "harf", "ش",  "Shin",     A.harflar("p33_h13_shin"),     0, 1.00, 0, 0, 0, 0],
  ["h14", "harf", "ص",  "Sod",      A.harflar("p33_h14_sod"),      0, 0.90, 0, 0, 0, 0],
  ["h15", "harf", "ض",  "Dod",      A.harflar("p33_h15_dod"),      0, 1.00, 0, 0, 0, 0],
  ["h16", "harf", "ط",  "To",       A.harflar("p33_h16_to"),       0, 0.85, 0, 0, 0, 0],
  ["h17", "harf", "ظ",  "Zo",       A.harflar("p33_h17_zo"),       0, 0.90, 0, 0, 0, 0],
  ["h18", "harf", "ع",  "Ayn",      A.harflar("p33_h18_ayn"),      0, 1.00, 0, 0, 0, 0],
  ["h19", "harf", "غ",  "G'ayn",    A.harflar("p33_h19_ghayn"),    0, 1.15, 0, 0, 0, 0],
  ["h20", "harf", "ف",  "Fa",       A.harflar("p33_h20_fa"),       0, 0.75, 0, 0, 0, 0],
  ["h21", "harf", "ق",  "Qof",      A.harflar("p33_h21_qof"),      0, 0.78, 0, 0, 0, 0],
  ["h22", "harf", "ك",  "Kof",      A.harflar("p33_h22_kof"),      0, 0.75, 0, 0, 0, 0],
  ["h23", "harf", "ل",  "Lom",      A.harflar("p33_h23_lam"),      0, 0.90, 0, 0, 0, 0],
  ["h24", "harf", "م",  "Mim",      A.harflar("p33_h24_mim"),      0, 0.90, 0, 0, 0, 0],
  ["h25", "harf", "ن",  "Nun",      A.harflar("p33_h25_nun"),      0, 0.95, 0, 0, 0, 0],
  ["h26", "harf", "و",  "Vov",      A.harflar("p33_h26_waw"),      0, 0.90, 0, 0, 0, 0],
  ["h27", "harf", "ه",  "Ha",       A.harflar("p33_h27_haa"),      0, 0.80, 0, 0, 0, 0],
  ["h28", "harf", "لا", "Lom-alif", A.harflar("p33_h28_lamalif"),  0, 1.10, 0, 0, 0, 0],
  ["h29", "harf", "ي",  "Ya",       A.harflar("p33_h29_ya"),       0, 0.65, 0, 0, 0, 0],

  // ── BOTTOM: Muqatta'at Qur'aniya (14 ta) ──
  ["m_title",    "jumla", "مُقَطَّعَاتُ قُرْآنِيَّه", "Muqatta'at Qur'aniya",
    A.muqatta("p33_m_title"), 0, 3.20, 0, 0, 0, 0],
  ["m_subtitle", "jumla", "قرآندگى بعض سورهلرنينگ باشلريده گى حرفلرنينگ ناملرى بيلان اوقىلادى",
    "Qur'ondagi ba'zi suralar boshlaridagi harflar nomlari bilan o'qiladi",
    A.muqatta("p33_m_subtitle"), 0, 6.00, 0, 0, 0, 0],
  ["m01", "harf", "الٓم",       "Alif-Lom-Mim",          A.muqatta("p33_m01_alm"),         0, 6.90, 0, 0, 0, 0],
  ["m02", "harf", "الٓمٓصٓ",     "Alif-Lom-Mim-Sod",      A.muqatta("p33_m02_almsod"),      0, 8.65, 0, 0, 0, 0],
  ["m03", "harf", "الٓر",       "Alif-Lom-Ro",           A.muqatta("p33_m03_alr"),         0, 3.95, 0, 0, 0, 0],
  ["m04", "harf", "الٓمٓر",     "Alif-Lom-Mim-Ro",       A.muqatta("p33_m04_almr"),        0, 6.35, 0, 0, 0, 0],
  ["m05", "harf", "كٓهٓيٓعٓصٓ",   "Kof-Ha-Ya-Ayn-Sod",     A.muqatta("p33_m05_khsad"),       0, 8.85, 0, 0, 0, 0],
  ["m06", "harf", "طه",        "To-Ha",                 A.muqatta("p33_m06_taha"),        0, 1.35, 0, 0, 0, 0],
  ["m07", "harf", "طٓسٓم",      "To-Sin-Mim",            A.muqatta("p33_m07_tasm"),        0, 6.10, 0, 0, 0, 0],
  ["m08", "harf", "طٓسٓ",       "To-Sin",                A.muqatta("p33_m08_tas"),         0, 2.90, 0, 0, 0, 0],
  ["m09", "harf", "يٓسٓ",       "Ya-Sin",                A.muqatta("p33_m09_yasin"),       0, 3.15, 0, 0, 0, 0],
  ["m10", "harf", "صٓ",         "Sod",                   A.muqatta("p33_m10_sad"),         0, 2.50, 0, 0, 0, 0],
  ["m11", "harf", "حٓمٓ",       "Ha-Mim",                A.muqatta("p33_m11_hamim"),       0, 3.20, 0, 0, 0, 0],
  ["m12", "harf", "حٓمٓ عٓسٓقٓ", "Ha-Mim Ayn-Sin-Qof",     A.muqatta("p33_m12_hamim_aynsq"), 0,11.00, 0, 0, 0, 0],
  ["m13", "harf", "قٓ",         "Qof",                   A.muqatta("p33_m13_qaf"),         0, 2.50, 0, 0, 0, 0],
  ["m14", "harf", "نٓ",         "Nun",                   A.muqatta("p33_m14_nun"),         0, 3.00, 0, 0, 0, 0],
];

// ============================================================
// PAGES 34-35 — Kalimalar (Islamic declarations)
// ============================================================
const p34: ED[] = [
  // Title (top center)
  ["title",   "jumla", "كَلِمَاتُ إِيمَانٍ", "Iymon kalimalari", A.kl("p34_title"), 0, 1.542, 0, 0, 0, 0],

  // Kalima 1 — Tayyiba
  ["k1_head", "jumla", "كَلِمَةُ طَيِّبَةٌ", "Kalimai tayyiba (pok kalima)", A.kl("p34_k1_head"), 0, 1.758, 0, 0, 0, 0],
  ["k1_body", "jumla", "لَا اِلٰهَ اِلَّا اللّٰهُ مُحَمَّدٌ رَسُولُ اللّٰهِ",
    "La ilaha illallah, Muhammadur Rasululloh", A.kl("p34_k1_body"), 0, 7.497, 0, 0, 0, 0],

  // Kalima 2 — Shahada
  ["k2_head", "jumla", "كَلِمَةُ الشَّهَادَةِ", "Kalimai shahodat (guvohlik kalimasi)", A.kl("p34_k2_head"), 0, 1.438, 0, 0, 0, 0],
  // Shahada — yagona button (foydalanuvchi qarori 2026-05-22): gul olib
  // tashlandi, ikkala qism bitta matn ichida birlashtirildi. Audio to'liq
  // chunk (10.87s) uzluksiz oqimda o'qiladi.
  ["k2_body", "jumla", "اَشْهَدُ اَنْ لَا اِلٰهَ اِلَّا اللّٰهُ وَاَشْهَدُ اَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    "Guvohlik beraman: Allohdan boshqa iloh yo'q va Muhammad Uning bandasi va rasulidir",
    A.kl("p34_k2_full"), 0, 10.868, 0, 0, 0, 0],

  // Kalima 3 — Tawhid
  ["k3_head", "jumla", "كَلِمَةُ التَّوْحِيدِ", "Kalimai tavhid (yakkalik kalimasi)", A.kl("p34_k3_head"), 0, 1.510, 0, 0, 0, 0],
  ["k3_p1",   "jumla", "اَشْهَدُ اَنْ لَا اِلٰهَ اِلَّا اللّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    "Guvohlik beraman: Yakka, sherigi yo'q Allohdan boshqa iloh yo'q", A.kl("p34_k3_p1"), 0, 7.643, 0, 0, 0, 0],
  ["k3_p2",   "jumla", "لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِى وَيُمِيتُ",
    "Mulk Uniki, hamd Uniki, tiriltiradi va o'ldiradi", A.kl("p34_k3_p2"), 0, 5.219, 0, 0, 0, 0],
  ["k3_p3",   "jumla", "وَهُوَ حَىٌّ لَا يَمُوتُ",
    "U tirik, o'lmaydi", A.kl("p34_k3_p3"), 0, 3.074, 0, 0, 0, 0],
  ["k3_p4",   "jumla", "بِيَدِهِ الْخَيْرُ وَهُوَ عَلٰى كُلِّ شَىْءٍ قَدِيرٌ",
    "Yaxshilik Uning qo'lida, U har narsaga qodir", A.kl("p34_k3_p4"), 0, 6.558, 0, 0, 0, 0],

  // Kalima 4 — Radd-i Kufr
  ["k4_head", "jumla", "كَلِمَةُ رَدِّ الْكُفْرُ", "Kalimai raddi kufru (kufrni rad kalimasi)", A.kl("p34_k4_head"), 0, 1.695, 0, 0, 0, 0],
  ["k4_p1",   "jumla", "اَللّٰهُمَّ اِنِّى اَعُوذُبِكَ مِنْ اَنْ اُشْرِكَ بِكَ شَيْأً وَاَنَا اَعْلَمُ",
    "Ey Alloh, men bilgan holda Senga biror shirk keltirib qo'yishdan Senga panoh tilayman",
    A.kl("p34_k4_p1"), 0, 10.341, 0, 0, 0, 0],
  ["k4_p2",   "jumla", "وَاَسْتَغْفِرُكَ لِمَا لَا اَعْلَمُ",
    "Va bilmagan narsalarim uchun mag'firat so'rayman", A.kl("p34_k4_p2"), 0, 5.078, 0, 0, 0, 0],
  ["k4_p3",   "jumla", "اِنَّكَ اَنْتَ عَلَّامُ الْغُيُوبِ",
    "Shubhasiz Sen g'oyiblarni juda yaxshi bilguvchisan", A.kl("p34_k4_p3"), 0, 5.210, 0, 0, 0, 0],

  // Kalima 5 — Istighfar
  ["k5_head", "jumla", "كَلِمَةُ الْاِسْتِغْفَارِ", "Kalimai istig'for (mag'firat so'rash kalimasi)", A.kl("p34_k5_head"), 0, 1.846, 0, 0, 0, 0],
  ["k5_ast1", "jumla", "اَسْتَغْفِرُ اللّٰهَ", "Allohdan mag'firat so'rayman", A.kl("p34_k5_ast1"), 0, 2.763, 0, 0, 0, 0],
  ["k5_ast2", "jumla", "اَسْتَغْفِرُ اللّٰهَ", "Allohdan mag'firat so'rayman", A.kl("p34_k5_ast2"), 0, 2.827, 0, 0, 0, 0],
  // 3-Astaghfirullaha va davom ("ta'ala min kulli dhanbin...") birlashtirilgan —
  // foydalanuvchi qarori 2026-05-22: audio uzluksiz, matn birga ko'rinadi.
  ["k5_ast3_ext", "jumla", "اَسْتَغْفِرُ اللّٰهَ تَعَالٰى مِنْ كُلِّ ذَنْبٍ اَذْنَبْتُهُ عَمْدًا اَوْ خَطَأً",
    "Yuksalgan Allohdan mag'firat so'rayman har bir qasdan yoki xato qilgan gunohimdan",
    A.kl("p34_k5_ast3_ext"), 0, 10.966, 0, 0, 0, 0],
  // Audio kengaytmasi (kitobning sirran'idan keyin) — 3 segment, audio 52 da reciter qo'shgan:
  ["k5_p2_alaniya", "jumla", "سِرًّا اَوْ عَلَانِيَةً",
    "Yashirin yoki oshkora", A.kl("p34_k5_p2_alaniya"), 0, 2.581, 0, 0, 0, 0],
  ["k5_p3_tawba",   "jumla", "وَاَتُوبُ اِلَيْهِ مِنَ الذَّنْبِ الَّذِى اَعْلَمُ وَمِنَ الذَّنْبِ الَّذِى لَا اَعْلَمُ",
    "Va Unga tavba qilaman bilgan gunohimdan ham, bilmagan gunohimdan ham",
    A.kl("p34_k5_p3_tawba"), 0, 10.735, 0, 0, 0, 0],
  ["k5_p4_ghuyub",  "jumla", "اِنَّكَ اَنْتَ عَلَّامُ الْغُيُوبِ",
    "Shubhasiz Sen g'oyiblarni juda yaxshi bilguvchisan",
    A.kl("p34_k5_p4_ghuyub"), 0, 4.789, 0, 0, 0, 0],
];

const p35: ED[] = [
  // 2026-05-21 — sources 53-55. kalimalar 05-07.mp3
  // Kalima 6 — Tamjid (head + 4 qism + bonus)
  ["tamjid_head", "jumla", "كَلِمَةُ التَّمْجِيدِ", "Kalimai tamjid",
    A.kl5("p35_tamjid_head"), 0, 1.80, 0, 0, 0, 0],
  ["tamjid_p1",   "jumla", "سُبْحَانَ اللّٰهِ", "Subhanallah",
    A.kl5("p35_tamjid_p1"), 0, 2.70, 0, 0, 0, 0],
  ["tamjid_p2",   "jumla", "وَالْحَمْدُ لِلّٰهِ", "Walhamdu lillah",
    A.kl5("p35_tamjid_p2"), 0, 2.85, 0, 0, 0, 0],
  ["tamjid_p3",   "jumla", "وَلَا اِلٰهَ اِلَّا اللّٰهُ وَاللّٰهُ اَكْبَرُ",
    "Wa la ilaha illallah wallahu akbar",
    A.kl5("p35_tamjid_p3"), 0, 6.85, 0, 0, 0, 0],
  // Asl audio'da boshidagi "wa" yo'q — reciter "La hawla wa la quwwata..." deb
  // boshlaydi (tamjid_p3 dan keyin 1.9s pauza). Matn audioga moslangan
  // (foydalanuvchi qarori 2026-05-22).
  ["tamjid_p4",   "jumla", "لَا حَوْلَ وَلَا قُوَّةَ اِلَّا بِاللّٰهِ الْعَلِيِّ الْعَظِيمِ",
    "La hawla wa la quwwata illa billahil-aliyyil-azim (Havqala)",
    A.kl5("p35_tamjid_p4"), 0, 8.85, 0, 0, 0, 0],
  ["mashallah",   "jumla", "مَا شَاءَ اللّٰهُ كَانَ وَمَا لَمْ يَشَأْ لَمْ يَكُنْ",
    "Ma sha'allahu kana wa ma lam yasha' lam yakun",
    A.kl5("p35_mashallah"), 0, 8.20, 0, 0, 0, 0],

  // Iman ta'rifi (kalimalardan oldin)
  ["iman_def",    "jumla", "اَلْاِيمَانُ اِقْرَارٌ بِاللِّسَانِ وَتَصْدِيقٌ بِالْقَلْبِ بِمَا جَاءَ بِهِ مِنْ عِنْدِ اللّٰهِ مُحَمَّدٌ رَسُولُ اللّٰهِ",
    "Iymon — til bilan iqror, qalb bilan tasdiq qilishdir",
    A.kl5("p35_iman_def"), 0, 20.65, 0, 0, 0, 0],
  ["salawat",     "jumla", "صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ",
    "Sollallohu alayhi wa sallam", A.kl5("p35_salawat"), 0, 4.70, 0, 0, 0, 0],

  // Kalima 7 — Iman mujmal
  ["mujmal_head", "jumla", "اِيمَانِ مُجْمَلْ", "Iymoni mujmal (qisqacha iymon)",
    A.kl5("p35_mujmal_head"), 0, 4.30, 0, 0, 0, 0],
  ["mujmal_body", "jumla", "اٰمَنْتُ بِاللّٰهِ كَمَا هُوَ بِاَسْمَائِهِ وَصِفَاتِهِ وَقَبِلْتُ جَمِيعَ اَحْكَامِهِ",
    "Allohga, Uning ism va sifatlari bilan iymon keltirdim",
    A.kl5("p35_mujmal_body"), 0, 13.00, 0, 0, 0, 0],

  // Kalima 8 — Iman mufassal
  ["mufassal_head", "jumla", "اِيمَانِ مُفَصَّلْ", "Iymoni mufassal (batafsil iymon)",
    A.kl5("p35_mufassal_head"), 0, 4.30, 0, 0, 0, 0],
  ["mufassal_body", "jumla", "اٰمَنْتُ بِاللّٰهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْاٰخِرِ وَالْقَدَرِ خَيْرِهِ وَشَرِّهِ مِنَ اللّٰهِ تَعَالٰى وَالْبَعْثِ بَعْدَ الْمَوْتِ",
    "Allohga, farishta, kitob, rasul, oxirat, taqdir va qaytadan tirilishga iymon",
    A.kl5("p35_mufassal_body"), 0, 22.65, 0, 0, 0, 0],
];

// ============================================================
// PAGES 36-47 — Suralar (Qur'an surahs)
// ============================================================
// PAGE 36 — Ta'awwudh + Surat al-Fatiha (7 verses) + Surat al-Baqarah (1-5)
// Sources: 56. Fotiha.mp3 (83.30s) + 57. Baqara.mp3 (94.46s)
// Chunks: /audio/edit/56_fotiha_baqara/p36_*.mp3 (14 chunks)
// Audio mapping (silencedetect -30dB/0.30s + Whisper medium transcribe, 2026-05-21):
//   Fotiha: 1.27-8.07 ta'awwudh; 10.16-16.41 bismillah (v1); 21.12-27.64 v2;
//           29.83-34.05 v3; 36.91-41.25 v4; 44.92-51.98 v5; 55.83-61.61 v6;
//           65.48-81.83 v7.
//   Baqara: 1.76-6.98 bismillah; 11.43-18.67 v1 (alif lam mim); 21.88-33.30 v2
//           (joint with sub-pauses); 36.51-50.59 v3; 55.35-77.07 v4 (joint);
//           80.22-90.51 v5.
const p36: ED[] = [
  // Ta'awwudh — top of page
  ["taawwudh", "jumla", "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    "A'uzubillahi minash-shaytonir-rojiym", A.sb("p36_taawwudh"), 0, 7.10, 0, 0, 0, 0],

  // ── Surat al-Fatiha (سُورَةُ الْفَاتِحَة) ──
  ["fa_bismi", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",
    "Fotiha 1-oyat: Bismillahir-rohmanir-rohim", A.sb("p36_fa_bismi"), 0, 6.40, 0, 0, 0, 0],
  ["fa_v2", "jumla", "اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِينَ",
    "Fotiha 2-oyat: Olamlar Robbi Allohga hamdlar bo'lsin",
    A.sb("p36_fa_v2"), 0, 6.80, 0, 0, 0, 0],
  ["fa_v3", "jumla", "الرَّحْمٰنِ الرَّحِيمِ",
    "Fotiha 3-oyat: U Rohman va Rohimdir",
    A.sb("p36_fa_v3"), 0, 4.40, 0, 0, 0, 0],
  ["fa_v4", "jumla", "مٰلِكِ يَوْمِ الدِّينِ",
    "Fotiha 4-oyat: Din kunining egasi",
    A.sb("p36_fa_v4"), 0, 4.60, 0, 0, 0, 0],
  ["fa_v5", "jumla", "اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِينُ",
    "Fotiha 5-oyat: Faqat Senga ibodat qilamiz va faqat Sendan yordam so'raymiz",
    A.sb("p36_fa_v5"), 0, 7.25, 0, 0, 0, 0],
  ["fa_v6", "jumla", "اِهْدِنَا الصِّرٰطَ الْمُسْتَقِيمَ",
    "Fotiha 6-oyat: Bizni to'g'ri yo'lga boshla",
    A.sb("p36_fa_v6"), 0, 6.00, 0, 0, 0, 0],
  ["fa_v7", "jumla", "صِرٰطَ الَّذِينَ اَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    "Fotiha 7-oyat: O'zing in'om etgan zotlar yo'liga — g'azabga uchraganlar va adashganlarning emas",
    A.sb("p36_fa_v7"), 0, 16.55, 0, 0, 0, 0],

  // ── Awwal Surat al-Baqarah (اَوَّلُ سُورَةِ الْبَقَرَة) ──
  ["bq_bismi", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",
    "Bismillahir-rohmanir-rohim", A.sb("p36_bq_bismi"), 0, 5.40, 0, 0, 0, 0],
  ["bq_v1", "jumla", "الٓمٓ",
    "Baqara 1-oyat: Alif Lom Mim",
    A.sb("p36_bq_v1"), 0, 7.45, 0, 0, 0, 0],
  ["bq_v2", "jumla", "ذٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِلْمُتَّقِينَ",
    "Baqara 2-oyat: Bu kitobda shubha yo'q — taqvodorlar uchun hidoyatdir",
    A.sb("p36_bq_v2"), 0, 11.65, 0, 0, 0, 0],
  ["bq_v3", "jumla", "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلٰوةَ وَمِمَّا رَزَقْنٰهُمْ يُنْفِقُونَ",
    "Baqara 3-oyat: G'aybga iymon keltirib, namozni to'kis ado qilib, biz bergan rizqdan infoq qiluvchilar",
    A.sb("p36_bq_v3"), 0, 14.25, 0, 0, 0, 0],
  ["bq_v4", "jumla", "وَالَّذِينَ يُؤْمِنُونَ بِمَا اُنْزِلَ اِلَيْكَ وَمَا اُنْزِلَ مِنْ قَبْلِكَ وَبِالْاٰخِرَةِ هُمْ يُوقِنُونَ",
    "Baqara 4-oyat: Va senga nozil qilingan va sendan oldin nozil qilinganga iymon keltirib, oxiratga aniq ishonurlar",
    A.sb("p36_bq_v4"), 0, 21.90, 0, 0, 0, 0],
  ["bq_v5", "jumla", "اُولٰئِكَ عَلٰى هُدًى مِنْ رَبِّهِمْ وَاُولٰئِكَ هُمُ الْمُفْلِحُونَ",
    "Baqara 5-oyat: Ana o'shalar Robbilaridan hidoyatdadirlar va ana o'shalar najot topguvchilardir",
    A.sb("p36_bq_v5"), 0, 12.80, 0, 0, 0, 0],
];

// p37 — Surah Ash-Shams (1-15) + Surah Al-Layl boshi (Bismillah + ayahs 1-7 + ayah 8 fragment)
// Audio source: 58. Shams.mp3 (Materiallar/suralarning asl nusxalari/audio).
// Chunks: public/audio/edit/58_shams/ and 59_layl/.
const p37: ED[] = [
  // --- Surah Ash-Shams ---
  ["sh_title", "jumla", "سُورَةُ الشَّمْسِ", "Shams surasi", null, 0, 0, 50, 3, 32, 5],
  ["sh_bismillah", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ", "Bismillah", A.shams("p37_sh_bismillah"), 0, 5.8, 50, 9, 48, 5],
  ["sh_a1", "jumla", "وَالشَّمْسِ وَضُحَاهَا", "1-oyat: Quyosh va uning yorug'ligiga qasam", A.shams("p37_sh_a1"), 0, 3.85, 50, 15, 38, 5],
  ["sh_a2", "jumla", "وَالْقَمَرِ إِذَا تَلَاهَا", "2-oyat: Quyoshga ergashgan oyga qasam", A.shams("p37_sh_a2"), 0, 4.35, 50, 21, 42, 5],
  ["sh_a3", "jumla", "وَالنَّهَارِ إِذَا جَلَّاهَا", "3-oyat: Quyoshni yoritgan kunduzga qasam", A.shams("p37_sh_a3"), 0, 5.4, 50, 27, 44, 5],
  ["sh_a4", "jumla", "وَاللَّيْلِ إِذَا يَغْشَاهَا", "4-oyat: Quyoshni qoplagan kechaga qasam", A.shams("p37_sh_a4"), 0, 5.0, 50, 33, 44, 5],
  ["sh_a5", "jumla", "وَالسَّمَاءِ وَمَا بَنَاهَا", "5-oyat: Osmon va uni qurganga qasam", A.shams("p37_sh_a5"), 0, 5.8, 50, 39, 44, 5],
  ["sh_a6", "jumla", "وَالْأَرْضِ وَمَا طَحَاهَا", "6-oyat: Yer va uni yoyganga qasam", A.shams("p37_sh_a6"), 0, 4.55, 50, 45, 42, 5],
  ["sh_a7", "jumla", "وَنَفْسٍ وَمَا سَوَّاهَا", "7-oyat: Jon va uni tartiblaganga qasam", A.shams("p37_sh_a7"), 0, 5.3, 50, 51, 42, 5],
  ["sh_a8", "jumla", "فَأَلْهَمَهَا فُجُورَهَا وَتَقْوَاهَا", "8-oyat: Unga fojirlik va taqvolikni ilhom qilgan", A.shams("p37_sh_a8"), 0, 6.55, 50, 57, 54, 5],
  ["sh_a9", "jumla", "قَدْ أَفْلَحَ مَن زَكَّاهَا", "9-oyat: Uni pokligan kishi rastgor bo'ldi", A.shams("p37_sh_a9"), 0, 5.25, 50, 63, 46, 5],
  ["sh_a10", "jumla", "وَقَدْ خَابَ مَن دَسَّاهَا", "10-oyat: Uni gunohga botirgan kishi noumid bo'ldi", A.shams("p37_sh_a10"), 0, 5.1, 50, 69, 48, 5],
  ["sh_a11", "jumla", "كَذَّبَتْ ثَمُودُ بِطَغْوَاهَا", "11-oyat: Samud (qavmi) tug'yoni bilan yolg'on chiqardi", A.shams("p37_sh_a11"), 0, 5.0, 50, 75, 50, 5],
  ["sh_a12", "jumla", "إِذِ انْبَعَثَ أَشْقَاهَا", "12-oyat: Eng baxtsizlari otilib chiqqanida", A.shams("p37_sh_a12"), 0, 4.55, 50, 81, 44, 5],
  ["sh_a13", "jumla", "فَقَالَ لَهُمْ رَسُولُ اللَّهِ نَاقَةَ اللَّهِ وَسُقْيَاهَا", "13-oyat: Alloh rasuli ularga: Bu Allohning tuyasi va uni sug'orish (haqi)dir, dedi", A.shams("p37_sh_a13"), 0, 9.0, 50, 87, 70, 5],
  ["sh_a14", "jumla", "فَكَذَّبُوهُ فَعَقَرُوهَا فَدَمْدَمَ عَلَيْهِمْ رَبُّهُمْ بِذَنْبِهِمْ فَسَوَّاهَا", "14-oyat: Lekin uni yolg'onchi qildilar, (tuyani) so'ydilar; gunohlari sabab Robblari ularni halok etib, tekisladi", A.shams("p37_sh_a14"), 0, 12.85, 50, 93, 80, 5],
  ["sh_a15", "jumla", "وَلَا يَخَافُ عُقْبَاهَا", "15-oyat: Va (Alloh) uning oqibatidan qo'rqmaydi", A.shams("p37_sh_a15"), 0, 4.3, 50, 99, 40, 5],
  // --- Surah Al-Layl boshi ---
  ["ll_title", "jumla", "سُورَةُ اللَّيْلِ", "Layl surasi", null, 0, 0, 50, 110, 30, 5],
  ["ll_bismillah", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ", "Bismillah", A.layl("p37_ll_bismillah"), 0, 5.4, 50, 116, 48, 5],
  ["ll_a1", "jumla", "وَاللَّيْلِ إِذَا يَغْشَى", "1-oyat: Kecha qoplaganida unga qasam", A.layl("p37_ll_a1"), 0, 4.2, 50, 122, 42, 5],
  ["ll_a2", "jumla", "وَالنَّهَارِ إِذَا تَجَلَّى", "2-oyat: Kunduz yorishganida unga qasam", A.layl("p37_ll_a2"), 0, 4.6, 50, 128, 44, 5],
  ["ll_a3", "jumla", "وَمَا خَلَقَ الذَّكَرَ وَالْأُنْثَى", "3-oyat: Erkak va ayolni yaratganga qasam", A.layl("p37_ll_a3"), 0, 5.7, 50, 134, 52, 5],
  ["ll_a4", "jumla", "إِنَّ سَعْيَكُمْ لَشَتَّى", "4-oyat: Sa'y-harakatlaringiz turli-tumandir", A.layl("p37_ll_a4"), 0, 4.9, 50, 140, 42, 5],
  ["ll_a5", "jumla", "فَأَمَّا مَنْ أَعْطَى وَاتَّقَى", "5-oyat: Bergan va taqvodor bo'lgan kishi", A.layl("p37_ll_a5"), 0, 5.4, 50, 146, 50, 5],
  ["ll_a6", "jumla", "وَصَدَّقَ بِالْحُسْنَى", "6-oyat: Eng yaxshini tasdiqlagan", A.layl("p37_ll_a6"), 0, 3.7, 50, 152, 40, 5],
  ["ll_a7", "jumla", "فَسَنُيَسِّرُهُ لِلْيُسْرَى", "7-oyat: Unga osonlikni muyassar qilamiz", A.layl("p37_ll_a7"), 0, 5.0, 50, 158, 44, 5],
  // 2026-05-22: "وَأَمَّا" 8-oyat fragment olib tashlandi (foydalanuvchi qarori) —
  // p37 endi Layl 1-7 da to'xtaydi, p38 to'liq 8-oyat bilan boshlanadi.
];

// p38 — Surah Al-Layl (ayahs 8-21, davom p37 dan)
//        + Surah Ad-Duho divider (title + bismillah)
//        + Surah Ad-Duho (ayahs 1-10; v.11 keyingi sahifaga davom).
// Sources: 59. Layl.mp3 (a8-a21), 60. Zuho.mp3 (bismillah + a1-a10).
// Chunks via tools/cut_p38.sh (silencedetect -32dB/0.70s + ~0.20s buffers).
const p38: ED[] = [
  // --- Al-Layl ayahs 8-21 (continuation from p37) ---
  ["ll_a8",  "jumla", "وَاَمَّا مَنْ بَخِلَ وَاسْتَغْنٰى",                "Layl 8-oyat: Baxillik qilib boylikni ko'rsa-chi",          A.layl("p38_ll_a8"),  0, 5.8,  0, 0, 0, 0],
  ["ll_a9",  "jumla", "وَكَذَّبَ بِالْحُسْنٰى",                          "Layl 9-oyat: Va eng yaxshini yolg'on desa",                A.layl("p38_ll_a9"),  0, 3.45, 0, 0, 0, 0],
  ["ll_a10", "jumla", "فَسَنُيَسِّرُهُ لِلْعُسْرٰى",                      "Layl 10-oyat: Biz uni qiyinlikka osonlashtiramiz",          A.layl("p38_ll_a10"), 0, 4.65, 0, 0, 0, 0],
  ["ll_a11", "jumla", "وَمَا يُغْنِى عَنْهُ مَالُهُ اِذَا تَرَدّٰى",       "Layl 11-oyat: Halok bo'lganda moli unga foyda bermaydi",    A.layl("p38_ll_a11"), 0, 7.85, 0, 0, 0, 0],
  ["ll_a12", "jumla", "اِنَّ عَلَيْنَا لَلْهُدٰى",                        "Layl 12-oyat: Albatta hidoyat berish Bizning zimmamizda",   A.layl("p38_ll_a12"), 0, 4.4,  0, 0, 0, 0],
  ["ll_a13", "jumla", "وَاِنَّ لَنَا لَلْاٰخِرَةَ وَالْاُولٰى",            "Layl 13-oyat: Oxirat ham, dunyo ham Bizniki",               A.layl("p38_ll_a13"), 0, 6.3,  0, 0, 0, 0],
  ["ll_a14", "jumla", "فَاَنْذَرْتُكُمْ نَارًا تَلَظّٰى",                  "Layl 14-oyat: Sizlarni alangali olovdan ogohlantirdim",      A.layl("p38_ll_a14"), 0, 6.1,  0, 0, 0, 0],
  ["ll_a15", "jumla", "لَا يَصْلٰىهَآ اِلَّا الْاَشْقَى",                 "Layl 15-oyat: Unga faqat eng baxtsiz kishi kiradi",         A.layl("p38_ll_a15"), 0, 6.45, 0, 0, 0, 0],
  ["ll_a16", "jumla", "الَّذِىْ كَذَّبَ وَتَوَلّٰى",                      "Layl 16-oyat: U yolg'on chiqarib, yuz o'girgan kishi",       A.layl("p38_ll_a16"), 0, 4.35, 0, 0, 0, 0],
  ["ll_a17", "jumla", "وَسَيُجَنَّبُهَا الْاَتْقَى",                      "Layl 17-oyat: Eng taqvodor kishi undan uzoq qilinadi",       A.layl("p38_ll_a17"), 0, 4.5,  0, 0, 0, 0],
  ["ll_a18", "jumla", "الَّذِىْ يُؤْتِىْ مَالَهُ يَتَزَكّٰى",              "Layl 18-oyat: Mol-mulkini berib (gunohlardan) tozalanuvchi", A.layl("p38_ll_a18"), 0, 6.0,  0, 0, 0, 0],
  ["ll_a19", "jumla", "وَمَا لِاَحَدٍ عِنْدَهُ مِنْ نِعْمَةٍ تُجْزٰى",      "Layl 19-oyat: Birovning unga muqobil ne'mati yo'q",          A.layl("p38_ll_a19"), 0, 9.0,  0, 0, 0, 0],
  ["ll_a20", "jumla", "اِلَّا ابْتِغَآءَ وَجْهِ رَبِّهِ الْاَعْلٰى",       "Layl 20-oyat: Faqat eng yuksak Robbining yuzini istab",      A.layl("p38_ll_a20"), 0, 7.35, 0, 0, 0, 0],
  ["ll_a21", "jumla", "وَلَسَوْفَ يَرْضٰى",                              "Layl 21-oyat: Va albatta u rozi bo'ladi",                    A.layl("p38_ll_a21"), 0, 3.15, 0, 0, 0, 0],

  // --- Surah Ad-Duho divider: title (no audio) + bismillah ---
  ["du_title", "jumla", "سُورَةُ الضُّحٰى",                              "Duho surasi", null, 0, 0, 0, 0, 0, 0],
  ["du_bism",  "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",         "Bismillah",   A.zuho("p38_zh_bismillah"), 0, 4.95, 0, 0, 0, 0],

  // --- Ad-Duho ayahs 1-10 (ayah 11 is on p39) ---
  ["du_a1",  "jumla", "وَالضُّحٰى",                                      "Duho 1-oyat: Tushki yorug'likka qasam",                       A.zuho("p38_zh_a1"),  0, 1.9,  0, 0, 0, 0],
  ["du_a2",  "jumla", "وَالَّيْلِ اِذَا سَجٰى",                          "Duho 2-oyat: Kech sukunatga botganida unga qasam",            A.zuho("p38_zh_a2"),  0, 3.45, 0, 0, 0, 0],
  ["du_a3",  "jumla", "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلٰى",               "Duho 3-oyat: Robbing seni tark etmadi va g'azab qilmadi",      A.zuho("p38_zh_a3"),  0, 4.9,  0, 0, 0, 0],
  ["du_a4",  "jumla", "وَلَلْاٰخِرَةُ خَيْرٌ لَكَ مِنَ الْاُولٰى",       "Duho 4-oyat: Oxirat sen uchun dunyodan ko'ra yaxshiroq",       A.zuho("p38_zh_a4"),  0, 6.25, 0, 0, 0, 0],
  ["du_a5",  "jumla", "وَلَسَوْفَ يُعْطِيْكَ رَبُّكَ فَتَرْضٰى",          "Duho 5-oyat: Robbing senga shunday beradiki, rozi bo'lasan",   A.zuho("p38_zh_a5"),  0, 5.85, 0, 0, 0, 0],
  ["du_a6",  "jumla", "اَلَمْ يَجِدْكَ يَتِيْمًا فَاٰوٰى",                "Duho 6-oyat: Seni yetim topib, panoh bermadimi?",              A.zuho("p38_zh_a6"),  0, 5.45, 0, 0, 0, 0],
  ["du_a7",  "jumla", "وَوَجَدَكَ ضَآلًّا فَهَدٰى",                       "Duho 7-oyat: Seni yo'lsiz topib, hidoyat qildi",                A.zuho("p38_zh_a7"),  0, 7.15, 0, 0, 0, 0],
  ["du_a8",  "jumla", "وَوَجَدَكَ عَآئِلًا فَاَغْنٰى",                    "Duho 8-oyat: Seni kambag'al topib, boy qildi",                  A.zuho("p38_zh_a8"),  0, 6.4,  0, 0, 0, 0],
  ["du_a9",  "jumla", "فَاَمَّا الْيَتِيْمَ فَلَا تَقْهَرْ",              "Duho 9-oyat: Bas, yetimga zulm qilma",                          A.zuho("p38_zh_a9"),  0, 5.15, 0, 0, 0, 0],
  ["du_a10", "jumla", "وَاَمَّا السَّآئِلَ فَلَا تَنْهَرْ",                "Duho 10-oyat: Va tilamchini quvib yuborma",                     A.zuho("p38_zh_a10"), 0, 6.3,  0, 0, 0, 0],
];

// p39 — End of Surah Ad-Duho (v.11) + Surah Ash-Sharh (8) + Surah At-Tin (8) + Surah Al-Alaq header
// Sources: 60. Zuho.mp3 (Duho v.11) + 61. Sharh.mp3 + 62. Tiyn.mp3 + 63. Alaq.mp3 (bismillah only).
// Chunks: 60_zuho/, 61_sharh/, 62_tiyn/, 63_alaq/ (cut via tools/cut_p39.sh).
const p39: ED[] = [
  // --- Surah Ad-Duho — verse 11 (last verse; v.1-10 on p38) ---
  ["duho_v11", "jumla", "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ", "Duho 11-oyat: Rabbing ne'matini hikoya qilgin", A.zuho("p39_duho_v11"), 0, 6.01, 0, 0, 0, 0],

  // --- Surah Ash-Sharh — bismillah + 8 ayat ---
  ["sharh_bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ", "Sharh surasi: Bismillah", A.sharh("p39_sharh_bism"), 0, 5.58, 0, 0, 0, 0],
  ["sharh_v1", "jumla", "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", "Sharh 1-oyat: Sening qalbingni keng qilmadikmi?", A.sharh("p39_sharh_v1"), 0, 3.76, 0, 0, 0, 0],
  ["sharh_v2", "jumla", "وَوَضَعْنَا عَنْكَ وِزْرَكَ", "Sharh 2-oyat: Va sendan og'ir yukingni olib tashladik", A.sharh("p39_sharh_v2"), 0, 4.42, 0, 0, 0, 0],
  ["sharh_v3", "jumla", "الَّذِي أَنْقَضَ ظَهْرَكَ", "Sharh 3-oyat: U sening belingni sindirgan edi", A.sharh("p39_sharh_v3"), 0, 5.68, 0, 0, 0, 0],
  ["sharh_v4", "jumla", "وَرَفَعْنَا لَكَ ذِكْرَكَ", "Sharh 4-oyat: Va senga zikringni ko'tardik", A.sharh("p39_sharh_v4"), 0, 3.77, 0, 0, 0, 0],
  ["sharh_v5", "jumla", "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", "Sharh 5-oyat: Qiyinchilik bilan birga osonlik bor", A.sharh("p39_sharh_v5"), 0, 4.88, 0, 0, 0, 0],
  ["sharh_v6", "jumla", "إِنَّ مَعَ الْعُسْرِ يُسْرًا", "Sharh 6-oyat: Qiyinchilik bilan birga osonlik bor", A.sharh("p39_sharh_v6"), 0, 4.45, 0, 0, 0, 0],
  ["sharh_v7", "jumla", "فَإِذَا فَرَغْتَ فَانْصَبْ", "Sharh 7-oyat: Bo'shashganingda mehnat qil", A.sharh("p39_sharh_v7"), 0, 4.22, 0, 0, 0, 0],
  ["sharh_v8", "jumla", "وَإِلَىٰ رَبِّكَ فَارْغَبْ", "Sharh 8-oyat: Va faqat Rabbingga raghbat qil", A.sharh("p39_sharh_v8"), 0, 3.69, 0, 0, 0, 0],

  // --- Surah At-Tin — bismillah + 8 ayat ---
  ["tin_bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ", "Tin surasi: Bismillah", A.tiyn("p39_tin_bism"), 0, 4.93, 0, 0, 0, 0],
  ["tin_v1", "jumla", "وَالتِّينِ وَالزَّيْتُونِ", "Tin 1-oyat: Tin va zaytunga qasam", A.tiyn("p39_tin_v1"), 0, 4.14, 0, 0, 0, 0],
  ["tin_v2", "jumla", "وَطُورِ سِينِينَ", "Tin 2-oyat: Sinin tog'iga qasam", A.tiyn("p39_tin_v2"), 0, 3.46, 0, 0, 0, 0],
  ["tin_v3", "jumla", "وَهٰذَا الْبَلَدِ الْأَمِينِ", "Tin 3-oyat: Va bu xavfsiz shaharga qasam", A.tiyn("p39_tin_v3"), 0, 4.73, 0, 0, 0, 0],
  ["tin_v4", "jumla", "لَقَدْ خَلَقْنَا الْإِنْسَانَ فِي أَحْسَنِ تَقْوِيمٍ", "Tin 4-oyat: Insonni eng go'zal qiyofada yaratdik", A.tiyn("p39_tin_v4"), 0, 9.08, 0, 0, 0, 0],
  ["tin_v5", "jumla", "ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ", "Tin 5-oyat: Keyin uni eng past darajaga qaytardik", A.tiyn("p39_tin_v5"), 0, 6.78, 0, 0, 0, 0],
  ["tin_v6", "jumla", "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ", "Tin 6-oyat: Iymon keltirib solih amal qilganlar bundan mustasno — ularga to'xtovsiz ajr bor", A.tiyn("p39_tin_v6"), 0, 12.36, 0, 0, 0, 0],
  ["tin_v7", "jumla", "فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ", "Tin 7-oyat: Bundan keyin nima sening jazo kunini inkor ettiradi?", A.tiyn("p39_tin_v7"), 0, 6.07, 0, 0, 0, 0],
  ["tin_v8", "jumla", "أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ", "Tin 8-oyat: Alloh hokimlarning eng hokimi emasmi?", A.tiyn("p39_tin_v8"), 0, 6.93, 0, 0, 0, 0],

  // --- Surah Al-Alaq — header only (bismillah); body on p40 ---
  ["alaq_bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ", "Alaq surasi: Bismillah", A.alq("p39_alaq_bism"), 0, 5.33, 0, 0, 0, 0],
];

// PAGE 40 — Suratu-l Alaq (19 ayat) + Suratu-l Qadr (Bismillah + 5 ayat)
// Audio sources:
//   - public/audio/63. Alaq.mp3  (147s)  → Bismillah + 19 oyat
//   - public/audio/64. Qadr.mp3  (49.84s) → Bismillah + 5 oyat
// Layout: Al-Alaq title is at end of p39 (book). Page 40 begins directly with
// verse 1. Al-Qadr title + bismillah + 5 verses occupy the bottom of p40.
const p40: ED[] = [
  // --- Suratu-l Alaq (19 ayat) ---
  ["a01", "jumla", "اِقْرَأْ بِاسْمِ رَبِّكَ الَّذِى خَلَقَ", "Alaq 1-oyat: O'qi! Yaratgan Rabbing nomi bilan", A.alq("p40_a01"), 0, 4.830, 0, 0, 0, 0],
  ["a02", "jumla", "خَلَقَ الْاِنْسَانَ مِنْ عَلَقٍ", "Alaq 2-oyat: U insonni laxta qondan yaratdi", A.alq("p40_a02"), 0, 4.670, 0, 0, 0, 0],
  ["a03", "jumla", "اِقْرَأْ وَرَبُّكَ الْاَكْرَمُ", "Alaq 3-oyat: O'qi! Rabbing eng karim", A.alq("p40_a03"), 0, 3.790, 0, 0, 0, 0],
  ["a04", "jumla", "الَّذِى عَلَّمَ بِالْقَلَمِ", "Alaq 4-oyat: U qalam bilan o'rgatdi", A.alq("p40_a04"), 0, 3.670, 0, 0, 0, 0],
  ["a05", "jumla", "عَلَّمَ الْاِنْسَانَ مَا لَمْ يَعْلَمْ", "Alaq 5-oyat: Insonga bilmagan narsasini o'rgatdi", A.alq("p40_a05"), 0, 5.560, 0, 0, 0, 0],
  ["a06", "jumla", "كَلَّا اِنَّ الْاِنْسَانَ لَيَطْغٰى", "Alaq 6-oyat: Yo'q! Albatta inson tajovuz qiladi", A.alq("p40_a06"), 0, 7.510, 0, 0, 0, 0],
  ["a07", "jumla", "اَنْ رَّاٰهُ اسْتَغْنٰى", "Alaq 7-oyat: O'zini boy ko'rgani uchun", A.alq("p40_a07"), 0, 3.260, 0, 0, 0, 0],
  ["a08", "jumla", "اِنَّ اِلٰى رَبِّكَ الرُّجْعٰى", "Alaq 8-oyat: Albatta qaytish Rabbingadir", A.alq("p40_a08"), 0, 4.530, 0, 0, 0, 0],
  ["a09", "jumla", "اَرَاَيْتَ الَّذِى يَنْهٰى", "Alaq 9-oyat: Qaytaruvchini ko'rdingmi?", A.alq("p40_a09"), 0, 3.780, 0, 0, 0, 0],
  ["a10", "jumla", "عَبْدًا اِذَا صَلّٰى", "Alaq 10-oyat: Namoz o'qigan bandani", A.alq("p40_a10"), 0, 3.220, 0, 0, 0, 0],
  ["a11", "jumla", "اَرَاَيْتَ اِنْ كَانَ عَلَى الْهُدٰى", "Alaq 11-oyat: Aytchi, agar u hidoyatda bo'lsa", A.alq("p40_a11"), 0, 4.880, 0, 0, 0, 0],
  ["a12", "jumla", "اَوْ اَمَرَ بِالتَّقْوٰى", "Alaq 12-oyat: Yoki taqvoga buyursa", A.alq("p40_a12"), 0, 3.050, 0, 0, 0, 0],
  ["a13", "jumla", "اَرَاَيْتَ اِنْ كَذَّبَ وَتَوَلّٰى", "Alaq 13-oyat: Yolg'on aytib yuz o'girsa-chi?", A.alq("p40_a13"), 0, 5.070, 0, 0, 0, 0],
  ["a14", "jumla", "اَلَمْ يَعْلَمْ بِاَنَّ اللّٰهَ يَرٰى", "Alaq 14-oyat: Bilmasmi, Alloh albatta ko'radi", A.alq("p40_a14"), 0, 6.000, 0, 0, 0, 0],
  ["a15", "jumla", "كَلَّا لَئِنْ لَّمْ يَنْتَهِ لَنَسْفَعًا بِالنَّاصِيَةِ", "Alaq 15-oyat: Yo'q, agar to'xtamasa, peshonasidan sudraymiz", A.alq("p40_a15"), 0, 8.560, 0, 0, 0, 0],
  ["a16", "jumla", "نَاصِيَةٍ كَاذِبَةٍ خَاطِئَةٍ", "Alaq 16-oyat: Yolg'onchi, gunohkor peshona", A.alq("p40_a16"), 0, 5.510, 0, 0, 0, 0],
  ["a17", "jumla", "فَلْيَدْعُ نَادِيَهُ", "Alaq 17-oyat: U majlisini chaqirsin", A.alq("p40_a17"), 0, 2.860, 0, 0, 0, 0],
  ["a18", "jumla", "سَنَدْعُ الزَّبَانِيَةَ", "Alaq 18-oyat: Biz ham zabaniylarni chaqiramiz", A.alq("p40_a18"), 0, 3.260, 0, 0, 0, 0],
  ["a19", "jumla", "كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِبْ", "Alaq 19-oyat: Yo'q, unga itoat etma, sajda qil va yaqinlash", A.alq("p40_a19"), 0, 5.700, 0, 0, 0, 0],

  // --- Suratu-l Qadr (Bismillah + 5 ayat) ---
  ["q_bism", "jumla", "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ", "Bismillah", A.qdr("p40_q_bism"), 0, 4.070, 0, 0, 0, 0],
  ["q01", "jumla", "اِنَّا اَنْزَلْنَاهُ فِى لَيْلَةِ الْقَدْرِ", "Qadr 1-oyat: Biz uni Qadr kechasida nozil qildik", A.qdr("p40_q01"), 0, 8.070, 0, 0, 0, 0],
  ["q02", "jumla", "وَمَا اَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ", "Qadr 2-oyat: Qadr kechasi nima ekanini sen qayerdan bilarding?", A.qdr("p40_q02"), 0, 5.780, 0, 0, 0, 0],
  ["q03", "jumla", "لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ اَلْفِ شَهْرٍ", "Qadr 3-oyat: Qadr kechasi ming oydan yaxshiroqdir", A.qdr("p40_q03"), 0, 6.180, 0, 0, 0, 0],
  ["q04", "jumla", "تَنَزَّلُ الْمَلٰئِكَةُ وَالرُّوحُ فِيهَا بِاِذْنِ رَبِّهِمْ مِنْ كُلِّ اَمْرٍ", "Qadr 4-oyat: Unda farishtalar va Ruh Rabbi izni bilan har bir ish uchun tushadi", A.qdr("p40_q04"), 0, 11.300, 0, 0, 0, 0],
  ["q05", "jumla", "سَلَامٌ هِىَ حَتّٰى مَطْلَعِ الْفَجْرِ", "Qadr 5-oyat: U tong otguncha (uzra) salomdir", A.qdr("p40_q05"), 0, 5.180, 0, 0, 0, 0],
];

// p41 — Surah Al-Bayyina (98) — bismillah + 8 ayat. Source: 65. Bayyina.mp3 (170s)
// Chunks: /audio/edit/65_bayyina/p41_*.mp3 (9 chunks)
const p41: ED[] = [
  ["bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ", "Bayyina: Bismillah", A.bayy("p41_bismillah"), 0, 4.66, 0, 0, 0, 0],
  ["a1", "jumla", "لَمْ يَكُنِ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَالْمُشْرِكِينَ مُنْفَكِّينَ حَتَّىٰ تَأْتِيَهُمُ الْبَيِّنَةُ", "1-oyat: Ahli kitob va mushriklardan kofir bo'lganlar — ularga aniq dalil kelmaguncha o'z (kufri)dan ajralmaganlar", A.bayy("p41_a1"), 0, 14.65, 0, 0, 0, 0],
  ["a2", "jumla", "رَسُولٌ مِنَ اللَّهِ يَتْلُو صُحُفًا مُطَهَّرَةً", "2-oyat: Alloh tomonidan poklangan sahifalarni tilovat qiluvchi Payg'ambar", A.bayy("p41_a2"), 0, 7.95, 0, 0, 0, 0],
  ["a3", "jumla", "فِيهَا كُتُبٌ قَيِّمَةٌ", "3-oyat: Ularda haqqoniy yozuvlar bor", A.bayy("p41_a3"), 0, 4.15, 0, 0, 0, 0],
  ["a4", "jumla", "وَمَا تَفَرَّقَ الَّذِينَ أُوتُوا الْكِتَابَ إِلَّا مِنْ بَعْدِ مَا جَاءَتْهُمُ الْبَيِّنَةُ", "4-oyat: Kitob ahli o'zlariga ravshan dalil kelganidan keyingina ixtilof qilishdi", A.bayy("p41_a4"), 0, 12.40, 0, 0, 0, 0],
  ["a5", "jumla", "وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَاءَ وَيُقِيمُوا الصَّلَاةَ وَيُؤْتُوا الزَّكَاةَ ۚ وَذَٰلِكَ دِينُ الْقَيِّمَةِ", "5-oyat: Ular faqat dinda Allohga ixlosli, hanif bo'lib ibodat qilishga, namozni to'kis qilishga va zakot berishga buyurilgan edilar. Mana shu — to'g'ri dindir", A.bayy("p41_a5"), 0, 26.40, 0, 0, 0, 0],
  ["a6", "jumla", "إِنَّ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَالْمُشْرِكِينَ فِي نَارِ جَهَنَّمَ خَالِدِينَ فِيهَا ۚ أُولَٰئِكَ هُمْ شَرُّ الْبَرِيَّةِ", "6-oyat: Ahli kitob va mushriklardan kofir bo'lganlar do'zax o'tida mangu qoluvchilardir. Ana o'shalar mavjudotlarning eng yomonlaridir", A.bayy("p41_a6"), 0, 23.45, 0, 0, 0, 0],
  ["a7", "jumla", "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أُولَٰئِكَ هُمْ خَيْرُ الْبَرِيَّةِ", "7-oyat: Iymon keltirib solih amal qilganlar — ana o'shalar mavjudotlarning eng yaxshilaridir", A.bayy("p41_a7"), 0, 12.50, 0, 0, 0, 0],
  ["a8", "jumla", "جَزَاؤُهُمْ عِنْدَ رَبِّهِمْ جَنَّاتُ عَدْنٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا أَبَدًا ۖ رَضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ ۚ ذَٰلِكَ لِمَنْ خَشِيَ رَبَّهُ", "8-oyat: Ularning Rabbi huzuridagi mukofoti — ostidan anhorlar oqib turuvchi adn jannatlaridir. Unda mangu qoladilar. Alloh ulardan rozi bo'lgan, ular ham Undan rozi bo'lganlar. Bu — Rabbidan qo'rqqan kishi uchundir", A.bayy("p41_a8"), 0, 32.00, 0, 0, 0, 0],
];

// PAGE 42 — Surah Az-Zalzalah (Bismillah + 8 ayat) + Surah Al-'Adiyat (Bismillah + 11 ayat)
// Audio sources:
//   - public/audio/66. Zalzala.mp3 (87.51s) → bismillah + 8 oyat
//   - public/audio/67. Adiya.mp3   (91.48s) → bismillah + 11 oyat
// Chunks via tools/cut_p42.sh (silencedetect -32dB/0.50s + ~0.10/0.15s buffers).
const p42: ED[] = [
  // --- Surah Az-Zalzalah (Bismillah + 8 ayat) ---
  ["zz_bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",                       "Zalzala surasi: Bismillah",                                A.zz("p42_zz_bism"), 0, 4.80, 0, 0, 0, 0],
  ["zz_a1",   "jumla", "اِذَا زُلْزِلَتِ الْاَرْضُ زِلْزَالَهَا",                      "Zalzala 1-oyat: Yer o'z silkinishi bilan silkinganida",     A.zz("p42_zz_a1"),   0, 5.66, 0, 0, 0, 0],
  ["zz_a2",   "jumla", "وَاَخْرَجَتِ الْاَرْضُ اَثْقَالَهَا",                          "Zalzala 2-oyat: Yer o'z yuklarini chiqargan kuni",          A.zz("p42_zz_a2"),   0, 4.96, 0, 0, 0, 0],
  ["zz_a3",   "jumla", "وَقَالَ الْاِنْسَانُ مَا لَهَا",                                "Zalzala 3-oyat: Inson: nima bo'ldi unga? dedi",             A.zz("p42_zz_a3"),   0, 4.90, 0, 0, 0, 0],
  ["zz_a4",   "jumla", "يَوْمَئِذٍ تُحَدِّثُ اَخْبَارَهَا",                            "Zalzala 4-oyat: O'sha kuni o'z xabarlarini aytadi",         A.zz("p42_zz_a4"),   0, 5.67, 0, 0, 0, 0],
  ["zz_a5",   "jumla", "بِاَنَّ رَبَّكَ اَوْحٰى لَهَا",                                "Zalzala 5-oyat: Robbing unga vahy qilgani sababli",         A.zz("p42_zz_a5"),   0, 5.01, 0, 0, 0, 0],
  ["zz_a6",   "jumla", "يَوْمَئِذٍ يَّصْدُرُ النَّاسُ اَشْتَاتًا لِّيُرَوْا اَعْمَالَهُمْ", "Zalzala 6-oyat: O'sha kuni odamlar amallarini ko'rish uchun guruh-guruh chiqadi", A.zz("p42_zz_a6"), 0, 10.05, 0, 0, 0, 0],
  ["zz_a7",   "jumla", "فَمَنْ يَّعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَّرَهُ",            "Zalzala 7-oyat: Zarra og'irlik yaxshilik qilgan uni ko'radi", A.zz("p42_zz_a7"), 0, 8.11, 0, 0, 0, 0],
  ["zz_a8",   "jumla", "وَمَنْ يَّعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَّرَهُ",             "Zalzala 8-oyat: Zarra og'irlik yomonlik qilgan uni ko'radi",  A.zz("p42_zz_a8"), 0, 8.98, 0, 0, 0, 0],

  // --- Surah Al-'Adiyat (Bismillah + 11 ayat) ---
  ["ad_bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",                       "Adiyat surasi: Bismillah",                                  A.ad("p42_ad_bism"), 0, 5.70, 0, 0, 0, 0],
  ["ad_a1",   "jumla", "وَالْعَادِيَاتِ ضَبْحًا",                                       "Adiyat 1-oyat: Hansiragancha chopuvchilarga qasam",          A.ad("p42_ad_a1"),   0, 3.71, 0, 0, 0, 0],
  ["ad_a2",   "jumla", "فَالْمُورِيَاتِ قَدْحًا",                                       "Adiyat 2-oyat: Tuyoqdan o't chiqaruvchilarga qasam",         A.ad("p42_ad_a2"),   0, 3.70, 0, 0, 0, 0],
  ["ad_a3",   "jumla", "فَالْمُغِيرَاتِ صُبْحًا",                                       "Adiyat 3-oyat: Tongda yopirilib boruvchilarga qasam",        A.ad("p42_ad_a3"),   0, 3.71, 0, 0, 0, 0],
  ["ad_a4",   "jumla", "فَاَثَرْنَ بِهِ نَقْعًا",                                       "Adiyat 4-oyat: U bilan chang ko'targanlarga qasam",          A.ad("p42_ad_a4"),   0, 3.65, 0, 0, 0, 0],
  ["ad_a5",   "jumla", "فَوَسَطْنَ بِهِ جَمْعًا",                                       "Adiyat 5-oyat: Va u bilan jamoa orasiga kirganlarga qasam",  A.ad("p42_ad_a5"),   0, 3.68, 0, 0, 0, 0],
  ["ad_a6",   "jumla", "اِنَّ الْاِنْسَانَ لِرَبِّهٖ لَكَنُودٌ",                        "Adiyat 6-oyat: Albatta inson Robbiga noshukurdir",            A.ad("p42_ad_a6"),   0, 7.64, 0, 0, 0, 0],
  ["ad_a7",   "jumla", "وَاِنَّهُ عَلٰى ذٰلِكَ لَشَهِيدٌ",                              "Adiyat 7-oyat: Va u bunga albatta guvohdir",                  A.ad("p42_ad_a7"),   0, 6.41, 0, 0, 0, 0],
  ["ad_a8",   "jumla", "وَاِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ",                         "Adiyat 8-oyat: Va u boylik sevishda haddan tashqari",         A.ad("p42_ad_a8"),   0, 7.35, 0, 0, 0, 0],
  ["ad_a9",   "jumla", "اَفَلَا يَعْلَمُ اِذَا بُعْثِرَ مَا فِى الْقُبُورِ",            "Adiyat 9-oyat: Qabrlardagi chiqarib olinganida bilmasmi?",    A.ad("p42_ad_a9"),   0, 7.55, 0, 0, 0, 0],
  ["ad_a10",  "jumla", "وَحُصِّلَ مَا فِى الصُّدُورِ",                                   "Adiyat 10-oyat: Va ko'kraklardagi yig'ilganida",              A.ad("p42_ad_a10"),  0, 4.40, 0, 0, 0, 0],
  ["ad_a11",  "jumla", "اِنَّ رَبَّهُمْ بِهِمْ يَوْمَئِذٍ لَخَبِيرٌ",                    "Adiyat 11-oyat: O'sha kuni Robblari ulardan albatta xabardor", A.ad("p42_ad_a11"), 0, 8.09, 0, 0, 0, 0],
];

// p43 — Surah Al-Qari'ah (Bismillah + 11 ayat) + Surah At-Takathur (Bismillah + 8 ayat) +
//       Surah Al-'Asr Bismillah (title-header section; full body on p44).
// Titles rendered as static <Title> (no audio), matching p41/p42 convention.
const p43: ED[] = [
  // --- Surah Al-Qari'ah ---
  ["qr_bism",     "jumla", "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ",                       "Bismillah",                                                                       A.qr("p43_qr_bism"),        0, 5.9,  50,   9,  48, 5],
  ["qr_a1",       "jumla", "اَلْقَارِعَةُ",                                              "1-oyat: Qori'a (qiyomat falokati)",                                               A.qr("p43_qr_a1"),          0, 2.35, 50,  15,  24, 5],
  ["qr_a2",       "jumla", "مَا الْقَارِعَةُ",                                           "2-oyat: Qori'a nima?",                                                            A.qr("p43_qr_a2"),          0, 2.6,  50,  21,  28, 5],
  ["qr_a3",       "jumla", "وَمَا اَدْرٰاكَ مَا الْقَارِعَةُ",                            "3-oyat: Qori'a nima ekanini sen qayerdan bilarding?",                              A.qr("p43_qr_a3"),          0, 5.6,  50,  27,  50, 5],
  ["qr_a4",       "jumla", "يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ",            "4-oyat: U kunda odamlar sochilgan parvonalar kabi bo'lib qoladi",                  A.qr("p43_qr_a4"),          0, 7.85, 50,  33,  70, 5],
  ["qr_a5",       "jumla", "وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنْفُوشِ",                "5-oyat: Tog'lar tit-tit qilingan rang-barang junga o'xshab qoladi",               A.qr("p43_qr_a5"),          0, 7.8,  50,  39,  70, 5],
  ["qr_a6",       "jumla", "فَاَمَّا مَنْ ثَقُلَتْ مَوَازِينُهُ",                          "6-oyat: Tarozisi og'ir kelgan kishi (yaxshi amallari ko'p bo'lgan)",               A.qr("p43_qr_a6"),          0, 6.25, 50,  45,  54, 5],
  ["qr_a7",       "jumla", "فَهُوَ فِى عِيشَةٍ رَاضِيَةٍ",                                "7-oyat: U xush yaxshi bir hayotda bo'ladi",                                       A.qr("p43_qr_a7"),          0, 4.65, 50,  51,  46, 5],
  ["qr_a8",       "jumla", "وَاَمَّا مَنْ خَفَّتْ مَوَازِينُهُ",                           "8-oyat: Tarozisi yengil kelgan kishi-chi",                                        A.qr("p43_qr_a8"),          0, 6.15, 50,  57,  54, 5],
  ["qr_a9",       "jumla", "فَاُمُّهُ هَاوِيَةٌ",                                         "9-oyat: Uning onasi (joyi) Hoviyadir",                                            A.qr("p43_qr_a9"),          0, 3.95, 50,  63,  38, 5],
  ["qr_a10",      "jumla", "وَمَا اَدْرٰاكَ مَا هِيَهْ",                                  "10-oyat: U (Hoviya) nima ekanini sen qayerdan bilarding?",                         A.qr("p43_qr_a10"),         0, 4.95, 50,  69,  44, 5],
  ["qr_a11",      "jumla", "نَارٌ حَامِيَةٌ",                                            "11-oyat: U haroratli olovdir",                                                    A.qr("p43_qr_a11"),         0, 3.25, 50,  75,  30, 5],

  // --- Surah At-Takathur ---
  ["tk_bism",     "jumla", "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ",                       "Bismillah",                                                                       A.tk("p43_tk_bism"),        0, 5.25, 50,  88,  48, 5],
  ["tk_a1",       "jumla", "اَلْهٰىكُمُ التَّكَاثُرُ",                                    "1-oyat: Sizlarni ko'pchilik bo'lib maqtanish chalg'itib qo'ydi",                  A.tk("p43_tk_a1"),          0, 3.5,  50,  94,  40, 5],
  ["tk_a2",       "jumla", "حَتّٰى زُرْتُمُ الْمَقَابِرَ",                                "2-oyat: Hatto qabrlarni ziyorat qilib (sanadingiz)",                              A.tk("p43_tk_a2"),          0, 4.00, 50, 100,  42, 5],
  ["tk_a3",       "jumla", "كَلَّا سَوْفَ تَعْلَمُونَ",                                  "3-oyat: Yo'q! Yaqinda bilursizlar",                                                A.tk("p43_tk_a3"),          0, 4.75, 50, 106,  40, 5],
  ["tk_a4",       "jumla", "ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ",                              "4-oyat: So'ngra yana yo'q, bilursizlar",                                          A.tk("p43_tk_a4"),          0, 6.2,  50, 112,  48, 5],
  ["tk_a5",       "jumla", "كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ",                    "5-oyat: Yo'q! Aniq ilm bilan bilganingizda edi",                                  A.tk("p43_tk_a5"),          0, 6.7,  50, 118,  56, 5],
  ["tk_a6",       "jumla", "لَتَرَوُنَّ الْجَحِيمَ",                                      "6-oyat: Albatta jahannamni ko'rasizlar",                                          A.tk("p43_tk_a6"),          0, 4.95, 50, 124,  40, 5],
  ["tk_a7",       "jumla", "ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ",                       "7-oyat: So'ngra uni aniq ko'rish bilan ko'rasizlar",                              A.tk("p43_tk_a7"),          0, 7.6,  50, 130,  60, 5],
  ["tk_a8",       "jumla", "ثُمَّ لَتُسْـَٔلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ",               "8-oyat: So'ngra o'sha kunda ne'matlar haqida albatta so'ralursiz",                A.tk("p43_tk_a8"),          0, 9.0,  50, 136,  68, 5],

  // --- Surah Al-'Asr (faqat Bismillah — title static, to'liq oyatlar p44 da) ---
  ["as_bism",     "jumla", "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ",                       "Bismillah",                                                                       A.asr("p43_as_bism"),       0, 5.4,  50, 152,  48, 5],
];

// p44 — Surah Al-'Asr davomi (3 ayat — title+bismillah p43 ning oxirida) + Surah
// Al-Humazah (title + Bismillah + 9 ayat) + Surah Al-Fil (title + Bismillah + 5 ayat).
// Audio: 70. Asr.mp3 (ayat 1-3 only), 71. Humaza.mp3, 72. Fil.mp3.
// Chunks via tools/cut_p44.sh.
const p44: ED[] = [
  // === Surah Al-'Asr davomi — 3 ayat (title va Bismillah p43 da) ===
  ["as_a1", "jumla", "وَالْعَصْرِ",
    "Asr 1-oyat: Asrga qasam",
    A.asr("p44_as_a1"), 0, 1.80, 0, 0, 0, 0],
  ["as_a2", "jumla", "اِنَّ الْاِنْسَانَ لَفِىْ خُسْرٍ",
    "Asr 2-oyat: Albatta inson ziyondadir",
    A.asr("p44_as_a2"), 0, 5.75, 0, 0, 0, 0],
  ["as_a3", "jumla", "اِلَّا الَّذِيْنَ اٰمَنُوْا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
    "Asr 3-oyat: Iymon keltirgan, solih amal qilgan, haq va sabrga bir-birini chaqirganlardan tashqari",
    A.asr("p44_as_a3"), 0, 13.45, 0, 0, 0, 0],

  // === Surah Al-Humazah — title (statik) + Bismillah + 9 ayat ===
  ["hu_title", "jumla", "سُورَةُ الْهُمَزَةِ",
    "Humazah surasi",
    null, 0, 0, 0, 0, 0, 0],
  ["hu_bism",  "jumla", "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ",
    "Humazah: Bismillah",
    A.hu("p44_hu_bismillah"), 0, 5.05, 0, 0, 0, 0],
  ["hu_a1", "jumla", "وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ",
    "Humazah 1-oyat: Har bir g'iybatchi-mazax qiluvchiga halokat",
    A.hu("p44_hu_a1"), 0, 5.10, 0, 0, 0, 0],
  ["hu_a2", "jumla", "الَّذِىْ جَمَعَ مَالًا وَّعَدَّدَهٗ",
    "Humazah 2-oyat: Mol to'plab, uni sanagan kishi",
    A.hu("p44_hu_a2"), 0, 5.60, 0, 0, 0, 0],
  ["hu_a3", "jumla", "يَحْسَبُ اَنَّ مَالَهٗۤ اَخْلَدَهٗ",
    "Humazah 3-oyat: Moli uni boqiy qilaman deb hisoblaydi",
    A.hu("p44_hu_a3"), 0, 6.65, 0, 0, 0, 0],
  ["hu_a4", "jumla", "كَلَّا لَيُنْۢبَذَنَّ فِى الْحُطَمَةِ",
    "Humazah 4-oyat: Yo'q! Albatta u Hutamaga tashlanadi",
    A.hu("p44_hu_a4"), 0, 6.25, 0, 0, 0, 0],
  ["hu_a5", "jumla", "وَمَاۤ اَدْرٰىكَ مَا الْحُطَمَةُ",
    "Humazah 5-oyat: Hutama nima ekanini sen qaerdan bilasan?",
    A.hu("p44_hu_a5"), 0, 5.55, 0, 0, 0, 0],
  ["hu_a6", "jumla", "نَارُ اللّٰهِ الْمُوْقَدَةُ",
    "Humazah 6-oyat: Yondirilgan Alloh olovi",
    A.hu("p44_hu_a6"), 0, 4.40, 0, 0, 0, 0],
  ["hu_a7", "jumla", "الَّتِىْ تَطَّلِعُ عَلَى الْاَفْـِٕدَةِ",
    "Humazah 7-oyat: U yuraklarga chiqib boradi",
    A.hu("p44_hu_a7"), 0, 5.65, 0, 0, 0, 0],
  ["hu_a8", "jumla", "اِنَّهَا عَلَيْهِمْ مُّؤْصَدَةٌ",
    "Humazah 8-oyat: U ularning ustini yopib qo'yiladi",
    A.hu("p44_hu_a8"), 0, 5.75, 0, 0, 0, 0],
  ["hu_a9", "jumla", "فِىْ عَمَدٍ مُّمَدَّدَةٍ",
    "Humazah 9-oyat: Cho'zilgan ustunlarga (bog'lab qo'yilgan holda)",
    A.hu("p44_hu_a9"), 0, 4.10, 0, 0, 0, 0],

  // === Surah Al-Fil — title (statik) + Bismillah + 5 ayat ===
  ["fi_title", "jumla", "سُورَةُ الْفِيلِ",
    "Fil surasi",
    null, 0, 0, 0, 0, 0, 0],
  ["fi_bism",  "jumla", "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ",
    "Fil: Bismillah",
    A.fi("p44_fi_bismillah"), 0, 4.45, 0, 0, 0, 0],
  ["fi_a1", "jumla", "اَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِاَصْحَابِ الْفِيْلِ",
    "Fil 1-oyat: Robbing fil egalariga qanday yo'l tutganini ko'rmadingmi?",
    A.fi("p44_fi_a1"), 0, 7.45, 0, 0, 0, 0],
  ["fi_a2", "jumla", "اَلَمْ يَجْعَلْ كَيْدَهُمْ فِىْ تَضْلِيْلٍ",
    "Fil 2-oyat: Ularning makrini zoye qildi-ku",
    A.fi("p44_fi_a2"), 0, 6.55, 0, 0, 0, 0],
  ["fi_a3", "jumla", "وَاَرْسَلَ عَلَيْهِمْ طَيْرًا اَبَابِيْلَ",
    "Fil 3-oyat: Va ular ustiga to'p-to'p qushlarni yubordi",
    A.fi("p44_fi_a3"), 0, 6.55, 0, 0, 0, 0],
  ["fi_a4", "jumla", "تَرْمِيْهِمْ بِحِجَارَةٍ مِّنْ سِجِّيْلٍ",
    "Fil 4-oyat: Ularga loy tosh otdilar",
    A.fi("p44_fi_a4"), 0, 8.45, 0, 0, 0, 0],
  ["fi_a5", "jumla", "فَجَعَلَهُمْ كَعَصْفٍ مَّاْكُوْلٍ",
    "Fil 5-oyat: Va ularni yeb tashlangan poxol kabi qildi",
    A.fi("p44_fi_a5"), 0, 6.60, 0, 0, 0, 0],
];

// PAGE 45 — Surah Quraysh (Bismillah + 4 ayat) + Surah Al-Ma'un (Bismillah + 7 ayat)
// + Surah Al-Kawthar (Bismillah + 3 ayat) + Surah Al-Kafirun (header — Bismillah only;
// ayahs are on p46).
// Audio sources:
//   - public/audio/73. Quraysh.mp3 (48.59s) → bismillah + 4 oyat
//   - public/audio/74. Mauvn.mp3   (62.20s) → bismillah + 7 oyat (a4/a5 split at 38.55s)
//   - public/audio/75. Kavsar.mp3  (29.54s) → bismillah + 3 oyat
//   - public/audio/76. Kafirun.mp3 (65.36s) → bismillah only (ayahs on p46)
// Chunks via tools/cut_p45.sh (silencedetect -32dB/0.30s + ~0.2s buffers).
const p45: ED[] = [
  // --- Surah Quraysh (Bismillah + 4 ayat) ---
  ["qu_bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",                        "Quraysh surasi: Bismillah",                                            A.qur("p45_qu_bism"), 0, 5.25, 0, 0, 0, 0],
  ["qu_a1",   "jumla", "لِاِيلَافِ قُرَيْشٍ",                                          "Quraysh 1-oyat: Qurayshning ulfat qilingani uchun",                    A.qur("p45_qu_a1"),   0, 4.00, 0, 0, 0, 0],
  ["qu_a2",   "jumla", "اٖيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ",                    "Quraysh 2-oyat: Qish va yoz safarlarida ulfat qilingani uchun",        A.qur("p45_qu_a2"),   0, 7.55, 0, 0, 0, 0],
  ["qu_a3",   "jumla", "فَلْيَعْبُدُوا رَبَّ هٰذَا الْبَيْتِ",                          "Quraysh 3-oyat: Bas, ushbu uy (Ka'ba) Robbiga ibodat qilsinlar",        A.qur("p45_qu_a3"),   0, 5.85, 0, 0, 0, 0],
  ["qu_a4",   "jumla", "الَّذٖى اَطْعَمَهُمْ مِنْ جُوعٍ وَّاٰمَنَهُمْ مِنْ خَوْفٍ",        "Quraysh 4-oyat: U Zot ularni ochlikdan to'ydirdi va xavfdan tinch qildi", A.qur("p45_qu_a4"),   0, 12.70, 0, 0, 0, 0],

  // --- Surah Al-Ma'un (Bismillah + 7 ayat) ---
  ["ma_bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",                        "Mo'un surasi: Bismillah",                                              A.mau("p45_ma_bism"), 0, 4.65, 0, 0, 0, 0],
  ["ma_a1",   "jumla", "اَرَءَيْتَ الَّذٖى يُكَذِّبُ بِالدّٖينِ",                         "Mo'un 1-oyat: Dinni yolg'on chiqaruvchini ko'rdingmi?",                A.mau("p45_ma_a1"),   0, 6.05, 0, 0, 0, 0],
  ["ma_a2",   "jumla", "فَذٰلِكَ الَّذٖى يَدُعُّ الْيَتٖيمَ",                            "Mo'un 2-oyat: U yetimni qattiq itarib quvuvchidir",                    A.mau("p45_ma_a2"),   0, 6.05, 0, 0, 0, 0],
  ["ma_a3",   "jumla", "وَلَا يَحُضُّ عَلٰى طَعَامِ الْمِسْكٖينِ",                      "Mo'un 3-oyat: Va miskinning taomiga (boshqalarni) qiziqtirmaydi",      A.mau("p45_ma_a3"),   0, 6.75, 0, 0, 0, 0],
  // Mo'un 4 + 5 — reciter uzluksiz o'qigan (sukunat yo'q). Ikkala element bitta
  // birlashgan chunkni ijro etadi (a4 + a5 = 11.05s). Vizual jihatdan ham bir
  // qatorda joylashtirilgan (foydalanuvchi qarori 2026-05-22).
  ["ma_a4",   "jumla", "فَوَيْلٌ لِّلْمُصَلّٖينَ",                                       "Mo'un 4-oyat: Bas, namoz o'qiguvchilarga voy bo'lsin",                 A.mau("p45_ma_a4_a5"), 0, 11.05, 0, 0, 0, 0],
  ["ma_a5",   "jumla", "الَّذٖينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ",                         "Mo'un 5-oyat: Ular o'z namozlaridan g'ofildirlar",                     A.mau("p45_ma_a4_a5"), 0, 11.05, 0, 0, 0, 0],
  ["ma_a6",   "jumla", "الَّذٖينَ هُمْ يُرَاءُونَ",                                       "Mo'un 6-oyat: Ular riyokorlik qiluvchilardir",                          A.mau("p45_ma_a6"),   0, 5.90, 0, 0, 0, 0],
  ["ma_a7",   "jumla", "وَيَمْنَعُونَ الْمَاعُونَ",                                       "Mo'un 7-oyat: Va mo'un (zaruriy buyumlar)dan man qiluvchilardir",      A.mau("p45_ma_a7"),   0, 5.25, 0, 0, 0, 0],

  // --- Surah Al-Kawthar (Bismillah + 3 ayat) ---
  ["ka_bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",                        "Kavsar surasi: Bismillah",                                             A.kau("p45_ka_bism"), 0, 5.10, 0, 0, 0, 0],
  ["ka_a1",   "jumla", "اِنَّا اَعْطَيْنَاكَ الْكَوْثَرَ",                                 "Kavsar 1-oyat: Albatta, Biz senga Kavsarni berdik",                    A.kau("p45_ka_a1"),   0, 6.80, 0, 0, 0, 0],
  ["ka_a2",   "jumla", "فَصَلِّ لِرَبِّكَ وَانْحَرْ",                                    "Kavsar 2-oyat: Bas, Robbing uchun namoz o'qi va qurbonlik so'y",        A.kau("p45_ka_a2"),   0, 4.05, 0, 0, 0, 0],
  ["ka_a3",   "jumla", "اِنَّ شَانِئَكَ هُوَ الْاَبْتَرُ",                                "Kavsar 3-oyat: Albatta, senga adovat qiluvchi — u dumi qirqilgandir",   A.kau("p45_ka_a3"),   0, 4.95, 0, 0, 0, 0],

  // --- Surah Al-Kafirun header (Bismillah only — ayahs are on p46) ---
  ["kf_bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",                        "Kofirun surasi: Bismillah (oyatlar 46-sahifada)",                       A.kaf("p45_kf_bism"), 0, 5.50, 0, 0, 0, 0],
];

// PAGE 46 — Surah Al-Kafirun davomi (ayatlar 1-6 — title va Bismillah p45 da) +
// Surah An-Nasr (Bismillah + 3 ayat) + Surah Al-Masad (Bismillah + 5 ayat) +
// Surah Al-Ikhlas (Bismillah + ayat 1 + ayat 2 + ayat 3 boshi "لَمْ يَلِدْ").
// Audio sources:
//   - public/audio/76. Kafirun.mp3 (65.36s) → ayat 1-6
//   - public/audio/77. Nasr.mp3    (44.72s) → bismillah + 3 ayat
//   - public/audio/78. Masad.mp3   (51.41s) → bismillah + 5 ayat
//   - public/audio/79. Ixlos.mp3   (26.17s) → bismillah + ayat 1 + ayat 2 + ayat 3 boshi
// Chunks via tools/cut_p46.sh (silencedetect -32dB/0.30s + ~0.15-0.25s buffers).
const p46: ED[] = [
  // --- Surah Al-Kafirun (ayatlar 1-6 — title+bismillah p45 da) ---
  ["kf_a1",   "jumla", "قُلْ يَا اَيُّهَا الْكَافِرُونَ",                 "Kofirun 1-oyat: Ayt, ey kofirlar!",                                       A.kaf("p46_kf_a1"),    0, 6.70, 0, 0, 0, 0],
  ["kf_a2",   "jumla", "لَا اَعْبُدُ مَا تَعْبُدُونَ",                    "Kofirun 2-oyat: Men sizlar ibodat qilayotgan narsaga ibodat qilmayman",   A.kaf("p46_kf_a2"),    0, 6.85, 0, 0, 0, 0],
  ["kf_a3",   "jumla", "وَلَا اَنْتُمْ عَابِدُونَ مَا اَعْبُدُ",            "Kofirun 3-oyat: Sizlar ham men ibodat qilayotgan Zotga ibodat qiluvchi emassiz", A.kaf("p46_kf_a3"), 0, 8.50, 0, 0, 0, 0],
  ["kf_a4",   "jumla", "وَلَا اَنَا عَابِدٌ مَا عَبَدْتُمْ",                "Kofirun 4-oyat: Men sizlar ibodat qilgan narsaga ibodat qiluvchi emasman", A.kaf("p46_kf_a4"),    0, 6.60, 0, 0, 0, 0],
  ["kf_a5",   "jumla", "وَلَا اَنْتُمْ عَابِدُونَ مَا اَعْبُدُ",            "Kofirun 5-oyat: Sizlar ham men ibodat qilayotgan Zotga ibodat qiluvchi emassiz", A.kaf("p46_kf_a5"), 0, 8.80, 0, 0, 0, 0],
  ["kf_a6",   "jumla", "لَكُمْ دِينُكُمْ وَلِيَ دِينِ",                    "Kofirun 6-oyat: Sizning diningiz sizga, mening dinim menga",              A.kaf("p46_kf_a6"),    0, 5.55, 0, 0, 0, 0],

  // --- Surah An-Nasr (Bismillah + 3 ayat) ---
  ["ns_bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",            "Nasr surasi: Bismillah",                                                  A.nas("p46_ns_bism"),  0, 5.30, 0, 0, 0, 0],
  ["ns_a1",   "jumla", "اِذَا جَاءَ نَصْرُ اللّٰهِ وَالْفَتْحُ",             "Nasr 1-oyat: Allohning nusrati va fath kelganda",                         A.nas("p46_ns_a1"),    0, 6.30, 0, 0, 0, 0],
  ["ns_a2",   "jumla", "وَرَاَيْتَ النَّاسَ يَدْخُلُونَ فِى دٖينِ اللّٰهِ اَفْوَاجًا", "Nasr 2-oyat: Va odamlarni Alloh diniga to'p-to'p kirayotganini ko'rsang", A.nas("p46_ns_a2"), 0, 9.55, 0, 0, 0, 0],
  ["ns_a3",   "jumla", "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ اِنَّهُ كَانَ تَوَّابًا", "Nasr 3-oyat: Robbingni hamd bilan ulug'la va Undan mag'firat so'ra; albatta, U tavbalarni qabul qiluvchidir", A.nas("p46_ns_a3"), 0, 13.15, 0, 0, 0, 0],

  // --- Surah Al-Masad (Bismillah + 5 ayat) ---
  ["ms_bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",            "Masad surasi: Bismillah",                                                 A.msd("p46_ms_bism"),  0, 5.40, 0, 0, 0, 0],
  ["ms_a1",   "jumla", "تَبَّتْ يَدَا اَبٖى لَهَبٍ وَتَبَّ",                "Masad 1-oyat: Abu Lahabning qo'llari batil bo'lsin va o'zi ham batil bo'lsin", A.msd("p46_ms_a1"),  0, 6.55, 0, 0, 0, 0],
  ["ms_a2",   "jumla", "مَا اَغْنٰى عَنْهُ مَالُهُ وَمَا كَسَبَ",           "Masad 2-oyat: Unga moli va o'zi topganlari foyda bermaydi",               A.msd("p46_ms_a2"),    0, 7.25, 0, 0, 0, 0],
  ["ms_a3",   "jumla", "سَيَصْلٰى نَارًا ذَاتَ لَهَبٍ",                    "Masad 3-oyat: U lovillagan olovga kirgay",                                A.msd("p46_ms_a3"),    0, 5.35, 0, 0, 0, 0],
  ["ms_a4",   "jumla", "وَامْرَاَتُهُ حَمَّالَةَ الْحَطَبِ",                "Masad 4-oyat: Xotini ham — o'tin ko'taruvchi",                            A.msd("p46_ms_a4"),    0, 5.65, 0, 0, 0, 0],
  ["ms_a5",   "jumla", "فٖى جٖيدِهَا حَبْلٌ مِنْ مَسَدٍ",                   "Masad 5-oyat: Bo'ynida tolanlangan arqon — masaddan",                     A.msd("p46_ms_a5"),    0, 6.15, 0, 0, 0, 0],

  // --- Surah Al-Ikhlas (Bismillah + ayat 1 + ayat 2 + ayat 3 boshi "لَمْ يَلِدْ") ---
  ["ix_bism",     "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",        "Ixlos surasi: Bismillah",                                                 A.ixl("p46_ix_bism"),    0, 5.25, 0, 0, 0, 0],
  ["ix_a1",       "jumla", "قُلْ هُوَ اللّٰهُ اَحَدٌ",                     "Ixlos 1-oyat: Ayt: U — Alloh, yagonadir",                                 A.ixl("p46_ix_a1"),      0, 3.25, 0, 0, 0, 0],
  ["ix_a2",       "jumla", "اَللّٰهُ الصَّمَدُ",                          "Ixlos 2-oyat: Alloh — Samad (hech narsaga muhtoj bo'lmagan, hammaning yagona suyangan Zoti)", A.ixl("p46_ix_a2"), 0, 2.75, 0, 0, 0, 0],
  // Ixlos v3 + v4 — birlashgan audio guruh (foydalanuvchi qarori 2026-05-22:
  // reciter uzilmasdan o'qigan). Ikkala oyat bir qatorda render qilinadi va
  // qaysi birini bossangiz ham ikkalasi birga active highlight oladi. v4 endi
  // p47 dan p46 ga ko'chirildi — Surah Al-Ikhlas butunlay p46 da.
  ["ix_a3", "jumla", "لَمْ يَلِدْ وَلَمْ يُولَدْ", "Ixlos 3-oyat: U tug'magan va tug'ilmagandir",
    A.ixl("p46_ix_a3_a4"), 0, 9.00, 0, 0, 0, 0],
  ["ix_a4", "jumla", "وَلَمْ يَكُنْ لَهُ كُفُوًا اَحَدٌ", "Ixlos 4-oyat: Va Uning hech bir tengi yo'qdir",
    A.ixl("p46_ix_a3_a4"), 0, 9.00, 0, 0, 0, 0],
];

// ============================================================
// PAGE 47 — Al-Ikhlas (v3 + v4, davom p46 dan) + Al-Falaq (Bismillah + 5 ayat)
//         + An-Nas (Bismillah + 6 ayat)
//
// Audio sources:
//   public/audio/79. Ixlos.mp3 (26.17s) — v3 (lam yalid wa lam yulad) + v4
//   public/audio/80. Falaq.mp3 (46.13s) — Bismillah + 5 ayat
//   public/audio/81. Nos.mp3   (54.96s) — Bismillah + 6 ayat
// Chunks via tools/cut_p47.sh.
// Vaqtlar silencedetect (-30dB/-20dB) + small buffers asoslangan;
// foydalanuvchi tinglab tasdiqlasa, mos kelmagan chunks shu yerdan tuzatilsin.
// ============================================================
const p47: ED[] = [
  // --- Al-Ikhlas (p46 da to'liq) — p47 endi to'g'ridan-to'g'ri Falaq bilan boshlanadi ---
  // 2026-05-22: ix_v3 va ix_v4 ikkalasi p46 ga ko'chirildi (foydalanuvchi qarori).

  // --- Surah Al-Falaq (Bismillah + 5 ayat) ---
  ["fq_bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",                "Falaq surasi: Bismillah",                                                   A.flq("p47_fq_bism"), 0, 5.18, 0, 0, 0, 0],
  ["fq_a1",   "jumla", "قُلْ اَعُوذُ بِرَبِّ الْفَلَقِ",                         "Falaq 1-oyat: Ayt: tongning Robbiga panoh tilayman",                        A.flq("p47_fq_v1"),   0, 3.96, 0, 0, 0, 0],
  ["fq_a2",   "jumla", "مِنْ شَرِّ مَا خَلَقَ",                                "Falaq 2-oyat: Yaratgan har bir narsaning yomonligidan",                     A.flq("p47_fq_v2"),   0, 3.54, 0, 0, 0, 0],
  ["fq_a3",   "jumla", "وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَ",                      "Falaq 3-oyat: Va qorong'i tushgan tunning yomonligidan",                    A.flq("p47_fq_v3"),   0, 5.36, 0, 0, 0, 0],
  ["fq_a4",   "jumla", "وَمِنْ شَرِّ النَّفَّاثَاتِ فِى الْعُقَدِ",              "Falaq 4-oyat: Tugunlarga puflovchi sehrgarlarning yomonligidan",            A.flq("p47_fq_v4"),   0, 6.82, 0, 0, 0, 0],
  ["fq_a5",   "jumla", "وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ",                     "Falaq 5-oyat: Va hasad qiluvchining hasad qilgandagi yomonligidan",         A.flq("p47_fq_v5"),   0, 5.55, 0, 0, 0, 0],

  // --- Surah An-Nas (Bismillah + 6 ayat) ---
  ["ns_bism", "jumla", "بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ",                "Nas surasi: Bismillah",                                                     A.nss("p47_ns_bism"), 0, 4.60, 0, 0, 0, 0],
  ["ns_a1",   "jumla", "قُلْ اَعُوذُ بِرَبِّ النَّاسِ",                          "Nas 1-oyat: Ayt: odamlarning Robbiga panoh tilayman",                       A.nss("p47_ns_v1"),   0, 5.26, 0, 0, 0, 0],
  ["ns_a2",   "jumla", "مَلِكِ النَّاسِ",                                      "Nas 2-oyat: Odamlarning Podshohi",                                          A.nss("p47_ns_v2"),   0, 3.78, 0, 0, 0, 0],
  ["ns_a3",   "jumla", "اِلٰهِ النَّاسِ",                                       "Nas 3-oyat: Odamlarning Ma'budi",                                           A.nss("p47_ns_v3"),   0, 4.02, 0, 0, 0, 0],
  ["ns_a4",   "jumla", "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",                  "Nas 4-oyat: Yashirinib turuvchi vasvasachi yomonligidan",                  A.nss("p47_ns_v4"),   0, 7.54, 0, 0, 0, 0],
  ["ns_a5",   "jumla", "الَّذٖى يُوَسْوِسُ فٖى صُدُورِ النَّاسِ",                 "Nas 5-oyat: Odamlarning ko'kraklariga vasvasa soluvchi",                    A.nss("p47_ns_v5"),   0, 7.87, 0, 0, 0, 0],
  ["ns_a6",   "jumla", "مِنَ الْجِنَّةِ وَالنَّاسِ",                            "Nas 6-oyat: Jinlardan ham, insonlardan ham",                                A.nss("p47_ns_v6"),   0, 5.99, 0, 0, 0, 0],
];

// ============================================================
// PAGES 48-50 — Duolar (Prayers)
// ============================================================
// Page 48 — Sano (الثَّنَاءُ) + Tashahhud (التَّشَهُّدُ).
// Audio yo'q (ls_duolar.audioUrl = null). Element'lar clickable —
// active highlight beradi, audio ijro etilmaydi (start=end=0).
const p48: ED[] = [
  // --- Sano ---
  ["s_title", "jumla", "الثَّنَاءُ", "Sano", null, 0, 0, 0, 0, 0, 0],
  ["s1", "jumla", "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ", "Pokligingni e'tirof etaman, Allohim, va Senga hamd aytaman, isming muborakdir", null, 0, 0, 0, 0, 0, 0],
  ["s2", "jumla", "وَتَعَالَى جَدُّكَ", "Va ulug'liging baland keldi", null, 0, 0, 0, 0, 0, 0],
  ["s3", "jumla", "وَلَا إِلٰهَ غَيْرُكَ", "Va Sendan boshqa iloh yo'q", null, 0, 0, 0, 0, 0, 0],
  // --- Tashahhud ---
  ["t_title", "jumla", "التَّشَهُّدُ", "Tashahhud", null, 0, 0, 0, 0, 0, 0],
  ["t1", "jumla", "اَلتَّحِيَّاتُ لِلَّهِ", "Barcha ehtirom Allohga xosdir", null, 0, 0, 0, 0, 0, 0],
  ["t2", "jumla", "وَالصَّلَوَاتُ", "Va barcha namozlar", null, 0, 0, 0, 0, 0, 0],
  ["t3", "jumla", "وَالطَّيِّبَاتُ", "Va barcha pok ishlar", null, 0, 0, 0, 0, 0, 0],
  ["t4", "jumla", "السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ", "Senga salom bo'lsin, ey Nabi, Alloh rahmati va barakotlari bilan", null, 0, 0, 0, 0, 0, 0],
  ["t5", "jumla", "السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ", "Bizga va Allohning solih bandalariga salom bo'lsin", null, 0, 0, 0, 0, 0, 0],
  ["t6", "jumla", "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ", "Guvohlik beraman: Allohdan boshqa iloh yo'q", null, 0, 0, 0, 0, 0, 0],
  ["t7", "jumla", "وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", "Va guvohlik beraman: Muhammad Uning bandasi va rasulidir", null, 0, 0, 0, 0, 0, 0],
];

// Page 49 — As-Salawat (2 ta salavot bloki: Allohumma salli + Allohumma barik)
// + Ad-Du'a boshlanishi (jahannam/qabr/Dajjol fitnasidan panoh; p50 da davom).
// Audio yo'q (ls_duolar.audioUrl = null) — element'lar clickable, faqat
// vizual active highlight beradi; ovoz ijro etilmaydi (start=end=0).
const p49: ED[] = [
  // --- Section title: As-Salawat ---
  ["title_salawat", "jumla", "اَلصَّلَوَاتُ",
    "Salavotlar (Payg'ambarga salavot)", null, 0, 0, 0, 0, 0, 0],

  // --- Block 1: Allahumma salli ---
  ["s1_p1", "jumla", "اَللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
    "Allohim, Muhammad(s)ga salavot yubor", null, 0, 0, 0, 0, 0, 0],
  ["s1_p2", "jumla", "وَعَلَى آلِ مُحَمَّدٍ",
    "va Muhammad(s) oilasiga", null, 0, 0, 0, 0, 0, 0],
  ["s1_p3", "jumla", "كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ",
    "qanday Ibrohim(a)ga salavot yuborgan bo'lsang", null, 0, 0, 0, 0, 0, 0],
  ["s1_p4", "jumla", "وَعَلَى آلِ إِبْرَاهِيمَ",
    "va Ibrohim(a) oilasiga", null, 0, 0, 0, 0, 0, 0],
  ["s1_p5", "jumla", "إِنَّكَ حَمِيدٌ مَجِيدٌ",
    "Albatta Sen Hamiyd va Majiydsan (maqtovga, ulug'lanmoqqa loyiqsan)", null, 0, 0, 0, 0, 0, 0],

  // --- Block 2: Allahumma barik ---
  ["s2_p1", "jumla", "اَللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ",
    "Allohim, Muhammad(s)ni barakatli qil", null, 0, 0, 0, 0, 0, 0],
  ["s2_p2", "jumla", "وَعَلَى آلِ مُحَمَّدٍ",
    "va Muhammad(s) oilasini", null, 0, 0, 0, 0, 0, 0],
  ["s2_p3", "jumla", "كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ",
    "qanday Ibrohim(a)ni barakatli qilgan bo'lsang", null, 0, 0, 0, 0, 0, 0],
  ["s2_p4", "jumla", "وَعَلَى آلِ إِبْرَاهِيمَ",
    "va Ibrohim(a) oilasini", null, 0, 0, 0, 0, 0, 0],
  ["s2_p5", "jumla", "إِنَّكَ حَمِيدٌ مَجِيدٌ",
    "Albatta Sen Hamiyd va Majiydsan", null, 0, 0, 0, 0, 0, 0],

  // --- Section title: Ad-Du'a ---
  ["title_dua", "jumla", "اَلدُّعَاءُ",
    "Du'a (namozdan keyingi panoh duosi — 50-sahifada davom etadi)", null, 0, 0, 0, 0, 0, 0],

  // --- Du'a block (continues on p50) ---
  ["d_p1", "jumla", "اَللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ",
    "Allohim, jahannam azobidan Senga panoh tilayman", null, 0, 0, 0, 0, 0, 0],
  ["d_p2", "jumla", "وَمِنْ عَذَابِ الْقَبْرِ",
    "va qabr azobidan (panoh tilayman)", null, 0, 0, 0, 0, 0, 0],
  ["d_p3", "jumla", "وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ",
    "va hayot va o'lim fitnasidan", null, 0, 0, 0, 0, 0, 0],
  ["d_p4", "jumla", "وَمِنْ شَرِّ الْمَسِيحِ الدَّجَّالِ",
    "va Masih Dajjol yomonligidan", null, 0, 0, 0, 0, 0, 0],
];

// Page 50 — Du'a al-Qunut (دعاء القنوت). Kitobning oxirgi sahifasi.
// Matn rasmda yagona uzluksiz duo (6 satr), lekin har bir tabiiy gap
// (.-bilan ajratilgan yoki ma'no jihatdan yopilgan) alohida `jumla`
// element qilingan (1 title + 7 clause = 8 element).
// Audio hozircha mavjud emas (Materiallar/sano tashahhud duolar/ papkasida
// audio yo'q va public/audio/ da Qunut audio'si ham yo'q). audioUrl null —
// lesson.audioUrl (ls_duolar) ham null bo'lgani uchun click qilinganda
// audio ijro etilmaydi, faqat element ajralib ko'rinadi. Audio qo'shilsa,
// audioUrl/start/end maydonlari va A.* helperi yangilanishi kerak.
const p50: ED[] = [
  ["01", "jumla", "دُعَاءُ الْقُنُوتِ",
    "Qunut duosi",
    null, 0, 0, 0, 0, 0, 0],
  ["02", "jumla", "اَللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَهْدِيكَ وَنَسْتَغْفِرُكَ وَنَتُوبُ إِلَيْكَ",
    "Allohim, biz Sendan yordam, hidoyat va mag'firat so'raymiz va Senga tavba qilamiz",
    null, 0, 0, 0, 0, 0, 0],
  ["03", "jumla", "وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ كُلَّهُ",
    "Senga iymon keltiramiz, Senga tavakkul qilamiz, Seni butun yaxshilik bilan maqtaymiz",
    null, 0, 0, 0, 0, 0, 0],
  ["04", "jumla", "نَشْكُرُكَ وَلَا نَكْفُرُكَ",
    "Senga shukr qilamiz, Seni inkor qilmaymiz",
    null, 0, 0, 0, 0, 0, 0],
  ["05", "jumla", "وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ",
    "Senga osiy bo'lganlardan voz kechamiz va uzoqlashamiz",
    null, 0, 0, 0, 0, 0, 0],
  ["06", "jumla", "اَللَّهُمَّ إِيَّاكَ نَعْبُدُ وَلَكَ نُصَلِّي وَنَسْجُدُ",
    "Allohim, faqat Senga ibodat qilamiz, Sen uchun namoz o'qiymiz va sajda qilamiz",
    null, 0, 0, 0, 0, 0, 0],
  ["07", "jumla", "وَإِلَيْكَ نَسْعَى وَنَحْفِدُ وَنَرْجُو رَحْمَتَكَ وَنَخْشَى عَذَابَكَ",
    "Senga shoshilamiz, xizmatingda harakatdamiz, rahmatingdan umidvormiz va azobingdan qo'rqamiz",
    null, 0, 0, 0, 0, 0, 0],
  ["08", "jumla", "إِنَّ عَذَابَكَ الْجِدَّ بِالْكُفَّارِ مُلْحِقٌ",
    "Albatta, Sening jiddiy azobing kofirlarga yetib boruvchidir",
    null, 0, 0, 0, 0, 0, 0],
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

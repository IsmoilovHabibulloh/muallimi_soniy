@AGENTS.md

# Claude protokollari

> Bu — foydalanuvchi tomonidan o'rnatilgan ish tartibi qoidalari. Doimo amal qiling.

## Git push va deploy — Claude O'ZI bajaradi (2026-06-10 yangilandi)

Foydalanuvchi dasturchi EMAS va terminal buyruqlarini bajarmaydi. Ish
yakunlanib, lokal tekshiruvlar (build, verify) o'tgach — **Claude o'zi
commit + push + serverga deploy qiladi va natijani jonli tekshirib beradi**.
Foydalanuvchiga "o'zingiz push qiling" deb qadam qoldirish — XATO.

Faqat quyidagilarda oldin so'rang: destruktiv amallar (ma'lumot o'chirish,
force-push, server konfiguratsiyasini buzishi mumkin bo'lgan o'zgarish).

Sabab: foydalanuvchi 2026-06-10 da aniq aytdi — "men dasturchi bo'lmasam,
buni bilmasam, qanday qilaman; senga ishonib loyiha qilyapman".

## UI arxitekturasini yangilab borish

Foydalanuvchi UI ni o'zgartirsa va bu yerda (CLAUDE.md ning "UI Arxitekturasi"
bo'limida) eski tavsif yozilgan bo'lsa — **eski tavsifni o'chirib, yangisini
yozib qo'ying**. Eski va yangi tavsif yonma-yon turmasin.

Sabab: agar eski arxitektura qolib ketsa, keyingi suhbatda Claude qaysi to'g'ri
ekanligini bilmay qoladi va xato qaror qabul qilishi mumkin. **Yagona haqiqat
manbai (single source of truth)** — eng so'nggi UI holati.

How to apply:
- Komponent renamed yoki o'zgartirildi → CLAUDE.md dagi nomini ham yangilang.
- Layout/spacing o'zgardi → eski qiymatlarni o'chiring, yangisini yozing.
- Yangi tugma/funksiya qo'shildi → tegishli komponent bo'limiga qo'shing.
- Eski yondashuv bekor qilindi → uni butunlay olib tashlang, izoh qoldirmang.

# Muallimi Soniy

---

## 🛑 Mad boblari (Sahifa 17-21) — QAT'IY QOIDA

> ⚠️ **DOIRA**: Bu bo'limdagi BARCHA qoidalar **FAQAT** mad sahifalarida
> (17, 18, 19, 20 va shartli 21-sahifaning mad qismida) qo'llanadi.
> Boshqa harf/bo'g'in/so'z sahifalari (1-16, 22+) **odatdagicha** —
> oddiy `arabic-text` class, oddiy `U+064E/U+0650/U+064F` harakat'lar,
> oddiy element rendereri ishlatadi. **Mad logikasini boshqa joylarga
> ko'chirmang.**

### 1. Pedagogik asos (nima uchun)

Kitob muqaddimasida (`32. madli 01.mp3` 0-29 soniya) o'qituvchi aniq aytadi:

> "Arabcha so'zlar madliy bo'lganda fatha, kasra va zamma alomatlari
> boshqacha yoziladi. **Fatha va kasra alomatlari yonboshlatilmay, balki
> tikka yoziladi.** **Zamma alomati odatiy zammadan ko'ra kattaroq,
> yo'g'onroq yoziladi.** O'quvchilar bu o'zgarishlarga diqqat qilishlari
> kerak."

Foydalanuvchi (2026-04 sessiyalari) qat'iy talab qildi: bu qoida UI da
ham vizual va matn sifatida ko'rinishi shart. Aks holda darslikning
pedagogik yaxlitligi buziladi.

### 2. Mad-only Unicode almashtirish (eng muhim qism)

Mad syllable yozganda **harakat belgilarini ALMASHTIRISH SHART**:

| Sahifa turi | Fatha       | Kasra        | Damma      |
|-------------|-------------|--------------|------------|
| Oddiy       | `U+064E ـَ` | `U+0650 ـِ`  | `U+064F ـُ`|
| **Mad**     | `U+0670 ـٰ` | `U+0656 ـٖ`  | `U+064F ـُ`|

```
Oddiy (xato mad uchun):  بَا     بِى     بُو
Mad   (to'g'ri):         بٰا     بٖى     بُو   ← damma o'zgarmaydi
Alif:                     آ      إٖى     أُو   ← آ U+0622, qolgani standart
```

**Eslatma**:
- Fatha/kasra'ning yangi belgilari — *Superscript/Subscript Alef* —
  ular tabiati bo'yicha tik vertikal chiziq, hech qanday shriftda ham
  yonbosh chiqmaydi. Bu kitobdagi "tikka yoziladi" qoidasini hal qiladi.
- Damma `U+064F` qoladi. **`U+0657 ـٗ` (Inverted Damma) ISHLATMANG** —
  u "teskari" damma chizadi (foydalanuvchi 2026-04-26 da rad etdi).
  Damma'ning kattaligi shrift orqali (pastdagi `MadDammaFont`) hal
  qilinadi.

### 3. Mad-only shrift kombinatsiyasi (`.mad-arabic-text` class)

`globals.css` da:

```css
@font-face {
  font-family: "MadDammaFont";
  src: url("/fonts/AmiriQuran.ttf") format("truetype");
  unicode-range: U+064F;     /* Faqat damma uchun */
}

.mad-arabic-text {
  font-family: "MadDammaFont", "Noto Naskh Arabic",
               "Amiri Quran", "UthmanicHafs", serif;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "mark" 1, "mkmk" 1, "kern" 1;
}
```

**Qoidalar**:
- `unicode-range` orqali brauzer **faqat U+064F** ni Amiri Quran'dan
  oladi (kattaroq, prominent damma). Qolgan barcha belgilar Noto Naskh
  Arabic'da renderlanadi (kasra/fatha tikka chiqadi).
- 6 ta shrift solishtirildi (Noto Naskh, Amiri, Amiri Quran, Scheherazade
  New, Kitab, KFGQPC). Har birining kuchli/zaif tomoni boshqacha:
  KFGQPC fatha'ga juda yaxshi, lekin kasra'ni yonbosh qiladi; Noto Naskh
  kasra'da tikka; Amiri Quran damma'da kattaroq. Shu sababli
  kombinatsiya qilingan.
- `mad-arabic-text` faqat madli element'lar uchun. Boshqa joyda
  `arabic-text` qo'llanadi.

### 4. Mad-only komponentlar

- **`<MadRule />`** (`RenderedPage.tsx`) — kitob muqaddimasi qoidasini
  ko'rsatuvchi banner. **FAQAT 17-sahifada** ko'rsatiladi (audio narration
  bilan, click qilinsa `intro_rule.mp3` 0-29s ijro etadi). 18-21 sahifalarda
  **TAKROR KO'RSATILMAYDI** — foydalanuvchi 17-da o'qib bo'lgan, qayta
  takrorlash sahifa joyini behuda egallaydi.
  - Matn audio bilan **1:1 verbatim**: 6 gap to'liq, hech narsa
    qisqartirilmagan ("audiodagi hech narsa qob ketmasin").
  - Asosiy 2 qoida (fatha/kasra tikka + damma kattaroq) **bold**.
  - Olib tashlash, qisqartirish — **xato**.
- **`<TitleBlock />`** (Page17 ichida) — `<Title />` o'rniga, click bilan
  `intro_title.mp3` (30.5-31.9s "Madliy harflar") ijro etadi. Element
  `intro_title` ID bilan `elements.ts` da yoziladi.
- **`<ArabicEl mad />`** — `mad={true}` prop bersangiz ArabicEl
  `mad-arabic-text` class'ni qo'llaydi (`font-bold` qo'shilmaydi —
  shrift o'z weight'ida). Mad grid'dagi barcha element'lar shu prop
  bilan render qilinadi.
- **Header letters** (`ا ي و` mad sahifa tepasida) — oddiy `arabic-text`
  (Noto Naskh) ishlatiladi, mad-arabic-text **emas**. Sabab: KFGQPC da
  isolated `ي` nuqtasiz chiqadi (Quranic imlo), darslikda nuqtali kerak.

---

## 🛑 Tashdid + kasra / kasratan — DOIM harf OSTIDA (kitob bo'ylab)

**Qoida**: `harf + ّ + ِ` (shadda + kasra) yoki `harf + ّ + ٍ` (shadda +
kasratan / tanvin kasra) kombinatsiyasida kasra/kasratan **harf ostida**
(an'anaviy joyda) chizilishi shart, **shadda yonida emas** (kompakt
kombinatsiya emas). Shadda esa o'z joyida — harf ustida — qoladi.

### Texnik yechim — Custom Noto Naskh (universal)

Foydalanuvchi 2026-04-27 da shadda+kasra xato'ni qayd etdi. 2026-05-11
da shadda+kasratan ham xuddi shu muomalaga muhtojligini aytdi
(25-sahifa R3 da `سِتٍّ سِرٍّ` va h.k.).

Sabab: Noto Naskh Arabic shriftida `GSUB Lookup 5` da quyidagi ligature
qoidalari bor:
- `uni0651 + uni0650 -> uni06510650` (shadda + kasra → kompakt)
- `uni0651 + uni064D -> uni0651064D` (shadda + kasratan → kompakt)

Bu ligature'lar kasra/kasratan'ni shadda yonida, harf ustida chizadi.
Foydalanuvchi global Amiri'ni rad etdi ("bijr-bijr tushunarsiz"); shartli
Amiri (faqat shadda+kasra so'zlar uchun) ham rad etildi — bitta toza
shrift xohlangan.

**Yechim**: source Noto Naskh shriftidan shu 4 ta ligature qoidasini
(2 ligature × forward + reverse) o'chirgan custom shrift yasaymiz.
HarfBuzz standart `mark`/`mkmk` yo'liga tushadi — kasra/kasratan harf
ostida (an'anaviy joyga) chiziladi.

**Build skripti**: `tools/build_custom_font.py`
- Source: `muallimus-soniy/public/fonts/NotoNaskhArabic-VariableFont_wght.ttf`
- Output: `muallimus-soniy/public/fonts/NotoNaskhArabic-MuallimiSoniy.ttf`
- O'chiriladigan ligature: `uni06510650`, `uni0651064D` (4 qoida —
  ikkalasining forward + reverse)
- Saqlanadigan ligature: `uni0651064B`, `uni06510670` (tanvin fatha +
  shadda, superscript-alef + shadda) — fathatan tabiatan harf ustida,
  superscript-alef ham ustida, shu sababli ular bilan kompakt birikma
  to'g'ri ko'rinadi
- Family name: "Noto Naskh Arabic Muallimi" (asl Noto Naskh bilan
  kollyziya bo'lmasin)

`globals.css`:
```css
@font-face {
  font-family: "Noto Naskh Arabic Muallimi";
  src: url("/fonts/NotoNaskhArabic-MuallimiSoniy.ttf") format("truetype");
  font-weight: 400 700;
}

:root {
  --font-arabic: "Noto Naskh Arabic Muallimi", "Noto Naskh Arabic", ...;
}
```

`ArabicEl` (`RenderedPage.tsx`) — endi inline `fontFamily` mantiqi YO'Q.
`arabic-text` class allaqachon `var(--font-arabic)` ni qo'llaydi —
custom shrift har joyda avtomatik ishlaydi.

### 🚦 BARCHA sahifalarda CUSTOM shrift majburiy (foydalanuvchi qarori 2026-05-11)

> **"bundan keyin barcha sahifalarda shu maxsus custom shriftimizni
> ishlatsin. Sababi: uni ishlatganimizcha boyita olamiz va aynan
> shu rasmdagi (kitob) bilan 1:1 natija chiqara olamiz."**
> — foydalanuvchi, 2026-05-11.

**Bu — yagona haqiqat manbai (single source of truth)**. Boshqa
shriftlar (Amiri, Scheherazade, Kitab, KFGQPC va h.k.) **vaqtinchalik
yoki shartli ishlatilmaydi**. Bitta toza universal stack:
`NotoNaskhArabic-MuallimiSoniy.ttf` (Custom Noto Naskh Muallimi).

### Nima uchun

- **1:1 reproduktivlik**: Custom shrift bizning loyihamizning aniq
  vizual standartiga muvofiq sozlanadi (GSUB ligatures, marks,
  positioning). Boshqa shriftlar har birining o'z bezakli farqi bor
  ("bijr-bijr tushunarsiz", kasra yonbosh, dot/no-dot variantlar va h.k.).
- **Boyitish imkoni**: Yangi muammo chiqsa (masalan: shadda+kasratan
  2026-05-11 da chiqdi), source TTF dan tegishli GSUB ligature'ini
  o'chirib qayta build qilamiz. Bu — bizning xizmatimizdagi yagona
  texnik javob. Conditional shrift, inline `fontFamily`, yoki
  if/else mantiqi YO'Q.
- **Texnik avantaj**: HarfBuzz standart mark/mkmk yo'liga tushishiga
  yo'l qo'yamiz — bu kitobning an'anaviy renderini beradi (kasra
  ostida, shadda ustida va h.k.).

### Yangi sahifa qurayotganda — checklist

✅ **Qiling**:
- Oddiy `<ArabicEl el={...} />` yoki `<Row els={...} />` ishlating —
  custom shrift avtomatik qo'llaniladi.
- Hech qanday so'z uchun maxsus muomala kerak emas — har bir tashdid +
  kasra/kasratan/fatha/damma kombinatsiyasi kitobdagidek to'g'ri chiqadi:
  - Tashdid+kasra: `رَبِّ`, `بُرِّ`, `كُلِّ` — kasra harf ostida (FIX 2026-04-27).
  - Tashdid+kasratan: `سِتٍّ`, `بِرٍّ`, `حِلٍّ` — kasratan harf ostida (FIX 2026-05-11).
  - Tashdid+fathatan: `رَبًّا`, `حَبًّا` — fathatan ustida (tabiiy).
  - Tashdid+dammatan: `رَبٌّ`, `دُرٌّ` — dammatan ustida (tabiiy).

❌ **QILMANG**:
- **Boshqa shriftga o'tmang.** "Bu so'z uchun Amiri yaxshiroq" yoki
  "bu sahifada KFGQPC kerak" kabi qarorlar — **xato**. Muammoni
  source shriftda hal qiling (`tools/build_custom_font.py` ni
  kengaytiring).
- `fontFamily: "'Amiri', var(--font-arabic)"` kabi inline shrift YOZMANG.
- `hasShaddaKasra(...)` ga o'xshash tekshiruv funksiya QO'SHMANG —
  bunday funksiya kodda yo'q va kerak ham emas.
- Tashdid/kasra so'zlar uchun `<span>` ichida maxsus shrift mantiqi
  QO'YMANG. Bitta toza shrift — butun kitob bo'ylab universal.
- Mad sahifalar (17-21) ga ta'sir qilmang — ular `mad-arabic-text`
  class orqali alohida stack ishlatadi.

### Yangi rendering muammosi chiqsa — algoritm

1. Muammoni aniq ifodala: qaysi harf+harakat kombinatsiyasi xato chiqyapti?
   Kitobdagi to'g'ri shaklini rasmdan ko'chirib ko'rsat.
2. Source Noto Naskh shriftida tegishli GSUB Lookup'ni topish:
   ```bash
   cd "muallimi soniy" && python3 -c "
   from fontTools.ttLib import TTFont
   f = TTFont('muallimus-soniy/public/fonts/NotoNaskhArabic-VariableFont_wght.ttf')
   gsub = f['GSUB'].table
   for i, lk in enumerate(gsub.LookupList.Lookup):
       print(i, lk.LookupType)
   "
   ```
3. `tools/build_custom_font.py` ga muammoli ligature'ni `TARGET_LIGS`
   set'iga qo'shing va `EXPECTED_REMOVED` ni yangi songa moslang (har
   ligature forward + reverse = 2 qoida).
4. Build qiling: `python3 tools/build_custom_font.py`.
5. CSS cache-buster (`?v=N`) ni oshiring (`globals.css` da). Bu
   browser keshini majburiy yangilaydi.
6. Preview da tasdiqlang (hard reload kerak bo'lishi mumkin).
7. CLAUDE.md "Tashdid + kasra / kasratan" bo'limini va memory
   `feedback_custom_font_validated.md` ni yangilang.

**Mad sahifa ta'sirsiz**: `.mad-arabic-text` class shrift stack'ida
`"Noto Naskh Arabic"` (asl, "Muallimi" suffiksisiz) ishlatadi — mad
logikasi (MadDammaFont + Noto Naskh + Amiri Quran) buzilmagan. Mad
sahifalar uchun custom shrift TUTILMAYDI, sababi mad fatha/kasra
yangi belgilarga (U+0670/U+0656) almashtiriladi.

**Yangilash**: agar source Noto Naskh shrifti yangilansa, qayta build:
```bash
python3 tools/build_custom_font.py
```
Skript output'ida 4 ta ligature saqlanganini (`uni0651064B`,
`uni06510670` forward + reverse) va `uni06510650`, `uni0651064D`
o'chirilganini tasdiqlaydi.

### 5. Mad-only audio struktura (`32. madli 01.mp3`)

Asl audio 4:31, quyidagi chunklar yaratilgan (`/audio/edit/32_madli_01/`):

| Chunk fayli            | Davomi   | Maqsad                                |
|------------------------|----------|---------------------------------------|
| `intro_rule.mp3`       | 0-29.6s  | Kitob muqaddimasi narration (qoida)   |
| `intro_title.mp3`      | 30.5-32s | "Madliy harflar" sarlavhasi           |
| `m01_alif_aa.mp3` ...  | har biri | 84 syllable (28 harf × 3 mad shakl)   |
| `m84_ya_uu.mp3`        | ~1s      |                                       |

`elements.ts` da `intro_rule` va `intro_title` element'lari `jumla`
type bilan, qolgan 84 element `bogin` type bilan kiritilgan.

### 6. Yangi mad sahifa qo'shish jadvali (checklist)

1. ☐ `MadRule` **faqat 17-sahifa uchun** (intro_rule + intro_title element bilan).
     18-21 da MadRule ishlatmang.
2. ☐ Mad syllable matnlarida Unicode belgilarni almashtirish
   (fatha→U+0670, kasra→U+0656, damma U+064F qolsin)
3. ☐ Grid renderda `<ArabicEl mad={true} />` ishlatish
4. ☐ Header'larda oddiy `arabic-text` (mad emas)
5. ☐ Preview'da tekshirish: fatha/kasra tikka, damma katta

**Odatiy `arabic-text` + odatiy harakat'lar bilan qoldirish — xato.**

---

## 🛑 2 ENG MUHIM XATO — HAR YANGI HARF SAHIFASI BOSHIDA TEKSHIR

Bu ikki xato o'tgan sessiyalarda (p3, p4, p5) qayta-qayta takrorlandi.
Foydalanuvchi har safar tuzatadi. **Yangi sahifani boshlashdan oldin ikki
qoidani birdek qattiqlik bilan qo'llash shart**.

### Xato #1 — Connector harfning header'i isolated shaklda yozilgan

**QAT'IY QOIDA**:

```
Agar harf ∈ {ب ت ث ج ح خ س ش ص ض ط ظ ع غ ف ق ك ل م ن ه ي} (connector):
    HEADER MAJBURIY pozitsion shakllarda:
        fatha → "Xَ"        label: "X (boshida)"
        kasra → "ـXِـ"      label: "X (oʻrtasida)"
        damma → "ـXُ"       label: "X (oxirida)"
    ISOLATED shakl ("Xَ Xِ Xُ") YOZISH MUMKIN EMAS.

Agar harf ∈ {ا د ذ ر ز و} (non-connector):
    HEADER isolated shaklda:  "Xَ Xِ Xُ"
    Label: "X fatha" / "X kasra" / "X damma"
```

**Unicode**: tatweel `ـ` = U+0640. Namunalar: `مَ` / `ـمِـ` / `ـمُ` (p4 Mim
to'g'ri), `نَ` / `ـنِـ` / `ـنُ` (p5 Nun to'g'ri).

**⚠️ PLACEHOLDER KODGA ISHONMASLIK**: `src/lib/data/elements.ts` da p6-p16 uchun
**placeholder header'lar hozir isolated shaklda** (masalan `بَ بِ بُ`). Bu
**xato** — integratsiya vaqtida **qayta yozib chiqish shart**. Copy qilib,
faqat audio URL'ni yangilashga yo'l qo'ymang.

### Xato #2 — Arab matn rasmdan noto'g'ri ko'chirilgan

**Eng xato bo'lgan joylar** (oxirgi harfdagi harakat farqi katta ma'no beradi):
- `اَمَرْتَ` (sen m) ≠ `اَمَرْتِ` (sen f) ≠ `اَمَرْتُ` (men) ≠ `اَمَرَتْ` (u f)
- `مِيزَرْ` (mizar, xato) ≠ `مَيْزَرْ` (mayzar, to'g'ri)
- `اَيْمَنَيْنِ` (xato qo'shimcha) ≠ `اَيْمَيْنِ` (to'g'ri)
- `اَمْرَنَا` (xato, 1 ta ra) ≠ `اَمْرَرْنَا` (to'g'ri, 2 ta ra)
- **p6 xatolari** (takrorlanmasin):
  - `بَيْنَ` (xato, "bayna" mashhur preposition deb yozilgan) ≠ `بَيْنُ` (to'g'ri, ism shakli)
  - `رَيْبْ` (xato, Qur'on `لَا رَيْبَ فِيهِ` ta'sirida) ≠ `رَيْبُ` (to'g'ri)
  - `اَمْرَكَ` (xato, mim-sukun, 3 heca) ≠ `اَمَرَكَ` (to'g'ri, mim-fatha, 4 heca — u seni buyurdi)

**QAT'IY QOIDA**: Har arab so'zini rasmdan **harf-harf** (tanimay) parse
qiling. Struktura yozing:
```
alif+fatha → mim+fatha → ra+sukun → ta+kasra  →  اَمَرْتِ  →  "amarti"
```
So'zni "tanib", harakatlarini xotira asosida to'ldirish — **taqiqlangan**.
PDF'ga ishonmang (80% aniqlik). Shubhada bo'lsangiz — foydalanuvchidan so'rang,
taxmin qilmang.

**Majburiy audio verify**: Har so'zni yozganingizdan keyin `afplay` bilan
mos chunk'ni eshiting. Audio bilan transliteratsiya to'liq mos kelmasa —
qayta parse qiling.

To'liq protokol: `### ⚠️ Arab matnni rasmdan o'qish protokoli` bo'limida.

---

## Loyiha haqida

Bu — Ahmad Hodiy Maqsudiyning **"Muallimi Soniy"** (1892) klassik darsligini
audio bilan integratsiya qilingan interaktiv versiyasi. Maqsad — arab tilini
(Qur'on tilovati va tajvid) o'rgatish.

Loyiha **ochiq kodli** bo'ladi. Maqsad oliy: kelajakda kim shu kabi loyiha qurmoqchi
bo'lsa, biz qiynalganday qiynalmasin — kod va hujjatlar **toza, tushunarli, oson
takrorlanadigan** bo'lishi shart.

## ⚠️ Eng nozik jihat: audio-matn integratsiyasi

Har bir arab harfining **mahraji** (talaffuz nuqtasi) bor. Bizdagi audio yozuvlarda
**hamma harflar to'g'ri mahrajdan chiqarilgan** — bu darslikning butun mohiyati.

**Agar audioni xato biriktirsak yoki noto'g'ri segment ijro etilsa — darslik
o'z mohiyatini yo'qotadi va foydalanuvchiga noto'g'ri talaffuz o'rgatadi.**

Shuning uchun:
- Har bir sahifa **qo'lda, individual** ishlab chiqiladi.
- Audio segment koordinatalari va element pozitsiyalari **avtomatik generatsiya
  qilinmaydi** — har birini eshitib, tekshirib qo'yiladi.
- Audio integratsiyasini qo'l bilan tekshirmasdan **hech qachon** o'zgartirmang.

## Audio arxitekturasi

Audio integratsiyasi — **chunked-files** yondashuvi:

1. **Asl audio (backup)** — `public/audio/NN. <topic>.mp3` (har dars bitta katta fayl).
   Foydalanuvchiga ko'rinmaydi, lekin saqlanadi:
   - Audio control bar'dagi "to'liq ijro" (lesson.audioUrl) shuni ishlatadi.
   - Xato bo'lsa, qayta cut qilish uchun manba.
2. **Bo'lingan chunklar** — `public/audio/edit/<NN_topic>/eXX_<name>.mp3`:
   - Har bir element o'z fayli bilan (28 harf → 28 chunk).
   - App shu fayllardan ijro qiladi (per-element click).
3. **Master nusxalar** — `Materiallar/<bob>/edit_audios/<NN_topic>/`:
   - `public/audio/edit/...` ga aynan mos.
   - Source-of-truth — qayta deploy/qayta yaratish uchun.

### Element-chunk bog'lanishi

`src/lib/data/elements.ts` da:
```ts
const A = {
  alifbo: "/audio/03. alifbo.mp3",      // asl, backup
  e: (n: string) => `/audio/edit/03_alifbo/${n}.mp3`,  // chunk helper
};

["02", "harf", "ب", "Ba", A.e("e02_ba"), 0, 0.50, ...]
//                         ^chunkUrl  ^start  ^end (= chunk_duration)
```

Foydalanuvchi `ب` ustiga bosganda — `e02_ba.mp3` to'liq ijro etiladi.

## Ma'lumot olish (data API)

Element ikki darajada chaqirilishi kerak:

1. **Element darajasida** — bitta harf/so'z/jumla alohida ijro etiladi.
2. **Sahifa darajasida** — masalan 4-sahifa chaqirilsa, undagi **barcha
   elementlar va audio segmentlari birga** keladi (ketma-ket ijro yoki tanlab
   ijro uchun).

## 🚨 Yangi sahifa ustida ishlashdan oldin — MAJBURIY checklist

Bu checklist — avvalgi sessiyalarda o'rganilgan xatolarni takrorlamaslik uchun.
Har bir yangi sahifa uchun, TO'G'RIDAN-TO'G'RI boshlamang. Avval:

### 1. Kitob rasmini batafsil ko'ring

```
Read Materiallar/harflar/<N>.jpg  # yoki tegishli bob papkasi
```

- Rasmda **nechta element** borligini sanang (harflar, so'zlar, birikmalar).
- Bo'limlar, qatorlar, dividerlarni yozib oling.
- Agar shakllar bog'langan bo'lsa — **pozitsion shakllar** (ـمِـ, ـتُ kabi)
  borligini qayd eting.

### 2. PDF transkripsiyani tekshiring

```
Read Materiallar/audio_qoidalar/<NN>_*.pdf
```

- PDF dagi entry sonini **rasm dagi element soniga taqqoslang**.
- Agar PDF kam bo'lsa — PDF yetmagan entry'lar bor, **audio'da sukunat aniqlash
  bilan topish kerak**.
- PDF transkripsiya matnlari har doim to'g'ri emas (shin/sod, tarir/tarar kabi).

### 3. Audio ni batafsil analiz qiling

```bash
./tools/ffmpeg -i <audio> -af "silencedetect=noise=-40dB:duration=0.10" -f null -
```

- Sukunatlar orasidagi sound region'lar sonini PDF + rasm bilan taqqoslang.
- Agar son farq qilsa — tekshirish kerak. Audio'da qo'shimcha / kam so'z bormi?

### 4. Sahifalarni birlashtirishdan oldin rasmlarni taqqoslang

**O'tgan sessiyada xato qildik**: 3.jpg va 4.jpg "bir xil" deb merged qildik,
lekin ular butunlay boshqa sahifalar edi. Merge qilishdan oldin **ikkala rasmni
parallel ko'ring va haqiqatan bir xil ekanligiga ishonch hosil qiling**.

### 5. Connector harf bo'lsa — POZITSION SHAKLLAR majburiy

Agar sahifa connector harf (`ب ت ث ج ح خ س ش ص ض ط ظ ع غ ف ق ك ل م ن ه ي`)
ustida bo'lsa, header qatori **har doim** pozitsion shakllarda yoziladi:
`X / ـXِـ / ـXُ`. Uzbek label: `"X (boshida)" / "X (oʻrtasida)" / "X (oxirida)"`.

**Xato takror kelmasin**: Men p4 da mim/ta uchun to'g'ri qilganman, lekin p5
da nun/ya uchun isolated shakl yozib xato qilganman. Har YANGI sahifaga yangi
harf qo'shilsa — darhol ushbu qoidani qo'llash kerak, keyin tekshirmoq
uchun qoldirmaslik.

### 6. Build xatoni oldindan ushlash

Deploy qilishdan oldin **lokal build** ishga tushiring — TypeScript xatolarini
server build'da emas, lokal'da ushlash arzonroq:

```bash
cd muallimus-soniy && npx next build
```

Masalan duplicate object key (`4: make(4, p4)` ikki marta) xatolari bu bilan
ushlanadi.

## Har bir sahifa ustida ish tartibi (audio integratsiya protokoli)

> **Bu CLAUDE.md darajasidagi qat'iy protokol — har bir sahifa uchun amal qiling.**

### 🛑 Vaqt qo'yishdan oldin — AUDIO ENERGIYASINI o'lchang (2026-08-24)

Foydalanuvchi bir sessiyada uchta bir xil ildizli xatoni topdi. Uchalasi ham
vaqtlar **eshitilmasdan/o'lchanmasdan** qo'yilganidan kelib chiqqan:

| Xato | Sabab |
|---|---|
| Muqaddima: har paragraf oldingisining oxirini ijro etardi | chegara Whisper so'z vaqtiga qo'yilgan |
| Bismillah oxirida "Qo" eshitilardi | chegara keyingi so'z boshiga juda yaqin (30 ms) |
| `زُرْ` oxiri uzilib qolgan | kesim tovush o'rtasida (0.33 s, qo'shnilari 0.60 s) |

**QAT'IY QOIDA**: Whisper ham, PDF ham vaqtni **taxminan** beradi —
Whisper so'z boshini haqiqiydan **0.3–1.5 s ERTA** ko'rsatadi (o'lchandi).
Ularga tayanib chegara qo'yish — xato. Har doim energiyani o'lchang:

```bash
# Bitta talaffuzning haqiqiy boshi/oxiri
py tools/audio_span.py "public/audio/06. za.mp3" 18.30 19.60

# Kesilib qolgan chunklarni topish (butun loyiha yoki tanlangan papkalar)
py tools/check_chunk_tails.py 06_za 07_ma
```

**Zaxira**: boshidan −0.05 s, oxiridan +0.08 s (fricative/nazal so'nishi uchun).

**AudioEngine 40 ms polling bilan to'xtaydi** — segment oxiri keyingi
tovushga 40 ms dan yaqin bo'lsa, o'sha tovush ham eshitiladi. Chegarani
jimlikning o'rtasiga qo'ying, tovush chetiga emas.

### 🛑 So'z oxiridagi PORTLOVCHI kesilib qolishi (ت ك ق ط ب د ج)

2026-08-24 da foydalanuvchi topdi: 20-sahifada `مُخْلِصَاتْ` chunki
"muxlisaa" bo'lib eshitilardi — oxirgi "t" yo'q edi.

Sabab — jarangsiz portlovchi ikki fazadan iborat:

| Faza | Nima bo'ladi | Energiya |
|------|--------------|----------|
| 1. Yopilish | ~100 ms **JIMLIK** | ~nol |
| 2. Portlash | harfning o'zi | past, lekin bor |

Kesim 1-fazada tugasa, harf **butunlay yo'qoladi**, lekin chunk "toza"
ko'rinadi — chunki jimlikda tugagan. `check_chunk_tails.py` buni
TOPA OLMAYDI.

Misol (`33. madli 02.mp3`):
```
283.00-283.27  unli "aa"      (~5000)
283.28-283.41  jimlik          (~25)   <- eski kesim shu yerda tugagan
283.42-283.51  "t" portlashi   (~700)  <- yo'qolgan qism
```

**Qoida**: oxiri sukunli portlovchi bo'lgan so'zni kesayotganda,
`audio_span.py` bilan jimlikdan KEYINGI portlash bor-yo'qligini
tekshiring va uni kesim ichiga oling.

⚠️ **Buni avtomatlashtirib bo'lmaydi**: arab tilida vaqf holatida oxirgi
portlovchi ko'pincha **portlatilmay** o'qiladi — bu me'yor. Chunkning
o'zidan qarab "qori portlatmagan" bilan "portlash kesilgan" ni ajratib
bo'lmaydi (sinab ko'rildi: 95 ta so'zdan 77 tasi yolg'on bayroq oldi).
Ajratish uchun MANBA audioning kesimdan keyingi qismini ko'rish kerak.

### 🔍 Audio chunk NOMI — matnni tekshirishning bepul usuli

Chunk fayllari talaffuz bo'yicha nomlangan (`zh44_zahr_za.mp3`,
`th09_thamanun.mp3`). Matnni yozayotganda **chunk nomiga qarang** — agar
matn boshqa so'zni ko'rsatsa, biri xato.

2026-08-24 da shu bilan topildi: 16-sahifada matn `ذَهَبْ` (zahab) edi,
chunk nomi esa `zh44_zahr_za` — kitobda `زَهَرْ` ekan (dhal→zay, ba→ra).
Yonidagi `طَهَرْ` ham `ظَهَرْ` bo'lishi kerak edi (`zh45_zahr_zo2`).

⚠️ Buni AVTOMATLASHTIRISHGA urinildi va bekor qilindi: nomlash
konvensiyasi sahifalar bo'ylab har xil (`p27_alif_r1_w2_rahman` da
`alif` — bo'lim nomi, so'zning qismi emas), shu sababli avtomatik
solishtirish juda ko'p yolg'on ogohlantirish beradi. Qo'lda qarang.

### ⚠️ PDF'ga ko'r-ko'rona ishonmaslik

`Materiallar/audio_qoidalar/<NN>_*.pdf` fayllari 80% aniqlikdagi qo'llanma.
**PDF vaqtlari odatda tovushning markazi** (eng baland qism / loud peak)'ni
ko'rsatadi — to'liq sound envelope'ni emas. Shuning uchun ular:
- Vowel attack (boshidagi unli ko'tarilishi) — 50-100 ms kesib yuborilgan
- Fricative tail (oxiridagi shhh/ssss cho'zilgan tovush) — 100-200 ms kesilgan
- Ba'zi harflarni butunlay noto'g'ri joyga yo'naltirgan (masalan, alifbo'da `shin` — PDF 82.36 ga yo'naltirgan lekin u yerda sod, asl joyi 79.40)
- Ba'zi so'zlarni transkripsiyada tushirib qoldirgan (masalan, sahifa 4 Mim so'zlari: `umara`, `imru`, `irm` PDF to'liq bermagan)
- So'zlar oxirini kesgan (amara/imra/amru — 180-340 ms tail yo'qolgan)

**PDF'ni "markaz koordinatasi" sifatida boshlang'ich nuqta deb oling — har
doim -50/+100 ms buffer qo'shing va eshitib tasdiqlang.**

### ⚠️ Rasm bilan audio mos kelmasligi mumkin

Kitob rasmi vizual referens, lekin yakuniy haqiqat — foydalanuvchi audio eshituvi:
- Rasmda **تَرَرْ** (tarar) ko'ringan, lekin audio talaffuzi **تَرِرْ** (tarir).
  Demak harakat sukun emas kasra bo'lishi kerak.
- So'z oxiri ba'zida sukun, ba'zida damma/fatha/kasra — har birini eshitib tekshirish shart.
- Arab harakatlari ba'zan juda mayda chiziq — rasm past sifatli bo'lsa, farqlab
  bo'lmaydi. Shubhada bo'lsangiz — foydalanuvchidan aniqlashtirib so'rang.

**Qoida**: Rasm → vizual reja. Audio → haqiqiy matn. Ikkisi ziddiyatga tushsa — foydalanuvchidan so'rang.

### ⚠️ PDF'da entry'lar tushib qolishi mumkin

O'tgan sessiyada sahifa 4 Mim qatorida **3 ta so'z yetishmagan** edi (umara, imru, irm)
— PDF transkripsiyasi buzuq yoki to'liq emas edi. Echim:

1. **Rasm elementlarini sanash**: rasmda nechta so'z? PDF da nechta entry?
2. **Audio'da sukunat aniqlash**: `silencedetect` butun audio bo'ylab ishga tushiring.
   Sukunatlar orasidagi sound regions sonini PDF entry soniga taqqoslang.
3. **Farq bo'lsa — audio'da yashirilgan entry'lar bor**: ularning timing'ini
   silence boundary'laridan oling, foydalanuvchi tasdiqlaydi.

### ⚠️ So'zlar oxiri 180-340 ms kesilgan bo'lishi mumkin

PDF vaqtlari so'zning **loud peak markazini** ko'rsatadi. So'z oxiridagi tabiiy
fade-out 180-340 ms davom etadi — PDF buni kesib yuboradi.

Protokol:
1. Har so'z uchun **silence-detected tugash vaqtini oling** (PDF emas).
2. Buffer: +100 ms (ayniqsa cho'zilgan oxiri bor so'zlar uchun).
3. Foydalanuvchi eshitadi: "oxiri kesilgan" desa — silence boundary + 50ms ga qo'shing.

### ⚠️ Audio so'z tartibi: ba'zan KITOB RTL ga TESKARI (LTR vizual tartib)

**Aniqlangan 2026-05-19 da p24 da**: Tanvinli so'zlar bo'limida (R10-R14) audio
har row ichida **kitobning RTL o'qish tartibiga TESKARI** o'qiydi — ya'ni vizual
ko'rinish bo'yicha CHAP TOMONDAN o'ng tomonga.

Misol p24 R10:
- Kitob RTL (o'qish): `fawtu` → `fawtin` → `fawtan` → `tsawbu` → `tsawbin` → `tsawban`
- Audio order:        `tsawban` → `tsawbin` → `tsawbu` → `fawtan` → `fawtin` → `fawtu`

Yana audio xulosalari:
- Aynan ALPHABET (p24 R1-R9) tartibi audio bilan to'g'ri keladi — alfa-betik ketma-ketlik
  ikki yo'naltirishda ham bir xil bo'ladi (alif→ba→ta...).
- Faqat misol so'zlar (book-specific tartib) da audio teskari o'qishi mumkin.

**Aniqlash usuli — Whisper transcribe**:
```bash
# 1. Words bo'limini source dan kesish
./tools/ffmpeg -y -ss <start> -i <source.mp3> -t <length> -c:a libmp3lame -b:a 192k /tmp/section.mp3
# 2. Whisper bilan transcribe (Arabic)
export PATH="$(pwd)/tools:$HOME/Library/Python/3.9/bin:$PATH"
whisper /tmp/section.mp3 --model small --language Arabic --output_format json --output_dir /tmp/wh
# 3. JSON dagi so'z tartibini kitob RTL bilan solishtiring.
#    Mos kelmasa — cut script timings'ini har row ichida REVERSED indexing bilan yozing.
```

**Cut script da to'g'ri yozish**:
Agar audio teskari o'qisa, har row ichida book_w01 = audio'ning **OXIRGI** segmenti
(eng kech vaqt), book_wN = audio'ning **birinchi** segmenti (eng erta vaqt). Mapping:

```bash
# Misol R10 (audio segments 85-90, kitob w01-w06):
cut p24_w01_fawtu    138.44 139.85  # segment 90 — audio R10 oxirgi
cut p24_w02_fawtin   136.48 137.88  # segment 89
cut p24_w03_fawtan   134.60 136.01  # segment 88
cut p24_w04_thawbu   132.76 134.10  # segment 87
cut p24_w05_thawbin  130.97 132.29  # segment 86
cut p24_w06_thawban  129.20 130.48  # segment 85 — audio R10 birinchi
```

**Yangi sahifa qurayotganda — qoida**:
1. Silencedetect bilan segment'larni topish (har row N segment beradi).
2. Whisper bilan transcribe va tartibni tasdiqlash.
3. Audio ↔ kitob RTL: ALPHABET BO'LSA — chronological (1→N). MISOL SO'Z BO'LSA —
   reverse tekshirish shart.

### ⚠️ Arab matnni rasmdan o'qish protokoli (eng ko'p xato keladigan joy)

O'tgan sessiyalarda (p3, p4, p5, p6) matn noto'g'ri ko'chirilgani uchun foydalanuvchi
qayta-qayta tuzatgan. **Xato pattern'lari**:

1. **Oxirgi harfdagi harakat** — `ت` oxirida `fatha/kasra/damma/sukun` turli ma'no
   beradi:
   - `اَمَرْتَ` (amarta, 2-m "sen") vs `اَمَرْتِ` (amarti, 2-f "sen") vs
     `اَمَرْتُ` (amartu, 1-sing "men") vs `اَمَرَتْ` (amarat, 3-f "u ayol")
2. **Alif boshidagi harakat** — `اَ` (fatha) vs `اُ` (damma) vs `اِ` (kasra):
   aktiv/passiv/predlog farqi
3. **Tushib qolgan harflar** — `مَرَرْتُ` (ikki ra) vs `مَرْتُ` (bir ra);
   `مَيْزَرْ` (m+y+z+r) vs `مِيزَرْ` (m+i+z+r — noto'g'ri)
4. **Qo'shilgan harflar** — `اَيْمَيْنِ` (aymayni, to'g'ri) vs `اَيْمَنَيْنِ`
   (aymanayni, qo'shimcha `نَ` bilan noto'g'ri)
5. **PDF ga ishonish** — PDF 80% aniqlik. Rasm va audio asosiy manba
6. **"Tanish so'z" pattern completion** — ko'rishga tanish ko'ringan so'zni
   xotira asosida to'ldirish
7. **O'rtadagi mim/ra/nun sukun vs fatha** — mayda nuqta/chiziq bo'lgani uchun
   ko'rinmaydi, lekin hecani o'zgartiradi:
   - `اَمْرَكَ` (amraka, 3 heca) vs `اَمَرَكَ` (amaraka, 4 heca — u seni
     buyurdi) — mim ostida fatha borligi "ma" hecasini beradi
   - `تَرْكُ` (tarku, 2 heca) vs `تَرَكَ` (taraka, 3 heca past fe'l)

### 🚨 "Tanish so'zlar" qora ro'yxati — DOIM shubhali

Bu so'zlar arab tilida ma'lum ma'no bilan keladi, lekin **darslikda odatdagidan
boshqa harakat bilan bo'lishi mumkin**. Xotira asosida yozmang — rasmdan harf-harf
parse qiling va audio bilan tasdiqlang:

| Tanish so'z | Odatdagi harakat | Darslikdagi variant | Misol |
|---|---|---|---|
| bayn | `بَيْنَ` (preposition) | `بَيْنُ` (ism shakli) | p6 Ba |
| rayb | `رَيْبَ` / `رَيْبْ` (Qur'on) | `رَيْبُ` | p6 Ba |
| amr | `اَمْر` (3 heca) | `اَمَرَ` (4 heca past fe'l) | p6 Kaf |
| qalb | `قَلْبْ` | `قَلْبُ` (ism shakli) | p9 |
| 'abd | `عَبْد` | `عَبْدُ` / `عَبَدَ` | — |

**Qoida**: Agar so'z ma'lum/mashhur tuyulsa — **bu qizil alarm**. Rasmni lupa
bilan ko'ring, audio'ni eshiting, foydalanuvchidan aniqlashtiring.

### 🔔 Juftlangan fe'llar — ikkisi birga keladi

Arab darsliklarida fe'l shakllari juft (3-m erkak + 3-f ayol) yonma-yon beriladi.
Agar biri ko'rinsa — ikkinchisini ham tekshiring:

| 3-erkak (u) | 3-ayol (u f) | 2-erkak + 2-f object |
|---|---|---|
| `اَمَرَ` (amara) | `اَمَرَتْ` (amarat) | — |
| `اَمَرَكَ` (amaraka, u erkakni b.) | `اَمَرَتْكَ` (amaratka, u ayol b.) | ↔ |
| `كَتَبَ` (kataba) | `كَتَبَتْ` (katabat) | — |

**Qoida**: Agar ro'yxatda `اَمَرَتْكَ` (ayol) ko'rinsa — unga juft erkak shakli
`اَمَرَكَ` bo'lishi dominant. `اَمْرَكَ` (3 heca) emas — juft buzilmaydi.

### Harakat shakllari — vizual xaritasi

Mayda xatolar oldini olish uchun, rasmda harakat qidirayotganda quyidagi
shakllarga diqqat bering:

```
ــَ  fatha   — harf USTIDA qiyaroq chiziq (tilted /)
ــِ  kasra   — harf OSTIDA qiyaroq chiziq (tilted \)
ــُ  damma   — harf USTIDA kichik "9" yoki "و" shakli
ــْ  sukun   — harf USTIDA kichik doira/halqa (°)
ــّ  tashdid — harf USTIDA kichik "w" shakli
ــً ــٍ ــٌ  tanvin — ikki fatha/kasra/damma (qo'sh chiziq)
```

**Damma vs sukun** — eng ko'p aralashtiriladi: damma "9" shaklida ko'rinadi
(oyoqli), sukun ideal doira. Rasm past sifatli bo'lsa, **ikkisini ham kuzating**
va audio bilan tasdiqlang.

### Har arab so'z uchun MAJBURIY qadam

1. **Harf-harf parse qilish** — so'zni "tanimang":
   - Har harfni alohida aniqla: bu alif/mim/ra/ta/...?
   - Har harakat shaklini aniqla: yuqorida chiziq (fatha)? curly (damma)?
     pastida chiziq (kasra)? kichik doira (sukun)?
2. **Qo'sh-ishonch texti** — strukturani yozing:
   `alif+fatha → mim+fatha → ra+sukun → ta+kasra` → `اَمَرْتِ` → "amarti"
3. **Harf sonini sanash** — rasm 4 harf ko'rsatyaptimi 3 mi? Ikki bir xil harf
   ketma-ket (`ر ر`, `م م`) borligini aniqlash
4. **Tanish so'z shkali** — agar so'z tanish tuyulsa → qora ro'yxatda bo'lsa
   **darhol ogohlantir** va qo'shimcha tekshiruv qil
5. **Juft fe'lni izlash** — agar past fe'l (3-f `اَمَرَتْ`) yonida — juft
   3-erkak shakli bo'lishini ko'z oldiga tuting
6. **Audio chunkni eshitish MAJBURIY** — har so'z yozilganidan so'ng:
   ```bash
   afplay muallimus-soniy/public/audio/edit/NN_topic/<chunk>.mp3
   ```
   Yozgan transliteratsiya audioga to'liq mos kelishi shart. Mos emasmi →
   qayta parse qil.
7. **Shubhada bo'lsa** — taxmin qilmay, foydalanuvchidan aniqlash so'rang

### Shubha signal'lari

- Harakat "xayolan to'g'ri" ko'rinadigan joylar
- PDF va rasm matnlari turlicha
- Rasm skan sifatsiz, harakat noaniq
- Qo'shimchalar (`-ayni`, `-um`, `-nā`, `-ti`, `-tu`) — eng ko'p xato joylar
- 2 ta bir xil harf ketma-ket (`ررْ`, `ممْ`, `نن`) — birini tushirish oson
- Oxirgi harfda sukun ko'ringan — **damma bo'lishi mumkin** (p6 da `رَيْبُ` xato)
- Mashhur so'z / Qur'on iborasi tanildi — avtomatik shubha

---

### Qadamlar

1. **PDF qo'llanmani o'qish** — boshlangich vaqt va matnlar uchun.
2. **Sukunat aniqlash** asl audioda:
   ```bash
   ./tools/ffmpeg -i <audio.mp3> -af "silencedetect=noise=-40dB:duration=0.10" -f null -
   ```
   Bu sound boundary'larni beradi.
3. **Energy profile tekshirish** (qisqa harflar uchun) — 25-50 ms oynalarda
   `volumedetect` bilan vowel peak'lar qaerda ekanini topish.
4. **Cut skript yozish** (`tools/cut_<topic>.sh`):
   - PDF asoslangan harflar uchun: PDF vaqtidan **-50 ms / +100 ms** buffer
     (vowel attack + fricative tail uchun).
   - Maxsus harflar uchun (PDF xato): silence-detected boundary'lar.
   - Re-encode `libmp3lame -b:a 192k` (sample-accurate).
5. **Skript ishga tushirish** — chunklar `Materiallar/<bob>/edit_audios/<NN_topic>/` ga.
6. **`public/audio/edit/<NN_topic>/` ga ko'chirish** — app shu joydan oladi.
7. **`elements.ts` da har elementga chunk URL biriktirish** —
   `audioUrl: A.e("eXX_name")`, `start: 0`, `end: chunk_duration`.
8. **MAJBURIY: foydalanuvchi bilan eshitib tekshirish** — har element bosib
   to'g'ri talaffuz chiqayotganini tasdiqlash. `afplay <chunk.mp3>` skript
   ichida ham qo'shilishi mumkin.
9. **`Materiallar/<bob>/<topic>.md` yozish** — yakuniy tasdiqlangan vaqtlar
   jadvali (PDF emas, **haqiqiy** vaqtlar). Metodologiya bo'limi ham yozing —
   keyingi safar qaytarish uchun.

### Chunk fayli vs. timing

Joriy arxitektura: **chunked files**. Har element o'z mp3 fayli bilan,
`start: 0`, `end: file_duration`. Bu:
- Backup-friendly (har chunk alohida tekshiriladi)
- Network o'rniga local audio playback yoqimliroq
- Asl audio `public/audio/<NN>.mp3` da saqlanadi (audio control bar uchun
  va backup sifatida).

### Asl audio = saqlanadi

**Asl `public/audio/NN.mp3` fayli HECH QACHON o'chirilmaydi.** Bu:
- Backup — chunk xato bo'lsa qayta cut qilish manbai
- "Play full" tugmasi shuni ishlatadi (audio control bar)
- Master nusxa Materiallar/<bob>/audiosi/ da ham saqlanadi

## Element turlari

- `harf` — alohida harf
- `bogin` — bo'g'in
- `soz` — so'z
- `jumla` — jumla / oyat

## Pozitsion shakllar — ⚠️ MAJBURIY, xato takror bo'lgan joy

Arab harflarining ikki toifasi bor:
- **Connector harflar**: `ب ت ث ج ح خ س ش ص ض ط ظ ع غ ف ق ك ل م ن ه ي` — so'z
  boshi/o'rtasi/oxirida shakli **o'zgaradi**. Harf amaliyoti sahifalarida
  3 ta harakat qatori **majburiy** pozitsion shakllar bilan:
  - Fatha — `X` (boshida) → `مَ`, `تَ`, `نَ`, `يَ`, `بَ`, ...
  - Kasra — `ـXِـ` (o'rtasida) → `ـمِـ`, `ـتِـ`, `ـنِـ`, `ـيِـ`, `ـبِـ`, ...
  - Damma — `ـXُ` (oxirida) → `ـمُ`, `ـتُ`, `ـنُ`, `ـيُ`, `ـبُ`, ...
- **Non-connector harflar**: `ا د ذ ر ز و` — faqat o'ng tomondan bog'lanadi,
  shakli o'zgarmaydi. Alohida shakllar ishlatiladi.

### ⚠️ Xato pattern (p5 da qayta takrorlandi)

Sessiyalarda men (Claude) p4 da mim/ta uchun pozitsion shakl yozdim (to'g'ri),
lekin **p5 da nun/ya uchun isolated shakl yozdim** (xato — foydalanuvchi aytgan).
Bu — bir xil qoida, lekin har yangi harfga qayta qo'llanilmagan.

**Qoida**: Har YANGI harf amaliyoti sahifasi qurilganda, `connector` bo'lsa
— pozitsion shakllar AVTOMATIK ravishda ishlatiladi, tekshirishni ertasiga
qoldirmang.

### Qachon ko'rsatiladi

- **Alifbo harakatlar bo'limi** (sahifa 3, `رَ رِ رُ` section): **harakatlar**
  o'rgatiladi, pozitsion shakllar aralashtirilmaydi. Kitob tartibiga mos.
- **Harf amaliyoti sahifalari** (sahifa 4+): connector harflar **har doim**
  `alohida / ـo'rtasidaـ / ـoxirida` — isolated shakllar aralashtirilmaydi.
  Uzbek label'da: `"Ma (boshida)"`, `"Mi (oʻrtasida)"`, `"Mu (oxirida)"`.
- **Non-connector harflar** (Za, Ra, Dal, Zal, Vav, Alif) — pozitsion shakllar
  alohida ko'rsatilmaydi (shakli o'zgarmagani uchun).

### Tekshirish qoidasi

Yangi harf sahifasini qurayotganda:
1. Kitob rasmidagi harakatlar qatoriga qarang.
2. Ikkinchi va uchinchi harf shakllarida **bog'lovchi chiziq** (ـ) bormi?
   - **Bor** → connector harf, pozitsion shakllar ishlatish kerak
   - **Yo'q** → non-connector, oddiy harakatlar

### Uslub

- `element.arabic` da pozitsion bog'lovchilar yoziladi: `ـمِـ`, `ـتُ` va h.k.
- `element.uzbek` label'ida pozitsiya ko'rsatiladi: `"Mi (oʻrtasida)"`, `"Tu (oxirida)"`.
- Pozitsion shaklni **faqat kitob ko'rsatgan joyda** ishlating — yangi o'rinda
  aralashtirmang.

---

# UI Arxitekturasi

> Bu bo'lim — foydalanuvchi tasdiqlagan UI qarorlari ro'yxati. Yangi sahifa yoki
> komponent qo'shganda, **shu yerdagi qoidalarga amal qilinadi**. O'zgarish
> kiritish kerak bo'lsa — avval bu yerda yozilgan qarorni yangilang.

## Adaptiv masshtab tizimi (2026-06-10)

Butun ilova **root font-size orqali avtomatik masshtablanadi** (`globals.css`):

```
font-size = 16px × --font-scale (sozlamadagi small/medium/large: 0.875/1/1.125)
                 × --screen-scale (ekran kengligi: 768px→1.0625, 1024px→1.125,
                   1440px→1.25, 1920px→1.375; har biri min-height sharti bilan)
```

Qoidalar:
- **Hamma o'lcham rem'da yoziladi** — `text-[22px]` kabi qattiq px TAQIQLANGAN
  (rem'ga aylantirilgan: 22px → `text-[1.375rem]`). Qattiq px root masshtabga
  ergashmaydi va katta ekranda mayda qoladi.
- Lesson kontenti `max-w-xl mx-auto` o'qish ustunida (rem'da bo'lgani uchun
  desktop'da ~720-790px gacha kengayadi). PageIndicator va AudioControls ham
  shu ustun kengligida. Header ichki qismi `max-w-3xl mx-auto`.
- Sahifa kartasi ichidagi matnlar avvalgidek `cqi` clamp bilan — karta kengaysa
  harflar ham o'sadi; clamp max'lari rem'da, shuning uchun katta ekranda
  chegaralar ham ko'tariladi.
- `@custom-variant short` = `(orientation: landscape) and (max-height: 480px)`
  — telefon yonbosh rejimi. Lesson chrome shu variant bilan mini ko'rinishga
  o'tadi (pastda).
- Viewport zoom OCHIQ (`maximumScale: 5, userScalable: true` — WCAG 1.4.4);
  double-tap zoom `body { touch-action: manipulation }` bilan o'chirilgan.
- `manifest.json` `orientation: "any"` — PWA landshaftni bloklamaydi.

## Bosh sahifa (`/home`)

Maqsad: **bitta yirik kitobga** kirish nuqtasi. Boblar grid'i yo'q (mundarija
`/darslar` va lesson sahifasidagi TOC drawer'da bor).

Tarkibi:
- **Salomlashish** (`GreetingHeader`) — vaqtga qarab ("Xayrli tong/kun/kech") va
  app sub-title.
- **Yagona kitob hero kartasi** (`BookHeroCard`) — markazda, kitobdek hissiyot
  beradigan element:
  - Logo / muqova rasmi (hozircha `/logo.png` — Muslim.uz)
  - "Muallimi Soniy" — sarlavha (extrabold, 22px)
  - "Ahmad Hodiy Maqsudiy" — muallif (sub, muted)
  - **Progress bar** + "Sahifa X / Y" — kitob bo'ylab umumiy joylashuv
  - **Katta gradient tugma**: `Boshlash` (progress yo'q) yoki `Davom eting`
    (progress mavjud) + Play ikonkasi
  - Kartani bosish — to'g'ridan-to'g'ri mos darsga olib boradi.

## Lesson sahifasi (`/lesson/[chapterId]/[lessonId]`)

**Asosiy g'oya:** URL parametri — bu shunchaki **kirish nuqtasi**. Foydalanuvchi
uchun bu **bitta yirik kitob** (54 sahifa) — barcha boblarning barcha darslari
ketma-ket sahifalardek ko'rinadi. Lesson chegaralari ko'rinmaydi —
foydalanuvchi swipe / scroll qilib davom etishi mumkin.

### Sahifa tuzilishi (kitobdagiga mos)

| Global # | Mazmun | Renderer | Image | Audio |
|----------|--------|----------|-------|-------|
| 1  | Muqova (interaktiv: 3 sarlavha) | Page0 | - | `01. muqova.mp3` + chunks `01_muqova/` |
| 2  | Muqaddima (read-along, p1+p2 birlashgan) | Page1 | - | `02. Muqaddima.mp3` |
| 3  | Alifbo + harakatlar + Ra | Page3 | 3.jpg | `03. alifbo.mp3`, `04. harakat.mp3`, `05. ro.mp3` |
| 4  | Takrorlash: Za / Mim / Ta | Page4 | 4.jpg | `06. za.mp3`, `07. ma.mp3`, `08. ta.mp3` |
| 5  | Harflar (1-qism) — Ro davom so'zlari, Nun, Ya | Page5 | 5.jpg | `08. ta.mp3` (20.4s+ Ro davom), `09. na.mp3` (Nun), `10. ya.mp3` (Ya) |
| 6+ | Qo'shimcha harflar va so'zlar | Page6+ | 6-16.jpg | `09`–`31` audio fayllari |
| 17-21 | Madlar | — | 17-21.jpg | `32. madli 01.mp3`, `33. madli davomi...` |
| 22-23 | Tashdid | — | 22-23.jpg | `34. tashdid.mp3` |
| 24-25 | Tanvin | — | 24-25.jpg | `35. tanvin.mp3`, `36. tanvinli tashdid.mp3` |
| 34 | Iymon kalimalari (5 ta kalima) | Page34 | kalimalarning asl nusxalari/34.jpg | `49-52. kalimalar 01-04.mp3` |
| ... | Qolgan boblar | ... | ... | ... |
| 54 | Duolar (oxirgi) | Page50 | 50.jpg | ? |

**Muhim eslatmalar**:
- **Muqova (Sahifa 1) tugallangan**: 3 ta interaktiv sarlavha tugmasi —
  `معلم ثانى` (m01, 1.64s), `ياكى` (m02, 0.69s), `الفباء عربى` (m03, 1.44s).
  Chunks: `public/audio/edit/01_muqova/`. Muallif ismi (`أحمد هادي مقصودي`)
  va o'quvchi ismi (Jahongir qori Nematov) audio'da yo'q — static qoldirildi.
  Butun audio AudioControls orqali ijro etiladi.
- **Muqaddima (Sahifa 2)** — read-along rejimida: tepada Bismillah
  (`p1_000`, `A.muq` 0-5s) tugmasi + "MUQADDIMA" sarlavha + **9 ta
  bosiladigan paragraf** (`p1_par1`..`p1_par9`, `ProseBtn` komponenti).
  Paragraf bosilsa audioning o'sha qismi ijro etiladi; to'liq 7:32 audio
  AudioControls orqali ham ishlaydi. Paragraf matnlari
  `src/lib/data/muqaddima.ts` dagi `MUQADDIMA_PARAGRAPHS` da (yagona
  manba — ham web, ham kontent eksporti shundan oladi); `elements.ts` da
  faqat VAQTLAR turadi, matn takrorlanmaydi.

  **Vaqtlar qanday olingan** (2026-08-22): yozuv ostida fon musiqasi bor,
  shu sababli `silencedetect` (-25dB gacha sinaldi) bitta ham jimlik
  topmaydi — chegaralarni jimlik bo'yicha kesib bo'lmaydi. Yechim —
  forced alignment:
  1. `py tools/transcribe_muqaddima.py small` → Whisper so'z vaqtlari
     (`tools/_tmp/muqaddima_words.json`, 743 so'z).
  2. `py tools/align_muqaddima.py` → kitob matni (659 so'z) Whisper
     so'zlariga Needleman-Wunsch bilan tekislanadi; mos kelmagan
     so'zlar interpolatsiya bilan baholanadi; har chegara paragrafning
     BIRINCHI so'zi boshiga yopishtiriladi.
  3. `py tools/verify_muqaddima.py` → har paragraf boshida audioda nima
     eshitilishini kitob matni bilan solishtiradi.

  ⚠️ Whisper o'zbekchani **fonetik** yozadi ("ushbu"→"uxbu",
  "O'sha"→"Ose", "Garchi"→"Gerche"). Shuning uchun solishtirishda aynan
  moslik EMAS, o'xshashlik darajasi ishlatiladi. Aynan moslik talab
  qilinsa, to'g'ri chegara ham "xato" ko'rinadi.

  ⚠️ **2026-04-22 gacha bu yerda 659 ta so'z elementi bo'lgan va ular
  SOXTA vaqtlar bilan edi** (379 so'z aynan 0.69s, 263 tasi 0.68s, 17
  tasi 0.00s — `umumiy_vaqt ÷ so'z_soni`; birinchi so'z ikkinchisidan
  keyin turgan). Commit `82ec447` da to'g'ri o'chirilgan. So'z darajasiga
  (karaoke) qaytmoqchi bo'lsangiz — vaqtlarni ALBATTA audiodan
  o'lchang, hisoblab yozmang.
- Muqaddima kitobda 2 sahifa bo'lgan, lekin uzluksiz matn — birlashtirilgan.
- Sahifa 4 kitob sahifa 4 bilan aynan mos. Za (non-connector) / Mim (connector,
  pozitsion) / Ta (connector, pozitsion).
- Audio fayllari `public/audio/NN. <topic>.mp3` formatda, chunklar
  `public/audio/edit/NN_topic/` papkada.
- **Sahifa 5 tugallangan**: Ro davom (9 so'z, t09-t17 chunks), Nun
  (20 element, 09_na/), Ya (18 element, 10_ya/). Muhim topilma —
  Ro davom so'zlari `08. ta.mp3` ning 20.4s+ qismida edi, alohida audio
  fayli yo'q.
- **Sahifa 6 tugallangan**: Ba (18 element, 11_ba/: 3 header + 15 so'z),
  Kaf (21 element, 12_ka/: 3 header + 18 so'z). Jami 39 element.
  Header'lar pozitsion shakllarda: `بَ / ـبِـ / ـبُ` va `كَ / ـكِـ / ـكُ`.
- **Sahifa 7 tugallangan**: Lam (26 element, 13_la/: 3 header + 23 so'z),
  Vav (23 element, 14_va/: 3 header + 20 so'z). Jami 49 element.
  Lam (connector) header'lari pozitsion: `لَ / ـلِـ / ـلُ`.
  Vav (non-connector) header'lari isolated: `وَ / وِ / وُ`.
  Row 3 Lam'da 6 akala fe'li shakli: akalta / akalna / akalat / akalti / akaltu / akaltum.
- **Sahifa 8 tugallangan**: Ha ه (21 element, 15_ha/: 3 header + 7+6+5 so'z),
  Fa ف (25 element, 16_fa/: 3 header + 6+6+6+4 so'z). Jami 46 element.
  Ikkalasi connector — header'lar pozitsion: `هَ / ـهِـ / ـهُ`, `فَ / ـفِـ / ـفُ`.
  Row 4 Fa'da past/present juft fe'llar: iftatana/yaftatinu, iftakara/yaftakiru.
- **Sahifa 9 tugallangan**: Qof ق (26 element, 17_qo/: 3 header + 6+7+4+6 so'z),
  Shin ش (24 element, 18_sha/: 3 header + 6+6+5+4 so'z). Jami 50 element.
  Ikkalasi connector — header'lar pozitsion: `قَ / ـقِـ / ـقُ`, `شَ / ـشِـ / ـشُ`.
  Qof Row 2 (`قَلْبُ..قُمْقُمْ`) 7 element — `size="sm"` bilan sig'adi.
  Qof Row 4 juftliklar: kamar/qamar, falak/falaq, farku/farqu (k↔q farqi).
  Shin Row 2 da PDF ko'plik fe'l yozgan — rasm/audio singular ism shakllari (ustun).
- **Sahifa 10 tugallangan**: Sin س (23 element, 19_sa/: 3 header + 5+6+5+4 so'z),
  Tsa ث (30 element, 20_tsa/: 3 header + 6+6+5+4 so'z + 6 taqqoslash). Jami 53 element.
  Ikkalasi connector — header'lar pozitsion: `سَ / ـسِـ / ـسُ`, `ثَ / ـثِـ / ـثُ`.
  Tsa Row 5 — sin/tsa taqqoslash: 1-juftlik SUKUN bilan (سَمَرْ-ثَمَرْ),
  2- va 3-juftlik damma bilan (سَبْتُ-ثَبْتُ، سَلْسُ-ثَلْثُ). 2026-08-24 gacha
  uchalasi ham damma deb yozilgan edi — kitobga zid.
- **Sahifa 11 tugallangan**: Sod ص (20 element, 21_so/: 3 header + 7+4+6 so'z),
  Tho ط (29 element, 22_to/: 3 header + 6+6+4+4+6 so'z). Jami 49 element.
  Ikkalasi connector — header'lar pozitsion: `صَ / ـصِـ / ـصُ`, `طَ / ـطِـ / ـطُ`.
  Sod Row 4 — sin/sod taqqoslash juftliklari: سَفَرْ-صَفَرْ، سَيْفْ-صَيْفْ، اِنْتَسَبَ-اِنْتَصَبَ.
  Tho Row 9 — ta/tho taqqoslash juftliklari: تَرَفْ-طَرَفْ، سَبْتُ-سَبْطُ، مُسْتَتِرْ-مُسْتَطِرْ.
  Sod Row 2 (7 so'z) `size="sm"` bilan sig'adi.
- **Sahifa 14 tugallangan**: Ayn ع (27 element, 27_ayn/: 3 header + 7+6+5+6 so'z),
  Dal د (23 element, 28_dal/: 3 header + 6+6+4+4 so'z). Jami 50 element.
  Ayn (connector) header'lar pozitsion: `عَ / ـعِـ / ـعُ`.
  Dal (non-connector) header'lar isolated: `دَ / دِ / دُ`.
  Ayn Row 4 — ğayn/ayn taqqoslash juftliklari (damma bilan):
  غَیْنُ-عَیْنُ، بَغْلُ-بَعْلُ، بَلْغُ-بَلْعُ.
  Dal Row 4 — past/present fe'l juftliklari: اِعْتَدَلَ-يَعْتَدِلُ، اِسْتَرْشَدَ-يَسْتَرْشِدُ.
  Ayn Row 1 (7 so'z) `size="sm"` bilan sig'adi.
- **Sahifa 16 tugallangan**: Zo ظ (49 element, 31_zho/: 3 header + 6+6+6+6+6+4 asosiy +
  6+6 taqqoslash so'z). Connector — header'lar pozitsion: `ظَ / ـظِـ / ـظُ`.
  Audio: `31. zo.mp3` (2:15). Row 4-5-6 (4-letter words) `size="sm"` bilan sig'adi.
  Taqqoslash qatorlari: ذ/ظ, ح-ظ/ح-ض, ظ/ض (L1) va ز/ظ (L2).
  PDF→audio mapping tuzatildi: `dod` → 29, `zol` → 30, `zho` → 31 (audio nomlari
  chalg'itadi — "29. zo.mp3" aslida Dod; PDF nomiga ishoning).
- **Sahifa 15 tugallangan**: Dod ض (25 element, 29_dod/: 3 header + 6+6+4+6 taqqoslash),
  Zal ذ (29 element, 30_zal/: 3 header + 8+6+6+6 taqqoslash). Jami 54 element.
  Dod (connector) — pozitsion header: `ضَ / ـضِـ / ـضُ`.
  Zal (non-connector) — isolated header: `ذَ / ذِ / ذُ`.
  Dod Row 3 (ض-ر-ب konjugatsiya): مَضْرِبْ مُضْرِبْ اِضْرِبْ تَضْرِبُ اَضْرِبُ نَضْرِبُ.
  Dod Row 5 — dal/dod taqqoslash (damma): دَرْسُ-ضَرْسُ، وَدْعُ-وَضْعُ، بَعْدُ-بَعْضُ.
  Zal Row 5 — zal/zain taqqoslash (damma): ذِفْرُ-زِفْرُ، بَذْلُ-بَزْلُ، اَبْذَلُ-اَبْزَلُ.
  Dod Row 3 (6 so'z) 1 so'z wrap bo'ladi `size="sm"` da; qolganlari sig'adi.
- **Sahifa 12 tugallangan**: Jim ج (18 element, 23_ja/: 3 header + 5+6+4 so'z),
  Xo خ (23 element, 24_xo/: 3 header + 6+6+4+4 so'z). Jami 41 element.
  Ikkalasi connector — header'lar pozitsion: `جَ / ـجِـ / ـجُ`, `خَ / ـخِـ / ـخُ`.
- **Sahifa 13 tugallangan**: Ha ح (28 element, 25_ha/: 3 header + 6+5+4+4+6 taqqoslash),
  G'ayn غ (18 element, 26_gho/: 3 header + 6+5+4 so'z). Jami 46 element.
  Ikkalasi connector — header'lar pozitsion: `حَ / ـحِـ / ـحُ`, `غَ / ـغِـ / ـغُ`.
  Ha Row 5 — kha/ha taqqoslash juftliklari: خَلْقُ-حَلْقُ، خَتْمُ-حَتْمُ، اَرْخَمْ-اَرْحَمْ
  (birinchi 2 juftlik damma, oxirgi sukun — اَفْعَل sifat shakl).
  Ha Row 4 — `اِحْرَنْجَمَ / يَحْرَنْجِمُ` (form X اِفْعَنْلَلَ — نج cluster, PDF transliteratsiyada `احرجم` deb noto'g'ri).
- **Sahifa 17 tugallangan**: Madli harflar to'liq jadval (84 element, 32_madli_01/:
  28 harf × 3 mad shakl = fatha+alif / kasra+ya / damma+waw).
  Layout: 3 tashqi ustun × 10 qator (o'ng/o'rta/chap), header qatori `ا ي و`
  (statik, click yo'q). Row 10 faqat ي da (3 syllable), middle/left empty.
  Ustun tartibi kitobga mos: o'ng (alif, tsa, kha, ra, sha, tho, gha, ka, na, ya),
  o'rta (ba, ja, da, za, sa, zho, fa, la, wa), chap (ta, hha, dza, sa, dho, ayn,
  qa, ma, ha). Row 9 da و ه oldin emas keyin (non-standart, kitob ko'rinishiga mos).
  Audio: `32. madli 01.mp3` (4:31).
- **Sahifa 18 tugallangan**: 17-sahifaning takrorlash (mashq) sahifasi
  (82 element: 81 syllable + 1 outro). Layout: 3 tashqi ustun × 9 qator
  (cell ichida 3 syllable), header qatori yo'q. Cell ichida tartib
  (RTL) — uu / ii / aa, harflar random aralash (kitobga mos): masalan
  Row 1 o'ng cell `بُو يٖى بٰا`, o'rta `يُو بٖى يٰا`, chap `تُو هٖى تٰا`.
  Audio chunklar 17-sahifa bilan SHARED (`32_madli_01/m01..m84.mp3`) —
  yangi syllable audio yo'q. Element 80 = alif_ii (`إٖى` → m02), faqat
  alif syllable; dho_ii va alif_aa/uu kitobga ko'ra qo'shilmagan.
  **Outro element**: pastdagi chig'atoy turkiy tavsiya ("Ushbu darsda
  yozilgan harflarning har qaysisini xatosiz mad qilmaguncha keyingi
  darslarni ko'rsatma talabaga") clickable button — chunk
  `32_madli_01/p18_outro.mp3` (`32. madli 01.mp3` ning 262.9-271.7s
  qismidan kesilgan, 8.81s).
- **Sahifa 19 tugallangan**: Madli so'zlar — 71 element (`33_madli_02/m19rR_wW_*.mp3`),
  `33. madli 02.mp3` ning 0:00.74-2:58.66 qismidan kesilgan.
  Layout: 12 qator (yuqori bo'lim — 9 qator divider'gacha; pastki bo'lim — 3 qator).
  Yuqori (R1-R9): R1 `مٰالْ حٰالْ نٰارْ جٰاهْ شٰامْ سٰامْ` (6, fatha+alif mad);
  R2 `بٰارٖى عٰالٖى رٰاضٖى قٰاضٖى هٰادٖى حٰالٖى` (6, fatha+alif + kasra+ya);
  R3 `كَلٰامْ سَلٰامْ حَلٰالْ حَرٰامْ جَلٰالْ جَمٰالْ كَمٰالْ` (7);
  R4 `اِمٰامْ حِسٰابْ نِظٰامْ غُرٰابْ غُلٰامْ غُبٰارْ تُرٰابْ` (7);
  R5 `اَمْوٰالْ ... اَمْرٰاضْ` (6, ko'plik shakllar); R6 `قَوٰاعِدْ ... مَكٰاتِبْ` (6);
  R7 `اِكْرٰامْ ... اِفْسٰادْ` (6, IV bob masdari); R8 `عٰالِمْ ... صٰالِحْ` (6, اسم فاعل);
  R9 `قٰامَ طٰافَ تٰابَ قُولٖى طُوفٖى تُوبٖى` (6, 3 past + 3 fem imperative).
  Pastki (R10-R12): R10 `يُقٰالُ يُطٰافُ تُتٰابُ يَقُولُ تَقُومُ يَطُوفُ` (6, passive/active imperfect);
  R11 `يَتُوبٰانِ يَقُولُونَ تَقُومُونَ يَطُوفُونَ تَقُولُونَ` (5, dual+plural);
  R12 `يَنْصُرُونَ تَدْخُلُونَ يَعْلَمُونَ تَعْمَلُونَ` (4).
  Sizes: R1-R2 `md`, R3-R7 `sm`, R8-R10 `md`, R11-R12 `sm`. **MadRule banner yo'q**
  (faqat 17-sahifada ko'rsatiladi — takror ko'rsatish bekor). Mad-style harakat:
  `ٰا` (U+0670+alif), `ٖى` (U+0656+ya), `ُو` (damma+waw).
- **Sahifa 20 tugallangan**: Mad davomi — 48 element (`33_madli_02/p20_NN_*.mp3`).
  Layout: 3 ta block:
  - **Top** (Row 1-4, 15 ta uzun fe'l shakl, mad-end + waw bilan): Row 1
    `يَشْهَدُونَ يَرْجِعُونَ تَضْرِبُونَ تَجْلِسُونَ`, Row 2 `يُكْرِمُونَ تُسْلِمُونَ تُخْلِصُونَ تُكْرِمُونَ`,
    Row 3 `يَنْصُرُونَ تَضْرِبُونَ يَجْتَمِعُونَ تَكْتَسِبُونَ`, Row 4 (3 ta) `يَحْتَسِبُونَ تَسْتَشْهِدُونَ يَسْتَخْرِجُونَ`.
  - **Mid** (Row 5-8, 18 ta): Row 5 (6 ta dual+fem past fe'l) `اُشْكُرَا اُنْصُرَا اِعْلَمَا اُشْكُرِى اُنْصُرِى اِعْلَمِى`
    — `size="sm"` bilan sig'adi; Row 6 dual ism `مُكْرِمَانِ مُسْلِمَانِ مُخْلِصَانِ مُنْفِقَانِ`;
    Row 7 erkak ko'plik `مُكْرِمُونَ مُسْلِمُونَ مُخْلِصُونَ مُنْفِقُونَ`;
    Row 8 ayol ko'plik + passiv `مُسْلِمَاتْ مُخْلِصَاتْ مَنْصُورُونَ مَطْلُوبُونَ`.
  - **Bottom** (Row 9-11, 15 ta ya-mad so'z) — `<YaNuqtasizRule>` banner
    bilan ajratilgan ("ي ، يـ = ى" — nuqtasiz `ى` = oddiy `ي`):
    Row 9 `مِيلْ نِيلْ فِيلْ حِينْ سِينْ شِينْ`, Row 10 `كَرِيمْ عَلِيمْ سَمِيعْ عَزِيزْ حَكِيمْ`,
    Row 11 `مِسْكِينْ مِعْطِيرْ عِفْرِيتْ اِدْرِيسْ`.
  Audio: `33. madli 02.mp3` (6:05) ning 03:04-05:25 qismi. PDF da
  Row 11 `معطیل` (xato), audio'da `مِعْطِيرْ` (mi'tiyr — kasra bilan,
  damma emas; foydalanuvchi 2026-04-26 da rasmga ishora qilib tasdiqladi).
  PDF da Row 5 dual fe'llar singular (`اشكر انصر اعلم`) sifatida
  transkripsiyalangan (yana xato), audio aslida dual `اُشْكُرَا اُنْصُرَا اِعْلَمَا`.
  `Row` komponentiga `mad?: boolean` prop qo'shilgan — `mad-arabic-text`
  classni qo'llaydi.
- **Sahifa 21 tugallangan**: Mad davomi + Tashdid boshlanishi (61 element).
  Yuqori qism — mad davomi (15 so'z, 3 qator: 4+6+5) `33. madli 02.mp3`
  ning 5:28-6:04 qismidan, chunklar `33_madli_02/m21r1..r3_*.mp3`:
  Row 1 (lg) `تَعْلِيمْ تَدْرِيسْ تَبْرِيكْ تَحْسِينْ`,
  Row 2 (sm) `بِيعَة مِيلَة عِيشَة يَبِيعُ يَمِيلُ تَعِيشُ`,
  Row 3 (sm) `تَبِيعِينَ تَوَارِيخْ تَرَاوِيحْ مُكْرَمِينَ مُسْلِمِينَ`.
  Pastki qism — Tashdid (`34. tashdid.mp3` 0-1:46 dan, chunklar
  `34_tashdid/...`): clickable intro sarlavha (`تشدیدلی حرفلر` +
  "ikkilantirib o'qiladi" tushuntirish, `t_intro.mp3` 9.45s); statik
  `ـَّ ـِّ ـُّ` vizual; 3 ربب misol (`رَبَّ رَبِّ رَبُّ`, uncontracted
  shakl `(= رَبْبَ)` uzbek label'da); 6 mashq qatori × 7 so'z = 42
  element. Mashq pattern'lari: R1 fatha+fatha (`اِنَّ اَنَّ اَمَّ بَرَّ
  جَرَّ حَجَّ شَكَّ`), R2 fatha+damma (`بَرُّ جَرُّ حَجُّ شَكُّ ذَمُّ
  حَقُّ شَرُّ`), R3 kasra+damma (`بِرُّ سِرُّ سِتُّ عِزُّ طِلُّ حِلُّ
  حِسُّ`), R4 damma+damma (`بُرُّ دُرُّ خُفُّ كُلُّ دُبُّ زُقُّ اُمُّ`),
  R5 damma+fatha (`بُرَّ ذُمَّ سُبَّ فُكَّ سُرَّ سُمَّ ثُمَّ`), R6
  damma+kasra (`بُرِّ دُرِّ خُفِّ كُلِّ دُبِّ زُقِّ ضُرِّ`).
  Audio helperlar: `A.md2(name)` (33_madli_02/), `A.td(name)` (34_tashdid/).
  Element ID'lar: `m01-m15` (mad), `t_intro`, `t_rab1-3`, `t11-t67`
  (qator-so'z indekslari). Layout: mashq qatorlari `size="sm"`
  `gap-1.5` (7 so'z 1 qatorga sig'adi). PDF/rasm farqi: PDF Row 6 ning
  3-so'zini `خُرِّ` deydi, rasm `خُفِّ` ko'rsatadi (rasmga ergashildi);
  Row 6 oxirgi so'z PDF `دُرِّ`, rasm `ضُرِّ` (rasmga ergashildi).
- **Sahifa 23 tugallangan**: Tashdid davomi (40 so'z) + Tanvin boshlanishi
  (47 element jami). Tashdid manba: `34. tashdid.mp3` ning 4:06-5:53 qismi,
  chunklar `34_tashdid/p23_r1..r8_w*.mp3`. Tanvin manba: `35. tanvin.mp3`
  ning 0:02-0:16 qismi, chunklar `35_tanvin/p23_*.mp3`.
  Tashdid 8 qator (3 yuqori + 5 pastki, divider bilan):
  R1 (sm, 6) `تَوَطُّرْ تَنَعُّمْ تَوَغُّلْ تَنَفُّسْ تَرَقُّبْ تَفَكُّرْ`,
  R2 (sm, 5) `تَعَلُّمْ تَكَمُّلْ تَفَنُّنْ تَصَوُّرْ تَغَيُّرْ` (V bob masdari تَفَعُّلْ),
  R3 (sm, 5) `مُتَكَبِّرْ مُتَكَثِّرْ مُتَحَجِّرْ مُتَوَحِّدْ مُتَسَخِّنْ`,
  R4 (sm, 5) `مُتَبَدِّلْ مُتَهَذِّبْ مُتَحَرِّزْ مُتَعَزِّزْ مُتَيَسِّرْ`,
  R5 (sm, 5) `مُتَوَطِّنْ مُتَنَعِّمْ مُتَوَغِّلْ مُتَنَفِّسْ مُتَفَكِّرْ`,
  R6 (sm, 5) `مُتَعَلِّمْ مُتَكَمِّلْ مُتَفَنِّنْ مُتَصَوِّرْ مُتَغَيِّرْ` (V bob ism fail مُتَفَعِّلْ),
  R7 (sm, 5) `اِسْوَدَّ اِصْفَرَّ اِحْمَرَّ اِغْتَرَّ اِهْتَزَّ` (IX bob — ranglar/holatlar),
  R8 (sm, 4) `اِسْتَرَدَّ اِسْتَحَبَّ اِسْتَحَلَّ اِسْتَدَلَّ` (X bob idgham bilan).
  Tanvin section — yangi `<TanvinRule>` komponenti: clickable title
  (`تنوينلي حرفلر`, `tn_intro` element, 9.10s narration — to'liq jumlani
  qamraydi: "...bir sukunli nun ortirib oʻqiladi"); chig'atoy izoh
  (statik); 3 ustun (RTL) — har ustunda belgi (`tn_fath/kasr/damm`,
  `*_demo.mp3` 0.6-0.7s), uzbek label, va misol juftligi
  (`tn_an/in/un` → `اَ = اَنْ` format). Audio helper: `A.tn(name)`
  (35_tanvin/) — yangi qo'shildi.
  Layout: parent `gap-0.5`, custom `<Sep>` (`my-1` divider) — 47 element
  bitta viewportga sig'adi (677px → ~620px). Tashdid R3 birinchi so'z:
  PDF `مُتَكَبِّرْ` deydi, rasm `مُتَدَبِّرْ` ko'rinadi — audio'ga ishonib
  `مُتَكَبِّرْ` qoldirildi (foydalanuvchi qayta ko'rib bersa o'zgarishi
  mumkin).
- **Sahifa 24 tugallangan**: Tanvin alifbo mashqi (84 syllable: 28 harf
  × 3 shakl) + 30 ta misol so'z = 114 element. Manba: `35. tanvin.mp3`
  (3:10) ning 20.4-189.7s qismi, chunklar `35_tanvin/p24_*.mp3`.
  Yuqori bo'lim — 3 blok × 3 qator (9+10+9 = 28 harf):
  - Block 1 (R1-R3): fatha tanvin -an `اً بًا تًا...يًا`
    (alifdan keyin `بًا تًا...` shaklda, fathatan'dan keyin alif odat).
  - Block 2 (R4-R6): kasra tanvin -in `اٍ بٍ تٍ...يٍ` (alif yo'q).
  - Block 3 (R7-R9): damma tanvin -un `اٌ بٌ تٌ...يٌ` (alif yo'q).
  Pastki bo'lim — 5 qator × 6 so'z = 30 ta misol:
  - R10: fawt+thawb juftliklari (raf'/jarr/nasb).
  - R11-R14: aralash holat (turli `-un/-in/-an` so'zlari).
  Layout: 9 alfabet qatori + 5 so'z qatori = 14 qator. `gap-0.5`,
  `size="sm"`, `gap-1` (alifbo) va `gap-1.5` (so'zlar) bilan har qator
  bitta viewportga sig'adi. 3 ta `<Sep>` divider (blok orasi + so'zlar
  oldidan). Audio helper: A.tn() (35_tanvin/, 23-sahifadan ulushlanadi).
  ID format: `r{N}_{NN}` (yuqori bo'lim — qator + 0-asoslangan pozitsiya
  alifboda) va `wNN` (so'zlar). PDF `audio_qoidalar/` da tanvin uchun
  PDF yo'q — vaqtlar to'liq silencedetect (-30dB/0.20s) + audio
  tinglash bilan aniqlangan. Foydalanuvchi audio'larni eshitib
  tasdiqlashi kerak (xato bo'lsa vaqtlar tuzatilsin).
- **Sahifa 25 to'liq tugallangan**: Tanvinli tashdid (top, 37 element) +
  Alif va Hamza chapter intro (bottom, 17 element, audio bilan). Jami 54
  element. Manbalar:
  - Top: `36. tanvinli tashdid.mp3` (1:57) — chunklar
    `36_tanvinli_tashdid/p25_*.mp3`. Audio helper: `A.tt(name)`.
  - Bottom: `37. alif va hamza.mp3` ning 0-55s qismi — chunklar
    `37_alif_hamza/p25_ah_*.mp3`. Audio helper: `A.ah(name)`.
  **Top — Tanvinli tashdid** (7 qator + clickable title + statik signs header):
  - Title `تنوينلي تشديد` (clickable, `p25_title` 2.0s).
  - Sub-row: `ـٌّ ـٍّ ـًّ` (statik vizual, click yo'q — chiziq ostida).
  - R1 (3 ربب misol, RTL audio: rabbun/rabbin/rabban): har biri custom
    `RabbCell` komponenti — `رَبٌّ - (رَبُّنْ)` formatda, expansion vizual.
  - R2-R4 (har biri 6 so'z, `size="md"`, `gap-1.5`): tanvin fatha/kasra/damma
    qisqa so'zlar (`حَبًّا..مَنًّا`, `سِتٍّ..بِرٍّ`, `دُرٌّ..كُلٌّ`).
  - R5-R7 (har biri 5 so'z, `size="sm"`, `gap-1.5`): uzunroq mu- prefix
    so'zlar — colors (form II passive: `مُبَيَّضًا..مُخَضَّرٌ`), form VII/VIII
    (`مُهْتَزًّا..مُخْتَصٌّ`), form X (`مُسْتَرِدًّا..مُسْتَعِدٌّ`). Mixed tanvinlar.
  - Audio orderingi RTL — kitob ko'rinishida o'ng → chap.
  **Bottom — Alif va Hamza** (17 element, audio bilan to'liq):
  Custom `<AlifHamzaIntro>` komponenti: clickable title `الف و همزة`
  (`p25_ah_title` 2.30s) + statik chig'atoy izoh
  (`الف و همزة توقّز (٩) كورينيشده يازيلادى`) + 9 clickable forms RTL row
  (chap tomondan `١` raqami bilan markered) + 2 numbered practice rows
  (eski/yangi imlo, har bir so'z clickable). 9 forms (har biri o'z chunk):
  `ا أ ـا إ ؤ ئ ـئ ـئـ ء` (1.0-3.3s). Practice rows:
  - R1 (eski): `اَمَرَ اَخَذَ قَرَاَ يَقْرَاُ` (1.32-2.20s)
  - R2 (yangi): `اَمَرَ اَخَذَ قَرَأَ يَقْرَأُ` (1.00-2.15s)
  Audio chunklar `tools/cut_p25_alifhamza.sh` orqali kesilgan. Vaqtlar
  silencedetect (-30dB/0.15s) bilan aniqlangan, foydalanuvchi qayta
  eshitib tasdiqlasa o'zgarishi mumkin.
- **Sahifa 26 tugallangan**: Hamza misollari — 56 element (10 top row +
  divider + 2 bottom row). Audio: `37. alif va hamza.mp3` (3:36) ning
  59-216s qismi, chunklar `37_alif_hamza/p26_*.mp3` (46 chunk).
  Audio helper `A.ah` davom etadi (25-sahifa bilan ulushlanadi).
  **Top section** (12 visual qator):
  - R3 (eski, 4): `يَامُرُ يَاخُذُ مَامُورْ مَاخُوذْ` (hamzasiz).
  - R4 (yangi, 4): `يَأْمُرُ يَأْخُذُ مَأْمُورْ مَأْخُوذْ` (hamza bilan).
  - R5 (4): `قُرِئَ قَارِئَ مُبْتَدِئْ مُسْتَهْزِئْ` (hamza on ya at end).
  - R6 (5): `يُؤْمِنُ مُؤْمِنْ مُؤَذِّنْ مُؤَلِّفْ لُؤْلُؤْ` (hamza on waw).
  - R7 (5): `قَائِلْ قَائِمْ سَائِلْ مَائِلْ رَئِيسْ` (hamza on ya, middle after alif).
  - R8 (5): `بِئْسَ بِئْرُ سَئِلَ يَسْئَلْ مَسْئُولْ` (hamza on ya, middle sukun).
  - R9 (5): `شَاءَ سَاءَ جَاءَ يَشَاءُ مَسَاءُ` (hamza after long alif).
  - C1 (5, unnumbered): `شَىْءُ جَىْءُ يَجِىْءُ يُسِىْءُ مُسِىْءُ` (hamza ـَىْءُ).
  - C2 (6, unnumbered): `شَيْءُ فَيْءُ مِلْءُ بَرْءُ جُزْءُ قِرَاءَةْ` (hamza at end).
  - C3 (5, unnumbered): `سُوءُ يَسُوءُ وَضُوءُ قُرُوءُ مُرُوءَةْ` (hamza after long waw).
  **Bottom section** (divider'dan keyin, 2 qator):
  - Rb1 (4): `اَلْمَرْءُ اِمْرَأً اِمْرِئٍ اِمْرُؤٌ` — al-mar' declension.
  - Rb2 (4): `اَلْجُزْءُ جُزْأَهَا جُزْئِهَا جُزْؤُهَا` — al-juz' possessive forms.
  Komponent: `P26NumberedRow` (kichik raqam o'ngda + so'zlar markazda).
  Audio readings: R3-R9 + C1 (37 chunk) + Rb1/Rb2 (8 chunk) + C2/C3 shared
  sample chunk (1 chunk, 11 vizual elementga biriktirilgan — chunk
  186.30-188.80s vaqtdan, kitobda C2/C3 audio bilan yo'q, vizual misol).
  Cut script: `tools/cut_p26.sh`.
- **Sahifa 28 to'liq tugallangan**: Yaa Alifiyya + Vav Alifiyya + Yozilsada
  o'qilmaydigan harflar — 3 blok, 39 element (3 clickable block intro + 5
  statik chig'atoy subtitle + 36 so'z). Audio'lar:
  - **Block 1 (Yaa Alifiyya, 20 so'z)** + **Block 2 (Vav Alifiyya, 6 so'z)**:
    `39. yoz-o'qiladigan.mp3` (3:07). Chunklar `39_yoz_oqiladigan/p28_*.mp3`.
    Element ID: `b1_intro` (12.1s narration), `r1_w1..r1_w6` (Row 1 ila/ala/lada/
    mata/anna/hatta), `r2_w1..r2_w5` (isa/musa/a'la/ta'ala/shatta), `r3_w1..r3_w4`
    (yahya/murtada/yatazakka/fatarda), `r4_w1..r4_w5` (sawwayha/dassayha/
    zakkayha/fasawwayha/uqbayha), `b2_intro` (11.3s), `r5_w1..r5_w6`
    (salat/zakat/dhakat/hayat/ghadat/riba).
  - **Block 3 (Yozilsada o'qilmaydigan, 10 so'z)**: `40. yozilsa-o'qilmaydi.mp3`
    (5:17, faqat 0-55s qismi). Chunklar `40_yozilsa_oqilmaydi/p28_*.mp3`.
    Element ID: `b3_title` (2.95s), `r6_w1..r6_w5` (ulu/ula/ulati/ulai/ulaika),
    `r7_w1..r7_w5` (amanu/aminu/qalu/i'lamu/i'malu). 40-audio'ning 55s+
    qismi 29-sahifa Shamsiya harflar uchun (`p29_s1..s3_*.mp3` chunklar mavjud,
    elements.ts da hali ulanmagan).
  - Audio helperlar: `A.yoz()` (39_yoz_oqiladigan/), `A.yo()` (40_yozilsa_oqilmaydi/).
  - Cut script: `tools/cut_p28.sh`.
  - Layout: 3 ta `BlockTitle` (clickable, kichik h3) + 5 ta `SubText` (statik
    chig'atoy turkiy izoh, `text-[9.5px]`) + 7 ta `Row` (gap-1.5/gap-2/gap-1,
    `size="sm"`). 2 ta `Sep` divider blok orasida. `gap-0` outer container —
    barcha element bitta viewportga sig'adi.
  - Audio timings birinchi versiya silencedetect -32dB/0.30s asoslangan,
    foydalanuvchi tinglab tasdiqlasa/tuzatsa cut_p28.sh yangilanadi.
- **Sahifa 29 tugallangan**: Shamsiya harflar (o'rta alif/lam o'qilmaydi) — 3 bo'lim,
  45 element (3 clickable section title + 42 so'z/ibora). Audio manba:
  `40. yozilsa-o'qilmaydi.mp3` (5:17) ning 76.58-316.55s qismi (28-sahifa
  pastki 0-58.9s, 29-sahifa keyin). Page boundary big silence gap 73.54-76.58s
  da. Chunklar `40_yozilsa_oqilmaydi/p29_s{1..3}_*.mp3` (45 chunk).
  Audio helper `A.yo()` (28-sahifa bilan ulushlanadi).
  - **Section 1 — O'rta alif o'qilmaydi** (76.58-157.41s, 15 element):
    - Title narration: `اوشبو سوزلر کبی سوزلرده اورتاده‌گی الفلر هم اوقیلمیدی`.
    - R1 (5 so'z): `بِالْغَيْبِ وَبِالْاٰخِرَةِ كَالْفَرَاشِ وَالْعَصْرِ وَانْحَرْ`.
    - R2 (3 ibora): `وَالْمُشْرِكِينَ ، رَبِّ الْعَالَمِينَ ، صِرَاطَ الَّذِينَ`.
    - R3 (3 ibora): `غَيْرِ الْمَغْضُوبِ ، هُمُ الْمُفْلِحُونَ ، لَيْلَةُ الْقَدْرِ`.
    - R4 (3 ibora): `حَذَرَ الْمَوْتِ ، وَاِذَا اسْتَسْقَى ، اَنْفُسَكُمُ اسْتَكْبَرْتُمْ`.
  - **Section 2 — O'rta lam o'qilmaydi** (160.50-216.30s, 15 element):
    - Title narration: `اوشبو سوزلر کبی سوزلرده اورتاده‌گی لاملر هم اوقیلمیدی`.
    - R1 (5 so'z): `اَلتَّبَعُ اَلثَّمَرُ اَلدَّخَلُ اَلذَّهَبُ اَلرَّصَدُ`.
    - R2 (5 so'z): `اَلزَّبَدُ اَلسَّفَرُ اَلشَّجَرُ اَلصَّفَرُ اَلضَّرَرُ`.
    - R3 (4 so'z): `اَلطَّلَبُ اَلظَّفَرُ اَللَّهَبُ اَلنَّسَبُ`.
  - **Section 3 — Boshqa so'z qo'shilganda alif+lam ikkalasi ham o'qilmaydi**
    (216.30-316.55s, 15 element):
    - Title narration (2-line chig'atoy): `اوشبو سوزلر کبی سوزلرگه باشقه بر سوز قوشیب اوقیغانده الفلری هم لاملری هم اوقیلمیدی`.
    - R1 (4 phrase): `هُوَ التَّبَعُ ، هُوَ الثَّمَرُ ، هُوَ الدَّخَلُ ، هُوَ الذَّهَبُ`.
    - R2 (4 phrase): `هُوَ الرَّصَدُ ، هُوَ الزَّبَدُ ، هُوَ السَّفَرُ ، هُوَ الشَّجَرُ`.
    - R3 (3 phrase): `هُوَ الصَّفَرُ ، هُوَ الضَّرَرُ ، هُوَ الطَّلَبُ`.
    - R4 (3 phrase): `هُوَ الظَّفَرُ ، هُوَ اللَّهَبُ ، هُوَ النَّسَبُ`.
  - Cut script: `tools/cut_p29.sh` (silencedetect -30dB/0.30s + buffers).
  - Layout: 3 ta `SectionTitle` (clickable narration, `text-[clamp(0.6rem,2.9cqi,0.78rem)]`,
    `leading-tight`, `py-0`) + 11 ta `Row` (`size="sm"`, gap-1/gap-1.5) +
    2 ta `Sep` divider (`my-0.5`). `gap-0` outer container — barcha element bitta
    viewportga sig'adi (oxirgi qator pastki fade bilan biroz xira).
  - Vaqtlar silencedetect avto-kesilgan birinchi versiya — foydalanuvchi
    audio'larni eshitib tasdiqlasa, mos kelmagan chunks `cut_p29.sh` orqali
    qayta kesilsin (ayniqsa Section 3 keyingi qatorlari, ba'zi chunklar
    uzun chiqdi — 5-21s, takror o'qish yoki tushuntirish ham bo'lishi mumkin).
- **Sahifa 27 tugallangan**: Ta marbuta (`ة ـة = ت`) + Muqaddara (Alif/Yā/Vāv
  yashirin). Jami 49 element.
  - Yuqori bo'lim (17 element, `38. t-marbuta.mp3` 82s): head (`ة ـة = ت`)
    + R1 5 so'z (`عَزِيزَةٌ فَرِيدَةٌ حَمِيدَةٌ سَعِيدَةٌ شَهِيدَةٌ`) +
    R2 5 so'z (`جَمِيلَةٌ حَلِيمَةٌ سَلِيمَةٌ شَرِيفَةٌ نَعِيمَةٌ`) +
    R3 6 so'z, 3 juftlik singular/plural (`مَرَّةٌ-مَرَّاتٌ، كَرَّةٌ-كَرَّاتٌ،
    حُرَّةٌ-حُرَّاتٌ`). Chunklar `38_t_marbuta/p27_*.mp3`.
  - Pastki bo'lim (32 element, `39. yoz-o'qiladigan.mp3` 188s, ulushli 28-sahifa
    bilan): subtitle (`يازلماسه‌ده اوقيلاديگان حرفلر`) + 3 ta Muqaddara bo'limi:
    - **Alif Muqaddara** (14 element): intro narration + R1 4 so'z
      (`إِلٰهُ(اِلٰاهُ) رَحْمٰنْ قُرْءَانْ هٰذَا`) + R2 5 so'z
      (`ذٰلِكَ هٰؤُلَاءِ لٰكِنْ ءَامَنَ ءَادَمُ`) + R3 5 so'z
      (`اٰخَرُ اٰمَنَّا اِبْرٰهِيمْ اِسْمٰعِيلْ اِسْحٰقْ`).
    - **Yā Muqaddara** (6 element): intro + R1 5 so'z
      (`بِهٖ(بِهٖی) بِاَمْرِهٖ بِحُكْمِهٖ بِقُدْرَتِهٖ هٰذِهٖ`).
    - **Vāv Muqaddara** (10 element): intro + R1 5 so'z
      (`لَهُ(لَهُو) اَمْرُهُ حُكْمُهُ قُدْرَتُهُ مَالُهُ`) + R2 4 so'z
      (`دَاوُدْ طَاوُسْ رُؤُسْ يَقْرَؤُنْ`).
    Chunklar `39_yoz_oqiladigan/p27_*.mp3`. Audio helper `A.tm()` va `A.yoz()`.
  - Cut script: `tools/cut_p27.sh`. Layout: BlockTitle + Row + Row + custom
    PairRow (3 juftlik tire bilan) + Sep + BlockTitle + 3 Muqaddara bo'lim
    (har biri BlockTitle + 1-3 ta Row, `size="sm"`, `gap-1/1.5`).
  - Vaqtlar silencedetect -30dB/d=0.5–0.7 asoslangan (yuqori bo'lim 38.mp3
    da 34 segment / 17 element = aniq, har element 2 marta o'qilgan). Pastki
    bo'lim mapping audio strukturasi noaniq bo'lgani sababli taxminiy —
    foydalanuvchi tinglab tasdiqlasa, mos kelmagan chunks `cut_p27.sh` orqali
    qayta kesilsin (so'z-chunk biriktirish noto'g'ri bo'lishi mumkin).
- **Sahifa 30 tugallangan**: Alif-lom vasl davomi (top, 21 ibora 6 qatorda) +
  Vasl bo'limi intro (bottom, 8 ibora 4 qator × 2 ustun). Jami 29 clickable
  element + 4 statik matn blok (top chig'atoy qoidasi, vasl title, vasl
  chig'atoy qoidasi, footnote). Audio manba: `37. alif va hamza.mp3` (3:36)
  ning 119.31-216.05s qismi, chunklar `37_alif_hamza/p30_*.mp3` (29 chunk).
  Audio helper `A.ah` (25, 26-sahifa bilan ulushlanadi).
  **Top section** (6 qator, alif-lom vasl misollar, `size="sm"` `gap-1.5`):
  - R1 (4): `هٰذَا الْبَلَدُ ، مَا الْقَارِعَةُ ، مَا الْحُطَمَةُ ، هٰذَا الَّذِى`.
  - R2 (3): `مَنْ ذَا الَّذِى ، تَحْتَهَا الْأَنْهَارُ ، فَقُلْنَا اضْرِبْ`.
  - R3 (3): `بِئْسَ الِاسْمُ ، اِهْدِنَا الصِّرَاطَ ، يَا أَيُّهَا النَّاسُ`.
  - R4 (4): `اِلَى النَّاسِ ، عَلَى النَّاسِ ، فِى الْأَرْضِ ، فِى الصُّدُورِ`.
  - R5 (4): `قَالُوا اتَّخَذَ ، قَالُوا ادْعُ ، لَقُوا الَّذِينَ ، اُوتُوا الْكِتَابَ`.
  - R6 (3): `وَاَقِيمُوا الصَّلٰوةَ ، وَاٰتُوا الزَّكٰوةَ ، وَعَمِلُوا الصّٰلِحٰت`.
  **Bottom section** (vasl title + chig'atoy rule + 4 qator 2 ustun, 3-so'zli vasl):
  - B1: `اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ` | `وَهٰذَا الْبَلَدُ الْأَمِينَ`.
  - B2: `نَارُ اللهِ الْمُوقَدَةُ` | `كَمَثَلِ الَّذِى اسْتَوْقَدَ`.
  - B3: `فَاتَّقُوا النَّارَ الَّتِى` | `هُوَ التَّوَّابُ الرَّحِيمُ`.
  - B4: `ذُو الْفَضْلِ الْعَظِيمِ` | `اَنْتَ الْعَزِيزُ الْحَكِيمُ`.
  Chig'atoy qoidalar va Vasl title audio'da narrate qilinmagan (faqat 29
  arab iborani audio'da reader o'qigan: 21 top + 8 bottom). Top section
  audio: 119.31-188.84s; 4.54s break; bottom section: 193.23-216.15s.
  Vaqtlar silencedetect -28dB/d=0.35 + buffers asoslangan — foydalanuvchi
  audio'larni eshitib tasdiqlasa, mos kelmagan chunks `cut_p30.sh` orqali
  qayta kesilsin. Cut script: `tools/cut_p30.sh`.
- **Sahifa 32 idg'om sektsiyasi qayta yozildi (2026-05-22)**: eski versiyada
  faqat 4 misol (`min ni'matin`, `min rabbika`, `qad tabayyana`, `yawma'idhin`)
  bor edi — Layl/Zalzaladan olingan, kitobdagi matn bilan **mos kelmas edi**.
  Foydalanuvchi to'g'irlash so'radi. Yangi versiya kitobning 32.jpg
  (`Materiallar/vasl vaqf idg'om va boshqalar/32.jpg`) ga 1:1 mos: 1 title
  + 12 idg'om misoli (6 qator × 2 ustun).
  - **Audio manba**: `44. idg'om.mp3` (49.19s) — to'liq qismi ishlatildi.
    Reciter har misolni faqat **asl shaklda** o'qidi (idg'om transformatsiya
    audio'da yo'q, statik vizual).
  - **12 misol mapping** (Whisper medium tasdiq + silencedetect -32dB/0.30s):
    R1 `مِنْ مَسَدٍ` (4.0-5.8) / `لَنْ نُؤْمِنَ` (6.9-8.9) — nun+mim → mim-shadda; nun+nun → nun-shadda
    R2 `مِنْ وَلِيٍّ` (10.2-12.1) / `وَمَنْ يَعْمَلْ` (13.7-15.9) — nun+waw/ya → shadda
    R3 `وَمَنْ لَمْ` (17.7-19.1) / `مِنْ رَبِّهِمْ` (20.3-22.3) — nun+lam/ra → shadda
    R4 `هُدًى مِنْ` (23.8-25.8) / `شَيْئًا نُكْرًا` (27.1-30.0) — tanvin+mim/nun
    R5 `اِلٰهٌ وَاحِدٌ` (32.1-35.1) / `خَيْرًا يَرَهُ` (36.6-39.1) — tanvin+waw/ya
    R6 `هُدًى لِلْمُتَّقِينَ` (40.8-44.0) / `غَفُورٌ رَحِيمٌ` (45.4-48.3) — tanvin+lam/ra
  - **Idg'om transformatsiya** (statik vizual, P32_IDGOM_TRANSFORM map):
    `مِمْ مَسَدٍ`, `لَنُّؤْمِنَ`, `مِوَّلِيٍّ`, `وَمَيَّعْمَلْ`, `وَمَلَّمْ`, `مِرَّبِّهِمْ`,
    `هُدَمْ مِنْ`, `شَيْئَنُّكْرًا`, `اِلٰهُوَّاحِدٌ`, `خَيْرَيَّرَهُ`,
    `هُدَلِّلْمُتَّقِينَ`, `غَفُورُرَّحِيمٌ`.
  - **Layout** (`Page32` custom): `<IdgomCell>` komponenti — clickable asl
    shakl `(...)` + `−` + statik transformatsiya `(...)` (opacity 0.65,
    kichikroq). 6 ta `<RowPair>` — har qatorda 2 cell RTL `justify-around`.
    Title — yuqorida katta bold clickable.
  - **Cut script**: `tools/cut_p32_idgom.sh` (apostrof path muammosi sababli
    asl audio nomi `44. idg'om.mp3` ga `cp` orqali temp copy `44. idgom.mp3`
    yaratiladi va build oxirida o'chiriladi).
  - **Eslatma**: 32-sahifaning **iqlob** (1 qator × 2 misol) va **Alloh lafzi**
    (10+ misol) bo'limlari hozircha qo'shilmadi — kitobning hammasini
    ko'rsatish uchun keyingi versiyada (audio `45. iqlob.mp3`, `46. Alloh
    lafzi.mp3`) qo'shish kerak.
- **Sahifa 34 tugallangan**: Iymon kalimalari — 5 ta kalima (Tayyiba, Shahada,
  Tawhid, Radd-i Kufr, Istighfar). Jami 23 clickable element (1 title + 5
  kalima heading + 17 body part). Audio manbalari: `49-52. kalimalar 01-04.mp3`
  (kalimalarning asl nusxalari papkasidan), chunklar
  `49_kalimalar_01/p34_*.mp3` (23 chunk). Audio helper: `A.kl()`.
  - **Title** (top center, clickable): `كَلِمَاتُ إِيمَانٍ` — audio 49 [0.998-2.540].
  - **K1 Tayyiba**: heading `كَلِمَةُ طَيِّبَةٌ` (49 [4.4-6.2]) + 1 body
    `لَا اِلٰهَ اِلَّا اللّٰهُ مُحَمَّدٌ رَسُولُ اللّٰهِ` (49 [9.1-16.6]).
  - **K2 Shahada**: heading `كَلِمَةُ الشَّهَادَةِ` (49 [18.0-19.5]) + 2 parts
    (`اَشْهَدُ اَنْ لَا اِلٰهَ اِلَّا اللّٰهُ` 49 [22.1-27.5];
     `وَاَشْهَدُ اَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ` 49 [27.7-33.0]).
  - **K3 Tawhid** (audio 50): heading `كَلِمَةُ التَّوْحِيدِ` + 4 parts
    (`اَشْهَدُ...لَا شَرِيكَ لَهُ`; `لَهُ الْمُلْكُ...يُمِيتُ`;
     `وَهُوَ حَىٌّ لَا يَمُوتُ`; `بِيَدِهِ الْخَيْرُ...قَدِيرٌ`).
  - **K4 Radd-i Kufr** (audio 51): heading `كَلِمَةُ رَدِّ الْكُفْرِ` + 3 parts
    (`اَللّٰهُمَّ اِنِّى اَعُوذُبِكَ...اَعْلَمُ`;
     `وَاَسْتَغْفِرُكَ لِمَا لَا اَعْلَمُ`;
     `اِنَّكَ اَنْتَ عَلَّامُ الْغُيُوبِ`).
  - **K5 Istighfar** (audio 52): heading `كَلِمَةُ الْاِسْتِغْفَارِ` + 3 ta
    `اَسْتَغْفِرُ اللّٰهَ` (ast1/ast2/ast3) + ext
    `تَعَالٰى مِنْ كُلِّ ذَنْبٍ اَذْنَبْتُهُ عَمْدًا اَوْ خَطَأً` (audio'da bu yerda
    tugaydi — "sirran" so'zi audio 52 ning keyingi segmentida).
    Ast3 (3-Astaghfirullaha) audio 52 seg4 boshidan (11.97-14.30s, ~2.3s)
    kesilgan — agar kesim mid-word bo'lsa, qayta sozlash kerak bo'ladi.
    **Audio kengaytmasi** (kitobda yo'q, lekin audio 52 da reciter qo'shgan
    qo'shimcha 3 segment — kalima istig'fardan keyingi davom du'osi):
    - `k5_p2_alaniya` [24.045-26.626]: `سِرًّا اَوْ عَلَانِيَةً`
      (book's "sirran" + audio extra "aw 'alaniyatan"). Whisper bu segmentni
      "sirran aw 'alaniyatan" deb transcribe qilgan — silence boundary 23-24s
      da, demak ext seg "khata'an" da tugaydi va sirran shu segmentda.
    - `k5_p3_tawba` [27.957-38.435]:
      `وَاَتُوبُ اِلَيْهِ مِنَ الذَّنْبِ الَّذِى اَعْلَمُ وَمِنَ الذَّنْبِ الَّذِى لَا اَعْلَمُ`.
    - `k5_p4_ghuyub` [39.627-44.416]: `اِنَّكَ اَنْتَ عَلَّامُ الْغُيُوبِ`
      (xuddi K4 oxiridagi ibora — istighfar du'osi ham shu bilan yakunlanadi).
  - **Layout**: custom `<KalimaHead>` (kichik bold button) va `<KalimaBody>`
    (RTL row, parts orasi `❀` gul ajratgich); title — yuqorida katta bold.
    `gap-0` outer container, body parts `text-[clamp(0.72rem,3.4cqi,0.92rem)]`
    — barcha 20 element bitta viewportga (677px) sig'adi. Body parts'da
    chig'atoy/o'zbek izoh element'larda saqlangan (uzbek field), UIda
    body matnida ko'rinmaydi — clickable button orqali kontekst beradi.
  - **Vaqtlar**: silencedetect -32dB/d=0.30 + Whisper transcribe (ar)
    tasdiqlash bilan aniqlangan. Cut script: `tools/cut_p34.sh`.
- **Sahifa 36 tugallangan**: Ta'awwudh + Surat al-Fatiha (7 oyat) + Awwal Surat
  al-Baqarah (5 oyat). Jami 14 ta clickable element + 2 ta statik bezakli
  section title (`❀ سُورَةُ الْفَاتِحَة ❀`, `❀ اَوَّلُ سُورَةِ الْبَقَرَة ❀`).
  Audio manbalari: `56. Fotiha.mp3` (83.30s) + `57. Baqara.mp3` (94.46s),
  chunklar `public/audio/edit/56_fotiha_baqara/p36_*.mp3` (14 chunk).
  Audio helper: `A.sb()`.
  - **Fotiha mapping** (silencedetect -30dB/d=0.30 + Whisper medium tasdiqlash):
    `taawwudh` 1.27-8.07s, `fa_bismi` 10.16-16.41s (v1), `fa_v2` 21.12-27.64s
    (Alhamdu), `fa_v3` 29.83-34.05s (Rahman/Rahim), `fa_v4` 36.91-41.25s
    (Maliki), `fa_v5` 44.92-51.98s (Iyyaka), `fa_v6` 55.83-61.61s (Ihdina),
    `fa_v7` 65.48-81.83s (Sirat alladhina ... dallin).
  - **Baqarah mapping**: `bq_bismi` 1.76-6.98s, `bq_v1` 11.43-18.67s (Alif Lam Mim),
    `bq_v2` 21.88-33.30s (joint: Dhalikal kitabu ... hudan lil muttaqin —
    audio'da sub-pause'lar bor lekin verse marker oxirida), `bq_v3` 36.51-50.59s
    (Alladhina yu'minuna...), `bq_v4` 55.35-77.07s (joint: Walladhina yu'minuna
    ... yuqinun), `bq_v5` 80.22-90.51s (Ula'ika ala hudan...).
  - **Layout**: custom `<Verse>` (RTL button + verse marker `﴿N﴾` 0.78em opacity
    0.7) va `<SurahTitle>` (`❀` ornaments). `gap-0.5` outer container, `size=sm`
    fluid clamp (`text-[clamp(0.72rem,3.6cqi,0.92rem)]`) uzun oyatlar uchun;
    `size=md` ta'awwudh/bismillah/v1 uchun. `overflowWrap: anywhere` — uzun
    v7 (16 so'z) va Baqarah v4 (21s, 14 so'z) lar mobil viewportda nice break.
    Barcha 14 button + 2 title + 1 divider bitta viewportga (677px) sig'adi.
  - **Imlo**: Mushaf script (Hafs) — superscript alef (`ٰ`) `الرَّحْمٰنِ`,
    `الْعٰلَمِينَ`, `مٰلِكِ`, `الصِّرٰطَ`, `الصَّلٰوةَ`, `هٰدُى`, `يُؤْمِنُونَ`
    kabi joylarda. Hamza qoidalar p25-26 bilan mos (`اِيَّاكَ` initial hamza
    yo'q, foydalanuvchi xohlasa o'zgartiriladi).
  - Cut script: `tools/cut_p36.sh`. Transcribe: `tools/transcribe_p36.py`.
- **Sahifa 37 tugallangan**: Surah Ash-Shams (Bismillah + 15 ayat) + Surah
  Al-Layl boshi (Bismillah + 7 ayat + 8-oyat fragment "وَأَمَّا"). Jami
  27 clickable element. Audio manbalari:
  - Shams (16 chunk): `58. Shams.mp3` (128.78s) — chunklar
    `58_shams/p37_sh_*.mp3` (bismillah + a1..a15).
  - Layl (9 chunk): `59. Layl.mp3` (172.43s) ning 0-60s qismi — chunklar
    `59_layl/p37_ll_*.mp3` (bismillah + a1..a7 + a8_start).
  - Cut script: `tools/cut_p37.sh`. Vaqtlar silencedetect -32dB/0.30s +
    ~0.3s buffers asoslangan — foydalanuvchi audio'larni eshitib tasdiqlasa,
    mos kelmagan chunks `cut_p37.sh` orqali qayta kesilsin.
  - Audio helperlar: `A.shams()` va `A.layl()` (yangi qo'shildi).
  - Layout: custom Page37 — Shams title (kichik `❀ سُورَةُ الشَّمْسِ ❀`)
    + Bismillah + 15 ayat (qator-qator joylashuv 3+2+3+3+2+1+1, `size="sm"`,
    `gap-2`) + Divider + Layl title (kichik bilan o'sha format) + Bismillah
    + 7 ayat (3+2+3 qatorda) + `وَأَمَّا` fragmenti (8-oyat boshi, keyingi
    sahifaga davom). Element ID format: `sh_*` (Shams) va `ll_*` (Layl).
- **Sahifa 38 tugallangan**: Surah Al-Layl davomi (ayatlar 8-21, p37 dan davom)
  + Surah Ad-Duho divider (title + bismillah) + Ad-Duho ayatlar 1-10
  (ayah 11 p39 da). Jami 26 element (14 Layl + 1 statik title + 1 bismillah +
  10 Duho). Manbalar va chunklar:
  - **Layl ayatlar 8-21** (14 chunk): `59. Layl.mp3` (172.43s) ning
    58.85-170.95s qismi. Chunklar `59_layl/p38_ll_a{8..21}.mp3`.
    Audio helper `A.layl()` (37-sahifa bilan ulushlanadi).
  - **Duho bismillah + ayatlar 1-10** (11 chunk): `60. Zuho.mp3` (92.81s)
    ning 1.15-83.80s qismi. Chunklar `60_zuho/p38_zh_bismillah.mp3`,
    `p38_zh_a{1..10}.mp3`. Audio helper: `A.zuho()` (yangi qo'shildi —
    39-sahifa Duho v.11 bilan ulushlanadi).
  - **Title** (`du_title`, statik): `سُورَةُ الضُّحٰى` — clickable button
    bo'lib ko'rinadi lekin audioUrl=null (audio'da reciter sarlavhani
    aytmaydi). Bismillah esa o'z chunkiga ega.
  - **Cut script**: `tools/cut_p38.sh` (silencedetect -32dB/0.70s +
    ~0.20s buffers). 21 ta toza ovoz oraliq topildi Layl uchun
    (bismillah + 21 ayat ✓), 12 ta Duho uchun (bismillah + 11 ayat ✓).
  - **Layout** (`Page38` custom): 7 ta Row (Layl 8-21 ikkitalab joylashgan)
    + Divider + duhoTitleHeader (`❀ سُورَةُ الضُّحٰى ❀` style) + bismillah
    row + 5 ta Row (Duho 1-10). Hammasi `size="sm"` `gap-1.5` —
    bitta viewportga (677px) sig'adi. Element ID format: `ll_a{8..21}`,
    `du_title`, `du_bism`, `du_a{1..10}`.
  - **Imlo**: Mushaf script (Hafs/Indo-Pak) — superscript alef (`ٰ`)
    `وَاسْتَغْنٰى`, `بِالْحُسْنٰى`, `لِلْعُسْرٰى`, `تَرَدّٰى`, `لَلْهُدٰى`,
    `وَالْاُولٰى`, `تَلَظّٰى`, `الْاَشْقَى`, `وَتَوَلّٰى`, `يَتَزَكّٰى`,
    `تُجْزٰى`, `الْاَعْلٰى`, `يَرْضٰى`, `وَالضُّحٰى`, `سَجٰى`, `قَلٰى`,
    `فَتَرْضٰى`, `فَاٰوٰى`, `فَهَدٰى`, `فَاَغْنٰى` kabi joylarda.
    Alif-hamza qoidalar p25-26 bilan mos (`اَمَّا`, `اِنَّ`, `اَلَمْ`).
  - Vaqtlar foydalanuvchi tinglovi orqali tasdiqlanmagan — mos kelmagan
    chunks `cut_p38.sh` orqali qayta kesilsin.
- **Sahifa 40 tugallangan**: Suratu-l Alaq (19 ayat, top) + Suratu-l Qadr
  (Bismillah + 5 ayat, bottom). Jami 25 element. Al-Alaq sarlavhasi va
  bismillah'i p39'da (kitobga mos — sarlavha p39 footer'ida). Manbalar:
  - `public/audio/63. Alaq.mp3` (147s, Bismillah + 19 ayat). Bismillah
    chunk (`p39_alaq_bism.mp3`) p39 alaq sarlavhasi uchun ishlatiladi.
    p40 ayat chunklari: `63_alaq/p40_a01..a19.mp3`.
  - `public/audio/64. Qadr.mp3` (49.84s, Bismillah + 5 ayat). Chunklar:
    `64_qadr/p40_q_bism.mp3`, `p40_q01..q05.mp3`.
  - Audio helperlar: `A.alq()` va `A.qdr()` (yangi qo'shildi).
  - Layout: custom Page40 — Alaq 19 ayat (qator-qator 2+2+2+3+3+2+1+3+1,
    `size="sm"`, `gap-1`/`gap-1.5`/`gap-2`) + Divider + Qadr title (kichik
    `سورة القدر` / "Qadr surasi") + Bismillah + 5 ayat (1+2+1+1 qatorda,
    v4 uzun va alohida, v5 alohida). Element ID format: `a01..a19` (Alaq),
    `q_bism` + `q01..q05` (Qadr).
  - Cut script: `tools/cut_p40.sh`. Vaqtlar silencedetect -32dB/0.30s +
    ~50/100ms buffers asoslangan — foydalanuvchi audio'larni eshitib
    tasdiqlasa, mos kelmagan chunks `cut_p40.sh` orqali qayta kesilsin.
- **Sahifa 41 tugallangan**: Suratu-l Bayyina (98) — Bismillah + 8 ayat,
  jami 9 clickable element. Manba: `65. Bayyina.mp3` (170.06s) — chunklar
  `65_bayyina/p41_*.mp3` (9 chunk). Audio helper: `A.bayy()`.
  Element IDs: `bism`, `a1..a8`. Layout: clickable `سورة البينة` title +
  bismillah + 8 ayat (har biri `size="sm"`, `gap-2` bilan alohida qatorda).
  Renderer: dedicated `Page41` (oldin generic `SurahPage` placeholder
  `Kavsar` matn bilan edi — to'liq almashtirildi).
  Audio timings (silencedetect -32dB/0.30s + Whisper small Arabic verify):
  - bismillah: 1.30-5.96 (4.66s)
  - a1: 9.40-24.05 (14.65s, `لَمْ يَكُنِ...الْبَيِّنَةُ`)
  - a2: 26.60-34.55 (7.95s, `رَسُولٌ...مُطَهَّرَةً`)
  - a3: 37.30-41.45 (4.15s, `فِيهَا كُتُبٌ قَيِّمَةٌ`)
  - a4: 44.50-56.90 (12.40s, `وَمَا تَفَرَّقَ...الْبَيِّنَةُ`)
  - a5: 62.00-88.40 (26.40s, includes internal pause at 80.94 —
    waqf at `حُنَفَاءَ` va `الزَّكَاةَ ۚ`)
  - a6: 92.40-115.85 (23.45s, internal pause at 107.21 — waqf `فِيهَا ۚ`)
  - a7: 118.95-131.45 (12.50s)
  - a8: 136.55-168.55 (32.00s, internal pauses at 153.94 va 162.12 —
    waqf at `أَبَدًا ۖ` va `عَنْهُ ۚ`)
  Cut script: `tools/cut_p41.sh`.
- **Sahifa 42 tugallangan**: Surah Az-Zalzalah (Bismillah + 8 oyat) + Surah Al-'Adiyat
  (Bismillah + 11 oyat) = 21 clickable element. Audio manbalar:
  - `66. Zalzala.mp3` (87.51s) → chunklar `66_zalzala/p42_zz_{bism,a1..a8}.mp3` (9).
  - `67. Adiya.mp3` (91.48s)  → chunklar `67_adiya/p42_ad_{bism,a1..a11}.mp3` (12).
  Audio helperlar: `A.zz()`, `A.ad()` (`elements.ts` da).
  Layout (RenderedPage.tsx Page42): Title "سورة الزلزلة" → bismillah → 4 ta `Row`
  (a1+a2, a3+a4, a5, a6, a7+a8) → Divider → Title "سورة العاديات" → bismillah →
  5 ta `Row` (a1+a2+a3, a4+a5, a6+a7, a8+a9, a10+a11). Barcha so'zlar
  `size="sm"`. Mazmun viewport balandligidan biroz oshadi — content scroll/fade
  ishlaydi (alif-lom suralar uchun standart).
  Vaqtlar silencedetect -32dB/0.50s + 0.10/0.15s buffers. Cut script: `tools/cut_p42.sh`.
- **Sahifa 39 tugallangan**: Duho 11-oyat (oxirgi) + Sharh (8 ayat) + Tin
  (8 ayat) + Alaq header (bismillah). Jami 20 audio element + 3 ta surah
  sarlavhasi (statik). Manbalar va chunklar:
  - **Duho v.11** (1 element, `duho_v11`): `60. Zuho.mp3` ning 85.98-91.99s
    qismidan, chunk `60_zuho/p39_duho_v11.mp3` (6.01s). v.1-10 38-sahifada.
  - **Sharh** (9 element: bismillah + 8 ayat): `61. Sharh.mp3` (62s),
    chunklar `61_sharh/p39_sharh_{bism,v1..v8}.mp3`. Audio helper: `A.sharh()`.
  - **Tin** (9 element: bismillah + 8 ayat): `62. Tiyn.mp3` (81s),
    chunklar `62_tiyn/p39_tin_{bism,v1..v8}.mp3`. Audio helper: `A.tiyn()`.
  - **Alaq header** (1 element, `alaq_bism`): `63. Alaq.mp3` ning
    1.49-6.82s qismidan, chunk `63_alaq/p39_alaq_bism.mp3` (5.33s).
    Alaq surasining ayatlari 40-sahifada davom etadi.
  - **Layout** (`Page39` custom renderer): kitobning sahifa 39 strukturasi
    bilan mos. Compact `<Head>` (h3 + sub, `mt-0.5 mb-0`) + custom `<Sep>`
    (`my-1`) — `<Title>`/`<Divider>` standart komponentlardan ixchamroq.
    `gap-0` outer container, barcha qatorlar `size="sm" gap="gap-1"`.
    Tartib: Duho v.11 → Sep → Sharh title + bismillah + 4 qator
    (v1+v2 / v3+v4 / v5+v6+v7 / v8) → Sep → Tin title + bismillah + 5 qator
    (v1+v2 / v3+v4 / v5 / v6 / v7+v8) → Sep → Alaq title + bismillah.
    Card balandligi ~714px (~620px viewport bilan ~94px overflow — pastki
    fade orqali Alaq header dostur etiladi).
  - Cut script: `tools/cut_p39.sh` (silencedetect -32dB/0.40s + 0.20s
    buffer). Vaqtlar foydalanuvchi tinglovi orqali tasdiqlanmagan —
    audio'larni eshitib mos kelmagan chunks `cut_p39.sh` orqali qayta
    kesilsin.
- **Sahifa 43 tugallangan**: Surah Al-Qari'ah (Bismillah + 11 ayat) + Surah
  At-Takathur (Bismillah + 8 ayat) + Surah Al-'Asr title-header (faqat
  Bismillah; to'liq oyatlar p44 da). Jami 22 clickable element + 3 static
  Title. Audio manbalari:
  - **Qari'ah** (12 chunk): `68. Qoria.mp3` (89.36s). Chunklar
    `68_qoria/p43_qr_*.mp3` (bism + a1..a11). Audio helper: `A.qr()`.
  - **Takathur** (9 chunk): `69. Takasur.mp3` (71.89s). Chunklar
    `69_takasur/p43_tk_*.mp3` (bism + a1..a8). Audio helper: `A.tk()`.
  - **Asr Bismillah** (1 chunk): `70. Asr.mp3` (33.78s) ning 0.7-6.1s
    qismi. Chunk `70_asr/p43_as_bism.mp3`. Audio helper: `A.asr()` (p44
    bilan ulushlanadi — full body p44 da).
  Layout: 3 ta `<Title text="..." sub="..." />` (statik, kitobdagidek
  markazlashgan) + Bismillah + ayat'lar `size="sm"` `gap-1`/`gap-1.5`
  bilan har qatorda 1-3 ayat. 2 ta `<Divider />` 3 surani ajratadi.
  Cut script: `tools/cut_p43.sh` (silencedetect -32dB/0.30s + ~0.2-0.3s
  buffers). Vaqtlar foydalanuvchi tinglovi orqali tasdiqlanmagan — mos
  kelmagan chunks `cut_p43.sh` orqali qayta kesilsin.
- **Sahifa 44 tugallangan**: Surah Al-'Asr davomi (3 ayat — title+Bismillah
  p43 da) + Surah Al-Humazah (Bismillah + 9 ayat, statik title) + Surah
  Al-Fil (Bismillah + 5 ayat, statik title). Jami 19 clickable element +
  2 static title (Humazah, Fil — `❀ ... ❀` formatda markazda). Audio
  manbalari:
  - **Asr** (3 chunk): `70. Asr.mp3` (33.78s) ning 8.45-32.95s qismi.
    Chunklar `70_asr/p44_as_a*.mp3`. Audio helper `A.asr()` (p43 bilan
    ulushlanadi).
  - **Humazah** (10 chunk): `71. Humaza.mp3` (75.96s). Chunklar
    `71_humaza/p44_hu_*.mp3` (bismillah + a1..a9). Audio helper: `A.hu()`.
  - **Fil** (6 chunk): `72. Fil.mp3` (48.95s). Chunklar
    `72_fil/p44_fi_*.mp3` (bismillah + a1..a5). Audio helper: `A.fi()`.
  Layout: Asr 2 qator (`as_a1+as_a2`, `as_a3`) + Divider + Humazah
  flower-title + Bismillah + Humazah 5 qator (a1; a2-a3; a4-a5; a6-a7;
  a8-a9) + Divider + Fil flower-title + Bismillah + Fil 3 qator (a1;
  a2-a3; a4-a5). Hammasi `size="sm"` `gap-1.5`/`gap-2`. Cut script:
  `tools/cut_p44.sh` (silencedetect -32dB/0.30s + ~0.3s buffers). Vaqtlar
  foydalanuvchi tinglovi orqali tasdiqlanmagan — mos kelmagan chunks
  `cut_p44.sh` orqali qayta kesilsin.
- **Sahifa 45 tugallangan**: 3 ta to'liq surah + 1 ta sarlavha (Kafirun
  oyatlari 46-sahifada): Surah Quraysh (Bismillah + 4 ayat) + Surah
  Al-Ma'un (Bismillah + 7 ayat) + Surah Al-Kawthar (Bismillah + 3 ayat) +
  Surah Al-Kafirun header (Bismillah only). Jami 18 clickable element +
  4 ta static flower-title (`❀ ... ❀` formatda markazda). Audio manbalari:
  - **Quraysh** (5 chunk): `73. Quraysh.mp3` (48.59s). Chunklar
    `73_quraysh/p45_qu_*.mp3` (bismillah + a1..a4). Audio helper: `A.qur()`.
  - **Ma'un** (8 chunk): `74. Mauvn.mp3` (62.20s). Chunklar
    `74_mauvn/p45_ma_*.mp3` (bismillah + a1..a7). Audio helper: `A.mau()`.
    Audio'da a4 va a5 reciter tomonidan bog'lab o'qilgan (sukunat yo'q) —
    sun'iy 38.55s da bo'lindi.
  - **Kawthar** (4 chunk): `75. Kavsar.mp3` (29.54s). Chunklar
    `75_kavsar/p45_ka_*.mp3` (bismillah + a1..a3). Audio helper: `A.kau()`.
  - **Kafirun bismillah** (1 chunk): `76. Kafirun.mp3` (65.36s) ning
    0.95-6.45s qismi. Chunk `76_kafirun/p45_kf_bism.mp3`. Audio helper:
    `A.kaf()` (oyatlar p46 da ulushlanadi).
  Layout: Page36 patterndagi `Verse` komponentidan foydalaniladi (custom
  Page45). Har bismillah/ayat clickable button bilan, ayat raqami `﴿N﴾`
  formatda matn oxirida (0.78em, 70% opacity). 4 ta flower-title statik
  (clickable emas, audio'da reciter sarlavhani o'qimaydi). `gap-0` outer
  container `size="sm"` Verse — barcha 18 element bitta viewportga (677px)
  sig'adi. Cut script: `tools/cut_p45.sh` (silencedetect -32dB/0.30s +
  ~0.2s buffers). Vaqtlar foydalanuvchi tinglovi orqali tasdiqlanmagan —
  mos kelmagan chunks `cut_p45.sh` orqali qayta kesilsin (ayniqsa Ma'un
  a4/a5 bo'linish 38.55s da to'g'rimi tekshirilsin).
- **Sahifa 48 tugallangan**: Sano (الثَّنَاءُ) + Tashahhud (التَّشَهُّدُ).
  Jami 12 clickable element — 2 sarlavha (Sano + Tashahhud) + 3 Sano body
  segmenti + 7 Tashahhud body segmenti, kitobning vergul (،) bo'linishlariga
  mos ravishda. Audio yo'q (ls_duolar.audioUrl = null) — clickable elementlar
  active highlight beradi, audio ijro etilmaydi (start=end=0).
  - **Sano matni** (3 segment): `s1` سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ ،
    `s2` وَتَعَالَى جَدُّكَ ، `s3` وَلَا إِلٰهَ غَيْرُكَ. Layout: `s1` alohida
    qatorda, `s2+s3` bitta qatorda (kitob ko'rinishiga moslash).
  - **Tashahhud matni** (7 segment): `t1` اَلتَّحِيَّاتُ لِلَّهِ ، `t2` وَالصَّلَوَاتُ ،
    `t3` وَالطَّيِّبَاتُ ، `t4` السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ ،
    `t5` السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ ، `t6` أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ ،
    `t7` وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. Layout: `t1+t2+t3` bitta
    qisqa qatorda, `t4..t7` har biri alohida qatorda (uzunligi sababli).
  - Layout: `lg` size sarlavhalar, `sm` size body, dotted `Sep` divider.
    Card ~415px, viewport (946px) ga to'liq sig'adi, overflow yo'q.
- **Sahifa 46 tugallangan**: Surah Al-Kafirun davomi (ayat 1-6, title+bismillah
  p45 oxirida) + Surah An-Nasr (Bismillah + 3 ayat) + Surah Al-Masad
  (Bismillah + 5 ayat) + Surah Al-Ikhlas (Bismillah + ayat 1 + ayat 2 + ayat 3
  boshi "لَمْ يَلِدْ"). Jami 20 clickable element. Audio manbalari:
  - `76. Kafirun.mp3` (65.36s) → kf_a1..a6, chunklar `76_kafirun/p46_kf_*.mp3`
    (bismillah p45 da `kf_bism` sifatida).
  - `77. Nasr.mp3` (44.72s) → ns_bism + ns_a1..a3, chunklar `77_nasr/p46_ns_*.mp3`.
    a3 uzun (13.15s) — kitobda 2 satrga bo'lingan bo'lsa-da bitta ayat sifatida
    render: `فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ اِنَّهُ كَانَ تَوَّابًا`.
  - `78. Masad.mp3` (51.41s) → ms_bism + ms_a1..a5, chunklar `78_masad/p46_ms_*.mp3`.
  - `79. Ixlos.mp3` (26.17s) → ix_bism + ix_a1 + ix_a2 + ix_a3_start, chunklar
    `79_ixlos/p46_ix_*.mp3`. Ayat 3 audio chunk fragment "لَمْ يَلِدْ" uchun
    silencedetect (-28dB/0.10s) bilan topilgan mikro-pauza (~22.06s) ishlatildi;
    oyat davomi (`وَلَمْ يُولَدْ`) va ﴿٣﴾ verse marker p47 da bo'ladi (precedent:
    p37 Layl `وَأَمَّا`).
  - Audio helperlar: `A.nas()`, `A.msd()`, `A.ixl()` (yangi qo'shildi); `A.kaf()`
    p45 dan davom.
  - Layout: `Page46` custom renderer — `<Verse>` (RTL button + verse marker
    `﴿N﴾`) va `<SurahTitle>` (`❀` ornaments). Al-Kafirun ayatlari title'siz
    boshlanadi (p45 oxirida title bor); 3 ta `<Divider />` surahlar orasida;
    Al-Ikhlas a3_start verse marker'siz (oyat to'liq emas). `size="sm"` fluid
    clamp, `overflowWrap: anywhere` uzun oyatlar uchun nice break beradi.
    Card balandligi ~662px viewport (677px) ichida sig'adi.
  - Cut script: `tools/cut_p46.sh` (silencedetect -32dB/0.30s + 0.15-0.25s
    buffers). Vaqtlar foydalanuvchi tinglovi orqali tasdiqlanmagan — mos
    kelmagan chunks `cut_p46.sh` orqali qayta kesilsin (ayniqsa Ixlos
    a3_start 22.15s da to'g'ri tugaganini tekshirish kerak).
- **Sahifa 47 tugallangan**: Surah Al-Ikhlas davomi (v3 oxiri `وَلَمْ يُولَدْ`
  + v4 `وَلَمْ يَكُنْ لَهُ كُفُوًا اَحَدٌ`) + Surah Al-Falaq (Bismillah +
  5 ayat) + Surah An-Nas (Bismillah + 6 ayat). Jami 15 ta clickable element
  + 2 ta `❀ SurahTitle` ornament. Audio manbalari:
  - `79. Ixlos.mp3` (26.17s) — `p47_ix_v3` (20.10-22.18s) faqat
    `وَلَمْ يُولَدْ` qismini ijro etadi (v3 boshi `لَمْ يَلِدْ` p46 da).
    `p47_ix_v4` (22.10-25.65s) to'liq v4 oyatini ijro etadi.
  - `80. Falaq.mp3` (46.13s) → fq_bism + fq_a1..a5, chunklar
    `80_falaq/p47_fq_*.mp3` (6 chunk). v4 audio'da ichki ~0.4s pauza bor
    (`النَّفَّاثَاتِ` va `فِى الْعُقَدِ` orasida) — bitta chunk'ga birlashtirilgan
    (silencedetect -30dB/0.30s).
  - `81. Nos.mp3` (54.96s) → ns_bism + ns_a1..a6, chunklar
    `81_nos/p47_ns_*.mp3` (7 chunk). v5 (`الَّذٖى يُوَسْوِسُ فٖى صُدُورِ النَّاسِ`)
    eng uzun (~7.87s).
  - Audio helperlar: `A.flq()`, `A.nss()` (yangi qo'shildi); `A.ixl()` p46 dan davom.
  - Layout: `Page47` custom renderer (Page45 / Page46 pattern bilan
    bir xil) — `<Verse>` (RTL button + `﴿N﴾` marker) + `<SurahTitle>`
    (`❀` ornaments). Ikhlas v3/v4 title'siz boshlanadi (p46 da title bor);
    2 ta `<Divider />` surahlar orasida. Faqat `size="sm"` fluid clamp
    `text-[clamp(0.72rem,3.6cqi,0.92rem)]`, `overflowWrap: anywhere`. Card
    bitta viewport (677px) ichida sig'adi.
  - Cut script: `tools/cut_p47.sh` (silencedetect -30dB/0.30s + ~0.10-0.20s
    buffers). Vaqtlar foydalanuvchi tinglovi orqali tasdiqlanmagan —
    mos kelmagan chunks `cut_p47.sh` orqali qayta kesilsin.
  - **Naming**: An-Nas elementlari p47 da `ns_*` (p46 dagi An-**Nasr** ham
    `ns_*` ishlatadi) — `make()` page-prefiks (`p46_*` / `p47_*`) tufayli
    global element store'da kollyziya yo'q, lekin renderer kodida har sahifa
    o'zining usePageElements scope'iga bog'liq.
- **Sahifa 50 tugallangan** (user-facing "52 / 52" — global indikatorda
  kitobning eng oxirgi sahifasi): Du'a al-Qunut (دعاء القنوت). 8 element:
  1 ta clickable sarlavha (`p50_01` دُعَاءُ الْقُنُوتِ) + 7 ta tabiiy clause
  (`p50_02..p50_08`). Matn — kitob rasmidan 1:1 transkripsiya, hech bir
  joyi qisqartirilmagan (kitobning 6 satrli oqar matni 7 ta semantik
  gapga bo'lingan).
  - **Layout (book-like flowing paragraph)**: Sarlavha (lg) ❀ ornament
    bilan + bitta `<p dir="rtl">` paragrafi ichida 7 ta inline clickable
    button. Phrase'lar orasi `·` (middle dot, opacity 50%) ajratgich.
    `leading-[2.1]` text-justify — kitobning oqar prose ko'rinishini
    aks ettiradi (oldingi "har gap o'z qatorida" pattern bekor qilindi —
    foydalanuvchi paragraf-style xohladi 2026-05-21).
  - **WebkitBoxDecorationBreak: clone** — agar phrase qatordan oshib
    ketsa, active background har ikkala qator qismida ham ko'rinadi
    (yoritilgan phrase bir butun bo'lib ajralib turadi).
  - **Audio yo'q** — Materiallar/sano tashahhud duolar/ papkasida audio
    yo'q va public/audio/ da Qunut audio'si yo'q. `audioUrl: null`,
    `start=end=0`. Lesson (`ls_duolar`) `audioUrl` ham null bo'lgani
    uchun click qilinganda audio ijro etilmaydi, faqat active highlight
    (yashil background + glow) ko'rinadi.
  - Audio qo'shilsa, `p50` element'lariga audioUrl/start/end va yangi
    `A.*` helper biriktirilishi kerak.
  - Card balandligi ~250px (mobile 375px viewport), bemalol sig'adi
    — paragrafga aylantirilganidan keyin avvalgi 7 qatordan ancha
    ixchamroq.
- **Sahifa 49 tugallangan** (user-facing "51 / 52" — global indikatorda
  oxirgidan oldingi sahifa; manba: `Materiallar/sano tashahhud duolar/49.jpg`):
  Salavotlar (اَلصَّلَوَاتُ) — Ibrahimiya
  salavotining 2 ta varianti (صَلِّ va بَارِكْ) + Du'a (اَلدُّعَاءُ) — namozdan
  keyingi panoh duosi (qabr azobi, hayot/o'lim fitnasi, Masih Dajjol).
  Jami 16 clickable element: 2 sarlavha + 5 (Block 1) + 5 (Block 2) + 4
  (Du'a). Audio yo'q (`ls_duolar.audioUrl = null`) — clickable elementlar
  active highlight beradi, audio ijro etilmaydi (start=end=0).
  - **Block 1 — Allohumma sallı** (`s1_p1..s1_p5`): اَللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ ،
    وَعَلَى آلِ مُحَمَّدٍ ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ ، وَعَلَى آلِ إِبْرَاهِيمَ ،
    إِنَّكَ حَمِيدٌ مَجِيدٌ.
  - **Block 2 — Allohumma bārik** (`s2_p1..s2_p5`): اَللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ ،
    o'xshash struktura (5 segment).
  - **Du'a** (`d_p1..d_p4`): اَللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ ، وَمِنْ
    عَذَابِ الْقَبْرِ ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ ، وَمِنْ شَرِّ الْمَسِيحِ الدَّجَّالِ.
    Kitobda 1 vergul (الْقَبْرِ dan keyin); pedagogik tartibda 4 segmentga
    bo'lingan.
  - Layout: 2 ta `title_*` (lg), `sm` body, dotted `Sep` divider 4 joyda
    (titles atrofida va salavotlar orasida). Block 1/2 layout: 2+2+1
    (yumshoq pair'lar + alohida `إِنَّكَ حَمِيدٌ مَجِيدٌ` tugatma). Du'a layout:
    d_p1 alohida + d_p2/d_p3 birga + d_p4 alohida. Card ~500px, viewport
    (946px) ichida bemalol sig'adi.
- Barcha sahifalar tugallangan: 11-21, 23, 24, 25, 26, 27, 28, 29, 30, 34, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
  (faqat 22, 31, 32, 33, 35, 36, 47 hali placeholder yoki yo'q).

### Tarkibiy ma'lumot

- `getAllBookPages()` — barcha 54 sahifani **global tartibda** qaytaradi:
  bobdan-bobga, darsdan-darsga, sahifa-sahifa.
- Har bir sahifaga `chapter`, `lesson`, `globalIndex`, `lessonPageIndex`
  metadata biriktirilgan.
- Lesson sahifasi state: yagona `currentPageIndex` (0..53) — qolgan barcha
  ma'lumot (bob, dars, audio) shu indekstdan derive qilinadi.

### Tuzilma (yuqoridan pastga)

1. **Header** (**`border-b border-white/10`** — aniq pastki chiziq; ichki qism
   `max-w-3xl mx-auto`, `pt-[max(env(safe-area-inset-top),1.25rem)] pb-3`) —
   joriy sahifaga qarab dinamik:
   - Chap: orqaga tugma (`ArrowLeft`, 40×40; `short:` 32×32)
   - O'rtada: **joriy** dars `lesson.title` + bob `chapter.title` (joriy
     sahifaning lesson/chapter'idan olinadi; bob nomi `short:hidden`)
   - O'ngda: mundarija tugmasi (`ListOrdered`, 40×40; `short:` 32×32)
2. **Sahifa ko'rinishi** (`HorizontalPager` + `PageView`):
   - Embla Carousel — barcha 54 sahifa bir ketma-ketlikda
   - **Har slide O'ZI vertikal scroll** (`data-page-slide={idx}`,
     `h-full overflow-y-auto overscroll-contain`) — scroll balandligi FAQAT
     shu sahifa kontenticha. Tashqi pager konteyner `overflow-hidden`.
     ⚠️ Scroll'ni tashqi konteynerga qaytarmang: embla qatori balandligi
     eng uzun slide (muqaddima ~3250px) bo'yicha bo'lib, qisqa sahifalarda
     ham pastga ulkan bo'sh scroll paydo bo'ladi (2026-06-10 da tuzatilgan bag).
   - **Adaptiv edge fade** (`maskImage` tashqi konteynerda) — JORIY slide'ning
     scroll holatiga qarab ikkala tomonda alohida:
     - **Tepa fade**: faqat `scrollTop > 4` bo'lganda (yuqorida content yashirin
       bo'lsa). Aks holda content header chizig'iga toza tegadi.
     - **Pastki fade**: faqat content sahifa tagiga sig'masa (`scrollTop +
       clientHeight < scrollHeight - 4`). Qisqa sahifalarda (masalan, Madlar)
       pastki fade yo'q — content kartasi to'liq, toza ko'rinadi.
     - Lesson page effekt joriy slide'ni `[data-page-slide="${idx}"]` orqali
       topib scroll/ResizeObserver listener'larini biriktiradi.
   - Konfig: `align: "center"`, `duration: 28`, `containScroll: "trimSnaps"`
3. **Sahifa indikatori** (`PageIndicator`) — butun kitob bo'yicha, **bitta
   qator**: `‹` chevron + progress bar (bosib/sudrab sahifaga o'tish) +
   "X / 54" (bar yonida inline) + `›` chevron. `short:` rejimda chevronlar
   28×28 va paddinglar kichrayadi.
4. **Audio nazorati** (`AudioControls`) — joriy sahifaning **lesson** ga
   tegishli audiodan foydalanadi. **BITTA qatorli bar** (hamma rejimda):
   prev/play/next + joriy vaqt + progress + umumiy vaqt + loop (~54px).
   `short:` (telefon yonbosh) rejimida o'lchamlar/paddinglar kichrayadi.
   - **Tezlik tugmalari YO'Q** (foydalanuvchi qarori 2026-06-10: "umuman
     kerak emas"). Engine doim 1x (`audio.setSpeed(1)` lesson page'da);
     eski saqlangan 0.5x/1.5x qiymatlar ham qo'llanmaydi. Tezlik UI'sini
     qaytarmang.
   - Progress chiziq vizual ingichka (h-1), lekin bosish maydoni `py-2`
     bilan kengaytirilgan.

### Sahifa o'tishi va URL sinxronizatsiyasi

- Lesson chegarasidan o'tilganda — `router.replace()` orqali URL yangilanadi
  (history clutter qilmaslik uchun `replace`, `push` emas).
- Audio source ham yangi lessonniki bo'ladi (`audio.loadAudio` qayta chaqiriladi).
- Progress (lastChapterId, lastLessonId, lessonPageIndex) avtomatik saqlanadi.

### Sahifani almashtirish usullari

- **Swipe** (chap/o'ng) — Embla
- **Chevron tugmalar** — PageIndicator chap/o'ngida
- **Progress bar** — bosish yoki sudrash bilan istalgan sahifaga
- **Klaviatura**: `←` / `→` (TOC ochiq bo'lsa — ishlamaydi)
- **TOC drawer** — istalgan dars/sahifaga sakrash

Sahifa o'zgarganda: audio to'xtaydi, faol element tozalanadi, progress saqlanadi.

## Mundarija — yagona `BookToc` komponenti (2026-06-10 redesign)

> `/darslar` sahifasi va lesson ichidagi `TocSheet` drawer **bitta**
> `src/components/toc/BookToc.tsx` komponentidan quriladi (variant prop).
> Eski `ChapterAccordion`/`LessonListItem` O'CHIRILGAN — qaytarmang.

### Qat'iy qoidalar

- **Sahifa raqamlari DOIM GLOBAL (1..52)** — reader'dagi "X / 52" bilan 1:1.
  Yagona manba: `getBookOutline()` (data-provider) + `useBookToc()` hook.
  `lesson.pageCount` TOC'da ISHLATILMAYDI (PAGE_MAP — yagona haqiqat).
  URL kontrakti o'zgarmagan: `?page={lessonPageIndex}` (lesson-local),
  faqat KO'RSATILADIGAN raqam global.
- **Bir darsli boblar bitta birlashgan qator** (bob ikonka + bob nomi +
  diapazon "21–23") — "Tashdid → Tashdid" takrori taqiqlangan.
  Ko'p darsli boblar: uppercase bob sarlavhasi (ikonka 16px + diapazon,
  hammasi tugagan bo'lsa CheckCircle2 12px) + ichki dars qatorlari (pl-11).
- **Qator anatomiyasi**: nom (chap) + leader dots (nuqtali chiziq,
  border-text-muted/30) + o'ng klaster: Volume2 12px (audio bo'lsa) +
  Check 14px (tugagan) + global raqam. Joriy qator: chap 3px primary bar +
  `bg-primary/20` fon + raqam o'rniga **pill** (bg-primary, oq, joriy
  global sahifa).
- **Bob ikonkalari faqat lucide** — `src/components/toc/chapter-icons.ts`
  xaritasi (BookOpen/Type/AudioLines/Repeat2/Quote/PenLine/Link2/WholeWord/
  ScrollText/HandHeart). mock-data emoji `icon` UI'da ishlatilmaydi (iOS
  export uchun saqlangan).
- **Tugagan dars** holati: `completedLessons` YOKI o'qib o'tib ketilgan
  (`globalEnd < resumeGlobalPage`) — fallback derivatsiya `useBookToc`da.
  Yozish nuqtasi: lesson sahifasida dars oxirgi sahifasiga yetilganda
  `markLessonComplete` chaqiriladi.
- Light remap'da mavjud alpha classlardangina foydalanish (bg-white/5,
  bg-white/10, bg-primary/20, border-white/5) — yangi arbitrary alpha
  qo'shilsa globals.css remap'iga ham qo'shing.

### /darslar sahifasi

H1 "Mundarija" (t("contents")) + subtitle "52 sahifa · 10 bob" (dinamik) +
`ResumeCard` (glass-green: Play ikonka, DAVOM ETING/BOSHLASH micro-label,
dars nomi, "Sahifa X / 52 · N%", h-1 progress bar, → resumeHref) +
bitta glass kartada `<BookToc variant="page" />`.

### TocSheet drawer

- Trigger/pozitsiya/yopish: avvalgidek (o'ngdan slide-in, backdrop, Esc).
- Header: "Mundarija" + "Sahifa X / 52" (reader bilan aynan) + header ostida
  h-1 progress chizig'i.
- Body: `<BookToc variant="sheet" currentLessonId currentGlobalPage
  onNavigate={onClose} />`. Sheet farqlari: sahifa **chiplari faqat JORIY
  dars ostida** (36×36, yorlig'i GLOBAL raqam, href `?page={i}`), ochilganda
  joriy qator auto-scroll (320ms dan keyin, instant, block:center).
- Props: `currentGlobalPage` = lesson sahifasidagi `currentPageIndex + 1`.
  (`currentChapterId`/`currentLessonPageIndex` prop'lari olib tashlangan.)

### BookHeroCard (/home)

`useBookToc()` dan oladi (resumeHref/resumeGlobalPage/totalPages) — eski
pageCount-yig'indi hisobi (52/54 nomuvofiqlik bergan) taqiqlangan.

## Sozlamalar sahifasi (/sozlamalar) — 2026-06-10 redesign

Sahifa to'liq qayta qurilgan (`src/app/(tabs)/sozlamalar/page.tsx`).
Eski versiyaga QAYTARMANG: emoji ikonkalar (🌙☀️📱/📖🔒ℹ️), range-slider,
sahifa ichidagi `ABOUT_LABELS` lokalizatsiya konstanti — bekor qilingan.

- **Har bo'lim = GlassCard + `SectionHeader`** (lokal komponent): 36×36
  `bg-primary/20` ikonka chipi (lucide) + sarlavha + 1 qatorli tavsif.
  Tavsiflar i18n'da: `repeat_desc`, `language_desc`, `theme_desc`,
  `font_size_desc`. Tavsifsiz sozlama qo'shmang — "tushunarsiz" UX
  foydalanuvchi tomonidan rad etilgan.
- **Takrorlash soni — stepper** (−/+, 44×44, disabled holatlar bilan),
  markazda katta `N×` qiymat. Slider EMAS. Ostida hint:
  `repeat_reset_hint` ("Ilova qayta ochilganda 1× ga qaytadi") — reset
  xatti-harakati endi UI'da oshkor.
- **Til — vertikal ro'yxat** (radio uslubi): har til o'z qatorida, tanlangani
  `bg-primary/20` + to'liq yashil doira ichida `Check`; tanlanmaganlar bo'sh
  doira. Ikki o'zbek yozuvi sub-label bilan ("Lotin yozuvi"/"Кирилл ёзуви").
- **Ko'rinish (tema)** — 3 segment tugma lucide ikonkalar bilan: `Sun`/
  `Moon`/`MonitorSmartphone`. Emoji TAQIQLANGAN. i18n: uz'da "theme" =
  **"Koʻrinish"** ("Mavzu" xato — "topic" ma'nosi).
- **Shrift o'lchami** — 3 tugma, "A" harfi rem o'lchamlarda (0.8125/1/1.25),
  pastki yorliqlar `t("small"/"medium"/"large")` orqali (qattiq o'zbekcha
  matn bug'i tuzatilgan).
- **Ilova haqida** — header'da `app_name · vX.Y.Z`, ostida 3 qator (lucide:
  `ShieldCheck`/`FileText`/`Info` + ChevronRight) → `LEGAL_CONTENT` modal.
  Yorliqlar i18n: `privacy_policy`/`terms_of_use`/`about_app`. Versiya
  konstanti: `APP_VERSION` (page.tsx).
- **Footer** — markazda `app_name · vVERSION` + `footer_company`
  (barcha lokallarda "VIPADS LLC" — 2026-06-10 rebrand, eski MYSTAR
  nomini QAYTARMANG). Murojaat email: support@vipads.uz
  (legal-content.ts).
- **Modal** — `createPortal(document.body)` MAJBURIY: `(tabs)/layout.tsx`
  dagi `main` maskImage stacking context yaratadi — portal'siz modal pastki
  fade'ga tushadi va tab bar (z-50) ostida qoladi. Overlay `z-[60]`.
  Bottom-sheet uslubi (mobilda pastdan, `sm:` markazda), drag-handle,
  Escape yopadi, ochiq payt `body.overflow=hidden`, kontent scrollTop
  ochilishda 0 ga reset (`modalScrollRef`), safe-area pastki padding,
  `role="dialog" aria-modal`.

## Sozlamalar defaultlari (foydalanuvchi qarorlari)

- **Tema: DOIM light default** (2026-06-10). DEFAULT_SETTINGS.theme="light",
  layout.tsx SSR `data-theme="light"`, noma'lum/buzilgan qiymat ham light'ga
  tushadi (SettingsProvider guard), meta theme-color/manifest/statusBar light.
  Dark/system — faqat foydalanuvchi tanlovi bilan.
- **Takrorlash soni: HAR OCHILISHDA 1** (2026-06-10). repeatCount
  sessiyalararo saqlanmaydi — SettingsProvider isLoaded'da 1 ga reset
  qiladi. Sessiya ichida o'zgartirish ishlaydi. Bu xatti-harakatni
  o'zgartirmang (persist qilib qo'ymang).
- **Tezlik: doim 1x** — tezlik UI'si olib tashlangan (AudioControls
  bo'limiga qarang).

## Vizual tamoyillar

- **DEFAULT TEMA = LIGHT, har doim** (foydalanuvchi qarori 2026-06-10):
  - `globals.css` da baza qiymatlar (`@theme`, `.glass*`, scrollbar,
    white-alpha utility remap'lari) — **light**. Dark faqat
    `html[data-theme="dark"]` override orqali. `data-theme` atributi
    yo'q/buzilgan bo'lsa ham ilova light ochiladi (utility remap'lar
    `html:not([data-theme="dark"])` selektorida).
  - `SettingsProvider` noma'lum theme qiymatini light'ga tushiradi va
    `meta[name="theme-color"]` ni faol temaga moslab yangilaydi
    (light `#f0f7f2` / dark `#071a0e`). `useLocalStorage` eski saqlangan
    obyektni defaultlar bilan birlashtiradi (theme maydoni yo'q bo'lsa
    "light" qoladi).
  - `layout.tsx`: `data-theme="light"` SSR, `themeColor: "#f0f7f2"`,
    `statusBarStyle: "default"`. `manifest.json`: `background_color:
    "#f0f7f2"` (light splash). Dark/system tanlovlari sozlamalarda
    saqlanadi — faqat foydalanuvchi ataylab tanlasa qo'llanadi.
- **Glass effekti**: `glass` (neytral) va `glass-green` (vurg'u uchun) classlari.
- **Asosiy rang**: `--color-primary` (yashil, dark/light theme uchun farqli).
- **Ikonkalar**: faqat `lucide-react`.
- **Yumshoqlik**: o'tishlar `transition-*` class'lari, `active:scale-[0.95-0.98]`
  feedback uchun.
- **Tugma o'lchamlari**: minimal touch target — 36×36 (kichik), 40×40 (asosiy).
- **Border-radius**: kartalar `rounded-[28px]`, tugmalar `rounded-2xl` yoki
  `rounded-xl`.

## 🛑 Element tanlanganda — boshqalar XIRA QILINMAYDI

**Qoida (foydalanuvchi qarori 2026-05-19)**: Foydalanuvchi sahifadagi qaysidir
elementga bossanda — **faqat o'sha element belgilanadi** (yashil background,
border, scale, glow). **Qolgan elementlar opacity'si o'zgarmaydi** — ular
ham to'liq ko'rinib turaveradi.

### Nima uchun

Avval `hasActive && !isActive ? 0.25 : 1` pattern bilan boshqa elementlar
xiralashar edi (visual focus). Foydalanuvchi buni rad etdi: kontekst
yo'qoladi, o'qish jarayonida boshqa so'zlarni ko'rib turish kerak.

### Texnik

`RenderedPage.tsx` va `ElementOverlay.tsx` da:
- ❌ **YOZMANG**: `opacity: hasActive && !isActive ? 0.25 : 1`
- ❌ **YOZMANG**: `opacity: dimmed ? 0.35 : 1` (yoki `ruleDimmed`/`signDimmed`/`exDimmed`)
- ❌ **YOZMANG**: `const dimmed = hasActive && !isActive;` (faqat opacity uchun
  ishlatilgan)
- ✅ **TO'G'RI**: active element uchun `backgroundColor`, `border`, `boxShadow`,
  `transform: scale(...)` — boshqalari uchun **hech narsa** (opacity 1 default).

### Yangi sahifa qurayotganda

Element button'larida `style={...}` ichida shartli opacity **MUTLAQO**
qo'ymang. Faqat:
- `backgroundColor: isActive ? "var(--color-primary)" : "transparent"`
- `color: isActive ? "#ffffff" : "var(--color-text-main)"`
- `boxShadow`, `transform`, `border` — active uchun, aks holda neutral.

Decorative static opacity (`opacity: 0.7` "=" belgisi uchun va h.k.) — bu
boshqa narsa, qoidaga ta'sir qilmaydi.

## Mas'uliyat / o'zgartirish qoidalari

- Bu hujjatdagi UI qarorlarini **foydalanuvchi tasdiqlagan**. O'zboshimcha
  o'zgartirmang.
- Yangi sahifa qo'shganda — yuqoridagi tamoyillarga (header, navigatsiya,
  rang) amal qiling.
- Foydalanuvchi yangi UI qarori bersa — shu yerga **darhol** yozib qo'ying,
  toki keyingi suhbatda u esda qolsin.

---

## 🌐 Offline (PWA) arxitekturasi — 2026-06-10

Sayt **to'liq offline** ishlaydi. Yondashuv jahon tajribasi tadqiqotidan
keyin tanlangan (Serwist = Workbox'ning faol davomchisi; next-pwa 2022 dan
beri tashlab qo'yilgan; quran.com'ning 206-xatosi va Safari Range talabi
hisobga olingan).

### Komponentlar

| Fayl | Vazifa |
|------|--------|
| `src/app/sw.ts` | Service worker manbasi (Serwist). esbuild bilan alohida bundle — `@/` alias ISHLATMANG |
| `src/app/serwist/[path]/route.ts` | SW'ni `/serwist/sw.js` da xizmat qiluvchi route handler; precache manifest + 18 sahifa HTML |
| `src/lib/offline/media-manifest.ts` | Ilova ishlatadigan BARCHA media URL'lar (elements.ts + mock-data'dan). Yangi dars qo'shilsa avtomatik tushadi |
| `src/lib/offline/downloader.ts` | Fon yuklovchi: IndexedDB ledger (`ms-offline` DB), parallellik 4, sessiyalararo davom, audio ijroda pauza |
| `src/lib/offline/useOfflineDownload.ts` | React hook (useSyncExternalStore) |
| `src/components/layout/PwaManager.tsx` | Yuklovchini start qiladi (+4s), SW yangilanish toasti |
| `src/components/sozlamalar/OfflineCard.tsx` | Sozlamalar'dagi progress kartasi |

### Kesh bucketlari

- **`serwist-precache-*`** (versiyalangan, har deploy yangilanadi):
  `/_next/static` JS/CSS + 18 route HTML + ikonkalar (~1.4 MB).
- **`ms-media-v1`** (BARQAROR — deploy'da O'CHMAYDI): shriftlar + barcha
  audio (~122 MB, 1762 fayl). Fon yuklovchi to'ldiradi, SW o'qiydi.

### Qat'iy qoidalar

1. **Media'ni precache'ga QO'SHMANG** — `route.ts` dagi `globPatterns`
   override'i ataylab `public/**/*` ni chiqarib tashlagan. Aks holda SW
   o'rnatilishi 100+ MB yuklashga bloklanadi.
2. **206 javob hech qachon keshlanmaydi** (`CacheableResponsePlugin
   statuses: [200]`), Range so'rovlarga `RangeRequestsPlugin` keshdagi
   to'liq fayldan 206 sintez qiladi — busiz Safari'da offline audio
   ishlamaydi.
3. **`skipWaiting: false`** — yangilanish foydalanuvchi tasdig'i bilan
   (PwaManager toast). O'zgartirmang: avtomatik skipWaiting sessiya
   o'rtasida eski HTML/yangi chunk ziddiyatini keltiradi.
4. **`ms-media-v1` nomini o'zgartirmang** — o'zgartirilsa foydalanuvchilar
   122 MB ni qayta yuklaydi.
5. Yangi audio/sahifa qo'shilsa hech narsa qilish shart emas:
   media-manifest elements.ts/mock-data'dan o'zi oladi, manifest signature
   o'zgaradi, yuklovchi yangi fayllarni olib, eskirganlarini tozalaydi.
6. `/images/N.jpg` manifestda YO'Q — barcha sahifalar RenderedPage bilan
   chiziladi (rasm fallback o'lik kod). Renderer'siz sahifa qo'shilsa
   media-manifest.ts ga rasmini qo'shing.
7. Dev rejimda SW o'chiq (`SerwistProvider disable`), yuklovchi ham
   ishlamaydi — PWA testlari faqat `next build && next start` da.

### Sinash (production)

```bash
npx next build && npx next start
# Brauzerda: DevTools → Application → Service Workers (/serwist/sw.js)
# Sozlamalar sahifasida progress 1762/1762 bo'lguncha kutish
# DevTools → Network → Offline → sahifalar va audio ishlashi kerak
```

---

## 📦 Yagona kontent paketi (3 qism) — 2026-06-10

Barcha platformalar (Web/iOS/Android) uchun kontent `public/content/` paketi
orqali tarqatiladi. To'liq spetsifikatsiya: **README.md** (asosiy hujjat).

- Generator: `tools/build-content.mjs` (`npm run content`) — elements.ts,
  mock-data.ts, types.ts, muqaddima.ts, legal-content.ts, i18n, globals.css,
  public/audio, public/fonts dan quradi.
- Tekshiruv: `tools/verify-content.mjs` (`npm run content:verify`) — sha256
  yaxlitlik + **web fon yuklovchisi bilan 1:1 audio paritet** + i18n paritet.
- 3 qism: `sahifalar/book.json`, `audiolar/audio-manifest.json` (13 pack,
  1757 fayl, har faylga sha256), `sozlamalar/{i18n,legal,settings}.json`.
- Master: `manifest.json` — `contentVersion` (platformalar shuni solishtiradi),
  `schemaVersion`, `contentHash`.

**Qoidalar:**
1. Kontent o'zgarsa (yangi sahifa/audio/i18n kalit): `CONTENT_VERSION` ni
   build-content.mjs da oshiring → `npm run content && npm run content:verify`
   → bitta commit bilan push. Bu QILINMASA mobil ilovalar yangilanishni ko'rmaydi.
2. MUQADDIMA_PARAGRAPHS endi `src/lib/data/muqaddima.ts` da (data modul) —
   RenderedPage.tsx undan import qiladi. JSX ichiga qaytarib YOZMANG.
3. Eski `tools/export-ios-json.mjs`, `tools/export-ios.ts`, `public/ios/`
   O'CHIRILGAN — qaytarmang. iOS/Android plan hujjatlari (`iso prmt/`,
   `android prmt/`) yangi `public/content/` URL'lariga yangilangan.
4. book.json sxemasi Swift/Kotlin Codable modellariga mos — sxemani o'zgartirsangiz
   `schemaVersion` oshiring va plan hujjatlarini yangilang.
5. i18n'ga yangi kalit qo'shsangiz — 4 til faylida ham qo'shing (verify yiqiladi aks holda).

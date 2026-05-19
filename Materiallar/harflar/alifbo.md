# Alifbo (sahifa 3, kitobda — sahifa 4)

Bu sahifa arab alifbosining 28 harfini joriy etadi. Har bir harf
**aynan o'z talaffuziga mos audio bo'lagi** bilan bog'lanadi.

## Manbalar

- **Asl audio (backup)**: `audiosi/03. alifbo.mp3` (~2 daqiqa, butun sahifa)
- **Bo'lingan audio chunklar**: `edit_audios/03_alifbo/` — bu papkadagi
  fayllar app tomonidan ishlatiladi (`/audio/edit/03_alifbo/...`).
- ~~PDF qo'llanma~~ — `audio_qoidalar/03_04_alifbo va harakatlar_final.pdf`'dagi
  vaqtlar ko'plab xatolarga ega chiqdi (vowel attack/fricative tail kesib
  yuborilgan, shin esa butunlay noto'g'ri joyga yo'naltirilgan). **Endi
  PDF'dan foydalanmaymiz** — quyidagi jadvaldagi vaqtlar tasdiqlangan.

## Talaffuz qoidasi

> Harfni joy-joyidan chiqarishlik uchun chiqarmoqchi bo'layotgan harfimizni
> sukunli qilib oldiga fathali alif olib kelamiz. (Misol uchun: ab, اب; اج; اس)

Audioda har bir harf "اX" tarzida (alif + harf) talaffuz qilinadi. Elementga
**faqat o'sha harfning o'zi** belgilanadi — alif faqat mahrajni aniq chiqarish
uchun yordamchi.

## Audio bo'laklari (chunks)

### Intro (sahifa tepasidagi klikli elementlar)

| El. | Fayl                              | Boshlangich | Tugash    | Davomiyligi | Mazmuni |
|-----|-----------------------------------|-------------|-----------|-------------|---------|
| i01 | `intro_a_auzubillah.mp3`          | 7.090 s     | 12.521 s  | 5.43 s      | أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ |
| i02 | `intro_b_bismillah.mp3`           | 13.263 s    | 18.611 s  | 5.35 s      | بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ |
| i03 | `intro_02_explain_1.mp3`          | 22.040 s    | 30.840 s  | 8.80 s      | Qoida: "Harfni joy-joyidan chiqarishlik uchun..." |
| i04 | `intro_03_misol.mp3`              | 32.439 s    | 35.520 s  | 3.08 s      | "Misol uchun اب. اج, اس" |
| i05 | `intro_04_explain_2.mp3`          | 37.640 s    | 42.140 s  | 4.50 s      | "Shunda harfni joyidan chiqarishlik ham qulay..." |

Original `intro_01_bismillah.mp3` (7.140–18.480, 11.34s) auzubillah+bismillah
blokini o'z ichiga oladi — ikkiga bo'lindi (12.42-12.90 ichidagi sukunat bo'yicha).
Barcha 5 element klikli, Page3 da `SentenceBtn` / `RuleBlock` komponentlari bilan renderlanadi.

> **Eslatma**: PDF transkripsiyasida arabcha matnlar harakatlarsiz yozilgan
> (`بسم الله...`), lekin loyihada doimo **harakatli** (diacritized) shaklni
> ishlating: `بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ`. Bu app'dagi vizual
> ko'rinishga ham, Qur'onni to'g'ri o'qish maqsadiga ham mos.

### Harflar (tasdiqlangan vaqtlar)

| El. | Arabcha | Lotin | Fayl              | Asl audio: boshlangich → tugash | Davomiyligi |
|-----|---------|-------|-------------------|---------------------------------|-------------|
| 01  | ا       | Alif  | `e01_alif.mp3`    | 46.230 → 46.640                 | 0.41 s      |
| 02  | ب       | Ba    | `e02_ba.mp3`      | 48.990 → 49.640                 | 0.65 s      |
| 03  | ت       | Ta    | `e03_ta.mp3`      | 51.710 → 52.220                 | 0.51 s      |
| 04  | ث       | Tha   | `e04_tha.mp3`     | 54.530 → 55.000                 | 0.47 s      |
| 05  | ج       | Jim   | `e05_jim.mp3`     | 57.270 → 57.780                 | 0.51 s      |
| 06  | ح       | Ha    | `e06_ha.mp3`      | 60.010 → 60.700                 | 0.69 s      |
| 07  | خ       | Xo    | `e07_xo.mp3`      | 62.570 → 63.840                 | 1.27 s      |
| 08  | د       | Dal   | `e08_dal.mp3`     | 65.469 → 66.900                 | 1.43 s      |
| 09  | ذ       | Zal   | `e09_zal.mp3`     | 68.250 → 68.740                 | 0.49 s      |
| 10  | ر       | Ro    | `e10_ro.mp3`      | 70.270 → 71.867                 | 1.60 s      |
| 11  | ز       | Za    | `e11_za.mp3`      | 73.690 → 74.679                 | 0.99 s      |
| 12  | س       | Sin   | `e12_sin.mp3`     | 76.594 → 77.646                 | 1.05 s      |
| 13  | ش       | Shin  | `e13_shin.mp3`    | 79.354 → 80.460                 | 1.11 s      |
| 14  | ص       | Sod   | `e14_sod.mp3`     | 82.317 → 83.376                 | 1.06 s      |
| 15  | ض       | Dod   | `e15_dod.mp3`     | 85.290 → 87.220                 | 1.93 s      |
| 16  | ط       | To    | `e16_to.mp3`      | 88.350 → 89.639                 | 1.29 s      |
| 17  | ظ       | Zo    | `e17_zo.mp3`      | 91.250 → 92.190                 | 0.94 s      |
| 18  | ع       | Ayn   | `e18_ayn.mp3`     | 93.546 → 94.420                 | 0.87 s      |
| 19  | غ       | G'ayn | `e19_gayn.mp3`    | 96.390 → 97.300                 | 0.91 s      |
| 20  | ف       | Fa    | `e20_fa.mp3`      | 99.570 → 100.560                | 0.99 s      |
| 21  | ق       | Qof   | `e21_qof.mp3`     | 102.930 → 103.480               | 0.55 s      |
| 22  | ك       | Kaf   | `e22_kaf.mp3`     | 105.750 → 106.260               | 0.51 s      |
| 23  | ل       | Lam   | `e23_lam.mp3`     | 109.090 → 109.760               | 0.67 s      |
| 24  | م       | Mim   | `e24_mim.mp3`     | 111.870 → 112.560               | 0.69 s      |
| 25  | ن       | Nun   | `e25_nun.mp3`     | 114.290 → 115.780               | 1.49 s      |
| 26  | و       | Vav   | `e26_vav.mp3`     | 118.250 → 119.580               | 1.33 s      |
| 27  | ه       | He    | `e27_he.mp3`      | 121.390 → 122.060               | 0.67 s      |
| 28  | ي       | Ya    | `e28_ya.mp3`      | 124.332 → 125.143               | 0.81 s      |

## Bu vaqtlar qanday topilgan (metodologiya)

1. **PDF'dan boshlangan** — 80% aniqlikdagi qo'llanma sifatida.
2. **Sukunat aniqlash** (`silencedetect=noise=-40dB:duration=0.10`) bilan
   asl audioning sound boundary'lari topilgan.
3. **Vowel attack + fricative tail buffer** — PDF vaqtlariga **-50 ms / +100 ms**
   buffer qo'shilgan ("ashhh" kabi cho'zilgan tovushlar to'liq saqlanishi uchun).
4. **Maxsus tuzatishlar** (PDF noto'g'ri yo'naltirgan):
   - **shin (ش)** — PDF "اش اص" deb 82.36 ga yo'naltirgan, lekin u yerda
     **faqat sod**. Shin'ning haqiqiy joyi: 79.354 → 80.460 (PDF butunlay
     tushirib qoldirgan).
   - **sod (ص)** — to'liq blok 82.317 → 83.376 (PDF kalta deb yozgan).
   - **ar/az/as, zo/ayn** — bir blokda PDF'da, sukunat aniqlash bilan
     ajratilgan.
   - **ya (ي)** — PDF kalta yozgan, kengaytirilgan.
5. **Foydalanuvchi tomonidan eshitib tekshirilgan** — har bir muammoli harf
   `afplay` orqali tasdiqlangan.

## Bo'laklarni qayta yaratish

```bash
bash tools/cut_alifbo.sh
cp -p Materiallar/harflar/edit_audios/03_alifbo/*.mp3 \
      muallimus-soniy/public/audio/edit/03_alifbo/
```

## Mavjud bo'lmagan elementlar

Sahifa 3 da yana 9 element bor (29-37) — harakatlar va Ra harflari. Ular boshqa
audio fayllarni (`04. harakat.mp3`, `05. ro.mp3`) ishlatadi va alohida
ishlanadi.

## Texnik

- **Codec**: MP3 / 192 kbps (libmp3lame, sample-accurate)
- **Element-audio bog'lanishi**: `src/lib/data/elements.ts` da `p3` array,
  har element o'z `audioUrl` (chunk fayli) bilan, `start: 0`, `end: chunk_dur`.
- **Asl audio backup**: `public/audio/03. alifbo.mp3` saqlanadi — backup va
  audio control bar'da to'liq darsni ijro qilish uchun.

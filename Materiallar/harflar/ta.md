# Ta (ت) — sahifa 4 amaliyoti

Kitob sahifa 4 ning uchinchi bo'limi: Ta harfining harakatlari va so'zlari.

## Manbalar

- **Asl audio (backup)**: `audiosi/08. ta.mp3` (~50 s)
  - 0–17 s: sahifa 4 Ta bo'limi (harakatlar, mat/mit/mut, tamar, tarir)
  - 20–49 s: **sahifa 5** Ro davom so'zlari (zurta, amarta, … muricum)
- **PDF qo'llanma**: `../audio_qoidalar/08._ta_final.pdf`
- **Bo'lingan chunklar**: `edit_audios/08_ta/` — **17 fayl**
  (t01–t08 p4 uchun, t09–t17 p5 Ro davom uchun)
- **App URL prefix**: `/audio/edit/08_ta/`

## Audio bo'laklari (chunks)

### Harakatlar (pozitsion shakllar bilan)

| El. (p4) | Arabcha | Lotin | Fayl | Asl audio: vaqt | Davomiyligi |
|----------|---------|-------|------|------------------|-------------|
| 33 | تَ    | Ta (boshida)   | `t01_fatha.mp3` | 1.690 → 2.450 | 0.76 s |
| 34 | ـتِـ | Ti (oʻrtasida) | `t02_kasra.mp3` | 2.700 → 3.600 | 0.90 s |
| 35 | ـتُ  | Tu (oxirida)   | `t03_damma.mp3` | 4.509 → 5.100 | 0.59 s |

### Birikmalar va so'zlar

| El. | Arabcha | Lotin | Fayl | Vaqt | Davomiyligi |
|-----|---------|-------|------|------|-------------|
| 36 | مَتْ  | Mat   | `t04_mat.mp3`   | 6.410 → 7.119   | 0.71 s |
| 37 | مِتْ  | Mit   | `t05_mit.mp3`   | 8.729 → 9.419   | 0.69 s |
| 38 | مُتْ  | Mut   | `t06_mut.mp3`   | 11.169 → 11.900 | 0.73 s |
| 39 | تَمَرْ | Tamar | `t07_tamar.mp3` | 13.989 → 14.879 | 0.89 s |
| 40 | تَرِرْ | Tarir | `t08_tarir.mp3` | 16.471 → 17.324 | 0.85 s |

### Ro davom so'zlari (sahifa 5) — 9 ta

Kitob sahifa 5 ning yuqori bo'limi: Ro harfining "ta" qo'shimchali (zurta,
amarta, …) so'zlari. Bu so'zlar `08. ta.mp3` ning **20.4s+** qismida
yozilgan, lekin mavzusi Ra harfi haqida.

Row 1 — turli shaxs/jinsda "amara" fe'l shakllari; Row 2 — plural ("sizlar") shakllari.

| El. (p5) | Arabcha | Lotin | Shaxs | Fayl | Vaqt |
|----------|---------|-------|-------|------|------|
| 01 | زُرْتَ    | Zurta   | sen (m)  | `t09_zurta.mp3`   | 20.398 → 21.616 |
| 02 | اَمَرْتِ  | Amarti  | sen (f)  | `t10_amarti.mp3`  | 23.356 → 24.599 |
| 03 | مَرَرْتُ  | Marartu | men      | `t11_marartu.mp3` | 25.879 → 27.303 |
| 04 | اُمِرْتُ  | Umirtu  | men (p)  | `t12_umirtu.mp3`  | 30.116 → 31.395 |
| 05 | اَمَرَتْ  | Amarat  | u (f)    | `t13_amarat.mp3`  | 33.432 → 34.503 |
| 06 | اَمَرْتُمْ | Amartum | sizlar   | `t14_amartum.mp3` | 36.968 → 38.382 |
| 07 | اُمِرْتُمْ | Umirtum | sizlar p | `t15_umirtum.mp3` | 40.429 → 41.904 |
| 08 | مَرَرْتُمْ | Mararum | sizlar   | `t16_mararum.mp3` | 43.786 → 45.470 |
| 09 | مُرِرْتُمْ | Murirum | sizlar p | `t17_murirum.mp3` | 47.364 → 48.969 |

## Metodologiya

1. **PDF qo'llanma** — 8 ta timing bergan.
2. **Pozitsion shakllar (Ta)** kitob shakllariga muvofiq: تَ (boshida), ـتِـ (o'rtasida), ـتُ (oxirida). Ta connector harf.
3. **Muhim tuzatish**: **تَرِرْ (Tarir, kasra)** — rasmda vizual تَرَرْ ga o'xshab ko'rinadi, lekin **audio talaffuzi "tarir"** ekanligi foydalanuvchi eshituvi bilan tasdiqlangan. Shuning uchun harakat kasra, sukun emas. Bu — **rasmning noaniq ko'rinishidan ko'ra, audio talaffuzi hal qiluvchi** ekanligiga misol.

## Bo'laklarni qayta yaratish

```bash
bash tools/cut_p4.sh
cp -p Materiallar/harflar/edit_audios/08_ta/*.mp3 \
      muallimus-soniy/public/audio/edit/08_ta/
```

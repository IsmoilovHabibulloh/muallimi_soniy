# Shin (ش) — 9-sahifa, pastki qism

**Manba**: `public/audio/18. sha.mp3` (1:03.74)
**Chunklar**: `Materiallar/harflar/edit_audios/18_sha/`, `muallimus-soniy/public/audio/edit/18_sha/`
**PDF qo'llanma**: `Materiallar/audio_qoidalar/18._sha_final.pdf`
**Rasm**: `Materiallar/harflar/9.jpg` (pastki yarmi)

## Tarkib (24 element)

Pozitsion shakllar (Shin — connector harf):
- Boshida → `شَ`
- Oʻrtasida → `ـشِـ`
- Oxirida → `ـشُ`

### Header (3)
| # | Arab | Uzbek | Start | End | Chunk |
|---|------|-------|-------|-----|-------|
| 01 | شَ | Sha (boshida) | 1.164 | 1.996 | s01_fatha.mp3 |
| 02 | ـشِـ | Shi (oʻrtasida) | 2.413 | 3.046 | s02_kasra.mp3 |
| 03 | ـشُ | Shu (oxirida) | 3.560 | 4.244 | s03_damma.mp3 |

### Row 1 (6 so'z) — 2 harfli birikmalar
| # | Arab | Uzbek | Start | End |
|---|------|-------|-------|-----|
| 04 | رَشْ | Rash | 6.498 | 7.357 |
| 05 | بُشْ | Bush | 8.637 | 9.571 |
| 06 | شَرْ | Shar (yomon) | 10.777 | 11.569 |
| 07 | شَقْ | Shaq | 12.846 | 13.601 |
| 08 | شَمْ | Sham | 14.793 | 15.752 |
| 09 | شَكْ | Shak (shubha) | 16.803 | 17.443 |

### Row 2 (6 so'z) — masdar ismlari (damma ending)
| # | Arab | Uzbek | Start | End |
|---|------|-------|-------|-----|
| 10 | بِشْرُ | Bishru (quvonch) | 18.817 | 20.056 |
| 11 | شِرْبُ | Shirbu (ichish) | 21.299 | 22.498 |
| 12 | شَهْرُ | Shahru (oy) | 23.744 | 25.075 |
| 13 | نَشْرُ | Nashru (nashr) | 26.447 | 27.669 |
| 14 | شُكْرُ | Shukru (shukr) | 28.823 | 30.177 |
| 15 | شُرْبُ | Shurbu (ichimlik) | 31.454 | 32.652 |

### Row 3 (5 so'z) — ism shakllari
| # | Arab | Uzbek | Start | End |
|---|------|-------|-------|-----|
| 16 | مَشْرَبْ | Mashrab (ichimlik joyi) | 34.372 | 35.777 |
| 17 | مَشْرِبْ | Mashrib (ichuvchi) | 37.060 | 38.420 |
| 18 | مَشْرِقْ | Mashriq (sharq) | 39.857 | 41.158 |
| 19 | مُشْتَهِرْ | Mushtahir (mashhur) | 42.619 | 44.176 |
| 20 | مُشْتَرَكْ | Mushtarak (umumiy) | 45.561 | 47.043 |

### Row 4 (4 so'z) — fe'l juftlari
| # | Arab | Uzbek | Start | End |
|---|------|-------|-------|-----|
| 21 | اِشْتَهَرَ | Ishtahara (mashhur bo'ldi) | 49.079 | 50.657 |
| 22 | يَشْتَهِرُ | Yashtahiru (mashhur bo'ladi) | 52.092 | 53.822 |
| 23 | اِبْرَنْشَقَ | Ibranshaqa (yorildi) | 55.644 | 57.892 |
| 24 | يَبْرَنْشِقُ | Yabranshiqu (yoriladi) | 59.150 | 61.523 |

## Diqqat: PDF transkripsiyasi xato

PDF'da row 2 so'zlari `بَشَّرُوا`, `شَرِبُوا` kabi ko'plik fe'l shakllari sifatida yozilgan —
lekin rasm va audio esa singular ism shakllari (`بِشْرُ`, `شِرْبُ`). **Rasm va audio ustun**.

## Metodologiya

1. `silencedetect=noise=-40dB:duration=0.10` bilan sukunat chegaralari topildi.
2. Har speech region boshi -50ms, oxiri +100ms buffer.
3. `مُشْتَهِرْ`, `مُشْتَرَكْ`, `شُكْرُ` — ichida micro-silence bor, chunk ichiga olindi.
4. Chunklar `libmp3lame 192k` bilan re-encoded.

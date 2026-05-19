# Qof (ق) — 9-sahifa, yuqori qism

**Manba**: `public/audio/17. qo.mp3` (1:08.91)
**Chunklar**: `Materiallar/harflar/edit_audios/17_qo/`, `muallimus-soniy/public/audio/edit/17_qo/`
**PDF qo'llanma**: `Materiallar/audio_qoidalar/17._qo_final.pdf`
**Rasm**: `Materiallar/harflar/9.jpg` (yuqori yarmi)

## Tarkib (26 element)

Pozitsion shakllar (Qof — connector harf):
- Boshida → `قَ`
- Oʻrtasida → `ـقِـ`
- Oxirida → `ـقُ`

### Header (3)
| # | Arab | Uzbek | Start | End | Chunk |
|---|------|-------|-------|-----|-------|
| 01 | قَ | Qo (boshida) | 2.630 | 3.161 | q01_fatha.mp3 |
| 02 | ـقِـ | Qi (oʻrtasida) | 3.761 | 4.332 | q02_kasra.mp3 |
| 03 | ـقُ | Qu (oxirida) | 4.858 | 5.423 | q03_damma.mp3 |

### Row 1 (6 so'z) — 2 harfli birikmalar
| # | Arab | Uzbek | Start | End |
|---|------|-------|-------|-----|
| 04 | زُقْ | Zuq | 6.632 | 7.493 |
| 05 | قِنْ | Qin | 8.845 | 9.615 |
| 06 | قُلْ | Qul (ayt) | 10.860 | 11.604 |
| 07 | قُمْ | Qum (tur) | 13.176 | 13.937 |
| 08 | قِفْ | Qif (to'xta) | 15.320 | 16.147 |
| 09 | قِهْ | Qih | 17.752 | 18.505 |

### Row 2 (7 so'z) — ismlar (damma ending)
| # | Arab | Uzbek | Start | End |
|---|------|-------|-------|-----|
| 10 | قَلْبُ | Qalbu (yurak) | 20.282 | 21.488 |
| 11 | قَبْلُ | Qablu (oldin) | 22.736 | 23.802 |
| 12 | فَوْقُ | Fawqu (yuqori) | 25.149 | 26.470 |
| 13 | قَلَمُ | Qalamu | 27.845 | 28.791 |
| 14 | قَمَرُ | Qamaru (oy) | 30.318 | 31.192 |
| 15 | لَقَبُ | Laqabu | 32.712 | 33.759 |
| 16 | قُمْقُمْ | Qumqum | 35.489 | 36.887 |

### Row 3 (4 so'z) — fe'l juftlari (past + present)
| # | Arab | Uzbek | Start | End |
|---|------|-------|-------|-----|
| 17 | اِقْتَرَبَ | Iqtaraba (yaqinlashdi) | 38.635 | 40.149 |
| 18 | يَقْتَرِبُ | Yaqtaribu (yaqinlashadi) | 41.386 | 43.042 |
| 19 | اِنْقَلَبَ | Inqalaba (ag'darildi) | 44.347 | 46.141 |
| 20 | يَنْقَلِبُ | Yanqalibu (ag'dariladi) | 47.356 | 49.294 |

### Row 4 (6 so'z — 3 juftlik) — o'xshash tovushlar
Divider'dan keyin — `ك/ق` va `ك/ق` farqini mashq qilish:
| # | Arab | Uzbek | Start | End |
|---|------|-------|-------|-----|
| 21 | كَمَرْ | Kamar | 53.237 | 54.047 |
| 22 | قَمَرْ | Qamar (oy) | 55.624 | 56.462 |
| 23 | فَلَكْ | Falak | 57.905 | 58.684 |
| 24 | فَلَقْ | Falaq | 60.344 | 61.195 |
| 25 | فَرْكُ | Farku | 62.696 | 63.873 |
| 26 | فَرْقُ | Farqu (farq) | 65.399 | 66.564 |

## Metodologiya

1. `silencedetect=noise=-40dB:duration=0.10` bilan sukunat chegaralari topildi.
2. Har speech region boshi -50ms, oxiri +100ms buffer (vowel attack + tail).
3. PDF timing'lari tekshirildi — markaz koordinatalari deb ishlatildi.
4. Ba'zi micro-silence'lar (100-200ms) word ichida bo'lgani uchun chunk ichiga qoldirildi.
5. Chunklar `libmp3lame 192k` bilan re-encoded (sample-accurate).

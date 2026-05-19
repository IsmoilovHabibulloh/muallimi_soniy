# Nun (ن) — sahifa 5 amaliyoti

Kitob sahifa 5 ning ikkinchi bo'limi (o'rta): Nun harfining harakatlari va
so'zlari.

## Manbalar

- **Asl audio (backup)**: `audiosi/09. na.mp3` (~57 s)
- **PDF qo'llanma**: `../audio_qoidalar/09._na_final.pdf` (18 ta entry,
  headers bloki 3 ga bo'linadi — jami 20 chunk)
- **Bo'lingan chunklar**: `edit_audios/09_na/` — 20 fayl
- **App URL prefix**: `/audio/edit/09_na/`

## Audio bo'laklari (chunks)

### Harakatlar (3)

| El. (p5) | Arabcha | Lotin | Fayl | Asl audio: boshlangich → tugash |
|----------|---------|-------|------|----------------------------------|
| 10 | نَ | Na | `n01_fatha.mp3` | 1.131 → 1.817 |
| 11 | نِ | Ni | `n02_kasra.mp3` | 2.330 → 3.054 |
| 12 | نُ | Nu | `n03_damma.mp3` | 3.567 → 4.358 |

### Qator 1 — boginlar (6)

| El. | Arabcha | Lotin | Fayl | Vaqt |
|-----|---------|-------|------|------|
| 13 | اَنْ | An  | `n04_an.mp3`  |  7.111 →  7.883 |
| 14 | اِنْ | In  | `n05_in.mp3`  |  9.370 → 10.140 |
| 15 | زِنْ | Zin | `n06_zin.mp3` | 11.704 → 12.687 |
| 16 | مَنْ | Man | `n07_man.mp3` | 14.261 → 15.157 |
| 17 | مِنْ | Min | `n08_min.mp3` | 16.568 → 17.522 |
| 18 | نَمْ | Nam | `n09_nam.mp3` | 19.019 → 19.976 |

### Qator 2 — so'zlar (6)

| El. | Arabcha | Lotin | Fayl | Vaqt |
|-----|---------|-------|------|------|
| 19 | اَنْتَ   | Anta   | `n10_anta.mp3`   | 22.332 → 23.851 |
| 20 | نِمْتَ   | Nimta  | `n11_nimta.mp3`  | 25.314 → 26.699 |
| 21 | اَنْتُمْ | Antum  | `n12_antum.mp3`  | 28.354 → 30.173 |
| 22 | نِمْتُمْ | Nimtum | `n13_nimtum.mp3` | 31.736 → 33.352 |
| 23 | نَزِرُ   | Naziru | `n14_naziru.mp3` | 34.930 → 36.181 |
| 24 | نَزِنُ   | Nazinu | `n15_nazinu.mp3` | 37.769 → 39.010 |

### Qator 3 — so'zlar (5, "nā" = "biz" qo'shimchasi)

| El. | Arabcha | Lotin | Fayl | Vaqt |
|-----|---------|-------|------|------|
| 25 | اَمَرْنَا | Amarna  | `n16_amarna.mp3`  | 41.337 → 42.592 |
| 26 | اُمِرْنَا | Umirna  | `n17_umirna.mp3`  | 44.259 → 45.610 |
| 27 | مَرَرْنَا | Mararna | `n18_mararna.mp3` | 47.615 → 49.053 |
| 28 | مُرِرْنَا | Murirna | `n19_murirna.mp3` | 50.823 → 52.132 |
| 29 | اَمْرَرْنَا | Amrarna | `n20_amrarna.mp3` | 53.980 → 55.633 |

## Metodologiya

1. **Silence-detect** (`-40dB/0.10s`) bilan 20 ta aniq sound region topildi:
   - Headers bloki (PDF 1 ta entry'da) silence'lar bilan 3 ga bo'lindi.
   - So'zlar bir-biriga aniq chegarali.
2. **Buffer**: `-50ms / +100ms` (vowel attack + fricative tail).
3. **PDF ga ko'r-ko'rona ishonilmagan** — har bir chegara audioning o'zidan
   olindi, foydalanuvchi eshitib tasdiqlaydi.

## Bo'laklarni qayta yaratish

```bash
bash tools/cut_p5.sh
cp -p Materiallar/harflar/edit_audios/09_na/*.mp3 \
      muallimus-soniy/public/audio/edit/09_na/
```

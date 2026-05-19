# Ya (ي) — sahifa 5 amaliyoti

Kitob sahifa 5 ning uchinchi bo'limi (pastki): Ya harfining harakatlari va
so'zlari (Qur'ondagi "ي" tovushi bilan so'zlar).

## Manbalar

- **Asl audio (backup)**: `audiosi/10. ya.mp3` (~52 s)
- **PDF qo'llanma**: `../audio_qoidalar/10._ya_final.pdf` (16 ta entry,
  headers bloki 3 ga bo'linadi — jami 18 chunk)
- **Bo'lingan chunklar**: `edit_audios/10_ya/` — 18 fayl
- **App URL prefix**: `/audio/edit/10_ya/`

## Audio bo'laklari (chunks)

### Harakatlar (3)

| El. (p5) | Arabcha | Lotin | Fayl | Asl audio: boshlangich → tugash |
|----------|---------|-------|------|----------------------------------|
| 30 | يَ | Ya | `y01_fatha.mp3` | 1.073 → 1.790 |
| 31 | يِ | Yi | `y02_kasra.mp3` | 2.388 → 3.174 |
| 32 | يُ | Yu | `y03_damma.mp3` | 3.735 → 4.459 |

### Qator 1 — so'zlar (6)

| El. | Arabcha | Lotin  | Fayl | Vaqt |
|-----|---------|--------|------|------|
| 33 | اَيْ   | Ay    | `y04_ay.mp3`     |  6.035 →  6.754 |
| 34 | اَيْمُ | Aymu  | `y05_aymu.mp3`   |  8.438 →  9.676 |
| 35 | زَيْتُ | Zaytu | `y06_zaytu.mp3`  | 10.665 → 12.088 |
| 36 | مَيْتُ | Maytu | `y07_maytu.mp3`  | 13.349 → 14.676 |
| 37 | رَأْيُ | Ra'yu | `y08_rayu.mp3`   | 15.987 → 17.352 |
| 38 | رَمَى  | Rama  | `y09_rama.mp3`   | 18.935 → 20.231 |

### Qator 2 — so'zlar (5)

| El. | Arabcha | Lotin | Fayl | Vaqt |
|-----|---------|-------|------|------|
| 39 | يَمَنْ   | Yaman  | `y10_yaman.mp3`  | 21.980 → 23.052 |
| 40 | مَرْيَمْ | Maryam | `y11_maryam.mp3` | 24.799 → 26.131 |
| 41 | مَيْزَرْ | Mayzar | `y12_mayzar.mp3` | 27.849 → 29.128 |
| 42 | مَيْمَنْ | Maymun | `y13_maymun.mp3` | 31.026 → 32.424 |
| 43 | اَيْمَنْ | Ayman  | `y14_ayman.mp3`  | 34.162 → 35.518 |

### Qator 3 — so'zlar (4, qo'shma shakl — "ayni" qo'shimchasi)

| El. | Arabcha | Lotin | Fayl | Vaqt |
|-----|---------|-------|------|------|
| 44 | اَمْرَيْنِ   | Amrayni   | `y15_amrayni.mp3`   | 37.977 → 40.111 |
| 45 | زَيْتَيْنِ   | Zaytayni  | `y16_zaytayni.mp3`  | 41.635 → 43.489 |
| 46 | اَيْمَيْنِ   | Aymayni   | `y17_aymayni.mp3`   | 45.158 → 46.834 |
| 47 | مَيْتَيْنِ   | Maytayni  | `y18_maytayni.mp3`  | 48.420 → 50.246 |

## Metodologiya

1. **Silence-detect** (`-40dB/0.10s`) bilan 18 ta aniq region topildi —
   rasmdagi element soniga mos.
2. **Buffer**: `-50ms / +100ms`.
3. **PDF dagi transkripsiya** aralash lotin-arab edi va baʻzi so'zlarda
   noaniq. Audio chegaralari PDF vaqtlariga yaqin, lekin tasdiqlash —
   foydalanuvchi eshituvi bilan.

## Bo'laklarni qayta yaratish

```bash
bash tools/cut_p5.sh
cp -p Materiallar/harflar/edit_audios/10_ya/*.mp3 \
      muallimus-soniy/public/audio/edit/10_ya/
```

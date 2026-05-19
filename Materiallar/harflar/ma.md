# Mim (م) — sahifa 4 amaliyoti

Kitob sahifa 4 ning ikkinchi bo'limi: Mim harfining harakatlari, birikmalari, so'zlari.

## Manbalar

- **Asl audio (backup)**: `audiosi/07. ma.mp3` (~54 s)
- **PDF qo'llanma**: `../audio_qoidalar/07._ma_final.pdf`
- **Bo'lingan chunklar**: `edit_audios/07_ma/` — 19 fayl
- **App URL prefix**: `/audio/edit/07_ma/`

## Audio bo'laklari (chunks)

### Harakatlar (pozitsion shakllar bilan)

| El. (p4) | Arabcha | Lotin | Fayl              | Asl audio: boshlangich → tugash | Davomiyligi |
|----------|---------|-------|-------------------|---------------------------------|-------------|
| 14 | مَ    | Ma (boshida)   | `m01_fatha.mp3` | 1.869 → 2.750 | 0.88 s |
| 15 | ـمِـ | Mi (oʻrtasida) | `m02_kasra.mp3` | 2.900 → 3.780 | 0.88 s |
| 16 | ـمُ  | Mu (oxirida)   | `m03_damma.mp3` | 3.950 → 4.930 | 0.98 s |

### Birikmalar

| El. | Arabcha | Lotin | Fayl | Vaqt | Davomiyligi |
|-----|---------|-------|------|------|-------------|
| 17 | اَمْ | Am  | `m04_am.mp3`  | 8.290 → 8.919   | 0.63 s |
| 18 | اِمْ | Im  | `m05_im.mp3`  | 10.450 → 11.139 | 0.69 s |
| 19 | اُمْ | Um  | `m06_um.mp3`  | 13.109 → 13.819 | 0.71 s |
| 20 | مُرْ | Mur | `m07_mur.mp3` | 16.029 → 16.620 | 0.59 s |
| 21 | مُزْ | Muz | `m08_muz.mp3` | 18.309 → 18.979 | 0.67 s |
| 22 | رُمْ | Rum | `m09_rum.mp3` | 20.529 → 21.239 | 0.71 s |

### So'zlar (1-qator)

| El. | Arabcha | Lotin | Fayl | Vaqt | Davomiyligi |
|-----|---------|-------|------|------|-------------|
| 23 | اَمَرَ | Amara | `m10_amara.mp3` | 23.459 → 24.398 | 0.94 s |
| 24 | اُمَرَ | Umara | `m11_umara.mp3` | 26.392 → 27.415 | 1.02 s |
| 25 | اَمْرُ | Amru  | `m12_amru.mp3`  | 29.502 → 30.648 | 1.15 s |
| 26 | اِمْرُ | Imru  | `m13_imru.mp3`  | 32.506 → 33.627 | 1.12 s |
| 27 | رَمْزُ | Ramzu | `m14_ramzu.mp3` | 35.408 → 36.717 | 1.31 s |
| 28 | اِرْم  | Irm   | `m15_irm.mp3`   | 38.725 → 39.791 | 1.07 s |

### So'zlar (2-qator)

| El. | Arabcha | Lotin | Fayl | Vaqt | Davomiyligi |
|-----|---------|-------|------|------|-------------|
| 29 | مَرْمَرْ | Marmar | `m16_marmar.mp3` | 41.409 → 42.780 | 1.37 s |
| 30 | رَمْزَمْ | Ramzam | `m17_ramzam.mp3` | 44.829 → 46.159 | 1.33 s |
| 31 | زَمْزَمْ | Zamzam | `m18_zamzam.mp3` | 48.389 → 49.719 | 1.33 s |
| 32 | اَرْزَمْ | Arzam  | `m19_arzam.mp3`  | 51.630 → 52.919 | 1.29 s |

## Metodologiya

1. **PDF qo'llanma** — 17 ta timing bergan.
2. **Sukunat aniqlash** (`-40dB / 0.10s`) — barcha so'zlar orasidagi chegaralarni aniqladi.
3. **Buffer**: -50ms / +100ms.
4. **Muhim tuzatish**: PDF vaqtlari tovush markazini berib, dumni 180-300ms kesib yuborgan edi. Silence-detection boundary'lari bilan qayta cut qilingan (amara, umara, amru, imru).
5. **Pozitsion shakllar (Mim)**: kitob shakllarga muvofiq — مَ (boshida), ـمِـ (o'rtasida, bog'langan), ـمُ (oxirida). Mim connector harf.

## Bo'laklarni qayta yaratish

```bash
bash tools/cut_p4.sh
cp -p Materiallar/harflar/edit_audios/07_ma/*.mp3 \
      muallimus-soniy/public/audio/edit/07_ma/
```

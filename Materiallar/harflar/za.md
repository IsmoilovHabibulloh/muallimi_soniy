# Za (ز) — sahifa 4 amaliyoti

Kitob sahifa 4 ning birinchi bo'limi: Za harfining harakatlari va birikmalari.

## Manbalar

- **Asl audio (backup)**: `audiosi/06. za.mp3` (~33 s)
- **PDF qo'llanma**: `../audio_qoidalar/06._za_final.pdf`
- **Bo'lingan chunklar**: `edit_audios/06_za/` — 13 fayl
- **App URL prefix**: `/audio/edit/06_za/`

## Audio bo'laklari (chunks)

| El. (p4) | Arabcha | Lotin | Fayl              | Asl audio: boshlangich → tugash | Davomiyligi |
|----------|---------|-------|-------------------|---------------------------------|-------------|
| 01 | زَ | Za fatha | `z01_fatha.mp3`   | 1.856 → 2.564  | 0.71 s |
| 02 | زِ | Za kasra | `z02_kasra.mp3`   | 3.161 → 3.844  | 0.68 s |
| 03 | زُ | Za damma | `z03_damma.mp3`   | 4.431 → 5.183  | 0.75 s |
| 04 | اَزْ | Az | `z04_az.mp3`      | 6.109 → 6.839  | 0.73 s |
| 05 | اِزْ | Iz | `z05_iz.mp3`      | 8.629 → 9.379  | 0.75 s |
| 06 | اُزْ | Uz | `z06_uz.mp3`      | 11.209 → 11.999 | 0.79 s |
| 07 | زَرْ | Zar | `z07_zar.mp3`    | 13.969 → 14.600 | 0.63 s |
| 08 | زِرْ | Zir | `z08_zir.mp3`    | 16.309 → 16.899 | 0.59 s |
| 09 | زُرْ | Zur | `z09_zur.mp3`    | 18.609 → 18.940 | 0.33 s |
| 10 | اَزْرُ | Azru | `z10_azru.mp3`  | 22.149 → 23.279 | 1.13 s |
| 11 | اِزْرُ | Izru | `z11_izru.mp3`  | 24.589 → 25.659 | 1.07 s |
| 12 | اُزْرُ | Uzru | `z12_uzru.mp3`  | 27.249 → 28.399 | 1.15 s |
| 13 | اُرْزُ | Urzu | `z13_urzu.mp3`  | 29.889 → 31.019 | 1.13 s |

## Metodologiya

1. **PDF qo'llanma** — 10 ta timing bergan (1 ta blok harakatlar + 9 ta so'z).
2. **Sukunat aniqlash** (`-40dB / 0.10s`) bilan 3 ta harakat bir blokdan ajratildi.
3. **Buffer**: har bir cut ga -50ms / +100ms buffer qo'shildi.
4. **Eslatma**: Za — non-connector harf (ر, ا, د, ذ, و, ز). So'z o'rtasida/oxirida shakli o'zgarmaydi. Shuning uchun Mim/Ta kabi pozitsion shakllar yo'q.

## Bo'laklarni qayta yaratish

```bash
bash tools/cut_p4.sh
cp -p Materiallar/harflar/edit_audios/06_za/*.mp3 \
      muallimus-soniy/public/audio/edit/06_za/
```

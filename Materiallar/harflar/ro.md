# Ra (ر) — harakatlar va birikmalar

Sahifa 3 (alifbo) va sahifa 4 (Takrorlash)dagi Ra harfining harakatli
shakllari va birikmalari.

## Manbalar

- **Asl audio (backup)**: `audiosi/05. ro.mp3` (~14 s, 6 ta belgi)
- **PDF qo'llanma**: `../audio_qoidalar/05._ro_rus final.pdf`
- **Bo'lingan chunklar**: `edit_audios/05_ro/`
- **App URL prefix**: `/audio/edit/05_ro/`

## Audio bo'laklari (chunks)

### Ra harakatlari (رَ رِ رُ) — p3:32-34, p4:04-06

| Arabcha | Lotin       | Fayl              | Asl audio: boshlangich → tugash | Davomiyligi |
|---------|-------------|-------------------|---------------------------------|-------------|
| رَ      | Ra fatha    | `r01_fatha.mp3`   | 1.988 → 2.664                   | 0.68 s      |
| رِ      | Ra kasra    | `r02_kasra.mp3`   | 3.396 → 3.996                   | 0.60 s      |
| رُ      | Ra damma    | `r03_damma.mp3`   | 4.569 → 5.217                   | 0.65 s      |

### Birikmalar (اَرْ اِرْ اُرْ) — p3:35-37

| Arabcha | Lotin | Fayl              | Asl audio: boshlangich → tugash | Davomiyligi |
|---------|-------|-------------------|---------------------------------|-------------|
| اَرْ    | Ar    | `r04_ar.mp3`      | 7.877 → 8.573                   | 0.70 s      |
| اِرْ    | Ir    | `r05_ir.mp3`      | 9.883 → 10.516                  | 0.63 s      |
| اُرْ    | Ur    | `r06_ur.mp3`      | 11.733 → 12.396                 | 0.66 s      |

## Metodologiya

1. **PDF**: 05._ro_rus final.pdf:
   - `00:00:02,159 → 00:00:05,099` — 3 Ra harakatlari (bir blokda)
   - `00:00:07,960 → 00:00:08,199` — اَرْ
   - `00:00:09,960 → 00:00:10,380` — اِرْ
   - `00:00:11,819 → 00:00:12,259` — اُرْ
2. **Sukunat aniqlash** (`-40dB / 0.10s`) bilan har biri alohida ajratildi.
3. **Buffer**: -50 ms / +100 ms (envelope uchun).
4. **Element bog'lanishi** (`elements.ts`):
   - **p3 elements 32-34** (Ra harakatlari)
   - **p3 elements 35-37** (birikmalar — type: bogin)
   - **p4 elements 04-06** (Takrorlash sahifasi — Ra harakatlari)

## Bo'laklarni qayta yaratish

```bash
bash tools/cut_ro.sh
cp -p Materiallar/harflar/edit_audios/05_ro/*.mp3 \
      muallimus-soniy/public/audio/edit/05_ro/
```

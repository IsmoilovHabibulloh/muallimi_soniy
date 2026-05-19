# Harakatlar (3 ta belgi: fatha, kasra, damma)

Harakatlar — arab tilidagi unli belgilar (`َ` fatha, `ِ` kasra, `ُ` damma).
Sahifa 3 (alifbo)dagi alohida bo'lim va sahifa 4 (Takrorlash)da ham
qo'llaniladi.

## Manbalar

- **Asl audio (backup)**: `audiosi/04. harakat.mp3` (~9 s, 3 ta belgi)
- **Bo'lingan chunklar**: `edit_audios/04_harakat/`
- **App URL prefix**: `/audio/edit/04_harakat/`

## Audio bo'laklari (chunks)

| El. (p3) | El. (p4) | Arabcha | Lotin       | Fayl              | Asl audio: boshlangich → tugash | Davomiyligi |
|----------|----------|---------|-------------|-------------------|---------------------------------|-------------|
| 29       | 01       | اَ      | Alif fatha  | `h01_fatha.mp3`   | 2.959 → 3.466                   | 0.51 s      |
| 30       | 02       | اِ      | Alif kasra  | `h02_kasra.mp3`   | 4.163 → 4.684                   | 0.52 s      |
| 31       | 03       | اُ      | Alif damma  | `h03_damma.mp3`   | 5.412 → 5.953                   | 0.54 s      |

## Metodologiya

1. **PDF**: 03_04 PDF'da harakatlar bo'limi: `00:00:03,059 → 00:00:05,860`
   (3 belgi bir blokda, alohida ajratilmagan).
2. **Sukunat aniqlash** (`-40dB / 0.10s`):
   - silence: 0 → 3.009 (boshidagi sukunat)
   - sound 1: 3.009 → 3.366 (fatha)
   - silence: 3.366 → 4.213
   - sound 2: 4.213 → 4.584 (kasra)
   - silence: 4.584 → 5.462
   - sound 3: 5.462 → 5.853 (damma)
   - silence: 5.853 → 9.064 (oxirdagi sukunat)
3. **Buffer**: -50ms boshida, +100ms oxirida (envelope uchun).
4. **Element bog'lanishi** (`elements.ts`):
   - **p3 elements 29-31** (alifbo sahifasidagi harakat bo'limi)
   - **p4 elements 01-03** (Takrorlash sahifasidagi harakatlar)
   - Ikkalasi ham xuddi shu chunklarni ishlatadi.

## Bo'laklarni qayta yaratish

```bash
bash tools/cut_harakat.sh
cp -p Materiallar/harflar/edit_audios/04_harakat/*.mp3 \
      muallimus-soniy/public/audio/edit/04_harakat/
```

## Eslatmalar

- Boshqa harflarning harakat shakllari (masalan, رَ رِ رُ) boshqa audio
  fayllarni ishlatadi — masalan, `05. ro.mp3` Ra'ning harakatlari uchun.
  Ularni alohida ishlash kerak.

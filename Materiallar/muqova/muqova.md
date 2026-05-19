# Muqova (Cover) sahifasi

Kitobning 1-sahifasi — muqova. 3 ta arabcha sarlavha interaktiv
(bosilganda chunk ijro etiladi); muallif va o'quvchi ismi static.

## Audio

- `audiosi/01. muqova.mp3` — to'liq narratsiya (5.7s, Jahongir qori Nematov)
- Chunks (`edit_audios/01_muqova/`):

| # | Fayl | Arabcha | Start → End | Dur |
|---|------|---------|-------------|-----|
| m01 | `m01_muallimi_soniy.mp3` | معلم ثانى    | 0.180 → 1.820 | 1.640s |
| m02 | `m02_yoki.mp3`          | ياكى          | 2.810 → 3.500 | 0.690s |
| m03 | `m03_alifbo_arabiy.mp3` | الفباء عربى  | 3.740 → 5.180 | 1.440s |

Silence detect (`-35dB / 0.15s`) 3 sound region topdi:
A (0.23→1.72), B (2.86→3.40), C (3.79→5.08). Buffer: -50ms attack /
+100ms tail. Cut skript: `tools/cut_muqova.sh`.

## Sahifa tarkibi

```
                        Muallif
                  أحمد هادي مقصودي     ← static

                       معلم ثانى       ← tugma (m01)

                       ◇ ◇ ◇

                          ياكى         ← tugma (m02)

                       ◇ ◇ ◇

                       الفباء عربى     ← tugma (m03)

              🎧 O'qidi: Jahongir qori Nematov    ← static
```

### Vizual sozlamalar

- **Asosiy sarlavhalar** (`معلم ثانى`, `الفباء عربى`) — yashil
  (`var(--color-primary-dark)`), katta o'lchamli (6xl / 5xl).
- **Muallif ismi** — amber (`var(--color-el-jumla)`), o'rta.
- **Dekorativ chiziqlar** — amber + 3 ta romb (◇).
- Active tugma: yashil fon, oq matn, `scale(1.05)`.

## Texnik

- **Komponent**: `src/components/lesson/RenderedPage.tsx` → `Page0`
- **Lesson ID**: `ls_muqova` (chapter `ch_muqaddima`, order 1)
- **Page number**: `0` — `PAGE_MAP.ls_muqova: [0]`
- **Audio helper**: `A.mq("<name>") → /audio/edit/01_muqova/<name>.mp3`
- **Element array**: `p0` (3 ta `jumla` turi) — `elements.ts`

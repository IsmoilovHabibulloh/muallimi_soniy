#!/bin/bash
# Cut per-element chunks from 06. za.mp3, 07. ma.mp3, 08. ta.mp3 for page 4.
# PDF: 06._za_final.pdf, 07._ma_final.pdf, 08._ta_final.pdf
# Boundary policy: silence-detected + buffer for clean cuts.
set -euo pipefail

# Yo'l skript joylashuvidan olinadi — loyiha ko'chirilsa ham ishlaydi
# (avval macOS yo'li qotib yozilgan edi, boshqa mashinada ishlamasdi).
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FF="${FFMPEG:-$ROOT/tools/ffmpeg}"
command -v "$FF" >/dev/null 2>&1 || FF=ffmpeg

cut() {
  local src="$1" out="$2" start="$3" end="$4"
  local dur=$(awk "BEGIN{printf \"%.3f\", $end - $start}")
  "$FF" -hide_banner -loglevel error -y -ss "$start" -i "$src" -t "$dur" \
    -c:a libmp3lame -b:a 192k "$out"
}

# ════════════════════════════════════════════════════════════
# ZA (ز) — 06. za.mp3 — 13 chunks
# ════════════════════════════════════════════════════════════
ZA_SRC="$ROOT/public/audio/06. za.mp3"
ZA_OUT="$ROOT/Materiallar/harflar/edit_audios/06_za"
rm -f "$ZA_OUT"/*.mp3
mkdir -p "$ZA_OUT"

cut "$ZA_SRC" "$ZA_OUT/z01_fatha.mp3"   1.856   2.564
cut "$ZA_SRC" "$ZA_OUT/z02_kasra.mp3"   3.161   3.844
cut "$ZA_SRC" "$ZA_OUT/z03_damma.mp3"   4.431   5.183
cut "$ZA_SRC" "$ZA_OUT/z04_az.mp3"      6.109   6.839
cut "$ZA_SRC" "$ZA_OUT/z05_iz.mp3"      8.629   9.379
cut "$ZA_SRC" "$ZA_OUT/z06_uz.mp3"     11.209  11.999
cut "$ZA_SRC" "$ZA_OUT/z07_zar.mp3"    13.969  14.600
cut "$ZA_SRC" "$ZA_OUT/z08_zir.mp3"    16.309  16.899
# 2026-08-24: oxiri "r" tovushi o'rtasida kesilgan edi (0.33s).
# O'lchov (tools/audio_span.py): nutq 18.37-19.09.
cut "$ZA_SRC" "$ZA_OUT/z09_zur.mp3"    18.330  19.160
cut "$ZA_SRC" "$ZA_OUT/z10_azru.mp3"   22.149  23.279
cut "$ZA_SRC" "$ZA_OUT/z11_izru.mp3"   24.589  25.659
cut "$ZA_SRC" "$ZA_OUT/z12_uzru.mp3"   27.249  28.399
cut "$ZA_SRC" "$ZA_OUT/z13_urzu.mp3"   29.889  31.019

# ════════════════════════════════════════════════════════════
# MA (م / Mim) — 07. ma.mp3 — 19 chunks
# ════════════════════════════════════════════════════════════
MA_SRC="$ROOT/public/audio/07. ma.mp3"
MA_OUT="$ROOT/Materiallar/harflar/edit_audios/07_ma"
rm -f "$MA_OUT"/*.mp3
mkdir -p "$MA_OUT"

cut "$MA_SRC" "$MA_OUT/m01_fatha.mp3"   1.869   2.750
cut "$MA_SRC" "$MA_OUT/m02_kasra.mp3"   2.900   3.780
cut "$MA_SRC" "$MA_OUT/m03_damma.mp3"   3.950   4.930
cut "$MA_SRC" "$MA_OUT/m04_am.mp3"      8.290   8.919
cut "$MA_SRC" "$MA_OUT/m05_im.mp3"     10.450  11.139
cut "$MA_SRC" "$MA_OUT/m06_um.mp3"     13.109  13.819
cut "$MA_SRC" "$MA_OUT/m07_mur.mp3"    16.029  16.620
cut "$MA_SRC" "$MA_OUT/m08_muz.mp3"    18.309  18.979
# 2026-08-24: oxirgi "m" so'nishiga zaxira yo'q edi. Nutq 20.50-21.24.
cut "$MA_SRC" "$MA_OUT/m09_rum.mp3"    20.470  21.320
# Silence-detected for correct tail:
cut "$MA_SRC" "$MA_OUT/m10_amara.mp3"  23.459  24.398
cut "$MA_SRC" "$MA_OUT/m11_umara.mp3"  26.392  27.415
cut "$MA_SRC" "$MA_OUT/m12_amru.mp3"   29.502  30.648
cut "$MA_SRC" "$MA_OUT/m13_imru.mp3"   32.506  33.627
cut "$MA_SRC" "$MA_OUT/m14_ramzu.mp3"  35.408  36.717
cut "$MA_SRC" "$MA_OUT/m15_irm.mp3"    38.725  39.791
# Last row (silence-detected for clean cuts):
cut "$MA_SRC" "$MA_OUT/m16_marmar.mp3" 41.409  42.780
cut "$MA_SRC" "$MA_OUT/m17_ramzam.mp3" 44.829  46.159
cut "$MA_SRC" "$MA_OUT/m18_zamzam.mp3" 48.389  49.719
cut "$MA_SRC" "$MA_OUT/m19_arzam.mp3"  51.630  52.919

# ════════════════════════════════════════════════════════════
# TA (ت) — 08. ta.mp3 — 8 chunks
# ════════════════════════════════════════════════════════════
TA_SRC="$ROOT/public/audio/08. ta.mp3"
TA_OUT="$ROOT/Materiallar/harflar/edit_audios/08_ta"
rm -f "$TA_OUT"/*.mp3
mkdir -p "$TA_OUT"

cut "$TA_SRC" "$TA_OUT/t01_fatha.mp3"   1.690   2.450
cut "$TA_SRC" "$TA_OUT/t02_kasra.mp3"   2.700   3.600
cut "$TA_SRC" "$TA_OUT/t03_damma.mp3"   4.509   5.100
cut "$TA_SRC" "$TA_OUT/t04_mat.mp3"     6.410   7.119
cut "$TA_SRC" "$TA_OUT/t05_mit.mp3"     8.729   9.419
cut "$TA_SRC" "$TA_OUT/t06_mut.mp3"    11.169  11.900
cut "$TA_SRC" "$TA_OUT/t07_tamar.mp3"  13.989  14.879
cut "$TA_SRC" "$TA_OUT/t08_tarir.mp3"  16.471  17.324

echo "OK — ZA: $(ls "$ZA_OUT"/*.mp3 | wc -l | tr -d ' ') | MA: $(ls "$MA_OUT"/*.mp3 | wc -l | tr -d ' ') | TA: $(ls "$TA_OUT"/*.mp3 | wc -l | tr -d ' ')"

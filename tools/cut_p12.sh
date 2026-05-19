#!/bin/bash
# Cut per-element chunks for page 12 (Jim ج + Xo خ).
# Manbalar:
#   - 23. ja.mp3 — Jim bo'limi: 3 header + 5 + 6 + 4 = 18 chunk
#   - 24. xo.mp3 — Xo bo'limi:  3 header + 6 + 6 + 4 + 4 = 23 chunk
# Chegaralar: silencedetect (-40dB/0.10s) + buffer -50/+100 ms.
set -euo pipefail

ROOT="/Users/habibulloh22icloud.com/Desktop/Antigravity/muallimi soniy"
FF="$ROOT/tools/ffmpeg"

cut() {
  local src="$1" out="$2" start="$3" end="$4"
  local dur=$(awk "BEGIN{printf \"%.3f\", $end - $start}")
  "$FF" -hide_banner -loglevel error -y -ss "$start" -i "$src" -t "$dur" \
    -c:a libmp3lame -b:a 192k "$out"
}

# ════════════════════════════════════════════════════════════
# JIM (23. ja.mp3) — 18 chunk
# ════════════════════════════════════════════════════════════
JA_SRC="$ROOT/public/audio/23. ja.mp3"
JA_OUT="$ROOT/Materiallar/harflar/edit_audios/23_ja"
rm -rf "$JA_OUT"
mkdir -p "$JA_OUT"

# Headers: جَ ـجِـ ـجُ (pozitsion — connector harf)
cut "$JA_SRC" "$JA_OUT/ja01_fatha.mp3"        1.476   2.122
cut "$JA_SRC" "$JA_OUT/ja02_kasra.mp3"        2.493   3.174
cut "$JA_SRC" "$JA_OUT/ja03_damma.mp3"        3.443   4.177
# Row 2 (5 so'z): جَمْ جَرْ جِنْ جَبْ جُلْ
cut "$JA_SRC" "$JA_OUT/ja04_jam.mp3"          5.530   6.467
cut "$JA_SRC" "$JA_OUT/ja05_jar.mp3"          7.249   8.111
cut "$JA_SRC" "$JA_OUT/ja06_jin.mp3"          9.000   9.937
cut "$JA_SRC" "$JA_OUT/ja07_jab.mp3"         10.631  11.467
cut "$JA_SRC" "$JA_OUT/ja08_jul.mp3"         12.238  13.152
# Row 3 (6 so'z): جَبَلْ جَمَلْ اَجْرْ فَجْرْ جَوْهَرُ جَوْرَبْ
cut "$JA_SRC" "$JA_OUT/ja09_jabal.mp3"       13.956  15.028
cut "$JA_SRC" "$JA_OUT/ja10_jamal.mp3"       15.759  16.854
cut "$JA_SRC" "$JA_OUT/ja11_ajr.mp3"         17.840  18.892
cut "$JA_SRC" "$JA_OUT/ja12_fajr.mp3"        19.952  21.022
cut "$JA_SRC" "$JA_OUT/ja13_jawhar.mp3"      22.152  23.466
cut "$JA_SRC" "$JA_OUT/ja14_jawrab.mp3"      24.699  26.011
# Row 4 (4 so'z): تَجَوْرَبَ يَتَجَوْرَبُ اِسْتَجْلَبَ يَسْتَجْلِبُ
cut "$JA_SRC" "$JA_OUT/ja15_tajawraba.mp3"   27.504  28.989
cut "$JA_SRC" "$JA_OUT/ja16_yatajawrabu.mp3" 30.277  32.139
cut "$JA_SRC" "$JA_OUT/ja17_istajlaba.mp3"   33.767  35.605
cut "$JA_SRC" "$JA_OUT/ja18_yastajlibu.mp3"  36.747  38.676

# ════════════════════════════════════════════════════════════
# XO (24. xo.mp3) — 23 chunk
# ════════════════════════════════════════════════════════════
XO_SRC="$ROOT/public/audio/24. xo.mp3"
XO_OUT="$ROOT/Materiallar/harflar/edit_audios/24_xo"
rm -rf "$XO_OUT"
mkdir -p "$XO_OUT"

# Headers: خَ ـخِـ ـخُ (pozitsion — connector harf)
cut "$XO_SRC" "$XO_OUT/xo01_fatha.mp3"        1.377   2.113
cut "$XO_SRC" "$XO_OUT/xo02_kasra.mp3"        2.713   3.349
cut "$XO_SRC" "$XO_OUT/xo03_damma.mp3"        3.779   4.530
# Row 2 (6 so'z): خَبْ خَلْ خَرَجْ خَبَرْ خَشَبْ خَلَفْ
cut "$XO_SRC" "$XO_OUT/xo04_xab.mp3"          6.015   6.821
cut "$XO_SRC" "$XO_OUT/xo05_xal.mp3"          8.186   9.169
cut "$XO_SRC" "$XO_OUT/xo06_xaraj.mp3"       10.257  11.212
cut "$XO_SRC" "$XO_OUT/xo07_xabar.mp3"       12.400  13.361
cut "$XO_SRC" "$XO_OUT/xo08_xashab.mp3"      14.551  15.571
cut "$XO_SRC" "$XO_OUT/xo09_xalaf.mp3"       16.807  17.852
# Row 3 (6 so'z): خَيْرُ خَتْمُ خَمْرُ خَوْفُ مَخْرَجُ مُخْبِرُ
cut "$XO_SRC" "$XO_OUT/xo10_xayru.mp3"       19.696  21.063
cut "$XO_SRC" "$XO_OUT/xo11_xatmu.mp3"       22.339  23.603
cut "$XO_SRC" "$XO_OUT/xo12_xamru.mp3"       25.073  26.324
cut "$XO_SRC" "$XO_OUT/xo13_xawfu.mp3"       27.716  29.169
cut "$XO_SRC" "$XO_OUT/xo14_maxraju.mp3"     30.542  31.884
cut "$XO_SRC" "$XO_OUT/xo15_muxbiru.mp3"     33.165  34.409
# Row 4 (4 so'z): اَخْرَجَ يُخْرِجُ اَخْبَرَ يُخْبِرُ (past/present juftliklar)
cut "$XO_SRC" "$XO_OUT/xo16_axraja.mp3"      36.326  37.616
cut "$XO_SRC" "$XO_OUT/xo17_yuxriju.mp3"     38.890  40.282
cut "$XO_SRC" "$XO_OUT/xo18_axbara.mp3"      41.507  42.776
cut "$XO_SRC" "$XO_OUT/xo19_yuxbiru.mp3"     44.227  45.591
# Row 5 (4 so'z): اِسْتَخْبَرَ يَسْتَخْبِرُ اِسْتَخْرَجَ يَسْتَخْرِجُ
cut "$XO_SRC" "$XO_OUT/xo20_istaxbara.mp3"   47.589  49.440
cut "$XO_SRC" "$XO_OUT/xo21_yastaxbiru.mp3"  50.859  52.856
cut "$XO_SRC" "$XO_OUT/xo22_istaxraja.mp3"   54.404  56.285
cut "$XO_SRC" "$XO_OUT/xo23_yastaxriju.mp3"  57.810  59.796

echo "✓ Jim: $(ls "$JA_OUT" | wc -l) chunk, Xo: $(ls "$XO_OUT" | wc -l) chunk"

#!/bin/bash
# Cut per-element chunks for page 6 (Ba + Kaf).
# Manbalar:
#   - 11. ba.mp3 — Ba bo'limi 18 chunk (3 header + 15 so'z)
#   - 12. ka.mp3 — Kaf bo'limi 21 chunk (3 header + 18 so'z)
# Chegaralar: silence-detect (-40dB/0.15s) + buffer -50/+100 ms.
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
# BA (11. ba.mp3) — 18 chunk
# Headers: ب bi bu (PDF 2.299-5.139) silence-detect bilan 3 ga bo'lindi
# ════════════════════════════════════════════════════════════
BA_SRC="$ROOT/public/audio/11. ba.mp3"
BA_OUT="$ROOT/Materiallar/harflar/edit_audios/11_ba"
rm -rf "$BA_OUT"
mkdir -p "$BA_OUT"

# Headers: بَ ـبِـ ـبُ
cut "$BA_SRC" "$BA_OUT/b01_fatha.mp3"   2.127   2.770
cut "$BA_SRC" "$BA_OUT/b02_kasra.mp3"   3.349   3.980
cut "$BA_SRC" "$BA_OUT/b03_damma.mp3"   4.522   5.254
# Row 1 (6 so'z): اَبْ، اِبْنُ، بِنْتُ، بَيْتُ، بَيْنَ، رَيْبْ
cut "$BA_SRC" "$BA_OUT/b04_ab.mp3"          6.804   7.463
cut "$BA_SRC" "$BA_OUT/b05_ibnu.mp3"        8.756   9.727
cut "$BA_SRC" "$BA_OUT/b06_bintu.mp3"      11.134  12.612
cut "$BA_SRC" "$BA_OUT/b07_baytu.mp3"      13.926  15.308
cut "$BA_SRC" "$BA_OUT/b08_bayna.mp3"      16.687  17.924
cut "$BA_SRC" "$BA_OUT/b09_rayb.mp3"       19.549  20.809
# Row 2 (5 so'z): زَيْنَبْ، بَرْبَرْ، بَيْرَمْ، اَبْرَمْ، مِنْبَرْ
cut "$BA_SRC" "$BA_OUT/b10_zaynab.mp3"     22.856  24.194
cut "$BA_SRC" "$BA_OUT/b11_barbar.mp3"     26.033  27.234
cut "$BA_SRC" "$BA_OUT/b12_bayram.mp3"     29.369  30.736
cut "$BA_SRC" "$BA_OUT/b13_abram.mp3"      32.813  34.032
cut "$BA_SRC" "$BA_OUT/b14_minbar.mp3"     37.131  38.925
# Row 3 (4 so'z): بَاَمْرَيْنِ، بِبَيْتَيْنِ، مِنْبَرَيْنِ، زَيْنَبَيْنِ
cut "$BA_SRC" "$BA_OUT/b15_baamrayni.mp3"     42.391  44.253
cut "$BA_SRC" "$BA_OUT/b16_bibaytayni.mp3"    45.735  47.560
cut "$BA_SRC" "$BA_OUT/b17_minbarayni.mp3"    48.976  51.186
cut "$BA_SRC" "$BA_OUT/b18_zaynabayni.mp3"    52.609  54.552

# ════════════════════════════════════════════════════════════
# KAF (12. ka.mp3) — 21 chunk
# Headers: ka ki ku (PDF 1.519-4.400) silence-detect bilan 3 ga bo'lindi
# ════════════════════════════════════════════════════════════
KA_SRC="$ROOT/public/audio/12. ka.mp3"
KA_OUT="$ROOT/Materiallar/harflar/edit_audios/12_ka"
rm -rf "$KA_OUT"
mkdir -p "$KA_OUT"

# Headers: كَ ـكِـ ـكُ
cut "$KA_SRC" "$KA_OUT/k01_fatha.mp3"   1.491   2.004
cut "$KA_SRC" "$KA_OUT/k02_kasra.mp3"   2.654   3.178
cut "$KA_SRC" "$KA_OUT/k03_damma.mp3"   3.874   4.393
# Row 1 (4 so'z): كَمْ، كُمْ، كُنْ، كَيْ
cut "$KA_SRC" "$KA_OUT/k04_kam.mp3"     6.113   6.805
cut "$KA_SRC" "$KA_OUT/k05_kum.mp3"     8.458   9.211
cut "$KA_SRC" "$KA_OUT/k06_kun.mp3"    11.124  11.945
cut "$KA_SRC" "$KA_OUT/k07_kay.mp3"    13.719  14.480
# Row 2 (5 so'z): بَكْرُ، مَكْرُ، كَرْمُ، كَنْزُ، تَرْكُ
cut "$KA_SRC" "$KA_OUT/k08_bakru.mp3"  16.701  17.823
cut "$KA_SRC" "$KA_OUT/k09_makru.mp3"  19.470  20.607
cut "$KA_SRC" "$KA_OUT/k10_karmu.mp3"  22.364  23.478
cut "$KA_SRC" "$KA_OUT/k11_kanzu.mp3"  25.472  26.984
cut "$KA_SRC" "$KA_OUT/k12_tarku.mp3"  28.888  29.994
# Row 3 (5 so'z): كَتَبَ، يَكْتُبُ، تَرَكَ، يَتْرُكُ، كَتَبْتُمْ
cut "$KA_SRC" "$KA_OUT/k13_kataba.mp3"     31.862  32.773
cut "$KA_SRC" "$KA_OUT/k14_yaktubu.mp3"    34.991  36.341
cut "$KA_SRC" "$KA_OUT/k15_taraka.mp3"     38.449  39.409
cut "$KA_SRC" "$KA_OUT/k16_yatruku.mp3"    41.213  42.647
cut "$KA_SRC" "$KA_OUT/k17_katabtum.mp3"   44.672  46.136
# Row 4 (4 so'z): اَمْرَكَ، اَمَرَتْكَ، كُنْتُ، مُمْكِنْ
cut "$KA_SRC" "$KA_OUT/k18_amraka.mp3"     48.858  50.043
cut "$KA_SRC" "$KA_OUT/k19_amaratka.mp3"   51.836  53.270
cut "$KA_SRC" "$KA_OUT/k20_kuntu.mp3"      55.024  56.521
cut "$KA_SRC" "$KA_OUT/k21_mumkin.mp3"     58.172  59.742

echo "OK — BA: $(ls "$BA_OUT"/*.mp3 | wc -l | tr -d ' ') | KA: $(ls "$KA_OUT"/*.mp3 | wc -l | tr -d ' ')"

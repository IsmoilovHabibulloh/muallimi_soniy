#!/bin/bash
# Cut per-element chunks for page 5 (Ro davom + Nun + Ya).
# Manbalar:
#   - 08. ta.mp3 (20.4s+ qismi) — Ro davom 9 ta so'z
#   - 09. na.mp3 — Nun bo'limi 20 chunk (3 harakat + 17 so'z)
#   - 10. ya.mp3 — Ya bo'limi 18 chunk (3 harakat + 15 so'z)
# Chegaralar: silence-detect (-40dB/0.10s va -30dB/0.15s) + buffer -50/+100 ms.
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
# RO DAVOM (08. ta.mp3 dan, 20.4s+) — 9 ta so'z (t09–t17)
# Existing 08_ta/ folder'ga qo'shiladi
# ════════════════════════════════════════════════════════════
TA_SRC="$ROOT/public/audio/08. ta.mp3"
TA_OUT="$ROOT/Materiallar/harflar/edit_audios/08_ta"
mkdir -p "$TA_OUT"

# Row 1: زُرْتَ (sen m)، اَمَرْتِ (sen f)، مَرَرْتُ (men)، اُمِرْتُ (passiv)، اَمَرَتْ (u f)
cut "$TA_SRC" "$TA_OUT/t09_zurta.mp3"    20.398  21.616
cut "$TA_SRC" "$TA_OUT/t10_amarti.mp3"   23.356  24.599
cut "$TA_SRC" "$TA_OUT/t11_marartu.mp3"  25.879  27.303
cut "$TA_SRC" "$TA_OUT/t12_umirtu.mp3"   30.116  31.395
cut "$TA_SRC" "$TA_OUT/t13_amarat.mp3"   33.432  34.503
# Row 2: اَمَرْتُمْ، اُمِرْتُمْ، مَرَرْتُمْ، مُرِرْتُمْ
cut "$TA_SRC" "$TA_OUT/t14_amartum.mp3"  36.968  38.382
cut "$TA_SRC" "$TA_OUT/t15_umirtum.mp3"  40.429  41.904
cut "$TA_SRC" "$TA_OUT/t16_mararum.mp3"  43.786  45.470
cut "$TA_SRC" "$TA_OUT/t17_murirum.mp3"  47.364  48.969

# ════════════════════════════════════════════════════════════
# NUN (09. na.mp3) — 20 chunk
# Headers block (PDF 1.339-4.319) silence-detect bilan 3 ga bo'lindi
# ════════════════════════════════════════════════════════════
NA_SRC="$ROOT/public/audio/09. na.mp3"
NA_OUT="$ROOT/Materiallar/harflar/edit_audios/09_na"
rm -f "$NA_OUT"/*.mp3
mkdir -p "$NA_OUT"

# Headers: نَ نِ نُ
cut "$NA_SRC" "$NA_OUT/n01_fatha.mp3"    1.131   1.817
cut "$NA_SRC" "$NA_OUT/n02_kasra.mp3"    2.330   3.054
cut "$NA_SRC" "$NA_OUT/n03_damma.mp3"    3.567   4.358
# Row 1: اَنْ، اِنْ، زِنْ، مَنْ، مِنْ، نَمْ
cut "$NA_SRC" "$NA_OUT/n04_an.mp3"       7.111   7.883
cut "$NA_SRC" "$NA_OUT/n05_in.mp3"       9.370  10.140
cut "$NA_SRC" "$NA_OUT/n06_zin.mp3"     11.704  12.687
cut "$NA_SRC" "$NA_OUT/n07_man.mp3"     14.261  15.157
cut "$NA_SRC" "$NA_OUT/n08_min.mp3"     16.568  17.522
cut "$NA_SRC" "$NA_OUT/n09_nam.mp3"     19.019  19.976
# Row 2: اَنْتَ، نِمْتَ، اَنْتُمْ، نِمْتُمْ، نَزَرُ، نَزِنُ
cut "$NA_SRC" "$NA_OUT/n10_anta.mp3"    22.332  23.851
cut "$NA_SRC" "$NA_OUT/n11_nimta.mp3"   25.314  26.699
cut "$NA_SRC" "$NA_OUT/n12_antum.mp3"   28.354  30.173
cut "$NA_SRC" "$NA_OUT/n13_nimtum.mp3"  31.736  33.352
cut "$NA_SRC" "$NA_OUT/n14_naziru.mp3"  34.930  36.181
cut "$NA_SRC" "$NA_OUT/n15_nazinu.mp3"  37.769  39.010
# Row 3: اَمَرْنَ، اُمِرْنَ، مَرَرْنَ، مُرِرْنَ، اَمْرَنَ
cut "$NA_SRC" "$NA_OUT/n16_amarna.mp3"  41.337  42.592
cut "$NA_SRC" "$NA_OUT/n17_umirna.mp3"  44.259  45.610
cut "$NA_SRC" "$NA_OUT/n18_mararna.mp3" 47.615  49.053
cut "$NA_SRC" "$NA_OUT/n19_murirna.mp3" 50.823  52.132
cut "$NA_SRC" "$NA_OUT/n20_amrarna.mp3" 53.980  55.633

# ════════════════════════════════════════════════════════════
# YA (10. ya.mp3) — 18 chunk
# Headers block (PDF 1.279-4.319) silence-detect bilan 3 ga bo'lindi
# ════════════════════════════════════════════════════════════
YA_SRC="$ROOT/public/audio/10. ya.mp3"
YA_OUT="$ROOT/Materiallar/harflar/edit_audios/10_ya"
rm -f "$YA_OUT"/*.mp3
mkdir -p "$YA_OUT"

# Headers: يَ يِ يُ
cut "$YA_SRC" "$YA_OUT/y01_fatha.mp3"    1.073   1.790
cut "$YA_SRC" "$YA_OUT/y02_kasra.mp3"    2.388   3.174
cut "$YA_SRC" "$YA_OUT/y03_damma.mp3"    3.735   4.459
# Row 1: اَيْ، اَيْمُ، زَيْتُ، مَيْتُ، رَأْيُ، رَمَى
cut "$YA_SRC" "$YA_OUT/y04_ay.mp3"       6.035   6.754
cut "$YA_SRC" "$YA_OUT/y05_aymu.mp3"     8.438   9.676
cut "$YA_SRC" "$YA_OUT/y06_zaytu.mp3"   10.665  12.088
cut "$YA_SRC" "$YA_OUT/y07_maytu.mp3"   13.349  14.676
cut "$YA_SRC" "$YA_OUT/y08_rayu.mp3"    15.987  17.352
cut "$YA_SRC" "$YA_OUT/y09_rama.mp3"    18.935  20.231
# Row 2: يَمَنْ، مَرْيَمْ، مِيزَرْ، مَيْمَنْ، اَيْمَنْ
cut "$YA_SRC" "$YA_OUT/y10_yaman.mp3"   21.980  23.052
cut "$YA_SRC" "$YA_OUT/y11_maryam.mp3"  24.799  26.131
cut "$YA_SRC" "$YA_OUT/y12_mayzar.mp3"  27.849  29.128
cut "$YA_SRC" "$YA_OUT/y13_maymun.mp3"  31.026  32.424
cut "$YA_SRC" "$YA_OUT/y14_ayman.mp3"   34.162  35.518
# Row 3: اَمْرَيْنِ، زَيْتَيْنِ، اَيْمَنَيْنِ، مَيْتَيْنِ
cut "$YA_SRC" "$YA_OUT/y15_amrayni.mp3"    37.977  40.111
cut "$YA_SRC" "$YA_OUT/y16_zaytayni.mp3"   41.635  43.489
cut "$YA_SRC" "$YA_OUT/y17_aymayni.mp3"    45.158  46.834
cut "$YA_SRC" "$YA_OUT/y18_maytayni.mp3"   48.420  50.246

echo "OK — TA: $(ls "$TA_OUT"/*.mp3 | wc -l | tr -d ' ') | NA: $(ls "$NA_OUT"/*.mp3 | wc -l | tr -d ' ') | YA: $(ls "$YA_OUT"/*.mp3 | wc -l | tr -d ' ')"

#!/bin/bash
# Cut per-element chunks for page 7 (Lam + Vav).
# Manbalar:
#   - 13. la.mp3 — Lam bo'limi 26 chunk (3 header + 23 so'z)
#   - 14. va.mp3 — Vav bo'limi 23 chunk (3 header + 20 so'z)
# Chegaralar: silence-detect (-40dB/0.10s) + buffer -50/+100 ms.
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
# LAM (13. la.mp3) — 26 chunk
# Headers: la li lu (silence-detect: 3 alohida sound region)
# ════════════════════════════════════════════════════════════
LA_SRC="$ROOT/public/audio/13. la.mp3"
LA_OUT="$ROOT/Materiallar/harflar/edit_audios/13_la"
rm -rf "$LA_OUT"
mkdir -p "$LA_OUT"

# Headers: لَ ـلِـ ـلُ
cut "$LA_SRC" "$LA_OUT/l01_fatha.mp3"     1.942   2.592
cut "$LA_SRC" "$LA_OUT/l02_kasra.mp3"     3.091   3.792
cut "$LA_SRC" "$LA_OUT/l03_damma.mp3"     4.116   4.808
# Row 1 (6 bo'g'in): اَلْ، بَلْ، لَمْ، لُمْ، لَنْ، كِلْ
cut "$LA_SRC" "$LA_OUT/l04_al.mp3"        6.484   7.257
cut "$LA_SRC" "$LA_OUT/l05_bal.mp3"       8.309   9.232
cut "$LA_SRC" "$LA_OUT/l06_lam.mp3"      10.467  11.358
cut "$LA_SRC" "$LA_OUT/l07_lum.mp3"      12.872  13.766
cut "$LA_SRC" "$LA_OUT/l08_lan.mp3"      15.093  16.018
cut "$LA_SRC" "$LA_OUT/l09_kil.mp3"      17.495  18.230
# Row 2 (6 so'z): نَزَلَ، لَزِمَ، كَمَلَ، اَنْزَلَ، اَلْزَمْ، اَكْمَلْ
cut "$LA_SRC" "$LA_OUT/l10_nazala.mp3"   19.694  20.767
cut "$LA_SRC" "$LA_OUT/l11_lazima.mp3"   22.033  23.184
cut "$LA_SRC" "$LA_OUT/l12_kamala.mp3"   24.815  25.808
cut "$LA_SRC" "$LA_OUT/l13_anzala.mp3"   27.543  29.307
cut "$LA_SRC" "$LA_OUT/l14_alzam.mp3"    31.031  32.440
cut "$LA_SRC" "$LA_OUT/l15_akmal.mp3"    34.183  35.428
# Row 3 (6 so'z): اَكَلَتْ، اَكَلْنَا، اَكَلْتَ، اَكَلْتِ، اَكَلْتُ، اَكَلْتُمْ
cut "$LA_SRC" "$LA_OUT/l16_akalat.mp3"   37.421  38.790
cut "$LA_SRC" "$LA_OUT/l17_akalna.mp3"   40.394  41.644
cut "$LA_SRC" "$LA_OUT/l18_akalta.mp3"   43.138  44.381
cut "$LA_SRC" "$LA_OUT/l19_akalti.mp3"   46.033  47.328
cut "$LA_SRC" "$LA_OUT/l20_akaltu.mp3"   49.060  50.379
cut "$LA_SRC" "$LA_OUT/l21_akaltum.mp3"  51.968  53.565
# Row 4 (5 so'z): بُلْبُلْ، يَلْمَلَمْ، تَزَلْزَلَ، يَتَزَلْزَلُ، مُتَزَلْزِلْ
cut "$LA_SRC" "$LA_OUT/l22_bulbul.mp3"       56.206  57.643
cut "$LA_SRC" "$LA_OUT/l23_yalmalam.mp3"     59.172  60.744
cut "$LA_SRC" "$LA_OUT/l24_tazalzala.mp3"    62.521  64.155
cut "$LA_SRC" "$LA_OUT/l25_yatazalzalu.mp3"  65.824  67.945
cut "$LA_SRC" "$LA_OUT/l26_mutazalzil.mp3"   69.637  71.776

# ════════════════════════════════════════════════════════════
# VAV (14. va.mp3) — 23 chunk
# Headers: va vi vu (silence-detect: 3 alohida sound region)
# ════════════════════════════════════════════════════════════
VA_SRC="$ROOT/public/audio/14. va.mp3"
VA_OUT="$ROOT/Materiallar/harflar/edit_audios/14_va"
rm -rf "$VA_OUT"
mkdir -p "$VA_OUT"

# Headers: وَ وِ وُ (non-connector — isolated shakllar)
cut "$VA_SRC" "$VA_OUT/v01_fatha.mp3"     1.314   2.018
cut "$VA_SRC" "$VA_OUT/v02_kasra.mp3"     2.545   3.340
cut "$VA_SRC" "$VA_OUT/v03_damma.mp3"     3.918   4.685
# Row 1 (4 bo'g'in): اَوْ، رَوْ، نَوْ، لَوْ
cut "$VA_SRC" "$VA_OUT/v04_aw.mp3"        5.918   6.666
cut "$VA_SRC" "$VA_OUT/v05_raw.mp3"       8.299   9.189
cut "$VA_SRC" "$VA_OUT/v06_naw.mp3"      10.984  11.939
cut "$VA_SRC" "$VA_OUT/v07_law.mp3"      13.539  14.491
# Row 2 (6 so'z): وَرَمْ، وَتَرْ، وَمَنْ، وَلَنْ، وَلَمْ، وَكَمْ
cut "$VA_SRC" "$VA_OUT/v08_waram.mp3"    16.306  17.427
cut "$VA_SRC" "$VA_OUT/v09_watar.mp3"    19.293  20.302
cut "$VA_SRC" "$VA_OUT/v10_waman.mp3"    22.155  23.232
cut "$VA_SRC" "$VA_OUT/v11_walan.mp3"    25.072  26.164
cut "$VA_SRC" "$VA_OUT/v12_walam.mp3"    27.943  29.007
cut "$VA_SRC" "$VA_OUT/v13_wakam.mp3"    30.934  32.099
# Row 3 (6 so'z): اَوْلُ، رَوْمُ، يَوْمُ، كَوْنُ، وَيْلُ، وَزْنُ
cut "$VA_SRC" "$VA_OUT/v14_awlu.mp3"     34.270  35.463
cut "$VA_SRC" "$VA_OUT/v15_rawmu.mp3"    37.022  38.368
cut "$VA_SRC" "$VA_OUT/v16_yawmu.mp3"    40.018  41.366
cut "$VA_SRC" "$VA_OUT/v17_kawnu.mp3"    43.422  44.652
cut "$VA_SRC" "$VA_OUT/v18_waylu.mp3"    46.504  47.814
cut "$VA_SRC" "$VA_OUT/v19_waznu.mp3"    49.656  50.983
# Row 4 (4 so'z): كَوْكَبْ، مَوْكِبْ، اَوْلَمْتُمْ، اَوْتَرْتُمْ
cut "$VA_SRC" "$VA_OUT/v20_kawkab.mp3"     52.831  54.024
cut "$VA_SRC" "$VA_OUT/v21_mawkib.mp3"     55.962  57.458
cut "$VA_SRC" "$VA_OUT/v22_awlamtum.mp3"   59.998  62.018
cut "$VA_SRC" "$VA_OUT/v23_awtartum.mp3"   63.619  65.614

echo "OK — LA: $(ls "$LA_OUT"/*.mp3 | wc -l | tr -d ' ') | VA: $(ls "$VA_OUT"/*.mp3 | wc -l | tr -d ' ')"

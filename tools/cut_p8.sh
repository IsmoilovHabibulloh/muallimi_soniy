#!/bin/bash
# Cut per-element chunks for page 8 (Ha ه + Fa ف).
# Manbalar:
#   - 15. ha.mp3 — Ha bo'limi 21 chunk (3 header + 18 so'z)
#   - 16. fa.mp3 — Fa bo'limi 25 chunk (3 header + 22 so'z)
# Chegaralar: silence-detect (-40dB/0.08s) + buffer -50/+100 ms.
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
# HA (15. ha.mp3) — 21 chunk
# ════════════════════════════════════════════════════════════
HA_SRC="$ROOT/public/audio/15. ha.mp3"
HA_OUT="$ROOT/Materiallar/harflar/edit_audios/15_ha"
rm -rf "$HA_OUT"
mkdir -p "$HA_OUT"

# Headers: هَ ـهِـ ـهُ
cut "$HA_SRC" "$HA_OUT/h01_fatha.mp3"      1.751   2.511
cut "$HA_SRC" "$HA_OUT/h02_kasra.mp3"      2.940   3.671
cut "$HA_SRC" "$HA_OUT/h03_damma.mp3"      4.048   4.806
# Row 1 (7 so'z): هَبْ، هَمْ، هَلْ، هُوَ، هِيَ، هُمْ، زَهْ
cut "$HA_SRC" "$HA_OUT/h04_hab.mp3"        6.859   7.627
cut "$HA_SRC" "$HA_OUT/h05_ham.mp3"        8.966   9.857
cut "$HA_SRC" "$HA_OUT/h06_hal.mp3"       10.960  11.910
cut "$HA_SRC" "$HA_OUT/h07_huwa.mp3"      13.080  13.969
cut "$HA_SRC" "$HA_OUT/h08_hiya.mp3"      15.142  16.107
cut "$HA_SRC" "$HA_OUT/h09_hum.mp3"       17.305  18.240
cut "$HA_SRC" "$HA_OUT/h10_zah.mp3"       19.609  20.710
# Row 2 (6 so'z): اَهَمْ، وَهَبْ، لَهَبْ، وَهَمْ، لَهُمْ، بِهِمْ
cut "$HA_SRC" "$HA_OUT/h11_aham.mp3"      22.304  23.324
cut "$HA_SRC" "$HA_OUT/h12_wahab.mp3"     24.635  25.823
cut "$HA_SRC" "$HA_OUT/h13_lahab.mp3"     27.123  28.239
cut "$HA_SRC" "$HA_OUT/h14_waham.mp3"     29.552  30.770
cut "$HA_SRC" "$HA_OUT/h15_lahum.mp3"     31.898  33.131
cut "$HA_SRC" "$HA_OUT/h16_bihim.mp3"     34.335  35.566
# Row 3 (5 so'z): مِنْهُ، مِنْهُمْ، اِلَيْهِ، اِلَيْهِمْ، اَمْهِلْهُمْ
cut "$HA_SRC" "$HA_OUT/h17_minhu.mp3"     37.103  38.685
cut "$HA_SRC" "$HA_OUT/h18_minhum.mp3"    39.846  41.531
cut "$HA_SRC" "$HA_OUT/h19_ilayhi.mp3"    42.735  44.288
cut "$HA_SRC" "$HA_OUT/h20_ilayhim.mp3"   45.800  47.536
cut "$HA_SRC" "$HA_OUT/h21_amhilhum.mp3"  48.938  51.320

# ════════════════════════════════════════════════════════════
# FA (16. fa.mp3) — 25 chunk
# ════════════════════════════════════════════════════════════
FA_SRC="$ROOT/public/audio/16. fa.mp3"
FA_OUT="$ROOT/Materiallar/harflar/edit_audios/16_fa"
rm -rf "$FA_OUT"
mkdir -p "$FA_OUT"

# Headers: فَ ـفِـ ـفُ
cut "$FA_SRC" "$FA_OUT/f01_fatha.mp3"      0.742   1.425
cut "$FA_SRC" "$FA_OUT/f02_kasra.mp3"      2.197   2.854
cut "$FA_SRC" "$FA_OUT/f03_damma.mp3"      3.537   4.380
# Row 1 (6 so'z): فَمْ، فَنْ، كَفْ، فَلَكْ، كَفَنْ، نَفَرْ
cut "$FA_SRC" "$FA_OUT/f04_fam.mp3"        6.161   7.020
cut "$FA_SRC" "$FA_OUT/f05_fan.mp3"        8.447   9.339
cut "$FA_SRC" "$FA_OUT/f06_kaf.mp3"       10.811  11.633
cut "$FA_SRC" "$FA_OUT/f07_falak.mp3"     13.309  14.020
cut "$FA_SRC" "$FA_OUT/f08_kafan.mp3"     15.635  16.704
cut "$FA_SRC" "$FA_OUT/f09_nafar.mp3"     17.824  18.895
# Row 2 (6 so'z): فَوْرُ، فَوْزُ، فَهْمُ، فِكْرُ، زِفْرُ، كِفْلُ
cut "$FA_SRC" "$FA_OUT/f10_fawru.mp3"     20.678  21.882
cut "$FA_SRC" "$FA_OUT/f11_fawzu.mp3"     23.168  24.552
cut "$FA_SRC" "$FA_OUT/f12_fahmu.mp3"     25.898  27.203
cut "$FA_SRC" "$FA_OUT/f13_fikru.mp3"     28.523  29.633
cut "$FA_SRC" "$FA_OUT/f14_zifru.mp3"     30.937  32.268
cut "$FA_SRC" "$FA_OUT/f15_kiflu.mp3"     33.680  34.889
# Row 3 (6 so'z): فُلْفُلْ، نَوْفَرُ، نَوْفَلْ، فَهِمَ، يَفْهَمُ، اِفْهَمْ
cut "$FA_SRC" "$FA_OUT/f16_fulful.mp3"    36.524  37.943
cut "$FA_SRC" "$FA_OUT/f17_nawfaru.mp3"   39.242  40.732
cut "$FA_SRC" "$FA_OUT/f18_nawfal.mp3"    42.095  43.662
cut "$FA_SRC" "$FA_OUT/f19_fahima.mp3"    45.043  46.137
cut "$FA_SRC" "$FA_OUT/f20_yafhamu.mp3"   47.474  49.021
cut "$FA_SRC" "$FA_OUT/f21_ifham.mp3"     50.505  51.964
# Row 4 (4 so'z): اِفْتَتَنَ، يَفْتَتِنُ، اِفْتَكَرَ، يَفْتَكِرُ
cut "$FA_SRC" "$FA_OUT/f22_iftatana.mp3"  54.147  55.771
cut "$FA_SRC" "$FA_OUT/f23_yaftatinu.mp3" 57.256  59.085
cut "$FA_SRC" "$FA_OUT/f24_iftakara.mp3"  60.754  62.325
cut "$FA_SRC" "$FA_OUT/f25_yaftakiru.mp3" 63.954  65.698

echo "Done. Ha: $(ls "$HA_OUT" | wc -l) chunk. Fa: $(ls "$FA_OUT" | wc -l) chunk."

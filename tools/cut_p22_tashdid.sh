#!/bin/bash
# Page 22 — Tashdid (continuation): 10 rows × 6 words = 60 chunks
# Source: 34. tashdid.mp3
# Boundaries from silencedetect noise=-35dB duration=0.30
# Buffer: -0.05s start, +0.10s end (vowel attack + fade)

set -e
cd "$(dirname "$0")/.."

FFMPEG="./tools/ffmpeg"
SRC="muallimus-soniy/public/audio/34. tashdid.mp3"
OUT="Materiallar/tashdid/edit_audios/34_tashdid"
mkdir -p "$OUT"

cut() {
  local name="$1" start="$2" end="$3"
  local s=$(awk "BEGIN { v = $start - 0.05; if (v < 0) v = 0; printf \"%.3f\", v }")
  local d=$(awk "BEGIN { printf \"%.3f\", $end - $start + 0.15 }")
  "$FFMPEG" -hide_banner -loglevel error -y -ss "$s" -t "$d" -i "$SRC" \
    -c:a libmp3lame -b:a 192k "$OUT/p22_${name}.mp3"
  echo "  ✓ p22_${name}.mp3 (${s}s + ${d}s)"
}

echo "── Row 1 (fatha+fatha — past fe'l aktiv) ──"
cut "r1_w1_dabbara"   107.539 108.636
cut "r1_w2_kaththara" 109.736 110.721
cut "r1_w3_fajjara"   111.743 113.255
cut "r1_w4_wahhada"   113.656 114.751
cut "r1_w5_sakhkhara" 115.726 116.797
cut "r1_w6_addaba"    117.866 118.849

echo "── Row 2 (fatha+fatha) ──"
cut "r2_w1_harrama"  119.869 120.848
cut "r2_w2_razzaqa"  121.763 122.885
cut "r2_w3_yassara"  123.997 125.051
cut "r2_w4_bashshara" 126.265 127.325
cut "r2_w5_fassala"  128.594 129.604
cut "r2_w6_faddala"  130.856 131.939

echo "── Row 3 (fatha+fatha) ──"
cut "r3_w1_attara"   133.217 134.233
cut "r3_w2_azzama"   135.504 136.608
cut "r3_w3_naama"    137.772 138.943
cut "r3_w4_kaffana"  140.165 141.191
cut "r3_w5_laqqaba"  142.215 143.262
cut "r3_w6_dhakkara" 144.323 145.366

echo "── Row 4 (fatha+fatha) ──"
cut "r4_w1_shammara" 146.402 147.780
cut "r4_w2_allama"   148.866 149.895
cut "r4_w3_kammala"  151.016 152.301
cut "r4_w4_sannafa"  153.244 154.783
cut "r4_w5_sawwara"  155.744 156.844
cut "r4_w6_ghayyara" 157.973 159.144

echo "── Row 5 (damma+kasra — passiv) ──"
cut "r5_w1_dubbira"  161.928 163.019
cut "r5_w2_kuththira" 164.163 165.112
cut "r5_w3_fujjira"  166.177 167.138
cut "r5_w4_wuhhida"  167.936 169.032
cut "r5_w5_sukhkhira" 169.910 170.987
cut "r5_w6_uddiba"   171.896 172.827

echo "── Row 6 (damma+kasra) ──"
cut "r6_w1_hurrima"  173.939 174.811
cut "r6_w2_ruzziqa"  175.634 176.724
cut "r6_w3_yussira"  177.608 178.680
cut "r6_w4_bushshira" 179.726 180.720
cut "r6_w5_fussila"  181.800 182.752
cut "r6_w6_fuddila"  183.888 184.914

echo "── Row 7 (damma+kasra) ──"
cut "r7_w1_uttira"   186.740 187.751
cut "r7_w2_uzzima"   188.747 189.826
cut "r7_w3_nuima"    190.639 191.745
cut "r7_w4_kuffina"  192.853 193.809
cut "r7_w5_luqqiba"  194.828 195.805
cut "r7_w6_dhukkira" 196.872 197.996

echo "── Row 8 (damma+kasra) ──"
cut "r8_w1_ullima"   199.342 200.308
cut "r8_w2_kummila"  201.469 202.746
cut "r8_w3_shummira" 203.600 205.089
cut "r8_w4_sunnifa"  205.872 207.300
cut "r8_w5_suwwira"  208.148 209.208
cut "r8_w6_ghuyyira" 210.120 211.216

echo "── Row 9 (taFa''ala — Form V past fe'l) ──"
cut "r9_w1_tadabbur" 214.078 215.106
cut "r9_w2_takabbur" 216.451 217.515
cut "r9_w3_tahajjur" 218.590 219.758
cut "r9_w4_tawahhud" 220.889 222.098
cut "r9_w5_tasakhkhun" 223.346 225.050
cut "r9_w6_tabaddul" 226.073 227.470

echo "── Row 10 (taFa''ala — Form V) ──"
cut "r10_w1_taharruz" 229.571 230.738
cut "r10_w2_taazzuz"  232.057 233.326
cut "r10_w3_tayassur" 234.968 236.037
cut "r10_w4_taashshuq" 237.599 238.693
cut "r10_w5_taassub"  240.148 241.324
cut "r10_w6_tafaddul" 242.742 244.079

echo
echo "DONE. 60 chunks → $OUT"
ls -1 "$OUT" | grep "^p22_" | wc -l | xargs echo "Files created:"

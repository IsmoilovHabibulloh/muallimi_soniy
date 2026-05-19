#!/bin/bash
# Cut per-element chunks for page 10 (Sin س + Tsa ث).
# Manbalar:
#   - 19. sa.mp3  — Sin bo'limi 23 chunk (3 header + 5+6+5+4 so'z)
#   - 20. sa.mp3  — Tsa bo'limi 30 chunk (3 header + 6+6+5+4 so'z + 6 comparison)
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
# SIN (19. sa.mp3) — 23 chunk
# ════════════════════════════════════════════════════════════
SI_SRC="$ROOT/public/audio/19. sa.mp3"
SI_OUT="$ROOT/Materiallar/harflar/edit_audios/19_sa"
rm -rf "$SI_OUT"
mkdir -p "$SI_OUT"

# Headers: سَ ـسِـ ـسُ (pozitsion — connector harf)
cut "$SI_SRC" "$SI_OUT/si01_fatha.mp3"        1.830   2.470
cut "$SI_SRC" "$SI_OUT/si02_kasra.mp3"        3.000   3.640
cut "$SI_SRC" "$SI_OUT/si03_damma.mp3"        4.070   4.730
# Row 1 (5 so'z): بَسْ سَمْ سِرْ سِنْ سِلْ
cut "$SI_SRC" "$SI_OUT/si04_bas.mp3"          6.060   6.980
cut "$SI_SRC" "$SI_OUT/si05_sam.mp3"          8.090   8.930
cut "$SI_SRC" "$SI_OUT/si06_sir.mp3"          9.900  10.590
cut "$SI_SRC" "$SI_OUT/si07_sin.mp3"         11.700  12.550
cut "$SI_SRC" "$SI_OUT/si08_sil.mp3"         13.760  14.620
# Row 2 (6 so'z): سَفَرْ سَقَرْ سَبَقْ سَلَفْ سَمَكْ فَرَسْ
cut "$SI_SRC" "$SI_OUT/si09_safar.mp3"       15.700  16.670
cut "$SI_SRC" "$SI_OUT/si10_saqar.mp3"       17.760  18.790
cut "$SI_SRC" "$SI_OUT/si11_sabaq.mp3"       19.850  20.790
cut "$SI_SRC" "$SI_OUT/si12_salaf.mp3"       22.120  23.100
cut "$SI_SRC" "$SI_OUT/si13_samak.mp3"       24.570  25.380
cut "$SI_SRC" "$SI_OUT/si14_faras.mp3"       26.770  27.870
# Row 3 (5 so'z): مَسْلَكْ مَسْكَنْ مُسْلِمْ مُسْرِفْ سِمْسِمْ
cut "$SI_SRC" "$SI_OUT/si15_maslak.mp3"      29.740  30.850
cut "$SI_SRC" "$SI_OUT/si16_maskan.mp3"      32.140  33.530
cut "$SI_SRC" "$SI_OUT/si17_muslim.mp3"      34.610  36.060
cut "$SI_SRC" "$SI_OUT/si18_musrif.mp3"      37.120  38.580
cut "$SI_SRC" "$SI_OUT/si19_simsim.mp3"      39.760  41.320
# Row 4 (4 so'z): اَسْلَمَ يُسْلِمُ اِسْتَيْسَرَ يَسْتَيْسِرُ
cut "$SI_SRC" "$SI_OUT/si20_aslama.mp3"      43.060  44.400
cut "$SI_SRC" "$SI_OUT/si21_yuslimu.mp3"     45.580  47.000
cut "$SI_SRC" "$SI_OUT/si22_istaysara.mp3"   48.340  50.330
cut "$SI_SRC" "$SI_OUT/si23_yastaysiru.mp3"  51.600  53.710

# ════════════════════════════════════════════════════════════
# TSA (20. sa.mp3) — 30 chunk
# ════════════════════════════════════════════════════════════
TH_SRC="$ROOT/public/audio/20. sa.mp3"
TH_OUT="$ROOT/Materiallar/harflar/edit_audios/20_tsa"
rm -rf "$TH_OUT"
mkdir -p "$TH_OUT"

# Headers: ثَ ـثِـ ـثُ (pozitsion — connector harf)
cut "$TH_SRC" "$TH_OUT/th01_fatha.mp3"        0.650   1.310
cut "$TH_SRC" "$TH_OUT/th02_kasra.mp3"        1.670   2.420
cut "$TH_SRC" "$TH_OUT/th03_damma.mp3"        2.780   3.450
# Row 1 (6 so'z): بَثْ ثِبْ ثَمْ ثِنْ ثَمَرُ ثَمَنٌ
cut "$TH_SRC" "$TH_OUT/th04_bath.mp3"         4.830   5.780
cut "$TH_SRC" "$TH_OUT/th05_thib.mp3"         6.820   7.570
cut "$TH_SRC" "$TH_OUT/th06_tham.mp3"         8.630   9.580
cut "$TH_SRC" "$TH_OUT/th07_thin.mp3"        11.000  11.910
cut "$TH_SRC" "$TH_OUT/th08_thamaru.mp3"     13.060  14.030
cut "$TH_SRC" "$TH_OUT/th09_thamanun.mp3"    15.090  16.190
# Row 2 (6 so'z): ثَوْرُ ثَوْبُ ثَيْبُ مِثْلُ مُثْلُ مَثَلٌ
cut "$TH_SRC" "$TH_OUT/th10_thawru.mp3"      18.040  19.330
cut "$TH_SRC" "$TH_OUT/th11_thawbu.mp3"      20.570  21.820
cut "$TH_SRC" "$TH_OUT/th12_thaybu.mp3"      23.280  24.560
cut "$TH_SRC" "$TH_OUT/th13_mithlu.mp3"      26.120  27.380
cut "$TH_SRC" "$TH_OUT/th14_muthlu.mp3"      28.930  30.260
cut "$TH_SRC" "$TH_OUT/th15_mathalun.mp3"    31.610  32.680
# Row 3 (5 so'z): كَوْثَرُ اَكْثَرَ يُكْثِرُ اَثْبَتَ يُثْبِتُ
cut "$TH_SRC" "$TH_OUT/th16_kawtharu.mp3"    34.530  35.800
cut "$TH_SRC" "$TH_OUT/th17_aksara.mp3"      37.310  38.610
cut "$TH_SRC" "$TH_OUT/th18_yuksiru.mp3"     40.000  41.390
cut "$TH_SRC" "$TH_OUT/th19_asbata.mp3"      43.060  44.430
cut "$TH_SRC" "$TH_OUT/th20_yusbitu.mp3"     46.150  47.600
# Row 4 (4 so'z): اِسْتَكْثَرَ يَسْتَكْثِرُ اِسْتَثْقَلَ يَسْتَثْقِلُ
cut "$TH_SRC" "$TH_OUT/th21_istaksara.mp3"   49.920  51.830
cut "$TH_SRC" "$TH_OUT/th22_yastaksiru.mp3"  53.420  55.420
cut "$TH_SRC" "$TH_OUT/th23_istasqala.mp3"   57.440  59.500
cut "$TH_SRC" "$TH_OUT/th24_yastasqilu.mp3"  61.190  63.300
# Row 5 (6 so'z, 3 juftlik): سَمَرْ-ثَمَرْ، سَبْتْ-ثَبْتْ، سَلْسْ-ثَلْثْ
cut "$TH_SRC" "$TH_OUT/th25_samar.mp3"       66.630  67.520
cut "$TH_SRC" "$TH_OUT/th26_thamar.mp3"      69.010  69.920
cut "$TH_SRC" "$TH_OUT/th27_sabt.mp3"        71.670  72.870
cut "$TH_SRC" "$TH_OUT/th28_thabt.mp3"       74.370  75.560
cut "$TH_SRC" "$TH_OUT/th29_sals.mp3"        77.050  78.450
cut "$TH_SRC" "$TH_OUT/th30_thalth.mp3"      79.990  81.450

echo "✓ Page 10 chunks generated: 23 Sin + 30 Tsa = 53 total"

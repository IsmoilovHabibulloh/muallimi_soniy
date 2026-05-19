#!/bin/bash
# Cut per-element chunks for page 14 (Ayn ع + Dal د).
# Manbalar:
#   - 27. ayn.mp3 — Ayn bo'limi: 3 header + 7 + 6 + 5 + 6 = 27 chunk
#   - 28. da.mp3  — Dal bo'limi: 3 header + 6 + 6 + 4 + 4 = 23 chunk
# Chegaralar: silencedetect (-40dB/0.18s) + buffer -50/+100 ms.
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
# AYN (27. ayn.mp3) — 27 chunk
# ════════════════════════════════════════════════════════════
AY_SRC="$ROOT/public/audio/27. ayn.mp3"
AY_OUT="$ROOT/Materiallar/harflar/edit_audios/27_ayn"
rm -rf "$AY_OUT"
mkdir -p "$AY_OUT"

# Headers: عَ ـعِـ ـعُ (pozitsion — connector harf)
cut "$AY_SRC" "$AY_OUT/ay01_fatha.mp3"         2.087   2.732
cut "$AY_SRC" "$AY_OUT/ay02_kasra.mp3"         3.134   3.800
cut "$AY_SRC" "$AY_OUT/ay03_damma.mp3"         4.120   4.840
# Row 1 (7 so'z): بِعْ عَنْ عَمْ سَعْ مَعَ عَرَبْ عَجَمْ
cut "$AY_SRC" "$AY_OUT/ay04_bi3.mp3"           5.919   6.729
cut "$AY_SRC" "$AY_OUT/ay05_3an.mp3"           8.460   9.295
cut "$AY_SRC" "$AY_OUT/ay06_3am.mp3"          10.284  11.156
cut "$AY_SRC" "$AY_OUT/ay07_sa3.mp3"          12.030  12.927
cut "$AY_SRC" "$AY_OUT/ay08_ma3a.mp3"         13.789  14.796
cut "$AY_SRC" "$AY_OUT/ay09_3arab.mp3"        15.785  16.808
cut "$AY_SRC" "$AY_OUT/ay10_3ajam.mp3"        17.877  18.968
# Row 2 (6 so'z): عَجَبْ عَمَلْ عِلْمُ عُمْرُ جَمْعُ جَعْلُ
cut "$AY_SRC" "$AY_OUT/ay11_3ajab.mp3"        20.174  21.185
cut "$AY_SRC" "$AY_OUT/ay12_3amal.mp3"        22.201  23.241
cut "$AY_SRC" "$AY_OUT/ay13_3ilmu.mp3"        24.027  25.371
cut "$AY_SRC" "$AY_OUT/ay14_3umru.mp3"        26.325  27.633
cut "$AY_SRC" "$AY_OUT/ay15_jam3u.mp3"        28.705  30.113
cut "$AY_SRC" "$AY_OUT/ay16_ja3lu.mp3"        31.297  32.633
# Row 3 (5 so'z): عَبْعَبْ عَسْكَرُ عَیْلَم جَعْفَرُ عَنْبَرُ
cut "$AY_SRC" "$AY_OUT/ay17_3ab3ab.mp3"       34.154  35.346
cut "$AY_SRC" "$AY_OUT/ay18_3askaru.mp3"      36.841  38.131
cut "$AY_SRC" "$AY_OUT/ay19_3aylam.mp3"       39.525  40.926
cut "$AY_SRC" "$AY_OUT/ay20_ja3faru.mp3"      42.126  43.524
cut "$AY_SRC" "$AY_OUT/ay21_3anbaru.mp3"      44.839  46.418
# Row 4 (6 so'z, 3 juftlik — taqqoslash): غَیْنُ-عَیْنُ، بَغْلُ-بَعْلُ، بَلْغُ-بَلْعُ
cut "$AY_SRC" "$AY_OUT/ay22_ghaynu.mp3"       48.707  50.069
cut "$AY_SRC" "$AY_OUT/ay23_3aynu.mp3"        51.302  52.513
cut "$AY_SRC" "$AY_OUT/ay24_baghlu.mp3"       53.732  55.052
cut "$AY_SRC" "$AY_OUT/ay25_ba3lu.mp3"        56.342  57.637
cut "$AY_SRC" "$AY_OUT/ay26_balghu.mp3"       59.110  60.511
cut "$AY_SRC" "$AY_OUT/ay27_bal3u.mp3"        61.789  63.191

# ════════════════════════════════════════════════════════════
# DAL (28. da.mp3) — 23 chunk
# ════════════════════════════════════════════════════════════
DA_SRC="$ROOT/public/audio/28. da.mp3"
DA_OUT="$ROOT/Materiallar/harflar/edit_audios/28_dal"
rm -rf "$DA_OUT"
mkdir -p "$DA_OUT"

# Headers: دَ دِ دُ (non-connector — isolated)
cut "$DA_SRC" "$DA_OUT/da01_fatha.mp3"          1.374   2.014
cut "$DA_SRC" "$DA_OUT/da02_kasra.mp3"          2.415   3.087
cut "$DA_SRC" "$DA_OUT/da03_damma.mp3"          3.381   4.100
# Row 1 (6 so'z): دُمْ دُبْ دُفْ رِدْ زِدْ تَدْ
cut "$DA_SRC" "$DA_OUT/da04_dum.mp3"            5.391   6.330
cut "$DA_SRC" "$DA_OUT/da05_dub.mp3"            7.466   8.237
cut "$DA_SRC" "$DA_OUT/da06_duf.mp3"            9.478  10.487
cut "$DA_SRC" "$DA_OUT/da07_rid.mp3"           11.596  12.291
cut "$DA_SRC" "$DA_OUT/da08_zid.mp3"           13.222  14.384
cut "$DA_SRC" "$DA_OUT/da09_tad.mp3"           15.437  16.117
# Row 2 (6 so'z): دَرَسُ دَفْعُ دَبْغُ دَلْكُ دَهْرُ دَهْنُ
cut "$DA_SRC" "$DA_OUT/da10_darasu.mp3"        17.377  18.608
cut "$DA_SRC" "$DA_OUT/da11_daf3u.mp3"         19.877  21.190
cut "$DA_SRC" "$DA_OUT/da12_dabghu.mp3"        22.620  23.852
cut "$DA_SRC" "$DA_OUT/da13_dalku.mp3"         25.344  26.615
cut "$DA_SRC" "$DA_OUT/da14_dahru.mp3"         28.021  29.281
cut "$DA_SRC" "$DA_OUT/da15_dahnu.mp3"         30.574  31.929
# Row 3 (4 so'z): دُلْدُلْ فُدْفُدْ هُدْهُدْ اُشْدُدْ
cut "$DA_SRC" "$DA_OUT/da16_duldul.mp3"        33.455  34.921
cut "$DA_SRC" "$DA_OUT/da17_fudfud.mp3"        36.240  37.453
cut "$DA_SRC" "$DA_OUT/da18_hudhud.mp3"        38.866  40.212
cut "$DA_SRC" "$DA_OUT/da19_ushdud.mp3"        41.723  43.038
# Row 4 (4 so'z): اِعْتَدَلَ یَعْتَدِلُ اِسْتَرْشَدَ یَسْتَرْشِدْ
cut "$DA_SRC" "$DA_OUT/da20_i3tadala.mp3"      44.843  46.462
cut "$DA_SRC" "$DA_OUT/da21_ya3tadilu.mp3"     47.743  49.435
cut "$DA_SRC" "$DA_OUT/da22_istarshada.mp3"    50.978  52.895
cut "$DA_SRC" "$DA_OUT/da23_yastarshid.mp3"    54.263  56.272

echo "✓ Page 14 chunks generated: 27 Ayn + 23 Dal = 50 total"

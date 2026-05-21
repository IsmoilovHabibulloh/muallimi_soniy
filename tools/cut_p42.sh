#!/usr/bin/env bash
# tools/cut_p42.sh — Page 42 chunklarni kesish (Zalzala + Adiyat)
#
# Source 1: public/audio/66. Zalzala.mp3 (87.51s) — Bismillah + 8 oyat
# Source 2: public/audio/67. Adiya.mp3   (91.48s) — Bismillah + 11 oyat
#
# Output:
#   public/audio/edit/66_zalzala/p42_*.mp3
#   public/audio/edit/67_adiya/p42_*.mp3
#
# Timings: silencedetect -32dB/0.50s asoslangan. Buffers: start -0.10s, end +0.15s.

set -euo pipefail

cd "$(dirname "$0")/.."

ZZ_SRC="public/audio/66. Zalzala.mp3"
AD_SRC="public/audio/67. Adiya.mp3"

ZZ_OUT="public/audio/edit/66_zalzala"
AD_OUT="public/audio/edit/67_adiya"

ZZ_MAT="Materiallar/suralarning asl nusxalari/edit_audios/66_zalzala"
AD_MAT="Materiallar/suralarning asl nusxalari/edit_audios/67_adiya"

mkdir -p "$ZZ_OUT" "$AD_OUT" "$ZZ_MAT" "$AD_MAT"

cut() {
  # cut <src> <out_dir> <name> <start> <end>
  local src="$1" outdir="$2" name="$3" start="$4" end="$5"
  local dur
  dur=$(awk "BEGIN { printf \"%.4f\", $end - $start }")
  ffmpeg -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k "$outdir/$name.mp3" -loglevel error
  echo "  $name.mp3 [$start -> $end] ($(printf '%.2f' "$dur")s)"
}

echo "=== Zalzala (66. Zalzala.mp3) ==="
# Speech regions (from silencedetect -32dB/0.50s):
#   bism   0.62 -> 5.17   (buffers: -0.10 / +0.15)
#   a1     9.31 -> 14.72
#   a2    17.40 -> 22.11
#   a3    24.96 -> 29.61
#   a4    32.55 -> 37.97
#   a5    41.25 -> 46.01
#   a6    49.47 -> 59.27   (long ayah)
#   a7    63.64 -> 71.50
#   a8    74.39 -> 83.12
cut "$ZZ_SRC" "$ZZ_OUT" "p42_zz_bism"   0.52   5.32
cut "$ZZ_SRC" "$ZZ_OUT" "p42_zz_a1"     9.21  14.87
cut "$ZZ_SRC" "$ZZ_OUT" "p42_zz_a2"    17.30  22.26
cut "$ZZ_SRC" "$ZZ_OUT" "p42_zz_a3"    24.86  29.76
cut "$ZZ_SRC" "$ZZ_OUT" "p42_zz_a4"    32.45  38.12
cut "$ZZ_SRC" "$ZZ_OUT" "p42_zz_a5"    41.15  46.16
cut "$ZZ_SRC" "$ZZ_OUT" "p42_zz_a6"    49.37  59.42
cut "$ZZ_SRC" "$ZZ_OUT" "p42_zz_a7"    63.54  71.65
cut "$ZZ_SRC" "$ZZ_OUT" "p42_zz_a8"    74.29  83.27

echo "=== Adiyat (67. Adiya.mp3) ==="
# Speech regions:
#   bism   0.68 -> 6.13   (buffers)
#   a1     8.81 -> 12.27
#   a2    14.45 -> 17.90
#   a3    20.13 -> 23.59
#   a4    25.79 -> 29.19
#   a5    31.36 -> 34.79
#   a6    37.42 -> 44.81   (longer)
#   a7    47.61 -> 53.77
#   a8    56.50 -> 63.60
#   a9    66.27 -> 73.57
#   a10   75.93 -> 80.08
#   a11   82.38 -> 90.22
cut "$AD_SRC" "$AD_OUT" "p42_ad_bism"   0.58   6.28
cut "$AD_SRC" "$AD_OUT" "p42_ad_a1"     8.71  12.42
cut "$AD_SRC" "$AD_OUT" "p42_ad_a2"    14.35  18.05
cut "$AD_SRC" "$AD_OUT" "p42_ad_a3"    20.03  23.74
cut "$AD_SRC" "$AD_OUT" "p42_ad_a4"    25.69  29.34
cut "$AD_SRC" "$AD_OUT" "p42_ad_a5"    31.26  34.94
cut "$AD_SRC" "$AD_OUT" "p42_ad_a6"    37.32  44.96
cut "$AD_SRC" "$AD_OUT" "p42_ad_a7"    47.51  53.92
cut "$AD_SRC" "$AD_OUT" "p42_ad_a8"    56.40  63.75
cut "$AD_SRC" "$AD_OUT" "p42_ad_a9"    66.17  73.72
cut "$AD_SRC" "$AD_OUT" "p42_ad_a10"   75.83  80.23
cut "$AD_SRC" "$AD_OUT" "p42_ad_a11"   82.28  90.37

# Mirror to Materiallar (master copies)
echo "=== Master copies ==="
cp "$ZZ_OUT"/p42_zz_*.mp3 "$ZZ_MAT/"
cp "$AD_OUT"/p42_ad_*.mp3 "$AD_MAT/"
echo "  copied to $ZZ_MAT and $AD_MAT"

echo
echo "Done — $(ls "$ZZ_OUT"/p42_zz_*.mp3 | wc -l) Zalzala + $(ls "$AD_OUT"/p42_ad_*.mp3 | wc -l) Adiyat chunks"

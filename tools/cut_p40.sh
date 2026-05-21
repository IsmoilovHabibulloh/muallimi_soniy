#!/bin/bash
# Cut audio chunks for page 40 — Surah Al-Alaq (19 verses) + Surah Al-Qadr (bismillah + 5 verses)
# Sources:
#   - public/audio/63. Alaq.mp3 (147.04s) — Bismillah + 19 verses
#   - public/audio/64. Qadr.mp3 (49.84s)  — Bismillah + 5 verses
#
# Al-Alaq sound regions (silencedetect -32dB/0.30s):
#   region A:  1.69 -  6.72  (5.02s) — Bismillahir-rahmanir-rahim (skip — title is on p39)
#   region B: 10.31 - 14.98  (4.67s) — V1  اقرأ باسم ربك الذي خلق
#   region C: 17.20 - 21.71  (4.51s) — V2  خلق الإنسان من علق
#   region D: 24.16 - 27.79  (3.63s) — V3  اقرأ وربك الأكرم
#   region E: 30.50 - 34.01  (3.51s) — V4  الذي علم بالقلم
#   region F: 36.74 - 42.14  (5.40s) — V5  علم الإنسان ما لم يعلم
#   region G: 45.21 - 52.56  (7.35s) — V6  كلا إن الإنسان ليطغى
#   region H: 55.36 - 58.46  (3.10s) — V7  أن رآه استغنى
#   region I: 61.20 - 65.57  (4.37s) — V8  إن إلى ربك الرجعى
#   region J: 68.64 - 72.26  (3.63s) — V9  أرأيت الذي ينهى
#   region K: 74.60 - 77.66  (3.06s) — V10 عبدا إذا صلى
#   region L: 81.04 - 85.76  (4.72s) — V11 أرأيت إن كان على الهدى
#   region M: 88.51 - 91.40  (2.89s) — V12 أو أمر بالتقوى
#   region N: 94.46 - 99.37  (4.91s) — V13 أرأيت إن كذب وتولى
#   region O: 101.81-107.65  (5.83s) — V14 ألم يعلم بأن الله يرى
#   region P: 110.59-118.99  (8.41s) — V15 كلا لئن لم ينته لنسفعا بالناصية
#   region Q: 121.14-126.49  (5.36s) — V16 ناصية كاذبة خاطئة
#   region R: 129.55-132.25  (2.70s) — V17 فليدع ناديه
#   region S: 134.63-137.73  (3.10s) — V18 سندع الزبانية
#   region T: 140.30-145.84  (5.53s) — V19 كلا لا تطعه واسجد واقترب
#
# Al-Qadr sound regions:
#   region A:  0.43 -  4.33  (3.91s) — Bismillah
#   region B:  6.43 - 14.34  (7.91s) — V1  إنا أنزلناه في ليلة القدر
#   region C: 16.26 - 21.88  (5.62s) — V2  وما أدراك ما ليلة القدر
#   region D: 23.78 - 29.80  (6.02s) — V3  ليلة القدر خير من ألف شهر
#   region E: 31.37 - 42.51  (11.14s) — V4  تنزل الملائكة والروح فيها بإذن ربهم من كل أمر
#   region F+G: 43.52 - 48.54 (5.02s, internal 0.4s pause) — V5 سلام هي حتى مطلع الفجر
#
# All chunks: -50ms head / +100ms tail buffer for natural attack/decay.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ALAQ="$ROOT/public/audio/63. Alaq.mp3"
QADR="$ROOT/public/audio/64. Qadr.mp3"
OUT_A="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/63_alaq"
OUT_Q="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/64_qadr"
PUB_A="$ROOT/public/audio/edit/63_alaq"
PUB_Q="$ROOT/public/audio/edit/64_qadr"
FFMPEG="ffmpeg"

mkdir -p "$OUT_A" "$OUT_Q" "$PUB_A" "$PUB_Q"

cut() {
    local src="$1" outdir="$2" name="$3" start="$4" end="$5"
    local dur
    dur=$(python -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$outdir/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Page 40 — Al-Alaq (19 verses) ==="
cut "$ALAQ" "$OUT_A" p40_a01  10.250  15.080
cut "$ALAQ" "$OUT_A" p40_a02  17.140  21.810
cut "$ALAQ" "$OUT_A" p40_a03  24.100  27.890
cut "$ALAQ" "$OUT_A" p40_a04  30.440  34.110
cut "$ALAQ" "$OUT_A" p40_a05  36.680  42.240
cut "$ALAQ" "$OUT_A" p40_a06  45.150  52.660
cut "$ALAQ" "$OUT_A" p40_a07  55.300  58.560
cut "$ALAQ" "$OUT_A" p40_a08  61.140  65.670
cut "$ALAQ" "$OUT_A" p40_a09  68.580  72.360
cut "$ALAQ" "$OUT_A" p40_a10  74.540  77.760
cut "$ALAQ" "$OUT_A" p40_a11  80.980  85.860
cut "$ALAQ" "$OUT_A" p40_a12  88.450  91.500
cut "$ALAQ" "$OUT_A" p40_a13  94.400  99.470
cut "$ALAQ" "$OUT_A" p40_a14 101.750 107.750
cut "$ALAQ" "$OUT_A" p40_a15 110.530 119.090
cut "$ALAQ" "$OUT_A" p40_a16 121.080 126.590
cut "$ALAQ" "$OUT_A" p40_a17 129.490 132.350
cut "$ALAQ" "$OUT_A" p40_a18 134.570 137.830
cut "$ALAQ" "$OUT_A" p40_a19 140.240 145.940

echo ""
echo "=== Page 40 — Al-Qadr (bismillah + 5 verses) ==="
cut "$QADR" "$OUT_Q" p40_q_bism  0.370   4.440
cut "$QADR" "$OUT_Q" p40_q01     6.370  14.440
cut "$QADR" "$OUT_Q" p40_q02    16.200  21.980
cut "$QADR" "$OUT_Q" p40_q03    23.720  29.900
cut "$QADR" "$OUT_Q" p40_q04    31.310  42.610
cut "$QADR" "$OUT_Q" p40_q05    43.460  48.640

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT_A"/p40_*.mp3 "$PUB_A/"
cp "$OUT_Q"/p40_*.mp3 "$PUB_Q/"
echo "Done."
echo "  Alaq: $(ls "$PUB_A"/p40_*.mp3 | wc -l) chunks"
echo "  Qadr: $(ls "$PUB_Q"/p40_*.mp3 | wc -l) chunks"

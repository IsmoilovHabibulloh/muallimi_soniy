#!/bin/bash
# Cut audio chunks for page 45 — 3 surahs (Quraysh, Al-Ma'un, Al-Kawthar) + Al-Kafirun header.
# Sources:
#   Materiallar/suralarning asl nusxalari/audio/73. Quraysh.mp3 (48.59s)
#   Materiallar/suralarning asl nusxalari/audio/74. Mauvn.mp3   (62.20s)
#   Materiallar/suralarning asl nusxalari/audio/75. Kavsar.mp3  (29.54s)
#   Materiallar/suralarning asl nusxalari/audio/76. Kafirun.mp3 (65.36s) — bismillah only
#
# Boundaries from silencedetect -32dB/0.30s with ~0.2s buffers either side.
# Quraysh: Bismillah + 4 ayahs = 5 chunks.
# Al-Ma'un: Bismillah + 7 ayahs = 8 chunks (ayahs 4/5 merged in audio; split at 38.50s).
# Al-Kawthar: Bismillah + 3 ayahs = 4 chunks.
# Al-Kafirun: Bismillah only (ayahs are on book page 46) = 1 chunk.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_QU="$ROOT/Materiallar/suralarning asl nusxalari/audio/73. Quraysh.mp3"
SRC_MA="$ROOT/Materiallar/suralarning asl nusxalari/audio/74. Mauvn.mp3"
SRC_KA="$ROOT/Materiallar/suralarning asl nusxalari/audio/75. Kavsar.mp3"
SRC_KF="$ROOT/Materiallar/suralarning asl nusxalari/audio/76. Kafirun.mp3"
OUT_QU="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/73_quraysh"
OUT_MA="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/74_mauvn"
OUT_KA="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/75_kavsar"
OUT_KF="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/76_kafirun"
PUB_QU="$ROOT/public/audio/edit/73_quraysh"
PUB_MA="$ROOT/public/audio/edit/74_mauvn"
PUB_KA="$ROOT/public/audio/edit/75_kavsar"
PUB_KF="$ROOT/public/audio/edit/76_kafirun"
FFMPEG="ffmpeg"

mkdir -p "$OUT_QU" "$OUT_MA" "$OUT_KA" "$OUT_KF" "$PUB_QU" "$PUB_MA" "$PUB_KA" "$PUB_KF"

cut() {
    local src="$1" out="$2" name="$3" start="$4" end="$5"
    local dur=$(python -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$out/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Surah Quraysh — Bismillah + 4 ayahs ==="
cut "$SRC_QU" "$OUT_QU" p45_qu_bism  1.20   6.45
cut "$SRC_QU" "$OUT_QU" p45_qu_a1    9.40  13.40
cut "$SRC_QU" "$OUT_QU" p45_qu_a2   15.20  22.75
cut "$SRC_QU" "$OUT_QU" p45_qu_a3   25.60  31.45
cut "$SRC_QU" "$OUT_QU" p45_qu_a4   34.55  47.25

echo ""
echo "=== Surah Al-Ma'un — Bismillah + 7 ayahs ==="
cut "$SRC_MA" "$OUT_MA" p45_ma_bism  0.90   5.55
cut "$SRC_MA" "$OUT_MA" p45_ma_a1    8.40  14.45
cut "$SRC_MA" "$OUT_MA" p45_ma_a2   16.50  22.55
cut "$SRC_MA" "$OUT_MA" p45_ma_a3   24.65  31.40
# 2026-08-27: chegara 38.55 -> 38.46 (energiya profili: eng past nuqta
# 38.44s edi, 38.55 esa a5 so'zining boshlanishini a4 ichiga qo'shib
# qo'yardi). elements.ts endi HAR IKKALASINI shu alohida fayllarga
# bog'laydi — avval ikkalasi ham p45_ma_a4_a5 (quyida) ga bog'langan edi,
# bosilganda AYNI bir 11.05s audio ikki marta eshitilardi.
cut "$SRC_MA" "$OUT_MA" p45_ma_a4   34.25  38.46
cut "$SRC_MA" "$OUT_MA" p45_ma_a5   38.46  45.30
# a4+a5 birlashtirilgan (reciter uzluksiz o'qigan) — hozir elements.ts da
# ISHLATILMAYDI, faqat zaxira sifatida saqlanadi.
cut "$SRC_MA" "$OUT_MA" p45_ma_a4_a5 34.25 45.30
cut "$SRC_MA" "$OUT_MA" p45_ma_a6   48.40  54.30
cut "$SRC_MA" "$OUT_MA" p45_ma_a7   56.30  61.55

echo ""
echo "=== Surah Al-Kawthar — Bismillah + 3 ayahs ==="
cut "$SRC_KA" "$OUT_KA" p45_ka_bism  0.65   5.75
cut "$SRC_KA" "$OUT_KA" p45_ka_a1    8.45  15.25
cut "$SRC_KA" "$OUT_KA" p45_ka_a2   17.30  21.35
cut "$SRC_KA" "$OUT_KA" p45_ka_a3   23.50  28.45

echo ""
echo "=== Surah Al-Kafirun — Bismillah only (ayahs on p46) ==="
cut "$SRC_KF" "$OUT_KF" p45_kf_bism  0.95   6.45

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT_QU"/p45_qu_*.mp3 "$PUB_QU/"
cp "$OUT_MA"/p45_ma_*.mp3 "$PUB_MA/"
cp "$OUT_KA"/p45_ka_*.mp3 "$PUB_KA/"
cp "$OUT_KF"/p45_kf_*.mp3 "$PUB_KF/"
echo "Quraysh chunks:  $(ls "$PUB_QU"/p45_qu_*.mp3 | wc -l)"
echo "Mauvn chunks:    $(ls "$PUB_MA"/p45_ma_*.mp3 | wc -l)"
echo "Kawthar chunks:  $(ls "$PUB_KA"/p45_ka_*.mp3 | wc -l)"
echo "Kafirun chunks:  $(ls "$PUB_KF"/p45_kf_*.mp3 | wc -l)"

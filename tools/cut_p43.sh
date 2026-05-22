#!/bin/bash
# Cut audio chunks for page 43 — Surah Al-Qari'ah (Bismillah + 11 ayat) +
# Surah At-Takathur (Bismillah + 8 ayat) + Surah Al-Asr (Bismillah only,
# title-header section; full body of Asr continues on page 44).
#
# Sources:
#   Materiallar/suralarning asl nusxalari/audio/68. Qoria.mp3   (89.36s)
#   Materiallar/suralarning asl nusxalari/audio/69. Takasur.mp3 (71.89s)
#   Materiallar/suralarning asl nusxalari/audio/70. Asr.mp3     (33.78s — only Bismillah used here)
#
# Boundaries from silencedetect -32dB/0.30s with ~0.2-0.3s buffers either side.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_QR="$ROOT/Materiallar/suralarning asl nusxalari/audio/68. Qoria.mp3"
SRC_TK="$ROOT/Materiallar/suralarning asl nusxalari/audio/69. Takasur.mp3"
SRC_AS="$ROOT/Materiallar/suralarning asl nusxalari/audio/70. Asr.mp3"
OUT_QR="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/68_qoria"
OUT_TK="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/69_takasur"
OUT_AS="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/70_asr"
PUB_QR="$ROOT/public/audio/edit/68_qoria"
PUB_TK="$ROOT/public/audio/edit/69_takasur"
PUB_AS="$ROOT/public/audio/edit/70_asr"
FFMPEG="ffmpeg"

mkdir -p "$OUT_QR" "$OUT_TK" "$OUT_AS" "$PUB_QR" "$PUB_TK" "$PUB_AS"

cut() {
    local src="$1" out="$2" name="$3" start="$4" end="$5"
    local dur=$(python -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$out/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Surah Al-Qari'ah — Bismillah + 11 ayat ==="
cut "$SRC_QR" "$OUT_QR" p43_qr_bism  1.300   7.200
cut "$SRC_QR" "$OUT_QR" p43_qr_a1   11.100  13.450
cut "$SRC_QR" "$OUT_QR" p43_qr_a2   14.800  17.400
cut "$SRC_QR" "$OUT_QR" p43_qr_a3   18.700  24.300
cut "$SRC_QR" "$OUT_QR" p43_qr_a4   26.300  34.150
cut "$SRC_QR" "$OUT_QR" p43_qr_a5   36.400  44.200
cut "$SRC_QR" "$OUT_QR" p43_qr_a6   47.850  54.100
cut "$SRC_QR" "$OUT_QR" p43_qr_a7   56.200  60.850
cut "$SRC_QR" "$OUT_QR" p43_qr_a8   63.450  69.600
cut "$SRC_QR" "$OUT_QR" p43_qr_a9   72.050  76.000
cut "$SRC_QR" "$OUT_QR" p43_qr_a10  78.000  82.950
cut "$SRC_QR" "$OUT_QR" p43_qr_a11  84.500  87.750

echo ""
echo "=== Surah At-Takathur — Bismillah + 8 ayat ==="
cut "$SRC_TK" "$OUT_TK" p43_tk_bism  1.100   6.350
cut "$SRC_TK" "$OUT_TK" p43_tk_a1    8.850  12.350
cut "$SRC_TK" "$OUT_TK" p43_tk_a2   13.950  17.950    # 0.45s start buffer — "Hatta" so'zining "Ha" (ح) tovushi clip bo'lmasin
cut "$SRC_TK" "$OUT_TK" p43_tk_a3   19.650  24.400
cut "$SRC_TK" "$OUT_TK" p43_tk_a4   26.500  32.700
cut "$SRC_TK" "$OUT_TK" p43_tk_a5   35.100  41.800
cut "$SRC_TK" "$OUT_TK" p43_tk_a6   44.100  49.050
cut "$SRC_TK" "$OUT_TK" p43_tk_a7   51.800  59.400
cut "$SRC_TK" "$OUT_TK" p43_tk_a8   61.900  70.900

echo ""
echo "=== Surah Al-Asr — Bismillah only (title-header of section on p43) ==="
cut "$SRC_AS" "$OUT_AS" p43_as_bism  0.700   6.100

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT_QR"/p43_qr_*.mp3 "$PUB_QR/"
cp "$OUT_TK"/p43_tk_*.mp3 "$PUB_TK/"
cp "$OUT_AS"/p43_as_*.mp3 "$PUB_AS/"
echo "Qari'ah chunks: $(ls "$PUB_QR"/p43_qr_*.mp3 | wc -l)"
echo "Takathur chunks: $(ls "$PUB_TK"/p43_tk_*.mp3 | wc -l)"
echo "Asr chunks: $(ls "$PUB_AS"/p43_as_*.mp3 | wc -l)"

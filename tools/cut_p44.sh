#!/bin/bash
# Cut audio chunks for page 44 — End of Surah Al-Asr (3 ayats) + Surah Al-Humazah (Bismillah + 9 ayats) + Surah Al-Fil (Bismillah + 5 ayats)
# Sources:
#   Materiallar/suralarning asl nusxalari/audio/70. Asr.mp3    (33.78s)
#   Materiallar/suralarning asl nusxalari/audio/71. Humaza.mp3 (75.96s)
#   Materiallar/suralarning asl nusxalari/audio/72. Fil.mp3    (48.95s)
#
# Boundaries from silencedetect -32dB/0.30s with ~0.3s buffers either side.
# Asr structure (p44 only): ayats 1, 2, 3 = 3 chunks (Bismillah belongs to p43 title).
# Humazah structure: Bismillah + 9 ayats = 10 chunks.
# Fil structure: Bismillah + 5 ayats = 6 chunks.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_AS="$ROOT/Materiallar/suralarning asl nusxalari/audio/70. Asr.mp3"
SRC_HU="$ROOT/Materiallar/suralarning asl nusxalari/audio/71. Humaza.mp3"
SRC_FI="$ROOT/Materiallar/suralarning asl nusxalari/audio/72. Fil.mp3"
OUT_AS="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/70_asr"
OUT_HU="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/71_humaza"
OUT_FI="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/72_fil"
PUB_AS="$ROOT/public/audio/edit/70_asr"
PUB_HU="$ROOT/public/audio/edit/71_humaza"
PUB_FI="$ROOT/public/audio/edit/72_fil"
FFMPEG="ffmpeg"

mkdir -p "$OUT_AS" "$OUT_HU" "$OUT_FI" "$PUB_AS" "$PUB_HU" "$PUB_FI"

cut() {
    local src="$1" out="$2" name="$3" start="$4" end="$5"
    local dur=$(python -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$out/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Surah Al-Asr — ayats 1-3 (Bismillah belongs to page 43) ==="
cut "$SRC_AS" "$OUT_AS" p44_as_a1   8.450  10.250
cut "$SRC_AS" "$OUT_AS" p44_as_a2  11.500  17.250
cut "$SRC_AS" "$OUT_AS" p44_as_a3  19.500  32.950

echo ""
echo "=== Surah Al-Humazah — Bismillah + 9 ayats ==="
cut "$SRC_HU" "$OUT_HU" p44_hu_bismillah   0.400   5.450
cut "$SRC_HU" "$OUT_HU" p44_hu_a1          8.750  13.850
cut "$SRC_HU" "$OUT_HU" p44_hu_a2         15.650  21.250
cut "$SRC_HU" "$OUT_HU" p44_hu_a3         23.150  29.800
cut "$SRC_HU" "$OUT_HU" p44_hu_a4         32.200  38.450
cut "$SRC_HU" "$OUT_HU" p44_hu_a5         40.650  46.200
cut "$SRC_HU" "$OUT_HU" p44_hu_a6         48.550  52.950
cut "$SRC_HU" "$OUT_HU" p44_hu_a7         55.450  61.100
cut "$SRC_HU" "$OUT_HU" p44_hu_a8         63.400  69.150
cut "$SRC_HU" "$OUT_HU" p44_hu_a9         71.200  75.300

echo ""
echo "=== Surah Al-Fil — Bismillah + 5 ayats ==="
cut "$SRC_FI" "$OUT_FI" p44_fi_bismillah   1.800   6.250
cut "$SRC_FI" "$OUT_FI" p44_fi_a1          7.750  15.200
cut "$SRC_FI" "$OUT_FI" p44_fi_a2         16.300  22.850
cut "$SRC_FI" "$OUT_FI" p44_fi_a3         24.000  30.550
cut "$SRC_FI" "$OUT_FI" p44_fi_a4         31.750  40.200
cut "$SRC_FI" "$OUT_FI" p44_fi_a5         41.300  47.900

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT_AS"/p44_as_*.mp3 "$PUB_AS/"
cp "$OUT_HU"/p44_hu_*.mp3 "$PUB_HU/"
cp "$OUT_FI"/p44_fi_*.mp3 "$PUB_FI/"
echo "Asr chunks:     $(ls "$PUB_AS"/p44_as_*.mp3 | wc -l)"
echo "Humazah chunks: $(ls "$PUB_HU"/p44_hu_*.mp3 | wc -l)"
echo "Fil chunks:     $(ls "$PUB_FI"/p44_fi_*.mp3 | wc -l)"

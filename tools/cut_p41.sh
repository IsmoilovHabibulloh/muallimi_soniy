#!/bin/bash
# Cut audio chunks for page 41 — Surah Al-Bayyina (98)
# Source: 65. Bayyina.mp3 (170.06s)
#
# Layout: bismillah + 8 ayahs (numbered 1-8 in book).
# Boundaries via silencedetect -32dB/0.30s + Whisper small (Arabic) verify.
#
#   bismillah:  1.34 -   5.86  (4.52s)
#   a1:         9.47 -  23.91  (14.44s)  — لم يكن الذين كفروا...البينة
#   a2:        26.68 -  34.40  (7.72s)   — رسول من الله يتلوا صحفا مطهرة
#   a3:        37.39 -  41.32  (3.93s)   — فيها كتب قيمة
#   a4:        44.56 -  56.77  (12.21s)  — وما تفرق الذين أوتوا...البينة
#   a5:        62.07 -  88.29  (26.22s)  — وما أمروا...وذلك دين القيمة (internal pause at 80.94)
#   a6:        92.48 - 115.75  (23.27s)  — إن الذين كفروا...شر البرية (internal pause at 107.21)
#   a7:       119.01 - 131.31  (12.30s)  — إن الذين آمنوا...خير البرية
#   a8:       136.65 - 168.44  (31.79s)  — جزاؤهم عند ربهم...خشي ربه (internal pauses)

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/audio/65. Bayyina.mp3"
OUT="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/65_bayyina"
PUB="$ROOT/public/audio/edit/65_bayyina"
FFMPEG="ffmpeg"

mkdir -p "$OUT" "$PUB"

cut() {
    local name="$1" start="$2" end="$3"
    local dur=$(python -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$SRC" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$OUT/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Page 41 — Surah Al-Bayyina (9 chunks) ==="

cut p41_bismillah   1.30   5.96
cut p41_a1          9.40  24.05
cut p41_a2         26.60  34.55
cut p41_a3         37.30  41.45
cut p41_a4         44.50  56.90
cut p41_a5         62.00  88.40
cut p41_a6         92.40 115.85
cut p41_a7        118.95 131.45
cut p41_a8        136.55 168.55

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT"/p41_*.mp3 "$PUB/"
echo "Done. Files: $(ls "$PUB"/p41_*.mp3 | wc -l) chunks."

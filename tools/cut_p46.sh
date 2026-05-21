#!/bin/bash
# Cut audio chunks for page 46 — Al-Kafirun ayats 1-6 + Surah An-Nasr (Bismillah + 3 ayat)
# + Surah Al-Masad (Bismillah + 5 ayat) + Surah Al-Ikhlas (Bismillah + 2 ayat + a3 fragment).
# Sources:
#   Materiallar/suralarning asl nusxalari/audio/76. Kafirun.mp3 (65.36s)
#   Materiallar/suralarning asl nusxalari/audio/77. Nasr.mp3    (44.72s)
#   Materiallar/suralarning asl nusxalari/audio/78. Masad.mp3   (51.41s)
#   Materiallar/suralarning asl nusxalari/audio/79. Ixlos.mp3   (26.17s)
#
# Boundaries from silencedetect -32dB/0.30s with ~0.15-0.25s buffers either side.
# Al-Kafirun (p46 body): 6 ayats = 6 chunks (Bismillah is on p45 as kf_bism).
# An-Nasr: Bismillah + 3 ayats = 4 chunks (a3 is long, recited as one ayat).
# Al-Masad: Bismillah + 5 ayats = 6 chunks.
# Al-Ikhlas (p46 portion): Bismillah + ayat 1 + ayat 2 + a3 fragment "لَمْ يَلِدْ" = 4 chunks.

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_KF="$ROOT/Materiallar/suralarning asl nusxalari/audio/76. Kafirun.mp3"
SRC_NS="$ROOT/Materiallar/suralarning asl nusxalari/audio/77. Nasr.mp3"
SRC_MS="$ROOT/Materiallar/suralarning asl nusxalari/audio/78. Masad.mp3"
SRC_IX="$ROOT/Materiallar/suralarning asl nusxalari/audio/79. Ixlos.mp3"
OUT_KF="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/76_kafirun"
OUT_NS="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/77_nasr"
OUT_MS="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/78_masad"
OUT_IX="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios/79_ixlos"
PUB_KF="$ROOT/public/audio/edit/76_kafirun"
PUB_NS="$ROOT/public/audio/edit/77_nasr"
PUB_MS="$ROOT/public/audio/edit/78_masad"
PUB_IX="$ROOT/public/audio/edit/79_ixlos"
FFMPEG="ffmpeg"

mkdir -p "$OUT_KF" "$OUT_NS" "$OUT_MS" "$OUT_IX" "$PUB_KF" "$PUB_NS" "$PUB_MS" "$PUB_IX"

cut() {
    local src="$1" out="$2" name="$3" start="$4" end="$5"
    local dur=$(python -c "print(round($end - $start, 3))")
    "$FFMPEG" -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k -loglevel error "$out/$name.mp3"
    echo "  $name.mp3 ($dur s)"
}

echo "=== Surah Al-Kafirun — ayats 1-6 (Bismillah is on p45 as kf_bism) ==="
cut "$SRC_KF" "$OUT_KF" p46_kf_a1   9.40  16.10
cut "$SRC_KF" "$OUT_KF" p46_kf_a2  17.95  24.80
cut "$SRC_KF" "$OUT_KF" p46_kf_a3  27.05  35.55
cut "$SRC_KF" "$OUT_KF" p46_kf_a4  37.85  44.45
cut "$SRC_KF" "$OUT_KF" p46_kf_a5  47.40  56.20
cut "$SRC_KF" "$OUT_KF" p46_kf_a6  58.65  64.20

echo ""
echo "=== Surah An-Nasr — Bismillah + 3 ayats ==="
cut "$SRC_NS" "$OUT_NS" p46_ns_bism  0.55   5.85
cut "$SRC_NS" "$OUT_NS" p46_ns_a1    8.90  15.20
cut "$SRC_NS" "$OUT_NS" p46_ns_a2   17.65  27.20
cut "$SRC_NS" "$OUT_NS" p46_ns_a3   30.25  43.40

echo ""
echo "=== Surah Al-Masad — Bismillah + 5 ayats ==="
cut "$SRC_MS" "$OUT_MS" p46_ms_bism  0.75   6.15
cut "$SRC_MS" "$OUT_MS" p46_ms_a1    9.75  16.30
cut "$SRC_MS" "$OUT_MS" p46_ms_a2   18.85  26.10
cut "$SRC_MS" "$OUT_MS" p46_ms_a3   28.45  33.80
cut "$SRC_MS" "$OUT_MS" p46_ms_a4   35.95  41.60
cut "$SRC_MS" "$OUT_MS" p46_ms_a5   44.50  50.65

echo ""
echo "=== Surah Al-Ikhlas — Bismillah + ayats 1-2 + a3 fragment 'lam yalid' ==="
cut "$SRC_IX" "$OUT_IX" p46_ix_bism      0.30   5.55
cut "$SRC_IX" "$OUT_IX" p46_ix_a1        7.95  11.20
cut "$SRC_IX" "$OUT_IX" p46_ix_a2       12.80  15.55
cut "$SRC_IX" "$OUT_IX" p46_ix_a3_start 17.80  22.15

echo ""
echo "=== Copying to public/audio/edit/ ==="
cp "$OUT_KF"/p46_kf_*.mp3 "$PUB_KF/"
cp "$OUT_NS"/p46_ns_*.mp3 "$PUB_NS/"
cp "$OUT_MS"/p46_ms_*.mp3 "$PUB_MS/"
cp "$OUT_IX"/p46_ix_*.mp3 "$PUB_IX/"
echo "Kafirun chunks: $(ls "$PUB_KF"/p46_kf_*.mp3 | wc -l)"
echo "Nasr chunks:    $(ls "$PUB_NS"/p46_ns_*.mp3 | wc -l)"
echo "Masad chunks:   $(ls "$PUB_MS"/p46_ms_*.mp3 | wc -l)"
echo "Ixlos chunks:   $(ls "$PUB_IX"/p46_ix_*.mp3 | wc -l)"

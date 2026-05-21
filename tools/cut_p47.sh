#!/usr/bin/env bash
# Sahifa 47 — Surah Al-Ikhlas (v3 + v4 — davom p46 dan) +
#             Surah Al-Falaq (Bismillah + 5 ayat) +
#             Surah An-Nas  (Bismillah + 6 ayat)
#
# Manbalar:
#   public/audio/79. Ixlos.mp3  (26.17s) — Bismillah + 4 ayat
#   public/audio/80. Falaq.mp3  (46.13s) — Bismillah + 5 ayat
#   public/audio/81. Nos.mp3    (54.96s) — Bismillah + 6 ayat
#
# Output:
#   public/audio/edit/79_ixlos/p47_*.mp3
#   public/audio/edit/80_falaq/p47_*.mp3
#   public/audio/edit/81_nos/p47_*.mp3
#
# Vaqtlar: silencedetect (-30/-20 dB, d=0.06..0.30s) + ~0.1s buffers.
# Foydalanuvchi tinglab tasdiqlasa, mos kelmagan chunks shu yerdan tuzatilsin.

set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/public/audio"
DST_IX="$ROOT/public/audio/edit/79_ixlos"
DST_FQ="$ROOT/public/audio/edit/80_falaq"
DST_NS="$ROOT/public/audio/edit/81_nos"

mkdir -p "$DST_IX" "$DST_FQ" "$DST_NS"

cut() {
  local src="$1"
  local out="$2"
  local start="$3"
  local end="$4"
  local dur
  dur=$(awk -v s="$start" -v e="$end" 'BEGIN { printf "%.3f", e - s }')
  ffmpeg -y -ss "$start" -i "$src" -t "$dur" -c:a libmp3lame -b:a 192k "$out" 2>/dev/null
  echo "  $(basename "$out")  [$start - $end] = ${dur}s"
}

# ===== Ikhlas (only v3 second-half + v4 needed on p47) =====
# v3 to'liq oyat (لَمْ يَلِدْ وَلَمْ يُولَدْ): 18.00-22.06 = 4.06s.
#   Sub-silence at 19.70-20.20 → split into part1 (لَمْ يَلِدْ — p46 da) va
#   part2 (وَلَمْ يُولَدْ — p47 da). Bu yerda faqat part2 ni kesamiz.
# v4 (وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ): 22.20-25.55 = 3.35s
echo "=== Ikhlas (v3 second-half + v4) ==="
IX="$SRC/79. Ixlos.mp3"
cut "$IX" "$DST_IX/p47_ix_v3.mp3" 20.10 22.18   # v3 part 2 only (wa lam yulad)
cut "$IX" "$DST_IX/p47_ix_v4.mp3" 22.10 25.65   # v4 (wa lam yakun lahu kufuwan ahad)

# ===== Falaq (Bismillah + 5 ayat) =====
# bism: 1.47-6.45
# v1: 10.16-13.91 (internal 0.3s breath at 12.34-12.64, kept)
# v2: 16.24-19.57
# v3: 22.38-27.54
# v4: 30.15-36.77 (internal pause 33.66-34.05 between "النَّفَّاثَاتِ" and "فِي الْعُقَدِ")
# v5: 39.65-45.00
echo "=== Falaq ==="
FQ="$SRC/80. Falaq.mp3"
cut "$FQ" "$DST_FQ/p47_fq_bism.mp3"  1.37  6.55
cut "$FQ" "$DST_FQ/p47_fq_v1.mp3"   10.05 14.01
cut "$FQ" "$DST_FQ/p47_fq_v2.mp3"   16.13 19.67
cut "$FQ" "$DST_FQ/p47_fq_v3.mp3"   22.28 27.64
cut "$FQ" "$DST_FQ/p47_fq_v4.mp3"   30.05 36.87
cut "$FQ" "$DST_FQ/p47_fq_v5.mp3"   39.55 45.10

# ===== Nas (Bismillah + 6 ayat) =====
# bism: 1.12-5.52
# v1: 8.87-13.93
# v2: 15.52-19.10
# v3: 20.95-24.77
# v4: 27.27-34.61
# v5: 37.68-45.35
# v6: 48.18-53.97
echo "=== Nas ==="
NS="$SRC/81. Nos.mp3"
cut "$NS" "$DST_NS/p47_ns_bism.mp3"  1.02  5.62
cut "$NS" "$DST_NS/p47_ns_v1.mp3"    8.77 14.03
cut "$NS" "$DST_NS/p47_ns_v2.mp3"   15.42 19.20
cut "$NS" "$DST_NS/p47_ns_v3.mp3"   20.85 24.87
cut "$NS" "$DST_NS/p47_ns_v4.mp3"   27.17 34.71
cut "$NS" "$DST_NS/p47_ns_v5.mp3"   37.58 45.45
cut "$NS" "$DST_NS/p47_ns_v6.mp3"   48.08 54.07

# Mirror to Materiallar (master backup)
MAT="$ROOT/Materiallar/suralarning asl nusxalari/edit_audios"
mkdir -p "$MAT/79_ixlos" "$MAT/80_falaq" "$MAT/81_nos"
cp "$DST_IX"/*.mp3 "$MAT/79_ixlos/"
cp "$DST_FQ"/*.mp3 "$MAT/80_falaq/"
cp "$DST_NS"/*.mp3 "$MAT/81_nos/"

echo "Done."

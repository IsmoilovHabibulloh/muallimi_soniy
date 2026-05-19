#!/bin/bash
# Cut 03. alifbo.mp3 into per-element chunks.
# Source PDF: Materiallar/audio_qoidalar/03_04-._alifbo va harakatlar_final.pdf
#
# Boundary policy:
#   - PDF timestamps capture the LOUD part but cut off vowel attack and
#     fricative tail. We extend each PDF range by:
#       +50ms before  (capture vowel onset)
#       +100ms after  (capture fricative/aspirate decay)
#   - For shin/sod we use silence-detected boundaries (PDF was wrong).
#   - Re-encode with libmp3lame 192k for sample-accurate cuts.
set -euo pipefail

ROOT="/Users/habibulloh22icloud.com/Desktop/Antigravity/muallimi soniy"
FF="$ROOT/tools/ffmpeg"
SRC="$ROOT/public/audio/03. alifbo.mp3"
OUT="$ROOT/Materiallar/harflar/edit_audios/03_alifbo"

# Buffer added on each side of PDF timings for natural envelope
PRE=0.05
POST=0.10

mkdir -p "$OUT"

cut_pdf() {
  # cut <out_name> <pdf_start> <pdf_end>
  # Applies PRE/POST buffer.
  local name="$1" pdf_start="$2" pdf_end="$3"
  local start end dur
  start=$(awk "BEGIN{printf \"%.3f\", $pdf_start - $PRE}")
  end=$(awk "BEGIN{printf \"%.3f\", $pdf_end + $POST}")
  dur=$(awk "BEGIN{printf \"%.3f\", $end - $start}")
  "$FF" -hide_banner -loglevel error -y \
    -ss "$start" -i "$SRC" -t "$dur" \
    -c:a libmp3lame -b:a 192k \
    "$OUT/$name"
}

cut_raw() {
  # cut <out_name> <start> <end>  — explicit boundaries, no buffer
  local name="$1" start="$2" end="$3"
  local dur
  dur=$(awk "BEGIN{printf \"%.3f\", $end - $start}")
  "$FF" -hide_banner -loglevel error -y \
    -ss "$start" -i "$SRC" -t "$dur" \
    -c:a libmp3lame -b:a 192k \
    "$OUT/$name"
}

# --- Intros (PDF as-is, no buffer needed for instructional clips) ---
cut_raw "intro_01_bismillah.mp3"   7.140   18.480
cut_raw "intro_02_explain_1.mp3"  22.040   30.840
cut_raw "intro_03_misol.mp3"      32.439   35.520
cut_raw "intro_04_explain_2.mp3"  37.640   42.140

# --- Letters (PDF + ±buffer for natural envelope) ---
cut_pdf "e01_alif.mp3"   46.280   46.540
cut_pdf "e02_ba.mp3"     49.040   49.540
cut_pdf "e03_ta.mp3"     51.760   52.120
cut_pdf "e04_tha.mp3"    54.580   54.900
cut_pdf "e05_jim.mp3"    57.320   57.680
cut_pdf "e06_ha.mp3"     60.060   60.600
cut_pdf "e07_xo.mp3"     62.620   63.740
cut_pdf "e08_dal.mp3"    65.519   66.800
cut_pdf "e09_zal.mp3"    68.300   68.640

# --- Group 1 (ar/az/as): silence-detected ---
cut_raw "e10_ro.mp3"     70.270   71.867
cut_raw "e11_za.mp3"     73.690   74.679
cut_raw "e12_sin.mp3"    76.594   77.646

# --- shin (PDF wrong; verified by user listening) ---
cut_raw "e13_shin.mp3"   79.354   80.460

# --- sod (PDF wrong; verified by user listening — full block) ---
cut_raw "e14_sod.mp3"    82.317   83.376

cut_pdf "e15_dod.mp3"    85.340   87.120
cut_pdf "e16_to.mp3"     88.400   89.539

# --- Group 3 (zo/ayn): silence-detected ---
cut_raw "e17_zo.mp3"     91.250   92.190
cut_raw "e18_ayn.mp3"    93.546   94.420

cut_pdf "e19_gayn.mp3"   96.440   97.200
cut_pdf "e20_fa.mp3"     99.620  100.460
cut_pdf "e21_qof.mp3"   102.980  103.380
cut_pdf "e22_kaf.mp3"   105.800  106.160
cut_pdf "e23_lam.mp3"   109.140  109.660
cut_pdf "e24_mim.mp3"   111.920  112.460
cut_pdf "e25_nun.mp3"   114.340  115.680
cut_pdf "e26_vav.mp3"   118.300  119.480
cut_pdf "e27_he.mp3"    121.440  121.960

# --- ya (PDF was truncated; extended) ---
cut_raw "e28_ya.mp3"    124.332  125.143

echo "OK — $(ls "$OUT"/*.mp3 | wc -l | tr -d ' ') chunks created in $OUT"

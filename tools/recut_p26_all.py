"""Re-cut all p26 audio files based on segment-to-word mapping."""
import os, subprocess, shutil
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
SRC = r"C:\Users\User\Desktop\Claud code\public\audio\37. alif va hamza.mp3"
PUB = r"C:\Users\User\Desktop\Claud code\public\audio\edit\37_alif_hamza"
MAT = r"C:\Users\User\Desktop\Claud code\Materiallar\alif hamza va alif lom\edit_audios\37_alif_hamza"

# Segments derived from silencedetect (boundaries trimmed inward by 0.05s, padded outward by 0.10s for clean cuts)
# Format: (segment_index, start, dur, filename)
SEGMENTS = [
    # R3 (eski imlo): yamuru / yakhudhu / mamuur / makhuudh
    ("r3_w1_yamuru",    31.85, 1.20),
    ("r3_w2_yakhudhu",  34.28, 1.45),
    ("r3_w3_mamuur",    36.91, 1.70),
    ("r3_w4_makhuudh",  40.59, 1.40),
    # R4 (yangi imlo): same 4 words
    ("r4_w1_yamuru",    44.78, 1.25),
    ("r4_w2_yakhudhu",  48.00, 0.80),
    ("r4_w3_mamuur",    50.13, 1.65),
    ("r4_w4_makhuudh",  53.83, 1.25),
    # R5: qurie / qaariea / mubtadie / mustahzie
    ("r5_w1_qurie",     59.08, 0.90),
    ("r5_w2_qaariea",   61.41, 0.95),
    ("r5_w3_mubtadie",  63.88, 1.30),
    ("r5_w4_mustahzie", 66.82, 1.75),
    # R6: yuminu / mumin / muadhdhin / muallif / luulue
    ("r6_w1_yuminu",    71.84, 1.35),
    ("r6_w2_mumin",     74.52, 1.35),
    ("r6_w3_muadhdhin", 77.27, 1.50),
    ("r6_w4_muallif",   80.29, 1.30),
    ("r6_w5_luulue",    83.25, 1.05),
    # R7: qaail / qaaim / saail / maail / raiis
    ("r7_w1_qaail",     87.00, 2.30),
    ("r7_w2_qaaim",     90.25, 2.30),
    ("r7_w3_saail",     93.83, 2.30),
    ("r7_w4_maail",     97.41, 2.30),
    ("r7_w5_raiis",    100.91, 1.75),
    # R8: bisa / bir / saila / yasal / masuul
    ("r8_w1_bisa",     106.20, 1.15),
    ("r8_w2_bir",      108.48, 1.15),
    ("r8_w3_saila",    110.60, 1.10),
    ("r8_w4_yasal",    112.82, 1.35),
    ("r8_w5_masuul",   115.22, 1.80),
    # R9: shaaa / saaa / jaaa / yashaau / masaau
    ("r9_w1_shaaa",    119.28, 2.25),
    ("r9_w2_saaa",     122.60, 2.35),
    ("r9_w3_jaaa",     126.07, 2.30),
    ("r9_w4_yashaau",  129.75, 2.25),
    ("r9_w5_masaau",   133.26, 2.40),
    # C1 (eski imlo, ـىْءُ): shay / jay / yajii / yusii / musii
    ("c1_w1_shay",     138.08, 1.95),
    ("c1_w2_jay",      141.06, 2.20),
    ("c1_w3_yajii",    144.38, 2.20),
    ("c1_w4_yusii",    147.80, 2.40),
    ("c1_w5_musii",    151.42, 2.45),
    # C2 (hamza at end, mixed prev vowels): shay / fay / mil / bar / juz / qiraa
    ("c2_w1_shay",     155.50, 1.25),
    ("c2_w2_fay",      157.88, 1.20),
    ("c2_w3_mil",      160.25, 1.30),
    ("c2_w4_bar",      162.75, 1.20),
    ("c2_w5_juz",      165.14, 1.35),
    ("c2_w6_qiraa",    167.91, 2.80),
    # C3 (hamza after long waw, ـوءُ): suu / yasuu / wadu / quru / muru
    ("c3_w1_suu",      172.57, 2.10),
    ("c3_w2_yasuu",    175.84, 2.15),
    ("c3_w3_wadu",     179.29, 2.20),
    ("c3_w4_quru",     182.84, 2.20),
    ("c3_w5_muru",     186.30, 2.55),
    # B1: almaru / imraan / imriin / imruun
    ("b1_w1_almaru",   193.20, 1.65),
    ("b1_w2_imraan",   196.25, 1.50),
    ("b1_w3_imriin",   198.85, 1.65),
    ("b1_w4_imruun",   201.60, 1.55),
    # B2: aljuzu / juzaha / juziha / juzuha
    ("b2_w1_aljuzu",   204.70, 1.85),
    ("b2_w2_juzaha",   208.16, 1.80),
    ("b2_w3_juziha",   211.13, 1.85),
    ("b2_w4_juzuha",   214.29, 1.90),
]

assert len(SEGMENTS) == 56, f"Expected 56, got {len(SEGMENTS)}"

os.makedirs(MAT, exist_ok=True)
count = 0
for name, start, dur in SEGMENTS:
    fname = f"p26_{name}.mp3"
    out = os.path.join(PUB, fname)
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", SRC, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out],
                   check=True)
    shutil.copy(out, os.path.join(MAT, fname))
    count += 1
print(f"Re-cut {count} files. Mirrored to Materiallar.")

# Delete the old shared sample file (no longer used)
old_sample = os.path.join(PUB, "p26_c23_sample.mp3")
if os.path.exists(old_sample):
    os.remove(old_sample)
    print("Deleted old p26_c23_sample.mp3")
old_sample_mat = os.path.join(MAT, "p26_c23_sample.mp3")
if os.path.exists(old_sample_mat):
    os.remove(old_sample_mat)

"""Re-cut all p27 ta-marbuta audio files from correct single-word positions."""
import os, subprocess, shutil
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
SRC = r"C:\Users\User\Desktop\Claud code\public\audio\38. t-marbuta.mp3"
PUB = r"C:\Users\User\Desktop\Claud code\public\audio\edit\38_t_marbuta"
MAT = None  # No Materiallar mirror for ta-marbuta yet

# All 17 cuts (filename, start, dur) — first reading of each word + combined head
CUTS = [
    # head: chig'atoy rule narration (segs 16+17 combined)
    ("p27_head",            41.00,  4.50),
    # R1: 5 sifat (singular feminine)
    ("p27_r1_w1_azizatun",   0.85,  1.80),
    ("p27_r1_w2_faridatun",  3.25,  1.75),
    ("p27_r1_w3_hamidatun",  5.55,  1.85),
    ("p27_r1_w4_saidatun",   8.05,  1.85),
    ("p27_r1_w5_shahidatun",10.50,  1.85),
    # R2: 5 sifat
    ("p27_r2_w1_jamilatun", 12.95,  1.95),
    ("p27_r2_w2_halimatun", 15.55,  1.80),
    ("p27_r2_w3_salimatun", 18.05,  1.80),
    ("p27_r2_w4_sharifatun",20.60,  1.85),
    ("p27_r2_w5_naimatun",  23.25,  1.80),
    # R3: 3 juftlik singular/plural
    ("p27_r3_w1_marratun",  26.35,  1.45),
    ("p27_r3_w2_marraatun", 28.40,  1.85),
    ("p27_r3_w3_karratun",  31.10,  1.40),
    ("p27_r3_w4_karraatun", 33.30,  1.70),
    ("p27_r3_w5_hurratun",  35.85,  1.30),
    ("p27_r3_w6_hurraatun", 37.90,  1.60),
]

count = 0
for name, start, dur in CUTS:
    out = os.path.join(PUB, name + ".mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", SRC, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out],
                   check=True)
    if MAT:
        os.makedirs(MAT, exist_ok=True)
        shutil.copy(out, os.path.join(MAT, name + ".mp3"))
    count += 1
print(f"Re-cut {count} files (1 head + 16 words).")

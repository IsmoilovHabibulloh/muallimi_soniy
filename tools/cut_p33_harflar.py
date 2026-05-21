"""Cut all 29 Arabic letter names from 47. harflar nomi.mp3."""
import os, subprocess
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
SRC = r"C:\Users\User\Desktop\Claud code\public\audio\47. harflar nomi.mp3"
OUT = r"C:\Users\User\Desktop\Claud code\public\audio\edit\47_harflar"
os.makedirs(OUT, exist_ok=True)

# Based on whisper word timestamps + small buffer
CUTS = [
    ("p33_h01_alif",  0.00, 2.30),
    ("p33_h02_ba",    4.20, 1.20),
    ("p33_h03_ta",    5.90, 0.95),
    ("p33_h04_tsa",   6.70, 1.30),
    ("p33_h05_jim",   7.90, 1.55),
    ("p33_h06_ha",    9.35, 0.85),
    ("p33_h07_kha",  10.10, 1.45),
    ("p33_h08_dal",  11.45, 1.30),
    ("p33_h09_zal",  12.85, 1.20),
    ("p33_h10_ra",   13.85, 1.00),
    ("p33_h11_za",   14.65, 1.35),
    ("p33_h12_sin",  15.85, 1.70),
    ("p33_h13_shin", 17.40, 1.35),
    ("p33_h14_sod",  18.60, 1.35),
    ("p33_h15_dod",  19.80, 1.40),
    ("p33_h16_to",   21.05, 0.80),
    ("p33_h17_zo",   21.70, 1.70),
    ("p33_h18_ayn",  23.25, 1.50),
    ("p33_h19_ghayn",24.55, 1.60),
    ("p33_h20_fa",   25.95, 1.10),
    ("p33_h21_qof",  26.85, 2.00),
    ("p33_h22_kof",  28.70, 1.05),
    ("p33_h23_lam",  29.60, 1.90),
    ("p33_h24_mim",  31.30, 1.20),
    ("p33_h25_nun",  32.30, 1.40),
    ("p33_h26_waw",  33.55, 1.50),
    ("p33_h27_haa",  34.90, 1.60),
    ("p33_h28_lamalif", 36.35, 1.55),
    ("p33_h29_ya",   37.75, 0.95),
]

for name, start, dur in CUTS:
    out_path = os.path.join(OUT, name + ".mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", SRC, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out_path], check=True)
print(f"Cut {len(CUTS)} harflar files.")

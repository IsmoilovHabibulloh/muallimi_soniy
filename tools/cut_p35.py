"""Cut all p35 audios from 53-55 kalima sources."""
import os, subprocess
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
OUT = r"C:\Users\User\Desktop\Claud code\public\audio\edit\53_kalimalar_05"
os.makedirs(OUT, exist_ok=True)

SRC53 = r"C:\Users\User\Desktop\Claud code\public\audio\53. kalimalar 05.mp3"
SRC54 = r"C:\Users\User\Desktop\Claud code\public\audio\54. kalimalar 06.mp3"
SRC55 = r"C:\Users\User\Desktop\Claud code\public\audio\55. kalimalar 07.mp3"

CUTS = [
    # TAMJID — from 53. kalimalar 05.mp3
    (SRC53, "p35_tamjid_head",   1.00,  1.80),
    (SRC53, "p35_tamjid_p1",     5.15,  2.70),  # subhanallah
    (SRC53, "p35_tamjid_p2",     9.10,  2.85),  # walhamdu lillah
    (SRC53, "p35_tamjid_p3",    12.95,  6.85),  # wala ilaha illallah wallahu akbar
    (SRC53, "p35_tamjid_p4",    21.35,  8.85),  # WA la hawla wala quwwata illa billah (Havqala) — 0.25s start buffer for "wa"
    (SRC53, "p35_mashallah",    33.20,  8.20),  # ma sha'allah kana wama lam yasha lam yakun
    (SRC53, "p35_iman_def",     44.50, 20.65),  # iman definition (iqror billisan...)
    (SRC53, "p35_salawat",      67.00,  4.70),  # salla allah alayhi wasallam
    # MUJMAL — from 54
    (SRC54, "p35_mujmal_head",   0.00,  4.30),
    (SRC54, "p35_mujmal_body",   6.20, 13.00),
    # MUFASSAL — from 55
    (SRC55, "p35_mufassal_head", 0.00,  4.30),
    (SRC55, "p35_mufassal_body", 6.25, 22.65),
]
for src, name, start, dur in CUTS:
    out_path = os.path.join(OUT, name + ".mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", src, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out_path], check=True)
print(f"Cut {len(CUTS)} p35 files.")

"""Cut p33 muqatta'at section from 48. ayrim suralar boshi.mp3."""
import os, subprocess
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
SRC = r"C:\Users\User\Desktop\Claud code\public\audio\48. ayrim suralar boshi.mp3"
OUT = r"C:\Users\User\Desktop\Claud code\public\audio\edit\48_suralar_boshi"
os.makedirs(OUT, exist_ok=True)

CUTS = [
    ("p33_m_title",     0.00,  3.20),
    ("p33_m_subtitle",  4.90,  6.00),
    # 14 muqatta'at
    ("p33_m01_alm",          12.30,  6.90),  # الٓم
    ("p33_m02_almsod",       22.30,  8.65),  # الٓمٓصٓ
    ("p33_m03_alr",          34.35,  3.95),  # الٓر
    ("p33_m04_almr",         41.30,  6.35),  # الٓمٓر
    ("p33_m05_khsad",        52.30,  8.85),  # كٓهٓيٓعٓصٓ
    ("p33_m06_taha",         64.40,  1.35),  # طه
    ("p33_m07_tasm",         68.50,  6.10),  # طٓسٓم
    ("p33_m08_tas",          77.25,  2.90),  # طٓسٓ
    ("p33_m09_yasin",        82.25,  3.15),  # يٓسٓ
    ("p33_m10_sad",          87.55,  2.50),  # صٓ
    ("p33_m11_hamim",        93.05,  3.20),  # حٓمٓ
    ("p33_m12_hamim_aynsq", 100.00, 11.00),  # حٓمٓعٓسٓقٓ
    ("p33_m13_qaf",         113.90,  2.50),  # قٓ
    ("p33_m14_nun",         117.95,  3.00),  # نٓ
]

for name, start, dur in CUTS:
    out_path = os.path.join(OUT, name + ".mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", SRC, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out_path], check=True)
print(f"Cut {len(CUTS)} muqatta files.")

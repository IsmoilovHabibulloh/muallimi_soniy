"""Re-cut p30 top section (21 phrases) from source 40 at 230-316s."""
import os, subprocess
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
SRC = r"C:\Users\User\Desktop\Claud code\public\audio\40. yozilsa-o'qilmaydi.mp3"
OUT = r"C:\Users\User\Desktop\Claud code\public\audio\edit\40_yozilsa_oqilmaydi"

CUTS = [
    ("p30_r1_w1_hadhalbaladu",   230.85, 2.10),
    ("p30_r1_w2_malqariatu",     234.63, 2.20),
    ("p30_r1_w3_malhutamatu",    238.17, 1.85),
    ("p30_r1_w4_hadhalladhi",    241.42, 2.30),
    ("p30_r2_w1_mandhalladhi",   245.25, 2.80),
    ("p30_r2_w2_tahtahalanhar",  249.82, 2.92),
    ("p30_r2_w3_faqulnadrib",    254.54, 2.20),
    ("p30_r3_w1_bisalismu",      258.61, 1.95),
    ("p30_r3_w2_ihdinasirata",   262.48, 2.65),
    ("p30_r3_w3_yaayyuhannas",   266.79, 4.95),
    ("p30_r4_w1_ilannas",        273.30, 2.50),
    ("p30_r4_w2_alannas",        277.10, 2.45),
    ("p30_r4_w3_filard",         280.82, 1.30),
    ("p30_r4_w4_fissudur",       284.24, 1.78),
    ("p30_r5_w1_qaluttakhadha",  287.97, 2.25),
    ("p30_r5_w2_qaludu",         291.84, 1.48),
    ("p30_r5_w3_laqulladhina",   295.46, 2.35),
    ("p30_r5_w4_utulkitab",      299.59, 2.40),
    ("p30_r6_w1_waaqimusalat",   303.98, 2.85),
    ("p30_r6_w2_waatuzakat",     308.58, 2.85),
    ("p30_r6_w3_waamilussalihat", 312.90, 3.75),
]

for name, start, dur in CUTS:
    out_path = os.path.join(OUT, name + ".mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", SRC, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out_path], check=True)
print(f"Re-cut {len(CUTS)} p30 top section files.")

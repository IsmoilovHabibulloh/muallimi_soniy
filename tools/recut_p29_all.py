"""Re-cut all 45 p29 audios from correct positions in source 40."""
import os, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8")
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
SRC = r"C:\Users\User\Desktop\Claud code\public\audio\40. yozilsa-o'qilmaydi.mp3"
OUT = r"C:\Users\User\Desktop\Claud code\public\audio\edit\40_yozilsa_oqilmaydi"

# (filename, start, dur)
CUTS = [
    # Section 1: o'rta alif (1 title + 14 words)
    ("p29_s1_title",                   50.00, 5.30),
    ("p29_s1_r1_w1_bilghayb",          57.15, 1.70),
    ("p29_s1_r1_w2_wabilakhira",       59.80, 2.10),
    ("p29_s1_r1_w3_kalfarash",         63.13, 2.00),
    ("p29_s1_r1_w4_walasr",            66.10, 1.40),
    ("p29_s1_r1_w5_wanhar",            68.53, 1.20),
    ("p29_s1_r2_w1_walmushrikin",      71.05, 2.55),
    ("p29_s1_r2_w2_rabbilalam",        76.53, 3.05),
    ("p29_s1_r2_w3_siratalladhin",     80.94, 2.90),
    ("p29_s1_r3_w1_ghayrilmaghdub",    85.41, 2.95),
    ("p29_s1_r3_w2_humulmuflihun",     89.91, 3.05),
    ("p29_s1_r3_w3_laylatulqadr",      94.39, 2.45),
    ("p29_s1_r4_w1_hadharalmawt",      98.63, 2.35),
    ("p29_s1_r4_w2_waidhastasqa",     102.71, 2.60),
    ("p29_s1_r4_w3_anfusakumistakbartum", 107.05, 4.45),
    # Section 2: o'rta lam (1 title + 14 words)
    ("p29_s2_title",                  113.60, 5.60),
    ("p29_s2_r1_w1_attabau",          120.44, 1.40),
    ("p29_s2_r1_w2_aththamaru",       123.00, 1.35),
    ("p29_s2_r1_w3_addakhalu",        125.48, 1.40),
    ("p29_s2_r1_w4_adhdhahabu",       128.12, 1.45),
    ("p29_s2_r1_w5_arrasadu",         130.79, 1.42),
    ("p29_s2_r2_w1_azzabadu",         133.51, 1.42),
    ("p29_s2_r2_w2_assafaru",         136.21, 1.38),
    ("p29_s2_r2_w3_ashshajaru",       138.94, 1.38),
    ("p29_s2_r2_w4_assofaru",         141.78, 1.40),
    ("p29_s2_r2_w5_addhararu",        144.47, 1.50),
    ("p29_s2_r3_w1_attalabu",         147.62, 1.40),
    ("p29_s2_r3_w2_azhzhafaru",       150.26, 1.41),
    ("p29_s2_r3_w3_allahabu",         153.10, 1.41),
    ("p29_s2_r3_w4_annasabu",         155.65, 1.83),
    # Section 3: o'rta alif+lam birga (1 title + 14 phrases)
    ("p29_s3_title",                  160.40, 10.10),
    ("p29_s3_r1_w1_huwattabau",       172.34, 1.62),
    ("p29_s3_r1_w2_huwaththamaru",    175.07, 1.68),
    ("p29_s3_r1_w3_huwaddakhalu",     177.87, 1.69),
    ("p29_s3_r1_w4_huwadhdhahabu",    180.49, 1.95),
    ("p29_s3_r2_w1_huwarrasadu",      183.65, 1.68),
    ("p29_s3_r2_w2_huwazzabadu",      186.69, 1.70),
    ("p29_s3_r2_w3_huwassafaru",      189.69, 1.50),
    ("p29_s3_r2_w4_huwashshajaru",    192.47, 1.58),
    ("p29_s3_r3_w1_huwassofaru",      195.60, 1.63),
    ("p29_s3_r3_w2_huwaddhararu",     198.67, 1.78),
    ("p29_s3_r3_w3_huwattalabu",      201.95, 1.71),
    ("p29_s3_r4_w1_huwazhzhafaru",    205.29, 1.73),
    ("p29_s3_r4_w2_huwallahabu",      208.42, 1.71),
    ("p29_s3_r4_w3_huwannasabu",      211.73, 1.95),
]

assert len(CUTS) == 45, f"Expected 45 cuts, got {len(CUTS)}"

for name, start, dur in CUTS:
    out_path = os.path.join(OUT, name + ".mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", SRC, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out_path], check=True)
print(f"Re-cut {len(CUTS)} files for p29.")

"""Re-cut p30 bottom 8 vasl example phrases from source 41.vasl.mp3."""
import os, subprocess
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
SRC = r"C:\Users\User\Desktop\Claud code\public\audio\41. vasl.mp3"
OUT = r"C:\Users\User\Desktop\Claud code\public\audio\edit\41_vasl"

CUTS = [
    ("p30_b1_w1_ihdinasiratmust",   42.75, 5.00),  # ihdina-s-sirat al-mustaqim
    ("p30_b1_w2_wahadhalbaladamn",  49.30, 4.60),  # wahadhal balad al-amin
    ("p30_b2_w1_narullahimuqadah",  55.65, 4.40),  # nar-ullah-il-muqadah
    ("p30_b2_w2_kamathalillistwq",  62.30, 3.70),  # kamathali lladhi stawqada
    ("p30_b3_w1_fattaqunnaarallti", 68.20, 4.20),  # fattaqu-n-nara-llati
    ("p30_b3_w2_huwattawwabrahim",  74.35, 4.20),  # huwa-t-tawwab-r-rahim (extended for "huwa")
    ("p30_b4_w1_dhulfadlazeem",     80.50, 4.00),  # dhu-l-fadl-l-azim
    ("p30_b4_w2_antalazeezhakeem",  86.20, 5.20),  # anta-l-aziz-l-hakim
]

for name, start, dur in CUTS:
    out_path = os.path.join(OUT, name + ".mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", SRC, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out_path], check=True)
print(f"Re-cut {len(CUTS)} p30 bottom files.")

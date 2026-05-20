"""Re-cut Yaa Alifiyya intro + 20 words, verify with whisper."""
import os, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8")
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
os.environ["PATH"] = os.path.dirname(FFMPEG) + os.pathsep + os.environ["PATH"]
import whisper

SRC = r"C:\Users\User\Desktop\Claud code\public\audio\39. yoz-o'qiladigan.mp3"
OUT = r"C:\Users\User\Desktop\Claud code\public\audio\edit\39_yoz_oqiladigan"

CUTS = [
    # (filename, start, dur, book)
    ("p28_b1_intro",      108.50, 1.80, "Yaa Alifiyya"),
    # R1: ila / ala / lada / mata / anna / hatta
    ("p28_r1_w1_ila",     116.45, 0.90, "اِلى"),
    ("p28_r1_w2_ala",     117.85, 1.00, "عَلى"),
    ("p28_r1_w3_lada",    119.30, 1.05, "لَدى"),
    ("p28_r1_w4_mata",    120.80, 1.05, "مَتى"),
    ("p28_r1_w5_anna",    122.35, 1.55, "اَنّى"),
    ("p28_r1_w6_hatta",   124.35, 1.40, "حَتّى"),
    # R2: isa / musa / ala2 / taala / shatta
    ("p28_r2_w1_isa",     126.20, 1.50, "عِيسى"),
    ("p28_r2_w2_musa",    128.20, 1.50, "مُوسى"),
    ("p28_r2_w3_ala2",    130.20, 1.30, "اَعْلى"),
    ("p28_r2_w4_taala",   132.00, 1.45, "تَعالى"),
    ("p28_r2_w5_shatta",  133.85, 1.45, "شَتّى"),
    # R3: yahya / murtada / yatazakka / fatarda
    ("p28_r3_w1_yahya",     135.85, 1.40, "يَحْيى"),
    ("p28_r3_w2_murtada",   137.85, 1.65, "مُرْتَضى"),
    ("p28_r3_w3_yatazakka", 140.15, 1.85, "يَتَزَكّى"),
    ("p28_r3_w4_fatarda",   142.60, 1.60, "فَتَرْضى"),
    # R4: sawwayha / dassayha / zakkayha / fasawwayha / uqbayha
    ("p28_r4_w1_sawwayha",   150.15, 2.05, "سَوَّيهَا"),
    ("p28_r4_w2_dassayha",   152.85, 2.15, "دَسَّيهَا"),
    ("p28_r4_w3_zakkayha",   155.60, 2.25, "زَكَّيهَا"),
    ("p28_r4_w4_fasawwayha", 158.55, 2.20, "فَسَوَّيهَا"),
    ("p28_r4_w5_uqbayha",    161.40, 2.05, "عُقْبَيهَا"),
]

for name, start, dur, _ in CUTS:
    out_path = os.path.join(OUT, name + ".mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", SRC, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out_path],
                   check=True)

print(f"Cut {len(CUTS)} files. Loading whisper...", flush=True)
model = whisper.load_model("medium")
print()
for name, start, dur, ar in CUTS:
    out_path = os.path.join(OUT, name + ".mp3")
    r = model.transcribe(out_path, language="ar", task="transcribe", fp16=False)
    print(f"{name} (book: {ar}): {r['text'].strip()!r}", flush=True)

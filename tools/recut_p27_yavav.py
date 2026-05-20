"""Re-cut all 16 Yā Muqaddara + Vāv Muqaddara audios and verify with whisper."""
import os, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8")
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
os.environ["PATH"] = os.path.dirname(FFMPEG) + os.pathsep + os.environ["PATH"]
import whisper

SRC = r"C:\Users\User\Desktop\Claud code\public\audio\39. yoz-o'qiladigan.mp3"
OUT = r"C:\Users\User\Desktop\Claud code\public\audio\edit\39_yoz_oqiladigan"

CUTS = [
    # (filename, start, dur, book_word)
    # Yā Muqaddara
    ("p27_ya_intro",            53.00, 1.65, "Yā Muqaddara"),
    ("p27_ya_r1_w1_bihi",       62.20, 1.05, "بِهٖ"),
    ("p27_ya_r1_w2_biamrihi",   64.15, 1.65, "بِأَمْرِهٖ"),
    ("p27_ya_r1_w3_bihukmihi",  66.85, 1.70, "بِحُكْمِهٖ"),
    ("p27_ya_r1_w4_biqudratihi",69.55, 2.15, "بِقُدْرَتِهٖ"),
    ("p27_ya_r1_w5_hazihi",     72.55, 1.65, "هٰذِهٖ"),
    # Vāv Muqaddara
    ("p27_vav_intro",           75.00, 1.80, "Vāv Muqaddara"),
    ("p27_vav_r1_w1_lahu",      84.40, 1.05, "لَهُ"),
    ("p27_vav_r1_w2_amruhu",    86.65, 1.55, "أَمْرُهُ"),
    ("p27_vav_r1_w3_hukmuhu",   89.20, 1.55, "حُكْمُهُ"),
    ("p27_vav_r1_w4_qudratuhu", 91.65, 1.90, "قُدْرَتُهُ"),
    ("p27_vav_r1_w5_maluhu",    94.30, 1.70, "مَالُهُ"),
    ("p27_vav_r2_w1_daud",      97.30, 1.55, "دَاوُدْ"),
    ("p27_vav_r2_w2_taus",      99.90, 1.70, "طَاوُسْ"),
    ("p27_vav_r2_w3_ruus",     102.85, 1.55, "رُؤُسْ"),
    ("p27_vav_r2_w4_yaqra",    105.40, 1.95, "يَقْرَؤُنْ"),
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

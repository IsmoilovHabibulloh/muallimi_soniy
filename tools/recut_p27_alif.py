"""Re-cut all 14 Alif Muqaddara word audios + verify with whisper."""
import os, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8")
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
os.environ["PATH"] = os.path.dirname(FFMPEG) + os.pathsep + os.environ["PATH"]
import whisper

SRC = r"C:\Users\User\Desktop\Claud code\public\audio\39. yoz-o'qiladigan.mp3"
OUT = r"C:\Users\User\Desktop\Claud code\public\audio\edit\39_yoz_oqiladigan"

# (filename, start, dur, book_word)
CUTS = [
    # Re-aligned based on silencedetect — note haulai is elongated (3.6s)
    ("p27_alif_r1_w1_ilah",   13.10, 1.35, "إِلٰهُ"),
    ("p27_alif_r1_w2_rahman", 15.55, 1.65, "رَحْمٰنْ"),
    ("p27_alif_r1_w3_quran",  18.20, 1.50, "قُرْءَانْ"),
    ("p27_alif_r1_w4_haza",   20.50, 1.45, "هٰذَا"),
    ("p27_alif_r1_w5_zalika", 23.05, 1.40, "ذٰلِكَ"),     # alif_r2_w1 element
    ("p27_alif_r2_w1_haulai", 25.55, 3.75, "هٰؤُلَاءِ"),  # alif_r2_w2 (cho'ziq o'qilgan)
    ("p27_alif_r2_w2_lakin",  30.25, 1.40, "لٰكِنْ"),     # alif_r2_w3
    ("p27_alif_r2_w3_amana",  33.05, 1.25, "ءَامَنَ"),    # alif_r2_w4
    ("p27_alif_r2_w4_adam",   35.55, 1.30, "ءَادَمُ"),    # alif_r2_w5
    ("p27_alif_r2_w5_akhar",  38.05, 1.35, "اٰخَرُ"),      # alif_r3_w1
    ("p27_alif_r3_w1_amanna", 40.55, 2.05, "اٰمَنَّا"),    # alif_r3_w2
    ("p27_alif_r3_w2_ibr",    43.70, 2.15, "اِبْرٰهِيمْ"),  # alif_r3_w3
    ("p27_alif_r3_w3_ism",    46.90, 2.20, "اِسْمٰعِيلْ"),  # alif_r3_w4
    ("p27_alif_r3_w4_ishaq",  50.10, 1.60, "اِسْحٰقْ"),     # alif_r3_w5
]

# Cut each
for name, start, dur, ar in CUTS:
    out_path = os.path.join(OUT, name + ".mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", SRC, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out_path],
                   check=True)

print(f"Cut {len(CUTS)} files. Loading whisper for verification...", flush=True)
model = whisper.load_model("medium")
print()
for name, start, dur, ar in CUTS:
    out_path = os.path.join(OUT, name + ".mp3")
    r = model.transcribe(out_path, language="ar", task="transcribe", fp16=False)
    print(f"{name} (book: {ar}): {r['text'].strip()!r}", flush=True)

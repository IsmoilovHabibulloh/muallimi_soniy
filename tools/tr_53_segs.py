import os, sys, subprocess
sys.stdout.reconfigure(encoding="utf-8")
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
os.environ["PATH"] = os.path.dirname(FFMPEG) + os.pathsep + os.environ["PATH"]
import whisper
m = whisper.load_model("medium")
SRC = r"C:\Users\User\Desktop\Claud code\public\audio\53. kalimalar 05.mp3"
TMP = r"C:\Users\User\AppData\Local\Temp\k53"
os.makedirs(TMP, exist_ok=True)

segments = [
    ("seg1_title",  1.00, 1.70),
    ("seg2",        5.18, 2.60),
    ("seg3",        9.12, 2.80),
    ("seg4",       13.00, 6.78),
    ("seg5",       21.62, 8.45),
    ("seg6",       33.22, 8.15),
    ("seg7",       44.55, 20.55),
    ("seg8",       67.05, 4.60),
]
for name, start, dur in segments:
    out = os.path.join(TMP, name + ".mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", SRC, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out], check=True)
    r = m.transcribe(out, language="ar", task="transcribe", fp16=False)
    print(f"{name} [{start:.2f}-{start+dur:.2f}]: {r['text'].strip()!r}")

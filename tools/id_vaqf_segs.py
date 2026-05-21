import os, sys, subprocess
sys.stdout.reconfigure(encoding="utf-8")
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
os.environ["PATH"] = os.path.dirname(FFMPEG) + os.pathsep + os.environ["PATH"]
import whisper
m = whisper.load_model("medium")
SRC = r"C:\Users\User\Desktop\Claud code\public\audio\42. vaqf.mp3"
TMP = r"C:\Users\User\AppData\Local\Temp\vaqf_id"
os.makedirs(TMP, exist_ok=True)

segments = [
    ("seg1", 33.65, 2.20),
    ("seg2", 36.65, 2.10),
    ("seg3", 39.60, 2.10),
    ("seg4", 43.25, 1.50),
    ("seg5", 46.10, 1.30),
    ("seg6", 48.85, 1.90),
    ("seg7", 52.10, 1.70),
    ("seg8", 55.12, 1.75),
    ("seg9", 58.10, 1.85),
]
for name, start, dur in segments:
    out = os.path.join(TMP, name + ".mp3")
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", SRC, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out], check=True)
    r = m.transcribe(out, language="ar", task="transcribe", fp16=False)
    print(f"{name} [{start:6.2f}-{start+dur:6.2f}]: {r['text'].strip()!r}")

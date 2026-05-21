import os, sys, subprocess
sys.stdout.reconfigure(encoding="utf-8")
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
os.environ["PATH"] = os.path.dirname(FFMPEG) + os.pathsep + os.environ["PATH"]
import whisper
m = whisper.load_model("medium")
SRC = r"C:\Users\User\Desktop\Claud code\public\audio\42. vaqf.mp3"
# Narrow range with better resolution
out = r"C:\Users\User\AppData\Local\Temp\vaqf_n.mp3"
subprocess.run([FFMPEG, "-y", "-ss", "35", "-i", SRC, "-t", "10",
                "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out], check=True)
r = m.transcribe(out, language="ar", task="transcribe", fp16=False, word_timestamps=True,
                 initial_prompt="نستعين يؤمنون يعلمون")
for seg in r["segments"]:
    print(f'[{35+seg["start"]:6.2f}-{35+seg["end"]:6.2f}] {seg["text"]}')
    for w in seg.get("words", []):
        print(f'  [{35+w["start"]:6.2f}-{35+w["end"]:6.2f}] {w["word"]}')

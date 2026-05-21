import os, sys, subprocess
sys.stdout.reconfigure(encoding="utf-8")
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
os.environ["PATH"] = os.path.dirname(FFMPEG) + os.pathsep + os.environ["PATH"]
import whisper
m = whisper.load_model("medium")
SRC = r"C:\Users\User\Desktop\Claud code\public\audio\42. vaqf.mp3"
# Cut from 32s onwards
out = r"C:\Users\User\AppData\Local\Temp\vaqf_words.mp3"
subprocess.run([FFMPEG, "-y", "-ss", "32", "-i", SRC, "-t", "29",
                "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out], check=True)
r = m.transcribe(out, language="ar", task="transcribe", fp16=False, word_timestamps=True)
print("== vaqf 32-61s with word timestamps ==")
for seg in r["segments"]:
    print(f'[{32+seg["start"]:6.2f}-{32+seg["end"]:6.2f}] {seg["text"]}')
    for w in seg.get("words", []):
        print(f'  [{32+w["start"]:6.2f}-{32+w["end"]:6.2f}] {w["word"]}')

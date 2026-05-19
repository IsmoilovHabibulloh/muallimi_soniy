"""Transcribe the 10 audio segments to identify which letter (or explanation) each is."""
import os, sys
sys.stdout.reconfigure(encoding="utf-8")
os.environ["PATH"] = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin" + os.pathsep + os.environ["PATH"]
import whisper

BASE = r"C:\Users\User\AppData\Local\Temp\ah_test"
print("Loading medium model...", flush=True)
model = whisper.load_model("medium")
print("Loaded.\n", flush=True)

for name in ["segA","segB","segC","segD","segE","segF","segG","segH","segI","segJ"]:
    p = os.path.join(BASE, name + ".mp3")
    r = model.transcribe(p, language="ar", task="transcribe", fp16=False,
                         initial_prompt="ألف همزة واو ياء حرف الف وهمزة")
    print(f"{name}: {r['text'].strip()!r}", flush=True)

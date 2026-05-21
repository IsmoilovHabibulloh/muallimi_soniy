import os, sys
sys.stdout.reconfigure(encoding="utf-8")
os.environ["PATH"] = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin" + os.pathsep + os.environ["PATH"]
import whisper
m = whisper.load_model("medium")
B = r"C:\Users\User\Desktop\Claud code\public\audio\edit\42_vaqf"
for f in sorted(os.listdir(B)):
    if f.startswith("p31_w") and f.endswith(".mp3"):
        r = m.transcribe(os.path.join(B, f), language="ar", task="transcribe", fp16=False)
        print(f"{f}: {r['text'].strip()!r}")

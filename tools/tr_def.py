import os, sys
sys.stdout.reconfigure(encoding="utf-8")
os.environ["PATH"] = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin" + os.pathsep + os.environ["PATH"]
import whisper
m = whisper.load_model("medium")
B = r"C:\Users\User\AppData\Local\Temp\vaqf_def_test"
for f in ["full_rule.mp3","just_rule.mp3"]:
    r = m.transcribe(os.path.join(B, f), language="ar", task="transcribe", fp16=False)
    print("==", f, "==")
    for seg in r["segments"]:
        print(f' [{seg["start"]:6.2f}-{seg["end"]:6.2f}] {seg["text"]}')

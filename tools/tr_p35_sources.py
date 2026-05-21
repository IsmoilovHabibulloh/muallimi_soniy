import os, sys
sys.stdout.reconfigure(encoding="utf-8")
os.environ["PATH"] = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin" + os.pathsep + os.environ["PATH"]
import whisper
m = whisper.load_model("medium")
files = {
    "53_kalimalar_05": r"C:\Users\User\Desktop\Claud code\public\audio\53. kalimalar 05.mp3",
    "54_kalimalar_06": r"C:\Users\User\Desktop\Claud code\public\audio\54. kalimalar 06.mp3",
    "55_kalimalar_07": r"C:\Users\User\Desktop\Claud code\public\audio\55. kalimalar 07.mp3",
}
for name, p in files.items():
    print(f"== {name} ==")
    r = m.transcribe(p, language="ar", task="transcribe", fp16=False, word_timestamps=True)
    for seg in r["segments"]:
        print(f'[{seg["start"]:6.2f}-{seg["end"]:6.2f}] {seg["text"]}')
    print()

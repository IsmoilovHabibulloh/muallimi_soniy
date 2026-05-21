import os, sys
sys.stdout.reconfigure(encoding="utf-8")
os.environ["PATH"] = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin" + os.pathsep + os.environ["PATH"]
import whisper, subprocess
m = whisper.load_model("medium")
FFMPEG = r"C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"

# Cut narrower segments to get word timestamps
cuts = [
    ("layl_minnimah",  r"C:\Users\User\Desktop\Claud code\public\audio\59. Layl.mp3",    140.00, 20.00),
    ("zalzala_yawmaidh", r"C:\Users\User\Desktop\Claud code\public\audio\66. Zalzala.mp3", 28.00, 18.00),
]
for name, src, start, dur in cuts:
    out = rf"C:\Users\User\AppData\Local\Temp\{name}.mp3"
    subprocess.run([FFMPEG, "-y", "-ss", f"{start:.2f}", "-i", src, "-t", f"{dur:.2f}",
                    "-c:a", "libmp3lame", "-b:a", "192k", "-loglevel", "error", out], check=True)
    print(f"=== {name} (source offset {start}) ===")
    r = m.transcribe(out, language="ar", task="transcribe", fp16=False, word_timestamps=True)
    for seg in r["segments"]:
        for w in seg.get("words", []):
            abs_start = start + w["start"]
            abs_end = start + w["end"]
            print(f"  [{abs_start:6.2f}-{abs_end:6.2f}] {w['word']}")
    print()

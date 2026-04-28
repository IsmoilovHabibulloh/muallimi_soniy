export type AudioCallback = () => void;

export class AudioEngine {
  private audio: HTMLAudioElement;
  private timerId: ReturnType<typeof setInterval> | null = null;
  private segmentStart = 0;
  private segmentEnd = 0;
  private repeatTarget = 3;
  private _repeatIndex = 0;
  private _loopMode = false;
  private _autoNext = false;
  private isSegmentMode = false;

  public onRepeatUpdate: ((index: number) => void) | null = null;
  public onSegmentComplete: AudioCallback | null = null;
  public onTimeUpdate: ((time: number) => void) | null = null;
  public onBufferUpdate: ((pct: number) => void) | null = null;
  public onPlayStateChange: ((playing: boolean) => void) | null = null;

  constructor() {
    this.audio = new Audio();
    this.audio.preload = "auto";

    this.audio.addEventListener("progress", () => {
      if (this.audio.buffered.length > 0 && this.audio.duration > 0) {
        const buffered = this.audio.buffered.end(
          this.audio.buffered.length - 1
        );
        this.onBufferUpdate?.((buffered / this.audio.duration) * 100);
      }
    });

    this.audio.addEventListener("play", () =>
      this.onPlayStateChange?.(true)
    );
    this.audio.addEventListener("pause", () =>
      this.onPlayStateChange?.(false)
    );
    this.audio.addEventListener("ended", () => {
      this.onPlayStateChange?.(false);
    });
  }

  get duration() {
    return this.audio.duration || 0;
  }

  get currentTime() {
    return this.audio.currentTime || 0;
  }

  get paused() {
    return this.audio.paused;
  }

  get repeatIndex() {
    return this._repeatIndex;
  }

  loadAudio(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const resolved = new URL(url, location.href).href;
      if (this.audio.src === resolved) {
        resolve();
        return;
      }
      this.stop();
      this.audio.src = url;
      this.audio.addEventListener("canplay", () => resolve(), { once: true });
      this.audio.addEventListener(
        "error",
        () => reject(new Error("Audio load failed")),
        { once: true }
      );
      this.audio.load();
    });
  }

  async playSegment(start: number, end: number) {
    this.isSegmentMode = true;
    this.segmentStart = start;
    this.segmentEnd = end;
    this._repeatIndex = 0;
    this.onRepeatUpdate?.(0);
    // Audio.ended=true holatda currentTime=start qo'yilsa ham, ba'zi
    // brauzerlarda play() qayta boshlamaydi. Avval pause + load + seek
    // qilamiz, shundan keyin play — har ikkinchi click ham qayta ijro etadi.
    if (!this.audio.paused) this.audio.pause();
    this.audio.currentTime = start;
    await this.audio.play();
    this.startPolling();
  }

  async playFull() {
    this.isSegmentMode = false;
    this.audio.currentTime = 0;
    await this.audio.play();
    this.startPolling();
  }

  pause() {
    this.audio.pause();
    this.stopPolling();
  }

  resume() {
    this.audio.play();
    this.startPolling();
  }

  togglePlayPause() {
    if (this.audio.paused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  seek(time: number) {
    this.audio.currentTime = time;
  }

  setSpeed(rate: number) {
    this.audio.playbackRate = rate;
  }

  setRepeatCount(n: number) {
    this.repeatTarget = n;
  }

  setLoopMode(on: boolean) {
    this._loopMode = on;
  }

  setAutoNext(on: boolean) {
    this._autoNext = on;
  }

  stop() {
    this.pause();
    this.isSegmentMode = false;
    this.segmentStart = 0;
    this.segmentEnd = 0;
    this._repeatIndex = 0;
  }

  private startPolling() {
    this.stopPolling();
    this.timerId = setInterval(() => {
      this.onTimeUpdate?.(this.audio.currentTime);

      if (!this.isSegmentMode) return;
      // Boundary: either we've reached segmentEnd, or the file itself ended
      // naturally before segmentEnd (chunk durations can be slightly shorter
      // than declared `end` values in elements.ts).
      const atBoundary =
        this.audio.currentTime >= this.segmentEnd || this.audio.ended;
      if (!atBoundary) return;

      // Segment boundary reached
      this._repeatIndex++;
      this.onRepeatUpdate?.(this._repeatIndex);

      if (this._repeatIndex < this.repeatTarget) {
        // Repeat: seek back to start and continue playing
        this.audio.currentTime = this.segmentStart;
        if (this.audio.paused) this.audio.play();
      } else if (this._loopMode) {
        // Loop: reset counter and replay
        this._repeatIndex = 0;
        this.onRepeatUpdate?.(0);
        this.audio.currentTime = this.segmentStart;
        if (this.audio.paused) this.audio.play();
      } else {
        // Done
        this.pause();
        this.onSegmentComplete?.();
      }
    }, 40);
  }

  private stopPolling() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  destroy() {
    this.stop();
    this.audio.src = "";
  }
}

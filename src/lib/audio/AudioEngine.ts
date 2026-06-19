export type AudioCallback = () => void;

// Fon yuklovchi (offline/downloader.ts) audio ijro paytida bandwidth
// talashmasligi uchun ijro holatini global hodisa bilan e'lon qilamiz.
function dispatchAudioActive(active: boolean) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ms:audio-active", { detail: active }));
}

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

    this.audio.addEventListener("play", () => {
      this.onPlayStateChange?.(true);
      dispatchAudioActive(true);
    });
    this.audio.addEventListener("pause", () => {
      this.onPlayStateChange?.(false);
      dispatchAudioActive(false);
    });
    this.audio.addEventListener("ended", () => {
      this.onPlayStateChange?.(false);
      dispatchAudioActive(false);
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
      // Already this src AND fully buffered (HAVE_ENOUGH_DATA) — play now.
      if (this.audio.src === resolved && this.audio.readyState >= 4) {
        resolve();
        return;
      }
      this.stop();
      this.audio.src = url;

      // Muammo (FIX): avval `canplay` da hal qilinardi — lekin `canplay`
      // faqat "ijroni boshlash mumkin" degani, fayl TO'LIQ buferlanmagan.
      // Juda qisqa chunklarda (alif 0.41s, tha 0.47s) ijro buferdan o'zib
      // ketadi, brauzer `ended` ni erta beradi va segment kesiladi — shu
      // sababli "bir necha bor bosgandan keyin to'liq eshitiladi" muammosi
      // bo'lardi. Yechim: `canplaythrough` (oxirigacha to'xtovsiz ijro
      // qilish kafolati) ni kutamiz; agar u kechiksa, `canplay` + qisqa
      // grace bilan zaxira yo'l.
      let graceTimer: ReturnType<typeof setTimeout> | null = null;
      const cleanup = () => {
        if (graceTimer) clearTimeout(graceTimer);
        this.audio.removeEventListener("canplaythrough", onReady);
        this.audio.removeEventListener("canplay", onCanPlay);
        this.audio.removeEventListener("error", onError);
      };
      const onReady = () => {
        cleanup();
        resolve();
      };
      const onCanPlay = () => {
        // canplaythrough kelmasa ham, qisqa kutishdan so'ng davom etamiz
        // (mahalliy/serverdagi kichik fayllar uchun yetarli buffer bo'ladi).
        if (graceTimer) clearTimeout(graceTimer);
        graceTimer = setTimeout(onReady, 200);
      };
      const onError = () => {
        cleanup();
        reject(new Error("Audio load failed"));
      };

      this.audio.addEventListener("canplaythrough", onReady);
      this.audio.addEventListener("canplay", onCanPlay);
      this.audio.addEventListener("error", onError);
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

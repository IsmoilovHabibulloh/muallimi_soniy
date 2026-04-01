"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { AudioEngine } from "./AudioEngine";

export function useAudio() {
  const engineRef = useRef<AudioEngine | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferProgress, setBufferProgress] = useState(0);
  const [repeatIndex, setRepeatIndex] = useState(0);

  useEffect(() => {
    const engine = new AudioEngine();
    engine.onPlayStateChange = setIsPlaying;
    engine.onTimeUpdate = (t) => {
      setCurrentTime(t);
      setDuration(engine.duration);
    };
    engine.onBufferUpdate = setBufferProgress;
    engine.onRepeatUpdate = setRepeatIndex;
    engineRef.current = engine;

    return () => {
      engine.destroy();
    };
  }, []);

  const loadAudio = useCallback(async (url: string) => {
    if (!engineRef.current) return;
    await engineRef.current.loadAudio(url);
    setDuration(engineRef.current.duration);
  }, []);

  const playSegment = useCallback(async (url: string, start: number, end: number) => {
    if (!engineRef.current) return;
    await engineRef.current.loadAudio(url);
    setDuration(engineRef.current.duration);
    await engineRef.current.playSegment(start, end);
  }, []);

  const pause = useCallback(() => engineRef.current?.pause(), []);
  const resume = useCallback(() => engineRef.current?.resume(), []);
  const togglePlayPause = useCallback(() => engineRef.current?.togglePlayPause(), []);
  const seek = useCallback((t: number) => engineRef.current?.seek(t), []);
  const stop = useCallback(() => engineRef.current?.stop(), []);

  const setSpeed = useCallback((rate: number) => {
    engineRef.current?.setSpeed(rate);
  }, []);

  const setRepeatCount = useCallback((n: number) => {
    engineRef.current?.setRepeatCount(n);
  }, []);

  const setLoopMode = useCallback((on: boolean) => {
    engineRef.current?.setLoopMode(on);
  }, []);

  const setOnSegmentComplete = useCallback((cb: (() => void) | null) => {
    if (engineRef.current) {
      engineRef.current.onSegmentComplete = cb;
    }
  }, []);

  return {
    isPlaying,
    currentTime,
    duration,
    bufferProgress,
    repeatIndex,
    loadAudio,
    playSegment,
    pause,
    resume,
    togglePlayPause,
    seek,
    stop,
    setSpeed,
    setRepeatCount,
    setLoopMode,
    setOnSegmentComplete,
  };
}

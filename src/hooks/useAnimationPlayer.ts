"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseAnimationPlayerOptions {
  totalSteps: number;
  defaultSpeed?: number;
}

export function useAnimationPlayer({
  totalSteps,
  defaultSpeed = 1200,
}: UseAnimationPlayerOptions) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(defaultSpeed);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearTimer();
  }, [clearTimer]);

  const play = useCallback(() => {
    if (totalSteps <= 1) return;
    setIsPlaying(true);
  }, [totalSteps]);

  // Manage the interval based on isPlaying + speed
  useEffect(() => {
    if (!isPlaying) return;
    clearTimer();
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);
    return clearTimer;
  }, [isPlaying, speed, totalSteps, clearTimer]);

  const stepForward = useCallback(() => {
    pause();
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [pause, totalSteps]);

  const stepBack = useCallback(() => {
    pause();
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, [pause]);

  const reset = useCallback(() => {
    pause();
    setCurrentStep(0);
  }, [pause]);

  const goToStep = useCallback(
    (n: number) => {
      pause();
      setCurrentStep(Math.max(0, Math.min(n, totalSteps - 1)));
    },
    [pause, totalSteps]
  );

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (target?.isContentEditable) return;
      if (target?.closest(".monaco-editor")) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        stepForward();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepBack();
      } else if (e.key === " ") {
        e.preventDefault();
        if (isPlaying) pause();
        else play();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [stepForward, stepBack, isPlaying, pause, play]);

  return {
    currentStep,
    isPlaying,
    speed,
    play,
    pause,
    stepForward,
    stepBack,
    reset,
    setSpeed,
    goToStep,
  };
}

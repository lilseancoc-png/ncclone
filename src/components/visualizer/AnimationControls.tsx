"use client";

import { useCallback, useRef } from "react";

interface AnimationControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onGoToStep: (step: number) => void;
}

const SPEED_OPTIONS: { label: string; value: number }[] = [
  { label: "0.5×", value: 2000 },
  { label: "1×", value: 1200 },
  { label: "1.5×", value: 800 },
  { label: "2×", value: 500 },
  { label: "3×", value: 300 },
];

const transportBtn =
  "h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-foreground hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed";

export default function AnimationControls({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onStepForward,
  onStepBack,
  onReset,
  onSpeedChange,
  onGoToStep,
}: AnimationControlsProps) {
  const lastSteps = Math.max(totalSteps - 1, 1);
  const progress = totalSteps > 1 ? (currentStep / lastSteps) * 100 : 0;

  const trackRef = useRef<HTMLDivElement | null>(null);

  const stepFromClientX = useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      onGoToStep(Math.round(pct * lastSteps));
    },
    [onGoToStep, lastSteps]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (totalSteps <= 1) return;
      e.preventDefault();
      stepFromClientX(e.clientX);

      const handleMove = (ev: PointerEvent) => stepFromClientX(ev.clientX);
      const handleUp = () => {
        document.removeEventListener("pointermove", handleMove);
        document.removeEventListener("pointerup", handleUp);
      };
      document.addEventListener("pointermove", handleMove);
      document.addEventListener("pointerup", handleUp);
    },
    [stepFromClientX, totalSteps]
  );

  return (
    <div className="space-y-2">
      {/* Progress track */}
      <div
        ref={trackRef}
        role="slider"
        aria-label="Step progress"
        aria-valuemin={0}
        aria-valuemax={lastSteps}
        aria-valuenow={currentStep}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        className="group relative h-3 flex items-center cursor-pointer touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-easy/40 rounded-full"
      >
        <div className="relative h-1.5 w-full bg-border/30 group-hover:bg-border/60 rounded-full transition-colors">
          <div
            className="absolute inset-y-0 left-0 bg-easy/60 rounded-full transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-easy ring-2 ring-easy/30 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
            style={{ left: `${progress}%` }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Transport pill */}
        <div className="inline-flex items-center gap-0.5 bg-[#151525] border border-border/30 rounded-md p-0.5">
          <button
            onClick={onReset}
            className={transportBtn}
            title="Reset"
            aria-label="Reset to first step"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0115.36-5.36M20 15a9 9 0 01-15.36 5.36" />
            </svg>
          </button>
          <button
            onClick={onStepBack}
            disabled={currentStep === 0}
            className={transportBtn}
            title="Step back (←)"
            aria-label="Step back"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={isPlaying ? onPause : onPlay}
            disabled={totalSteps <= 1}
            aria-pressed={isPlaying}
            aria-label={isPlaying ? "Pause" : "Play"}
            title={isPlaying ? "Pause (Space)" : "Play (Space)"}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md bg-easy/20 text-easy hover:bg-easy/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            onClick={onStepForward}
            disabled={currentStep >= totalSteps - 1}
            className={transportBtn}
            title="Step forward (→)"
            aria-label="Step forward"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Step counter */}
        <span className="text-[11px] text-gray-500 font-mono tabular-nums">
          {currentStep + 1}/{totalSteps}
        </span>

        {/* Keyboard hint cluster */}
        <div className="hidden sm:inline-flex items-center gap-2 text-[10px] text-gray-500 bg-white/[0.03] border border-white/5 rounded px-2 py-1">
          <span className="inline-flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-mono">Space</kbd>
            <span>play</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-mono">&larr;</kbd>
            <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-mono">&rarr;</kbd>
            <span>step</span>
          </span>
        </div>

        {/* Speed chips */}
        <div
          className="ml-auto inline-flex items-center gap-0.5 bg-[#151525] border border-border/30 rounded-md p-0.5"
          role="group"
          aria-label="Playback speed"
        >
          {SPEED_OPTIONS.map((opt) => {
            const active = speed === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onSpeedChange(opt.value)}
                aria-pressed={active}
                className={`h-7 px-2 text-[11px] font-medium rounded transition-colors tabular-nums ${
                  active
                    ? "bg-violet-500/15 text-violet-200"
                    : "text-gray-400 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

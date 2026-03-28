"use client";

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
  const progress = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="space-y-2">
      {/* Progress bar */}
      <div
        className="relative h-1.5 bg-border/30 rounded-full cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          onGoToStep(Math.round(pct * (totalSteps - 1)));
        }}
      >
        <div
          className="absolute h-full bg-easy/60 rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onReset}
          className="p-1.5 text-gray-400 hover:text-foreground transition-colors rounded hover:bg-white/5"
          title="Reset"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0115.36-5.36M20 15a9 9 0 01-15.36 5.36" />
          </svg>
        </button>

        <button
          onClick={onStepBack}
          disabled={currentStep === 0}
          className="p-1.5 text-gray-400 hover:text-foreground transition-colors rounded hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Step back"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={isPlaying ? onPause : onPlay}
          className="p-1.5 bg-easy/20 text-easy rounded-md hover:bg-easy/30 transition-colors"
          title={isPlaying ? "Pause" : "Play"}
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
          className="p-1.5 text-gray-400 hover:text-foreground transition-colors rounded hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Step forward"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <span className="text-[10px] text-gray-500 font-mono ml-1">
          {currentStep + 1}/{totalSteps}
        </span>

        {/* Speed control */}
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[10px] text-gray-500">Speed</span>
          <select
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="bg-[#151525] border border-border/30 rounded px-1.5 py-0.5 text-[10px] text-foreground/80 focus:outline-none cursor-pointer"
          >
            <option value={2000}>0.5x</option>
            <option value={1200}>1x</option>
            <option value={800}>1.5x</option>
            <option value={500}>2x</option>
            <option value={300}>3x</option>
          </select>
        </div>
      </div>
    </div>
  );
}

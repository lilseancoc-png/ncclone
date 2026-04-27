"use client";

import { SolutionData } from "@/data/types";
import { useAnimationPlayer } from "@/hooks/useAnimationPlayer";
import AnimationControls from "./AnimationControls";
import VisualizationCanvas from "./VisualizationCanvas";

export default function AlgorithmVisualizer({
  solution,
}: {
  solution: SolutionData;
}) {
  const {
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
  } = useAnimationPlayer({ totalSteps: solution.steps.length });

  const step = solution.steps[currentStep];

  return (
    <div className="space-y-4">
      {/* Solution code with line highlighting */}
      <div className="rounded-lg border border-border/30 bg-[#1e1e2e] overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border/20">
          <svg
            className="w-3 h-3 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3m8-6l4 3-4 3M14 5l-4 14" />
          </svg>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Solution
          </span>
        </div>
        <pre className="px-3 py-2 text-xs font-mono leading-relaxed overflow-x-auto">
          {solution.code.split("\n").map((line, i) => {
            const lineNum = i + 1;
            const isHighlighted = step?.codeHighlightLines?.includes(lineNum);
            return (
              <div
                key={i}
                className={`px-1 -mx-1 transition-all duration-200 ${
                  isHighlighted
                    ? "bg-yellow-500/15 border-l-2 border-yellow-400"
                    : "border-l-2 border-transparent"
                }`}
              >
                <span className="inline-block w-6 text-right mr-3 text-gray-600 select-none text-[10px]">
                  {lineNum}
                </span>
                <span className={isHighlighted ? "text-foreground" : "text-foreground/70"}>
                  {line || " "}
                </span>
              </div>
            );
          })}
        </pre>
      </div>

      {/* Step description */}
      <div className="px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm min-h-[40px] flex items-center transition-all duration-300">
        {step?.description ? (
          <span className="text-blue-200/90">{step.description}</span>
        ) : (
          <span className="text-gray-500 italic">No narration for this step.</span>
        )}
      </div>

      {/* Data structure visualizations */}
      {step && <VisualizationCanvas structures={step.structures} />}

      {/* Playback controls */}
      <AnimationControls
        currentStep={currentStep}
        totalSteps={solution.steps.length}
        isPlaying={isPlaying}
        speed={speed}
        onPlay={play}
        onPause={pause}
        onStepForward={stepForward}
        onStepBack={stepBack}
        onReset={reset}
        onSpeedChange={setSpeed}
        onGoToStep={goToStep}
      />
    </div>
  );
}

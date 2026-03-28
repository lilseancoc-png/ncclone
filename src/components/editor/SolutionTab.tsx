"use client";

import { useEffect, useState } from "react";
import { SolutionData } from "@/data/types";
import AlgorithmVisualizer from "@/components/visualizer/AlgorithmVisualizer";
import { loadSolutions } from "@/data/solutions";

export default function SolutionTab({ slug }: { slug: string }) {
  const [solutions, setSolutions] = useState<SolutionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setLoading(true);
    setActiveIdx(0);
    loadSolutions(slug).then((data) => {
      setSolutions(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
        <svg className="w-4 h-4 animate-spin mr-2" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Loading solution...
      </div>
    );
  }

  if (solutions.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
        Solution walkthrough coming soon.
      </div>
    );
  }

  const current = solutions[activeIdx];

  return (
    <div className="space-y-4">
      {/* Approach selector - only show if multiple solutions */}
      {solutions.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {solutions.map((sol, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                activeIdx === i
                  ? "bg-easy/20 text-easy border-easy/40"
                  : "bg-card text-gray-400 border-border hover:text-foreground hover:bg-card-hover"
              }`}
            >
              {sol.label || `Approach ${i + 1}`}
            </button>
          ))}
        </div>
      )}

      {/* Complexity badges */}
      {(current.timeComplexity || current.spaceComplexity) && (
        <div className="flex gap-3 text-xs">
          {current.timeComplexity && (
            <span className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300/90">
              Time: {current.timeComplexity}
            </span>
          )}
          {current.spaceComplexity && (
            <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300/90">
              Space: {current.spaceComplexity}
            </span>
          )}
        </div>
      )}

      <AlgorithmVisualizer key={activeIdx} solution={current} />
    </div>
  );
}

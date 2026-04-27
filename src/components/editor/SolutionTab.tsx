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
      <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500 font-sans">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 mb-3">
          <svg className="w-4 h-4 animate-spin text-gray-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
        <div className="text-sm text-gray-400">Loading solution…</div>
      </div>
    );
  }

  if (solutions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 text-gray-500 font-sans">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 mb-3">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <div className="text-sm text-gray-400">Walkthrough coming soon</div>
        <div className="text-[11px] text-gray-600 mt-1 max-w-xs">
          A guided solution for this problem isn&apos;t available yet — try the hints in the Description tab.
        </div>
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

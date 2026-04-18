"use client";

import { useState } from "react";
import { Problem, Category } from "@/data/types";
import DifficultyBadge from "@/components/DifficultyBadge";
import { useProgress } from "@/hooks/useProgress";
import { hasSolution } from "@/data/solutions";
import SolutionTab from "./SolutionTab";
import ErrorBoundary from "@/components/ErrorBoundary";

const PATTERN_COLORS: Record<string, string> = {
  "Hash Map": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Sorting": "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "Two Pointers": "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  "Sliding Window": "bg-teal-500/15 text-teal-400 border-teal-500/30",
  "Binary Search": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Stack": "bg-orange-500/15 text-orange-400 border-orange-500/30",
  "Monotonic Stack": "bg-orange-500/15 text-orange-400 border-orange-500/30",
  "Linked List": "bg-rose-500/15 text-rose-400 border-rose-500/30",
  "Tree": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "DFS": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "BFS": "bg-sky-500/15 text-sky-400 border-sky-500/30",
  "Graph": "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  "Dynamic Programming": "bg-pink-500/15 text-pink-400 border-pink-500/30",
  "Greedy": "bg-lime-500/15 text-lime-400 border-lime-500/30",
  "Backtracking": "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "Heap": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  "Trie": "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30",
  "Bit Manipulation": "bg-red-500/15 text-red-400 border-red-500/30",
  "Math": "bg-gray-500/15 text-gray-400 border-gray-500/30",
  "Array": "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "Set": "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  "Prefix Sum": "bg-teal-500/15 text-teal-300 border-teal-500/30",
  "Bucket Sort": "bg-purple-500/15 text-purple-300 border-purple-500/30",
  "String": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "Matrix": "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
};

const DEFAULT_PATTERN_COLOR = "bg-gray-500/15 text-gray-400 border-gray-500/30";

interface ProblemDescriptionProps {
  problem: Problem;
  category: Category;
}

export default function ProblemDescription({
  problem,
  category,
}: ProblemDescriptionProps) {
  const [hintLevel, setHintLevel] = useState(0);
  const [showApproach, setShowApproach] = useState(false);
  const [showIntuition, setShowIntuition] = useState(false);
  const [tab, setTab] = useState<"description" | "solution">("description");
  const { isCompleted, toggleCompleted, mounted } = useProgress();
  const done = mounted && isCompleted(problem.slug);
  const showSolutionTab = hasSolution(problem.slug);

  const hints = problem.hints ?? [];
  const patterns = problem.patterns ?? [];
  const maxHints = hints.length;

  return (
    <div className="h-full flex flex-col bg-[#0d0d1a]">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-border/50 flex-shrink-0">
        <button
          onClick={() => setTab("description")}
          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
            tab === "description"
              ? "bg-card text-foreground"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setTab("solution")}
          className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
            tab === "solution"
              ? "bg-card text-foreground"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Solution
          {showSolutionTab && (
            <span className="w-1.5 h-1.5 rounded-full bg-easy/60" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {tab === "description" && (
          <>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                {category.name}
              </p>
              <div className="flex items-start justify-between gap-3 mt-1.5">
                <h1 className="text-lg font-bold leading-tight">
                  {problem.id}. {problem.title}
                </h1>
                <DifficultyBadge difficulty={problem.difficulty} />
              </div>
              {patterns.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {patterns.map((p) => (
                    <span
                      key={p}
                      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full border ${PATTERN_COLORS[p] ?? DEFAULT_PATTERN_COLOR}`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {problem.description && (
              <div className="text-foreground/80 leading-relaxed whitespace-pre-line text-[13px]">
                {problem.description}
              </div>
            )}

            {problem.testCases && problem.testCases.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Examples
                </h3>
                {problem.testCases.slice(0, 3).map((tc) => (
                  <div
                    key={tc.id}
                    className="bg-[#151525] rounded-lg p-3.5 text-sm font-mono space-y-1.5 border border-border/30"
                  >
                    <div>
                      <span className="text-gray-400">Input: </span>
                      <span className="text-foreground/80">{tc.input}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Output: </span>
                      <span className="text-easy">
                        {JSON.stringify(tc.expected)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Progressive Hints */}
            {maxHints > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Hints
                  </h3>
                  <span className="text-[10px] text-gray-500">
                    {hintLevel}/{maxHints} revealed
                  </span>
                </div>
                <div className="space-y-2">
                  {hints.map((hint, i) => {
                    const revealed = i < hintLevel;
                    return (
                      <div
                        key={i}
                        className={`rounded-lg border transition-all duration-300 ${
                          revealed
                            ? "bg-[#151525] border-border/30"
                            : "bg-[#0f0f1f] border-border/15"
                        }`}
                      >
                        {revealed ? (
                          <div className="px-3.5 py-2.5">
                            <div className="flex items-start gap-2">
                              <span className="text-[10px] font-bold text-gray-500 mt-0.5 shrink-0">
                                {i + 1}.
                              </span>
                              <p className="text-sm text-foreground/75 leading-relaxed">
                                {hint}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setHintLevel(i + 1)}
                            className="w-full px-3.5 py-2.5 flex items-center gap-2 text-left group"
                          >
                            <span className="text-[10px] font-bold text-gray-600 shrink-0">
                              {i + 1}.
                            </span>
                            <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                              Click to reveal hint {i + 1}
                            </span>
                            <svg
                              className="w-3 h-3 text-gray-600 group-hover:text-gray-400 transition-colors ml-auto"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Approach */}
            <div>
              <button
                onClick={() => setShowApproach(!showApproach)}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-foreground transition-colors"
              >
                <svg
                  className={`w-3 h-3 transition-transform ${showApproach ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Approach
              </button>
              {showApproach && (
                <div className="mt-2 text-sm text-foreground/70 leading-relaxed">
                  <p>{problem.approach}</p>
                  <div className="flex gap-4 mt-3">
                    <div>
                      <span className="text-gray-400 text-xs">Time: </span>
                      <code className="text-easy text-xs">
                        {problem.timeComplexity}
                      </code>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Space: </span>
                      <code className="text-medium text-xs">
                        {problem.spaceComplexity}
                      </code>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Key Intuition */}
            {problem.keyIntuition && (
              <div>
                <button
                  onClick={() => setShowIntuition(!showIntuition)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-foreground transition-colors"
                >
                  <svg
                    className={`w-3 h-3 transition-transform ${showIntuition ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Key Intuition
                </button>
                {showIntuition && (
                  <div className="mt-2 bg-[#151525] rounded-lg p-4 border border-easy/15">
                    <p className="text-sm text-foreground/75 leading-relaxed">
                      {problem.keyIntuition}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-3 pt-3 border-t border-border/30">
              <button
                onClick={() => toggleCompleted(problem.slug)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  done
                    ? "bg-easy/20 text-easy"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {done ? (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Completed
                  </>
                ) : (
                  "Mark Complete"
                )}
              </button>
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-foreground border border-border rounded-lg hover:bg-card-hover transition-colors"
              >
                LeetCode
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </>
        )}

        {tab === "solution" && (
          <ErrorBoundary>
            <SolutionTab slug={problem.slug} />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}

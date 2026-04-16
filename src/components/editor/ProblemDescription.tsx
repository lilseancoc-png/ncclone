"use client";

import { useState } from "react";
import { Problem, Category } from "@/data/types";
import DifficultyBadge from "@/components/DifficultyBadge";
import { useProgress } from "@/hooks/useProgress";
import { hasSolution } from "@/data/solutions";
import SolutionTab from "./SolutionTab";
import ErrorBoundary from "@/components/ErrorBoundary";

interface ProblemDescriptionProps {
  problem: Problem;
  category: Category;
}

export default function ProblemDescription({
  problem,
  category,
}: ProblemDescriptionProps) {
  const [showHint, setShowHint] = useState(false);
  const [tab, setTab] = useState<"description" | "solution">("description");
  const { isCompleted, toggleCompleted, mounted } = useProgress();
  const done = mounted && isCompleted(problem.slug);
  const showSolutionTab = hasSolution(problem.slug);

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
                {problem.testCases.map((tc) => (
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

            <div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-foreground transition-colors"
              >
                <svg
                  className={`w-3 h-3 transition-transform ${showHint ? "rotate-90" : ""}`}
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
                Approach (Hint)
              </button>
              {showHint && (
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

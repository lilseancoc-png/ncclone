"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Problem, Category, Language } from "@/data/types";
import DifficultyBadge from "@/components/DifficultyBadge";
import { useProgress } from "@/hooks/useProgress";
import { hasSolution } from "@/data/solutions";
import { useAdaptiveHints } from "@/hooks/useAdaptiveHints";
import { useProblemExplainer } from "@/hooks/useProblemExplainer";
import { useApproachCheck } from "@/hooks/useApproachCheck";
import { findSimilarProblems } from "@/lib/utils";
import { categories as allCategories } from "@/data/problems";
import SolutionTab from "./SolutionTab";
import ExampleVisual from "./ExampleVisual";
import ErrorBoundary from "@/components/ErrorBoundary";
import MarkdownMessage from "@/components/editor/MarkdownMessage";

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
  language?: Language;
  code?: string;
}

export default function ProblemDescription({
  problem,
  category,
  language,
  code,
}: ProblemDescriptionProps) {
  const [showApproach, setShowApproach] = useState(false);
  const [showIntuition, setShowIntuition] = useState(false);
  const [tab, setTab] = useState<"description" | "solution">("description");
  const { isCompleted, toggleCompleted, mounted } = useProgress();
  const done = mounted && isCompleted(problem.slug);
  const showSolutionTab = hasSolution(problem.slug);

  const canUseAiHints = Boolean(language);
  const {
    hints,
    streamingHint,
    isLoading: isHintLoading,
    error: hintError,
    usedFallback,
    maxLevel,
    revealNext,
  } = useAdaptiveHints(problem);

  const {
    explanation,
    isLoading: isExplaining,
    error: explainError,
    request: requestExplanation,
    clear: clearExplanation,
  } = useProblemExplainer(problem);

  const patterns = problem.patterns ?? [];
  const similar = findSimilarProblems(allCategories, problem.slug, 3);
  const hasExplanation = explanation.length > 0 || isExplaining;

  return (
    <div className="h-full flex flex-col bg-[#0d0d1a]">
      {/* Tab bar */}
      <div className="flex items-end gap-2 px-4 border-b border-border/50 flex-shrink-0">
        <button
          onClick={() => setTab("description")}
          className={`relative px-3 h-9 -mb-px text-xs font-medium transition-colors flex items-center gap-1.5 border-b-2 ${
            tab === "description"
              ? "text-foreground border-violet-400"
              : "text-gray-500 hover:text-gray-300 border-transparent"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setTab("solution")}
          className={`relative px-3 h-9 -mb-px text-xs font-medium transition-colors flex items-center gap-1.5 border-b-2 ${
            tab === "solution"
              ? "text-foreground border-violet-400"
              : "text-gray-500 hover:text-gray-300 border-transparent"
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

            {/* "Explain to me" — one-click plain-English summary of the problem. */}
            <div>
              {!hasExplanation && !explainError ? (
                <button
                  onClick={() => requestExplanation()}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 text-violet-200 text-xs font-medium transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Explain this problem to me
                </button>
              ) : (
                <div className="rounded-lg border border-violet-500/25 bg-[#151525]">
                  <div className="flex items-center justify-between px-3.5 py-2 border-b border-violet-500/15">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-200">
                        In plain English
                      </span>
                    </div>
                    <button
                      onClick={clearExplanation}
                      className="text-[10px] text-gray-500 hover:text-foreground transition-colors"
                      aria-label="Dismiss explanation"
                    >
                      Dismiss
                    </button>
                  </div>
                  <div className="px-3.5 py-3 text-sm text-foreground/80 leading-relaxed">
                    {explanation ? (
                      <MarkdownMessage text={explanation} />
                    ) : (
                      <span className="text-gray-500 italic">Thinking…</span>
                    )}
                    {isExplaining && (
                      <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-violet-400 animate-pulse" />
                    )}
                  </div>
                </div>
              )}
              {explainError && !isExplaining && (
                <div className="mt-2 flex items-center gap-2 text-[11px] text-hard">
                  <span>{explainError}</span>
                  <button
                    onClick={() => requestExplanation()}
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>

            {/* "Check my approach" — pre-coding gut check on the user's plan.
                Keyed by slug so navigating problems resets local state cleanly. */}
            <ApproachCheckPanel key={problem.slug} problem={problem} />

            {problem.testCases && problem.testCases.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Examples
                </h3>
                <ExampleVisual problem={problem} category={category} />
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

            {/* Adaptive Hints (AI-generated, escalating 1..5). Falls back to
                problem.hints[] when Puter is unavailable. */}
            {canUseAiHints && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    Hints
                    {usedFallback && (
                      <span className="text-[9px] font-normal text-gray-500 normal-case tracking-normal">
                        (offline hints)
                      </span>
                    )}
                  </h3>
                  <span className="text-[10px] text-gray-500">
                    {hints.length}/{maxLevel} revealed
                  </span>
                </div>
                <div className="space-y-2">
                  {hints.map((hint, i) => (
                    <div
                      key={i}
                      className="rounded-lg border bg-[#151525] border-border/30"
                    >
                      <div className="px-3.5 py-2.5">
                        <div className="flex items-start gap-2">
                          <span className="text-[10px] font-bold text-gray-500 mt-0.5 shrink-0">
                            {i + 1}.
                          </span>
                          <div className="text-sm text-foreground/75 leading-relaxed flex-1 min-w-0">
                            {usedFallback ? (
                              <p className="whitespace-pre-wrap">{hint}</p>
                            ) : (
                              <MarkdownMessage text={hint} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isHintLoading && (
                    <div className="rounded-lg border bg-[#151525] border-violet-500/30">
                      <div className="px-3.5 py-2.5">
                        <div className="flex items-start gap-2">
                          <span className="text-[10px] font-bold text-violet-300 mt-0.5 shrink-0">
                            {hints.length + 1}.
                          </span>
                          <div className="text-sm text-foreground/75 leading-relaxed flex-1 min-w-0">
                            {streamingHint ? (
                              <MarkdownMessage text={streamingHint} />
                            ) : null}
                            <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-violet-400 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isHintLoading && hints.length < maxLevel && (
                    <button
                      onClick={() =>
                        revealNext(language!, code ?? "")
                      }
                      className="w-full rounded-lg border bg-[#0f0f1f] border-border/15 hover:border-violet-500/40 px-3.5 py-2.5 flex items-center gap-2 text-left group transition-colors"
                    >
                      <span className="text-[10px] font-bold text-gray-600 group-hover:text-violet-300 shrink-0">
                        {hints.length + 1}.
                      </span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                        {hints.length === 0
                          ? "Reveal the first hint"
                          : `Reveal hint ${hints.length + 1}`}
                      </span>
                      <svg
                        className="w-3 h-3 text-gray-600 group-hover:text-violet-300 transition-colors ml-auto"
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

                  {hintError && !isHintLoading && (
                    <div className="text-[11px] text-hard">{hintError}</div>
                  )}
                </div>
              </div>
            )}

            {/* Approach */}
            <div className="rounded-lg border border-border/30 overflow-hidden">
              <button
                onClick={() => setShowApproach(!showApproach)}
                aria-expanded={showApproach}
                className="w-full flex items-center gap-2 px-3.5 py-2.5 text-left bg-[#151525] hover:bg-[#1a1a2e] transition-colors"
              >
                <svg
                  className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${showApproach ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Approach
                </span>
                <span className="ml-auto flex items-center gap-2 text-[10px] tabular-nums">
                  <span className="px-1.5 py-0.5 rounded bg-easy/10 border border-easy/20">
                    <span className="text-gray-400">Time </span>
                    <code className="text-easy font-mono">{problem.timeComplexity}</code>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-medium/10 border border-medium/20">
                    <span className="text-gray-400">Space </span>
                    <code className="text-medium font-mono">{problem.spaceComplexity}</code>
                  </span>
                </span>
              </button>
              {showApproach && (
                <div className="px-3.5 py-3 border-t border-border/30 text-sm text-foreground/75 leading-relaxed">
                  <p>{problem.approach}</p>
                </div>
              )}
            </div>

            {/* Key Intuition */}
            {problem.keyIntuition && (
              <div className="rounded-lg border border-easy/15 overflow-hidden">
                <button
                  onClick={() => setShowIntuition(!showIntuition)}
                  aria-expanded={showIntuition}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-left bg-[#151525] hover:bg-[#1a1a2e] transition-colors"
                >
                  <svg
                    className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${showIntuition ? "rotate-90" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Key Intuition
                  </span>
                  <svg
                    className="w-3.5 h-3.5 ml-auto text-easy/70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </button>
                {showIntuition && (
                  <div className="px-3.5 py-3 border-t border-easy/15 bg-[#0f0f1f]">
                    <p className="text-sm text-foreground/75 leading-relaxed">
                      {problem.keyIntuition}
                    </p>
                  </div>
                )}
              </div>
            )}

            {similar.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Similar Problems
                </h3>
                <div className="space-y-1.5">
                  {similar.map(({ problem: p, category: cat, sharedPatterns }) => {
                    const completed = mounted && isCompleted(p.slug);
                    return (
                      <Link
                        key={p.slug}
                        href={`/problem/${p.slug}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg border border-border/30 bg-[#151525] hover:border-border hover:bg-[#1a1a2e] transition-colors group"
                      >
                        <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                          {completed ? (
                            <svg className="w-4 h-4 text-easy" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-gray-400 transition-colors" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-foreground/90 truncate group-hover:text-foreground">
                            {p.title}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-gray-500 truncate">
                              {cat.name}
                            </span>
                            {sharedPatterns.length > 0 && (
                              <span className="text-[10px] text-gray-600">
                                · {sharedPatterns.slice(0, 2).join(", ")}
                              </span>
                            )}
                          </div>
                        </div>
                        <DifficultyBadge difficulty={p.difficulty} />
                      </Link>
                    );
                  })}
                </div>
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

function ApproachCheckPanel({ problem }: { problem: Problem }) {
  const {
    verdict,
    isLoading,
    error,
    check,
    clear,
  } = useApproachCheck(problem);

  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) textareaRef.current?.focus();
  }, [open]);

  const submit = () => {
    const trimmed = plan.trim();
    if (!trimmed || isLoading) return;
    check(trimmed);
  };

  const hasVerdict = verdict.length > 0 || isLoading;

  if (!open && !hasVerdict) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-200 text-xs font-medium transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Check my approach
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-blue-500/25 bg-[#151525]">
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-blue-500/15">
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
            Pre-coding gut check
          </span>
        </div>
        <button
          onClick={() => {
            clear();
            setPlan("");
            setOpen(false);
          }}
          className="text-[10px] text-gray-500 hover:text-foreground transition-colors"
          aria-label="Close approach check"
        >
          Close
        </button>
      </div>
      <div className="px-3.5 py-3 space-y-2.5">
        <textarea
          ref={textareaRef}
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
          rows={3}
          placeholder="In one or two sentences, how would you solve this?"
          className="w-full resize-none rounded-md border border-border/40 bg-[#0d0d1a] px-3 py-2 text-sm text-foreground/90 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
        />
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] text-gray-500">
            AI returns a 3-line verdict — no spoilers.
          </span>
          <button
            onClick={submit}
            disabled={!plan.trim() || isLoading}
            className="px-3 py-1 text-xs font-medium rounded-md bg-blue-500/20 text-blue-200 border border-blue-500/40 hover:bg-blue-500/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? "Checking…" : verdict ? "Re-check" : "Check"}
          </button>
        </div>
        {hasVerdict && (
          <div className="rounded-md bg-[#0d0d1a] border border-border/30 px-3 py-2.5 text-sm text-foreground/85 leading-relaxed">
            {verdict ? (
              <MarkdownMessage text={verdict} />
            ) : (
              <span className="text-gray-500 italic">Thinking…</span>
            )}
            {isLoading && (
              <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-blue-400 animate-pulse" />
            )}
          </div>
        )}
        {error && !isLoading && (
          <div className="flex items-center gap-2 text-[11px] text-hard">
            <span>{error}</span>
            <button
              onClick={submit}
              className="underline underline-offset-2 hover:text-foreground"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

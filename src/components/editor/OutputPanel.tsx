"use client";

import { useState } from "react";
import { TestCase, TestResult } from "@/data/types";

interface OutputPanelProps {
  results: TestResult[] | null;
  testCases: TestCase[];
  consoleOutput: string[];
  error: string | null;
  isRunning: boolean;
  isPythonLoading?: boolean;
}

export default function OutputPanel({
  results,
  testCases,
  consoleOutput,
  error,
  isRunning,
  isPythonLoading,
}: OutputPanelProps) {
  const [tab, setTab] = useState<"results" | "console">("results");

  const passedCount = results?.filter((r) => r.passed).length ?? 0;
  const totalCount = results?.length ?? 0;
  const allPassed = totalCount > 0 && passedCount === totalCount;

  return (
    <div className="flex flex-col h-full bg-[#151525]">
      {/* Drag handle visual */}
      <div className="flex items-center justify-center py-1 border-t border-border cursor-row-resize">
        <div className="w-8 h-1 rounded-full bg-gray-600" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 py-1.5 border-b border-border/50">
        <button
          onClick={() => setTab("results")}
          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
            tab === "results"
              ? "bg-card text-foreground"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Test Results
          {results && (
            <span
              className={`ml-1.5 ${allPassed ? "text-easy" : "text-hard"}`}
            >
              {passedCount}/{totalCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab("console")}
          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
            tab === "console"
              ? "bg-card text-foreground"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Console
          {consoleOutput.length > 0 && (
            <span className="ml-1.5 text-medium">
              {consoleOutput.length}
            </span>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-4 py-3 text-sm font-mono">
        {isRunning && (
          <div className="flex items-center gap-2.5 text-medium">
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <div>
              <div>Executing code...</div>
              {isPythonLoading && (
                <div className="text-xs text-gray-500 mt-1">
                  Loading Python runtime (first run may take a few seconds)
                </div>
              )}
            </div>
          </div>
        )}

        {!isRunning && error && !results?.length && (
          <div className="text-hard whitespace-pre-wrap text-xs leading-relaxed">{error}</div>
        )}

        {!isRunning && tab === "results" && (
          <>
            {results === null && !error && (
              <div className="text-gray-500">
                Click <span className="text-easy font-semibold">Run</span> to execute your code
                <span className="text-gray-600 ml-1.5">(Ctrl+Enter)</span>
              </div>
            )}
            {results && results.length > 0 && (
              <div className="space-y-2.5">
                {allPassed && (
                  <div className="flex items-center gap-2 text-easy font-medium text-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    All test cases passed!
                  </div>
                )}
                {results.map((result, i) => {
                  const tc = testCases.find((t) => t.id === result.testCaseId);
                  return (
                    <div
                      key={result.testCaseId}
                      className={`p-3 rounded-lg border ${
                        result.passed
                          ? "border-easy/20 bg-easy/5"
                          : "border-hard/20 bg-hard/5"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-sm ${
                            result.passed ? "text-easy" : "text-hard"
                          }`}
                        >
                          {result.passed ? "✓" : "✗"}
                        </span>
                        <span className="text-foreground/80 text-xs">
                          Test {i + 1}
                        </span>
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider ${
                            result.passed ? "text-easy" : "text-hard"
                          }`}
                        >
                          {result.passed ? "PASS" : "FAIL"}
                        </span>
                      </div>
                      {tc && (
                        <div className="text-xs text-gray-400 mb-1 font-mono">
                          {tc.input}
                        </div>
                      )}
                      {!result.passed && (
                        <div className="text-xs space-y-0.5 mt-1.5">
                          <div className="text-gray-400">
                            Expected:{" "}
                            <span className="text-easy font-mono">
                              {JSON.stringify(result.expected)}
                            </span>
                          </div>
                          <div className="text-gray-400">
                            Got:{" "}
                            <span className="text-hard font-mono">
                              {result.error || JSON.stringify(result.actual)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {error && results && results.length > 0 && (
              <div className="mt-3 text-xs text-medium">{error}</div>
            )}
          </>
        )}

        {!isRunning && tab === "console" && (
          <>
            {consoleOutput.length === 0 && (
              <div className="text-gray-500">No console output</div>
            )}
            {consoleOutput.map((line, i) => (
              <div key={i} className="text-foreground/80 leading-relaxed">
                {line}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

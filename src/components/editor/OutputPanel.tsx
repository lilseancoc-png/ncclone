"use client";

import { useEffect, useRef, useState } from "react";
import { TestCase, TestResult, Language } from "@/data/types";
import type { ChatTurn } from "@/hooks/useCodeReview";
import MarkdownMessage from "@/components/editor/MarkdownMessage";

type Tab = "results" | "console" | "review";

interface OutputPanelProps {
  results: TestResult[] | null;
  testCases: TestCase[];
  consoleOutput: string[];
  error: string | null;
  isRunning: boolean;
  isPythonLoading?: boolean;
  executionMs?: number | null;
  language?: Language;
  reviewMessages: ChatTurn[];
  isReviewing: boolean;
  reviewError: string | null;
  onSendReviewMessage: (text: string) => void;
  onStopReview: () => void;
  onExplainFailure?: (
    testNumber: number,
    result: TestResult,
    testCase: TestCase | undefined,
  ) => void;
  onClearReview?: () => void;
  complexityReport: string;
  isComplexityLoading: boolean;
  complexityError: string | null;
  onDismissComplexity: () => void;
}

export default function OutputPanel({
  results,
  testCases,
  consoleOutput,
  error,
  isRunning,
  isPythonLoading,
  executionMs,
  language,
  reviewMessages,
  isReviewing,
  reviewError,
  onSendReviewMessage,
  onStopReview,
  onExplainFailure,
  onClearReview,
  complexityReport,
  isComplexityLoading,
  complexityError,
  onDismissComplexity,
}: OutputPanelProps) {
  const [tab, setTab] = useState<Tab>("results");
  const prevReviewingRef = useRef(false);
  const prevMsgCountRef = useRef(0);
  const [chatInput, setChatInput] = useState("");
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const chatInputRef = useRef<HTMLTextAreaElement | null>(null);
  const stickToBottomRef = useRef(true);

  // Auto-grow the chat textarea as the user types, up to max-h-32 (~128px).
  useEffect(() => {
    const el = chatInputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  }, [chatInput]);

  // Auto-switch to Review tab when a review starts.
  useEffect(() => {
    if (isReviewing && !prevReviewingRef.current) {
      setTab("review");
    }
    prevReviewingRef.current = isReviewing;
  }, [isReviewing]);

  // Auto-follow new tokens/messages, but only if the user is already pinned
  // near the bottom — otherwise leave their scroll position alone.
  useEffect(() => {
    if (tab !== "review") return;
    if (!stickToBottomRef.current) return;
    const el = chatScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [reviewMessages, tab]);

  const handleChatScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    stickToBottomRef.current = distance < 32;
  };

  // Auto-switch to review tab when a new chat message arrives.
  useEffect(() => {
    if (reviewMessages.length > prevMsgCountRef.current) {
      setTab("review");
    }
    prevMsgCountRef.current = reviewMessages.length;
  }, [reviewMessages.length]);

  const handleSubmitChat = () => {
    if (!chatInput.trim() || isReviewing) return;
    onSendReviewMessage(chatInput);
    setChatInput("");
  };

  // Auto-focus the chat input once the assistant finishes replying.
  useEffect(() => {
    if (!isReviewing && prevReviewingRef.current && reviewMessages.length > 0) {
      setTimeout(() => chatInputRef.current?.focus(), 50);
    }
  }, [isReviewing, reviewMessages.length]);

  const [showOnlyFailing, setShowOnlyFailing] = useState(false);

  const passedCount = results?.filter((r) => r.passed).length ?? 0;
  const totalCount = results?.length ?? 0;
  const allPassed = totalCount > 0 && passedCount === totalCount;
  const failedCount = totalCount - passedCount;

  const tabBtn = (active: boolean) =>
    `relative px-3 h-9 -mb-px text-xs font-medium transition-colors flex items-center gap-1.5 border-b-2 ${
      active
        ? "text-foreground border-violet-400"
        : "text-gray-500 hover:text-gray-300 border-transparent"
    }`;

  return (
    <div className="flex flex-col h-full bg-[#151525]">
      {/* Tabs */}
      <div className="flex items-end gap-2 px-4 border-t border-border border-b border-b-border/50">
        <button onClick={() => setTab("results")} className={tabBtn(tab === "results")}>
          Test Results
          {results && (
            <span
              className={`ml-0.5 tabular-nums ${allPassed ? "text-easy" : "text-hard"}`}
            >
              {passedCount}/{totalCount}
            </span>
          )}
        </button>
        <button onClick={() => setTab("console")} className={tabBtn(tab === "console")}>
          Console
          {consoleOutput.length > 0 && (
            <span className="ml-0.5 inline-flex items-center justify-center min-w-[1.25rem] h-4 px-1 rounded text-[10px] font-semibold bg-medium/20 text-medium tabular-nums">
              {consoleOutput.length}
            </span>
          )}
        </button>
        <button onClick={() => setTab("review")} className={tabBtn(tab === "review")}>
          AI Chat
          {isReviewing && (
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          )}
          {!isReviewing && reviewMessages.length > 0 && (
            <span className="ml-0.5 inline-flex items-center justify-center min-w-[1.25rem] h-4 px-1 rounded text-[10px] font-semibold bg-violet-500/20 text-violet-200 tabular-nums">
              {reviewMessages.filter((m) => m.role === "assistant").length}
            </span>
          )}
        </button>

        {tab === "review" &&
          reviewMessages.length > 0 &&
          !isReviewing &&
          onClearReview && (
            <button
              onClick={onClearReview}
              className="ml-auto mb-1.5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 hover:text-violet-200 border border-transparent hover:border-violet-500/30 rounded transition-colors"
              title="Clear the chat history"
            >
              Clear
            </button>
          )}
      </div>

      {/* Content */}
      <div
        ref={chatScrollRef}
        onScroll={handleChatScroll}
        className={`flex-1 min-h-0 overflow-auto px-4 py-3 text-sm font-mono ${
          tab === "review" ? "pb-0" : ""
        }`}
      >
        {isRunning && tab !== "review" && (
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

        {!isRunning && tab !== "review" && error && !results?.length && (
          <div className="text-hard whitespace-pre-wrap text-xs leading-relaxed">{error}</div>
        )}

        {!isRunning && tab === "results" && (
          <>
            {results === null && !error && (
              <div className="flex flex-col items-center justify-center text-center py-8 text-gray-500 font-sans">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-easy/10 border border-easy/20 mb-3">
                  <svg className="w-4 h-4 text-easy" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-400">
                  Press <span className="text-easy font-semibold">Run</span> to execute your code
                </div>
                <div className="text-[11px] text-gray-600 mt-1">
                  Shortcut: <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">Ctrl/⌘ + Enter</kbd>
                </div>
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
                    {executionMs != null && (
                      <span className="text-xs text-gray-400 font-normal ml-auto tabular-nums">
                        {executionMs < 1 ? "<1" : Math.round(executionMs)} ms
                      </span>
                    )}
                  </div>
                )}
                {!allPassed && executionMs != null && (
                  <div className="text-[10px] text-gray-500 tabular-nums">
                    Executed in {executionMs < 1 ? "<1" : Math.round(executionMs)} ms
                  </div>
                )}
                {allPassed &&
                  (isComplexityLoading || complexityReport || complexityError) && (
                    <ComplexityCard
                      report={complexityReport}
                      isLoading={isComplexityLoading}
                      error={complexityError}
                      onDismiss={onDismissComplexity}
                    />
                  )}

                {failedCount > 0 && failedCount < totalCount && (
                  <button
                    onClick={() => setShowOnlyFailing((v) => !v)}
                    className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 hover:text-foreground transition-colors"
                  >
                    {showOnlyFailing
                      ? `Show all ${totalCount} tests`
                      : `Show only ${failedCount} failing`}
                  </button>
                )}

                {results.map((result, i) => {
                  if (showOnlyFailing && result.passed) return null;
                  const tc = testCases.find((t) => t.id === result.testCaseId);
                  return (
                    <div
                      key={result.testCaseId}
                      className={`relative pl-3.5 pr-3 py-2.5 rounded-lg border overflow-hidden ${
                        result.passed
                          ? "border-easy/20 bg-easy/5"
                          : "border-hard/20 bg-hard/5"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-0 bottom-0 w-1 ${
                          result.passed ? "bg-easy/60" : "bg-hard/70"
                        }`}
                        aria-hidden="true"
                      />
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold ${
                            result.passed
                              ? "bg-easy/20 text-easy"
                              : "bg-hard/20 text-hard"
                          }`}
                          aria-hidden="true"
                        >
                          {result.passed ? "✓" : "✗"}
                        </span>
                        <span className="text-foreground/90 text-xs font-medium">
                          Test {i + 1}
                        </span>
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider ${
                            result.passed ? "text-easy" : "text-hard"
                          }`}
                        >
                          {result.passed ? "PASS" : "FAIL"}
                        </span>
                        {result.durationMs != null && (
                          <span className="text-[10px] text-gray-500 tabular-nums">
                            {result.durationMs < 0.1 ? "<0.1" : result.durationMs.toFixed(1)} ms
                          </span>
                        )}
                        {!result.passed && onExplainFailure && (
                          <button
                            onClick={() => onExplainFailure(i + 1, result, tc)}
                            disabled={isReviewing}
                            className="ml-auto inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-semibold text-violet-200 border border-violet-500/30 bg-violet-500/10 rounded hover:bg-violet-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            title="Ask the AI mentor why this test failed"
                          >
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Explain
                          </button>
                        )}
                      </div>
                      {tc && (
                        <div className="group text-xs text-gray-400 mb-1 font-mono flex items-start gap-1">
                          <span className="flex-1 break-all">{tc.input}</span>
                          <CopyBadge text={tc.input} />
                        </div>
                      )}
                      {!result.passed && (
                        <div className="text-xs space-y-0.5 mt-1.5">
                          <div className="group text-gray-400 flex items-start gap-1">
                            <span className="flex-1">
                              Expected:{" "}
                              <span className="text-easy font-mono">
                                {JSON.stringify(result.expected)}
                              </span>
                            </span>
                            <CopyBadge text={JSON.stringify(result.expected)} />
                          </div>
                          <div className="group text-gray-400 flex items-start gap-1">
                            <span className="flex-1">
                              Got:{" "}
                              <span className="text-hard font-mono">
                                {result.error || JSON.stringify(result.actual)}
                              </span>
                            </span>
                            <CopyBadge text={result.error || JSON.stringify(result.actual)} />
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
              <div className="flex flex-col items-center justify-center text-center py-8 text-gray-500 font-sans">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 mb-3">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-400">No console output yet</div>
                <div className="text-[11px] text-gray-600 mt-1">
                  Anything you <code className="font-mono text-gray-500">log</code> or <code className="font-mono text-gray-500">print</code> will appear here
                </div>
              </div>
            )}
            {consoleOutput.map((line, i) => (
              <div
                key={i}
                className={`leading-relaxed ${
                  line.startsWith("[error]")
                    ? "text-hard"
                    : line.startsWith("[warn]")
                      ? "text-medium"
                      : "text-foreground/80"
                }`}
              >
                {line}
              </div>
            ))}
          </>
        )}

        {tab === "review" && (
          <div className="space-y-3">
            {reviewMessages.length === 0 && !isReviewing && !reviewError && (
              <div className="flex flex-col items-center justify-center text-center py-8 text-gray-500 font-sans">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/30 mb-3">
                  <svg className="w-4 h-4 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div className="text-sm text-gray-400">
                  Press <span className="text-violet-300 font-semibold">Review</span> to chat with the AI mentor
                </div>
                <div className="text-[11px] text-gray-600 mt-1 max-w-xs">
                  Get hints on your approach, edge cases, and complexity — not full solutions.
                </div>
              </div>
            )}

            {reviewMessages.map((msg, i) => {
              const text = msg.display ?? msg.content;
              const isLast = i === reviewMessages.length - 1;
              const showCursor = isReviewing && isLast && msg.role === "assistant";
              if (msg.role === "user") {
                return (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] bg-violet-500/15 border border-violet-500/25 text-violet-100 rounded-lg px-3 py-2 text-[13px] font-sans whitespace-pre-wrap leading-relaxed">
                      {text}
                    </div>
                  </div>
                );
              }
              return (
                <div key={i} className="flex justify-start">
                  <div className="max-w-[92%] text-foreground/85 text-[13px] font-sans leading-relaxed space-y-1.5">
                    {text ? (
                      <MarkdownMessage text={text} />
                    ) : (
                      !showCursor && <span>…</span>
                    )}
                    {showCursor && (
                      <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-violet-400 animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })}

            {reviewError && (
              <div className="text-hard whitespace-pre-wrap text-xs leading-relaxed">
                {reviewError}
              </div>
            )}

          </div>
        )}
      </div>

      {tab === "review" && reviewMessages.length > 0 && (
        <div className="flex-shrink-0 border-t border-border/50 bg-[#0f0f1f] px-3 py-2">
          <div className="flex items-end gap-2">
            <textarea
              ref={chatInputRef}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitChat();
                }
              }}
              placeholder={
                isReviewing
                  ? "Mentor is replying..."
                  : "Ask a follow-up (Enter to send, Shift+Enter for newline)"
              }
              disabled={isReviewing}
              rows={1}
              className="flex-1 resize-none bg-[#151525] border border-border/50 rounded-md px-2.5 py-1.5 text-[13px] font-sans text-foreground placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 disabled:opacity-60 max-h-32 overflow-y-auto"
            />
            {isReviewing ? (
              <button
                onClick={onStopReview}
                className="px-3 py-1.5 text-xs font-semibold bg-hard/20 text-hard border border-hard/30 rounded-md hover:bg-hard/30 transition-colors"
              >
                Stop
              </button>
            ) : (
              <button
                onClick={handleSubmitChat}
                disabled={!chatInput.trim()}
                className="px-3 py-1.5 text-xs font-semibold bg-violet-500/20 text-violet-200 border border-violet-500/30 rounded-md hover:bg-violet-500/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send
              </button>
            )}
          </div>
          <div className="text-[10px] text-gray-600 mt-1 px-0.5">
            Your current code is automatically attached to each follow-up.
          </div>
        </div>
      )}
    </div>
  );
}

function CopyBadge({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch { /* clipboard not available */ }
      }}
      className="shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-gray-500 hover:text-violet-200 border border-transparent hover:border-violet-500/30 rounded transition-all"
      title="Copy to clipboard"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function parseComplexityReport(text: string): {
  time: string | null;
  timeNote: string | null;
  space: string | null;
  spaceNote: string | null;
  tail: string;
} {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  let time: string | null = null;
  let timeNote: string | null = null;
  let space: string | null = null;
  let spaceNote: string | null = null;
  const tailLines: string[] = [];

  for (const line of lines) {
    const t = /^time:\s*(.+)$/i.exec(line);
    const s = /^space:\s*(.+)$/i.exec(line);
    if (t) {
      time = t[1].trim();
      continue;
    }
    if (s) {
      space = s[1].trim();
      continue;
    }
    if (time && !timeNote && !space) {
      timeNote = line;
      continue;
    }
    if (space && !spaceNote) {
      spaceNote = line;
      continue;
    }
    tailLines.push(line);
  }

  return { time, timeNote, space, spaceNote, tail: tailLines.join(" ") };
}

function ComplexityCard({
  report,
  isLoading,
  error,
  onDismiss,
}: {
  report: string;
  isLoading: boolean;
  error: string | null;
  onDismiss: () => void;
}) {
  const parsed = report ? parseComplexityReport(report) : null;
  const hasParsed = parsed && (parsed.time || parsed.space);

  return (
    <div className="relative rounded-lg border border-violet-500/30 bg-violet-500/5 px-3 py-2.5">
      <div className="flex items-center gap-1.5 mb-1.5">
        <svg
          className={`w-3.5 h-3.5 text-violet-300 ${isLoading ? "animate-pulse" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-300">
          Complexity
        </span>
        {isLoading && (
          <span className="text-[10px] text-violet-300/70">analyzing…</span>
        )}
        <button
          onClick={onDismiss}
          className="ml-auto text-gray-500 hover:text-gray-300 text-xs leading-none"
          aria-label="Dismiss complexity card"
          title="Dismiss"
        >
          ×
        </button>
      </div>

      {error && !report && (
        <div className="text-xs text-hard">{error}</div>
      )}

      {!error && hasParsed && (
        <div className="space-y-1.5 text-xs font-sans">
          {parsed!.time && (
            <div>
              <span className="text-gray-400">Time: </span>
              <code className="text-easy font-mono">{parsed!.time}</code>
              {parsed!.timeNote && (
                <div className="text-[11px] text-foreground/70 mt-0.5">
                  {parsed!.timeNote}
                </div>
              )}
            </div>
          )}
          {parsed!.space && (
            <div>
              <span className="text-gray-400">Space: </span>
              <code className="text-medium font-mono">{parsed!.space}</code>
              {parsed!.spaceNote && (
                <div className="text-[11px] text-foreground/70 mt-0.5">
                  {parsed!.spaceNote}
                </div>
              )}
            </div>
          )}
          {parsed!.tail && (
            <div className="text-[11px] text-foreground/60">{parsed!.tail}</div>
          )}
        </div>
      )}

      {!error && !hasParsed && report && (
        <div className="text-xs text-foreground/80 whitespace-pre-wrap">
          {report}
        </div>
      )}

      {!error && !report && isLoading && (
        <div className="text-xs text-gray-500">Measuring your solution…</div>
      )}
    </div>
  );
}

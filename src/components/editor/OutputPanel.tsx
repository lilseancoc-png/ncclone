"use client";

import { useEffect, useRef, useState } from "react";
import { TestCase, TestResult } from "@/data/types";
import type { ChatTurn } from "@/hooks/useCodeReview";

type Tab = "results" | "console" | "review";

interface OutputPanelProps {
  results: TestResult[] | null;
  testCases: TestCase[];
  consoleOutput: string[];
  error: string | null;
  isRunning: boolean;
  isPythonLoading?: boolean;
  reviewMessages: ChatTurn[];
  isReviewing: boolean;
  reviewError: string | null;
  onSendReviewMessage: (text: string) => void;
  onStopReview: () => void;
}

export default function OutputPanel({
  results,
  testCases,
  consoleOutput,
  error,
  isRunning,
  isPythonLoading,
  reviewMessages,
  isReviewing,
  reviewError,
  onSendReviewMessage,
  onStopReview,
}: OutputPanelProps) {
  const [tab, setTab] = useState<Tab>("results");
  const prevReviewingRef = useRef(false);
  const prevMsgCountRef = useRef(0);
  const [chatInput, setChatInput] = useState("");
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const stickToBottomRef = useRef(true);

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

  const passedCount = results?.filter((r) => r.passed).length ?? 0;
  const totalCount = results?.length ?? 0;
  const allPassed = totalCount > 0 && passedCount === totalCount;

  return (
    <div className="flex flex-col h-full bg-[#151525]">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 py-1.5 border-t border-border border-b border-b-border/50">
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
        <button
          onClick={() => setTab("review")}
          className={`px-3 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1.5 ${
            tab === "review"
              ? "bg-card text-foreground"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          AI Chat
          {isReviewing && (
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          )}
          {!isReviewing && reviewMessages.length > 0 && (
            <span className="text-violet-300/80">
              {reviewMessages.filter((m) => m.role === "assistant").length}
            </span>
          )}
        </button>
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

        {tab === "review" && (
          <div className="space-y-3">
            {reviewMessages.length === 0 && !isReviewing && !reviewError && (
              <div className="text-gray-500">
                Click <span className="text-violet-300 font-semibold">Review</span> to start a chat with the AI mentor.
                <div className="text-gray-600 text-xs mt-1.5">
                  After the first response you can ask follow-up questions below. Hints, not solutions.
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
                  <div className="max-w-[92%] text-foreground/85 text-[13px] font-sans whitespace-pre-wrap leading-relaxed">
                    {text || (showCursor ? "" : "…")}
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
              className="flex-1 resize-none bg-[#151525] border border-border/50 rounded-md px-2.5 py-1.5 text-[13px] font-sans text-foreground placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 disabled:opacity-60 max-h-32"
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

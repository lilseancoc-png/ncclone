"use client";

import { useEffect, useRef, useState } from "react";
import { Language } from "@/data/types";
import LanguageSelector from "./LanguageSelector";
import {
  setInlineCompletionEnabled,
  subscribeInlineCompletionStatus,
  type InlineCompletionStatus,
} from "@/lib/inlineCompletions";

const AI_SUGGEST_KEY = "neetcode-ai-suggest";

interface EditorToolbarProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  onReview: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
  isReviewing: boolean;
  leetcodeUrl?: string;
}

export default function EditorToolbar({
  language,
  onLanguageChange,
  onRun,
  onSubmit,
  onReset,
  onReview,
  isRunning,
  isSubmitting,
  isReviewing,
  leetcodeUrl,
}: EditorToolbarProps) {
  const [isMac, setIsMac] = useState(false);
  const [aiSuggest, setAiSuggest] = useState(false);
  const [aiStatus, setAiStatus] = useState<InlineCompletionStatus>("idle");
  const [confirmReset, setConfirmReset] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
    try {
      const stored = localStorage.getItem(AI_SUGGEST_KEY);
      const initial = stored === "1";
      setAiSuggest(initial);
      setInlineCompletionEnabled(initial);
    } catch {
      // Storage may be unavailable; default off.
    }
    return subscribeInlineCompletionStatus((s) => setAiStatus(s));
  }, []);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const toggleAiSuggest = () => {
    setAiSuggest((prev) => {
      const next = !prev;
      setInlineCompletionEnabled(next);
      try {
        localStorage.setItem(AI_SUGGEST_KEY, next ? "1" : "0");
      } catch {}
      return next;
    });
  };

  const handleResetClick = () => {
    if (confirmReset) {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      setConfirmReset(false);
      onReset();
      return;
    }
    setConfirmReset(true);
    resetTimerRef.current = setTimeout(() => setConfirmReset(false), 3000);
  };

  const canRun = language === "javascript" || language === "python";
  const busy = isRunning || isSubmitting || isReviewing;

  // Shared button sizing for consistent heights across the toolbar.
  const btnBase =
    "inline-flex items-center justify-center gap-1.5 h-8 px-3 text-xs font-semibold rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex items-center justify-between gap-2 px-4 py-2 bg-[#1e1e2e] border-b border-border/50">
      <div className="flex items-center gap-2">
        <LanguageSelector language={language} onChange={onLanguageChange} />
        <button
          onClick={toggleAiSuggest}
          title={
            aiSuggest
              ? aiStatus === "loading"
                ? "AI is generating a suggestion… (Tab to accept)"
                : "AI autocomplete is ON. Type and press Tab to accept."
              : "Turn on AI autocomplete while you type."
          }
          aria-pressed={aiSuggest}
          className={`hidden sm:inline-flex items-center gap-1.5 h-8 px-2.5 text-[11px] font-medium rounded-md border transition-colors ${
            aiSuggest
              ? "bg-violet-500/15 text-violet-200 border-violet-500/40 hover:bg-violet-500/25"
              : "bg-white/5 text-gray-500 border-white/10 hover:text-foreground hover:bg-white/10"
          }`}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          AI autocomplete
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full ${
              aiSuggest
                ? aiStatus === "loading"
                  ? "bg-violet-300 animate-pulse"
                  : "bg-violet-300"
                : "bg-gray-600"
            }`}
          />
        </button>
      </div>
      <div className="flex items-center gap-2">
        {canRun && (
          <kbd className="text-[10px] text-gray-500 mr-1 hidden sm:inline px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono">
            {isMac ? "⌘" : "Ctrl"}+Enter
          </kbd>
        )}
        <button
          onClick={handleResetClick}
          aria-label={confirmReset ? "Confirm reset" : "Reset to starter code"}
          title={
            confirmReset
              ? "Click again to discard your code and reset"
              : "Reset to starter code"
          }
          className={`${btnBase} ${
            confirmReset
              ? "bg-hard/15 text-hard border-hard/40 hover:bg-hard/25"
              : "bg-white/5 text-gray-400 border-white/10 hover:text-foreground hover:bg-white/10"
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M5.07 9A7.002 7.002 0 0119 12M18.93 15A7.002 7.002 0 015 12" />
          </svg>
          {confirmReset ? "Click to confirm" : "Reset"}
        </button>
        {canRun ? (
          <>
            <button
              onClick={onRun}
              disabled={busy}
              className={`${btnBase} bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-foreground`}
            >
              {isRunning ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Running...
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Run
                </>
              )}
            </button>
            <button
              onClick={onReview}
              disabled={busy}
              title="Have an AI mentor review your code (hints, not solutions)"
              className={`${btnBase} bg-violet-500/15 text-violet-300 border-violet-500/30 hover:bg-violet-500/25`}
            >
              {isReviewing ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Reviewing...
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624L16.5 21.75l-.398-1.126a2.25 2.25 0 00-1.4-1.4L13.5 18.75l1.202-.398a2.25 2.25 0 001.4-1.4l.398-1.126.398 1.126a2.25 2.25 0 001.4 1.4l1.202.398-1.202.398a2.25 2.25 0 00-1.4 1.4z" />
                  </svg>
                  Review
                </>
              )}
            </button>
            <button
              onClick={onSubmit}
              disabled={busy}
              className={`${btnBase} px-4 bg-easy/20 text-easy border-easy/30 hover:bg-easy/30`}
            >
              {isSubmitting ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Submit
                </>
              )}
            </button>
          </>
        ) : (
          <>
            <span className="text-[10px] text-gray-500">
              {language === "java" ? "Java" : "C++"} runs on LeetCode only
            </span>
            {leetcodeUrl && (
              <a
                href={leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnBase} px-4 bg-medium/20 text-medium border-medium/30 hover:bg-medium/30`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Run on LeetCode
              </a>
            )}
            <button
              onClick={onReview}
              disabled={busy}
              title="Have an AI mentor review your code (hints, not solutions)"
              className={`${btnBase} bg-violet-500/15 text-violet-300 border-violet-500/30 hover:bg-violet-500/25`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Review
            </button>
          </>
        )}
      </div>
    </div>
  );
}

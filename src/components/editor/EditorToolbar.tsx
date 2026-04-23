"use client";

import { useState, useEffect } from "react";
import { Language } from "@/data/types";
import LanguageSelector from "./LanguageSelector";

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
}: EditorToolbarProps) {
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  const busy = isRunning || isSubmitting || isReviewing;

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e2e] border-b border-border/50">
      <LanguageSelector language={language} onChange={onLanguageChange} />
      <div className="flex items-center gap-2">
        <kbd className="text-[10px] text-gray-600 mr-1 hidden sm:inline px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono">
          {isMac ? "\u2318" : "Ctrl"}+Enter
        </kbd>
        <button
          onClick={() => {
            if (window.confirm("Reset to starter code? Your current code will be lost.")) {
              onReset();
            }
          }}
          className="px-3 py-1.5 text-xs text-gray-400 hover:text-foreground border border-border/50 rounded-md hover:bg-card-hover transition-colors"
        >
          Reset
        </button>
        <button
          onClick={onRun}
          disabled={busy}
          className="px-3 py-1.5 text-xs font-semibold bg-white/5 text-gray-300 border border-white/10 rounded-md hover:bg-white/10 hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          {isRunning ? (
            <>
              <svg
                className="w-3.5 h-3.5 animate-spin"
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
          className="px-3 py-1.5 text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/30 rounded-md hover:bg-violet-500/25 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          {isReviewing ? (
            <>
              <svg
                className="w-3.5 h-3.5 animate-spin"
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
              Reviewing...
            </>
          ) : (
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
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.624L16.5 21.75l-.398-1.126a2.25 2.25 0 00-1.4-1.4L13.5 18.75l1.202-.398a2.25 2.25 0 001.4-1.4l.398-1.126.398 1.126a2.25 2.25 0 001.4 1.4l1.202.398-1.202.398a2.25 2.25 0 00-1.4 1.4z"
                />
              </svg>
              Review
            </>
          )}
        </button>
        <button
          onClick={onSubmit}
          disabled={busy}
          className="px-4 py-1.5 text-xs font-semibold bg-easy/20 text-easy border border-easy/30 rounded-md hover:bg-easy/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          {isSubmitting ? (
            <>
              <svg
                className="w-3.5 h-3.5 animate-spin"
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
              Submitting...
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Submit
            </>
          )}
        </button>
      </div>
    </div>
  );
}

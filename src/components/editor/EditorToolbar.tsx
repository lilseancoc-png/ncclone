"use client";

import { useState, useEffect } from "react";
import { Language } from "@/data/types";
import LanguageSelector from "./LanguageSelector";

interface EditorToolbarProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
}

export default function EditorToolbar({
  language,
  onLanguageChange,
  onRun,
  onReset,
  isRunning,
}: EditorToolbarProps) {
  const [isMac, setIsMac] = useState(false);
  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e2e] border-b border-border/50">
      <LanguageSelector language={language} onChange={onLanguageChange} />
      <div className="flex items-center gap-2">
        <kbd className="text-[10px] text-gray-600 mr-1 hidden sm:inline px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono">
          {isMac ? "\u2318" : "Ctrl"}+Enter
        </kbd>
        <button
          onClick={onReset}
          className="px-3 py-1.5 text-xs text-gray-400 hover:text-foreground border border-border/50 rounded-md hover:bg-card-hover transition-colors"
        >
          Reset
        </button>
        <button
          onClick={onRun}
          disabled={isRunning}
          className="px-4 py-1.5 text-xs font-semibold bg-easy/20 text-easy border border-easy/30 rounded-md hover:bg-easy/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
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
      </div>
    </div>
  );
}

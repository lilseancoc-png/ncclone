"use client";

import { useEffect, useRef } from "react";

interface ShortcutsModalProps {
  open: boolean;
  onClose: () => void;
}

interface Shortcut {
  keys: string[];
  desc: string;
}

const SECTIONS: { title: string; items: Shortcut[] }[] = [
  {
    title: "Run & save",
    items: [
      { keys: ["Ctrl/Cmd", "Enter"], desc: "Run code" },
      { keys: ["Ctrl/Cmd", "S"], desc: "Save (auto-saves)" },
    ],
  },
  {
    title: "Editing",
    items: [
      { keys: ["Ctrl/Cmd", "/"], desc: "Toggle comment" },
      { keys: ["Ctrl/Cmd", "D"], desc: "Select next occurrence" },
      { keys: ["Ctrl/Cmd", "Shift", "K"], desc: "Delete line" },
      { keys: ["Alt", "Up/Down"], desc: "Move line up/down" },
    ],
  },
  {
    title: "Suggestions",
    items: [
      { keys: ["Tab"], desc: "Accept suggestion / indent" },
      { keys: ["Esc"], desc: "Dismiss suggestions" },
    ],
  },
  {
    title: "Help",
    items: [{ keys: ["?"], desc: "Show this modal" }],
  },
];

export default function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-toast-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div
        ref={dialogRef}
        className="bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-violet-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2M5 12a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2v-2a2 2 0 00-2-2" />
            </svg>
            <h2 id="shortcuts-title" className="text-sm font-semibold text-foreground">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close shortcuts"
            className="text-gray-400 hover:text-foreground transition-colors p-1 -m-1 rounded hover:bg-white/5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-4 max-h-[70vh] overflow-y-auto">
          {SECTIONS.map((section, si) => (
            <div key={section.title} className={si === 0 ? "" : "mt-4"}>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 py-1.5 px-2 -mx-2 rounded hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm text-gray-300">{s.desc}</span>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {s.keys.map((k, j) => (
                        <span key={j} className="flex items-center">
                          <kbd className="px-1.5 py-0.5 text-[11px] font-mono rounded bg-white/5 border border-white/10 text-gray-300">
                            {k}
                          </kbd>
                          {j < s.keys.length - 1 && (
                            <span className="text-gray-600 text-[10px] mx-0.5">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-2.5 border-t border-white/10 bg-[#15152a] flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            Press{" "}
            <kbd className="px-1 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-gray-400">
              ?
            </kbd>{" "}
            anytime to open this
          </span>
          <span className="text-[11px] text-gray-500">
            <kbd className="px-1 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-gray-400">
              Esc
            </kbd>{" "}
            to close
          </span>
        </div>
      </div>
    </div>
  );
}

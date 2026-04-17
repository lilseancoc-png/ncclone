"use client";

import { useEffect } from "react";

interface ShortcutsModalProps {
  open: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { keys: ["Ctrl/Cmd", "Enter"], desc: "Run code" },
  { keys: ["Ctrl/Cmd", "S"], desc: "Save (auto-saves)" },
  { keys: ["Ctrl/Cmd", "/"], desc: "Toggle comment" },
  { keys: ["Ctrl/Cmd", "D"], desc: "Select next occurrence" },
  { keys: ["Ctrl/Cmd", "Shift", "K"], desc: "Delete line" },
  { keys: ["Alt", "Up/Down"], desc: "Move line up/down" },
  { keys: ["Tab"], desc: "Accept suggestion / indent" },
  { keys: ["Esc"], desc: "Dismiss suggestions" },
  { keys: ["?"], desc: "Show this modal" },
];

export default function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
          <h2 className="text-sm font-semibold text-foreground">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-3 space-y-2">
          {SHORTCUTS.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-1">
              <span className="text-sm text-gray-300">{s.desc}</span>
              <div className="flex items-center gap-1">
                {s.keys.map((k, j) => (
                  <span key={j}>
                    <kbd className="px-1.5 py-0.5 text-[11px] font-mono rounded bg-white/5 border border-white/10 text-gray-400">
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
    </div>
  );
}

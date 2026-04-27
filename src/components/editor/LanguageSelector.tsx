"use client";

import { useEffect, useRef, useState } from "react";
import { Language } from "@/data/types";

const LANGUAGE_LABELS: Record<Language, string> = {
  javascript: "JavaScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
};

const LANGUAGE_ACCENT: Record<Language, string> = {
  javascript: "bg-yellow-400",
  python: "bg-blue-400",
  java: "bg-orange-400",
  cpp: "bg-sky-400",
};

interface LanguageSelectorProps {
  language: Language;
  onChange: (language: Language) => void;
  availableLanguages?: Language[];
}

export default function LanguageSelector({
  language,
  onChange,
  availableLanguages = ["javascript", "python", "java", "cpp"],
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-2 h-8 pl-2.5 pr-2 bg-[#151525] border border-border/50 rounded-md text-xs text-foreground hover:border-gray-500/60 focus:outline-none focus:ring-1 focus:ring-easy/50 transition-colors"
      >
        <span
          className={`block w-1.5 h-1.5 rounded-full ${LANGUAGE_ACCENT[language]}`}
          aria-hidden="true"
        />
        <span className="font-medium">{LANGUAGE_LABELS[language]}</span>
        <svg
          className={`w-3 h-3 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute left-0 top-full mt-1 min-w-[10rem] bg-[#1a1a2e] border border-white/10 rounded-md shadow-xl py-1 z-30"
        >
          {availableLanguages.map((lang) => {
            const selected = lang === language;
            return (
              <li key={lang} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(lang);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-left transition-colors ${
                    selected
                      ? "bg-white/5 text-foreground"
                      : "text-gray-300 hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`block w-1.5 h-1.5 rounded-full ${LANGUAGE_ACCENT[lang]}`}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{LANGUAGE_LABELS[lang]}</span>
                  {selected && (
                    <svg
                      className="w-3 h-3 text-easy"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

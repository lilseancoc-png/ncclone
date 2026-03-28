"use client";

import { Language } from "@/data/types";

const LANGUAGE_LABELS: Record<Language, string> = {
  javascript: "JavaScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
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
  return (
    <select
      value={language}
      onChange={(e) => onChange(e.target.value as Language)}
      className="bg-[#151525] border border-border/50 rounded-md px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-easy/50 cursor-pointer appearance-none"
    >
      {availableLanguages.map((lang) => (
        <option key={lang} value={lang}>
          {LANGUAGE_LABELS[lang]}
        </option>
      ))}
    </select>
  );
}

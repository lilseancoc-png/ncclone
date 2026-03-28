"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Language } from "@/data/types";

const STORAGE_KEY = "neetcode-code-drafts";

interface AllDrafts {
  [problemSlug: string]: {
    [lang: string]: string;
  };
}

function loadDrafts(): AllDrafts {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveDrafts(drafts: AllDrafts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  } catch {}
}

export function useCodeDrafts(
  problemSlug: string,
  language: Language,
  starterCode: string
) {
  const [code, setCodeState] = useState(starterCode);
  const [mounted, setMounted] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const drafts = loadDrafts();
    const saved = drafts[problemSlug]?.[language];
    if (saved !== undefined) {
      setCodeState(saved);
    } else {
      setCodeState(starterCode);
    }
    setMounted(true);
  }, [problemSlug, language, starterCode]);

  const setCode = useCallback(
    (newCode: string) => {
      setCodeState(newCode);
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        const drafts = loadDrafts();
        if (!drafts[problemSlug]) drafts[problemSlug] = {};
        drafts[problemSlug][language] = newCode;
        saveDrafts(drafts);
      }, 500);
    },
    [problemSlug, language]
  );

  const reset = useCallback(() => {
    setCodeState(starterCode);
    const drafts = loadDrafts();
    if (drafts[problemSlug]) {
      delete drafts[problemSlug][language];
      saveDrafts(drafts);
    }
  }, [problemSlug, language, starterCode]);

  return { code: mounted ? code : starterCode, setCode, reset, mounted };
}

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const STORAGE_KEY = "neetcode-progress";

interface ProgressContextType {
  isCompleted: (slug: string) => boolean;
  toggleCompleted: (slug: string) => void;
  completedCount: number;
  completedInCategory: (slugs: string[]) => number;
  mounted: boolean;
}

const ProgressContext = createContext<ProgressContextType>({
  isCompleted: () => false,
  toggleCompleted: () => {},
  completedCount: 0,
  completedInCategory: () => 0,
  mounted: false,
});

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompleted(JSON.parse(stored));
      }
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    }
  }, [completed, mounted]);

  const isCompleted = useCallback(
    (slug: string) => !!completed[slug],
    [completed]
  );

  const toggleCompleted = useCallback((slug: string) => {
    setCompleted((prev) => {
      const next = { ...prev };
      if (next[slug]) {
        delete next[slug];
      } else {
        next[slug] = true;
      }
      return next;
    });
  }, []);

  const completedCount = Object.keys(completed).length;

  const completedInCategory = useCallback(
    (slugs: string[]) => slugs.filter((s) => completed[s]).length,
    [completed]
  );

  return (
    <ProgressContext.Provider
      value={{
        isCompleted,
        toggleCompleted,
        completedCount,
        completedInCategory,
        mounted,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}

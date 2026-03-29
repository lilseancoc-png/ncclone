"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from "./useAuth";

const STORAGE_KEY = "neetcode-progress";

function getStorageKey(userId: string | null): string {
  return userId ? `${STORAGE_KEY}-${userId}` : STORAGE_KEY;
}

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
  const { user, mounted: authMounted } = useAuth();
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  // Load progress when auth state resolves or user changes
  useEffect(() => {
    if (!authMounted) return;
    try {
      const key = getStorageKey(user?.id ?? null);
      const stored = localStorage.getItem(key);
      if (stored) {
        setCompleted(JSON.parse(stored));
      } else if (user) {
        // New user — migrate guest progress if any
        const guestData = localStorage.getItem(STORAGE_KEY);
        if (guestData) {
          const parsed = JSON.parse(guestData);
          setCompleted(parsed);
          localStorage.setItem(getStorageKey(user.id), guestData);
        } else {
          setCompleted({});
        }
      } else {
        setCompleted({});
      }
    } catch {
      setCompleted({});
    }
    setMounted(true);
  }, [authMounted, user]);

  // Persist progress
  useEffect(() => {
    if (mounted && authMounted) {
      const key = getStorageKey(user?.id ?? null);
      localStorage.setItem(key, JSON.stringify(completed));
    }
  }, [completed, mounted, authMounted, user]);

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

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { useAuth } from "./useAuth";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const STORAGE_KEY = "neetcode-progress";

function localKey(userId: string | null): string {
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
  const syncingRef = useRef(false);

  // -----------------------------------------------------------------------
  // Load progress
  // -----------------------------------------------------------------------
  useEffect(() => {
    if (!authMounted) return;

    async function load() {
      // 1. Always start from localStorage (fast)
      const key = localKey(user?.id ?? null);
      let localData: Record<string, boolean> = {};
      try {
        const raw = localStorage.getItem(key);
        if (raw) localData = JSON.parse(raw);
      } catch {}

      // 2. If user is logged in and Supabase is configured, fetch from DB
      if (user && isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from("progress")
            .select("problem_slug")
            .eq("user_id", user.id);

          if (!error && data) {
            const dbData: Record<string, boolean> = {};
            data.forEach((row: { problem_slug: string }) => {
              dbData[row.problem_slug] = true;
            });

            // Merge: union of local + DB (keep everything)
            const merged = { ...localData, ...dbData };

            // Find slugs that are in local but not DB → push them up
            const localOnly = Object.keys(localData).filter((s) => !dbData[s]);
            if (localOnly.length > 0) {
              const rows = localOnly.map((slug) => ({
                user_id: user.id,
                problem_slug: slug,
              }));
              await supabase.from("progress").upsert(rows, {
                onConflict: "user_id,problem_slug",
              });
            }

            setCompleted(merged);
            localStorage.setItem(key, JSON.stringify(merged));
            setMounted(true);
            return;
          }
        } catch {
          // Fall through to local data
        }
      }

      // 3. Migrate guest progress for new users
      if (user && Object.keys(localData).length === 0) {
        try {
          const guestRaw = localStorage.getItem(STORAGE_KEY);
          if (guestRaw) {
            localData = JSON.parse(guestRaw);
            localStorage.setItem(key, guestRaw);

            // Also push guest data to Supabase
            if (isSupabaseConfigured() && Object.keys(localData).length > 0) {
              const rows = Object.keys(localData).map((slug) => ({
                user_id: user.id,
                problem_slug: slug,
              }));
              await supabase.from("progress").upsert(rows, {
                onConflict: "user_id,problem_slug",
              });
            }
          }
        } catch {}
      }

      setCompleted(localData);
      setMounted(true);
    }

    load();
  }, [authMounted, user]);

  // -----------------------------------------------------------------------
  // Persist progress to localStorage (always) + Supabase (when available)
  // -----------------------------------------------------------------------
  useEffect(() => {
    if (!mounted || !authMounted) return;
    const key = localKey(user?.id ?? null);
    localStorage.setItem(key, JSON.stringify(completed));
  }, [completed, mounted, authMounted, user]);

  // -----------------------------------------------------------------------
  // Toggle
  // -----------------------------------------------------------------------
  const toggleCompleted = useCallback(
    (slug: string) => {
      setCompleted((prev) => {
        const wasCompleted = !!prev[slug];
        const next = { ...prev };

        if (wasCompleted) {
          delete next[slug];
        } else {
          next[slug] = true;
        }

        // Sync to Supabase in background
        if (user && isSupabaseConfigured() && !syncingRef.current) {
          syncingRef.current = true;
          (async () => {
            try {
              if (wasCompleted) {
                await supabase
                  .from("progress")
                  .delete()
                  .eq("user_id", user.id)
                  .eq("problem_slug", slug);
              } else {
                await supabase.from("progress").upsert(
                  { user_id: user.id, problem_slug: slug },
                  { onConflict: "user_id,problem_slug" }
                );
              }
            } catch {
              // Silently fail — localStorage is the source of truth
            } finally {
              syncingRef.current = false;
            }
          })();
        }

        return next;
      });
    },
    [user]
  );

  const isCompleted = useCallback(
    (slug: string) => !!completed[slug],
    [completed]
  );

  const completedCount = Object.keys(completed).length;

  const completedInCategory = useCallback(
    (slugs: string[]) => slugs.filter((s) => completed[s]).length,
    [completed]
  );

  return (
    <ProgressContext.Provider
      value={{ isCompleted, toggleCompleted, completedCount, completedInCategory, mounted }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Language, Problem } from "@/data/types";
import {
  HINT_SYSTEM_PROMPT,
  buildHintMessage,
  streamChat,
} from "@/lib/codeReview";
import { createStreamBuffer } from "@/lib/streamBuffer";
import type { PuterChatMessage } from "@/types/puter";

export const MAX_HINT_LEVEL = 5;

export function useAdaptiveHints(problem: Problem) {
  const [hints, setHints] = useState<string[]>([]);
  const [streamingHint, setStreamingHint] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  // Reset whenever the problem changes. Using the "derive state from prop
  // change" pattern — guarded by a ref so it runs at most once per slug change.
  const prevSlugRef = useRef(problem.slug);
  if (prevSlugRef.current !== problem.slug) {
    prevSlugRef.current = problem.slug;
    abortRef.current?.abort();
    abortRef.current = null;
    setHints([]);
    setStreamingHint("");
    setError(null);
    setIsLoading(false);
    setUsedFallback(false);
  }

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setHints([]);
    setStreamingHint("");
    setError(null);
    setIsLoading(false);
    setUsedFallback(false);
  }, []);

  const revealNext = useCallback(
    async (language: Language, code: string) => {
      if (isLoading) return;
      if (hints.length >= MAX_HINT_LEVEL) return;

      const level = hints.length + 1;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setStreamingHint("");
      setError(null);
      setIsLoading(true);

      const buf = createStreamBuffer((chunk) => {
        setStreamingHint((prev) => prev + chunk);
      });

      const messages: PuterChatMessage[] = [
        { role: "system", content: HINT_SYSTEM_PROMPT },
        {
          role: "user",
          content: buildHintMessage({
            problem,
            language,
            code,
            level,
            previousHints: hints,
          }),
        },
      ];

      try {
        const full = await streamChat(
          messages,
          (delta) => {
            if (controller.signal.aborted) return;
            buf.push(delta);
          },
          controller.signal,
        );
        buf.flush();
        const text = full.trim();
        if (text) {
          setHints((prev) => [...prev, text]);
        }
        setStreamingHint("");
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") {
          buf.cancel();
          setStreamingHint("");
          if (abortRef.current === controller) {
            abortRef.current = null;
            setIsLoading(false);
          }
          return;
        }
        buf.cancel();
        setStreamingHint("");

        // Fall back to the static hint if one exists at this level.
        const fallback = problem.hints?.[level - 1];
        if (fallback) {
          setHints((prev) => [...prev, fallback]);
          setUsedFallback(true);
        } else {
          setError(err instanceof Error ? err.message : "Hint unavailable");
        }
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
          setIsLoading(false);
        }
      }
    },
    [hints, isLoading, problem],
  );

  return {
    hints,
    streamingHint,
    isLoading,
    error,
    usedFallback,
    maxLevel: MAX_HINT_LEVEL,
    revealNext,
    reset,
  };
}

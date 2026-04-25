"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Problem } from "@/data/types";
import {
  APPROACH_CHECK_SYSTEM_PROMPT,
  buildApproachCheckMessage,
  streamChat,
} from "@/lib/codeReview";
import { createStreamBuffer } from "@/lib/streamBuffer";
import type { PuterChatMessage } from "@/types/puter";

export function useApproachCheck(problem: Problem) {
  const [verdict, setVerdict] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const prevSlugRef = useRef(problem.slug);
  if (prevSlugRef.current !== problem.slug) {
    prevSlugRef.current = problem.slug;
    abortRef.current?.abort();
    abortRef.current = null;
    setVerdict("");
    setError(null);
    setIsLoading(false);
  }

  const check = useCallback(
    async (plan: string) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setVerdict("");
      setError(null);
      setIsLoading(true);

      const buf = createStreamBuffer((chunk) => {
        setVerdict((prev) => prev + chunk);
      });

      const messages: PuterChatMessage[] = [
        { role: "system", content: APPROACH_CHECK_SYSTEM_PROMPT },
        { role: "user", content: buildApproachCheckMessage({ problem, plan }) },
      ];

      try {
        await streamChat(
          messages,
          (delta) => {
            if (controller.signal.aborted) return;
            buf.push(delta);
          },
          controller.signal,
        );
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") {
          buf.cancel();
          if (abortRef.current === controller) {
            abortRef.current = null;
            setIsLoading(false);
          }
          return;
        }
        buf.cancel();
        setError(err instanceof Error ? err.message : "Approach check unavailable");
        setVerdict("");
      } finally {
        buf.flush();
        if (abortRef.current === controller) {
          abortRef.current = null;
          setIsLoading(false);
        }
      }
    },
    [problem],
  );

  const clear = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setVerdict("");
    setError(null);
    setIsLoading(false);
  }, []);

  return { verdict, isLoading, error, check, clear };
}

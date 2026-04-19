"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Language, Problem } from "@/data/types";
import {
  COMPLEXITY_SYSTEM_PROMPT,
  buildComplexityMessage,
  streamChat,
} from "@/lib/codeReview";
import { createStreamBuffer } from "@/lib/streamBuffer";
import type { PuterChatMessage } from "@/types/puter";

export function useComplexityReport() {
  const [report, setReport] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const request = useCallback(
    async (problem: Problem, language: Language, code: string) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setReport("");
      setError(null);
      setIsLoading(true);

      const buf = createStreamBuffer((chunk) => {
        setReport((prev) => prev + chunk);
      });

      const messages: PuterChatMessage[] = [
        { role: "system", content: COMPLEXITY_SYSTEM_PROMPT },
        { role: "user", content: buildComplexityMessage({ problem, language, code }) },
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
          buf.flush();
          if (abortRef.current === controller) {
            abortRef.current = null;
            setIsLoading(false);
          }
          return;
        }
        buf.cancel();
        setError(err instanceof Error ? err.message : "Complexity analysis failed");
        setReport("");
      } finally {
        buf.flush();
        if (abortRef.current === controller) {
          abortRef.current = null;
          setIsLoading(false);
        }
      }
    },
    [],
  );

  const clear = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setReport("");
    setError(null);
    setIsLoading(false);
  }, []);

  return { report, isLoading, error, request, clear };
}

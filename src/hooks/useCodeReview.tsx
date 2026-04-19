"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Language, Problem, TestCase, TestResult } from "@/data/types";
import { buildReviewPrompt, streamReview } from "@/lib/codeReview";

interface RunInput {
  problem: Problem;
  language: Language;
  code: string;
  failingResults: TestResult[];
  testCases: TestCase[];
}

export function useCodeReview() {
  const [review, setReview] = useState<string | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const run = useCallback(async (input: RunInput) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsReviewing(true);
    setError(null);
    setReview("");

    try {
      const prompt = buildReviewPrompt(input);
      await streamReview(
        prompt,
        (delta) => {
          if (controller.signal.aborted) return;
          setReview((prev) => (prev ?? "") + delta);
        },
        controller.signal,
      );
    } catch (err) {
      if ((err as { name?: string })?.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Review failed");
      setReview(null);
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        setIsReviewing(false);
      }
    }
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setReview(null);
    setError(null);
    setIsReviewing(false);
  }, []);

  return { review, isReviewing, error, run, clear };
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Language, Problem, TestCase, TestResult } from "@/data/types";
import {
  SYSTEM_PROMPT,
  buildFailureExplanationMessage,
  buildFollowUpMessage,
  buildInitialReviewMessage,
  streamChat,
} from "@/lib/codeReview";
import { createStreamBuffer } from "@/lib/streamBuffer";
import type { PuterChatMessage } from "@/types/puter";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
  display?: string;
}

interface StartInput {
  problem: Problem;
  language: Language;
  code: string;
  failingResults: TestResult[];
  testCases: TestCase[];
}

const MAX_HISTORY = 16;

export function useCodeReview() {
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const stream = useCallback(async (history: ChatTurn[]) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsReviewing(true);
    setError(null);
    setMessages([...history, { role: "assistant", content: "" }]);

    const appendToLast = (chunk: string) => {
      setMessages((prev) => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        if (last.role !== "assistant") return prev;
        const next = prev.slice(0, -1);
        next.push({ ...last, content: last.content + chunk });
        return next;
      });
    };

    const buf = createStreamBuffer(appendToLast);

    const trimmed = history.slice(-MAX_HISTORY);
    const apiMessages: PuterChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...trimmed.map((m) => ({ role: m.role, content: m.content })),
    ];

    try {
      await streamChat(
        apiMessages,
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
          setIsReviewing(false);
        }
        return;
      }
      buf.cancel();
      setError(err instanceof Error ? err.message : "Review failed");
      setMessages((prev) => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        if (last.role === "assistant" && last.content === "") {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      buf.flush();
      if (abortRef.current === controller) {
        abortRef.current = null;
        setIsReviewing(false);
      }
    }
  }, []);

  const start = useCallback(
    (input: StartInput) => {
      const initial = buildInitialReviewMessage(input);
      void stream([
        {
          role: "user",
          content: initial,
          display: "Review my solution.",
        },
      ]);
    },
    [stream],
  );

  const send = useCallback(
    (text: string, language: Language, currentCode: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const userMsg: ChatTurn = {
        role: "user",
        content: buildFollowUpMessage(trimmed, language, currentCode),
        display: trimmed,
      };
      void stream([...messages, userMsg]);
    },
    [messages, stream],
  );

  const explainFailure = useCallback(
    (
      testNumber: number,
      result: TestResult,
      testCase: TestCase | undefined,
      language: Language,
      currentCode: string,
    ) => {
      const userMsg: ChatTurn = {
        role: "user",
        content: buildFailureExplanationMessage({
          testNumber,
          result,
          testCase,
          language,
          code: currentCode,
        }),
        display: `Explain why test ${testNumber} failed.`,
      };
      void stream([...messages, userMsg]);
    },
    [messages, stream],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsReviewing(false);
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setError(null);
    setIsReviewing(false);
  }, []);

  return { messages, isReviewing, error, start, send, explainFailure, stop, clear };
}

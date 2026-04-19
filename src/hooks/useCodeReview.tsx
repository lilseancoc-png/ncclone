"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Language, Problem, TestCase, TestResult } from "@/data/types";
import {
  SYSTEM_PROMPT,
  buildFollowUpMessage,
  buildInitialReviewMessage,
  streamChat,
} from "@/lib/codeReview";
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

// Typewriter pacing: drain whatever is buffered in ~TARGET_DRAIN_MS so
// short bursts feel deliberate and big bursts don't fall miles behind.
const TARGET_DRAIN_MS = 280;
const MIN_RATE_CPS = 80;
const MAX_RATE_CPS = 1800;

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

    const buffer = { value: "" };
    let rafId: number | null = null;
    let lastFrame = performance.now();

    const appendToLast = (chunk: string) => {
      if (!chunk) return;
      setMessages((prev) => {
        if (prev.length === 0) return prev;
        const last = prev[prev.length - 1];
        if (last.role !== "assistant") return prev;
        const next = prev.slice(0, -1);
        next.push({ ...last, content: last.content + chunk });
        return next;
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(now - lastFrame, 100);
      lastFrame = now;
      const len = buffer.value.length;
      if (len === 0) {
        rafId = null;
        return;
      }
      const adaptiveRate = (len / TARGET_DRAIN_MS) * 1000;
      const rate = Math.max(MIN_RATE_CPS, Math.min(MAX_RATE_CPS, adaptiveRate));
      const want = Math.max(1, Math.floor((dt / 1000) * rate));
      const slice = buffer.value.slice(0, want);
      buffer.value = buffer.value.slice(want);
      appendToLast(slice);
      rafId = requestAnimationFrame(tick);
    };

    const cancelTick = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const flushBuffer = () => {
      cancelTick();
      if (buffer.value.length > 0) {
        const remaining = buffer.value;
        buffer.value = "";
        appendToLast(remaining);
      }
    };

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
          buffer.value += delta;
          if (rafId === null) {
            lastFrame = performance.now();
            rafId = requestAnimationFrame(tick);
          }
        },
        controller.signal,
      );
    } catch (err) {
      if ((err as { name?: string })?.name === "AbortError") {
        flushBuffer();
        if (abortRef.current === controller) {
          abortRef.current = null;
          setIsReviewing(false);
        }
        return;
      }
      cancelTick();
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
      flushBuffer();
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

  return { messages, isReviewing, error, start, send, stop, clear };
}

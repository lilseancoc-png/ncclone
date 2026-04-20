"use client";

import { useState, useCallback } from "react";
import { CompareMode, Language, RunnerMeta, TestCase, TestResult } from "@/data/types";
import { executeCode, ExecutionResult } from "@/lib/piston";

export function useCodeRunner() {
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (
      code: string,
      functionName: string,
      testCases: TestCase[],
      language: Language,
      compareMode: CompareMode = "exact",
      runner?: RunnerMeta
    ) => {
      setIsRunning(true);
      setError(null);
      setResults(null);
      setConsoleOutput([]);

      try {
        const result: ExecutionResult = await executeCode(
          code,
          functionName,
          testCases,
          language,
          compareMode,
          runner
        );
        setResults(result.results);
        setConsoleOutput(result.consoleOutput);
        if (result.error) setError(result.error);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Execution failed");
      } finally {
        setIsRunning(false);
      }
    },
    []
  );

  const clear = useCallback(() => {
    setResults(null);
    setConsoleOutput([]);
    setError(null);
  }, []);

  return { run, results, consoleOutput, isRunning, error, clear };
}

import { Language, TestCase, TestResult } from "@/data/types";

export interface ExecutionResult {
  results: TestResult[];
  consoleOutput: string[];
  error?: string;
}

function extractPythonFunctionName(code: string): string | null {
  const match = code.match(/^def\s+(\w+)\s*\(/m);
  return match ? match[1] : null;
}

function executeJavaScriptInWorker(
  code: string,
  functionName: string,
  testCases: TestCase[]
): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    const testCasesJson = JSON.stringify(
      testCases.map((tc) => ({
        id: tc.id,
        args: tc.inputArgs,
        expected: tc.expected,
      }))
    );

    const workerCode = `
      "use strict";
      const __consoleOutput = [];
      const __origLog = console.log;
      console.log = (...args) => __consoleOutput.push(
        args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')
      );

      try {
        ${code}

        const __testCases = ${testCasesJson};
        const __results = [];

        for (const tc of __testCases) {
          try {
            const actual = ${functionName}(...tc.args);
            const passed = JSON.stringify(actual) === JSON.stringify(tc.expected);
            __results.push({ testCaseId: tc.id, passed, actual, expected: tc.expected });
          } catch (e) {
            __results.push({ testCaseId: tc.id, passed: false, actual: null, expected: tc.expected, error: e.message });
          }
        }

        postMessage({ results: __results, consoleOutput: __consoleOutput });
      } catch (e) {
        postMessage({ results: [], consoleOutput: __consoleOutput, error: e.message });
      }
    `;

    const blob = new Blob([workerCode], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    const timeout = setTimeout(() => {
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve({
        results: testCases.map((tc) => ({
          testCaseId: tc.id,
          passed: false,
          actual: null,
          expected: tc.expected,
          error: "Execution timed out (5s limit)",
        })),
        consoleOutput: [],
        error: "Execution timed out after 5 seconds",
      });
    }, 5000);

    worker.onmessage = (e) => {
      clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(url);
      const data = e.data;
      resolve({
        results: data.results || [],
        consoleOutput: data.consoleOutput || [],
        error: data.error,
      });
    };

    worker.onerror = (e) => {
      clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve({
        results: [],
        consoleOutput: [],
        error: e.message || "Worker execution error",
      });
    };
  });
}

function buildPythonScript(funcName: string): string {
  // Build the Python test harness as a plain string.
  // Lines are joined with real newlines. No JS template literal nesting issues.
  const lines = [
    "import json, sys, io",
    "",
    "exec(__user_code)",
    "",
    "__test_cases = json.loads(__test_cases_json)",
    "__results = []",
    "__console_output = []",
    "",
    "class __CaptureOutput:",
    "    def __init__(self):",
    "        self.old_stdout = sys.stdout",
    "        self.capture = io.StringIO()",
    "    def __enter__(self):",
    "        sys.stdout = self.capture",
    "        return self",
    "    def __exit__(self, *args):",
    "        output = self.capture.getvalue()",
    "        if output.strip():",
    '            __console_output.extend(output.strip().split("\\n"))',
    "        sys.stdout = self.old_stdout",
    "",
    `__fn = ${funcName}`,
    "",
    "for tc in __test_cases:",
    "    try:",
    "        with __CaptureOutput():",
    "            actual = __fn(*tc['args'])",
    "        passed = json.dumps(actual, default=str) == json.dumps(tc['expected'], default=str)",
    "        __results.append({'testCaseId': tc['id'], 'passed': passed, 'actual': actual, 'expected': tc['expected']})",
    "    except Exception as e:",
    "        __results.append({'testCaseId': tc['id'], 'passed': False, 'actual': None, 'expected': tc['expected'], 'error': str(e)})",
    "",
    "json.dumps({'results': __results, 'consoleOutput': __console_output}, default=str)",
  ];
  return lines.join("\n");
}

function executePythonInWorker(
  code: string,
  functionName: string,
  testCases: TestCase[]
): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    const pyFuncName = extractPythonFunctionName(code) || functionName;
    const pythonScript = buildPythonScript(pyFuncName);

    const tcData = testCases.map((tc) => ({
      id: tc.id,
      args: tc.inputArgs,
      expected: tc.expected,
    }));

    // Build worker that receives all data via postMessage
    const workerCode = `
      importScripts("https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js");

      onmessage = async function(e) {
        const { userCode, pythonScript, testCasesJson } = e.data;
        try {
          const pyodide = await loadPyodide();
          pyodide.globals.set("__user_code", userCode);
          pyodide.globals.set("__test_cases_json", testCasesJson);
          const resultJson = pyodide.runPython(pythonScript);
          const parsed = JSON.parse(resultJson);
          postMessage({ results: parsed.results || [], consoleOutput: parsed.consoleOutput || [] });
        } catch (e) {
          postMessage({ results: [], consoleOutput: [], error: e.message || String(e) });
        }
      };
    `;

    const blob = new Blob([workerCode], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    worker.postMessage({
      userCode: code,
      pythonScript: pythonScript,
      testCasesJson: JSON.stringify(tcData),
    });

    const timeout = setTimeout(() => {
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve({
        results: testCases.map((tc) => ({
          testCaseId: tc.id,
          passed: false,
          actual: null,
          expected: tc.expected,
          error: "Execution timed out (30s limit)",
        })),
        consoleOutput: [],
        error: "Execution timed out after 30 seconds (Pyodide may still be loading — try again, it caches after first load)",
      });
    }, 30000);

    worker.onmessage = (e) => {
      clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(url);
      const data = e.data;
      resolve({
        results: data.results || [],
        consoleOutput: data.consoleOutput || [],
        error: data.error,
      });
    };

    worker.onerror = (e) => {
      clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve({
        results: [],
        consoleOutput: [],
        error: e.message || "Worker execution error",
      });
    };
  });
}

export async function executeCode(
  code: string,
  functionName: string,
  testCases: TestCase[],
  language: Language
): Promise<ExecutionResult> {
  if (language === "javascript") {
    return executeJavaScriptInWorker(code, functionName, testCases);
  }

  if (language === "python") {
    return executePythonInWorker(code, functionName, testCases);
  }

  return {
    results: [],
    consoleOutput: [],
    error: `Client-side execution is available for JavaScript and Python. For ${
      language === "java" ? "Java" : "C++"
    }, write your solution and verify it on LeetCode.`,
  };
}

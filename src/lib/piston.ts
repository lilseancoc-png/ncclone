import { CompareMode, Language, RunnerMeta, TestCase, TestResult } from "@/data/types";

export interface ExecutionResult {
  results: TestResult[];
  consoleOutput: string[];
  error?: string;
  executionMs?: number;
}

function extractPythonFunctionName(code: string): string | null {
  const match = code.match(/^def\s+(\w+)\s*\(/m);
  return match ? match[1] : null;
}

function executeJavaScriptInWorker(
  code: string,
  functionName: string,
  testCases: TestCase[],
  compareMode: CompareMode,
  runner: RunnerMeta | undefined
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
      const __origWarn = console.warn;
      const __origError = console.error;
      const __fmt = (args) => args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
      console.log = (...args) => __consoleOutput.push(__fmt(args));
      console.warn = (...args) => __consoleOutput.push('[warn] ' + __fmt(args));
      console.error = (...args) => __consoleOutput.push('[error] ' + __fmt(args));

      const __compareMode = ${JSON.stringify(compareMode)};
      const __runner = ${JSON.stringify(runner ?? null)};

      // Provide standard linked-list node shape so user solutions can write
      // idiomatic "head.val / head.next" code. Also provided for the
      // copy-random-list problem (aliased as Node).
      class ListNode {
        constructor(val, next) {
          this.val = val === undefined ? 0 : val;
          this.next = next === undefined ? null : next;
        }
      }
      class Node {
        constructor(val, next, random) {
          this.val = val === undefined ? 0 : val;
          this.next = next === undefined ? null : next;
          this.random = random === undefined ? null : random;
        }
      }

      function __arrayToLL(arr) {
        if (!Array.isArray(arr) || arr.length === 0) return null;
        const dummy = new ListNode();
        let curr = dummy;
        for (const v of arr) {
          curr.next = new ListNode(v);
          curr = curr.next;
        }
        return dummy.next;
      }

      function __llToArray(head) {
        const out = [];
        const seen = new Set();
        let curr = head;
        while (curr && !seen.has(curr)) {
          seen.add(curr);
          out.push(curr.val);
          curr = curr.next;
        }
        return out;
      }

      function __arrayToLLWithCycle(arr, pos) {
        if (!Array.isArray(arr) || arr.length === 0) return null;
        const dummy = new ListNode();
        let curr = dummy;
        const nodes = [];
        for (const v of arr) {
          curr.next = new ListNode(v);
          curr = curr.next;
          nodes.push(curr);
        }
        if (typeof pos === "number" && pos >= 0 && pos < nodes.length) {
          curr.next = nodes[pos];
        }
        return dummy.next;
      }

      function __pairsToRandomList(pairs) {
        if (!Array.isArray(pairs) || pairs.length === 0) return null;
        const nodes = pairs.map(([val]) => new Node(val));
        for (let i = 0; i < pairs.length; i++) {
          nodes[i].next = i + 1 < nodes.length ? nodes[i + 1] : null;
          const r = pairs[i][1];
          nodes[i].random = (r === null || r === undefined) ? null : nodes[r];
        }
        return nodes[0];
      }

      function __randomListToPairs(head) {
        const nodes = [];
        let curr = head;
        while (curr) { nodes.push(curr); curr = curr.next; }
        const indexOf = new Map(nodes.map((n, i) => [n, i]));
        return nodes.map((n) => [n.val, n.random ? indexOf.get(n.random) ?? null : null]);
      }

      // Sort arrays (and recursively sort nested arrays when deep=true) by
      // comparing a stable JSON form of each element. Objects keep key order.
      function __canonicalize(value, deep) {
        if (Array.isArray(value)) {
          const mapped = deep
            ? value.map((v) => __canonicalize(v, true))
            : value.slice();
          return mapped.sort((a, b) => {
            const sa = JSON.stringify(a);
            const sb = JSON.stringify(b);
            return sa < sb ? -1 : sa > sb ? 1 : 0;
          });
        }
        return value;
      }

      function __isEqual(actual, expected) {
        if (__compareMode === "unordered") {
          return JSON.stringify(__canonicalize(actual, false))
              === JSON.stringify(__canonicalize(expected, false));
        }
        if (__compareMode === "unordered-nested") {
          return JSON.stringify(__canonicalize(actual, true))
              === JSON.stringify(__canonicalize(expected, true));
        }
        if (__compareMode === "set-of-strings") {
          if (!Array.isArray(actual) || !Array.isArray(expected)) return false;
          const a = actual.slice().sort();
          const b = expected.slice().sort();
          return JSON.stringify(a) === JSON.stringify(b);
        }
        return JSON.stringify(actual) === JSON.stringify(expected);
      }

      function __runTest(tc) {
        if (__runner && __runner.kind === "class-ops") {
          const [ops, opArgs] = tc.args;
          const Cls = ${functionName};
          let instance = null;
          const out = [];
          for (let i = 0; i < ops.length; i++) {
            const op = ops[i];
            const a = opArgs[i] || [];
            if (i === 0 || op === __runner.className) {
              instance = new Cls(...a);
              out.push(null);
            } else {
              const r = instance[op](...a);
              out.push(r === undefined ? null : r);
            }
          }
          return out;
        }

        if (__runner && __runner.kind === "random-list") {
          const head = __pairsToRandomList(tc.args[0]);
          const result = ${functionName}(head);
          return __randomListToPairs(result);
        }

        if (__runner && __runner.kind === "linked-list") {
          let args = tc.args.slice();
          const listIdxs = __runner.listInputIndices || [];
          const listOfListsIdxs = __runner.listOfListsInputIndices || [];
          const cycleIdx = (typeof __runner.cyclePosArgIndex === "number")
            ? __runner.cyclePosArgIndex : -1;

          for (const i of listIdxs) {
            if (i === listIdxs[0] && cycleIdx >= 0) {
              args[i] = __arrayToLLWithCycle(args[i], args[cycleIdx]);
            } else {
              args[i] = __arrayToLL(args[i]);
            }
          }
          for (const i of listOfListsIdxs) {
            args[i] = (args[i] || []).map(__arrayToLL);
          }

          let firstListHead = null;
          if (__runner.inPlace && listIdxs.length > 0) {
            firstListHead = args[listIdxs[0]];
          }

          if (cycleIdx >= 0) args.splice(cycleIdx, 1);

          const result = ${functionName}(...args);

          if (__runner.inPlace) return __llToArray(firstListHead);
          if (__runner.returnsList) return __llToArray(result);
          return result;
        }

        return ${functionName}(...tc.args);
      }

      try {
        ${code}

        const __testCases = ${testCasesJson};
        const __results = [];
        const __t0 = performance.now();

        for (const tc of __testCases) {
          try {
            const __ts = performance.now();
            const actual = __runTest(tc);
            const __dur = performance.now() - __ts;
            const passed = __isEqual(actual, tc.expected);
            __results.push({ testCaseId: tc.id, passed, actual, expected: tc.expected, durationMs: __dur });
          } catch (e) {
            __results.push({ testCaseId: tc.id, passed: false, actual: null, expected: tc.expected, error: e.message });
          }
        }

        const __totalMs = performance.now() - __t0;
        postMessage({ results: __results, consoleOutput: __consoleOutput, executionMs: __totalMs });
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
        executionMs: data.executionMs,
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

function buildPythonScript(
  funcName: string,
  compareMode: CompareMode,
  runner: RunnerMeta | undefined
): string {
  // Build the Python test harness as a plain string.
  // Lines are joined with real newlines. No JS template literal nesting issues.
  const lines = [
    "import json, sys, io, time",
    "",
    "class ListNode:",
    "    def __init__(self, val=0, next=None):",
    "        self.val = val",
    "        self.next = next",
    "",
    "class Node:",
    "    def __init__(self, val=0, next=None, random=None):",
    "        self.val = val",
    "        self.next = next",
    "        self.random = random",
    "",
    "def __array_to_ll(arr):",
    "    if not arr: return None",
    "    dummy = ListNode()",
    "    curr = dummy",
    "    for v in arr:",
    "        curr.next = ListNode(v)",
    "        curr = curr.next",
    "    return dummy.next",
    "",
    "def __ll_to_array(head):",
    "    out = []",
    "    seen = set()",
    "    curr = head",
    "    while curr is not None and id(curr) not in seen:",
    "        seen.add(id(curr))",
    "        out.append(curr.val)",
    "        curr = curr.next",
    "    return out",
    "",
    "def __array_to_ll_with_cycle(arr, pos):",
    "    if not arr: return None",
    "    dummy = ListNode()",
    "    curr = dummy",
    "    nodes = []",
    "    for v in arr:",
    "        curr.next = ListNode(v)",
    "        curr = curr.next",
    "        nodes.append(curr)",
    "    if isinstance(pos, int) and 0 <= pos < len(nodes):",
    "        curr.next = nodes[pos]",
    "    return dummy.next",
    "",
    "def __pairs_to_random_list(pairs):",
    "    if not pairs: return None",
    "    nodes = [Node(p[0]) for p in pairs]",
    "    for i, p in enumerate(pairs):",
    "        nodes[i].next = nodes[i + 1] if i + 1 < len(nodes) else None",
    "        r = p[1]",
    "        nodes[i].random = nodes[r] if isinstance(r, int) else None",
    "    return nodes[0]",
    "",
    "def __random_list_to_pairs(head):",
    "    nodes = []",
    "    curr = head",
    "    while curr is not None:",
    "        nodes.append(curr)",
    "        curr = curr.next",
    "    idx = {id(n): i for i, n in enumerate(nodes)}",
    "    return [[n.val, idx.get(id(n.random)) if n.random is not None else None] for n in nodes]",
    "",
    "# Pre-import common stdlib so user code can use these without explicit imports.",
    "import collections, heapq, bisect, functools, itertools, math, re, string",
    "from collections import Counter, defaultdict, deque, OrderedDict, namedtuple",
    "from heapq import heappush, heappop, heapify, heappushpop, heapreplace, nlargest, nsmallest",
    "from bisect import bisect_left, bisect_right, bisect, insort, insort_left, insort_right",
    "from functools import reduce, lru_cache, cache, cmp_to_key",
    "from itertools import combinations, permutations, product, accumulate, chain, groupby, count, cycle, repeat",
    "from math import inf, nan, isqrt, gcd, lcm, comb, perm, factorial, floor, ceil, log, log2, sqrt, pi",
    "from typing import List, Dict, Set, Tuple, Optional, Any",
    "",
    "exec(__user_code)",
    "",
    "__test_cases = json.loads(__test_cases_json)",
    "__results = []",
    "__console_output = []",
    `__compare_mode = ${JSON.stringify(compareMode)}`,
    `__runner = json.loads(${JSON.stringify(JSON.stringify(runner ?? null))})`,
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
    "def __to_jsonable(v):",
    "    # Convert tuples/sets to lists so JSON shape matches the expected.",
    "    if isinstance(v, (list, tuple)):",
    "        return [__to_jsonable(x) for x in v]",
    "    if isinstance(v, set):",
    "        return [__to_jsonable(x) for x in v]",
    "    if isinstance(v, dict):",
    "        return {k: __to_jsonable(x) for k, x in v.items()}",
    "    return v",
    "",
    "def __canonicalize(v, deep):",
    "    if isinstance(v, list):",
    "        items = [__canonicalize(x, True) for x in v] if deep else list(v)",
    "        try:",
    "            return sorted(items, key=lambda x: json.dumps(x, default=str, sort_keys=True))",
    "        except Exception:",
    "            return items",
    "    return v",
    "",
    "def __is_equal(actual, expected):",
    "    a = __to_jsonable(actual)",
    "    if __compare_mode == 'unordered':",
    "        return json.dumps(__canonicalize(a, False), default=str, sort_keys=True) == json.dumps(__canonicalize(expected, False), default=str, sort_keys=True)",
    "    if __compare_mode == 'unordered-nested':",
    "        return json.dumps(__canonicalize(a, True), default=str, sort_keys=True) == json.dumps(__canonicalize(expected, True), default=str, sort_keys=True)",
    "    if __compare_mode == 'set-of-strings':",
    "        if not isinstance(a, list) or not isinstance(expected, list):",
    "            return False",
    "        return sorted(a) == sorted(expected)",
    "    return json.dumps(a, default=str, sort_keys=True) == json.dumps(expected, default=str, sort_keys=True)",
    "",
    `__fn = ${funcName} if '${funcName}' in dir() else None`,
    "",
    "def __run_test(tc):",
    "    if __runner and __runner.get('kind') == 'class-ops':",
    "        ops, op_args = tc['args'][0], tc['args'][1]",
    "        cls_name = __runner['className']",
    "        cls = globals().get(cls_name)",
    "        if cls is None:",
    "            raise NameError('Class ' + cls_name + ' is not defined')",
    "        instance = None",
    "        out = []",
    "        for i, op in enumerate(ops):",
    "            a = op_args[i] if i < len(op_args) else []",
    "            if i == 0 or op == cls_name:",
    "                instance = cls(*a)",
    "                out.append(None)",
    "            else:",
    "                # Map camelCase op names to snake_case (e.g. getVal → get_val) with fallback.",
    "                method = getattr(instance, op, None)",
    "                if method is None:",
    "                    import re as __re",
    "                    snake = __re.sub(r'(?<!^)(?=[A-Z])', '_', op).lower()",
    "                    method = getattr(instance, snake, None)",
    "                if method is None:",
    "                    raise AttributeError(cls_name + ' has no method ' + op)",
    "                r = method(*a)",
    "                out.append(r)",
    "        return out",
    "    if __runner and __runner.get('kind') == 'random-list':",
    "        head = __pairs_to_random_list(tc['args'][0])",
    "        result = __fn(head)",
    "        return __random_list_to_pairs(result)",
    "    if __runner and __runner.get('kind') == 'linked-list':",
    "        args = list(tc['args'])",
    "        list_idxs = __runner.get('listInputIndices') or []",
    "        lol_idxs = __runner.get('listOfListsInputIndices') or []",
    "        cycle_idx = __runner.get('cyclePosArgIndex')",
    "        if not isinstance(cycle_idx, int):",
    "            cycle_idx = -1",
    "        for i in list_idxs:",
    "            if list_idxs and i == list_idxs[0] and cycle_idx >= 0:",
    "                args[i] = __array_to_ll_with_cycle(args[i], args[cycle_idx])",
    "            else:",
    "                args[i] = __array_to_ll(args[i])",
    "        for i in lol_idxs:",
    "            args[i] = [__array_to_ll(x) for x in (args[i] or [])]",
    "        first_head = None",
    "        if __runner.get('inPlace') and list_idxs:",
    "            first_head = args[list_idxs[0]]",
    "        if cycle_idx >= 0:",
    "            del args[cycle_idx]",
    "        result = __fn(*args)",
    "        if __runner.get('inPlace'):",
    "            return __ll_to_array(first_head)",
    "        if __runner.get('returnsList'):",
    "            return __ll_to_array(result)",
    "        return result",
    "    return __fn(*tc['args'])",
    "",
    "__t0 = time.perf_counter()",
    "for tc in __test_cases:",
    "    try:",
    "        __ts = time.perf_counter()",
    "        with __CaptureOutput():",
    "            actual = __run_test(tc)",
    "        __dur = (time.perf_counter() - __ts) * 1000",
    "        passed = __is_equal(actual, tc['expected'])",
    "        __results.append({'testCaseId': tc['id'], 'passed': passed, 'actual': __to_jsonable(actual), 'expected': tc['expected'], 'durationMs': __dur})",
    "    except Exception as e:",
    "        __results.append({'testCaseId': tc['id'], 'passed': False, 'actual': None, 'expected': tc['expected'], 'error': str(e)})",
    "",
    "__total_ms = (time.perf_counter() - __t0) * 1000",
    "json.dumps({'results': __results, 'consoleOutput': __console_output, 'executionMs': __total_ms}, default=str)",
  ];
  return lines.join("\n");
}

function executePythonInWorker(
  code: string,
  functionName: string,
  testCases: TestCase[],
  compareMode: CompareMode,
  runner: RunnerMeta | undefined
): Promise<ExecutionResult> {
  return new Promise((resolve) => {
    const pyFuncName = extractPythonFunctionName(code) || functionName;
    const pythonScript = buildPythonScript(pyFuncName, compareMode, runner);

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
          postMessage({ results: parsed.results || [], consoleOutput: parsed.consoleOutput || [], executionMs: parsed.executionMs });
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
        executionMs: data.executionMs,
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
  language: Language,
  compareMode: CompareMode = "exact",
  runner?: RunnerMeta
): Promise<ExecutionResult> {
  if (language === "javascript") {
    return executeJavaScriptInWorker(code, functionName, testCases, compareMode, runner);
  }

  if (language === "python") {
    return executePythonInWorker(code, functionName, testCases, compareMode, runner);
  }

  return {
    results: [],
    consoleOutput: [],
    error: `Client-side execution is available for JavaScript and Python. For ${
      language === "java" ? "Java" : "C++"
    }, write your solution and verify it on LeetCode.`,
  };
}

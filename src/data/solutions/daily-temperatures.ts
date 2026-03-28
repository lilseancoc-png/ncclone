import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def dailyTemperatures(temperatures):
    n = len(temperatures)
    answer = [0] * n
    stack = []  # indices of temps waiting for warmer day

    for i in range(n):
        while stack and temperatures[i] > temperatures[stack[-1]]:
            prev = stack.pop()
            answer[prev] = i - prev
        stack.append(i)
    return answer`,
  steps: [
    {
      description:
        "We want to find how many days until a warmer temperature for each day. Use a monotonic decreasing stack of indices.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "temperatures", values: [73, 74, 75, 71, 69, 72, 76, 73], highlights: {} },
        { type: "array", label: "answer", values: [0, 0, 0, 0, 0, 0, 0, 0], highlights: {} },
        { type: "stack", label: "stack (indices)", values: [] },
      ],
    },
    {
      description:
        "i=0: temp=73. Stack is empty, so just push index 0. No warmer day found yet.",
      codeHighlightLines: [6, 10],
      structures: [
        { type: "array", label: "temperatures", values: [73, 74, 75, 71, 69, 72, 76, 73], highlights: { 0: "active" }, pointers: [{ index: 0, label: "i" }] },
        { type: "array", label: "answer", values: [0, 0, 0, 0, 0, 0, 0, 0], highlights: {} },
        { type: "stack", label: "stack (indices)", values: [0], topHighlight: true },
      ],
    },
    {
      description:
        "i=1: temp=74 > 73 (stack top). Pop index 0: answer[0] = 1 - 0 = 1. Day 0 waits 1 day for warmer. Push index 1.",
      codeHighlightLines: [7, 8, 9, 10],
      structures: [
        { type: "array", label: "temperatures", values: [73, 74, 75, 71, 69, 72, 76, 73], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "i" }] },
        { type: "array", label: "answer", values: [1, 0, 0, 0, 0, 0, 0, 0], highlights: { 0: "success" } },
        { type: "stack", label: "stack (indices)", values: [1], topHighlight: true },
      ],
    },
    {
      description:
        "i=2: temp=75 > 74 (stack top). Pop index 1: answer[1] = 2 - 1 = 1. Push index 2.",
      codeHighlightLines: [7, 8, 9, 10],
      structures: [
        { type: "array", label: "temperatures", values: [73, 74, 75, 71, 69, 72, 76, 73], highlights: { 1: "checked", 2: "active" }, pointers: [{ index: 2, label: "i" }] },
        { type: "array", label: "answer", values: [1, 1, 0, 0, 0, 0, 0, 0], highlights: { 1: "success" } },
        { type: "stack", label: "stack (indices)", values: [2], topHighlight: true },
      ],
    },
    {
      description:
        "i=3: temp=71 < 75 (stack top). No pop — just push index 3. i=4: temp=69 < 71, push index 4. Stack grows with decreasing temps.",
      codeHighlightLines: [6, 7, 10],
      structures: [
        { type: "array", label: "temperatures", values: [73, 74, 75, 71, 69, 72, 76, 73], highlights: { 3: "checked", 4: "active" }, pointers: [{ index: 4, label: "i" }] },
        { type: "array", label: "answer", values: [1, 1, 0, 0, 0, 0, 0, 0], highlights: {} },
        { type: "stack", label: "stack (indices)", values: [2, 3, 4], topHighlight: true },
      ],
    },
    {
      description:
        "i=5: temp=72 > 69 (top) — pop 4: answer[4] = 5-4 = 1. 72 > 71 (new top) — pop 3: answer[3] = 5-3 = 2. 72 < 75 — stop. Push 5.",
      codeHighlightLines: [7, 8, 9, 10],
      structures: [
        { type: "array", label: "temperatures", values: [73, 74, 75, 71, 69, 72, 76, 73], highlights: { 3: "checked", 4: "checked", 5: "active" }, pointers: [{ index: 5, label: "i" }] },
        { type: "array", label: "answer", values: [1, 1, 0, 2, 1, 0, 0, 0], highlights: { 3: "success", 4: "success" } },
        { type: "stack", label: "stack (indices)", values: [2, 5], topHighlight: true },
      ],
    },
    {
      description:
        "i=6: temp=76 > 72 — pop 5: answer[5] = 1. 76 > 75 — pop 2: answer[2] = 4. Stack empty, push 6.",
      codeHighlightLines: [7, 8, 9, 10],
      structures: [
        { type: "array", label: "temperatures", values: [73, 74, 75, 71, 69, 72, 76, 73], highlights: { 2: "checked", 5: "checked", 6: "active" }, pointers: [{ index: 6, label: "i" }] },
        { type: "array", label: "answer", values: [1, 1, 4, 2, 1, 1, 0, 0], highlights: { 2: "success", 5: "success" } },
        { type: "stack", label: "stack (indices)", values: [6], topHighlight: true },
      ],
    },
    {
      description:
        "i=7: temp=73 < 76. Push 7. Loop ends. Indices 6 and 7 stay in stack — no warmer day exists, answer stays 0.",
      codeHighlightLines: [10, 11],
      structures: [
        { type: "array", label: "temperatures", values: [73, 74, 75, 71, 69, 72, 76, 73], highlights: { 7: "active" }, pointers: [{ index: 7, label: "i" }] },
        { type: "array", label: "answer", values: [1, 1, 4, 2, 1, 1, 0, 0], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
        { type: "stack", label: "stack (indices)", values: [6, 7] },
        { type: "variables", entries: [{ name: "return", value: "[1,1,4,2,1,1,0,0]", highlight: true }] },
      ],
    },
  ],
};

export default solution;

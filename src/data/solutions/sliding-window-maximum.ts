import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Monotonic Deque",
  timeComplexity: "O(n)",
  spaceComplexity: "O(k)",

  steps: [
    {
      description: "Process first window [1,3,-1]. Deque maintains decreasing order of values.",
      codeHighlightLines: [6, 9, 10, 11],
      structures: [
        { type: "array", label: "nums", values: [1, 3, -1, -3, 5, 3, 6, 7], highlights: { 0: "checked", 1: "active", 2: "checked" } },
        { type: "array", label: "Deque (indices)", values: [1, 2], highlights: { 0: "success" } },
        { type: "array", label: "Result", values: [3], highlights: { 0: "success" } },
      ],
    },
    {
      description: "Window [3,-1,-3]: 3 is still max. Window [-1,-3,5]: 5 becomes new max.",
      codeHighlightLines: [12, 13],
      structures: [
        { type: "array", label: "nums", values: [1, 3, -1, -3, 5, 3, 6, 7], highlights: { 2: "checked", 3: "checked", 4: "active" } },
        { type: "array", label: "Deque (indices)", values: [4], highlights: { 0: "success" } },
        { type: "array", label: "Result", values: [3, 3, 5], highlights: { 2: "success" } },
      ],
    },
    {
      description: "Continue sliding. Window [5,3,6]: 6 is max. Window [3,6,7]: 7 is max.",
      codeHighlightLines: [9, 10],
      structures: [
        { type: "array", label: "nums", values: [1, 3, -1, -3, 5, 3, 6, 7], highlights: { 5: "checked", 6: "checked", 7: "active" } },
        { type: "array", label: "Deque (indices)", values: [7], highlights: { 0: "success" } },
        { type: "array", label: "Result", values: [3, 3, 5, 5, 6, 7], highlights: { 4: "success", 5: "success" } },
      ],
    },
  ],
};

export default solution;

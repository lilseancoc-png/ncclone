import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "DFS + Memoization",
  timeComplexity: "O(m·n)",
  spaceComplexity: "O(m·n)",

  steps: [
    {
      description: "DFS from each cell, only move to strictly greater neighbors. Memoize results.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "Row 0", values: [9, 9, 4], highlights: {} },
        { type: "array", label: "Row 1", values: [6, 6, 8], highlights: {} },
        { type: "array", label: "Row 2", values: [2, 1, 1], highlights: { 1: "active" } },
      ],
    },
    {
      description: "From cell (2,1)=1: can go to 2→6→9 (length 4). This is the longest increasing path.",
      codeHighlightLines: [11, 12],
      structures: [
        { type: "array", label: "Row 0", values: [9, 9, 4], highlights: { 0: "success" } },
        { type: "array", label: "Row 1", values: [6, 6, 8], highlights: { 0: "success" } },
        { type: "array", label: "Row 2", values: [2, 1, 1], highlights: { 0: "success", 1: "active" } },
        { type: "variables", label: "Path", entries: [{ name: "1→2→6→9", value: "length 4" }] },
      ],
    },
    {
      description: "Check all cells. Memoization prevents recomputation. Longest path = 4.",
      codeHighlightLines: [16],
      structures: [
        { type: "variables", label: "Result", entries: [{ name: "longest path", value: 4 }, { name: "path", value: "1→2→6→9" }] },
      ],
    },
  ],
};

export default solution;

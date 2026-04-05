import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Min-Heap (Dijkstra-like)",
  timeComplexity: "O(n² log n)",
  spaceComplexity: "O(n²)",

  steps: [
    {
      description: "Start at (0,0) with elevation grid[0][0]. Use min-heap to always expand lowest-cost path.",
      codeHighlightLines: [4],
      structures: [
        { type: "array", label: "Grid row 0", values: [0, 2], highlights: { 0: "active" } },
        { type: "array", label: "Grid row 1", values: [1, 3], highlights: {} },
        { type: "variables", label: "State", entries: [{ name: "heap top", value: "(0, 0, 0)" }, { name: "target", value: "(1,1)" }] },
      ],
    },
    {
      description: "Expand (0,0): push neighbors. Pop min: (1, 1,0). Expand: push (max(1,3), 1,1) = (3,1,1).",
      codeHighlightLines: [15],
      structures: [
        { type: "array", label: "Grid row 0", values: [0, 2], highlights: { 0: "checked", 1: "pointer-j" } },
        { type: "array", label: "Grid row 1", values: [1, 3], highlights: { 0: "active" } },
        { type: "variables", label: "Heap", entries: [{ name: "entries", value: "(2,0,1), (3,1,1)" }] },
      ],
    },
    {
      description: "Pop (2,0,1), expand. Pop (3,1,1) — reached target! Minimum time = 3.",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "Grid row 0", values: [0, 2], highlights: { 0: "success", 1: "success" } },
        { type: "array", label: "Grid row 1", values: [1, 3], highlights: { 0: "success", 1: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "min time", value: 3 }] },
      ],
    },
  ],
};

export default solution;

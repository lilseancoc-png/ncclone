import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Topological Sort (BFS)",
  timeComplexity: "O(C)",
  spaceComplexity: "O(U + E)",

  steps: [
    {
      description: "Compare adjacent words to find character ordering. 'wrt' vs 'wrf' → t comes before f.",
      codeHighlightLines: [10, 12],
      structures: [
        { type: "array", label: "Words", values: ["wrt", "wrf", "er", "ett", "rftt"], highlights: { 0: "pointer-i", 1: "pointer-j" } },
        { type: "hashmap", label: "Edges (before → after)", entries: [["t", "→ f"], ["w", "→ e"], ["r", "→ t"], ["e", "→ r"]], highlights: {} },
      ],
    },
    {
      description: "Build in-degree map. Start BFS from nodes with in-degree 0 (no prerequisites).",
      codeHighlightLines: [15],
      structures: [
        { type: "hashmap", label: "In-degree", entries: [["w", "0"], ["e", "1"], ["r", "1"], ["t", "1"], ["f", "1"]], highlights: { w: "success" } },
        { type: "variables", label: "BFS Start", entries: [{ name: "queue", value: "[w]" }] },
      ],
    },
    {
      description: "BFS order: w→e→r→t→f. All characters included → valid ordering 'wertf'.",
      codeHighlightLines: [24],
      structures: [
        { type: "array", label: "Topological Order", values: ["w", "e", "r", "t", "f"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "order", value: "wertf" }] },
      ],
    },
  ],
};

export default solution;

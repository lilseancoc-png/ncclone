import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Bellman-Ford (K iterations)",
  timeComplexity: "O(k·E)",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "Initialize distances. Source = 0, all others = infinity. Run at most k+1 iterations.",
      codeHighlightLines: [2, 3],
      structures: [
        { type: "array", label: "Prices", values: [0, "∞", "∞", "∞"], highlights: { 0: "success" } },
        { type: "variables", label: "Config", entries: [{ name: "src", value: 0 }, { name: "dst", value: 3 }, { name: "k", value: 1 }] },
      ],
    },
    {
      description: "Iteration 1: relax all edges. 0→1 costs 100, 0→2 costs ∞ (no direct edge).",
      codeHighlightLines: [6, 7, 8],
      structures: [
        { type: "array", label: "Prices after iter 1", values: [0, 100, "∞", 600], highlights: { 1: "active", 3: "active" } },
        { type: "variables", label: "Edges used", entries: [{ name: "0→1", value: 100 }, { name: "1→3", value: 600 }] },
      ],
    },
    {
      description: "Iteration 2 (k=1, so last): 1→2 costs 200, 2→3 costs 300. Total 0→1→2→3 = 200+100+... But k=1 stop limit. Best = 700.",
      codeHighlightLines: [10],
      structures: [
        { type: "array", label: "Final Prices", values: [0, 100, 200, 700], highlights: { 3: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "cheapest", value: 700 }, { name: "path", value: "0→1→3" }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "BFS — Wildcard Patterns",
  timeComplexity: "O(m²·n)",
  spaceComplexity: "O(m²·n)",

  steps: [
    {
      description: "BFS from beginWord. Try changing each character to a-z to find valid next words.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "variables", label: "Input", entries: [{ name: "begin", value: "hit" }, { name: "end", value: "cog" }] },
        { type: "set", label: "Word List", values: ["hot", "dot", "dog", "lot", "log", "cog"], highlights: {} },
      ],
    },
    {
      description: "Level 1: 'hit' → 'hot' (change i→o). Level 2: 'hot' → 'dot','lot'.",
      codeHighlightLines: [11, 14],
      structures: [
        { type: "array", label: "BFS Path", values: ["hit", "hot", "dot/lot"], highlights: { 0: "checked", 1: "active", 2: "pointer-j" } },
        { type: "set", label: "Visited", values: ["hit", "hot", "dot", "lot"], highlights: { 2: "active", 3: "active" } },
        { type: "variables", label: "State", entries: [{ name: "steps", value: 2 }] },
      ],
    },
    {
      description: "Level 3: 'dot'→'dog', 'lot'→'log'. Level 4: 'dog'→'cog' = endWord! Return 5.",
      codeHighlightLines: [12, 13],
      structures: [
        { type: "array", label: "Shortest Path", values: ["hit", "hot", "dot", "dog", "cog"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "length", value: 5 }] },
      ],
    },
  ],
};

export default solution;

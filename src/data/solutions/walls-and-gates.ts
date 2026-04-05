import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Multi-source BFS",
  timeComplexity: "O(m·n)",
  spaceComplexity: "O(m·n)",

  steps: [
    {
      description: "Find all gates (value 0) and add them to the BFS queue as starting points.",
      codeHighlightLines: [6, 7],
      structures: [
        { type: "array", label: "Row 0", values: ["INF", -1, 0, "INF"], highlights: { 2: "success" } },
        { type: "array", label: "Row 1", values: ["INF", "INF", "INF", -1], highlights: {} },
        { type: "array", label: "Row 2", values: [0, -1, "INF", "INF"], highlights: { 0: "success" } },
        { type: "variables", label: "State", entries: [{ name: "gates", value: 2 }, { name: "BFS from", value: "(0,2) and (2,0)" }] },
      ],
    },
    {
      description: "BFS expands from all gates simultaneously. Each INF cell gets distance to nearest gate.",
      codeHighlightLines: [13, 14],
      structures: [
        { type: "array", label: "Row 0", values: [3, -1, 0, 1], highlights: { 3: "active" } },
        { type: "array", label: "Row 1", values: [2, 2, 1, -1], highlights: { 2: "active" } },
        { type: "array", label: "Row 2", values: [0, -1, 2, 3], highlights: { 0: "success" } },
      ],
    },
    {
      description: "BFS complete. Every empty room now contains its distance to the nearest gate.",
      codeHighlightLines: [8],
      structures: [
        { type: "array", label: "Row 0", values: [3, -1, 0, 1], highlights: { 0: "success", 2: "success", 3: "success" } },
        { type: "array", label: "Row 1", values: [2, 2, 1, -1], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "Row 2", values: [0, -1, 2, 3], highlights: { 0: "success", 2: "success", 3: "success" } },
      ],
    },
  ],
};

export default solution;

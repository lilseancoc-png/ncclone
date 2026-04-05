import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Union-Find",
  timeComplexity: "O(n·α(n))",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "A valid tree has exactly n-1 edges and no cycles. Check edge count first.",
      codeHighlightLines: [2, 3],
      structures: [
        { type: "variables", label: "Input", entries: [{ name: "n", value: 5 }, { name: "edges", value: 4 }, { name: "n-1 check", value: "4 == 4 ✓" }] },
        { type: "array", label: "Parent", values: [0, 1, 2, 3, 4], highlights: {} },
      ],
    },
    {
      description: "Union edges one by one. Edge (0,1): union. Edge (0,2): union. Edge (0,3): union.",
      codeHighlightLines: [19, 22],
      structures: [
        { type: "array", label: "Parent", values: [0, 0, 0, 0, 4], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", label: "Unions", entries: [{ name: "(0,1)", value: "✓" }, { name: "(0,2)", value: "✓" }, { name: "(0,3)", value: "✓" }] },
      ],
    },
    {
      description: "Edge (1,4): union 1 and 4. All nodes connected, no cycles → valid tree!",
      codeHighlightLines: [24],
      structures: [
        { type: "array", label: "Parent", values: [0, 0, 0, 0, 0], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "valid tree", value: "True" }, { name: "components", value: 1 }] },
      ],
    },
  ],
};

export default solution;

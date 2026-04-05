import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Union-Find",
  timeComplexity: "O(n·α(n))",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "Start with n=5 components (each node is its own component).",
      codeHighlightLines: [2, 4],
      structures: [
        { type: "array", label: "Parent", values: [0, 1, 2, 3, 4], highlights: {} },
        { type: "variables", label: "State", entries: [{ name: "components", value: 5 }] },
      ],
    },
    {
      description: "Process edges (0,1), (1,2): merge components. Components: 5→4→3.",
      codeHighlightLines: [18, 19, 20],
      structures: [
        { type: "array", label: "Parent", values: [0, 0, 0, 3, 4], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "components", value: "3" }, { name: "merged", value: "{0,1,2}" }] },
      ],
    },
    {
      description: "Process edge (3,4): merge. Final: 2 connected components {0,1,2} and {3,4}.",
      codeHighlightLines: [21],
      structures: [
        { type: "array", label: "Parent", values: [0, 0, 0, 3, 3], highlights: { 0: "success", 1: "success", 2: "success", 3: "pointer-i", 4: "pointer-i" } },
        { type: "variables", label: "Result", entries: [{ name: "components", value: 2 }] },
      ],
    },
  ],
};

export default solution;

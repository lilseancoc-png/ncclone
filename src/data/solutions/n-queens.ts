import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Backtracking with Sets",
  timeComplexity: "O(n!)",
  spaceComplexity: "O(n²)",

  steps: [
    {
      description: "Place queens row by row. Track attacked columns and diagonals with sets.",
      codeHighlightLines: [2, 3, 4],
      structures: [
        { type: "array", label: "Row 0", values: [".", "Q", ".", "."], highlights: { 1: "success" } },
        { type: "array", label: "Row 1", values: [".", ".", ".", "Q"], highlights: { 3: "success" } },
        { type: "set", label: "Attacked cols", values: ["1", "3"], highlights: {} },
      ],
    },
    {
      description: "Row 2: cols 1,3 attacked. Diags block col 2. Only col 0 is safe → place Q at (2,0).",
      codeHighlightLines: [13, 14],
      structures: [
        { type: "array", label: "Row 0", values: [".", "Q", ".", "."], highlights: { 1: "success" } },
        { type: "array", label: "Row 1", values: [".", ".", ".", "Q"], highlights: { 3: "success" } },
        { type: "array", label: "Row 2", values: ["Q", ".", ".", "."], highlights: { 0: "success" } },
        { type: "array", label: "Row 3", values: [".", ".", "Q", "."], highlights: { 2: "active" } },
      ],
    },
    {
      description: "Row 3: col 2 is safe → complete solution! For n=4, there are 2 solutions total.",
      codeHighlightLines: [9, 10],
      structures: [
        { type: "array", label: "Solution", values: [".Q..", "...Q", "Q...", "..Q."], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "total solutions", value: 2 }] },
      ],
    },
  ],
};

export default solution;

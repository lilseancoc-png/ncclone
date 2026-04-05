import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Monotonic Stack",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "Push bars onto stack while increasing. When a shorter bar is found, pop and calculate area.",
      codeHighlightLines: [4, 6],
      structures: [
        { type: "array", label: "Heights", values: [2, 1, 5, 6, 2, 3], highlights: { 0: "active", 1: "found" } },
        { type: "stack", label: "Stack", values: ["(0,2)"], highlights: {} },
        { type: "variables", label: "State", entries: [{ name: "max_area", value: 2 }] },
      ],
    },
    {
      description: "Bar 6 > bar 5, push. Bar 2 < bar 6, pop 6 (area=6), pop 5 (area=10). New max = 10.",
      codeHighlightLines: [8],
      structures: [
        { type: "array", label: "Heights", values: [2, 1, 5, 6, 2, 3], highlights: { 2: "checked", 3: "checked", 4: "active" } },
        { type: "stack", label: "Stack", values: ["(0,1)", "(2,2)"], highlights: {} },
        { type: "variables", label: "State", entries: [{ name: "max_area", value: 10 }, { name: "popped 6", value: "6×1=6" }, { name: "popped 5", value: "5×2=10" }] },
      ],
    },
    {
      description: "Process remaining stack entries. Largest rectangle has area 10 (height 5, width 2).",
      codeHighlightLines: [11, 12],
      structures: [
        { type: "array", label: "Heights", values: [2, 1, 5, 6, 2, 3], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "max_area", value: 10 }] },
      ],
    },
  ],
};

export default solution;

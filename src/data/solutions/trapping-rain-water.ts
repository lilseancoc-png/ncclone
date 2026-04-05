import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Two Pointers",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",

  steps: [
    {
      description: "Initialize two pointers at both ends and track left_max/right_max.",
      codeHighlightLines: [2, 3],
      structures: [
        { type: "array", label: "Height", values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], highlights: { 0: "pointer-i", 11: "pointer-j" } },
        { type: "variables", label: "State", entries: [{ name: "left_max", value: 0 }, { name: "right_max", value: 1 }, { name: "water", value: 0 }] },
      ],
    },
    {
      description: "left_max < right_max, so move left pointer. Water at index 1 = 0, at index 2 = 1-0 = 1.",
      codeHighlightLines: [6, 7, 8, 9],
      structures: [
        { type: "array", label: "Height", values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], highlights: { 0: "checked", 1: "checked", 2: "pointer-i", 11: "pointer-j" } },
        { type: "variables", label: "State", entries: [{ name: "left_max", value: 1 }, { name: "right_max", value: 1 }, { name: "water", value: 1 }] },
      ],
    },
    {
      description: "Continue moving pointers inward. Water accumulates in valleys between walls.",
      codeHighlightLines: [5],
      structures: [
        { type: "array", label: "Height", values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "pointer-i", 11: "pointer-j" } },
        { type: "variables", label: "State", entries: [{ name: "left_max", value: 2 }, { name: "right_max", value: 1 }, { name: "water", value: 3 }] },
      ],
    },
    {
      description: "All positions processed. Total trapped water = 6.",
      codeHighlightLines: [14],
      structures: [
        { type: "array", label: "Height", values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success", 9: "success", 10: "success", 11: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "water", value: 6 }] },
      ],
    },
  ],
};

export default solution;

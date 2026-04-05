import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Right-to-Left Carry",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",

  steps: [
    {
      description: "Start from rightmost digit. If it's less than 9, increment and return immediately.",
      codeHighlightLines: [3, 4, 5],
      structures: [
        { type: "array", label: "digits", values: [1, 2, 9], highlights: { 2: "active" } },
        { type: "variables", label: "State", entries: [{ name: "digit", value: 9 }, { name: "9 → carry", value: "set to 0, move left" }] },
      ],
    },
    {
      description: "9 becomes 0 (carry). Move left: 2 < 9, so increment to 3. Done!",
      codeHighlightLines: [6, 3, 4, 5],
      structures: [
        { type: "array", label: "digits", values: [1, 3, 0], highlights: { 1: "success", 2: "checked" } },
        { type: "variables", label: "Result", entries: [{ name: "output", value: "[1, 3, 0]" }] },
      ],
    },
    {
      description: "Edge case: [9,9,9] → all become 0, prepend 1 → [1,0,0,0].",
      codeHighlightLines: [7],
      structures: [
        { type: "array", label: "Input [9,9,9]", values: [9, 9, 9], highlights: { 0: "found", 1: "found", 2: "found" } },
        { type: "array", label: "Result", values: [1, 0, 0, 0], highlights: { 0: "success" } },
      ],
    },
  ],
};

export default solution;

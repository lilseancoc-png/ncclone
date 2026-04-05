import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Grade School Multiplication",
  timeComplexity: "O(m·n)",
  spaceComplexity: "O(m+n)",

  steps: [
    {
      description: "Multiply each digit pair and place at positions i+j and i+j+1 in result array.",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "num1: '123'", values: [1, 2, 3], highlights: { 2: "active" } },
        { type: "array", label: "num2: '456'", values: [4, 5, 6], highlights: { 2: "active" } },
        { type: "variables", label: "State", entries: [{ name: "3×6", value: 18 }, { name: "place at", value: "positions 4,5" }] },
      ],
    },
    {
      description: "Process all digit pairs. Handle carries by adding to position p1.",
      codeHighlightLines: [10, 11],
      structures: [
        { type: "array", label: "Result array", values: [0, 0, 5, 6, 0, 8, 8], highlights: { 2: "active", 3: "active", 5: "active" } },
        { type: "variables", label: "After processing", entries: [{ name: "partial sums", value: "accumulating..." }] },
      ],
    },
    {
      description: "All multiplications done. Strip leading zeros. 123 × 456 = 56088.",
      codeHighlightLines: [13],
      structures: [
        { type: "array", label: "Result", values: [0, 5, 6, 0, 8, 8], highlights: { 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "output", value: 56088 }] },
      ],
    },
  ],
};

export default solution;

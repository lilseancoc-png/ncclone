import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Binary Search",
  timeComplexity: "O(log min(m,n))",
  spaceComplexity: "O(1)",

  steps: [
    {
      description: "Binary search on the smaller array to find the correct partition.",
      codeHighlightLines: [3, 4, 6],
      structures: [
        { type: "array", label: "A (smaller)", values: [1, 3], highlights: {} },
        { type: "array", label: "B (larger)", values: [2], highlights: {} },
        { type: "variables", label: "Setup", entries: [{ name: "total", value: 3 }, { name: "half", value: 1 }] },
      ],
    },
    {
      description: "Try partition: i=0 in A, j=-1 in B. Check if Aleft ≤ Bright and Bleft ≤ Aright.",
      codeHighlightLines: [9, 10],
      structures: [
        { type: "array", label: "A", values: [1, 3], highlights: { 0: "pointer-i" } },
        { type: "array", label: "B", values: [2], highlights: {} },
        { type: "variables", label: "Partition", entries: [{ name: "i", value: 0 }, { name: "Aleft", value: 1 }, { name: "Aright", value: 3 }, { name: "Bleft", value: "-∞" }, { name: "Bright", value: 2 }] },
      ],
    },
    {
      description: "Aleft(1) ≤ Bright(2) and Bleft(-∞) ≤ Aright(3). Valid partition! Odd total → min(Aright, Bright) = 2.",
      codeHighlightLines: [16, 17],
      structures: [
        { type: "array", label: "A", values: [1, 3], highlights: { 0: "success" } },
        { type: "array", label: "B", values: [2], highlights: { 0: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "median", value: "2.0" }] },
      ],
    },
  ],
};

export default solution;

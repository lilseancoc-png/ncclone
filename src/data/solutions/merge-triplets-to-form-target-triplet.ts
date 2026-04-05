import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Greedy Filter",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",

  steps: [
    {
      description: "Filter out triplets where any value exceeds the target. Only valid triplets can contribute.",
      codeHighlightLines: [4, 5],
      structures: [
        { type: "array", label: "Triplet [2,5,3]", values: [2, 5, 3], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "Triplet [1,8,4]", values: [1, 8, 4], highlights: { 1: "found" } },
        { type: "array", label: "Target", values: [2, 7, 5], highlights: {} },
        { type: "variables", label: "State", entries: [{ name: "[1,8,4]", value: "SKIP (8 > 7)" }] },
      ],
    },
    {
      description: "Check which target positions each valid triplet can match.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        { type: "array", label: "Triplet [2,5,3]", values: [2, 5, 3], highlights: { 0: "success" } },
        { type: "array", label: "Triplet [1,7,5]", values: [1, 7, 5], highlights: { 1: "success", 2: "success" } },
        { type: "set", label: "Matched positions", values: ["0 (from [2,5,3])", "1 (from [1,7,5])", "2 (from [1,7,5])"], highlights: {} },
      ],
    },
    {
      description: "All 3 target positions matched → return True.",
      codeHighlightLines: [9],
      structures: [
        { type: "set", label: "Matched positions", values: ["0", "1", "2"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "result", value: "True" }] },
      ],
    },
  ],
};

export default solution;

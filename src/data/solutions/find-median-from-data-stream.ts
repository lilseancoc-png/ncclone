import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Two Heaps",
  timeComplexity: "O(log n) add, O(1) find",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "Two heaps: max-heap (small) holds lower half, min-heap (large) holds upper half.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "variables", label: "After addNum(1)", entries: [{ name: "small (max-heap)", value: "[1]" }, { name: "large (min-heap)", value: "[]" }, { name: "median", value: 1 }] },
      ],
    },
    {
      description: "addNum(2): goes to small, but 2 > nothing in large, rebalance. Now small=[1], large=[2].",
      codeHighlightLines: [7, 13, 14, 15],
      structures: [
        { type: "array", label: "Small (max-heap)", values: [1], highlights: { 0: "pointer-i" } },
        { type: "array", label: "Large (min-heap)", values: [2], highlights: { 0: "pointer-j" } },
        { type: "variables", label: "State", entries: [{ name: "median", value: "(1+2)/2 = 1.5" }] },
      ],
    },
    {
      description: "addNum(3): small=[1,3]→rebalance→small=[1], large=[2,3]. Median = (1+2)/2 = 2.0. If odd count, median from larger heap.",
      codeHighlightLines: [21, 22, 25],
      structures: [
        { type: "array", label: "Small (max-heap)", values: [1], highlights: {} },
        { type: "array", label: "Large (min-heap)", values: [2, 3], highlights: { 0: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "median", value: 2 }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Sort + Min-Heap",
  timeComplexity: "O(n log n + q log q)",
  spaceComplexity: "O(n + q)",

  steps: [
    {
      description: "Sort intervals by start. Process queries in sorted order, adding valid intervals to heap.",
      codeHighlightLines: [2, 6],
      structures: [
        { type: "array", label: "Sorted Intervals", values: ["[1,4]", "[2,4]", "[3,6]", "[4,4]"], highlights: {} },
        { type: "array", label: "Sorted Queries", values: [2, 3, 4, 5], highlights: { 0: "active" } },
      ],
    },
    {
      description: "Query 2: add intervals starting ≤ 2. Heap has [1,4](size 4) and [2,4](size 3). Min = 3.",
      codeHighlightLines: [9, 13],
      structures: [
        { type: "array", label: "Heap (size, end)", values: ["(3, 4)", "(4, 4)"], highlights: { 0: "success" } },
        { type: "variables", label: "Results so far", entries: [{ name: "q=2", value: 3 }] },
      ],
    },
    {
      description: "Process all queries. Remove expired intervals (end < query). Return results in original order.",
      codeHighlightLines: [11, 12, 14],
      structures: [
        { type: "hashmap", label: "Results", entries: [["2", "3"], ["3", "3"], ["4", "1"], ["5", "4"]], highlights: {} },
        { type: "array", label: "Output (original order)", values: [3, 3, 1, 4], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
      ],
    },
  ],
};

export default solution;

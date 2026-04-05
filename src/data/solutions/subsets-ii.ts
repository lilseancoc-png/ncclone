import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Backtracking — Skip Duplicates",
  timeComplexity: "O(n·2ⁿ)",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "Sort input to group duplicates. Use backtracking, skip duplicate choices at same level.",
      codeHighlightLines: [2, 4],
      structures: [
        { type: "array", label: "Sorted nums", values: [1, 2, 2], highlights: {} },
        { type: "array", label: "Result so far", values: ["[]"], highlights: { 0: "success" } },
      ],
    },
    {
      description: "Pick 1 → pick 2 → pick 2: [1,2,2]. Backtrack. Skip second 2 at same level (duplicate).",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "Sorted nums", values: [1, 2, 2], highlights: { 2: "found" } },
        { type: "array", label: "Result so far", values: ["[]", "[1]", "[1,2]", "[1,2,2]"], highlights: { 3: "success" } },
        { type: "variables", label: "State", entries: [{ name: "skip", value: "second 2 at level where first 2 was already used" }] },
      ],
    },
    {
      description: "Complete: [],[1],[1,2],[1,2,2],[2],[2,2]. No duplicate subsets.",
      codeHighlightLines: [13],
      structures: [
        { type: "array", label: "Result", values: ["[]", "[1]", "[1,2]", "[1,2,2]", "[2]", "[2,2]"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Backtracking — Skip Duplicates",
  timeComplexity: "O(2ⁿ)",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "Sort candidates. Skip duplicates at same recursion level. Break early if candidate > remain.",
      codeHighlightLines: [2, 11],
      structures: [
        { type: "array", label: "Sorted candidates", values: [1, 1, 2, 5, 6, 7, 10], highlights: {} },
        { type: "variables", label: "Config", entries: [{ name: "target", value: 8 }] },
      ],
    },
    {
      description: "Find combos summing to 8: [1,1,6], [1,2,5], [1,7], [2,6]. Skip duplicate 1s at same level.",
      codeHighlightLines: [9, 10],
      structures: [
        { type: "array", label: "Building [1,2,5]", values: [1, 2, 5], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "variables", label: "State", entries: [{ name: "remain", value: 0 }, { name: "sum", value: "1+2+5=8 ✓" }] },
      ],
    },
    {
      description: "All valid combinations found. Each candidate used at most once per combination.",
      codeHighlightLines: [17],
      structures: [
        { type: "array", label: "Result", values: ["[1,1,6]", "[1,2,5]", "[1,7]", "[2,6]"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
      ],
    },
  ],
};

export default solution;

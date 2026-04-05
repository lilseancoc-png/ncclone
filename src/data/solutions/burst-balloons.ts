import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Interval DP",
  timeComplexity: "O(n³)",
  spaceComplexity: "O(n²)",

  steps: [
    {
      description: "Add boundary 1s. Think of 'i' as the LAST balloon burst in range (left, right).",
      codeHighlightLines: [2, 5],
      structures: [
        { type: "array", label: "Padded nums", values: [1, 3, 1, 5, 8, 1], highlights: { 0: "checked", 5: "checked" } },
        { type: "variables", label: "State", entries: [{ name: "original", value: "[3,1,5,8]" }, { name: "with borders", value: "[1,3,1,5,8,1]" }] },
      ],
    },
    {
      description: "For each interval, try each balloon as the last to burst. Combine left and right subproblems.",
      codeHighlightLines: [9, 10, 11, 12],
      structures: [
        { type: "variables", label: "Example: interval (0,3)", entries: [{ name: "last=1 (val 3)", value: "1×3×5 + dp[0][1] + dp[1][3]" }, { name: "last=2 (val 1)", value: "1×1×5 + dp[0][2] + dp[2][3]" }] },
      ],
    },
    {
      description: "dp[0][5] = 167. Optimal order: burst 1, then 5, then 3, then 8.",
      codeHighlightLines: [14],
      structures: [
        { type: "array", label: "Original", values: [3, 1, 5, 8], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "max coins", value: 167 }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "2D Dynamic Programming",
  timeComplexity: "O(m·n)",
  spaceComplexity: "O(m·n)",

  steps: [
    {
      description: "dp[i][j] = can first i chars of s1 and first j chars of s2 form first i+j chars of s3?",
      codeHighlightLines: [4, 5],
      structures: [
        { type: "variables", label: "Input", entries: [{ name: "s1", value: "aabcc" }, { name: "s2", value: "dbbca" }, { name: "s3", value: "aadbbcbcac" }] },
        { type: "variables", label: "DP size", entries: [{ name: "rows", value: "6 (s1+1)" }, { name: "cols", value: "6 (s2+1)" }] },
      ],
    },
    {
      description: "Fill DP: dp[i][j] is true if we can take next char from s1 (dp[i-1][j]) or s2 (dp[i][j-1]).",
      codeHighlightLines: [8, 9, 10, 11],
      structures: [
        { type: "array", label: "s3 chars matched", values: ["a", "a", "d", "b", "b", "c", "b", "c", "a", "c"], highlights: { 0: "pointer-i", 1: "pointer-i", 2: "pointer-j" } },
        { type: "variables", label: "DP", entries: [{ name: "dp[2][0]", value: "True (aa from s1)" }, { name: "dp[2][1]", value: "True (aa+d)" }] },
      ],
    },
    {
      description: "dp[5][5] = True → s1 and s2 can interleave to form s3.",
      codeHighlightLines: [12],
      structures: [
        { type: "variables", label: "Result", entries: [{ name: "dp[5][5]", value: "True" }, { name: "interleaves", value: "Yes" }] },
      ],
    },
  ],
};

export default solution;

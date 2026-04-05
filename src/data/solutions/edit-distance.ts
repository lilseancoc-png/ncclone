import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "2D Dynamic Programming",
  timeComplexity: "O(m·n)",
  spaceComplexity: "O(m·n)",

  steps: [
    {
      description: "dp[i][j] = min ops to convert word1[0:i] to word2[0:j]. Base: dp[i][0]=i, dp[0][j]=j.",
      codeHighlightLines: [4, 5, 6, 7],
      structures: [
        { type: "variables", label: "Input", entries: [{ name: "word1", value: "horse" }, { name: "word2", value: "ros" }] },
        { type: "array", label: "Base row (dp[0])", values: [0, 1, 2, 3], highlights: {} },
      ],
    },
    {
      description: "If chars match, no op needed (diagonal). Otherwise, take min of delete, insert, replace + 1.",
      codeHighlightLines: [10, 11, 13],
      structures: [
        { type: "variables", label: "Operations", entries: [{ name: "h→r", value: "replace (1)" }, { name: "hor→ro", value: "delete h, replace o→r (2)" }, { name: "hors→ros", value: "..." }] },
      ],
    },
    {
      description: "dp[5][3] = 3. Convert 'horse' to 'ros' in 3 operations: replace h→r, remove r, remove e.",
      codeHighlightLines: [18],
      structures: [
        { type: "variables", label: "Result", entries: [{ name: "min distance", value: 3 }, { name: "op 1", value: "replace h→r: rorse" }, { name: "op 2", value: "remove r: rose" }, { name: "op 3", value: "remove e: ros" }] },
      ],
    },
  ],
};

export default solution;

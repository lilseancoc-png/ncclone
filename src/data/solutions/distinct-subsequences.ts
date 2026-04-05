import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "2D Dynamic Programming",
  timeComplexity: "O(m·n)",
  spaceComplexity: "O(m·n)",

  steps: [
    {
      description: "dp[i][j] = number of ways to form t[0:j] from s[0:i]. Base: dp[i][0] = 1 (empty t).",
      codeHighlightLines: [4],
      structures: [
        { type: "variables", label: "Input", entries: [{ name: "s", value: "rabbbit" }, { name: "t", value: "rabbit" }] },
        { type: "variables", label: "DP size", entries: [{ name: "rows", value: "8 (s+1)" }, { name: "cols", value: "7 (t+1)" }] },
      ],
    },
    {
      description: "For each cell: always inherit dp[i-1][j] (skip current s char). If chars match, also add dp[i-1][j-1].",
      codeHighlightLines: [7, 8, 9],
      structures: [
        { type: "variables", label: "Key insight", entries: [{ name: "3 b's in s", value: "each 'b' can match different 'b' in t" }, { name: "combinations", value: "3 ways to pick 2 b's from 3" }] },
      ],
    },
    {
      description: "dp[7][6] = 3. Three distinct subsequences of 'rabbbit' that form 'rabbit'.",
      codeHighlightLines: [10],
      structures: [
        { type: "variables", label: "Result", entries: [{ name: "count", value: 3 }, { name: "way 1", value: "ra(bb)bit" }, { name: "way 2", value: "ra(b)b(b)it" }, { name: "way 3", value: "rab(bb)it" }] },
      ],
    },
  ],
};

export default solution;

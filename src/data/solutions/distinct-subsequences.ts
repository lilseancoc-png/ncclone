import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "2D DP",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    code: `def numDistinct(s, t):
    m, n = len(s), len(t)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = 1  # empty t matches any prefix
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[i][j] = dp[i-1][j]  # skip s[i-1]
            if s[i-1] == t[j-1]:
                dp[i][j] += dp[i-1][j-1]  # use s[i-1]
    return dp[m][n]`,
    steps: [
      {
        description:
          "Count distinct subsequences of s that equal t. dp[i][j] = number of ways s[:i] contains t[:j] as a subsequence. For each char in s, we either skip it or use it (if it matches the current char in t).",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "array",
            label: "s",
            values: ["r", "a", "b", "b", "b", "i", "t"],
            highlights: {},
          },
          {
            type: "array",
            label: "t",
            values: ["r", "a", "b", "b", "i", "t"],
            highlights: {},
          },
        ],
      },
      {
        description:
          "Base case: dp[i][0] = 1 (empty t always has 1 match). Fill row by row. dp[1][1]: s[0]='r'==t[0]='r' → dp[0][0]=1. So dp[1][1]=dp[0][1]+1=0+1=1.",
        codeHighlightLines: [6, 7, 8, 9, 10],
        structures: [
          {
            type: "array",
            label: "dp[i][0] (base)",
            values: [1, 1, 1, 1, 1, 1, 1, 1],
            highlights: { 0: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "dp[1][1]", value: 1, highlight: true }],
          },
        ],
      },
      {
        description:
          "Key moment: dp[4][3] — s[:4]='rabb', t[:3]='rab'. s[3]='b'==t[2]='b': dp[4][3] = dp[3][3] + dp[3][2]. Skip the second 'b' (dp[3][3]=1) or use it (dp[3][2]=1). Total = 2. Two ways to form 'rab' from 'rabb'.",
        codeHighlightLines: [8, 9, 10],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "dp[3][3] (skip b)", value: 1 },
              { name: "dp[3][2] (use b)", value: 1 },
              { name: "dp[4][3]", value: 2, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Final: dp[7][6] = 3. There are 3 distinct subsequences of 'rabbbit' that equal 'rabbit'. The three ways correspond to choosing different 'b's from the three consecutive b's.",
        codeHighlightLines: [11],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "return", value: 3, highlight: true },
              { name: "choices", value: "b₁b₂, b₁b₃, b₂b₃" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

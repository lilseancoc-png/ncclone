import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "2D Dynamic Programming",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    code: `def isInterleave(s1, s2, s3):
    m, n = len(s1), len(s2)
    if m + n != len(s3):
        return False
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    for i in range(m + 1):
        for j in range(n + 1):
            if i > 0 and s1[i-1] == s3[i+j-1]:
                dp[i][j] |= dp[i-1][j]
            if j > 0 and s2[j-1] == s3[i+j-1]:
                dp[i][j] |= dp[i][j-1]
    return dp[m][n]`,
    steps: [
      {
        description:
          "Check if s3 is formed by interleaving s1 and s2 (maintaining relative order). dp[i][j] = True if s1[:i] and s2[:j] can interleave to form s3[:i+j]. We can take the next char from either s1 or s2.",
        codeHighlightLines: [1, 2, 3, 4, 5, 6],
        structures: [
          {
            type: "array",
            label: "s1",
            values: ["a", "a", "b"],
            highlights: {},
          },
          {
            type: "array",
            label: "s2",
            values: ["a", "b", "c"],
            highlights: {},
          },
          {
            type: "array",
            label: "s3",
            values: ["a", "a", "b", "a", "b", "c"],
            highlights: {},
          },
        ],
      },
      {
        description:
          "Fill DP table. dp[0][0]=True (empty strings). dp[1][0]: s1[0]='a'==s3[0]='a' and dp[0][0]=True → True. dp[2][0]: s1[1]='a'==s3[1]='a' and dp[1][0]=True → True.",
        codeHighlightLines: [7, 8, 9, 10],
        structures: [
          {
            type: "array",
            label: "dp row 0 (s1 empty)",
            values: ["T", "F", "F", "F"],
            highlights: { 0: "success" },
          },
          {
            type: "array",
            label: "dp row 1 (s1='a')",
            values: ["T", "T", "F", "F"],
            highlights: { 0: "success", 1: "active" },
          },
          {
            type: "array",
            label: "dp row 2 (s1='aa')",
            values: ["T", "T", "T", "F"],
            highlights: { 0: "success" },
          },
        ],
      },
      {
        description:
          "dp[3][3]: Check if s1[:3]+s2[:3] can interleave to form s3[:6]. Through transitions: dp[2][1]→dp[2][2]→dp[2][3]→dp[3][3] or similar valid paths. dp[3][3] = True!",
        codeHighlightLines: [11, 12, 13],
        structures: [
          {
            type: "array",
            label: "dp row 3 (s1='aab')",
            values: ["F", "T", "T", "T"],
            highlights: { 3: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: "True", highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
  steps: [
    {
      description:
        "Find the longest common subsequence of text1=\"abcde\" and text2=\"ace\". We build a 2D DP table where dp[i][j] = LCS length of text1[:i] and text2[:j]. Initialize all to 0.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "text1", values: ["a", "b", "c", "d", "e"] },
        { type: "array", label: "text2", values: ["a", "c", "e"] },
        { type: "array", label: "dp[0] (base)", values: [0, 0, 0, 0] },
        {
          type: "variables",
          entries: [
            { name: "m", value: 5 },
            { name: "n", value: 3 },
          ],
        },
      ],
    },
    {
      description:
        "i=1 (text1[0]='a'): Compare 'a' with each char in text2. text2[0]='a' matches! dp[1][1] = dp[0][0] + 1 = 1. 'b' and 'e' don't match, so we take the max of neighbors.",
      codeHighlightLines: [4, 5, 6, 7],
      structures: [
        { type: "array", label: "text1", values: ["a", "b", "c", "d", "e"], highlights: { 0: "active" } },
        { type: "array", label: "text2", values: ["a", "c", "e"], highlights: { 0: "found" } },
        { type: "array", label: "dp[0]", values: [0, 0, 0, 0] },
        { type: "array", label: "dp[1]", values: [0, 1, 1, 1], highlights: { 1: "success" } },
      ],
    },
    {
      description:
        "i=2 (text1[1]='b'): 'b' doesn't match any character in text2. Each cell takes the max of the cell above or to the left.",
      codeHighlightLines: [8, 9],
      structures: [
        { type: "array", label: "text1", values: ["a", "b", "c", "d", "e"], highlights: { 1: "active" } },
        { type: "array", label: "text2", values: ["a", "c", "e"] },
        { type: "array", label: "dp[1]", values: [0, 1, 1, 1] },
        { type: "array", label: "dp[2]", values: [0, 1, 1, 1], highlights: { 1: "checked", 2: "checked", 3: "checked" } },
      ],
    },
    {
      description:
        "i=3 (text1[2]='c'): text2[1]='c' matches! dp[3][2] = dp[2][1] + 1 = 2. The LCS so far includes 'a' and 'c'.",
      codeHighlightLines: [6, 7],
      structures: [
        { type: "array", label: "text1", values: ["a", "b", "c", "d", "e"], highlights: { 2: "active" } },
        { type: "array", label: "text2", values: ["a", "c", "e"], highlights: { 1: "found" } },
        { type: "array", label: "dp[2]", values: [0, 1, 1, 1] },
        { type: "array", label: "dp[3]", values: [0, 1, 2, 2], highlights: { 2: "success" } },
      ],
    },
    {
      description:
        "i=4 (text1[3]='d'): No match with any text2 character. Values carry forward from neighbors.",
      codeHighlightLines: [8, 9],
      structures: [
        { type: "array", label: "text1", values: ["a", "b", "c", "d", "e"], highlights: { 3: "active" } },
        { type: "array", label: "text2", values: ["a", "c", "e"] },
        { type: "array", label: "dp[3]", values: [0, 1, 2, 2] },
        { type: "array", label: "dp[4]", values: [0, 1, 2, 2], highlights: { 1: "checked", 2: "checked", 3: "checked" } },
      ],
    },
    {
      description:
        "i=5 (text1[4]='e'): text2[2]='e' matches! dp[5][3] = dp[4][2] + 1 = 3. The LCS now includes 'a', 'c', 'e'.",
      codeHighlightLines: [6, 7],
      structures: [
        { type: "array", label: "text1", values: ["a", "b", "c", "d", "e"], highlights: { 4: "active" } },
        { type: "array", label: "text2", values: ["a", "c", "e"], highlights: { 2: "found" } },
        { type: "array", label: "dp[4]", values: [0, 1, 2, 2] },
        { type: "array", label: "dp[5]", values: [0, 1, 2, 3], highlights: { 3: "success" } },
      ],
    },
    {
      description:
        "Return dp[5][3] = 3. The longest common subsequence of \"abcde\" and \"ace\" is \"ace\" with length 3.",
      codeHighlightLines: [10],
      structures: [
        { type: "array", label: "text1", values: ["a", "b", "c", "d", "e"], highlights: { 0: "success", 2: "success", 4: "success" } },
        { type: "array", label: "text2", values: ["a", "c", "e"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: 3, highlight: true }] },
      ],
    },
  ],
};

export default solution;

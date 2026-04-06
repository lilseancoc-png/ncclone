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
        'Find the LCS of text1="abcde" and text2="ace". Build a DP table where dp[i][j] = LCS length of text1[:i] and text2[:j].',
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "text1", values: ["a", "b", "c", "d", "e"] },
        { type: "array", label: "text2", values: ["a", "c", "e"] },
        {
          type: "matrix",
          label: "dp table (initialized to 0)",
          colHeaders: ["", "a", "c", "e"],
          rowHeaders: ["", "a", "b", "c", "d", "e"],
          rows: [
            [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
            [{ value: 0 }, { value: "?" }, { value: "?" }, { value: "?" }],
            [{ value: 0 }, { value: "?" }, { value: "?" }, { value: "?" }],
            [{ value: 0 }, { value: "?" }, { value: "?" }, { value: "?" }],
            [{ value: 0 }, { value: "?" }, { value: "?" }, { value: "?" }],
            [{ value: 0 }, { value: "?" }, { value: "?" }, { value: "?" }],
          ],
        },
      ],
    },
    {
      description:
        "i=1 (a): text1[0]='a' matches text2[0]='a' → dp[1][1] = dp[0][0]+1 = 1. No match with 'c','e' → carry forward.",
      codeHighlightLines: [4, 5, 6, 7],
      structures: [
        {
          type: "matrix",
          label: "dp — row 1 filled",
          colHeaders: ["", "a", "c", "e"],
          rowHeaders: ["", "a", "b", "c", "d", "e"],
          rows: [
            [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
            [{ value: 0 }, { value: 1, highlight: "success" }, { value: 1 }, { value: 1 }],
            [{ value: 0 }, { value: "?" }, { value: "?" }, { value: "?" }],
            [{ value: 0 }, { value: "?" }, { value: "?" }, { value: "?" }],
            [{ value: 0 }, { value: "?" }, { value: "?" }, { value: "?" }],
            [{ value: 0 }, { value: "?" }, { value: "?" }, { value: "?" }],
          ],
        },
      ],
    },
    {
      description:
        "i=2 (b): No match with any text2 char. i=3 (c): text2[1]='c' matches → dp[3][2] = dp[2][1]+1 = 2. LCS so far: 'a','c'.",
      codeHighlightLines: [6, 7],
      structures: [
        {
          type: "matrix",
          label: "dp — rows 2-3 filled",
          colHeaders: ["", "a", "c", "e"],
          rowHeaders: ["", "a", "b", "c", "d", "e"],
          rows: [
            [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
            [{ value: 0 }, { value: 1 }, { value: 1 }, { value: 1 }],
            [{ value: 0 }, { value: 1 }, { value: 1 }, { value: 1 }],
            [{ value: 0 }, { value: 1 }, { value: 2, highlight: "success" }, { value: 2 }],
            [{ value: 0 }, { value: "?" }, { value: "?" }, { value: "?" }],
            [{ value: 0 }, { value: "?" }, { value: "?" }, { value: "?" }],
          ],
        },
      ],
    },
    {
      description:
        "i=4 (d): No match. i=5 (e): text2[2]='e' matches → dp[5][3] = dp[4][2]+1 = 3. LCS = 'ace'.",
      codeHighlightLines: [6, 7],
      structures: [
        {
          type: "matrix",
          label: "dp — complete",
          colHeaders: ["", "a", "c", "e"],
          rowHeaders: ["", "a", "b", "c", "d", "e"],
          rows: [
            [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
            [{ value: 0 }, { value: 1, highlight: "success" }, { value: 1 }, { value: 1 }],
            [{ value: 0 }, { value: 1 }, { value: 1 }, { value: 1 }],
            [{ value: 0 }, { value: 1 }, { value: 2, highlight: "success" }, { value: 2 }],
            [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 2 }],
            [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3, highlight: "success" }],
          ],
        },
      ],
    },
    {
      description:
        'Return dp[5][3] = 3. The LCS of "abcde" and "ace" is "ace" with length 3.',
      codeHighlightLines: [10],
      structures: [
        { type: "array", label: "text1 (matched)", values: ["a", "b", "c", "d", "e"], highlights: { 0: "success", 2: "success", 4: "success" } },
        { type: "array", label: "text2 (matched)", values: ["a", "c", "e"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "LCS", value: '"ace"' }, { name: "return", value: 3, highlight: true }] },
      ],
    },
  ],
};

export default solution;

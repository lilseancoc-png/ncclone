import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def uniquePaths(m, n):
    dp = [[1] * n for _ in range(m)]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]`,
  steps: [
    {
      description:
        "We want to count all unique paths from top-left to bottom-right of a 3x3 grid. We can only move right or down. We'll use a 2D DP table where dp[i][j] = number of ways to reach cell (i, j).",
      codeHighlightLines: [1],
      structures: [
        {
          type: "variables",
          entries: [
            { name: "m", value: 3 },
            { name: "n", value: 3 },
          ],
        },
        { type: "array", label: "Grid (3x3)", values: ["?", "?", "?", "?", "?", "?", "?", "?", "?"] },
      ],
    },
    {
      description:
        "Initialize the DP table. The first row and first column are all 1s because there's only one way to reach any cell along the edges (go all right, or go all down).",
      codeHighlightLines: [2],
      structures: [
        { type: "array", label: "Row 0", values: [1, 1, 1], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "Row 1", values: [1, "?", "?"], highlights: { 0: "success" } },
        { type: "array", label: "Row 2", values: [1, "?", "?"], highlights: { 0: "success" } },
      ],
    },
    {
      description:
        "Start filling in. i=1, j=1: dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2. There are 2 ways to reach the center cell.",
      codeHighlightLines: [3, 4, 5],
      structures: [
        { type: "array", label: "Row 0", values: [1, 1, 1] },
        { type: "array", label: "Row 1", values: [1, 2, "?"], highlights: { 1: "active" } },
        { type: "array", label: "Row 2", values: [1, "?", "?"] },
        {
          type: "variables",
          entries: [
            { name: "i", value: 1 },
            { name: "j", value: 1 },
            { name: "dp[0][1] + dp[1][0]", value: "1 + 1 = 2", highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "i=1, j=2: dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3. Three paths reach this cell.",
      codeHighlightLines: [5],
      structures: [
        { type: "array", label: "Row 0", values: [1, 1, 1] },
        { type: "array", label: "Row 1", values: [1, 2, 3], highlights: { 2: "active" } },
        { type: "array", label: "Row 2", values: [1, "?", "?"] },
        {
          type: "variables",
          entries: [
            { name: "i", value: 1 },
            { name: "j", value: 2 },
            { name: "dp[0][2] + dp[1][1]", value: "1 + 2 = 3", highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "i=2, j=1: dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3. Three paths reach this cell as well.",
      codeHighlightLines: [5],
      structures: [
        { type: "array", label: "Row 0", values: [1, 1, 1] },
        { type: "array", label: "Row 1", values: [1, 2, 3] },
        { type: "array", label: "Row 2", values: [1, 3, "?"], highlights: { 1: "active" } },
        {
          type: "variables",
          entries: [
            { name: "i", value: 2 },
            { name: "j", value: 1 },
            { name: "dp[1][1] + dp[2][0]", value: "2 + 1 = 3", highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "i=2, j=2: dp[2][2] = dp[1][2] + dp[2][1] = 3 + 3 = 6. The bottom-right corner has 6 unique paths.",
      codeHighlightLines: [5],
      structures: [
        { type: "array", label: "Row 0", values: [1, 1, 1] },
        { type: "array", label: "Row 1", values: [1, 2, 3] },
        { type: "array", label: "Row 2", values: [1, 3, 6], highlights: { 2: "found" } },
        {
          type: "variables",
          entries: [
            { name: "i", value: 2 },
            { name: "j", value: 2 },
            { name: "dp[1][2] + dp[2][1]", value: "3 + 3 = 6", highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Return dp[2][2] = 6. There are 6 unique paths from the top-left to the bottom-right of a 3x3 grid.",
      codeHighlightLines: [6],
      structures: [
        { type: "array", label: "Row 0", values: [1, 1, 1], highlights: { 0: "success" } },
        { type: "array", label: "Row 1", values: [1, 2, 3] },
        { type: "array", label: "Row 2", values: [1, 3, 6], highlights: { 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: 6, highlight: true }] },
      ],
    },
  ],
};

export default solution;

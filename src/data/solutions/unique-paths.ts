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
        "Count unique paths from top-left to bottom-right of a 3x3 grid, moving only right or down. Use DP where dp[i][j] = number of paths to reach cell (i,j).",
      codeHighlightLines: [1],
      structures: [
        {
          type: "variables",
          entries: [{ name: "m", value: 3 }, { name: "n", value: 3 }],
        },
      ],
    },
    {
      description:
        "Initialize: first row and first column are all 1s — only one way to reach any edge cell (go all right, or all down).",
      codeHighlightLines: [2],
      structures: [
        {
          type: "matrix",
          label: "dp table",
          rows: [
            [{ value: 1, highlight: "success" }, { value: 1, highlight: "success" }, { value: 1, highlight: "success" }],
            [{ value: 1, highlight: "success" }, { value: "?", highlight: "active" }, { value: "?" }],
            [{ value: 1, highlight: "success" }, { value: "?" }, { value: "?" }],
          ],
          colHeaders: [0, 1, 2],
          rowHeaders: [0, 1, 2],
        },
      ],
    },
    {
      description:
        "dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2. Two ways to reach center: right-down or down-right.",
      codeHighlightLines: [3, 4, 5],
      structures: [
        {
          type: "matrix",
          label: "dp table",
          rows: [
            [{ value: 1 }, { value: 1, highlight: "checked" }, { value: 1 }],
            [{ value: 1, highlight: "checked" }, { value: 2, highlight: "active" }, { value: "?" }],
            [{ value: 1 }, { value: "?" }, { value: "?" }],
          ],
          colHeaders: [0, 1, 2],
          rowHeaders: [0, 1, 2],
        },
        { type: "variables", entries: [{ name: "dp[0][1] + dp[1][0]", value: "1 + 1 = 2", highlight: true }] },
      ],
    },
    {
      description:
        "dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3. dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3.",
      codeHighlightLines: [5],
      structures: [
        {
          type: "matrix",
          label: "dp table",
          rows: [
            [{ value: 1 }, { value: 1 }, { value: 1, highlight: "checked" }],
            [{ value: 1 }, { value: 2, highlight: "checked" }, { value: 3, highlight: "active" }],
            [{ value: 1, highlight: "checked" }, { value: 3, highlight: "active" }, { value: "?" }],
          ],
          colHeaders: [0, 1, 2],
          rowHeaders: [0, 1, 2],
        },
      ],
    },
    {
      description:
        "dp[2][2] = dp[1][2] + dp[2][1] = 3 + 3 = 6. Return 6 — there are 6 unique paths.",
      codeHighlightLines: [5, 6],
      structures: [
        {
          type: "matrix",
          label: "dp table — complete",
          rows: [
            [{ value: 1, highlight: "path" }, { value: 1 }, { value: 1 }],
            [{ value: 1 }, { value: 2 }, { value: 3, highlight: "checked" }],
            [{ value: 1 }, { value: 3, highlight: "checked" }, { value: 6, highlight: "success" }],
          ],
          colHeaders: [0, 1, 2],
          rowHeaders: [0, 1, 2],
        },
        { type: "variables", entries: [{ name: "return", value: 6, highlight: true }] },
      ],
    },
  ],
};

export default solution;

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
          "Count how many distinct subsequences of s equal t. A subsequence keeps relative order but can skip characters. For example, 'rabbbit' contains 'rabbit' as a subsequence in multiple ways (by choosing different b's). dp[i][j] = number of ways to form t[:j] from s[:i]. At each character in s, we have a choice: skip it (dp[i-1][j]) or use it if it matches t[j-1] (add dp[i-1][j-1]). s='rabbbit', t='rabbit'.",
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
          { type: "variables", entries: [{ name: "dp[i][j]", value: "# ways s[:i] contains t[:j]" }, { name: "choice per char", value: "skip it OR use it (if match)" }] },
        ],
      },
      {
        description:
          "Base case: dp[i][0] = 1 for all i — there's exactly one way to form an empty string (take nothing). dp[0][j] = 0 for j>0 — can't form a non-empty target from an empty source. First interesting cell: dp[1][1] — can s[:1]='r' form t[:1]='r'? s[0]='r' matches t[0]='r', so dp[1][1] = dp[0][1] (skip) + dp[0][0] (use) = 0 + 1 = 1. One way: use the 'r'. dp[2][2]: s[1]='a' matches t[1]='a', dp[2][2] = dp[1][2] + dp[1][1] = 0 + 1 = 1.",
        codeHighlightLines: [4, 5, 6, 7, 8, 9, 10],
        structures: [
          {
            type: "array",
            label: "dp[i][0] (base: empty t)",
            values: [1, 1, 1, 1, 1, 1, 1, 1],
            highlights: { 0: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "dp[1][1] ('r'→'r')", value: "0+1 = 1", highlight: true }, { name: "dp[2][2] ('ra'→'ra')", value: "0+1 = 1" }],
          },
        ],
      },
      {
        description:
          "The critical moment — the three b's. dp[3][3]: s[:3]='rab', t[:3]='rab'. s[2]='b'==t[2]='b': dp[3][3] = dp[2][3](skip) + dp[2][2](use) = 0+1 = 1. dp[4][3]: s[:4]='rabb', t[:3]='rab'. s[3]='b'==t[2]='b': dp[4][3] = dp[3][3](skip this b) + dp[3][2](use this b) = 1+1 = 2. Now there are 2 ways to form 'rab' — using the first b or the second b. dp[5][3]: s[:5]='rabbb', similarly dp[5][3] = dp[4][3] + dp[4][2] = 2+1 = 3. Three b's give 3 ways to pick one b for position 3 of 'rabbit'.",
        codeHighlightLines: [8, 9, 10],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "dp[3][3] ('rab'→'rab')", value: "1 way" },
              { name: "dp[4][3] ('rabb'→'rab')", value: "2 ways", highlight: true },
              { name: "dp[5][3] ('rabbb'→'rab')", value: "3 ways", highlight: true },
              { name: "insight", value: "3 b's → C(3,1) = 3 ways to pick one b" },
            ],
          },
        ],
      },
      {
        description:
          "Continue filling the table. For the second 'b' in 'rabbit' (t[3]), the choices compound: picking 2 out of 3 b's gives C(3,2)=3 combinations. Final answer: dp[7][6] = 3. The three distinct subsequences of 'rabbbit' that equal 'rabbit' correspond to choosing b₁b₂, b₁b₃, or b₂b₃ from the three b's. Time: O(m×n). Space: O(m×n), reducible to O(n) using a single row.",
        codeHighlightLines: [11],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "return", value: 3, highlight: true },
              { name: "3 ways", value: "ra(b₁b₂)it, ra(b₁b₃)it, ra(b₂b₃)it" },
              { name: "Time", value: "O(m × n)" },
              { name: "Space", value: "O(m × n)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

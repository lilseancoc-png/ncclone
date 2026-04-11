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
          "Count how many distinct subsequences of s equal t. A subsequence keeps relative order but can skip characters. dp[i][j] = number of ways to form t[:j] from s[:i]. At each character in s, two choices: skip it (always available) or use it (only if it matches the current target char). s='rabbbit', t='rabbit'.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "s", values: ["r", "a", "b", "b", "b", "i", "t"], highlights: {} },
          { type: "array", label: "t", values: ["r", "a", "b", "b", "i", "t"], highlights: {} },
          { type: "variables", entries: [{ name: "dp[i][j]", value: "# ways s[:i] contains t[:j]" }, { name: "per char", value: "skip (dp[i-1][j]) or use if match (+dp[i-1][j-1])" }] },
        ],
      },
      {
        description:
          "Base cases: dp[i][0] = 1 for all i — exactly one way to form empty string (take nothing). dp[0][j] = 0 for j>0 — can't form non-empty target from empty source. First cells: dp[1][1]: s[0]='r' matches t[0]='r'. dp[1][1] = dp[0][1] (skip r) + dp[0][0] (use r) = 0 + 1 = 1. dp[2][2]: s[1]='a' matches t[1]='a'. dp[2][2] = dp[1][2] + dp[1][1] = 0 + 1 = 1.",
        codeHighlightLines: [4, 5, 6, 7, 8, 9, 10],
        structures: [
          { type: "array", label: "dp column 0 (empty t)", values: [1, 1, 1, 1, 1, 1, 1, 1], highlights: { 0: "success" } },
          { type: "variables", entries: [{ name: "dp[1][1] ('r'→'r')", value: "0 + 1 = 1", highlight: true }, { name: "dp[2][2] ('ra'→'ra')", value: "0 + 1 = 1" }] },
        ],
      },
      {
        description:
          "The three b's — where it gets interesting. dp[3][3]: s[2]='b' matches t[2]='b'. dp[3][3] = dp[2][3](skip) + dp[2][2](use) = 0 + 1 = 1. One way to form 'rab': use b₁. dp[4][3]: s[3]='b' matches t[2]='b'. dp[4][3] = dp[3][3](skip b₂) + dp[3][2](use b₂) = 1 + 1 = 2. Two ways to form 'rab': use b₁ or b₂.",
        codeHighlightLines: [8, 9, 10],
        structures: [
          { type: "array", label: "s", values: ["r", "a", "b", "b", "b", "i", "t"], highlights: { 2: "active", 3: "active" } },
          { type: "variables", entries: [{ name: "dp[3][3] ('rab' using b₁)", value: "1 way" }, { name: "dp[4][3] ('rab' using b₁ or b₂)", value: "2 ways", highlight: true }, { name: "skip vs use", value: "skip b₂ = 1 way, use b₂ = 1 way → total 2" }] },
        ],
      },
      {
        description:
          "dp[5][3]: s[4]='b' matches t[2]='b'. dp[5][3] = dp[4][3](skip b₃) + dp[4][2](use b₃) = 2 + 1 = 3. Three ways to pick one 'b' for position 3: b₁, b₂, or b₃. For dp[5][4] (need 'rabb'): picking 2 b's from 3 gives C(3,2) = 3 ways. dp[5][4] = 3. The counts naturally compute combinatorial choices!",
        codeHighlightLines: [8, 9, 10],
        structures: [
          { type: "array", label: "s", values: ["r", "a", "b", "b", "b", "i", "t"], highlights: { 2: "success", 3: "success", 4: "success" } },
          { type: "variables", entries: [{ name: "dp[5][3] ('rab___')", value: "3 ways (pick 1 of 3 b's)", highlight: true }, { name: "dp[5][4] ('rabb__')", value: "3 ways (pick 2 of 3 b's)", highlight: true }, { name: "C(3,1)=3, C(3,2)=3", value: "combinatorics emerge from DP!" }] },
        ],
      },
      {
        description:
          "Continue filling: dp[6][5] handles 'i', dp[7][6] handles 't'. Final answer: dp[7][6] = 3. The three distinct subsequences: ra(b₁b₂)it, ra(b₁b₃)it, ra(b₂b₃)it — choosing 2 of the 3 b's. Time: O(m×n). Space: O(m×n), reducible to O(n) since each row only uses the previous row.",
        codeHighlightLines: [11],
        structures: [
          { type: "variables", entries: [{ name: "return", value: 3, highlight: true }, { name: "subsequence 1", value: "ra(b₁b₂)it" }, { name: "subsequence 2", value: "ra(b₁b₃)it" }, { name: "subsequence 3", value: "ra(b₂b₃)it" }, { name: "Time", value: "O(m × n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

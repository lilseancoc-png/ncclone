import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "2D DP",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    code: `def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # delete
                    dp[i][j-1],    # insert
                    dp[i-1][j-1]   # replace
                )
    return dp[m][n]`,
    steps: [
      {
        description:
          "Find the minimum number of single-character operations (insert, delete, or replace) to convert word1 into word2. This is the classic 'edit distance' (Levenshtein distance) problem, foundational in spell checkers, DNA analysis, and diff algorithms. dp[i][j] = min operations to convert word1[:i] to word2[:j]. At each position, if characters match, no operation needed. Otherwise, try all three operations and take the minimum. word1='horse', word2='ros'.",
        codeHighlightLines: [1, 2, 3, 4, 5, 6, 7],
        structures: [
          {
            type: "array",
            label: "word1",
            values: ["h", "o", "r", "s", "e"],
            highlights: {},
          },
          {
            type: "array",
            label: "word2",
            values: ["r", "o", "s"],
            highlights: {},
          },
          { type: "variables", entries: [{ name: "3 operations", value: "insert, delete, replace" }] },
        ],
      },
      {
        description:
          "Base cases: dp[i][0] = i (converting word1[:i] to empty string requires i deletions). dp[0][j] = j (converting empty to word2[:j] requires j insertions). First interesting cell: dp[1][1] ('h' → 'r'). Characters differ, so try: delete 'h' = 1 + dp[0][1] = 2. Insert 'r' before 'h' = 1 + dp[1][0] = 2. Replace 'h' with 'r' = 1 + dp[0][0] = 1. Best: replace, dp[1][1] = 1. The three transitions correspond to the three operations: dp[i-1][j]=delete, dp[i][j-1]=insert, dp[i-1][j-1]=replace.",
        codeHighlightLines: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        structures: [
          {
            type: "array",
            label: "dp row 0 ('' → word2 prefix)",
            values: [0, 1, 2, 3],
            highlights: {},
          },
          {
            type: "array",
            label: "dp row 1 ('h' → word2 prefix)",
            values: [1, 1, 2, 3],
            highlights: { 1: "active" },
          },
          { type: "variables", entries: [{ name: "dp[1][1]", value: "min(2, 2, 1) = 1 (replace h→r)", highlight: true }] },
        ],
      },
      {
        description:
          "dp[2][2]: word1[1]='o' == word2[1]='o' — characters match! No operation needed: dp[2][2] = dp[1][1] = 1. A matching character is free — we just inherit the cost from the subproblem without both characters. dp[3][3]: word1[2]='r' ≠ word2[2]='s'. Try: delete = dp[2][3] = 2, insert = dp[3][2] = 2, replace = dp[2][2] = 1. Best: replace 'r' with 's', dp[3][3] = 1+1 = 2.",
        codeHighlightLines: [10, 11, 12, 13, 14, 15, 16, 17],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "dp[2][2] ('ho'→'ro')", value: "1 (o matches — free!)", highlight: true },
              { name: "dp[3][3] ('hor'→'ros')", value: "2 (replace r→s)", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Continue filling the table. dp[5][3] = 3: convert 'horse' to 'ros' in exactly 3 operations. One optimal sequence: replace 'h'→'r' (horse→rorse), delete 'r' (rorse→rose), delete 'e' (rose→ros). Multiple optimal paths may exist — the DP guarantees we find the minimum count. Time: O(m×n). Space: O(m×n), reducible to O(min(m,n)) with row optimization since each cell only depends on the current and previous rows.",
        codeHighlightLines: [18],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "return", value: 3, highlight: true },
              { name: "one path", value: "horse → rorse → rose → ros" },
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

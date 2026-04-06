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
          "Find the minimum number of operations (insert, delete, replace) to convert word1 to word2. dp[i][j] = min ops to convert word1[:i] to word2[:j]. Base cases: converting to/from empty string costs i or j operations.",
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
        ],
      },
      {
        description:
          "Base cases: dp[i][0] = i (delete all), dp[0][j] = j (insert all). dp[1][1]: 'h'!='r' → 1+min(dp[0][1], dp[1][0], dp[0][0]) = 1+min(1,1,0) = 1 (replace 'h' with 'r').",
        codeHighlightLines: [4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16],
        structures: [
          {
            type: "array",
            label: "dp row 0",
            values: [0, 1, 2, 3],
            highlights: {},
          },
          {
            type: "array",
            label: "dp row 1 (h)",
            values: [1, 1, "?", "?"],
            highlights: { 1: "active" },
          },
        ],
      },
      {
        description:
          "dp[2][2]: word1[1]='o'==word2[1]='o' → dp[1][1]=1. Characters match, no operation needed! dp[3][3]: word1[2]='r'!=word2[2]='s' → 1+min(dp[2][3], dp[3][2], dp[2][2]) = 1+min(2,2,1) = 2.",
        codeHighlightLines: [10, 11],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "dp[2][2] ('ho'→'ro')", value: 1, highlight: true },
              { name: "dp[3][3] ('hor'→'ros')", value: 2, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "dp[5][3] = 3. Convert 'horse' to 'ros' in 3 operations: replace 'h'→'r', delete 'r', delete 'e'. Or equivalently: other sequences of 3 ops. The DP explores all possibilities optimally.",
        codeHighlightLines: [17, 18],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "return", value: 3, highlight: true },
              { name: "operations", value: "replace h→r, delete r, delete e" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

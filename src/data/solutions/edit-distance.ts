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
          "Find the minimum number of operations (insert, delete, replace) to convert word1 into word2. This is the Levenshtein distance — foundational in spell checkers, DNA alignment, and diff algorithms. dp[i][j] = min ops to convert word1[:i] to word2[:j]. word1='horse', word2='ros'.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "word1", values: ["h", "o", "r", "s", "e"] },
          { type: "array", label: "word2", values: ["r", "o", "s"] },
          { type: "variables", entries: [{ name: "3 operations", value: "insert, delete, replace" }] },
        ],
      },
      {
        description:
          "Base cases: dp[i][0] = i (delete all i characters from word1 to get empty string). dp[0][j] = j (insert j characters into empty string to get word2[:j]). These represent the trivial cases: converting to/from an empty string.",
        codeHighlightLines: [4, 5, 6, 7],
        structures: [
          { type: "array", label: "dp col 0 (→ empty)", values: [0, 1, 2, 3, 4, 5], highlights: { 0: "success" } },
          { type: "array", label: "dp row 0 (empty →)", values: [0, 1, 2, 3], highlights: { 0: "success" } },
          { type: "variables", entries: [{ name: "dp[3][0]=3", value: "delete h,o,r → empty" }, { name: "dp[0][2]=2", value: "insert r,o → 'ro'" }] },
        ],
      },
      {
        description:
          "Fill interior cells. dp[1][1]: word1[0]='h' vs word2[0]='r' — differ. Three choices: delete 'h' = 1+dp[0][1] = 2. Insert 'r' = 1+dp[1][0] = 2. Replace 'h'→'r' = 1+dp[0][0] = 1. Best: replace, dp[1][1]=1. dp[2][2]: word1[1]='o' == word2[1]='o' — match! Free: dp[2][2] = dp[1][1] = 1. Matching characters cost nothing.",
        codeHighlightLines: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        structures: [
          {
            type: "array",
            label: "dp row 1 ('h' → word2[:j])",
            values: [1, 1, 2, 3],
            highlights: { 1: "active" },
          },
          {
            type: "array",
            label: "dp row 2 ('ho' → word2[:j])",
            values: [2, 2, 1, 2],
            highlights: { 2: "active" },
          },
          { type: "variables", entries: [{ name: "dp[1][1]", value: "1 (replace h→r)", highlight: true }, { name: "dp[2][2]", value: "1 (o==o, free!)", highlight: true }] },
        ],
      },
      {
        description:
          "dp[3][3]: word1[2]='r' vs word2[2]='s' — differ. Delete 'r': 1+dp[2][3]=3. Insert 's': 1+dp[3][2]=3. Replace 'r'→'s': 1+dp[2][2]=2. Best: replace, dp[3][3]=2. Each cell looks at three neighbors: dp[i-1][j] (delete from word1), dp[i][j-1] (insert into word1), dp[i-1][j-1] (replace or free match).",
        codeHighlightLines: [12, 13, 14, 15, 16, 17],
        structures: [
          {
            type: "array",
            label: "dp row 3 ('hor' → word2[:j])",
            values: [3, 3, 2, 2],
            highlights: { 3: "active" },
          },
          { type: "variables", entries: [{ name: "dp[3][3]", value: "2 (replace r→s)", highlight: true }, { name: "transitions", value: "delete=↑, insert=←, replace=↖" }] },
        ],
      },
      {
        description:
          "Continue filling. dp[5][3] = 3: convert 'horse' → 'ros' in 3 operations. One optimal path: replace 'h'→'r' (horse→rorse), delete 'r' (rorse→rose), delete 'e' (rose→ros). Multiple optimal sequences may exist — the DP finds the minimum count. Time: O(m×n). Space: O(m×n), reducible to O(min(m,n)) since each row only depends on the previous row.",
        codeHighlightLines: [18],
        structures: [
          {
            type: "array",
            label: "dp row 5 ('horse' → word2[:j])",
            values: [5, 4, 4, 3],
            highlights: { 3: "success" },
          },
          { type: "variables", entries: [{ name: "return", value: 3, highlight: true }, { name: "one path", value: "horse → rorse → rose → ros" }, { name: "Time", value: "O(m × n)" }, { name: "Space", value: "O(m × n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

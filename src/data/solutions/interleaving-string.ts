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
          "Check if s3 is formed by interleaving s1 and s2 while maintaining the relative order of characters from each string. Think of it as two streams merging: at each position in s3, the character must come from either s1 or s2 (at the current position in that string). dp[i][j] = True means the first i chars of s1 and first j chars of s2 can interleave to form the first i+j chars of s3. Quick check: if len(s1) + len(s2) ≠ len(s3), immediately return False. s1='aab', s2='abc', s3='aababc'.",
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
            label: "s3 (target interleaving)",
            values: ["a", "a", "b", "a", "b", "c"],
            highlights: {},
          },
          { type: "variables", entries: [{ name: "dp[i][j]", value: "can s1[:i] + s2[:j] form s3[:i+j]?" }] },
        ],
      },
      {
        description:
          "Base cases and first rows. dp[0][0]=True (empty strings form empty s3). First column (only using s1): dp[1][0]: s1[0]='a' == s3[0]='a' and dp[0][0]=True → True. dp[2][0]: s1[1]='a' == s3[1]='a' and dp[1][0]=True → True. dp[3][0]: s1[2]='b' vs s3[2]='b', True. First row (only using s2): dp[0][1]: s2[0]='a' vs s3[0]='a', True. dp[0][2]: s2[1]='b' vs s3[1]='a' — mismatch! dp[0][2]=False. Without interleaving from s1, s2 alone can't form s3 past position 1.",
        codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12, 13],
        structures: [
          {
            type: "array",
            label: "dp row 0 (no s1 chars used)",
            values: ["T", "T", "F", "F"],
            highlights: { 0: "success", 1: "success" },
          },
          {
            type: "array",
            label: "dp row 1 (s1='a')",
            values: ["T", "T", "T", "F"],
            highlights: { 0: "success", 1: "active" },
          },
          {
            type: "array",
            label: "dp row 2 (s1='aa')",
            values: ["T", "T", "T", "T"],
            highlights: { 0: "success", 3: "active" },
          },
        ],
      },
      {
        description:
          "Each cell dp[i][j] has two possible transitions: (1) Take from s1: if s1[i-1] == s3[i+j-1] and dp[i-1][j] is True. (2) Take from s2: if s2[j-1] == s3[i+j-1] and dp[i][j-1] is True. For dp[2][2]: we need s3[3]='a'. From s1: s1[1]='a'=='a' and dp[1][2]=True → True! The path represents choosing characters like: s1,s1,s2,s1,s2,s2 = a,a,b,a,b,c → 'aababc'. dp[3][3]: s3[5]='c'. From s2: s2[2]='c'=='c' and dp[3][2]=True → True! Result: True — s3 IS a valid interleaving.",
        codeHighlightLines: [8, 9, 10, 11, 12, 13],
        structures: [
          {
            type: "array",
            label: "dp row 3 (s1='aab')",
            values: ["T", "T", "T", "T"],
            highlights: { 3: "success" },
          },
          {
            type: "variables",
            entries: [
              { name: "dp[3][3]", value: "True", highlight: true },
              { name: "one valid path", value: "s1,s1,s2,s1,s2,s2 → aababc" },
              { name: "Time", value: "O(m × n)" },
              { name: "Space", value: "O(m × n), reducible to O(n)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

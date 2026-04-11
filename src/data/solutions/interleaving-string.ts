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
          "Check if s3 is formed by interleaving s1 and s2 while maintaining the relative order of characters from each string. At each position in s3, the character must come from either s1 or s2. dp[i][j] = True means the first i chars of s1 and first j chars of s2 can form the first i+j chars of s3. First check: len(s1) + len(s2) must equal len(s3). s1='aab', s2='abc', s3='aababc'.",
        codeHighlightLines: [1, 2, 3, 4, 5, 6],
        structures: [
          { type: "array", label: "s1", values: ["a", "a", "b"] },
          { type: "array", label: "s2", values: ["a", "b", "c"] },
          { type: "array", label: "s3 (target)", values: ["a", "a", "b", "a", "b", "c"] },
          { type: "variables", entries: [{ name: "dp[i][j]", value: "can s1[:i] + s2[:j] form s3[:i+j]?" }] },
        ],
      },
      {
        description:
          "Base case: dp[0][0] = True (empty strings form empty s3). Fill first column (only using s1, j=0): dp[1][0]: s1[0]='a' == s3[0]='a' and dp[0][0]=True → True. dp[2][0]: s1[1]='a' == s3[1]='a' and dp[1][0]=True → True. dp[3][0]: s1[2]='b' == s3[2]='b' and dp[2][0]=True → True. All of s1 alone can form the prefix 'aab' of s3.",
        codeHighlightLines: [6, 7, 8, 9, 10],
        structures: [
          {
            type: "array",
            label: "dp column 0 (only s1 used)",
            values: ["T", "T", "T", "T"],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success" },
          },
          { type: "variables", entries: [{ name: "s1[:3]", value: "'aab'" }, { name: "s3[:3]", value: "'aab' — match!", highlight: true }] },
        ],
      },
      {
        description:
          "Fill first row (only using s2, i=0): dp[0][1]: s2[0]='a' == s3[0]='a' and dp[0][0]=True → True. dp[0][2]: s2[1]='b' == s3[1]='a'? No — 'b' ≠ 'a'. dp[0][2]=False. Without mixing in s1, s2 alone can't form s3 past position 1. All remaining first-row cells stay False.",
        codeHighlightLines: [7, 8, 11, 12],
        structures: [
          {
            type: "array",
            label: "dp row 0 (only s2 used)",
            values: ["T", "T", "F", "F"],
            highlights: { 0: "success", 1: "success" },
          },
          { type: "variables", entries: [{ name: "s2[:1]", value: "'a'" }, { name: "s3[:1]", value: "'a' — match" }, { name: "s2[1]='b' vs s3[1]='a'", value: "mismatch!" }] },
        ],
      },
      {
        description:
          "Fill interior cells. Each dp[i][j] checks two transitions: (1) Take from s1: s1[i-1]==s3[i+j-1] and dp[i-1][j]. (2) Take from s2: s2[j-1]==s3[i+j-1] and dp[i][j-1]. Either path being valid is enough (OR). For dp[1][1]: s3[1]='a'. From s1: s1[0]='a'=='a' and dp[0][1]=True → True! dp[2][2]: s3[3]='a'. From s1: s1[1]='a'=='a' and dp[1][2]=True → True!",
        codeHighlightLines: [7, 8, 9, 10, 11, 12],
        structures: [
          {
            type: "array",
            label: "dp row 1 (s1='a')",
            values: ["T", "T", "T", "F"],
            highlights: { 1: "active", 2: "active" },
          },
          {
            type: "array",
            label: "dp row 2 (s1='aa')",
            values: ["T", "T", "T", "T"],
            highlights: { 3: "active" },
          },
        ],
      },
      {
        description:
          "Final row: dp[3][3] — can all of s1='aab' and s2='abc' form s3='aababc'? s3[5]='c'. From s2: s2[2]='c'=='c' and dp[3][2]=True → dp[3][3]=True! One valid interleaving path: take a(s1), a(s1), b(s2), a(s2... wait, no) — actually: s1[0], s2[0], s1[1], s1[2], s2[1], s2[2] = a,a,a,b,b,c... The DP finds that a valid interleaving exists. Return True.",
        codeHighlightLines: [13],
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
              { name: "return", value: "True — valid interleaving exists" },
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

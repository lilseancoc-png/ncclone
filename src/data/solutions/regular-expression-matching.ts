import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "2D DP",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    code: `def isMatch(s, p):
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    for j in range(1, n + 1):
        if p[j-1] == '*':
            dp[0][j] = dp[0][j-2]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j-1] == '*':
                dp[i][j] = dp[i][j-2]  # zero occurrences
                if p[j-2] == '.' or p[j-2] == s[i-1]:
                    dp[i][j] |= dp[i-1][j]  # one+ occurrences
            elif p[j-1] == '.' or p[j-1] == s[i-1]:
                dp[i][j] = dp[i-1][j-1]
    return dp[m][n]`,
    steps: [
      {
        description:
          "Implement regex matching with '.' (any char) and '*' (zero or more of preceding). dp[i][j] = does s[:i] match p[:j]? For '*': either use zero occurrences (dp[i][j-2]) or one more occurrence if the char matches (dp[i-1][j]).",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          {
            type: "array",
            label: "s",
            values: ["a", "a", "b"],
            highlights: {},
          },
          {
            type: "array",
            label: "p",
            values: ["c", "*", "a", "*", "b"],
            highlights: {},
          },
        ],
      },
      {
        description:
          "Base: dp[0][0]=True. p[1]='*': dp[0][2]=dp[0][0]=True (c* matches zero c's). p[3]='*': dp[0][4]=dp[0][2]=True (a* matches zero a's). So empty string matches 'c*a*'.",
        codeHighlightLines: [5, 6, 7],
        structures: [
          {
            type: "array",
            label: "dp[0] (empty s vs p prefixes)",
            values: ["T", "F", "T", "F", "T", "F"],
            highlights: { 0: "success", 2: "success", 4: "success" },
          },
        ],
      },
      {
        description:
          "dp[1][4]: s='a', p='c*a*'. p[3]='*': zero a's → dp[1][2]. dp[1][2]: p[1]='*', zero c's → dp[1][0]=F. OR one+ a's: p[2]='a'==s[0]='a' → dp[0][4]=T. So dp[1][4]=True!",
        codeHighlightLines: [10, 11, 12, 13],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "dp[1][4] (a vs c*a*)", value: "True", highlight: true },
              { name: "reasoning", value: "c* matches '', a* matches 'a'" },
            ],
          },
        ],
      },
      {
        description:
          "dp[3][5]: s='aab', p='c*a*b'. p[4]='b'==s[2]='b' → dp[2][4]. dp[2][4]=True (s='aa' matches 'c*a*'). So dp[3][5]=True. Pattern c*a*b matches 'aab'!",
        codeHighlightLines: [14, 15, 16],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "return", value: "True", highlight: true },
              { name: "match", value: "c*='' , a*='aa' , b='b'" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

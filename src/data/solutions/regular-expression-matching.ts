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
          "Implement regex matching with '.' (matches any single char) and '*' (zero or more of the PRECEDING element). This is tricky because '*' can match zero characters (effectively deleting its preceding element) or extend the match greedily. dp[i][j] = does s[:i] match p[:j]? When we see '*' at p[j-1], two choices: (1) zero occurrences of the preceding char — check dp[i][j-2] (skip the 'x*' pair entirely). (2) one more occurrence — if the preceding char matches s[i-1], check dp[i-1][j] (consume one char from s, keep the '*' active). s='aab', p='c*a*b'.",
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
          { type: "variables", entries: [{ name: "* means", value: "zero or more of preceding char" }, { name: ". means", value: "any single char" }] },
        ],
      },
      {
        description:
          "Base cases: dp[0][0]=True (empty matches empty). For the first row (empty string vs pattern), only '*' patterns can match empty: p[1]='*' means 'c*' can match zero c's, so dp[0][2] = dp[0][0] = True. p[3]='*' means 'a*' can match zero a's, so dp[0][4] = dp[0][2] = True. This means the empty string matches 'c*a*' — both pairs use zero occurrences. The '*' always looks back 2 positions (skip the entire 'char*' pair).",
        codeHighlightLines: [5, 6, 7],
        structures: [
          {
            type: "array",
            label: "dp[0] (empty s vs pattern prefixes)",
            values: ["T", "F", "T", "F", "T", "F"],
            highlights: { 0: "success", 2: "success", 4: "success" },
          },
          { type: "variables", entries: [{ name: "c* matches ''", value: "True (zero c's)" }, { name: "c*a* matches ''", value: "True (zero c's, zero a's)" }] },
        ],
      },
      {
        description:
          "dp[1][4]: does s='a' match p='c*a*'? p[3]='*', so try zero a's: dp[1][2] (does 'a' match 'c*'?). For dp[1][2]: p[1]='*', zero c's → dp[1][0] = False. One+ c's: p[0]='c' ≠ s[0]='a' → False. So dp[1][2]=False. Back to dp[1][4]: try one+ a's: p[2]='a' == s[0]='a', check dp[0][4] = True! So dp[1][4]=True. The match: c* absorbs nothing, a* absorbs 'a'.",
        codeHighlightLines: [9, 10, 11, 12, 13],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "dp[1][2] ('a' vs 'c*')", value: "False (c ≠ a)" },
              { name: "dp[1][4] ('a' vs 'c*a*')", value: "True!", highlight: true },
              { name: "how", value: "c*→'' , a*→'a'" },
            ],
          },
        ],
      },
      {
        description:
          "dp[3][5]: does s='aab' match p='c*a*b'? p[4]='b' (not '*'), and s[2]='b' matches! So dp[3][5] = dp[2][4] (does 'aa' match 'c*a*'?). We already know dp[2][4]=True (c* matches nothing, a* matches 'aa' — the '*' consumed two a's via repeated dp[i-1][j] transitions). Result: True! The pattern c*a*b matches 'aab' as: c*→'', a*→'aa', b→'b'. Time: O(m×n). Space: O(m×n).",
        codeHighlightLines: [14, 15, 16],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "dp[2][4] ('aa' vs 'c*a*')", value: "True (a* matches 'aa')" },
              { name: "return", value: "True", highlight: true },
              { name: "decomposition", value: "c*→'' , a*→'aa' , b→'b'" },
              { name: "Time", value: "O(m × n)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

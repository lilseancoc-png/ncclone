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
          "Implement regex matching with '.' (matches any single char) and '*' (zero or more of the PRECEDING element). dp[i][j] = does s[:i] match p[:j]? The tricky part: '*' can match zero characters (skip the 'x*' pair) or extend greedily. s='aab', p='c*a*b'. The pattern means: zero or more c's, then zero or more a's, then exactly one b.",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          { type: "array", label: "s", values: ["a", "a", "b"], highlights: {} },
          { type: "array", label: "p", values: ["c", "*", "a", "*", "b"], highlights: {} },
          { type: "variables", entries: [{ name: "* means", value: "zero or more of preceding char" }, { name: ". means", value: "any single char" }, { name: "dp[i][j]", value: "does s[:i] match p[:j]?" }] },
        ],
      },
      {
        description:
          "Base cases: dp[0][0]=True (empty matches empty). For first row (empty string vs pattern), only '*' patterns can match empty. p[1]='*' → 'c*' can match zero c's: dp[0][2] = dp[0][0] = True. p[3]='*' → 'a*' can match zero a's: dp[0][4] = dp[0][2] = True. So the empty string matches 'c*a*' — both pairs use zero occurrences. But dp[0][5] (empty vs 'c*a*b') = False — the bare 'b' needs a character.",
        codeHighlightLines: [5, 6, 7],
        structures: [
          {
            type: "array",
            label: "dp[0] (empty s vs pattern prefixes)",
            values: ["T", "F", "T", "F", "T", "F"],
            highlights: { 0: "success", 2: "success", 4: "success", 5: "checked" },
          },
          { type: "variables", entries: [{ name: "'c*' matches ''", value: "True (zero c's)" }, { name: "'c*a*' matches ''", value: "True (zero c's, zero a's)" }, { name: "'c*a*b' matches ''", value: "False (b needs a char)" }] },
        ],
      },
      {
        description:
          "Fill dp[1][j] — does s='a' match each pattern prefix? dp[1][1]: p[0]='c' ≠ s[0]='a' → False. dp[1][2]: p[1]='*', zero c's → dp[1][0]=False. One+ c's: p[0]='c' ≠ 'a' → False. dp[1][2]=False. dp[1][3]: p[2]='a' == s[0]='a', so dp[1][3] = dp[0][2] = True! ('a' matches 'c*a'). dp[1][4]: p[3]='*', zero a's → dp[1][2]=False. One+ a's: p[2]='a'==s[0]='a', dp[0][4]=True → dp[1][4]=True!",
        codeHighlightLines: [8, 9, 10, 11, 12, 13, 14, 15, 16],
        structures: [
          {
            type: "array",
            label: "dp[1] (s='a' vs pattern prefixes)",
            values: ["F", "F", "F", "T", "T", "F"],
            highlights: { 3: "success", 4: "success" },
          },
          { type: "variables", entries: [{ name: "dp[1][3]", value: "True: 'a' matches 'c*a'", highlight: true }, { name: "dp[1][4]", value: "True: 'a' matches 'c*a*'", highlight: true }, { name: "how", value: "c*→'', a→'a' or c*→'', a*→'a'" }] },
        ],
      },
      {
        description:
          "Fill dp[2][j] — s='aa'. dp[2][3]: p[2]='a'==s[1]='a', dp[2][3]=dp[1][2]=False. dp[2][4]: p[3]='*', zero a's → dp[2][2]=False. One+ a's: p[2]='a'==s[1]='a', check dp[1][4]=True → dp[2][4]=True! This is the key '*' transition: dp[i-1][j] means 'consume one more character from s while keeping the * active'. The * consumed both a's: c*→'', a*→'aa'.",
        codeHighlightLines: [10, 11, 12, 13],
        structures: [
          {
            type: "array",
            label: "dp[2] (s='aa' vs pattern prefixes)",
            values: ["F", "F", "F", "F", "T", "F"],
            highlights: { 4: "success" },
          },
          { type: "variables", entries: [{ name: "dp[2][4]", value: "True: 'aa' matches 'c*a*'", highlight: true }, { name: "* transition", value: "dp[i-1][j]: consume one char, keep * active" }, { name: "a* matched", value: "'a' then 'aa' (greedy)" }] },
        ],
      },
      {
        description:
          "Fill dp[3][j] — s='aab'. dp[3][4]: p[3]='*', one+ a's: p[2]='a' vs s[2]='b' → no match. Zero a's: dp[3][2]=False. dp[3][4]=False. dp[3][5]: p[4]='b'==s[2]='b', so dp[3][5]=dp[2][4]=True! The final character 'b' matches literally. The full decomposition: c*→'', a*→'aa', b→'b'.",
        codeHighlightLines: [14, 15, 16],
        structures: [
          {
            type: "array",
            label: "dp[3] (s='aab' vs pattern prefixes)",
            values: ["F", "F", "F", "F", "F", "T"],
            highlights: { 5: "success" },
          },
          { type: "variables", entries: [{ name: "dp[3][5]", value: "True!", highlight: true }, { name: "decomposition", value: "c*→'' , a*→'aa' , b→'b'" }] },
        ],
      },
      {
        description:
          "Return dp[3][5] = True. The two key transitions: (1) When p[j-1]='*': try zero occurrences via dp[i][j-2] (skip 'x*'), or one+ via dp[i-1][j] if the preceding char matches (consume one s char, keep * active). (2) When chars match (or '.'): dp[i][j] = dp[i-1][j-1]. Time: O(m×n). Space: O(m×n). The dp[i-1][j] transition for * is what makes this powerful — it lets * greedily consume an unbounded number of characters.",
        codeHighlightLines: [17],
        structures: [
          { type: "variables", entries: [{ name: "return", value: "True", highlight: true }, { name: "* zero", value: "dp[i][j-2] — skip 'x*' pair" }, { name: "* one+", value: "dp[i-1][j] — consume char, keep *" }, { name: "Time", value: "O(m × n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

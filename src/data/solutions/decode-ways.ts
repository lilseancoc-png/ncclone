import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Bottom-Up DP",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  code: `def numDecodings(s):
    if not s or s[0] == '0':
        return 0
    n = len(s)
    dp = [0] * (n + 1)
    dp[0] = 1  # empty string
    dp[1] = 1  # first char (non-zero)
    for i in range(2, n + 1):
        if s[i-1] != '0':
            dp[i] += dp[i-1]
        two_digit = int(s[i-2:i])
        if 10 <= two_digit <= 26:
            dp[i] += dp[i-2]
    return dp[n]`,
  steps: [
    {
      description:
        "Count ways to decode a digit string where A=1, B=2, ..., Z=26. At each position, we can decode one digit (1-9) or two digits (10-26). dp[i] = ways to decode s[0:i]. Base cases: dp[0]=1 (empty prefix), dp[1]=1 (first char, given non-zero). s='226'.",
      codeHighlightLines: [1, 2, 3, 4, 5, 6, 7],
      structures: [
        { type: "array", label: "s", values: ["2", "2", "6"] },
        { type: "array", label: "dp", values: [1, 1, "?", "?"] },
        { type: "variables", entries: [{ name: "dp[0]=1", value: "base case (empty)" }, { name: "dp[1]=1", value: "'2' → B (1 way)" }] },
      ],
    },
    {
      description:
        "i=2, consider s[0:2]='22'. Single digit: s[1]='2' ≠ '0' → valid. dp[2] += dp[1] = 1 (decode '2' alone as 'B', with 1 way to handle prefix). Two digits: '22' → 10<=22<=26 → valid, maps to 'V'. dp[2] += dp[0] = 1. dp[2] = 1+1 = 2. Decodings of '22': 'BB' (2,2) or 'V' (22).",
      codeHighlightLines: [8, 9, 10, 11, 12, 13],
      structures: [
        { type: "array", label: "s", values: ["2", "2", "6"], highlights: { 1: "active" } },
        { type: "array", label: "dp", values: [1, 1, 2, "?"], highlights: { 2: "success" } },
        { type: "variables", entries: [{ name: "single '2'", value: "+dp[1] = +1" }, { name: "two '22' (=V)", value: "+dp[0] = +1", highlight: true }, { name: "dp[2]", value: "2 ways: BB, V" }] },
      ],
    },
    {
      description:
        "i=3, consider s[0:3]='226'. Single digit: s[2]='6' ≠ '0' → valid. dp[3] += dp[2] = 2 (each of the 2 ways to decode '22' can append 'F'). Two digits: s[1:3]='26' → 10<=26<=26 → valid, maps to 'Z'. dp[3] += dp[1] = 1 (the 1 way to decode '2' followed by 'Z').",
      codeHighlightLines: [8, 9, 10, 11, 12, 13],
      structures: [
        { type: "array", label: "s", values: ["2", "2", "6"], highlights: { 2: "active" } },
        { type: "array", label: "dp", values: [1, 1, 2, 3], highlights: { 3: "success" } },
        { type: "variables", entries: [{ name: "single '6' (=F)", value: "+dp[2] = +2" }, { name: "two '26' (=Z)", value: "+dp[1] = +1", highlight: true }, { name: "dp[3]", value: "2+1 = 3" }] },
      ],
    },
    {
      description:
        "What about invalid cases? If s[i-1]='0': can't decode alone (no letter for '0'), so dp[i] += dp[i-1] is skipped. If two_digit > 26 (like '27'): can't decode as pair, skip dp[i-2]. If s='30': dp[2] gets nothing (s[1]='0' invalid alone, '30'>26 invalid pair) → dp[2]=0 → no valid decoding.",
      codeHighlightLines: [9, 12],
      structures: [
        { type: "array", label: "example '206'", values: ["2", "0", "6"] },
        { type: "variables", entries: [{ name: "'0' alone", value: "NEVER valid (skip)" }, { name: "'20'", value: "valid (10<=20<=26) = T" }, { name: "'06'", value: "invalid (06 < 10)" }, { name: "'206' ways", value: "1: (20)(6) = TF" }] },
      ],
    },
    {
      description:
        "Return dp[3] = 3 for '226'. The three decodings: 'BBF' (2,2,6), 'VF' (22,6), 'BZ' (2,26). The recurrence dp[i] = dp[i-1] (if single valid) + dp[i-2] (if pair valid) is similar to Fibonacci — can be optimized to O(1) space since we only need the previous two values. Time: O(n). Space: O(n), or O(1) optimized.",
      codeHighlightLines: [14],
      structures: [
        { type: "array", label: "dp (final)", values: [1, 1, 2, 3], highlights: { 3: "success" } },
        { type: "variables", entries: [{ name: "return", value: 3, highlight: true }, { name: "decodings", value: "BBF, VF, BZ" }, { name: "Time", value: "O(n)" }, { name: "similar to", value: "Fibonacci with conditions" }] },
      ],
    },
  ],
};

export default solution;

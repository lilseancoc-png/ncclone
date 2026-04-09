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
        "Count the number of ways to decode a string of digits where A=1, B=2, ..., Z=26. For example, \"226\" could be decoded as \"BBF\" (2,2,6), \"VF\" (22,6), or \"BZ\" (2,26). The DP idea: at each position i, we can either decode the single digit s[i-1] (if it's not '0') or the two-digit number s[i-2:i] (if it's between 10-26). dp[i] = ways to decode s[0:i]. s=\"226\".",
      codeHighlightLines: [1, 2, 3, 4, 5, 6, 7],
      structures: [
        { type: "array", label: "s", values: ["2", "2", "6"] },
        { type: "array", label: "dp", values: [1, 1, 0, 0] },
        { type: "variables", entries: [{ name: "dp[0]=1", value: "empty string: 1 way (base case)" }, { name: "dp[1]=1", value: "'2' → 'B' (1 way)" }] },
      ],
    },
    {
      description:
        "i=2: Consider s[0:2] = \"22\". Option 1 — decode last digit alone: s[1]='2' is not '0', so it's a valid single digit. The number of ways = dp[i-1] = dp[1] = 1 (decode '2' as 'B', plus however we decoded the prefix). dp[2] += 1. Option 2 — decode last two digits together: \"22\" is between 10-26, so it maps to 'V'. Ways = dp[i-2] = dp[0] = 1. dp[2] += 1. Total: dp[2] = 2. The two decodings: \"BB\" (2,2) and \"V\" (22).",
      codeHighlightLines: [8, 9, 10, 11, 12],
      structures: [
        { type: "array", label: "s", values: ["2", "2", "6"], highlights: { 0: "checked", 1: "active" } },
        { type: "array", label: "dp", values: [1, 1, 2, 0], highlights: { 2: "success" } },
        { type: "variables", entries: [{ name: "single digit '2'", value: "valid → +dp[1] = +1" }, { name: "two digits '22'", value: "valid (10≤22≤26) → +dp[0] = +1", highlight: true }, { name: "dp[2]", value: "1 + 1 = 2", highlight: true }] },
      ],
    },
    {
      description:
        "i=3: Consider s[0:3] = \"226\". Option 1 — single digit: s[2]='6' is valid. dp[3] += dp[2] = 2 (each of the 2 ways to decode \"22\" can be extended with 'F'). Option 2 — two digits: s[1:3]=\"26\" is between 10-26, maps to 'Z'. dp[3] += dp[1] = 1 (the 1 way to decode \"2\" plus 'Z'). Total: dp[3] = 2 + 1 = 3.",
      codeHighlightLines: [8, 9, 10, 11, 12],
      structures: [
        { type: "array", label: "s", values: ["2", "2", "6"], highlights: { 1: "checked", 2: "active" } },
        { type: "array", label: "dp", values: [1, 1, 2, 3], highlights: { 3: "success" } },
        { type: "variables", entries: [{ name: "single digit '6'", value: "valid → +dp[2] = +2" }, { name: "two digits '26'", value: "valid (10≤26≤26) → +dp[1] = +1", highlight: true }, { name: "dp[3]", value: "2 + 1 = 3", highlight: true }] },
      ],
    },
    {
      description:
        "Return dp[3] = 3. The three decodings of \"226\": \"BBF\" (2→B, 2→B, 6→F), \"VF\" (22→V, 6→F), \"BZ\" (2→B, 26→Z). Note: digits '0' can only be decoded as part of a two-digit number (10 or 20). A leading '0' or standalone '0' makes that branch invalid (dp stays 0). Time: O(n) — single pass. Space: O(n) for the dp array (can be optimized to O(1) since we only need dp[i-1] and dp[i-2]).",
      codeHighlightLines: [13],
      structures: [
        { type: "array", label: "s", values: ["2", "2", "6"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "dp (final)", values: [1, 1, 2, 3], highlights: { 3: "success" } },
        { type: "variables", entries: [{ name: "return", value: 3, highlight: true }, { name: "decodings", value: "BBF, VF, BZ" }, { name: "Time", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;

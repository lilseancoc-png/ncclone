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
        "Count the number of ways to decode s=\"226\" where A=1, B=2, ..., Z=26. dp[i] = number of ways to decode s[0:i]. Base cases: dp[0]=1 (empty prefix), dp[1]=1 (\"2\" can be decoded as 'B').",
      codeHighlightLines: [1, 2, 3, 4, 5, 6, 7],
      structures: [
        { type: "array", label: "s", values: ["2", "2", "6"] },
        { type: "array", label: "dp", values: [1, 1, 0, 0], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "n", value: 3 }] },
      ],
    },
    {
      description:
        "i=2: Single digit s[1]='2' is valid (not '0'), so dp[2] += dp[1] = 1. Two digits s[0:2]=\"22\" is between 10-26, so dp[2] += dp[0] = 1. dp[2] = 1 + 1 = 2. Decodings: \"BB\" (2,2) or \"V\" (22).",
      codeHighlightLines: [8, 9, 10, 11, 12],
      structures: [
        { type: "array", label: "s", values: ["2", "2", "6"], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "i-1" }] },
        { type: "array", label: "dp", values: [1, 1, 2, 0], highlights: { 2: "success" } },
        { type: "variables", entries: [{ name: "single '2'", value: "valid" }, { name: "two '22'", value: "valid (10-26)", highlight: true }, { name: "dp[2]", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "i=3: Single digit s[2]='6' is valid, so dp[3] += dp[2] = 2. Two digits s[1:3]=\"26\" is between 10-26, so dp[3] += dp[1] = 1. dp[3] = 2 + 1 = 3. Decodings: \"BBF\" (2,2,6), \"VF\" (22,6), \"BZ\" (2,26).",
      codeHighlightLines: [8, 9, 10, 11, 12],
      structures: [
        { type: "array", label: "s", values: ["2", "2", "6"], highlights: { 1: "checked", 2: "active" }, pointers: [{ index: 2, label: "i-1" }] },
        { type: "array", label: "dp", values: [1, 1, 2, 3], highlights: { 3: "success" } },
        { type: "variables", entries: [{ name: "single '6'", value: "valid" }, { name: "two '26'", value: "valid (10-26)", highlight: true }, { name: "dp[3]", value: 3, highlight: true }] },
      ],
    },
    {
      description:
        "Return dp[3] = 3. The string \"226\" can be decoded 3 ways: \"BBF\" (2,2,6), \"VF\" (22,6), \"BZ\" (2,26). Time: O(n) single pass. Space: O(n) for the dp array. At each position, we check if the single digit and two-digit number form valid decodings.",
      codeHighlightLines: [13],
      structures: [
        { type: "array", label: "s", values: ["2", "2", "6"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "dp", values: [1, 1, 2, 3], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", entries: [{ name: "return", value: 3, highlight: true }] },
      ],
    },
  ],
};

export default solution;

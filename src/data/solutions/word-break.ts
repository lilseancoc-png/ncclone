import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def wordBreak(s, wordDict):
    word_set = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    return dp[len(s)]`,
  steps: [
    {
      description:
        "Can \"leetcode\" be segmented into words from [\"leet\", \"code\"]? We use a boolean DP array where dp[i] = True if s[:i] can be segmented. dp[0] = True (empty string is valid).",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "s", values: ["l", "e", "e", "t", "c", "o", "d", "e"] },
        { type: "set", label: "word_set", values: ["leet", "code"] },
        {
          type: "array",
          label: "dp",
          values: [true, false, false, false, false, false, false, false, false],
          highlights: { 0: "success" },
        },
      ],
    },
    {
      description:
        "Check i=1 through i=3: Is any prefix s[0:1]=\"l\", s[0:2]=\"le\", s[0:3]=\"lee\" in the word set? None match. dp[1], dp[2], dp[3] stay False.",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "array", label: "s", values: ["l", "e", "e", "t", "c", "o", "d", "e"], highlights: { 0: "checked", 1: "checked", 2: "checked" } },
        { type: "set", label: "word_set", values: ["leet", "code"] },
        {
          type: "array",
          label: "dp",
          values: [true, false, false, false, false, false, false, false, false],
          highlights: { 1: "checked", 2: "checked", 3: "checked" },
        },
      ],
    },
    {
      description:
        "i=4: Check j=0, dp[0]=True and s[0:4]=\"leet\" is in word_set! Set dp[4] = True. The substring \"leet\" is a valid word.",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "s", values: ["l", "e", "e", "t", "c", "o", "d", "e"], highlights: { 0: "found", 1: "found", 2: "found", 3: "found" } },
        { type: "set", label: "word_set", values: ["leet", "code"], highlightValues: ["leet"] },
        {
          type: "array",
          label: "dp",
          values: [true, false, false, false, true, false, false, false, false],
          highlights: { 0: "success", 4: "success" },
        },
        {
          type: "variables",
          entries: [
            { name: "i", value: 4 },
            { name: "j", value: 0 },
            { name: "s[0:4]", value: "leet", highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "i=5 through i=7: We check all j values where dp[j]=True (j=0 and j=4). Substrings like \"leetc\", \"co\", \"cod\" are not in the word set. dp[5], dp[6], dp[7] stay False.",
      codeHighlightLines: [6, 7],
      structures: [
        { type: "array", label: "s", values: ["l", "e", "e", "t", "c", "o", "d", "e"], highlights: { 4: "checked", 5: "checked", 6: "checked" } },
        { type: "set", label: "word_set", values: ["leet", "code"] },
        {
          type: "array",
          label: "dp",
          values: [true, false, false, false, true, false, false, false, false],
          highlights: { 5: "checked", 6: "checked", 7: "checked" },
        },
      ],
    },
    {
      description:
        "i=8: Check j=4, dp[4]=True and s[4:8]=\"code\" is in word_set! Set dp[8] = True. The substring \"code\" completes the segmentation.",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "s", values: ["l", "e", "e", "t", "c", "o", "d", "e"], highlights: { 4: "found", 5: "found", 6: "found", 7: "found" } },
        { type: "set", label: "word_set", values: ["leet", "code"], highlightValues: ["code"] },
        {
          type: "array",
          label: "dp",
          values: [true, false, false, false, true, false, false, false, true],
          highlights: { 4: "success", 8: "success" },
        },
        {
          type: "variables",
          entries: [
            { name: "i", value: 8 },
            { name: "j", value: 4 },
            { name: "s[4:8]", value: "code", highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Return dp[8] = True. \"leetcode\" can be segmented as \"leet\" + \"code\", both of which are in the dictionary.",
      codeHighlightLines: [10],
      structures: [
        {
          type: "array",
          label: "s (segmented)",
          values: ["l", "e", "e", "t", "c", "o", "d", "e"],
          highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "found", 5: "found", 6: "found", 7: "found" },
        },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
      ],
    },
  ],
};

export default solution;

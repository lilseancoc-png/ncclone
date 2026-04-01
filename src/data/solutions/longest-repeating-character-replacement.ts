import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Sliding Window",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def character_replacement(s, k):
    count = {}
    max_freq = 0
    left = 0
    result = 0
    for right in range(len(s)):
        count[s[right]] = count.get(s[right], 0) + 1
        max_freq = max(max_freq, count[s[right]])
        # Window size - max_freq = chars to replace
        if (right - left + 1) - max_freq > k:
            count[s[left]] -= 1
            left += 1
        result = max(result, right - left + 1)
    return result`,
  steps: [
    {
      description:
        'Find the longest substring where you can replace at most k characters to make all chars the same. Sliding window: if (window size - most frequent char count) > k, shrink. s="AABABBA", k=1.',
      codeHighlightLines: [1, 2, 3, 4, 5],
      structures: [
        { type: "array", label: "s", values: ["A", "A", "B", "A", "B", "B", "A"] },
        { type: "variables", entries: [{ name: "k", value: 1 }, { name: "left", value: 0 }, { name: "max_freq", value: 0 }] },
      ],
    },
    {
      description:
        "Expand right to index 3: window='AABA', count={A:3,B:1}, max_freq=3. Window size 4 - 3 = 1 replacement needed, which equals k=1. Valid! result=4.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        { type: "array", label: "s", values: ["A", "A", "B", "A", "B", "B", "A"], highlights: { 0: "active", 1: "active", 2: "active", 3: "active" } },
        { type: "variables", entries: [{ name: "window", value: "AABA" }, { name: "max_freq", value: 3 }, { name: "replacements", value: "4-3=1 <= k", highlight: true }] },
      ],
    },
    {
      description:
        "right=4: window='AABAB', count={A:3,B:2}, max_freq=3. Size 5-3=2 > k=1. Shrink: remove s[0]='A', left=1. Window='ABAB' size 4.",
      codeHighlightLines: [10, 11, 12],
      structures: [
        { type: "array", label: "s", values: ["A", "A", "B", "A", "B", "B", "A"], highlights: { 0: "found", 1: "active", 2: "active", 3: "active", 4: "active" } },
        { type: "variables", entries: [{ name: "window", value: "ABAB" }, { name: "left", value: 1 }, { name: "replacements", value: "5-3=2 > k, shrink!" }] },
      ],
    },
    {
      description:
        "Continue sliding. Best window found is length 4 (e.g., 'AABA' replacing B→A). Return 4. Key insight: max_freq never needs to decrease — we only care about the best window.",
      codeHighlightLines: [13, 14],
      structures: [
        { type: "array", label: "s", values: ["A", "A", "B", "A", "B", "B", "A"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }] },
      ],
    },
  ],
};

export default solution;

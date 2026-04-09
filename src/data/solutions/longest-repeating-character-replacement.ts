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
        'Find the longest substring where you can replace at most k characters to make all characters the same. The key insight: in any valid window, the number of characters we need to replace equals (window size - count of the most frequent character). If that number exceeds k, the window is invalid and must shrink. This sliding window approach avoids the brute-force O(n²) of checking every substring. s="AABABBA", k=1.',
      codeHighlightLines: [1, 2, 3, 4, 5],
      structures: [
        { type: "array", label: "s", values: ["A", "A", "B", "A", "B", "B", "A"] },
        { type: "variables", entries: [{ name: "k", value: 1 }, { name: "left", value: 0 }, { name: "max_freq", value: 0 }, { name: "validity check", value: "window_size - max_freq <= k" }] },
      ],
    },
    {
      description:
        "Expand right to index 3: window='AABA', count={A:3, B:1}, max_freq=3. The validity check: window size (4) - max_freq (3) = 1 replacement needed. Since 1 <= k=1, this window is valid — we can replace the one B with A to get 'AAAA'. result=4. The window keeps growing as long as replacements stay within budget.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        { type: "array", label: "s", values: ["A", "A", "B", "A", "B", "B", "A"], highlights: { 0: "active", 1: "active", 2: "active", 3: "active" } },
        { type: "variables", entries: [{ name: "window", value: "AABA" }, { name: "max_freq", value: 3 }, { name: "replacements", value: "4-3=1 ≤ k=1 ✓", highlight: true }, { name: "result", value: 4 }] },
      ],
    },
    {
      description:
        "right=4: window='AABAB', count={A:3, B:2}, max_freq=3. Validity: 5 - 3 = 2 > k=1 — we'd need 2 replacements but only have 1 allowed. Window is invalid! Shrink from left: decrement count[s[0]]='A', move left to 1. Window becomes 'ABAB' (size 4). We only shrink by one — this is an optimization. We never shrink below our best result size.",
      codeHighlightLines: [10, 11, 12],
      structures: [
        { type: "array", label: "s", values: ["A", "A", "B", "A", "B", "B", "A"], highlights: { 0: "found", 1: "active", 2: "active", 3: "active", 4: "active" } },
        { type: "variables", entries: [{ name: "window", value: "ABAB (after shrink)" }, { name: "left", value: 1 }, { name: "5 - 3 = 2 > k=1", value: "invalid → shrink", highlight: true }] },
      ],
    },
    {
      description:
        "Continue sliding to the end. The best valid window remains length 4 (e.g., 'AABA' where we replace one B→A). Return 4. A subtle but crucial optimization: max_freq never needs to decrease — even when we shrink the window. Why? We only care about finding a LONGER valid window than our current best. A smaller max_freq can't produce a longer window (since we need more replacements), so tracking the historical maximum is sufficient. This is what makes this O(n) instead of O(26n). Time: O(n). Space: O(1) — count array has at most 26 entries.",
      codeHighlightLines: [13, 14],
      structures: [
        { type: "array", label: "s", values: ["A", "A", "B", "A", "B", "B", "A"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }, { name: "insight", value: "max_freq only increases — we seek longer windows" }, { name: "Time", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;

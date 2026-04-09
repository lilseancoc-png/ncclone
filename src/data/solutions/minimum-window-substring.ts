import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Sliding Window",
  timeComplexity: "O(n)",
  spaceComplexity: "O(m)",
  code: `def min_window(s, t):
    if not t or not s:
        return ""
    t_count = {}
    for c in t:
        t_count[c] = t_count.get(c, 0) + 1
    required = len(t_count)
    formed = 0
    window = {}
    left = 0
    result = (float('inf'), 0, 0)
    for right in range(len(s)):
        c = s[right]
        window[c] = window.get(c, 0) + 1
        if c in t_count and window[c] == t_count[c]:
            formed += 1
        while formed == required:
            if right - left + 1 < result[0]:
                result = (right - left + 1, left, right)
            window[s[left]] -= 1
            if s[left] in t_count and window[s[left]] < t_count[s[left]]:
                formed -= 1
            left += 1
    return "" if result[0] == float('inf') else s[result[1]:result[2]+1]`,
  steps: [
    {
      description:
        'Find the smallest substring of s that contains every character from t (including duplicates). This is the classic "minimum window substring" problem. The approach: use two pointers (left, right) to maintain a window. Expand right to include characters until the window is valid (contains all of t), then shrink left to minimize the window while keeping it valid. We track "formed" = how many distinct characters have met their required frequency. When formed == required (number of unique chars in t), the window is valid. s="ADOBECODEBANC", t="ABC" (need 1 A, 1 B, 1 C).',
      codeHighlightLines: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      structures: [
        { type: "array", label: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"] },
        { type: "variables", entries: [{ name: "t", value: "ABC" }, { name: "required", value: "3 unique chars" }, { name: "formed", value: 0 }, { name: "strategy", value: "expand right, shrink left" }] },
      ],
    },
    {
      description:
        'Expand right pointer. right=0: \'A\' — window[A]=1 == t_count[A]=1, formed=1. right=3: \'B\' — formed=2. right=5: \'C\' — formed=3 == required! Window "ADOBEC" (indices 0-5, length 6) is the first valid window. Record it as our best so far. Now try to improve by shrinking from the left — maybe we can drop unnecessary characters.',
      codeHighlightLines: [12, 13, 14, 15, 16],
      structures: [
        { type: "array", label: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"], highlights: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active" } },
        { type: "variables", entries: [{ name: "window", value: "ADOBEC (len 6)" }, { name: "formed", value: "3 == required!", highlight: true }] },
      ],
    },
    {
      description:
        'Shrink: remove s[0]=\'A\' — window[A] drops below t_count[A], formed drops to 2. Window invalid. Expand right again to find another valid window. At right=10 (\'A\'): window "CODEBA" → "ODEBANC"... Eventually find window "BANC" (indices 9-12, length 4). Try shrinking: remove \'B\' → formed drops. Can\'t do better. "BANC" is our best window at length 4.',
      codeHighlightLines: [17, 18, 19, 20, 21, 22, 23],
      structures: [
        { type: "array", label: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"], highlights: { 9: "success", 10: "success", 11: "success", 12: "success" } },
        { type: "variables", entries: [{ name: "best window", value: '"BANC" (len 4)', highlight: true }, { name: "indices", value: "[9, 12]" }] },
      ],
    },
    {
      description:
        'Return "BANC". Why O(n) time? Each character is visited at most twice: once when right expands over it, once when left shrinks past it. The left pointer never moves backward, so total work is O(2n) = O(n). Space: O(m) where m = |character set| for the frequency maps. This expand-then-contract pattern is the foundation of all sliding window problems — the key is knowing when the window is valid and how adding/removing characters affects validity.',
      codeHighlightLines: [24],
      structures: [
        { type: "variables", entries: [{ name: "return", value: '"BANC"', highlight: true }, { name: "length", value: 4 }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(m)" }] },
      ],
    },
  ],
};

export default solution;

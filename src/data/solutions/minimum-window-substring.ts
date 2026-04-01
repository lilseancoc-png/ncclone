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
        'Find the minimum window in s that contains all characters from t. Expand right to include all needed chars, then shrink left to minimize. s="ADOBECODEBANC", t="ABC".',
      codeHighlightLines: [1, 2, 3, 4, 5, 6, 7],
      structures: [
        { type: "array", label: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"] },
        { type: "variables", entries: [{ name: "t", value: "ABC" }, { name: "required", value: 3 }, { name: "formed", value: 0 }] },
      ],
    },
    {
      description:
        'Expand right until formed==required. At right=5 (\'C\'): window has A,B,C. formed=3=required. Window "ADOBEC" (length 6). Now try shrinking from left.',
      codeHighlightLines: [12, 13, 14, 15, 16],
      structures: [
        { type: "array", label: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"], highlights: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active" } },
        { type: "variables", entries: [{ name: "window", value: "ADOBEC (len 6)" }, { name: "formed", value: "3 == required", highlight: true }] },
      ],
    },
    {
      description:
        'Shrink left: remove A → formed drops. Continue expanding right. Eventually find window "BANC" (indices 9-12, length 4). Shrink again — can\'t shrink further without losing a required char.',
      codeHighlightLines: [17, 18, 19, 20, 21, 22, 23],
      structures: [
        { type: "array", label: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"], highlights: { 9: "success", 10: "success", 11: "success", 12: "success" } },
        { type: "variables", entries: [{ name: "best window", value: "BANC (len 4)", highlight: true }] },
      ],
    },
    {
      description:
        'Return "BANC" — the minimum window containing all of A, B, C. O(n) time: each char visited at most twice (once by right, once by left). O(m) space for the frequency maps.',
      codeHighlightLines: [24],
      structures: [
        { type: "variables", entries: [{ name: "return", value: '"BANC"', highlight: true }, { name: "length", value: 4 }] },
      ],
    },
  ],
};

export default solution;

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
        'Find the smallest substring of s that contains every character from t (including duplicates). Use two pointers: expand right to include characters until the window is valid, then shrink left to minimize. Track "formed" = how many distinct characters have met their required frequency. When formed == required, the window is valid. s="ADOBECODEBANC", t="ABC" (need 1 A, 1 B, 1 C). required = 3 unique chars.',
      codeHighlightLines: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      structures: [
        { type: "array", label: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"] },
        { type: "hashmap", label: "t_count (what we need)", entries: [["A", 1], ["B", 1], ["C", 1]], highlightKeys: ["A", "B", "C"] },
        { type: "variables", entries: [{ name: "required", value: "3 unique chars" }, { name: "formed", value: 0 }, { name: "left", value: 0 }, { name: "strategy", value: "expand right, shrink left" }] },
      ],
    },
    {
      description:
        'Expand right pointer. right=0: add \'A\' → window[A]=1 == t_count[A]=1, formed=1. right=1: \'D\' — not in t, skip. right=2: \'O\' — not in t, skip. right=3: add \'B\' → window[B]=1 == t_count[B]=1, formed=2. right=4: \'E\' — not in t. right=5: add \'C\' → window[C]=1 == t_count[C]=1, formed=3 == required! First valid window found: "ADOBEC" (indices 0-5, length 6).',
      codeHighlightLines: [12, 13, 14, 15, 16],
      structures: [
        { type: "array", label: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"], highlights: { 0: "success", 1: "active", 2: "active", 3: "success", 4: "active", 5: "success" }, pointers: [{ index: 0, label: "left" }, { index: 5, label: "right" }] },
        { type: "hashmap", label: "window counts", entries: [["A", 1], ["D", 1], ["O", 1], ["B", 1], ["E", 1], ["C", 1]], highlightKeys: ["A", "B", "C"] },
        { type: "variables", entries: [{ name: "formed", value: "3 == required!", highlight: true }, { name: "best window", value: '"ADOBEC" (len 6)' }] },
      ],
    },
    {
      description:
        'Now shrink from left to minimize. Remove s[0]=\'A\' → window[A]=0 < t_count[A]=1, so formed drops to 2. Window invalid — stop shrinking. left=1. Continue expanding right. right=6: \'O\', right=7: \'D\', right=8: \'E\', right=9: \'B\' — none of these restore formed to 3. right=10: add \'A\' → window[A]=1 == t_count[A]=1, formed=3 again! New valid window: "DOBECODEBA" — but that\'s length 10, worse than 6.',
      codeHighlightLines: [17, 18, 19, 20, 21, 22, 23],
      structures: [
        { type: "array", label: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"], highlights: { 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "active", 7: "active", 8: "active", 9: "active", 10: "success" }, pointers: [{ index: 1, label: "left" }, { index: 10, label: "right" }] },
        { type: "variables", entries: [{ name: "formed", value: "3 (valid again)" }, { name: "window", value: '"DOBECODEBA" (len 10)' }, { name: "best so far", value: '"ADOBEC" (len 6)' }] },
      ],
    },
    {
      description:
        'Shrink aggressively. Remove s[1]=\'D\' → fine (D not in t). Remove s[2]=\'O\' → fine. Remove s[3]=\'B\' → window[B]=1→0 < t_count[B]=1, formed=2. Stop. left=4. Expand right again. right=11: \'N\' — not in t. right=12: \'C\' — window[C]=2, already met. But wait — formed was 2, not restored. Keep expanding... actually right=9 gave us B already. Let me reconsider: after removing B at left=3, we need another valid window.',
      codeHighlightLines: [17, 18, 19, 20, 21, 22, 23],
      structures: [
        { type: "array", label: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"], highlights: { 9: "success", 10: "success", 11: "active", 12: "success" }, pointers: [{ index: 9, label: "left" }, { index: 12, label: "right" }] },
        { type: "variables", entries: [{ name: "shrinking window", value: "removing D, O, B, E, C, O, D, E..." }, { name: "formed=3 at", value: "left=9, right=12" }, { name: "window", value: '"BANC" (len 4)', highlight: true }] },
      ],
    },
    {
      description:
        'At left=9, right=12: window "BANC" (length 4). formed=3 — valid! 4 < 6 (previous best), so update best. Try shrinking: remove s[9]=\'B\' → window[B]=0 < t_count[B]=1, formed=2. Stop. right has reached the end. No more valid windows possible. Best window: "BANC" at length 4.',
      codeHighlightLines: [17, 18, 19],
      structures: [
        { type: "array", label: "s", values: ["A", "D", "O", "B", "E", "C", "O", "D", "E", "B", "A", "N", "C"], highlights: { 9: "success", 10: "success", 11: "success", 12: "success" }, pointers: [{ index: 9, label: "left=B" }, { index: 12, label: "right=C" }] },
        { type: "variables", entries: [{ name: "best window", value: '"BANC" (len 4)', highlight: true }, { name: "contains", value: "B=1 ✓, A=1 ✓, C=1 ✓" }] },
      ],
    },
    {
      description:
        'Return "BANC". Why O(n) time? Each character is visited at most twice: once when right expands over it, once when left shrinks past it. The left pointer never moves backward, so total work is O(2n) = O(n). Space: O(m) for the frequency maps where m = character set size. This expand-then-contract pattern is the foundation of all sliding window problems — the key insight is knowing when the window is valid and how adding/removing characters affects validity.',
      codeHighlightLines: [24],
      structures: [
        { type: "variables", entries: [{ name: "return", value: '"BANC"', highlight: true }, { name: "length", value: 4 }, { name: "Time", value: "O(n) — each char visited ≤ 2 times" }, { name: "Space", value: "O(m) — frequency maps" }] },
      ],
    },
  ],
};

export default solution;

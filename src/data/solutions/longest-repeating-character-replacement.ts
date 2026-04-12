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
        "Find longest substring where you can replace at most k characters to make all chars the same. Key insight: in a valid window, (window_size - max_freq_char_count) = replacements needed. If replacements > k, shrink window. s='AABABBA', k=1.",
      codeHighlightLines: [1, 2, 3, 4, 5],
      structures: [
        { type: "array", label: "s", values: ["A", "A", "B", "A", "B", "B", "A"] },
        { type: "variables", entries: [{ name: "k", value: 1 }, { name: "validity", value: "window_size - max_freq <= k" }, { name: "left", value: 0 }, { name: "max_freq", value: 0 }] },
      ],
    },
    {
      description:
        "Expand right=0 to 2: window='AAB'. count={A:2,B:1}, max_freq=2. Check: size(3) - max_freq(2) = 1 replacement needed. 1 <= k=1 ✓ valid! We'd replace the one B with A → 'AAA'. result=3.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        { type: "array", label: "s", values: ["A", "A", "B", "A", "B", "B", "A"], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "variables", entries: [{ name: "window", value: "'AAB'" }, { name: "count", value: "{A:2, B:1}" }, { name: "3 - 2 = 1 <= k", value: "valid ✓", highlight: true }, { name: "result", value: 3 }] },
      ],
    },
    {
      description:
        "Expand right=3: window='AABA'. count={A:3,B:1}, max_freq=3. Check: 4 - 3 = 1 <= k=1 ✓ valid! Replace one B → 'AAAA'. result=4. This is the answer — we find it here but continue to confirm.",
      codeHighlightLines: [6, 7, 8, 13],
      structures: [
        { type: "array", label: "s", values: ["A", "A", "B", "A", "B", "B", "A"], highlights: { 0: "active", 1: "active", 2: "active", 3: "active" } },
        { type: "variables", entries: [{ name: "window", value: "'AABA'" }, { name: "count", value: "{A:3, B:1}" }, { name: "4 - 3 = 1 <= k", value: "valid ✓", highlight: true }, { name: "result", value: 4 }] },
      ],
    },
    {
      description:
        "Expand right=4: window='AABAB'. count={A:3,B:2}, max_freq=3. Check: 5 - 3 = 2 > k=1. INVALID — need 2 replacements but only 1 allowed. Shrink: decrement count[s[left]]='A', left=1. Window='ABAB' size 4. Still valid length = previous best, no improvement.",
      codeHighlightLines: [9, 10, 11, 12],
      structures: [
        { type: "array", label: "s", values: ["A", "A", "B", "A", "B", "B", "A"], highlights: { 0: "checked", 1: "active", 2: "active", 3: "active", 4: "active" } },
        { type: "variables", entries: [{ name: "5 - 3 = 2 > k=1", value: "INVALID → shrink", highlight: true }, { name: "left", value: "0 → 1" }, { name: "window after", value: "'ABAB' (size 4)" }, { name: "result", value: "4 (unchanged)" }] },
      ],
    },
    {
      description:
        "Continue sliding to end — no window exceeds size 4 while staying valid. Return 4. Subtle optimization: max_freq never decreases. We only care about finding LONGER windows. A smaller max_freq can't help (needs more replacements for same size), so keeping the historical max is safe. This gives true O(n) — each element visited at most twice. Space: O(1) — 26 letter counts.",
      codeHighlightLines: [13, 14],
      structures: [
        { type: "array", label: "s", values: ["A", "A", "B", "A", "B", "B", "A"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }, { name: "best window", value: "'AABA' (replace B→A)" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

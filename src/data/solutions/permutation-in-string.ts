import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Sliding Window + Char Count",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def check_inclusion(s1, s2):
    if len(s1) > len(s2):
        return False
    s1_count = [0] * 26
    s2_count = [0] * 26
    for i in range(len(s1)):
        s1_count[ord(s1[i]) - ord('a')] += 1
        s2_count[ord(s2[i]) - ord('a')] += 1
    matches = sum(1 for i in range(26) if s1_count[i] == s2_count[i])
    for i in range(len(s1), len(s2)):
        if matches == 26:
            return True
        # Add right char
        idx = ord(s2[i]) - ord('a')
        s2_count[idx] += 1
        if s2_count[idx] == s1_count[idx]: matches += 1
        elif s2_count[idx] == s1_count[idx] + 1: matches -= 1
        # Remove left char
        idx = ord(s2[i - len(s1)]) - ord('a')
        s2_count[idx] -= 1
        if s2_count[idx] == s1_count[idx]: matches += 1
        elif s2_count[idx] == s1_count[idx] - 1: matches -= 1
    return matches == 26`,
  steps: [
    {
      description:
        'Check if any permutation of s1 exists as a contiguous substring of s2. A permutation has the same characters in any order, so we need a substring of s2 with identical character frequencies to s1. The brute-force approach generates all permutations — O(n!). Instead, use a fixed-size sliding window of length len(s1) and track character frequencies. The clever optimization: maintain a "matches" counter (how many of 26 letters have equal counts), so each window slide is O(1). s1="ab", s2="eidbaooo".',
      codeHighlightLines: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "s1", values: ["a", "b"] },
        { type: "array", label: "s2", values: ["e", "i", "d", "b", "a", "o", "o", "o"] },
        { type: "variables", entries: [{ name: "window size", value: 2 }, { name: "s1_count", value: "{a:1, b:1}" }, { name: "matches goal", value: "all 26 letters have equal counts" }] },
      ],
    },
    {
      description:
        'Initialize: count frequencies of first window "ei" in s2. s2_count = {e:1, i:1}. Compare all 26 letters: for most letters both counts are 0 (match!), but for a, b, e, i the counts differ. matches < 26. Slide the window: add right char, remove left char, update matches in O(1). Window "id" → no match. Window "db" → no match. Each slide adds one char and removes one, adjusting at most 2 of the 26 letter counts.',
      codeHighlightLines: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      structures: [
        { type: "array", label: "s2", values: ["e", "i", "d", "b", "a", "o", "o", "o"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked" } },
        { type: "variables", entries: [{ name: "window 'ei'", value: "no match" }, { name: "window 'id'", value: "no match" }, { name: "window 'db'", value: "no match" }] },
      ],
    },
    {
      description:
        'Window slides to "ba" (indices 3-4): add \'a\' (s2_count[a] goes to 1, now matches s1_count[a]=1 → matches++). Remove \'d\' (s2_count[d] goes to 0, matches s1_count[d]=0 → matches++). s2_count = {b:1, a:1} = s1_count. All 26 character counts now match → matches == 26! A permutation of "ab" is found: "ba". We don\'t need to check the remaining windows.',
      codeHighlightLines: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      structures: [
        { type: "array", label: "s2", values: ["e", "i", "d", "b", "a", "o", "o", "o"], highlights: { 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "window 'ba'", value: "{b:1, a:1}" }, { name: "matches", value: "26 — all equal!", highlight: true }] },
      ],
    },
    {
      description:
        'Return True — "ba" at index 3 is a permutation of "ab". The matches counter is the key optimization: instead of comparing all 26 counts each time (O(26) per slide), we maintain the count incrementally. When adding/removing a char, only that letter\'s match status changes. This gives true O(1) per slide and O(n) overall. Space: O(1) — two fixed 26-element arrays regardless of input size.',
      codeHighlightLines: [22],
      structures: [
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }, { name: "found", value: '"ba" at index 3' }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

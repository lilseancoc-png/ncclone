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
        'Check if s2 contains a permutation of s1. Use a fixed-size sliding window (size = len(s1)) and compare character frequencies. s1="ab", s2="eidbaooo".',
      codeHighlightLines: [1, 2, 3, 4, 5, 6, 7],
      structures: [
        { type: "array", label: "s1", values: ["a", "b"] },
        { type: "array", label: "s2", values: ["e", "i", "d", "b", "a", "o", "o", "o"] },
        { type: "variables", entries: [{ name: "window size", value: 2 }, { name: "s1_count", value: "{a:1, b:1}" }] },
      ],
    },
    {
      description:
        'Initial window "ei": s2_count={e:1,i:1}. Doesn\'t match s1_count={a:1,b:1}. Slide window right. "id"→no. "db"→no.',
      codeHighlightLines: [8, 9, 10],
      structures: [
        { type: "array", label: "s2", values: ["e", "i", "d", "b", "a", "o", "o", "o"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked" } },
        { type: "variables", entries: [{ name: "window", value: '"db"' }, { name: "matches", value: "not 26 yet" }] },
      ],
    },
    {
      description:
        'Window slides to "ba" (indices 3-4): s2_count={b:1,a:1} matches s1_count={a:1,b:1}. All 26 character counts match → matches==26!',
      codeHighlightLines: [11, 12, 13, 14, 15],
      structures: [
        { type: "array", label: "s2", values: ["e", "i", "d", "b", "a", "o", "o", "o"], highlights: { 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "window", value: '"ba"' }, { name: "matches", value: 26, highlight: true }] },
      ],
    },
    {
      description:
        'Return True — "ba" is a permutation of "ab". O(n) time: each char added/removed in O(1) with the matches counter. O(1) space: only 26-element arrays.',
      codeHighlightLines: [22],
      structures: [
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }, { name: "permutation found", value: '"ba" at index 3' }] },
      ],
    },
  ],
};

export default solution;

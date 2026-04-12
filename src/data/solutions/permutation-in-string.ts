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
        "Check if any permutation of s1 exists as a substring of s2. A permutation has identical character frequencies. Use a fixed-size sliding window of len(s1) and track a 'matches' counter — how many of 26 letters have equal counts in both. When matches==26, we found a permutation. s1='ab', s2='eidbaooo'.",
      codeHighlightLines: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "s1", values: ["a", "b"] },
        { type: "array", label: "s2", values: ["e", "i", "d", "b", "a", "o", "o", "o"] },
        { type: "variables", entries: [{ name: "window size", value: 2 }, { name: "s1_count", value: "{a:1, b:1}" }, { name: "goal", value: "matches == 26" }] },
      ],
    },
    {
      description:
        "Initialize first window 'ei': s2_count={e:1, i:1}. Compare all 26 letters: most are 0==0 (match), but a,b,e,i differ. matches=22 (not 26). Check matches==26? No. Slide: add 'd', remove 'e'. Window becomes 'id'. s2_count={i:1, d:1}. e-count goes to 0 (matches s1's 0 → matches++), d-count goes to 1 (was matching at 0, now differs → matches--). Net: still 22.",
      codeHighlightLines: [10, 11, 13, 14, 15, 16, 18, 19, 20, 21],
      structures: [
        { type: "array", label: "s2", values: ["e", "i", "d", "b", "a", "o", "o", "o"], highlights: { 0: "checked", 1: "checked", 2: "active" } },
        { type: "variables", entries: [{ name: "window 'ei'", value: "matches=22" }, { name: "slide: +d, -e", value: "window 'id'" }, { name: "matches", value: "22 (no change)" }] },
      ],
    },
    {
      description:
        "Slide: add 'b', remove 'i'. Window='db'. s2_count={d:1, b:1}. Adding b: b-count 0→1, matches s1's b:1 → matches++ (23). Removing i: i-count 1→0, matches s1's 0 → matches++ (24). Two letters closer! But still not 26 — d and a still differ (d:1≠0 and a:0≠1).",
      codeHighlightLines: [13, 14, 15, 16, 18, 19, 20, 21],
      structures: [
        { type: "array", label: "s2", values: ["e", "i", "d", "b", "a", "o", "o", "o"], highlights: { 2: "checked", 3: "active" } },
        { type: "variables", entries: [{ name: "window 'db'", value: "s2_count={d:1, b:1}" }, { name: "+b: b matches", value: "matches 23" }, { name: "-i: i matches", value: "matches 24", highlight: true }] },
      ],
    },
    {
      description:
        "Slide: add 'a', remove 'd'. Window='ba'. Adding a: a-count 0→1, now equals s1's a:1 → matches++ (25). Removing d: d-count 1→0, now equals s1's d:0 → matches++ (26). matches==26! All 26 character frequencies are identical between s1 and current window.",
      codeHighlightLines: [13, 14, 15, 16, 18, 19, 20, 21],
      structures: [
        { type: "array", label: "s2", values: ["e", "i", "d", "b", "a", "o", "o", "o"], highlights: { 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "window 'ba'", value: "{b:1, a:1} = s1_count!", highlight: true }, { name: "+a: a matches", value: "matches 25" }, { name: "-d: d matches", value: "matches 26!", highlight: true }] },
      ],
    },
    {
      description:
        "Return True — 'ba' at indices 3-4 is a permutation of 'ab'. The matches counter makes each slide O(1): only 2 characters change per slide (one added, one removed), each affecting at most 1 match. No need to compare all 26 counts each time. Time: O(n) — one pass through s2. Space: O(1) — two fixed 26-element arrays.",
      codeHighlightLines: [22],
      structures: [
        { type: "array", label: "s2", values: ["e", "i", "d", "b", "a", "o", "o", "o"], highlights: { 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }, { name: "found", value: "'ba' at index 3-4" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

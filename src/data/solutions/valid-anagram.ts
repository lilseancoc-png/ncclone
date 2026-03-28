import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  // ── Approach 1: Sorting ──────────────────────────────────────────────
  {
    label: "Sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    code: `def is_anagram(s, t):
    return sorted(s) == sorted(t)`,
    steps: [
      {
        description:
          "Two strings are anagrams if they contain the exact same characters the same number of times. The simplest way to check: sort both strings and compare. If they're anagrams, their sorted versions must be identical.",
        codeHighlightLines: [1, 2],
        structures: [
          { type: "array", label: "s", values: ["a", "n", "a", "g", "r", "a", "m"] },
          { type: "array", label: "t", values: ["n", "a", "g", "a", "r", "a", "m"] },
        ],
      },
      {
        description:
          "Sort s: \"anagram\" → \"aaagmnr\". Sorting rearranges all characters into alphabetical order.",
        codeHighlightLines: [2],
        structures: [
          { type: "array", label: "sorted(s)", values: ["a", "a", "a", "g", "m", "n", "r"], highlights: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "active" } },
          { type: "array", label: "t (unsorted)", values: ["n", "a", "g", "a", "r", "a", "m"] },
        ],
      },
      {
        description:
          "Sort t: \"nagaram\" → \"aaagmnr\". Same sorted result as s!",
        codeHighlightLines: [2],
        structures: [
          { type: "array", label: "sorted(s)", values: ["a", "a", "a", "g", "m", "n", "r"], highlights: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "active" } },
          { type: "array", label: "sorted(t)", values: ["a", "a", "a", "g", "m", "n", "r"], highlights: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "active" } },
        ],
      },
      {
        description:
          "Compare: sorted(s) == sorted(t) → \"aaagmnr\" == \"aaagmnr\" → True. They're anagrams! Time: O(n log n) for sorting. Space: O(n) because sorted() creates new lists. Simple and readable, but the counting approach (Approach 2) is faster at O(n).",
        codeHighlightLines: [2],
        structures: [
          { type: "array", label: "sorted(s)", values: ["a", "a", "a", "g", "m", "n", "r"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success" } },
          { type: "array", label: "sorted(t)", values: ["a", "a", "a", "g", "m", "n", "r"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success" } },
          { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
        ],
      },
    ],
  },

  // ── Approach 2: Optimal — Character Counting ─────────────────────────
  {
    label: "Optimal — Hash Map Counting",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    count = {}
    for c in s:
        count[c] = count.get(c, 0) + 1
    for c in t:
        count[c] = count.get(c, 0) - 1
    return all(v == 0 for v in count.values())`,
    steps: [
      {
        description:
          "Check if \"anagram\" and \"nagaram\" are anagrams. Instead of sorting, we count characters: increment for each char in s, decrement for each char in t. If all counts end at 0, the strings are anagrams. This is O(n) time, and O(1) space since the character set is bounded (26 letters).",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          { type: "array", label: "s", values: ["a", "n", "a", "g", "r", "a", "m"] },
          { type: "array", label: "t", values: ["n", "a", "g", "a", "r", "a", "m"] },
          { type: "variables", entries: [{ name: "len(s)", value: 7 }, { name: "len(t)", value: 7 }] },
          { type: "hashmap", label: "count", entries: [] },
        ],
      },
      {
        description:
          "s[0] = 'a'. First time seeing 'a', so count['a'] = 0 + 1 = 1.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "s", values: ["a", "n", "a", "g", "r", "a", "m"], highlights: { 0: "active" }, pointers: [{ index: 0, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 1]], highlightKeys: ["a"] },
        ],
      },
      {
        description:
          "s[1] = 'n'. First time seeing 'n', so count['n'] = 1.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "s", values: ["a", "n", "a", "g", "r", "a", "m"], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 1], ["n", 1]], highlightKeys: ["n"] },
        ],
      },
      {
        description:
          "s[2] = 'a'. Already in count — increment: count['a'] = 1 + 1 = 2.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "s", values: ["a", "n", "a", "g", "r", "a", "m"], highlights: { 0: "checked", 1: "checked", 2: "active" }, pointers: [{ index: 2, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 2], ["n", 1]], highlightKeys: ["a"] },
        ],
      },
      {
        description:
          "s[3] = 'g'. First time — count['g'] = 1.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "s", values: ["a", "n", "a", "g", "r", "a", "m"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "active" }, pointers: [{ index: 3, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 2], ["n", 1], ["g", 1]], highlightKeys: ["g"] },
        ],
      },
      {
        description:
          "s[4] = 'r'. First time — count['r'] = 1.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "s", values: ["a", "n", "a", "g", "r", "a", "m"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "active" }, pointers: [{ index: 4, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 2], ["n", 1], ["g", 1], ["r", 1]], highlightKeys: ["r"] },
        ],
      },
      {
        description:
          "s[5] = 'a'. Third 'a' — increment: count['a'] = 2 + 1 = 3.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "s", values: ["a", "n", "a", "g", "r", "a", "m"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "active" }, pointers: [{ index: 5, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 3], ["n", 1], ["g", 1], ["r", 1]], highlightKeys: ["a"] },
        ],
      },
      {
        description:
          "s[6] = 'm'. First time — count['m'] = 1. First pass complete! We've counted all characters in s.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "s", values: ["a", "n", "a", "g", "r", "a", "m"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "checked", 6: "active" }, pointers: [{ index: 6, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 3], ["n", 1], ["g", 1], ["r", 1], ["m", 1]], highlightKeys: ["m"] },
        ],
      },
      {
        description:
          "Now subtract for each character in t. If t is a true anagram, each decrement will exactly cancel out the corresponding increment. t[0] = 'n': count['n'] = 1 - 1 = 0.",
        codeHighlightLines: [7, 8],
        structures: [
          { type: "array", label: "t", values: ["n", "a", "g", "a", "r", "a", "m"], highlights: { 0: "active" }, pointers: [{ index: 0, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 3], ["n", 0], ["g", 1], ["r", 1], ["m", 1]], highlightKeys: ["n"] },
        ],
      },
      {
        description:
          "t[1] = 'a'. count['a'] = 3 - 1 = 2.",
        codeHighlightLines: [7, 8],
        structures: [
          { type: "array", label: "t", values: ["n", "a", "g", "a", "r", "a", "m"], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 2], ["n", 0], ["g", 1], ["r", 1], ["m", 1]], highlightKeys: ["a"] },
        ],
      },
      {
        description:
          "t[2] = 'g'. count['g'] = 1 - 1 = 0.",
        codeHighlightLines: [7, 8],
        structures: [
          { type: "array", label: "t", values: ["n", "a", "g", "a", "r", "a", "m"], highlights: { 0: "checked", 1: "checked", 2: "active" }, pointers: [{ index: 2, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 2], ["n", 0], ["g", 0], ["r", 1], ["m", 1]], highlightKeys: ["g"] },
        ],
      },
      {
        description:
          "t[3] = 'a'. count['a'] = 2 - 1 = 1.",
        codeHighlightLines: [7, 8],
        structures: [
          { type: "array", label: "t", values: ["n", "a", "g", "a", "r", "a", "m"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "active" }, pointers: [{ index: 3, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 1], ["n", 0], ["g", 0], ["r", 1], ["m", 1]], highlightKeys: ["a"] },
        ],
      },
      {
        description:
          "t[4] = 'r'. count['r'] = 1 - 1 = 0.",
        codeHighlightLines: [7, 8],
        structures: [
          { type: "array", label: "t", values: ["n", "a", "g", "a", "r", "a", "m"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "active" }, pointers: [{ index: 4, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 1], ["n", 0], ["g", 0], ["r", 0], ["m", 1]], highlightKeys: ["r"] },
        ],
      },
      {
        description:
          "t[5] = 'a'. count['a'] = 1 - 1 = 0.",
        codeHighlightLines: [7, 8],
        structures: [
          { type: "array", label: "t", values: ["n", "a", "g", "a", "r", "a", "m"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "active" }, pointers: [{ index: 5, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 0], ["n", 0], ["g", 0], ["r", 0], ["m", 1]], highlightKeys: ["a"] },
        ],
      },
      {
        description:
          "t[6] = 'm'. count['m'] = 1 - 1 = 0. Every count is now zero!",
        codeHighlightLines: [7, 8],
        structures: [
          { type: "array", label: "t", values: ["n", "a", "g", "a", "r", "a", "m"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "checked", 6: "active" }, pointers: [{ index: 6, label: "c" }] },
          { type: "hashmap", label: "count", entries: [["a", 0], ["n", 0], ["g", 0], ["r", 0], ["m", 0]], highlightKeys: ["m"] },
        ],
      },
      {
        description:
          "Check: are all values 0? Yes! Every character in s was perfectly cancelled by t, so they are anagrams. Return True. Time: O(n) — two passes through the strings. Space: O(1) since the character set is bounded (at most 26 lowercase letters).",
        codeHighlightLines: [9],
        structures: [
          { type: "hashmap", label: "count", entries: [["a", 0], ["n", 0], ["g", 0], ["r", 0], ["m", 0]] },
          { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

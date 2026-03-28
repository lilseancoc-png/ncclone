import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Brute Force",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(min(n, m))",
    code: `def length_of_longest_substring(s):
    max_len = 0
    for i in range(len(s)):
        seen = set()
        for j in range(i, len(s)):
            if s[j] in seen:
                break
            seen.add(s[j])
        max_len = max(max_len, len(seen))
    return max_len`,
    steps: [
      {
        description:
          "Find the longest substring without repeating characters. Brute force: try every starting position i, expand j until we hit a duplicate. Track the max length seen. Input: \"abcabcbb\".",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"] },
          { type: "variables", entries: [{ name: "max_len", value: 0 }] },
        ],
      },
      {
        description:
          "i=0: j=0('a'), j=1('b'), j=2('c'), j=3('a') — 'a' already in seen! Break. Length = 3 (\"abc\"). max_len = 3.",
        codeHighlightLines: [4, 5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"], highlights: { 0: "active", 1: "active", 2: "active", 3: "found" }, pointers: [{ index: 0, label: "i" }, { index: 3, label: "j" }] },
          { type: "set", label: "seen", values: ["a", "b", "c"] },
          { type: "variables", entries: [{ name: "max_len", value: 3, highlight: true }] },
        ],
      },
      {
        description:
          "i=1: \"bca\" has length 3. i=2: \"cab\" has length 3. i=3: \"abc\" length 3. i=4: \"bcb\" — hits 'b' at j=6, length 2. Remaining starts give ≤ 3. No improvement over max_len=3.",
        codeHighlightLines: [3, 4, 5],
        structures: [
          { type: "array", label: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "checked", 6: "checked", 7: "checked" } },
          { type: "variables", entries: [{ name: "max_len", value: 3 }] },
        ],
      },
      {
        description:
          "Return 3. Time: O(n²) — for each starting position, we may scan up to n characters. Space: O(min(n, m)) where m is the character set size. The sliding window approach (Approach 2) eliminates redundant work.",
        codeHighlightLines: [10],
        structures: [
          { type: "array", label: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"], highlights: { 0: "success", 1: "success", 2: "success" } },
          { type: "variables", entries: [{ name: "return", value: 3, highlight: true }] },
        ],
      },
    ],
  },
  {
    label: "Optimal — Sliding Window",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, m))",
    code: `def length_of_longest_substring(s):
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len`,
    steps: [
      {
        description:
          "Sliding window: maintain a window [left, right] with no duplicates. Expand right to include new chars. When we hit a duplicate, shrink from the left until the duplicate is removed. Each character is added and removed at most once → O(n).",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          { type: "array", label: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"] },
          { type: "set", label: "char_set", values: [] },
          { type: "variables", entries: [{ name: "left", value: 0 }, { name: "max_len", value: 0 }] },
        ],
      },
      {
        description:
          "right=0: 'a' not in set → add. Window = \"a\", length 1. right=1: 'b' not in set → add. Window = \"ab\", length 2. right=2: 'c' not in set → add. Window = \"abc\", length 3. max_len = 3.",
        codeHighlightLines: [5, 9, 10],
        structures: [
          { type: "array", label: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"], highlights: { 0: "active", 1: "active", 2: "active" }, pointers: [{ index: 0, label: "L" }, { index: 2, label: "R" }] },
          { type: "set", label: "char_set", values: ["a", "b", "c"] },
          { type: "variables", entries: [{ name: "window", value: "\"abc\"" }, { name: "max_len", value: 3, highlight: true }] },
        ],
      },
      {
        description:
          "right=3: 'a' IS in set! Shrink: remove s[left]='a', left moves to 1. Now 'a' is gone from the set. Add s[3]='a'. Window = \"bca\", length 3. max_len stays 3.",
        codeHighlightLines: [6, 7, 8, 9],
        structures: [
          { type: "array", label: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"], highlights: { 0: "checked", 1: "active", 2: "active", 3: "active" }, pointers: [{ index: 1, label: "L" }, { index: 3, label: "R" }] },
          { type: "set", label: "char_set", values: ["b", "c", "a"] },
          { type: "variables", entries: [{ name: "window", value: "\"bca\"" }, { name: "max_len", value: 3 }] },
        ],
      },
      {
        description:
          "right=4: 'b' in set. Remove s[1]='b', left=2. 'b' gone. Add s[4]='b'. Window = \"cab\". right=5: 'c' in set. Remove s[2]='c', left=3. Add 'c'. Window = \"abc\". Still length 3.",
        codeHighlightLines: [6, 7, 8, 9],
        structures: [
          { type: "array", label: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"], highlights: { 3: "active", 4: "active", 5: "active" }, pointers: [{ index: 3, label: "L" }, { index: 5, label: "R" }] },
          { type: "set", label: "char_set", values: ["a", "b", "c"] },
          { type: "variables", entries: [{ name: "window", value: "\"abc\"" }, { name: "max_len", value: 3 }] },
        ],
      },
      {
        description:
          "right=6: 'b' in set. Remove until 'b' gone: remove 'a' (left=4), remove 'b' (left=5). Add 'b'. Window = \"cb\". right=7: 'b' in set again. Remove 'c' (left=6), remove 'b' (left=7). Add 'b'. Window = \"b\".",
        codeHighlightLines: [6, 7, 8],
        structures: [
          { type: "array", label: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"], highlights: { 7: "active" }, pointers: [{ index: 7, label: "L=R" }] },
          { type: "set", label: "char_set", values: ["b"] },
          { type: "variables", entries: [{ name: "window", value: "\"b\"" }, { name: "max_len", value: 3 }] },
        ],
      },
      {
        description:
          "Return 3 (\"abc\"). Time: O(n) — each character is added to and removed from the set at most once, so the while loop runs at most n times total. Space: O(min(n, m)) for the set. The window slides efficiently without restarting from scratch.",
        codeHighlightLines: [11],
        structures: [
          { type: "array", label: "s", values: ["a", "b", "c", "a", "b", "c", "b", "b"], highlights: { 0: "success", 1: "success", 2: "success" } },
          { type: "variables", entries: [{ name: "return", value: 3, highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

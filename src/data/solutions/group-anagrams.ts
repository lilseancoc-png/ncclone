import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  // ── Approach 1: Sorting as Key ───────────────────────────────────────
  {
    label: "Sorting as Key",
    timeComplexity: "O(n · k log k)",
    spaceComplexity: "O(n · k)",
    code: `from collections import defaultdict

def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))
        groups[key].append(s)
    return list(groups.values())`,
    steps: [
      {
        description:
          "We want to group words that are anagrams of each other. The key insight: anagrams have the same letters when sorted. So sorted(\"eat\") and sorted(\"tea\") both give ('a','e','t'). We'll use sorted letters as a dictionary key to group them automatically.",
        codeHighlightLines: [1, 3, 4],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"] },
          { type: "hashmap", label: "groups (sorted key → words)", entries: [] },
        ],
      },
      {
        description:
          "s = \"eat\". Sort it → ('a','e','t'). This key doesn't exist in groups yet, so defaultdict automatically creates an empty list. Append \"eat\" to that list.",
        codeHighlightLines: [5, 6, 7],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], highlights: { 0: "active" }, pointers: [{ index: 0, label: "s" }] },
          { type: "variables", entries: [{ name: "key", value: "('a','e','t')", highlight: true }] },
          { type: "hashmap", label: "groups", entries: [["aet", "[\"eat\"]"]], highlightKeys: ["aet"] },
        ],
      },
      {
        description:
          "s = \"tea\". Sort it → ('a','e','t'). Same key as \"eat\"! Append \"tea\" to the existing list. This is how anagrams get grouped together — they produce identical sorted keys.",
        codeHighlightLines: [5, 6, 7],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "s" }] },
          { type: "variables", entries: [{ name: "key", value: "('a','e','t')", highlight: true }] },
          { type: "hashmap", label: "groups", entries: [["aet", "[\"eat\",\"tea\"]"]], highlightKeys: ["aet"] },
        ],
      },
      {
        description:
          "s = \"tan\". Sort it → ('a','n','t'). This is a new key — defaultdict creates a fresh list. Append \"tan\".",
        codeHighlightLines: [5, 6, 7],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], highlights: { 0: "checked", 1: "checked", 2: "active" }, pointers: [{ index: 2, label: "s" }] },
          { type: "variables", entries: [{ name: "key", value: "('a','n','t')", highlight: true }] },
          { type: "hashmap", label: "groups", entries: [["aet", "[\"eat\",\"tea\"]"], ["ant", "[\"tan\"]"]], highlightKeys: ["ant"] },
        ],
      },
      {
        description:
          "s = \"ate\". Sort it → ('a','e','t'). Matches the first group again. Append \"ate\" — now three words share this key.",
        codeHighlightLines: [5, 6, 7],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "active" }, pointers: [{ index: 3, label: "s" }] },
          { type: "variables", entries: [{ name: "key", value: "('a','e','t')", highlight: true }] },
          { type: "hashmap", label: "groups", entries: [["aet", "[\"eat\",\"tea\",\"ate\"]"], ["ant", "[\"tan\"]"]], highlightKeys: ["aet"] },
        ],
      },
      {
        description:
          "s = \"nat\". Sort it → ('a','n','t'). Matches the second group. Append \"nat\".",
        codeHighlightLines: [5, 6, 7],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "active" }, pointers: [{ index: 4, label: "s" }] },
          { type: "variables", entries: [{ name: "key", value: "('a','n','t')", highlight: true }] },
          { type: "hashmap", label: "groups", entries: [["aet", "[\"eat\",\"tea\",\"ate\"]"], ["ant", "[\"tan\",\"nat\"]"]], highlightKeys: ["ant"] },
        ],
      },
      {
        description:
          "s = \"bat\". Sort it → ('a','b','t'). New key — create a third group with just \"bat\".",
        codeHighlightLines: [5, 6, 7],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "active" }, pointers: [{ index: 5, label: "s" }] },
          { type: "variables", entries: [{ name: "key", value: "('a','b','t')", highlight: true }] },
          { type: "hashmap", label: "groups", entries: [["aet", "[\"eat\",\"tea\",\"ate\"]"], ["ant", "[\"tan\",\"nat\"]"], ["abt", "[\"bat\"]"]], highlightKeys: ["abt"] },
        ],
      },
      {
        description:
          "All strings processed. Return the dictionary values as a list of lists. Time: O(n · k log k) where n is the number of strings and k is the max string length (sorting each string costs O(k log k)). Space: O(n · k) to store all strings in the output.",
        codeHighlightLines: [8],
        structures: [
          { type: "hashmap", label: "groups", entries: [["aet", "[\"eat\",\"tea\",\"ate\"]"], ["ant", "[\"tan\",\"nat\"]"], ["abt", "[\"bat\"]"]] },
          { type: "variables", entries: [{ name: "return", value: "3 groups", highlight: true }] },
        ],
      },
    ],
  },

  // ── Approach 2: Optimal — Character Count Key ────────────────────────
  {
    label: "Optimal — Character Count Key",
    timeComplexity: "O(n · k)",
    spaceComplexity: "O(n · k)",
    code: `from collections import defaultdict

def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        count = [0] * 26
        for c in s:
            count[ord(c) - ord('a')] += 1
        groups[tuple(count)].append(s)
    return list(groups.values())`,
    steps: [
      {
        description:
          "Instead of sorting each string (O(k log k)), we can build a character frequency tuple in O(k). Create an array of 26 zeros (one per letter), count each character, then use that tuple as the dictionary key. Anagrams produce identical count tuples.",
        codeHighlightLines: [1, 3, 4],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"] },
          { type: "hashmap", label: "groups (count tuple → words)", entries: [] },
        ],
      },
      {
        description:
          "s = \"eat\". Count characters: e→1, a→1, t→1. The tuple has 1s at positions 0(a), 4(e), 19(t) and 0s elsewhere. This is our key. Append \"eat\".",
        codeHighlightLines: [5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], highlights: { 0: "active" }, pointers: [{ index: 0, label: "s" }] },
          { type: "variables", entries: [{ name: "count key", value: "(1,0,0,0,1,...,1,...)", highlight: true }] },
          { type: "hashmap", label: "groups", entries: [["(a:1,e:1,t:1)", "[\"eat\"]"]], highlightKeys: ["(a:1,e:1,t:1)"] },
        ],
      },
      {
        description:
          "s = \"tea\". Count: t→1, e→1, a→1. Same counts as \"eat\" — the tuple is identical regardless of letter order. That's why this works for anagrams! Append \"tea\" to the same group.",
        codeHighlightLines: [5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "s" }] },
          { type: "variables", entries: [{ name: "count key", value: "(1,0,0,0,1,...,1,...)", highlight: true }] },
          { type: "hashmap", label: "groups", entries: [["(a:1,e:1,t:1)", "[\"eat\",\"tea\"]"]], highlightKeys: ["(a:1,e:1,t:1)"] },
        ],
      },
      {
        description:
          "s = \"tan\". Count: t→1, a→1, n→1. Different from the first group (has 'n' instead of 'e'). New key, new group.",
        codeHighlightLines: [5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], highlights: { 0: "checked", 1: "checked", 2: "active" }, pointers: [{ index: 2, label: "s" }] },
          { type: "variables", entries: [{ name: "count key", value: "(1,0,...,1,...,1,...)", highlight: true }] },
          { type: "hashmap", label: "groups", entries: [["(a:1,e:1,t:1)", "[\"eat\",\"tea\"]"], ["(a:1,n:1,t:1)", "[\"tan\"]"]], highlightKeys: ["(a:1,n:1,t:1)"] },
        ],
      },
      {
        description:
          "s = \"ate\". Count: a→1, t→1, e→1. Same tuple as \"eat\"/\"tea\". Append to first group.",
        codeHighlightLines: [5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "active" }, pointers: [{ index: 3, label: "s" }] },
          { type: "variables", entries: [{ name: "count key", value: "(1,0,0,0,1,...,1,...)", highlight: true }] },
          { type: "hashmap", label: "groups", entries: [["(a:1,e:1,t:1)", "[\"eat\",\"tea\",\"ate\"]"], ["(a:1,n:1,t:1)", "[\"tan\"]"]], highlightKeys: ["(a:1,e:1,t:1)"] },
        ],
      },
      {
        description:
          "s = \"nat\". Count: n→1, a→1, t→1. Same tuple as \"tan\". Append to second group.",
        codeHighlightLines: [5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "active" }, pointers: [{ index: 4, label: "s" }] },
          { type: "variables", entries: [{ name: "count key", value: "(1,0,...,1,...,1,...)", highlight: true }] },
          { type: "hashmap", label: "groups", entries: [["(a:1,e:1,t:1)", "[\"eat\",\"tea\",\"ate\"]"], ["(a:1,n:1,t:1)", "[\"tan\",\"nat\"]"]], highlightKeys: ["(a:1,n:1,t:1)"] },
        ],
      },
      {
        description:
          "s = \"bat\". Count: b→1, a→1, t→1. New key — third group.",
        codeHighlightLines: [5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "strs", values: ["eat", "tea", "tan", "ate", "nat", "bat"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "active" }, pointers: [{ index: 5, label: "s" }] },
          { type: "variables", entries: [{ name: "count key", value: "(1,1,...,0,...,1,...)", highlight: true }] },
          { type: "hashmap", label: "groups", entries: [["(a:1,e:1,t:1)", "[\"eat\",\"tea\",\"ate\"]"], ["(a:1,n:1,t:1)", "[\"tan\",\"nat\"]"], ["(a:1,b:1,t:1)", "[\"bat\"]"]], highlightKeys: ["(a:1,b:1,t:1)"] },
        ],
      },
      {
        description:
          "Return the 3 groups. Time: O(n · k) where n is the number of strings and k is the max string length — we avoid sorting each string, replacing O(k log k) per string with O(k). Space: O(n · k). This is optimal because we must read every character at least once.",
        codeHighlightLines: [10],
        structures: [
          { type: "hashmap", label: "groups", entries: [["(a:1,e:1,t:1)", "[\"eat\",\"tea\",\"ate\"]"], ["(a:1,n:1,t:1)", "[\"tan\",\"nat\"]"], ["(a:1,b:1,t:1)", "[\"bat\"]"]] },
          { type: "variables", entries: [{ name: "return", value: "3 groups", highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

import { SolutionData } from "../types";

const solution: SolutionData = {
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
        "We want to group words that are anagrams of each other. The key insight: anagrams have the same letters when sorted. So sorted(\"eat\") and sorted(\"tea\") both give ['a','e','t']. We'll use sorted letters as a dictionary key.",
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
        "s = \"tea\". Sort it → ('a','e','t'). Same key as \"eat\"! Append \"tea\" to the existing list. This is how anagrams get grouped together.",
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
        "All strings processed. Return the dictionary values as a list of lists. Time: O(n * k log k) where k is the max string length (for sorting). Space: O(n * k) to store all strings.",
      codeHighlightLines: [8],
      structures: [
        { type: "hashmap", label: "groups", entries: [["aet", "[\"eat\",\"tea\",\"ate\"]"], ["ant", "[\"tan\",\"nat\"]"], ["abt", "[\"bat\"]"]] },
        { type: "variables", entries: [{ name: "return", value: "3 groups", highlight: true }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def partition(s):
    result = []

    def is_palindrome(s, l, r):
        while l < r:
            if s[l] != s[r]:
                return False
            l += 1; r -= 1
        return True

    def backtrack(start, path):
        if start == len(s):
            result.append(path[:])
            return
        for end in range(start, len(s)):
            if is_palindrome(s, start, end):
                path.append(s[start:end+1])
                backtrack(end + 1, path)
                path.pop()

    backtrack(0, [])
    return result`,
  steps: [
    {
      description:
        "Partition s=\"aab\" into all possible lists of palindromic substrings. At each position, try every possible cut and check if the substring is a palindrome before recursing.",
      codeHighlightLines: [1, 2, 10, 11],
      structures: [
        { type: "array", label: "s", values: ["a", "a", "b"] },
        { type: "array", label: "path", values: [] },
        { type: "array", label: "result", values: [] },
        { type: "variables", entries: [{ name: "start", value: 0 }] },
      ],
    },
    {
      description:
        "From start=0, try cut at end=0: \"a\" is a palindrome. Add to path. Recurse from start=1. Try cut at end=1: \"a\" is a palindrome. Recurse from start=2. Cut at end=2: \"b\" is a palindrome. Reached end, add [\"a\",\"a\",\"b\"] to result.",
      codeHighlightLines: [14, 15, 16, 17],
      structures: [
        { type: "array", label: "s", values: ["a", "a", "b"], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "array", label: "path", values: ["a", "a", "b"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "result", values: ["[a,a,b]"], highlights: { 0: "success" } },
      ],
    },
    {
      description:
        "Backtrack to start=1. Try cut at end=2: \"ab\" is NOT a palindrome (a!=b), so skip. Backtrack to start=0. Try cut at end=1: \"aa\" IS a palindrome. Recurse from start=2.",
      codeHighlightLines: [14, 15],
      structures: [
        { type: "array", label: "s", values: ["a", "a", "b"], highlights: { 0: "active", 1: "active" } },
        { type: "array", label: "path", values: ["aa"], highlights: { 0: "found" } },
        {
          type: "variables",
          entries: [
            { name: "substring", value: "aa" },
            { name: "palindrome?", value: "yes", highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "From start=2, \"b\" is a palindrome. Path=[\"aa\",\"b\"], reached end. Add to result. Try cut \"aab\" from start=0 — not a palindrome, skip. All partitions found.",
      codeHighlightLines: [12, 13, 14, 15],
      structures: [
        { type: "array", label: "s", values: ["a", "a", "b"], highlights: { 0: "success", 1: "success", 2: "success" } },
        {
          type: "array",
          label: "result (final)",
          values: ["[a,a,b]", "[aa,b]"],
          highlights: { 0: "success", 1: "success" },
        },
        {
          type: "variables",
          entries: [{ name: "total partitions", value: 2, highlight: true }],
        },
      ],
    },
  ],
};

export default solution;

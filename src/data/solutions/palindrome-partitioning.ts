import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Backtracking",
    timeComplexity: "O(n * 2^n)",
    spaceComplexity: "O(n)",
    code: `def partition(s):
    result = []
    def backtrack(start, path):
        if start == len(s):
            result.append(path[:])
            return
        for end in range(start + 1, len(s) + 1):
            substring = s[start:end]
            if substring == substring[::-1]:
                path.append(substring)
                backtrack(end, path)
                path.pop()
    backtrack(0, [])
    return result`,
    steps: [
      {
        description:
          "Partition a string into substrings such that every substring is a palindrome, and return all possible partitions. This is a backtracking problem: at each position, we try every possible cut. If the substring from the current position to the cut point is a palindrome, we include it and recurse on the remainder. The decision tree branches at each position with up to n choices (all possible end points). s='aab'.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "string",
            values: ["a", "a", "b"],
            highlights: {},
          },
          { type: "variables", entries: [{ name: "goal", value: "every piece must be a palindrome" }] },
        ],
      },
      {
        description:
          "start=0: Try cutting after index 0 → substring 'a'. Is 'a' a palindrome? Yes (single char always is). Add to path, recurse with start=1. At start=1: try 'a' (palindrome ✓), recurse start=2. At start=2: try 'b' (palindrome ✓), recurse start=3. start=3 == len(s) — we've partitioned the entire string! Add ['a','a','b'] to result. This is the finest possible partition: every character is its own palindrome.",
        codeHighlightLines: [4, 5, 6, 7, 8, 9, 10, 11],
        structures: [
          {
            type: "array",
            label: "string",
            values: ["a", "a", "b"],
            highlights: { 0: "active", 1: "active", 2: "active" },
          },
          {
            type: "variables",
            entries: [{ name: "path", value: "['a', 'a', 'b']", highlight: true }, { name: "partition 1", value: "a | a | b" }],
          },
        ],
      },
      {
        description:
          "Backtrack to start=1 and try a longer cut: 'ab'. Is 'ab' a palindrome? No ('ab' ≠ 'ba'), skip. Backtrack all the way to start=0 and try a longer cut: 'aa'. Is 'aa' a palindrome? Yes! Add 'aa' to path, recurse with start=2. Try 'b' ✓. start=3 — done! Add ['aa','b'] to result. The palindrome check prunes many branches: 'aab' is not a palindrome, so the partition ['aab'] is never attempted.",
        codeHighlightLines: [7, 8, 9, 10, 11],
        structures: [
          {
            type: "array",
            label: "string",
            values: ["a", "a", "b"],
            highlights: { 0: "success", 1: "success" },
          },
          {
            type: "variables",
            entries: [
              { name: "path", value: "['aa', 'b']", highlight: true },
              { name: "'ab' palindrome?", value: "No → pruned" },
              { name: "'aab' palindrome?", value: "No → pruned" },
            ],
          },
        ],
      },
      {
        description:
          "Final result: [['a','a','b'], ['aa','b']]. Both are valid palindrome partitions. The backtracking explores all 2^(n-1) possible cut positions (between each pair of characters, we either cut or don't). Palindrome checking prunes invalid branches early. Time: O(n × 2^n) — up to 2^n partitions, each taking O(n) to validate and copy. Space: O(n) for recursion depth. Can be optimized with DP precomputation of palindrome checks.",
        codeHighlightLines: [13, 14],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "return", value: "[['a','a','b'], ['aa','b']]", highlight: true },
              { name: "partitions found", value: 2 },
              { name: "Time", value: "O(n × 2^n)" },
              { name: "Space", value: "O(n)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

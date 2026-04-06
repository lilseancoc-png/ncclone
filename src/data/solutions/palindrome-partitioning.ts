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
          "Partition a string so every substring is a palindrome. Use backtracking: at each position, try all possible substrings starting there. If it's a palindrome, add it to the path and recurse from the end of that substring.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "string",
            values: ["a", "a", "b"],
            highlights: {},
          },
        ],
      },
      {
        description:
          "start=0: Try 'a' (palindrome ✓). Recurse from index 1. Try 'a' (palindrome ✓). Recurse from 2. Try 'b' (palindrome ✓). start=3 == len(s) → add ['a','a','b'] to result.",
        codeHighlightLines: [7, 8, 9, 10, 11],
        structures: [
          {
            type: "array",
            label: "string",
            values: ["a", "a", "b"],
            highlights: { 0: "active", 1: "active", 2: "active" },
          },
          {
            type: "variables",
            entries: [{ name: "path", value: "['a', 'a', 'b']", highlight: true }],
          },
        ],
      },
      {
        description:
          "Backtrack to start=1. Try 'ab' — not a palindrome, skip. Back to start=0. Try 'aa' (palindrome ✓). Recurse from 2. Try 'b' ✓. Add ['aa','b']. Try 'aab' — not palindrome, skip.",
        codeHighlightLines: [8, 9],
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
              { name: "'ab' palindrome?", value: "No → skip" },
            ],
          },
        ],
      },
      {
        description:
          "Final result: [['a','a','b'], ['aa','b']]. Every partition contains only palindromic substrings. The backtracking tree explores O(2^n) partitions, and palindrome checking takes O(n) each.",
        codeHighlightLines: [13, 14],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "return", value: "[['a','a','b'], ['aa','b']]", highlight: true },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

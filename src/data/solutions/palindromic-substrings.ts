import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Expand Around Center",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    code: `def countSubstrings(s):
    count = 0
    for i in range(len(s)):
        # Odd length palindromes
        l, r = i, i
        while l >= 0 and r < len(s) and s[l] == s[r]:
            count += 1
            l -= 1
            r += 1
        # Even length palindromes
        l, r = i, i + 1
        while l >= 0 and r < len(s) and s[l] == s[r]:
            count += 1
            l -= 1
            r += 1
    return count`,
    steps: [
      {
        description:
          "Count all palindromic substrings. For each position, expand outward checking both odd-length (center = single char) and even-length (center = between two chars) palindromes. Each expansion stops when characters don't match.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "s",
            values: ["a", "b", "c"],
            highlights: {},
          },
          { type: "variables", entries: [{ name: "count", value: 0 }] },
        ],
      },
      {
        description:
          "i=0: Odd — 'a' is palindrome (count=1). Expand: s[-1] out of bounds, stop. Even — s[0]='a' != s[1]='b', stop. i=1: Odd — 'b' (count=2). Even — s[1]!= s[2], stop.",
        codeHighlightLines: [5, 6, 7, 8, 9, 11, 12],
        structures: [
          {
            type: "array",
            label: "s",
            values: ["a", "b", "c"],
            highlights: { 0: "active", 1: "active" },
          },
          { type: "variables", entries: [{ name: "count", value: 2, highlight: true }] },
        ],
      },
      {
        description:
          "i=2: Odd — 'c' (count=3). Even — r=3 out of bounds. Done! For 'abc', there are 3 palindromic substrings: 'a', 'b', 'c' (each single character). For 'aaa' we'd find 6: 'a','a','a','aa','aa','aaa'.",
        codeHighlightLines: [16],
        structures: [
          {
            type: "array",
            label: "s",
            values: ["a", "b", "c"],
            highlights: { 0: "success", 1: "success", 2: "success" },
          },
          { type: "variables", entries: [{ name: "return", value: 3, highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

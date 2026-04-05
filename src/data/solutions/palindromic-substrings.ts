import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Expand from Center",
  timeComplexity: "O(n²)",
  spaceComplexity: "O(1)",

  steps: [
    {
      description: "For each center, expand outward counting palindromes. Try both odd and even lengths.",
      codeHighlightLines: [3, 5],
      structures: [
        { type: "array", label: "s = 'aaa'", values: ["a", "a", "a"], highlights: { 0: "active" } },
        { type: "variables", label: "Center i=0", entries: [{ name: "odd: 'a'", value: "palindrome ✓" }, { name: "count", value: 1 }] },
      ],
    },
    {
      description: "Center i=1: odd expansions find 'a'(1), 'aaa'(3). Even: 'aa'(2). Count growing.",
      codeHighlightLines: [6, 7],
      structures: [
        { type: "array", label: "s = 'aaa'", values: ["a", "a", "a"], highlights: { 0: "pointer-i", 1: "active", 2: "pointer-j" } },
        { type: "variables", label: "Center i=1", entries: [{ name: "'a'", value: "+1" }, { name: "'aaa'", value: "+1" }, { name: "'aa' (even)", value: "+1" }, { name: "count", value: "4 so far" }] },
      ],
    },
    {
      description: "Process all centers. Total palindromic substrings in 'aaa' = 6: 'a','a','a','aa','aa','aaa'.",
      codeHighlightLines: [16],
      structures: [
        { type: "array", label: "s = 'aaa'", values: ["a", "a", "a"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "count", value: 6 }] },
      ],
    },
  ],
};

export default solution;

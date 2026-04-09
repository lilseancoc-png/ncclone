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
          "Count all palindromic substrings in a string. A palindrome reads the same forwards and backwards (e.g., 'aba', 'aa'). The key insight: every palindrome has a center, and we can expand outward from that center to find all palindromes. For each position i, we try two types of centers: odd-length (single character center like 'aba') and even-length (between two characters like 'aa'). s='aab'.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "s",
            values: ["a", "a", "b"],
          },
          { type: "variables", entries: [{ name: "count", value: 0 }, { name: "strategy", value: "expand from each center" }] },
        ],
      },
      {
        description:
          "i=0: Odd-length — center at 'a'. l=0, r=0: s[0]='a' == s[0]='a' → palindrome 'a'! count=1. Expand: l=-1, out of bounds, stop. Even-length — l=0, r=1: s[0]='a' == s[1]='a' → palindrome 'aa'! count=2. Expand: l=-1, out of bounds, stop. From center 0, we found 2 palindromes: 'a' and 'aa'.",
        codeHighlightLines: [5, 6, 7, 8, 9, 11, 12, 13],
        structures: [
          {
            type: "array",
            label: "s",
            values: ["a", "a", "b"],
            highlights: { 0: "active", 1: "active" },
            pointers: [{ index: 0, label: "i" }],
          },
          { type: "variables", entries: [{ name: "count", value: 2, highlight: true }, { name: "found", value: "'a', 'aa'" }] },
        ],
      },
      {
        description:
          "i=1: Odd-length — center at 'a'. l=1, r=1: 'a' → palindrome! count=3. Expand: l=0, r=2: s[0]='a' != s[2]='b' → stop. 'aab' is NOT a palindrome. Even-length — l=1, r=2: s[1]='a' != s[2]='b' → stop immediately. From center 1: only 1 new palindrome ('a').",
        codeHighlightLines: [5, 6, 7, 8, 9, 11, 12],
        structures: [
          {
            type: "array",
            label: "s",
            values: ["a", "a", "b"],
            highlights: { 0: "checked", 1: "active" },
            pointers: [{ index: 1, label: "i" }],
          },
          { type: "variables", entries: [{ name: "count", value: 3, highlight: true }, { name: "found so far", value: "'a', 'aa', 'a'" }] },
        ],
      },
      {
        description:
          "i=2: Odd-length — center at 'b'. l=2, r=2: 'b' → palindrome! count=4. Expand: r=3, out of bounds, stop. Even-length — r=3, out of bounds, stop immediately. All centers explored! Return 4. The palindromic substrings are: 'a' (pos 0), 'a' (pos 1), 'b' (pos 2), and 'aa' (pos 0-1). Time: O(n²) — n centers, each expansion up to O(n). Space: O(1) — just pointers.",
        codeHighlightLines: [5, 6, 7, 16],
        structures: [
          {
            type: "array",
            label: "s",
            values: ["a", "a", "b"],
            highlights: { 0: "success", 1: "success", 2: "success" },
          },
          { type: "variables", entries: [{ name: "return", value: 4, highlight: true }, { name: "palindromes", value: "'a','a','b','aa'" }, { name: "Time", value: "O(n²)" }] },
        ],
      },
    ],
  },
];

export default solutions;

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
          "Count all palindromic substrings. Every palindrome has a center — expand outward to find all of them. Two center types: odd-length ('aba' centered at 'b') and even-length ('aa' centered between two chars). For each index i, try both. s='aab'. Expected palindromes: 'a','a','b','aa' = 4.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "s", values: ["a", "a", "b"] },
          { type: "variables", entries: [{ name: "count", value: 0 }, { name: "centers", value: "n odd + n even = 2n-1 total" }] },
        ],
      },
      {
        description:
          "i=0, Odd expansion: center at s[0]='a'. l=0, r=0: s[0]==s[0] → palindrome 'a'! count=1. Expand l=-1: out of bounds, stop. Even expansion: l=0, r=1: s[0]='a'==s[1]='a' → palindrome 'aa'! count=2. Expand l=-1: out of bounds, stop. Center 0 found 2 palindromes.",
        codeHighlightLines: [5, 6, 7, 8, 9, 11, 12, 13],
        structures: [
          { type: "array", label: "s", values: ["a", "a", "b"], highlights: { 0: "active", 1: "active" } },
          { type: "variables", entries: [{ name: "odd: 'a'", value: "palindrome ✓ (count=1)" }, { name: "even: 'aa'", value: "palindrome ✓ (count=2)", highlight: true }] },
        ],
      },
      {
        description:
          "i=1, Odd expansion: center at s[1]='a'. l=1, r=1: palindrome 'a'! count=3. Expand: l=0, r=2: s[0]='a' ≠ s[2]='b' → stop. 'aab' is NOT a palindrome. Even expansion: l=1, r=2: s[1]='a' ≠ s[2]='b' → stop immediately. Center 1 found only 1 palindrome.",
        codeHighlightLines: [5, 6, 7, 8, 9, 11, 12],
        structures: [
          { type: "array", label: "s", values: ["a", "a", "b"], highlights: { 1: "active" } },
          { type: "variables", entries: [{ name: "odd: 'a'", value: "palindrome ✓ (count=3)" }, { name: "odd expand: 'aab'", value: "a≠b → stop" }, { name: "even: 'ab'", value: "a≠b → stop" }] },
        ],
      },
      {
        description:
          "i=2, Odd expansion: center at s[2]='b'. l=2, r=2: palindrome 'b'! count=4. Expand: r=3 out of bounds, stop. Even expansion: l=2, r=3: out of bounds, stop immediately. Center 2 found 1 palindrome. All centers exhausted.",
        codeHighlightLines: [5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "s", values: ["a", "a", "b"], highlights: { 2: "active" } },
          { type: "variables", entries: [{ name: "odd: 'b'", value: "palindrome ✓ (count=4)", highlight: true }, { name: "even", value: "r=3 OOB → stop" }] },
        ],
      },
      {
        description:
          "Return 4. Palindromic substrings: 'a' (pos 0), 'a' (pos 1), 'b' (pos 2), 'aa' (pos 0-1). Single chars are always palindromes (n guaranteed). The expansion catches multi-char ones. Time: O(n²) — n centers × up to O(n) expansion each. Space: O(1) — just two pointers per expansion.",
        codeHighlightLines: [16],
        structures: [
          { type: "array", label: "s", values: ["a", "a", "b"], highlights: { 0: "success", 1: "success", 2: "success" } },
          { type: "variables", entries: [{ name: "return", value: 4, highlight: true }, { name: "palindromes", value: "'a','a','b','aa'" }, { name: "Time", value: "O(n²)" }, { name: "Space", value: "O(1)" }] },
        ],
      },
    ],
  },
];

export default solutions;

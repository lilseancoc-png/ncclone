import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Brute Force — Check All Substrings",
    timeComplexity: "O(n^3)",
    spaceComplexity: "O(1)",
    code: `def longestPalindrome(s):
    def is_palindrome(l, r):
        while l < r:
            if s[l] != s[r]: return False
            l += 1; r -= 1
        return True
    res = ""
    for i in range(len(s)):
        for j in range(i, len(s)):
            if j - i + 1 > len(res) and is_palindrome(i, j):
                res = s[i:j+1]
    return res`,
    steps: [
      {
        description:
          "Find the longest palindromic substring in s=\"babad\". Brute force: check every possible substring (i, j) and test if it is a palindrome. O(n^2) substrings, each takes O(n) to verify.",
        codeHighlightLines: [1, 7, 8, 9],
        structures: [
          { type: "array", label: "s", values: ["b", "a", "b", "a", "d"] },
          { type: "variables", entries: [{ name: "res", value: "\"\"" }, { name: "substrings", value: "n*(n+1)/2 = 15" }] },
        ],
      },
      {
        description:
          "Check substrings starting at i=0: \"b\" is palindrome (len 1), \"ba\" not, \"bab\" is palindrome (len 3)! Update res=\"bab\". \"baba\" not, \"babad\" not.",
        codeHighlightLines: [9, 10, 11],
        structures: [
          { type: "array", label: "s", values: ["b", "a", "b", "a", "d"], highlights: { 0: "active", 1: "active", 2: "active" }, pointers: [{ index: 0, label: "i" }, { index: 2, label: "j" }] },
          { type: "variables", entries: [{ name: "res", value: "\"bab\"", highlight: true }, { name: "len", value: 3 }] },
        ],
      },
      {
        description:
          "Continue checking: i=1 finds \"aba\" (len 3, same length as \"bab\"). i=2, i=3, i=4 find nothing longer. Return \"bab\" (or \"aba\" — both valid). This approach is O(n^3) which is too slow for large inputs.",
        codeHighlightLines: [12],
        structures: [
          { type: "array", label: "s", values: ["b", "a", "b", "a", "d"], highlights: { 0: "success", 1: "success", 2: "success" } },
          { type: "variables", entries: [{ name: "return", value: "\"bab\"", highlight: true }] },
        ],
      },
    ],
  },
  {
    label: "Optimal — Expand from Center",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    code: `def longestPalindrome(s):
    res = ""
    for i in range(len(s)):
        # Odd length palindromes
        l, r = i, i
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if r - l + 1 > len(res):
                res = s[l:r+1]
            l -= 1; r += 1
        # Even length palindromes
        l, r = i, i + 1
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if r - l + 1 > len(res):
                res = s[l:r+1]
            l -= 1; r += 1
    return res`,
    steps: [
      {
        description:
          "Key insight: every palindrome has a center. Expand outward from each possible center. There are 2n-1 centers (n odd-length + n-1 even-length). s=\"babad\". Start with res=\"\".",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "s", values: ["b", "a", "b", "a", "d"] },
          { type: "variables", entries: [{ name: "centers", value: "2*5-1 = 9" }, { name: "res", value: "\"\"" }] },
        ],
      },
      {
        description:
          "Center at i=0 ('b'): expand — l=0, r=0 gives \"b\". Can't expand further (l would be -1). Center i=1 ('a'): l=1, r=1 gives \"a\". Expand: l=0, r=2 — s[0]='b' == s[2]='b', so \"bab\" is palindrome! res=\"bab\".",
        codeHighlightLines: [4, 5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "s", values: ["b", "a", "b", "a", "d"], highlights: { 0: "pointer-j", 1: "active", 2: "pointer-j" }, pointers: [{ index: 0, label: "l" }, { index: 1, label: "center" }, { index: 2, label: "r" }] },
          { type: "variables", entries: [{ name: "palindrome", value: "\"bab\"" }, { name: "res", value: "\"bab\"", highlight: true }] },
        ],
      },
      {
        description:
          "Center i=2 ('b'): expand — l=1, r=3 gives s[1]='a' == s[3]='a', so \"aba\" (len 3). Expand more: l=0, r=4 gives s[0]='b' != s[4]='d', stop. \"aba\" ties with \"bab\". Center i=3: finds \"aba\" again. Center i=4: just \"d\".",
        codeHighlightLines: [5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "s", values: ["b", "a", "b", "a", "d"], highlights: { 1: "pointer-j", 2: "active", 3: "pointer-j" }, pointers: [{ index: 1, label: "l" }, { index: 2, label: "center" }, { index: 3, label: "r" }] },
          { type: "variables", entries: [{ name: "palindrome", value: "\"aba\"" }, { name: "res", value: "\"bab\" (same len)" }] },
        ],
      },
      {
        description:
          "Return \"bab\". Time: O(n^2) — for each of 2n-1 centers, expansion takes O(n) in worst case. Space: O(1) — only pointers, no extra data structures. This eliminates the redundant palindrome checking of brute force.",
        codeHighlightLines: [17],
        structures: [
          { type: "array", label: "s", values: ["b", "a", "b", "a", "d"], highlights: { 0: "success", 1: "success", 2: "success" } },
          { type: "variables", entries: [{ name: "return", value: "\"bab\"", highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

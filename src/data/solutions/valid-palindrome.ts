import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  // ── Approach 1: Reverse String ───────────────────────────────────────
  {
    label: "Reverse String",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: `def is_palindrome(s):
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]`,
    steps: [
      {
        description:
          "Check if \"A man, a plan, a canal: Panama\" is a palindrome. The simplest approach: strip non-alphanumeric characters, lowercase everything, then check if the string equals its reverse. Easy to understand but uses O(n) extra space for the cleaned and reversed copies.",
        codeHighlightLines: [1, 2],
        structures: [
          { type: "array", label: "original s", values: ["A", " ", "m", "a", "n", ",", " ", "a", " ", "p", "l", "a", "n", ",", " ", "a", " ", "c", "a", "n", "a", "l", ":", " ", "P", "a", "n", "a", "m", "a"] },
        ],
      },
      {
        description:
          "Strip non-alphanumeric characters and lowercase everything. \"A man, a plan, a canal: Panama\" → \"amanaplanacanalpanama\". This costs O(n) time and O(n) space to build the new string.",
        codeHighlightLines: [2],
        structures: [
          { type: "array", label: "cleaned", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"], highlights: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "active", 7: "active", 8: "active", 9: "active", 10: "active", 11: "active", 12: "active", 13: "active", 14: "active", 15: "active", 16: "active", 17: "active", 18: "active", 19: "active", 20: "active" } },
        ],
      },
      {
        description:
          "Reverse the cleaned string: \"amanaplanacanalpanama\" → \"amanaplanacanalpanama\". It reads the same forwards and backwards!",
        codeHighlightLines: [3],
        structures: [
          { type: "array", label: "cleaned", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success", 9: "success", 10: "success", 11: "success", 12: "success", 13: "success", 14: "success", 15: "success", 16: "success", 17: "success", 18: "success", 19: "success", 20: "success" } },
          { type: "array", label: "reversed", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success", 9: "success", 10: "success", 11: "success", 12: "success", 13: "success", 14: "success", 15: "success", 16: "success", 17: "success", 18: "success", 19: "success", 20: "success" } },
        ],
      },
      {
        description:
          "cleaned == reversed → True. It's a palindrome! Time: O(n) to clean + O(n) to reverse + O(n) to compare = O(n). Space: O(n) for storing the cleaned and reversed strings. Simple and readable, but the two-pointer approach (Approach 2) avoids the extra space.",
        codeHighlightLines: [3],
        structures: [
          { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
        ],
      },
    ],
  },

  // ── Approach 2: Optimal — Two Pointers ───────────────────────────────
  {
    label: "Optimal — Two Pointers",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True`,
    steps: [
      {
        description:
          "Instead of creating a cleaned copy, we use two pointers that skip non-alphanumeric characters in-place. This achieves O(1) space — we only need two index variables. Start left=0, right=end of string.",
        codeHighlightLines: [1, 2],
        structures: [
          { type: "array", label: "s (alphanumeric only)", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"] },
          { type: "variables", entries: [{ name: "left", value: 0 }, { name: "right", value: 20 }] },
        ],
      },
      {
        description:
          "Compare s[left]='a' and s[right]='a'. They match! Move both pointers inward. (In the real string, we'd skip spaces/punctuation — shown here on the cleaned version for clarity.)",
        codeHighlightLines: [8, 10, 11],
        structures: [
          { type: "array", label: "s", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"], highlights: { 0: "success", 20: "success" }, pointers: [{ index: 0, label: "L" }, { index: 20, label: "R" }] },
        ],
      },
      {
        description:
          "left=1, right=19. s[1]='m', s[19]='m'. Match! Continue.",
        codeHighlightLines: [8, 10, 11],
        structures: [
          { type: "array", label: "s", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"], highlights: { 0: "checked", 1: "success", 19: "success", 20: "checked" }, pointers: [{ index: 1, label: "L" }, { index: 19, label: "R" }] },
        ],
      },
      {
        description:
          "left=2, right=18. s[2]='a', s[18]='a'. Match! The pointers keep converging.",
        codeHighlightLines: [8, 10, 11],
        structures: [
          { type: "array", label: "s", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"], highlights: { 0: "checked", 1: "checked", 2: "success", 18: "success", 19: "checked", 20: "checked" }, pointers: [{ index: 2, label: "L" }, { index: 18, label: "R" }] },
        ],
      },
      {
        description:
          "Continue comparing pairs... left=5('p')==right=15('p'), left=6('l')==right=14('l'), etc. All pairs match as we converge toward the center.",
        codeHighlightLines: [3, 8],
        structures: [
          { type: "array", label: "s", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "checked", 6: "checked", 7: "checked", 8: "checked", 9: "success", 10: "active", 11: "success", 12: "checked", 13: "checked", 14: "checked", 15: "checked", 16: "checked", 17: "checked", 18: "checked", 19: "checked", 20: "checked" }, pointers: [{ index: 10, label: "L=R" }] },
        ],
      },
      {
        description:
          "The pointers have met in the middle at 'c'. All pairs matched — it's a palindrome! Return True. Time: O(n) — each pointer traverses at most n/2 positions. Space: O(1) — only two integer variables, no extra strings created.",
        codeHighlightLines: [12],
        structures: [
          { type: "array", label: "s", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success", 9: "success", 10: "success", 11: "success", 12: "success", 13: "success", 14: "success", 15: "success", 16: "success", 17: "success", 18: "success", 19: "success", 20: "success" } },
          { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

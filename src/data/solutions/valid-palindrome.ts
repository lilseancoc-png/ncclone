import { SolutionData } from "../types";

const solution: SolutionData = {
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
      description: "Check if \"A man, a plan, a canal: Panama\" is a palindrome. Use two pointers from both ends.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "s (alphanumeric only)", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"] },
        { type: "variables", entries: [{ name: "left", value: 0 }, { name: "right", value: 20 }] },
      ],
    },
    {
      description: "Compare s[left]='a' and s[right]='a'. They match! Move both pointers inward.",
      codeHighlightLines: [8, 10, 11],
      structures: [
        { type: "array", label: "s", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"], highlights: { 0: "success", 20: "success" }, pointers: [{ index: 0, label: "L" }, { index: 20, label: "R" }] },
      ],
    },
    {
      description: "Compare s[1]='m' and s[19]='m'. Match! Continue inward.",
      codeHighlightLines: [8, 10, 11],
      structures: [
        { type: "array", label: "s", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"], highlights: { 0: "checked", 1: "success", 19: "success", 20: "checked" }, pointers: [{ index: 1, label: "L" }, { index: 19, label: "R" }] },
      ],
    },
    {
      description: "Continue comparing... all pairs match as we move inward toward the center.",
      codeHighlightLines: [3, 8],
      structures: [
        { type: "array", label: "s", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "success", 15: "success", 16: "checked", 17: "checked", 18: "checked", 19: "checked", 20: "checked" }, pointers: [{ index: 5, label: "L" }, { index: 15, label: "R" }] },
      ],
    },
    {
      description: "The pointers have met in the middle. All pairs matched — it's a palindrome! Return True.",
      codeHighlightLines: [12],
      structures: [
        { type: "array", label: "s", values: ["a", "m", "a", "n", "a", "p", "l", "a", "n", "a", "c", "a", "n", "a", "l", "p", "a", "n", "a", "m", "a"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success", 9: "success", 10: "success", 11: "success", 12: "success", 13: "success", 14: "success", 15: "success", 16: "success", 17: "success", 18: "success", 19: "success", 20: "success" } },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
      ],
    },
  ],
};

export default solution;

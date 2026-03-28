import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Recursive Backtracking",
  timeComplexity: "O(4^n)",
  spaceComplexity: "O(n)",
  code: `def letter_combinations(digits):
    if not digits:
        return []
    phone = {'2':'abc','3':'def','4':'ghi',
             '5':'jkl','6':'mno','7':'pqrs',
             '8':'tuv','9':'wxyz'}
    result = []
    def backtrack(i, curr):
        if i == len(digits):
            result.append(curr)
            return
        for char in phone[digits[i]]:
            backtrack(i + 1, curr + char)
    backtrack(0, "")
    return result`,
  steps: [
    {
      description:
        "Map digits to letters (like a phone keypad) and return all possible letter combinations. Use backtracking to build combinations one character at a time. Input: digits='23'.",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        { type: "array", label: "digits", values: ["2", "3"] },
        { type: "variables", entries: [{ name: "2", value: "abc" }, { name: "3", value: "def" }] },
      ],
    },
    {
      description:
        "Start backtracking at digit index 0. Digit '2' maps to 'abc'. Try 'a' first, then recurse to digit '3' which maps to 'def'. Build: 'ad', 'ae', 'af'.",
      codeHighlightLines: [8, 9, 10, 11, 12, 13],
      structures: [
        { type: "array", label: "digits", values: ["2", "3"], highlights: { 0: "active" } },
        { type: "array", label: "result so far", values: ["ad", "ae", "af"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "curr char", value: "a", highlight: true }, { name: "next options", value: "d, e, f" }] },
      ],
    },
    {
      description:
        "Backtrack to digit '2', try 'b'. Recurse: 'bd', 'be', 'bf'. Then try 'c': 'cd', 'ce', 'cf'. All 3×3 = 9 combinations generated.",
      codeHighlightLines: [12, 13],
      structures: [
        { type: "array", label: "result", values: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"], highlights: { 3: "active", 4: "active", 5: "active", 6: "active", 7: "active", 8: "active" } },
        { type: "variables", entries: [{ name: "total", value: "3 × 3 = 9", highlight: true }] },
      ],
    },
    {
      description:
        "Return all 9 combinations. Time: O(4^n) worst case — digit 7 and 9 have 4 letters. Space: O(n) for recursion depth (n = number of digits). Each path through the tree is one combination.",
      codeHighlightLines: [14, 15],
      structures: [
        { type: "array", label: "result", values: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success" } },
        { type: "variables", entries: [{ name: "return", value: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', highlight: true }] },
      ],
    },
  ],
};

export default solution;

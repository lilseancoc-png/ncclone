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
        "Given a string of digits (2-9), return all possible letter combinations that the digits could represent on a phone keypad. This is a classic backtracking problem that generates a combinatorial tree: each digit branches into 3-4 letters, and we explore every path. The total combinations = product of letter counts per digit. For '23': digit 2 has 3 letters (abc) and digit 3 has 3 letters (def), so 3×3 = 9 combinations. Input: digits='23'.",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        { type: "array", label: "digits", values: ["2", "3"] },
        { type: "variables", entries: [{ name: "2", value: "abc" }, { name: "3", value: "def" }, { name: "total combos", value: "3 × 3 = 9" }] },
      ],
    },
    {
      description:
        "Backtrack starting at digit index 0 with empty string. Digit '2' → 'abc'. Pick 'a', recurse to digit index 1. Digit '3' → 'def'. Pick 'd' → reached end (i == len(digits)), add 'ad' to result. Backtrack, pick 'e' → add 'ae'. Pick 'f' → add 'af'. All combinations starting with 'a' are done. This is depth-first: we go deep (complete one combination) before exploring alternatives.",
      codeHighlightLines: [8, 9, 10, 11, 12, 13],
      structures: [
        { type: "array", label: "digits", values: ["2", "3"], highlights: { 0: "active" } },
        { type: "array", label: "result so far", values: ["ad", "ae", "af"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "curr", value: "'a' + {d,e,f}", highlight: true }, { name: "recursion depth", value: "2 (one per digit)" }] },
      ],
    },
    {
      description:
        "Backtrack all the way to digit '2'. Now try 'b': recurse into digit '3' → 'bd', 'be', 'bf'. Then try 'c': recurse → 'cd', 'ce', 'cf'. The recursion tree has 3 branches at level 0 (a/b/c) and 3 at level 1 (d/e/f), producing 9 leaf nodes = 9 combinations. Each leaf is a complete path from root to bottom.",
      codeHighlightLines: [12, 13],
      structures: [
        { type: "array", label: "result", values: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"], highlights: { 3: "active", 4: "active", 5: "active", 6: "active", 7: "active", 8: "active" } },
        { type: "variables", entries: [{ name: "tree structure", value: "3 × 3 = 9 leaves" }, { name: "total", value: 9, highlight: true }] },
      ],
    },
    {
      description:
        "Return all 9 combinations. Time: O(4^n × n) worst case — digits 7 ('pqrs') and 9 ('wxyz') have 4 letters each, and building each string takes O(n). Space: O(n) for the recursion stack (one frame per digit). This pattern generalizes: any problem that combines choices from independent sets is a backtracking tree where each level picks from one set.",
      codeHighlightLines: [14, 15],
      structures: [
        { type: "array", label: "result", values: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success" } },
        { type: "variables", entries: [{ name: "return", value: "9 combinations", highlight: true }, { name: "Time", value: "O(4^n × n)" }, { name: "Space", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;

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
        "Given digits '23', return all letter combinations from a phone keypad. Each digit maps to 3-4 letters. This is backtracking: build combinations character by character, exploring every branch. Total = product of letter counts: 3 × 3 = 9 combinations for '23'.",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        { type: "array", label: "digits", values: ["2", "3"] },
        { type: "variables", entries: [{ name: "2", value: "'abc' (3 letters)" }, { name: "3", value: "'def' (3 letters)" }, { name: "total combos", value: "3 × 3 = 9" }] },
      ],
    },
    {
      description:
        "Start backtrack(0, ''). Digit '2' → letters 'abc'. Pick 'a', recurse to backtrack(1, 'a'). Digit '3' → 'def'. Pick 'd' → i==len(digits), add 'ad'. Pick 'e' → add 'ae'. Pick 'f' → add 'af'. All 3 branches of digit '3' explored with prefix 'a'.",
      codeHighlightLines: [8, 9, 10, 11, 12, 13],
      structures: [
        { type: "array", label: "result so far", values: ["ad", "ae", "af"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "prefix", value: "'a'", highlight: true }, { name: "digit '3' branches", value: "d, e, f → ad, ae, af" }] },
      ],
    },
    {
      description:
        "Backtrack to digit '2'. Pick 'b', recurse. Digit '3' → 'bd', 'be', 'bf'. 6 total combinations so far. Each prefix ('a', 'b') generates 3 combinations from digit '3'.",
      codeHighlightLines: [12, 13],
      structures: [
        { type: "array", label: "result so far", values: ["ad", "ae", "af", "bd", "be", "bf"], highlights: { 3: "success", 4: "success", 5: "success" } },
        { type: "variables", entries: [{ name: "prefix", value: "'b'", highlight: true }, { name: "digit '3' branches", value: "d, e, f → bd, be, bf" }] },
      ],
    },
    {
      description:
        "Backtrack to digit '2'. Pick 'c', recurse. Digit '3' → 'cd', 'ce', 'cf'. All branches of digit '2' exhausted. The recursion tree: 3 branches at level 0 (a/b/c) × 3 at level 1 (d/e/f) = 9 leaf nodes, each a complete combination.",
      codeHighlightLines: [12, 13],
      structures: [
        { type: "array", label: "result", values: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"], highlights: { 6: "success", 7: "success", 8: "success" } },
        { type: "variables", entries: [{ name: "prefix", value: "'c'", highlight: true }, { name: "all 9 combos", value: "3 × 3 tree fully explored" }] },
      ],
    },
    {
      description:
        "Return all 9 combinations. Time: O(4^n × n) worst case — digits 7 and 9 have 4 letters each, and each string is length n. Space: O(n) for recursion stack depth (one frame per digit). This pattern generalizes: any problem combining independent choice sets is a backtracking tree where each level picks from one set.",
      codeHighlightLines: [14, 15],
      structures: [
        { type: "array", label: "result", values: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success" } },
        { type: "variables", entries: [{ name: "return", value: "9 combinations", highlight: true }, { name: "Time", value: "O(4^n × n)" }, { name: "Space", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;

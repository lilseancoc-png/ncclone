import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Right-to-Left Traversal",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def plusOne(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits`,
    steps: [
      {
        description:
          "Add 1 to a number represented as an array of digits. The challenge is carries: 129+1=130, and 999+1=1000 (array grows). Traverse right-to-left: if digit < 9, increment and return. If 9, set to 0 (carry propagates left). digits = [1, 2, 9].",
        codeHighlightLines: [1, 2],
        structures: [
          { type: "array", label: "digits (represents 129)", values: [1, 2, 9] },
          { type: "variables", entries: [{ name: "goal", value: "129 + 1 = 130" }] },
        ],
      },
      {
        description:
          "i=2: digits[2] = 9. Since 9 is NOT less than 9, incrementing would make 10 (not a single digit). Set digits[2] = 0 and let the carry propagate left. This is exactly manual addition: 9 + 1 = 10, write 0 carry 1.",
        codeHighlightLines: [3, 6],
        structures: [
          { type: "array", label: "digits", values: [1, 2, 0], highlights: { 2: "active" }, pointers: [{ index: 2, label: "9→0 (carry)" }] },
          { type: "variables", entries: [{ name: "digits[2]", value: "9 → 0 (carry left)", highlight: true }] },
        ],
      },
      {
        description:
          "i=1: digits[1] = 2. Since 2 < 9, we can safely increment: digits[1] = 3. Return immediately — the carry is absorbed! No need to continue left. Result: [1, 3, 0] = 130.",
        codeHighlightLines: [3, 4, 5],
        structures: [
          { type: "array", label: "digits", values: [1, 3, 0], highlights: { 1: "success" }, pointers: [{ index: 1, label: "2→3 (carry absorbed)" }] },
          { type: "variables", entries: [{ name: "return", value: "[1, 3, 0] = 130", highlight: true }] },
        ],
      },
      {
        description:
          "Edge case: [9, 9, 9]. i=2: 9→0. i=1: 9→0. i=0: 9→0. Array is [0,0,0] and loop ends without returning — every digit was 9! Fall through to 'return [1] + digits' = [1,0,0,0] = 1000. This only happens for all-nines numbers.",
        codeHighlightLines: [6, 7],
        structures: [
          { type: "array", label: "edge case [9,9,9]", values: [0, 0, 0], highlights: { 0: "active", 1: "active", 2: "active" } },
          { type: "variables", entries: [{ name: "all 9s!", value: "[1] + [0,0,0] = [1,0,0,0]", highlight: true }] },
        ],
      },
      {
        description:
          "Result: 130 for [1,2,9]. The algorithm is elegant: non-9 digits absorb carries instantly (early return), and the all-9s case is handled by prepending 1. Time: O(n) worst case (all 9s) but O(1) average — most numbers don't have trailing 9s. Space: O(1) modified in-place (O(n) only for the all-9s case creating a new array).",
        codeHighlightLines: [5, 7],
        structures: [
          { type: "array", label: "result: 130", values: [1, 3, 0], highlights: { 0: "success", 1: "success", 2: "success" } },
          { type: "variables", entries: [{ name: "return", value: "[1, 3, 0]", highlight: true }, { name: "Time", value: "O(n) worst, O(1) avg" }, { name: "Space", value: "O(1) in-place" }] },
        ],
      },
    ],
  },
];

export default solutions;

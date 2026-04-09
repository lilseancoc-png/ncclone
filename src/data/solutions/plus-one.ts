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
          "Add 1 to a number represented as an array of digits (most significant digit first). The key challenge is handling carries: 129 + 1 = 130 (carry from 9→0), and 999 + 1 = 1000 (all digits carry, array grows). We traverse right-to-left. If a digit is < 9, just increment and return — no carry. If it's 9, set to 0 and continue (the carry propagates left). digits = [1, 2, 9].",
        codeHighlightLines: [1, 2],
        structures: [
          {
            type: "array",
            label: "digits (represents 129)",
            values: [1, 2, 9],
          },
          { type: "variables", entries: [{ name: "goal", value: "129 + 1 = 130" }] },
        ],
      },
      {
        description:
          "i=2: digits[2] = 9. Since 9 is NOT less than 9, we can't just increment — it would become 10 (not a single digit). Set digits[2] = 0 and let the carry propagate to the next digit left. This is exactly how manual addition works: 9 + 1 = 10, write 0 carry 1.",
        codeHighlightLines: [3, 6],
        structures: [
          {
            type: "array",
            label: "digits",
            values: [1, 2, 0],
            highlights: { 2: "active" },
            pointers: [{ index: 2, label: "i=2: 9→0 (carry)" }],
          },
        ],
      },
      {
        description:
          "i=1: digits[1] = 2. Since 2 < 9, we can safely increment: digits[1] = 3. Return immediately — no further carry needed! The carry from the 9 was absorbed by the 2. Result: [1, 3, 0] representing 130.",
        codeHighlightLines: [3, 4, 5],
        structures: [
          {
            type: "array",
            label: "digits",
            values: [1, 3, 0],
            highlights: { 1: "success" },
            pointers: [{ index: 1, label: "i=1: 2→3 (absorbed carry)" }],
          },
          { type: "variables", entries: [{ name: "return", value: "[1, 3, 0]", highlight: true }] },
        ],
      },
      {
        description:
          "Result: [1, 3, 0] = 130. Edge case: what about [9, 9, 9]? i=2: 9→0. i=1: 9→0. i=0: 9→0. Loop ends without returning — every digit was 9! We fall through to 'return [1] + digits' = [1, 0, 0, 0] = 1000. This only happens for numbers like 9, 99, 999, etc. Time: O(n) worst case but O(1) on average (most numbers don't have trailing 9s). Space: O(1) — modified in place.",
        codeHighlightLines: [5, 7],
        structures: [
          {
            type: "array",
            label: "result: 130",
            values: [1, 3, 0],
            highlights: { 0: "success", 1: "success", 2: "success" },
          },
          { type: "variables", entries: [{ name: "edge case [9,9,9]", value: "→ [1,0,0,0]" }, { name: "Time", value: "O(n) worst, O(1) avg" }] },
        ],
      },
    ],
  },
];

export default solutions;

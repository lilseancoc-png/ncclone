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
          "We need to add 1 to a number represented as an array of digits. Start from the rightmost digit and handle carries. If a digit is less than 9, just increment it. If it's 9, set it to 0 and carry over.",
        codeHighlightLines: [1, 2],
        structures: [
          {
            type: "array",
            label: "digits",
            values: [1, 2, 9],
            highlights: {},
          },
        ],
      },
      {
        description:
          "i=2: digits[2] = 9, which is not less than 9. Set it to 0 (carry propagates left).",
        codeHighlightLines: [3, 6],
        structures: [
          {
            type: "array",
            label: "digits",
            values: [1, 2, 0],
            highlights: { 2: "active" },
            pointers: [{ index: 2, label: "i" }],
          },
        ],
      },
      {
        description:
          "i=1: digits[1] = 2, which is less than 9. Increment it to 3 and return immediately — no more carry needed.",
        codeHighlightLines: [3, 4, 5],
        structures: [
          {
            type: "array",
            label: "digits",
            values: [1, 3, 0],
            highlights: { 1: "success" },
            pointers: [{ index: 1, label: "i" }],
          },
        ],
      },
      {
        description:
          "Result: [1, 3, 0] = 130. For the edge case [9, 9, 9], all digits become 0, and we prepend 1 to get [1, 0, 0, 0]. Time: O(n) worst case, but usually O(1) amortized.",
        codeHighlightLines: [5],
        structures: [
          {
            type: "array",
            label: "result",
            values: [1, 3, 0],
            highlights: { 0: "success", 1: "success", 2: "success" },
          },
        ],
      },
    ],
  },
];

export default solutions;

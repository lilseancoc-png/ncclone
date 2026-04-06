import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Digit-by-Digit Reversal",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    code: `def reverse(x):
    INT_MIN, INT_MAX = -2**31, 2**31 - 1
    result = 0
    sign = 1 if x >= 0 else -1
    x = abs(x)
    while x > 0:
        digit = x % 10
        x //= 10
        result = result * 10 + digit
    result *= sign
    if result < INT_MIN or result > INT_MAX:
        return 0
    return result`,
    steps: [
      {
        description:
          "Reverse the digits of a 32-bit signed integer. Extract digits from the end using modulo and build the reversed number. Check for overflow before returning. Example: x = -123.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "x", value: 123 },
              { name: "sign", value: -1 },
              { name: "result", value: 0 },
            ],
          },
        ],
      },
      {
        description:
          "digit = 123 % 10 = 3. x = 123 // 10 = 12. result = 0 * 10 + 3 = 3. We extracted the last digit and started building the reversed number.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "x", value: 12 },
              { name: "digit", value: 3, highlight: true },
              { name: "result", value: 3, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "digit = 12 % 10 = 2. x = 1. result = 3 * 10 + 2 = 32. Then: digit = 1 % 10 = 1. x = 0. result = 32 * 10 + 1 = 321. Loop ends.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "x", value: 0 },
              { name: "result", value: 321, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Apply sign: result = 321 * -1 = -321. Check overflow: -2^31 ≤ -321 ≤ 2^31-1 ✓. Return -321. If the result were outside 32-bit range, we'd return 0.",
        codeHighlightLines: [10, 11, 12, 13],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "result", value: -321, highlight: true },
              { name: "overflow?", value: "No" },
              { name: "return", value: -321 },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

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
          "Reverse digits of a 32-bit signed integer. Extract digits from the end with modulo (%), build reversed number with multiply-and-add. Handle sign separately. Return 0 on 32-bit overflow. x = -123.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          { type: "variables", entries: [{ name: "x (original)", value: -123 }, { name: "sign", value: -1 }, { name: "x (absolute)", value: 123 }, { name: "result", value: 0 }] },
        ],
      },
      {
        description:
          "Iteration 1: digit = 123 % 10 = 3 (ones place). x = 123 // 10 = 12. result = 0 × 10 + 3 = 3. Modulo peels the last digit, integer division shifts right by one decimal place.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          { type: "variables", entries: [{ name: "digit", value: "123 % 10 = 3", highlight: true }, { name: "x", value: "123 // 10 = 12" }, { name: "result", value: "0 × 10 + 3 = 3", highlight: true }] },
        ],
      },
      {
        description:
          "Iteration 2: digit = 12 % 10 = 2. x = 12 // 10 = 1. result = 3 × 10 + 2 = 32. The '2' that was in the tens place is now in the ones place of result — digits are reversing.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          { type: "variables", entries: [{ name: "digit", value: "12 % 10 = 2" }, { name: "x", value: "12 // 10 = 1" }, { name: "result", value: "3 × 10 + 2 = 32", highlight: true }] },
        ],
      },
      {
        description:
          "Iteration 3: digit = 1 % 10 = 1. x = 1 // 10 = 0. result = 32 × 10 + 1 = 321. x is now 0 — loop exits. Each iteration peeled one digit from x's right and appended it to result's right, reversing the order: 123 → 321.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          { type: "variables", entries: [{ name: "digit", value: "1 % 10 = 1" }, { name: "x", value: 0 }, { name: "result", value: "32 × 10 + 1 = 321", highlight: true }] },
        ],
      },
      {
        description:
          "Apply sign: 321 × -1 = -321. Overflow check: -321 ∈ [-2³¹, 2³¹-1]? Yes! Return -321. For x=1534236469, reversed 9646324351 > INT_MAX → return 0. Time: O(log n) — one iteration per digit. Space: O(1).",
        codeHighlightLines: [10, 11, 12, 13],
        structures: [
          { type: "variables", entries: [{ name: "result × sign", value: "321 × -1 = -321", highlight: true }, { name: "overflow?", value: "No — in 32-bit range" }, { name: "return", value: -321, highlight: true }, { name: "Time", value: "O(log n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

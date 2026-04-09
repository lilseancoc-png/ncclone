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
          "Reverse the digits of a 32-bit signed integer. The technique: extract digits from the end using modulo (%) and build the reversed number by multiplying by 10 and adding each digit. Handle sign separately. Must return 0 if the result overflows 32-bit range [-2^31, 2^31-1]. Example: x = -123.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "x (original)", value: -123 },
              { name: "sign", value: -1 },
              { name: "x (absolute)", value: 123 },
              { name: "result", value: 0 },
            ],
          },
        ],
      },
      {
        description:
          "Iteration 1: digit = 123 % 10 = 3 (the ones place). x = 123 // 10 = 12 (remove last digit). result = 0 * 10 + 3 = 3. We extracted '3' from the end and put it at the beginning of our result. Think of modulo as 'peel off the last digit' and integer division as 'shift right by one decimal place'.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "digit", value: "123 % 10 = 3", highlight: true },
              { name: "x", value: "123 // 10 = 12" },
              { name: "result", value: "0 × 10 + 3 = 3", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Iteration 2: digit = 12 % 10 = 2. x = 12 // 10 = 1. result = 3 * 10 + 2 = 32. Iteration 3: digit = 1 % 10 = 1. x = 1 // 10 = 0. result = 32 * 10 + 1 = 321. x is now 0, loop exits. Each iteration peels one digit off the right of x and appends it to the right of result — effectively reversing the digit order.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "iter 2", value: "digit=2, result=32" },
              { name: "iter 3", value: "digit=1, result=321", highlight: true },
              { name: "x", value: "0 (done)" },
            ],
          },
        ],
      },
      {
        description:
          "Apply the sign: result = 321 * -1 = -321. Check 32-bit overflow: is -321 in [-2147483648, 2147483647]? Yes! Return -321. If we had x = 1534236469, the reversed number 9646324351 would exceed INT_MAX, so we'd return 0. This overflow check is critical — always validate before returning. Time: O(log n) — one iteration per digit. Space: O(1).",
        codeHighlightLines: [10, 11, 12, 13],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "result × sign", value: "321 × -1 = -321", highlight: true },
              { name: "INT_MIN", value: -2147483648 },
              { name: "INT_MAX", value: 2147483647 },
              { name: "overflow?", value: "No — -321 is in range" },
              { name: "return", value: -321, highlight: true },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Binary Exponentiation (Fast Power)",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    code: `def myPow(x, n):
    if n < 0:
        x = 1 / x
        n = -n
    result = 1
    while n > 0:
        if n % 2 == 1:
            result *= x
        x *= x
        n //= 2
    return result`,
    steps: [
      {
        description:
          "Compute x^n efficiently using binary exponentiation. Instead of multiplying x by itself n times (O(n)), we square x repeatedly and only multiply into the result when the current bit of n is 1. This gives O(log n) time.",
        codeHighlightLines: [1, 5],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "x", value: 2 },
              { name: "n", value: 10 },
              { name: "result", value: 1 },
            ],
          },
        ],
      },
      {
        description:
          "n=10 (binary: 1010). n%2 == 0, so we don't multiply result. Square x: x = 2*2 = 4. Halve n: n = 5.",
        codeHighlightLines: [7, 9, 10],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "x", value: 4, highlight: true },
              { name: "n", value: 5 },
              { name: "result", value: 1 },
              { name: "n (binary)", value: "0101" },
            ],
          },
        ],
      },
      {
        description:
          "n=5, n%2 == 1: multiply result by x → result = 1 * 4 = 4. Square x: x = 4*4 = 16. Halve n: n = 2.",
        codeHighlightLines: [7, 8, 9, 10],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "x", value: 16, highlight: true },
              { name: "n", value: 2 },
              { name: "result", value: 4, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "n=2, n%2 == 0: skip multiply. Square x: x = 16*16 = 256. Halve n: n = 1.",
        codeHighlightLines: [9, 10],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "x", value: 256, highlight: true },
              { name: "n", value: 1 },
              { name: "result", value: 4 },
            ],
          },
        ],
      },
      {
        description:
          "n=1, n%2 == 1: multiply result by x → result = 4 * 256 = 1024. Halve n: n = 0. Loop ends. Return 1024 = 2^10.",
        codeHighlightLines: [7, 8, 11],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "result", value: 1024, highlight: true },
              { name: "2^10", value: 1024 },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

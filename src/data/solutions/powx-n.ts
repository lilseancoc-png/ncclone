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
          "Compute x^n efficiently. The naive approach multiplies x by itself n times — O(n). Binary exponentiation reduces this to O(log n) by exploiting a key insight: x^10 = x^8 × x^2 (use the binary representation of n to decide which powers of x to include). We decompose n into powers of 2: 10 = 8+2 (binary 1010). We repeatedly square x (giving x¹, x², x⁴, x⁸...) and multiply into the result only when the corresponding bit of n is 1. For negative n, we compute (1/x)^|n|. Example: x=2, n=10.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "x", value: 2 },
              { name: "n", value: "10 (binary: 1010)" },
              { name: "result", value: 1 },
              { name: "key idea", value: "2^10 = 2^8 × 2^2 = 256 × 4 = 1024" },
            ],
          },
        ],
      },
      {
        description:
          "Iteration 1: n=10 (binary: 1010). Check the lowest bit: n%2 == 0, so this power of x is NOT included in the result. Square x: x = 2×2 = 4 (now x represents x²). Halve n: n = 10//2 = 5. We've processed the rightmost bit (0) and shifted to the next.",
        codeHighlightLines: [6, 7, 9, 10],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "bit processed", value: "0 (skip)" },
              { name: "x", value: "4 (= 2²)", highlight: true },
              { name: "n", value: "5 (binary: 101)" },
              { name: "result", value: 1 },
            ],
          },
        ],
      },
      {
        description:
          "Iteration 2: n=5 (binary: 101). Lowest bit is 1 → multiply result by x: result = 1 × 4 = 4. This captures x² in our answer. Square x: x = 4×4 = 16 (now x represents x⁴). Halve n: n = 2. We've included the x² contribution.",
        codeHighlightLines: [6, 7, 8, 9, 10],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "bit processed", value: "1 → multiply!", highlight: true },
              { name: "x", value: "16 (= 2⁴)", highlight: true },
              { name: "n", value: "2 (binary: 10)" },
              { name: "result", value: "4 (has 2²)", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Iteration 3: n=2 (binary: 10). Lowest bit is 0 → skip. Square x: x = 16×16 = 256 (now x represents x⁸). Halve n: n = 1. The x⁴ power is not needed for 2^10.",
        codeHighlightLines: [6, 7, 9, 10],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "bit processed", value: "0 (skip)" },
              { name: "x", value: "256 (= 2⁸)", highlight: true },
              { name: "n", value: "1 (binary: 1)" },
              { name: "result", value: "4 (has 2²)" },
            ],
          },
        ],
      },
      {
        description:
          "Iteration 4: n=1 (binary: 1). Lowest bit is 1 → multiply result by x: result = 4 × 256 = 1024. This captures x⁸. Halve n: n = 0 → loop ends. Final result: 1024 = 2^10. We computed 2^10 in just 4 iterations instead of 10 multiplications. The algorithm works for any base and exponent. For negative n, the initial conversion x = 1/x, n = -n handles it. Time: O(log n). Space: O(1).",
        codeHighlightLines: [6, 7, 8, 10, 11],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "bit processed", value: "1 → multiply!", highlight: true },
              { name: "result", value: "4 × 256 = 1024", highlight: true },
              { name: "verification", value: "2^10 = 2² × 2⁸ = 4 × 256 = 1024 ✓" },
              { name: "Time", value: "O(log n)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

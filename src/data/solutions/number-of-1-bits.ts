import { SolutionData } from "../types";

const solution: SolutionData[] = [
  {
    label: "Bit Shift",
    timeComplexity: "O(32)",
    spaceComplexity: "O(1)",
    code: `def hamming_weight(n):
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count`,
    steps: [
      {
        description:
          "Count the number of 1-bits (set bits) in an integer. Simple approach: check the last bit with & 1, then shift right. n = 11 (binary: 1011).",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "binary", values: [1, 0, 1, 1] },
          { type: "variables", entries: [{ name: "n", value: "11 (1011)" }, { name: "count", value: 0 }] },
        ],
      },
      {
        description:
          "1011 & 1 = 1, count=1, shift: 101. 101 & 1 = 1, count=2, shift: 10. 10 & 1 = 0, count=2, shift: 1. 1 & 1 = 1, count=3, shift: 0. Done!",
        codeHighlightLines: [4, 5],
        structures: [
          { type: "array", label: "binary", values: [1, 0, 1, 1], highlights: { 0: "success", 2: "success", 3: "success" } },
          { type: "variables", entries: [{ name: "count", value: 3, highlight: true }] },
        ],
      },
    ],
  },
  {
    label: "Optimal — Brian Kernighan's",
    timeComplexity: "O(k) where k = set bits",
    spaceComplexity: "O(1)",
    code: `def hamming_weight(n):
    count = 0
    while n:
        n &= n - 1  # clear lowest set bit
        count += 1
    return count`,
    steps: [
      {
        description:
          "Brian Kernighan's trick: n & (n-1) clears the lowest set bit. Only loops k times where k = number of 1-bits. n=11 (1011).",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          { type: "array", label: "binary of 11", values: [1, 0, 1, 1] },
          { type: "variables", entries: [{ name: "n", value: "11 (1011)" }, { name: "count", value: 0 }] },
        ],
      },
      {
        description:
          "1011 & 1010 = 1010 (cleared last 1), count=1. 1010 & 1001 = 1000 (cleared last 1), count=2. 1000 & 0111 = 0000, count=3. Only 3 iterations for 3 set bits!",
        codeHighlightLines: [4, 5],
        structures: [
          { type: "array", label: "steps", values: ["1011→1010", "1010→1000", "1000→0000"], highlights: { 0: "active", 1: "active", 2: "success" } },
          { type: "variables", entries: [{ name: "count", value: 3, highlight: true }, { name: "iterations", value: "3 (= number of 1s)" }] },
        ],
      },
    ],
  },
];

export default solution;

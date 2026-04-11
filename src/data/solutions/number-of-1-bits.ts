import { SolutionData } from "../types";

const solution: SolutionData[] = [
  {
    label: "Bit Shift — Check Each Bit",
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
          "Count the number of 1-bits (also called the Hamming weight or popcount) in an unsigned integer. The simple approach: check the least significant bit (LSB) using n & 1, increment count if it's 1, then right-shift n to expose the next bit. Repeat until n becomes 0. n = 11 (binary: 1011).",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "binary of 11", values: [1, 0, 1, 1] },
          { type: "variables", entries: [{ name: "n", value: "11 (1011)" }, { name: "count", value: 0 }, { name: "strategy", value: "check LSB, then shift right" }] },
        ],
      },
      {
        description:
          "Iteration 1: n=1011. n & 1 = 1 (LSB is 1) → count=1. Shift right: n=101. Iteration 2: n=101. n & 1 = 1 → count=2. Shift right: n=10. We're peeling off one bit at a time from the right.",
        codeHighlightLines: [4, 5],
        structures: [
          { type: "array", label: "binary", values: [1, 0, 1, 1], highlights: { 2: "success", 3: "success" }, pointers: [{ index: 3, label: "LSB" }] },
          { type: "variables", entries: [{ name: "after 2 iterations", value: "n = 10" }, { name: "count", value: 2, highlight: true }] },
        ],
      },
      {
        description:
          "Iteration 3: n=10. n & 1 = 0 (LSB is 0) → count stays at 2. Shift right: n=1. Iteration 4: n=1. n & 1 = 1 → count=3. Shift right: n=0. Loop exits (n is 0). Return 3 — the number 11 has 3 set bits. This approach always takes O(number of bits) = O(32) iterations for a 32-bit integer.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          { type: "array", label: "binary of 11", values: [1, 0, 1, 1], highlights: { 0: "success", 1: "checked", 2: "success", 3: "success" } },
          { type: "variables", entries: [{ name: "count", value: 3, highlight: true }, { name: "return", value: 3, highlight: true }] },
        ],
      },
    ],
  },
  {
    label: "Optimal — Brian Kernighan's Trick",
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
          "Brian Kernighan's insight: n & (n-1) always clears the LOWEST set bit. Why? When you subtract 1 from n, it flips all bits from the lowest set bit to the right. AND-ing with the original n zeros out that lowest set bit while preserving everything above. This means we only loop k times (where k = number of 1-bits), not 32 times. n = 11 (binary: 1011), which has 3 set bits.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          { type: "array", label: "binary of 11", values: [1, 0, 1, 1] },
          { type: "variables", entries: [{ name: "n", value: "11 (1011)" }, { name: "count", value: 0 }, { name: "key insight", value: "n & (n-1) clears lowest 1-bit" }] },
        ],
      },
      {
        description:
          "Iteration 1: n=1011, n-1=1010. n & (n-1) = 1011 & 1010 = 1010. The lowest set bit (position 0) was cleared! count=1. Iteration 2: n=1010, n-1=1001. n & (n-1) = 1010 & 1001 = 1000. Position 1's bit cleared! count=2.",
        codeHighlightLines: [4, 5],
        structures: [
          { type: "array", label: "step 1: 1011 & 1010 = 1010", values: ["1011", "&", "1010", "=", "1010"], highlights: { 0: "active", 4: "success" } },
          { type: "array", label: "step 2: 1010 & 1001 = 1000", values: ["1010", "&", "1001", "=", "1000"], highlights: { 0: "active", 4: "success" } },
          { type: "variables", entries: [{ name: "count", value: 2, highlight: true }] },
        ],
      },
      {
        description:
          "Iteration 3: n=1000, n-1=0111. n & (n-1) = 1000 & 0111 = 0000. The last set bit cleared! count=3. n=0, loop exits. Only 3 iterations — one per set bit! Compare to the bit-shift approach which always does 32 iterations. For sparse numbers (few 1-bits), Kernighan's is much faster. For dense numbers, it's similar.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          { type: "array", label: "step 3: 1000 & 0111 = 0000", values: ["1000", "&", "0111", "=", "0000"], highlights: { 0: "active", 4: "success" } },
          { type: "variables", entries: [{ name: "count", value: 3, highlight: true }, { name: "return", value: 3, highlight: true }, { name: "iterations", value: "3 (= number of 1-bits)" }, { name: "vs bit-shift", value: "would take 4 iterations" }] },
        ],
      },
    ],
  },
];

export default solution;

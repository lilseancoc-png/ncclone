import { SolutionData } from "../types";

const solution: SolutionData[] = [
  {
    label: "Brute Force — Kernighan per Number",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    code: `def count_bits(n):
    result = []
    for i in range(n + 1):
        count = 0
        num = i
        while num:
            num &= num - 1
            count += 1
        result.append(count)
    return result`,
    steps: [
      {
        description:
          "For each number from 0 to n, count the number of 1-bits in its binary representation. The brute force approach: for each number, use Brian Kernighan's trick (n & (n-1) clears the lowest set bit) to count bits individually. n=5, so we need bit counts for [0, 1, 2, 3, 4, 5].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "numbers", values: [0, 1, 2, 3, 4, 5] },
          { type: "array", label: "binary representations", values: ["000", "001", "010", "011", "100", "101"] },
        ],
      },
      {
        description:
          "Count bits for each number: 0 (000) → 0 set bits. 1 (001) → 1. 2 (010) → 1. 3 (011) → 2. 4 (100) → 1. 5 (101) → 2. For number 3: 011 & 010 = 010 (count=1), 010 & 001 = 000 (count=2). Each number takes O(log n) work in the worst case, giving O(n log n) total. The DP approach (Approach 2) reduces this to O(n) by reusing previous results.",
        codeHighlightLines: [4, 5, 6, 7, 8, 9, 10],
        structures: [
          { type: "array", label: "binary", values: ["000", "001", "010", "011", "100", "101"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "checked" } },
          { type: "array", label: "result", values: [0, 1, 1, 2, 1, 2], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
          { type: "variables", entries: [{ name: "return", value: "[0,1,1,2,1,2]", highlight: true }] },
        ],
      },
    ],
  },
  {
    label: "Optimal — DP with Offset",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def count_bits(n):
    dp = [0] * (n + 1)
    offset = 1
    for i in range(1, n + 1):
        if offset * 2 == i:
            offset = i
        dp[i] = 1 + dp[i - offset]
    return dp`,
    steps: [
      {
        description:
          "The DP insight: every number i can be written as (highest power of 2 ≤ i) + remainder. The number of 1-bits = 1 (for that power of 2) + bits(remainder). Example: 5 = 4 + 1, so bits(5) = 1 + bits(1) = 1 + 1 = 2. We track 'offset' = the most recent power of 2. n=5.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "dp", values: [0, 0, 0, 0, 0, 0] },
          { type: "variables", entries: [{ name: "offset", value: 1 }, { name: "key idea", value: "dp[i] = 1 + dp[i - offset]" }] },
        ],
      },
      {
        description:
          "i=1: offset=1 (1*2≠1, keep offset=1). dp[1] = 1 + dp[1-1] = 1 + dp[0] = 1. Binary: 001 has 1 set bit ✓. i=2: offset*2=2==2, so update offset=2 (new power of 2!). dp[2] = 1 + dp[2-2] = 1 + dp[0] = 1. Binary: 010 has 1 set bit ✓.",
        codeHighlightLines: [4, 5, 6, 7],
        structures: [
          { type: "array", label: "dp", values: [0, 1, 1, 0, 0, 0], highlights: { 1: "success", 2: "success" } },
          { type: "variables", entries: [{ name: "offset", value: 2, highlight: true }, { name: "dp[1]", value: "1+dp[0]=1" }, { name: "dp[2]", value: "1+dp[0]=1" }] },
        ],
      },
      {
        description:
          "i=3: offset=2. dp[3] = 1 + dp[3-2] = 1 + dp[1] = 2. Think: 3 = 2 + 1, so it has the bits of 2 (one bit) plus one more. i=4: offset*2=4==4, update offset=4. dp[4] = 1 + dp[4-4] = 1 + dp[0] = 1. Every power of 2 has exactly 1 set bit.",
        codeHighlightLines: [4, 5, 6, 7],
        structures: [
          { type: "array", label: "dp", values: [0, 1, 1, 2, 1, 0], highlights: { 3: "success", 4: "success" } },
          { type: "variables", entries: [{ name: "offset", value: 4, highlight: true }, { name: "dp[3]", value: "3=2+1 → 1+dp[1]=2" }, { name: "dp[4]", value: "4=4+0 → 1+dp[0]=1" }] },
        ],
      },
      {
        description:
          "i=5: offset=4. dp[5] = 1 + dp[5-4] = 1 + dp[1] = 2. Think: 5 = 4 + 1 (binary 101 = 100 + 001). Return [0,1,1,2,1,2]. Each number computed in O(1) using previously computed values — total time O(n). This DP pattern works because binary numbers naturally decompose into powers of 2 plus a smaller remainder.",
        codeHighlightLines: [7, 8],
        structures: [
          { type: "array", label: "dp (final)", values: [0, 1, 1, 2, 1, 2], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
          { type: "variables", entries: [{ name: "return", value: "[0,1,1,2,1,2]", highlight: true }, { name: "Time", value: "O(n) — one operation per number" }] },
        ],
      },
    ],
  },
];

export default solution;

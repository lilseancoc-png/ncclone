import { SolutionData } from "../types";

const solution: SolutionData[] = [
  {
    label: "Brute Force",
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
          "For each number 0 to n, count its set bits using Brian Kernighan's trick. n=5 → count bits for [0,1,2,3,4,5].",
        codeHighlightLines: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "numbers", values: [0, 1, 2, 3, 4, 5] },
          { type: "array", label: "binary", values: ["000", "001", "010", "011", "100", "101"] },
        ],
      },
      {
        description:
          "Count for each: 0→0, 1→1, 10→1, 11→2, 100→1, 101→2. Result: [0,1,1,2,1,2]. Works but does O(log n) work per number.",
        codeHighlightLines: [10],
        structures: [
          { type: "array", label: "result", values: [0, 1, 1, 2, 1, 2], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
        ],
      },
    ],
  },
  {
    label: "Optimal — DP",
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
          "DP insight: the number of 1-bits in i = 1 + bits in (i - highest power of 2 <= i). E.g., 5 = 4 + 1, so bits(5) = 1 + bits(1). n=5.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "dp", values: [0, 0, 0, 0, 0, 0] },
          { type: "variables", entries: [{ name: "offset", value: 1 }] },
        ],
      },
      {
        description:
          "i=1: offset=1. dp[1]=1+dp[0]=1. i=2: offset=2. dp[2]=1+dp[0]=1. i=3: dp[3]=1+dp[1]=2. i=4: offset=4. dp[4]=1+dp[0]=1. i=5: dp[5]=1+dp[1]=2.",
        codeHighlightLines: [4, 5, 6, 7],
        structures: [
          { type: "array", label: "dp", values: [0, 1, 1, 2, 1, 2], highlights: { 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
          { type: "variables", entries: [{ name: "return", value: "[0,1,1,2,1,2]", highlight: true }, { name: "time", value: "O(n) — one operation per number" }] },
        ],
      },
    ],
  },
];

export default solution;

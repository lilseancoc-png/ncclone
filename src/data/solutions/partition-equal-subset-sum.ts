import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "DP — Boolean Set",
    timeComplexity: "O(n * sum)",
    spaceComplexity: "O(sum)",
    code: `def canPartition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total // 2
    dp = set([0])
    for num in nums:
        new_dp = set()
        for s in dp:
            new_dp.add(s + num)
            new_dp.add(s)
        dp = new_dp
    return target in dp`,
    steps: [
      {
        description:
          "Can we split the array into two subsets with equal sum? This reduces to: can we find a subset summing to total/2? If total is odd, immediately return False (can't split an odd number equally). We use a set-based DP to track all achievable subset sums. For each number, we either include it or skip it, building up all possible sums. nums=[1,5,11,5], total=22, target=11.",
        codeHighlightLines: [1, 2, 3, 4, 5, 6],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 5, 11, 5],
          },
          {
            type: "variables",
            entries: [
              { name: "total", value: 22 },
              { name: "total % 2", value: "0 (even ✓)" },
              { name: "target", value: "22 / 2 = 11" },
            ],
          },
          { type: "set", label: "dp (achievable sums)", values: [0] },
        ],
      },
      {
        description:
          "Process num=1: For each sum s in dp, add both s (skip 1) and s+1 (include 1). dp was {0} → new dp = {0, 1}. Process num=5: For each sum in {0,1}, add both s and s+5. dp = {0, 1, 5, 6}. We can make sums 0 (nothing), 1, 5, or 6 (1+5) using the first two numbers.",
        codeHighlightLines: [7, 8, 9, 10, 11, 12],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 5, 11, 5],
            highlights: { 0: "checked", 1: "active" },
          },
          { type: "set", label: "dp after num=1", values: [0, 1] },
          { type: "set", label: "dp after num=5", values: [0, 1, 5, 6], lastAdded: 6 },
        ],
      },
      {
        description:
          "Process num=11: For each sum in {0,1,5,6}, add s and s+11. dp = {0, 1, 5, 6, 11, 12, 16, 17}. Target 11 is now in dp! The subset {11} sums to 11, and the remaining {1,5,5} also sums to 11. We found a valid partition! (In practice, we could add an early termination check here.)",
        codeHighlightLines: [7, 8, 9, 10, 11, 12],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 5, 11, 5],
            highlights: { 0: "checked", 1: "checked", 2: "active" },
          },
          { type: "set", label: "dp after num=11", values: [0, 1, 5, 6, 11, 12, 16, 17], highlightValues: [11] },
          { type: "variables", entries: [{ name: "11 in dp?", value: "YES!", highlight: true }] },
        ],
      },
      {
        description:
          "Return True — the array [1,5,11,5] can be partitioned into {11} and {1,5,5}, both summing to 11. The set-based DP is elegant: it avoids the full 2D DP table (nums × sums) by only tracking which sums are achievable. Time: O(n × sum) where sum = total/2. Space: O(sum) for the set. The odd-total early return is crucial — it eliminates half of all inputs immediately.",
        codeHighlightLines: [13],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "partition", value: "{11} and {1, 5, 5}" },
              { name: "both sum to", value: 11 },
              { name: "return", value: "True", highlight: true },
              { name: "Time", value: "O(n × sum)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

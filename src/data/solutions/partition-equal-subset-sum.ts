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
          "Can we split the array into two subsets with equal sum? Reduce to: find a subset summing to total/2. If total is odd, impossible. Use a set to track all achievable subset sums. For each number, either include or skip it. nums=[1,5,11,5], total=22, target=11.",
        codeHighlightLines: [1, 2, 3, 4, 5, 6],
        structures: [
          { type: "array", label: "nums", values: [1, 5, 11, 5] },
          { type: "set", label: "dp (achievable sums)", values: [0] },
          { type: "variables", entries: [{ name: "total", value: 22 }, { name: "22 % 2", value: "0 (even ✓)" }, { name: "target", value: 11 }] },
        ],
      },
      {
        description:
          "Process num=1: For each sum s in dp={0}, add s (skip 1) and s+1 (include 1). dp = {0, 1}. We can make 0 (pick nothing) or 1 (pick the 1).",
        codeHighlightLines: [7, 8, 9, 10, 11, 12],
        structures: [
          { type: "array", label: "nums", values: [1, 5, 11, 5], highlights: { 0: "active" } },
          { type: "set", label: "dp after num=1", values: [0, 1] },
          { type: "variables", entries: [{ name: "include 1", value: "0+1=1" }, { name: "skip 1", value: "0" }, { name: "dp size", value: 2 }] },
        ],
      },
      {
        description:
          "Process num=5: For each sum in {0, 1}, add s and s+5. From 0: {0, 5}. From 1: {1, 6}. dp = {0, 1, 5, 6}. Four achievable sums using elements [1, 5]. Target 11 not yet reachable.",
        codeHighlightLines: [7, 8, 9, 10, 11, 12],
        structures: [
          { type: "array", label: "nums", values: [1, 5, 11, 5], highlights: { 1: "active" } },
          { type: "set", label: "dp after num=5", values: [0, 1, 5, 6] },
          { type: "variables", entries: [{ name: "new sums", value: "5 (just 5), 6 (1+5)", highlight: true }, { name: "11 in dp?", value: "not yet" }] },
        ],
      },
      {
        description:
          "Process num=11: For each sum in {0,1,5,6}, add s and s+11. New sums: 11, 12, 16, 17. dp = {0, 1, 5, 6, 11, 12, 16, 17}. Target 11 is now achievable! The subset {11} sums to 11. The remaining {1, 5, 5} also sums to 11.",
        codeHighlightLines: [7, 8, 9, 10, 11, 12],
        structures: [
          { type: "array", label: "nums", values: [1, 5, 11, 5], highlights: { 2: "active" } },
          { type: "set", label: "dp after num=11", values: [0, 1, 5, 6, 11, 12, 16, 17], highlightValues: [11] },
          { type: "variables", entries: [{ name: "11 in dp?", value: "YES!", highlight: true }, { name: "subset", value: "{11} sums to 11" }] },
        ],
      },
      {
        description:
          "Return True — partition into {11} and {1,5,5}, both sum to 11. The set-based DP elegantly tracks all possible sums without a full 2D table. Each number doubles the possibilities (include or skip). Time: O(n × sum) where sum = total/2. Space: O(sum) for the set. The odd-total check eliminates half of all inputs immediately.",
        codeHighlightLines: [13],
        structures: [
          { type: "variables", entries: [{ name: "return", value: "True", highlight: true }, { name: "partition", value: "{11} and {1, 5, 5}" }, { name: "both sum to", value: 11 }, { name: "Time", value: "O(n × sum)" }] },
        ],
      },
    ],
  },
];

export default solutions;

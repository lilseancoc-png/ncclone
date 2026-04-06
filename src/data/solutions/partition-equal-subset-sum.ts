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
          "Can we partition the array into two subsets with equal sum? This is equivalent to: can we find a subset that sums to total/2? If total is odd, impossible. Use a DP set tracking all achievable sums.",
        codeHighlightLines: [1, 2, 3, 4, 5, 6],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 5, 11, 5],
            highlights: {},
          },
          {
            type: "variables",
            entries: [
              { name: "total", value: 22 },
              { name: "target", value: 11 },
            ],
          },
          { type: "set", label: "dp (achievable sums)", values: [0] },
        ],
      },
      {
        description:
          "Process num=1: For each sum in dp, we can include or exclude 1. dp = {0, 1}. Process num=5: dp = {0, 1, 5, 6}.",
        codeHighlightLines: [7, 8, 9, 10, 11, 12],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 5, 11, 5],
            highlights: { 0: "checked", 1: "active" },
          },
          { type: "set", label: "dp", values: [0, 1, 5, 6], lastAdded: 6 },
        ],
      },
      {
        description:
          "Process num=11: dp = {0, 1, 5, 6, 11, 12, 16, 17}. 11 is in dp! We could stop early here. The subset {11} sums to 11, and {1,5,5} also sums to 11.",
        codeHighlightLines: [9, 10],
        structures: [
          { type: "set", label: "dp", values: [0, 1, 5, 6, 11, 12, 16, 17], highlightValues: [11] },
          {
            type: "variables",
            entries: [{ name: "target 11 in dp?", value: "Yes!", highlight: true }],
          },
        ],
      },
      {
        description:
          "Return True — the array can be partitioned into {11} and {1,5,5}, both summing to 11. The set-based DP avoids a 2D table. For each number, we either include it or not, building up all possible subset sums.",
        codeHighlightLines: [13],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "partition", value: "{11} and {1, 5, 5}" },
              { name: "return", value: "True", highlight: true },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Interval DP",
    timeComplexity: "O(n³)",
    spaceComplexity: "O(n²)",
    code: `def maxCoins(nums):
    nums = [1] + nums + [1]
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n):
        for left in range(0, n - length):
            right = left + length
            for k in range(left + 1, right):
                coins = nums[left] * nums[k] * nums[right]
                dp[left][right] = max(
                    dp[left][right],
                    dp[left][k] + coins + dp[k][right]
                )
    return dp[0][n - 1]`,
    steps: [
      {
        description:
          "Burst balloons for maximum coins. When you burst balloon k, you get nums[left]*nums[k]*nums[right]. Key insight: think of k as the LAST balloon burst in an interval. Add boundary 1s. dp[left][right] = max coins from bursting all balloons between left and right.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "array",
            label: "nums (with boundaries)",
            values: [1, 3, 1, 5, 8, 1],
            highlights: { 0: "checked", 5: "checked" },
          },
        ],
      },
      {
        description:
          "Start with intervals of length 2. dp[0][2]: k=1, coins = 1*3*1 = 3. dp[1][3]: k=2, coins = 3*1*5 = 15. dp[2][4]: k=3, coins = 1*5*8 = 40. dp[3][5]: k=4, coins = 5*8*1 = 40.",
        codeHighlightLines: [6, 7, 8, 9],
        structures: [
          {
            type: "hashmap",
            label: "dp (length 2)",
            entries: [
              ["dp[0][2]", 3],
              ["dp[1][3]", 15],
              ["dp[2][4]", 40],
              ["dp[3][5]", 40],
            ],
            highlightKeys: ["dp[0][2]", "dp[2][4]"],
          },
        ],
      },
      {
        description:
          "Length 3, dp[0][3]: k=1: 1*3*5 + dp[1][3] = 15+15=30. k=2: dp[0][2]+1*1*5+dp[2][3] = 3+5+0=8. Best=30. Continue for all intervals up to the full range...",
        codeHighlightLines: [8, 9, 10, 11, 12],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "dp[0][3] k=1", value: "15+15=30", highlight: true },
              { name: "dp[0][3] k=2", value: "3+5+0=8" },
              { name: "dp[0][3]", value: 30 },
            ],
          },
        ],
      },
      {
        description:
          "dp[0][5] (full range) = 167. The optimal strategy considers every possible last-to-burst balloon in each subinterval. O(n³) from three nested loops. This interval DP pattern applies to many partition problems.",
        codeHighlightLines: [13],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "return", value: 167, highlight: true },
              { name: "input", value: "[3, 1, 5, 8]" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

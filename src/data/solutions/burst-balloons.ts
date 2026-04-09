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
          "Burst all balloons for maximum coins. When you burst balloon i, you earn nums[left] × nums[i] × nums[right] (the product of its current neighbors). The tricky part: neighbors change as balloons pop! The key DP insight: instead of thinking about which balloon to burst FIRST, think about which to burst LAST in each interval. If k is the last balloon burst in range (left, right), the coins from bursting k are guaranteed to be nums[left] × nums[k] × nums[right] (since everything else is already gone). Add boundary 1s. nums = [3,1,5,8] → [1,3,1,5,8,1].",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "array",
            label: "nums (with boundary 1s)",
            values: [1, 3, 1, 5, 8, 1],
            highlights: { 0: "checked", 5: "checked" },
            pointers: [{ index: 0, label: "boundary" }, { index: 5, label: "boundary" }],
          },
          { type: "variables", entries: [{ name: "dp[L][R]", value: "max coins from balloons between L and R" }, { name: "boundary 1s", value: "simplify edge cases" }] },
        ],
      },
      {
        description:
          "Build up from small intervals. Length 2 (one balloon between boundaries): dp[0][2]: k=1, last burst balloon 3. Coins = nums[0]×nums[1]×nums[2] = 1×3×1 = 3. dp[1][3]: k=2, coins = 3×1×5 = 15. dp[2][4]: k=3, coins = 1×5×8 = 40. dp[3][5]: k=4, coins = 5×8×1 = 40. Each has only one choice for k.",
        codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12],
        structures: [
          {
            type: "hashmap",
            label: "dp (intervals of length 2)",
            entries: [
              ["dp[0][2]", "1×3×1 = 3"],
              ["dp[1][3]", "3×1×5 = 15"],
              ["dp[2][4]", "1×5×8 = 40"],
              ["dp[3][5]", "5×8×1 = 40"],
            ],
            highlightKeys: ["dp[2][4]", "dp[3][5]"],
          },
        ],
      },
      {
        description:
          "Length 3, dp[0][3] (two balloons: index 1 and 2): k=1 (burst 3 last): coins = 1×3×5 = 15, plus dp[0][1]+dp[1][3] = 0+15 = 15. Total = 30. k=2 (burst 1 last): coins = 1×1×5 = 5, plus dp[0][2]+dp[2][3] = 3+0 = 3. Total = 8. Best: dp[0][3] = 30. The order matters: bursting in the right order (index 2 first, then 1) gives more coins.",
        codeHighlightLines: [8, 9, 10, 11, 12],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "dp[0][3] k=1", value: "15 + 0 + 15 = 30", highlight: true },
              { name: "dp[0][3] k=2", value: "5 + 3 + 0 = 8" },
              { name: "dp[0][3]", value: 30, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Continue expanding intervals until dp[0][5] (the full range). dp[0][5] = 167. The optimal strategy for [3,1,5,8]: burst 1 first (get 3×1×5=15), then 5 (get 3×5×8=120), then 3 (get 1×3×8=24), then 8 (get 1×8×1=8). Total: 15+120+24+8 = 167. Time: O(n³) — three nested loops. Space: O(n²) for the dp table. This interval DP pattern (choosing the 'last action' in each sub-range) appears in many optimization problems.",
        codeHighlightLines: [13],
        structures: [
          {
            type: "array",
            label: "original balloons",
            values: [3, 1, 5, 8],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success" },
          },
          {
            type: "variables",
            entries: [
              { name: "return", value: 167, highlight: true },
              { name: "optimal order", value: "burst 1→5→3→8" },
              { name: "Time", value: "O(n³)" },
              { name: "Space", value: "O(n²)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

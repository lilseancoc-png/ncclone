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
          "Burst balloons for maximum coins. When you burst balloon i, you earn nums[left] × nums[i] × nums[right] (product of current neighbors). The trick: neighbors change as balloons pop, making the forward direction hard. Key insight: think about which balloon to burst LAST in each interval. If k is the last burst in range (left, right), its neighbors are guaranteed to be nums[left] and nums[right] (everything else already gone). Add boundary 1s. nums = [3,1,5,8] → [1,3,1,5,8,1].",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          {
            type: "array",
            label: "nums (with boundary 1s)",
            values: [1, 3, 1, 5, 8, 1],
            highlights: { 0: "checked", 5: "checked" },
            pointers: [{ index: 0, label: "boundary" }, { index: 5, label: "boundary" }],
          },
          { type: "variables", entries: [{ name: "dp[L][R]", value: "max coins from bursting all between L and R" }, { name: "k = last burst", value: "neighbors are L and R (everything else gone)" }] },
        ],
      },
      {
        description:
          "Length 2 intervals (one balloon between boundaries). dp[0][2] (balloon 3, boundaries 1,1): k=1, coins = 1×3×1 = 3. dp[1][3] (balloon 1, boundaries 3,5): k=2, coins = 3×1×5 = 15. dp[2][4] (balloon 5, boundaries 1,8): k=3, coins = 1×5×8 = 40. dp[3][5] (balloon 8, boundaries 5,1): k=4, coins = 5×8×1 = 40. Each has only one choice for k.",
        codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12],
        structures: [
          {
            type: "hashmap",
            label: "dp (length 2 intervals)",
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
          "Length 3 intervals (two balloons). dp[0][3] (balloons 3,1 between boundaries 1,5): k=1 (burst 3 last): coins = 1×3×5 = 15, subproblems = dp[0][1]+dp[1][3] = 0+15 = 15. Total = 30. k=2 (burst 1 last): coins = 1×1×5 = 5, subproblems = dp[0][2]+dp[2][3] = 3+0 = 3. Total = 8. Best: dp[0][3] = 30. Bursting 1 first, then 3 gives more coins.",
        codeHighlightLines: [8, 9, 10, 11, 12],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "dp[0][3] k=1 (3 last)", value: "1×3×5 + dp[0][1] + dp[1][3] = 15+0+15 = 30", highlight: true },
              { name: "dp[0][3] k=2 (1 last)", value: "1×1×5 + dp[0][2] + dp[2][3] = 5+3+0 = 8" },
              { name: "dp[0][3]", value: "max(30, 8) = 30", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "dp[2][5] (balloons 5,8 between boundaries 1,1): k=3 (burst 5 last): 1×5×1 + dp[2][3]+dp[3][5] = 5+0+40 = 45. k=4 (burst 8 last): 1×8×1 + dp[2][4]+dp[4][5] = 8+40+0 = 48. Best: dp[2][5] = 48. When we burst 5 first (getting 1×5×8=40), then 8 (getting 1×8×1=8), we get 48. Order matters!",
        codeHighlightLines: [8, 9, 10, 11, 12],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "dp[2][5] k=3", value: "1×5×1 + 0 + 40 = 45" },
              { name: "dp[2][5] k=4", value: "1×8×1 + 40 + 0 = 48", highlight: true },
              { name: "dp[2][5]", value: "max(45, 48) = 48", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Continue to the full range dp[0][5]. Try k=1,2,3,4. The best is dp[0][5] = 167. Optimal strategy for [3,1,5,8]: burst 1 (get 3×1×5=15), then 5 (3×5×8=120), then 3 (1×3×8=24), then 8 (1×8×1=8). Total: 15+120+24+8 = 167. Time: O(n³) — three nested loops. Space: O(n²). This 'last action in interval' DP pattern appears in matrix chain multiplication and stone merge problems.",
        codeHighlightLines: [13],
        structures: [
          {
            type: "array",
            label: "balloons",
            values: [3, 1, 5, 8],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success" },
          },
          {
            type: "variables",
            entries: [
              { name: "return", value: 167, highlight: true },
              { name: "burst order", value: "1 → 5 → 3 → 8" },
              { name: "coins", value: "15 + 120 + 24 + 8 = 167" },
              { name: "Time", value: "O(n³)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

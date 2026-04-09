import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Bottom-Up DP",
  timeComplexity: "O(n × amount)",
  spaceComplexity: "O(amount)",
  code: `def change(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1  # one way to make 0: use nothing
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] += dp[x - coin]
    return dp[amount]`,
  steps: [
    {
      description:
        "Count the number of combinations to make a target amount using given coins (unlimited supply of each). This is different from permutations — [1,2] and [2,1] count as ONE combination, not two. The trick: iterate coins in the outer loop. This ensures each coin type is considered in order, preventing duplicate combinations. amount=5, coins=[1,2,5].",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "dp (ways to make each amount)", values: [1, 0, 0, 0, 0, 0], pointers: [{ index: 0, label: "base" }] },
        { type: "variables", entries: [{ name: "amount", value: 5 }, { name: "coins", value: "[1, 2, 5]" }, { name: "dp[0]=1", value: "one way to make $0: use nothing" }] },
      ],
    },
    {
      description:
        "Process coin=1: For each amount x from 1 to 5, dp[x] += dp[x-1]. This asks: 'how many new ways can we make x by using at least one coin of value 1?' dp[1] += dp[0] = 1. dp[2] += dp[1] = 1. dp[3] += dp[2] = 1. dp[4] += dp[3] = 1. dp[5] += dp[4] = 1. Result: using only coin 1, there's exactly 1 way to make each amount (all 1-cent coins).",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "array", label: "dp (after coin=1)", values: [1, 1, 1, 1, 1, 1], highlights: { 1: "active", 2: "active", 3: "active", 4: "active", 5: "active" } },
        { type: "variables", entries: [{ name: "coin", value: 1, highlight: true }, { name: "ways for $5", value: "1 way: [1,1,1,1,1]" }] },
      ],
    },
    {
      description:
        "Process coin=2: dp[2] += dp[0] = 1+1 = 2 (two ways: [1,1] or [2]). dp[3] += dp[1] = 1+1 = 2 (ways: [1,1,1] or [1,2]). dp[4] += dp[2] = 1+2 = 3 (ways: [1,1,1,1], [1,1,2], [2,2]). dp[5] += dp[3] = 1+2 = 3 (ways: [1,1,1,1,1], [1,1,1,2], [1,2,2]). The outer-coin-loop trick means coin=2 is only combined with coin=1 (never the reverse), preventing duplicate orderings.",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "array", label: "dp (after coins 1,2)", values: [1, 1, 2, 2, 3, 3], highlights: { 2: "active", 3: "active", 4: "active", 5: "active" } },
        { type: "variables", entries: [{ name: "coin", value: 2, highlight: true }, { name: "dp[4]=3", value: "[1111],[112],[22]" }] },
      ],
    },
    {
      description:
        "Process coin=5: Only dp[5] is affected (5 is the only x where coin <= x). dp[5] += dp[0] = 3+1 = 4. The new way: just use a single $5 coin! Final dp[5] = 4. The 4 combinations: [1,1,1,1,1], [1,1,1,2], [1,2,2], [5]. Time: O(n × amount) where n = number of coin types. Space: O(amount) for the dp array.",
      codeHighlightLines: [4, 5, 6, 7],
      structures: [
        { type: "array", label: "dp (final)", values: [1, 1, 2, 2, 3, 4], highlights: { 5: "success" } },
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }, { name: "all combos", value: "[11111],[1112],[122],[5]" }, { name: "Time", value: "O(n × amount)" }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Bottom-Up DP",
  timeComplexity: "O(amount × n)",
  spaceComplexity: "O(amount)",
  code: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
  steps: [
    {
      description:
        "Find the fewest coins needed to make a given amount. This is a classic unbounded knapsack / DP problem. The greedy approach (always pick the largest coin) fails — e.g., with coins [1,5,11] and amount 15, greedy picks 11+1+1+1+1=5 coins, but optimal is 5+5+5=3 coins. DP finds the true minimum: dp[a] = minimum coins for amount a. For each amount, try every coin denomination and take the best. Base: dp[0] = 0. coins=[1,5,11], amount=11.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "dp", values: [0, "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞"] },
        { type: "variables", entries: [{ name: "coins", value: "[1, 5, 11]" }, { name: "amount", value: 11 }, { name: "greedy fails!", value: "DP explores all options" }] },
      ],
    },
    {
      description:
        "Build up from small amounts. a=1: only coin 1 fits → dp[0]+1 = 1. a=2: coin 1 → dp[1]+1 = 2. Similarly dp[3]=3, dp[4]=4. For amounts 1-4, only the penny works. Each uses a=coin 1 repeatedly. The transition dp[a] = min(dp[a], dp[a-c]+1) means: 'if I use coin c, the remaining amount is a-c, and I need dp[a-c] coins plus this one.'",
      codeHighlightLines: [4, 5, 6, 7],
      structures: [
        { type: "array", label: "dp", values: [0, 1, 2, 3, 4, "∞", "∞", "∞", "∞", "∞", "∞", "∞"], highlights: { 1: "active", 2: "active", 3: "active", 4: "active" } },
        { type: "variables", entries: [{ name: "transition", value: "dp[a] = min(dp[a-c] + 1) for each coin c" }] },
      ],
    },
    {
      description:
        "a=5: Try coin 1 → dp[4]+1 = 5. Try coin 5 → dp[0]+1 = 1. min(5, 1) = 1! One nickel beats five pennies. dp[5]=1. a=6: coin 1 → dp[5]+1=2, coin 5 → dp[1]+1=2 → dp[6]=2. a=10: coin 1 → dp[9]+1=6, coin 5 → dp[5]+1=2. dp[10]=2 (two nickels). Each amount benefits from the optimal solutions to smaller subproblems — this is the essence of dynamic programming.",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "array", label: "dp", values: [0, 1, 2, 3, 4, 1, 2, 3, 4, 5, 2, "∞"], highlights: { 5: "success", 10: "success" } },
        { type: "variables", entries: [{ name: "dp[5]", value: "1 (one 5¢)", highlight: true }, { name: "dp[10]", value: "2 (two 5¢)", highlight: true }] },
      ],
    },
    {
      description:
        "a=11: Try coin 1 → dp[10]+1 = 3. Try coin 5 → dp[6]+1 = 3. Try coin 11 → dp[0]+1 = 1! dp[11] = min(3, 3, 1) = 1. One 11-cent coin is optimal! This is why greedy fails but DP succeeds — it considers ALL denominations at every amount. If dp[amount] remains ∞, return -1 (impossible). Time: O(amount × n) where n = number of coin types. Space: O(amount).",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "array", label: "dp (complete)", values: [0, 1, 2, 3, 4, 1, 2, 3, 4, 5, 2, 1], highlights: { 11: "success" } },
        { type: "variables", entries: [{ name: "coin 11 → dp[0]+1", value: "1 — best!", highlight: true }, { name: "return", value: 1, highlight: true }, { name: "Time", value: "O(amount × n)" }] },
      ],
    },
  ],
};

export default solution;

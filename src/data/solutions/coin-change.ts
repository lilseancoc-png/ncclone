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
        "Find fewest coins to make amount. Greedy fails: coins [1,5,11], amount 15, greedy picks 11+1+1+1+1=5 coins but optimal is 5+5+5=3. DP: dp[a] = min coins for amount a. For each amount, try every coin. dp[0]=0 (base case). coins=[1,5,11], amount=11.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "dp", values: [0, "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞"] },
        { type: "variables", entries: [{ name: "coins", value: "[1, 5, 11]" }, { name: "amount", value: 11 }] },
      ],
    },
    {
      description:
        "Fill dp[1] through dp[4]. Only coin 1 fits these amounts. dp[1]: try coin 1 → dp[0]+1=1, coin 5>1 skip, coin 11>1 skip. dp[1]=1. dp[2]: coin 1 → dp[1]+1=2. dp[2]=2. Similarly dp[3]=3, dp[4]=4. Each is just pennies stacked up.",
      codeHighlightLines: [4, 5, 6, 7],
      structures: [
        { type: "array", label: "dp", values: [0, 1, 2, 3, 4, "∞", "∞", "∞", "∞", "∞", "∞", "∞"], highlights: { 1: "active", 2: "active", 3: "active", 4: "active" } },
        { type: "variables", entries: [{ name: "dp[1..4]", value: "only coin 1 works" }, { name: "transition", value: "dp[a] = min(dp[a-c]+1) for each coin c" }] },
      ],
    },
    {
      description:
        "dp[5]: coin 1 → dp[4]+1=5. Coin 5 → dp[0]+1=1. min(5,1)=1! One nickel beats five pennies. dp[5]=1. dp[6]: coin 1 → dp[5]+1=2, coin 5 → dp[1]+1=2. dp[6]=2. dp[10]: coin 1 → dp[9]+1=6, coin 5 → dp[5]+1=2. dp[10]=2 (two nickels).",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "array", label: "dp", values: [0, 1, 2, 3, 4, 1, 2, 3, 4, 5, 2, "∞"], highlights: { 5: "success", 6: "active", 10: "success" } },
        { type: "variables", entries: [{ name: "dp[5]", value: "1 (one 5¢ coin!)", highlight: true }, { name: "dp[10]", value: "2 (two 5¢)", highlight: true }] },
      ],
    },
    {
      description:
        "dp[11]: Try coin 1 → dp[10]+1=3. Try coin 5 → dp[6]+1=3. Try coin 11 → dp[0]+1=1! dp[11] = min(3, 3, 1) = 1. One 11-cent coin is optimal. Each coin denomination gets a fair chance — DP explores all options, unlike greedy which commits to the largest coin first.",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "array", label: "dp", values: [0, 1, 2, 3, 4, 1, 2, 3, 4, 5, 2, 1], highlights: { 11: "success" } },
        { type: "variables", entries: [{ name: "coin 1 → dp[10]+1", value: "= 3" }, { name: "coin 5 → dp[6]+1", value: "= 3" }, { name: "coin 11 → dp[0]+1", value: "= 1 ← best!", highlight: true }] },
      ],
    },
    {
      description:
        "Return dp[11] = 1. If dp[amount] remains ∞, return -1 (impossible). Time: O(amount × n) where n = number of coin types — for each of the 'amount' cells, we try each coin. Space: O(amount) for the dp array. This is an unbounded knapsack variant — each coin can be used unlimited times.",
      codeHighlightLines: [8],
      structures: [
        { type: "array", label: "dp (final)", values: [0, 1, 2, 3, 4, 1, 2, 3, 4, 5, 2, 1], highlights: { 0: "success", 5: "success", 10: "success", 11: "success" } },
        { type: "variables", entries: [{ name: "return", value: 1, highlight: true }, { name: "dp[11] = 1", value: "one 11¢ coin" }, { name: "Time", value: "O(amount × n)" }, { name: "Space", value: "O(amount)" }] },
      ],
    },
  ],
};

export default solution;

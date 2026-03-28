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
        "Find minimum coins to make amount=11 with coins [1, 5, 11]. dp[a] = min coins needed for amount a. Base: dp[0]=0 (zero coins for amount 0). Fill dp[1] through dp[11] by trying each coin.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "dp", values: [0, "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞"] },
        { type: "variables", entries: [{ name: "coins", value: "[1, 5, 11]" }, { name: "amount", value: 11 }] },
      ],
    },
    {
      description:
        "a=1: Try coin 1 → dp[1-1]+1 = dp[0]+1 = 1. Coins 5,11 too big. dp[1]=1. a=2: coin 1 → dp[1]+1=2. dp[2]=2. a=3: dp[3]=3. a=4: dp[4]=4. Each uses all 1-cent coins.",
      codeHighlightLines: [4, 5, 6, 7],
      structures: [
        { type: "array", label: "dp", values: [0, 1, 2, 3, 4, "∞", "∞", "∞", "∞", "∞", "∞", "∞"], highlights: { 1: "active", 2: "active", 3: "active", 4: "active" } },
        { type: "variables", entries: [{ name: "using coin", value: 1 }] },
      ],
    },
    {
      description:
        "a=5: Try coin 1 → dp[4]+1=5. Try coin 5 → dp[0]+1=1. min(5,1)=1. dp[5]=1! One 5-cent coin is much better than five 1-cent coins. a=6: min(dp[5]+1, dp[1]+1) = min(2, 2) = 2.",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "array", label: "dp", values: [0, 1, 2, 3, 4, 1, 2, "∞", "∞", "∞", "∞", "∞"], highlights: { 5: "success", 6: "active" } },
        { type: "variables", entries: [{ name: "dp[5]", value: "min(5, 1) = 1", highlight: true }] },
      ],
    },
    {
      description:
        "a=7: dp[6]+1=3, dp[2]+1=3 → dp[7]=3. a=8: dp[7]+1=4, dp[3]+1=4 → 4. a=9: dp[8]+1=5, dp[4]+1=5 → 5. a=10: dp[9]+1=6, dp[5]+1=2 → dp[10]=2 (two 5-cent coins!).",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "array", label: "dp", values: [0, 1, 2, 3, 4, 1, 2, 3, 4, 5, 2, "∞"], highlights: { 7: "checked", 8: "checked", 9: "checked", 10: "success" } },
        { type: "variables", entries: [{ name: "dp[10]", value: "min(6, 2) = 2", highlight: true }] },
      ],
    },
    {
      description:
        "a=11: Try coin 1 → dp[10]+1=3. Try coin 5 → dp[6]+1=3. Try coin 11 → dp[0]+1=1! dp[11] = min(3, 3, 1) = 1. One 11-cent coin is optimal! Return 1.",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "array", label: "dp", values: [0, 1, 2, 3, 4, 1, 2, 3, 4, 5, 2, 1], highlights: { 11: "success" } },
        { type: "variables", entries: [{ name: "coin 1 → dp[10]+1", value: 3 }, { name: "coin 5 → dp[6]+1", value: 3 }, { name: "coin 11 → dp[0]+1", value: 1, highlight: true }, { name: "return", value: 1, highlight: true }] },
      ],
    },
  ],
};

export default solution;

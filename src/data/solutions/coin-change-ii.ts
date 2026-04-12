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
        "Count combinations (not permutations) to make an amount. [1,2] and [2,1] count as ONE combination. The trick: iterate coins in the OUTER loop. This ensures each coin type is considered in order, preventing duplicates. amount=5, coins=[1,2,5]. dp[0]=1 (one way to make $0: nothing).",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "dp", values: [1, 0, 0, 0, 0, 0] },
        { type: "variables", entries: [{ name: "amount", value: 5 }, { name: "coins", value: "[1, 2, 5]" }, { name: "dp[0]=1", value: "base case" }] },
      ],
    },
    {
      description:
        "Process coin=1: For x=1 to 5, dp[x] += dp[x-1]. Each amount gains ways from using one more penny. dp[1]+=dp[0]=1, dp[2]+=dp[1]=1, ..., dp[5]+=dp[4]=1. With only pennies, there's exactly 1 way to make each amount (all 1s).",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "array", label: "dp (after coin=1)", values: [1, 1, 1, 1, 1, 1], highlights: { 1: "active", 2: "active", 3: "active", 4: "active", 5: "active" } },
        { type: "variables", entries: [{ name: "coin", value: 1, highlight: true }, { name: "dp[5]=1", value: "only way: [1,1,1,1,1]" }] },
      ],
    },
    {
      description:
        "Process coin=2: dp[2] += dp[0] = 1+1 = 2 (ways: [1,1] or [2]). dp[3] += dp[1] = 1+1 = 2. dp[4] += dp[2] = 1+2 = 3 (ways: [1,1,1,1], [1,1,2], [2,2]). dp[5] += dp[3] = 1+2 = 3. The outer-coin-loop means coin 2 only combines with coin 1, never producing duplicate orderings.",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "array", label: "dp (after coins 1,2)", values: [1, 1, 2, 2, 3, 3], highlights: { 2: "active", 3: "active", 4: "active", 5: "active" } },
        { type: "variables", entries: [{ name: "coin", value: 2, highlight: true }, { name: "dp[4]=3", value: "[1111], [112], [22]" }, { name: "dp[5]=3", value: "[11111], [1112], [122]" }] },
      ],
    },
    {
      description:
        "Process coin=5: Only dp[5] affected (x must be ≥ coin). dp[5] += dp[0] = 3+1 = 4. The new way: a single $5 coin! All four combinations for amount 5: [1,1,1,1,1], [1,1,1,2], [1,2,2], [5].",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "array", label: "dp (after all coins)", values: [1, 1, 2, 2, 3, 4], highlights: { 5: "success" } },
        { type: "variables", entries: [{ name: "coin", value: 5, highlight: true }, { name: "dp[5] += dp[0]", value: "3 + 1 = 4" }, { name: "+1 new way", value: "just [5]" }] },
      ],
    },
    {
      description:
        "Return dp[5] = 4. Why outer coin loop prevents duplicates: if coins were in the inner loop (like coin change I), dp[3] would count both [1,2] and [2,1]. With coins outer, when processing coin=2, we only add 2s ON TOP of 1s already placed — never 1 after 2. This is the key difference between counting combinations vs permutations. Time: O(n × amount). Space: O(amount).",
      codeHighlightLines: [7],
      structures: [
        { type: "array", label: "dp (final)", values: [1, 1, 2, 2, 3, 4], highlights: { 5: "success" } },
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }, { name: "combos", value: "[11111],[1112],[122],[5]" }, { name: "Time", value: "O(n × amount)" }] },
      ],
    },
  ],
};

export default solution;

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
        "Count the number of combinations to make a target amount using given coins (unlimited supply). Unlike permutations, [1,2] and [2,1] count as ONE combination. amount=5, coins=[1,2,5].",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "dp", values: [1, 0, 0, 0, 0, 0] },
        { type: "variables", entries: [{ name: "amount", value: 5 }, { name: "coins", value: "[1, 2, 5]" }] },
      ],
    },
    {
      description:
        "Process coin=1: for each amount x from 1 to 5, dp[x] += dp[x-1]. After: dp=[1,1,1,1,1,1]. Using only coin 1, there's exactly 1 way to make each amount.",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "array", label: "dp (after coin=1)", values: [1, 1, 1, 1, 1, 1], highlights: { 1: "active", 2: "active", 3: "active", 4: "active", 5: "active" } },
        { type: "variables", entries: [{ name: "coin", value: 1, highlight: true }] },
      ],
    },
    {
      description:
        "Process coin=2: dp[2]+=dp[0]=2, dp[3]+=dp[1]=2, dp[4]+=dp[2]=3, dp[5]+=dp[3]=3. Now counts include combinations using coins 1 and 2.",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "array", label: "dp (after coin=2)", values: [1, 1, 2, 2, 3, 3], highlights: { 2: "active", 3: "active", 4: "active", 5: "active" } },
        { type: "variables", entries: [{ name: "coin", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "Process coin=5: dp[5]+=dp[0]=4. Final dp[5]=4. The 4 combinations: [1,1,1,1,1], [1,1,1,2], [1,2,2], [5]. Key: iterating coins in outer loop avoids counting permutations.",
      codeHighlightLines: [7],
      structures: [
        { type: "array", label: "dp (final)", values: [1, 1, 2, 2, 3, 4], highlights: { 5: "success" } },
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }, { name: "combos", value: "[11111],[1112],[122],[5]" }] },
      ],
    },
  ],
};

export default solution;

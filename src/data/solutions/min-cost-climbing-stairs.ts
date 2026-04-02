import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Bottom-Up DP (Optimized Space)",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def minCostClimbingStairs(cost):
    for i in range(2, len(cost)):
        cost[i] += min(cost[i-1], cost[i-2])
    return min(cost[-1], cost[-2])`,
  steps: [
    {
      description:
        "Find the minimum cost to reach the top of the stairs. You can start from step 0 or step 1. At each step, pay cost[i] and climb 1 or 2 steps. cost = [10, 15, 20]. We modify the array in-place: dp[i] = cost[i] + min(dp[i-1], dp[i-2]).",
      codeHighlightLines: [1],
      structures: [
        { type: "array", label: "cost", values: [10, 15, 20] },
        { type: "variables", entries: [{ name: "goal", value: "reach past index 2" }] },
      ],
    },
    {
      description:
        "i=2: cost[2] += min(cost[1], cost[0]) = min(15, 10) = 10. cost[2] = 20 + 10 = 30. This means reaching step 2 costs 30 (start at step 0 for 10, then jump to step 2 for 20).",
      codeHighlightLines: [2, 3],
      structures: [
        { type: "array", label: "cost", values: [10, 15, 30], highlights: { 0: "checked", 1: "checked", 2: "active" }, pointers: [{ index: 2, label: "i" }] },
        { type: "variables", entries: [{ name: "min(cost[1], cost[0])", value: 10 }, { name: "cost[2]", value: 30, highlight: true }] },
      ],
    },
    {
      description:
        "Now return min(cost[-1], cost[-2]) = min(30, 15) = 15. The cheapest path is to start at step 1 (pay 15) and jump 2 steps to the top, skipping step 2 entirely.",
      codeHighlightLines: [4],
      structures: [
        { type: "array", label: "cost", values: [10, 15, 30], highlights: { 1: "success" } },
        { type: "variables", entries: [{ name: "min(cost[-1], cost[-2])", value: "min(30, 15)" }, { name: "return", value: 15, highlight: true }] },
      ],
    },
    {
      description:
        "Return 15. Optimal path: start at step 1, pay 15, jump to top. Time: O(n) single pass. Space: O(1) since we modified the input array in-place. The key insight: we can start from either step 0 or 1, and the answer is min of the last two accumulated costs.",
      codeHighlightLines: [4],
      structures: [
        { type: "array", label: "cost", values: [10, 15, 30], highlights: { 1: "success" } },
        { type: "variables", entries: [{ name: "return", value: 15, highlight: true }] },
      ],
    },
  ],
};

export default solution;

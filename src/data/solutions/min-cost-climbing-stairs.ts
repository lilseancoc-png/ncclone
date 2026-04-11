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
        "Find the minimum cost to reach the top of the stairs (one step past the last index). You can start from step 0 or step 1, and at each step you pay cost[i] then climb 1 or 2 steps. The DP idea: the minimum cost to reach step i = cost[i] + min(cost to reach i-1, cost to reach i-2). We can modify the array in-place since once we compute cost[i], we never need the original value again. cost = [10, 15, 20].",
      codeHighlightLines: [1],
      structures: [
        { type: "array", label: "cost", values: [10, 15, 20], pointers: [{ index: 0, label: "start?" }, { index: 1, label: "start?" }] },
        { type: "variables", entries: [{ name: "goal", value: "reach past index 2" }, { name: "can start at", value: "step 0 or step 1" }] },
      ],
    },
    {
      description:
        "i=2: What's the cheapest way to reach step 2? Either come from step 0 (cost 10) or step 1 (cost 15). Step 0 is cheaper! cost[2] += min(cost[1], cost[0]) = min(15, 10) = 10. So cost[2] = 20 + 10 = 30. This means the cheapest way to reach and pay for step 2 costs 30 total (start at step 0 for 10, jump to step 2 for 20).",
      codeHighlightLines: [2, 3],
      structures: [
        { type: "array", label: "cost", values: [10, 15, 30], highlights: { 0: "active", 2: "success" }, pointers: [{ index: 0, label: "cheaper!" }, { index: 2, label: "i" }] },
        { type: "variables", entries: [{ name: "min(cost[1], cost[0])", value: "min(15, 10) = 10" }, { name: "cost[2]", value: "20 + 10 = 30", highlight: true }] },
      ],
    },
    {
      description:
        "Loop is done (only had i=2 to process). Now: to reach the TOP (past the last step), we can take 1 step from cost[-1] or 2 steps from cost[-2]. Return min(cost[-1], cost[-2]) = min(30, 15) = 15. The cheapest path: start at step 1, pay 15, jump 2 steps to the top — completely skipping step 2!",
      codeHighlightLines: [4],
      structures: [
        { type: "array", label: "cost (modified)", values: [10, 15, 30], highlights: { 1: "success" }, pointers: [{ index: 1, label: "optimal start" }] },
        { type: "variables", entries: [{ name: "min(cost[-1], cost[-2])", value: "min(30, 15) = 15" }, { name: "return", value: 15, highlight: true }] },
      ],
    },
    {
      description:
        "Return 15. The optimal path: start at step 1 (pay 15), jump 2 steps to the top. Total: 15. Starting at step 0 would cost at least 10 + 20 = 30 (via step 0→step 2→top) or 10 + 15 = 25 (via step 0→step 1→top). Time: O(n) — single pass through the array. Space: O(1) — we modified the input array in-place instead of creating a separate dp array.",
      codeHighlightLines: [4],
      structures: [
        { type: "array", label: "cost", values: [10, 15, 30], highlights: { 1: "success" } },
        { type: "variables", entries: [{ name: "return", value: 15, highlight: true }, { name: "optimal path", value: "step 1 → top (pay 15)" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1) in-place" }] },
      ],
    },
  ],
};

export default solution;

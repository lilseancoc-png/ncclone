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
        "Find the minimum cost to reach the top (one step past the last index). You can start from step 0 or 1, pay cost[i], then climb 1 or 2 steps. DP idea: min cost to reach step i = cost[i] + min(cost[i-1], cost[i-2]). Modify in-place since original values aren't needed after processing. cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1].",
      codeHighlightLines: [1],
      structures: [
        { type: "array", label: "cost", values: [1, 100, 1, 1, 1, 100, 1, 1, 100, 1], pointers: [{ index: 0, label: "start?" }, { index: 1, label: "start?" }] },
        { type: "variables", entries: [{ name: "goal", value: "reach past index 9" }, { name: "can start at", value: "step 0 or step 1" }] },
      ],
    },
    {
      description:
        "i=2: cost[2] += min(cost[1], cost[0]) = min(100, 1) = 1. cost[2] = 1+1 = 2. Cheaper to come from step 0 (cost 1) than step 1 (cost 100). i=3: cost[3] += min(cost[2], cost[1]) = min(2, 100) = 2. cost[3] = 1+2 = 3. Come from step 2. The expensive step 1 is being avoided!",
      codeHighlightLines: [2, 3],
      structures: [
        { type: "array", label: "cost", values: [1, 100, 2, 3, 1, 100, 1, 1, 100, 1], highlights: { 2: "active", 3: "active" }, pointers: [{ index: 2, label: "i=2" }, { index: 3, label: "i=3" }] },
        { type: "variables", entries: [{ name: "cost[2]", value: "1 + min(100,1) = 2" }, { name: "cost[3]", value: "1 + min(2,100) = 3", highlight: true }] },
      ],
    },
    {
      description:
        "i=4: cost[4] += min(3, 2) = 2 → cost[4] = 3. i=5: cost[5] += min(3, 3) = 3 → cost[5] = 103. The expensive step 5 (cost 100) makes reaching it costly. i=6: cost[6] += min(103, 3) = 3 → cost[6] = 4. We SKIP over step 5 by jumping from step 4 (cost 3) to step 6!",
      codeHighlightLines: [2, 3],
      structures: [
        { type: "array", label: "cost", values: [1, 100, 2, 3, 3, 103, 4, 1, 100, 1], highlights: { 4: "checked", 5: "checked", 6: "active" } },
        { type: "variables", entries: [{ name: "cost[5]", value: "103 (expensive!)" }, { name: "cost[6]", value: "1 + min(103,3) = 4 (skip step 5!)", highlight: true }] },
      ],
    },
    {
      description:
        "i=7: cost[7] += min(4, 103) = 4 → cost[7] = 5. i=8: cost[8] += min(5, 4) = 4 → cost[8] = 104. i=9: cost[9] += min(104, 5) = 5 → cost[9] = 6. Again, we skip the expensive step 8 by jumping from step 7. Return min(cost[-1], cost[-2]) = min(6, 104) = 6.",
      codeHighlightLines: [2, 3, 4],
      structures: [
        { type: "array", label: "cost", values: [1, 100, 2, 3, 3, 103, 4, 5, 104, 6], highlights: { 7: "checked", 8: "checked", 9: "success" } },
        { type: "variables", entries: [{ name: "min(cost[-1], cost[-2])", value: "min(6, 104) = 6" }, { name: "return", value: 6, highlight: true }] },
      ],
    },
    {
      description:
        "Return 6. Optimal path: 0→2→3→4→6→7→9→top (skipping expensive steps 1, 5, 8). Each time there's a high-cost step, the DP naturally routes around it via the 2-step jump. Time: O(n) single pass. Space: O(1) — modified in-place. The key insight: cost[i] accumulates the cheapest total cost to reach and pay for step i, so the final answer is just min of the last two.",
      codeHighlightLines: [4],
      structures: [
        { type: "array", label: "cost (final)", values: [1, 100, 2, 3, 3, 103, 4, 5, 104, 6], highlights: { 0: "success", 2: "success", 3: "success", 4: "success", 6: "success", 7: "success", 9: "success" } },
        { type: "variables", entries: [{ name: "return", value: 6, highlight: true }, { name: "path", value: "0→2→3→4→6→7→9→top" }, { name: "Time", value: "O(n), Space: O(1)" }] },
      ],
    },
  ],
};

export default solution;

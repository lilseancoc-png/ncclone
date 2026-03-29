import { SolutionData } from "../types";

const solution: SolutionData[] = [
  {
    label: "Brute Force — Recursion",
    timeComplexity: "O(2^n)",
    spaceComplexity: "O(n)",
    code: `def find_target_sum_ways(nums, target):
    def dfs(i, total):
        if i == len(nums):
            return 1 if total == target else 0
        return dfs(i + 1, total + nums[i]) + dfs(i + 1, total - nums[i])
    return dfs(0, 0)`,
    steps: [
      {
        description:
          "Assign + or - to each number to reach the target sum. Brute force: try all 2^n combinations. nums=[1,1,1,1,1], target=3.",
        codeHighlightLines: [1, 2],
        structures: [
          { type: "array", label: "nums", values: [1, 1, 1, 1, 1] },
          { type: "variables", entries: [{ name: "target", value: 3 }, { name: "total combos", value: "2^5 = 32" }] },
        ],
      },
      {
        description:
          "For each number, branch: add it or subtract it. This creates a binary tree of depth n. Many paths lead to the same (index, total) — wasted work.",
        codeHighlightLines: [3, 4, 5],
        structures: [
          { type: "array", label: "example path", values: ["+1", "+1", "+1", "+1", "-1"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "found" } },
          { type: "variables", entries: [{ name: "sum", value: "1+1+1+1-1 = 3", highlight: true }, { name: "matches?", value: "yes!" }] },
        ],
      },
      {
        description:
          "5 valid assignments sum to 3: {+1+1+1+1-1, +1+1+1-1+1, +1+1-1+1+1, +1-1+1+1+1, -1+1+1+1+1}. Return 5. But we checked all 32 paths — very slow for large n.",
        codeHighlightLines: [6],
        structures: [
          { type: "variables", entries: [{ name: "return", value: 5, highlight: true }, { name: "time", value: "O(2^n) — exponential!" }] },
        ],
      },
    ],
  },
  {
    label: "Optimal — DP (Subset Sum)",
    timeComplexity: "O(n × sum)",
    spaceComplexity: "O(sum)",
    code: `def find_target_sum_ways(nums, target):
    total = sum(nums)
    if (total + target) % 2 != 0 or abs(target) > total:
        return 0
    subset_sum = (total + target) // 2
    dp = [0] * (subset_sum + 1)
    dp[0] = 1
    for num in nums:
        for s in range(subset_sum, num - 1, -1):
            dp[s] += dp[s - num]
    return dp[subset_sum]`,
    steps: [
      {
        description:
          "Key insight: if P = sum of positive nums, N = sum of negative, then P - N = target and P + N = total. So P = (total + target) / 2. Reduce to counting subsets that sum to P! nums=[1,1,1,1,1], target=3.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          { type: "variables", entries: [{ name: "total", value: 5 }, { name: "target", value: 3 }, { name: "subset_sum P", value: "(5+3)/2 = 4", highlight: true }] },
        ],
      },
      {
        description:
          "Now count subsets of [1,1,1,1,1] that sum to 4. dp[0]=1 (empty set). Process each num, update dp right-to-left to avoid double counting.",
        codeHighlightLines: [6, 7, 8, 9, 10],
        structures: [
          { type: "array", label: "dp (start)", values: [1, 0, 0, 0, 0] },
          { type: "variables", entries: [{ name: "goal", value: "count subsets summing to 4" }] },
        ],
      },
      {
        description:
          "After processing all five 1s: dp[4] = 5. There are 5 ways to pick 4 items from 5 identical items (C(5,4) = 5). Each corresponds to a +/- assignment summing to 3.",
        codeHighlightLines: [11],
        structures: [
          { type: "array", label: "dp (final)", values: [1, 5, 10, 10, 5], highlights: { 4: "success" } },
          { type: "variables", entries: [{ name: "return", value: 5, highlight: true }, { name: "time", value: "O(n × sum)" }] },
        ],
      },
    ],
  },
];

export default solution;

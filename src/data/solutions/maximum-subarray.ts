import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  // ── Approach 1: Brute Force — Check All Subarrays ────────────────────
  {
    label: "Brute Force — All Subarrays",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    code: `def maxSubArray(nums):
    max_sum = nums[0]
    for i in range(len(nums)):
        current_sum = 0
        for j in range(i, len(nums)):
            current_sum += nums[j]
            max_sum = max(max_sum, current_sum)
    return max_sum`,
    steps: [
      {
        description:
          "Find the contiguous subarray with the largest sum. The brute force: try every possible starting index i and ending index j, computing each subarray's sum. This checks all O(n²) subarrays.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
          { type: "variables", entries: [{ name: "max_sum", value: -2 }] },
        ],
      },
      {
        description:
          "i=0: Try all subarrays starting at index 0. sum[-2]=-2, sum[-2,1]=-1, sum[-2,1,-3]=-4, ... Best from i=0 is -1 (subarray [-2,1]).",
        codeHighlightLines: [3, 4, 5, 6, 7],
        structures: [
          { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 0: "active" }, pointers: [{ index: 0, label: "i" }] },
          { type: "variables", entries: [{ name: "best from i=0", value: -1 }, { name: "max_sum", value: -1 }] },
        ],
      },
      {
        description:
          "i=1: sum[1]=1, sum[1,-3]=-2, sum[1,-3,4]=2, sum[1,-3,4,-1]=1, sum[1,-3,4,-1,2]=3, sum[1,-3,4,-1,2,1]=4. Best from i=1 is 4. max_sum updates to 4.",
        codeHighlightLines: [3, 4, 5, 6, 7],
        structures: [
          { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 0: "checked", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "active" }, pointers: [{ index: 1, label: "i" }] },
          { type: "variables", entries: [{ name: "best from i=1", value: 4 }, { name: "max_sum", value: 4, highlight: true }] },
        ],
      },
      {
        description:
          "i=3: sum[4]=4, sum[4,-1]=3, sum[4,-1,2]=5, sum[4,-1,2,1]=6, sum[4,-1,2,1,-5]=1, sum[4,-1,2,1,-5,4]=5. Best from i=3 is 6! max_sum updates to 6.",
        codeHighlightLines: [3, 4, 5, 6, 7],
        structures: [
          { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 3: "success", 4: "success", 5: "success", 6: "success" }, pointers: [{ index: 3, label: "i" }] },
          { type: "variables", entries: [{ name: "best from i=3", value: 6, highlight: true }, { name: "max_sum", value: 6, highlight: true }] },
        ],
      },
      {
        description:
          "Continue with i=4 through i=8... none beat 6. Return 6 from subarray [4,-1,2,1]. Time: O(n²) — two nested loops. Space: O(1). Kadane's algorithm (Approach 2) does this in O(n) with a clever observation.",
        codeHighlightLines: [8],
        structures: [
          { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 3: "success", 4: "success", 5: "success", 6: "success" } },
          { type: "variables", entries: [{ name: "return", value: 6, highlight: true }] },
        ],
      },
    ],
  },

  // ── Approach 2: Optimal — Kadane's Algorithm ─────────────────────────
  {
    label: "Optimal — Kadane's Algorithm",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def maxSubArray(nums):
    max_sum = nums[0]
    current_sum = nums[0]

    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)

    return max_sum`,
    steps: [
      {
        description:
          "Kadane's insight: at each position, we decide — should we extend the current subarray or start fresh? If current_sum + nums[i] < nums[i], the accumulated sum is dragging us down, so we restart. This gives us O(n) with a single pass.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 0: "active" }, pointers: [{ index: 0, label: "start" }] },
          { type: "variables", entries: [{ name: "current_sum", value: -2 }, { name: "max_sum", value: -2 }] },
        ],
      },
      {
        description:
          "i=1, nums[1]=1. max(1, -2+1) = max(1, -1) = 1. Starting fresh at 1 is better than extending [-2,1]=-1. The negative prefix was hurting us. max_sum updates to 1.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 1: "active" }, pointers: [{ index: 1, label: "i" }] },
          { type: "variables", entries: [{ name: "current_sum", value: 1, highlight: true }, { name: "max_sum", value: 1, highlight: true }, { name: "decision", value: "restart" }] },
        ],
      },
      {
        description:
          "i=2, nums[2]=-3. max(-3, 1+(-3)) = max(-3, -2) = -2. Extending is better (-2 > -3). We keep the subarray going even though it dips negative. max_sum stays 1.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 1: "checked", 2: "checked" }, pointers: [{ index: 2, label: "i" }] },
          { type: "variables", entries: [{ name: "current_sum", value: -2 }, { name: "max_sum", value: 1 }, { name: "decision", value: "extend" }] },
        ],
      },
      {
        description:
          "i=3, nums[3]=4. max(4, -2+4) = max(4, 2) = 4. Starting fresh! The accumulated -2 would reduce our sum. New subarray begins at index 3. max_sum = 4.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 3: "active" }, pointers: [{ index: 3, label: "i" }] },
          { type: "variables", entries: [{ name: "current_sum", value: 4, highlight: true }, { name: "max_sum", value: 4, highlight: true }, { name: "decision", value: "restart" }] },
        ],
      },
      {
        description:
          "i=4, nums[4]=-1. max(-1, 4+(-1)) = 3. Extend — even though -1 is negative, the accumulated 4 still keeps us positive. current_sum=3, max_sum stays 4.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 3: "pointer-i", 4: "active" }, pointers: [{ index: 4, label: "i" }] },
          { type: "variables", entries: [{ name: "current_sum", value: 3 }, { name: "max_sum", value: 4 }, { name: "decision", value: "extend" }] },
        ],
      },
      {
        description:
          "i=5, nums[5]=2. max(2, 3+2) = 5. Extend. i=6, nums[6]=1. max(1, 5+1) = 6. Extend! current_sum=6, max_sum=6. The subarray [4,-1,2,1] has sum 6.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 3: "success", 4: "success", 5: "success", 6: "success" }, pointers: [{ index: 6, label: "i" }] },
          { type: "variables", entries: [{ name: "current_sum", value: 6, highlight: true }, { name: "max_sum", value: 6, highlight: true }] },
        ],
      },
      {
        description:
          "i=7, nums[7]=-5. current_sum = max(-5, 6-5) = 1. Extend but max_sum stays 6. i=8, nums[8]=4. current_sum = max(4, 1+4) = 5. Still doesn't beat 6.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 3: "success", 4: "success", 5: "success", 6: "success", 7: "checked", 8: "checked" }, pointers: [{ index: 8, label: "i" }] },
          { type: "variables", entries: [{ name: "current_sum", value: 5 }, { name: "max_sum", value: 6 }] },
        ],
      },
      {
        description:
          "Return max_sum = 6 from subarray [4,-1,2,1] at indices 3-6. Time: O(n) — single pass. Space: O(1) — just two variables. Kadane's is optimal because you must look at each element at least once.",
        codeHighlightLines: [9],
        structures: [
          { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 3: "success", 4: "success", 5: "success", 6: "success" } },
          { type: "variables", entries: [{ name: "return max_sum", value: 6, highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

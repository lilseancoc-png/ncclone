import { SolutionData } from "../types";

const solution: SolutionData = {
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
        "Kadane's algorithm: track the best sum ending at each position. Initialize both max_sum and current_sum to the first element, -2.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 0: "active" }, pointers: [{ index: 0, label: "start" }] },
        { type: "variables", entries: [{ name: "current_sum", value: -2 }, { name: "max_sum", value: -2 }] },
      ],
    },
    {
      description:
        "i=1, nums[1]=1. max(1, -2+1) = max(1, -1) = 1. It is better to start fresh at 1. Update max_sum to 1.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 1: "active" }, pointers: [{ index: 1, label: "i" }] },
        { type: "variables", entries: [{ name: "current_sum", value: 1, highlight: true }, { name: "max_sum", value: 1, highlight: true }] },
      ],
    },
    {
      description:
        "i=2, nums[2]=-3. max(-3, 1+(-3)) = max(-3, -2) = -2. Extending is better than restarting. max_sum stays 1.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 2: "checked" }, pointers: [{ index: 2, label: "i" }] },
        { type: "variables", entries: [{ name: "current_sum", value: -2, highlight: true }, { name: "max_sum", value: 1 }] },
      ],
    },
    {
      description:
        "i=3, nums[3]=4. max(4, -2+4) = max(4, 2) = 4. Starting fresh at 4 is better. Update max_sum to 4.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 3: "active" }, pointers: [{ index: 3, label: "i" }] },
        { type: "variables", entries: [{ name: "current_sum", value: 4, highlight: true }, { name: "max_sum", value: 4, highlight: true }] },
      ],
    },
    {
      description:
        "i=4, nums[4]=-1. max(-1, 4+(-1)) = 3. Extend. i=5, nums[5]=2. max(2, 3+2) = 5. Extend. max_sum becomes 5.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 3: "pointer-i", 4: "pointer-i", 5: "active" }, pointers: [{ index: 5, label: "i" }] },
        { type: "variables", entries: [{ name: "current_sum", value: 5, highlight: true }, { name: "max_sum", value: 5, highlight: true }] },
      ],
    },
    {
      description:
        "i=6, nums[6]=1. max(1, 5+1) = 6. Extend the subarray. max_sum updates to 6. This is the subarray [4,-1,2,1].",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 3: "success", 4: "success", 5: "success", 6: "success" }, pointers: [{ index: 6, label: "i" }] },
        { type: "variables", entries: [{ name: "current_sum", value: 6, highlight: true }, { name: "max_sum", value: 6, highlight: true }] },
      ],
    },
    {
      description:
        "i=7, nums[7]=-5. current_sum=1. i=8, nums[8]=4. current_sum=5. Neither beats max_sum=6.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 7: "checked", 8: "checked" }, pointers: [{ index: 8, label: "i" }] },
        { type: "variables", entries: [{ name: "current_sum", value: 5 }, { name: "max_sum", value: 6 }] },
      ],
    },
    {
      description:
        "Done! The maximum subarray sum is 6, from the subarray [4, -1, 2, 1] at indices 3-6.",
      codeHighlightLines: [8],
      structures: [
        { type: "array", label: "nums", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], highlights: { 3: "success", 4: "success", 5: "success", 6: "success" } },
        { type: "variables", entries: [{ name: "return max_sum", value: 6, highlight: true }] },
      ],
    },
  ],
};

export default solution;

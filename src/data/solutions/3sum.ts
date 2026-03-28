import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def threeSum(nums):
    nums.sort()
    result = []

    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        left = i + 1
        right = len(nums) - 1

        while left < right:
            total = nums[i] + nums[left] + nums[right]

            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1

    return result`,
  steps: [
    {
      description:
        "First, sort the array. This lets us use two pointers and easily skip duplicates.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "nums (original)", values: [-1, 0, 1, 2, -1, -4] },
        {
          type: "array",
          label: "nums (sorted)",
          values: [-4, -1, -1, 0, 1, 2],
          highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" },
        },
      ],
    },
    {
      description:
        "i=0, nums[i]=-4. Set left=1, right=5. Total = -4 + (-1) + 2 = -3. Too small, move left up.",
      codeHighlightLines: [5, 8, 9, 11, 22, 23],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [-4, -1, -1, 0, 1, 2],
          highlights: { 0: "active", 1: "pointer-i", 5: "pointer-j" },
          pointers: [
            { index: 0, label: "i" },
            { index: 1, label: "L", color: "purple" },
            { index: 5, label: "R", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "total", value: -3, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "With i=0, no combination sums to 0 (all totals stay negative since -4 is too small). Move to i=1, nums[i]=-1.",
      codeHighlightLines: [5, 8, 9],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [-4, -1, -1, 0, 1, 2],
          highlights: { 0: "checked", 1: "active" },
          pointers: [
            { index: 1, label: "i" },
            { index: 2, label: "L", color: "purple" },
            { index: 5, label: "R", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "nums[i]", value: -1 },
            { name: "left", value: 2 },
            { name: "right", value: 5 },
          ],
        },
      ],
    },
    {
      description:
        "i=1: total = -1 + (-1) + 2 = 0. Found a triplet! Add [-1, -1, 2] to result. Skip duplicates, then left++, right--.",
      codeHighlightLines: [13, 14, 20, 21],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [-4, -1, -1, 0, 1, 2],
          highlights: { 1: "found", 2: "found", 5: "found" },
          pointers: [
            { index: 1, label: "i" },
            { index: 2, label: "L", color: "purple" },
            { index: 5, label: "R", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "total", value: 0, highlight: true },
            { name: "result", value: "[[-1,-1,2]]" },
          ],
        },
      ],
    },
    {
      description:
        "After skipping duplicates: left=3, right=4. total = -1 + 0 + 1 = 0. Another triplet! Add [-1, 0, 1].",
      codeHighlightLines: [13, 14],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [-4, -1, -1, 0, 1, 2],
          highlights: { 1: "active", 3: "found", 4: "found" },
          pointers: [
            { index: 1, label: "i" },
            { index: 3, label: "L", color: "purple" },
            { index: 4, label: "R", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "total", value: 0, highlight: true },
            { name: "result", value: "[[-1,-1,2],[-1,0,1]]" },
          ],
        },
      ],
    },
    {
      description:
        "i=2, nums[2]=-1. But nums[2] == nums[1], so we skip this to avoid duplicate triplets. This is why sorting helps!",
      codeHighlightLines: [6, 7],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [-4, -1, -1, 0, 1, 2],
          highlights: { 1: "checked", 2: "checked" },
          pointers: [{ index: 2, label: "i (skip)" }],
        },
        {
          type: "variables",
          entries: [
            { name: "nums[i]", value: -1 },
            { name: "nums[i-1]", value: -1 },
            { name: "duplicate?", value: "yes", highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "i=3, nums[3]=0. left=4, right=5. total = 0+1+2 = 3 > 0. Move right down. Now left >= right, so inner loop ends.",
      codeHighlightLines: [11, 24, 25],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [-4, -1, -1, 0, 1, 2],
          highlights: { 3: "active", 4: "pointer-i", 5: "pointer-j" },
          pointers: [
            { index: 3, label: "i" },
            { index: 4, label: "L", color: "purple" },
            { index: 5, label: "R", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [{ name: "total", value: 3, highlight: true }],
        },
      ],
    },
    {
      description:
        "Done! Found 2 unique triplets that sum to zero: [-1,-1,2] and [-1,0,1]. Sorting + two pointers gives O(n^2) time.",
      codeHighlightLines: [27],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [-4, -1, -1, 0, 1, 2],
          highlights: { 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" },
        },
        {
          type: "variables",
          entries: [
            { name: "return", value: "[[-1,-1,2],[-1,0,1]]", highlight: true },
          ],
        },
      ],
    },
  ],
};

export default solution;

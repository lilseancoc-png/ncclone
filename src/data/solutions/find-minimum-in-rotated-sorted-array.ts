import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Modified Binary Search",
  timeComplexity: "O(log n)",
  spaceComplexity: "O(1)",
  code: `def find_min(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1  # min is in right half
        else:
            right = mid  # min is at mid or left
    return nums[left]`,
  steps: [
    {
      description:
        "Find the minimum in a rotated sorted array. Key insight: compare nums[mid] with nums[right]. If mid > right, the minimum must be in the right half. nums=[3,4,5,1,2].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "nums", values: [3, 4, 5, 1, 2], highlights: { 0: "pointer-i", 2: "active", 4: "pointer-j" } },
        { type: "variables", entries: [{ name: "left", value: 0 }, { name: "mid", value: 2 }, { name: "right", value: 4 }] },
      ],
    },
    {
      description:
        "nums[mid]=5 > nums[right]=2 → minimum is in right half. Set left = mid+1 = 3. Now searching [1,2].",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [3, 4, 5, 1, 2], highlights: { 3: "active", 4: "pointer-j" } },
        { type: "variables", entries: [{ name: "left", value: 3 }, { name: "mid", value: 3 }, { name: "right", value: 4 }, { name: "nums[mid]=1 <= nums[right]=2", value: "go left" }] },
      ],
    },
    {
      description:
        "nums[mid]=1 <= nums[right]=2 → minimum is at mid or left of mid. Set right = mid = 3. Now left==right==3, loop ends.",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "nums", values: [3, 4, 5, 1, 2], highlights: { 3: "success" } },
        { type: "variables", entries: [{ name: "left", value: 3 }, { name: "right", value: 3 }] },
      ],
    },
    {
      description:
        "Return nums[3] = 1. O(log n) time — halve the search space each step. Works because one half is always sorted and the other contains the rotation point.",
      codeHighlightLines: [9],
      structures: [
        { type: "array", label: "nums", values: [3, 4, 5, 1, 2], highlights: { 3: "success" } },
        { type: "variables", entries: [{ name: "return", value: 1, highlight: true }] },
      ],
    },
  ],
};

export default solution;

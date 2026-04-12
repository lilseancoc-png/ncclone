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
        "Find the minimum in a rotated sorted array (e.g., [1,2,3,4,5] rotated → [3,4,5,1,2]). Key insight: compare nums[mid] with nums[right]. If mid > right, the rotation point (minimum) is in the right half. Otherwise, mid itself could be the min. nums=[4,5,6,7,0,1,2].",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 0: "pointer-i", 6: "pointer-j" } },
        { type: "variables", entries: [{ name: "left", value: 0 }, { name: "right", value: 6 }, { name: "rotation point", value: "between index 3 and 4" }] },
      ],
    },
    {
      description:
        "Iteration 1: mid = (0+6)//2 = 3. nums[3]=7, nums[right]=nums[6]=2. Is 7 > 2? YES → the min must be to the right of mid (the array drops somewhere after index 3). Set left = mid+1 = 4. We can safely exclude mid because nums[mid] > nums[right] means mid itself isn't the minimum.",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "active", 6: "pointer-j" } },
        { type: "variables", entries: [{ name: "mid=3, nums[3]=7", value: "7 > nums[right]=2", highlight: true }, { name: "action", value: "left = mid+1 = 4" }, { name: "eliminated", value: "indices 0-3" }] },
      ],
    },
    {
      description:
        "Iteration 2: left=4, right=6. mid = (4+6)//2 = 5. nums[5]=1, nums[right]=nums[6]=2. Is 1 > 2? NO → the min is at mid or to its left (this subarray [0,1,2] is sorted, so minimum is at the leftmost). Set right = mid = 5. We keep mid in range because it might BE the minimum.",
      codeHighlightLines: [4, 7, 8],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 4: "pointer-i", 5: "active", 6: "checked" } },
        { type: "variables", entries: [{ name: "mid=5, nums[5]=1", value: "1 <= nums[right]=2", highlight: true }, { name: "action", value: "right = mid = 5" }, { name: "eliminated", value: "index 6" }] },
      ],
    },
    {
      description:
        "Iteration 3: left=4, right=5. mid = (4+5)//2 = 4. nums[4]=0, nums[right]=nums[5]=1. Is 0 > 1? NO → set right = mid = 4. Now left=4, right=4 → loop exits (left < right is false).",
      codeHighlightLines: [4, 7, 8],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 4: "active", 5: "pointer-j" } },
        { type: "variables", entries: [{ name: "mid=4, nums[4]=0", value: "0 <= nums[right]=1", highlight: true }, { name: "action", value: "right = mid = 4" }, { name: "left==right", value: "4 → loop exits" }] },
      ],
    },
    {
      description:
        "Return nums[left] = nums[4] = 0. Found the minimum in 3 iterations (log₂(7) ≈ 3) instead of scanning all 7 elements. The algorithm works because: if nums[mid] > nums[right], the drop (rotation point) must be between mid and right. Otherwise, the subarray [left..mid] contains the drop or is already sorted. Time: O(log n). Space: O(1).",
      codeHighlightLines: [9],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 4: "success" } },
        { type: "variables", entries: [{ name: "return", value: 0, highlight: true }, { name: "iterations", value: 3 }, { name: "Time", value: "O(log n)" }] },
      ],
    },
  ],
};

export default solution;

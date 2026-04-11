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
        "Find the minimum in a sorted array that has been rotated (e.g., [1,2,3,4,5] → [3,4,5,1,2]). A linear scan takes O(n), but we can do O(log n) using binary search. The key insight: compare nums[mid] with nums[right]. In a rotated array, the minimum is at the 'rotation point' where a large number is followed by a small one. nums=[3,4,5,1,2].",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "nums", values: [3, 4, 5, 1, 2], highlights: {}, pointers: [{ index: 0, label: "L" }, { index: 4, label: "R" }] },
        { type: "variables", entries: [{ name: "target", value: "find the minimum" }, { name: "rotation point", value: "between 5 and 1" }] },
      ],
    },
    {
      description:
        "left=0, right=4, mid=(0+4)//2=2. nums[mid]=5, nums[right]=2. Since 5 > 2, the right half is NOT fully sorted — meaning the rotation point (and minimum) must be in the right half. Set left = mid+1 = 3. Why mid+1? Because nums[mid] is bigger than nums[right], so mid itself can't be the minimum.",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "array", label: "nums", values: [3, 4, 5, 1, 2], highlights: { 0: "checked", 1: "checked", 2: "active" }, pointers: [{ index: 0, label: "L" }, { index: 2, label: "mid" }, { index: 4, label: "R" }] },
        { type: "variables", entries: [{ name: "nums[mid]", value: "5" }, { name: "nums[right]", value: "2" }, { name: "5 > 2?", value: "YES → min is right of mid", highlight: true }] },
      ],
    },
    {
      description:
        "Now left=3, right=4, mid=(3+4)//2=3. nums[mid]=1, nums[right]=2. Since 1 <= 2, the right half IS sorted — meaning the minimum is at mid or to its left. Set right = mid = 3. Why not mid-1? Because nums[mid] could BE the minimum (it's <= everything to its right).",
      codeHighlightLines: [4, 7, 8],
      structures: [
        { type: "array", label: "nums", values: [3, 4, 5, 1, 2], highlights: { 3: "active", 4: "checked" }, pointers: [{ index: 3, label: "L/mid" }, { index: 4, label: "R" }] },
        { type: "variables", entries: [{ name: "nums[mid]", value: "1" }, { name: "nums[right]", value: "2" }, { name: "1 <= 2?", value: "YES → min at mid or left", highlight: true }] },
      ],
    },
    {
      description:
        "Now left=3, right=3. left == right, so the loop exits. The minimum is at nums[left] = nums[3] = 1. We found it in just 2 iterations instead of scanning all 5 elements! Time: O(log n) — we halve the search space each step, just like standard binary search. Space: O(1) — only three variables. This works because one half of a rotated sorted array is always fully sorted, letting us eliminate it.",
      codeHighlightLines: [9],
      structures: [
        { type: "array", label: "nums", values: [3, 4, 5, 1, 2], highlights: { 3: "success" }, pointers: [{ index: 3, label: "L=R" }] },
        { type: "variables", entries: [{ name: "return", value: 1, highlight: true }, { name: "iterations", value: "2 (vs 5 for linear)" }, { name: "Time", value: "O(log n)" }] },
      ],
    },
  ],
};

export default solution;

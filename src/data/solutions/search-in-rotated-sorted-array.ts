import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Modified Binary Search",
  timeComplexity: "O(log n)",
  spaceComplexity: "O(1)",
  code: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:  # left half sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # right half sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1`,
  steps: [
    {
      description:
        "Search for a target in a sorted array that has been rotated at some unknown pivot. A normal binary search won't work directly because the array isn't fully sorted. But the key insight: in a rotated sorted array, at least ONE half (left or right of mid) is ALWAYS sorted. We identify which half is sorted, then check if the target lies within that sorted range. If yes, search there; otherwise, search the other half. This preserves O(log n) time. nums=[4,5,6,7,0,1,2], target=0.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 0: "pointer-i", 3: "active", 6: "pointer-j" } },
        { type: "variables", entries: [{ name: "target", value: 0 }, { name: "left", value: 0 }, { name: "mid", value: 3 }, { name: "right", value: 6 }, { name: "key insight", value: "one half is always sorted" }] },
      ],
    },
    {
      description:
        "Iteration 1: mid=3, nums[mid]=7 ≠ target. Which half is sorted? Compare nums[left]=4 with nums[mid]=7: since 4 ≤ 7, the LEFT half [4,5,6,7] is sorted. Is target=0 in the sorted range [4, 7)? No — 0 < 4, so the target can't be in the left half. Eliminate left half: set left = mid+1 = 4. The rotation point (where values drop from 7 to 0) is in the right half, and so is our target.",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "pointer-i", 5: "active", 6: "pointer-j" } },
        { type: "variables", entries: [{ name: "left half [4,5,6,7]", value: "sorted ✓" }, { name: "0 in [4, 7)?", value: "No → search right half" }, { name: "left", value: 4 }] },
      ],
    },
    {
      description:
        "Iteration 2: mid=5, nums[mid]=1 ≠ target. Check: nums[left]=0 ≤ nums[mid]=1, so LEFT half [0,1] is sorted. Is target=0 in [0, 1)? Yes! 0 ≤ 0 < 1 is true. So the target must be in this sorted left portion. Set right = mid-1 = 4. Now left=right=4: nums[4]=0 matches the target! Return 4.",
      codeHighlightLines: [5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 4: "success" } },
        { type: "variables", entries: [{ name: "left half [0,1]", value: "sorted, target in range!" }, { name: "nums[4] = 0", value: "found target!", highlight: true }] },
      ],
    },
    {
      description:
        "Return index 4. Found in 3 iterations — true O(log n). The algorithm works because rotation preserves a useful structure: one half is always sorted, giving us enough information to eliminate half the search space each time. The check nums[left] <= nums[mid] reliably identifies the sorted half. Edge cases: duplicates would break this (nums[left] == nums[mid] is ambiguous), requiring a different approach. Time: O(log n). Space: O(1).",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 4: "success" } },
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }, { name: "iterations", value: 3 }, { name: "Time", value: "O(log n)" }] },
      ],
    },
  ],
};

export default solution;

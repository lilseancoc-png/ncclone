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
        "Search for target in a rotated sorted array. Key insight: in a rotated array, at least ONE half (left or right of mid) is always sorted. Identify the sorted half, check if target is in that range, and eliminate the other half. This preserves O(log n). nums=[4,5,6,7,0,1,2], target=0.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2] },
        { type: "variables", entries: [{ name: "target", value: 0 }, { name: "left", value: 0 }, { name: "right", value: 6 }, { name: "key insight", value: "one half is always sorted" }] },
      ],
    },
    {
      description:
        "Iteration 1: left=0, right=6, mid=3. nums[3]=7 ≠ target. Which half is sorted? nums[left]=4 <= nums[mid]=7 → LEFT half [4,5,6,7] is sorted. Is target=0 in [4, 7)? 4 <= 0 is false → target NOT in sorted left half. Eliminate it: left = mid+1 = 4.",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 0: "pointer-i", 3: "active", 6: "pointer-j" } },
        { type: "variables", entries: [{ name: "mid=3, nums[3]=7", value: "≠ target" }, { name: "left half [4,5,6,7]", value: "sorted (4 <= 7)" }, { name: "0 in [4,7)?", value: "NO → search right", highlight: true }, { name: "left", value: "0 → 4" }] },
      ],
    },
    {
      description:
        "Iteration 2: left=4, right=6, mid=5. nums[5]=1 ≠ target. nums[left]=0 <= nums[mid]=1 → LEFT half [0,1] is sorted. Is target=0 in [0, 1)? 0 <= 0 < 1 → YES! Target is in the sorted left portion. Narrow: right = mid-1 = 4.",
      codeHighlightLines: [7, 8, 9],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 4: "pointer-i", 5: "active", 6: "pointer-j" } },
        { type: "variables", entries: [{ name: "mid=5, nums[5]=1", value: "≠ target" }, { name: "left half [0,1]", value: "sorted (0 <= 1)" }, { name: "0 in [0,1)?", value: "YES → search left", highlight: true }, { name: "right", value: "6 → 4" }] },
      ],
    },
    {
      description:
        "Iteration 3: left=4, right=4, mid=4. nums[4]=0 == target! Return mid=4. Found in 3 iterations — true O(log n) despite rotation. The algorithm works because rotation preserves structure: one half is always sorted, giving enough info to eliminate half the space each time.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 4: "success" } },
        { type: "variables", entries: [{ name: "nums[4] = 0", value: "== target!", highlight: true }, { name: "return", value: 4 }, { name: "iterations", value: 3 }] },
      ],
    },
    {
      description:
        "Return index 4. Time: O(log n) — halve search space each iteration. Space: O(1). The check nums[left] <= nums[mid] reliably identifies the sorted half. If target were absent, we'd exhaust left > right and return -1. Note: this doesn't handle duplicates — nums[left] == nums[mid] becomes ambiguous and needs a different approach.",
      codeHighlightLines: [17],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 4: "success" } },
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }, { name: "Time", value: "O(log n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

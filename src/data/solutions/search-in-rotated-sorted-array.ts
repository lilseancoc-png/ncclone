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
        "Search for target in a rotated sorted array in O(log n). At each step, one half is always sorted — determine which half and whether target is in it. nums=[4,5,6,7,0,1,2], target=0.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 0: "pointer-i", 3: "active", 6: "pointer-j" } },
        { type: "variables", entries: [{ name: "target", value: 0 }, { name: "left", value: 0 }, { name: "mid", value: 3 }, { name: "right", value: 6 }] },
      ],
    },
    {
      description:
        "nums[mid]=7 != 0. nums[left]=4 <= nums[mid]=7 → left half [4,5,6,7] is sorted. Is 0 in [4,7)? No (0 < 4). So target is in right half. left = mid+1 = 4.",
      codeHighlightLines: [7, 8, 9, 10, 11],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "pointer-i", 5: "active", 6: "pointer-j" } },
        { type: "variables", entries: [{ name: "left", value: 4 }, { name: "mid", value: 5 }, { name: "right", value: 6 }, { name: "left half sorted", value: "target not in [4,7)" }] },
      ],
    },
    {
      description:
        "nums[mid]=1 != 0. nums[left]=0 <= nums[mid]=1 → left half [0,1] is sorted. Is 0 in [0,1)? Yes! right = mid-1 = 4. Now left==right==4, nums[4]=0 == target!",
      codeHighlightLines: [5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 4: "success" } },
        { type: "variables", entries: [{ name: "nums[4]", value: "0 == target", highlight: true }] },
      ],
    },
    {
      description:
        "Return index 4. O(log n) time — standard binary search with one extra check to determine which half is sorted. Always exactly one half is sorted in a rotated array.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 6, 7, 0, 1, 2], highlights: { 4: "success" } },
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }] },
      ],
    },
  ],
};

export default solution;

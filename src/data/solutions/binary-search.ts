import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
  steps: [
    {
      description: "Search for target=9 in sorted array. Set left=0, right=5.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "nums", values: [-1, 0, 3, 5, 9, 12], pointers: [{ index: 0, label: "L" }, { index: 5, label: "R" }] },
        { type: "variables", entries: [{ name: "target", value: 9 }] },
      ],
    },
    {
      description: "mid = (0+5)//2 = 2. nums[2]=3. 3 < 9, so target is in the right half. Move left = mid+1 = 3.",
      codeHighlightLines: [3, 4, 7, 8],
      structures: [
        { type: "array", label: "nums", values: [-1, 0, 3, 5, 9, 12], highlights: { 2: "active", 0: "checked", 1: "checked" }, pointers: [{ index: 0, label: "L" }, { index: 2, label: "mid" }, { index: 5, label: "R" }] },
        { type: "variables", entries: [{ name: "mid", value: 2, highlight: true }, { name: "nums[mid]", value: 3 }, { name: "target", value: 9 }] },
      ],
    },
    {
      description: "New range: left=3, right=5. mid = (3+5)//2 = 4. nums[4]=9. Found it!",
      codeHighlightLines: [3, 4, 5, 6],
      structures: [
        { type: "array", label: "nums", values: [-1, 0, 3, 5, 9, 12], highlights: { 0: "checked", 1: "checked", 2: "checked", 4: "found" }, pointers: [{ index: 3, label: "L" }, { index: 4, label: "mid" }, { index: 5, label: "R" }] },
        { type: "variables", entries: [{ name: "mid", value: 4, highlight: true }, { name: "nums[mid]", value: 9, highlight: true }] },
      ],
    },
    {
      description: "nums[mid] == target! Return index 4.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [-1, 0, 3, 5, 9, 12], highlights: { 4: "success" } },
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }] },
      ],
    },
  ],
};

export default solution;

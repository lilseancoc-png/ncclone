import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def two_sum(nums, target):
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
  steps: [
    {
      description:
        "We need two numbers that add up to target=9. The brute force checks every pair in O(n²), but we can do O(n) with a hashmap: for each number, calculate what value we'd need (the complement), and check if we've already seen it.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "nums", values: [2, 7, 11, 15], highlights: {} },
        { type: "variables", entries: [{ name: "target", value: 9 }] },
        { type: "hashmap", label: "seen (value → index)", entries: [] },
      ],
    },
    {
      description:
        "i=0, num=2. What do we need to pair with 2 to reach 9? complement = 9 - 2 = 7. Is 7 in seen? No — the map is empty.",
      codeHighlightLines: [3, 4, 5],
      structures: [
        { type: "array", label: "nums", values: [2, 7, 11, 15], highlights: { 0: "active" }, pointers: [{ index: 0, label: "i" }] },
        { type: "variables", entries: [{ name: "target", value: 9 }, { name: "complement", value: 7, highlight: true }] },
        { type: "hashmap", label: "seen (value → index)", entries: [] },
      ],
    },
    {
      description:
        "7 wasn't found, so we can't form a pair yet. Store nums[0]=2 with its index 0 in the map. This way, if a future number needs 2 as its complement, we'll find it.",
      codeHighlightLines: [7],
      structures: [
        { type: "array", label: "nums", values: [2, 7, 11, 15], highlights: { 0: "checked" }, pointers: [{ index: 0, label: "i" }] },
        { type: "variables", entries: [{ name: "target", value: 9 }] },
        { type: "hashmap", label: "seen (value → index)", entries: [[2, 0]], highlightKeys: [2] },
      ],
    },
    {
      description:
        "i=1, num=7. complement = 9 - 7 = 2. Is 2 in seen? YES! We stored it in the previous step. We found our pair: nums[0]=2 and nums[1]=7 add up to 9.",
      codeHighlightLines: [3, 4, 5],
      structures: [
        { type: "array", label: "nums", values: [2, 7, 11, 15], highlights: { 0: "found", 1: "found" }, pointers: [{ index: 1, label: "i" }] },
        { type: "variables", entries: [{ name: "target", value: 9 }, { name: "complement", value: 2, highlight: true }] },
        { type: "hashmap", label: "seen (value → index)", entries: [[2, 0]], highlightKeys: [2] },
      ],
    },
    {
      description:
        "Return [seen[2], i] = [0, 1]. These are the indices of the two numbers. Time: O(n) — one pass through the array. Space: O(n) for the hashmap. Each lookup is O(1) on average.",
      codeHighlightLines: [6],
      structures: [
        { type: "array", label: "nums", values: [2, 7, 11, 15], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[0, 1]", highlight: true }] },
      ],
    },
  ],
};

export default solution;

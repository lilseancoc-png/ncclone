import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def contains_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,
  steps: [
    {
      description:
        "We want to check if any value appears more than once. A set gives us O(1) lookups, so we can check each number as we go. If we see a number that's already in the set, we have a duplicate.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3, 1], highlights: {} },
        { type: "set", label: "seen", values: [] },
      ],
    },
    {
      description:
        "nums[0] = 1. Is 1 in seen? No — the set is empty. So we haven't seen this number before.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3, 1], highlights: { 0: "active" }, pointers: [{ index: 0, label: "i" }] },
        { type: "set", label: "seen", values: [] },
      ],
    },
    {
      description:
        "Add 1 to seen so we'll recognize it if we encounter it again later.",
      codeHighlightLines: [6],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3, 1], highlights: { 0: "checked" }, pointers: [{ index: 0, label: "i" }] },
        { type: "set", label: "seen", values: [1], lastAdded: 1 },
      ],
    },
    {
      description:
        "nums[1] = 2. Is 2 in seen? No — seen only contains {1}.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3, 1], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "i" }] },
        { type: "set", label: "seen", values: [1] },
      ],
    },
    {
      description:
        "Add 2 to seen.",
      codeHighlightLines: [6],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3, 1], highlights: { 0: "checked", 1: "checked" }, pointers: [{ index: 1, label: "i" }] },
        { type: "set", label: "seen", values: [1, 2], lastAdded: 2 },
      ],
    },
    {
      description:
        "nums[2] = 3. Is 3 in seen? No — seen has {1, 2} but not 3.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3, 1], highlights: { 0: "checked", 1: "checked", 2: "active" }, pointers: [{ index: 2, label: "i" }] },
        { type: "set", label: "seen", values: [1, 2] },
      ],
    },
    {
      description:
        "Add 3 to seen.",
      codeHighlightLines: [6],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3, 1], highlights: { 0: "checked", 1: "checked", 2: "checked" }, pointers: [{ index: 2, label: "i" }] },
        { type: "set", label: "seen", values: [1, 2, 3], lastAdded: 3 },
      ],
    },
    {
      description:
        "nums[3] = 1. Is 1 in seen? YES! We found it — 1 is already in the set, so it's a duplicate. Return True immediately without checking the rest of the array.",
      codeHighlightLines: [3, 4, 5],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3, 1], highlights: { 0: "found", 1: "checked", 2: "checked", 3: "found" }, pointers: [{ index: 3, label: "i" }] },
        { type: "set", label: "seen", values: [1, 2, 3], highlightValues: [1] },
      ],
    },
    {
      description:
        "Return True — the array contains a duplicate. Time: O(n) since each lookup and insert in a set is O(1). Space: O(n) for the set in the worst case (no duplicates). We could also early-exit if len(nums) > len(set(nums)), but this approach is already optimal.",
      codeHighlightLines: [5],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3, 1], highlights: { 0: "found", 3: "found" } },
        { type: "set", label: "seen", values: [1, 2, 3], highlightValues: [1] },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  // ── Approach 1: Sorting ──────────────────────────────────────────────
  {
    label: "Sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    code: `def contains_duplicate(nums):
    nums.sort()
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:
            return True
    return False`,
    steps: [
      {
        description:
          "We want to check if any value appears more than once. One approach: sort the array first. After sorting, duplicates must be adjacent. Then we just scan neighboring pairs. Sorting costs O(n log n), but we use O(1) extra space (in-place sort).",
        codeHighlightLines: [1, 2],
        structures: [
          { type: "array", label: "nums (unsorted)", values: [1, 2, 3, 1], highlights: {} },
        ],
      },
      {
        description:
          "Sort the array in-place: [1, 2, 3, 1] → [1, 1, 2, 3]. Notice how the duplicate 1s are now next to each other. This is the key insight — sorting guarantees duplicates become neighbors.",
        codeHighlightLines: [2],
        structures: [
          { type: "array", label: "nums (sorted)", values: [1, 1, 2, 3], highlights: { 0: "active", 1: "active" } },
        ],
      },
      {
        description:
          "i=1: Compare nums[1] with nums[0]. Both are 1 — they're equal! We found adjacent duplicates, which means the original array contained a duplicate.",
        codeHighlightLines: [3, 4],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 1, 2, 3],
            highlights: { 0: "found", 1: "found" },
            pointers: [{ index: 0, label: "i-1" }, { index: 1, label: "i" }],
          },
          { type: "variables", entries: [{ name: "nums[i] == nums[i-1]", value: "1 == 1 → True", highlight: true }] },
        ],
      },
      {
        description:
          "Return True — a duplicate exists. Time: O(n log n) for sorting + O(n) scan = O(n log n) overall. Space: O(1) if we sort in-place (modifies the input). This is a solid approach when you can't use extra space, but the Hash Set approach (Approach 2) is faster at O(n) if O(n) space is acceptable.",
        codeHighlightLines: [5],
        structures: [
          { type: "array", label: "nums", values: [1, 1, 2, 3], highlights: { 0: "success", 1: "success" } },
          { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
        ],
      },
    ],
  },

  // ── Approach 2: Optimal — Hash Set ───────────────────────────────────
  {
    label: "Optimal — Hash Set",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
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
          "Instead of sorting, we use a hash set for O(1) lookups. As we scan, we check if we've seen the current number before. If yes — duplicate found. If no — add it to the set and continue. This trades O(n) space for O(n) time, which is faster than sorting.",
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
          "Return True — the array contains a duplicate. Time: O(n) since each set lookup and insert is O(1) on average. Space: O(n) for the set in the worst case (no duplicates means we store every element). This is the optimal time complexity — you must look at each element at least once.",
        codeHighlightLines: [5],
        structures: [
          { type: "array", label: "nums", values: [1, 2, 3, 1], highlights: { 0: "found", 3: "found" } },
          { type: "set", label: "seen", values: [1, 2, 3], highlightValues: [1] },
          { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

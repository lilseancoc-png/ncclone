import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Backtracking with Duplicate Skipping",
    timeComplexity: "O(n * 2^n)",
    spaceComplexity: "O(n)",
    code: `def subsetsWithDup(nums):
    nums.sort()
    result = []
    def backtrack(start, subset):
        result.append(subset[:])
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i-1]:
                continue
            subset.append(nums[i])
            backtrack(i + 1, subset)
            subset.pop()
    backtrack(0, [])
    return result`,
    steps: [
      {
        description:
          "Generate all unique subsets of an array with duplicates. Without care, [1,2,2] would produce [1,2] twice (using first 2 vs second 2). Fix: sort the array, then at each decision level, skip if nums[i] == nums[i-1] and i > start. nums=[1,2,2].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "nums (sorted)", values: [1, 2, 2], highlights: {} },
          { type: "variables", entries: [{ name: "result starts", value: "[]" }, { name: "skip rule", value: "i > start AND nums[i]==nums[i-1]" }] },
        ],
      },
      {
        description:
          "Start backtrack(0, []). Add [] to result. Choose index 0 (value 1): subset=[1], add to result. Recurse backtrack(1, [1]). Choose index 1 (value 2): subset=[1,2], add. Recurse backtrack(2, [1,2]). Choose index 2 (value 2): subset=[1,2,2], add. Recurse backtrack(3): past end, return. Result so far: [[], [1], [1,2], [1,2,2]].",
        codeHighlightLines: [4, 5, 8, 9, 10],
        structures: [
          { type: "array", label: "current path", values: [1, 2, 2], highlights: { 0: "active", 1: "active", 2: "active" } },
          { type: "variables", entries: [{ name: "result", value: "[[], [1], [1,2], [1,2,2]]" }, { name: "[1,2,2] valid", value: "second 2 extends, not duplicates" }] },
        ],
      },
      {
        description:
          "Backtrack from [1,2,2] to [1,2]. At start=2: try index 2 — but we already did it. Pop 2 from [1,2]. Back at start=1 with subset=[1]. Try index 2: nums[2]=2 == nums[1]=2, and i=2 > start=1 → SKIP! Without this skip, we'd generate [1,2] again using the second 2. This is the key: at the same level, only use the first occurrence.",
        codeHighlightLines: [6, 7],
        structures: [
          { type: "array", label: "nums", values: [1, 2, 2], highlights: { 2: "checked" } },
          { type: "variables", entries: [{ name: "at start=1, try i=2", value: "nums[2]=2 == nums[1]=2", highlight: true }, { name: "i=2 > start=1?", value: "YES → SKIP" }, { name: "prevents", value: "duplicate [1,2]" }] },
        ],
      },
      {
        description:
          "Back to start=0. Pop 1. Try index 1 (value 2): subset=[2], add. Recurse backtrack(2, [2]). Choose index 2 (value 2): i=2 == start=2, so NOT skipped — this is extending [2] to [2,2], not a same-level duplicate. subset=[2,2], add. Result: [..., [2], [2,2]]. Back at start=0, try index 2: nums[2]=2 == nums[1]=2, i=2 > start=0 → SKIP (prevents duplicate [2]).",
        codeHighlightLines: [6, 7, 8, 9, 10],
        structures: [
          { type: "array", label: "nums", values: [1, 2, 2], highlights: { 1: "active", 2: "active" } },
          { type: "variables", entries: [{ name: "[2,2] allowed", value: "i==start → extending, not duplicate", highlight: true }, { name: "[2] at i=2 skipped", value: "i>start AND same value → duplicate" }, { name: "result", value: "[[], [1], [1,2], [1,2,2], [2], [2,2]]" }] },
        ],
      },
      {
        description:
          "Final result: [[], [1], [1,2], [1,2,2], [2], [2,2]] — 6 unique subsets. The rule 'i > start' distinguishes extending (allowed: [2]→[2,2]) from same-level alternatives (blocked: prevents second [2]). Sort + skip is a universal pattern for deduplication in backtracking. Time: O(n × 2^n). Space: O(n) recursion depth.",
        codeHighlightLines: [12, 13],
        structures: [
          { type: "variables", entries: [{ name: "return", value: "[[], [1], [1,2], [1,2,2], [2], [2,2]]", highlight: true }, { name: "total", value: "6 unique subsets" }, { name: "i > start", value: "same-level skip (duplicate)" }, { name: "i == start", value: "deeper-level use (extend)" }] },
        ],
      },
    ],
  },
];

export default solutions;

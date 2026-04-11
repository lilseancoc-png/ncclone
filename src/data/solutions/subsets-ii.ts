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
          "Generate all subsets of an array that may contain duplicates, without producing duplicate subsets. The standard subsets approach generates 2^n subsets, but with duplicates like [1,2,2], naively we'd get [1,2] twice (using the first 2 vs the second 2). The fix: sort the array, then at each decision level, skip an element if it equals the previous one at that same level (i > start and nums[i] == nums[i-1]). This ensures we only use the FIRST occurrence of each duplicate at any given position. nums=[1,2,2].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "nums (sorted)",
            values: [1, 2, 2],
            highlights: {},
          },
          {
            type: "variables",
            entries: [{ name: "result", value: "[]" }, { name: "key rule", value: "skip nums[i] if same as nums[i-1] at same level" }],
          },
        ],
      },
      {
        description:
          "Backtracking begins. First, add [] (empty subset). Choose index 0 (value 1) → subset=[1], add it. From start=1: choose index 1 (value 2) → [1,2], add it. From start=2: choose index 2 (value 2) → [1,2,2], add it. From start=3: past end, backtrack. This deep path produced [], [1], [1,2], [1,2,2]. The second 2 was allowed because it came AFTER the first 2 — we're building the subset [1,2,2] which is valid.",
        codeHighlightLines: [4, 5, 8, 9, 10],
        structures: [
          {
            type: "array",
            label: "current path",
            values: [1, 2, 2],
            highlights: { 0: "active", 1: "active", 2: "active" },
          },
          {
            type: "variables",
            entries: [{ name: "result", value: "[[], [1], [1,2], [1,2,2]]" }],
          },
        ],
      },
      {
        description:
          "Backtrack to start=1 after choosing index 1. Now try index 2: nums[2]=2 == nums[1]=2, and i=2 > start=1 → SKIP! Without this skip, we'd generate another [1,2] using the second 2 — a duplicate. Back to start=0: index 0 done. Try index 1: value 2 → subset=[2], add it. From start=2: try index 2, nums[2]=2 == nums[1]=2 but i=2 == start=2, so it's allowed → [2,2], add it. Try index 2 at start=0: nums[2]=2 == nums[1]=2 and i=2 > start=0 → SKIP (prevents duplicate [2]).",
        codeHighlightLines: [6, 7],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 2, 2],
            highlights: { 2: "checked" },
          },
          {
            type: "variables",
            entries: [
              { name: "skip condition", value: "i > start AND nums[i] == nums[i-1]", highlight: true },
              { name: "result", value: "[[], [1], [1,2], [1,2,2], [2], [2,2]]" },
            ],
          },
        ],
      },
      {
        description:
          "Final result: [[], [1], [1,2], [1,2,2], [2], [2,2]] — 6 unique subsets. Without sorting and skipping, we'd get 8 subsets including duplicates. The rule 'i > start' is crucial: it distinguishes between using a duplicate to EXTEND a subset (allowed, like [2]→[2,2]) vs choosing a duplicate as an ALTERNATIVE at the same decision level (forbidden, as it produces the same subset). Time: O(n × 2^n). Space: O(n) for recursion.",
        codeHighlightLines: [12, 13],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "return", value: "[[], [1], [1,2], [1,2,2], [2], [2,2]]", highlight: true },
              { name: "total", value: "6 unique subsets" },
              { name: "Time", value: "O(n × 2^n)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

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
          "Generate all subsets of an array that may contain duplicates, without producing duplicate subsets. Sort first, then use backtracking. Skip an element if it equals the previous one at the same decision level (i > start).",
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
            entries: [{ name: "result", value: "[]" }],
          },
        ],
      },
      {
        description:
          "Start backtracking. Add [] to result. Choose 1 → add [1]. From index 1: choose 2 → [1,2]. From index 2: choose 2 → [1,2,2]. Backtrack.",
        codeHighlightLines: [4, 5, 8, 9, 10],
        structures: [
          {
            type: "array",
            label: "current subset",
            values: [1, 2, 2],
            highlights: { 0: "active", 1: "active", 2: "active" },
          },
          {
            type: "variables",
            entries: [{ name: "result so far", value: "[[], [1], [1,2], [1,2,2]]" }],
          },
        ],
      },
      {
        description:
          "Back to choosing after 1: index 2, nums[2]=2. i=2 > start=1 and nums[2]==nums[1] → SKIP! This prevents duplicate subset [1,2]. Continue to root: choose 2 at index 1 → [2]. Index 2: nums[2]==nums[1] and i>start → skip.",
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
              { name: "skip reason", value: "i > start AND nums[i] == nums[i-1]", highlight: true },
              { name: "result so far", value: "[[], [1], [1,2], [1,2,2], [2], [2,2]]" },
            ],
          },
        ],
      },
      {
        description:
          "Final result: [[], [1], [1,2], [1,2,2], [2], [2,2]]. 6 unique subsets. Without the skip condition, we'd get duplicate [1,2] and [2]. Sorting + skip ensures each unique subset appears exactly once.",
        codeHighlightLines: [12, 13],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "total subsets", value: 6, highlight: true },
              { name: "return", value: "[[], [1], [1,2], [1,2,2], [2], [2,2]]" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

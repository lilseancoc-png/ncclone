import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def missingNumber(nums):
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum`,
  steps: [
    {
      description:
        "Given nums=[3,0,1] of length 3, one number from 0 to 3 is missing. We use the math formula: the sum of 0..n is n*(n+1)/2.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "nums", values: [3, 0, 1] },
        { type: "variables", entries: [{ name: "n", value: 3 }, { name: "range", value: "0 to 3" }] },
      ],
    },
    {
      description:
        "Calculate expected_sum = n * (n + 1) // 2 = 3 * 4 // 2 = 6. If no number were missing, 0+1+2+3 = 6.",
      codeHighlightLines: [3],
      structures: [
        { type: "array", label: "expected: [0, 1, 2, 3]", values: [0, 1, 2, 3], highlights: { 0: "pointer-i", 1: "pointer-i", 2: "pointer-i", 3: "pointer-i" } },
        { type: "variables", entries: [{ name: "expected_sum", value: "3*4//2 = 6", highlight: true }] },
      ],
    },
    {
      description:
        "Calculate actual_sum = sum(nums) = 3 + 0 + 1 = 4.",
      codeHighlightLines: [4],
      structures: [
        { type: "array", label: "nums", values: [3, 0, 1], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "variables", entries: [{ name: "actual_sum", value: "3+0+1 = 4", highlight: true }, { name: "expected_sum", value: 6 }] },
      ],
    },
    {
      description:
        "The missing number = expected_sum - actual_sum = 6 - 4 = 2. The number 2 is missing from the array!",
      codeHighlightLines: [5],
      structures: [
        { type: "array", label: "complete: [0, 1, 2, 3]", values: [0, 1, 2, 3], highlights: { 2: "found" } },
        { type: "variables", entries: [{ name: "expected_sum", value: 6 }, { name: "actual_sum", value: 4 }, { name: "missing", value: "6 - 4 = 2", highlight: true }] },
      ],
    },
    {
      description:
        "Return 2. This approach uses O(n) time and O(1) space -- no extra data structures needed, just simple arithmetic.",
      codeHighlightLines: [5],
      structures: [
        { type: "array", label: "nums", values: [3, 0, 1], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

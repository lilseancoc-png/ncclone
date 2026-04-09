import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Math — Gauss Formula",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def missingNumber(nums):
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(nums)
    return expected_sum - actual_sum`,
  steps: [
    {
      description:
        "Given an array of n distinct numbers from the range [0, n], find the one missing number. For example, nums=[3,0,1] has length 3, so it should contain numbers 0 through 3 — but one is missing. We could sort (O(n log n)) or use a hash set (O(n) space), but there's a beautiful O(n) time, O(1) space solution using Gauss's formula: the sum of 0 to n = n*(n+1)/2.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "nums", values: [3, 0, 1] },
        { type: "variables", entries: [{ name: "n", value: 3 }, { name: "range", value: "0 to 3" }, { name: "idea", value: "expected sum - actual sum = missing" }] },
      ],
    },
    {
      description:
        "Calculate the expected sum using Gauss's formula: n*(n+1)/2 = 3*4/2 = 6. This is what the sum would be if no number were missing: 0 + 1 + 2 + 3 = 6. The formula works because Gauss discovered that pairing numbers from opposite ends gives equal sums (0+3=3, 1+2=3), so n/2 pairs × pair sum = total.",
      codeHighlightLines: [3],
      structures: [
        { type: "array", label: "complete range [0,1,2,3]", values: [0, 1, 2, 3], highlights: { 0: "active", 1: "active", 2: "active", 3: "active" } },
        { type: "variables", entries: [{ name: "expected_sum", value: "3 × 4 ÷ 2 = 6", highlight: true }, { name: "Gauss pairs", value: "(0+3) + (1+2) = 6" }] },
      ],
    },
    {
      description:
        "Calculate the actual sum of the array: sum([3, 0, 1]) = 3 + 0 + 1 = 4. This is less than the expected 6 because the missing number's value is not included in the sum.",
      codeHighlightLines: [4],
      structures: [
        { type: "array", label: "nums", values: [3, 0, 1], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "variables", entries: [{ name: "actual_sum", value: "3 + 0 + 1 = 4", highlight: true }, { name: "expected_sum", value: 6 }] },
      ],
    },
    {
      description:
        "The missing number = expected_sum - actual_sum = 6 - 4 = 2. The number 2 is missing from [3, 0, 1]! The difference between what the total should be and what it actually is gives us exactly the missing value.",
      codeHighlightLines: [5],
      structures: [
        { type: "array", label: "complete: [0, 1, 2, 3]", values: [0, 1, 2, 3], highlights: { 2: "found" } },
        { type: "variables", entries: [{ name: "expected - actual", value: "6 - 4 = 2", highlight: true }, { name: "missing number", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "Return 2. Time: O(n) — one pass to compute the sum. Space: O(1) — just a few variables, no extra data structures. Alternative approaches: XOR all numbers with 0..n (also O(n)/O(1)), or sort the array and find the gap (O(n log n)/O(1)). The math approach is simplest and most elegant.",
      codeHighlightLines: [5],
      structures: [
        { type: "array", label: "nums", values: [3, 0, 1], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def lengthOfLIS(nums):
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`,
  steps: [
    {
      description:
        "Find the length of the longest increasing subsequence in [10, 9, 2, 5, 3, 7, 101, 18]. Initialize dp array to all 1s since each element is an LIS of length 1 by itself.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "nums", values: [10, 9, 2, 5, 3, 7, 101, 18] },
        { type: "array", label: "dp", values: [1, 1, 1, 1, 1, 1, 1, 1] },
      ],
    },
    {
      description:
        "i=1 (nums[1]=9): Compare with nums[0]=10. 10 < 9? No. No previous element is smaller, so dp[1] stays 1. Same for i=2 (nums[2]=2).",
      codeHighlightLines: [3, 4, 5],
      structures: [
        { type: "array", label: "nums", values: [10, 9, 2, 5, 3, 7, 101, 18], highlights: { 1: "active", 2: "active" }, pointers: [{ index: 2, label: "i" }] },
        { type: "array", label: "dp", values: [1, 1, 1, 1, 1, 1, 1, 1], highlights: { 1: "checked", 2: "checked" } },
      ],
    },
    {
      description:
        "i=3 (nums[3]=5): nums[2]=2 < 5, so dp[3] = max(1, dp[2]+1) = 2. The subsequence [2, 5] has length 2.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [10, 9, 2, 5, 3, 7, 101, 18], highlights: { 2: "found", 3: "active" }, pointers: [{ index: 3, label: "i" }, { index: 2, label: "j", color: "purple" }] },
        { type: "array", label: "dp", values: [1, 1, 1, 2, 1, 1, 1, 1], highlights: { 3: "success" } },
      ],
    },
    {
      description:
        "i=4 (nums[4]=3): nums[2]=2 < 3, so dp[4] = max(1, dp[2]+1) = 2. The subsequence [2, 3] has length 2.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [10, 9, 2, 5, 3, 7, 101, 18], highlights: { 2: "found", 4: "active" }, pointers: [{ index: 4, label: "i" }, { index: 2, label: "j", color: "purple" }] },
        { type: "array", label: "dp", values: [1, 1, 1, 2, 2, 1, 1, 1], highlights: { 4: "success" } },
      ],
    },
    {
      description:
        "i=5 (nums[5]=7): nums[2]=2, nums[3]=5, nums[4]=3 are all < 7. Best is dp[3]+1 = 3. The subsequence [2, 5, 7] has length 3.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [10, 9, 2, 5, 3, 7, 101, 18], highlights: { 2: "checked", 3: "found", 4: "checked", 5: "active" }, pointers: [{ index: 5, label: "i" }] },
        { type: "array", label: "dp", values: [1, 1, 1, 2, 2, 3, 1, 1], highlights: { 5: "success" } },
      ],
    },
    {
      description:
        "i=6 (nums[6]=101): All previous elements are < 101. Best is dp[5]+1 = 4. The subsequence [2, 5, 7, 101] has length 4.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [10, 9, 2, 5, 3, 7, 101, 18], highlights: { 5: "found", 6: "active" }, pointers: [{ index: 6, label: "i" }] },
        { type: "array", label: "dp", values: [1, 1, 1, 2, 2, 3, 4, 1], highlights: { 6: "success" } },
      ],
    },
    {
      description:
        "i=7 (nums[7]=18): nums[5]=7 < 18, dp[5]+1 = 4. The subsequence [2, 5, 7, 18] also has length 4.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "nums", values: [10, 9, 2, 5, 3, 7, 101, 18], highlights: { 5: "found", 7: "active" }, pointers: [{ index: 7, label: "i" }] },
        { type: "array", label: "dp", values: [1, 1, 1, 2, 2, 3, 4, 4], highlights: { 7: "success" } },
      ],
    },
    {
      description:
        "Return max(dp) = 4. The longest increasing subsequence has length 4. One example is [2, 5, 7, 101].",
      codeHighlightLines: [7],
      structures: [
        { type: "array", label: "nums", values: [10, 9, 2, 5, 3, 7, 101, 18], highlights: { 2: "success", 3: "success", 5: "success", 6: "success" } },
        { type: "array", label: "dp", values: [1, 1, 1, 2, 2, 3, 4, 4], highlights: { 6: "found" } },
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }] },
      ],
    },
  ],
};

export default solution;

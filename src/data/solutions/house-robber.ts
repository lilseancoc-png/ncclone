import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Bottom-Up DP",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def rob(nums):
    if len(nums) == 1:
        return nums[0]
    prev2, prev1 = 0, 0
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2 = prev1
        prev1 = curr
    return prev1`,
  steps: [
    {
      description:
        "Rob houses along a street without robbing two adjacent houses. For each house, decide: skip it (keep prev1) or rob it (prev2 + current value). This is a classic DP problem. nums = [2, 7, 9, 3, 1].",
      codeHighlightLines: [1, 4],
      structures: [
        { type: "array", label: "houses", values: [2, 7, 9, 3, 1] },
        { type: "variables", entries: [{ name: "prev2", value: 0 }, { name: "prev1", value: 0 }] },
      ],
    },
    {
      description:
        "House 0 (value=2): max(skip=0, rob=0+2) = 2. Rob it! prev2=0, prev1=2.",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "array", label: "houses", values: [2, 7, 9, 3, 1], highlights: { 0: "success" }, pointers: [{ index: 0, label: "curr" }] },
        { type: "variables", entries: [{ name: "skip", value: 0 }, { name: "rob", value: 2, highlight: true }, { name: "prev1", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "House 1 (value=7): max(skip=2, rob=0+7) = 7. Rob house 1 instead of house 0 — it's worth more! prev2=2, prev1=7.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "houses", values: [2, 7, 9, 3, 1], highlights: { 1: "success" }, pointers: [{ index: 1, label: "curr" }] },
        { type: "variables", entries: [{ name: "skip=prev1", value: 2 }, { name: "rob=prev2+7", value: 7, highlight: true }, { name: "prev1", value: 7, highlight: true }] },
      ],
    },
    {
      description:
        "House 2 (value=9): max(skip=7, rob=2+9=11) = 11. Rob houses 0 and 2 (they're not adjacent). prev2=7, prev1=11.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "houses", values: [2, 7, 9, 3, 1], highlights: { 0: "success", 2: "success" }, pointers: [{ index: 2, label: "curr" }] },
        { type: "variables", entries: [{ name: "skip=prev1", value: 7 }, { name: "rob=prev2+9", value: 11, highlight: true }, { name: "prev1", value: 11, highlight: true }] },
      ],
    },
    {
      description:
        "House 3 (value=3): max(skip=11, rob=7+3=10) = 11. Skip — robbing house 3 isn't worth giving up our current haul. House 4 (value=1): max(skip=11, rob=11+1=12) = 12. Rob it!",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "houses", values: [2, 7, 9, 3, 1], highlights: { 0: "success", 2: "success", 4: "success" }, pointers: [{ index: 4, label: "curr" }] },
        { type: "variables", entries: [{ name: "prev1", value: 12, highlight: true }] },
      ],
    },
    {
      description:
        "Return 12. Optimal: rob houses 0(2) + 2(9) + 4(1) = 12. Time: O(n) — single pass. Space: O(1) — only two variables, no array needed. The key insight: at each house, the decision only depends on the best results from the previous two positions.",
      codeHighlightLines: [9],
      structures: [
        { type: "array", label: "houses", values: [2, 7, 9, 3, 1], highlights: { 0: "success", 2: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "return", value: 12, highlight: true }] },
      ],
    },
  ],
};

export default solution;

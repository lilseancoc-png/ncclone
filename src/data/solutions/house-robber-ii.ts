import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Brute Force — Try All Valid Subsets",
    timeComplexity: "O(2^n)",
    spaceComplexity: "O(n)",
    code: `def rob(nums):
    n = len(nums)
    if n == 1: return nums[0]
    max_val = 0
    for mask in range(1 << n):
        valid = True
        total = 0
        for i in range(n):
            if mask & (1 << i):
                if mask & (1 << ((i+1) % n)):
                    valid = False; break
                total += nums[i]
        if valid:
            max_val = max(max_val, total)
    return max_val`,
    steps: [
      {
        description:
          "Houses are arranged in a circle: first and last are adjacent. We cannot rob two adjacent houses. Brute force: try all 2^n subsets and check if any two selected houses are adjacent (including the circular wrap). nums = [2, 3, 2].",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          { type: "array", label: "houses (circular)", values: [2, 3, 2] },
          { type: "variables", entries: [{ name: "n", value: 3 }, { name: "subsets", value: "2^3 = 8" }] },
        ],
      },
      {
        description:
          "Check all subsets: {0,1} invalid (adjacent), {1,2} invalid (adjacent), {0,2} invalid (circular adjacent!), {0} valid: 2, {1} valid: 3, {2} valid: 2. Best single-house pick is 3.",
        codeHighlightLines: [5, 6, 7, 8, 9, 10, 11],
        structures: [
          { type: "array", label: "houses", values: [2, 3, 2], highlights: { 1: "success" } },
          { type: "variables", entries: [{ name: "{0,2}", value: "invalid (circular)" }, { name: "{1}", value: "valid: 3", highlight: true }] },
        ],
      },
      {
        description:
          "Return 3. Brute force works but is O(2^n) — exponential. For n=20, that is over 1 million subsets. We need a smarter approach.",
        codeHighlightLines: [13, 14],
        structures: [
          { type: "array", label: "houses", values: [2, 3, 2], highlights: { 1: "success" } },
          { type: "variables", entries: [{ name: "return", value: 3, highlight: true }] },
        ],
      },
    ],
  },
  {
    label: "Optimal — Two-Pass House Robber",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def rob(nums):
    if len(nums) == 1: return nums[0]
    def helper(arr):
        prev2, prev1 = 0, 0
        for num in arr:
            curr = max(prev1, prev2 + num)
            prev2 = prev1
            prev1 = curr
        return prev1
    return max(helper(nums[:-1]),
               helper(nums[1:]))`,
    steps: [
      {
        description:
          "Key insight: in a circle, house 0 and house n-1 can never both be robbed. So run House Robber I twice: once excluding the last house (nums[0:n-1]), once excluding the first (nums[1:n]). Take the max. nums = [2, 3, 2].",
        codeHighlightLines: [1, 2, 10, 11],
        structures: [
          { type: "array", label: "houses (circular)", values: [2, 3, 2] },
          { type: "array", label: "pass 1: nums[:-1]", values: [2, 3] },
          { type: "array", label: "pass 2: nums[1:]", values: [3, 2] },
        ],
      },
      {
        description:
          "Pass 1 — helper([2, 3]): House 0 (val=2): max(0, 0+2)=2. House 1 (val=3): max(2, 0+3)=3. Result: 3. Best is to rob just house 1.",
        codeHighlightLines: [3, 4, 5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "pass 1: [2, 3]", values: [2, 3], highlights: { 1: "success" }, pointers: [{ index: 1, label: "best" }] },
          { type: "variables", entries: [{ name: "prev2", value: 2 }, { name: "prev1", value: 3, highlight: true }] },
        ],
      },
      {
        description:
          "Pass 2 — helper([3, 2]): House 1 (val=3): max(0, 0+3)=3. House 2 (val=2): max(3, 0+2)=3. Result: 3. Best is to rob just house 1 again.",
        codeHighlightLines: [3, 4, 5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "pass 2: [3, 2]", values: [3, 2], highlights: { 0: "success" }, pointers: [{ index: 0, label: "best" }] },
          { type: "variables", entries: [{ name: "prev2", value: 3 }, { name: "prev1", value: 3, highlight: true }] },
        ],
      },
      {
        description:
          "Return max(3, 3) = 3. Both passes agree: rob house 1 for a total of 3. Time: O(n) — two linear passes. Space: O(1) — only two variables per pass. The circular constraint is handled by splitting into two linear subproblems.",
        codeHighlightLines: [10, 11],
        structures: [
          { type: "array", label: "houses", values: [2, 3, 2], highlights: { 1: "success" } },
          { type: "variables", entries: [{ name: "max(pass1, pass2)", value: "max(3, 3)" }, { name: "return", value: 3, highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

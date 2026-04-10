import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Track Min and Max",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def maxProduct(nums):
    result = max(nums)
    cur_min, cur_max = 1, 1
    for n in nums:
        if n == 0:
            cur_min, cur_max = 1, 1
            continue
        tmp = cur_max * n
        cur_max = max(n * cur_max, n * cur_min, n)
        cur_min = min(tmp, n * cur_min, n)
        result = max(result, cur_max)
    return result`,
    steps: [
      {
        description:
          "Find the contiguous subarray with the largest product. This is trickier than maximum sum subarray because multiplication has a special property: a negative × negative = positive. So the minimum product at some position can become the maximum after multiplying by a negative number! The solution: track BOTH the running max and min product ending at each position. At each element, the max product is the best of: (1) extend the previous max, (2) extend the previous min (if current is negative, this flips to a large positive), (3) start fresh with just the current element. nums=[2, 3, -2, 4].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [2, 3, -2, 4],
            highlights: {},
          },
          {
            type: "variables",
            entries: [
              { name: "cur_max", value: 1 },
              { name: "cur_min", value: 1 },
              { name: "result", value: "max(nums) = 4" },
              { name: "key insight", value: "negative × min can become max" },
            ],
          },
        ],
      },
      {
        description:
          "n=2: cur_max = max(1×2, 1×2, 2) = 2. cur_min = min(1×2, 1×2, 2) = 2. Both grow together when everything is positive. result = max(4, 2) = 4. n=3: cur_max = max(2×3, 2×3, 3) = 6. cur_min = min(6, 6, 3) = 3. The subarray [2,3] has product 6. result = max(4, 6) = 6. So far, straightforward — all positives mean max and min track the same subarray.",
        codeHighlightLines: [4, 5, 8, 9, 10, 11],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [2, 3, -2, 4],
            highlights: { 0: "active", 1: "active" },
          },
          {
            type: "variables",
            entries: [
              { name: "after n=3", value: "cur_max=6, cur_min=3" },
              { name: "result", value: 6, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "n=-2: Here's where it gets interesting! tmp = cur_max × n = 6 × (-2) = -12. cur_max = max(-12, 3×(-2), -2) = max(-12, -6, -2) = -2. The best we can do ending here is just [-2] itself. cur_min = min(-12, -6, -2) = -12. This -12 represents the subarray [2,3,-2]. Why track it? If we later see another negative, -12 × negative = large positive! The min product is a 'stored potential' waiting for a sign flip. result stays 6.",
        codeHighlightLines: [7, 8, 9, 10],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [2, 3, -2, 4],
            highlights: { 2: "active" },
          },
          {
            type: "variables",
            entries: [
              { name: "cur_max", value: "-2 (just [-2])" },
              { name: "cur_min", value: "-12 ([2,3,-2])", highlight: true },
              { name: "result", value: "6 (unchanged)" },
            ],
          },
        ],
      },
      {
        description:
          "n=4: cur_max = max(-2×4, -12×4, 4) = max(-8, -48, 4) = 4 (start fresh with [4]). cur_min = min(-8, -48, 4) = -48 ([2,3,-2,4]). result = max(6, 4) = 6. The answer is 6 from subarray [2,3]. If there were a -1 after the 4, then cur_min=-48 × -1 = 48, a huge positive! That's why we must carry the min forward. Zeros reset both cur_max and cur_min to 1 (starting fresh). Time: O(n). Space: O(1).",
        codeHighlightLines: [8, 9, 10, 11, 12],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [2, 3, -2, 4],
            highlights: { 0: "success", 1: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: 6, highlight: true }, { name: "subarray", value: "[2, 3]" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }],
          },
        ],
      },
    ],
  },
];

export default solutions;

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
          "Find the contiguous subarray with the largest product. Unlike max subarray sum, negatives can flip min to max. Track both the running max and min product at each position, since a negative times a negative min gives a large positive.",
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
              { name: "result", value: 4 },
            ],
          },
        ],
      },
      {
        description:
          "n=2: cur_max = max(2, 2, 2) = 2. cur_min = min(2, 2, 2) = 2. result = max(4, 2) = 4. n=3: cur_max = max(6, 6, 3) = 6. cur_min = min(6, 6, 3) = 3. result = 6.",
        codeHighlightLines: [8, 9, 10, 11],
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
              { name: "cur_max", value: 6, highlight: true },
              { name: "cur_min", value: 3 },
              { name: "result", value: 6 },
            ],
          },
        ],
      },
      {
        description:
          "n=-2: tmp = 6*(-2) = -12. cur_max = max(-12, 3*(-2), -2) = max(-12, -6, -2) = -2. cur_min = min(-12, -6, -2) = -12. The negative flipped everything! result stays 6.",
        codeHighlightLines: [8, 9, 10],
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
              { name: "cur_max", value: -2 },
              { name: "cur_min", value: -12, highlight: true },
              { name: "result", value: 6 },
            ],
          },
        ],
      },
      {
        description:
          "n=4: cur_max = max(-8, -48, 4) = 4. cur_min = min(-8, -48, 4) = -48. result = max(6, 4) = 6. Answer: 6 (subarray [2, 3]). Tracking min handles negative flips elegantly.",
        codeHighlightLines: [11, 12],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [2, 3, -2, 4],
            highlights: { 0: "success", 1: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: 6, highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

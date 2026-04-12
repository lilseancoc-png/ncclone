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
          "Find the contiguous subarray with largest product. Unlike max sum, negatives are tricky: negative × negative = positive! So the minimum product can become maximum after a negative. Solution: track BOTH cur_max and cur_min at each position. nums=[2, 3, -2, 4].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "nums", values: [2, 3, -2, 4] },
          { type: "variables", entries: [{ name: "cur_max", value: 1 }, { name: "cur_min", value: 1 }, { name: "result", value: "max(nums) = 4" }, { name: "key", value: "neg × min → new max" }] },
        ],
      },
      {
        description:
          "n=2: cur_max = max(1×2, 1×2, 2) = 2. cur_min = min(2, 2, 2) = 2. result = max(4, 2) = 4. n=3: cur_max = max(2×3, 2×3, 3) = 6. cur_min = min(6, 6, 3) = 3. result = max(4, 6) = 6. Subarray [2,3] has product 6. All positive so far — max and min both grow.",
        codeHighlightLines: [8, 9, 10, 11],
        structures: [
          { type: "array", label: "nums", values: [2, 3, -2, 4], highlights: { 0: "active", 1: "active" } },
          { type: "variables", entries: [{ name: "after n=2", value: "max=2, min=2" }, { name: "after n=3", value: "max=6, min=3", highlight: true }, { name: "result", value: 6 }] },
        ],
      },
      {
        description:
          "n=-2: This flips everything! tmp = 6×(-2) = -12. cur_max = max(-12, 3×(-2), -2) = max(-12, -6, -2) = -2 (best = just [-2] alone). cur_min = min(-12, -6, -2) = -12. The subarray [2,3,-2] has product -12. This negative minimum is 'stored potential' — if we see another negative, -12 × neg = large positive!",
        codeHighlightLines: [8, 9, 10],
        structures: [
          { type: "array", label: "nums", values: [2, 3, -2, 4], highlights: { 2: "active" } },
          { type: "variables", entries: [{ name: "cur_max", value: "-2 (start fresh)" }, { name: "cur_min", value: "-12 (stored potential!)", highlight: true }, { name: "result", value: "6 (unchanged)" }] },
        ],
      },
      {
        description:
          "n=4: cur_max = max(-2×4, -12×4, 4) = max(-8, -48, 4) = 4 (start fresh with [4]). cur_min = min(-8, -48, 4) = -48 ([2,3,-2,4]). result = max(6, 4) = 6. If there were another negative after 4 (e.g., -1), then -48 × -1 = 48 would become the new max! That's why we keep tracking min.",
        codeHighlightLines: [8, 9, 10, 11],
        structures: [
          { type: "array", label: "nums", values: [2, 3, -2, 4], highlights: { 3: "active" } },
          { type: "variables", entries: [{ name: "cur_max", value: "4 (fresh start [4])" }, { name: "cur_min", value: "-48 ([2,3,-2,4])" }, { name: "result", value: "6 (still from [2,3])" }] },
        ],
      },
      {
        description:
          "Return 6 from subarray [2,3]. Zeros reset cur_max and cur_min to 1 (anything × 0 = 0, so start fresh on both sides). The three-way max/min (extend max, extend min, start fresh) handles all cases: all positive, negatives flipping signs, and zeros breaking chains. Time: O(n). Space: O(1).",
        codeHighlightLines: [12],
        structures: [
          { type: "array", label: "nums", values: [2, 3, -2, 4], highlights: { 0: "success", 1: "success" } },
          { type: "variables", entries: [{ name: "return", value: 6, highlight: true }, { name: "subarray", value: "[2, 3]" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
        ],
      },
    ],
  },
];

export default solutions;

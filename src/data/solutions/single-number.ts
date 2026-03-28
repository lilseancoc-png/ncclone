import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def singleNumber(nums):
    result = 0
    for num in nums:
        result = result ^ num
    return result`,
  steps: [
    {
      description:
        "Every number appears twice except one. XOR has a key property: a ^ a = 0, and a ^ 0 = a. If we XOR all numbers, pairs cancel out and only the single number remains.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "nums", values: [4, 1, 2, 1, 2] },
        { type: "variables", entries: [{ name: "result", value: 0 }] },
      ],
    },
    {
      description:
        "XOR with nums[0]=4: result = 0 ^ 4 = 4. In binary: 000 ^ 100 = 100.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 0: "active" }, pointers: [{ index: 0, label: "num" }] },
        { type: "variables", entries: [{ name: "result", value: "0 ^ 4 = 4", highlight: true }] },
      ],
    },
    {
      description:
        "XOR with nums[1]=1: result = 4 ^ 1 = 5. In binary: 100 ^ 001 = 101.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 1: "active" }, pointers: [{ index: 1, label: "num" }] },
        { type: "variables", entries: [{ name: "result", value: "4 ^ 1 = 5", highlight: true }] },
      ],
    },
    {
      description:
        "XOR with nums[2]=2: result = 5 ^ 2 = 7. In binary: 101 ^ 010 = 111.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 2: "active" }, pointers: [{ index: 2, label: "num" }] },
        { type: "variables", entries: [{ name: "result", value: "5 ^ 2 = 7", highlight: true }] },
      ],
    },
    {
      description:
        "XOR with nums[3]=1: result = 7 ^ 1 = 6. The second 1 cancels the first 1! In binary: 111 ^ 001 = 110.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 1: "pointer-j", 3: "pointer-j" }, pointers: [{ index: 3, label: "num" }] },
        { type: "variables", entries: [{ name: "result", value: "7 ^ 1 = 6", highlight: true }] },
      ],
    },
    {
      description:
        "XOR with nums[4]=2: result = 6 ^ 2 = 4. The second 2 cancels the first 2! In binary: 110 ^ 010 = 100 = 4.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 2: "pointer-j", 4: "pointer-j" }, pointers: [{ index: 4, label: "num" }] },
        { type: "variables", entries: [{ name: "result", value: "6 ^ 2 = 4", highlight: true }] },
      ],
    },
    {
      description:
        "Return 4. Both 1s and both 2s cancelled via XOR, leaving only 4 -- the single number. O(n) time, O(1) space!",
      codeHighlightLines: [5],
      structures: [
        { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 0: "success", 1: "checked", 2: "checked", 3: "checked", 4: "checked" } },
        { type: "variables", entries: [{ name: "return result", value: 4, highlight: true }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def productExceptSelf(nums):
    n = len(nums)
    result = [1] * n

    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]

    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]

    return result`,
  steps: [
    {
      description:
        "We want result[i] = product of all elements except nums[i], without using division. The idea: result[i] = (product of everything LEFT of i) × (product of everything RIGHT of i). We'll build these in two passes. Start with result filled with 1s.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3, 4] },
        { type: "array", label: "result", values: [1, 1, 1, 1] },
        { type: "variables", entries: [{ name: "prefix", value: 1 }] },
      ],
    },
    {
      description:
        "Prefix pass, i=0. result[0] = prefix = 1 (nothing to the left of index 0, so the left-product is 1). Then update prefix: prefix *= nums[0] = 1 × 1 = 1.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [1, 2, 3, 4],
          highlights: { 0: "active" },
          pointers: [{ index: 0, label: "i" }],
        },
        {
          type: "array",
          label: "result",
          values: [1, 1, 1, 1],
          highlights: { 0: "checked" },
        },
        { type: "variables", entries: [{ name: "prefix", value: 1, highlight: true }] },
      ],
    },
    {
      description:
        "Prefix pass, i=1. result[1] = prefix = 1 (left-product of just nums[0]=1). Then prefix *= nums[1] = 1 × 2 = 2.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [1, 2, 3, 4],
          highlights: { 1: "active" },
          pointers: [{ index: 1, label: "i" }],
        },
        {
          type: "array",
          label: "result",
          values: [1, 1, 1, 1],
          highlights: { 0: "checked", 1: "checked" },
        },
        { type: "variables", entries: [{ name: "prefix", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "Prefix pass, i=2. result[2] = prefix = 2 (left-product = 1×2). Then prefix *= nums[2] = 2 × 3 = 6.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [1, 2, 3, 4],
          highlights: { 2: "active" },
          pointers: [{ index: 2, label: "i" }],
        },
        {
          type: "array",
          label: "result",
          values: [1, 1, 2, 1],
          highlights: { 2: "checked" },
        },
        { type: "variables", entries: [{ name: "prefix", value: 6, highlight: true }] },
      ],
    },
    {
      description:
        "Prefix pass, i=3. result[3] = prefix = 6 (left-product = 1×2×3). Prefix pass complete! Each result[i] now holds the product of all elements to its LEFT. Now we need to multiply in the right-products.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [1, 2, 3, 4],
          highlights: { 3: "active" },
          pointers: [{ index: 3, label: "i" }],
        },
        {
          type: "array",
          label: "result",
          values: [1, 1, 2, 6],
          highlights: { 0: "success", 1: "success", 2: "success", 3: "success" },
        },
        {
          type: "variables",
          entries: [
            { name: "prefix", value: 24 },
            { name: "suffix", value: 1 },
          ],
        },
      ],
    },
    {
      description:
        "Suffix pass, i=3. result[3] *= suffix = 6 × 1 = 6 (nothing to the right of index 3). Then suffix *= nums[3] = 1 × 4 = 4.",
      codeHighlightLines: [11, 12, 13],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [1, 2, 3, 4],
          highlights: { 3: "active" },
          pointers: [{ index: 3, label: "i" }],
        },
        {
          type: "array",
          label: "result",
          values: [1, 1, 2, 6],
          highlights: { 3: "checked" },
        },
        { type: "variables", entries: [{ name: "suffix", value: 4, highlight: true }] },
      ],
    },
    {
      description:
        "Suffix pass, i=2. result[2] *= suffix = 2 × 4 = 8 (right-product = 4). Then suffix *= nums[2] = 4 × 3 = 12.",
      codeHighlightLines: [11, 12, 13],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [1, 2, 3, 4],
          highlights: { 2: "active" },
          pointers: [{ index: 2, label: "i" }],
        },
        {
          type: "array",
          label: "result",
          values: [1, 1, 8, 6],
          highlights: { 2: "checked" },
        },
        { type: "variables", entries: [{ name: "suffix", value: 12, highlight: true }] },
      ],
    },
    {
      description:
        "Suffix pass, i=1. result[1] *= suffix = 1 × 12 = 12 (right-product = 3×4). Then suffix *= nums[1] = 12 × 2 = 24.",
      codeHighlightLines: [11, 12, 13],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [1, 2, 3, 4],
          highlights: { 1: "active" },
          pointers: [{ index: 1, label: "i" }],
        },
        {
          type: "array",
          label: "result",
          values: [1, 12, 8, 6],
          highlights: { 1: "checked" },
        },
        { type: "variables", entries: [{ name: "suffix", value: 24, highlight: true }] },
      ],
    },
    {
      description:
        "Suffix pass, i=0. result[0] *= suffix = 1 × 24 = 24 (right-product = 2×3×4). Done! result = [24, 12, 8, 6]. Verify: 24=2×3×4, 12=1×3×4, 8=1×2×4, 6=1×2×3. Time: O(n), Space: O(1) extra (the result array doesn't count).",
      codeHighlightLines: [11, 12, 13, 15],
      structures: [
        {
          type: "array",
          label: "nums",
          values: [1, 2, 3, 4],
          highlights: { 0: "active" },
          pointers: [{ index: 0, label: "i" }],
        },
        {
          type: "array",
          label: "result",
          values: [24, 12, 8, 6],
          highlights: { 0: "success", 1: "success", 2: "success", 3: "success" },
        },
        { type: "variables", entries: [{ name: "return", value: "[24, 12, 8, 6]", highlight: true }] },
      ],
    },
  ],
};

export default solution;

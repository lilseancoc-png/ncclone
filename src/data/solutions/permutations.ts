import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def permute(nums):
    result = []
    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])
            return
        for i in range(len(remaining)):
            current.append(remaining[i])
            backtrack(current, remaining[:i] + remaining[i+1:])
            current.pop()
    backtrack([], nums)
    return result`,
  steps: [
    {
      description:
        "Generate all permutations of [1,2,3]. At each step, we pick one number from remaining, add it to current, and recurse with the rest.",
      codeHighlightLines: [1, 2, 3, 10],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3] },
        { type: "array", label: "current", values: [] },
        { type: "array", label: "remaining", values: [1, 2, 3] },
        { type: "array", label: "result", values: [] },
      ],
    },
    {
      description:
        "Pick 1 from remaining. current=[1], remaining=[2,3]. Then pick 2: current=[1,2], remaining=[3]. Then pick 3: current=[1,2,3], remaining=[]. First permutation found!",
      codeHighlightLines: [6, 7, 8],
      structures: [
        {
          type: "array",
          label: "current",
          values: [1, 2, 3],
          highlights: { 0: "pointer-i", 1: "pointer-i", 2: "pointer-i" },
        },
        { type: "array", label: "remaining", values: [] },
        {
          type: "array",
          label: "result (so far)",
          values: ["[1,2,3]"],
          highlights: { 0: "success" },
        },
      ],
    },
    {
      description:
        "Backtrack: pop 3, pop 2. current=[1], remaining=[2,3]. Now pick 3 instead: current=[1,3], remaining=[2]. Then pick 2: current=[1,3,2]. Second permutation!",
      codeHighlightLines: [9, 6, 7, 8],
      structures: [
        {
          type: "array",
          label: "current",
          values: [1, 3, 2],
          highlights: { 1: "active", 2: "active" },
        },
        { type: "array", label: "remaining", values: [] },
        {
          type: "array",
          label: "result (so far)",
          values: ["[1,2,3]", "[1,3,2]"],
          highlights: { 1: "success" },
        },
      ],
    },
    {
      description:
        "Backtrack all the way to current=[]. Pick 2 first. Then explore: [2,1,3] and [2,3,1].",
      codeHighlightLines: [9, 6, 7, 8],
      structures: [
        {
          type: "array",
          label: "Exploring with 2 first",
          values: [2],
          highlights: { 0: "active" },
        },
        {
          type: "array",
          label: "remaining",
          values: [1, 3],
          highlights: { 0: "pointer-j", 1: "pointer-j" },
        },
        {
          type: "array",
          label: "result (so far)",
          values: ["[1,2,3]", "[1,3,2]", "[2,1,3]", "[2,3,1]"],
          highlights: { 2: "success", 3: "success" },
        },
      ],
    },
    {
      description:
        "Backtrack to current=[]. Pick 3 first. Then explore: [3,1,2] and [3,2,1].",
      codeHighlightLines: [9, 6, 7, 8],
      structures: [
        {
          type: "array",
          label: "Exploring with 3 first",
          values: [3],
          highlights: { 0: "active" },
        },
        {
          type: "array",
          label: "remaining",
          values: [1, 2],
          highlights: { 0: "pointer-j", 1: "pointer-j" },
        },
        {
          type: "array",
          label: "result (so far)",
          values: ["[1,2,3]", "[1,3,2]", "[2,1,3]", "[2,3,1]", "[3,1,2]", "[3,2,1]"],
          highlights: { 4: "success", 5: "success" },
        },
      ],
    },
    {
      description:
        "All 6 permutations of [1,2,3] have been generated. For n elements there are n! = 3! = 6 permutations.",
      codeHighlightLines: [11],
      structures: [
        {
          type: "array",
          label: "result",
          values: ["[1,2,3]", "[1,3,2]", "[2,1,3]", "[2,3,1]", "[3,1,2]", "[3,2,1]"],
          highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" },
        },
        {
          type: "variables",
          entries: [{ name: "total permutations", value: 6, highlight: true }],
        },
      ],
    },
  ],
};

export default solution;

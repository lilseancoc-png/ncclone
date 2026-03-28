import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def subsets(nums):
    result = []
    subset = []

    def backtrack(start):
        result.append(subset[:])
        for i in range(start, len(nums)):
            subset.append(nums[i])
            backtrack(i + 1)
            subset.pop()

    backtrack(0)
    return result`,
  steps: [
    {
      description:
        "We want all subsets of [1, 2, 3]. We use backtracking: at each element we choose to include it or skip it. Start with an empty subset and add it to results.",
      codeHighlightLines: [1, 2, 3, 5],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3] },
        { type: "array", label: "subset", values: [] },
        { type: "array", label: "result", values: ["[]"] },
        { type: "variables", entries: [{ name: "start", value: 0 }] },
      ],
    },
    {
      description:
        "Include nums[0]=1 in the subset. Recurse with start=1. The current subset [1] is added to results.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3], highlights: { 0: "active" }, pointers: [{ index: 0, label: "i" }] },
        { type: "array", label: "subset", values: [1], highlights: { 0: "active" } },
        { type: "array", label: "result", values: ["[]", "[1]"] },
        { type: "variables", entries: [{ name: "start", value: 1 }] },
      ],
    },
    {
      description:
        "Include nums[1]=2. Recurse with start=2. Subset [1,2] is added. Then include nums[2]=3. Subset [1,2,3] is added.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "array", label: "subset", values: [1, 2, 3], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "array", label: "result", values: ["[]", "[1]", "[1,2]", "[1,2,3]"] },
      ],
    },
    {
      description:
        "Backtrack: pop 3, then pop 2. Now subset is [1]. Try nums[2]=3 next. Subset [1,3] is added to results.",
      codeHighlightLines: [9],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3], highlights: { 0: "active", 2: "pointer-j" } },
        { type: "array", label: "subset", values: [1, 3], highlights: { 1: "pointer-j" } },
        { type: "array", label: "result", values: ["[]", "[1]", "[1,2]", "[1,2,3]", "[1,3]"] },
      ],
    },
    {
      description:
        "Backtrack to empty subset. Now start with nums[1]=2. Add [2], then recurse to add [2,3].",
      codeHighlightLines: [6, 7, 8],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3], highlights: { 1: "active", 2: "active" } },
        { type: "array", label: "subset", values: [2, 3], highlights: { 0: "active", 1: "active" } },
        { type: "array", label: "result", values: ["[]", "[1]", "[1,2]", "[1,2,3]", "[1,3]", "[2]", "[2,3]"] },
      ],
    },
    {
      description:
        "Backtrack again. Start with nums[2]=3 alone. Add [3] to results.",
      codeHighlightLines: [6, 7, 8, 9],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3], highlights: { 2: "active" } },
        { type: "array", label: "subset", values: [3], highlights: { 0: "active" } },
        { type: "array", label: "result", values: ["[]", "[1]", "[1,2]", "[1,2,3]", "[1,3]", "[2]", "[2,3]", "[3]"] },
      ],
    },
    {
      description:
        "All branches explored. We have 2^3 = 8 subsets. Return the result.",
      codeHighlightLines: [11, 12],
      structures: [
        { type: "array", label: "nums", values: [1, 2, 3], highlights: { 0: "success", 1: "success", 2: "success" } },
        {
          type: "array",
          label: "result (8 subsets)",
          values: ["[]", "[1]", "[1,2]", "[1,2,3]", "[1,3]", "[2]", "[2,3]", "[3]"],
          highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success" },
        },
      ],
    },
  ],
};

export default solution;

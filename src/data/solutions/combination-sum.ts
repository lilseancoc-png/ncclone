import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def combinationSum(candidates, target):
    result = []

    def backtrack(start, current, total):
        if total == target:
            result.append(current[:])
            return
        if total > target:
            return
        for i in range(start, len(candidates)):
            current.append(candidates[i])
            backtrack(i, current, total + candidates[i])
            current.pop()

    backtrack(0, [], 0)
    return result`,
  steps: [
    {
      description:
        "We need combinations from [2,3,6,7] that sum to 7. We can reuse the same number. Start backtracking with an empty combination and total=0.",
      codeHighlightLines: [1, 2, 4],
      structures: [
        { type: "array", label: "candidates", values: [2, 3, 6, 7] },
        { type: "array", label: "current", values: [] },
        { type: "variables", entries: [{ name: "target", value: 7 }, { name: "total", value: 0 }] },
        { type: "array", label: "result", values: [] },
      ],
    },
    {
      description:
        "Pick candidates[0]=2. Total becomes 2. Since 2 < 7, keep going. Pick 2 again. Total becomes 4.",
      codeHighlightLines: [9, 10, 11],
      structures: [
        { type: "array", label: "candidates", values: [2, 3, 6, 7], highlights: { 0: "active" } },
        { type: "array", label: "current", values: [2, 2], highlights: { 0: "active", 1: "active" } },
        { type: "variables", entries: [{ name: "target", value: 7 }, { name: "total", value: 4, highlight: true }] },
      ],
    },
    {
      description:
        "Pick 2 again: total=6. Pick 2 once more: total=8 > 7. That exceeds the target, so we backtrack.",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "candidates", values: [2, 3, 6, 7], highlights: { 0: "found" } },
        { type: "array", label: "current", values: [2, 2, 2, 2], highlights: { 3: "found" } },
        { type: "variables", entries: [{ name: "target", value: 7 }, { name: "total", value: 8, highlight: true }] },
      ],
    },
    {
      description:
        "Backtrack and try 3 instead: current=[2,2,3], total=7. That equals target! Add [2,2,3] to results.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "candidates", values: [2, 3, 6, 7], highlights: { 0: "active", 1: "active" } },
        { type: "array", label: "current", values: [2, 2, 3], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "total", value: 7, highlight: true }] },
        { type: "array", label: "result", values: ["[2,2,3]"], highlights: { 0: "success" } },
      ],
    },
    {
      description:
        "Continue exploring: try current=[2,3,...] but 2+3+3=8 > 7, backtrack. Try [2,6]=8 > 7, backtrack. Try [2,7]=9 > 7, backtrack. No more combos starting with [2,3+].",
      codeHighlightLines: [7, 8, 12],
      structures: [
        { type: "array", label: "candidates", values: [2, 3, 6, 7], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked" } },
        { type: "array", label: "current", values: [2], highlights: { 0: "checked" } },
        { type: "variables", entries: [{ name: "total", value: 2 }] },
      ],
    },
    {
      description:
        "Now start with candidates[1]=3. Try [3,3]=6, then [3,3,3]=9 > 7. Backtrack. Try [3,3,6] and [3,3,7] both exceed. No match here.",
      codeHighlightLines: [9, 10, 11, 12],
      structures: [
        { type: "array", label: "candidates", values: [2, 3, 6, 7], highlights: { 1: "active" }, pointers: [{ index: 1, label: "start" }] },
        { type: "array", label: "current", values: [3, 3], highlights: { 0: "active", 1: "active" } },
        { type: "variables", entries: [{ name: "total", value: 6 }] },
      ],
    },
    {
      description:
        "Try candidates[3]=7 alone. Total=7 equals target! Add [7] to results.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "candidates", values: [2, 3, 6, 7], highlights: { 3: "success" }, pointers: [{ index: 3, label: "i" }] },
        { type: "array", label: "current", values: [7], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "total", value: 7, highlight: true }] },
        { type: "array", label: "result", values: ["[2,2,3]", "[7]"], highlights: { 1: "success" } },
      ],
    },
    {
      description:
        "All branches explored. The two valid combinations are [2,2,3] and [7]. Return the result.",
      codeHighlightLines: [14],
      structures: [
        { type: "array", label: "candidates", values: [2, 3, 6, 7], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "array", label: "result", values: ["[2,2,3]", "[7]"], highlights: { 0: "success", 1: "success" } },
      ],
    },
  ],
};

export default solution;

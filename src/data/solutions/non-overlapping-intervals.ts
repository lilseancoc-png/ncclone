import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Greedy — Sort by End",
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(1)",
  code: `def erase_overlap_intervals(intervals):
    intervals.sort(key=lambda x: x[1])
    removals = 0
    prev_end = float('-inf')
    for start, end in intervals:
        if start >= prev_end:
            prev_end = end  # keep this interval
        else:
            removals += 1  # remove this interval
    return removals`,
  steps: [
    {
      description:
        "Find minimum intervals to remove so the rest don't overlap. Greedy: sort by end time, always keep the interval that ends earliest. Input: [[1,2],[2,3],[3,4],[1,3]].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "original", values: ["[1,2]", "[2,3]", "[3,4]", "[1,3]"] },
        { type: "array", label: "sorted by end", values: ["[1,2]", "[2,3]", "[1,3]", "[3,4]"], highlights: { 0: "active", 1: "active", 2: "active", 3: "active" } },
      ],
    },
    {
      description:
        "[1,2]: start 1 >= -inf → keep. prev_end=2. [2,3]: start 2 >= 2 → keep. prev_end=3.",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "array", label: "sorted", values: ["[1,2]", "[2,3]", "[1,3]", "[3,4]"], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "prev_end", value: 3 }, { name: "removals", value: 0 }] },
      ],
    },
    {
      description:
        "[1,3]: start 1 < 3 → overlaps! Remove it (removals=1). [3,4]: start 3 >= 3 → keep. prev_end=4.",
      codeHighlightLines: [8, 9],
      structures: [
        { type: "array", label: "sorted", values: ["[1,2]", "[2,3]", "[1,3]", "[3,4]"], highlights: { 0: "success", 1: "success", 2: "found", 3: "success" } },
        { type: "variables", entries: [{ name: "prev_end", value: 4 }, { name: "removals", value: 1, highlight: true }] },
      ],
    },
    {
      description:
        "Return 1 — remove just [1,3] and the remaining [[1,2],[2,3],[3,4]] are non-overlapping. Sorting by end time is key: it maximizes the number of intervals we can keep.",
      codeHighlightLines: [10],
      structures: [
        { type: "array", label: "kept", values: ["[1,2]", "[2,3]", "[3,4]"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: 1, highlight: true }] },
      ],
    },
  ],
};

export default solution;

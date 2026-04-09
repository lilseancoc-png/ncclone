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
        "Find the minimum number of intervals to remove so the rest don't overlap. This is the classic 'activity selection' problem. The greedy strategy: sort by end time, then always keep the interval that ends earliest. Why? An interval that ends sooner leaves more room for future intervals. Input: [[1,2],[2,3],[3,4],[1,3]].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "original", values: ["[1,2]", "[2,3]", "[3,4]", "[1,3]"] },
        { type: "array", label: "sorted by end time", values: ["[1,2]", "[2,3]", "[1,3]", "[3,4]"] },
        { type: "variables", entries: [{ name: "removals", value: 0 }, { name: "prev_end", value: "-∞" }] },
      ],
    },
    {
      description:
        "[1,2]: start=1 >= prev_end=-∞ → no overlap, keep it! Update prev_end=2. This is our first 'anchor' interval. We chose it because it ends earliest (at time 2), maximizing the space available for subsequent intervals.",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "array", label: "sorted", values: ["[1,2]", "[2,3]", "[1,3]", "[3,4]"], highlights: { 0: "success" }, pointers: [{ index: 0, label: "keep" }] },
        { type: "variables", entries: [{ name: "prev_end", value: 2, highlight: true }, { name: "removals", value: 0 }] },
      ],
    },
    {
      description:
        "[2,3]: start=2 >= prev_end=2 → no overlap (touching endpoints don't count as overlap), keep it! Update prev_end=3. Two intervals down, zero removals needed so far.",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "array", label: "sorted", values: ["[1,2]", "[2,3]", "[1,3]", "[3,4]"], highlights: { 0: "success", 1: "success" }, pointers: [{ index: 1, label: "keep" }] },
        { type: "variables", entries: [{ name: "prev_end", value: 3, highlight: true }, { name: "removals", value: 0 }] },
      ],
    },
    {
      description:
        "[1,3]: start=1 < prev_end=3 → overlaps with the previous kept interval! We must remove it. Increment removals to 1. Notice we keep prev_end=3 (we don't update it because we're removing this interval, not keeping it). By removing the overlapping interval rather than the previous one, we maintain our greedy choice of earliest endings.",
      codeHighlightLines: [8, 9],
      structures: [
        { type: "array", label: "sorted", values: ["[1,2]", "[2,3]", "[1,3]", "[3,4]"], highlights: { 0: "success", 1: "success", 2: "found" }, pointers: [{ index: 2, label: "remove" }] },
        { type: "variables", entries: [{ name: "prev_end", value: 3 }, { name: "removals", value: 1, highlight: true }, { name: "1 < 3?", value: "overlap → remove!" }] },
      ],
    },
    {
      description:
        "[3,4]: start=3 >= prev_end=3 → no overlap, keep it! Update prev_end=4. All intervals processed. Return 1 — removing just [1,3] leaves [[1,2],[2,3],[3,4]] which are all non-overlapping. Sorting by end time is key: it ensures our greedy choices are globally optimal. Time: O(n log n) for sorting. Space: O(1) extra.",
      codeHighlightLines: [5, 6, 7, 10],
      structures: [
        { type: "array", label: "kept intervals", values: ["[1,2]", "[2,3]", "[3,4]"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: 1, highlight: true }, { name: "removed", value: "[1,3]" }, { name: "Time", value: "O(n log n)" }] },
      ],
    },
  ],
};

export default solution;

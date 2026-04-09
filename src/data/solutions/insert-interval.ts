import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Linear Merge",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  code: `def insert(intervals, new_interval):
    result = []
    i = 0
    n = len(intervals)
    # Add all intervals that end before new starts
    while i < n and intervals[i][1] < new_interval[0]:
        result.append(intervals[i])
        i += 1
    # Merge overlapping intervals
    while i < n and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1
    result.append(new_interval)
    # Add remaining intervals
    while i < n:
        result.append(intervals[i])
        i += 1
    return result`,
  steps: [
    {
      description:
        "Insert a new interval into a sorted, non-overlapping list of intervals and merge any overlaps. The elegant approach: three linear passes in one sweep. Phase 1: add all intervals that end BEFORE the new one starts (no overlap possible). Phase 2: merge all intervals that overlap with the new one. Phase 3: add all intervals that start AFTER the new one ends. intervals=[[1,3],[6,9]], newInterval=[2,5].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "intervals", values: ["[1,3]", "[6,9]"] },
        { type: "variables", entries: [{ name: "newInterval", value: "[2,5]", highlight: true }, { name: "result", value: "[]" }] },
      ],
    },
    {
      description:
        "Phase 1 — Add before: Check if intervals[0]=[1,3] ends before newInterval starts. Does 3 < 2? No! So [1,3] is NOT entirely before [2,5] — they might overlap. Skip to Phase 2. (If intervals were [[0,1],[6,9]], then [0,1] ends at 1 < 2, so it would be added to result.)",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "array", label: "intervals", values: ["[1,3]", "[6,9]"], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "3 < 2?", value: "No → not before, check overlap" }, { name: "result", value: "[]" }, { name: "i", value: 0 }] },
      ],
    },
    {
      description:
        "Phase 2 — Merge overlaps: Does [1,3] overlap [2,5]? Check: intervals[0][0]=1 <= newInterval[1]=5? Yes → overlap! Merge: new start = min(2,1) = 1, new end = max(5,3) = 5. newInterval becomes [1,5]. Next: does [6,9] overlap [1,5]? Check: 6 <= 5? No → stop merging. Append merged [1,5] to result.",
      codeHighlightLines: [9, 10, 11, 12, 13, 14],
      structures: [
        { type: "array", label: "result so far", values: ["[1,5]"], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "merge [1,3] + [2,5]", value: "[1,5]", highlight: true }, { name: "[6,9] overlap [1,5]?", value: "6 <= 5? No → stop" }] },
      ],
    },
    {
      description:
        "Phase 3 — Add remaining: [6,9] starts after the merged interval ends, so add it as-is. Result: [[1,5],[6,9]]. The three-phase approach handles all edge cases cleanly: new interval before all, after all, overlapping multiple intervals, or no overlaps. Time: O(n) — single pass, each interval examined once. Space: O(n) for the result array.",
      codeHighlightLines: [15, 16, 17, 18, 19],
      structures: [
        { type: "array", label: "final result", values: ["[1,5]", "[6,9]"], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[[1,5],[6,9]]", highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;

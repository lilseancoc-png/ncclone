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
        "Insert a new interval into a sorted list and merge if necessary. Three phases: add before, merge overlaps, add after. intervals=[[1,3],[6,9]], newInterval=[2,5].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "intervals", values: ["[1,3]", "[6,9]"] },
        { type: "variables", entries: [{ name: "newInterval", value: "[2,5]", highlight: true }] },
      ],
    },
    {
      description:
        "Phase 1: Add intervals ending before new starts. [1,3] ends at 3, new starts at 2. 3 >= 2, so [1,3] is NOT before — skip to merge phase.",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "array", label: "intervals", values: ["[1,3]", "[6,9]"], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "result", value: "[]" }, { name: "i", value: 0 }, { name: "check", value: "3 < 2? No → merge" }] },
      ],
    },
    {
      description:
        "Phase 2: Merge overlaps. [1,3] overlaps [2,5] → merged to [1,5]. Next: [6,9] starts at 6 > 5, no overlap. Add merged [1,5] to result.",
      codeHighlightLines: [9, 10, 11, 12, 13, 14],
      structures: [
        { type: "array", label: "result so far", values: ["[1,5]"], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "merged", value: "[1,5]", highlight: true }, { name: "i", value: 1 }] },
      ],
    },
    {
      description:
        "Phase 3: Add remaining. [6,9] comes after merged interval, add it as-is. Result: [[1,5],[6,9]]. O(n) time — single pass through the list.",
      codeHighlightLines: [15, 16, 17, 18, 19],
      structures: [
        { type: "array", label: "result", values: ["[1,5]", "[6,9]"], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[[1,5],[6,9]]", highlight: true }] },
      ],
    },
  ],
};

export default solution;

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
        "Insert a new interval into a sorted, non-overlapping list and merge overlaps. Three-phase sweep: (1) add intervals entirely before the new one, (2) merge overlapping ones, (3) add intervals entirely after. intervals=[[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval=[4,8].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "intervals", values: ["[1,2]", "[3,5]", "[6,7]", "[8,10]", "[12,16]"] },
        { type: "variables", entries: [{ name: "newInterval", value: "[4,8]", highlight: true }, { name: "result", value: "[]" }] },
      ],
    },
    {
      description:
        "Phase 1 — Add before: [1,2] ends at 2 < newInterval start 4? YES → no overlap, add [1,2] to result. [3,5] ends at 5 < 4? NO → might overlap, stop Phase 1. One interval safely added before any merging starts.",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "array", label: "intervals", values: ["[1,2]", "[3,5]", "[6,7]", "[8,10]", "[12,16]"], highlights: { 0: "success", 1: "active" } },
        { type: "variables", entries: [{ name: "[1,2] end=2 < 4?", value: "YES → add to result" }, { name: "[3,5] end=5 < 4?", value: "NO → check overlap" }, { name: "result", value: "[[1,2]]", highlight: true }] },
      ],
    },
    {
      description:
        "Phase 2 — Merge overlaps: [3,5] start=3 <= newInterval end=8? YES → overlap! Merge: new = [min(4,3), max(8,5)] = [3,8]. Next: [6,7] start=6 <= 8? YES → merge: [min(3,6), max(8,7)] = [3,8]. Next: [8,10] start=8 <= 8? YES → merge: [min(3,8), max(8,10)] = [3,10]. Three intervals absorbed into one merged interval.",
      codeHighlightLines: [9, 10, 11, 12, 13, 14],
      structures: [
        { type: "array", label: "intervals", values: ["[1,2]", "[3,5]", "[6,7]", "[8,10]", "[12,16]"], highlights: { 1: "active", 2: "active", 3: "active" } },
        { type: "variables", entries: [{ name: "merge [3,5]+[4,8]", value: "[3,8]" }, { name: "merge +[6,7]", value: "[3,8]" }, { name: "merge +[8,10]", value: "[3,10]", highlight: true }] },
      ],
    },
    {
      description:
        "Next: [12,16] start=12 <= 10? NO → stop merging. Append merged [3,10] to result. Phase 3 — Add remaining: [12,16] starts after merged interval, add as-is. result = [[1,2],[3,10],[12,16]].",
      codeHighlightLines: [14, 15, 16, 17, 18, 19],
      structures: [
        { type: "array", label: "result building", values: ["[1,2]", "[3,10]", "[12,16]"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "merged interval", value: "[3,10] (absorbed 3 intervals)", highlight: true }, { name: "[12,16]", value: "added as-is (no overlap)" }] },
      ],
    },
    {
      description:
        "Return [[1,2],[3,10],[12,16]]. Original 5 intervals → 3 (three merged into one). The three-phase approach handles all edge cases: new interval before all, after all, overlapping everything, or no overlaps. Each interval examined exactly once. Time: O(n). Space: O(n) for result.",
      codeHighlightLines: [19],
      structures: [
        { type: "array", label: "final result", values: ["[1,2]", "[3,10]", "[12,16]"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[[1,2],[3,10],[12,16]]", highlight: true }, { name: "5 intervals → 3", value: "[3,5],[6,7],[8,10] merged" }, { name: "Time", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;

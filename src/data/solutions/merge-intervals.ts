import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for current in intervals[1:]:
        last = merged[-1]
        if current[0] <= last[1]:
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)

    return merged`,
  steps: [
    {
      description:
        "We have intervals [[1,3],[2,6],[8,10],[15,18]]. First step: sort by start time. They are already sorted here.",
      codeHighlightLines: [1, 2],
      structures: [
        {
          type: "array",
          label: "intervals (sorted)",
          values: ["[1,3]", "[2,6]", "[8,10]", "[15,18]"],
        },
      ],
    },
    {
      description:
        "Initialize merged with the first interval [1,3].",
      codeHighlightLines: [3],
      structures: [
        { type: "array", label: "intervals", values: ["[1,3]", "[2,6]", "[8,10]", "[15,18]"], highlights: { 0: "active" } },
        { type: "array", label: "merged", values: ["[1,3]"], highlights: { 0: "active" } },
      ],
    },
    {
      description:
        "current=[2,6]. Does current[0]=2 <= last[1]=3? Yes, they overlap! Merge: update end to max(3,6)=6. merged now has [1,6].",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "array", label: "intervals", values: ["[1,3]", "[2,6]", "[8,10]", "[15,18]"], highlights: { 0: "pointer-i", 1: "pointer-i" }, pointers: [{ index: 1, label: "current" }] },
        { type: "array", label: "merged", values: ["[1,6]"], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "overlap?", value: "2 <= 3 = Yes", highlight: true }] },
      ],
    },
    {
      description:
        "current=[8,10]. Does current[0]=8 <= last[1]=6? No, no overlap. Append [8,10] as a new interval.",
      codeHighlightLines: [5, 6, 7, 9, 10],
      structures: [
        { type: "array", label: "intervals", values: ["[1,3]", "[2,6]", "[8,10]", "[15,18]"], highlights: { 2: "active" }, pointers: [{ index: 2, label: "current" }] },
        { type: "array", label: "merged", values: ["[1,6]", "[8,10]"], highlights: { 1: "active" } },
        { type: "variables", entries: [{ name: "overlap?", value: "8 <= 6 = No" }] },
      ],
    },
    {
      description:
        "current=[15,18]. Does 15 <= 10? No overlap. Append [15,18] as a new interval.",
      codeHighlightLines: [5, 6, 7, 9, 10],
      structures: [
        { type: "array", label: "intervals", values: ["[1,3]", "[2,6]", "[8,10]", "[15,18]"], highlights: { 3: "active" }, pointers: [{ index: 3, label: "current" }] },
        { type: "array", label: "merged", values: ["[1,6]", "[8,10]", "[15,18]"], highlights: { 2: "active" } },
        { type: "variables", entries: [{ name: "overlap?", value: "15 <= 10 = No" }] },
      ],
    },
    {
      description:
        "Done! Return merged = [[1,6],[8,10],[15,18]]. We merged [1,3] and [2,6] into [1,6]. The other intervals had no overlaps.",
      codeHighlightLines: [12],
      structures: [
        { type: "array", label: "merged (result)", values: ["[1,6]", "[8,10]", "[15,18]"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "Time", value: "O(n log n)" }, { name: "Space", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;

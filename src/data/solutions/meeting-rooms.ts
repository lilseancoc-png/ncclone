import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Sort + Check Overlap",
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(1)",
  code: `def can_attend_meetings(intervals):
    intervals.sort(key=lambda x: x[0])
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i-1][1]:
            return False  # overlap found
    return True`,
  steps: [
    {
      description:
        "Can a person attend all meetings without any time conflicts? Given intervals [[0,30],[5,10],[15,20]], check if any two meetings overlap. The key insight: if we sort by start time, overlapping meetings must be adjacent. Without sorting we'd need O(n²) pairwise comparisons.",
      codeHighlightLines: [1],
      structures: [
        { type: "array", label: "intervals (unsorted)", values: ["[0,30]", "[5,10]", "[15,20]"] },
        { type: "variables", entries: [{ name: "strategy", value: "sort by start, scan for overlaps" }] },
      ],
    },
    {
      description:
        "Sort intervals by start time. In this case they're already sorted: [0,30], [5,10], [15,20]. Sorting brings potentially overlapping meetings next to each other — if meeting B overlaps with meeting A, B's start must be before A's end, and after sorting they'll be adjacent.",
      codeHighlightLines: [2],
      structures: [
        { type: "array", label: "sorted by start time", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "variables", entries: [{ name: "start times", value: "0, 5, 15 (sorted)" }] },
      ],
    },
    {
      description:
        "Compare intervals[1] with intervals[0]: meeting [5,10] starts at time 5. The previous meeting [0,30] ends at time 30. Does the new meeting start before the previous one ends? 5 < 30 — YES! These meetings overlap. The [0,30] meeting is still going when [5,10] tries to start.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "active", 1: "found" }, pointers: [{ index: 0, label: "i-1" }, { index: 1, label: "i" }] },
        { type: "variables", entries: [{ name: "intervals[i][0]", value: "5 (start of meeting 2)" }, { name: "intervals[i-1][1]", value: "30 (end of meeting 1)" }, { name: "5 < 30?", value: "YES — overlap!", highlight: true }] },
      ],
    },
    {
      description:
        "Return False immediately — one conflict is enough. We don't need to check the remaining pair. If no overlaps existed after checking all adjacent pairs, we'd return True. The overlap condition is strictly less-than: if one meeting ends exactly when another starts ([0,5],[5,10]), they don't conflict.",
      codeHighlightLines: [5],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "found", 1: "found" } },
        { type: "variables", entries: [{ name: "return", value: "False (conflict found)", highlight: true }] },
      ],
    },
    {
      description:
        "Why does sorting work? After sorting by start time, meeting i can only overlap with meeting i-1 (because all earlier meetings start even earlier and if they don't overlap with i-1, they won't with i). This reduces O(n²) pairwise checks to O(n) adjacent checks. Time: O(n log n) for sorting. Space: O(1) if in-place sort. This sort-then-scan pattern is the foundation of all interval problems.",
      codeHighlightLines: [2, 3, 4, 5, 6],
      structures: [
        { type: "variables", entries: [{ name: "return", value: "False", highlight: true }, { name: "Time", value: "O(n log n)" }, { name: "Space", value: "O(1)" }, { name: "pattern", value: "sort + linear scan" }] },
      ],
    },
  ],
};

export default solution;

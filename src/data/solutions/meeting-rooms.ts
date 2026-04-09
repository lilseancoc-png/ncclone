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
        "Can a person attend all meetings without any time conflicts? Given intervals [[0,30],[5,10],[15,20]], we need to check if any two meetings overlap. The key insight: if we sort meetings by start time, overlapping meetings will be adjacent. Without sorting, we'd need to compare every pair — O(n²). With sorting, just one linear scan — O(n log n) total.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "original", values: ["[0,30]", "[5,10]", "[15,20]"] },
        { type: "array", label: "sorted by start", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "variables", entries: [{ name: "already sorted!", value: "start times: 0, 5, 15" }] },
      ],
    },
    {
      description:
        "Now scan adjacent pairs. Compare intervals[1] with intervals[0]: meeting [5,10] starts at time 5. The previous meeting [0,30] ends at time 30. Does the new meeting start before the previous one ends? 5 < 30 = YES! These meetings overlap — the [0,30] meeting is still going when [5,10] tries to start. A person can't be in two places at once.",
      codeHighlightLines: [3, 4, 5],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "active", 1: "found" }, pointers: [{ index: 0, label: "i-1" }, { index: 1, label: "i" }] },
        { type: "variables", entries: [{ name: "intervals[i][0]", value: "5 (start of meeting 2)" }, { name: "intervals[i-1][1]", value: "30 (end of meeting 1)" }, { name: "5 < 30?", value: "YES — overlap!", highlight: true }] },
      ],
    },
    {
      description:
        "Return False immediately — we found an overlap, so the person cannot attend all meetings. We don't need to check further; one conflict is enough. If no overlaps were found after checking all adjacent pairs, we'd return True. Time: O(n log n) dominated by sorting. Space: O(1) if we sort in-place (or O(n) depending on the sort implementation). This same pattern — sort then scan — appears in many interval problems.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "found", 1: "found" } },
        { type: "variables", entries: [{ name: "return", value: "False", highlight: true }, { name: "Time", value: "O(n log n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

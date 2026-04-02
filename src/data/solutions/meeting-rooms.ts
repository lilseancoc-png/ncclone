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
        "Can a person attend all meetings [[0,30],[5,10],[15,20]]? Sort by start time, then check if any meeting starts before the previous one ends.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "intervals (sorted)", values: ["[0,30]", "[5,10]", "[15,20]"] },
      ],
    },
    {
      description:
        "Compare intervals[1] with intervals[0]: does [5,10] start before [0,30] ends? 5 < 30 = Yes! These meetings overlap. A person cannot attend both.",
      codeHighlightLines: [3, 4, 5],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "pointer-i", 1: "found" }, pointers: [{ index: 0, label: "i-1" }, { index: 1, label: "i" }] },
        { type: "variables", entries: [{ name: "overlap?", value: "5 < 30 = Yes!", highlight: true }] },
      ],
    },
    {
      description:
        "Return False immediately. No need to check further once we find one overlap. O(n log n) for sorting, O(1) extra space. If no overlaps existed, we would return True after checking all pairs.",
      codeHighlightLines: [5],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "found", 1: "found" } },
        { type: "variables", entries: [{ name: "return", value: "False", highlight: true }, { name: "Time", value: "O(n log n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

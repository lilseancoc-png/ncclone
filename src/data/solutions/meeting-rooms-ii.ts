import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Min Heap — Track End Times",
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(n)",
  code: `def min_meeting_rooms(intervals):
    import heapq
    intervals.sort(key=lambda x: x[0])
    heap = []  # end times of active meetings
    for start, end in intervals:
        if heap and start >= heap[0]:
            heapq.heapreplace(heap, end)
        else:
            heapq.heappush(heap, end)
    return len(heap)`,
  steps: [
    {
      description:
        "Find minimum rooms needed for [[0,30],[5,10],[15,20]]. Sort by start time. Use a min-heap to track end times of ongoing meetings. Heap size = rooms in use.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "intervals (sorted)", values: ["[0,30]", "[5,10]", "[15,20]"] },
        { type: "array", label: "heap (end times)", values: [] },
        { type: "variables", entries: [{ name: "rooms", value: 0 }] },
      ],
    },
    {
      description:
        "Meeting [0,30]: heap is empty, so push end time 30. This meeting needs a new room. 1 room in use.",
      codeHighlightLines: [5, 8, 9],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "active" }, pointers: [{ index: 0, label: "i" }] },
        { type: "array", label: "heap (end times)", values: [30], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "rooms", value: 1 }] },
      ],
    },
    {
      description:
        "Meeting [5,10]: start=5 < heap[0]=30 — the earliest ending meeting hasn't finished yet. Push end time 10. Need a second room! 2 rooms in use.",
      codeHighlightLines: [5, 6, 8, 9],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "i" }] },
        { type: "array", label: "heap (end times)", values: [10, 30], highlights: { 0: "active", 1: "active" } },
        { type: "variables", entries: [{ name: "start < heap[0]?", value: "5 < 30 = Yes", highlight: true }, { name: "rooms", value: 2 }] },
      ],
    },
    {
      description:
        "Meeting [15,20]: start=15 >= heap[0]=10 — a room freed up! Replace 10 with 20 (reuse that room). Heap=[20,30], still 2 rooms. Final answer: 2 rooms needed.",
      codeHighlightLines: [5, 6, 7, 10],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "checked", 1: "checked", 2: "success" }, pointers: [{ index: 2, label: "i" }] },
        { type: "array", label: "heap (end times)", values: [20, 30], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "start >= heap[0]?", value: "15 >= 10 = Yes (reuse!)", highlight: true }, { name: "return", value: 2, highlight: true }] },
      ],
    },
  ],
};

export default solution;

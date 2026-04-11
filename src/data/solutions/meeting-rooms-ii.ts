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
        "Find minimum conference rooms needed. Process meetings by start time. Min-heap tracks when each room becomes free (end times). If next meeting starts after earliest free room, reuse it. Otherwise, allocate new room. intervals=[[0,30],[5,10],[15,20]].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "intervals (sorted)", values: ["[0,30]", "[5,10]", "[15,20]"] },
        { type: "stack", label: "heap (end times)", values: [] },
        { type: "variables", entries: [{ name: "rooms", value: 0 }] },
      ],
    },
    {
      description:
        "Meeting [0,30]: Heap empty → no rooms available. Push end time 30. Room 1 allocated, busy until time 30. Heap = [30], size = 1 room.",
      codeHighlightLines: [5, 8, 9],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "active" } },
        { type: "stack", label: "heap", values: [30], topHighlight: true },
        { type: "variables", entries: [{ name: "action", value: "new room (heap empty)" }, { name: "rooms", value: 1 }] },
      ],
    },
    {
      description:
        "Meeting [5,10]: Start=5 >= heap[0]=30? NO — room 1 won't be free until 30. Push 10. Room 2 allocated. Heap = [10, 30] (min-heap: 10 on top). Two concurrent meetings. Peak rooms = 2.",
      codeHighlightLines: [5, 6, 8, 9],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 1: "active" } },
        { type: "stack", label: "heap", values: [10, 30], topHighlight: true },
        { type: "variables", entries: [{ name: "5 >= 30?", value: "NO → need new room", highlight: true }, { name: "rooms", value: 2 }] },
      ],
    },
    {
      description:
        "Meeting [15,20]: Start=15 >= heap[0]=10? YES — room with end 10 is free! heapreplace: pop 10, push 20. We reuse that room. Heap = [20, 30]. Still 2 rooms, not 3. The 5-10 meeting ended, so its room is recycled for the 15-20 meeting.",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 2: "success" } },
        { type: "stack", label: "heap", values: [20, 30] },
        { type: "variables", entries: [{ name: "15 >= 10?", value: "YES → reuse room!", highlight: true }, { name: "heap change", value: "pop 10, push 20" }, { name: "rooms", value: "still 2" }] },
      ],
    },
    {
      description:
        "All meetings processed. Return len(heap) = 2. The heap size equals the maximum concurrent meetings at any point. Why min-heap? We always check the EARLIEST ending meeting first — if even that room isn't free, no room is. Time: O(n log n) — sort + n heap ops. Space: O(n) for heap.",
      codeHighlightLines: [10],
      structures: [
        { type: "stack", label: "heap (final)", values: [20, 30] },
        { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "room 1", value: "[0,30] — still going" }, { name: "room 2", value: "[5,10] then [15,20]" }, { name: "Time", value: "O(n log n)" }] },
      ],
    },
  ],
};

export default solution;

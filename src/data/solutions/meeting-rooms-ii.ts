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
        "Find the minimum number of conference rooms needed for all meetings. The key insight: process meetings in order of start time. Use a min-heap to track when each room becomes free (its meeting's end time). If the next meeting starts after the earliest ending room is free, reuse that room. Otherwise, allocate a new room. intervals=[[0,30],[5,10],[15,20]].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "intervals (sorted by start)", values: ["[0,30]", "[5,10]", "[15,20]"] },
        { type: "stack", label: "heap (end times of active rooms)", values: [] },
        { type: "variables", entries: [{ name: "rooms needed", value: 0 }] },
      ],
    },
    {
      description:
        "Meeting [0,30]: Heap is empty — no rooms available. Push end time 30 (allocate room 1). The heap now represents: 'room 1 is busy until time 30'. Heap size = 1 = rooms in use.",
      codeHighlightLines: [5, 8, 9],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "active" } },
        { type: "stack", label: "heap (min-heap of end times)", values: [30] },
        { type: "variables", entries: [{ name: "rooms in use", value: 1 }, { name: "action", value: "new room (heap was empty)" }] },
      ],
    },
    {
      description:
        "Meeting [5,10]: Start time 5. Is 5 >= heap[0]=30 (earliest room frees at 30)? NO — no room is free yet. Push end time 10 (allocate room 2). Heap = [10, 30]. Two meetings are happening simultaneously. Peak rooms = 2.",
      codeHighlightLines: [5, 6, 8, 9],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "checked", 1: "active" } },
        { type: "stack", label: "heap", values: [10, 30], topHighlight: true },
        { type: "variables", entries: [{ name: "5 >= 30?", value: "No → new room needed", highlight: true }, { name: "rooms in use", value: 2 }] },
      ],
    },
    {
      description:
        "Meeting [15,20]: Start time 15. Is 15 >= heap[0]=10? YES — room with end time 10 is free! Use heapreplace: remove 10, push 20. We're reusing that room. Heap = [20, 30]. Still 2 rooms, not 3. All meetings processed. Return len(heap) = 2. The heap size at the end equals the maximum number of concurrent meetings. Time: O(n log n) for sorting + heap operations. Space: O(n) for the heap.",
      codeHighlightLines: [5, 6, 7, 10],
      structures: [
        { type: "array", label: "intervals", values: ["[0,30]", "[5,10]", "[15,20]"], highlights: { 0: "checked", 1: "checked", 2: "success" } },
        { type: "stack", label: "heap", values: [20, 30] },
        { type: "variables", entries: [{ name: "15 >= 10?", value: "Yes → reuse room!", highlight: true }, { name: "return", value: 2, highlight: true }, { name: "Time", value: "O(n log n)" }] },
      ],
    },
  ],
};

export default solution;

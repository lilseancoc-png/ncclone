import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Sort + Min Heap",
    timeComplexity: "O((n + q) log n)",
    spaceComplexity: "O(n + q)",
    code: `import heapq

def minInterval(intervals, queries):
    intervals.sort()
    sorted_queries = sorted(enumerate(queries), key=lambda x: x[1])
    heap = []
    result = {}
    i = 0
    for idx, q in sorted_queries:
        while i < len(intervals) and intervals[i][0] <= q:
            l, r = intervals[i]
            heapq.heappush(heap, (r - l + 1, r))
            i += 1
        while heap and heap[0][1] < q:
            heapq.heappop(heap)
        result[idx] = heap[0][0] if heap else -1
    return [result[i] for i in range(len(queries))]`,
    steps: [
      {
        description:
          "For each query point, find the size of the smallest interval containing it (or -1). Brute force is O(n×q). Optimized: sort both intervals (by start) and queries (by value), sweep left to right. For each query, push all intervals with start ≤ query into a min-heap keyed by size. Pop expired intervals (end < query). Heap top = smallest valid interval. intervals=[[1,4],[2,4],[3,6],[4,4]], queries=[2,3,4,5].",
        codeHighlightLines: [3, 4, 5, 6, 7, 8],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "intervals (sorted)", value: "[[1,4],[2,4],[3,6],[4,4]]" },
              { name: "queries (sorted)", value: "[2, 3, 4, 5]" },
              { name: "heap stores", value: "(interval_size, right_end)" },
            ],
          },
        ],
      },
      {
        description:
          "Query q=2: Push intervals with start ≤ 2. [1,4]: size=4, push (4,4). [2,4]: size=3, push (3,4). Next [3,6] has start=3 > 2, stop. Check expired: heap top (3,4) has right=4 ≥ 2, valid. Answer = 3 — interval [2,4] is the smallest containing point 2.",
        codeHighlightLines: [9, 10, 11, 12, 13, 16],
        structures: [
          { type: "stack", label: "min heap (size, right)", values: ["(3, 4)", "(4, 4)"] },
          {
            type: "variables",
            entries: [
              { name: "query", value: 2 },
              { name: "pushed", value: "[1,4] and [2,4]" },
              { name: "answer", value: "3 (interval [2,4])", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Query q=3: Push [3,6] (start=3 ≤ 3, size=4). Heap: [(3,4), (4,4), (4,6)]. No expired (all right ≥ 3). Answer = 3 (still [2,4]). Query q=4: Push [4,4] (start=4 ≤ 4, size=1). Heap top becomes (1,4) — the point interval [4,4] is the tightest fit! Answer = 1.",
        codeHighlightLines: [9, 10, 11, 12, 13, 14, 15, 16],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "q=3 answer", value: "3 (interval [2,4])" },
              { name: "q=4: push [4,4]", value: "size=1 → new heap top!" },
              { name: "q=4 answer", value: "1 (interval [4,4])", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Query q=5: No new intervals to push. Clean expired: pop (1,4) right=4 < 5, expired. Pop (3,4) right=4 < 5, expired. Pop (4,4) right=4 < 5, expired. Heap left: [(4,6)]. Right=6 ≥ 5, valid! Answer = 4 (interval [3,6]). Three intervals expired at once — the sweep only moves forward.",
        codeHighlightLines: [14, 15, 16],
        structures: [
          { type: "stack", label: "heap after cleanup", values: ["(4, 6)"] },
          {
            type: "variables",
            entries: [
              { name: "expired", value: "(1,4), (3,4), (4,4) — all right < 5" },
              { name: "q=5 answer", value: "4 (interval [3,6])", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Map results back to original query order: [3, 3, 1, 4]. The sweep processes queries left to right so each interval is pushed once and popped once. Sorting ensures we never revisit intervals. Time: O((n+q) log n) — sorting + heap ops. Space: O(n+q) for heap and result mapping.",
        codeHighlightLines: [17],
        structures: [
          {
            type: "array",
            label: "result (original query order)",
            values: [3, 3, 1, 4],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: "[3, 3, 1, 4]", highlight: true }, { name: "Time", value: "O((n+q) log n)" }],
          },
        ],
      },
    ],
  },
];

export default solutions;

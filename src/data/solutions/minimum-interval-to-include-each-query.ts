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
          "For each query point, find the size of the smallest interval that contains it (or -1 if none). The brute-force O(n×q) approach checks every interval for every query. The optimized approach: sort both intervals (by start) and queries (by value), then sweep left to right. As we process each query, we push all intervals whose start ≤ query into a min-heap keyed by interval size. Then we pop any intervals whose end < query (expired). The heap top gives the smallest valid interval. intervals=[[1,4],[2,4],[3,6],[4,4]], queries=[2,3,4,5].",
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
          "Query q=2: Push all intervals with start ≤ 2. Interval [1,4]: start=1 ≤ 2, size = 4-1+1 = 4, push (4, 4). Interval [2,4]: start=2 ≤ 2, size = 4-2+1 = 3, push (3, 4). Next interval [3,6] has start=3 > 2, stop. Check expired: heap[0] = (3, right=4). Is 4 < 2? No — still valid. Answer = heap[0][0] = 3. The interval [2,4] (size 3) is the smallest interval containing point 2.",
        codeHighlightLines: [9, 10, 11, 12, 13, 16],
        structures: [
          { type: "stack", label: "min heap (size, right)", values: ["(3, 4)", "(4, 4)"] },
          {
            type: "variables",
            entries: [
              { name: "query", value: 2 },
              { name: "smallest interval", value: "[2,4] size=3", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Query q=3: Push [3,6] (start=3 ≤ 3, size=4). Heap now has [(3,4), (4,4), (4,6)]. No expired intervals (all have right ≥ 3). Answer = 3 (still [2,4]). Query q=4: Push [4,4] (start=4 ≤ 4, size=1). Heap top becomes (1, 4) — the point interval [4,4] is the tightest fit! Answer = 1. The heap efficiently tracks all candidate intervals, and the min-heap property ensures the smallest one is always on top.",
        codeHighlightLines: [9, 10, 11, 12, 13, 14, 15, 16],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "q=3 answer", value: "3 (interval [2,4])" },
              { name: "q=4 answer", value: "1 (interval [4,4])", highlight: true },
              { name: "heap after q=4", value: "[(1,4),(3,4),(4,4),(4,6)]" },
            ],
          },
        ],
      },
      {
        description:
          "Query q=5: No new intervals to push (all have been added). Now clean up expired: pop (1,4) — right=4 < 5, expired. Pop (3,4) — right=4 < 5, expired. Pop (4,4) — right=4 < 5, expired. Heap left: [(4,6)]. Right=6 ≥ 5, valid! Answer = 4 (interval [3,6]). Map results back to original query order: [3, 3, 1, 4]. Time: O((n+q) log n) — sorting + heap operations. Space: O(n+q).",
        codeHighlightLines: [14, 15, 16, 17],
        structures: [
          {
            type: "array",
            label: "result (original query order)",
            values: [3, 3, 1, 4],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success" },
          },
          {
            type: "variables",
            entries: [
              { name: "Time", value: "O((n+q) log n)" },
              { name: "Space", value: "O(n + q)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

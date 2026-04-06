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
          "For each query point, find the smallest interval containing it. Sort intervals by start, sort queries by value. Process queries left to right: push all intervals starting <= query into a min-heap (by size). Pop expired intervals. Heap top = smallest valid interval.",
        codeHighlightLines: [3, 4, 5, 6, 7, 8],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "intervals", value: "[[1,4],[2,4],[3,6],[4,4]]" },
              { name: "queries", value: "[2, 3, 4, 5]" },
            ],
          },
        ],
      },
      {
        description:
          "Query q=2: Push intervals starting <=2: [1,4](size=4), [2,4](size=3). Heap top = (3, r=4). Answer for q=2 is 3.",
        codeHighlightLines: [9, 10, 11, 12, 13, 16],
        structures: [
          { type: "stack", label: "min heap (size, right)", values: ["(3,4)", "(4,4)"] },
          {
            type: "variables",
            entries: [
              { name: "query", value: 2 },
              { name: "answer", value: 3, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Query q=3: Push [3,6](size=4). Heap: [(3,4),(4,4),(4,6)]. No expired. Answer=3. Query q=4: Push [4,4](size=1). Heap top=(1,4). Answer=1.",
        codeHighlightLines: [10, 11, 12, 14, 15, 16],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "q=3 answer", value: 3 },
              { name: "q=4 answer", value: 1, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Query q=5: Pop expired intervals with right < 5: (3,4) and (1,4) and (4,4) gone. Heap: [(4,6)]. Answer=4. Final: [3, 3, 1, 4].",
        codeHighlightLines: [14, 15, 16, 17],
        structures: [
          {
            type: "array",
            label: "result",
            values: [3, 3, 1, 4],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success" },
          },
        ],
      },
    ],
  },
];

export default solutions;

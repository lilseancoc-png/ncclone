import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Dijkstra's / Min-Heap BFS",
    timeComplexity: "O(n² log n)",
    spaceComplexity: "O(n²)",
    code: `import heapq

def swimInWater(grid):
    n = len(grid)
    visited = set()
    heap = [(grid[0][0], 0, 0)]
    while heap:
        t, r, c = heapq.heappop(heap)
        if r == n - 1 and c == n - 1:
            return t
        if (r, c) in visited:
            continue
        visited.add((r, c))
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in visited:
                heapq.heappush(heap, (max(t, grid[nr][nc]), nr, nc))
    return -1`,
    steps: [
      {
        description:
          "Find the minimum time to swim from (0,0) to (n-1,n-1). At time t, you can swim through cells with elevation <= t. This is a shortest-path problem where the cost is the max elevation along the path. Use Dijkstra with a min-heap.",
        codeHighlightLines: [3, 4, 5, 6],
        structures: [
          {
            type: "array",
            label: "grid row 0",
            values: [0, 2],
            highlights: { 0: "active" },
          },
          {
            type: "array",
            label: "grid row 1",
            values: [3, 1],
            highlights: {},
          },
        ],
      },
      {
        description:
          "Start: heap = [(0, 0, 0)]. Pop (0, 0, 0). Push neighbors: (max(0,2), 0, 1) = (2, 0, 1) and (max(0,3), 1, 0) = (3, 1, 0).",
        codeHighlightLines: [7, 8, 13, 14, 15, 16, 17],
        structures: [
          { type: "stack", label: "min heap", values: ["(2,0,1)", "(3,1,0)"] },
          { type: "set", label: "visited", values: ["(0,0)"] },
        ],
      },
      {
        description:
          "Pop (2, 0, 1). Push (max(2,1), 1, 1) = (2, 1, 1). Pop (2, 1, 1) — this is the destination! Return t=2. We only need to wait until time 2 to swim the path (0,0)→(0,1)→(1,1).",
        codeHighlightLines: [8, 9, 10],
        structures: [
          {
            type: "array",
            label: "grid row 0",
            values: [0, 2],
            highlights: { 0: "success", 1: "success" },
          },
          {
            type: "array",
            label: "grid row 1",
            values: [3, 1],
            highlights: { 1: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: 2, highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

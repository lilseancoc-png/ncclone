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
          "Find the minimum time to swim from top-left (0,0) to bottom-right (n-1,n-1). At time t, you can swim through any cell with elevation ≤ t. The key insight: this is a shortest-path problem, but instead of minimizing total distance, we minimize the maximum elevation along the path. Use Dijkstra's algorithm with a min-heap — always expand the cell reachable with the lowest time. grid = [[0,2],[3,1]].",
        codeHighlightLines: [3, 4, 5, 6],
        structures: [
          {
            type: "matrix",
            label: "grid (elevations)",
            rows: [
              [{ value: 0, highlight: "active" }, { value: 2 }],
              [{ value: 3 }, { value: 1 }],
            ],
          },
          { type: "variables", entries: [{ name: "start", value: "(0,0) elev=0" }, { name: "goal", value: "(1,1) elev=1" }] },
        ],
      },
      {
        description:
          "Start: push (t=0, r=0, c=0) onto the min-heap. Pop (0, 0, 0) — we're at cell (0,0) with max elevation 0. Mark visited. Push neighbors: cell (0,1) has elevation 2, so we'd need time max(0,2)=2 to reach it. Cell (1,0) has elevation 3, needing time max(0,3)=3. Heap: [(2,0,1), (3,1,0)]. The heap always gives us the cell reachable at the earliest time.",
        codeHighlightLines: [7, 8, 13, 14, 15, 16, 17],
        structures: [
          {
            type: "matrix",
            label: "grid",
            rows: [
              [{ value: 0, highlight: "checked" }, { value: 2, highlight: "active" }],
              [{ value: 3, highlight: "active" }, { value: 1 }],
            ],
          },
          { type: "stack", label: "min heap", values: ["(t=2, 0,1)", "(t=3, 1,0)"] },
          { type: "set", label: "visited", values: ["(0,0)"] },
        ],
      },
      {
        description:
          "Pop (2, 0, 1) — cell (0,1) reachable at t=2. Push neighbor (1,1): max(2, grid[1][1]) = max(2, 1) = 2. Heap: [(2,1,1), (3,1,0)]. Pop (2, 1, 1) — this is the destination (1,1)! Return t=2. The optimal path is (0,0)→(0,1)→(1,1) with max elevation 2. We wait until time 2, then swim through cells with elevations 0, 2, and 1 — all ≤ 2. The path through (1,0) would require t=3 (higher elevation), so Dijkstra correctly avoided it.",
        codeHighlightLines: [8, 9, 10],
        structures: [
          {
            type: "matrix",
            label: "grid — optimal path",
            rows: [
              [{ value: 0, highlight: "success" }, { value: 2, highlight: "success" }],
              [{ value: 3 }, { value: 1, highlight: "success" }],
            ],
          },
          { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "path", value: "(0,0)→(0,1)→(1,1)" }, { name: "Time", value: "O(n² log n)" }, { name: "Space", value: "O(n²)" }] },
        ],
      },
    ],
  },
];

export default solutions;

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
          "Find the minimum time to swim from (0,0) to (n-1,n-1). At time t, you can swim through any cell with elevation ≤ t. This is a shortest-path problem where we minimize the MAXIMUM elevation along the path (not total distance). Use Dijkstra's with a min-heap — always expand the cell reachable at the lowest time. grid = [[0,2],[3,1]].",
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
          "Start: push (t=0, 0, 0) — we can be at cell (0,0) at time 0. Pop (0, 0, 0). Not the destination. Mark (0,0) visited. Explore neighbors: cell (0,1) has elevation 2, so reaching it requires time max(0, 2) = 2. Cell (1,0) has elevation 3, requiring time max(0, 3) = 3. Push both onto the heap.",
        codeHighlightLines: [7, 8, 11, 12, 13, 14, 15, 16, 17],
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
          "Pop (2, 0, 1) — cell (0,1) reachable at t=2. Not destination. Mark visited. Explore neighbors: (0,0) already visited, skip. (1,1) has elevation 1, needs max(2, 1) = 2. Push (2, 1, 1). The max function is key — even though cell (1,1) has low elevation, we still need t=2 because we had to pass through elevation 2 to get here.",
        codeHighlightLines: [7, 8, 11, 14, 15, 16, 17],
        structures: [
          {
            type: "matrix",
            label: "grid",
            rows: [
              [{ value: 0, highlight: "checked" }, { value: 2, highlight: "checked" }],
              [{ value: 3 }, { value: 1, highlight: "active" }],
            ],
          },
          { type: "stack", label: "min heap", values: ["(t=2, 1,1)", "(t=3, 1,0)"] },
          { type: "set", label: "visited", values: ["(0,0)", "(0,1)"] },
        ],
      },
      {
        description:
          "Pop (2, 1, 1) — cell (1,1) is the destination! Return t=2. The optimal path is (0,0)→(0,1)→(1,1) with max elevation 2. We wait until time 2, then swim through cells 0, 2, 1 — all ≤ 2. The path through (1,0) would require t=3 (elevation 3), so Dijkstra correctly avoided it.",
        codeHighlightLines: [8, 9, 10],
        structures: [
          {
            type: "matrix",
            label: "grid — optimal path found",
            rows: [
              [{ value: 0, highlight: "success" }, { value: 2, highlight: "success" }],
              [{ value: 3 }, { value: 1, highlight: "success" }],
            ],
          },
          { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "path", value: "(0,0)→(0,1)→(1,1)" }] },
        ],
      },
      {
        description:
          "Why Dijkstra? Standard BFS finds shortest distance (sum of edges). Here we need the path that minimizes the maximum edge weight — a 'minimax path' problem. The heap key max(t, grid[nr][nc]) means: to reach neighbor, we need at least the current time OR the neighbor's elevation, whichever is larger. Dijkstra guarantees when we pop the destination, we've found the optimal time. Time: O(n² log n) — each of n² cells pushed/popped from heap. Space: O(n²) for visited set and heap.",
        codeHighlightLines: [17],
        structures: [
          { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "Time", value: "O(n² log n)" }, { name: "Space", value: "O(n²)" }, { name: "variant", value: "minimax path (not shortest path)" }] },
        ],
      },
    ],
  },
];

export default solutions;

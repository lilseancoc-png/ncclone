import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Multi-source BFS",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    code: `from collections import deque

def wallsAndGates(rooms):
    if not rooms:
        return
    rows, cols = len(rooms), len(rooms[0])
    INF = 2147483647
    queue = deque()
    for r in range(rows):
        for c in range(cols):
            if rooms[r][c] == 0:
                queue.append((r, c))
    while queue:
        r, c = queue.popleft()
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] == INF:
                rooms[nr][nc] = rooms[r][c] + 1
                queue.append((nr, nc))`,
    steps: [
      {
        description:
          "Fill each empty room (INF) with the distance to its nearest gate (0). Walls are -1. The naive approach: BFS from each room — O(m²n²). Optimal: multi-source BFS from ALL gates simultaneously. Enqueue every gate at distance 0, then expand outward. Each room is filled the first time it's reached — guaranteed shortest distance by BFS.",
        codeHighlightLines: [3, 6, 7, 8, 9, 10, 11, 12],
        structures: [
          {
            type: "matrix",
            label: "rooms (initial)",
            rows: [
              [{ value: "INF" }, { value: -1, highlight: "checked" }, { value: 0, highlight: "success" }, { value: "INF" }],
              [{ value: "INF" }, { value: "INF" }, { value: "INF" }, { value: -1, highlight: "checked" }],
              [{ value: 0, highlight: "success" }, { value: -1, highlight: "checked" }, { value: "INF" }, { value: "INF" }],
            ],
          },
          { type: "variables", entries: [{ name: "gates", value: "(0,2) and (2,0)" }, { name: "queue", value: "[(0,2), (2,0)]" }] },
        ],
      },
      {
        description:
          "Level 0 — Process gates: Dequeue (0,2) and (2,0). These are the sources at distance 0. From gate (0,2): check all 4 neighbors. (0,1) is wall — skip. (0,3) is INF → set to 1, enqueue. (1,2) is INF → set to 1, enqueue. From gate (2,0): (1,0) is INF → set to 1, enqueue. (2,1) is wall — skip.",
        codeHighlightLines: [13, 14, 15, 16, 17, 18, 19],
        structures: [
          {
            type: "matrix",
            label: "rooms (after level 1)",
            rows: [
              [{ value: "INF" }, { value: -1, highlight: "checked" }, { value: 0, highlight: "success" }, { value: 1, highlight: "active" }],
              [{ value: 1, highlight: "active" }, { value: "INF" }, { value: 1, highlight: "active" }, { value: -1, highlight: "checked" }],
              [{ value: 0, highlight: "success" }, { value: -1, highlight: "checked" }, { value: "INF" }, { value: "INF" }],
            ],
          },
          { type: "variables", entries: [{ name: "distance", value: 1 }, { name: "queue", value: "[(0,3), (1,2), (1,0)]" }] },
        ],
      },
      {
        description:
          "Level 2: Process (0,3), (1,2), (1,0). From (1,0): neighbor (0,0) is INF → set to 2. From (1,2): neighbor (2,2) is INF → set to 2, and (1,1) is INF → set to 2. From (0,3): neighbors are wall/visited. Each room gets the shortest distance because BFS explores level by level — a room at distance 2 can't be reached faster.",
        codeHighlightLines: [14, 15, 16, 17, 18, 19],
        structures: [
          {
            type: "matrix",
            label: "rooms (after level 2)",
            rows: [
              [{ value: 2, highlight: "active" }, { value: -1, highlight: "checked" }, { value: 0, highlight: "success" }, { value: 1, highlight: "success" }],
              [{ value: 1, highlight: "success" }, { value: 2, highlight: "active" }, { value: 1, highlight: "success" }, { value: -1, highlight: "checked" }],
              [{ value: 0, highlight: "success" }, { value: -1, highlight: "checked" }, { value: 2, highlight: "active" }, { value: "INF" }],
            ],
          },
          { type: "variables", entries: [{ name: "distance", value: 2 }, { name: "queue", value: "[(0,0), (1,1), (2,2)]" }] },
        ],
      },
      {
        description:
          "Level 3: From (2,2): neighbor (2,3) is INF → set to 3. From (0,0) and (1,1): no unvisited INF neighbors remain. Queue drains and BFS completes. Every room now contains its shortest distance to the nearest gate.",
        codeHighlightLines: [17, 18, 19],
        structures: [
          {
            type: "matrix",
            label: "rooms (after level 3)",
            rows: [
              [{ value: 2, highlight: "success" }, { value: -1, highlight: "checked" }, { value: 0, highlight: "success" }, { value: 1, highlight: "success" }],
              [{ value: 1, highlight: "success" }, { value: 2, highlight: "success" }, { value: 1, highlight: "success" }, { value: -1, highlight: "checked" }],
              [{ value: 0, highlight: "success" }, { value: -1, highlight: "checked" }, { value: 2, highlight: "success" }, { value: 3, highlight: "active" }],
            ],
          },
        ],
      },
      {
        description:
          "Final result: every room has the distance to its nearest gate. Room (2,3) is 3 steps from the nearest gate. Why multi-source BFS? Starting from all gates simultaneously means the 'wavefront' expands at equal speed from every gate. The first wave to reach a room is guaranteed to be from the nearest gate. Each cell is visited exactly once, so Time: O(m×n). Space: O(m×n) for the queue.",
        codeHighlightLines: [13, 14, 15, 16, 17, 18, 19],
        structures: [
          {
            type: "matrix",
            label: "rooms (complete)",
            rows: [
              [{ value: 2, highlight: "success" }, { value: -1, highlight: "checked" }, { value: 0, highlight: "success" }, { value: 1, highlight: "success" }],
              [{ value: 1, highlight: "success" }, { value: 2, highlight: "success" }, { value: 1, highlight: "success" }, { value: -1, highlight: "checked" }],
              [{ value: 0, highlight: "success" }, { value: -1, highlight: "checked" }, { value: 2, highlight: "success" }, { value: 3, highlight: "success" }],
            ],
          },
          { type: "variables", entries: [{ name: "Time", value: "O(m × n)" }, { name: "Space", value: "O(m × n)" }, { name: "key insight", value: "BFS from gates, not rooms" }] },
        ],
      },
    ],
  },
];

export default solutions;

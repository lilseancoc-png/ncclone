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
          "Fill each empty room (INF) with the distance to its nearest gate (0). Walls (-1) are impassable. The naive approach: BFS from each room to find its nearest gate — O(m²n²). The optimal approach: multi-source BFS from ALL gates simultaneously. Enqueue every gate, then expand outward level by level. Each room gets filled the first time it's reached, which is guaranteed to be the shortest path (BFS property). This processes every cell exactly once — O(mn).",
        codeHighlightLines: [3, 6, 7, 8, 9, 10, 11, 12],
        structures: [
          {
            type: "array",
            label: "row 0",
            values: ["INF", -1, 0, "INF"],
            highlights: { 2: "success" },
          },
          {
            type: "array",
            label: "row 1",
            values: ["INF", "INF", "INF", -1],
            highlights: {},
          },
          {
            type: "array",
            label: "row 2",
            values: [0, -1, "INF", "INF"],
            highlights: { 0: "success" },
          },
          { type: "variables", entries: [{ name: "gates", value: "(0,2) and (2,0)" }, { name: "queue", value: "[(0,2), (2,0)]" }] },
        ],
      },
      {
        description:
          "Level 1 (distance=1): Process all cells in the queue. From gate (0,2): neighbors (0,1) is wall, (0,3) is INF → set to 1, (1,2) is INF → set to 1. From gate (2,0): neighbors (1,0) is INF → set to 1, (2,1) is wall. Key insight: when multiple gates spread simultaneously, whichever reaches a room first gives the shortest distance. Room (1,0) is closer to gate (2,0) and gets distance 1 from that gate.",
        codeHighlightLines: [13, 14, 15, 16, 17, 18, 19],
        structures: [
          {
            type: "array",
            label: "row 0",
            values: ["INF", -1, 0, 1],
            highlights: { 3: "active" },
          },
          {
            type: "array",
            label: "row 1",
            values: [1, "INF", 1, -1],
            highlights: { 0: "active", 2: "active" },
          },
          {
            type: "array",
            label: "row 2",
            values: [0, -1, "INF", "INF"],
            highlights: {},
          },
        ],
      },
      {
        description:
          "Level 2 (distance=2): From (1,0): neighbor (0,0) is INF → set to 2. (1,1) is wall. From (1,2): (2,2) is INF → set to 2. (1,1) is wall, (1,3) is wall. Level 3: From (2,2): (2,3) is INF → set to 3. All rooms now have their shortest distance to a gate. Room (0,0) = 2 (via gate at (2,0) wouldn't be shortest — it's actually 2 steps from gate (0,2) going through (0,3) and... actually (1,0)→(0,0) = distance 2 from gate (2,0)). Time: O(mn). Space: O(mn) for the queue.",
        codeHighlightLines: [17, 18, 19],
        structures: [
          {
            type: "array",
            label: "row 0",
            values: [2, -1, 0, 1],
            highlights: { 0: "success" },
          },
          {
            type: "array",
            label: "row 1",
            values: [1, -1, 1, -1],
            highlights: { 0: "success", 2: "success" },
          },
          {
            type: "array",
            label: "row 2",
            values: [0, -1, 2, 3],
            highlights: { 2: "success", 3: "success" },
          },
          { type: "variables", entries: [{ name: "Time", value: "O(m × n)" }, { name: "Space", value: "O(m × n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

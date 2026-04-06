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
          "Fill each empty room with the distance to its nearest gate. Instead of BFS from each room (slow), do multi-source BFS from ALL gates simultaneously. This spreads outward level by level, and each room gets the shortest distance naturally.",
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
        ],
      },
      {
        description:
          "Start BFS from both gates (0,2) and (2,0). Level 1: neighbors of gates get distance 1. (0,2)→(0,3)=1, (1,2)=1. (2,0)→(1,0)=1, (2,0) already 0.",
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
          "Level 2: (1,0)→(0,0)=2. (1,2)→(2,2)=2, (1,1) is wall. Level 3: (2,2)→(2,3)=3. All rooms filled!",
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
            highlights: {},
          },
          {
            type: "array",
            label: "row 2",
            values: [0, -1, 2, 3],
            highlights: { 2: "success", 3: "success" },
          },
        ],
      },
    ],
  },
];

export default solutions;

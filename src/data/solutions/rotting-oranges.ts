import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Multi-Source BFS",
  timeComplexity: "O(m × n)",
  spaceComplexity: "O(m × n)",
  code: `from collections import deque

def oranges_rotting(grid):
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1
    if fresh == 0:
        return 0
    minutes = 0
    while queue:
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = r + dr, c + dc
                if 0<=nr<rows and 0<=nc<cols and grid[nr][nc]==1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    queue.append((nr, nc))
        minutes += 1
    return minutes - 1 if fresh == 0 else -1`,
  steps: [
    {
      description:
        "Find minimum minutes until all oranges rot, or -1 if impossible. Rotten oranges (2) spread to adjacent fresh oranges (1) each minute. This is multi-source BFS — start from ALL rotten oranges simultaneously. Grid: [[2,1,1],[1,1,0],[0,1,1]].",
      codeHighlightLines: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      structures: [
        { type: "array", label: "row 0", values: [2, 1, 1], highlights: { 0: "found" } },
        { type: "array", label: "row 1", values: [1, 1, 0] },
        { type: "array", label: "row 2", values: [0, 1, 1] },
        { type: "variables", entries: [{ name: "fresh", value: 6 }, { name: "queue", value: "[(0,0)]" }] },
      ],
    },
    {
      description:
        "Minute 1: Process (0,0). Spread rot to neighbors (0,1) and (1,0). fresh=4. These newly rotten oranges will spread in the next minute.",
      codeHighlightLines: [16, 17, 18, 19, 20, 21, 22, 23, 24],
      structures: [
        { type: "array", label: "row 0", values: [2, 2, 1], highlights: { 0: "checked", 1: "found" } },
        { type: "array", label: "row 1", values: [2, 1, 0], highlights: { 0: "found" } },
        { type: "array", label: "row 2", values: [0, 1, 1] },
        { type: "variables", entries: [{ name: "minutes", value: 1 }, { name: "fresh", value: 4, highlight: true }] },
      ],
    },
    {
      description:
        "Minute 2: Process (0,1) and (1,0). (0,1) rots (0,2). (1,0) rots (1,1). fresh=2.",
      codeHighlightLines: [17, 18, 19, 20, 21, 22, 23, 24],
      structures: [
        { type: "array", label: "row 0", values: [2, 2, 2], highlights: { 2: "found" } },
        { type: "array", label: "row 1", values: [2, 2, 0], highlights: { 1: "found" } },
        { type: "array", label: "row 2", values: [0, 1, 1] },
        { type: "variables", entries: [{ name: "minutes", value: 2 }, { name: "fresh", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "Minute 3: Process (0,2) and (1,1). (1,1) rots (2,1). fresh=1. Minute 4: Process (2,1). Rots (2,2). fresh=0! All oranges rotten.",
      codeHighlightLines: [17, 18, 19, 20, 21, 22, 23, 24],
      structures: [
        { type: "array", label: "row 0", values: [2, 2, 2], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "row 1", values: [2, 2, 0], highlights: { 0: "success", 1: "success" } },
        { type: "array", label: "row 2", values: [0, 2, 2], highlights: { 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "minutes", value: 4 }, { name: "fresh", value: 0 }] },
      ],
    },
    {
      description:
        "fresh == 0, so all oranges rotted. Return minutes-1 = 4. (We subtract 1 because the last increment happens after the final BFS level.) Time: O(m×n) — each cell processed at most once. Space: O(m×n) for the queue in the worst case.",
      codeHighlightLines: [26],
      structures: [
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }] },
      ],
    },
  ],
};

export default solution;

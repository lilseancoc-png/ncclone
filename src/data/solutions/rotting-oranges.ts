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
        "Find minimum minutes until all oranges rot. Rotten (2) spreads to adjacent fresh (1) each minute. 0 = empty. Start BFS from all rotten oranges simultaneously.",
      codeHighlightLines: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      structures: [
        {
          type: "matrix",
          label: "grid (2=rotten, 1=fresh, 0=empty)",
          rows: [
            [{ value: 2, highlight: "rotten" }, { value: 1, highlight: "fresh" }, { value: 1, highlight: "fresh" }],
            [{ value: 1, highlight: "fresh" }, { value: 1, highlight: "fresh" }, { value: 0 }],
            [{ value: 0 }, { value: 1, highlight: "fresh" }, { value: 1, highlight: "fresh" }],
          ],
        },
        { type: "variables", entries: [{ name: "fresh", value: 6 }, { name: "queue", value: "[(0,0)]" }] },
      ],
    },
    {
      description:
        "Minute 1: Process (0,0). Rot spreads to (0,1) and (1,0). fresh = 4.",
      codeHighlightLines: [16, 17, 18, 19, 20, 21, 22, 23, 24],
      structures: [
        {
          type: "matrix",
          label: "after minute 1",
          rows: [
            [{ value: 2, highlight: "checked" }, { value: 2, highlight: "rotten" }, { value: 1, highlight: "fresh" }],
            [{ value: 2, highlight: "rotten" }, { value: 1, highlight: "fresh" }, { value: 0 }],
            [{ value: 0 }, { value: 1, highlight: "fresh" }, { value: 1, highlight: "fresh" }],
          ],
        },
        { type: "variables", entries: [{ name: "minutes", value: 1 }, { name: "fresh", value: 4, highlight: true }] },
      ],
    },
    {
      description:
        "Minute 2: (0,1) rots (0,2). (1,0) rots (1,1). fresh = 2.",
      codeHighlightLines: [17, 18, 19, 20, 21, 22, 23, 24],
      structures: [
        {
          type: "matrix",
          label: "after minute 2",
          rows: [
            [{ value: 2, highlight: "checked" }, { value: 2, highlight: "checked" }, { value: 2, highlight: "rotten" }],
            [{ value: 2, highlight: "checked" }, { value: 2, highlight: "rotten" }, { value: 0 }],
            [{ value: 0 }, { value: 1, highlight: "fresh" }, { value: 1, highlight: "fresh" }],
          ],
        },
        { type: "variables", entries: [{ name: "minutes", value: 2 }, { name: "fresh", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "Minute 3: (1,1) rots (2,1). Minute 4: (2,1) rots (2,2). fresh = 0. All oranges rotten!",
      codeHighlightLines: [17, 18, 19, 20, 21, 22, 23, 24],
      structures: [
        {
          type: "matrix",
          label: "all rotten — minute 4",
          rows: [
            [{ value: 2, highlight: "success" }, { value: 2, highlight: "success" }, { value: 2, highlight: "success" }],
            [{ value: 2, highlight: "success" }, { value: 2, highlight: "success" }, { value: 0 }],
            [{ value: 0 }, { value: 2, highlight: "success" }, { value: 2, highlight: "success" }],
          ],
        },
        { type: "variables", entries: [{ name: "minutes", value: 4 }, { name: "fresh", value: 0 }] },
      ],
    },
    {
      description:
        "fresh == 0 → return minutes - 1 = 4. Time: O(m×n). Space: O(m×n) for the queue.",
      codeHighlightLines: [26],
      structures: [
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }] },
      ],
    },
  ],
};

export default solution;

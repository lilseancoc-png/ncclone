import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def numIslands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if grid[r][c] != "1":
            return
        grid[r][c] = "0"  # mark visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count += 1
                dfs(r, c)
    return count`,
  steps: [
    {
      description:
        "We have a 4x5 grid of '1's (land) and '0's (water). We want to count the number of islands — groups of connected '1's.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        {
          type: "matrix",
          label: "grid",
          rows: [
            [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 0, highlight: "water" }],
            [{ value: 1 }, { value: 1 }, { value: 0, highlight: "water" }, { value: 1 }, { value: 0, highlight: "water" }],
            [{ value: 1 }, { value: 1 }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }],
            [{ value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }],
          ],
        },
        { type: "variables", entries: [{ name: "count", value: 0 }] },
      ],
    },
    {
      description:
        "grid[0][0] = '1' — found a new island! Increment count to 1. Begin DFS to mark all connected land as visited.",
      codeHighlightLines: [19, 20, 21, 22],
      structures: [
        {
          type: "matrix",
          label: "grid — island 1 found",
          rows: [
            [{ value: 1, highlight: "found" }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 0, highlight: "water" }],
            [{ value: 1 }, { value: 1 }, { value: 0, highlight: "water" }, { value: 1 }, { value: 0, highlight: "water" }],
            [{ value: 1 }, { value: 1 }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }],
            [{ value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }],
          ],
        },
        { type: "variables", entries: [{ name: "count", value: 1, highlight: true }] },
      ],
    },
    {
      description:
        "DFS spreads through all connected '1's, marking each as '0' (visited). The first island covers 7 cells.",
      codeHighlightLines: [10, 11, 12, 13, 14, 15],
      structures: [
        {
          type: "matrix",
          label: "grid — DFS marking island 1",
          rows: [
            [{ value: 0, highlight: "checked" }, { value: 0, highlight: "checked" }, { value: 0, highlight: "checked" }, { value: 1 }, { value: 0, highlight: "water" }],
            [{ value: 0, highlight: "checked" }, { value: 0, highlight: "checked" }, { value: 0, highlight: "water" }, { value: 1 }, { value: 0, highlight: "water" }],
            [{ value: 0, highlight: "checked" }, { value: 0, highlight: "checked" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }],
            [{ value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }],
          ],
        },
        { type: "variables", entries: [{ name: "count", value: 1 }] },
      ],
    },
    {
      description:
        "Scanning continues. grid[0][3] = '1' — a new island! Increment count to 2. DFS marks grid[0][3] and grid[1][3].",
      codeHighlightLines: [19, 20, 21, 22],
      structures: [
        {
          type: "matrix",
          label: "grid — island 2 found",
          rows: [
            [{ value: 0, highlight: "checked" }, { value: 0, highlight: "checked" }, { value: 0, highlight: "checked" }, { value: 1, highlight: "found" }, { value: 0, highlight: "water" }],
            [{ value: 0, highlight: "checked" }, { value: 0, highlight: "checked" }, { value: 0, highlight: "water" }, { value: 1, highlight: "active" }, { value: 0, highlight: "water" }],
            [{ value: 0, highlight: "checked" }, { value: 0, highlight: "checked" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }],
            [{ value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }],
          ],
        },
        { type: "variables", entries: [{ name: "count", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "All cells scanned. The grid had 2 islands: one large (7 cells) and one small (2 cells). Return 2. Time: O(m*n), Space: O(m*n) for recursion.",
      codeHighlightLines: [24],
      structures: [
        {
          type: "matrix",
          label: "grid — all islands found",
          rows: [
            [{ value: 0, highlight: "success" }, { value: 0, highlight: "success" }, { value: 0, highlight: "success" }, { value: 0, highlight: "success" }, { value: 0, highlight: "water" }],
            [{ value: 0, highlight: "success" }, { value: 0, highlight: "success" }, { value: 0, highlight: "water" }, { value: 0, highlight: "success" }, { value: 0, highlight: "water" }],
            [{ value: 0, highlight: "success" }, { value: 0, highlight: "success" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }],
            [{ value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }, { value: 0, highlight: "water" }],
          ],
        },
        { type: "variables", entries: [{ name: "return", value: 2, highlight: true }] },
      ],
    },
  ],
};

export default solution;

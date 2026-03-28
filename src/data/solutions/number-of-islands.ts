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
        "We have a 4x5 grid of '1's (land) and '0's (water). We want to count the number of islands. An island is a group of connected '1's.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "Row 0", values: [1, 1, 1, 1, 0], highlights: {} },
        { type: "array", label: "Row 1", values: [1, 1, 0, 1, 0], highlights: {} },
        { type: "array", label: "Row 2", values: [1, 1, 0, 0, 0], highlights: {} },
        { type: "array", label: "Row 3", values: [0, 0, 0, 0, 0], highlights: {} },
        { type: "variables", entries: [{ name: "count", value: 0 }] },
      ],
    },
    {
      description:
        "Start scanning from top-left. grid[0][0] = '1', so we found a new island! Increment count to 1 and begin DFS to mark all connected land.",
      codeHighlightLines: [19, 20, 21, 22],
      structures: [
        { type: "array", label: "Row 0", values: [1, 1, 1, 1, 0], highlights: { 0: "found" } },
        { type: "array", label: "Row 1", values: [1, 1, 0, 1, 0], highlights: {} },
        { type: "array", label: "Row 2", values: [1, 1, 0, 0, 0], highlights: {} },
        { type: "array", label: "Row 3", values: [0, 0, 0, 0, 0], highlights: {} },
        { type: "variables", entries: [{ name: "count", value: 1, highlight: true }] },
      ],
    },
    {
      description:
        "DFS visits grid[0][0] and marks it '0' (visited). Then it explores all 4 neighbors recursively: down, up, right, left.",
      codeHighlightLines: [10, 11, 12, 13],
      structures: [
        { type: "array", label: "Row 0", values: [0, 1, 1, 1, 0], highlights: { 0: "checked" } },
        { type: "array", label: "Row 1", values: [1, 1, 0, 1, 0], highlights: {} },
        { type: "array", label: "Row 2", values: [1, 1, 0, 0, 0], highlights: {} },
        { type: "array", label: "Row 3", values: [0, 0, 0, 0, 0], highlights: {} },
        { type: "variables", entries: [{ name: "count", value: 1 }] },
      ],
    },
    {
      description:
        "DFS continues spreading through all connected '1's. The entire first island (7 cells) gets marked as visited ('0').",
      codeHighlightLines: [10, 11, 12, 13, 14, 15],
      structures: [
        { type: "array", label: "Row 0", values: [0, 0, 0, 1, 0], highlights: { 0: "checked", 1: "checked", 2: "checked" } },
        { type: "array", label: "Row 1", values: [0, 0, 0, 1, 0], highlights: { 0: "checked", 1: "checked" } },
        { type: "array", label: "Row 2", values: [0, 0, 0, 0, 0], highlights: { 0: "checked", 1: "checked" } },
        { type: "array", label: "Row 3", values: [0, 0, 0, 0, 0], highlights: {} },
        { type: "variables", entries: [{ name: "count", value: 1 }] },
      ],
    },
    {
      description:
        "Scanning continues. grid[0][3] = '1' — a new island! Increment count to 2 and start DFS from this cell.",
      codeHighlightLines: [19, 20, 21, 22],
      structures: [
        { type: "array", label: "Row 0", values: [0, 0, 0, 1, 0], highlights: { 3: "found" } },
        { type: "array", label: "Row 1", values: [0, 0, 0, 1, 0], highlights: {} },
        { type: "array", label: "Row 2", values: [0, 0, 0, 0, 0], highlights: {} },
        { type: "array", label: "Row 3", values: [0, 0, 0, 0, 0], highlights: {} },
        { type: "variables", entries: [{ name: "count", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "DFS marks grid[0][3] and grid[1][3] as visited. This second island has 2 cells connected vertically.",
      codeHighlightLines: [10, 11, 12, 13],
      structures: [
        { type: "array", label: "Row 0", values: [0, 0, 0, 0, 0], highlights: { 3: "checked" } },
        { type: "array", label: "Row 1", values: [0, 0, 0, 0, 0], highlights: { 3: "checked" } },
        { type: "array", label: "Row 2", values: [0, 0, 0, 0, 0], highlights: {} },
        { type: "array", label: "Row 3", values: [0, 0, 0, 0, 0], highlights: {} },
        { type: "variables", entries: [{ name: "count", value: 2 }] },
      ],
    },
    {
      description:
        "Scanning finishes — no more '1's remain. The grid had 2 islands: one large island of 7 cells and one smaller island of 2 cells. Return 2.",
      codeHighlightLines: [24],
      structures: [
        { type: "array", label: "Row 0", values: [0, 0, 0, 0, 0], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "array", label: "Row 1", values: [0, 0, 0, 0, 0], highlights: { 0: "success", 1: "success", 3: "success" } },
        { type: "array", label: "Row 2", values: [0, 0, 0, 0, 0], highlights: { 0: "success", 1: "success" } },
        { type: "array", label: "Row 3", values: [0, 0, 0, 0, 0], highlights: {} },
        { type: "variables", entries: [{ name: "return", value: 2, highlight: true }] },
      ],
    },
  ],
};

export default solution;

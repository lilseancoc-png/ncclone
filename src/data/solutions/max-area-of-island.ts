import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "DFS Flood Fill",
  timeComplexity: "O(m × n)",
  spaceComplexity: "O(m × n)",
  code: `def maxAreaOfIsland(grid):
    rows, cols = len(grid), len(grid[0])
    max_area = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return 0
        if grid[r][c] != 1:
            return 0
        grid[r][c] = 0  # mark visited
        return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                max_area = max(max_area, dfs(r, c))
    return max_area`,
  steps: [
    {
      description:
        "We have a 4x5 grid of 1s (land) and 0s (water). We want to find the largest island by area. DFS flood fill counts each island's connected cells.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "Row 0", values: [0, 0, 1, 0, 0], highlights: {} },
        { type: "array", label: "Row 1", values: [0, 1, 1, 1, 0], highlights: {} },
        { type: "array", label: "Row 2", values: [0, 0, 1, 0, 0], highlights: {} },
        { type: "array", label: "Row 3", values: [1, 0, 0, 0, 0], highlights: {} },
        { type: "variables", entries: [{ name: "max_area", value: 0 }] },
      ],
    },
    {
      description:
        "Scan finds grid[0][2] = 1. Start DFS from (0,2). It spreads to all connected 1s: (1,1), (1,2), (1,3), (2,2). Each visited cell returns 1 and is marked 0.",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11],
      structures: [
        { type: "array", label: "Row 0", values: [0, 0, 0, 0, 0], highlights: { 2: "checked" } },
        { type: "array", label: "Row 1", values: [0, 0, 0, 0, 0], highlights: { 1: "checked", 2: "checked", 3: "checked" } },
        { type: "array", label: "Row 2", values: [0, 0, 0, 0, 0], highlights: { 2: "checked" } },
        { type: "array", label: "Row 3", values: [1, 0, 0, 0, 0], highlights: {} },
        { type: "variables", entries: [{ name: "dfs returns", value: 5, highlight: true }, { name: "max_area", value: 5 }] },
      ],
    },
    {
      description:
        "Continue scanning. grid[3][0] = 1. DFS from (3,0) finds only 1 cell — no neighbors are land. Area = 1, which is less than max_area = 5.",
      codeHighlightLines: [13, 14, 15, 16],
      structures: [
        { type: "array", label: "Row 0", values: [0, 0, 0, 0, 0], highlights: {} },
        { type: "array", label: "Row 1", values: [0, 0, 0, 0, 0], highlights: {} },
        { type: "array", label: "Row 2", values: [0, 0, 0, 0, 0], highlights: {} },
        { type: "array", label: "Row 3", values: [0, 0, 0, 0, 0], highlights: { 0: "found" } },
        { type: "variables", entries: [{ name: "dfs returns", value: 1 }, { name: "max_area", value: 5 }] },
      ],
    },
    {
      description:
        "Scan complete. The largest island had area 5 (cross shape). The single-cell island had area 1. Return max_area = 5. Time: O(m*n), each cell visited once.",
      codeHighlightLines: [17],
      structures: [
        { type: "array", label: "Row 0", values: [0, 0, 0, 0, 0], highlights: { 2: "success" } },
        { type: "array", label: "Row 1", values: [0, 0, 0, 0, 0], highlights: { 1: "success", 2: "success", 3: "success" } },
        { type: "array", label: "Row 2", values: [0, 0, 0, 0, 0], highlights: { 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: 5, highlight: true }] },
      ],
    },
  ],
};

export default solution;

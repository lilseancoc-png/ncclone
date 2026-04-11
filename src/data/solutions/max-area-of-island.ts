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
        "Find the largest island (connected group of 1s) in a grid. DFS flood fill from each unvisited land cell, counting area. Mark cells as 0 when visited to avoid double-counting. Grid has two islands: a cross shape and a single cell.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "Row 0", values: [0, 0, 1, 0, 0] },
        { type: "array", label: "Row 1", values: [0, 1, 1, 1, 0] },
        { type: "array", label: "Row 2", values: [0, 0, 1, 0, 0] },
        { type: "array", label: "Row 3", values: [1, 0, 0, 0, 0] },
        { type: "variables", entries: [{ name: "max_area", value: 0 }] },
      ],
    },
    {
      description:
        "Scan finds grid[0][2]=1. Start DFS from (0,2). Mark (0,2)=0, area=1. DFS goes down: (1,2)=1 → mark 0, area=2. From (1,2), DFS goes down: (2,2)=1 → mark 0, area=3. From (2,2), all neighbors are 0 or OOB. Backtrack to (1,2).",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11],
      structures: [
        { type: "array", label: "Row 0", values: [0, 0, 0, 0, 0], highlights: { 2: "active" } },
        { type: "array", label: "Row 1", values: [0, 1, 0, 1, 0], highlights: { 2: "active" } },
        { type: "array", label: "Row 2", values: [0, 0, 0, 0, 0], highlights: { 2: "active" } },
        { type: "array", label: "Row 3", values: [1, 0, 0, 0, 0] },
        { type: "variables", entries: [{ name: "DFS path", value: "(0,2)→(1,2)→(2,2)" }, { name: "area so far", value: 3 }] },
      ],
    },
    {
      description:
        "Back at (1,2): DFS goes left: (1,1)=1 → mark 0, area=4. From (1,1), all neighbors are 0. Backtrack. DFS goes right from (1,2): (1,3)=1 → mark 0, area=5. From (1,3), all neighbors are 0. DFS from (0,2) complete. Island area = 5 (cross shape). max_area = 5.",
      codeHighlightLines: [11],
      structures: [
        { type: "array", label: "Row 0", values: [0, 0, 0, 0, 0], highlights: { 2: "success" } },
        { type: "array", label: "Row 1", values: [0, 0, 0, 0, 0], highlights: { 1: "success", 2: "success", 3: "success" } },
        { type: "array", label: "Row 2", values: [0, 0, 0, 0, 0], highlights: { 2: "success" } },
        { type: "array", label: "Row 3", values: [1, 0, 0, 0, 0] },
        { type: "variables", entries: [{ name: "island 1 area", value: 5, highlight: true }, { name: "cells", value: "(0,2),(1,1),(1,2),(1,3),(2,2)" }, { name: "max_area", value: 5 }] },
      ],
    },
    {
      description:
        "Continue scanning. Most cells are now 0 (visited or water). grid[3][0]=1 — start DFS. Mark (3,0)=0. All neighbors are 0 or OOB. Area = 1. max(5, 1) = 5. No more unvisited land cells.",
      codeHighlightLines: [13, 14, 15, 16],
      structures: [
        { type: "array", label: "Row 0", values: [0, 0, 0, 0, 0] },
        { type: "array", label: "Row 1", values: [0, 0, 0, 0, 0] },
        { type: "array", label: "Row 2", values: [0, 0, 0, 0, 0] },
        { type: "array", label: "Row 3", values: [0, 0, 0, 0, 0], highlights: { 0: "found" } },
        { type: "variables", entries: [{ name: "island 2 area", value: 1 }, { name: "max(5, 1)", value: "5 (no change)" }] },
      ],
    },
    {
      description:
        "Return max_area = 5. The cross-shaped island was largest. Each cell visited exactly once (marked 0 on first visit, skipped on subsequent encounters). Time: O(m×n) — every cell checked once by the outer loop and at most once by DFS. Space: O(m×n) worst case for DFS recursion stack (if the entire grid is one island).",
      codeHighlightLines: [17],
      structures: [
        { type: "array", label: "Row 0", values: [0, 0, 0, 0, 0], highlights: { 2: "success" } },
        { type: "array", label: "Row 1", values: [0, 0, 0, 0, 0], highlights: { 1: "success", 2: "success", 3: "success" } },
        { type: "array", label: "Row 2", values: [0, 0, 0, 0, 0], highlights: { 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: 5, highlight: true }, { name: "island 1", value: "5 cells (cross)" }, { name: "island 2", value: "1 cell" }, { name: "Time", value: "O(m × n)" }] },
      ],
    },
  ],
};

export default solution;

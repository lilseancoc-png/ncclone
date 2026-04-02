import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "DFS from Ocean Borders",
  timeComplexity: "O(m × n)",
  spaceComplexity: "O(m × n)",
  code: `def pacificAtlantic(heights):
    rows, cols = len(heights), len(heights[0])
    pacific, atlantic = set(), set()

    def dfs(r, c, visit, prev_height):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if (r, c) in visit or heights[r][c] < prev_height:
            return
        visit.add((r, c))
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            dfs(r+dr, c+dc, visit, heights[r][c])

    for c in range(cols):
        dfs(0, c, pacific, heights[0][c])
        dfs(rows-1, c, atlantic, heights[rows-1][c])
    for r in range(rows):
        dfs(r, 0, pacific, heights[r][0])
        dfs(r, cols-1, atlantic, heights[r][cols-1])
    return list(pacific & atlantic)`,
  steps: [
    {
      description:
        "Given a height matrix, find cells where water can flow to both oceans. Pacific touches top/left edges, Atlantic touches bottom/right. Instead of DFS from every cell, we reverse: DFS inward from each ocean's border, marking reachable cells.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "Row 0 (Pacific↑)", values: [1, 2, 2, 3], highlights: { 0: "pointer-i", 1: "pointer-i", 2: "pointer-i", 3: "pointer-i" } },
        { type: "array", label: "Row 1", values: [3, 2, 3, 4], highlights: { 0: "pointer-i" } },
        { type: "array", label: "Row 2 (Atlantic↓)", values: [2, 4, 5, 3], highlights: { 0: "pointer-i", 3: "pointer-j" } },
        { type: "variables", entries: [{ name: "Pacific border", value: "top + left" }, { name: "Atlantic border", value: "bottom + right" }] },
      ],
    },
    {
      description:
        "DFS from Pacific borders (top row + left column). Water flows uphill in reverse, so we visit neighbors with height >= current. Cells reachable from Pacific are marked.",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 13, 14, 16, 17],
      structures: [
        { type: "array", label: "Row 0", values: [1, 2, 2, 3], highlights: { 0: "pointer-i", 1: "pointer-i", 2: "pointer-i", 3: "pointer-i" } },
        { type: "array", label: "Row 1", values: [3, 2, 3, 4], highlights: { 0: "pointer-i", 2: "pointer-i", 3: "pointer-i" } },
        { type: "array", label: "Row 2", values: [2, 4, 5, 3], highlights: { 1: "pointer-i", 2: "pointer-i" } },
        { type: "variables", entries: [{ name: "pacific set size", value: 9, highlight: true }] },
      ],
    },
    {
      description:
        "DFS from Atlantic borders (bottom row + right column). Mark all cells reachable from Atlantic. Water flows to cells with height >= current in reverse traversal.",
      codeHighlightLines: [15, 18],
      structures: [
        { type: "array", label: "Row 0", values: [1, 2, 2, 3], highlights: { 3: "pointer-j" } },
        { type: "array", label: "Row 1", values: [3, 2, 3, 4], highlights: { 0: "pointer-j", 2: "pointer-j", 3: "pointer-j" } },
        { type: "array", label: "Row 2", values: [2, 4, 5, 3], highlights: { 0: "pointer-j", 1: "pointer-j", 2: "pointer-j", 3: "pointer-j" } },
        { type: "variables", entries: [{ name: "atlantic set size", value: 8, highlight: true }] },
      ],
    },
    {
      description:
        "Intersect pacific and atlantic sets. Cells in both can flow to both oceans. Return these coordinates. Time: O(m*n) since each cell visited at most twice (once per ocean).",
      codeHighlightLines: [19],
      structures: [
        { type: "array", label: "Row 0", values: [1, 2, 2, 3], highlights: { 3: "success" } },
        { type: "array", label: "Row 1", values: [3, 2, 3, 4], highlights: { 0: "success", 2: "success", 3: "success" } },
        { type: "array", label: "Row 2", values: [2, 4, 5, 3], highlights: { 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[[0,3],[1,0],[1,2],[1,3],[2,1],[2,2]]", highlight: true }] },
      ],
    },
  ],
};

export default solution;

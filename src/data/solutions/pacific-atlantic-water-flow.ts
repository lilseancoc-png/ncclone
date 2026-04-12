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
        "Find cells where water can flow to BOTH oceans. Pacific touches top+left edges, Atlantic touches bottom+right. Key insight: instead of DFS from every cell (expensive), reverse the flow — DFS inward from each ocean's border, visiting cells with height >= previous (water flows uphill in reverse). heights=[[1,2,2,3],[3,2,3,4],[2,4,5,3]].",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "Row 0 (Pacific↑)", values: [1, 2, 2, 3] },
        { type: "array", label: "Row 1", values: [3, 2, 3, 4] },
        { type: "array", label: "Row 2 (Atlantic↓)", values: [2, 4, 5, 3] },
        { type: "variables", entries: [{ name: "Pacific border", value: "top row + left col" }, { name: "Atlantic border", value: "bottom row + right col" }] },
      ],
    },
    {
      description:
        "DFS from Pacific top border. Start from each cell in row 0. From (0,0)=1: go down to (1,0)=3 (3>=1 ✓), can't go further down (2<3). From (0,1)=2: down (1,1)=2 (2>=2 ✓), down (2,1)=4 (4>=2 ✓), right (2,2)=5 (5>=4 ✓). From (0,2)=2: down (1,2)=3 (3>=2 ✓), down (2,2)=5 already visited. From (0,3)=3: down (1,3)=4 (4>=3 ✓).",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 13, 14],
      structures: [
        { type: "array", label: "Row 0", values: [1, 2, 2, 3], highlights: { 0: "pointer-i", 1: "pointer-i", 2: "pointer-i", 3: "pointer-i" } },
        { type: "array", label: "Row 1", values: [3, 2, 3, 4], highlights: { 0: "pointer-i", 1: "pointer-i", 2: "pointer-i", 3: "pointer-i" } },
        { type: "array", label: "Row 2", values: [2, 4, 5, 3], highlights: { 1: "pointer-i", 2: "pointer-i" } },
        { type: "variables", entries: [{ name: "pacific set", value: "9 cells reachable", highlight: true }, { name: "direction", value: "flowing uphill from border" }] },
      ],
    },
    {
      description:
        "DFS from Pacific left border adds (1,0) and (2,0) — but (1,0) already visited. (2,0)=2: right (2,1)=4 already visited. Final Pacific set: all of row 0, all of row 1, plus (2,1) and (2,2). 10 cells total. Now start Atlantic DFS from bottom row.",
      codeHighlightLines: [16, 17],
      structures: [
        { type: "array", label: "Row 0", values: [1, 2, 2, 3], highlights: { 0: "pointer-i", 1: "pointer-i", 2: "pointer-i", 3: "pointer-i" } },
        { type: "array", label: "Row 1", values: [3, 2, 3, 4], highlights: { 0: "pointer-i", 1: "pointer-i", 2: "pointer-i", 3: "pointer-i" } },
        { type: "array", label: "Row 2", values: [2, 4, 5, 3], highlights: { 0: "pointer-i", 1: "pointer-i", 2: "pointer-i" } },
        { type: "variables", entries: [{ name: "pacific size", value: "10 cells" }, { name: "next", value: "DFS from Atlantic borders" }] },
      ],
    },
    {
      description:
        "DFS from Atlantic bottom row. (2,0)=2: up (1,0)=3 (3>=2 ✓). (2,1)=4: up (1,1)=2 (2<4 ✗ stop), right (2,2) already. (2,2)=5: up (1,2)=3 (3<5 ✗), already visited left. (2,3)=3: up (1,3)=4 (4>=3 ✓), up (0,3)=3 (3>=3 ✓ — equal height allowed). From right column: (1,3)=4 already visited, (0,3) already visited.",
      codeHighlightLines: [15, 18],
      structures: [
        { type: "array", label: "Row 0", values: [1, 2, 2, 3], highlights: { 3: "pointer-j" } },
        { type: "array", label: "Row 1", values: [3, 2, 3, 4], highlights: { 0: "pointer-j", 2: "pointer-j", 3: "pointer-j" } },
        { type: "array", label: "Row 2", values: [2, 4, 5, 3], highlights: { 0: "pointer-j", 1: "pointer-j", 2: "pointer-j", 3: "pointer-j" } },
        { type: "variables", entries: [{ name: "atlantic size", value: "8 cells", highlight: true }, { name: "key", value: "height >= prev to continue" }] },
      ],
    },
    {
      description:
        "Intersect pacific ∩ atlantic. Cells in BOTH sets can flow to both oceans. Pacific has 10 cells, Atlantic has 8. Intersection: (0,3), (1,0), (1,2), (1,3), (2,1), (2,2) = 6 cells. Return these coordinates. Time: O(m×n) — each cell visited at most twice (once per ocean DFS). Space: O(m×n) for the two sets.",
      codeHighlightLines: [19],
      structures: [
        { type: "array", label: "Row 0", values: [1, 2, 2, 3], highlights: { 3: "success" } },
        { type: "array", label: "Row 1", values: [3, 2, 3, 4], highlights: { 0: "success", 2: "success", 3: "success" } },
        { type: "array", label: "Row 2", values: [2, 4, 5, 3], highlights: { 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[[0,3],[1,0],[1,2],[1,3],[2,1],[2,2]]", highlight: true }, { name: "Time", value: "O(m × n)" }] },
      ],
    },
  ],
};

export default solution;

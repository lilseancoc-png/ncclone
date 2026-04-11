import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "DFS + Memoization",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    code: `def longestIncreasingPath(matrix):
    rows, cols = len(matrix), len(matrix[0])
    cache = {}

    def dfs(r, c):
        if (r, c) in cache:
            return cache[(r, c)]
        result = 1
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and matrix[nr][nc] > matrix[r][c]:
                result = max(result, 1 + dfs(nr, nc))
        cache[(r, c)] = result
        return result

    return max(dfs(r, c) for r in range(rows) for c in range(cols))`,
    steps: [
      {
        description:
          "Find the longest strictly increasing path in a matrix. From each cell, move to adjacent cells (up/down/left/right) with larger values. Naive DFS from every cell would revisit work. Key insight: memoize! Once we compute the longest path starting from a cell, cache it. The strictly-increasing constraint guarantees no cycles, so DFS always terminates. Matrix: [[9,9,4],[6,6,8],[2,1,1]].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "row 0", values: [9, 9, 4], highlights: {} },
          { type: "array", label: "row 1", values: [6, 6, 8], highlights: {} },
          { type: "array", label: "row 2", values: [2, 1, 1], highlights: {} },
          { type: "variables", entries: [{ name: "strategy", value: "DFS from each cell + memoize" }] },
        ],
      },
      {
        description:
          "DFS from (2,1)=1 (a small value, good starting point). Check neighbors: up (1,1)=6 > 1 ✓, left (2,0)=2 > 1 ✓, right (2,2)=1 = 1 ✗ (not strictly greater), down = out of bounds. Follow (2,0)=2: neighbors — up (1,0)=6 > 2 ✓, right (2,1)=1 < 2 ✗. Follow (1,0)=6: up (0,0)=9 > 6 ✓, right (1,1)=6 = 6 ✗. Follow (0,0)=9: all neighbors ≤ 9. Dead end. cache[(0,0)] = 1.",
        codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12],
        structures: [
          { type: "array", label: "row 0", values: [9, 9, 4], highlights: { 0: "active" } },
          { type: "array", label: "row 1", values: [6, 6, 8], highlights: { 0: "active" } },
          { type: "array", label: "row 2", values: [2, 1, 1], highlights: { 0: "active", 1: "active" } },
          { type: "variables", entries: [{ name: "path so far", value: "1→2→6→9" }, { name: "cache[(0,0)]", value: "1 (dead end)" }] },
        ],
      },
      {
        description:
          "Unwind the recursion. cache[(1,0)] = 1 + cache[(0,0)] = 1 + 1 = 2. cache[(2,0)] = 1 + cache[(1,0)] = 1 + 2 = 3. Back at (2,1): path through (2,0) gives 1 + 3 = 4. Also try path through (1,1)=6: (1,1)→(0,0)=9? Yes, 9>6. But also (1,1)→(1,2)=8>6→(0,2)=4? No, 4<8. So cache[(1,1)] = 1 + cache[(0,0)] = 2. Path through (1,1) gives 1+2 = 3 < 4. cache[(2,1)] = 4.",
        codeHighlightLines: [13, 14],
        structures: [
          {
            type: "hashmap",
            label: "cache (longest path from each cell)",
            entries: [["(0,0)", 1], ["(1,0)", 2], ["(2,0)", 3], ["(1,1)", 2], ["(2,1)", 4]],
            highlightKeys: ["(2,1)"],
          },
          { type: "variables", entries: [{ name: "best from (2,1)", value: "4 (path: 1→2→6→9)", highlight: true }] },
        ],
      },
      {
        description:
          "DFS from remaining cells. Many hit the cache immediately: DFS from (1,0)=6? Already cached: 2. DFS from (0,0)=9? Cached: 1. DFS from (1,2)=8: up (0,2)=4<8 ✗, down (2,2)=1<8 ✗, left (1,1)=6<8 ✗. Only neighbor (0,1)=9>8 → cache[(1,2)] = 1 + 1 = 2. DFS from (0,2)=4: up to 8>4 → 1 + cache[(1,2)] = 3. Each cell computed at most once!",
        codeHighlightLines: [5, 6, 7, 13, 14],
        structures: [
          {
            type: "hashmap",
            label: "cache (growing)",
            entries: [["(0,0)", 1], ["(0,1)", 1], ["(0,2)", 3], ["(1,0)", 2], ["(1,1)", 2], ["(1,2)", 2], ["(2,0)", 3], ["(2,1)", 4], ["(2,2)", 1]],
            highlightKeys: ["(2,1)"],
          },
        ],
      },
      {
        description:
          "Take the max over all cells: max(1,1,3,2,2,2,3,4,1) = 4. The longest increasing path is 1→2→6→9 (from (2,1)→(2,0)→(1,0)→(0,0)), length 4. Memoization ensures each cell's DFS runs once: total work = O(m×n). Without memoization, overlapping subproblems would cause exponential blowup. Space: O(m×n) for the cache.",
        codeHighlightLines: [16],
        structures: [
          { type: "array", label: "row 0", values: [9, 9, 4], highlights: { 0: "success" } },
          { type: "array", label: "row 1", values: [6, 6, 8], highlights: { 0: "success" } },
          { type: "array", label: "row 2", values: [2, 1, 1], highlights: { 0: "success", 1: "success" } },
          { type: "variables", entries: [{ name: "return", value: 4, highlight: true }, { name: "path", value: "1→2→6→9" }, { name: "Time", value: "O(m × n)" }, { name: "Space", value: "O(m × n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

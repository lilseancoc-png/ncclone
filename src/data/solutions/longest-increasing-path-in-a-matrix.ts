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
          "Find the longest increasing path in a matrix. From each cell, we can move to adjacent cells with strictly larger values. DFS from each cell with memoization — each cell's result is computed only once.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "row 0",
            values: [9, 9, 4],
            highlights: {},
          },
          {
            type: "array",
            label: "row 1",
            values: [6, 6, 8],
            highlights: {},
          },
          {
            type: "array",
            label: "row 2",
            values: [2, 1, 1],
            highlights: {},
          },
        ],
      },
      {
        description:
          "DFS from (2,1)=1: neighbors (2,0)=2>1, (1,1)=6>1. Follow (2,0)=2: neighbor (1,0)=6>2. (1,0)=6: neighbor (0,0)=9>6. (0,0)=9: no larger neighbors. Path: 1→2→6→9, length=4.",
        codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12],
        structures: [
          {
            type: "array",
            label: "row 0",
            values: [9, 9, 4],
            highlights: { 0: "success" },
          },
          {
            type: "array",
            label: "row 1",
            values: [6, 6, 8],
            highlights: { 0: "active" },
          },
          {
            type: "array",
            label: "row 2",
            values: [2, 1, 1],
            highlights: { 0: "active", 1: "active" },
          },
        ],
      },
      {
        description:
          "Cache results: cache[(0,0)]=1, cache[(1,0)]=2, cache[(2,0)]=3, cache[(2,1)]=4. When DFS reaches a cached cell, it returns immediately. Each cell is visited once → O(m*n).",
        codeHighlightLines: [6, 7, 13, 14],
        structures: [
          {
            type: "hashmap",
            label: "cache",
            entries: [
              ["(0,0)", 1],
              ["(1,0)", 2],
              ["(2,0)", 3],
              ["(2,1)", 4],
            ],
            highlightKeys: ["(2,1)"],
          },
        ],
      },
      {
        description:
          "After running DFS from all cells, the maximum is 4 (path: 1→2→6→9). Memoization ensures O(m*n) total work despite starting DFS from every cell, since each cell's longest path is computed only once.",
        codeHighlightLines: [16],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "longest path", value: "1→2→6→9", highlight: true },
              { name: "return", value: 4 },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

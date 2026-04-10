import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Backtracking with Sets",
    timeComplexity: "O(n!)",
    spaceComplexity: "O(n²)",
    code: `def solveNQueens(n):
    result = []
    cols = set()
    pos_diag = set()  # r + c
    neg_diag = set()  # r - c
    board = [['.' ] * n for _ in range(n)]

    def backtrack(r):
        if r == n:
            result.append([''.join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r+c) in pos_diag or (r-c) in neg_diag:
                continue
            cols.add(c)
            pos_diag.add(r + c)
            neg_diag.add(r - c)
            board[r][c] = 'Q'
            backtrack(r + 1)
            cols.remove(c)
            pos_diag.remove(r + c)
            neg_diag.remove(r - c)
            board[r][c] = '.'
    backtrack(0)
    return result`,
    steps: [
      {
        description:
          "Place n queens on an n×n board so no two attack each other (same row, column, or diagonal). We place one queen per row using backtracking. Three sets track conflicts: cols (occupied columns), pos_diag (r+c diagonals), neg_diag (r-c diagonals). For n=4, we need to find all valid arrangements.",
        codeHighlightLines: [1, 2, 3, 4, 5, 6],
        structures: [
          { type: "array", label: "row 0", values: [".", ".", ".", "."] },
          { type: "array", label: "row 1", values: [".", ".", ".", "."] },
          { type: "array", label: "row 2", values: [".", ".", ".", "."] },
          { type: "array", label: "row 3", values: [".", ".", ".", "."] },
          { type: "set", label: "cols", values: [] },
          { type: "set", label: "pos_diag (r+c)", values: [] },
        ],
      },
      {
        description:
          "Row 0: Try col 0. Place Q at (0,0). cols={0}, pos_diag={0}, neg_diag={0}. Row 1: col 0 blocked (cols). col 1 blocked (neg_diag: 1-1=0). Try col 2. Place Q at (1,2). cols={0,2}, pos_diag={0,3}, neg_diag={0,-1}.",
        codeHighlightLines: [12, 13, 14, 15, 16, 17, 18, 19],
        structures: [
          { type: "array", label: "row 0", values: ["Q", ".", ".", "."], highlights: { 0: "active" } },
          { type: "array", label: "row 1", values: [".", ".", "Q", "."], highlights: { 2: "active" } },
          { type: "array", label: "row 2", values: [".", ".", ".", "."] },
          { type: "array", label: "row 3", values: [".", ".", ".", "."] },
          { type: "set", label: "cols", values: [0, 2] },
          { type: "set", label: "pos_diag", values: [0, 3] },
        ],
      },
      {
        description:
          "Row 2: col 0 blocked (cols). col 1: pos_diag 2+1=3 blocked. col 2 blocked (cols). col 3: neg_diag 2-3=-1 blocked. ALL columns fail! Dead end. Backtrack: undo Q at (1,2). Try col 3 for row 1. Place Q at (1,3). Row 2: col 0 blocked. col 1: check — 1 not in cols, 2+1=3 in pos_diag? pos_diag={0,4}. 3 not there. neg_diag: 2-1=1, not in {0,-2}. Place Q at (2,1)!",
        codeHighlightLines: [13, 14, 20, 21, 22, 23],
        structures: [
          { type: "array", label: "row 0", values: ["Q", ".", ".", "."], highlights: { 0: "active" } },
          { type: "array", label: "row 1", values: [".", ".", ".", "Q"], highlights: { 3: "active" } },
          { type: "array", label: "row 2", values: [".", "Q", ".", "."], highlights: { 1: "active" } },
          { type: "array", label: "row 3", values: [".", ".", ".", "."] },
          { type: "set", label: "cols", values: [0, 3, 1] },
        ],
      },
      {
        description:
          "Row 3: col 0 blocked. col 1 blocked. col 2: pos_diag 3+2=5, neg_diag 3-2=1. Check — 5 not in {0,4,3}, 1 not in {0,-2,1}... wait, 1 IS in neg_diag! Blocked. col 3 blocked. Dead end again. Backtrack all the way — try (0,1) instead of (0,0).",
        codeHighlightLines: [13, 14, 20, 21, 22, 23],
        structures: [
          { type: "array", label: "row 0", values: [".", "Q", ".", "."], highlights: { 1: "active" } },
          { type: "array", label: "row 1", values: [".", ".", ".", "."] },
          { type: "array", label: "row 2", values: [".", ".", ".", "."] },
          { type: "array", label: "row 3", values: [".", ".", ".", "."] },
          { type: "variables", entries: [{ name: "backtracked to row 0", value: "now trying col 1" }] },
        ],
      },
      {
        description:
          "Q at (0,1). Row 1: col 0 not blocked, pos_diag 1+0=1 in {1}? Yes! col 2: neg_diag 1-2=-1, not in {1}. pos_diag 1+2=3, not in {1}. Not in cols. Place Q at (1,3). Row 2: Place Q at (2,0). Row 3: Place Q at (3,2). All 4 queens placed with no conflicts — first solution found!",
        codeHighlightLines: [8, 9, 10, 11],
        structures: [
          { type: "array", label: "row 0", values: [".", "Q", ".", "."], highlights: { 1: "success" } },
          { type: "array", label: "row 1", values: [".", ".", ".", "Q"], highlights: { 3: "success" } },
          { type: "array", label: "row 2", values: ["Q", ".", ".", "."], highlights: { 0: "success" } },
          { type: "array", label: "row 3", values: [".", ".", "Q", "."], highlights: { 2: "success" } },
        ],
      },
      {
        description:
          "Continue backtracking to find all solutions. Second solution: (0,2),(1,0),(2,3),(3,1) → '..Q.','Q...','...Q','.Q..'. For n=4, exactly 2 solutions exist. The sets give O(1) conflict checking — much faster than scanning the board. Time: O(n!) since each row has decreasing choices. Space: O(n²) for the board.",
        codeHighlightLines: [24, 25],
        structures: [
          { type: "array", label: "solution 2, row 0", values: [".", ".", "Q", "."], highlights: { 2: "success" } },
          { type: "array", label: "solution 2, row 1", values: ["Q", ".", ".", "."], highlights: { 0: "success" } },
          { type: "array", label: "solution 2, row 2", values: [".", ".", ".", "Q"], highlights: { 3: "success" } },
          { type: "array", label: "solution 2, row 3", values: [".", "Q", ".", "."], highlights: { 1: "success" } },
          { type: "variables", entries: [{ name: "total solutions", value: 2, highlight: true }, { name: "Time", value: "O(n!)" }] },
        ],
      },
    ],
  },
];

export default solutions;

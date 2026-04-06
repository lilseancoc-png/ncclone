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
          "Place n queens on an n×n board so no two queens attack each other (same row, column, or diagonal). Backtracking: place one queen per row. Track occupied columns and diagonals using sets. For n=4:",
        codeHighlightLines: [1, 2, 3, 4, 5, 6],
        structures: [
          {
            type: "array",
            label: "row 0",
            values: [".", ".", ".", "."],
            highlights: {},
          },
          { type: "set", label: "cols", values: [] },
          { type: "set", label: "pos_diag (r+c)", values: [] },
          { type: "set", label: "neg_diag (r-c)", values: [] },
        ],
      },
      {
        description:
          "Row 0: Try col 0. Place Q at (0,0). cols={0}, pos_diag={0}, neg_diag={0}. Row 1: col 0 in cols, col 1 diag conflict. Try col 2. Place Q at (1,2). Row 2: all cols conflict — backtrack!",
        codeHighlightLines: [12, 13, 14, 15, 16, 17, 18],
        structures: [
          {
            type: "array",
            label: "row 0",
            values: ["Q", ".", ".", "."],
            highlights: { 0: "active" },
          },
          {
            type: "array",
            label: "row 1",
            values: [".", ".", "Q", "."],
            highlights: { 2: "active" },
          },
          { type: "set", label: "cols", values: [0, 2] },
        ],
      },
      {
        description:
          "After more backtracking, find first solution: Q at (0,1), (1,3), (2,0), (3,2). No conflicts! This gives '.Q..', '...Q', 'Q...', '..Q.'.",
        codeHighlightLines: [8, 9, 10],
        structures: [
          {
            type: "array",
            label: "row 0",
            values: [".", "Q", ".", "."],
            highlights: { 1: "success" },
          },
          {
            type: "array",
            label: "row 1",
            values: [".", ".", ".", "Q"],
            highlights: { 3: "success" },
          },
          {
            type: "array",
            label: "row 2",
            values: ["Q", ".", ".", "."],
            highlights: { 0: "success" },
          },
          {
            type: "array",
            label: "row 3",
            values: [".", ".", "Q", "."],
            highlights: { 2: "success" },
          },
        ],
      },
      {
        description:
          "Second solution for n=4: (0,2),(1,0),(2,3),(3,1) → '..Q.','Q...','...Q','.Q..'. Total: 2 solutions. The sets allow O(1) conflict checking per placement. Time is O(n!) since each row has fewer choices.",
        codeHighlightLines: [24, 25],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "solutions found", value: 2, highlight: true },
              { name: "n=4 answers", value: 2 },
              { name: "n=8 answers", value: 92 },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

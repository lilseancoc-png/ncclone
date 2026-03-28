import { SolutionData } from "../types";

const solution: SolutionData[] = [
  {
    label: "Extra Space — Sets",
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m + n)",
    code: `def set_zeroes(matrix):
    rows_to_zero = set()
    cols_to_zero = set()
    m, n = len(matrix), len(matrix[0])
    for i in range(m):
        for j in range(n):
            if matrix[i][j] == 0:
                rows_to_zero.add(i)
                cols_to_zero.add(j)
    for i in range(m):
        for j in range(n):
            if i in rows_to_zero or j in cols_to_zero:
                matrix[i][j] = 0`,
    steps: [
      {
        description:
          "If an element is 0, set its entire row and column to 0. Naive approach: record which rows and columns contain zeros, then zero them out. Input: [[1,1,1],[1,0,1],[1,1,1]].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "row 0", values: [1, 1, 1] },
          { type: "array", label: "row 1", values: [1, 0, 1], highlights: { 1: "found" } },
          { type: "array", label: "row 2", values: [1, 1, 1] },
        ],
      },
      {
        description:
          "Scan: found 0 at (1,1). Record row 1 and column 1 in sets.",
        codeHighlightLines: [4, 5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "row 0", values: [1, 1, 1] },
          { type: "array", label: "row 1", values: [1, 0, 1], highlights: { 1: "found" } },
          { type: "array", label: "row 2", values: [1, 1, 1] },
          { type: "variables", entries: [{ name: "rows_to_zero", value: "{1}", highlight: true }, { name: "cols_to_zero", value: "{1}", highlight: true }] },
        ],
      },
      {
        description:
          "Second pass: zero out all cells in row 1 and column 1. Result: [[1,0,1],[0,0,0],[1,0,1]]. Time: O(m×n). Space: O(m+n) for the sets.",
        codeHighlightLines: [10, 11, 12, 13],
        structures: [
          { type: "array", label: "row 0", values: [1, 0, 1], highlights: { 1: "success" } },
          { type: "array", label: "row 1", values: [0, 0, 0], highlights: { 0: "success", 1: "success", 2: "success" } },
          { type: "array", label: "row 2", values: [1, 0, 1], highlights: { 1: "success" } },
        ],
      },
    ],
  },
  {
    label: "Optimal — In-Place Markers",
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(1)",
    code: `def set_zeroes(matrix):
    m, n = len(matrix), len(matrix[0])
    first_row_zero = any(matrix[0][j] == 0 for j in range(n))
    first_col_zero = any(matrix[i][0] == 0 for i in range(m))
    # Use first row/col as markers
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0
    # Zero cells based on markers
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0
    # Handle first row and col
    if first_row_zero:
        for j in range(n):
            matrix[0][j] = 0
    if first_col_zero:
        for i in range(m):
            matrix[i][0] = 0`,
    steps: [
      {
        description:
          "O(1) space trick: use the first row and first column themselves as markers! First, save whether row 0 or col 0 originally had zeros. Input: [[0,1,2,0],[3,4,5,2],[1,3,1,5]].",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          { type: "array", label: "row 0", values: [0, 1, 2, 0], highlights: { 0: "found", 3: "found" } },
          { type: "array", label: "row 1", values: [3, 4, 5, 2] },
          { type: "array", label: "row 2", values: [1, 3, 1, 5] },
          { type: "variables", entries: [{ name: "first_row_zero", value: true, highlight: true }, { name: "first_col_zero", value: true, highlight: true }] },
        ],
      },
      {
        description:
          "Scan inner cells (skip row 0, col 0). No inner zeros found in this example, but the first row/col markers from the original zeros at (0,0) and (0,3) will drive the zeroing.",
        codeHighlightLines: [6, 7, 8, 9, 10],
        structures: [
          { type: "array", label: "row 0 (markers)", values: [0, 1, 2, 0], highlights: { 0: "active", 3: "active" } },
          { type: "array", label: "row 1", values: [3, 4, 5, 2] },
          { type: "array", label: "row 2", values: [1, 3, 1, 5] },
        ],
      },
      {
        description:
          "Zero inner cells where marker is 0: col 0 marker=0 → zero col 0. Col 3 marker=0 → zero col 3. Then first_row_zero=true → zero entire row 0. first_col_zero=true → zero entire col 0.",
        codeHighlightLines: [12, 13, 14, 15, 17, 18, 19, 20, 21],
        structures: [
          { type: "array", label: "row 0", values: [0, 0, 0, 0], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
          { type: "array", label: "row 1", values: [0, 4, 5, 0], highlights: { 0: "success", 3: "success" } },
          { type: "array", label: "row 2", values: [0, 3, 1, 0], highlights: { 0: "success", 3: "success" } },
          { type: "variables", entries: [{ name: "space", value: "O(1) — no extra arrays!", highlight: true }] },
        ],
      },
    ],
  },
];

export default solution;

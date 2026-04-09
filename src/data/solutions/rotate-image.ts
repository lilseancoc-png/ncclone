import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Transpose + Reverse",
  timeComplexity: "O(n²)",
  spaceComplexity: "O(1)",
  code: `def rotate(matrix):
    n = len(matrix)
    # Transpose (swap rows and columns)
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Reverse each row
    for row in matrix:
        row.reverse()`,
  steps: [
    {
      description:
        "Rotate an n×n matrix 90° clockwise IN-PLACE (no extra matrix allowed). The elegant trick: a 90° clockwise rotation = transpose + reverse each row. Why? Transposing flips the matrix across its main diagonal (row i, col j → row j, col i). Then reversing each row mirrors it horizontally — together, this produces exactly a 90° clockwise rotation. Input: [[1,2,3],[4,5,6],[7,8,9]].",
      codeHighlightLines: [1, 2],
      structures: [
        {
          type: "matrix",
          label: "original matrix",
          rows: [
            [{ value: 1 }, { value: 2 }, { value: 3 }],
            [{ value: 4 }, { value: 5 }, { value: 6 }],
            [{ value: 7 }, { value: 8 }, { value: 9 }],
          ],
        },
      ],
    },
    {
      description:
        "Step 1 — Transpose: swap matrix[i][j] with matrix[j][i] for all pairs where i < j (upper triangle swaps with lower triangle). Swap (0,1)↔(1,0): 2↔4. Swap (0,2)↔(2,0): 3↔7. Swap (1,2)↔(2,1): 6↔8. The diagonal (1,5,9) stays in place. After transposing, rows become columns and columns become rows.",
      codeHighlightLines: [3, 4, 5, 6],
      structures: [
        {
          type: "matrix",
          label: "after transpose",
          rows: [
            [{ value: 1 }, { value: 4, highlight: "active" }, { value: 7, highlight: "active" }],
            [{ value: 2, highlight: "active" }, { value: 5 }, { value: 8, highlight: "active" }],
            [{ value: 3, highlight: "active" }, { value: 6, highlight: "active" }, { value: 9 }],
          ],
        },
        { type: "variables", entries: [{ name: "swaps", value: "2↔4, 3↔7, 6↔8" }] },
      ],
    },
    {
      description:
        "Step 2 — Reverse each row: Row 0: [1,4,7] → [7,4,1]. Row 1: [2,5,8] → [8,5,2]. Row 2: [3,6,9] → [9,6,3]. Each row reversal is O(n/2) swaps, done in-place. This horizontal flip after the transpose completes the 90° rotation.",
      codeHighlightLines: [8, 9],
      structures: [
        {
          type: "matrix",
          label: "after reversing rows (final)",
          rows: [
            [{ value: 7, highlight: "success" }, { value: 4, highlight: "success" }, { value: 1, highlight: "success" }],
            [{ value: 8, highlight: "success" }, { value: 5, highlight: "success" }, { value: 2, highlight: "success" }],
            [{ value: 9, highlight: "success" }, { value: 6, highlight: "success" }, { value: 3, highlight: "success" }],
          ],
        },
      ],
    },
    {
      description:
        "Result: [[7,4,1],[8,5,2],[9,6,3]] — rotated 90° clockwise. Verify: original first column [1,4,7] is now the first row [7,4,1] (reversed) — that's exactly what 90° clockwise does! Time: O(n²) — transpose visits n²/2 pairs, row reversal visits n²/2 elements. Space: O(1) — all operations are in-place swaps. For counter-clockwise rotation, reverse rows FIRST, then transpose.",
      codeHighlightLines: [6, 9],
      structures: [
        {
          type: "matrix",
          label: "rotated 90° clockwise ✓",
          rows: [
            [{ value: 7, highlight: "success" }, { value: 4, highlight: "success" }, { value: 1, highlight: "success" }],
            [{ value: 8, highlight: "success" }, { value: 5, highlight: "success" }, { value: 2, highlight: "success" }],
            [{ value: 9, highlight: "success" }, { value: 6, highlight: "success" }, { value: 3, highlight: "success" }],
          ],
        },
        { type: "variables", entries: [{ name: "Time", value: "O(n²)" }, { name: "Space", value: "O(1) in-place" }] },
      ],
    },
  ],
};

export default solution;

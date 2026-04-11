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
        "Rotate n×n matrix 90° clockwise IN-PLACE. The trick: 90° rotation = transpose + reverse each row. Transposing flips across the main diagonal (swap rows and columns). Reversing each row then mirrors horizontally. Together: 90° clockwise. Input: [[1,2,3],[4,5,6],[7,8,9]].",
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
        { type: "variables", entries: [{ name: "strategy", value: "transpose, then reverse rows" }] },
      ],
    },
    {
      description:
        "Transpose step 1: Swap (0,1)↔(1,0): 2↔4. Swap (0,2)↔(2,0): 3↔7. We only swap pairs where j>i (upper triangle) to avoid double-swapping. The diagonal elements (1,5,9) stay in place.",
      codeHighlightLines: [3, 4, 5, 6],
      structures: [
        {
          type: "matrix",
          label: "transposing (row 0 swaps)",
          rows: [
            [{ value: 1 }, { value: 4, highlight: "active" }, { value: 7, highlight: "active" }],
            [{ value: 2, highlight: "active" }, { value: 5 }, { value: 6 }],
            [{ value: 3, highlight: "active" }, { value: 8 }, { value: 9 }],
          ],
        },
        { type: "variables", entries: [{ name: "swap (0,1)↔(1,0)", value: "2 ↔ 4", highlight: true }, { name: "swap (0,2)↔(2,0)", value: "3 ↔ 7", highlight: true }] },
      ],
    },
    {
      description:
        "Transpose step 2: Swap (1,2)↔(2,1): 6↔8. Transpose complete! Each row has become a column: original row [1,2,3] is now column [1,2,3]. But it's not rotated yet — we need to mirror horizontally.",
      codeHighlightLines: [6],
      structures: [
        {
          type: "matrix",
          label: "after transpose",
          rows: [
            [{ value: 1 }, { value: 4 }, { value: 7 }],
            [{ value: 2 }, { value: 5 }, { value: 8, highlight: "active" }],
            [{ value: 3 }, { value: 6, highlight: "active" }, { value: 9 }],
          ],
        },
        { type: "variables", entries: [{ name: "swap (1,2)↔(2,1)", value: "6 ↔ 8", highlight: true }, { name: "transpose done", value: "rows became columns" }] },
      ],
    },
    {
      description:
        "Reverse each row. Row 0: [1,4,7] → [7,4,1]. Row 1: [2,5,8] → [8,5,2]. Row 2: [3,6,9] → [9,6,3]. Each reversal swaps the first and last elements, then moves inward. O(n/2) swaps per row.",
      codeHighlightLines: [8, 9],
      structures: [
        {
          type: "matrix",
          label: "reversing rows",
          rows: [
            [{ value: 7, highlight: "success" }, { value: 4, highlight: "success" }, { value: 1, highlight: "success" }],
            [{ value: 8, highlight: "success" }, { value: 5, highlight: "success" }, { value: 2, highlight: "success" }],
            [{ value: 9, highlight: "success" }, { value: 6, highlight: "success" }, { value: 3, highlight: "success" }],
          ],
        },
        { type: "variables", entries: [{ name: "[1,4,7]→[7,4,1]", value: "row 0 reversed" }, { name: "[2,5,8]→[8,5,2]", value: "row 1 reversed" }, { name: "[3,6,9]→[9,6,3]", value: "row 2 reversed" }] },
      ],
    },
    {
      description:
        "Result: [[7,4,1],[8,5,2],[9,6,3]]. Verify: original left column [1,4,7] is now the top row [7,4,1] (reversed) — exactly what 90° clockwise does. Time: O(n²) — transpose visits n²/2 pairs, reversal visits n²/2 elements. Space: O(1) — all in-place swaps. For counter-clockwise: reverse rows first, then transpose.",
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
        { type: "variables", entries: [{ name: "col [1,4,7]→row [7,4,1]", value: "✓ rotated!", highlight: true }, { name: "Time", value: "O(n²)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

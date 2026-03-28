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
        "Rotate an n×n matrix 90° clockwise in-place. The trick: transpose (swap across diagonal), then reverse each row. Input: [[1,2,3],[4,5,6],[7,8,9]].",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "row 0", values: [1, 2, 3] },
        { type: "array", label: "row 1", values: [4, 5, 6] },
        { type: "array", label: "row 2", values: [7, 8, 9] },
      ],
    },
    {
      description:
        "Step 1 — Transpose: swap matrix[i][j] with matrix[j][i] for all i < j. Swap (0,1)↔(1,0): 2↔4. Swap (0,2)↔(2,0): 3↔7. Swap (1,2)↔(2,1): 6↔8.",
      codeHighlightLines: [3, 4, 5],
      structures: [
        { type: "array", label: "row 0", values: [1, 4, 7], highlights: { 1: "active", 2: "active" } },
        { type: "array", label: "row 1", values: [2, 5, 8], highlights: { 0: "active", 2: "active" } },
        { type: "array", label: "row 2", values: [3, 6, 9], highlights: { 0: "active", 1: "active" } },
      ],
    },
    {
      description:
        "Step 2 — Reverse each row. Row 0: [1,4,7]→[7,4,1]. Row 1: [2,5,8]→[8,5,2]. Row 2: [3,6,9]→[9,6,3].",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "row 0", values: [7, 4, 1], highlights: { 0: "success", 2: "success" } },
        { type: "array", label: "row 1", values: [8, 5, 2], highlights: { 0: "success", 2: "success" } },
        { type: "array", label: "row 2", values: [9, 6, 3], highlights: { 0: "success", 2: "success" } },
      ],
    },
    {
      description:
        "Result: [[7,4,1],[8,5,2],[9,6,3]] — rotated 90° clockwise. Time: O(n²) to visit each element twice. Space: O(1) — all swaps are in-place. This two-step approach avoids complex index math.",
      codeHighlightLines: [5, 8],
      structures: [
        { type: "array", label: "row 0", values: [7, 4, 1], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "row 1", values: [8, 5, 2], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "row 2", values: [9, 6, 3], highlights: { 0: "success", 1: "success", 2: "success" } },
      ],
    },
  ],
};

export default solution;

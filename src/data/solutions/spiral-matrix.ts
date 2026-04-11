import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Layer-by-Layer Traversal",
  timeComplexity: "O(m × n)",
  spaceComplexity: "O(1)",
  code: `def spiral_order(matrix):
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for i in range(left, right + 1):
            result.append(matrix[top][i])
        top += 1
        for i in range(top, bottom + 1):
            result.append(matrix[i][right])
        right -= 1
        if top <= bottom:
            for i in range(right, left - 1, -1):
                result.append(matrix[bottom][i])
            bottom -= 1
        if left <= right:
            for i in range(bottom, top - 1, -1):
                result.append(matrix[i][left])
            left += 1
    return result`,
  steps: [
    {
      description:
        "Traverse matrix in spiral order: right→down→left→up, shrinking boundaries inward. Four pointers (top, bottom, left, right) define the current rectangle. After traversing each edge, shrink that boundary. Input: [[1,2,3],[4,5,6],[7,8,9]].",
      codeHighlightLines: [1, 2, 3, 4, 5],
      structures: [
        {
          type: "matrix",
          label: "matrix",
          rows: [
            [{ value: 1 }, { value: 2 }, { value: 3 }],
            [{ value: 4 }, { value: 5 }, { value: 6 }],
            [{ value: 7 }, { value: 8 }, { value: 9 }],
          ],
        },
        { type: "variables", entries: [{ name: "top", value: 0 }, { name: "bottom", value: 2 }, { name: "left", value: 0 }, { name: "right", value: 2 }] },
      ],
    },
    {
      description:
        "Direction 1 — RIGHT along top row: matrix[0][0..2] = 1, 2, 3. Shrink: top = 1 (row 0 done). The top boundary moves down, excluding the row we just traversed.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        {
          type: "matrix",
          label: "matrix (top row traversed)",
          rows: [
            [{ value: 1, highlight: "success" }, { value: 2, highlight: "success" }, { value: 3, highlight: "success" }],
            [{ value: 4 }, { value: 5 }, { value: 6 }],
            [{ value: 7 }, { value: 8 }, { value: 9 }],
          ],
        },
        { type: "array", label: "result", values: [1, 2, 3], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "top", value: "0 → 1" }] },
      ],
    },
    {
      description:
        "Direction 2 — DOWN along right column: matrix[1..2][2] = 6, 9. Shrink: right = 1 (column 2 done). Now the active rectangle is rows 1-2, columns 0-1.",
      codeHighlightLines: [9, 10, 11],
      structures: [
        {
          type: "matrix",
          label: "matrix (right column traversed)",
          rows: [
            [{ value: 1, highlight: "checked" }, { value: 2, highlight: "checked" }, { value: 3, highlight: "checked" }],
            [{ value: 4 }, { value: 5 }, { value: 6, highlight: "success" }],
            [{ value: 7 }, { value: 8 }, { value: 9, highlight: "success" }],
          ],
        },
        { type: "array", label: "result", values: [1, 2, 3, 6, 9], highlights: { 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "right", value: "2 → 1" }] },
      ],
    },
    {
      description:
        "Direction 3 — LEFT along bottom row: check top<=bottom (1<=2 ✓). matrix[2][1..0] = 8, 7. Shrink: bottom = 1. Direction 4 — UP along left column: check left<=right (0<=1 ✓). matrix[1][0] = 4. Shrink: left = 1. Outer layer complete!",
      codeHighlightLines: [12, 13, 14, 15, 16, 17, 18, 19],
      structures: [
        {
          type: "matrix",
          label: "matrix (outer layer done)",
          rows: [
            [{ value: 1, highlight: "checked" }, { value: 2, highlight: "checked" }, { value: 3, highlight: "checked" }],
            [{ value: 4, highlight: "success" }, { value: 5 }, { value: 6, highlight: "checked" }],
            [{ value: 7, highlight: "success" }, { value: 8, highlight: "success" }, { value: 9, highlight: "checked" }],
          ],
        },
        { type: "array", label: "result", values: [1, 2, 3, 6, 9, 8, 7, 4], highlights: { 5: "success", 6: "success", 7: "success" } },
        { type: "variables", entries: [{ name: "bottom", value: "2 → 1" }, { name: "left", value: "0 → 1" }] },
      ],
    },
    {
      description:
        "Inner layer: top=1, bottom=1, left=1, right=1 — single cell. RIGHT: matrix[1][1] = 5. top becomes 2 > bottom(1), loop exits. All 9 elements collected in spiral order.",
      codeHighlightLines: [6, 7, 8, 20],
      structures: [
        {
          type: "matrix",
          label: "matrix (center cell)",
          rows: [
            [{ value: 1, highlight: "checked" }, { value: 2, highlight: "checked" }, { value: 3, highlight: "checked" }],
            [{ value: 4, highlight: "checked" }, { value: 5, highlight: "success" }, { value: 6, highlight: "checked" }],
            [{ value: 7, highlight: "checked" }, { value: 8, highlight: "checked" }, { value: 9, highlight: "checked" }],
          ],
        },
        { type: "array", label: "result (final)", values: [1, 2, 3, 6, 9, 8, 7, 4, 5], highlights: { 8: "success" } },
      ],
    },
    {
      description:
        "Return [1,2,3,6,9,8,7,4,5]. The boundary checks (top<=bottom, left<=right) are essential for non-square matrices — without them, a single remaining row or column would be traversed twice. Time: O(m×n) — each cell visited once. Space: O(1) extra (result is required output).",
      codeHighlightLines: [20],
      structures: [
        { type: "array", label: "spiral order", values: [1, 2, 3, 6, 9, 8, 7, 4, 5], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[1,2,3,6,9,8,7,4,5]", highlight: true }, { name: "Time", value: "O(m × n)" }, { name: "Space", value: "O(1) extra" }] },
      ],
    },
  ],
};

export default solution;

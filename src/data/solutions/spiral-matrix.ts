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
        "Return all matrix elements in spiral order: right along top → down the right side → left along bottom → up the left side → repeat inward. The approach uses four boundary pointers (top, bottom, left, right) that shrink inward after each traversal, like peeling layers off an onion. The boundary checks (top <= bottom and left <= right) prevent revisiting and handle non-square matrices. Input: [[1,2,3],[4,5,6],[7,8,9]].",
      codeHighlightLines: [1, 2, 3, 4, 5],
      structures: [
        { type: "array", label: "row 0", values: [1, 2, 3] },
        { type: "array", label: "row 1", values: [4, 5, 6] },
        { type: "array", label: "row 2", values: [7, 8, 9] },
        { type: "variables", entries: [{ name: "top", value: 0 }, { name: "bottom", value: 2 }, { name: "left", value: 0 }, { name: "right", value: 2 }] },
      ],
    },
    {
      description:
        "Layer 1, step 1 — Top row (left→right): traverse matrix[0][0..2] = [1,2,3]. Move top boundary down: top = 1 (row 0 is done). Step 2 — Right column (top→bottom): traverse matrix[1..2][2] = [6,9]. Move right boundary left: right = 1 (column 2 is done). Each step processes one edge of the current boundary rectangle.",
      codeHighlightLines: [6, 7, 8, 9, 10, 11],
      structures: [
        { type: "array", label: "row 0", values: [1, 2, 3], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "array", label: "row 1", values: [4, 5, 6], highlights: { 2: "active" } },
        { type: "array", label: "row 2", values: [7, 8, 9], highlights: { 2: "active" } },
        { type: "array", label: "result", values: [1, 2, 3, 6, 9], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
      ],
    },
    {
      description:
        "Step 3 — Bottom row (right→left): check top <= bottom (1 <= 2, yes). Traverse matrix[2][1..0] = [8,7]. Move bottom up: bottom = 1. Step 4 — Left column (bottom→top): check left <= right (0 <= 1, yes). Traverse matrix[1][0] = [4]. Move left right: left = 1. The boundary checks are essential for non-square matrices — without them, we'd double-count elements in single-row or single-column remainders.",
      codeHighlightLines: [12, 13, 14, 15, 16, 17, 18, 19],
      structures: [
        { type: "array", label: "row 2", values: [7, 8, 9], highlights: { 0: "active", 1: "active", 2: "checked" } },
        { type: "array", label: "result so far", values: [1, 2, 3, 6, 9, 8, 7, 4], highlights: { 5: "success", 6: "success", 7: "success" } },
      ],
    },
    {
      description:
        "Layer 2: boundaries are top=1, bottom=1, left=1, right=1 — a single cell! Traverse top row: matrix[1][1] = 5. Top moves to 2 > bottom(1), loop ends. Final: [1,2,3,6,9,8,7,4,5]. Every element visited exactly once. Time: O(m×n). Space: O(1) extra (the result array is required output). This boundary-shrinking approach is cleaner than tracking visited cells or using direction arrays.",
      codeHighlightLines: [6, 7, 8, 20],
      structures: [
        { type: "array", label: "spiral result", values: [1, 2, 3, 6, 9, 8, 7, 4, 5], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[1,2,3,6,9,8,7,4,5]", highlight: true }, { name: "Time", value: "O(m × n)" }] },
      ],
    },
  ],
};

export default solution;

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
        "Return all elements in spiral order (right→down→left→up). Use four boundaries (top, bottom, left, right) and shrink inward layer by layer. Input: [[1,2,3],[4,5,6],[7,8,9]].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "row 0", values: [1, 2, 3] },
        { type: "array", label: "row 1", values: [4, 5, 6] },
        { type: "array", label: "row 2", values: [7, 8, 9] },
        { type: "variables", entries: [{ name: "top", value: 0 }, { name: "bottom", value: 2 }, { name: "left", value: 0 }, { name: "right", value: 2 }] },
      ],
    },
    {
      description:
        "Traverse top row left→right: [1,2,3]. Then top boundary moves down (top=1).",
      codeHighlightLines: [6, 7, 8],
      structures: [
        { type: "array", label: "row 0", values: [1, 2, 3], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "array", label: "row 1", values: [4, 5, 6] },
        { type: "array", label: "row 2", values: [7, 8, 9] },
        { type: "array", label: "result", values: [1, 2, 3], highlights: { 0: "success", 1: "success", 2: "success" } },
      ],
    },
    {
      description:
        "Traverse right column top→bottom: [6,9]. Right boundary moves left (right=1). Traverse bottom row right→left: [8,7]. Bottom moves up (bottom=1).",
      codeHighlightLines: [9, 10, 11, 12, 13, 14, 15],
      structures: [
        { type: "array", label: "row 0", values: [1, 2, 3], highlights: { 0: "checked", 1: "checked", 2: "checked" } },
        { type: "array", label: "row 1", values: [4, 5, 6], highlights: { 2: "active" } },
        { type: "array", label: "row 2", values: [7, 8, 9], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "array", label: "result", values: [1, 2, 3, 6, 9, 8, 7], highlights: { 3: "success", 4: "success", 5: "success", 6: "success" } },
      ],
    },
    {
      description:
        "Traverse left column bottom→top: [4]. Then the only remaining element is 5. Result: [1,2,3,6,9,8,7,4,5]. Time: O(m×n) — visit each element once. Space: O(1) extra (output doesn't count).",
      codeHighlightLines: [16, 17, 18, 19],
      structures: [
        { type: "array", label: "result", values: [1, 2, 3, 6, 9, 8, 7, 4, 5], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success" } },
      ],
    },
  ],
};

export default solution;

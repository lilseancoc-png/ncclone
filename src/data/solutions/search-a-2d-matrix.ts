import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def searchMatrix(matrix, target):
    rows, cols = len(matrix), len(matrix[0])
    left, right = 0, rows * cols - 1
    while left <= right:
        mid = (left + right) // 2
        row = mid // cols
        col = mid % cols
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] < target:
            left = mid + 1
        else:
            right = mid - 1
    return False`,
  steps: [
    {
      description:
        "We treat the 2D matrix as a flat sorted array. With 3 rows and 4 columns, we have 12 elements total. Set left=0, right=11.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "Row 0", values: [1, 3, 5, 7] },
        { type: "array", label: "Row 1", values: [10, 11, 16, 20] },
        { type: "array", label: "Row 2", values: [23, 30, 34, 60] },
        {
          type: "variables",
          entries: [
            { name: "target", value: 3 },
            { name: "left", value: 0 },
            { name: "right", value: 11 },
          ],
        },
      ],
    },
    {
      description:
        "mid = (0+11)//2 = 5. Convert to 2D: row=5//4=1, col=5%4=1. matrix[1][1]=11. 11 > 3, so move right = mid-1 = 4.",
      codeHighlightLines: [5, 6, 7, 11, 12],
      structures: [
        { type: "array", label: "Row 0", values: [1, 3, 5, 7] },
        {
          type: "array",
          label: "Row 1",
          values: [10, 11, 16, 20],
          highlights: { 1: "active" },
        },
        { type: "array", label: "Row 2", values: [23, 30, 34, 60] },
        {
          type: "variables",
          entries: [
            { name: "mid", value: 5, highlight: true },
            { name: "row", value: 1 },
            { name: "col", value: 1 },
            { name: "matrix[1][1]", value: 11 },
            { name: "target", value: 3 },
          ],
        },
      ],
    },
    {
      description:
        "mid = (0+4)//2 = 2. row=2//4=0, col=2%4=2. matrix[0][2]=5. 5 > 3, so move right = mid-1 = 1.",
      codeHighlightLines: [5, 6, 7, 11, 12],
      structures: [
        {
          type: "array",
          label: "Row 0",
          values: [1, 3, 5, 7],
          highlights: { 2: "active" },
        },
        {
          type: "array",
          label: "Row 1",
          values: [10, 11, 16, 20],
          highlights: { 1: "checked" },
        },
        { type: "array", label: "Row 2", values: [23, 30, 34, 60] },
        {
          type: "variables",
          entries: [
            { name: "mid", value: 2, highlight: true },
            { name: "row", value: 0 },
            { name: "col", value: 2 },
            { name: "matrix[0][2]", value: 5 },
            { name: "target", value: 3 },
          ],
        },
      ],
    },
    {
      description:
        "mid = (0+1)//2 = 0. row=0//4=0, col=0%4=0. matrix[0][0]=1. 1 < 3, so move left = mid+1 = 1.",
      codeHighlightLines: [5, 6, 7, 9, 10],
      structures: [
        {
          type: "array",
          label: "Row 0",
          values: [1, 3, 5, 7],
          highlights: { 0: "active", 2: "checked" },
        },
        {
          type: "array",
          label: "Row 1",
          values: [10, 11, 16, 20],
          highlights: { 1: "checked" },
        },
        { type: "array", label: "Row 2", values: [23, 30, 34, 60] },
        {
          type: "variables",
          entries: [
            { name: "mid", value: 0, highlight: true },
            { name: "matrix[0][0]", value: 1 },
            { name: "target", value: 3 },
          ],
        },
      ],
    },
    {
      description:
        "mid = (1+1)//2 = 1. row=1//4=0, col=1%4=1. matrix[0][1]=3. Found the target!",
      codeHighlightLines: [5, 6, 7, 8, 9],
      structures: [
        {
          type: "array",
          label: "Row 0",
          values: [1, 3, 5, 7],
          highlights: { 0: "checked", 1: "found", 2: "checked" },
        },
        {
          type: "array",
          label: "Row 1",
          values: [10, 11, 16, 20],
          highlights: { 1: "checked" },
        },
        { type: "array", label: "Row 2", values: [23, 30, 34, 60] },
        {
          type: "variables",
          entries: [
            { name: "mid", value: 1, highlight: true },
            { name: "matrix[0][1]", value: 3, highlight: true },
            { name: "target", value: 3 },
          ],
        },
      ],
    },
    {
      description:
        "matrix[0][1] == target, so we return True. Binary search on the flattened matrix found 3 in O(log(m*n)) time.",
      codeHighlightLines: [8, 9],
      structures: [
        {
          type: "array",
          label: "Row 0",
          values: [1, 3, 5, 7],
          highlights: { 1: "success" },
        },
        { type: "array", label: "Row 1", values: [10, 11, 16, 20] },
        { type: "array", label: "Row 2", values: [23, 30, 34, 60] },
        {
          type: "variables",
          entries: [{ name: "return", value: "True", highlight: true }],
        },
      ],
    },
  ],
};

export default solution;

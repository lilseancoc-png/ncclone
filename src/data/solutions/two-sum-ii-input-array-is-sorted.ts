import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def twoSum(numbers, target):
    left = 0
    right = len(numbers) - 1

    while left < right:
        current_sum = numbers[left] + numbers[right]

        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum < target:
            left += 1
        else:
            right -= 1`,
  steps: [
    {
      description:
        "The array is sorted, so we can use two pointers: one at the start (left) and one at the end (right). Target is 9.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        {
          type: "array",
          label: "numbers",
          values: [2, 7, 11, 15],
          pointers: [
            { index: 0, label: "left", color: "purple" },
            { index: 3, label: "right", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "target", value: 9 },
            { name: "left", value: 0 },
            { name: "right", value: 3 },
          ],
        },
      ],
    },
    {
      description:
        "Calculate sum: numbers[0] + numbers[3] = 2 + 15 = 17. That's greater than target 9.",
      codeHighlightLines: [5, 6],
      structures: [
        {
          type: "array",
          label: "numbers",
          values: [2, 7, 11, 15],
          highlights: { 0: "pointer-i", 3: "pointer-j" },
          pointers: [
            { index: 0, label: "left", color: "purple" },
            { index: 3, label: "right", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "target", value: 9 },
            { name: "current_sum", value: 17, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Sum 17 > target 9, so we need a smaller sum. Move right pointer left to decrease the sum. right = 2.",
      codeHighlightLines: [11, 12],
      structures: [
        {
          type: "array",
          label: "numbers",
          values: [2, 7, 11, 15],
          highlights: { 3: "checked" },
          pointers: [
            { index: 0, label: "left", color: "purple" },
            { index: 2, label: "right", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "target", value: 9 },
            { name: "left", value: 0 },
            { name: "right", value: 2, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Calculate sum: numbers[0] + numbers[2] = 2 + 11 = 13. Still greater than target 9. Move right pointer left again.",
      codeHighlightLines: [5, 6, 11, 12],
      structures: [
        {
          type: "array",
          label: "numbers",
          values: [2, 7, 11, 15],
          highlights: { 0: "pointer-i", 2: "pointer-j" },
          pointers: [
            { index: 0, label: "left", color: "purple" },
            { index: 2, label: "right", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "target", value: 9 },
            { name: "current_sum", value: 13, highlight: true },
            { name: "right", value: 1 },
          ],
        },
      ],
    },
    {
      description:
        "Calculate sum: numbers[0] + numbers[1] = 2 + 7 = 9. That equals our target!",
      codeHighlightLines: [5, 6, 7],
      structures: [
        {
          type: "array",
          label: "numbers",
          values: [2, 7, 11, 15],
          highlights: { 0: "found", 1: "found" },
          pointers: [
            { index: 0, label: "left", color: "purple" },
            { index: 1, label: "right", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "target", value: 9 },
            { name: "current_sum", value: 9, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Return 1-indexed positions: [left+1, right+1] = [1, 2]. The two pointers approach works because the array is sorted.",
      codeHighlightLines: [8],
      structures: [
        {
          type: "array",
          label: "numbers",
          values: [2, 7, 11, 15],
          highlights: { 0: "success", 1: "success" },
        },
        {
          type: "variables",
          entries: [{ name: "return", value: "[1, 2]", highlight: true }],
        },
      ],
    },
  ],
};

export default solution;

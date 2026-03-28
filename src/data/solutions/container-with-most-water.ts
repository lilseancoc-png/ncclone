import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def maxArea(height):
    left = 0
    right = len(height) - 1
    max_water = 0

    while left < right:
        width = right - left
        h = min(height[left], height[right])
        area = width * h
        max_water = max(max_water, area)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_water`,
  steps: [
    {
      description:
        "Use two pointers at each end. The water area = width * min(height[left], height[right]). We move the shorter side inward.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        {
          type: "array",
          label: "height",
          values: [1, 8, 6, 2, 5, 4, 8, 3, 7],
          pointers: [
            { index: 0, label: "L", color: "purple" },
            { index: 8, label: "R", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "left", value: 0 },
            { name: "right", value: 8 },
            { name: "max_water", value: 0 },
          ],
        },
      ],
    },
    {
      description:
        "width=8, h=min(1,7)=1, area=8. max_water=8. height[left]=1 < height[right]=7, so move left up.",
      codeHighlightLines: [6, 7, 8, 9, 11, 12],
      structures: [
        {
          type: "array",
          label: "height",
          values: [1, 8, 6, 2, 5, 4, 8, 3, 7],
          highlights: { 0: "pointer-i", 8: "pointer-j" },
          pointers: [
            { index: 0, label: "L", color: "purple" },
            { index: 8, label: "R", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "width", value: 8 },
            { name: "h", value: 1 },
            { name: "area", value: 8, highlight: true },
            { name: "max_water", value: 8, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "left=1. width=7, h=min(8,7)=7, area=49. New max! height[left]=8 >= height[right]=7, so move right down.",
      codeHighlightLines: [6, 7, 8, 9, 13, 14],
      structures: [
        {
          type: "array",
          label: "height",
          values: [1, 8, 6, 2, 5, 4, 8, 3, 7],
          highlights: { 1: "pointer-i", 8: "pointer-j" },
          pointers: [
            { index: 1, label: "L", color: "purple" },
            { index: 8, label: "R", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "width", value: 7 },
            { name: "h", value: 7 },
            { name: "area", value: 49, highlight: true },
            { name: "max_water", value: 49, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "right=7. width=6, h=min(8,3)=3, area=18. Less than max. height[right]=3 < height[left]=8, move right down.",
      codeHighlightLines: [6, 7, 8, 9, 11, 12],
      structures: [
        {
          type: "array",
          label: "height",
          values: [1, 8, 6, 2, 5, 4, 8, 3, 7],
          highlights: { 1: "pointer-i", 7: "pointer-j" },
          pointers: [
            { index: 1, label: "L", color: "purple" },
            { index: 7, label: "R", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "area", value: 18 },
            { name: "max_water", value: 49 },
          ],
        },
      ],
    },
    {
      description:
        "right=6. width=5, h=min(8,8)=8, area=40. Still less than 49. Equal heights, so we move right down.",
      codeHighlightLines: [6, 7, 8, 9, 13, 14],
      structures: [
        {
          type: "array",
          label: "height",
          values: [1, 8, 6, 2, 5, 4, 8, 3, 7],
          highlights: { 1: "pointer-i", 6: "pointer-j" },
          pointers: [
            { index: 1, label: "L", color: "purple" },
            { index: 6, label: "R", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [
            { name: "area", value: 40 },
            { name: "max_water", value: 49 },
          ],
        },
      ],
    },
    {
      description:
        "The pointers continue closing in. No subsequent area exceeds 49. Why move the shorter side? Because moving the taller side can only make area smaller or equal.",
      codeHighlightLines: [6, 7, 8, 9],
      structures: [
        {
          type: "array",
          label: "height",
          values: [1, 8, 6, 2, 5, 4, 8, 3, 7],
          highlights: { 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "checked", 6: "checked" },
          pointers: [
            { index: 3, label: "L", color: "purple" },
            { index: 4, label: "R", color: "cyan" },
          ],
        },
        {
          type: "variables",
          entries: [{ name: "max_water", value: 49 }],
        },
      ],
    },
    {
      description:
        "Pointers meet, loop ends. The maximum water container holds 49 units (between indices 1 and 8, heights 8 and 7).",
      codeHighlightLines: [16],
      structures: [
        {
          type: "array",
          label: "height",
          values: [1, 8, 6, 2, 5, 4, 8, 3, 7],
          highlights: { 1: "success", 8: "success" },
        },
        {
          type: "variables",
          entries: [{ name: "return", value: 49, highlight: true }],
        },
      ],
    },
  ],
};

export default solution;

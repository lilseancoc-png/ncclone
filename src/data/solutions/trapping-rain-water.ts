import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Two Pointers",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def trap(height):
    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    water = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    return water`,
    steps: [
      {
        description:
          "Water trapped at each position depends on the min of the max heights on its left and right. Two pointers approach: move the smaller side inward, tracking running maximums. The lower side determines the water level.",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          {
            type: "array",
            label: "height",
            values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
            highlights: {},
            pointers: [
              { index: 0, label: "L" },
              { index: 11, label: "R" },
            ],
          },
          {
            type: "variables",
            entries: [
              { name: "left_max", value: 0 },
              { name: "right_max", value: 0 },
              { name: "water", value: 0 },
            ],
          },
        ],
      },
      {
        description:
          "height[L]=0 < height[R]=1. height[0]=0 >= left_max=0, so update left_max=0. Move L right. height[L]=1 >= left_max=0, update left_max=1. Move L right.",
        codeHighlightLines: [6, 7, 8, 11],
        structures: [
          {
            type: "array",
            label: "height",
            values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
            highlights: { 0: "checked", 1: "checked" },
            pointers: [
              { index: 2, label: "L" },
              { index: 11, label: "R" },
            ],
          },
          {
            type: "variables",
            entries: [
              { name: "left_max", value: 1, highlight: true },
              { name: "right_max", value: 0 },
              { name: "water", value: 0 },
            ],
          },
        ],
      },
      {
        description:
          "height[L]=0 < height[R]=1. height[2]=0 < left_max=1, so water += 1-0 = 1. Move L. height[3]=2 >= left_max=1, update left_max=2. Move L.",
        codeHighlightLines: [9, 10, 11],
        structures: [
          {
            type: "array",
            label: "height",
            values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
            highlights: { 2: "active" },
            pointers: [
              { index: 4, label: "L" },
              { index: 11, label: "R" },
            ],
          },
          {
            type: "variables",
            entries: [
              { name: "left_max", value: 2 },
              { name: "water", value: 1, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Continue: L=4 (h=1<2, +1 water), L=5 (h=0<2, +2 water), L=6 (h=1<2, +1 water). Water now = 1+1+2+1 = 5. Then height[7]=3 updates left_max.",
        codeHighlightLines: [9, 10],
        structures: [
          {
            type: "array",
            label: "height",
            values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
            highlights: { 4: "active", 5: "active", 6: "active" },
            pointers: [
              { index: 7, label: "L" },
              { index: 11, label: "R" },
            ],
          },
          {
            type: "variables",
            entries: [
              { name: "left_max", value: 3 },
              { name: "water", value: 5, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Now right side processes: R moves left, collecting water at positions 9 (right_max 2 - h 1 = 1) giving total water = 6. Final answer: 6 units of trapped water.",
        codeHighlightLines: [15, 16, 17, 18],
        structures: [
          {
            type: "array",
            label: "height",
            values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
            highlights: { 2: "success", 4: "success", 5: "success", 6: "success", 9: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "water", value: 6, highlight: true }],
          },
        ],
      },
    ],
  },
  {
    label: "Prefix Max Arrays",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: `def trap(height):
    n = len(height)
    left_max = [0] * n
    right_max = [0] * n
    left_max[0] = height[0]
    for i in range(1, n):
        left_max[i] = max(left_max[i-1], height[i])
    right_max[n-1] = height[n-1]
    for i in range(n-2, -1, -1):
        right_max[i] = max(right_max[i+1], height[i])
    water = 0
    for i in range(n):
        water += min(left_max[i], right_max[i]) - height[i]
    return water`,
    steps: [
      {
        description:
          "Alternative approach: precompute the maximum height to the left and right of each position. Water at position i = min(left_max[i], right_max[i]) - height[i]. Uses O(n) extra space but is very intuitive.",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          {
            type: "array",
            label: "height",
            values: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
            highlights: {},
          },
        ],
      },
      {
        description:
          "Build left_max array (scan left to right): each position stores the max height seen so far from the left. Build right_max array (scan right to left): max height from the right.",
        codeHighlightLines: [5, 6, 7, 8, 9, 10],
        structures: [
          {
            type: "array",
            label: "left_max",
            values: [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3],
            highlights: {},
          },
          {
            type: "array",
            label: "right_max",
            values: [3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 1],
            highlights: {},
          },
        ],
      },
      {
        description:
          "For each position: water += min(left_max[i], right_max[i]) - height[i]. Position 2: min(1,3)-0=1. Position 4: min(2,3)-1=1. Position 5: min(2,3)-0=2. Position 6: min(2,3)-1=1. Position 9: min(3,2)-1=1. Total = 6.",
        codeHighlightLines: [11, 12, 13, 14],
        structures: [
          {
            type: "array",
            label: "water per position",
            values: [0, 0, 1, 0, 1, 2, 1, 0, 0, 1, 0, 0],
            highlights: { 2: "success", 4: "success", 5: "success", 6: "success", 9: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "total water", value: 6, highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Monotonic Stack",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: `def largestRectangleArea(heights):
    stack = []  # indices
    max_area = 0
    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            max_area = max(max_area, height * (i - idx))
            start = idx
        stack.append((start, h))
    for idx, height in stack:
        max_area = max(max_area, height * (len(heights) - idx))
    return max_area`,
    steps: [
      {
        description:
          "Find the largest rectangle in a histogram. Use a monotonic increasing stack of (index, height). When we encounter a shorter bar, pop taller bars and calculate their maximum rectangle width (they can't extend further right).",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "heights",
            values: [2, 1, 5, 6, 2, 3],
            highlights: {},
          },
          { type: "stack", label: "stack (idx, h)", values: [] },
          { type: "variables", entries: [{ name: "max_area", value: 0 }] },
        ],
      },
      {
        description:
          "i=0, h=2: Stack empty, push (0,2). i=1, h=1: h < stack top (2). Pop (0,2): area = 2*(1-0) = 2. max_area=2. Push (0,1) — bar of height 1 extends back to index 0.",
        codeHighlightLines: [4, 5, 6, 7, 8, 9, 10],
        structures: [
          {
            type: "array",
            label: "heights",
            values: [2, 1, 5, 6, 2, 3],
            highlights: { 0: "checked", 1: "active" },
            pointers: [{ index: 1, label: "i" }],
          },
          { type: "stack", label: "stack", values: ["(0,1)"] },
          { type: "variables", entries: [{ name: "max_area", value: 2, highlight: true }] },
        ],
      },
      {
        description:
          "i=2, h=5: push (2,5). i=3, h=6: push (3,6). Stack is increasing. i=4, h=2: Pop (3,6): area=6*(4-3)=6. Pop (2,5): area=5*(4-2)=10. max_area=10. Push (2,2).",
        codeHighlightLines: [6, 7, 8],
        structures: [
          {
            type: "array",
            label: "heights",
            values: [2, 1, 5, 6, 2, 3],
            highlights: { 2: "checked", 3: "checked", 4: "active" },
            pointers: [{ index: 4, label: "i" }],
          },
          { type: "stack", label: "stack", values: ["(0,1)", "(2,2)"] },
          { type: "variables", entries: [{ name: "max_area", value: 10, highlight: true }] },
        ],
      },
      {
        description:
          "i=5, h=3: push (5,3). Done iterating. Now process remaining stack: (5,3): area=3*(6-5)=3. (2,2): area=2*(6-2)=8. (0,1): area=1*(6-0)=6. max_area stays 10.",
        codeHighlightLines: [11, 12, 13],
        structures: [
          {
            type: "array",
            label: "heights",
            values: [2, 1, 5, 6, 2, 3],
            highlights: { 2: "success", 3: "success" },
          },
          {
            type: "variables",
            entries: [
              { name: "max_area", value: 10, highlight: true },
              { name: "best rect", value: "height=5, width=2 (idx 2-3)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

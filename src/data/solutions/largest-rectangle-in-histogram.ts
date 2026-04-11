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
          "Find the largest rectangle in a histogram. For each bar, we want to know how far left and right it can extend (until hitting a shorter bar). A monotonic increasing stack efficiently tracks this: when a shorter bar appears, we pop all taller bars — each popped bar's rectangle ends at the current position. heights = [2, 1, 5, 6, 2, 3].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "heights",
            values: [2, 1, 5, 6, 2, 3],
          },
          { type: "stack", label: "stack (start_idx, height)", values: [] },
          { type: "variables", entries: [{ name: "max_area", value: 0 }] },
        ],
      },
      {
        description:
          "i=0, h=2: Stack empty, push (0, 2). The bar of height 2 starts at index 0. i=1, h=1: Current height 1 < stack top height 2. Pop (0, 2): this bar could extend from index 0 to index 0 (width = 1-0 = 1). Area = 2*1 = 2. max_area = 2. Set start = 0 (the popped bar's start index — our new bar of height 1 can extend back to there).",
        codeHighlightLines: [4, 5, 6, 7, 8, 9],
        structures: [
          {
            type: "array",
            label: "heights",
            values: [2, 1, 5, 6, 2, 3],
            highlights: { 0: "checked", 1: "active" },
            pointers: [{ index: 1, label: "i" }],
          },
          { type: "stack", label: "stack", values: [] },
          { type: "variables", entries: [{ name: "popped (0,2)", value: "area = 2×1 = 2" }, { name: "max_area", value: 2, highlight: true }] },
        ],
      },
      {
        description:
          "Push (0, 1) — height 1 extends back to index 0. i=2, h=5: 5 > 1, push (2, 5). i=3, h=6: 6 > 5, push (3, 6). Stack is monotonically increasing: [(0,1), (2,5), (3,6)]. When bars are increasing, no rectangles are completed yet — they might extend further right.",
        codeHighlightLines: [10, 4, 5],
        structures: [
          {
            type: "array",
            label: "heights",
            values: [2, 1, 5, 6, 2, 3],
            highlights: { 0: "checked", 1: "checked", 2: "active", 3: "active" },
            pointers: [{ index: 3, label: "i" }],
          },
          { type: "stack", label: "stack (increasing)", values: ["(0,1)", "(2,5)", "(3,6)"], topHighlight: true },
          { type: "variables", entries: [{ name: "max_area", value: 2 }] },
        ],
      },
      {
        description:
          "i=4, h=2: Shorter than stack top! Pop (3, 6): area = 6*(4-3) = 6. Pop (2, 5): area = 5*(4-2) = 10. max_area = 10! Stop popping — stack top (0,1) has height 1 ≤ 2. Push (2, 2) — height 2 extends back to index 2 (where the popped bar of height 5 started). This is the key insight: the new bar 'inherits' the leftmost extent of the bars it replaced.",
        codeHighlightLines: [6, 7, 8, 9, 10],
        structures: [
          {
            type: "array",
            label: "heights",
            values: [2, 1, 5, 6, 2, 3],
            highlights: { 2: "found", 3: "found", 4: "active" },
            pointers: [{ index: 4, label: "i" }],
          },
          { type: "stack", label: "stack", values: ["(0,1)", "(2,2)"] },
          { type: "variables", entries: [{ name: "popped (3,6)", value: "area = 6×1 = 6" }, { name: "popped (2,5)", value: "area = 5×2 = 10", highlight: true }, { name: "max_area", value: 10, highlight: true }] },
        ],
      },
      {
        description:
          "i=5, h=3: 3 > 2, push (5, 3). Stack: [(0,1), (2,2), (5,3)]. Done iterating. Now process remaining bars — they extend all the way to the right edge. Pop (5,3): area = 3*(6-5) = 3. Pop (2,2): area = 2*(6-2) = 8. Pop (0,1): area = 1*(6-0) = 6. None beat 10.",
        codeHighlightLines: [11, 12],
        structures: [
          {
            type: "array",
            label: "heights",
            values: [2, 1, 5, 6, 2, 3],
            highlights: { 0: "checked", 1: "checked", 2: "success", 3: "success", 4: "checked", 5: "checked" },
          },
          { type: "stack", label: "remaining stack", values: ["(0,1)→6", "(2,2)→8", "(5,3)→3"] },
          { type: "variables", entries: [{ name: "max_area", value: 10 }] },
        ],
      },
      {
        description:
          "Return 10. The largest rectangle has height 5 spanning indices 2-3 (width 2). Each bar is pushed and popped at most once, so time is O(n). The monotonic stack ensures we compute the maximum width for every possible height without brute-force O(n²) pairwise checks.",
        codeHighlightLines: [13],
        structures: [
          {
            type: "array",
            label: "heights — largest rectangle",
            values: [2, 1, 5, 6, 2, 3],
            highlights: { 2: "success", 3: "success" },
          },
          { type: "variables", entries: [{ name: "return", value: 10, highlight: true }, { name: "rectangle", value: "height=5, width=2 (idx 2-3)" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

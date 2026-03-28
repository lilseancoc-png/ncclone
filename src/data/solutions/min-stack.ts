import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        min_val = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(min_val)

    def pop(self):
        self.stack.pop()
        self.min_stack.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.min_stack[-1]`,
  steps: [
    {
      description:
        "Initialize a MinStack with two empty stacks: the main stack for values and a min_stack that tracks the current minimum at each level.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "stack", label: "stack", values: [] },
        { type: "stack", label: "min_stack", values: [] },
      ],
    },
    {
      description:
        "push(5): Add 5 to stack. min_stack is empty, so min_val = 5. Push 5 onto min_stack too.",
      codeHighlightLines: [6, 7, 8, 9],
      structures: [
        { type: "stack", label: "stack", values: [5], topHighlight: true },
        { type: "stack", label: "min_stack", values: [5], topHighlight: true },
        { type: "variables", entries: [{ name: "getMin()", value: 5 }] },
      ],
    },
    {
      description:
        "push(3): Add 3 to stack. min_val = min(3, 5) = 3. Push 3 onto min_stack. The new minimum is 3.",
      codeHighlightLines: [6, 7, 8, 9],
      structures: [
        { type: "stack", label: "stack", values: [5, 3], topHighlight: true },
        { type: "stack", label: "min_stack", values: [5, 3], topHighlight: true },
        { type: "variables", entries: [{ name: "getMin()", value: 3, highlight: true }] },
      ],
    },
    {
      description:
        "push(7): Add 7 to stack. min_val = min(7, 3) = 3. Push 3 onto min_stack. Minimum stays 3 since 7 > 3.",
      codeHighlightLines: [6, 7, 8, 9],
      structures: [
        { type: "stack", label: "stack", values: [5, 3, 7], topHighlight: true },
        { type: "stack", label: "min_stack", values: [5, 3, 3], topHighlight: true },
        { type: "variables", entries: [{ name: "getMin()", value: 3 }] },
      ],
    },
    {
      description:
        "push(2): Add 2 to stack. min_val = min(2, 3) = 2. Push 2 onto min_stack. New minimum is 2!",
      codeHighlightLines: [6, 7, 8, 9],
      structures: [
        { type: "stack", label: "stack", values: [5, 3, 7, 2], topHighlight: true },
        { type: "stack", label: "min_stack", values: [5, 3, 3, 2], topHighlight: true },
        { type: "variables", entries: [{ name: "getMin()", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "pop(): Remove 2 from stack and also pop from min_stack. The top of min_stack is now 3, so the minimum reverts to 3.",
      codeHighlightLines: [11, 12, 13],
      structures: [
        { type: "stack", label: "stack", values: [5, 3, 7], topHighlight: true },
        { type: "stack", label: "min_stack", values: [5, 3, 3], topHighlight: true },
        { type: "variables", entries: [{ name: "getMin()", value: 3, highlight: true }] },
      ],
    },
    {
      description:
        "pop(): Remove 7 from stack and pop from min_stack. The min_stack top is still 3. top() returns 3.",
      codeHighlightLines: [11, 12, 13],
      structures: [
        { type: "stack", label: "stack", values: [5, 3], topHighlight: true },
        { type: "stack", label: "min_stack", values: [5, 3], topHighlight: true },
        { type: "variables", entries: [{ name: "top()", value: 3 }, { name: "getMin()", value: 3 }] },
      ],
    },
    {
      description:
        "The key insight: min_stack always has the same height as stack. Each entry in min_stack records the minimum at that level, so getMin() is always O(1).",
      codeHighlightLines: [18, 19],
      structures: [
        { type: "stack", label: "stack", values: [5, 3], topHighlight: true },
        { type: "stack", label: "min_stack", values: [5, 3], topHighlight: true },
        { type: "variables", entries: [{ name: "top()", value: 3, highlight: true }, { name: "getMin()", value: 3, highlight: true }] },
      ],
    },
  ],
};

export default solution;

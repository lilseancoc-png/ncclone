import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def is_valid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for c in s:
        if c in pairs:
            if not stack or stack[-1] != pairs[c]:
                return False
            stack.pop()
        else:
            stack.append(c)
    return len(stack) == 0`,
  steps: [
    {
      description: "Check if \"({[]})\" has valid parentheses. Use a stack to track opening brackets.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "s", values: ["(", "{", "[", "]", "}", ")"] },
        { type: "stack", label: "stack", values: [] },
      ],
    },
    {
      description: "'(' is an opening bracket — push it onto the stack.",
      codeHighlightLines: [9, 10],
      structures: [
        { type: "array", label: "s", values: ["(", "{", "[", "]", "}", ")"], highlights: { 0: "active" } },
        { type: "stack", label: "stack", values: ["("], topHighlight: true },
      ],
    },
    {
      description: "'{' is an opening bracket — push it onto the stack.",
      codeHighlightLines: [9, 10],
      structures: [
        { type: "array", label: "s", values: ["(", "{", "[", "]", "}", ")"], highlights: { 0: "checked", 1: "active" } },
        { type: "stack", label: "stack", values: ["(", "{"], topHighlight: true },
      ],
    },
    {
      description: "'[' is an opening bracket — push it onto the stack.",
      codeHighlightLines: [9, 10],
      structures: [
        { type: "array", label: "s", values: ["(", "{", "[", "]", "}", ")"], highlights: { 0: "checked", 1: "checked", 2: "active" } },
        { type: "stack", label: "stack", values: ["(", "{", "["], topHighlight: true },
      ],
    },
    {
      description: "']' is a closing bracket. Its pair is '['. Top of stack is '[' — match! Pop it.",
      codeHighlightLines: [4, 5, 8],
      structures: [
        { type: "array", label: "s", values: ["(", "{", "[", "]", "}", ")"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "success" } },
        { type: "stack", label: "stack", values: ["(", "{"], topHighlight: false },
      ],
    },
    {
      description: "'}' is a closing bracket. Its pair is '{'. Top of stack is '{' — match! Pop it.",
      codeHighlightLines: [4, 5, 8],
      structures: [
        { type: "array", label: "s", values: ["(", "{", "[", "]", "}", ")"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "success" } },
        { type: "stack", label: "stack", values: ["("], topHighlight: false },
      ],
    },
    {
      description: "')' is a closing bracket. Its pair is '('. Top of stack is '(' — match! Pop it.",
      codeHighlightLines: [4, 5, 8],
      structures: [
        { type: "array", label: "s", values: ["(", "{", "[", "]", "}", ")"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "success" } },
        { type: "stack", label: "stack", values: [] },
      ],
    },
    {
      description: "Stack is empty — all brackets were properly matched! Return True.",
      codeHighlightLines: [11],
      structures: [
        { type: "array", label: "s", values: ["(", "{", "[", "]", "}", ")"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
        { type: "stack", label: "stack", values: [] },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def evalRPN(tokens):
    stack = []
    for token in tokens:
        if token in "+-*/":
            b = stack.pop()
            a = stack.pop()
            if token == '+': stack.append(a + b)
            elif token == '-': stack.append(a - b)
            elif token == '*': stack.append(a * b)
            else: stack.append(int(a / b))
        else:
            stack.append(int(token))
    return stack[0]`,
  steps: [
    {
      description:
        "We process tokens left to right using a stack. Numbers get pushed; operators pop two values, compute, and push the result.",
      codeHighlightLines: [1, 2],
      structures: [
        {
          type: "array",
          label: "tokens",
          values: ["2", "1", "+", "3", "*"],
        },
        { type: "stack", label: "stack", values: [] },
      ],
    },
    {
      description:
        'Token "2" is a number. Push 2 onto the stack.',
      codeHighlightLines: [3, 11, 12],
      structures: [
        {
          type: "array",
          label: "tokens",
          values: ["2", "1", "+", "3", "*"],
          highlights: { 0: "active" },
        },
        { type: "stack", label: "stack", values: [2], topHighlight: true },
      ],
    },
    {
      description:
        'Token "1" is a number. Push 1 onto the stack.',
      codeHighlightLines: [3, 11, 12],
      structures: [
        {
          type: "array",
          label: "tokens",
          values: ["2", "1", "+", "3", "*"],
          highlights: { 1: "active" },
        },
        { type: "stack", label: "stack", values: [2, 1], topHighlight: true },
      ],
    },
    {
      description:
        'Token "+" is an operator. Pop b=1 and a=2. Compute a+b = 2+1 = 3. Push 3.',
      codeHighlightLines: [3, 4, 5, 6, 7],
      structures: [
        {
          type: "array",
          label: "tokens",
          values: ["2", "1", "+", "3", "*"],
          highlights: { 2: "active" },
        },
        { type: "stack", label: "stack", values: [3], topHighlight: true },
        {
          type: "variables",
          entries: [
            { name: "a", value: 2 },
            { name: "b", value: 1 },
            { name: "a + b", value: 3, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        'Token "3" is a number. Push 3 onto the stack.',
      codeHighlightLines: [3, 11, 12],
      structures: [
        {
          type: "array",
          label: "tokens",
          values: ["2", "1", "+", "3", "*"],
          highlights: { 3: "active" },
        },
        { type: "stack", label: "stack", values: [3, 3], topHighlight: true },
      ],
    },
    {
      description:
        'Token "*" is an operator. Pop b=3 and a=3. Compute a*b = 3*3 = 9. Push 9.',
      codeHighlightLines: [3, 4, 5, 6, 9],
      structures: [
        {
          type: "array",
          label: "tokens",
          values: ["2", "1", "+", "3", "*"],
          highlights: { 4: "active" },
        },
        { type: "stack", label: "stack", values: [9], topHighlight: true },
        {
          type: "variables",
          entries: [
            { name: "a", value: 3 },
            { name: "b", value: 3 },
            { name: "a * b", value: 9, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "All tokens processed. The final answer is stack[0] = 9. The expression (2+1)*3 = 9.",
      codeHighlightLines: [13],
      structures: [
        {
          type: "array",
          label: "tokens",
          values: ["2", "1", "+", "3", "*"],
          highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" },
        },
        { type: "stack", label: "stack", values: [9], topHighlight: true },
        {
          type: "variables",
          entries: [{ name: "return", value: 9, highlight: true }],
        },
      ],
    },
  ],
};

export default solution;

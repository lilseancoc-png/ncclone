import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def generateParenthesis(n):
    result = []
    def backtrack(current, open_count, close_count):
        if len(current) == 2 * n:
            result.append(current)
            return
        if open_count < n:
            backtrack(current + "(", open_count + 1, close_count)
        if close_count < open_count:
            backtrack(current + ")", open_count, close_count + 1)
    backtrack("", 0, 0)
    return result`,
  steps: [
    {
      description:
        "For n=3, we need all valid combinations of 3 open and 3 close parentheses. We build strings character by character using backtracking with two rules: we can add '(' if open_count < n, and ')' if close_count < open_count.",
      codeHighlightLines: [1, 2, 3, 10],
      structures: [
        {
          type: "variables",
          entries: [
            { name: "n", value: 3 },
            { name: "current", value: "" },
            { name: "open_count", value: 0 },
            { name: "close_count", value: 0 },
          ],
        },
        { type: "array", label: "result", values: [] },
      ],
    },
    {
      description:
        'We can only add "(" since close_count is not less than open_count yet. We keep adding open parens: "(" -> "((" -> "(((".',
      codeHighlightLines: [6, 7],
      structures: [
        {
          type: "array",
          label: "Building current",
          values: ["(", "(", "("],
          highlights: { 0: "active", 1: "active", 2: "active" },
        },
        {
          type: "variables",
          entries: [
            { name: "current", value: "(((" },
            { name: "open_count", value: 3, highlight: true },
            { name: "close_count", value: 0 },
          ],
        },
        { type: "array", label: "result", values: [] },
      ],
    },
    {
      description:
        'open_count=3=n, so we can only add ")". We close all three: "(((" -> "((()" -> "((())" -> "((()))". Length=6=2*n, so we add this to result.',
      codeHighlightLines: [4, 5, 8, 9],
      structures: [
        {
          type: "array",
          label: "Building current",
          values: ["(", "(", "(", ")", ")", ")"],
          highlights: { 3: "success", 4: "success", 5: "success" },
        },
        {
          type: "variables",
          entries: [
            { name: "current", value: "((()))", highlight: true },
            { name: "open_count", value: 3 },
            { name: "close_count", value: 3 },
          ],
        },
        { type: "array", label: "result", values: ["((()))"] },
      ],
    },
    {
      description:
        'Backtrack to "((" where open=2, close=0. Instead of "(", try ")": "(()" then continue exploring. This path yields "(()())" and "(())()".',
      codeHighlightLines: [7, 8, 9],
      structures: [
        {
          type: "array",
          label: "Backtrack to",
          values: ["(", "("],
          highlights: { 0: "pointer-i", 1: "pointer-i" },
        },
        {
          type: "variables",
          entries: [
            { name: "current", value: "((" },
            { name: "open_count", value: 2 },
            { name: "close_count", value: 0 },
            { name: "choice", value: ")", highlight: true },
          ],
        },
        { type: "array", label: "result", values: ["((()))", "(()())", "(())()"] },
      ],
    },
    {
      description:
        'Backtrack to "(" where open=1, close=0. After "(" we already explored all paths. Now try ")": but close_count=0 is not < open_count=1... wait, it is! So we get "()" then continue from there.',
      codeHighlightLines: [6, 7, 8, 9],
      structures: [
        {
          type: "array",
          label: "Backtrack to",
          values: ["("],
          highlights: { 0: "pointer-i" },
        },
        {
          type: "variables",
          entries: [
            { name: "current", value: "(" },
            { name: "open_count", value: 1 },
            { name: "close_count", value: 0 },
            { name: "choice", value: ")", highlight: true },
          ],
        },
        {
          type: "array",
          label: "result",
          values: ["((()))", "(()())", "(())()"],
        },
      ],
    },
    {
      description:
        'From "()" we build "()(())" and "()()()" to complete all valid combinations.',
      codeHighlightLines: [4, 5, 7, 9],
      structures: [
        {
          type: "array",
          label: "Building from \"()\"",
          values: ["(", ")"],
          highlights: { 0: "active", 1: "active" },
        },
        {
          type: "variables",
          entries: [
            { name: "open_count", value: 1 },
            { name: "close_count", value: 1 },
          ],
        },
        {
          type: "array",
          label: "result",
          values: ["((()))", "(()())", "(())()", "()(())", "()()()"],
          highlights: { 3: "success", 4: "success" },
        },
      ],
    },
    {
      description:
        "All 5 valid combinations for n=3 have been found. The backtracking ensured we only built valid strings by checking open_count and close_count at each step.",
      codeHighlightLines: [11],
      structures: [
        {
          type: "array",
          label: "result",
          values: ["((()))", "(()())", "(())()", "()(())", "()()()"],
          highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" },
        },
        {
          type: "variables",
          entries: [{ name: "total combinations", value: 5, highlight: true }],
        },
      ],
    },
  ],
};

export default solution;

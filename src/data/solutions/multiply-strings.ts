import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Grade School Multiplication",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m + n)",
    code: `def multiply(num1, num2):
    if num1 == "0" or num2 == "0":
        return "0"
    result = [0] * (len(num1) + len(num2))
    for i in range(len(num1) - 1, -1, -1):
        for j in range(len(num2) - 1, -1, -1):
            mul = int(num1[i]) * int(num2[j])
            p1, p2 = i + j, i + j + 1
            total = mul + result[p2]
            result[p2] = total % 10
            result[p1] += total // 10
    result_str = ''.join(map(str, result))
    return result_str.lstrip('0') or '0'`,
    steps: [
      {
        description:
          "Multiply two numbers represented as strings, just like grade school multiplication. We use a result array of size m+n (max possible digits). Each pair of digits contributes to positions i+j and i+j+1 in the result.",
        codeHighlightLines: [1, 4],
        structures: [
          {
            type: "array",
            label: "num1",
            values: ["1", "2", "3"],
            highlights: {},
          },
          {
            type: "array",
            label: "num2",
            values: ["4", "5"],
            highlights: {},
          },
          {
            type: "array",
            label: "result",
            values: [0, 0, 0, 0, 0],
            highlights: {},
          },
        ],
      },
      {
        description:
          "i=2, j=1: num1[2]*num2[1] = 3*5 = 15. Position p2=4: result[4] = 15%10 = 5. Position p1=3: result[3] += 15//10 = 1.",
        codeHighlightLines: [7, 8, 9, 10, 11],
        structures: [
          {
            type: "array",
            label: "num1",
            values: ["1", "2", "3"],
            highlights: { 2: "active" },
          },
          {
            type: "array",
            label: "num2",
            values: ["4", "5"],
            highlights: { 1: "active" },
          },
          {
            type: "array",
            label: "result",
            values: [0, 0, 0, 1, 5],
            highlights: { 3: "active", 4: "active" },
          },
        ],
      },
      {
        description:
          "i=2, j=0: 3*4 = 12. p2=3: total = 12 + 1 = 13. result[3] = 3, result[2] += 1. Continue for all digit pairs...",
        codeHighlightLines: [7, 8, 9, 10, 11],
        structures: [
          {
            type: "array",
            label: "num1",
            values: ["1", "2", "3"],
            highlights: { 2: "active" },
          },
          {
            type: "array",
            label: "num2",
            values: ["4", "5"],
            highlights: { 0: "active" },
          },
          {
            type: "array",
            label: "result",
            values: [0, 0, 1, 3, 5],
            highlights: { 2: "active", 3: "active" },
          },
        ],
      },
      {
        description:
          "After processing all pairs: result = [0, 5, 5, 3, 5]. Strip leading zeros → '5535'. 123 * 45 = 5535. Each digit pair (i,j) is processed exactly once, giving O(m*n) time.",
        codeHighlightLines: [12, 13],
        structures: [
          {
            type: "array",
            label: "result",
            values: [0, 5, 5, 3, 5],
            highlights: { 1: "success", 2: "success", 3: "success", 4: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: "5535", highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

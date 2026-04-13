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
          "Multiply two numbers represented as strings, like grade school multiplication. Use a result array of size m+n (max possible digits). Each pair of digits at positions (i, j) contributes to result positions i+j (tens) and i+j+1 (ones). num1='123', num2='45'. Expected: 5535.",
        codeHighlightLines: [1, 4],
        structures: [
          { type: "array", label: "num1", values: ["1", "2", "3"] },
          { type: "array", label: "num2", values: ["4", "5"] },
          { type: "array", label: "result", values: [0, 0, 0, 0, 0] },
        ],
      },
      {
        description:
          "Start from rightmost digits. i=2, j=1: 3×5 = 15. Position p2=4: result[4] = 15%10 = 5. Position p1=3: result[3] += 15//10 = 1. This is the 'ones × ones' multiplication — the product goes into the rightmost positions.",
        codeHighlightLines: [7, 8, 9, 10, 11],
        structures: [
          { type: "array", label: "num1", values: ["1", "2", "3"], highlights: { 2: "active" } },
          { type: "array", label: "num2", values: ["4", "5"], highlights: { 1: "active" } },
          { type: "array", label: "result", values: [0, 0, 0, 1, 5], highlights: { 3: "active", 4: "active" } },
          { type: "variables", entries: [{ name: "3 × 5 = 15", value: "p2=4: 5, p1=3: 1", highlight: true }] },
        ],
      },
      {
        description:
          "i=2, j=0: 3×4 = 12. p2=3: total = 12 + result[3] = 12+1 = 13. result[3] = 13%10 = 3. p1=2: result[2] += 13//10 = 1. The carry from 15 (step 2) combines with this product — just like carrying in long multiplication.",
        codeHighlightLines: [7, 8, 9, 10, 11],
        structures: [
          { type: "array", label: "num1", values: ["1", "2", "3"], highlights: { 2: "active" } },
          { type: "array", label: "num2", values: ["4", "5"], highlights: { 0: "active" } },
          { type: "array", label: "result", values: [0, 0, 1, 3, 5], highlights: { 2: "active", 3: "active" } },
          { type: "variables", entries: [{ name: "3 × 4 = 12", value: "total=12+1=13 → 3 carry 1", highlight: true }] },
        ],
      },
      {
        description:
          "i=1, j=1: 2×5 = 10. p2=3: total = 10+3 = 13. result[3] = 3, result[2] += 1 → result[2]=2. i=1, j=0: 2×4 = 8. p2=2: total = 8+2 = 10. result[2] = 0, result[1] += 1. i=0, j=1: 1×5 = 5. p2=2: total = 5+0 = 5. result[2] = 5. i=0, j=0: 1×4 = 4. p2=1: total = 4+1 = 5. result[1] = 5.",
        codeHighlightLines: [7, 8, 9, 10, 11],
        structures: [
          { type: "array", label: "result (after all pairs)", values: [0, 5, 5, 3, 5], highlights: { 1: "active", 2: "active", 3: "active", 4: "active" } },
          { type: "variables", entries: [{ name: "all 6 digit pairs processed", value: "each contributes to its position", highlight: true }] },
        ],
      },
      {
        description:
          "Strip leading zeros: '05535' → '5535'. Return '5535'. 123 × 45 = 5535 ✓. Each pair (i,j) is processed exactly once, and carries propagate naturally through the result array. Time: O(m×n) — one multiplication per digit pair. Space: O(m+n) for the result array.",
        codeHighlightLines: [12, 13],
        structures: [
          { type: "array", label: "result", values: [0, 5, 5, 3, 5], highlights: { 1: "success", 2: "success", 3: "success", 4: "success" } },
          { type: "variables", entries: [{ name: "return", value: "5535", highlight: true }, { name: "Time", value: "O(m × n)" }, { name: "Space", value: "O(m + n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

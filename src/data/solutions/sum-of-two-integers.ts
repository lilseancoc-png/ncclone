import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Bit Manipulation — XOR and AND",
    timeComplexity: "O(32) = O(1)",
    spaceComplexity: "O(1)",
    code: `def getSum(a, b):
    mask = 0xFFFFFFFF
    while b & mask:
        carry = (a & b) << 1
        a = a ^ b
        b = carry
    return a & mask if b > 0 else a`,
    steps: [
      {
        description:
          "Add two integers without using + or -. Key insight: XOR gives sum without carry, AND then left-shift gives the carry. Repeat until no carry remains. Example: a=5 (101), b=3 (011).",
        codeHighlightLines: [1, 2],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "a", value: "5 (101)" },
              { name: "b", value: "3 (011)" },
            ],
          },
        ],
      },
      {
        description:
          "Iteration 1: carry = (5 & 3) << 1 = (001) << 1 = 010 = 2. a = 5 ^ 3 = 101 ^ 011 = 110 = 6. b = carry = 2. XOR adds bits where only one is 1; AND finds bits where both are 1 (carry).",
        codeHighlightLines: [4, 5, 6],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "a ^ b (XOR)", value: "110 = 6", highlight: true },
              { name: "(a & b) << 1", value: "010 = 2", highlight: true },
              { name: "a", value: 6 },
              { name: "b (carry)", value: 2 },
            ],
          },
        ],
      },
      {
        description:
          "Iteration 2: carry = (6 & 2) << 1 = (010) << 1 = 100 = 4. a = 6 ^ 2 = 110 ^ 010 = 100 = 4. b = carry = 4.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "a", value: 4, highlight: true },
              { name: "b (carry)", value: 4, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Iteration 3: carry = (4 & 4) << 1 = (100) << 1 = 1000 = 8. a = 4 ^ 4 = 0. b = 8. Iteration 4: carry = 0. a = 0 ^ 8 = 8. b = 0. Loop ends!",
        codeHighlightLines: [4, 5, 6, 7],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "a", value: 8, highlight: true },
              { name: "b", value: 0 },
              { name: "return", value: "8 (5 + 3 = 8)", highlight: true },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

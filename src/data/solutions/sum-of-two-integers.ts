import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Bit Manipulation",
  timeComplexity: "O(1)",
  spaceComplexity: "O(1)",

  steps: [
    {
      description: "XOR gives sum without carry. AND + shift gives carry bits. Repeat until no carry.",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "variables", label: "Iteration 1", entries: [{ name: "a", value: "1 (01)" }, { name: "b", value: "2 (10)" }, { name: "a XOR b", value: "3 (11)" }, { name: "a AND b", value: "0 (00)" }, { name: "carry", value: 0 }] },
      ],
    },
    {
      description: "Another example: a=2, b=3. XOR: 01, carry: 100. Then XOR: 101, carry: 0. Done → 5.",
      codeHighlightLines: [3],
      structures: [
        { type: "variables", label: "Step 1", entries: [{ name: "a", value: "2 (010)" }, { name: "b", value: "3 (011)" }, { name: "XOR", value: "1 (001)" }, { name: "carry", value: "4 (100)" }] },
        { type: "variables", label: "Step 2", entries: [{ name: "a", value: "1 (001)" }, { name: "b", value: "4 (100)" }, { name: "XOR", value: "5 (101)" }, { name: "carry", value: "0 (000)" }] },
      ],
    },
    {
      description: "Carry is 0 — done. Return a = 5.",
      codeHighlightLines: [7],
      structures: [
        { type: "variables", label: "Result", entries: [{ name: "a", value: 5 }, { name: "b", value: 0 }, { name: "result", value: 5 }] },
      ],
    },
  ],
};

export default solution;

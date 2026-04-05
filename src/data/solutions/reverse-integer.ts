import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Math — Pop and Push",
  timeComplexity: "O(log x)",
  spaceComplexity: "O(1)",

  steps: [
    {
      description: "Pop last digit (3) from 123, push to result. result = 3.",
      codeHighlightLines: [5, 6, 9],
      structures: [
        { type: "variables", label: "Iteration 1", entries: [{ name: "x", value: 123 }, { name: "digit", value: 3 }, { name: "result", value: 3 }] },
      ],
    },
    {
      description: "Pop 2, push to result. result = 32. Pop 1, push. result = 321.",
      codeHighlightLines: [4],
      structures: [
        { type: "variables", label: "Iteration 2", entries: [{ name: "x", value: 12 }, { name: "digit", value: 2 }, { name: "result", value: 32 }] },
        { type: "variables", label: "Iteration 3", entries: [{ name: "x", value: 1 }, { name: "digit", value: 1 }, { name: "result", value: 321 }] },
      ],
    },
    {
      description: "x = 0, loop ends. Check overflow at each step. Return 321.",
      codeHighlightLines: [7, 8, 10],
      structures: [
        { type: "variables", label: "Result", entries: [{ name: "input", value: 123 }, { name: "output", value: 321 }, { name: "overflow", value: "No" }] },
      ],
    },
  ],
};

export default solution;

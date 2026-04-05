import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Bit Manipulation",
  timeComplexity: "O(1)",
  spaceComplexity: "O(1)",

  steps: [
    {
      description: "Extract each bit from right to left, place it in the reversed position.",
      codeHighlightLines: [3, 4, 5],
      structures: [
        { type: "array", label: "Input bits (right to left)", values: [0, 0, 1, 1, 1, 0, 0, 1], highlights: { 0: "active" } },
        { type: "variables", label: "State", entries: [{ name: "i", value: 0 }, { name: "bit", value: 0 }, { name: "placed at", value: "position 31" }] },
      ],
    },
    {
      description: "After processing several bits, the result builds up from the other end.",
      codeHighlightLines: [5],
      structures: [
        { type: "array", label: "Input bits", values: [0, 0, 1, 1, 1, 0, 0, 1], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "active" } },
        { type: "array", label: "Result bits (building)", values: [1, 0, 0, 1, "...", "...", "...", "..."], highlights: { 0: "success", 3: "active" } },
      ],
    },
    {
      description: "All 32 bits reversed. n=43261596 → result=964176192.",
      codeHighlightLines: [6],
      structures: [
        { type: "variables", label: "Result", entries: [{ name: "input", value: 43261596 }, { name: "output", value: 964176192 }] },
      ],
    },
  ],
};

export default solution;

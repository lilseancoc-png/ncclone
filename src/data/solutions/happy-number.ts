import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Floyd's Cycle Detection",
  timeComplexity: "O(log n)",
  spaceComplexity: "O(1)",

  steps: [
    {
      description: "Compute digit square sums. 19 → 1²+9² = 82. Use slow/fast pointers to detect cycle.",
      codeHighlightLines: [10, 11],
      structures: [
        { type: "variables", label: "Sequence", entries: [{ name: "19", value: "1²+9²=82" }, { name: "82", value: "6²+8²=68" }, { name: "68", value: "3²+6²=100" }] },
        { type: "variables", label: "Pointers", entries: [{ name: "slow", value: 19 }, { name: "fast", value: 82 }] },
      ],
    },
    {
      description: "Slow moves one step, fast moves two. Continue until fast reaches 1 or cycle detected.",
      codeHighlightLines: [12, 13, 14],
      structures: [
        { type: "variables", label: "Sequence", entries: [{ name: "100", value: "1²=1" }, { name: "→", value: "HAPPY!" }] },
        { type: "variables", label: "Pointers", entries: [{ name: "slow", value: 82 }, { name: "fast", value: 1 }] },
      ],
    },
    {
      description: "Fast pointer reached 1 → 19 is a happy number!",
      codeHighlightLines: [15],
      structures: [
        { type: "variables", label: "Result", entries: [{ name: "n", value: 19 }, { name: "is happy", value: "True" }, { name: "path", value: "19→82→68→100→1" }] },
      ],
    },
  ],
};

export default solution;

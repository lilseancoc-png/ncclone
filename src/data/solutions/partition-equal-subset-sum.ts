import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "DP — Boolean Set",
  timeComplexity: "O(n·sum)",
  spaceComplexity: "O(sum)",

  steps: [
    {
      description: "If total sum is odd, can't partition equally. Target = sum/2 = 22/2 = 11.",
      codeHighlightLines: [2, 3, 5],
      structures: [
        { type: "array", label: "nums", values: [1, 5, 11, 5], highlights: {} },
        { type: "variables", label: "State", entries: [{ name: "total", value: 22 }, { name: "target", value: 11 }] },
      ],
    },
    {
      description: "Build set of reachable sums. After n=1: {0,1}. After n=5: {0,1,5,6}.",
      codeHighlightLines: [7, 10, 11],
      structures: [
        { type: "set", label: "Reachable sums after [1,5]", values: ["0", "1", "5", "6"], highlights: {} },
        { type: "variables", label: "State", entries: [{ name: "target", value: 11 }, { name: "found", value: "not yet" }] },
      ],
    },
    {
      description: "After n=11: sums include 11 (= 0+11) and 16 (=5+11). Target 11 found → True!",
      codeHighlightLines: [13, 14],
      structures: [
        { type: "set", label: "Reachable sums", values: ["0", "1", "5", "6", "11", "12", "16", "17"], highlights: { 4: "success" } },
        { type: "variables", entries: [{ name: "can partition", value: "True" }, { name: "subset", value: "{11} and {1,5,5}" }] },
      ],
    },
  ],
};

export default solution;

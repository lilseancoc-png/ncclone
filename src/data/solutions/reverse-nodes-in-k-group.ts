import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Iterative Reversal",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",

  steps: [
    {
      description: "Find kth node from groupPrev. If fewer than k nodes remain, stop.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "linkedlist", label: "List", nodes: [{ value: 1, highlight: "pointer-i" }, { value: 2, highlight: "pointer-j" }, { value: 3 }, { value: 4 }, { value: 5 }], pointers: [{ index: 0, label: "start" }, { index: 1, label: "kth" }] },
        { type: "variables", label: "State", entries: [{ name: "k", value: 2 }, { name: "group", value: "[1,2]" }, { name: "kth", value: 2 }] },
      ],
    },
    {
      description: "Reverse first group [1,2] -> [2,1]. Move groupPrev to end of reversed group.",
      codeHighlightLines: [10, 11, 13],
      structures: [
        { type: "linkedlist", label: "List", nodes: [{ value: 2, highlight: "success" }, { value: 1, highlight: "success" }, { value: 3, highlight: "pointer-i" }, { value: 4, highlight: "pointer-j" }, { value: 5 }], pointers: [{ index: 1, label: "groupPrev" }, { index: 2, label: "start" }, { index: 3, label: "kth" }] },
        { type: "variables", label: "State", entries: [{ name: "reversed", value: "[2,1]" }, { name: "next group", value: "[3,4]" }] },
      ],
    },
    {
      description: "Reverse [3,4] -> [4,3]. Node 5 has no pair, stays. Result: [2,1,4,3,5].",
      codeHighlightLines: [17, 18],
      structures: [
        { type: "linkedlist", label: "Result", nodes: [{ value: 2, highlight: "success" }, { value: 1, highlight: "success" }, { value: 4, highlight: "success" }, { value: 3, highlight: "success" }, { value: 5, highlight: "checked" }], pointers: [{ index: 0, label: "head" }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Divide and Conquer",
  timeComplexity: "O(n log k)",
  spaceComplexity: "O(log k)",

  steps: [
    {
      description: "Start with k=3 sorted lists. Merge pairs: list 0+1, list 2 carries over.",
      codeHighlightLines: [7, 8, 9],
      structures: [
        { type: "linkedlist", label: "List 1", nodes: [{ value: 1, highlight: "pointer-i" }, { value: 4 }, { value: 5 }], pointers: [{ index: 0, label: "p1" }] },
        { type: "linkedlist", label: "List 2", nodes: [{ value: 1, highlight: "pointer-i" }, { value: 3 }, { value: 4 }], pointers: [{ index: 0, label: "p2" }] },
        { type: "linkedlist", label: "List 3", nodes: [{ value: 2 }, { value: 6 }] },
        { type: "variables", label: "Round 1", entries: [{ name: "pairs", value: "merge(L1,L2), carry L3" }] },
      ],
    },
    {
      description: "After round 1: merged [1,1,3,4,4,5] and [2,6]. Round 2: merge these two.",
      codeHighlightLines: [10, 11],
      structures: [
        { type: "linkedlist", label: "Merged L1+L2", nodes: [{ value: 1, highlight: "success" }, { value: 1, highlight: "success" }, { value: 3 }, { value: 4 }, { value: 4 }, { value: 5 }], pointers: [{ index: 0, label: "p1" }] },
        { type: "linkedlist", label: "List 3", nodes: [{ value: 2 }, { value: 6 }], pointers: [{ index: 0, label: "p2" }] },
        { type: "variables", label: "Round 2", entries: [{ name: "lists remaining", value: 2 }] },
      ],
    },
    {
      description: "Final merge complete. One sorted list remains: [1,1,2,3,4,4,5,6].",
      codeHighlightLines: [12],
      structures: [
        { type: "linkedlist", label: "Result", nodes: [{ value: 1, highlight: "success" }, { value: 1, highlight: "success" }, { value: 2, highlight: "success" }, { value: 3, highlight: "success" }, { value: 4, highlight: "success" }, { value: 4, highlight: "success" }, { value: 5, highlight: "success" }, { value: 6, highlight: "success" }], pointers: [{ index: 0, label: "head" }] },
      ],
    },
  ],
};

export default solution;

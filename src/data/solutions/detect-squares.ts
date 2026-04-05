import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "HashMap Point Counting",
  timeComplexity: "O(n) per count",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "Store points with counts. For count query, find diagonal points that form a square.",
      codeHighlightLines: [7],
      structures: [
        { type: "hashmap", label: "Points", entries: [["(3,10)", "1"], ["(11,2)", "1"], ["(3,2)", "1"], ["(11,10)", "1"]], highlights: {} },
      ],
    },
    {
      description: "count([11,10]): For each point, check if it could be a diagonal corner of a square.",
      codeHighlightLines: [14, 15],
      structures: [
        { type: "variables", label: "Query", entries: [{ name: "point", value: "(11,10)" }, { name: "checking diagonal", value: "(3,2)" }, { name: "|11-3|=|10-2|", value: "8=8 ✓" }] },
        { type: "variables", label: "Square corners", entries: [{ name: "top-right", value: "(11,10)" }, { name: "bottom-left", value: "(3,2)" }, { name: "top-left", value: "(3,10)" }, { name: "bottom-right", value: "(11,2)" }] },
      ],
    },
    {
      description: "Check if other two corners exist. points[(3,10)] × points[(11,2)] = 1×1 = 1 square found.",
      codeHighlightLines: [16],
      structures: [
        { type: "variables", label: "Result", entries: [{ name: "count", value: 1 }, { name: "(3,10) exists", value: "✓" }, { name: "(11,2) exists", value: "✓" }] },
      ],
    },
  ],
};

export default solution;

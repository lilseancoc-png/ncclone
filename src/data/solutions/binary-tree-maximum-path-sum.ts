import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "DFS — Max Gain",
  timeComplexity: "O(n)",
  spaceComplexity: "O(h)",

  steps: [
    {
      description: "DFS returns max single-path gain from each node. Negative gains are clamped to 0.",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "tree", label: "Tree [1,2,3]", root: { value: 1, left: { value: 2 }, right: { value: 3 } } },
        { type: "variables", label: "DFS at node 2", entries: [{ name: "left gain", value: "0 (leaf)" }, { name: "right gain", value: "0 (leaf)" }, { name: "return", value: 2 }] },
      ],
    },
    {
      description: "At each node, check if path through this node (left + node + right) is the global max.",
      codeHighlightLines: [9],
      structures: [
        { type: "tree", label: "Tree [1,2,3]", root: { value: 1, highlight: "active", left: { value: 2, highlight: "success" }, right: { value: 3, highlight: "success" } } },
        { type: "variables", label: "DFS at node 1 (root)", entries: [{ name: "left gain", value: 2 }, { name: "right gain", value: 3 }, { name: "path through root", value: "2+1+3=6" }, { name: "global max", value: 6 }] },
      ],
    },
    {
      description: "Path 2->1->3 gives max sum = 6. Return single path gain upward: 1 + max(2,3) = 4.",
      codeHighlightLines: [10],
      structures: [
        { type: "tree", label: "Max Path: 2->1->3", root: { value: 1, highlight: "success", left: { value: 2, highlight: "success" }, right: { value: 3, highlight: "success" } } },
        { type: "variables", label: "Result", entries: [{ name: "max path sum", value: 6 }, { name: "path", value: "2 -> 1 -> 3" }] },
      ],
    },
  ],
};

export default solution;

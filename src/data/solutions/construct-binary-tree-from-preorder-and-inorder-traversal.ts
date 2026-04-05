import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Recursive with HashMap",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "First element of preorder (3) is the root. Find 3 in inorder to split left/right subtrees.",
      codeHighlightLines: [8, 11],
      structures: [
        { type: "array", label: "Preorder", values: [3, 9, 20, 15, 7], highlights: { 0: "active" } },
        { type: "array", label: "Inorder", values: [9, 3, 15, 20, 7], highlights: { 1: "active" } },
        { type: "tree", label: "Building Tree", root: { value: 3, highlight: "active" } },
        { type: "variables", label: "State", entries: [{ name: "root", value: 3 }, { name: "left subtree", value: "[9]" }, { name: "right subtree", value: "[15,20,7]" }] },
      ],
    },
    {
      description: "Recurse left: preorder next is 9, it's a leaf. Recurse right: preorder next is 20.",
      codeHighlightLines: [12, 13],
      structures: [
        { type: "array", label: "Preorder", values: [3, 9, 20, 15, 7], highlights: { 0: "checked", 1: "success", 2: "active" } },
        { type: "array", label: "Inorder", values: [9, 3, 15, 20, 7], highlights: { 0: "success", 1: "checked" } },
        { type: "tree", label: "Building Tree", root: { value: 3, left: { value: 9, highlight: "success" }, right: { value: 20, highlight: "active" } } },
      ],
    },
    {
      description: "20's left child is 15, right child is 7. Tree complete: [3, 9, 20, null, null, 15, 7].",
      codeHighlightLines: [14],
      structures: [
        { type: "array", label: "Preorder", values: [3, 9, 20, 15, 7], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
        { type: "tree", label: "Result Tree", root: { value: 3, highlight: "success", left: { value: 9, highlight: "success" }, right: { value: 20, highlight: "success", left: { value: 15, highlight: "success" }, right: { value: 7, highlight: "success" } } } },
      ],
    },
  ],
};

export default solution;

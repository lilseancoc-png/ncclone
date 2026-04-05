import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "BFS — Level Order",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "Serialize: BFS traversal, encoding null children as 'null'.",
      codeHighlightLines: [9, 10, 11],
      structures: [
        { type: "tree", label: "Original Tree", root: { value: 1, highlight: "active", left: { value: 2 }, right: { value: 3, left: { value: 4 }, right: { value: 5 } } } },
        { type: "array", label: "Serialized", values: ["1", "2", "3", "null", "null", "4", "5"], highlights: { 0: "success", 1: "success", 2: "success" } },
      ],
    },
    {
      description: "Deserialize: Read values, create nodes level by level using a queue.",
      codeHighlightLines: [19, 20],
      structures: [
        { type: "array", label: "Input", values: ["1", "2", "3", "null", "null", "4", "5"], highlights: { 0: "active", 1: "pointer-i", 2: "pointer-j" } },
        { type: "tree", label: "Building Tree", root: { value: 1, highlight: "success", left: { value: 2, highlight: "active" }, right: { value: 3, highlight: "active" } } },
      ],
    },
    {
      description: "Continue assigning children. 'null' entries mean no child. Tree fully reconstructed.",
      codeHighlightLines: [23, 24],
      structures: [
        { type: "array", label: "Input", values: ["1", "2", "3", "null", "null", "4", "5"], highlights: { 0: "success", 1: "success", 2: "success", 3: "checked", 4: "checked", 5: "success", 6: "success" } },
        { type: "tree", label: "Reconstructed Tree", root: { value: 1, highlight: "success", left: { value: 2, highlight: "success" }, right: { value: 3, highlight: "success", left: { value: 4, highlight: "success" }, right: { value: 5, highlight: "success" } } } },
      ],
    },
  ],
};

export default solution;

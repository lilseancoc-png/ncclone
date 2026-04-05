import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Track Min and Max",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",

  steps: [
    {
      description: "Track both min and max products — a negative × negative can become the new max.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [2, 3, -2, 4], highlights: { 0: "active" } },
        { type: "variables", label: "State", entries: [{ name: "curMin", value: 1 }, { name: "curMax", value: 1 }, { name: "result", value: 2 }] },
      ],
    },
    {
      description: "n=2: max=2, min=2. n=3: max=6, min=3. n=-2: max=-2, min=-12 (flip!).",
      codeHighlightLines: [9, 10],
      structures: [
        { type: "array", label: "nums", values: [2, 3, -2, 4], highlights: { 0: "success", 1: "success", 2: "found" } },
        { type: "variables", label: "After -2", entries: [{ name: "curMax", value: "-2" }, { name: "curMin", value: "-12" }, { name: "result", value: 6 }] },
      ],
    },
    {
      description: "n=4: max = max(-8, -48, 4) = 4, min = min(-8, -48, 4) = -48. Result stays 6.",
      codeHighlightLines: [11, 12],
      structures: [
        { type: "array", label: "nums", values: [2, 3, -2, 4], highlights: { 0: "success", 1: "success", 2: "checked", 3: "checked" } },
        { type: "variables", label: "Result", entries: [{ name: "max product", value: 6 }, { name: "subarray", value: "[2,3]" }] },
      ],
    },
  ],
};

export default solution;

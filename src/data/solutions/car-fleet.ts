import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Sort + Stack",
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "Sort cars by position descending. Calculate time to reach target for each car.",
      codeHighlightLines: [2],
      structures: [
        { type: "array", label: "Position (sorted)", values: [10, 8, 5, 3, 0], highlights: {} },
        { type: "array", label: "Speed", values: [2, 4, 1, 3, 1], highlights: {} },
        { type: "array", label: "Time to target", values: [1.0, 1.0, 7.0, 3.0, 12.0], highlights: {} },
        { type: "variables", label: "Config", entries: [{ name: "target", value: 12 }] },
      ],
    },
    {
      description: "Car at pos 10 takes 1.0s. Car at pos 8 also takes 1.0s — not slower, so merges into fleet.",
      codeHighlightLines: [6, 7],
      structures: [
        { type: "array", label: "Time to target", values: [1.0, 1.0, 7.0, 3.0, 12.0], highlights: { 0: "success", 1: "checked" } },
        { type: "stack", label: "Fleets (arrival times)", values: ["1.0"], highlights: {} },
        { type: "variables", label: "State", entries: [{ name: "fleets", value: 1 }] },
      ],
    },
    {
      description: "Car at pos 5 takes 7.0s (slower) — new fleet. Car at pos 3 takes 3.0s (faster, merges). Car at pos 0 takes 12.0s — new fleet.",
      codeHighlightLines: [4, 5],
      structures: [
        { type: "array", label: "Time to target", values: [1.0, 1.0, 7.0, 3.0, 12.0], highlights: { 0: "success", 1: "checked", 2: "success", 3: "checked", 4: "success" } },
        { type: "stack", label: "Fleets (arrival times)", values: ["1.0", "7.0", "12.0"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "fleets", value: 3 }] },
      ],
    },
  ],
};

export default solution;

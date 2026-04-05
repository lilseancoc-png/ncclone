import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "State Machine DP",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",

  steps: [
    {
      description: "Three states: hold (own stock), sold (just sold), rest (cooldown/idle).",
      codeHighlightLines: [3, 4, 5],
      structures: [
        { type: "array", label: "Prices", values: [1, 2, 3, 0, 2], highlights: { 0: "active" } },
        { type: "variables", label: "Initial State", entries: [{ name: "hold", value: "-1" }, { name: "sold", value: 0 }, { name: "rest", value: 0 }] },
      ],
    },
    {
      description: "Day 2 (price=2): sell for profit. Day 3 (price=3): cooldown. Day 4 (price=0): buy.",
      codeHighlightLines: [8, 9, 10],
      structures: [
        { type: "array", label: "Prices", values: [1, 2, 3, 0, 2], highlights: { 1: "success", 2: "success", 3: "active" } },
        { type: "variables", label: "After day 4", entries: [{ name: "hold", value: "-1 → buy at 0: hold=0-0=0? or keep=-1" }, { name: "sold", value: "was 2" }, { name: "rest", value: "max(rest,sold)=2" }] },
      ],
    },
    {
      description: "Day 5 (price=2): sell stock bought at 0 for profit 2. Total = buy@1,sell@2 + buy@0,sell@2 = 3.",
      codeHighlightLines: [11],
      structures: [
        { type: "array", label: "Prices", values: [1, 2, 3, 0, 2], highlights: { 0: "success", 1: "success", 3: "success", 4: "success" } },
        { type: "variables", label: "Result", entries: [{ name: "max profit", value: 3 }, { name: "strategy", value: "buy@1,sell@2,cool,buy@0,sell@2" }] },
      ],
    },
  ],
};

export default solution;

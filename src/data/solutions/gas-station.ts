import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Greedy — One Pass",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def can_complete_circuit(gas, cost):
    if sum(gas) < sum(cost):
        return -1
    tank = 0
    start = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:
            start = i + 1  # can't start at or before i
            tank = 0
    return start`,
  steps: [
    {
      description:
        "Find the starting gas station to complete a circular trip. Key insight: if total gas >= total cost, a solution exists. Find it greedily. gas=[1,2,3,4,5], cost=[3,4,5,1,2].",
      codeHighlightLines: [1, 2, 3, 4, 5],
      structures: [
        { type: "array", label: "gas", values: [1, 2, 3, 4, 5] },
        { type: "array", label: "cost", values: [3, 4, 5, 1, 2] },
        { type: "variables", entries: [{ name: "total gas", value: 15 }, { name: "total cost", value: 15 }, { name: "solution exists?", value: "yes (15>=15)" }] },
      ],
    },
    {
      description:
        "Start at 0. i=0: tank=1-3=-2 < 0 → can't start here. Reset: start=1, tank=0. i=1: tank=2-4=-2 < 0 → start=2, tank=0. i=2: tank=3-5=-2 < 0 → start=3, tank=0.",
      codeHighlightLines: [6, 7, 8, 9, 10],
      structures: [
        { type: "array", label: "net (gas-cost)", values: [-2, -2, -2, 3, 3], highlights: { 0: "found", 1: "found", 2: "found" } },
        { type: "variables", entries: [{ name: "start", value: 3 }, { name: "tank", value: 0 }] },
      ],
    },
    {
      description:
        "i=3: tank=4-1=3. i=4: tank=3+5-2=6. Never goes negative! Start=3 is our answer. From station 3: 4→5→1→2→3, tank never empties.",
      codeHighlightLines: [6, 7, 11],
      structures: [
        { type: "array", label: "net (gas-cost)", values: [-2, -2, -2, 3, 3], highlights: { 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "start", value: 3, highlight: true }, { name: "tank at end", value: 6 }] },
      ],
    },
    {
      description:
        "Return 3. Why this works: if tank goes negative at i, none of the stations from start to i can work (they'd all go negative sooner). So skip to i+1. O(n) single pass.",
      codeHighlightLines: [11],
      structures: [
        { type: "variables", entries: [{ name: "return", value: 3, highlight: true }] },
      ],
    },
  ],
};

export default solution;

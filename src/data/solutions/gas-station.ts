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
        "Find the starting gas station index to complete a circular trip. At each station i, you gain gas[i] fuel and spend cost[i] to reach station i+1. First critical insight: if total gas >= total cost, a solution is guaranteed to exist (and it's unique). Second insight: we can find it greedily in one pass. gas=[1,2,3,4,5], cost=[3,4,5,1,2]. Total gas=15, total cost=15, so a solution exists.",
      codeHighlightLines: [1, 2, 3, 4, 5],
      structures: [
        { type: "array", label: "gas", values: [1, 2, 3, 4, 5] },
        { type: "array", label: "cost", values: [3, 4, 5, 1, 2] },
        { type: "array", label: "net gain (gas-cost)", values: [-2, -2, -2, 3, 3] },
        { type: "variables", entries: [{ name: "total gas", value: 15 }, { name: "total cost", value: 15 }, { name: "solution exists?", value: "15 >= 15 → yes!" }] },
      ],
    },
    {
      description:
        "Start with start=0, tank=0. i=0: tank += gas[0]-cost[0] = 1-3 = -2. Tank is negative! This means we can't start at station 0 (we'd run out of gas before reaching station 1). But here's the greedy insight: if starting from station 0 leads to a negative tank at station 0, then starting from any station between 0 and 0 also won't work. So skip ahead: start=1, tank=0.",
      codeHighlightLines: [6, 7, 8, 9, 10],
      structures: [
        { type: "array", label: "net gain", values: [-2, -2, -2, 3, 3], highlights: { 0: "found" }, pointers: [{ index: 0, label: "i" }] },
        { type: "variables", entries: [{ name: "tank", value: "-2 → reset to 0" }, { name: "start", value: "0 → 1", highlight: true }] },
      ],
    },
    {
      description:
        "i=1: tank += 2-4 = -2 < 0 → start=2, tank=0. Station 1 can't work either. i=2: tank += 3-5 = -2 < 0 → start=3, tank=0. Station 2 fails too. Each time the tank goes negative, we know none of the stations we tried can be the answer — they all lead to running out at the same point or earlier. This is what makes the algorithm O(n): we never backtrack.",
      codeHighlightLines: [6, 7, 8, 9, 10],
      structures: [
        { type: "array", label: "net gain", values: [-2, -2, -2, 3, 3], highlights: { 0: "found", 1: "found", 2: "found" }, pointers: [{ index: 2, label: "i" }] },
        { type: "variables", entries: [{ name: "start", value: 3, highlight: true }, { name: "tank", value: 0 }, { name: "stations 0-2", value: "all eliminated" }] },
      ],
    },
    {
      description:
        "i=3: tank += 4-1 = 3. Tank is positive — station 3 looks promising! i=4: tank += 5-2 = 6. Still positive! We've reached the end of the array without the tank going negative. Since we proved a solution exists (total gas >= total cost), and start=3 survives to the end, station 3 must be the answer. The surplus (6) from stations 3-4 will cover the deficit (-6) from stations 0-2 when we wrap around.",
      codeHighlightLines: [6, 7, 11],
      structures: [
        { type: "array", label: "net gain", values: [-2, -2, -2, 3, 3], highlights: { 3: "success", 4: "success" }, pointers: [{ index: 3, label: "start" }] },
        { type: "variables", entries: [{ name: "start", value: 3, highlight: true }, { name: "tank after station 3", value: 3 }, { name: "tank after station 4", value: 6 }] },
      ],
    },
    {
      description:
        "Return 3. Starting at station 3 with a full trip: gain 4, spend 1 (tank=3) → gain 5, spend 2 (tank=6) → gain 1, spend 3 (tank=4) → gain 2, spend 4 (tank=2) → gain 3, spend 5 (tank=0). Tank never goes negative! Time: O(n) — single pass, no backtracking. Space: O(1) — just two variables.",
      codeHighlightLines: [11],
      structures: [
        { type: "variables", entries: [{ name: "return", value: 3, highlight: true }, { name: "trip from 3", value: "3→6→4→2→0 ✓" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

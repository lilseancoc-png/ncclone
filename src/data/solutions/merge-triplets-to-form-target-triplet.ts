import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Greedy — Filter and Check",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def mergeTriplets(triplets, target):
    good = set()
    for t in triplets:
        if t[0] > target[0] or t[1] > target[1] or t[2] > target[2]:
            continue
        for i in range(3):
            if t[i] == target[i]:
                good.add(i)
    return len(good) == 3`,
    steps: [
      {
        description:
          "Can we form the target triplet by taking element-wise maximums of selected triplets? The merge operation: pick any subset of triplets and take the max at each position. The key greedy insight: any triplet that has ANY value exceeding a target component is poisonous — using it would force that position above the target (max can only go up, never down). So first filter out bad triplets, then check if the remaining ones can collectively match every target position. target=[2,7,5], triplets=[[2,5,3],[1,7,5],[2,3,4]].",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "target", value: "[2, 7, 5]" },
              { name: "triplets", value: "[[2,5,3],[1,7,5],[2,3,4]]" },
            ],
          },
          { type: "set", label: "good (target positions matched)", values: [] },
        ],
      },
      {
        description:
          "Triplet [2,5,3]: Is any value > target? 2≤2 ✓, 5≤7 ✓, 3≤5 ✓. Safe to use! Now check which target values it matches exactly: t[0]=2 == target[0]=2 → add position 0 to 'good'. t[1]=5 ≠ 7, t[2]=3 ≠ 5. This triplet contributes the first component of our target.",
        codeHighlightLines: [3, 4, 5, 6, 7, 8],
        structures: [
          {
            type: "array",
            label: "triplet [2,5,3] vs target [2,7,5]",
            values: [2, 5, 3],
            highlights: { 0: "success" },
          },
          { type: "set", label: "good", values: [0], lastAdded: 0 },
        ],
      },
      {
        description:
          "Triplet [1,7,5]: Is any value > target? 1≤2 ✓, 7≤7 ✓, 5≤5 ✓. Safe! Matches: t[1]=7 == target[1]=7 → add position 1. t[2]=5 == target[2]=5 → add position 2. This triplet contributes positions 1 and 2. Now good = {0, 1, 2} — all three positions covered! We don't even need to check [2,3,4].",
        codeHighlightLines: [6, 7, 8],
        structures: [
          {
            type: "array",
            label: "triplet [1,7,5] vs target [2,7,5]",
            values: [1, 7, 5],
            highlights: { 1: "success", 2: "success" },
          },
          { type: "set", label: "good", values: [0, 1, 2], lastAdded: 2 },
        ],
      },
      {
        description:
          "len(good) == 3 → True! We can form [2,7,5] by merging [2,5,3] and [1,7,5]: max(2,1)=2 ✓, max(5,7)=7 ✓, max(3,5)=5 ✓. The greedy insight is powerful: we only need to verify each target value is achievable INDEPENDENTLY by some safe triplet. We don't need to track which specific triplets to merge. Time: O(n) single pass. Space: O(1) — the 'good' set has at most 3 elements.",
        codeHighlightLines: [9],
        structures: [
          {
            type: "variables",
            entries: [{ name: "return", value: "True", highlight: true }, { name: "merge", value: "max([2,5,3],[1,7,5]) = [2,7,5] ✓" }, { name: "Time", value: "O(n)" }],
          },
        ],
      },
    ],
  },
];

export default solutions;

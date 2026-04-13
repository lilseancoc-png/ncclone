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
          "Can we form the target triplet by taking element-wise maximums of selected triplets? The merge operation: pick any subset and take max at each position. Key insight: any triplet with ANY value exceeding a target component is 'poisonous' — max can only go up, never down. Filter those out, then check if remaining triplets collectively match every target position. target=[2,7,5], triplets=[[2,5,3],[8,7,5],[1,7,5],[2,3,4]].",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          { type: "variables", entries: [{ name: "target", value: "[2, 7, 5]" }, { name: "triplets", value: "[[2,5,3],[8,7,5],[1,7,5],[2,3,4]]" }] },
          { type: "set", label: "good (target positions matched)", values: [] },
        ],
      },
      {
        description:
          "Triplet [2,5,3]: Is any value > target? 2≤2 ✓, 5≤7 ✓, 3≤5 ✓. Safe! Check exact matches: t[0]=2 == target[0]=2 → add position 0. t[1]=5 ≠ 7, t[2]=3 ≠ 5. This triplet contributes the first component. good={0}.",
        codeHighlightLines: [3, 4, 5, 6, 7, 8],
        structures: [
          { type: "array", label: "[2,5,3] vs target [2,7,5]", values: [2, 5, 3], highlights: { 0: "success" } },
          { type: "set", label: "good", values: [0], lastAdded: 0 },
        ],
      },
      {
        description:
          "Triplet [8,7,5]: t[0]=8 > target[0]=2! Poisonous — if we include this triplet, position 0 would become max(...,8) = 8 > 2. Skip entirely. Even though it perfectly matches positions 1 and 2, one bad value ruins the whole triplet.",
        codeHighlightLines: [3, 4, 5],
        structures: [
          { type: "array", label: "[8,7,5] vs target [2,7,5]", values: [8, 7, 5], highlights: { 0: "active" } },
          { type: "variables", entries: [{ name: "8 > target[0]=2", value: "POISONOUS → skip", highlight: true }] },
          { type: "set", label: "good", values: [0] },
        ],
      },
      {
        description:
          "Triplet [1,7,5]: 1≤2 ✓, 7≤7 ✓, 5≤5 ✓. Safe! Matches: t[1]=7 == target[1]=7 → add 1. t[2]=5 == target[2]=5 → add 2. good={0,1,2} — all three positions covered! Triplet [2,3,4] is safe but unnecessary — we already matched everything.",
        codeHighlightLines: [6, 7, 8],
        structures: [
          { type: "array", label: "[1,7,5] vs target [2,7,5]", values: [1, 7, 5], highlights: { 1: "success", 2: "success" } },
          { type: "set", label: "good", values: [0, 1, 2], lastAdded: 2 },
        ],
      },
      {
        description:
          "len(good)==3 → True! Merge [2,5,3] and [1,7,5]: max(2,1)=2 ✓, max(5,7)=7 ✓, max(3,5)=5 ✓. We only need each target value achievable INDEPENDENTLY by some safe triplet — no need to track which specific ones to merge. The poisonous triplet [8,7,5] was correctly excluded. Time: O(n) single pass. Space: O(1) — 'good' set has at most 3 elements.",
        codeHighlightLines: [9],
        structures: [
          { type: "variables", entries: [{ name: "return", value: "True", highlight: true }, { name: "merge", value: "max([2,5,3],[1,7,5]) = [2,7,5] ✓" }, { name: "Time", value: "O(n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

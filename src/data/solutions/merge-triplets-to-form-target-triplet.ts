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
          "We need to determine if we can form the target triplet by taking element-wise maximums of selected triplets. Key insight: skip any triplet that has a value exceeding any target component (it would corrupt the result). From valid triplets, check if we can match each target position.",
        codeHighlightLines: [1, 2],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "target", value: "[2, 7, 5]" },
              { name: "triplets", value: "[[2,5,3],[1,7,5],[2,3,4]]" },
            ],
          },
          { type: "set", label: "good (positions matched)", values: [] },
        ],
      },
      {
        description:
          "Triplet [2,5,3]: No value exceeds target [2,7,5] ✓. t[0]=2 == target[0] → add position 0 to good. This triplet contributes the first component.",
        codeHighlightLines: [3, 4, 6, 7, 8],
        structures: [
          {
            type: "array",
            label: "triplet",
            values: [2, 5, 3],
            highlights: { 0: "success" },
          },
          { type: "set", label: "good", values: [0], lastAdded: 0 },
        ],
      },
      {
        description:
          "Triplet [1,7,5]: No value exceeds target ✓. t[1]=7 == target[1] → add 1. t[2]=5 == target[2] → add 2. Now good = {0, 1, 2}.",
        codeHighlightLines: [6, 7, 8],
        structures: [
          {
            type: "array",
            label: "triplet",
            values: [1, 7, 5],
            highlights: { 1: "success", 2: "success" },
          },
          { type: "set", label: "good", values: [0, 1, 2], lastAdded: 2 },
        ],
      },
      {
        description:
          "len(good) == 3 → return True. We can form [2,7,5] by merging [2,5,3] and [1,7,5]: max(2,1)=2, max(5,7)=7, max(3,5)=5. The greedy insight is that we only need to verify each target value is achievable independently.",
        codeHighlightLines: [9],
        structures: [
          {
            type: "variables",
            entries: [{ name: "return", value: "True", highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

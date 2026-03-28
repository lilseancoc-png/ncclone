import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def minEatingSpeed(piles, h):
    left, right = 1, max(piles)
    result = right
    while left <= right:
        k = (left + right) // 2
        hours = 0
        for p in piles:
            hours += (p + k - 1) // k
        if hours <= h:
            result = k
            right = k - 1
        else:
            left = k + 1
    return result`,
  steps: [
    {
      description:
        "Koko needs to eat all bananas in h=8 hours. We binary search for the minimum eating speed k between 1 and max(piles)=11.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "piles", values: [3, 6, 7, 11] },
        {
          type: "variables",
          entries: [
            { name: "h", value: 8 },
            { name: "left", value: 1 },
            { name: "right", value: 11 },
            { name: "result", value: 11 },
          ],
        },
      ],
    },
    {
      description:
        "Try k = (1+11)//2 = 6. Calculate hours: ceil(3/6)=1, ceil(6/6)=1, ceil(7/6)=2, ceil(11/6)=2. Total=6 hours. 6 <= 8, so k=6 works! Save result=6 and try smaller: right=5.",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11],
      structures: [
        {
          type: "array",
          label: "piles",
          values: [3, 6, 7, 11],
          highlights: { 0: "active", 1: "active", 2: "active", 3: "active" },
        },
        {
          type: "array",
          label: "hours per pile",
          values: [1, 1, 2, 2],
          highlights: { 0: "success", 1: "success", 2: "success", 3: "success" },
        },
        {
          type: "variables",
          entries: [
            { name: "k", value: 6, highlight: true },
            { name: "total hours", value: 6 },
            { name: "h", value: 8 },
            { name: "result", value: 6, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Try k = (1+5)//2 = 3. Hours: ceil(3/3)=1, ceil(6/3)=2, ceil(7/3)=3, ceil(11/3)=4. Total=10. 10 > 8, too slow! Move left=4.",
      codeHighlightLines: [5, 6, 7, 8, 12, 13],
      structures: [
        {
          type: "array",
          label: "piles",
          values: [3, 6, 7, 11],
          highlights: { 0: "active", 1: "active", 2: "active", 3: "active" },
        },
        {
          type: "array",
          label: "hours per pile",
          values: [1, 2, 3, 4],
          highlights: { 2: "found", 3: "found" },
        },
        {
          type: "variables",
          entries: [
            { name: "k", value: 3, highlight: true },
            { name: "total hours", value: 10 },
            { name: "h", value: 8 },
            { name: "result", value: 6 },
          ],
        },
      ],
    },
    {
      description:
        "Try k = (4+5)//2 = 4. Hours: ceil(3/4)=1, ceil(6/4)=2, ceil(7/4)=2, ceil(11/4)=3. Total=8. 8 <= 8, it works! Save result=4, try smaller: right=3.",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11],
      structures: [
        {
          type: "array",
          label: "piles",
          values: [3, 6, 7, 11],
          highlights: { 0: "active", 1: "active", 2: "active", 3: "active" },
        },
        {
          type: "array",
          label: "hours per pile",
          values: [1, 2, 2, 3],
          highlights: { 0: "success", 1: "success", 2: "success", 3: "success" },
        },
        {
          type: "variables",
          entries: [
            { name: "k", value: 4, highlight: true },
            { name: "total hours", value: 8, highlight: true },
            { name: "h", value: 8 },
            { name: "result", value: 4, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "left=4 > right=3, so the loop ends. The minimum eating speed is 4 bananas per hour.",
      codeHighlightLines: [4, 14],
      structures: [
        { type: "array", label: "piles", values: [3, 6, 7, 11] },
        {
          type: "variables",
          entries: [
            { name: "left", value: 4 },
            { name: "right", value: 3 },
            { name: "return", value: 4, highlight: true },
          ],
        },
      ],
    },
  ],
};

export default solution;

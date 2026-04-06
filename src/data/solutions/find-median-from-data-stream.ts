import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Two Heaps",
    timeComplexity: "O(log n) addNum, O(1) findMedian",
    spaceComplexity: "O(n)",
    code: `class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap (negated)
        self.large = []  # min-heap

    def addNum(self, num):
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2`,
    steps: [
      {
        description:
          "Maintain two heaps: a max-heap (small) for the lower half and a min-heap (large) for the upper half. The median is either the top of the max-heap (odd count) or the average of both tops (even count). Balancing ensures |small| >= |large| and |small| - |large| <= 1.",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          { type: "stack", label: "small (max-heap)", values: [] },
          { type: "stack", label: "large (min-heap)", values: [] },
        ],
      },
      {
        description:
          "addNum(1): Push to small → [-1]. Move top to large → large=[1]. large bigger → move back. small=[-1], large=[]. addNum(2): Push to small [-2,-1]. Move -(-2)=2 to large=[2]. Balanced. Median = (-(-1)+2)/2 = 1.5.",
        codeHighlightLines: [6, 7, 8, 9, 10],
        structures: [
          { type: "stack", label: "small (max-heap)", values: ["1"], topHighlight: true },
          { type: "stack", label: "large (min-heap)", values: ["2"], topHighlight: true },
          {
            type: "variables",
            entries: [{ name: "median", value: 1.5, highlight: true }],
          },
        ],
      },
      {
        description:
          "addNum(3): Push to small [-3,-1]. Move 3 to large=[2,3]. large bigger → move 2 back. small=[-2,-1], large=[3]. small has more → median = 2.",
        codeHighlightLines: [7, 8, 9, 10],
        structures: [
          { type: "stack", label: "small (max-heap)", values: ["1", "2"], topHighlight: true },
          { type: "stack", label: "large (min-heap)", values: ["3"], topHighlight: true },
          {
            type: "variables",
            entries: [{ name: "median", value: 2, highlight: true }],
          },
        ],
      },
      {
        description:
          "The two heaps always keep the data split in half. The tops give us instant access to the middle elements. Each addNum does at most 3 heap operations → O(log n). findMedian is O(1).",
        codeHighlightLines: [12, 13, 14, 15],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "small top", value: 2 },
              { name: "large top", value: 3 },
              { name: "stream", value: "[1, 2, 3]" },
              { name: "median", value: 2, highlight: true },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

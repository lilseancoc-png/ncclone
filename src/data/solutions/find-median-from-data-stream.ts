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
          "Find the median of a data stream efficiently. Sorting after each insertion is O(n log n) — too slow. The two-heap approach gives O(log n) insertion and O(1) median. Split the data into two halves: a max-heap ('small') stores the lower half, a min-heap ('large') stores the upper half. The median lives at the boundary between them. Invariants: (1) small's top ≤ large's top (halves don't overlap). (2) |small| = |large| or |small| = |large|+1 (balanced sizes). Python lacks a max-heap, so we negate values in 'small'.",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          { type: "stack", label: "small (max-heap, lower half)", values: [] },
          { type: "stack", label: "large (min-heap, upper half)", values: [] },
          { type: "variables", entries: [{ name: "invariant", value: "small.top ≤ large.top, sizes balanced" }] },
        ],
      },
      {
        description:
          "addNum(1): Always push to small first, then move small's top to large (ensures the largest of the lower half flows to the upper half). small=[-1] → pop top → large=[1]. But now large is bigger! Rebalance: move large's top back. small=[-1], large=[]. addNum(2): Push to small [-2,-1]. Pop top (2) → large=[2]. Now |small|=1, |large|=1 — balanced. Median = average of both tops = (1+2)/2 = 1.5. The push-to-small-then-move-to-large pattern guarantees the ordering invariant.",
        codeHighlightLines: [6, 7, 8, 9, 10],
        structures: [
          { type: "stack", label: "small (max-heap)", values: ["1"], topHighlight: true },
          { type: "stack", label: "large (min-heap)", values: ["2"], topHighlight: true },
          {
            type: "variables",
            entries: [{ name: "median", value: "(1+2)/2 = 1.5", highlight: true }, { name: "stream", value: "[1, 2]" }],
          },
        ],
      },
      {
        description:
          "addNum(3): Push 3 to small → small=[-3,-1] (max-heap, top is 3). Move top to large: large=[2,3]. Now |large|=2 > |small|=1, rebalance: move large's top (2) to small. small=[-2,-1], large=[3]. |small|=2 > |large|=1, so median = small's top = 2. The sorted stream is [1,2,3] — small holds [1,2] and large holds [3], with the median (2) sitting at the top of small.",
        codeHighlightLines: [6, 7, 8, 9, 10],
        structures: [
          { type: "stack", label: "small [1, 2]", values: ["1", "2"], topHighlight: true },
          { type: "stack", label: "large [3]", values: ["3"], topHighlight: true },
          {
            type: "variables",
            entries: [{ name: "median", value: 2, highlight: true }, { name: "stream (sorted)", value: "[1, 2, 3]" }],
          },
        ],
      },
      {
        description:
          "findMedian: If |small| > |large| (odd total), the median is small's top (the larger of the two middle candidates). If equal sizes (even total), median = average of both tops. Each addNum does at most 3 heap operations (push + pop + push) = O(log n). findMedian just reads the heap tops = O(1). Space: O(n) for both heaps combined. This pattern extends to any streaming quantile problem — using k heaps can track multiple quantiles.",
        codeHighlightLines: [12, 13, 14, 15],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "odd count", value: "median = small.top" },
              { name: "even count", value: "median = (small.top + large.top) / 2" },
              { name: "addNum", value: "O(log n)" },
              { name: "findMedian", value: "O(1)", highlight: true },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

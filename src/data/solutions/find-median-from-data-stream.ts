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
          "Find the median of a data stream with O(log n) insertion and O(1) median lookup. Split data into two halves: a max-heap ('small') for the lower half and a min-heap ('large') for the upper half. The median sits at the boundary between them. Invariants: (1) all elements in small ≤ all in large, (2) sizes differ by at most 1. Python lacks max-heaps, so we negate values in 'small'.",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          { type: "stack", label: "small (max-heap = lower half)", values: [] },
          { type: "stack", label: "large (min-heap = upper half)", values: [] },
          { type: "variables", entries: [{ name: "invariant", value: "max(small) ≤ min(large)" }] },
        ],
      },
      {
        description:
          "addNum(1): Step 1 — always push to small first: small=[-1]. Step 2 — move small's top to large: pop 1 from small, push to large. small=[], large=[1]. Step 3 — rebalance if large is bigger: |large|=1 > |small|=0, so move large's top back. small=[-1], large=[]. findMedian: |small| > |large| → return -small[0] = 1.",
        codeHighlightLines: [6, 7, 8, 9, 10],
        structures: [
          { type: "stack", label: "small", values: ["1"], topHighlight: true },
          { type: "stack", label: "large", values: [] },
          { type: "variables", entries: [{ name: "stream", value: "[1]" }, { name: "median", value: 1, highlight: true }] },
        ],
      },
      {
        description:
          "addNum(2): Push to small: small=[-2,-1] (top=2). Move top to large: pop 2, push to large=[2]. small=[-1], large=[2]. |large|=|small|=1, balanced. findMedian: equal sizes → average of tops: (-(-1) + 2) / 2 = (1+2)/2 = 1.5. The max-heap top is the largest element in the lower half; the min-heap top is the smallest in the upper half.",
        codeHighlightLines: [6, 7, 8, 9, 10],
        structures: [
          { type: "stack", label: "small [1]", values: ["1"], topHighlight: true },
          { type: "stack", label: "large [2]", values: ["2"], topHighlight: true },
          { type: "variables", entries: [{ name: "stream (sorted)", value: "[1, 2]" }, { name: "median", value: "(1+2)/2 = 1.5", highlight: true }] },
        ],
      },
      {
        description:
          "addNum(3): Push 3 to small: small=[-3,-1] (top=3). Move top (3) to large: large=[2,3]. |large|=2 > |small|=1, rebalance: move large's top (2) to small. small=[-2,-1], large=[3]. findMedian: |small|=2 > |large|=1 → return small's top = 2. Sorted stream: [1,2,3]. The median (2) sits at small's top.",
        codeHighlightLines: [6, 7, 8, 9, 10],
        structures: [
          { type: "stack", label: "small [1, 2]", values: ["1", "2"], topHighlight: true },
          { type: "stack", label: "large [3]", values: ["3"], topHighlight: true },
          { type: "variables", entries: [{ name: "stream (sorted)", value: "[1, 2, 3]" }, { name: "median", value: 2, highlight: true }] },
        ],
      },
      {
        description:
          "addNum(4): Push 4 to small → top=4. Move 4 to large: large=[3,4]. |large|=|small|=2, balanced. Median = (2+3)/2 = 2.5. The push-then-move pattern guarantees ordering: by always routing through small first, we ensure the moved element is truly the largest of the lower half — maintaining the invariant that max(small) ≤ min(large).",
        codeHighlightLines: [6, 7, 8],
        structures: [
          { type: "stack", label: "small [1, 2]", values: ["1", "2"], topHighlight: true },
          { type: "stack", label: "large [3, 4]", values: ["3", "4"], topHighlight: true },
          { type: "variables", entries: [{ name: "stream (sorted)", value: "[1, 2, 3, 4]" }, { name: "median", value: "(2+3)/2 = 2.5", highlight: true }] },
        ],
      },
      {
        description:
          "findMedian: If |small| > |large| (odd count), median = small's top. If equal (even count), median = average of both tops. Each addNum does at most 3 heap operations = O(log n). findMedian reads heap tops = O(1). Space: O(n). This two-heap pattern generalizes to streaming quantile tracking.",
        codeHighlightLines: [12, 13, 14, 15],
        structures: [
          { type: "variables", entries: [
            { name: "odd count", value: "median = small.top" },
            { name: "even count", value: "median = (small.top + large.top) / 2" },
            { name: "addNum", value: "O(log n)" },
            { name: "findMedian", value: "O(1)", highlight: true },
          ] },
        ],
      },
    ],
  },
];

export default solutions;

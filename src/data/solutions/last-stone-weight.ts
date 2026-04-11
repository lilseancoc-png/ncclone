import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Max Heap",
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(n)",
  code: `import heapq

def last_stone_weight(stones):
    heap = [-s for s in stones]  # negate for max-heap
    heapq.heapify(heap)
    while len(heap) > 1:
        first = -heapq.heappop(heap)
        second = -heapq.heappop(heap)
        if first != second:
            heapq.heappush(heap, -(first - second))
    return -heap[0] if heap else 0`,
  steps: [
    {
      description:
        "Each round, smash the two heaviest stones together. If they're equal weight, both are destroyed. If not, the smaller is destroyed and the larger loses weight equal to the smaller's weight. Find the weight of the last remaining stone (or 0 if all destroyed). A max-heap is perfect: always grab the two largest in O(log n). Python only has a min-heap, so we negate values. stones = [2, 7, 4, 1, 8, 1].",
      codeHighlightLines: [3, 4, 5],
      structures: [
        { type: "array", label: "stones", values: [2, 7, 4, 1, 8, 1] },
        { type: "variables", entries: [{ name: "max-heap (sorted view)", value: "[8, 7, 4, 2, 1, 1]" }] },
      ],
    },
    {
      description:
        "Round 1: Pop two heaviest — 8 and 7. They're not equal, so remainder = 8 - 7 = 1. Push 1 back. Heap: [4, 2, 1, 1, 1]. Round 2: Pop 4 and 2. Remainder = 4 - 2 = 2. Push 2. Heap: [2, 1, 1, 1].",
      codeHighlightLines: [6, 7, 8, 9, 10],
      structures: [
        { type: "array", label: "after round 1", values: [4, 2, 1, 1, 1], highlights: { 0: "active" } },
        { type: "array", label: "after round 2", values: [2, 1, 1, 1], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "round 1", value: "8 vs 7 → 1", highlight: true }, { name: "round 2", value: "4 vs 2 → 2" }] },
      ],
    },
    {
      description:
        "Round 3: Pop 2 and 1. Remainder = 2 - 1 = 1. Push 1. Heap: [1, 1, 1]. Round 4: Pop 1 and 1. Equal — both destroyed! Nothing pushed. Heap: [1]. Only one stone remains, loop exits.",
      codeHighlightLines: [6, 7, 8, 9, 10],
      structures: [
        { type: "array", label: "after round 3", values: [1, 1, 1] },
        { type: "array", label: "after round 4", values: [1], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "round 3", value: "2 vs 1 → 1" }, { name: "round 4", value: "1 vs 1 → both destroyed", highlight: true }] },
      ],
    },
    {
      description:
        "Return heap[0] = 1 — the last remaining stone weighs 1. If the heap were empty (all stones destroyed each other), we'd return 0. Time: O(n log n) — up to n rounds, each with O(log n) heap operations. Space: O(n) for the heap. The max-heap ensures we always pick the optimal pair (heaviest stones) to minimize the final weight.",
      codeHighlightLines: [11],
      structures: [
        { type: "array", label: "final", values: [1], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "return", value: 1, highlight: true }, { name: "Time", value: "O(n log n)" }, { name: "Space", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;

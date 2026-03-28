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
        "Smash the two heaviest stones together each round. If they're equal, both destroyed. Otherwise, the remainder goes back. Use a max-heap (Python's heapq is min-heap, so negate values). stones = [2, 7, 4, 1, 8, 1].",
      codeHighlightLines: [1, 3, 4, 5],
      structures: [
        { type: "array", label: "stones", values: [2, 7, 4, 1, 8, 1] },
        { type: "variables", entries: [{ name: "max-heap", value: "[8, 7, 4, 2, 1, 1]" }] },
      ],
    },
    {
      description:
        "Pop two heaviest: 8 and 7. 8 ≠ 7, so remainder = 8 - 7 = 1. Push 1 back. Heap: [4, 2, 1, 1, 1].",
      codeHighlightLines: [6, 7, 8, 9, 10],
      structures: [
        { type: "array", label: "heap", values: [4, 2, 1, 1, 1], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "smash", value: "8 vs 7 → 1", highlight: true }] },
      ],
    },
    {
      description:
        "Pop 4 and 2. 4 - 2 = 2. Push 2. Heap: [2, 1, 1, 1]. Pop 2 and 1. 2 - 1 = 1. Push 1. Heap: [1, 1, 1].",
      codeHighlightLines: [7, 8, 9, 10],
      structures: [
        { type: "array", label: "heap", values: [1, 1, 1], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "smash 1", value: "4 vs 2 → 2" }, { name: "smash 2", value: "2 vs 1 → 1" }] },
      ],
    },
    {
      description:
        "Pop 1 and 1. They're equal — both destroyed! Heap: [1]. Only one stone left. Pop 1 and... heap has only 1 element, loop ends.",
      codeHighlightLines: [6, 7, 8, 9],
      structures: [
        { type: "array", label: "heap", values: [1], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "smash", value: "1 vs 1 → destroyed" }] },
      ],
    },
    {
      description:
        "Return 1 — the last remaining stone. Time: O(n log n) — each round does two pops and possibly one push (all O(log n)), up to n rounds. Space: O(n) for the heap. A max-heap makes this natural: always grab the two largest efficiently.",
      codeHighlightLines: [11],
      structures: [
        { type: "array", label: "final heap", values: [1], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "return", value: 1, highlight: true }] },
      ],
    },
  ],
};

export default solution;

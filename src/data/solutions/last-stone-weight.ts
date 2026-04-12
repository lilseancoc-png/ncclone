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
        "Each round, smash the two heaviest stones. Equal weight → both destroyed. Different → remainder = larger - smaller stays. Max-heap gives the two largest in O(log n). Python has min-heap only, so negate values. stones=[2,7,4,1,8,1]. Heapified sorted view: [8,7,4,2,1,1].",
      codeHighlightLines: [3, 4, 5],
      structures: [
        { type: "array", label: "max-heap (sorted view)", values: [8, 7, 4, 2, 1, 1] },
        { type: "variables", entries: [{ name: "stones", value: "[2, 7, 4, 1, 8, 1]" }, { name: "strategy", value: "pop 2 heaviest, push remainder" }] },
      ],
    },
    {
      description:
        "Round 1: Pop 8 and 7. 8 ≠ 7 → remainder = 8-7 = 1. Push 1 back. Heap becomes [4, 2, 1, 1, 1]. The two heaviest stones smashed, leaving a pebble.",
      codeHighlightLines: [6, 7, 8, 9, 10],
      structures: [
        { type: "array", label: "heap after round 1", values: [4, 2, 1, 1, 1], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "smash", value: "8 vs 7", highlight: true }, { name: "result", value: "8 - 7 = 1 → push" }, { name: "heap size", value: "6 → 5" }] },
      ],
    },
    {
      description:
        "Round 2: Pop 4 and 2. 4 ≠ 2 → remainder = 4-2 = 2. Push 2. Heap: [2, 1, 1, 1]. Round 3: Pop 2 and 1. 2 ≠ 1 → remainder = 1. Push 1. Heap: [1, 1, 1].",
      codeHighlightLines: [6, 7, 8, 9, 10],
      structures: [
        { type: "array", label: "after round 2", values: [2, 1, 1, 1], highlights: { 0: "active" } },
        { type: "array", label: "after round 3", values: [1, 1, 1] },
        { type: "variables", entries: [{ name: "round 2", value: "4 vs 2 → 2" }, { name: "round 3", value: "2 vs 1 → 1" }] },
      ],
    },
    {
      description:
        "Round 4: Pop 1 and 1. Equal! Both destroyed, nothing pushed. Heap: [1]. Only one stone left — loop condition len(heap) > 1 fails, exit.",
      codeHighlightLines: [6, 7, 8, 9],
      structures: [
        { type: "array", label: "after round 4", values: [1], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "round 4", value: "1 vs 1 → both destroyed!", highlight: true }, { name: "heap size", value: "3 → 1" }, { name: "loop exits", value: "len(heap) = 1" }] },
      ],
    },
    {
      description:
        "Return heap[0] = 1. After 4 rounds: 8v7→1, 4v2→2, 2v1→1, 1v1→destroyed. One stone left weighing 1. If all stones destroyed each other (heap empty), return 0. Time: O(n log n) — up to n rounds, O(log n) per heap op. Space: O(n) for heap.",
      codeHighlightLines: [11],
      structures: [
        { type: "array", label: "final heap", values: [1], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "return", value: 1, highlight: true }, { name: "rounds played", value: "4" }, { name: "Time", value: "O(n log n)" }, { name: "Space", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;

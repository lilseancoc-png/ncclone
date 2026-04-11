import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Min Heap",
  timeComplexity: "O(n log k) init, O(log k) add",
  spaceComplexity: "O(k)",
  code: `import heapq

class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.heap = nums
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val):
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]`,
  steps: [
    {
      description:
        "Design a class that efficiently tracks the kth largest element as numbers stream in. The naive approach: sort all seen numbers on each query — O(n log n). The optimal insight: maintain a min-heap of exactly k elements. The heap always holds the k largest numbers seen so far, and the root (minimum of those k) IS the kth largest! Numbers smaller than the kth largest are discarded — they can never become the kth largest. k=3, initial nums=[4, 5, 8, 2].",
      codeHighlightLines: [3, 4, 5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 8, 2] },
        { type: "variables", entries: [{ name: "k", value: 3 }, { name: "key insight", value: "min-heap of size k → root = kth largest" }] },
      ],
    },
    {
      description:
        "Init: heapify all nums into a min-heap: [2, 4, 8, 5]. Size is 4 > k=3, so repeatedly pop the minimum until size == k. Pop 2 (too small to be in the top 3). Heap = [4, 5, 8] — these are the 3 largest numbers. The root (4) is the 3rd largest. Why a min-heap and not max-heap? Because we need the SMALLEST of the top-k (which is the kth largest), and the min-heap gives us that in O(1).",
      codeHighlightLines: [6, 7, 8, 9],
      structures: [
        { type: "array", label: "min-heap (top 3 largest)", values: [4, 5, 8], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "popped", value: "2 (not in top 3)" }, { name: "kth largest = root", value: 4, highlight: true }] },
      ],
    },
    {
      description:
        "add(3): Push 3 → heap = [3, 4, 5, 8] (size 4). Pop minimum (3) — it's smaller than all top-3 elements, so it gets immediately discarded. Heap back to [4, 5, 8]. Return root = 4. The new number was too small to affect the kth largest. This is the common case for streaming — most additions just bounce off the heap.",
      codeHighlightLines: [11, 12, 13, 14, 15],
      structures: [
        { type: "array", label: "min-heap", values: [4, 5, 8], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "added 3", value: "too small, popped immediately" }, { name: "return kth", value: 4, highlight: true }] },
      ],
    },
    {
      description:
        "add(5): Push 5 → [4, 5, 5, 8]. Pop min (4) — 5 displaces 4 from the top 3. Heap = [5, 5, 8]. Return 5. add(10): Push 10 → [5, 5, 8, 10]. Pop min (5). Heap = [5, 8, 10]. Return 5. Each add: O(log k) for push + pop. The kth largest can only stay the same or increase.",
      codeHighlightLines: [11, 12, 13, 14, 15],
      structures: [
        { type: "array", label: "min-heap after add(10)", values: [5, 8, 10], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "stream so far", value: "[4,5,8,2,3,5,10]" }, { name: "return kth", value: 5, highlight: true }] },
      ],
    },
    {
      description:
        "add(9): Push 9 → [5, 8, 9, 10]. Pop min (5). Heap = [8, 9, 10] — the three largest numbers in the entire stream. Return root = 8. Time: O(log k) per add (one push + one pop on a size-k heap). Space: O(k) — we never store more than k elements. This is ideal for streaming scenarios where the full dataset doesn't fit in memory. The same pattern works for any 'rolling top-k' problem.",
      codeHighlightLines: [15],
      structures: [
        { type: "array", label: "min-heap (top 3)", values: [8, 9, 10], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return kth largest", value: 8, highlight: true }, { name: "add()", value: "O(log k)" }, { name: "Space", value: "O(k)" }] },
      ],
    },
  ],
};

export default solution;

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
        "Design a class to find the kth largest element in a stream. Key insight: maintain a min-heap of size k. The smallest element in the heap IS the kth largest overall. When we add a new element, push it in and pop if heap exceeds size k. k=3, nums=[4, 5, 8, 2].",
      codeHighlightLines: [1, 3, 4, 5, 6, 7],
      structures: [
        { type: "array", label: "nums", values: [4, 5, 8, 2] },
        { type: "variables", entries: [{ name: "k", value: 3 }] },
      ],
    },
    {
      description:
        "Init: heapify [4, 5, 8, 2] → min-heap [2, 4, 8, 5]. Size 4 > k=3, so pop the minimum (2). Heap = [4, 5, 8]. The root (4) is the 3rd largest among {4, 5, 8}.",
      codeHighlightLines: [7, 8, 9],
      structures: [
        { type: "array", label: "min-heap (size k=3)", values: [4, 5, 8], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "popped", value: 2 }, { name: "kth largest", value: 4, highlight: true }] },
      ],
    },
    {
      description:
        "add(3): Push 3 → heap has 4 elements [3, 4, 8, 5]. Size > k, pop min (3). Heap = [4, 5, 8]. Return heap[0] = 4. The 3rd largest is still 4.",
      codeHighlightLines: [11, 12, 13, 14, 15],
      structures: [
        { type: "array", label: "min-heap", values: [4, 5, 8], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "added", value: 3 }, { name: "popped", value: 3 }, { name: "return kth", value: 4, highlight: true }] },
      ],
    },
    {
      description:
        "add(5): Push 5 → [4, 5, 8, 5]. Pop min (4). Heap = [5, 5, 8]. Return 5. add(10): Push 10 → [5, 5, 8, 10]. Pop min (5). Heap = [5, 8, 10]. Return 5.",
      codeHighlightLines: [11, 12, 13, 14, 15],
      structures: [
        { type: "array", label: "min-heap after add(10)", values: [5, 8, 10], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "stream so far", value: "[4,5,8,3,5,10]" }, { name: "return kth", value: 5, highlight: true }] },
      ],
    },
    {
      description:
        "add(9): Push 9 → [5, 8, 10, 9]. Pop min (5). Heap = [8, 9, 10]. Return 8. The 3rd largest of all values seen is now 8. Time: O(log k) per add (heap operations). Space: O(k) — we only store k elements, not the entire stream. This is optimal for streaming data.",
      codeHighlightLines: [15],
      structures: [
        { type: "array", label: "min-heap", values: [8, 9, 10], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return kth largest", value: 8, highlight: true }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Min Heap",
  timeComplexity: "O(n log k)",
  spaceComplexity: "O(k)",
  code: `def k_closest(points, k):
    import heapq
    # Use max-heap of size k (negate distance for max-heap)
    heap = []
    for x, y in points:
        dist = x * x + y * y
        if len(heap) < k:
            heapq.heappush(heap, (-dist, [x, y]))
        elif -dist > heap[0][0]:
            heapq.heapreplace(heap, (-dist, [x, y]))
    return [p for _, p in heap]`,
  steps: [
    {
      description:
        "Find k=1 closest points to origin from [[1,3],[-2,2]]. Calculate squared distance for each point and maintain a max-heap of size k. Using squared distance avoids costly sqrt operations.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "points", values: ["[1,3]", "[-2,2]"] },
        { type: "variables", entries: [{ name: "k", value: 1 }] },
      ],
    },
    {
      description:
        "Point [1,3]: dist = 1*1 + 3*3 = 10. Heap has fewer than k=1 elements, so push (-10, [1,3]) onto the max-heap.",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "array", label: "points", values: ["[1,3]", "[-2,2]"], highlights: { 0: "active" }, pointers: [{ index: 0, label: "i" }] },
        { type: "array", label: "heap", values: ["(-10, [1,3])"], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "dist", value: 10 }, { name: "heap size", value: 1 }] },
      ],
    },
    {
      description:
        "Point [-2,2]: dist = 4 + 4 = 8. Heap is full (size=k=1). Is 8 < 10 (current max)? Yes! Replace: heapreplace with (-8, [-2,2]). The closer point replaces the farther one.",
      codeHighlightLines: [5, 6, 9, 10],
      structures: [
        { type: "array", label: "points", values: ["[1,3]", "[-2,2]"], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "i" }] },
        { type: "array", label: "heap", values: ["(-8, [-2,2])"], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "dist", value: 8 }, { name: "8 < 10?", value: "Yes, replace!", highlight: true }] },
      ],
    },
    {
      description:
        "All points processed. Extract points from heap: [[-2,2]]. Using a max-heap of size k means we always evict the farthest point, keeping only the k closest. O(n log k) time, O(k) space.",
      codeHighlightLines: [11],
      structures: [
        { type: "array", label: "result", values: ["[-2,2]"], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[[-2, 2]]", highlight: true }, { name: "Time", value: "O(n log k)" }, { name: "Space", value: "O(k)" }] },
      ],
    },
  ],
};

export default solution;

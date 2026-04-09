import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Max Heap of Size k",
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
        "Find the k closest points to the origin (0,0). We could sort all points by distance (O(n log n)), but a max-heap of size k is more efficient at O(n log k). The trick: maintain a max-heap of the k closest points seen so far. When a closer point arrives, it evicts the farthest point in the heap. We use squared distance (x²+y²) to avoid expensive sqrt. points=[[1,3],[-2,2]], k=1.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "points", values: ["[1,3]", "[-2,2]"] },
        { type: "variables", entries: [{ name: "k", value: 1 }, { name: "heap", value: "[] (max-heap, size ≤ k)" }, { name: "note", value: "negate dist for max-heap in Python" }] },
      ],
    },
    {
      description:
        "Point [1,3]: dist² = 1² + 3² = 1 + 9 = 10. Heap has fewer than k=1 elements, so push it. We store (-10, [1,3]) — negated so Python's min-heap acts as a max-heap. The root of the heap is always the FARTHEST point among our k candidates, making it easy to check if a new point should replace it.",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "array", label: "points", values: ["[1,3]", "[-2,2]"], highlights: { 0: "active" } },
        { type: "array", label: "heap", values: ["(-10, [1,3])"], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "dist²", value: "1+9 = 10" }, { name: "heap size", value: "1 = k" }] },
      ],
    },
    {
      description:
        "Point [-2,2]: dist² = (-2)² + 2² = 4 + 4 = 8. Heap is full (size = k = 1). Is this point closer than the farthest in the heap? Check: -8 > -10 (i.e., 8 < 10). Yes — [-2,2] is closer! Use heapreplace to atomically pop the farthest and push the closer point. Heap now holds (-8, [-2,2]).",
      codeHighlightLines: [5, 6, 9, 10],
      structures: [
        { type: "array", label: "points", values: ["[1,3]", "[-2,2]"], highlights: { 0: "checked", 1: "active" } },
        { type: "array", label: "heap", values: ["(-8, [-2,2])"], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "dist²", value: "4+4 = 8" }, { name: "8 < 10?", value: "Yes — closer! Replace.", highlight: true }] },
      ],
    },
    {
      description:
        "All points processed. Extract the points from the heap: [[-2,2]]. This is the closest point to the origin with distance √8 ≈ 2.83, vs [1,3] with distance √10 ≈ 3.16. Time: O(n log k) — each of n points does at most one O(log k) heap operation. Space: O(k) for the heap. For k << n, this is much better than sorting all n points.",
      codeHighlightLines: [11],
      structures: [
        { type: "array", label: "result", values: ["[-2,2]"], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[[-2, 2]]", highlight: true }, { name: "Time", value: "O(n log k)" }, { name: "Space", value: "O(k)" }] },
      ],
    },
  ],
};

export default solution;

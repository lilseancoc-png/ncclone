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
        "Find k closest points to origin (0,0). Max-heap of size k: maintain the k closest seen so far. When a closer point arrives, it evicts the farthest in the heap. Use squared distance (x²+y²) to avoid sqrt. points=[[3,3],[5,-1],[-2,4]], k=2.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "points", values: ["[3,3]", "[5,-1]", "[-2,4]"] },
        { type: "variables", entries: [{ name: "k", value: 2 }, { name: "heap", value: "[] (max-heap by distance)" }, { name: "dist formula", value: "x² + y² (no sqrt needed)" }] },
      ],
    },
    {
      description:
        "Point [3,3]: dist² = 9+9 = 18. Heap size (0) < k (2), so push directly. Heap: [(-18, [3,3])]. Point [5,-1]: dist² = 25+1 = 26. Heap size (1) < k (2), push. Heap: [(-26, [5,-1]), (-18, [3,3])]. Root -26 = farthest point in our k candidates.",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "array", label: "points", values: ["[3,3]", "[5,-1]", "[-2,4]"], highlights: { 0: "active", 1: "active" } },
        { type: "array", label: "heap (max by dist)", values: ["(-26,[5,-1])", "(-18,[3,3])"], highlights: { 0: "active", 1: "active" } },
        { type: "variables", entries: [{ name: "[3,3] dist²", value: "18" }, { name: "[5,-1] dist²", value: "26 (farthest = root)" }] },
      ],
    },
    {
      description:
        "Point [-2,4]: dist² = 4+16 = 20. Heap is full (size=k=2). Is this closer than the farthest? Check: -20 > heap[0][0]=-26? Yes! (20 < 26). Use heapreplace: pop [5,-1] (dist 26), push [-2,4] (dist 20). The farther point is evicted for a closer one.",
      codeHighlightLines: [5, 6, 9, 10],
      structures: [
        { type: "array", label: "points", values: ["[3,3]", "[5,-1]", "[-2,4]"], highlights: { 1: "checked", 2: "active" } },
        { type: "array", label: "heap", values: ["(-20,[-2,4])", "(-18,[3,3])"], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "[-2,4] dist²=20", value: "20 < 26 → closer!", highlight: true }, { name: "evicted", value: "[5,-1] (dist² 26)" }] },
      ],
    },
    {
      description:
        "All points processed. If another point had dist² > 20 (the current max in heap), it would be skipped — not closer than our worst candidate. Only points beating the heap's root get in. This keeps the heap at exactly k elements with the k smallest distances.",
      codeHighlightLines: [9],
      structures: [
        { type: "array", label: "heap (final)", values: ["(-20,[-2,4])", "(-18,[3,3])"], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "heap root", value: "dist²=20 (gatekeeper)" }, { name: "any dist² > 20", value: "rejected (not closer)" }] },
      ],
    },
    {
      description:
        "Extract points from heap: [[3,3], [-2,4]]. These are the 2 closest to origin (distances √18≈4.24 and √20≈4.47 vs √26≈5.10 for the rejected [5,-1]). Time: O(n log k) — n points, each with at most one O(log k) heap op. Space: O(k). For k << n, this beats O(n log n) sorting.",
      codeHighlightLines: [11],
      structures: [
        { type: "array", label: "result", values: ["[3,3]", "[-2,4]"], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[[3,3], [-2,4]]", highlight: true }, { name: "Time", value: "O(n log k)" }, { name: "Space", value: "O(k)" }] },
      ],
    },
  ],
};

export default solution;

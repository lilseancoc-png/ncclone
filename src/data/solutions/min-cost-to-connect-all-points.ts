import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Prim's Algorithm (Min Heap)",
  timeComplexity: "O(n² log n)",
  spaceComplexity: "O(n²)",
  code: `import heapq

def min_cost_connect_points(points):
    n = len(points)
    visited = set()
    heap = [(0, 0)]  # (cost, point_index)
    total_cost = 0

    while len(visited) < n:
        cost, i = heapq.heappop(heap)
        if i in visited:
            continue
        visited.add(i)
        total_cost += cost
        for j in range(n):
            if j not in visited:
                dist = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
                heapq.heappush(heap, (dist, j))

    return total_cost`,
  steps: [
    {
      description:
        "Find the minimum cost to connect all points using Manhattan distance (|x₁-x₂| + |y₁-y₂|). This is the Minimum Spanning Tree (MST) problem on a complete graph. Prim's algorithm builds the MST greedily: start from any point, then repeatedly add the cheapest edge connecting a visited point to an unvisited one. A min-heap efficiently selects the cheapest edge. Since every pair of points has an edge, the graph has n(n-1)/2 edges. Points: [[0,0],[2,2],[3,10],[5,2],[7,0]].",
      codeHighlightLines: [3, 4, 5, 6, 7, 8],
      structures: [
        { type: "array", label: "points", values: ["(0,0)", "(2,2)", "(3,10)", "(5,2)", "(7,0)"] },
        { type: "variables", entries: [{ name: "visited", value: "{}" }, { name: "heap", value: "[(0, point 0)]" }, { name: "total_cost", value: 0 }, { name: "MST needs", value: "n-1 = 4 edges" }] },
      ],
    },
    {
      description:
        "Pop (cost=0, point 0). Mark point 0 as visited. Push distances from point 0 to all unvisited points: to point 1 = |0-2|+|0-2| = 4, to point 2 = 13, to point 3 = 7, to point 4 = 7. Heap now has these 4 candidate edges. Pop the cheapest: (4, point 1). Visit point 1, add cost 4. The edge 0→1 is our first MST edge. Now push distances from point 1 to unvisited points, which might offer cheaper connections than what's already in the heap.",
      codeHighlightLines: [10, 11, 12, 13, 14, 15, 16, 17, 18],
      structures: [
        { type: "array", label: "points", values: ["(0,0)", "(2,2)", "(3,10)", "(5,2)", "(7,0)"], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "visited", value: "{0, 1}" }, { name: "total_cost", value: 4, highlight: true }, { name: "MST edge", value: "0 → 1 (cost 4)" }] },
      ],
    },
    {
      description:
        "From point 1 (2,2): distance to point 3 (5,2) = 3, which is cheaper than the 7 already in the heap from point 0! The heap sorts it out automatically. Pop (3, point 3) — visit it. Cost 4+3=7. From point 3 (5,2): distance to point 4 (7,0) = 4. Pop next cheapest unvisited: (4, point 4) via point 3. Cost 7+4=11. The heap may contain stale entries (already-visited points) — we just skip them with the `if i in visited: continue` check.",
      codeHighlightLines: [11, 12, 13, 14, 15, 16, 17, 18],
      structures: [
        { type: "array", label: "points", values: ["(0,0)", "(2,2)", "(3,10)", "(5,2)", "(7,0)"], highlights: { 0: "success", 1: "success", 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "visited", value: "{0,1,3,4}" }, { name: "total_cost", value: 11, highlight: true }, { name: "MST edges", value: "0→1(4), 1→3(3), 3→4(4)" }] },
      ],
    },
    {
      description:
        "Only point 2 (3,10) remains. Pop cheapest edge reaching it: distance from point 3 (5,2) = |5-3|+|2-10| = 10. Visit point 2, total cost = 11+10 = 21. All 5 points connected with 4 edges — MST complete! Prim's guarantees this is the minimum possible cost. Time: O(n² log n) — for each of n points, we push up to n edges into the heap. Space: O(n²) for the heap in worst case.",
      codeHighlightLines: [20],
      structures: [
        { type: "array", label: "points", values: ["(0,0)", "(2,2)", "(3,10)", "(5,2)", "(7,0)"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "total_cost", value: 21, highlight: true }, { name: "MST edges", value: "0→1(4), 1→3(3), 3→4(4), 3→2(10)" }, { name: "Time", value: "O(n² log n)" }] },
      ],
    },
  ],
};

export default solution;

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
        "Find minimum cost to connect all points using Manhattan distance (|x₁-x₂| + |y₁-y₂|). This is the Minimum Spanning Tree problem. Prim's algorithm: start from any point, repeatedly add the cheapest edge to an unvisited point. A min-heap selects the cheapest edge. Points: [[0,0],[2,2],[3,10],[5,2],[7,0]].",
      codeHighlightLines: [3, 4, 5, 6, 7, 8],
      structures: [
        { type: "array", label: "points", values: ["(0,0)", "(2,2)", "(3,10)", "(5,2)", "(7,0)"] },
        { type: "variables", entries: [{ name: "visited", value: "{}" }, { name: "heap", value: "[(0, point 0)]" }, { name: "total_cost", value: 0 }, { name: "MST needs", value: "n-1 = 4 edges" }] },
      ],
    },
    {
      description:
        "Pop (cost=0, point 0). Visit point 0, total_cost += 0. Push distances from point 0 to all others: to 1 = |0-2|+|0-2| = 4, to 2 = 13, to 3 = 7, to 4 = 7. Heap: [(4,1), (7,3), (7,4), (13,2)]. The cheapest candidate edge is cost 4 to point 1.",
      codeHighlightLines: [10, 11, 12, 13, 14, 15, 16, 17, 18],
      structures: [
        { type: "array", label: "points", values: ["(0,0)", "(2,2)", "(3,10)", "(5,2)", "(7,0)"], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "visited", value: "{0}" }, { name: "total_cost", value: 0 }, { name: "heap top", value: "(4, point 1)", highlight: true }] },
      ],
    },
    {
      description:
        "Pop (4, point 1). Visit it, total_cost = 4. MST edge: 0→1. Push from point 1 (2,2): to 2 = 9, to 3 = 3, to 4 = 7. Point 1 offers a cheaper path to point 3 (cost 3 vs 7 from point 0). The heap automatically sorts — (3, point 3) rises to the top.",
      codeHighlightLines: [10, 11, 12, 13, 14, 15, 16, 17, 18],
      structures: [
        { type: "array", label: "points", values: ["(0,0)", "(2,2)", "(3,10)", "(5,2)", "(7,0)"], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "visited", value: "{0, 1}" }, { name: "total_cost", value: 4, highlight: true }, { name: "MST edge", value: "0→1 (cost 4)" }, { name: "heap top", value: "(3, point 3)" }] },
      ],
    },
    {
      description:
        "Pop (3, point 3). Visit it, total_cost = 7. MST edge: 1→3. Push from point 3 (5,2): to 2 = 10, to 4 = 4. Pop next: (4, point 4). Visit it, total_cost = 11. MST edge: 3→4. Stale entries in heap (like (7, point 3) from earlier) are skipped via 'if i in visited: continue'.",
      codeHighlightLines: [11, 12, 13, 14, 15, 16, 17, 18],
      structures: [
        { type: "array", label: "points", values: ["(0,0)", "(2,2)", "(3,10)", "(5,2)", "(7,0)"], highlights: { 0: "success", 1: "success", 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "visited", value: "{0,1,3,4}" }, { name: "total_cost", value: 11, highlight: true }, { name: "MST edges", value: "0→1(4), 1→3(3), 3→4(4)" }] },
      ],
    },
    {
      description:
        "Only point 2 remains. Pop cheapest edge to it: (9, point 2) from point 1, but also (10, point 2) from point 3. Heap gives (9, point 2). Visit it, total_cost = 11+9 = 20. All 5 points connected with 4 edges — MST complete! Time: O(n² log n) — push up to n edges per point. Space: O(n²).",
      codeHighlightLines: [20],
      structures: [
        { type: "array", label: "points", values: ["(0,0)", "(2,2)", "(3,10)", "(5,2)", "(7,0)"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "total_cost", value: 20, highlight: true }, { name: "MST edges", value: "0→1(4), 1→3(3), 3→4(4), 1→2(9)" }, { name: "Time", value: "O(n² log n)" }] },
      ],
    },
  ],
};

export default solution;

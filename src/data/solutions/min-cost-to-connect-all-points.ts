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
        "Find minimum cost to connect all points (Manhattan distance). Use Prim's algorithm: greedily add the cheapest edge from visited to unvisited. Points: [[0,0],[2,2],[3,10],[5,2],[7,0]].",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        { type: "array", label: "points", values: ["(0,0)", "(2,2)", "(3,10)", "(5,2)", "(7,0)"] },
        { type: "variables", entries: [{ name: "visited", value: "{}" }, { name: "heap", value: "[(0, 0)]" }, { name: "total_cost", value: 0 }] },
      ],
    },
    {
      description:
        "Pop (cost=0, i=0). Visit point 0. Push distances to all others: to 1=4, to 2=13, to 3=7, to 4=7. Next cheapest: pop (4, 1), visit point 1.",
      codeHighlightLines: [8, 9, 10, 11, 12, 13, 14, 15, 16],
      structures: [
        { type: "array", label: "points", values: ["(0,0)", "(2,2)", "(3,10)", "(5,2)", "(7,0)"], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "visited", value: "{0, 1}" }, { name: "total_cost", value: 4, highlight: true }, { name: "edges", value: "0→1 (cost 4)" }] },
      ],
    },
    {
      description:
        "From point 1, push distances. Pop (3, 3) — point 3 at dist 3 from point 1. Visit point 3. Pop (7, 4) — point 4. Visit it. Cost so far: 4+3+7=14.",
      codeHighlightLines: [8, 9, 10, 11, 12, 13],
      structures: [
        { type: "array", label: "points", values: ["(0,0)", "(2,2)", "(3,10)", "(5,2)", "(7,0)"], highlights: { 0: "success", 1: "success", 2: "checked", 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "visited", value: "{0,1,3,4}" }, { name: "total_cost", value: 14, highlight: true }, { name: "edges", value: "0→1, 1→3, 3→4" }] },
      ],
    },
    {
      description:
        "Pop cheapest edge to remaining point 2. Cost to connect point 2 = 8 (from point 3). Total: 14+8 = 20. All points connected! This is the Minimum Spanning Tree.",
      codeHighlightLines: [18],
      structures: [
        { type: "array", label: "points", values: ["(0,0)", "(2,2)", "(3,10)", "(5,2)", "(7,0)"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "total_cost", value: 20, highlight: true }, { name: "MST edges", value: "0→1, 1→3, 3→4, 3→2" }] },
      ],
    },
  ],
};

export default solution;

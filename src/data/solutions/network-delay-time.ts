import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Dijkstra's Algorithm",
  timeComplexity: "O(E log V)",
  spaceComplexity: "O(V + E)",
  code: `import heapq

def network_delay_time(times, n, k):
    graph = {i: [] for i in range(1, n + 1)}
    for u, v, w in times:
        graph[u].append((v, w))

    dist = {}
    heap = [(0, k)]  # (time, node)

    while heap:
        time, node = heapq.heappop(heap)
        if node in dist:
            continue
        dist[node] = time
        for neighbor, weight in graph[node]:
            if neighbor not in dist:
                heapq.heappush(heap, (time + weight, neighbor))

    return max(dist.values()) if len(dist) == n else -1`,
  steps: [
    {
      description:
        "Find minimum time for a signal from node k to reach all nodes. Use Dijkstra's shortest path. Edges: [[2,1,1],[2,3,1],[3,4,1]], n=4, k=2.",
      codeHighlightLines: [1, 2, 3, 4, 5],
      structures: [
        { type: "array", label: "edges", values: ["2→1:1", "2→3:1", "3→4:1"] },
        { type: "variables", entries: [{ name: "n", value: 4 }, { name: "source k", value: 2 }, { name: "dist", value: "{}" }] },
      ],
    },
    {
      description:
        "Start at node 2 (time=0). Pop (0,2) from heap. Visit node 2. Push neighbors: node 1 (time 1), node 3 (time 1).",
      codeHighlightLines: [7, 8, 10, 11, 12, 13, 14, 15, 16],
      structures: [
        { type: "array", label: "nodes", values: ["1", "2", "3", "4"], highlights: { 1: "success" } },
        { type: "variables", entries: [{ name: "dist", value: "{2: 0}", highlight: true }, { name: "heap", value: "[(1,1), (1,3)]" }] },
      ],
    },
    {
      description:
        "Pop (1,1) — visit node 1, dist=1. Pop (1,3) — visit node 3, dist=1. From node 3, push node 4 (time=1+1=2). Pop (2,4) — visit node 4, dist=2.",
      codeHighlightLines: [10, 11, 12, 13, 14, 15, 16],
      structures: [
        { type: "array", label: "nodes", values: ["1", "2", "3", "4"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", entries: [{ name: "dist", value: "{2:0, 1:1, 3:1, 4:2}", highlight: true }] },
      ],
    },
    {
      description:
        "All 4 nodes reached. Return max(dist.values()) = max(0,1,1,2) = 2. If any node unreachable, return -1. Time: O(E log V) with min-heap.",
      codeHighlightLines: [18],
      structures: [
        { type: "array", label: "distances", values: [0, 1, 1, 2], highlights: { 3: "success" } },
        { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "all reached?", value: "yes (4/4)" }] },
      ],
    },
  ],
};

export default solution;

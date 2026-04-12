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
        "Find minimum time for a signal from node k to reach ALL nodes. Dijkstra's: min-heap processes closest unvisited node first, guaranteeing shortest paths. Answer = max of all shortest distances (last node to receive signal). Edges: [[2,1,1],[2,3,1],[3,4,1]], n=4, k=2.",
      codeHighlightLines: [3, 4, 5, 6, 7, 8, 9],
      structures: [
        {
          type: "graph",
          label: "network",
          nodes: [{ id: 1 }, { id: 2, highlight: "active" }, { id: 3 }, { id: 4 }],
          edges: [
            { from: 2, to: 1, label: "1" },
            { from: 2, to: 3, label: "1" },
            { from: 3, to: 4, label: "1" },
          ],
          directed: true,
        },
        { type: "variables", entries: [{ name: "source k", value: 2 }, { name: "heap", value: "[(0, 2)]" }, { name: "dist", value: "{}" }] },
      ],
    },
    {
      description:
        "Pop (time=0, node=2). Node 2 not in dist → set dist[2]=0. Explore neighbors: node 1 (weight 1) → push (0+1, 1). Node 3 (weight 1) → push (0+1, 3). Heap now has two entries with equal distance. The source node is settled.",
      codeHighlightLines: [11, 12, 13, 14, 15, 16, 17, 18],
      structures: [
        {
          type: "graph",
          label: "processed node 2",
          nodes: [{ id: 1, highlight: "active" }, { id: 2, highlight: "success" }, { id: 3, highlight: "active" }, { id: 4 }],
          edges: [
            { from: 2, to: 1, label: "1", highlight: "active" },
            { from: 2, to: 3, label: "1", highlight: "active" },
            { from: 3, to: 4, label: "1" },
          ],
          directed: true,
        },
        { type: "variables", entries: [{ name: "dist", value: "{2: 0}", highlight: true }, { name: "heap", value: "[(1,1), (1,3)]" }] },
      ],
    },
    {
      description:
        "Pop (1, 1). Node 1 not in dist → set dist[1]=1. Node 1 has no outgoing edges, nothing to push. Signal reached node 1 at time 1.",
      codeHighlightLines: [11, 12, 13, 14, 15],
      structures: [
        {
          type: "graph",
          label: "processed node 1",
          nodes: [{ id: 1, highlight: "success" }, { id: 2, highlight: "success" }, { id: 3, highlight: "active" }, { id: 4 }],
          edges: [
            { from: 2, to: 1, label: "1", highlight: "success" },
            { from: 2, to: 3, label: "1" },
            { from: 3, to: 4, label: "1" },
          ],
          directed: true,
        },
        { type: "variables", entries: [{ name: "dist", value: "{2:0, 1:1}", highlight: true }, { name: "heap", value: "[(1,3)]" }, { name: "node 1", value: "no outgoing edges" }] },
      ],
    },
    {
      description:
        "Pop (1, 3). Node 3 not in dist → set dist[3]=1. Explore neighbor: node 4 (weight 1) → push (1+1, 4) = (2, 4). Signal reached node 3 at time 1 (same as node 1, since both are 1 hop from source).",
      codeHighlightLines: [11, 12, 13, 14, 15, 16, 17, 18],
      structures: [
        {
          type: "graph",
          label: "processed node 3",
          nodes: [{ id: 1, highlight: "success" }, { id: 2, highlight: "success" }, { id: 3, highlight: "success" }, { id: 4, highlight: "active" }],
          edges: [
            { from: 2, to: 1, label: "1", highlight: "success" },
            { from: 2, to: 3, label: "1", highlight: "success" },
            { from: 3, to: 4, label: "1", highlight: "active" },
          ],
          directed: true,
        },
        { type: "variables", entries: [{ name: "dist", value: "{2:0, 1:1, 3:1}", highlight: true }, { name: "heap", value: "[(2,4)]" }] },
      ],
    },
    {
      description:
        "Pop (2, 4). Node 4 not in dist → set dist[4]=2. No neighbors. Heap empty. len(dist)=4 == n → all nodes reached. Return max(0,1,1,2) = 2. Node 4 was last reached at time 2. Dijkstra's greedy (always expand closest) guarantees these are optimal shortest paths. Time: O(E log V). Space: O(V+E).",
      codeHighlightLines: [20],
      structures: [
        {
          type: "graph",
          label: "all nodes reached",
          nodes: [{ id: 1, highlight: "success" }, { id: 2, highlight: "success" }, { id: 3, highlight: "success" }, { id: 4, highlight: "success" }],
          edges: [
            { from: 2, to: 1, label: "1", highlight: "success" },
            { from: 2, to: 3, label: "1", highlight: "success" },
            { from: 3, to: 4, label: "1", highlight: "success" },
          ],
          directed: true,
        },
        { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "dist", value: "{2:0, 1:1, 3:1, 4:2}" }, { name: "Time", value: "O(E log V)" }] },
      ],
    },
  ],
};

export default solution;

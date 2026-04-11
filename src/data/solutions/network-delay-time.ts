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
        "Find the minimum time for a signal sent from node k to reach ALL other nodes. If any node is unreachable, return -1. This is Dijkstra's algorithm: use a min-heap to always process the closest unvisited node first. The answer is the maximum shortest-path distance — the last node to receive the signal determines the total time. Edges: [[2,1,1],[2,3,1],[3,4,1]], n=4, k=2.",
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
        { type: "variables", entries: [{ name: "source k", value: 2 }, { name: "dist", value: "{}" }, { name: "heap", value: "[(0, 2)]" }] },
      ],
    },
    {
      description:
        "Pop (time=0, node=2) from the heap. Node 2 hasn't been visited → set dist[2]=0. Explore neighbors: node 1 (weight 1) → push (0+1, 1) = (1, 1). Node 3 (weight 1) → push (0+1, 3) = (1, 3). The min-heap ensures we always process the node with the smallest known distance next.",
      codeHighlightLines: [11, 12, 13, 14, 15, 16, 17, 18],
      structures: [
        {
          type: "graph",
          label: "network — processed node 2",
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
        "Pop (1, 1) → dist[1]=1. Node 1 has no outgoing edges. Pop (1, 3) → dist[3]=1. Explore node 3's neighbor: node 4 (weight 1) → push (1+1, 4) = (2, 4). Pop (2, 4) → dist[4]=2. Heap is empty. All 4 nodes reached!",
      codeHighlightLines: [11, 12, 13, 14, 15, 16, 17, 18],
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
        { type: "variables", entries: [{ name: "dist", value: "{2:0, 1:1, 3:1, 4:2}", highlight: true }] },
      ],
    },
    {
      description:
        "All n=4 nodes reached. Return max(dist.values()) = max(0, 1, 1, 2) = 2. The signal reaches node 4 last, at time 2. If any node were unreachable (len(dist) < n), we'd return -1. Time: O(E log V) — each edge processed once, each heap operation is O(log V). Space: O(V + E) for the graph and heap. Dijkstra's greedy strategy (always expand the closest node) guarantees optimal shortest paths.",
      codeHighlightLines: [20],
      structures: [
        { type: "array", label: "distances from node 2", values: ["node 1: 1", "node 2: 0", "node 3: 1", "node 4: 2"], highlights: { 3: "success" } },
        { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "last node reached", value: "node 4 at time 2" }, { name: "Time", value: "O(E log V)" }] },
      ],
    },
  ],
};

export default solution;

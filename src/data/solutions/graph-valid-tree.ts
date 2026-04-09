import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Union-Find",
    timeComplexity: "O(n * α(n)) ≈ O(n)",
    spaceComplexity: "O(n)",
    code: `def validTree(n, edges):
    if len(edges) != n - 1:
        return False
    parent = list(range(n))
    rank = [0] * n

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra == rb:
            return False
        if rank[ra] < rank[rb]:
            ra, rb = rb, ra
        parent[rb] = ra
        if rank[ra] == rank[rb]:
            rank[ra] += 1
        return True

    return all(union(a, b) for a, b in edges)`,
    steps: [
      {
        description:
          "Determine if an undirected graph is a valid tree. A tree has two properties: (1) exactly n-1 edges, and (2) no cycles (equivalently: fully connected). Quick check first: if edge count ≠ n-1, return False immediately. Then use Union-Find: process each edge — if both nodes are already in the same component, adding this edge creates a cycle → not a tree. n=5, edges=[[0,1],[0,2],[0,3],[1,4]]. Edge count = 4 = n-1 ✓.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "array",
            label: "parent (each node is its own root)",
            values: [0, 1, 2, 3, 4],
          },
          {
            type: "graph",
            label: "graph to check",
            nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
            edges: [
              { from: 0, to: 1 },
              { from: 0, to: 2 },
              { from: 0, to: 3 },
              { from: 1, to: 4 },
            ],
          },
          {
            type: "variables",
            entries: [
              { name: "n", value: 5 },
              { name: "edges", value: 4 },
              { name: "n-1 check", value: "4 = 5-1 ✓" },
            ],
          },
        ],
      },
      {
        description:
          "Edge (0,1): find(0)=0, find(1)=1. Different roots → union succeeds. parent[1]=0. Edge (0,2): find(0)=0, find(2)=2. Different → union. parent[2]=0. So far so good — no cycles. The find() function uses path compression (parent[x] = parent[parent[x]]) to keep the tree flat for O(α(n)) ≈ O(1) lookups.",
        codeHighlightLines: [12, 13, 14, 15, 18, 19, 20, 21, 22],
        structures: [
          {
            type: "array",
            label: "parent",
            values: [0, 0, 0, 3, 4],
            highlights: { 1: "active", 2: "active" },
          },
          {
            type: "variables",
            entries: [{ name: "edge (0,1)", value: "union ✓" }, { name: "edge (0,2)", value: "union ✓" }, { name: "edges processed", value: "2/4" }],
          },
        ],
      },
      {
        description:
          "Edge (0,3): find(0)=0, find(3)=3. Different → union. parent[3]=0. Edge (1,4): find(1) follows parent[1]=0, root=0. find(4)=4. Different → union. parent[4]=0. All 4 edges processed without finding a cycle! If edge (1,4) had been (1,2) instead, find(1)=0 and find(2)=0 — same root! That would mean a cycle → return False.",
        codeHighlightLines: [24],
        structures: [
          {
            type: "array",
            label: "parent (final)",
            values: [0, 0, 0, 0, 0],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "all unions succeeded", value: "no cycles found" }, { name: "all nodes connected", value: "one component" }],
          },
        ],
      },
      {
        description:
          "Return True — the graph is a valid tree! It has exactly n-1=4 edges and no cycles. The combination of the edge count check and cycle detection is sufficient: n-1 edges + no cycles = connected tree. Time: O(n × α(n)) ≈ O(n) where α is the inverse Ackermann function (practically constant). Space: O(n) for parent and rank arrays.",
        codeHighlightLines: [24],
        structures: [
          {
            type: "graph",
            label: "valid tree ✓",
            nodes: [{ id: 0, highlight: "success" }, { id: 1, highlight: "success" }, { id: 2, highlight: "success" }, { id: 3, highlight: "success" }, { id: 4, highlight: "success" }],
            edges: [
              { from: 0, to: 1, highlight: "success" },
              { from: 0, to: 2, highlight: "success" },
              { from: 0, to: 3, highlight: "success" },
              { from: 1, to: 4, highlight: "success" },
            ],
          },
          { type: "variables", entries: [{ name: "return", value: "True", highlight: true }, { name: "Time", value: "O(n × α(n)) ≈ O(n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

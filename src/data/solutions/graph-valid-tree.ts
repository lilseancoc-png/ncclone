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
          "A valid tree: exactly n-1 edges and no cycles. Quick check: 4 edges for 5 nodes (4 = 5-1 ✓). Then use Union-Find: process each edge — if both endpoints share a root, adding this edge creates a cycle → not a tree. n=5, edges=[[0,1],[0,2],[0,3],[1,4]].",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          { type: "array", label: "parent", values: [0, 1, 2, 3, 4] },
          { type: "graph", label: "graph", nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }], edges: [{ from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 1, to: 4 }] },
          { type: "variables", entries: [{ name: "edge count", value: "4 = n-1 ✓" }] },
        ],
      },
      {
        description:
          "Edge (0,1): find(0)=0, find(1)=1. Different roots → union. parent[1]=0. Edge (0,2): find(0)=0, find(2)=2. Different → union. parent[2]=0. Two edges processed, no cycles. Nodes 0, 1, 2 are connected.",
        codeHighlightLines: [7, 8, 9, 10, 13, 14, 15, 19, 20, 21, 22],
        structures: [
          { type: "array", label: "parent", values: [0, 0, 0, 3, 4], highlights: { 1: "active", 2: "active" } },
          { type: "variables", entries: [{ name: "edge (0,1)", value: "union ✓" }, { name: "edge (0,2)", value: "union ✓" }, { name: "components", value: "{0,1,2}, {3}, {4}" }] },
        ],
      },
      {
        description:
          "Edge (0,3): find(0)=0, find(3)=3. Different → union. parent[3]=0. Edge (1,4): find(1) → parent[1]=0 → root=0. find(4)=4. Different roots → union. parent[4]=0. All 4 edges processed without any same-root collision.",
        codeHighlightLines: [13, 14, 15, 19, 20, 21, 22, 24],
        structures: [
          { type: "array", label: "parent", values: [0, 0, 0, 0, 0], highlights: { 3: "active", 4: "active" } },
          { type: "variables", entries: [{ name: "edge (0,3)", value: "union ✓" }, { name: "edge (1,4)", value: "find(1)→root 0, find(4)→4 → union ✓", highlight: true }, { name: "components", value: "{0,1,2,3,4} (one component)" }] },
        ],
      },
      {
        description:
          "If edge (1,4) were (1,2) instead: find(1)=0, find(2)=0 → same root! Union returns False → cycle detected. The cycle would be 0-1-2-0. This is why we need both checks: n-1 edges (necessary for tree) and no cycles (sufficient with n-1 edges).",
        codeHighlightLines: [15, 16],
        structures: [
          { type: "array", label: "parent (cycle example)", values: [0, 0, 0, 3, 4] },
          { type: "variables", entries: [{ name: "edge (1,2)", value: "find(1)=0, find(2)=0" }, { name: "same root!", value: "cycle: 0-1-2-0 → False", highlight: true }] },
        ],
      },
      {
        description:
          "Return True — the graph is a valid tree. n-1 edges + no cycles = connected acyclic graph = tree. Union-Find with path compression and union by rank: O(α(n)) per operation (α = inverse Ackermann, practically constant). Total: O(n). Space: O(n) for parent and rank arrays.",
        codeHighlightLines: [24],
        structures: [
          { type: "graph", label: "valid tree ✓", nodes: [{ id: 0, highlight: "success" }, { id: 1, highlight: "success" }, { id: 2, highlight: "success" }, { id: 3, highlight: "success" }, { id: 4, highlight: "success" }], edges: [{ from: 0, to: 1, highlight: "success" }, { from: 0, to: 2, highlight: "success" }, { from: 0, to: 3, highlight: "success" }, { from: 1, to: 4, highlight: "success" }] },
          { type: "variables", entries: [{ name: "return", value: "True", highlight: true }, { name: "Time", value: "O(n × α(n)) ≈ O(n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

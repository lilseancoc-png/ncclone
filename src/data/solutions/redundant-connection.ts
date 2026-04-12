import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Union-Find",
  timeComplexity: "O(n · α(n))",
  spaceComplexity: "O(n)",
  code: `def findRedundantConnection(edges):
    parent = list(range(len(edges) + 1))
    rank = [0] * (len(edges) + 1)

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])  # path compression
        return parent[x]

    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False  # cycle!
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True

    for u, v in edges:
        if not union(u, v):
            return [u, v]`,
  steps: [
    {
      description:
        "A tree with n nodes has n-1 edges. We're given n edges (one extra creates a cycle). Find that redundant edge. Union-Find: process edges one by one. When both endpoints already share a root, that edge creates a cycle — it's redundant. edges=[[1,2],[1,3],[2,3]].",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "parent", values: ["_", 1, 2, 3], highlights: { 1: "active", 2: "active", 3: "active" } },
        { type: "array", label: "edges", values: ["[1,2]", "[1,3]", "[2,3]"] },
      ],
    },
    {
      description:
        "Edge [1,2]: find(1)=1, find(2)=2. Different roots → union. parent[2]=1, rank[1]=1. Nodes 1 and 2 are now in the same component.",
      codeHighlightLines: [5, 6, 7, 8, 10, 11, 15, 16, 17, 18, 19],
      structures: [
        { type: "array", label: "parent", values: ["_", 1, 1, 3], highlights: { 2: "active" } },
        { type: "array", label: "edges", values: ["[1,2] ✓", "[1,3]", "[2,3]"], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "find(1)=1, find(2)=2", value: "different → union ✓" }] },
      ],
    },
    {
      description:
        "Edge [1,3]: find(1)=1, find(3)=3. Different roots → union. parent[3]=1. Now all three nodes are connected through node 1. One more edge to process.",
      codeHighlightLines: [10, 11, 15, 16, 17, 18, 19],
      structures: [
        { type: "array", label: "parent", values: ["_", 1, 1, 1], highlights: { 3: "active" } },
        { type: "array", label: "edges", values: ["[1,2] ✓", "[1,3] ✓", "[2,3]"], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "find(1)=1, find(3)=3", value: "different → union ✓" }, { name: "component", value: "{1, 2, 3}" }] },
      ],
    },
    {
      description:
        "Edge [2,3]: find(2) → parent[2]=1, root=1. find(3) → parent[3]=1, root=1. SAME ROOT! Both already connected. Adding this edge creates cycle 1-2-3-1. Return [2,3] as the redundant edge.",
      codeHighlightLines: [10, 11, 12, 13, 21, 22],
      structures: [
        { type: "array", label: "parent", values: ["_", 1, 1, 1], highlights: { 1: "found", 2: "found", 3: "found" } },
        { type: "variables", entries: [{ name: "find(2)=1, find(3)=1", value: "SAME ROOT!", highlight: true }, { name: "cycle", value: "1-2-3-1" }, { name: "return", value: "[2, 3]", highlight: true }] },
      ],
    },
    {
      description:
        "Return [2,3]. Without it, the graph is a valid tree: 1-2 and 1-3. Path compression (parent[x] = find(parent[x])) flattens chains for near-O(1) lookups. Union by rank keeps trees balanced. Total time: O(n·α(n)) ≈ O(n). If multiple edges could be redundant, we return the last one in input order.",
      codeHighlightLines: [22],
      structures: [
        { type: "array", label: "edges", values: ["[1,2]", "[1,3]", "[2,3]"], highlights: { 0: "success", 1: "success", 2: "found" } },
        { type: "variables", entries: [{ name: "return", value: "[2, 3]", highlight: true }, { name: "valid tree", value: "edges [1,2] and [1,3]" }, { name: "Time", value: "O(n · α(n)) ≈ O(n)" }] },
      ],
    },
  ],
};

export default solution;

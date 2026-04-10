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
        "Given a graph that is a tree plus one extra edge, find and return that redundant edge (the one that creates a cycle). A tree with n nodes has exactly n-1 edges. We're given n edges, so exactly one creates a cycle. Union-Find detects cycles efficiently: process edges one by one, merging components. When both endpoints of an edge are already in the same component, that edge would create a cycle — it's the redundant one. edges = [[1,2],[1,3],[2,3]].",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "parent (each node is own root)", values: ["_", 1, 2, 3], highlights: { 1: "active", 2: "active", 3: "active" } },
        { type: "array", label: "rank", values: ["_", 0, 0, 0], highlights: {} },
        { type: "array", label: "edges", values: ["[1,2]", "[1,3]", "[2,3]"], highlights: {} },
      ],
    },
    {
      description:
        "Edge [1,2]: find(1)=1, find(2)=2 — different roots, so they're in separate components. Union them: parent[2]=1, rank[1]++ = 1. Nodes 1 and 2 are now connected. Edge [1,3]: find(1)=1, find(3)=3 — different roots. Union: parent[3]=1. Now all three nodes are in one component. Each union operation is nearly O(1) thanks to path compression (find flattens the tree) and union by rank (shorter tree attached under taller).",
      codeHighlightLines: [5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      structures: [
        { type: "array", label: "parent", values: ["_", 1, 1, 1], highlights: { 2: "checked", 3: "checked" } },
        { type: "array", label: "rank", values: ["_", 1, 0, 0], highlights: { 1: "active" } },
        { type: "array", label: "edges processed", values: ["[1,2] ✓", "[1,3] ✓", "[2,3]"], highlights: { 0: "success", 1: "success" } },
      ],
    },
    {
      description:
        "Edge [2,3]: find(2) → parent[2]=1, so root is 1. find(3) → parent[3]=1, root is 1. Both endpoints have the SAME root — they're already connected! Adding this edge would create a cycle: 1-2-3-1. This is the redundant edge. Return [2,3] immediately. Path compression also applied: any long chains get flattened during find(), keeping future lookups fast.",
      codeHighlightLines: [10, 11, 12, 21, 22],
      structures: [
        { type: "array", label: "parent", values: ["_", 1, 1, 1], highlights: { 1: "found", 2: "found", 3: "found" } },
        { type: "variables", entries: [{ name: "find(2)", value: "root = 1" }, { name: "find(3)", value: "root = 1" }, { name: "same root!", value: "cycle detected → [2,3] is redundant", highlight: true }] },
      ],
    },
    {
      description:
        "Return [2,3]. Without this edge, the graph is a valid tree: 1-2 and 1-3 (two edges connecting three nodes). Union-Find with path compression and union by rank achieves O(α(n)) per operation, where α is the inverse Ackermann function — effectively constant. Total time: O(n·α(n)) ≈ O(n). Space: O(n) for the parent and rank arrays. If multiple edges could be redundant, the problem guarantees we return the one appearing last in the input.",
      codeHighlightLines: [22],
      structures: [
        { type: "array", label: "edges", values: ["[1,2]", "[1,3]", "[2,3]"], highlights: { 0: "success", 1: "success", 2: "found" } },
        { type: "variables", entries: [{ name: "return", value: "[2, 3]", highlight: true }, { name: "Time", value: "O(n · α(n)) ≈ O(n)" }, { name: "Space", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;

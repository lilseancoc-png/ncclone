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
        "Find the edge that creates a cycle in an undirected graph. Union-Find: each node starts as its own parent. For each edge, union the two nodes. If they already share a root, that edge creates a cycle. edges = [[1,2],[1,3],[2,3]].",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "parent", values: ["_", 1, 2, 3], highlights: { 1: "active", 2: "active", 3: "active" } },
        { type: "array", label: "rank", values: ["_", 0, 0, 0], highlights: {} },
        { type: "array", label: "edges", values: ["[1,2]", "[1,3]", "[2,3]"], highlights: {} },
      ],
    },
    {
      description:
        "Process edge [1,2]: find(1)=1, find(2)=2. Different roots — union them. parent[2]=1. Process edge [1,3]: find(1)=1, find(3)=3. Different — union. parent[3]=1.",
      codeHighlightLines: [9, 10, 11, 14, 15, 16, 17, 20, 21],
      structures: [
        { type: "array", label: "parent", values: ["_", 1, 1, 1], highlights: { 2: "checked", 3: "checked" } },
        { type: "array", label: "rank", values: ["_", 1, 0, 0], highlights: { 1: "active" } },
        { type: "array", label: "edges", values: ["[1,2]", "[1,3]", "[2,3]"], highlights: { 0: "success", 1: "success" } },
      ],
    },
    {
      description:
        "Process edge [2,3]: find(2) follows path compression 2→1, find(3) follows 3→1. Both have root 1 — same component! This edge creates a cycle. Return [2,3].",
      codeHighlightLines: [10, 11, 12, 21, 22],
      structures: [
        { type: "array", label: "parent", values: ["_", 1, 1, 1], highlights: { 1: "found", 2: "found", 3: "found" } },
        { type: "array", label: "edges", values: ["[1,2]", "[1,3]", "[2,3]"], highlights: { 2: "found" } },
        { type: "variables", entries: [{ name: "find(2)", value: "1" }, { name: "find(3)", value: "1" }, { name: "same root?", value: "YES — cycle!", highlight: true }] },
      ],
    },
    {
      description:
        "Return [2,3] — the redundant edge. Union-Find with path compression and union by rank runs in O(alpha(n)) per operation, nearly O(1). Total time: O(n*alpha(n)).",
      codeHighlightLines: [22],
      structures: [
        { type: "array", label: "edges", values: ["[1,2]", "[1,3]", "[2,3]"], highlights: { 0: "success", 1: "success", 2: "found" } },
        { type: "variables", entries: [{ name: "return", value: "[2, 3]", highlight: true }] },
      ],
    },
  ],
};

export default solution;

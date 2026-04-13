import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Union-Find",
    timeComplexity: "O(n * α(n)) ≈ O(n)",
    spaceComplexity: "O(n)",
    code: `def countComponents(n, edges):
    parent = list(range(n))
    rank = [0] * n
    components = n

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    def union(a, b):
        ra, rb = find(a), find(b)
        if ra == rb:
            return
        if rank[ra] < rank[rb]:
            ra, rb = rb, ra
        parent[rb] = ra
        if rank[ra] == rank[rb]:
            rank[ra] += 1
        nonlocal components
        components -= 1

    for a, b in edges:
        union(a, b)
    return components`,
    steps: [
      {
        description:
          "Count connected components in an undirected graph. Union-Find: start with n components (each node is its own parent). For each edge, merge two nodes' components. The count decreases by 1 each successful merge. n=5, edges=[[0,1],[1,2],[3,4]].",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          { type: "array", label: "parent", values: [0, 1, 2, 3, 4] },
          {
            type: "graph",
            label: "5 isolated nodes",
            nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
            edges: [],
          },
          { type: "variables", entries: [{ name: "components", value: 5 }, { name: "edges", value: "[[0,1],[1,2],[3,4]]" }] },
        ],
      },
      {
        description:
          "Edge (0,1): find(0)=0, find(1)=1. Different roots → merge! parent[1]=0. components = 5-1 = 4. Nodes 0 and 1 are now in the same component. Union by rank attaches smaller trees under larger ones.",
        codeHighlightLines: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        structures: [
          { type: "array", label: "parent", values: [0, 0, 2, 3, 4], highlights: { 0: "active", 1: "active" } },
          {
            type: "graph",
            label: "after edge (0,1)",
            nodes: [{ id: 0, highlight: "active" }, { id: 1, highlight: "active" }, { id: 2 }, { id: 3 }, { id: 4 }],
            edges: [{ from: 0, to: 1, highlight: "active" }],
          },
          { type: "variables", entries: [{ name: "components", value: 4, highlight: true }] },
        ],
      },
      {
        description:
          "Edge (1,2): find(1) → parent[1]=0, root is 0. find(2)=2. Different roots → merge! parent[2]=0. components = 4-1 = 3. Path compression: find(1) sets parent[1] = parent[parent[1]], keeping trees flat for near-O(1) future lookups.",
        codeHighlightLines: [6, 7, 8, 9, 10, 24, 25],
        structures: [
          { type: "array", label: "parent", values: [0, 0, 0, 3, 4], highlights: { 2: "active" } },
          {
            type: "graph",
            label: "after edge (1,2)",
            nodes: [{ id: 0, highlight: "success" }, { id: 1, highlight: "success" }, { id: 2, highlight: "active" }, { id: 3 }, { id: 4 }],
            edges: [{ from: 0, to: 1, highlight: "success" }, { from: 1, to: 2, highlight: "active" }],
          },
          { type: "variables", entries: [{ name: "components", value: 3, highlight: true }, { name: "component {0,1,2}", value: "all root=0" }] },
        ],
      },
      {
        description:
          "Edge (3,4): find(3)=3, find(4)=4. Different → merge! parent[4]=3. components = 3-1 = 2. Nodes 3 and 4 form a second component. All edges processed.",
        codeHighlightLines: [24, 25],
        structures: [
          { type: "array", label: "parent (final)", values: [0, 0, 0, 3, 3], highlights: { 3: "active", 4: "active" } },
          {
            type: "graph",
            label: "2 components",
            nodes: [{ id: 0, highlight: "success" }, { id: 1, highlight: "success" }, { id: 2, highlight: "success" }, { id: 3, highlight: "active" }, { id: 4, highlight: "active" }],
            edges: [{ from: 0, to: 1, highlight: "success" }, { from: 1, to: 2, highlight: "success" }, { from: 3, to: 4, highlight: "active" }],
          },
          { type: "variables", entries: [{ name: "components", value: 2, highlight: true }] },
        ],
      },
      {
        description:
          "Return 2 — components {0,1,2} and {3,4}. Time: O(n × α(n)) ≈ O(n), where α is the inverse Ackermann function (practically constant). Path compression + union by rank together guarantee this. Space: O(n) for parent and rank arrays. If edge (1,2) were replaced with (0,2), find(0)=0 and find(2)=0 → same root, no merge — the edge is redundant.",
        codeHighlightLines: [26],
        structures: [
          { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "component 1", value: "{0, 1, 2}" }, { name: "component 2", value: "{3, 4}" }, { name: "Time", value: "O(n × α(n)) ≈ O(n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

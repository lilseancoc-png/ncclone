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
          "A valid tree has exactly n-1 edges and no cycles. Quick check: if edges != n-1, return False. Then use Union-Find: for each edge, union the two nodes. If they're already in the same set, there's a cycle → not a tree.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "array",
            label: "parent",
            values: [0, 1, 2, 3, 4],
            highlights: {},
          },
          {
            type: "variables",
            entries: [
              { name: "n", value: 5 },
              { name: "edges", value: "[[0,1],[0,2],[0,3],[1,4]]" },
            ],
          },
        ],
      },
      {
        description:
          "edges.length = 4 = n-1 ✓. Edge (0,1): find(0)=0, find(1)=1. Different → union. parent[1]=0. Edge (0,2): find(0)=0, find(2)=2. Union. parent[2]=0.",
        codeHighlightLines: [12, 13, 14, 18, 23],
        structures: [
          {
            type: "array",
            label: "parent",
            values: [0, 0, 0, 3, 4],
            highlights: { 1: "active", 2: "active" },
          },
          {
            type: "variables",
            entries: [{ name: "edges processed", value: "2/4" }],
          },
        ],
      },
      {
        description:
          "Edge (0,3): union(0,3). parent[3]=0. Edge (1,4): find(1)→parent[1]=0, find(4)=4. Different → union. parent[4]=0. All edges processed, no cycles found!",
        codeHighlightLines: [23],
        structures: [
          {
            type: "array",
            label: "parent",
            values: [0, 0, 0, 0, 0],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: "True — valid tree!", highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

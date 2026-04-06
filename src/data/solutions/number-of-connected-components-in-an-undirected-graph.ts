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
          "Count connected components using Union-Find. Start with n components (each node is its own component). For each edge, union the two nodes — if they were in different components, decrement the count.",
        codeHighlightLines: [1, 2, 3, 4],
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
              { name: "components", value: 5 },
              { name: "edges", value: "[[0,1],[1,2],[3,4]]" },
            ],
          },
        ],
      },
      {
        description:
          "Edge (0,1): Union → components=4. Edge (1,2): find(1)→0, find(2)=2. Different, union → components=3. Nodes 0,1,2 now connected.",
        codeHighlightLines: [24, 25],
        structures: [
          {
            type: "array",
            label: "parent",
            values: [0, 0, 0, 3, 4],
            highlights: { 0: "active", 1: "active", 2: "active" },
          },
          {
            type: "variables",
            entries: [{ name: "components", value: 3, highlight: true }],
          },
        ],
      },
      {
        description:
          "Edge (3,4): find(3)=3, find(4)=4. Different, union → components=2. Final: Two connected components: {0,1,2} and {3,4}.",
        codeHighlightLines: [24, 25, 26],
        structures: [
          {
            type: "array",
            label: "parent",
            values: [0, 0, 0, 3, 3],
            highlights: { 3: "active", 4: "active" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: 2, highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Preorder DFS",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: `class Codec:
    def serialize(self, root):
        result = []
        def dfs(node):
            if not node:
                result.append('N')
                return
            result.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ','.join(result)

    def deserialize(self, data):
        vals = iter(data.split(','))
        def dfs():
            val = next(vals)
            if val == 'N':
                return None
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node
        return dfs()`,
    steps: [
      {
        description:
          "Serialize a binary tree to a string and back. Use preorder DFS: visit root, then left, then right. Mark null nodes with 'N'. This uniquely encodes the tree structure. Example: tree [1, 2, 3, null, null, 4, 5].",
        codeHighlightLines: [2, 3, 4],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "tree", value: "1(2, 3(4, 5))" },
            ],
          },
        ],
      },
      {
        description:
          "Serialize DFS: Visit 1 → '1'. Left: visit 2 → '2'. Left of 2: null → 'N'. Right of 2: null → 'N'. Right of 1: visit 3 → '3'. Left: 4 → '4', N, N. Right: 5 → '5', N, N.",
        codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12],
        structures: [
          {
            type: "array",
            label: "serialized tokens",
            values: ["1", "2", "N", "N", "3", "4", "N", "N", "5", "N", "N"],
            highlights: { 0: "success", 1: "success", 4: "success", 5: "success", 8: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "string", value: "1,2,N,N,3,4,N,N,5,N,N" }],
          },
        ],
      },
      {
        description:
          "Deserialize: Use an iterator over tokens. Read '1' → create node 1. Recurse left: '2' → node 2. Left: 'N' → null. Right: 'N' → null. Recurse right: '3' → node 3. Continue...",
        codeHighlightLines: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        structures: [
          {
            type: "array",
            label: "tokens being consumed",
            values: ["1", "2", "N", "N", "3", "4", "N", "N", "5", "N", "N"],
            highlights: { 0: "active", 1: "active", 2: "checked", 3: "checked" },
          },
        ],
      },
      {
        description:
          "Tree fully reconstructed: 1(left=2, right=3(left=4, right=5)). The preorder encoding + null markers uniquely identifies the tree. Both serialize and deserialize are O(n) — each node visited exactly once.",
        codeHighlightLines: [24],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "reconstructed", value: "1(2, 3(4, 5))", highlight: true },
              { name: "matches original?", value: "Yes!" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

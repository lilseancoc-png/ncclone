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
          "Serialize a binary tree to a string and reconstruct it back. The challenge: a tree has both structure (shape) and data (values). We need an encoding that captures both perfectly. Preorder DFS (root → left → right) with null markers ('N') is one of the simplest approaches that works. The null markers are essential — without them, the preorder sequence alone is ambiguous (many different trees can have the same preorder sequence). With nulls, the encoding is unique and decodable. Tree: 1(2, 3(4, 5)).",
        codeHighlightLines: [2, 3, 4],
        structures: [
          { type: "tree", label: "tree", nodes: [{ value: 1 }, { value: 2 }, { value: 3 }, null, null, { value: 4 }, { value: 5 }] },
          {
            type: "variables",
            entries: [
              { name: "encoding", value: "preorder DFS + null markers" },
              { name: "why nulls?", value: "makes encoding unambiguous" },
            ],
          },
        ],
      },
      {
        description:
          "Serialize via DFS: Visit node 1 → emit '1'. Go left to node 2 → emit '2'. Node 2's left is null → emit 'N'. Node 2's right is null → emit 'N'. Back to 1, go right to node 3 → emit '3'. Node 3's left is 4 → '4', then 4's children: 'N', 'N'. Node 3's right is 5 → '5', then 5's children: 'N', 'N'. Result: '1,2,N,N,3,4,N,N,5,N,N'. Every node produces exactly one token, every null produces 'N'. Total tokens = nodes + nulls = n + (n+1) = 2n+1.",
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
            entries: [{ name: "string", value: "'1,2,N,N,3,4,N,N,5,N,N'" }, { name: "tokens", value: "5 nodes + 6 nulls = 11" }],
          },
        ],
      },
      {
        description:
          "Deserialize: Split the string by commas, create an iterator. Use the same preorder DFS logic: read the next token. If 'N', return null. Otherwise, create a node, then recursively build its left and right subtrees. The iterator advances globally, so each recursive call consumes exactly the tokens that belong to its subtree. Read '1' → create node(1). Recurse left: '2' → node(2). Recurse left: 'N' → null. Recurse right: 'N' → null. Node 2 complete. Back to node 1, recurse right: '3' → node(3), and so on.",
        codeHighlightLines: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        structures: [
          {
            type: "array",
            label: "tokens consumed left to right",
            values: ["1", "2", "N", "N", "3", "4", "N", "N", "5", "N", "N"],
            highlights: { 0: "active", 1: "active", 2: "checked", 3: "checked", 4: "active" },
          },
        ],
      },
      {
        description:
          "Tree fully reconstructed: 1(left=2, right=3(left=4, right=5)). The iterator-based approach is elegant — no need for index tracking or string parsing. Each token is consumed exactly once in the same order it was produced. This works because preorder traversal produces a unique encoding when null positions are explicit. Time: O(n) for both serialize and deserialize. Space: O(n) for the string/tokens. This approach generalizes to n-ary trees and other tree-like structures.",
        codeHighlightLines: [24],
        structures: [
          { type: "tree", label: "reconstructed tree", nodes: [{ value: 1, highlight: "success" }, { value: 2, highlight: "success" }, { value: 3, highlight: "success" }, null, null, { value: 4, highlight: "success" }, { value: 5, highlight: "success" }] },
          {
            type: "variables",
            entries: [
              { name: "matches original?", value: "Yes!", highlight: true },
              { name: "Time", value: "O(n)" },
              { name: "Space", value: "O(n)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

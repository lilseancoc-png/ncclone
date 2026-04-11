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
          "Serialize a binary tree to a string and reconstruct it back. The challenge: capture both structure (shape) and data (values). Preorder DFS (root→left→right) with null markers ('N') gives a unique, unambiguous encoding. Without null markers, multiple trees share the same preorder — the nulls tell us exactly where subtrees end. Tree: 1(left=2, right=3(left=4, right=5)).",
        codeHighlightLines: [2, 3, 4],
        structures: [
          { type: "tree", label: "tree", nodes: [{ value: 1 }, { value: 2 }, { value: 3 }, null, null, { value: 4 }, { value: 5 }] },
          { type: "variables", entries: [{ name: "encoding", value: "preorder DFS + null markers" }, { name: "why nulls?", value: "makes encoding unambiguous" }] },
        ],
      },
      {
        description:
          "Serialize: DFS visits node 1 → emit '1'. Go left to 2 → emit '2'. Node 2 has no left child → emit 'N'. No right child → emit 'N'. Back to 1, go right to 3 → emit '3'. Node 3's left is 4 → emit '4', then 4's children: 'N', 'N'. Node 3's right is 5 → emit '5', then 5's children: 'N', 'N'.",
        codeHighlightLines: [5, 6, 7, 8, 9, 10, 11],
        structures: [
          { type: "tree", label: "DFS traversal order", nodes: [{ value: 1, highlight: "active" }, { value: 2, highlight: "checked" }, { value: 3, highlight: "active" }, null, null, { value: 4, highlight: "checked" }, { value: 5, highlight: "checked" }] },
          { type: "array", label: "result tokens", values: ["1", "2", "N", "N", "3", "4", "N", "N", "5", "N", "N"], highlights: { 0: "success", 1: "success", 4: "success", 5: "success", 8: "success" } },
        ],
      },
      {
        description:
          "Join tokens: '1,2,N,N,3,4,N,N,5,N,N'. Every node produces one value token, every null produces 'N'. Total: 5 nodes + 6 nulls = 11 tokens. A tree with n nodes always has n+1 null pointers (each leaf has 2, internal nodes may have 0-1), so the string size is always O(n).",
        codeHighlightLines: [12],
        structures: [
          { type: "variables", entries: [{ name: "serialized", value: "'1,2,N,N,3,4,N,N,5,N,N'" }, { name: "tokens", value: "5 nodes + 6 nulls = 11" }, { name: "n nodes →", value: "n+1 null markers always" }] },
        ],
      },
      {
        description:
          "Deserialize: Split by commas, create an iterator. Read '1' → create node(1). Recurse left: read '2' → create node(2). Recurse left: read 'N' → return null (node 2 has no left). Recurse right: read 'N' → return null (node 2 has no right). Node 2 complete. Back to node 1, recurse right: read '3' → create node(3).",
        codeHighlightLines: [14, 15, 16, 17, 18, 19, 20, 21],
        structures: [
          { type: "array", label: "tokens (consumed left to right)", values: ["1", "2", "N", "N", "3", "4", "N", "N", "5", "N", "N"], highlights: { 0: "success", 1: "success", 2: "checked", 3: "checked", 4: "active" } },
          { type: "variables", entries: [{ name: "built so far", value: "1(left=2(null,null), right=...)" }, { name: "iterator at", value: "'3' (index 4)" }] },
        ],
      },
      {
        description:
          "Continue: node 3's left → read '4' → create node(4). Node 4's children: 'N', 'N'. Node 3's right → read '5' → create node(5). Node 5's children: 'N', 'N'. Tree fully reconstructed! The iterator advances globally — each recursive call consumes exactly the tokens for its subtree, in the same order they were produced.",
        codeHighlightLines: [19, 20, 21, 22, 23],
        structures: [
          { type: "array", label: "all tokens consumed", values: ["1", "2", "N", "N", "3", "4", "N", "N", "5", "N", "N"], highlights: { 0: "success", 1: "success", 4: "success", 5: "success", 8: "success" } },
          { type: "tree", label: "reconstructed tree", nodes: [{ value: 1, highlight: "success" }, { value: 2, highlight: "success" }, { value: 3, highlight: "success" }, null, null, { value: 4, highlight: "success" }, { value: 5, highlight: "success" }] },
        ],
      },
      {
        description:
          "Return the root — tree matches the original perfectly. The elegance: serialize and deserialize use the exact same DFS order (preorder), so the iterator naturally visits tokens in the right sequence. Time: O(n) for both operations. Space: O(n) for the string. This generalizes to n-ary trees (serialize children count + values) and other recursive structures.",
        codeHighlightLines: [24],
        structures: [
          { type: "variables", entries: [{ name: "matches original?", value: "Yes!", highlight: true }, { name: "key insight", value: "same DFS order for both ops" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

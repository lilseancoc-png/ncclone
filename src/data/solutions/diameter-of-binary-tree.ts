import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "DFS — Track Max Path",
  timeComplexity: "O(n)",
  spaceComplexity: "O(h)",
  code: `def diameter_of_binary_tree(root):
    diameter = 0
    def dfs(node):
        nonlocal diameter
        if not node:
            return 0
        left = dfs(node.left)
        right = dfs(node.right)
        diameter = max(diameter, left + right)
        return 1 + max(left, right)
    dfs(root)
    return diameter`,
  steps: [
    {
      description:
        "The diameter is the longest path between any two nodes (number of edges). At each node, the path through it = left height + right height. Track the max. Tree: [1,2,3,4,5].",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        { type: "array", label: "tree", values: [1, 2, 3, 4, 5] },
        { type: "variables", entries: [{ name: "diameter", value: 0 }] },
      ],
    },
    {
      description:
        "DFS post-order. Node 4: leaf, returns height 0. Node 5: leaf, returns height 0. Node 2: left=1(from 4), right=1(from 5). Path through 2: 1+1=2. diameter=2. Returns height 1+1=2.",
      codeHighlightLines: [7, 8, 9, 10],
      structures: [
        { type: "array", label: "tree", values: [1, 2, 3, 4, 5], highlights: { 1: "active", 3: "checked", 4: "checked" } },
        { type: "variables", entries: [{ name: "node 2", value: "left=1, right=1" }, { name: "path through 2", value: "1+1=2" }, { name: "diameter", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "Node 3: leaf, returns 0. Node 1 (root): left=2(from 2), right=1(from 3). Path through 1: 2+1=3. diameter=max(2,3)=3. This is the longest path: 4→2→1→3.",
      codeHighlightLines: [7, 8, 9, 10],
      structures: [
        { type: "array", label: "tree", values: [1, 2, 3, 4, 5], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", entries: [{ name: "path through root", value: "2+1=3" }, { name: "diameter", value: 3, highlight: true }, { name: "path", value: "4→2→1→3" }] },
      ],
    },
    {
      description:
        "Return 3 (edges in longest path). O(n) time — visit each node once. O(h) space for recursion stack. Note: the diameter doesn't necessarily pass through the root.",
      codeHighlightLines: [11, 12],
      structures: [
        { type: "variables", entries: [{ name: "return", value: 3, highlight: true }] },
      ],
    },
  ],
};

export default solution;

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
        "The diameter of a binary tree is the length of the longest path between any two nodes (counted in edges). This path may or may not pass through the root. The key insight: for any node, the longest path THROUGH it = height of left subtree + height of right subtree. We do a post-order DFS: compute heights bottom-up, and at each node update the global diameter. Tree: [1,2,3,4,5].",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }] },
        { type: "variables", entries: [{ name: "diameter", value: 0 }, { name: "strategy", value: "at each node: diameter = max(diameter, left_h + right_h)" }] },
      ],
    },
    {
      description:
        "DFS processes nodes bottom-up (post-order). Node 4: it's a leaf — no children, so left=0, right=0. Path through node 4: 0+0=0. diameter stays 0. Return height = 1+max(0,0) = 1. Node 5: also a leaf, same result. Return height 1.",
      codeHighlightLines: [5, 6, 7, 8, 9, 10],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4, highlight: "checked" }, { value: 5, highlight: "checked" }] },
        { type: "variables", entries: [{ name: "node 4 (leaf)", value: "height=1, path=0" }, { name: "node 5 (leaf)", value: "height=1, path=0" }, { name: "diameter", value: 0 }] },
      ],
    },
    {
      description:
        "Node 2: left child (4) returned height 1, right child (5) returned height 1. Path through node 2: 1+1 = 2 (the path 4→2→5). diameter = max(0, 2) = 2. Return height = 1+max(1,1) = 2. Node 3: it's a leaf, returns height 1. Path through it: 0+0=0.",
      codeHighlightLines: [7, 8, 9, 10],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 1 }, { value: 2, highlight: "active" }, { value: 3, highlight: "checked" }, { value: 4, highlight: "checked" }, { value: 5, highlight: "checked" }] },
        { type: "variables", entries: [{ name: "node 2", value: "left=1, right=1, path=2" }, { name: "path 4→2→5", value: "2 edges", highlight: true }, { name: "diameter", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "Node 1 (root): left child (2) returned height 2, right child (3) returned height 1. Path through root: 2+1 = 3 (the path 4→2→1→3 or 5→2→1→3). diameter = max(2, 3) = 3. This is the longest path in the tree!",
      codeHighlightLines: [7, 8, 9],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 1, highlight: "success" }, { value: 2, highlight: "success" }, { value: 3, highlight: "success" }, { value: 4, highlight: "success" }, { value: 5 }] },
        { type: "variables", entries: [{ name: "node 1 (root)", value: "left=2, right=1, path=3" }, { name: "longest path", value: "4→2→1→3 = 3 edges", highlight: true }, { name: "diameter", value: 3, highlight: true }] },
      ],
    },
    {
      description:
        "Return diameter = 3. The longest path is 4→2→1→3 (3 edges). Important: the diameter doesn't always pass through the root — in a tree like [1,2,null,3,4,5,6], the longest path might be entirely in the left subtree. Our algorithm handles this correctly because we check every node. Time: O(n) — each node visited once. Space: O(h) for recursion stack, where h is the tree height.",
      codeHighlightLines: [11, 12],
      structures: [
        { type: "variables", entries: [{ name: "return", value: 3, highlight: true }, { name: "path", value: "4 → 2 → 1 → 3" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(h) recursion" }] },
      ],
    },
  ],
};

export default solution;

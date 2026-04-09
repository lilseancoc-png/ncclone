import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "DFS — Post-order Traversal",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) where h = tree height",
    code: `def maxPathSum(root):
    result = [float('-inf')]

    def dfs(node):
        if not node:
            return 0
        left = max(dfs(node.left), 0)
        right = max(dfs(node.right), 0)
        result[0] = max(result[0], node.val + left + right)
        return node.val + max(left, right)

    dfs(root)
    return result[0]`,
    steps: [
      {
        description:
          "Find the maximum path sum in a binary tree. A path goes from any node to any other node (doesn't need to pass through the root). At each node, we compute two things: (1) the max path THROUGH this node (left + node + right) — this might be the answer, so we update the global result. (2) the max 'gain' we can offer to our parent (node + best ONE child) — a path to the parent can only go through one child, not both. The max(…, 0) ensures we never take a negative branch. Tree: [-10, 9, 20, null, null, 15, 7].",
        codeHighlightLines: [1, 2, 4, 5, 6],
        structures: [
          { type: "tree", label: "tree", nodes: [{ value: -10 }, { value: 9 }, { value: 20 }, null, null, { value: 15 }, { value: 7 }] },
          {
            type: "variables",
            entries: [
              { name: "result", value: "-∞ (global max path sum)" },
              { name: "key insight", value: "each node: path through = L+node+R, gain to parent = node+max(L,R)" },
            ],
          },
        ],
      },
      {
        description:
          "DFS post-order processes leaves first. Node 9 (leaf): left=0, right=0. Path through 9: 0+9+0 = 9. Update result = max(-∞, 9) = 9. Gain to parent: 9+max(0,0) = 9. Node 15 (leaf): path = 15, result = max(9,15) = 15, gain = 15. Node 7 (leaf): path = 7, result stays 15, gain = 7.",
        codeHighlightLines: [5, 6, 7, 8, 9, 10],
        structures: [
          { type: "tree", label: "tree", nodes: [{ value: -10 }, { value: 9, highlight: "checked" }, { value: 20 }, null, null, { value: 15, highlight: "checked" }, { value: 7, highlight: "checked" }] },
          {
            type: "variables",
            entries: [
              { name: "node 9", value: "gain=9" },
              { name: "node 15", value: "gain=15", highlight: true },
              { name: "node 7", value: "gain=7" },
              { name: "result", value: 15 },
            ],
          },
        ],
      },
      {
        description:
          "Node 20: left = max(15, 0) = 15. right = max(7, 0) = 7. Path THROUGH 20: 15 + 20 + 7 = 42. This path goes 15→20→7. Update result = max(15, 42) = 42! Gain to parent: 20 + max(15, 7) = 35. We offer the best single branch (through 15) to our parent, because a path can't fork.",
        codeHighlightLines: [7, 8, 9, 10],
        structures: [
          { type: "tree", label: "tree", nodes: [{ value: -10 }, { value: 9 }, { value: 20, highlight: "active" }, null, null, { value: 15, highlight: "success" }, { value: 7, highlight: "success" }] },
          {
            type: "variables",
            entries: [
              { name: "node 20: L+node+R", value: "15+20+7 = 42", highlight: true },
              { name: "gain to parent", value: "20+max(15,7) = 35" },
              { name: "result", value: 42, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Node -10 (root): left = max(9, 0) = 9. right = max(35, 0) = 35. Path through -10: 9+(-10)+35 = 34 < 42 — not an improvement. Result stays 42. The maximum path sum is 42, from the path 15→20→7. It doesn't even include the root! This is why we track a global result — the best path could be anywhere in the tree. Time: O(n). Space: O(h).",
        codeHighlightLines: [9, 12, 13],
        structures: [
          { type: "tree", label: "tree", nodes: [{ value: -10, highlight: "checked" }, { value: 9, highlight: "checked" }, { value: 20, highlight: "success" }, null, null, { value: 15, highlight: "success" }, { value: 7, highlight: "success" }] },
          {
            type: "variables",
            entries: [
              { name: "path through root", value: "9+(-10)+35 = 34 < 42" },
              { name: "best path", value: "15 → 20 → 7 = 42", highlight: true },
              { name: "return", value: 42, highlight: true },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

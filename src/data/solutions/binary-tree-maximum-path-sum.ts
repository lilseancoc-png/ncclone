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
          "Find the maximum path sum in a binary tree. A path connects any two nodes (doesn't have to pass through root). At each node, we compute two things: (1) the path THROUGH this node (left + node + right) — candidate for global answer. (2) the gain we offer to our parent (node + best ONE child) — a path to the parent can only use one branch. max(..., 0) ensures we never take negative branches. Tree: [-10, 9, 20, null, null, 15, 7].",
        codeHighlightLines: [1, 2, 4, 5, 6],
        structures: [
          { type: "tree", label: "tree", nodes: [{ value: -10 }, { value: 9 }, { value: 20 }, null, null, { value: 15 }, { value: 7 }] },
          { type: "variables", entries: [{ name: "result", value: "-∞ (global max)" }, { name: "two computations", value: "path through node vs. gain to parent" }] },
        ],
      },
      {
        description:
          "Post-order DFS processes leaves first. Node 9 (leaf): left gain = max(0, 0) = 0. right gain = max(0, 0) = 0. Path through 9: 0 + 9 + 0 = 9. Update result = max(-∞, 9) = 9. Gain offered to parent (-10): 9 + max(0, 0) = 9. A leaf's path-through and gain are always the same — it has no children to fork through.",
        codeHighlightLines: [5, 6, 7, 8, 9, 10],
        structures: [
          { type: "tree", label: "tree", nodes: [{ value: -10 }, { value: 9, highlight: "active" }, { value: 20 }, null, null, { value: 15 }, { value: 7 }] },
          { type: "variables", entries: [{ name: "node 9 (leaf)", value: "path = 9, gain = 9" }, { name: "result", value: 9 }] },
        ],
      },
      {
        description:
          "Node 15 (leaf): path through = 15, gain = 15. result = max(9, 15) = 15. Node 7 (leaf): path through = 7, gain = 7. result stays 15. Now all leaves are processed. The tree's bottom-up processing ensures children are computed before parents.",
        codeHighlightLines: [5, 6, 7, 8, 9, 10],
        structures: [
          { type: "tree", label: "tree", nodes: [{ value: -10 }, { value: 9, highlight: "checked" }, { value: 20 }, null, null, { value: 15, highlight: "active" }, { value: 7, highlight: "active" }] },
          { type: "variables", entries: [{ name: "node 15", value: "gain = 15", highlight: true }, { name: "node 7", value: "gain = 7" }, { name: "result", value: 15 }] },
        ],
      },
      {
        description:
          "Node 20: left gain = max(15, 0) = 15. right gain = max(7, 0) = 7. Path THROUGH 20: 15 + 20 + 7 = 42. This path is 15→20→7 — it forks through node 20. Update result = max(15, 42) = 42! Gain offered to parent: 20 + max(15, 7) = 35. We can only send ONE branch upward (the better one, through 15), because a path can't fork twice.",
        codeHighlightLines: [7, 8, 9, 10],
        structures: [
          { type: "tree", label: "tree", nodes: [{ value: -10 }, { value: 9 }, { value: 20, highlight: "active" }, null, null, { value: 15, highlight: "success" }, { value: 7, highlight: "success" }] },
          { type: "variables", entries: [{ name: "path through 20", value: "15 + 20 + 7 = 42", highlight: true }, { name: "gain to parent", value: "20 + max(15,7) = 35" }, { name: "result", value: 42, highlight: true }] },
        ],
      },
      {
        description:
          "Node -10 (root): left gain = max(9, 0) = 9. right gain = max(35, 0) = 35. Path through -10: 9 + (-10) + 35 = 34 < 42. Not an improvement — the negative root hurts more than the gains. result stays 42. The best path (15→20→7) doesn't even include the root! This is why we track a global result — the answer can be any subtree's path.",
        codeHighlightLines: [9, 12, 13],
        structures: [
          { type: "tree", label: "tree", nodes: [{ value: -10, highlight: "checked" }, { value: 9, highlight: "checked" }, { value: 20, highlight: "success" }, null, null, { value: 15, highlight: "success" }, { value: 7, highlight: "success" }] },
          { type: "variables", entries: [{ name: "path through root", value: "9 + (-10) + 35 = 34 < 42" }, { name: "best path", value: "15 → 20 → 7 = 42", highlight: true }, { name: "return", value: 42, highlight: true }, { name: "Time", value: "O(n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

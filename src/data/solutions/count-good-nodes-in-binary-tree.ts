import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "DFS with Max Tracking",
  timeComplexity: "O(n)",
  spaceComplexity: "O(H)",
  code: `def good_nodes(root):
    def dfs(node, max_so_far):
        if not node:
            return 0
        good = 1 if node.val >= max_so_far else 0
        new_max = max(max_so_far, node.val)
        good += dfs(node.left, new_max)
        good += dfs(node.right, new_max)
        return good
    return dfs(root, root.val)`,
  steps: [
    {
      description:
        "A node is 'good' if no node on the path from root to it has a greater value. DFS while tracking the maximum value seen so far on the current path. If node.val >= max_so_far, it's good. Tree: [3, 1, 4, 3, null, 1, 5].",
      codeHighlightLines: [1, 2, 10],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3 }, { value: 1 }, { value: 4 }, { value: 3 }, null, { value: 1 }, { value: 5 }] },
        { type: "variables", entries: [{ name: "root", value: "3 (always good — no ancestors)" }, { name: "max_so_far", value: 3 }] },
      ],
    },
    {
      description:
        "Root node 3: 3 >= max_so_far(3) ✓ — good! (Root is always good since it has no ancestors.) Go left to node 1: max_so_far=3. Is 1 >= 3? NO — not good. A larger value (3) exists above it on the path.",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3, highlight: "success" }, { value: 1, highlight: "found" }, { value: 4 }, { value: 3 }, null, { value: 1 }, { value: 5 }] },
        { type: "variables", entries: [{ name: "node 3", value: "3≥3 → good ✓", highlight: true }, { name: "node 1", value: "1<3 → NOT good" }, { name: "max on path", value: "still 3" }] },
      ],
    },
    {
      description:
        "From node 1, go left to node 3: max_so_far=3 (unchanged since 1 < 3). Is 3 >= 3? YES — good! Even though its parent (1) is smaller, the max on the path from root is 3, and this node equals it. Left subtree total: 1 good node (the leaf 3).",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3, highlight: "success" }, { value: 1, highlight: "found" }, { value: 4 }, { value: 3, highlight: "success" }, null, { value: 1 }, { value: 5 }] },
        { type: "variables", entries: [{ name: "node 3 (leaf)", value: "3≥3 → good ✓", highlight: true }, { name: "path", value: "root(3)→1→3" }, { name: "left subtree good", value: "1 (the leaf 3)" }] },
      ],
    },
    {
      description:
        "Now right subtree. Node 4: max_so_far=3. Is 4 >= 3? YES — good! Update max to 4. Node 4's left child (1): is 1 >= 4? NO. Node 4's right child (5): is 5 >= 4? YES — good! Right subtree: 2 good nodes (4 and 5).",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3, highlight: "success" }, { value: 1, highlight: "found" }, { value: 4, highlight: "success" }, { value: 3, highlight: "success" }, null, { value: 1, highlight: "found" }, { value: 5, highlight: "success" }] },
        { type: "variables", entries: [{ name: "node 4", value: "4≥3 → good ✓", highlight: true }, { name: "node 1", value: "1<4 → NOT good" }, { name: "node 5", value: "5≥4 → good ✓", highlight: true }] },
      ],
    },
    {
      description:
        "Total: root(1) + left subtree(1) + right subtree(2) = 4 good nodes. Good: 3 (root), 3 (leaf), 4, 5. Not good: 1, 1 (both have larger ancestors). Time: O(n) — visit each node once. Space: O(H) recursion depth.",
      codeHighlightLines: [9, 10],
      structures: [
        { type: "tree", label: "good nodes highlighted", nodes: [{ value: 3, highlight: "success" }, { value: 1, highlight: "found" }, { value: 4, highlight: "success" }, { value: 3, highlight: "success" }, null, { value: 1, highlight: "found" }, { value: 5, highlight: "success" }] },
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }, { name: "good", value: "3, 3, 4, 5" }, { name: "not good", value: "1, 1" }, { name: "Time", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;

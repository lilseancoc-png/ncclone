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
        "A node is 'good' if its value is >= every node on the path from root to it. We DFS and track the max value seen so far. If node.val >= max_so_far, it's good. Tree: [3, 1, 4, 3, null, 1, 5].",
      codeHighlightLines: [1, 2, 10],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3 }, { value: 1 }, { value: 4 }, { value: 3 }, null, { value: 1 }, { value: 5 }] },
        { type: "stack", label: "call stack", values: ["dfs(3, max=3)"], topHighlight: true },
        { type: "variables", entries: [{ name: "root", value: 3 }, { name: "max_so_far", value: 3 }] },
      ],
    },
    {
      description:
        "Node 3 (root): 3 >= 3 ✓ — it's good! Visit left child 1: 1 >= 3? NO — not good. Visit 1's left child 3: 3 >= 3 ✓ — good! (The max along path root→1→3 is 3, and node value is 3). Left subtree returns 1 good node (node 3).",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3, highlight: "success" }, { value: 1, highlight: "found" }, { value: 4 }, { value: 3, highlight: "success" }, null, { value: 1 }, { value: 5 }] },
        { type: "stack", label: "call stack", values: ["dfs(3, max=3)", "dfs(1, max=3)", "dfs(3, max=3)"], topHighlight: true },
        { type: "variables", entries: [{ name: "node=3", value: "3≥3 good ✓", highlight: true }, { name: "node=1", value: "1<3 not good" }, { name: "node=3", value: "3≥3 good ✓", highlight: true }] },
      ],
    },
    {
      description:
        "Visit right child 4: 4 >= 3 ✓ — good! Update max to 4. Visit 4's left child 1: 1 >= 4? NO. Visit 4's right child 5: 5 >= 4 ✓ — good! Right subtree has 2 good nodes (4 and 5).",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3, highlight: "success" }, { value: 1, highlight: "found" }, { value: 4, highlight: "success" }, { value: 3, highlight: "success" }, null, { value: 1, highlight: "found" }, { value: 5, highlight: "success" }] },
        { type: "stack", label: "call stack", values: ["dfs(3, max=3)", "dfs(4, max=4)"], topHighlight: true },
        { type: "variables", entries: [{ name: "node=4", value: "4≥3 good ✓", highlight: true }, { name: "node=1", value: "1<4 not good" }, { name: "node=5", value: "5≥4 good ✓", highlight: true }] },
      ],
    },
    {
      description:
        "Total good nodes: root(1) + left subtree(1) + right subtree(2) = 4. Good nodes are: 3 (root), 3 (left-left), 4, 5. Time: O(n) — visit every node once. Space: O(H) for recursion stack depth.",
      codeHighlightLines: [9, 10],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3, highlight: "success" }, { value: 1, highlight: "found" }, { value: 4, highlight: "success" }, { value: 3, highlight: "success" }, null, { value: 1, highlight: "found" }, { value: 5, highlight: "success" }] },
        { type: "variables", entries: [{ name: "good nodes", value: "3, 3, 4, 5", highlight: true }, { name: "return", value: 4, highlight: true }, { name: "not good", value: "1, 1" }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Bottom-Up DFS",
  timeComplexity: "O(n)",
  spaceComplexity: "O(h)",
  code: `def is_balanced(root):
    def check(node):
        if not node:
            return 0
        left = check(node.left)
        right = check(node.right)
        if left == -1 or right == -1:
            return -1
        if abs(left - right) > 1:
            return -1
        return 1 + max(left, right)
    return check(root) != -1`,
  steps: [
    {
      description:
        "A binary tree is balanced if for EVERY node, the heights of its left and right subtrees differ by at most 1. The naive approach computes height separately for each node — O(n²). The optimal approach: bottom-up DFS that computes height AND checks balance in one pass. We return -1 as a sentinel for 'unbalanced' — once detected, it propagates up immediately. Tree: [3, 9, 20, null, null, 15, 7].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3 }, { value: 9 }, { value: 20 }, null, null, { value: 15 }, { value: 7 }] },
        { type: "variables", entries: [{ name: "balanced?", value: "check every node" }, { name: "-1 means", value: "unbalanced subtree" }] },
      ],
    },
    {
      description:
        "check(9): Node 9 is a leaf — both children are null, returning height 0. left=0, right=0. |0-0|=0 ≤ 1 → balanced. Return height = 1+max(0,0) = 1. A single node has height 1 and is always balanced.",
      codeHighlightLines: [3, 4, 5, 6, 9, 10, 11],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3 }, { value: 9, highlight: "active" }, { value: 20 }, null, null, { value: 15 }, { value: 7 }] },
        { type: "variables", entries: [{ name: "node 9", value: "leaf" }, { name: "left", value: 0 }, { name: "right", value: 0 }, { name: "|0-0| ≤ 1?", value: "yes ✓" }, { name: "return height", value: 1, highlight: true }] },
      ],
    },
    {
      description:
        "check(15): leaf, returns 1. check(7): leaf, returns 1. check(20): left=1 (from 15), right=1 (from 7). |1-1|=0 ≤ 1 → balanced. Return height = 1+max(1,1) = 2. The subtree rooted at 20 is perfectly balanced with equal-height children.",
      codeHighlightLines: [5, 6, 9, 10, 11],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3 }, { value: 9, highlight: "checked" }, { value: 20, highlight: "active" }, null, null, { value: 15, highlight: "checked" }, { value: 7, highlight: "checked" }] },
        { type: "variables", entries: [{ name: "node 20", value: "left=1, right=1" }, { name: "|1-1| ≤ 1?", value: "yes ✓" }, { name: "return height", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "check(3) (root): left=1 (from 9), right=2 (from 20). |1-2|=1 ≤ 1 → balanced! Return height = 1+max(1,2) = 3. Since check(root) ≠ -1, the tree IS balanced. If any subtree had returned -1, it would propagate all the way up without further checks — an early exit optimization. Time: O(n) — each node visited exactly once. Space: O(h) for the recursion stack.",
      codeHighlightLines: [5, 6, 9, 10, 11, 12],
      structures: [
        { type: "tree", label: "balanced tree ✓", nodes: [{ value: 3, highlight: "success" }, { value: 9, highlight: "success" }, { value: 20, highlight: "success" }, null, null, { value: 15, highlight: "success" }, { value: 7, highlight: "success" }] },
        { type: "variables", entries: [{ name: "root: |1-2|", value: "1 ≤ 1 ✓" }, { name: "return", value: true, highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(h)" }] },
      ],
    },
  ],
};

export default solution;

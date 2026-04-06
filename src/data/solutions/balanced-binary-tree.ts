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
        "A balanced tree has no node where left and right subtree heights differ by more than 1. We use bottom-up DFS: compute heights while checking balance. Return -1 as a signal for \"unbalanced\". Tree: [3, 9, 20, null, null, 15, 7] — this IS balanced.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3 }, { value: 9 }, { value: 20 }, null, null, { value: 15 }, { value: 7 }] },
      ],
    },
    {
      description:
        "check(9): no children → left=0, right=0. |0-0|=0 ≤ 1 → balanced. Return height = 1 + max(0,0) = 1.",
      codeHighlightLines: [5, 6, 9, 10, 11],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3 }, { value: 9, highlight: "active" }, { value: 20 }, null, null, { value: 15 }, { value: 7 }] },
        { type: "variables", entries: [{ name: "node", value: 9 }, { name: "left", value: 0 }, { name: "right", value: 0 }, { name: "height", value: 1, highlight: true }] },
      ],
    },
    {
      description:
        "check(15): height 1. check(7): height 1. check(20): left=1 (from 15), right=1 (from 7). |1-1|=0 ≤ 1 → balanced. Height = 1 + max(1,1) = 2.",
      codeHighlightLines: [5, 6, 9, 10, 11],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3 }, { value: 9 }, { value: 20, highlight: "active" }, null, null, { value: 15, highlight: "checked" }, { value: 7, highlight: "checked" }] },
        { type: "variables", entries: [{ name: "node", value: 20 }, { name: "left", value: 1 }, { name: "right", value: 1 }, { name: "height", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "check(3): left=1 (from 9), right=2 (from 20). |1-2|=1 ≤ 1 → still balanced! Height = 1 + max(1,2) = 3. Return check(root) != -1 → True. Time: O(n) — each node visited once. Space: O(h) recursion stack.",
      codeHighlightLines: [11, 12],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3, highlight: "success" }, { value: 9, highlight: "success" }, { value: 20, highlight: "success" }, null, null, { value: 15, highlight: "success" }, { value: 7, highlight: "success" }] },
        { type: "variables", entries: [{ name: "left", value: 1 }, { name: "right", value: 2 }, { name: "|left-right|", value: "1 ≤ 1 ✓" }, { name: "return", value: true, highlight: true }] },
      ],
    },
  ],
};

export default solution;

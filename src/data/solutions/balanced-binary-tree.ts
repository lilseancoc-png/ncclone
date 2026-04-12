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
        "A tree is balanced if for EVERY node, left and right subtree heights differ by at most 1. Bottom-up DFS computes height and checks balance in one pass. Return -1 as sentinel for 'unbalanced' — propagates up immediately. Tree: [3, 9, 20, null, null, 15, 7].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3 }, { value: 9 }, { value: 20 }, null, null, { value: 15 }, { value: 7 }] },
        { type: "variables", entries: [{ name: "balanced?", value: "check every node bottom-up" }, { name: "-1", value: "sentinel for unbalanced" }] },
      ],
    },
    {
      description:
        "Start DFS at leaves. check(9): both children null → left=0, right=0. |0-0|=0 ≤ 1 ✓ balanced. Return height 1+max(0,0) = 1. Single nodes are always balanced.",
      codeHighlightLines: [3, 4, 5, 6, 9, 10, 11],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3 }, { value: 9, highlight: "active" }, { value: 20 }, null, null, { value: 15 }, { value: 7 }] },
        { type: "variables", entries: [{ name: "check(9)", value: "leaf" }, { name: "left=0, right=0", value: "|0-0| ≤ 1 ✓" }, { name: "returns", value: "height 1", highlight: true }] },
      ],
    },
    {
      description:
        "check(15): leaf, returns height 1. check(7): leaf, returns height 1. check(20): left=1 (from 15), right=1 (from 7). |1-1|=0 ≤ 1 ✓ balanced. Return height 1+max(1,1) = 2. Subtree at 20 is perfectly balanced.",
      codeHighlightLines: [5, 6, 9, 10, 11],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3 }, { value: 9, highlight: "checked" }, { value: 20, highlight: "active" }, null, null, { value: 15, highlight: "checked" }, { value: 7, highlight: "checked" }] },
        { type: "variables", entries: [{ name: "check(20)", value: "left=1, right=1" }, { name: "|1-1| ≤ 1?", value: "yes ✓" }, { name: "returns", value: "height 2", highlight: true }] },
      ],
    },
    {
      description:
        "check(3) (root): left=1 (from node 9), right=2 (from node 20). |1-2|=1 ≤ 1 ✓ balanced! Return height 3. Since check(root) ≠ -1, tree IS balanced. If any node had returned -1, it would skip all further checks and propagate up instantly.",
      codeHighlightLines: [5, 6, 9, 10, 11, 12],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3, highlight: "active" }, { value: 9, highlight: "success" }, { value: 20, highlight: "success" }, null, null, { value: 15, highlight: "success" }, { value: 7, highlight: "success" }] },
        { type: "variables", entries: [{ name: "check(3)", value: "left=1, right=2" }, { name: "|1-2| ≤ 1?", value: "yes ✓", highlight: true }, { name: "returns", value: "height 3" }] },
      ],
    },
    {
      description:
        "Return True. Each node visited exactly once, computing height from bottom up. The -1 sentinel avoids O(n²) re-computation: once a subtree is unbalanced, we skip all remaining work. For an unbalanced tree like [1,2,null,3]: check(3)=1, check(2): left=1, right=0 → height 2, check(1): left=2, right=0 → |2-0|=2 > 1 → return -1. Time: O(n). Space: O(h).",
      codeHighlightLines: [12],
      structures: [
        { type: "tree", label: "balanced ✓", nodes: [{ value: 3, highlight: "success" }, { value: 9, highlight: "success" }, { value: 20, highlight: "success" }, null, null, { value: 15, highlight: "success" }, { value: 7, highlight: "success" }] },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(h)" }] },
      ],
    },
  ],
};

export default solution;

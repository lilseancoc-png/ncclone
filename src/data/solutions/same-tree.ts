import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Recursive (DFS)",
  timeComplexity: "O(n)",
  spaceComplexity: "O(h)",
  code: `def is_same_tree(p, q):
    if not p and not q:
        return True
    if not p or not q:
        return False
    if p.val != q.val:
        return False
    return (is_same_tree(p.left, q.left) and
            is_same_tree(p.right, q.right))`,
  steps: [
    {
      description:
        "Check if two binary trees are identical. Two trees are the same if they have the same structure and same node values. We compare recursively: check the current nodes, then check left and right subtrees. Tree p: [1, 2, 3], Tree q: [1, 2, 3].",
      codeHighlightLines: [1],
      structures: [
        { type: "array", label: "tree p", values: [1, 2, 3] },
        { type: "array", label: "tree q", values: [1, 2, 3] },
      ],
    },
    {
      description:
        "Both p and q exist. p.val=1 == q.val=1. Roots match! Now recursively check: are p.left and q.left the same? Are p.right and q.right the same?",
      codeHighlightLines: [2, 3, 4, 5, 6, 7],
      structures: [
        { type: "array", label: "tree p", values: [1, 2, 3], highlights: { 0: "success" } },
        { type: "array", label: "tree q", values: [1, 2, 3], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "p.val == q.val", value: "1 == 1 ✓", highlight: true }] },
      ],
    },
    {
      description:
        "Check left subtrees: p.left=2, q.left=2. Both exist and values match. They're leaves (no children), so both recursive calls on their children return True (both None).",
      codeHighlightLines: [8],
      structures: [
        { type: "array", label: "tree p", values: [1, 2, 3], highlights: { 0: "success", 1: "success" } },
        { type: "array", label: "tree q", values: [1, 2, 3], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "p.left == q.left", value: "2 == 2 ✓", highlight: true }] },
      ],
    },
    {
      description:
        "Check right subtrees: p.right=3, q.right=3. Values match, both are leaves. All comparisons passed!",
      codeHighlightLines: [9],
      structures: [
        { type: "array", label: "tree p", values: [1, 2, 3], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "tree q", values: [1, 2, 3], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "p.right == q.right", value: "3 == 3 ✓", highlight: true }] },
      ],
    },
    {
      description:
        "Return True — the trees are identical. Time: O(n) — we visit each node pair once. Space: O(h) for the recursion stack. If any node pair had different values or different structure, we'd immediately return False.",
      codeHighlightLines: [8, 9],
      structures: [
        { type: "array", label: "tree p", values: [1, 2, 3], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "tree q", values: [1, 2, 3], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
      ],
    },
  ],
};

export default solution;

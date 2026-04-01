import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Recursive DFS",
  timeComplexity: "O(m × n)",
  spaceComplexity: "O(m + n)",
  code: `def is_subtree(root, sub_root):
    if not root:
        return False
    if is_same(root, sub_root):
        return True
    return is_subtree(root.left, sub_root) or is_subtree(root.right, sub_root)

def is_same(p, q):
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return is_same(p.left, q.left) and is_same(p.right, q.right)`,
  steps: [
    {
      description:
        "Check if subRoot is a subtree of root. For every node in root, check if the subtree starting there matches subRoot exactly. root=[3,4,5,1,2], subRoot=[4,1,2].",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        { type: "array", label: "root tree", values: [3, 4, 5, 1, 2] },
        { type: "array", label: "subRoot", values: [4, 1, 2] },
      ],
    },
    {
      description:
        "At root node 3: is_same(3, 4)? No (3 != 4). Try left child: is_subtree(4, subRoot).",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "array", label: "root tree", values: [3, 4, 5, 1, 2], highlights: { 0: "checked" } },
        { type: "variables", entries: [{ name: "is_same(3, 4)", value: "false — vals differ" }] },
      ],
    },
    {
      description:
        "At node 4: is_same(4, 4)? Yes! Check children: is_same(1,1)=true, is_same(2,2)=true. The entire subtree matches!",
      codeHighlightLines: [8, 9, 10, 11, 12, 13],
      structures: [
        { type: "array", label: "root tree", values: [3, 4, 5, 1, 2], highlights: { 1: "success", 3: "success", 4: "success" } },
        { type: "array", label: "subRoot", values: [4, 1, 2], highlights: { 0: "success", 1: "success", 2: "success" } },
      ],
    },
    {
      description:
        "Return True — subRoot [4,1,2] is a subtree of root. Time: O(m×n) worst case — for each of n nodes, compare up to m nodes. Space: O(m+n) for recursion stacks.",
      codeHighlightLines: [5],
      structures: [
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
      ],
    },
  ],
};

export default solution;

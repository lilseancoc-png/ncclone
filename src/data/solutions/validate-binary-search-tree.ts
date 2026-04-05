import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Recursive with Range",
  timeComplexity: "O(n)",
  spaceComplexity: "O(h)",
  code: `def is_valid_bst(root):
    def validate(node, low, high):
        if not node:
            return True
        if node.val <= low or node.val >= high:
            return False
        return (validate(node.left, low, node.val) and
                validate(node.right, node.val, high))
    return validate(root, float('-inf'), float('inf'))`,
  steps: [
    {
      description:
        "Validate a BST: every node's value must be within a valid range. The trick is NOT just checking parent-child — a node must be less than ALL ancestors on its right path, and greater than ALL on its left path. We pass allowed (low, high) bounds down. Tree: [5, 1, 7, null, null, 4, 8].",
      codeHighlightLines: [1, 2, 9],
      structures: [
        { type: "tree", label: "tree", root: { value: 5, left: { value: 1 }, right: { value: 7, left: { value: 4 }, right: { value: 8 } } } },
        { type: "variables", entries: [{ name: "root", value: 5 }, { name: "range", value: "(-∞, +∞)" }] },
      ],
    },
    {
      description:
        "validate(5, -∞, +∞): -∞ < 5 < +∞ ✓. Now check left subtree with range (-∞, 5) and right subtree with range (5, +∞). The current node's value becomes a new bound for its children.",
      codeHighlightLines: [3, 4, 5, 6, 7, 8],
      structures: [
        { type: "tree", label: "tree", root: { value: 5, highlight: "success", left: { value: 1 }, right: { value: 7, left: { value: 4 }, right: { value: 8 } } } },
        { type: "variables", entries: [{ name: "node=5", value: "-∞ < 5 < +∞ ✓", highlight: true }, { name: "left range", value: "(-∞, 5)" }, { name: "right range", value: "(5, +∞)" }] },
      ],
    },
    {
      description:
        "validate(1, -∞, 5): -∞ < 1 < 5 ✓. Node 1 is a leaf. Now check right subtree: validate(7, 5, +∞): 5 < 7 < +∞ ✓. Check 7's children with narrowed ranges.",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "tree", label: "tree", root: { value: 5, highlight: "success", left: { value: 1, highlight: "success" }, right: { value: 7, highlight: "success", left: { value: 4 }, right: { value: 8 } } } },
        { type: "variables", entries: [{ name: "node=1", value: "-∞ < 1 < 5 ✓" }, { name: "node=7", value: "5 < 7 < +∞ ✓", highlight: true }] },
      ],
    },
    {
      description:
        "validate(4, 5, 7): Is 5 < 4? NO! 4 is not greater than 5. Node 4 is 7's left child, but it violates the BST property — it should be > 5 (the root) since it's in the right subtree. This is why checking just parent-child isn't enough!",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "tree", label: "tree", root: { value: 5, highlight: "success", left: { value: 1, highlight: "success" }, right: { value: 7, highlight: "success", left: { value: 4, highlight: "found" }, right: { value: 8 } } } },
        { type: "variables", entries: [{ name: "node=4", value: "4 ≤ 5 FAIL!", highlight: true }, { name: "required range", value: "(5, 7)" }] },
      ],
    },
    {
      description:
        "Return False — the tree is NOT a valid BST. Node 4 violates the constraint that all nodes in the right subtree of 5 must be > 5. Time: O(n) — visit each node once. Space: O(h) for recursion. This range-checking approach catches violations that simple parent-child checks would miss.",
      codeHighlightLines: [6],
      structures: [
        { type: "tree", label: "tree", root: { value: 5, left: { value: 1 }, right: { value: 7, left: { value: 4, highlight: "found" }, right: { value: 8 } } } },
        { type: "variables", entries: [{ name: "return", value: false, highlight: true }] },
      ],
    },
  ],
};

export default solution;

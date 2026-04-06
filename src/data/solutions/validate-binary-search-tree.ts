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
        "Validate a BST: every node must be within a valid range. We pass (low, high) bounds down. Tree: [5, 1, 7, null, null, 4, 8] — is this a valid BST?",
      codeHighlightLines: [1, 2, 9],
      structures: [
        {
          type: "tree",
          label: "input tree",
          nodes: [
            { value: 5, label: "root" },
            { value: 1 },
            { value: 7 },
            null,
            null,
            { value: 4 },
            { value: 8 },
          ],
        },
        { type: "variables", entries: [{ name: "range", value: "(-∞, +∞)" }] },
      ],
    },
    {
      description:
        "validate(5, -∞, +∞): -∞ < 5 < +∞ ✓. Left subtree gets range (-∞, 5), right gets (5, +∞).",
      codeHighlightLines: [3, 4, 5, 6, 7, 8],
      structures: [
        {
          type: "tree",
          label: "checking ranges",
          nodes: [
            { value: 5, highlight: "success", label: "(-∞,+∞) ✓" },
            { value: 1 },
            { value: 7 },
            null,
            null,
            { value: 4 },
            { value: 8 },
          ],
        },
      ],
    },
    {
      description:
        "validate(1, -∞, 5): -∞ < 1 < 5 ✓. Node 1 is a leaf. validate(7, 5, +∞): 5 < 7 < +∞ ✓. Now check 7's children.",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        {
          type: "tree",
          label: "checking ranges",
          nodes: [
            { value: 5, highlight: "success" },
            { value: 1, highlight: "success", label: "(-∞,5) ✓" },
            { value: 7, highlight: "success", label: "(5,+∞) ✓" },
            null,
            null,
            { value: 4 },
            { value: 8 },
          ],
        },
      ],
    },
    {
      description:
        "validate(4, 5, 7): Is 5 < 4? NO! 4 ≤ 5 — FAIL. Node 4 is in the right subtree of 5, so it must be > 5. This is why checking just parent-child isn't enough!",
      codeHighlightLines: [5, 6],
      structures: [
        {
          type: "tree",
          label: "violation found!",
          nodes: [
            { value: 5, highlight: "success" },
            { value: 1, highlight: "success" },
            { value: 7, highlight: "success" },
            null,
            null,
            { value: 4, highlight: "found", label: "4≤5 FAIL" },
            { value: 8 },
          ],
        },
        { type: "variables", entries: [{ name: "required range", value: "(5, 7)" }, { name: "4 ≤ 5", value: "INVALID!", highlight: true }] },
      ],
    },
    {
      description:
        "Return False — not a valid BST. Time: O(n). Space: O(h). The range-checking approach catches violations that simple parent-child checks would miss.",
      codeHighlightLines: [6],
      structures: [
        {
          type: "tree",
          label: "invalid BST",
          nodes: [
            { value: 5, highlight: "checked" },
            { value: 1, highlight: "checked" },
            { value: 7, highlight: "checked" },
            null,
            null,
            { value: 4, highlight: "found" },
            { value: 8, highlight: "checked" },
          ],
        },
        { type: "variables", entries: [{ name: "return", value: false, highlight: true }] },
      ],
    },
  ],
};

export default solution;

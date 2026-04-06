import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Recursive with Hash Map",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: `def buildTree(preorder, inorder):
    inorder_map = {val: i for i, val in enumerate(inorder)}
    pre_idx = [0]

    def build(lo, hi):
        if lo > hi:
            return None
        root_val = preorder[pre_idx[0]]
        pre_idx[0] += 1
        root = TreeNode(root_val)
        mid = inorder_map[root_val]
        root.left = build(lo, mid - 1)
        root.right = build(mid + 1, hi)
        return root

    return build(0, len(inorder) - 1)`,
    steps: [
      {
        description:
          "Reconstruct a binary tree from preorder and inorder traversals. Key insight: preorder's first element is the root. Find it in inorder — everything left is the left subtree, everything right is the right subtree. Use a hash map for O(1) inorder lookups.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "preorder",
            values: [3, 9, 20, 15, 7],
            highlights: {},
          },
          {
            type: "array",
            label: "inorder",
            values: [9, 3, 15, 20, 7],
            highlights: {},
          },
        ],
      },
      {
        description:
          "Root = preorder[0] = 3. In inorder, 3 is at index 1. Left subtree: inorder[0..0] = [9]. Right subtree: inorder[2..4] = [15, 20, 7].",
        codeHighlightLines: [7, 8, 9, 10, 11],
        structures: [
          {
            type: "array",
            label: "inorder",
            values: [9, 3, 15, 20, 7],
            highlights: { 1: "success", 0: "active" },
            pointers: [{ index: 1, label: "root=3" }],
          },
          {
            type: "variables",
            entries: [
              { name: "root", value: 3, highlight: true },
              { name: "left subtree", value: "[9]" },
              { name: "right subtree", value: "[15, 20, 7]" },
            ],
          },
        ],
      },
      {
        description:
          "Build left: next preorder = 9. In inorder[0..0], 9 is at index 0. No left/right children. Build right: next preorder = 20. In inorder[2..4], 20 at index 3. Left = [15], right = [7].",
        codeHighlightLines: [12, 13],
        structures: [
          {
            type: "array",
            label: "preorder",
            values: [3, 9, 20, 15, 7],
            highlights: { 0: "success", 1: "success", 2: "active" },
          },
          {
            type: "variables",
            entries: [
              { name: "tree", value: "3 → left:9, right:20" },
              { name: "20's children", value: "left:15, right:7", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Final tree: root=3, left=9, right=20(left=15, right=7). The hash map makes finding root positions O(1). We process preorder left-to-right, building left subtrees before right. Total: O(n) time.",
        codeHighlightLines: [14, 16],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "tree structure", value: "    3\n   / \\\n  9  20\n    / \\\n   15  7", highlight: true },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

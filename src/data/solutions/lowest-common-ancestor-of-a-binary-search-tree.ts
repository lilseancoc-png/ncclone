import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "BST Property — Iterative",
  timeComplexity: "O(h)",
  spaceComplexity: "O(1)",
  code: `def lowest_common_ancestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left  # both in left subtree
        elif p.val > root.val and q.val > root.val:
            root = root.right  # both in right subtree
        else:
            return root  # split point = LCA`,
  steps: [
    {
      description:
        "Find the Lowest Common Ancestor (LCA) of two nodes p and q in a Binary Search Tree. The LCA is the deepest node that is an ancestor of both p and q. In a BST, we can exploit the ordering property: all left descendants < node < all right descendants. This means: if both p and q are smaller than the current node, the LCA must be in the left subtree. If both are larger, it's in the right subtree. Otherwise, the current node is where they 'split' — that's our LCA! BST=[6,2,8,0,4,7,9], p=2, q=8.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "tree", label: "BST", nodes: [{ value: 6, highlight: "active" }, { value: 2 }, { value: 8 }, { value: 0 }, { value: 4 }, { value: 7 }, { value: 9 }] },
        { type: "variables", entries: [{ name: "p", value: 2 }, { name: "q", value: 8 }, { name: "root", value: 6 }] },
      ],
    },
    {
      description:
        "At root node 6: Is p=2 < 6 AND q=8 < 6? No — q=8 > 6. Is p=2 > 6 AND q=8 > 6? No — p=2 < 6. Since p and q are on different sides (p goes left, q goes right), node 6 is the split point — the LCA! This is the 'else' case in our code. No matter how deep we go, p=2 will always be in the left subtree of 6 and q=8 in the right subtree, so 6 is their deepest common ancestor.",
      codeHighlightLines: [3, 4, 5, 6, 7, 8],
      structures: [
        { type: "tree", label: "BST", nodes: [{ value: 6, highlight: "success" }, { value: 2, highlight: "active" }, { value: 8, highlight: "active" }, { value: 0 }, { value: 4 }, { value: 7 }, { value: 9 }] },
        { type: "variables", entries: [{ name: "p=2 < 6?", value: "yes → left" }, { name: "q=8 > 6?", value: "yes → right" }, { name: "split!", value: "LCA = 6", highlight: true }] },
      ],
    },
    {
      description:
        "Return node 6. Consider another example: p=2, q=4. At node 6: both 2 < 6 and 4 < 6 → go left to node 2. At node 2: p=2 == root, but q=4 > 2. They split here (or one equals root), so node 2 is the LCA. The LCA can be one of the target nodes itself — p=2 is an ancestor of q=4.",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "tree", label: "BST — example 2: p=2, q=4", nodes: [{ value: 6 }, { value: 2, highlight: "success" }, { value: 8 }, { value: 0 }, { value: 4, highlight: "active" }, { value: 7 }, { value: 9 }] },
        { type: "variables", entries: [{ name: "p=2, q=4", value: "LCA = node 2" }, { name: "why?", value: "2 is ancestor of 4" }] },
      ],
    },
    {
      description:
        "Time: O(h) where h is the height of the tree — we follow one path from root to the LCA, never branching. For a balanced BST, h = O(log n). For a skewed tree, h = O(n). Space: O(1) — iterative approach uses no extra memory beyond a pointer. The recursive version would use O(h) stack space. This elegant solution works because BST ordering guarantees that the split point is always the LCA.",
      codeHighlightLines: [8],
      structures: [
        { type: "tree", label: "BST", nodes: [{ value: 6, highlight: "success" }, { value: 2 }, { value: 8 }, { value: 0 }, { value: 4 }, { value: 7 }, { value: 9 }] },
        { type: "variables", entries: [{ name: "return", value: 6, highlight: true }, { name: "Time", value: "O(h) — height of tree" }, { name: "Space", value: "O(1) — iterative" }] },
      ],
    },
  ],
};

export default solution;

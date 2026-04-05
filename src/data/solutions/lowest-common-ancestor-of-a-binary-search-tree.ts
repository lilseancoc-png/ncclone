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
        "In a BST, the LCA is the first node where p and q split (one goes left, one goes right). If both < node, go left. Both > node, go right. Otherwise, found it! BST=[6,2,8,0,4,7,9], p=2, q=8.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "tree", label: "BST", root: { value: 6, left: { value: 2, left: { value: 0 }, right: { value: 4 } }, right: { value: 8, left: { value: 7 }, right: { value: 9 } } } },
        { type: "variables", entries: [{ name: "p", value: 2 }, { name: "q", value: 8 }, { name: "root", value: 6 }] },
      ],
    },
    {
      description:
        "At node 6: p=2 < 6, but q=8 > 6. They split! p goes left, q goes right. Node 6 is the LCA.",
      codeHighlightLines: [3, 4, 5, 6, 7, 8],
      structures: [
        { type: "tree", label: "BST", root: { value: 6, highlight: "success", left: { value: 2, highlight: "active", left: { value: 0 }, right: { value: 4 } }, right: { value: 8, highlight: "active", left: { value: 7 }, right: { value: 9 } } } },
        { type: "variables", entries: [{ name: "p=2 < 6", value: "go left?" }, { name: "q=8 > 6", value: "go right?" }, { name: "split!", value: "LCA = 6", highlight: true }] },
      ],
    },
    {
      description:
        "Return node 6. For p=2, q=4 (both < 6): go left to node 2. At 2: p=2 == root, q=4 > 2. Split → LCA = 2. The LCA can be one of the nodes itself.",
      codeHighlightLines: [8],
      structures: [
        { type: "tree", label: "BST", root: { value: 6, highlight: "success", left: { value: 2, left: { value: 0 }, right: { value: 4 } }, right: { value: 8, left: { value: 7 }, right: { value: 9 } } } },
        { type: "variables", entries: [{ name: "return", value: 6, highlight: true }, { name: "time", value: "O(h) — height of tree" }, { name: "space", value: "O(1) — iterative" }] },
      ],
    },
  ],
};

export default solution;

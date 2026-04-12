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
        "Find the Lowest Common Ancestor of p and q in a BST. Exploit BST ordering: left descendants < node < right descendants. If both p,q < node → LCA is left. Both > node → LCA is right. Otherwise they split here → current node is LCA. BST=[6,2,8,0,4,7,9,null,null,3,5], p=2, q=8.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "tree", label: "BST", nodes: [{ value: 6, highlight: "active" }, { value: 2 }, { value: 8 }, { value: 0 }, { value: 4 }, { value: 7 }, { value: 9 }] },
        { type: "variables", entries: [{ name: "p", value: 2 }, { name: "q", value: 8 }, { name: "start at root", value: 6 }] },
      ],
    },
    {
      description:
        "At root=6: Is p=2 < 6 AND q=8 < 6? No (q=8 > 6). Is p=2 > 6 AND q=8 > 6? No (p=2 < 6). They're on DIFFERENT sides — p goes left, q goes right. This is the split point! Node 6 is the LCA. Return 6.",
      codeHighlightLines: [3, 4, 5, 6, 7, 8],
      structures: [
        { type: "tree", label: "BST", nodes: [{ value: 6, highlight: "success" }, { value: 2, highlight: "active" }, { value: 8, highlight: "active" }, { value: 0 }, { value: 4 }, { value: 7 }, { value: 9 }] },
        { type: "variables", entries: [{ name: "p=2 < 6, q=8 > 6", value: "split! → LCA = 6", highlight: true }] },
      ],
    },
    {
      description:
        "Example 2: p=2, q=4 (both in left subtree). At root=6: both 2 < 6 and 4 < 6 → go left to node 2. At node 2: is p=2 < 2 AND q=4 < 2? No. Is p=2 > 2 AND q=4 > 2? No (p=2 == 2). Hit else case — node 2 is the LCA. When one target equals the current node, it IS an ancestor of the other.",
      codeHighlightLines: [3, 4, 7, 8],
      structures: [
        { type: "tree", label: "BST — p=2, q=4", nodes: [{ value: 6 }, { value: 2, highlight: "success" }, { value: 8 }, { value: 0 }, { value: 4, highlight: "active" }, { value: 7 }, { value: 9 }] },
        { type: "variables", entries: [{ name: "at 6: both < 6", value: "go left" }, { name: "at 2: p=2 == root", value: "split → LCA = 2", highlight: true }] },
      ],
    },
    {
      description:
        "Example 3: p=3, q=5. At 6: both < 6 → left. At 2: both > 2 → right. At 4: 3 < 4 but 5 > 4 → split! LCA = 4. We followed one path from root to the split point, never branching. The BST property guarantees the first split point IS the LCA.",
      codeHighlightLines: [3, 4, 5, 6, 7, 8],
      structures: [
        { type: "tree", label: "BST — p=3, q=5", nodes: [{ value: 6 }, { value: 2 }, { value: 8 }, { value: 0 }, { value: 4, highlight: "success" }, { value: 7 }, { value: 9 }] },
        { type: "variables", entries: [{ name: "6: both<6 → left", value: "" }, { name: "2: both>2 → right", value: "" }, { name: "4: 3<4, 5>4 → split", value: "LCA = 4", highlight: true }] },
      ],
    },
    {
      description:
        "Time: O(h) — follow one root-to-node path. For balanced BST, h=O(log n). Space: O(1) — just one pointer, no recursion. The algorithm is elegant: the BST ordering property means the LCA is always the first node where p and q diverge to different subtrees (or one of them equals the node). No need to search both subtrees like in a generic binary tree.",
      codeHighlightLines: [8],
      structures: [
        { type: "tree", label: "BST", nodes: [{ value: 6, highlight: "success" }, { value: 2 }, { value: 8 }, { value: 0 }, { value: 4 }, { value: 7 }, { value: 9 }] },
        { type: "variables", entries: [{ name: "return", value: "6 (for p=2, q=8)", highlight: true }, { name: "Time", value: "O(h)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

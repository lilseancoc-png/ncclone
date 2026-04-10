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
          "Reconstruct a binary tree from its preorder and inorder traversals. Key insight: preorder visits root FIRST, so preorder[0] is the root. Finding that root in inorder splits it into left subtree (everything left of root) and right subtree (everything right). A hash map makes the inorder lookup O(1). preorder=[3,9,20,15,7], inorder=[9,3,15,20,7].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "preorder (root, left, right)", values: [3, 9, 20, 15, 7] },
          { type: "array", label: "inorder (left, root, right)", values: [9, 3, 15, 20, 7] },
          { type: "hashmap", label: "inorder_map (val → index)", entries: [[9, 0], [3, 1], [15, 2], [20, 3], [7, 4]] },
        ],
      },
      {
        description:
          "build(0, 4): Root = preorder[0] = 3. Find 3 in inorder at index 1. Left subtree = inorder[0..0] = [9] (1 node). Right subtree = inorder[2..4] = [15,20,7] (3 nodes). The inorder split tells us exactly which nodes belong to each subtree. Advance pre_idx to 1.",
        codeHighlightLines: [5, 7, 8, 9, 10, 11],
        structures: [
          { type: "array", label: "inorder — split at root 3", values: [9, 3, 15, 20, 7], highlights: { 0: "active", 1: "success", 2: "checked", 3: "checked", 4: "checked" }, pointers: [{ index: 1, label: "root=3" }] },
          { type: "tree", label: "building...", nodes: [{ value: 3, highlight: "success" }, { value: "?" }, { value: "?" }] },
        ],
      },
      {
        description:
          "build(0, 0) — left subtree: Root = preorder[1] = 9. Find 9 in inorder at index 0. Left = inorder[0..-1] (empty), Right = inorder[1..0] (empty). Node 9 is a leaf! Return node(9). Advance pre_idx to 2. Preorder guarantees we process nodes in the right order: root first, then all left descendants, then right descendants.",
        codeHighlightLines: [7, 8, 9, 10, 11, 12, 13],
        structures: [
          { type: "array", label: "preorder", values: [3, 9, 20, 15, 7], highlights: { 0: "success", 1: "active" }, pointers: [{ index: 1, label: "pre_idx" }] },
          { type: "tree", label: "building...", nodes: [{ value: 3, highlight: "success" }, { value: 9, highlight: "success" }, { value: "?" }] },
        ],
      },
      {
        description:
          "build(2, 4) — right subtree: Root = preorder[2] = 20. Find 20 in inorder at index 3. Left = inorder[2..2] = [15], Right = inorder[4..4] = [7]. Recurse: build(2,2) creates leaf node(15). build(4,4) creates leaf node(7). The entire right subtree is built.",
        codeHighlightLines: [7, 8, 9, 10, 11, 12, 13],
        structures: [
          { type: "array", label: "inorder[2..4] — split at root 20", values: [15, 20, 7], highlights: { 0: "active", 1: "success", 2: "active" } },
          { type: "tree", label: "building...", nodes: [{ value: 3, highlight: "success" }, { value: 9, highlight: "success" }, { value: 20, highlight: "success" }, null, null, { value: 15, highlight: "active" }, { value: 7, highlight: "active" }] },
        ],
      },
      {
        description:
          "Final tree: 3(left=9, right=20(left=15, right=7)). Each recursive call consumed exactly one preorder element and narrowed the inorder range. The hash map avoided O(n) scans for each root lookup. Time: O(n) — each node processed once. Space: O(n) for the hash map and O(h) for recursion. This only works when values are unique (guaranteed by the problem).",
        codeHighlightLines: [16],
        structures: [
          { type: "tree", label: "reconstructed tree", nodes: [{ value: 3, highlight: "success" }, { value: 9, highlight: "success" }, { value: 20, highlight: "success" }, null, null, { value: 15, highlight: "success" }, { value: 7, highlight: "success" }] },
          { type: "variables", entries: [{ name: "return", value: "tree rooted at 3", highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

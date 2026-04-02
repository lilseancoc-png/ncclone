import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Iterative Inorder Traversal",
  timeComplexity: "O(H + k)",
  spaceComplexity: "O(H)",
  code: `def kth_smallest(root, k):
    stack = []
    curr = root
    count = 0
    while stack or curr:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        count += 1
        if count == k:
            return curr.val
        curr = curr.right`,
  steps: [
    {
      description:
        "Find the kth smallest element in a BST. Key insight: inorder traversal of a BST visits nodes in sorted (ascending) order. So the kth node visited in inorder is the kth smallest. We use an explicit stack to simulate the recursion. Tree: [3, 1, 4, null, 2], k=1.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "tree", values: [3, 1, 4, "—", 2] },
        { type: "stack", label: "stack", values: [] },
        { type: "variables", entries: [{ name: "k", value: 1 }, { name: "count", value: 0 }, { name: "curr", value: 3 }] },
      ],
    },
    {
      description:
        "Go as far left as possible: push 3, then 1 onto the stack (1 has no left child). This reaches the smallest element first. Now pop 1 from the stack — this is the first node in inorder. count becomes 1.",
      codeHighlightLines: [5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "tree", values: [3, 1, 4, "—", 2], highlights: { 1: "active" } },
        { type: "stack", label: "stack", values: ["3"], topHighlight: false },
        { type: "variables", entries: [{ name: "popped", value: 1, highlight: true }, { name: "count", value: 1, highlight: true }] },
      ],
    },
    {
      description:
        "Check: count (1) == k (1)? YES! Return curr.val = 1. The first node in inorder traversal is node 1 — the smallest element. We didn't need to traverse the entire tree, just H steps down + k pops.",
      codeHighlightLines: [10, 11],
      structures: [
        { type: "array", label: "tree", values: [3, 1, 4, "—", 2], highlights: { 1: "success" } },
        { type: "stack", label: "stack", values: ["3"] },
        { type: "variables", entries: [{ name: "count == k?", value: "1 == 1 ✓", highlight: true }, { name: "return", value: 1, highlight: true }] },
      ],
    },
    {
      description:
        "Return 1. Inorder traversal of this BST would visit: 1 → 2 → 3 → 4. The 1st smallest is 1. Time: O(H + k) — we go H steps deep, then pop k times. Space: O(H) for the stack holding at most H nodes (the height of the tree).",
      codeHighlightLines: [11],
      structures: [
        { type: "array", label: "inorder", values: [1, 2, 3, 4], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "kth smallest", value: 1, highlight: true }, { name: "time", value: "O(H + k)" }, { name: "space", value: "O(H)" }] },
      ],
    },
  ],
};

export default solution;

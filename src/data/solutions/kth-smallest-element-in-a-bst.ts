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
        "Find the kth smallest element in a Binary Search Tree. The fundamental BST property guarantees that inorder traversal (left → node → right) visits nodes in ascending sorted order. So the kth node visited in inorder is the kth smallest. Rather than collecting all values and sorting (O(n) space), we use an iterative approach with an explicit stack that can stop early after finding exactly k elements. This gives O(H+k) time — potentially much better than O(n) for small k. Tree: [3, 1, 4, null, 2], k=1.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "tree", label: "BST", nodes: [{ value: 3 }, { value: 1 }, { value: 4 }, null, { value: 2 }] },
        { type: "stack", label: "stack", values: [] },
        { type: "variables", entries: [{ name: "k", value: 1 }, { name: "count", value: 0 }, { name: "inorder visits", value: "1 → 2 → 3 → 4" }] },
      ],
    },
    {
      description:
        "The iterative inorder pattern: go as far left as possible (pushing nodes onto the stack), then pop to visit, then move right. Starting at root 3: push 3, go left to 1, push 1, go left — null, stop. The stack holds [3, 1]. Pop 1 — this is the first node visited in inorder (the smallest element in the BST). Increment count to 1. In a BST, the leftmost node is always the minimum.",
      codeHighlightLines: [5, 6, 7, 8, 9],
      structures: [
        { type: "tree", label: "BST", nodes: [{ value: 3 }, { value: 1, highlight: "active" }, { value: 4 }, null, { value: 2 }] },
        { type: "stack", label: "stack", values: ["3"], topHighlight: false },
        { type: "variables", entries: [{ name: "popped", value: 1, highlight: true }, { name: "count", value: 1 }, { name: "visited order", value: "[1]" }] },
      ],
    },
    {
      description:
        "Check: count (1) == k (1)? YES! Return curr.val = 1 immediately. We found the 1st smallest without visiting the entire tree — just went left twice (H=2 steps) and popped once (k=1). If k were 3, we'd continue: after visiting 1, move to its right child (2), visit 2 (count=2), then pop 3 from the stack (count=3), and return 3.",
      codeHighlightLines: [10, 11],
      structures: [
        { type: "tree", label: "BST", nodes: [{ value: 3 }, { value: 1, highlight: "success" }, { value: 4 }, null, { value: 2 }] },
        { type: "variables", entries: [{ name: "count == k?", value: "1 == 1 ✓", highlight: true }, { name: "return", value: 1, highlight: true }] },
      ],
    },
    {
      description:
        "Return 1. The full inorder sequence would be 1→2→3→4, but we stopped after just 1 visit. Time: O(H + k) where H is tree height — we descend H levels to reach the leftmost node, then pop k nodes. For a balanced BST, H = log n, so finding the smallest is O(log n). For k=n (finding the largest), it degrades to O(n). Space: O(H) for the stack — in the worst case (skewed tree), this is O(n), but for balanced trees it's O(log n).",
      codeHighlightLines: [11],
      structures: [
        { type: "array", label: "inorder traversal", values: [1, 2, 3, 4], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "kth smallest", value: 1, highlight: true }, { name: "Time", value: "O(H + k)" }, { name: "Space", value: "O(H)" }] },
      ],
    },
  ],
};

export default solution;

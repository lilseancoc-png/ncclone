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
        "Find kth smallest in a BST. Key property: inorder traversal (left→node→right) visits BST nodes in ascending order. Use iterative inorder with a stack — can stop early at the kth node without visiting all n nodes. Tree: [5, 3, 6, 2, 4, null, null, 1], k=3.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "tree", label: "BST", nodes: [{ value: 5 }, { value: 3 }, { value: 6 }, { value: 2 }, { value: 4 }, null, null, { value: 1 }] },
        { type: "stack", label: "stack", values: [] },
        { type: "variables", entries: [{ name: "k", value: 3 }, { name: "inorder", value: "1→2→3→4→5→6" }, { name: "count", value: 0 }] },
      ],
    },
    {
      description:
        "Go as far left as possible from root, pushing nodes onto stack: push 5, go left to 3, push 3, go left to 2, push 2, go left to 1, push 1, go left — null, stop. Stack = [5,3,2,1]. Pop 1: count=1. 1 is the smallest element (leftmost node). k=3, not done yet. Move right from 1: null.",
      codeHighlightLines: [5, 6, 7, 8, 9, 10],
      structures: [
        { type: "tree", label: "BST", nodes: [{ value: 5 }, { value: 3 }, { value: 6 }, { value: 2 }, { value: 4 }, null, null, { value: 1, highlight: "active" }] },
        { type: "stack", label: "stack", values: ["5", "3", "2"], topHighlight: true },
        { type: "variables", entries: [{ name: "popped 1", value: "count=1 (1st smallest)", highlight: true }, { name: "k=3?", value: "not yet" }] },
      ],
    },
    {
      description:
        "No right child from 1. Pop 2: count=2. 2 is the 2nd smallest. k=3, not done. Move right from 2: null. Pop 3: count=3. 3 is the 3rd smallest. count == k! Return 3.",
      codeHighlightLines: [8, 9, 10, 11, 12],
      structures: [
        { type: "tree", label: "BST", nodes: [{ value: 5 }, { value: 3, highlight: "success" }, { value: 6 }, { value: 2, highlight: "checked" }, { value: 4 }, null, null, { value: 1, highlight: "checked" }] },
        { type: "stack", label: "stack", values: ["5"], topHighlight: false },
        { type: "variables", entries: [{ name: "pop 2", value: "count=2" }, { name: "pop 3", value: "count=3 == k!", highlight: true }] },
      ],
    },
    {
      description:
        "Return 3 — the 3rd smallest element. We stopped after visiting only 3 nodes (1, 2, 3) out of 7. Never visited nodes 4, 5, or 6. This early termination is why time is O(H+k), not O(n). For k=1 (smallest), it's just O(H) to reach the leftmost node.",
      codeHighlightLines: [11],
      structures: [
        { type: "tree", label: "BST", nodes: [{ value: 5 }, { value: 3, highlight: "success" }, { value: 6 }, { value: 2, highlight: "checked" }, { value: 4 }, null, null, { value: 1, highlight: "checked" }] },
        { type: "variables", entries: [{ name: "return", value: 3, highlight: true }, { name: "visited only", value: "3 of 7 nodes" }, { name: "Time", value: "O(H + k)" }, { name: "Space", value: "O(H)" }] },
      ],
    },
    {
      description:
        "The iterative inorder pattern: (1) go left as far as possible (push to stack), (2) pop and visit, (3) move right. This visits nodes in sorted order for a BST. The stack holds the 'path back to unvisited ancestors'. For balanced BST with H=log n: finding the smallest takes O(log n), and each subsequent element costs O(1) amortized.",
      codeHighlightLines: [5, 6, 7, 8, 9, 12],
      structures: [
        { type: "array", label: "inorder (sorted)", values: [1, 2, 3, 4, 5, 6], highlights: { 0: "checked", 1: "checked", 2: "success" } },
        { type: "variables", entries: [{ name: "kth smallest = 3", value: "index k-1 in sorted order", highlight: true }, { name: "pattern", value: "go left → pop → go right" }, { name: "early exit", value: "stop at count == k" }] },
      ],
    },
  ],
};

export default solution;

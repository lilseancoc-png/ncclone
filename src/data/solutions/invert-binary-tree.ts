import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Recursive (DFS)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    code: `def invert_tree(root):
    if not root:
        return None
    root.left, root.right = root.right, root.left
    invert_tree(root.left)
    invert_tree(root.right)
    return root`,
    steps: [
      {
        description:
          "Invert a binary tree — swap every node's left and right children. The recursive approach is elegant: swap the current node's children, then recursively invert the left and right subtrees. Input tree: [4, 2, 7, 1, 3, 6, 9].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "tree",
            label: "input tree",
            nodes: [
              { value: 4, label: "root" },
              { value: 2 },
              { value: 7 },
              { value: 1 },
              { value: 3 },
              { value: 6 },
              { value: 9 },
            ],
          },
        ],
      },
      {
        description:
          "At root (4): swap left child (2) and right child (7). Now 7 is on the left and 2 is on the right. Then recurse into the new left subtree (rooted at 7).",
        codeHighlightLines: [4],
        structures: [
          {
            type: "tree",
            label: "after swap at root",
            nodes: [
              { value: 4, highlight: "active" },
              { value: 7, highlight: "swap" },
              { value: 2, highlight: "swap" },
              { value: 6 },
              { value: 9 },
              { value: 1 },
              { value: 3 },
            ],
          },
          { type: "variables", entries: [{ name: "swapped", value: "left=7, right=2", highlight: true }] },
        ],
      },
      {
        description:
          "At node 7: swap children 6 and 9. Now 9 is on the left, 6 on the right. Node 7's subtree is fully inverted (both children are leaves).",
        codeHighlightLines: [4, 5, 6],
        structures: [
          {
            type: "tree",
            label: "after swap at 7",
            nodes: [
              { value: 4, highlight: "success" },
              { value: 7, highlight: "active" },
              { value: 2 },
              { value: 9, highlight: "swap" },
              { value: 6, highlight: "swap" },
              { value: 1 },
              { value: 3 },
            ],
          },
        ],
      },
      {
        description:
          "At node 2: swap children 1 and 3. Now 3 is on the left, 1 on the right. Node 2's subtree is fully inverted.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          {
            type: "tree",
            label: "after swap at 2",
            nodes: [
              { value: 4, highlight: "success" },
              { value: 7, highlight: "success" },
              { value: 2, highlight: "active" },
              { value: 9, highlight: "success" },
              { value: 6, highlight: "success" },
              { value: 3, highlight: "swap" },
              { value: 1, highlight: "swap" },
            ],
          },
        ],
      },
      {
        description:
          "Done! The entire tree is inverted. Every left-right pair has been swapped at every level. Time: O(n) — visit each node once. Space: O(h) for the recursion stack.",
        codeHighlightLines: [7],
        structures: [
          {
            type: "tree",
            label: "inverted tree",
            nodes: [
              { value: 4, highlight: "success" },
              { value: 7, highlight: "success" },
              { value: 2, highlight: "success" },
              { value: 9, highlight: "success" },
              { value: 6, highlight: "success" },
              { value: 3, highlight: "success" },
              { value: 1, highlight: "success" },
            ],
          },
          { type: "variables", entries: [{ name: "return", value: "root (4)", highlight: true }] },
        ],
      },
    ],
  },
  {
    label: "Iterative (BFS)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: `from collections import deque

def invert_tree(root):
    if not root:
        return None
    queue = deque([root])
    while queue:
        node = queue.popleft()
        node.left, node.right = node.right, node.left
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return root`,
    steps: [
      {
        description:
          "The iterative approach uses BFS with a queue. Process each node: swap its children, then add the children to the queue. No recursion needed.",
        codeHighlightLines: [1, 3, 4, 5, 6],
        structures: [
          {
            type: "tree",
            label: "input tree",
            nodes: [
              { value: 4, label: "root" },
              { value: 2 },
              { value: 7 },
              { value: 1 },
              { value: 3 },
              { value: 6 },
              { value: 9 },
            ],
          },
          { type: "array", label: "queue", values: [4], highlights: { 0: "active" } },
        ],
      },
      {
        description:
          "Dequeue 4. Swap its children: left becomes 7, right becomes 2. Enqueue both children (7, 2).",
        codeHighlightLines: [7, 8, 9, 10, 11, 12, 13],
        structures: [
          {
            type: "tree",
            label: "after swap at root",
            nodes: [
              { value: 4, highlight: "success" },
              { value: 7, highlight: "swap" },
              { value: 2, highlight: "swap" },
              { value: 6 },
              { value: 9 },
              { value: 1 },
              { value: 3 },
            ],
          },
          { type: "array", label: "queue", values: [7, 2], highlights: { 0: "active", 1: "active" } },
        ],
      },
      {
        description:
          "Dequeue 7: swap → left=9, right=6. Dequeue 2: swap → left=3, right=1. Enqueue all leaf children.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "tree",
            label: "all swaps complete",
            nodes: [
              { value: 4, highlight: "success" },
              { value: 7, highlight: "success" },
              { value: 2, highlight: "success" },
              { value: 9, highlight: "swap" },
              { value: 6, highlight: "swap" },
              { value: 3, highlight: "swap" },
              { value: 1, highlight: "swap" },
            ],
          },
        ],
      },
      {
        description:
          "Process leaf nodes — they have no children to swap. Queue empties, loop ends. Return root. Time: O(n). Space: O(n) for the queue.",
        codeHighlightLines: [14],
        structures: [
          {
            type: "tree",
            label: "inverted tree",
            nodes: [
              { value: 4, highlight: "success" },
              { value: 7, highlight: "success" },
              { value: 2, highlight: "success" },
              { value: 9, highlight: "success" },
              { value: 6, highlight: "success" },
              { value: 3, highlight: "success" },
              { value: 1, highlight: "success" },
            ],
          },
          { type: "variables", entries: [{ name: "return", value: "root (4)", highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

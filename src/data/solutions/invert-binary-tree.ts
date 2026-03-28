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
          { type: "array", label: "tree (level order)", values: [4, 2, 7, 1, 3, 6, 9] },
          { type: "variables", entries: [{ name: "root", value: 4 }] },
        ],
      },
      {
        description:
          "At root (4): swap left child (2) and right child (7). Now 7 is on the left and 2 is on the right. Then recurse into the new left subtree (rooted at 7).",
        codeHighlightLines: [4],
        structures: [
          { type: "array", label: "tree after swap at 4", values: [4, 7, 2, 1, 3, 6, 9], highlights: { 1: "active", 2: "active" } },
          { type: "variables", entries: [{ name: "swapped", value: "left=7, right=2", highlight: true }] },
        ],
      },
      {
        description:
          "At node 7: swap children 6 and 9. Now 9 is on the left, 6 on the right. Node 7's subtree is fully inverted (both children are leaves).",
        codeHighlightLines: [4, 5, 6],
        structures: [
          { type: "array", label: "tree progress", values: [4, 7, 2, 9, 6, 1, 3], highlights: { 3: "active", 4: "active" } },
          { type: "variables", entries: [{ name: "node", value: 7 }, { name: "swapped", value: "left=9, right=6", highlight: true }] },
        ],
      },
      {
        description:
          "At node 2: swap children 1 and 3. Now 3 is on the left, 1 on the right. Node 2's subtree is fully inverted.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          { type: "array", label: "tree progress", values: [4, 7, 2, 9, 6, 3, 1], highlights: { 5: "active", 6: "active" } },
          { type: "variables", entries: [{ name: "node", value: 2 }, { name: "swapped", value: "left=3, right=1", highlight: true }] },
        ],
      },
      {
        description:
          "Done! The entire tree is inverted: [4, 7, 2, 9, 6, 3, 1]. Every left-right pair has been swapped at every level. Time: O(n) — visit each node once. Space: O(h) for the recursion stack, where h is the tree height (O(log n) for balanced, O(n) worst case for skewed).",
        codeHighlightLines: [7],
        structures: [
          { type: "array", label: "inverted tree", values: [4, 7, 2, 9, 6, 3, 1], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success" } },
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
          "The iterative approach uses BFS (level-order traversal) with a queue. Process each node: swap its children, then add the children to the queue. No recursion needed — avoids stack overflow on very deep trees.",
        codeHighlightLines: [1, 3, 4, 5, 6],
        structures: [
          { type: "array", label: "tree (level order)", values: [4, 2, 7, 1, 3, 6, 9] },
          { type: "array", label: "queue", values: [4], highlights: { 0: "active" } },
        ],
      },
      {
        description:
          "Dequeue 4. Swap its children: left becomes 7, right becomes 2. Enqueue both children (7, 2).",
        codeHighlightLines: [7, 8, 9, 10, 11, 12, 13],
        structures: [
          { type: "array", label: "tree after swap at 4", values: [4, 7, 2, 1, 3, 6, 9], highlights: { 0: "success", 1: "active", 2: "active" } },
          { type: "array", label: "queue", values: [7, 2], highlights: { 0: "active", 1: "active" } },
        ],
      },
      {
        description:
          "Dequeue 7. Swap its children: left becomes 9, right becomes 6. Enqueue 9 and 6. Then dequeue 2: swap children to left=3, right=1. Enqueue 3 and 1.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          { type: "array", label: "tree progress", values: [4, 7, 2, 9, 6, 3, 1], highlights: { 0: "success", 1: "success", 2: "success", 3: "active", 4: "active", 5: "active", 6: "active" } },
          { type: "array", label: "queue", values: [9, 6, 3, 1], highlights: { 0: "active", 1: "active", 2: "active", 3: "active" } },
        ],
      },
      {
        description:
          "Process leaf nodes 9, 6, 3, 1 — they have no children to swap. Queue empties, loop ends. Return root. Time: O(n). Space: O(n) for the queue (holds up to n/2 nodes at the widest level).",
        codeHighlightLines: [14],
        structures: [
          { type: "array", label: "inverted tree", values: [4, 7, 2, 9, 6, 3, 1], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success" } },
          { type: "variables", entries: [{ name: "return", value: "root (4)", highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

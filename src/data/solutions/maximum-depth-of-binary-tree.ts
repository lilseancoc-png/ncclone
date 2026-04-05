import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Recursive (DFS)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    code: `def max_depth(root):
    if not root:
        return 0
    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)
    return 1 + max(left_depth, right_depth)`,
    steps: [
      {
        description:
          "Find the maximum depth of a binary tree (longest root-to-leaf path). The recursive insight: depth of a node = 1 + max(depth of left subtree, depth of right subtree). Base case: empty node has depth 0. Tree: [3, 9, 20, null, null, 15, 7].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "tree",
            label: "tree",
            root: {
              value: 3,
              left: { value: 9 },
              right: {
                value: 20,
                left: { value: 15 },
                right: { value: 7 },
              },
            },
          },
          { type: "variables", entries: [{ name: "root", value: 3 }] },
        ],
      },
      {
        description:
          "Recurse left: max_depth(9). Node 9 has no children -> left_depth=0, right_depth=0. Return 1 + max(0,0) = 1.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          {
            type: "tree",
            label: "tree",
            root: {
              value: 3,
              left: { value: 9, highlight: "active" },
              right: {
                value: 20,
                left: { value: 15 },
                right: { value: 7 },
              },
            },
          },
          { type: "stack", label: "call stack", values: ["max_depth(3)", "max_depth(9)"], topHighlight: true },
          { type: "variables", entries: [{ name: "depth(9)", value: 1, highlight: true }] },
        ],
      },
      {
        description:
          "Recurse right: max_depth(20). Node 20 has children 15 and 7. Recurse into 15: no children -> returns 1. Recurse into 7: no children -> returns 1. depth(20) = 1 + max(1, 1) = 2.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          {
            type: "tree",
            label: "tree",
            root: {
              value: 3,
              left: { value: 9 },
              right: {
                value: 20,
                highlight: "active",
                left: { value: 15, highlight: "checked" },
                right: { value: 7, highlight: "checked" },
              },
            },
          },
          { type: "stack", label: "call stack", values: ["max_depth(3)", "max_depth(20)"], topHighlight: true },
          { type: "variables", entries: [{ name: "depth(15)", value: 1 }, { name: "depth(7)", value: 1 }, { name: "depth(20)", value: 2, highlight: true }] },
        ],
      },
      {
        description:
          "Back at root (3): left_depth=1 (from node 9), right_depth=2 (from node 20). Return 1 + max(1, 2) = 3. The longest path is root->20->15 (or root->20->7), which has 3 nodes. Time: O(n) -- visit every node. Space: O(h) for recursion stack.",
        codeHighlightLines: [6],
        structures: [
          {
            type: "tree",
            label: "tree",
            root: {
              value: 3,
              highlight: "success",
              left: { value: 9, highlight: "success" },
              right: {
                value: 20,
                highlight: "success",
                left: { value: 15, highlight: "success" },
                right: { value: 7, highlight: "success" },
              },
            },
          },
          { type: "variables", entries: [{ name: "left_depth", value: 1 }, { name: "right_depth", value: 2 }, { name: "return", value: 3, highlight: true }] },
        ],
      },
    ],
  },
  {
    label: "Iterative (BFS)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: `from collections import deque

def max_depth(root):
    if not root:
        return 0
    queue = deque([root])
    depth = 0
    while queue:
        depth += 1
        for _ in range(len(queue)):
            node = queue.popleft()
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return depth`,
    steps: [
      {
        description:
          "The BFS approach: process the tree level by level. Each time we finish a full level, increment depth. When the queue empties, depth equals the maximum depth. This is intuitive -- just count the levels!",
        codeHighlightLines: [1, 3, 4, 5, 6, 7],
        structures: [
          {
            type: "tree",
            label: "tree",
            root: {
              value: 3,
              left: { value: 9 },
              right: {
                value: 20,
                left: { value: 15 },
                right: { value: 7 },
              },
            },
          },
          { type: "array", label: "queue", values: [3], highlights: { 0: "active" } },
          { type: "variables", entries: [{ name: "depth", value: 0 }] },
        ],
      },
      {
        description:
          "Level 1: process node 3. Enqueue children 9 and 20. depth = 1.",
        codeHighlightLines: [8, 9, 10, 11, 12, 13, 14, 15],
        structures: [
          {
            type: "tree",
            label: "tree",
            root: {
              value: 3,
              highlight: "success",
              left: { value: 9 },
              right: {
                value: 20,
                left: { value: 15 },
                right: { value: 7 },
              },
            },
          },
          { type: "array", label: "queue (level 2)", values: [9, 20], highlights: { 0: "active", 1: "active" } },
          { type: "variables", entries: [{ name: "depth", value: 1, highlight: true }] },
        ],
      },
      {
        description:
          "Level 2: process nodes 9 (no children) and 20 (children 15, 7). Enqueue 15 and 7. depth = 2.",
        codeHighlightLines: [8, 9, 10, 11],
        structures: [
          {
            type: "tree",
            label: "tree",
            root: {
              value: 3,
              highlight: "success",
              left: { value: 9, highlight: "success" },
              right: {
                value: 20,
                highlight: "success",
                left: { value: 15 },
                right: { value: 7 },
              },
            },
          },
          { type: "array", label: "queue (level 3)", values: [15, 7], highlights: { 0: "active", 1: "active" } },
          { type: "variables", entries: [{ name: "depth", value: 2, highlight: true }] },
        ],
      },
      {
        description:
          "Level 3: process 15 and 7 (both leaves, no children). Queue empties. depth = 3. Return 3. Time: O(n) -- visit every node. Space: O(n) -- queue holds up to n/2 nodes at the widest level.",
        codeHighlightLines: [16],
        structures: [
          {
            type: "tree",
            label: "tree",
            root: {
              value: 3,
              highlight: "success",
              left: { value: 9, highlight: "success" },
              right: {
                value: 20,
                highlight: "success",
                left: { value: 15, highlight: "success" },
                right: { value: 7, highlight: "success" },
              },
            },
          },
          { type: "variables", entries: [{ name: "return depth", value: 3, highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

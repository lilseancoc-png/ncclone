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
          "Find the maximum depth of a binary tree. Recursive insight: depth = 1 + max(left depth, right depth). Base case: empty node → 0. Tree: [3, 9, 20, null, null, 15, 7].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "tree",
            label: "input tree",
            nodes: [
              { value: 3, label: "root" },
              { value: 9 },
              { value: 20 },
              null,
              null,
              { value: 15 },
              { value: 7 },
            ],
          },
        ],
      },
      {
        description:
          "Recurse left: max_depth(9). Node 9 has no children → left=0, right=0. Return 1 + max(0,0) = 1.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          {
            type: "tree",
            label: "tree",
            nodes: [
              { value: 3 },
              { value: 9, highlight: "active", label: "depth=1" },
              { value: 20 },
              null,
              null,
              { value: 15 },
              { value: 7 },
            ],
          },
          { type: "stack", label: "call stack", values: ["max_depth(3)", "max_depth(9)"], topHighlight: true },
        ],
      },
      {
        description:
          "Recurse right: max_depth(20). Children 15 and 7 are leaves → each returns 1. depth(20) = 1 + max(1, 1) = 2.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          {
            type: "tree",
            label: "tree",
            nodes: [
              { value: 3 },
              { value: 9, highlight: "checked" },
              { value: 20, highlight: "active", label: "depth=2" },
              null,
              null,
              { value: 15, highlight: "checked" },
              { value: 7, highlight: "checked" },
            ],
          },
          { type: "variables", entries: [{ name: "depth(15)", value: 1 }, { name: "depth(7)", value: 1 }, { name: "depth(20)", value: 2, highlight: true }] },
        ],
      },
      {
        description:
          "Back at root (3): left=1, right=2. Return 1 + max(1, 2) = 3. The longest path is root→20→15 (or root→20→7). Time: O(n). Space: O(h).",
        codeHighlightLines: [6],
        structures: [
          {
            type: "tree",
            label: "tree — max depth = 3",
            nodes: [
              { value: 3, highlight: "success", label: "depth=3" },
              { value: 9, highlight: "success" },
              { value: 20, highlight: "success" },
              null,
              null,
              { value: 15, highlight: "success" },
              { value: 7, highlight: "success" },
            ],
          },
          { type: "variables", entries: [{ name: "return", value: 3, highlight: true }] },
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
          "BFS approach: process level by level. Each complete level increments depth. When queue empties, depth is the answer.",
        codeHighlightLines: [1, 3, 4, 5, 6, 7],
        structures: [
          {
            type: "tree",
            label: "input tree",
            nodes: [
              { value: 3, highlight: "active" },
              { value: 9 },
              { value: 20 },
              null,
              null,
              { value: 15 },
              { value: 7 },
            ],
          },
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
            label: "level 1 done",
            nodes: [
              { value: 3, highlight: "success" },
              { value: 9, highlight: "active" },
              { value: 20, highlight: "active" },
              null,
              null,
              { value: 15 },
              { value: 7 },
            ],
          },
          { type: "variables", entries: [{ name: "depth", value: 1, highlight: true }] },
        ],
      },
      {
        description:
          "Level 2: process 9 (no children) and 20 (children 15, 7). Enqueue 15, 7. depth = 2.",
        codeHighlightLines: [8, 9, 10, 11],
        structures: [
          {
            type: "tree",
            label: "level 2 done",
            nodes: [
              { value: 3, highlight: "success" },
              { value: 9, highlight: "success" },
              { value: 20, highlight: "success" },
              null,
              null,
              { value: 15, highlight: "active" },
              { value: 7, highlight: "active" },
            ],
          },
          { type: "variables", entries: [{ name: "depth", value: 2, highlight: true }] },
        ],
      },
      {
        description:
          "Level 3: process 15 and 7 (leaves). Queue empties. depth = 3. Return 3.",
        codeHighlightLines: [16],
        structures: [
          {
            type: "tree",
            label: "all levels processed — depth = 3",
            nodes: [
              { value: 3, highlight: "success" },
              { value: 9, highlight: "success" },
              { value: 20, highlight: "success" },
              null,
              null,
              { value: 15, highlight: "success" },
              { value: 7, highlight: "success" },
            ],
          },
          { type: "variables", entries: [{ name: "return depth", value: 3, highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "BFS with Queue",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  code: `from collections import deque

def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result`,
  steps: [
    {
      description:
        "Return node values level by level. BFS naturally processes nodes in level order. The key: process exactly len(queue) nodes per iteration — that's one complete level. Tree: [3, 9, 20, null, null, 15, 7].",
      codeHighlightLines: [1, 3, 4, 5, 6, 7],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3 }, { value: 9 }, { value: 20 }, null, null, { value: 15 }, { value: 7 }] },
        { type: "array", label: "queue", values: [3], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "result", value: "[]" }] },
      ],
    },
    {
      description:
        "Level 1: queue has 1 node. Dequeue 3, add to level=[3]. Enqueue children 9 and 20. Append [3] to result.",
      codeHighlightLines: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3, highlight: "success" }, { value: 9 }, { value: 20 }, null, null, { value: 15 }, { value: 7 }] },
        { type: "array", label: "queue", values: [9, 20], highlights: { 0: "active", 1: "active" } },
        { type: "variables", entries: [{ name: "level", value: "[3]", highlight: true }, { name: "result", value: "[[3]]" }] },
      ],
    },
    {
      description:
        "Level 2: queue has 2 nodes. Dequeue 9 (no children) → level=[9]. Dequeue 20 (children 15, 7) → level=[9, 20]. Enqueue 15 and 7. Append [9, 20] to result.",
      codeHighlightLines: [8, 9, 10, 11],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3, highlight: "success" }, { value: 9, highlight: "success" }, { value: 20, highlight: "success" }, null, null, { value: 15 }, { value: 7 }] },
        { type: "array", label: "queue", values: [15, 7], highlights: { 0: "active", 1: "active" } },
        { type: "variables", entries: [{ name: "level", value: "[9, 20]", highlight: true }, { name: "result", value: "[[3], [9, 20]]" }] },
      ],
    },
    {
      description:
        "Level 3: queue has 2 nodes. Dequeue 15 and 7 (both leaves). level=[15, 7]. Queue empties. Append [15, 7] to result.",
      codeHighlightLines: [8, 9, 10, 11, 17],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 3, highlight: "success" }, { value: 9, highlight: "success" }, { value: 20, highlight: "success" }, null, null, { value: 15, highlight: "success" }, { value: 7, highlight: "success" }] },
        { type: "variables", entries: [{ name: "level", value: "[15, 7]", highlight: true }, { name: "result", value: "[[3], [9, 20], [15, 7]]" }] },
      ],
    },
    {
      description:
        "Return [[3], [9, 20], [15, 7]]. Each inner list contains all nodes at that depth. Time: O(n) — visit each node once. Space: O(n) — the queue can hold up to n/2 nodes (widest level), and result stores all n values.",
      codeHighlightLines: [18],
      structures: [
        { type: "array", label: "result[0]", values: [3], highlights: { 0: "success" } },
        { type: "array", label: "result[1]", values: [9, 20], highlights: { 0: "success", 1: "success" } },
        { type: "array", label: "result[2]", values: [15, 7], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "return", value: "3 levels", highlight: true }] },
      ],
    },
  ],
};

export default solution;

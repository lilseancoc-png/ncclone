import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "BFS Level Order",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  code: `from collections import deque

def right_side_view(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level_size = len(queue)
        for i in range(level_size):
            node = queue.popleft()
            if i == level_size - 1:
                result.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return result`,
  steps: [
    {
      description:
        "Return what you'd see looking at the tree from the right side — the rightmost node at each level. BFS processes level by level; we just keep the LAST node of each level. Tree: [1, 2, 3, null, 5, null, 4].",
      codeHighlightLines: [1, 3, 4, 5, 6, 7],
      structures: [
        { type: "array", label: "tree", values: [1, 2, 3, "—", 5, "—", 4] },
        { type: "array", label: "queue", values: [1], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "result", value: "[]" }] },
      ],
    },
    {
      description:
        "Level 1 (size=1): Process node 1. It's the last node in this level (i=0 == size-1), so add 1 to result. Enqueue children 2 and 3.",
      codeHighlightLines: [8, 9, 10, 11, 12],
      structures: [
        { type: "array", label: "tree", values: [1, 2, 3, "—", 5, "—", 4], highlights: { 0: "success" } },
        { type: "array", label: "queue", values: [2, 3], highlights: { 0: "active", 1: "active" } },
        { type: "variables", entries: [{ name: "last in level", value: "1 ✓", highlight: true }, { name: "result", value: "[1]" }] },
      ],
    },
    {
      description:
        "Level 2 (size=2): Process node 2 (i=0, not last — skip). Enqueue its right child 5. Process node 3 (i=1 == size-1, last!) — add 3 to result. Enqueue its right child 4.",
      codeHighlightLines: [10, 11, 12, 13, 14, 15, 16],
      structures: [
        { type: "array", label: "tree", values: [1, 2, 3, "—", 5, "—", 4], highlights: { 0: "success", 1: "checked", 2: "success" } },
        { type: "array", label: "queue", values: [5, 4], highlights: { 0: "active", 1: "active" } },
        { type: "variables", entries: [{ name: "node 2", value: "not last, skip" }, { name: "node 3", value: "last ✓", highlight: true }, { name: "result", value: "[1, 3]" }] },
      ],
    },
    {
      description:
        "Level 3 (size=2): Process node 5 (i=0, not last). Process node 4 (i=1 == size-1, last!) — add 4 to result. Queue empties. Return [1, 3, 4]. Time: O(n) — visit every node. Space: O(n) — queue holds up to n/2 nodes at widest level.",
      codeHighlightLines: [10, 11, 12, 17],
      structures: [
        { type: "array", label: "tree", values: [1, 2, 3, "—", 5, "—", 4], highlights: { 0: "success", 1: "success", 2: "success", 4: "checked", 6: "success" } },
        { type: "array", label: "result", values: [1, 3, 4], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "right side view", value: "[1, 3, 4]", highlight: true }] },
      ],
    },
  ],
};

export default solution;

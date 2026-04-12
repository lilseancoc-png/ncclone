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
        "Return what you'd see looking at the tree from the right side — the rightmost node at each level. BFS processes level by level; keep only the LAST node of each level. Tree: [1, 2, 3, null, 5, null, 4].",
      codeHighlightLines: [3, 4, 5, 6, 7],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 1 }, { value: 2 }, { value: 3 }, null, { value: 5 }, null, { value: 4 }] },
        { type: "variables", entries: [{ name: "queue", value: "[1]" }, { name: "result", value: "[]" }, { name: "right side = last in each BFS level", value: "" }] },
      ],
    },
    {
      description:
        "Level 1 (size=1): Process node 1. i=0 == size-1 → it's the last (and only) node in this level. Add 1 to result. Enqueue children: left=2, right=3.",
      codeHighlightLines: [8, 9, 10, 11, 12, 13, 14, 15],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 1, highlight: "success" }, { value: 2 }, { value: 3 }, null, { value: 5 }, null, { value: 4 }] },
        { type: "array", label: "queue", values: [2, 3] },
        { type: "variables", entries: [{ name: "node 1", value: "last in level → add ✓", highlight: true }, { name: "result", value: "[1]" }] },
      ],
    },
    {
      description:
        "Level 2 (size=2): Process node 2 (i=0, not last — skip for result). Enqueue 2's child: 5. Process node 3 (i=1 == size-1, LAST!) → add 3 to result. Enqueue 3's child: 4. Node 3 is rightmost at this level.",
      codeHighlightLines: [10, 11, 12, 13, 14, 15],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 1, highlight: "success" }, { value: 2, highlight: "checked" }, { value: 3, highlight: "success" }, null, { value: 5 }, null, { value: 4 }] },
        { type: "array", label: "queue", values: [5, 4] },
        { type: "variables", entries: [{ name: "node 2", value: "i=0, not last → skip" }, { name: "node 3", value: "i=1=last → add ✓", highlight: true }, { name: "result", value: "[1, 3]" }] },
      ],
    },
    {
      description:
        "Level 3 (size=2): Process node 5 (i=0, not last — skip). No children. Process node 4 (i=1 == size-1, LAST!) → add 4 to result. No children. Queue empty → done.",
      codeHighlightLines: [10, 11, 12, 16],
      structures: [
        { type: "tree", label: "tree", nodes: [{ value: 1, highlight: "success" }, { value: 2, highlight: "checked" }, { value: 3, highlight: "success" }, null, { value: 5, highlight: "checked" }, null, { value: 4, highlight: "success" }] },
        { type: "variables", entries: [{ name: "node 5", value: "i=0, not last → skip" }, { name: "node 4", value: "i=1=last → add ✓", highlight: true }, { name: "result", value: "[1, 3, 4]" }] },
      ],
    },
    {
      description:
        "Return [1, 3, 4]. From the right side: level 1 you see 1, level 2 you see 3 (not 2 — it's hidden behind 3), level 3 you see 4 (not 5 — it's hidden behind 4). Time: O(n) — visit every node once. Space: O(n) — queue can hold up to n/2 nodes at the widest level.",
      codeHighlightLines: [16],
      structures: [
        { type: "array", label: "right side view", values: [1, 3, 4], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[1, 3, 4]", highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Recursive DFS",
  timeComplexity: "O(m × n)",
  spaceComplexity: "O(m + n)",
  code: `def is_subtree(root, sub_root):
    if not root:
        return False
    if is_same(root, sub_root):
        return True
    return is_subtree(root.left, sub_root) or is_subtree(root.right, sub_root)

def is_same(p, q):
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return is_same(p.left, q.left) and is_same(p.right, q.right)`,
  steps: [
    {
      description:
        "Check if subRoot is a subtree of root. A subtree means an exact match — same values and same structure from some node downward. The approach: for every node in root, try matching the entire subRoot tree starting from that node using a helper function is_same(). root=[3,4,5,1,2], subRoot=[4,1,2].",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        { type: "tree", label: "root tree", nodes: [{ value: 3 }, { value: 4 }, { value: 5 }, { value: 1 }, { value: 2 }] },
        { type: "tree", label: "subRoot", nodes: [{ value: 4 }, { value: 1 }, { value: 2 }] },
      ],
    },
    {
      description:
        "Start at root node 3. Call is_same(3, 4): root value is 3 but subRoot value is 4 — values don't match, so this is NOT the same tree. Return False from is_same. Since the match failed at root, we recursively try the left child: is_subtree(node 4, subRoot).",
      codeHighlightLines: [4, 5, 6, 11, 12],
      structures: [
        { type: "tree", label: "root tree", nodes: [{ value: 3, highlight: "checked" }, { value: 4, highlight: "active" }, { value: 5 }, { value: 1 }, { value: 2 }] },
        { type: "variables", entries: [{ name: "is_same(3, 4)", value: "false — 3 ≠ 4" }, { name: "next", value: "try left child (node 4)" }] },
      ],
    },
    {
      description:
        "Now at node 4. Call is_same(4, 4): values match (4 == 4)! Recursively compare children. Left: is_same(1, 1) — values match, both have no children → True. Right: is_same(2, 2) — values match, both have no children → True. All nodes match — the entire subtree rooted at node 4 is identical to subRoot!",
      codeHighlightLines: [4, 5, 8, 9, 10, 11, 12, 13],
      structures: [
        { type: "tree", label: "root tree", nodes: [{ value: 3 }, { value: 4, highlight: "success" }, { value: 5 }, { value: 1, highlight: "success" }, { value: 2, highlight: "success" }] },
        { type: "tree", label: "subRoot", nodes: [{ value: 4, highlight: "success" }, { value: 1, highlight: "success" }, { value: 2, highlight: "success" }] },
        { type: "variables", entries: [{ name: "is_same(4,4)", value: "true ✓", highlight: true }, { name: "is_same(1,1)", value: "true ✓" }, { name: "is_same(2,2)", value: "true ✓" }] },
      ],
    },
    {
      description:
        "Return True — subRoot [4,1,2] is a subtree of root. We never needed to check node 5's subtree because we found a match at node 4 first. Time: O(m×n) worst case — for each of n nodes in root, we might compare up to m nodes of subRoot. Space: O(m+n) for the recursion stack in the worst case (skewed trees). For balanced trees, space is O(log m + log n).",
      codeHighlightLines: [5],
      structures: [
        { type: "tree", label: "match found!", nodes: [{ value: 3 }, { value: 4, highlight: "success" }, { value: 5 }, { value: 1, highlight: "success" }, { value: 2, highlight: "success" }] },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }, { name: "Time", value: "O(m × n)" }, { name: "Space", value: "O(m + n)" }] },
      ],
    },
  ],
};

export default solution;

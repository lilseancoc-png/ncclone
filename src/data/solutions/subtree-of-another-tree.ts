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
        "Check if subRoot is a subtree of root — exact match of values AND structure from some node downward. For every node in root, try matching the entire subRoot using is_same(). root=[3,4,5,1,2], subRoot=[4,1,2].",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        { type: "tree", label: "root", nodes: [{ value: 3 }, { value: 4 }, { value: 5 }, { value: 1 }, { value: 2 }] },
        { type: "tree", label: "subRoot", nodes: [{ value: 4 }, { value: 1 }, { value: 2 }] },
      ],
    },
    {
      description:
        "Start at root node 3. Call is_same(3, 4): root value 3 ≠ subRoot value 4. Mismatch at the very first node → return False. Node 3 is not the start of the subtree.",
      codeHighlightLines: [4, 5, 11, 12],
      structures: [
        { type: "tree", label: "root", nodes: [{ value: 3, highlight: "checked" }, { value: 4 }, { value: 5 }, { value: 1 }, { value: 2 }] },
        { type: "variables", entries: [{ name: "is_same(3, 4)", value: "3 ≠ 4 → False", highlight: true }, { name: "next", value: "try left child" }] },
      ],
    },
    {
      description:
        "Try left child: is_subtree(4, subRoot). Call is_same(4, 4): values match! Recurse on children. is_same(1, 1): both val=1, both are leaves (null children match null) → True. is_same(2, 2): both val=2, both leaves → True. All nodes match!",
      codeHighlightLines: [4, 5, 6, 8, 9, 10, 11, 12, 13],
      structures: [
        { type: "tree", label: "root", nodes: [{ value: 3 }, { value: 4, highlight: "success" }, { value: 5 }, { value: 1, highlight: "success" }, { value: 2, highlight: "success" }] },
        { type: "tree", label: "subRoot", nodes: [{ value: 4, highlight: "success" }, { value: 1, highlight: "success" }, { value: 2, highlight: "success" }] },
        { type: "variables", entries: [{ name: "is_same(4,4)", value: "True ✓" }, { name: "is_same(1,1)", value: "True ✓" }, { name: "is_same(2,2)", value: "True ✓", highlight: true }] },
      ],
    },
    {
      description:
        "is_same returned True for the subtree rooted at node 4, so is_subtree returns True immediately. We never checked node 5's subtree — early exit. If node 4's match had failed (e.g., subRoot had extra children), we'd continue: try is_subtree(5, subRoot), which would also fail, returning False.",
      codeHighlightLines: [5],
      structures: [
        { type: "tree", label: "match found at node 4", nodes: [{ value: 3 }, { value: 4, highlight: "success" }, { value: 5 }, { value: 1, highlight: "success" }, { value: 2, highlight: "success" }] },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }, { name: "early exit", value: "didn't need to check node 5" }] },
      ],
    },
    {
      description:
        "Time: O(m×n) worst case — for each of n nodes in root, compare up to m nodes of subRoot. In practice, mismatches often fail early (first node comparison), so average is much better. Space: O(m+n) for recursion stack. Note: is_same requires exact structure match — if root had [4,1,2,0] and subRoot was [4,1,2], it would NOT match because the extra child 0 differs.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }, { name: "exact match", value: "values AND structure must match" }, { name: "Time", value: "O(m × n)" }, { name: "Space", value: "O(m + n)" }] },
      ],
    },
  ],
};

export default solution;

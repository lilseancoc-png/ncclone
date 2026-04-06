import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Two Pointers — One Pass",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n + 1):
        fast = fast.next
    while fast:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next`,
  steps: [
    {
      description:
        "Remove the nth node from the end in one pass. The trick: use two pointers spaced n+1 apart. When the fast pointer reaches the end, slow is right before the node to remove. A dummy node handles the edge case of removing the head. List: [1→2→3→4→5], n=2.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "linkedlist", label: "list", nodes: [{ value: "d", label: "fast/slow" }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }] },
        { type: "variables", entries: [{ name: "n", value: 2 }, { name: "gap needed", value: "n+1 = 3" }] },
      ],
    },
    {
      description:
        "Advance fast n+1=3 times: dummy→1→2→3. Now fast is at node 3, slow is still at dummy. The gap between them is 3 nodes.",
      codeHighlightLines: [4, 5],
      structures: [
        { type: "linkedlist", label: "list", nodes: [{ value: "d", label: "slow" }, { value: 1 }, { value: 2 }, { value: 3, highlight: "active", label: "fast" }, { value: 4 }, { value: 5 }] },
        { type: "variables", entries: [{ name: "gap", value: 3, highlight: true }] },
      ],
    },
    {
      description:
        "Move both pointers together until fast reaches null. fast: 3→4→5→null. slow: dummy→1→2→3. Now slow is at node 3 — right before node 4 (the 2nd from end that we want to remove).",
      codeHighlightLines: [6, 7, 8],
      structures: [
        { type: "linkedlist", label: "list", nodes: [{ value: "d" }, { value: 1 }, { value: 2 }, { value: 3, highlight: "active", label: "slow" }, { value: 4, highlight: "found" }, { value: 5 }] },
        { type: "variables", entries: [{ name: "fast", value: "null" }, { name: "slow", value: "node 3" }, { name: "to remove", value: "node 4 (2nd from end)", highlight: true }] },
      ],
    },
    {
      description:
        "Skip the target: slow.next = slow.next.next (3→5, bypassing 4). Return dummy.next = [1→2→3→5]. Time: O(n) — single pass. Space: O(1) — just two pointers. The dummy node elegantly handles removing the head node.",
      codeHighlightLines: [9, 10],
      structures: [
        { type: "array", label: "result", values: [1, 2, 3, 5], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", entries: [{ name: "removed", value: "node 4" }, { name: "return", value: "[1,2,3,5]", highlight: true }] },
      ],
    },
  ],
};

export default solution;

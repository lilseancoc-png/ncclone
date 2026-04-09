import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Split, Reverse, Merge",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def reorder_list(head):
    # Find middle
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    # Reverse second half
    second = slow.next
    slow.next = None
    prev = None
    while second:
        tmp = second.next
        second.next = prev
        prev = second
        second = tmp
    # Merge two halves
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first, second = tmp1, tmp2`,
  steps: [
    {
      description:
        "Reorder a linked list: L0→L1→...→Ln-1→Ln becomes L0→Ln→L1→Ln-1→L2→Ln-2→... (interleave from both ends). The elegant O(1) space approach uses three classic linked list techniques in sequence: (1) find the middle with slow/fast pointers, (2) reverse the second half in-place, (3) merge the two halves by alternating. Input: 1→2→3→4→5.",
      codeHighlightLines: [1, 2, 3, 4, 5],
      structures: [
        { type: "linkedlist", label: "original list", nodes: [{ value: 1, label: "head" }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }] },
        { type: "variables", entries: [{ name: "goal", value: "1→5→2→4→3" }] },
      ],
    },
    {
      description:
        "Step 1 — Find the middle: slow starts at head, fast at head.next. Move slow 1 step, fast 2 steps. When fast reaches the end, slow is at the middle. Here slow ends at node 3. Split: first half = [1,2,3], second half = [4,5]. Setting slow.next = None disconnects them.",
      codeHighlightLines: [2, 3, 4, 5, 6, 7, 8, 9],
      structures: [
        { type: "linkedlist", label: "first half", nodes: [{ value: 1, highlight: "active" }, { value: 2, highlight: "active" }, { value: 3, highlight: "active", label: "slow" }] },
        { type: "linkedlist", label: "second half", nodes: [{ value: 4, highlight: "active" }, { value: 5, highlight: "active" }] },
      ],
    },
    {
      description:
        "Step 2 — Reverse the second half: [4→5] becomes [5→4]. Standard iterative reversal: for each node, point its next to the previous node. After reversing, 'prev' points to the new head (5). Now both halves are set up for interleaving: first goes forward (1,2,3) while second goes backward from the original end (5,4).",
      codeHighlightLines: [10, 11, 12, 13, 14],
      structures: [
        { type: "linkedlist", label: "first half", nodes: [{ value: 1, highlight: "active" }, { value: 2, highlight: "active" }, { value: 3, highlight: "active" }] },
        { type: "linkedlist", label: "second half (reversed)", nodes: [{ value: 5, highlight: "success", label: "prev" }, { value: 4, highlight: "success" }] },
      ],
    },
    {
      description:
        "Step 3 — Merge by interleaving: Take node from first (1), then from second (5), then first (2), then second (4), leaving 3 at the end. Result: 1→5→2→4→3. Each merge step: save next pointers, rewire first→second→first.next, advance both. Time: O(n) — three linear passes (find middle, reverse, merge). Space: O(1) — only pointer variables, no extra storage.",
      codeHighlightLines: [16, 17, 18, 19, 20, 21],
      structures: [
        { type: "linkedlist", label: "reordered list", nodes: [{ value: 1, highlight: "success" }, { value: 5, highlight: "success" }, { value: 2, highlight: "success" }, { value: 4, highlight: "success" }, { value: 3, highlight: "success" }] },
        { type: "variables", entries: [{ name: "result", value: "1→5→2→4→3", highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

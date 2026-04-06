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
        "Reorder list: L0→L1→...→Ln becomes L0→Ln→L1→Ln-1→... Three steps: (1) find the middle, (2) reverse the second half, (3) merge alternating from both halves. All O(1) extra space! Input: [1→2→3→4→5].",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "linkedlist", label: "list", nodes: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }] },
      ],
    },
    {
      description:
        "Step 1 — Find middle using slow/fast pointers. Slow moves 1 step, fast moves 2. When fast reaches the end, slow is at the middle. slow=3, so first half is [1,2,3] and second half is [4,5].",
      codeHighlightLines: [2, 3, 4, 5, 6],
      structures: [
        { type: "linkedlist", label: "first half", nodes: [{ value: 1, highlight: "active" }, { value: 2, highlight: "active" }, { value: 3, highlight: "active" }] },
        { type: "linkedlist", label: "second half", nodes: [{ value: 4, highlight: "active" }, { value: 5, highlight: "active" }] },
      ],
    },
    {
      description:
        "Step 2 — Reverse second half: [4→5] becomes [5→4]. Standard iterative reversal with prev pointer.",
      codeHighlightLines: [7, 8, 9, 10, 11, 12, 13, 14],
      structures: [
        { type: "linkedlist", label: "first half", nodes: [{ value: 1, highlight: "active" }, { value: 2, highlight: "active" }, { value: 3, highlight: "active" }] },
        { type: "linkedlist", label: "second half (reversed)", nodes: [{ value: 5, highlight: "success" }, { value: 4, highlight: "success" }] },
      ],
    },
    {
      description:
        "Step 3 — Merge by interleaving: take from first, then second, alternating. 1→5→2→4→3. Time: O(n) — three passes (find middle + reverse + merge). Space: O(1) — only pointer variables, no extra data structures.",
      codeHighlightLines: [15, 16, 17, 18, 19, 20, 21],
      structures: [
        { type: "array", label: "reordered", values: [1, 5, 2, 4, 3], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "result", value: "1→5→2→4→3", highlight: true }] },
      ],
    },
  ],
};

export default solution;

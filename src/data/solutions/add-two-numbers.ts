import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Iterative with Carry",
  timeComplexity: "O(max(m, n))",
  spaceComplexity: "O(max(m, n))",
  code: `def add_two_numbers(l1, l2):
    dummy = ListNode(0)
    curr = dummy
    carry = 0
    while l1 or l2 or carry:
        val = carry
        if l1:
            val += l1.val
            l1 = l1.next
        if l2:
            val += l2.val
            l2 = l2.next
        carry = val // 10
        curr.next = ListNode(val % 10)
        curr = curr.next
    return dummy.next`,
  steps: [
    {
      description:
        "Add two numbers represented as reversed linked lists. l1=[2→4→3] represents 342. l2=[5→6→4] represents 465. Add digit by digit (ones place first), carrying when sum ≥ 10. The reversed format is perfect — we add left to right, just like elementary school addition from the ones column.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "linkedlist", label: "l1 (342)", nodes: [{ value: 2, label: "l1" }, { value: 4 }, { value: 3 }] },
        { type: "linkedlist", label: "l2 (465)", nodes: [{ value: 5, label: "l2" }, { value: 6 }, { value: 4 }] },
        { type: "linkedlist", label: "result", nodes: [{ value: "d", label: "dummy/curr" }] },
        { type: "variables", entries: [{ name: "carry", value: 0 }] },
      ],
    },
    {
      description:
        "Ones place: val = 0 (carry) + 2 (l1) + 5 (l2) = 7. carry = 7//10 = 0. digit = 7%10 = 7. Create node(7), attach to curr. Advance l1→4, l2→6, curr→node(7). Result: [d→7].",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      structures: [
        { type: "linkedlist", label: "l1", nodes: [{ value: 2, highlight: "checked" }, { value: 4, label: "l1", highlight: "active" }, { value: 3 }] },
        { type: "linkedlist", label: "l2", nodes: [{ value: 5, highlight: "checked" }, { value: 6, label: "l2", highlight: "active" }, { value: 4 }] },
        { type: "linkedlist", label: "result", nodes: [{ value: "d" }, { value: 7, highlight: "success", label: "curr" }] },
        { type: "variables", entries: [{ name: "2 + 5 + 0", value: "= 7", highlight: true }, { name: "carry", value: 0 }] },
      ],
    },
    {
      description:
        "Tens place: val = 0 + 4 + 6 = 10. carry = 10//10 = 1. digit = 10%10 = 0. Create node(0). The carry of 1 propagates to the next column — just like carrying in written addition. Result: [d→7→0].",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      structures: [
        { type: "linkedlist", label: "l1", nodes: [{ value: 2, highlight: "checked" }, { value: 4, highlight: "checked" }, { value: 3, label: "l1", highlight: "active" }] },
        { type: "linkedlist", label: "l2", nodes: [{ value: 5, highlight: "checked" }, { value: 6, highlight: "checked" }, { value: 4, label: "l2", highlight: "active" }] },
        { type: "linkedlist", label: "result", nodes: [{ value: "d" }, { value: 7, highlight: "success" }, { value: 0, highlight: "success", label: "curr" }] },
        { type: "variables", entries: [{ name: "4 + 6 + 0", value: "= 10", highlight: true }, { name: "carry", value: 1, highlight: true }, { name: "digit", value: 0 }] },
      ],
    },
    {
      description:
        "Hundreds place: val = 1 (carry!) + 3 + 4 = 8. carry = 0. digit = 8. Create node(8). Both l1 and l2 are now exhausted (None), and carry is 0. Loop condition 'l1 or l2 or carry' is False → exit. Result: [d→7→0→8].",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      structures: [
        { type: "linkedlist", label: "l1 (exhausted)", nodes: [{ value: 2, highlight: "checked" }, { value: 4, highlight: "checked" }, { value: 3, highlight: "checked" }] },
        { type: "linkedlist", label: "l2 (exhausted)", nodes: [{ value: 5, highlight: "checked" }, { value: 6, highlight: "checked" }, { value: 4, highlight: "checked" }] },
        { type: "linkedlist", label: "result", nodes: [{ value: "d" }, { value: 7, highlight: "success" }, { value: 0, highlight: "success" }, { value: 8, highlight: "success", label: "curr" }] },
        { type: "variables", entries: [{ name: "3 + 4 + 1", value: "= 8", highlight: true }, { name: "carry", value: 0 }] },
      ],
    },
    {
      description:
        "Return dummy.next → 7→0→8, which represents 807. Verified: 342 + 465 = 807 ✓. The 'or carry' in the loop condition handles cases where a final carry creates an extra digit (e.g., 999 + 1 = 1000 → the carry produces a 4th node). Time: O(max(m,n)). Space: O(max(m,n)) for the result list.",
      codeHighlightLines: [16],
      structures: [
        { type: "linkedlist", label: "result: 807", nodes: [{ value: 7, highlight: "success", label: "head" }, { value: 0, highlight: "success" }, { value: 8, highlight: "success" }] },
        { type: "variables", entries: [{ name: "342 + 465", value: "= 807 ✓", highlight: true }, { name: "return", value: "7→0→8", highlight: true }, { name: "Time", value: "O(max(m, n))" }, { name: "Space", value: "O(max(m, n))" }] },
      ],
    },
  ],
};

export default solution;

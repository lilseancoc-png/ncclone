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
        "Add two numbers represented as reversed linked lists. l1 = [2→4→3] represents 342, l2 = [5→6→4] represents 465. We add digit by digit from left to right (ones place first), carrying over when sum ≥ 10. This naturally matches the reversed order!",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "l1 (342)", values: [2, 4, 3], pointers: [{ index: 0, label: "l1" }] },
        { type: "array", label: "l2 (465)", values: [5, 6, 4], pointers: [{ index: 0, label: "l2" }] },
        { type: "variables", entries: [{ name: "carry", value: 0 }] },
      ],
    },
    {
      description:
        "Ones place: 2 + 5 + 0 (carry) = 7. 7 < 10 so carry = 0, digit = 7. Create node(7).",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      structures: [
        { type: "array", label: "l1", values: [2, 4, 3], highlights: { 0: "active" } },
        { type: "array", label: "l2", values: [5, 6, 4], highlights: { 0: "active" } },
        { type: "array", label: "result", values: [7], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "sum", value: "2+5+0 = 7" }, { name: "carry", value: 0 }, { name: "digit", value: 7, highlight: true }] },
      ],
    },
    {
      description:
        "Tens place: 4 + 6 + 0 = 10. 10 ≥ 10 so carry = 1, digit = 0. Create node(0).",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      structures: [
        { type: "array", label: "l1", values: [2, 4, 3], highlights: { 0: "checked", 1: "active" } },
        { type: "array", label: "l2", values: [5, 6, 4], highlights: { 0: "checked", 1: "active" } },
        { type: "array", label: "result", values: [7, 0], highlights: { 1: "success" } },
        { type: "variables", entries: [{ name: "sum", value: "4+6+0 = 10" }, { name: "carry", value: 1, highlight: true }, { name: "digit", value: 0 }] },
      ],
    },
    {
      description:
        "Hundreds place: 3 + 4 + 1 (carry) = 8. carry = 0, digit = 8. Create node(8). Both lists exhausted and carry is 0, so we're done.",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      structures: [
        { type: "array", label: "l1", values: [2, 4, 3], highlights: { 0: "checked", 1: "checked", 2: "active" } },
        { type: "array", label: "l2", values: [5, 6, 4], highlights: { 0: "checked", 1: "checked", 2: "active" } },
        { type: "array", label: "result", values: [7, 0, 8], highlights: { 2: "success" } },
        { type: "variables", entries: [{ name: "sum", value: "3+4+1 = 8" }, { name: "carry", value: 0 }, { name: "digit", value: 8, highlight: true }] },
      ],
    },
    {
      description:
        "Return [7→0→8] which represents 807. Verified: 342 + 465 = 807 ✓. Time: O(max(m,n)) — one pass through both lists. Space: O(max(m,n)) for the result list. The carry handles sums > 9 and even when the result is longer than both inputs (e.g., 999 + 1 = 1000).",
      codeHighlightLines: [16],
      structures: [
        { type: "array", label: "result: 807", values: [7, 0, 8], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "342 + 465", value: "= 807 ✓", highlight: true }] },
      ],
    },
  ],
};

export default solution;

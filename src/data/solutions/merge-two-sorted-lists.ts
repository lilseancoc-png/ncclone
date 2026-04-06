import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def mergeTwoLists(list1, list2):
    dummy = ListNode()
    curr = dummy

    while list1 and list2:
        if list1.val <= list2.val:
            curr.next = list1
            list1 = list1.next
        else:
            curr.next = list2
            list2 = list2.next
        curr = curr.next

    curr.next = list1 or list2
    return dummy.next`,
  steps: [
    {
      description:
        "Merge two sorted linked lists [1,2,4] and [1,3,4]. Use a dummy node and compare heads at each step.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        {
          type: "linkedlist",
          label: "list1",
          nodes: [
            { value: 1, label: "l1", highlight: "active" },
            { value: 2 },
            { value: 4 },
          ],
        },
        {
          type: "linkedlist",
          label: "list2",
          nodes: [
            { value: 1, label: "l2", highlight: "active" },
            { value: 3 },
            { value: 4 },
          ],
        },
        {
          type: "linkedlist",
          label: "merged",
          nodes: [{ value: "d", label: "dummy" }],
        },
      ],
    },
    {
      description:
        "l1.val=1 ≤ l2.val=1. Attach l1's node. Move l1 forward.",
      codeHighlightLines: [5, 6, 7, 8, 12],
      structures: [
        {
          type: "linkedlist",
          label: "list1",
          nodes: [
            { value: 1, highlight: "checked" },
            { value: 2, label: "l1", highlight: "active" },
            { value: 4 },
          ],
        },
        {
          type: "linkedlist",
          label: "list2",
          nodes: [
            { value: 1, label: "l2", highlight: "active" },
            { value: 3 },
            { value: 4 },
          ],
        },
        {
          type: "linkedlist",
          label: "merged",
          nodes: [{ value: "d" }, { value: 1, highlight: "success" }],
        },
      ],
    },
    {
      description:
        "l1.val=2 > l2.val=1. Attach l2's node (1). Move l2 forward.",
      codeHighlightLines: [9, 10, 11, 12],
      structures: [
        {
          type: "linkedlist",
          label: "list1",
          nodes: [
            { value: 1, highlight: "checked" },
            { value: 2, label: "l1", highlight: "active" },
            { value: 4 },
          ],
        },
        {
          type: "linkedlist",
          label: "list2",
          nodes: [
            { value: 1, highlight: "checked" },
            { value: 3, label: "l2", highlight: "active" },
            { value: 4 },
          ],
        },
        {
          type: "linkedlist",
          label: "merged",
          nodes: [{ value: "d" }, { value: 1, highlight: "success" }, { value: 1, highlight: "success" }],
        },
      ],
    },
    {
      description:
        "l1.val=2 ≤ l2.val=3 → attach 2. Then l1.val=4 > l2.val=3 → attach 3. Then l1.val=4 ≤ l2.val=4 → attach l1's 4.",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12],
      structures: [
        {
          type: "linkedlist",
          label: "list1 (exhausted)",
          nodes: [
            { value: 1, highlight: "checked" },
            { value: 2, highlight: "checked" },
            { value: 4, highlight: "checked" },
          ],
        },
        {
          type: "linkedlist",
          label: "list2",
          nodes: [
            { value: 1, highlight: "checked" },
            { value: 3, highlight: "checked" },
            { value: 4, label: "l2", highlight: "active" },
          ],
        },
        {
          type: "linkedlist",
          label: "merged so far",
          nodes: [
            { value: "d" },
            { value: 1, highlight: "success" },
            { value: 1, highlight: "success" },
            { value: 2, highlight: "success" },
            { value: 3, highlight: "success" },
            { value: 4, highlight: "success" },
          ],
        },
      ],
    },
    {
      description:
        "list1 exhausted. Attach remaining list2 (4). Return dummy.next. Merged: 1→1→2→3→4→4.",
      codeHighlightLines: [14, 15],
      structures: [
        {
          type: "linkedlist",
          label: "merged list (final)",
          nodes: [
            { value: 1, highlight: "success", label: "head" },
            { value: 1, highlight: "success" },
            { value: 2, highlight: "success" },
            { value: 3, highlight: "success" },
            { value: 4, highlight: "success" },
            { value: 4, highlight: "success" },
          ],
        },
        { type: "variables", entries: [{ name: "return", value: "[1,1,2,3,4,4]", highlight: true }] },
      ],
    },
  ],
};

export default solution;

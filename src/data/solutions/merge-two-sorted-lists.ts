import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Iterative Merge",
  timeComplexity: "O(n + m)",
  spaceComplexity: "O(1)",
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
        "Merge two sorted linked lists into one sorted list. Use a dummy node as placeholder head to avoid special-casing the first pick. Compare heads of both lists, attach the smaller one to curr, advance that list's pointer. list1=[1,2,4], list2=[1,3,4].",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "linkedlist", label: "list1", nodes: [{ value: 1, label: "l1", highlight: "active" }, { value: 2 }, { value: 4 }] },
        { type: "linkedlist", label: "list2", nodes: [{ value: 1, label: "l2", highlight: "active" }, { value: 3 }, { value: 4 }] },
        { type: "linkedlist", label: "merged", nodes: [{ value: "d", label: "dummy/curr" }] },
      ],
    },
    {
      description:
        "Compare: l1.val=1 <= l2.val=1 → pick from list1. Attach node(1) to curr.next. Advance l1 to node(2), advance curr to the attached node. Merged: [d→1].",
      codeHighlightLines: [5, 6, 7, 8, 12],
      structures: [
        { type: "linkedlist", label: "list1", nodes: [{ value: 2, label: "l1", highlight: "active" }, { value: 4 }] },
        { type: "linkedlist", label: "list2", nodes: [{ value: 1, label: "l2", highlight: "active" }, { value: 3 }, { value: 4 }] },
        { type: "linkedlist", label: "merged", nodes: [{ value: "d" }, { value: 1, highlight: "success", label: "curr" }] },
        { type: "variables", entries: [{ name: "picked", value: "1 from list1 (l1 ≤ l2)", highlight: true }] },
      ],
    },
    {
      description:
        "Compare: l1.val=2 > l2.val=1 → pick from list2. Attach node(1) to curr.next. Advance l2 to node(3), advance curr. Merged: [d→1→1].",
      codeHighlightLines: [9, 10, 11, 12],
      structures: [
        { type: "linkedlist", label: "list1", nodes: [{ value: 2, label: "l1", highlight: "active" }, { value: 4 }] },
        { type: "linkedlist", label: "list2", nodes: [{ value: 3, label: "l2", highlight: "active" }, { value: 4 }] },
        { type: "linkedlist", label: "merged", nodes: [{ value: "d" }, { value: 1, highlight: "success" }, { value: 1, highlight: "success", label: "curr" }] },
        { type: "variables", entries: [{ name: "picked", value: "1 from list2 (l2 < l1)", highlight: true }] },
      ],
    },
    {
      description:
        "Compare: l1.val=2 <= l2.val=3 → pick 2 from list1. Advance l1 to node(4). Merged: [d→1→1→2].",
      codeHighlightLines: [5, 6, 7, 8, 12],
      structures: [
        { type: "linkedlist", label: "list1", nodes: [{ value: 4, label: "l1", highlight: "active" }] },
        { type: "linkedlist", label: "list2", nodes: [{ value: 3, label: "l2", highlight: "active" }, { value: 4 }] },
        { type: "linkedlist", label: "merged", nodes: [{ value: "d" }, { value: 1, highlight: "success" }, { value: 1, highlight: "success" }, { value: 2, highlight: "success", label: "curr" }] },
        { type: "variables", entries: [{ name: "picked", value: "2 from list1", highlight: true }] },
      ],
    },
    {
      description:
        "Compare: l1.val=4 > l2.val=3 → pick 3 from list2. Advance l2 to node(4). Then compare: l1.val=4 <= l2.val=4 → pick 4 from list1. l1 is now exhausted (None). Merged: [d→1→1→2→3→4].",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11, 12],
      structures: [
        { type: "linkedlist", label: "list1 (exhausted)", nodes: [] },
        { type: "linkedlist", label: "list2", nodes: [{ value: 4, label: "l2", highlight: "active" }] },
        { type: "linkedlist", label: "merged so far", nodes: [{ value: "d" }, { value: 1, highlight: "success" }, { value: 1, highlight: "success" }, { value: 2, highlight: "success" }, { value: 3, highlight: "success" }, { value: 4, highlight: "success", label: "curr" }] },
        { type: "variables", entries: [{ name: "picks", value: "3 from l2, then 4 from l1", highlight: true }] },
      ],
    },
    {
      description:
        "Loop exits (list1 is None). Attach remaining list2 directly: curr.next = list2 (node 4). No iteration needed — the rest is already sorted. Return dummy.next = node(1). Final: 1→1→2→3→4→4. Time: O(n+m) — each node visited once. Space: O(1) — only rearranging pointers, no new nodes.",
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
        { type: "variables", entries: [{ name: "return", value: "1→1→2→3→4→4", highlight: true }, { name: "Time", value: "O(n + m)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

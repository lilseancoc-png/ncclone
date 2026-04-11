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
        "Merge two sorted linked lists into one sorted list. The trick: use a 'dummy' node as a placeholder head — this avoids special-casing the first node. We maintain a 'curr' pointer that tracks where to append the next node. At each step, compare the heads of both lists and attach the smaller one. list1=[1,2,4], list2=[1,3,4].",
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
          nodes: [{ value: "d", label: "dummy/curr" }],
        },
      ],
    },
    {
      description:
        "Compare: l1.val=1 <= l2.val=1, so attach list1's node (1) to curr.next. Advance list1 to its next node (2) and advance curr to the newly attached node. When values are equal, we pick from list1 — but either choice would be correct since both produce a valid sorted result.",
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
          nodes: [{ value: "d" }, { value: 1, highlight: "success", label: "curr" }],
        },
      ],
    },
    {
      description:
        "Compare: l1.val=2 > l2.val=1, so attach list2's node (1). Advance list2 to node 3 and advance curr. Now the merged list has two 1's — both from different source lists, maintaining the sorted order.",
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
          nodes: [{ value: "d" }, { value: 1, highlight: "success" }, { value: 1, highlight: "success", label: "curr" }],
        },
      ],
    },
    {
      description:
        "Compare: l1.val=2 <= l2.val=3 → attach 2 from list1. Next: l1.val=4 > l2.val=3 → attach 3 from list2. Next: l1.val=4 <= l2.val=4 → attach 4 from list1. After this, list1 is exhausted (all nodes used). Each comparison picks the globally smallest available node, guaranteeing sorted order.",
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
            { value: 4, highlight: "success", label: "curr" },
          ],
        },
      ],
    },
    {
      description:
        "The while loop exits because list1 is None. We attach the remainder of list2 (node 4) directly — no need to iterate since it's already sorted. Return dummy.next, which skips the placeholder dummy and gives us the real head. Final result: 1→1→2→3→4→4. Time: O(n+m) — each node is visited exactly once. Space: O(1) — we only rearrange existing nodes, no new ones created.",
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
        { type: "variables", entries: [{ name: "return", value: "[1,1,2,3,4,4]", highlight: true }, { name: "Time", value: "O(n + m)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

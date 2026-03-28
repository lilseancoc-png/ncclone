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
        "Merge two sorted linked lists [1,2,4] and [1,3,4]. Create a dummy node and a curr pointer to build the result.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "list1", values: [1, 2, 4], highlights: {}, pointers: [{ index: 0, label: "l1", color: "purple" }] },
        { type: "array", label: "list2", values: [1, 3, 4], highlights: {}, pointers: [{ index: 0, label: "l2", color: "cyan" }] },
        { type: "array", label: "merged", values: ["dummy"], highlights: { 0: "active" } },
      ],
    },
    {
      description:
        "Compare l1.val=1 and l2.val=1. 1 <= 1, so attach list1's node. Move l1 to next node.",
      codeHighlightLines: [5, 6, 7, 8, 12],
      structures: [
        { type: "array", label: "list1", values: [1, 2, 4], highlights: { 0: "checked" }, pointers: [{ index: 1, label: "l1", color: "purple" }] },
        { type: "array", label: "list2", values: [1, 3, 4], highlights: {}, pointers: [{ index: 0, label: "l2", color: "cyan" }] },
        { type: "array", label: "merged", values: ["dummy", 1], highlights: { 1: "success" } },
      ],
    },
    {
      description:
        "Compare l1.val=2 and l2.val=1. 2 > 1, so attach list2's node. Move l2 forward.",
      codeHighlightLines: [9, 10, 11, 12],
      structures: [
        { type: "array", label: "list1", values: [1, 2, 4], highlights: {}, pointers: [{ index: 1, label: "l1", color: "purple" }] },
        { type: "array", label: "list2", values: [1, 3, 4], highlights: { 0: "checked" }, pointers: [{ index: 1, label: "l2", color: "cyan" }] },
        { type: "array", label: "merged", values: ["dummy", 1, 1], highlights: { 2: "success" } },
      ],
    },
    {
      description:
        "Compare l1.val=2 and l2.val=3. 2 <= 3, so attach list1's node (2). Move l1 forward.",
      codeHighlightLines: [5, 6, 7, 8, 12],
      structures: [
        { type: "array", label: "list1", values: [1, 2, 4], highlights: { 1: "checked" }, pointers: [{ index: 2, label: "l1", color: "purple" }] },
        { type: "array", label: "list2", values: [1, 3, 4], highlights: {}, pointers: [{ index: 1, label: "l2", color: "cyan" }] },
        { type: "array", label: "merged", values: ["dummy", 1, 1, 2], highlights: { 3: "success" } },
      ],
    },
    {
      description:
        "Compare l1.val=4 and l2.val=3. 4 > 3, so attach list2's node (3). Move l2 forward.",
      codeHighlightLines: [9, 10, 11, 12],
      structures: [
        { type: "array", label: "list1", values: [1, 2, 4], highlights: {}, pointers: [{ index: 2, label: "l1", color: "purple" }] },
        { type: "array", label: "list2", values: [1, 3, 4], highlights: { 1: "checked" }, pointers: [{ index: 2, label: "l2", color: "cyan" }] },
        { type: "array", label: "merged", values: ["dummy", 1, 1, 2, 3], highlights: { 4: "success" } },
      ],
    },
    {
      description:
        "Compare l1.val=4 and l2.val=4. 4 <= 4, so attach list1's node (4). l1 is now exhausted.",
      codeHighlightLines: [5, 6, 7, 8, 12],
      structures: [
        { type: "array", label: "list1", values: [1, 2, 4], highlights: { 2: "checked" } },
        { type: "array", label: "list2", values: [1, 3, 4], highlights: {}, pointers: [{ index: 2, label: "l2", color: "cyan" }] },
        { type: "array", label: "merged", values: ["dummy", 1, 1, 2, 3, 4], highlights: { 5: "success" } },
      ],
    },
    {
      description:
        "list1 is empty, so attach the rest of list2 (just 4). The merged list is [1,1,2,3,4,4]. Return dummy.next.",
      codeHighlightLines: [14, 15],
      structures: [
        { type: "array", label: "merged (final)", values: [1, 1, 2, 3, 4, 4], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[1,1,2,3,4,4]", highlight: true }] },
      ],
    },
  ],
};

export default solution;

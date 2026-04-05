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
        { type: "linkedlist", label: "list1", nodes: [{ value: 1 }, { value: 2 }, { value: 4 }], pointers: [{ index: 0, label: "l1", color: "purple" }] },
        { type: "linkedlist", label: "list2", nodes: [{ value: 1 }, { value: 3 }, { value: 4 }], pointers: [{ index: 0, label: "l2", color: "cyan" }] },
        { type: "linkedlist", label: "merged", nodes: [{ value: "dummy", highlight: "active" }] },
      ],
    },
    {
      description:
        "Compare l1.val=1 and l2.val=1. 1 <= 1, so attach list1's node. Move l1 to next node.",
      codeHighlightLines: [5, 6, 7, 8, 12],
      structures: [
        { type: "linkedlist", label: "list1", nodes: [{ value: 1, highlight: "checked" }, { value: 2 }, { value: 4 }], pointers: [{ index: 1, label: "l1", color: "purple" }] },
        { type: "linkedlist", label: "list2", nodes: [{ value: 1 }, { value: 3 }, { value: 4 }], pointers: [{ index: 0, label: "l2", color: "cyan" }] },
        { type: "linkedlist", label: "merged", nodes: [{ value: "dummy" }, { value: 1, highlight: "success" }] },
      ],
    },
    {
      description:
        "Compare l1.val=2 and l2.val=1. 2 > 1, so attach list2's node. Move l2 forward.",
      codeHighlightLines: [9, 10, 11, 12],
      structures: [
        { type: "linkedlist", label: "list1", nodes: [{ value: 1 }, { value: 2 }, { value: 4 }], pointers: [{ index: 1, label: "l1", color: "purple" }] },
        { type: "linkedlist", label: "list2", nodes: [{ value: 1, highlight: "checked" }, { value: 3 }, { value: 4 }], pointers: [{ index: 1, label: "l2", color: "cyan" }] },
        { type: "linkedlist", label: "merged", nodes: [{ value: "dummy" }, { value: 1 }, { value: 1, highlight: "success" }] },
      ],
    },
    {
      description:
        "Compare l1.val=2 and l2.val=3. 2 <= 3, so attach list1's node (2). Move l1 forward.",
      codeHighlightLines: [5, 6, 7, 8, 12],
      structures: [
        { type: "linkedlist", label: "list1", nodes: [{ value: 1 }, { value: 2, highlight: "checked" }, { value: 4 }], pointers: [{ index: 2, label: "l1", color: "purple" }] },
        { type: "linkedlist", label: "list2", nodes: [{ value: 1 }, { value: 3 }, { value: 4 }], pointers: [{ index: 1, label: "l2", color: "cyan" }] },
        { type: "linkedlist", label: "merged", nodes: [{ value: "dummy" }, { value: 1 }, { value: 1 }, { value: 2, highlight: "success" }] },
      ],
    },
    {
      description:
        "Compare l1.val=4 and l2.val=3. 4 > 3, so attach list2's node (3). Move l2 forward.",
      codeHighlightLines: [9, 10, 11, 12],
      structures: [
        { type: "linkedlist", label: "list1", nodes: [{ value: 1 }, { value: 2 }, { value: 4 }], pointers: [{ index: 2, label: "l1", color: "purple" }] },
        { type: "linkedlist", label: "list2", nodes: [{ value: 1 }, { value: 3, highlight: "checked" }, { value: 4 }], pointers: [{ index: 2, label: "l2", color: "cyan" }] },
        { type: "linkedlist", label: "merged", nodes: [{ value: "dummy" }, { value: 1 }, { value: 1 }, { value: 2 }, { value: 3, highlight: "success" }] },
      ],
    },
    {
      description:
        "Compare l1.val=4 and l2.val=4. 4 <= 4, so attach list1's node (4). l1 is now exhausted.",
      codeHighlightLines: [5, 6, 7, 8, 12],
      structures: [
        { type: "linkedlist", label: "list1", nodes: [{ value: 1 }, { value: 2 }, { value: 4, highlight: "checked" }] },
        { type: "linkedlist", label: "list2", nodes: [{ value: 1 }, { value: 3 }, { value: 4 }], pointers: [{ index: 2, label: "l2", color: "cyan" }] },
        { type: "linkedlist", label: "merged", nodes: [{ value: "dummy" }, { value: 1 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4, highlight: "success" }] },
      ],
    },
    {
      description:
        "list1 is empty, so attach the rest of list2 (just 4). The merged list is [1,1,2,3,4,4]. Return dummy.next.",
      codeHighlightLines: [14, 15],
      structures: [
        { type: "linkedlist", label: "merged (final)", nodes: [{ value: 1, highlight: "success" }, { value: 1, highlight: "success" }, { value: 2, highlight: "success" }, { value: 3, highlight: "success" }, { value: 4, highlight: "success" }, { value: 4, highlight: "success" }] },
        { type: "variables", entries: [{ name: "return", value: "[1,1,2,3,4,4]", highlight: true }] },
      ],
    },
  ],
};

export default solution;

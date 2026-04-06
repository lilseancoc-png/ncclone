import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Iterative Group Reversal",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def reverseKGroup(head, k):
    dummy = ListNode(0, head)
    prev_group = dummy
    while True:
        kth = prev_group
        for i in range(k):
            kth = kth.next
            if not kth:
                return dummy.next
        next_group = kth.next
        prev, curr = kth.next, prev_group.next
        for i in range(k):
            tmp = curr.next
            curr.next = prev
            prev = curr
            curr = tmp
        tmp = prev_group.next
        prev_group.next = kth
        prev_group = tmp`,
    steps: [
      {
        description:
          "Reverse nodes in groups of k. For each group: find the kth node (if fewer than k remain, stop). Then reverse k nodes in-place and reconnect with the previous and next groups.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "linkedlist",
            label: "linked list",
            nodes: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
          },
          { type: "variables", entries: [{ name: "k", value: 2 }] },
        ],
      },
      {
        description:
          "Group 1: Find kth node = node(2). Reverse nodes 1→2 to get 2→1. Connect: dummy→2→1→(next group). prev_group moves to node(1).",
        codeHighlightLines: [5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17],
        structures: [
          {
            type: "linkedlist",
            label: "list after group 1",
            nodes: [{ value: 2, highlight: "success" }, { value: 1, highlight: "success" }, { value: 3 }, { value: 4 }, { value: 5 }],
          },
          {
            type: "variables",
            entries: [{ name: "prev_group", value: "node(1)", highlight: true }],
          },
        ],
      },
      {
        description:
          "Group 2: kth = node(4). Reverse 3→4 to get 4→3. Connect: ...1→4→3→(next). prev_group = node(3).",
        codeHighlightLines: [5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17],
        structures: [
          {
            type: "linkedlist",
            label: "list after group 2",
            nodes: [{ value: 2 }, { value: 1 }, { value: 4, highlight: "success" }, { value: 3, highlight: "success" }, { value: 5 }],
          },
        ],
      },
      {
        description:
          "Group 3: Only 1 node (5) remains, which is less than k=2. Return as-is. Final list: 2→1→4→3→5. Each node is visited at most twice (once to count, once to reverse), so O(n) time, O(1) space.",
        codeHighlightLines: [7, 8],
        structures: [
          {
            type: "array",
            label: "final result",
            values: [2, 1, 4, 3, 5],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "checked" },
          },
        ],
      },
    ],
  },
];

export default solutions;

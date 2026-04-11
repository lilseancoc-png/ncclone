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
          "Reverse a linked list in groups of k. If fewer than k nodes remain, leave them as-is. This combines three operations per group: (1) count k nodes ahead, (2) reverse the sublist in-place, (3) reconnect with previous and next groups. A dummy node handles the edge case of the first group. List: 1→2→3→4→5, k=2.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "linkedlist",
            label: "original list",
            nodes: [{ value: "d", label: "prev_group" }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
          },
          { type: "variables", entries: [{ name: "k", value: 2 }, { name: "groups", value: "[1,2] [3,4] [5]" }] },
        ],
      },
      {
        description:
          "Group 1 — Find the kth node: advance kth pointer k=2 steps from prev_group (dummy). kth lands on node 2 — this is the tail of group 1. Save next_group = node 3 (start of next group). Now prepare for reversal: prev = next_group (so reversed tail points forward), curr = prev_group.next (node 1, start of group).",
        codeHighlightLines: [5, 6, 7, 8, 10, 11],
        structures: [
          {
            type: "linkedlist",
            label: "group 1 identified",
            nodes: [{ value: "d", label: "prev_group" }, { value: 1, highlight: "active", label: "curr" }, { value: 2, highlight: "active", label: "kth" }, { value: 3, label: "next_group" }, { value: 4 }, { value: 5 }],
          },
          { type: "variables", entries: [{ name: "prev", value: "node 3 (next_group)" }, { name: "curr", value: "node 1" }] },
        ],
      },
      {
        description:
          "Reverse group 1, iteration 1: Save tmp = curr.next (node 2). Point curr.next = prev (node 3). Now node 1 → node 3. Move prev = curr (node 1), curr = tmp (node 2). Iteration 2: Save tmp = curr.next (node 3). Point curr.next = prev (node 1). Now node 2 → node 1 → node 3. Move prev = node 2, curr = node 3. Reversal done — prev points to the new group head (node 2).",
        codeHighlightLines: [12, 13, 14, 15, 16],
        structures: [
          {
            type: "linkedlist",
            label: "after reversing group 1",
            nodes: [{ value: "d", label: "prev_group" }, { value: 2, highlight: "success", label: "prev (new head)" }, { value: 1, highlight: "success" }, { value: 3 }, { value: 4 }, { value: 5 }],
          },
          { type: "variables", entries: [{ name: "node 2.next", value: "→ node 1" }, { name: "node 1.next", value: "→ node 3", highlight: true }] },
        ],
      },
      {
        description:
          "Reconnect group 1: prev_group.next = kth (node 2, new group head). The old head (node 1) is now the group tail. Set prev_group = node 1 (the new tail becomes the connection point for the next group). The list is now: dummy→2→1→3→4→5.",
        codeHighlightLines: [17, 18, 19],
        structures: [
          {
            type: "linkedlist",
            label: "list after group 1",
            nodes: [{ value: "d" }, { value: 2, highlight: "success" }, { value: 1, highlight: "success", label: "prev_group" }, { value: 3 }, { value: 4 }, { value: 5 }],
          },
          { type: "variables", entries: [{ name: "prev_group", value: "node 1 (old head = new tail)" }] },
        ],
      },
      {
        description:
          "Group 2 — Count k=2 from prev_group (node 1): kth = node 4. Same process: prev = node 5, curr = node 3. Reverse: node 3.next = node 5, then node 4.next = node 3. Reconnect: node 1.next = node 4. List: dummy→2→1→4→3→5. prev_group moves to node 3.",
        codeHighlightLines: [5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        structures: [
          {
            type: "linkedlist",
            label: "list after group 2",
            nodes: [{ value: "d" }, { value: 2 }, { value: 1 }, { value: 4, highlight: "success" }, { value: 3, highlight: "success", label: "prev_group" }, { value: 5 }],
          },
          { type: "variables", entries: [{ name: "reversed", value: "[3,4] → [4,3]" }, { name: "prev_group", value: "node 3" }] },
        ],
      },
      {
        description:
          "Group 3: Count k=2 from node 3. After 1 step: kth = node 5. After 2 steps: kth.next is None — only 1 node remains, less than k=2. Return dummy.next immediately (incomplete group stays in original order). Final: 2→1→4→3→5. Time: O(n) — each node visited at most twice (once counting, once reversing). Space: O(1) — only pointer variables.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "linkedlist",
            label: "final result",
            nodes: [{ value: 2, highlight: "success", label: "head" }, { value: 1, highlight: "success" }, { value: 4, highlight: "success" }, { value: 3, highlight: "success" }, { value: 5, highlight: "checked" }],
          },
          { type: "variables", entries: [{ name: "return", value: "2→1→4→3→5", highlight: true }, { name: "node 5", value: "< k nodes, unchanged" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
        ],
      },
    ],
  },
];

export default solutions;

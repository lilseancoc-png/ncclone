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
          "Reverse a linked list in groups of k nodes. If fewer than k nodes remain at the end, leave them as-is. This is one of the hardest linked list problems because it combines three challenges: (1) counting k nodes ahead, (2) reversing a sublist in-place, and (3) reconnecting the reversed group with both the previous group and the next. A dummy node simplifies tracking the connection point. List: 1→2→3→4→5, k=2.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "linkedlist",
            label: "linked list",
            nodes: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
          },
          { type: "variables", entries: [{ name: "k", value: 2 }, { name: "groups", value: "[1,2] [3,4] [5]" }] },
        ],
      },
      {
        description:
          "Group 1 — nodes [1,2]: First, advance kth pointer k=2 steps from prev_group to find node 2 (the group's tail). Save next_group = node 3. Now reverse k nodes: start with prev=next_group (so reversed tail points to the next group), curr=node 1. Iteration 1: 1.next → node 3, prev=1, curr=2. Iteration 2: 2.next → 1, prev=2, curr=3. Now reconnect: prev_group.next = kth (node 2, new group head). The old group head (node 1) becomes the new group tail, so prev_group = node 1.",
        codeHighlightLines: [5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        structures: [
          {
            type: "linkedlist",
            label: "list after group 1",
            nodes: [{ value: 2, highlight: "success", label: "new head" }, { value: 1, highlight: "success", label: "prev_group" }, { value: 3 }, { value: 4 }, { value: 5 }],
          },
          {
            type: "variables",
            entries: [{ name: "reversed", value: "[1,2] → [2,1]" }, { name: "prev_group", value: "node 1 (old head = new tail)", highlight: true }],
          },
        ],
      },
      {
        description:
          "Group 2 — nodes [3,4]: Count k=2 from prev_group (node 1) → kth = node 4. Same process: reverse 3→4 to get 4→3. Reconnect: node 1.next = node 4, and node 3 points to node 5 (next_group). prev_group moves to node 3. Each group reversal is independent — the same 3-step pattern (count, reverse, reconnect) repeats.",
        codeHighlightLines: [5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        structures: [
          {
            type: "linkedlist",
            label: "list after group 2",
            nodes: [{ value: 2 }, { value: 1 }, { value: 4, highlight: "success" }, { value: 3, highlight: "success", label: "prev_group" }, { value: 5 }],
          },
        ],
      },
      {
        description:
          "Group 3: Start counting from node 3. After 1 step we reach node 5, after 2 steps kth.next is null — only 1 node remains, which is less than k=2. Return dummy.next immediately (the incomplete group stays in original order). Final: 2→1→4→3→5. Each node is visited at most twice (once counting, once reversing), so Time: O(n). Space: O(1) — only pointer variables, no recursion or extra data structures.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "linkedlist",
            label: "final result",
            nodes: [{ value: 2, highlight: "success" }, { value: 1, highlight: "success" }, { value: 4, highlight: "success" }, { value: 3, highlight: "success" }, { value: 5, highlight: "checked" }],
          },
          { type: "variables", entries: [{ name: "return", value: "2→1→4→3→5", highlight: true }, { name: "node 5", value: "< k nodes, left as-is" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
        ],
      },
    ],
  },
];

export default solutions;

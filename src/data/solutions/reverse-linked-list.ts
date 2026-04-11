import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Iterative",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev`,
    steps: [
      {
        description:
          "Reverse linked list [1→2→3→4→5]. Three pointers: prev (reversed portion's head), curr (node being processed), next_node (saves the rest before we break the link). Each iteration: save next, reverse curr's pointer, advance both prev and curr.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "linkedlist",
            label: "original list",
            nodes: [
              { value: 1, label: "curr" },
              { value: 2 },
              { value: 3 },
              { value: 4 },
              { value: 5 },
            ],
          },
          { type: "variables", entries: [{ name: "prev", value: "None" }, { name: "curr", value: "node(1)" }] },
        ],
      },
      {
        description:
          "Iteration 1: next_node = node(2). Reverse: 1.next = prev (None). Node 1 is now detached, pointing to nothing. Move prev = node(1), curr = node(2). The reversed portion has one node: [1→None]. The remaining list: [2→3→4→5].",
        codeHighlightLines: [5, 6, 7, 8],
        structures: [
          {
            type: "linkedlist",
            label: "reversed so far",
            nodes: [
              { value: 1, highlight: "success", label: "prev" },
            ],
          },
          {
            type: "linkedlist",
            label: "remaining",
            nodes: [
              { value: 2, highlight: "active", label: "curr" },
              { value: 3 },
              { value: 4 },
              { value: 5 },
            ],
          },
          { type: "variables", entries: [{ name: "1.next =", value: "None (reversed!)", highlight: true }] },
        ],
      },
      {
        description:
          "Iteration 2: next_node = node(3). Reverse: 2.next = prev (node 1). Node 2 now points backward to 1. Move prev = node(2), curr = node(3). Reversed: [2→1→None]. Remaining: [3→4→5].",
        codeHighlightLines: [5, 6, 7, 8],
        structures: [
          {
            type: "linkedlist",
            label: "reversed so far",
            nodes: [
              { value: 2, highlight: "success", label: "prev" },
              { value: 1, highlight: "success" },
            ],
          },
          {
            type: "linkedlist",
            label: "remaining",
            nodes: [
              { value: 3, highlight: "active", label: "curr" },
              { value: 4 },
              { value: 5 },
            ],
          },
          { type: "variables", entries: [{ name: "2.next =", value: "node(1) (reversed!)", highlight: true }] },
        ],
      },
      {
        description:
          "Iteration 3: next_node = node(4). Reverse: 3.next = prev (node 2). Move prev = node(3), curr = node(4). Reversed: [3→2→1→None]. Remaining: [4→5]. Each iteration peels one node off the front of the remaining list and pushes it onto the reversed list.",
        codeHighlightLines: [5, 6, 7, 8],
        structures: [
          {
            type: "linkedlist",
            label: "reversed so far",
            nodes: [
              { value: 3, highlight: "success", label: "prev" },
              { value: 2, highlight: "success" },
              { value: 1, highlight: "success" },
            ],
          },
          {
            type: "linkedlist",
            label: "remaining",
            nodes: [
              { value: 4, highlight: "active", label: "curr" },
              { value: 5 },
            ],
          },
          { type: "variables", entries: [{ name: "3.next =", value: "node(2) (reversed!)", highlight: true }] },
        ],
      },
      {
        description:
          "Iteration 4: next_node = node(5). Reverse: 4.next = prev (node 3). Move prev = node(4), curr = node(5). Reversed: [4→3→2→1→None]. Remaining: [5].",
        codeHighlightLines: [5, 6, 7, 8],
        structures: [
          {
            type: "linkedlist",
            label: "reversed so far",
            nodes: [
              { value: 4, highlight: "success", label: "prev" },
              { value: 3, highlight: "success" },
              { value: 2, highlight: "success" },
              { value: 1, highlight: "success" },
            ],
          },
          {
            type: "linkedlist",
            label: "remaining",
            nodes: [
              { value: 5, highlight: "active", label: "curr" },
            ],
          },
          { type: "variables", entries: [{ name: "4.next =", value: "node(3) (reversed!)", highlight: true }] },
        ],
      },
      {
        description:
          "Iteration 5: next_node = None. Reverse: 5.next = prev (node 4). Move prev = node(5), curr = None. Reversed: [5→4→3→2→1→None]. Remaining: empty. Loop ends because curr is None.",
        codeHighlightLines: [4, 5, 6, 7, 8],
        structures: [
          {
            type: "linkedlist",
            label: "reversed so far",
            nodes: [
              { value: 5, highlight: "success", label: "prev" },
              { value: 4, highlight: "success" },
              { value: 3, highlight: "success" },
              { value: 2, highlight: "success" },
              { value: 1, highlight: "success" },
            ],
          },
          { type: "variables", entries: [{ name: "5.next =", value: "node(4) (reversed!)", highlight: true }, { name: "curr", value: "None → loop ends" }] },
        ],
      },
      {
        description:
          "Return prev = node(5), the new head. Fully reversed: 5→4→3→2→1→None. Each node's pointer was flipped exactly once. Time: O(n) — single pass. Space: O(1) — only three pointer variables regardless of list size.",
        codeHighlightLines: [9],
        structures: [
          {
            type: "linkedlist",
            label: "reversed list",
            nodes: [
              { value: 5, highlight: "success", label: "head" },
              { value: 4, highlight: "success" },
              { value: 3, highlight: "success" },
              { value: 2, highlight: "success" },
              { value: 1, highlight: "success" },
            ],
          },
          { type: "variables", entries: [{ name: "return", value: "5→4→3→2→1→None", highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
        ],
      },
    ],
  },
  {
    label: "Recursive",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: `def reverse_list(head):
    if not head or not head.next:
        return head
    new_head = reverse_list(head.next)
    head.next.next = head
    head.next = None
    return new_head`,
    steps: [
      {
        description:
          "Recursive approach: recurse to the end of the list, then reverse links as the recursion unwinds. The key trick: head.next.next = head makes the next node point BACK to the current node. Then head.next = None breaks the forward link. List: [1→2→3→4→5].",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          {
            type: "linkedlist",
            label: "original list",
            nodes: [
              { value: 1, label: "head" },
              { value: 2 },
              { value: 3 },
              { value: 4 },
              { value: 5 },
            ],
          },
          { type: "stack", label: "call stack", values: ["rev(1)"] },
        ],
      },
      {
        description:
          "Recurse: rev(1)→rev(2)→rev(3)→rev(4)→rev(5). Node 5 has no next → base case! Return node 5 as new_head. This will be the head of the reversed list, passed all the way back up.",
        codeHighlightLines: [2, 3, 4],
        structures: [
          {
            type: "linkedlist",
            label: "at base case",
            nodes: [
              { value: 1 },
              { value: 2 },
              { value: 3 },
              { value: 4 },
              { value: 5, highlight: "active", label: "base case → new_head" },
            ],
          },
          { type: "stack", label: "call stack", values: ["rev(1)", "rev(2)", "rev(3)", "rev(4)", "rev(5)"], topHighlight: true },
        ],
      },
      {
        description:
          "Unwinding at node 4: head=4, head.next=5. Execute: head.next.next = head → 5.next = 4. Then head.next = None → 4.next = None. Result: 5→4→None. Node 5 now points back to 4, and 4's forward link is broken.",
        codeHighlightLines: [5, 6],
        structures: [
          {
            type: "linkedlist",
            label: "reversed portion",
            nodes: [
              { value: 5, highlight: "success" },
              { value: 4, highlight: "success" },
            ],
          },
          {
            type: "linkedlist",
            label: "remaining (still forward)",
            nodes: [
              { value: 1 },
              { value: 2 },
              { value: 3 },
            ],
          },
          { type: "variables", entries: [{ name: "5.next = 4", value: "reversed!", highlight: true }, { name: "4.next = None", value: "forward link broken" }] },
        ],
      },
      {
        description:
          "Unwinding at node 3: head.next.next = head → 4.next = 3. head.next = None → 3.next = None. Reversed: 5→4→3→None. At node 2: 3.next = 2, 2.next = None. Reversed: 5→4→3→2→None.",
        codeHighlightLines: [5, 6],
        structures: [
          {
            type: "linkedlist",
            label: "reversed portion (growing)",
            nodes: [
              { value: 5, highlight: "success" },
              { value: 4, highlight: "success" },
              { value: 3, highlight: "success" },
              { value: 2, highlight: "success" },
            ],
          },
          {
            type: "linkedlist",
            label: "remaining",
            nodes: [
              { value: 1 },
            ],
          },
          { type: "stack", label: "call stack", values: ["rev(1)"], topHighlight: true },
        ],
      },
      {
        description:
          "Unwinding at node 1: head.next.next = head → 2.next = 1. head.next = None → 1.next = None. Reversed: 5→4→3→2→1→None. Stack empty. Return new_head = node(5). Time: O(n). Space: O(n) for the call stack — each recursive call uses a stack frame.",
        codeHighlightLines: [5, 6, 7],
        structures: [
          {
            type: "linkedlist",
            label: "fully reversed",
            nodes: [
              { value: 5, highlight: "success", label: "new_head" },
              { value: 4, highlight: "success" },
              { value: 3, highlight: "success" },
              { value: 2, highlight: "success" },
              { value: 1, highlight: "success" },
            ],
          },
          { type: "variables", entries: [{ name: "return", value: "5→4→3→2→1→None", highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(n) call stack" }] },
        ],
      },
    ],
  },
];

export default solutions;

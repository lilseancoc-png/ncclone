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
          "Reverse linked list [1→2→3→4→5]. Use three pointers: prev, curr, next_node. At each step, reverse the current node's pointer, then advance all three.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "linkedlist",
            label: "linked list",
            nodes: [
              { value: 1, label: "curr" },
              { value: 2 },
              { value: 3 },
              { value: 4 },
              { value: 5 },
            ],
          },
          { type: "variables", entries: [{ name: "prev", value: "None" }, { name: "curr", value: 1 }] },
        ],
      },
      {
        description:
          "Save next_node = 2. Point curr(1).next to prev(None). Node 1 now points backward. Move prev=1, curr=2.",
        codeHighlightLines: [5, 6, 7, 8],
        structures: [
          {
            type: "linkedlist",
            label: "reversing...",
            nodes: [
              { value: 1, highlight: "success", label: "prev" },
              { value: 2, highlight: "active", label: "curr" },
              { value: 3 },
              { value: 4 },
              { value: 5 },
            ],
          },
          { type: "variables", entries: [{ name: "1.next →", value: "None (reversed)", highlight: true }] },
        ],
      },
      {
        description:
          "Save next_node=3. Point 2.next to prev(1). Now: None←1←2. Move prev=2, curr=3.",
        codeHighlightLines: [5, 6, 7, 8],
        structures: [
          {
            type: "linkedlist",
            label: "reversing...",
            nodes: [
              { value: 1, highlight: "success" },
              { value: 2, highlight: "success", label: "prev" },
              { value: 3, highlight: "active", label: "curr" },
              { value: 4 },
              { value: 5 },
            ],
          },
          { type: "variables", entries: [{ name: "2.next →", value: "1 (reversed)", highlight: true }] },
        ],
      },
      {
        description:
          "Continue: reverse 3→2, then 4→3, then 5→4. After processing node 5, curr becomes None.",
        codeHighlightLines: [4, 5, 6, 7, 8],
        structures: [
          {
            type: "linkedlist",
            label: "reversing...",
            nodes: [
              { value: 1, highlight: "success" },
              { value: 2, highlight: "success" },
              { value: 3, highlight: "success" },
              { value: 4, highlight: "success" },
              { value: 5, highlight: "active", label: "prev" },
            ],
          },
          { type: "variables", entries: [{ name: "curr", value: "None" }] },
        ],
      },
      {
        description:
          "curr is None — loop ends. Return prev (5), the new head. Reversed: 5→4→3→2→1→None. Time: O(n), Space: O(1).",
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
          { type: "variables", entries: [{ name: "return", value: "node(5)", highlight: true }] },
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
          "Recursive approach: trust that reverse_list(head.next) reverses the rest. Then fix the link between head and head.next.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "linkedlist",
            label: "linked list",
            nodes: [
              { value: 1, label: "head" },
              { value: 2 },
              { value: 3 },
              { value: 4 },
              { value: 5 },
            ],
          },
        ],
      },
      {
        description:
          "Recurse down to the base case: node 5 has no next → return 5 as new_head. Now unwind.",
        codeHighlightLines: [2, 3, 4],
        structures: [
          {
            type: "linkedlist",
            label: "recursing to end",
            nodes: [
              { value: 1 },
              { value: 2 },
              { value: 3 },
              { value: 4 },
              { value: 5, highlight: "active", label: "base case" },
            ],
          },
          { type: "stack", label: "call stack", values: ["rev(1)", "rev(2)", "rev(3)", "rev(4)", "rev(5)"], topHighlight: true },
        ],
      },
      {
        description:
          "Unwinding at node 4: head.next.next = head → 5.next = 4. head.next = None → 4.next = None. Chain: 5→4→None.",
        codeHighlightLines: [5, 6],
        structures: [
          {
            type: "linkedlist",
            label: "unwinding...",
            nodes: [
              { value: 1 },
              { value: 2 },
              { value: 3 },
              { value: 4, highlight: "active" },
              { value: 5, highlight: "success" },
            ],
          },
          { type: "variables", entries: [{ name: "5.next = 4", value: "reversed!", highlight: true }] },
        ],
      },
      {
        description:
          "Continue unwinding: 4.next=3, 3.next=2, 2.next=1, 1.next=None. All links reversed.",
        codeHighlightLines: [5, 6],
        structures: [
          {
            type: "linkedlist",
            label: "unwinding complete",
            nodes: [
              { value: 1, highlight: "active" },
              { value: 2, highlight: "success" },
              { value: 3, highlight: "success" },
              { value: 4, highlight: "success" },
              { value: 5, highlight: "success" },
            ],
          },
          { type: "stack", label: "call stack", values: ["rev(1)"], topHighlight: true },
        ],
      },
      {
        description:
          "Return new_head = 5. List reversed: 5→4→3→2→1→None. Time: O(n). Space: O(n) for call stack.",
        codeHighlightLines: [7],
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
          { type: "variables", entries: [{ name: "return", value: "node(5)", highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

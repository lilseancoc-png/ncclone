import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  // -- Approach 1: Iterative ------------------------------------------------
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
          "Reverse linked list [1->2->3->4->5]. The iterative approach uses three pointers: prev (what the current node should point to), curr (the node we're processing), and next_node (saves the next node before we break the link). O(1) extra space -- just pointer variables.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "linkedlist", label: "linked list", nodes: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }], pointers: [{ index: 0, label: "curr" }] },
          { type: "variables", entries: [{ name: "prev", value: "None" }, { name: "curr", value: 1 }] },
        ],
      },
      {
        description:
          "Save next_node = curr.next (2), so we don't lose the rest of the list. Then point curr.next to prev (None). Node 1 now points backwards to None instead of forward to 2.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "linkedlist", label: "list", nodes: [{ value: 1, highlight: "active" }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }], pointers: [{ index: 0, label: "curr" }, { index: 1, label: "next" }] },
          { type: "variables", entries: [{ name: "prev", value: "None" }, { name: "curr.next", value: "None", highlight: true }] },
        ],
      },
      {
        description:
          "Move prev to curr (1), curr to next_node (2). We've reversed one link: None<-1. Now process node 2.",
        codeHighlightLines: [7, 8],
        structures: [
          { type: "linkedlist", label: "list", nodes: [{ value: 1, highlight: "success" }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }], pointers: [{ index: 0, label: "prev" }, { index: 1, label: "curr" }] },
          { type: "variables", entries: [{ name: "prev", value: 1 }, { name: "curr", value: 2 }] },
        ],
      },
      {
        description:
          "Save next_node=3. Point curr(2).next to prev(1). The link 2->1 is formed. Chain so far: None<-1<-2.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "linkedlist", label: "list", nodes: [{ value: 1, highlight: "success" }, { value: 2, highlight: "active" }, { value: 3 }, { value: 4 }, { value: 5 }], pointers: [{ index: 1, label: "curr" }, { index: 2, label: "next" }] },
          { type: "variables", entries: [{ name: "curr.next", value: 1, highlight: true }] },
        ],
      },
      {
        description:
          "Move prev to 2, curr to 3. Continue the same pattern for nodes 3, 4, 5.",
        codeHighlightLines: [7, 8],
        structures: [
          { type: "linkedlist", label: "list", nodes: [{ value: 1, highlight: "success" }, { value: 2, highlight: "success" }, { value: 3 }, { value: 4 }, { value: 5 }], pointers: [{ index: 1, label: "prev" }, { index: 2, label: "curr" }] },
          { type: "variables", entries: [{ name: "prev", value: 2 }, { name: "curr", value: 3 }] },
        ],
      },
      {
        description:
          "Process node 3: save next=4, point 3->2. Process node 4: save next=5, point 4->3. Process node 5: save next=None, point 5->4. Chain: None<-1<-2<-3<-4<-5.",
        codeHighlightLines: [4, 5, 6, 7, 8],
        structures: [
          { type: "linkedlist", label: "list", nodes: [{ value: 1, highlight: "success" }, { value: 2, highlight: "success" }, { value: 3, highlight: "success" }, { value: 4, highlight: "success" }, { value: 5, highlight: "active" }], pointers: [{ index: 4, label: "curr" }] },
          { type: "variables", entries: [{ name: "prev", value: 4 }, { name: "curr.next", value: 4, highlight: true }] },
        ],
      },
      {
        description:
          "curr is now None -- loop ends. Return prev (node 5), which is the new head. The list is fully reversed: 5->4->3->2->1->None. Time: O(n) -- one pass. Space: O(1) -- only pointer variables.",
        codeHighlightLines: [9],
        structures: [
          { type: "linkedlist", label: "reversed list", nodes: [{ value: 5, highlight: "success" }, { value: 4, highlight: "success" }, { value: 3, highlight: "success" }, { value: 2, highlight: "success" }, { value: 1, highlight: "success" }] },
          { type: "variables", entries: [{ name: "return", value: "node(5)", highlight: true }] },
        ],
      },
    ],
  },

  // -- Approach 2: Recursive ------------------------------------------------
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
          "The recursive approach: trust that reverse_list(head.next) correctly reverses the rest of the list and returns the new head. Then we just need to fix the link between head and head.next. Elegant but uses O(n) stack space for the recursion.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "linkedlist", label: "linked list", nodes: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }] },
          { type: "variables", entries: [{ name: "head", value: 1 }] },
        ],
      },
      {
        description:
          "Recurse: reverse_list(1) calls reverse_list(2), which calls reverse_list(3), which calls reverse_list(4), which calls reverse_list(5). Node 5 has no next -- base case! Return 5 as the new head.",
        codeHighlightLines: [2, 3, 4],
        structures: [
          { type: "stack", label: "call stack", values: ["reverse(1)", "reverse(2)", "reverse(3)", "reverse(4)", "reverse(5)"], topHighlight: true },
          { type: "variables", entries: [{ name: "base case", value: "node 5", highlight: true }] },
        ],
      },
      {
        description:
          "Unwinding: back in reverse_list(4). new_head=5. head.next.next = head means 5.next = 4. Then head.next = None detaches 4->5. Now: 5->4->None, and 3 still points to 4.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "linkedlist", label: "progress", nodes: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4, highlight: "active" }, { value: 5, highlight: "success" }] },
          { type: "stack", label: "call stack", values: ["reverse(1)", "reverse(2)", "reverse(3)", "reverse(4)"], topHighlight: true },
          { type: "variables", entries: [{ name: "head", value: 4 }, { name: "5.next = 4", value: "reversed!", highlight: true }] },
        ],
      },
      {
        description:
          "Back in reverse_list(3). 4.next.next = 3 means 4.next = 3. Then 3.next = None. Now: 5->4->3->None.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "linkedlist", label: "progress", nodes: [{ value: 1 }, { value: 2 }, { value: 3, highlight: "active" }, { value: 4, highlight: "success" }, { value: 5, highlight: "success" }] },
          { type: "stack", label: "call stack", values: ["reverse(1)", "reverse(2)", "reverse(3)"], topHighlight: true },
          { type: "variables", entries: [{ name: "head", value: 3 }, { name: "4.next = 3", value: "reversed!", highlight: true }] },
        ],
      },
      {
        description:
          "Back in reverse_list(2). 3.next = 2, then 2.next = None. Now: 5->4->3->2->None. Back in reverse_list(1). 2.next = 1, then 1.next = None. Final: 5->4->3->2->1->None.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "linkedlist", label: "progress", nodes: [{ value: 1, highlight: "active" }, { value: 2, highlight: "success" }, { value: 3, highlight: "success" }, { value: 4, highlight: "success" }, { value: 5, highlight: "success" }] },
          { type: "stack", label: "call stack", values: ["reverse(1)"], topHighlight: true },
          { type: "variables", entries: [{ name: "head", value: 1 }, { name: "2.next = 1", value: "reversed!", highlight: true }] },
        ],
      },
      {
        description:
          "Return new_head = 5. List is fully reversed: 5->4->3->2->1->None. Time: O(n) -- one recursive call per node. Space: O(n) for the call stack. The iterative approach is usually preferred for O(1) space, but this is more elegant and easier to reason about.",
        codeHighlightLines: [7],
        structures: [
          { type: "linkedlist", label: "reversed list", nodes: [{ value: 5, highlight: "success" }, { value: 4, highlight: "success" }, { value: 3, highlight: "success" }, { value: 2, highlight: "success" }, { value: 1, highlight: "success" }] },
          { type: "variables", entries: [{ name: "return new_head", value: "node(5)", highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

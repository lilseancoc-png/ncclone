import { SolutionData } from "../types";

const solution: SolutionData = {
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
      description: "Reverse linked list [1→2→3→4→5]. Use three pointers: prev, curr, and next_node.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "linked list", values: [1, 2, 3, 4, 5], pointers: [{ index: 0, label: "curr" }] },
        { type: "variables", entries: [{ name: "prev", value: "None" }, { name: "curr", value: 1 }] },
      ],
    },
    {
      description: "Save next_node = curr.next (2). Point curr.next to prev (None). Now node 1 points to None.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "list", values: [1, 2, 3, 4, 5], highlights: { 0: "active" }, pointers: [{ index: 0, label: "curr" }, { index: 1, label: "next" }] },
        { type: "variables", entries: [{ name: "prev", value: "None" }, { name: "curr.next", value: "None", highlight: true }] },
      ],
    },
    {
      description: "Move prev to curr (1), curr to next_node (2).",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "list", values: [1, 2, 3, 4, 5], highlights: { 0: "success" }, pointers: [{ index: 0, label: "prev" }, { index: 1, label: "curr" }] },
        { type: "variables", entries: [{ name: "prev", value: 1 }, { name: "curr", value: 2 }] },
      ],
    },
    {
      description: "Point curr(2).next to prev(1). The link 2→1 is formed.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "list", values: [1, 2, 3, 4, 5], highlights: { 0: "success", 1: "active" }, pointers: [{ index: 1, label: "curr" }, { index: 2, label: "next" }] },
        { type: "variables", entries: [{ name: "curr.next", value: 1, highlight: true }] },
      ],
    },
    {
      description: "Move prev to 2, curr to 3. Continue the process...",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "list", values: [1, 2, 3, 4, 5], highlights: { 0: "success", 1: "success" }, pointers: [{ index: 1, label: "prev" }, { index: 2, label: "curr" }] },
        { type: "variables", entries: [{ name: "prev", value: 2 }, { name: "curr", value: 3 }] },
      ],
    },
    {
      description: "After processing all nodes: 5→4→3→2→1→None. curr is now None, loop ends.",
      codeHighlightLines: [4],
      structures: [
        { type: "array", label: "reversed list", values: [5, 4, 3, 2, 1], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "prev", value: 5 }, { name: "curr", value: "None" }] },
      ],
    },
    {
      description: "Return prev, which is the new head (5). The list is now fully reversed!",
      codeHighlightLines: [9],
      structures: [
        { type: "array", label: "reversed list", values: [5, 4, 3, 2, 1], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "return", value: "node(5)", highlight: true }] },
      ],
    },
  ],
};

export default solution;

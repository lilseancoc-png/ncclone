import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Hash Map — Two Pass",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: `def copyRandomList(head):
    if not head:
        return None
    old_to_new = {}
    curr = head
    while curr:
        old_to_new[curr] = Node(curr.val)
        curr = curr.next
    curr = head
    while curr:
        old_to_new[curr].next = old_to_new.get(curr.next)
        old_to_new[curr].random = old_to_new.get(curr.random)
        curr = curr.next
    return old_to_new[head]`,
    steps: [
      {
        description:
          "Deep copy a linked list where each node has both a next pointer and a random pointer. First pass: create all new nodes in a hash map. Second pass: wire up next and random pointers.",
        codeHighlightLines: [1, 4, 5],
        structures: [
          {
            type: "linkedlist",
            label: "original list",
            nodes: [
              { value: 7, label: "head" },
              { value: 13 },
              { value: 11 },
              { value: 10 },
              { value: 1 },
            ],
          },
          { type: "hashmap", label: "old_to_new", entries: [] },
        ],
      },
      {
        description:
          "First pass: Create a new node for each original node and store the mapping. We now have all copy nodes but they aren't connected yet.",
        codeHighlightLines: [6, 7, 8],
        structures: [
          {
            type: "linkedlist",
            label: "original (traversed)",
            nodes: [
              { value: 7, highlight: "checked" },
              { value: 13, highlight: "checked" },
              { value: 11, highlight: "checked" },
              { value: 10, highlight: "checked" },
              { value: 1, highlight: "checked" },
            ],
          },
          {
            type: "hashmap",
            label: "old_to_new",
            entries: [
              ["Node(7)", "Copy(7)"],
              ["Node(13)", "Copy(13)"],
              ["Node(11)", "Copy(11)"],
              ["Node(10)", "Copy(10)"],
              ["Node(1)", "Copy(1)"],
            ],
            highlightKeys: ["Node(7)", "Node(13)", "Node(11)", "Node(10)", "Node(1)"],
          },
        ],
      },
      {
        description:
          "Second pass: Wire the copy's next and random pointers using the map. E.g., Node(13).random = Node(7), so Copy(13).random = old_to_new[Node(7)] = Copy(7).",
        codeHighlightLines: [9, 10, 11, 12, 13],
        structures: [
          {
            type: "linkedlist",
            label: "copy list (wired)",
            nodes: [
              { value: 7, highlight: "success" },
              { value: 13, highlight: "success" },
              { value: 11, highlight: "success" },
              { value: 10, highlight: "success" },
              { value: 1, highlight: "success" },
            ],
          },
          {
            type: "variables",
            entries: [
              { name: "Copy(13).next", value: "Copy(11)", highlight: true },
              { name: "Copy(13).random", value: "Copy(7)", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Return old_to_new[head] — the copy of the head node. All next and random pointers are correctly wired. O(n) time and space.",
        codeHighlightLines: [14],
        structures: [
          {
            type: "variables",
            entries: [{ name: "return", value: "Deep copy of linked list", highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

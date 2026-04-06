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
          "Deep copy a linked list where each node has both a next pointer and a random pointer. Challenge: random pointers reference arbitrary nodes. Solution: First pass creates all new nodes in a hash map. Second pass wires up next and random pointers.",
        codeHighlightLines: [1, 4, 5],
        structures: [
          {
            type: "array",
            label: "original list values",
            values: [7, 13, 11, 10, 1],
            highlights: {},
          },
          { type: "hashmap", label: "old_to_new", entries: [] },
        ],
      },
      {
        description:
          "First pass: Create a new node for each original node and store the mapping in old_to_new. We now have all copy nodes but they aren't connected yet.",
        codeHighlightLines: [6, 7, 8],
        structures: [
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
          "Second pass: For each original node, look up its next and random in the map to wire the copy. E.g., Node(13).random = Node(7), so Copy(13).random = old_to_new[Node(7)] = Copy(7).",
        codeHighlightLines: [9, 10, 11, 12, 13],
        structures: [
          {
            type: "array",
            label: "copy list",
            values: [7, 13, 11, 10, 1],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" },
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
          "Return old_to_new[head] — the copy of the head node. All next and random pointers are correctly wired. The hash map gives O(1) lookup per node, making this O(n) time and space.",
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

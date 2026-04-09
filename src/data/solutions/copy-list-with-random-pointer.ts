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
          "Deep copy a linked list where each node has a next pointer AND a random pointer that can point to any node (or null). The challenge: when we clone node A, A's random pointer might reference node C — but we might not have cloned C yet! Solution: two passes. Pass 1: create all clone nodes and store them in a hash map {original → clone}. Pass 2: wire up next and random pointers using the map. List: 7→13→11→10→1.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "linkedlist",
            label: "original list (with random pointers)",
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
          "Pass 1: Traverse the list and create a clone of each node (just the value, no pointers yet). Store each mapping in the hashmap. After this pass, we have 5 disconnected clone nodes. The hashmap lets us find any clone in O(1) — this is key for wiring random pointers in pass 2.",
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
          "Pass 2: Traverse again and wire pointers. For each original node, set its clone's next and random using the hashmap. Example: original Node(13).next = Node(11), so Copy(13).next = old_to_new[Node(11)] = Copy(11). Original Node(13).random = Node(7), so Copy(13).random = old_to_new[Node(7)] = Copy(7). The hashmap lookup is O(1), making this entire pass O(n).",
        codeHighlightLines: [9, 10, 11, 12, 13],
        structures: [
          {
            type: "linkedlist",
            label: "copy list (fully wired)",
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
              { name: "Copy(13).next", value: "Copy(11)" },
              { name: "Copy(13).random", value: "Copy(7)", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Return old_to_new[head] — the clone of the head node, which is the entry point to our fully copied list. Every next and random pointer in the copy references other copy nodes (never the originals). Time: O(n) — two linear passes. Space: O(n) for the hashmap storing n node mappings. This same two-pass-with-hashmap pattern works for any 'deep copy a graph structure' problem (see also: Clone Graph).",
        codeHighlightLines: [14],
        structures: [
          {
            type: "variables",
            entries: [{ name: "return", value: "Copy(7) — head of deep copy", highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(n)" }],
          },
        ],
      },
    ],
  },
];

export default solutions;

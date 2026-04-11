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
          "Deep copy a linked list where each node has a next pointer AND a random pointer that can point to any node (or null). The challenge: when cloning node A, A's random might point to node C which hasn't been cloned yet. We can't wire pointers during creation. Solution: two passes. Pass 1 creates all clones. Pass 2 wires all pointers. List: 7→13→11→10→1. Random pointers: 7→null, 13→7, 11→1, 10→11, 1→7.",
        codeHighlightLines: [1, 2, 3, 4],
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
          { type: "variables", entries: [{ name: "random pointers", value: "7→null, 13→7, 11→1, 10→11, 1→7" }, { name: "problem", value: "can't wire random before all clones exist" }] },
        ],
      },
      {
        description:
          "Pass 1: Traverse and create a clone of each node (value only, no pointers). Store each mapping in old_to_new. curr=7: create Copy(7), map Node(7)→Copy(7). curr=13: create Copy(13). curr=11: create Copy(11). curr=10: create Copy(10). curr=1: create Copy(1). Now all 5 clones exist as disconnected nodes.",
        codeHighlightLines: [5, 6, 7, 8],
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
            entries: [["Node(7)", "Copy(7)"], ["Node(13)", "Copy(13)"], ["Node(11)", "Copy(11)"], ["Node(10)", "Copy(10)"], ["Node(1)", "Copy(1)"]],
            highlightKeys: ["Node(7)", "Node(13)", "Node(11)", "Node(10)", "Node(1)"],
          },
        ],
      },
      {
        description:
          "Pass 2, node 7: Copy(7).next = old_to_new[Node(13)] = Copy(13). Copy(7).random = old_to_new.get(null) = null. Node 13: Copy(13).next = Copy(11). Copy(13).random = old_to_new[Node(7)] = Copy(7). The hashmap lookup is O(1) — this is why we built the map first.",
        codeHighlightLines: [9, 10, 11, 12],
        structures: [
          {
            type: "linkedlist",
            label: "copy list (wiring in progress)",
            nodes: [
              { value: 7, highlight: "success" },
              { value: 13, highlight: "success" },
              { value: 11 },
              { value: 10 },
              { value: 1 },
            ],
          },
          { type: "variables", entries: [{ name: "Copy(7).next", value: "Copy(13) ✓" }, { name: "Copy(7).random", value: "null ✓" }, { name: "Copy(13).next", value: "Copy(11) ✓" }, { name: "Copy(13).random", value: "Copy(7) ✓", highlight: true }] },
        ],
      },
      {
        description:
          "Continue wiring. Node 11: Copy(11).next = Copy(10). Copy(11).random = old_to_new[Node(1)] = Copy(1). Node 10: Copy(10).next = Copy(1). Copy(10).random = Copy(11). Node 1: Copy(1).next = null. Copy(1).random = Copy(7). Every random pointer now references a COPY node, never an original.",
        codeHighlightLines: [10, 11, 12, 13],
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
          { type: "variables", entries: [{ name: "Copy(11).random", value: "Copy(1) ✓" }, { name: "Copy(10).random", value: "Copy(11) ✓" }, { name: "Copy(1).random", value: "Copy(7) ✓", highlight: true }] },
        ],
      },
      {
        description:
          "Return old_to_new[head] = Copy(7). The deep copy is complete — every next and random pointer in the copy references other copy nodes. The original list is untouched. Time: O(n) — two linear passes. Space: O(n) for the hashmap. This two-pass pattern (create nodes, then wire pointers) generalizes to any graph cloning problem (Clone Graph uses the same idea with a DFS/BFS pass).",
        codeHighlightLines: [14],
        structures: [
          { type: "variables", entries: [{ name: "return", value: "Copy(7) — head of deep copy", highlight: true }, { name: "all randoms wired", value: "copy nodes only, never originals" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def hasCycle(head):
    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
  steps: [
    {
      description:
        "Detect a cycle using Floyd's algorithm. Use slow (1 step) and fast (2 steps) pointers. List: 3->2->0->-4->2 (cycle back to index 1).",
      codeHighlightLines: [1, 2, 3],
      structures: [
        {
          type: "linkedlist", label: "linked list",
          nodes: [{ value: 3 }, { value: 2 }, { value: 0 }, { value: -4 }],
          pointers: [
            { index: 0, label: "slow", color: "purple" },
            { index: 0, label: "fast", color: "cyan" },
          ],
          cycleIndex: 1,
        },
        { type: "variables", entries: [{ name: "cycle target", value: "index 1 (value 2)" }] },
      ],
    },
    {
      description:
        "Step 1: slow moves to index 1 (value 2). fast moves 2 steps to index 2 (value 0). They haven't met.",
      codeHighlightLines: [5, 6, 7],
      structures: [
        {
          type: "linkedlist", label: "linked list",
          nodes: [{ value: 3 }, { value: 2, highlight: "pointer-i" }, { value: 0, highlight: "pointer-j" }, { value: -4 }],
          pointers: [
            { index: 1, label: "slow", color: "purple" },
            { index: 2, label: "fast", color: "cyan" },
          ],
          cycleIndex: 1,
        },
        { type: "variables", entries: [{ name: "slow == fast?", value: false }] },
      ],
    },
    {
      description:
        "Step 2: slow moves to index 2 (value 0). fast moves 2 steps: index 3 (-4) then cycles back to index 1 (value 2).",
      codeHighlightLines: [5, 6, 7],
      structures: [
        {
          type: "linkedlist", label: "linked list",
          nodes: [{ value: 3 }, { value: 2, highlight: "pointer-j" }, { value: 0, highlight: "pointer-i" }, { value: -4 }],
          pointers: [
            { index: 2, label: "slow", color: "purple" },
            { index: 1, label: "fast", color: "cyan" },
          ],
          cycleIndex: 1,
        },
        { type: "variables", entries: [{ name: "slow == fast?", value: false }] },
      ],
    },
    {
      description:
        "Step 3: slow moves to index 3 (value -4). fast moves 2 steps from index 1: to index 2, then index 3. Both are at index 3!",
      codeHighlightLines: [5, 6, 7],
      structures: [
        {
          type: "linkedlist", label: "linked list",
          nodes: [{ value: 3 }, { value: 2 }, { value: 0 }, { value: -4, highlight: "found" }],
          pointers: [
            { index: 3, label: "slow", color: "purple" },
            { index: 3, label: "fast", color: "cyan" },
          ],
          cycleIndex: 1,
        },
        { type: "variables", entries: [{ name: "slow == fast?", value: true, highlight: true }] },
      ],
    },
    {
      description:
        "slow == fast! The pointers met, which means there is a cycle. Return True.",
      codeHighlightLines: [8, 9],
      structures: [
        {
          type: "linkedlist", label: "linked list",
          nodes: [{ value: 3 }, { value: 2 }, { value: 0 }, { value: -4, highlight: "success" }],
          pointers: [
            { index: 3, label: "slow=fast", color: "green" },
          ],
          cycleIndex: 1,
        },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
      ],
    },
    {
      description:
        "Key insight: if there is no cycle, fast reaches the end (None) and we return False. If there IS a cycle, fast laps slow and they eventually meet.",
      codeHighlightLines: [5, 10],
      structures: [
        {
          type: "linkedlist", label: "linked list",
          nodes: [{ value: 3 }, { value: 2, highlight: "success" }, { value: 0, highlight: "success" }, { value: -4, highlight: "success" }],
          cycleIndex: 1,
        },
        { type: "variables", entries: [
          { name: "Time", value: "O(n)" },
          { name: "Space", value: "O(1)" },
        ] },
      ],
    },
  ],
};

export default solution;

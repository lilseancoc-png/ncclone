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
        "Detect a cycle using Floyd's algorithm. slow moves 1 step, fast moves 2 steps. List: 3→2→0→-4→(back to 2).",
      codeHighlightLines: [1, 2, 3],
      structures: [
        {
          type: "linkedlist",
          label: "linked list (cycle at index 1)",
          nodes: [
            { value: 3, label: "slow/fast" },
            { value: 2 },
            { value: 0 },
            { value: -4 },
          ],
          cycle: 1,
        },
      ],
    },
    {
      description:
        "Step 1: slow → index 1 (val 2). fast → index 2 (val 0). They haven't met yet.",
      codeHighlightLines: [5, 6, 7],
      structures: [
        {
          type: "linkedlist",
          label: "linked list",
          nodes: [
            { value: 3 },
            { value: 2, highlight: "active", label: "slow" },
            { value: 0, highlight: "checked", label: "fast" },
            { value: -4 },
          ],
          cycle: 1,
        },
        { type: "variables", entries: [{ name: "slow == fast?", value: false }] },
      ],
    },
    {
      description:
        "Step 2: slow → index 2 (val 0). fast goes to index 3 (-4), then cycles back to index 1 (val 2).",
      codeHighlightLines: [5, 6, 7],
      structures: [
        {
          type: "linkedlist",
          label: "linked list",
          nodes: [
            { value: 3 },
            { value: 2, highlight: "checked", label: "fast" },
            { value: 0, highlight: "active", label: "slow" },
            { value: -4 },
          ],
          cycle: 1,
        },
        { type: "variables", entries: [{ name: "slow == fast?", value: false }] },
      ],
    },
    {
      description:
        "Step 3: slow → index 3 (-4). fast goes from index 1→2→3. Both at index 3! They met!",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        {
          type: "linkedlist",
          label: "linked list — pointers met!",
          nodes: [
            { value: 3 },
            { value: 2 },
            { value: 0 },
            { value: -4, highlight: "found", label: "slow=fast" },
          ],
          cycle: 1,
        },
        { type: "variables", entries: [{ name: "slow == fast?", value: true, highlight: true }] },
      ],
    },
    {
      description:
        "Return True — cycle detected! If no cycle existed, fast would reach None and we'd return False. Time: O(n), Space: O(1).",
      codeHighlightLines: [8, 9],
      structures: [
        {
          type: "linkedlist",
          label: "cycle confirmed",
          nodes: [
            { value: 3, highlight: "success" },
            { value: 2, highlight: "success" },
            { value: 0, highlight: "success" },
            { value: -4, highlight: "success" },
          ],
          cycle: 1,
        },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
      ],
    },
  ],
};

export default solution;

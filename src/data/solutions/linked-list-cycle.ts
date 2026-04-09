import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Floyd's Cycle Detection",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
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
        "We need to detect if a linked list has a cycle — where some node's next pointer loops back to a previous node, creating an infinite loop. The naive approach uses a hash set to track visited nodes (O(n) space). Floyd's algorithm does it in O(1) space using two pointers: 'slow' moves 1 step at a time, 'fast' moves 2 steps. If there's a cycle, fast will eventually lap slow and they'll meet. If there's no cycle, fast reaches the end. List: 3→2→0→-4→(back to 2).",
      codeHighlightLines: [1, 2, 3],
      structures: [
        {
          type: "linkedlist",
          label: "linked list (cycle at index 1)",
          nodes: [
            { value: 3, label: "slow/fast", highlight: "active" },
            { value: 2 },
            { value: 0 },
            { value: -4 },
          ],
          cycle: 1,
        },
        { type: "variables", entries: [{ name: "slow", value: "node 3" }, { name: "fast", value: "node 3" }] },
      ],
    },
    {
      description:
        "Step 1: slow moves one step to node 2 (index 1). fast moves two steps: first to node 2, then to node 0 (index 2). They're at different positions — no meeting yet. Think of it like two runners on a circular track: the faster one will eventually catch up to the slower one.",
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
        { type: "variables", entries: [{ name: "slow", value: "node 2 (idx 1)" }, { name: "fast", value: "node 0 (idx 2)" }, { name: "slow == fast?", value: false }] },
      ],
    },
    {
      description:
        "Step 2: slow moves to node 0 (index 2). fast moves two steps: from node 0 to node -4 (index 3), then follows the cycle back to node 2 (index 1). Slow is at index 2, fast is at index 1 — still different positions.",
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
        { type: "variables", entries: [{ name: "slow", value: "node 0 (idx 2)" }, { name: "fast", value: "node 2 (idx 1)" }, { name: "slow == fast?", value: false }] },
      ],
    },
    {
      description:
        "Step 3: slow moves to node -4 (index 3). fast moves from node 2 (idx 1) to node 0 (idx 2), then to node -4 (idx 3). Both pointers are now at index 3 — they've met! This proves a cycle exists. In a cycle of length L, the fast pointer closes the gap by 1 node per step, so they're guaranteed to meet within L steps once both are in the cycle.",
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
        { type: "variables", entries: [{ name: "slow", value: "node -4 (idx 3)" }, { name: "fast", value: "node -4 (idx 3)" }, { name: "slow == fast?", value: true, highlight: true }] },
      ],
    },
    {
      description:
        "Return True — cycle detected! Why this works: fast moves 2x the speed of slow. If there's a cycle, once both are inside it, the distance between them decreases by 1 each step. They must meet. If there's no cycle, fast hits None and we return False. Time: O(n) — slow traverses at most n nodes before meeting fast. Space: O(1) — only two pointer variables, no matter how large the list.",
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
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Floyd's Cycle Detection",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def findDuplicate(nums):
    slow = nums[0]
    fast = nums[0]

    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break

    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow`,
  steps: [
    {
      description:
        "Find the duplicate in [1,3,4,2,2] using Floyd's cycle detection. Treat each value as a pointer to the next index. Index chain: 0->1->3->2->4->2->4->... (cycle at index 2). Phase 1: find where slow and fast meet inside the cycle.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "nums", values: [1, 3, 4, 2, 2],
          pointers: [
            { index: 0, label: "start", color: "purple" },
          ],
        },
        { type: "linkedlist", label: "implicit linked list",
          nodes: [{ value: "0:1" }, { value: "1:3" }, { value: "3:2" }, { value: "2:4" }, { value: "4:2" }],
          pointers: [
            { index: 0, label: "slow", color: "purple" },
            { index: 0, label: "fast", color: "cyan" },
          ],
          cycleIndex: 2,
        },
        { type: "variables", entries: [
          { name: "slow", value: 1 },
          { name: "fast", value: 1 },
          { name: "chain", value: "0->1->3->2->4->2 (cycle)" },
        ] },
      ],
    },
    {
      description:
        "Phase 1: slow follows one hop, fast follows two. slow: 1->3, fast: 1->3->2. slow: 3->2, fast: 2->4->2. Now slow=fast=2. They meet inside the cycle.",
      codeHighlightLines: [5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "nums", values: [1, 3, 4, 2, 2],
          highlights: { 2: "found" },
          pointers: [
            { index: 2, label: "slow=fast", color: "found" },
          ],
        },
        { type: "linkedlist", label: "implicit linked list",
          nodes: [{ value: "0:1" }, { value: "1:3" }, { value: "3:2", highlight: "found" }, { value: "2:4" }, { value: "4:2" }],
          pointers: [
            { index: 2, label: "slow=fast", color: "found" },
          ],
          cycleIndex: 2,
        },
        { type: "variables", entries: [
          { name: "slow path", value: "1 -> 3 -> 2" },
          { name: "fast path", value: "1 -> 3 -> 2 -> 4 -> 2" },
          { name: "meeting point", value: 2, highlight: true },
        ] },
      ],
    },
    {
      description:
        "Phase 2: Reset slow to nums[0]=1. Move both one step at a time until they meet. slow: 1->3->2, fast: 2->4->2. They meet at 2, which is the duplicate!",
      codeHighlightLines: [11, 12, 13, 14, 15],
      structures: [
        { type: "array", label: "nums", values: [1, 3, 4, 2, 2],
          highlights: { 3: "checked", 4: "checked", 2: "success" },
          pointers: [
            { index: 2, label: "slow=fast", color: "green" },
          ],
        },
        { type: "linkedlist", label: "implicit linked list",
          nodes: [{ value: "0:1" }, { value: "1:3", highlight: "checked" }, { value: "3:2", highlight: "success" }, { value: "2:4", highlight: "checked" }, { value: "4:2", highlight: "checked" }],
          pointers: [
            { index: 2, label: "slow=fast", color: "green" },
          ],
          cycleIndex: 2,
        },
        { type: "variables", entries: [
          { name: "slow path", value: "1 -> 3 -> 2" },
          { name: "fast path", value: "2 -> 4 -> 2" },
          { name: "duplicate", value: 2, highlight: true },
        ] },
      ],
    },
    {
      description:
        "The cycle entrance is the duplicate value. Floyd's algorithm guarantees slow and fast meet at the cycle entrance in phase 2. O(n) time, O(1) space -- no extra arrays or sets needed.",
      codeHighlightLines: [15],
      structures: [
        { type: "array", label: "nums", values: [1, 3, 4, 2, 2],
          highlights: { 3: "success", 4: "success" },
        },
        { type: "variables", entries: [
          { name: "return", value: 2, highlight: true },
          { name: "Time", value: "O(n)" },
          { name: "Space", value: "O(1)" },
        ] },
      ],
    },
  ],
};

export default solution;

import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
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
          "Find the duplicate in array of n+1 integers in range [1,n] without modifying the array, using O(1) space. Treat the array as a linked list: index → nums[index]. A duplicate means two indices point to the same value, creating a cycle. Use Floyd's tortoise and hare!",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 3, 4, 2, 2],
            highlights: {},
          },
          {
            type: "variables",
            entries: [
              { name: "slow", value: 1 },
              { name: "fast", value: 1 },
            ],
          },
        ],
      },
      {
        description:
          "Phase 1 — Find cycle intersection. slow = nums[1] = 3. fast = nums[nums[1]] = nums[3] = 2. slow=3, fast=2. Next: slow = nums[3] = 2. fast = nums[nums[2]] = nums[4] = 2. slow == fast == 2. Cycle found!",
        codeHighlightLines: [4, 5, 6, 7, 8],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 3, 4, 2, 2],
            highlights: { 2: "active", 4: "active" },
          },
          {
            type: "variables",
            entries: [
              { name: "slow", value: 2, highlight: true },
              { name: "fast", value: 2, highlight: true },
              { name: "phase", value: "Cycle detected!" },
            ],
          },
        ],
      },
      {
        description:
          "Phase 2 — Find cycle entrance (= the duplicate). Reset slow to nums[0] = 1. Move both one step at a time. slow = nums[1] = 3. fast = nums[2] = 4. slow = nums[3] = 2. fast = nums[4] = 2. They meet at 2!",
        codeHighlightLines: [9, 10, 11, 12],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 3, 4, 2, 2],
            highlights: { 3: "active", 4: "active" },
          },
          {
            type: "variables",
            entries: [
              { name: "slow", value: 2, highlight: true },
              { name: "fast", value: 2, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Return 2 — the duplicate number. The cycle entrance is the duplicate because two different indices (3 and 4) both have value 2, creating the cycle. This is the same algorithm used for linked list cycle detection!",
        codeHighlightLines: [13],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 3, 4, 2, 2],
            highlights: { 3: "success", 4: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: 2, highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

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
          "Find the single duplicate in an array of n+1 integers where each is in [1,n]. Constraints: don't modify the array, use O(1) extra space. The brilliant insight: interpret the array as a linked list where index i points to nums[i]. Since values are in [1,n] and array has n+1 elements, by the pigeonhole principle there's a duplicate. That duplicate value is pointed to by two different indices — creating a CYCLE in the linked list. The cycle entrance IS the duplicate. Use Floyd's algorithm (same as linked list cycle detection). nums=[1,3,4,2,2]. The chain: 0→1→3→2→4→2→4→... (cycle at 2).",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "nums (index → value = next)",
            values: [1, 3, 4, 2, 2],
            highlights: {},
          },
          {
            type: "variables",
            entries: [
              { name: "as linked list", value: "0→1→3→2→4→2→4→..." },
              { name: "cycle at", value: "2 (indices 3 and 4 both point here)" },
            ],
          },
        ],
      },
      {
        description:
          "Phase 1 — Detect the cycle. Slow moves one step, fast moves two. Start: slow=fast=nums[0]=1. Step 1: slow=nums[1]=3, fast=nums[nums[1]]=nums[3]=2. Step 2: slow=nums[3]=2, fast=nums[nums[2]]=nums[4]=2. slow == fast == 2 — they've met inside the cycle! This is guaranteed by Floyd's theorem: if a cycle exists, the tortoise and hare will meet after at most O(n) steps.",
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
              { name: "phase 1", value: "cycle detected!" },
            ],
          },
        ],
      },
      {
        description:
          "Phase 2 — Find the cycle entrance. Reset slow to nums[0]=1, keep fast at meeting point (2). Now both move ONE step at a time. This works due to a mathematical property: the distance from the start to the cycle entrance equals the distance from the meeting point to the cycle entrance (modulo cycle length). Step 1: slow=nums[1]=3, fast=nums[2]=4. Step 2: slow=nums[3]=2, fast=nums[4]=2. They meet at 2 — the cycle entrance!",
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
              { name: "phase 2", value: "entrance found!" },
            ],
          },
        ],
      },
      {
        description:
          "Return 2 — the duplicate number. Why is the cycle entrance the duplicate? Because value 2 is the target of TWO different pointers: nums[3]=2 and nums[4]=2. This convergence point is exactly where the cycle begins. No other value has two incoming pointers. The algorithm is beautiful: it solves the problem without modifying the array, using only O(1) space, in O(n) time. The same Floyd's algorithm that detects cycles in linked lists works here on an array reinterpreted as a graph.",
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
            entries: [{ name: "return", value: 2, highlight: true }, { name: "why 2?", value: "indices 3 and 4 both → 2 (cycle entrance)" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }],
          },
        ],
      },
    ],
  },
];

export default solutions;

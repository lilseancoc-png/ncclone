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
          "Find the single duplicate in an array of n+1 integers where each is in [1,n]. Constraints: don't modify the array, use O(1) extra space. Key insight: treat the array as a linked list where index i points to nums[i]. Since values are in [1,n] and there are n+1 elements, by the pigeonhole principle there's a duplicate — that value has two indices pointing to it, creating a cycle. The cycle entrance IS the duplicate. nums=[1,3,4,2,2].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "nums (index → value = next pointer)", values: [1, 3, 4, 2, 2], highlights: {} },
          { type: "variables", entries: [{ name: "as linked list", value: "0→1→3→2→4→2→4→2..." }, { name: "cycle", value: "2→4→2→4... (value 2 is the duplicate)" }] },
        ],
      },
      {
        description:
          "Phase 1 — Detect the cycle using tortoise and hare. Start: slow = fast = nums[0] = 1. Step 1: slow = nums[1] = 3. fast = nums[nums[1]] = nums[3] = 2. (slow=3, fast=2). Step 2: slow = nums[3] = 2. fast = nums[nums[2]] = nums[4] = 2. slow == fast == 2! They met inside the cycle.",
        codeHighlightLines: [4, 5, 6, 7, 8],
        structures: [
          { type: "array", label: "nums", values: [1, 3, 4, 2, 2], highlights: { 1: "active", 3: "active" }, pointers: [{ index: 2, label: "meet" }] },
          { type: "variables", entries: [{ name: "step 1", value: "slow=3, fast=2" }, { name: "step 2", value: "slow=2, fast=2", highlight: true }, { name: "phase 1", value: "cycle detected!" }] },
        ],
      },
      {
        description:
          "Phase 2 — Find the cycle entrance. Reset slow to nums[0] = 1. Keep fast at meeting point = 2. Now both move ONE step at a time. Why does this work? Mathematical proof: if the distance from start to cycle entrance is F, and the meeting point is some distance inside the cycle, then F equals the remaining distance from the meeting point to the cycle entrance (modulo cycle length).",
        codeHighlightLines: [9, 10, 11, 12],
        structures: [
          { type: "array", label: "nums", values: [1, 3, 4, 2, 2], highlights: { 0: "active" }, pointers: [{ index: 1, label: "slow (reset)" }, { index: 2, label: "fast (stays)" }] },
          { type: "variables", entries: [{ name: "slow", value: "nums[0] = 1 (reset to start)" }, { name: "fast", value: "2 (stays at meeting point)" }, { name: "both move", value: "one step at a time now" }] },
        ],
      },
      {
        description:
          "Phase 2 execution: Step 1: slow = nums[1] = 3. fast = nums[2] = 4. (slow=3, fast=4). Step 2: slow = nums[3] = 2. fast = nums[4] = 2. slow == fast == 2! They meet at the cycle entrance. The value 2 is the duplicate — indices 3 and 4 both point to 2, which is what creates the cycle.",
        codeHighlightLines: [10, 11, 12],
        structures: [
          { type: "array", label: "nums", values: [1, 3, 4, 2, 2], highlights: { 3: "success", 4: "success" }, pointers: [{ index: 2, label: "entrance!" }] },
          { type: "variables", entries: [{ name: "step 1", value: "slow=3, fast=4" }, { name: "step 2", value: "slow=2, fast=2", highlight: true }, { name: "cycle entrance", value: "index 2, value 2" }] },
        ],
      },
      {
        description:
          "Return 2 — the duplicate number. Why is the cycle entrance the duplicate? Value 2 is the target of TWO pointers: nums[3]=2 and nums[4]=2. This convergence is exactly where the cycle begins — the only value with multiple incoming edges. The algorithm uses O(1) space (just two pointers) and O(n) time. It's the same Floyd's algorithm used for linked list cycle detection, applied to an array reinterpreted as an implicit linked list.",
        codeHighlightLines: [13],
        structures: [
          { type: "array", label: "nums", values: [1, 3, 4, 2, 2], highlights: { 3: "success", 4: "success" } },
          { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "why 2?", value: "nums[3]=2 and nums[4]=2 (two incoming)" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
        ],
      },
    ],
  },
];

export default solutions;

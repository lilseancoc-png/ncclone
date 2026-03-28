import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  // ── Approach 1: Brute Force — Nested Loops ──────────────────────────
  {
    label: "Brute Force — Nested Loops",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    code: `def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
    steps: [
      {
        description:
          "We want to find two numbers in the array that add up to target=9. The brute force approach is the simplest: try every possible pair of numbers using two nested loops. The outer loop picks the first number, and the inner loop picks the second. This guarantees we check all combinations, but at the cost of O(n²) time.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [2, 7, 11, 15],
            highlights: {},
          },
          {
            type: "variables",
            entries: [{ name: "target", value: 9 }],
          },
        ],
      },
      {
        description:
          "i=0, j=1: We check the first pair — nums[0] + nums[1] = 2 + 7 = 9. This equals our target! In brute force we got lucky and found the answer on the very first comparison. However, in the worst case we would need to check every pair before finding a match (or discovering there is none), which is why the time complexity is O(n²).",
        codeHighlightLines: [4, 5],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [2, 7, 11, 15],
            highlights: { 0: "active", 1: "active" },
            pointers: [
              { index: 0, label: "i" },
              { index: 1, label: "j" },
            ],
          },
          {
            type: "variables",
            entries: [
              { name: "target", value: 9 },
              { name: "nums[i] + nums[j]", value: "2 + 7 = 9", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Match found! Return [0, 1] — the indices of the two numbers that sum to 9. Time complexity: O(n²) because in the worst case the nested loops compare n*(n-1)/2 pairs. Space complexity: O(1) because we only use a few variables regardless of input size. This approach is easy to understand but inefficient for large inputs — the hash map approach (Approach 2) reduces time to O(n) by trading space for speed.",
        codeHighlightLines: [5],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [2, 7, 11, 15],
            highlights: { 0: "success", 1: "success" },
            pointers: [
              { index: 0, label: "i" },
              { index: 1, label: "j" },
            ],
          },
          {
            type: "variables",
            entries: [
              { name: "return", value: "[0, 1]", highlight: true },
            ],
          },
        ],
      },
    ],
  },

  // ── Approach 2: Optimal — Hash Map (one pass) ───────────────────────
  {
    label: "Optimal — Hash Map",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: `def two_sum(nums, target):
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    steps: [
      {
        description:
          "Instead of checking every pair, we can solve this in one pass using a hash map. The key insight: for each number, we calculate its complement (target - num). If the complement is already in our map, we found our pair. If not, we store the current number so a future element can find it. This trades O(n) extra space for O(n) time — a huge improvement over brute force.",
        codeHighlightLines: [1, 2],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [2, 7, 11, 15],
            highlights: {},
          },
          {
            type: "variables",
            entries: [{ name: "target", value: 9 }],
          },
          {
            type: "hashmap",
            label: "seen (value → index)",
            entries: [],
          },
        ],
      },
      {
        description:
          "i=0, num=2: What number would pair with 2 to make 9? complement = 9 - 2 = 7. We look up 7 in our hash map — it's empty, so 7 hasn't been seen yet. We can't form a pair with 2 right now, so we store 2→0 in the map. This means \"the value 2 lives at index 0.\" If any future number needs 2 as its complement, it will find it instantly via O(1) hash lookup.",
        codeHighlightLines: [3, 4, 5, 7],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [2, 7, 11, 15],
            highlights: { 0: "active" },
            pointers: [{ index: 0, label: "i" }],
          },
          {
            type: "variables",
            entries: [
              { name: "target", value: 9 },
              { name: "complement", value: 7, highlight: true },
            ],
          },
          {
            type: "hashmap",
            label: "seen (value → index)",
            entries: [[2, 0]],
            highlightKeys: [2],
          },
        ],
      },
      {
        description:
          "i=1, num=7: complement = 9 - 7 = 2. Is 2 in the hash map? YES! We stored it in the previous step. This means nums[0]=2 and nums[1]=7 together sum to 9. The hash map let us find the matching pair in O(1) time instead of scanning back through the array. We return [seen[2], i] = [0, 1].",
        codeHighlightLines: [3, 4, 5, 6],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [2, 7, 11, 15],
            highlights: { 0: "found", 1: "found" },
            pointers: [{ index: 1, label: "i" }],
          },
          {
            type: "variables",
            entries: [
              { name: "target", value: 9 },
              { name: "complement", value: 2, highlight: true },
            ],
          },
          {
            type: "hashmap",
            label: "seen (value → index)",
            entries: [[2, 0]],
            highlightKeys: [2],
          },
        ],
      },
      {
        description:
          "Return [0, 1]. Time complexity: O(n) — we iterate through the array once, and each hash map lookup/insert is O(1) on average. Space complexity: O(n) — in the worst case we store every element in the map before finding a match. This is the classic space-time tradeoff: by using O(n) extra memory for the hash map, we reduce the time from O(n²) to O(n), making this approach far superior for large inputs.",
        codeHighlightLines: [6],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [2, 7, 11, 15],
            highlights: { 0: "success", 1: "success" },
          },
          {
            type: "variables",
            entries: [
              { name: "return", value: "[0, 1]", highlight: true },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

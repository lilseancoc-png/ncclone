import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  // ── Approach 1: Sort ────────────────────────────────────────────────────
  {
    label: "Sort",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    code: `def find_kth_largest(nums, k):
    nums.sort(reverse=True)
    return nums[k - 1]`,
    steps: [
      {
        description:
          "Find the 2nd largest element in [3,2,1,5,6,4]. Simplest approach: sort in descending order, then return the element at index k-1.",
        codeHighlightLines: [1],
        structures: [
          { type: "array", label: "nums", values: [3, 2, 1, 5, 6, 4] },
          { type: "variables", entries: [{ name: "k", value: 2 }] },
        ],
      },
      {
        description:
          "Sort nums in descending order: [6,5,4,3,2,1]. This is O(n log n) due to the sort.",
        codeHighlightLines: [2],
        structures: [
          { type: "array", label: "nums (sorted desc)", values: [6, 5, 4, 3, 2, 1], highlights: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active" } },
        ],
      },
      {
        description:
          "Return nums[k-1] = nums[1] = 5. The 2nd largest element is 5. Simple but O(n log n) — quickselect can do better on average.",
        codeHighlightLines: [3],
        structures: [
          { type: "array", label: "nums (sorted desc)", values: [6, 5, 4, 3, 2, 1], highlights: { 1: "found" }, pointers: [{ index: 1, label: "k-1" }] },
          { type: "variables", entries: [{ name: "return", value: 5, highlight: true }] },
        ],
      },
    ],
  },

  // ── Approach 2: Quickselect ─────────────────────────────────────────────
  {
    label: "Optimal — Quickselect",
    timeComplexity: "O(n) avg",
    spaceComplexity: "O(1)",
    code: `def find_kth_largest(nums, k):
    target = len(nums) - k
    def quickselect(lo, hi):
        pivot = nums[hi]
        p = lo
        for i in range(lo, hi):
            if nums[i] <= pivot:
                nums[p], nums[i] = nums[i], nums[p]
                p += 1
        nums[p], nums[hi] = nums[hi], nums[p]
        if p == target: return nums[p]
        elif p < target: return quickselect(p+1, hi)
        else: return quickselect(lo, p-1)
    return quickselect(0, len(nums) - 1)`,
    steps: [
      {
        description:
          "Find 2nd largest in [3,2,1,5,6,4] using quickselect. The kth largest is the (n-k)th smallest. target = 6-2 = index 4. We partition until we find the element at index 4.",
        codeHighlightLines: [1, 2],
        structures: [
          { type: "array", label: "nums", values: [3, 2, 1, 5, 6, 4] },
          { type: "variables", entries: [{ name: "k", value: 2 }, { name: "target index", value: 4 }] },
        ],
      },
      {
        description:
          "Partition with pivot=4 (last element). Move elements <= 4 to the left. After partitioning: [3,2,1,4,6,5]. Pivot lands at index 3. target=4 > 3, so recurse on the right half [4+1..5].",
        codeHighlightLines: [4, 5, 6, 7, 8, 9, 10],
        structures: [
          { type: "array", label: "nums (after partition)", values: [3, 2, 1, 4, 6, 5], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "success" }, pointers: [{ index: 3, label: "pivot" }] },
          { type: "variables", entries: [{ name: "p", value: 3 }, { name: "target", value: 4 }, { name: "p < target?", value: "Yes, go right" }] },
        ],
      },
      {
        description:
          "Subarray [6,5], pivot=5. After partition: [5,6]. Pivot at index 4. p=4 == target=4. Found it! Return nums[4] = 5.",
        codeHighlightLines: [10, 11],
        structures: [
          { type: "array", label: "nums", values: [3, 2, 1, 4, 5, 6], highlights: { 4: "found" }, pointers: [{ index: 4, label: "target" }] },
          { type: "variables", entries: [{ name: "p == target?", value: "Yes!", highlight: true }, { name: "return", value: 5, highlight: true }] },
        ],
      },
      {
        description:
          "Quickselect finds the kth largest in O(n) average time by only recursing into one side of the partition (unlike quicksort which recurses both). Worst case O(n^2) but rare with random pivots.",
        codeHighlightLines: [14],
        structures: [
          { type: "array", label: "final nums", values: [3, 2, 1, 4, 5, 6], highlights: { 4: "success" } },
          { type: "variables", entries: [{ name: "return", value: 5, highlight: true }, { name: "Avg Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
        ],
      },
    ],
  },
];

export default solutions;

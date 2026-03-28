import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  // ── Approach 1: Linear Scan ──────────────────────────────────────────
  {
    label: "Linear Scan",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def search(nums, target):
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1`,
    steps: [
      {
        description:
          "Search for target=9 in a sorted array. The simplest approach: check every element one by one. This ignores the fact that the array is sorted and takes O(n) in the worst case.",
        codeHighlightLines: [1, 2],
        structures: [
          { type: "array", label: "nums", values: [-1, 0, 3, 5, 9, 12] },
          { type: "variables", entries: [{ name: "target", value: 9 }] },
        ],
      },
      {
        description:
          "i=0: nums[0]=-1. Not 9. Move on.",
        codeHighlightLines: [2, 3],
        structures: [
          { type: "array", label: "nums", values: [-1, 0, 3, 5, 9, 12], highlights: { 0: "checked" }, pointers: [{ index: 0, label: "i" }] },
          { type: "variables", entries: [{ name: "nums[i]", value: -1 }, { name: "target", value: 9 }] },
        ],
      },
      {
        description:
          "i=1: nums[1]=0. Not 9. i=2: nums[2]=3. Not 9. i=3: nums[3]=5. Not 9. We're wasting time checking elements we could skip!",
        codeHighlightLines: [2, 3],
        structures: [
          { type: "array", label: "nums", values: [-1, 0, 3, 5, 9, 12], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked" }, pointers: [{ index: 3, label: "i" }] },
          { type: "variables", entries: [{ name: "nums[i]", value: 5 }, { name: "target", value: 9 }] },
        ],
      },
      {
        description:
          "i=4: nums[4]=9. Found it! Return 4. It took us 5 checks. Time: O(n) — in the worst case we check every element. Space: O(1). This works, but Binary Search (Approach 2) finds it in O(log n) by leveraging the sorted order.",
        codeHighlightLines: [3, 4],
        structures: [
          { type: "array", label: "nums", values: [-1, 0, 3, 5, 9, 12], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "success" }, pointers: [{ index: 4, label: "i" }] },
          { type: "variables", entries: [{ name: "return", value: 4, highlight: true }] },
        ],
      },
    ],
  },

  // ── Approach 2: Optimal — Binary Search ──────────────────────────────
  {
    label: "Optimal — Binary Search",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    code: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    steps: [
      {
        description:
          "Since the array is sorted, we can use binary search: check the middle element and eliminate half the array each time. This gives O(log n) — for 1 million elements, that's only ~20 comparisons instead of 1 million!",
        codeHighlightLines: [1, 2],
        structures: [
          { type: "array", label: "nums", values: [-1, 0, 3, 5, 9, 12], pointers: [{ index: 0, label: "L" }, { index: 5, label: "R" }] },
          { type: "variables", entries: [{ name: "target", value: 9 }] },
        ],
      },
      {
        description:
          "mid = (0+5)//2 = 2. nums[2]=3. Is 3 == 9? No. Is 3 < 9? Yes — target must be in the right half. Move left = mid+1 = 3. We just eliminated indices 0, 1, 2 in one step!",
        codeHighlightLines: [3, 4, 7, 8],
        structures: [
          { type: "array", label: "nums", values: [-1, 0, 3, 5, 9, 12], highlights: { 2: "active", 0: "checked", 1: "checked" }, pointers: [{ index: 0, label: "L" }, { index: 2, label: "mid" }, { index: 5, label: "R" }] },
          { type: "variables", entries: [{ name: "mid", value: 2, highlight: true }, { name: "nums[mid]", value: 3 }, { name: "3 < 9", value: "→ go right" }] },
        ],
      },
      {
        description:
          "New range: left=3, right=5. mid = (3+5)//2 = 4. nums[4]=9. Found the target! Only 2 comparisons needed vs 5 for linear scan.",
        codeHighlightLines: [3, 4, 5, 6],
        structures: [
          { type: "array", label: "nums", values: [-1, 0, 3, 5, 9, 12], highlights: { 0: "checked", 1: "checked", 2: "checked", 4: "found" }, pointers: [{ index: 3, label: "L" }, { index: 4, label: "mid" }, { index: 5, label: "R" }] },
          { type: "variables", entries: [{ name: "mid", value: 4, highlight: true }, { name: "nums[mid]", value: 9, highlight: true }] },
        ],
      },
      {
        description:
          "nums[mid] == target! Return index 4. Time: O(log n) — we halve the search space each iteration. For n=6, we needed only 2 comparisons. For n=1,000,000 we'd need at most 20. Space: O(1) — just three pointer variables.",
        codeHighlightLines: [5, 6],
        structures: [
          { type: "array", label: "nums", values: [-1, 0, 3, 5, 9, 12], highlights: { 4: "success" } },
          { type: "variables", entries: [{ name: "return", value: 4, highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

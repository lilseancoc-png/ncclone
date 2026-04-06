import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Binary Search on Partition",
    timeComplexity: "O(log(min(m, n)))",
    spaceComplexity: "O(1)",
    code: `def findMedianSortedArrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    lo, hi = 0, m
    half = (m + n + 1) // 2
    while lo <= hi:
        i = (lo + hi) // 2
        j = half - i
        left1 = nums1[i-1] if i > 0 else float('-inf')
        right1 = nums1[i] if i < m else float('inf')
        left2 = nums2[j-1] if j > 0 else float('-inf')
        right2 = nums2[j] if j < n else float('inf')
        if left1 <= right2 and left2 <= right1:
            if (m + n) % 2 == 0:
                return (max(left1, left2) + min(right1, right2)) / 2
            return max(left1, left2)
        elif left1 > right2:
            hi = i - 1
        else:
            lo = i + 1`,
    steps: [
      {
        description:
          "Find the median of two sorted arrays in O(log(min(m,n))). Binary search on the partition point of the smaller array. The partition divides both arrays into left and right halves such that all left elements <= all right elements.",
        codeHighlightLines: [1, 2, 3, 4, 5, 6],
        structures: [
          {
            type: "array",
            label: "nums1",
            values: [1, 3],
            highlights: {},
          },
          {
            type: "array",
            label: "nums2",
            values: [2, 4, 5, 6],
            highlights: {},
          },
          {
            type: "variables",
            entries: [
              { name: "half", value: 3 },
              { name: "lo", value: 0 },
              { name: "hi", value: 2 },
            ],
          },
        ],
      },
      {
        description:
          "i=1 (partition nums1 after index 0), j=half-i=2 (partition nums2 after index 1). Left half: [1 | 2,4] Right half: [3 | 5,6]. Check: left1=1 <= right2=5 ✓, left2=4 > right1=3 ✗. left2 too big → move partition right in nums1.",
        codeHighlightLines: [8, 9, 10, 11, 12, 13, 14],
        structures: [
          {
            type: "array",
            label: "nums1",
            values: [1, 3],
            highlights: { 0: "active" },
            pointers: [{ index: 1, label: "i=1" }],
          },
          {
            type: "array",
            label: "nums2",
            values: [2, 4, 5, 6],
            highlights: { 0: "active", 1: "active" },
            pointers: [{ index: 2, label: "j=2" }],
          },
          {
            type: "variables",
            entries: [
              { name: "left1", value: 1 },
              { name: "right1", value: 3 },
              { name: "left2", value: 4, highlight: true },
              { name: "right2", value: 5 },
            ],
          },
        ],
      },
      {
        description:
          "lo=2, i=2, j=1. Left half: [1,3 | 2] Right half: [— | 4,5,6]. left1=3, right1=∞, left2=2, right2=4. Check: 3 <= 4 ✓ and 2 <= ∞ ✓. Valid partition found!",
        codeHighlightLines: [8, 9, 14],
        structures: [
          {
            type: "array",
            label: "nums1",
            values: [1, 3],
            highlights: { 0: "success", 1: "success" },
            pointers: [{ index: 2, label: "i=2" }],
          },
          {
            type: "array",
            label: "nums2",
            values: [2, 4, 5, 6],
            highlights: { 0: "success" },
            pointers: [{ index: 1, label: "j=1" }],
          },
          {
            type: "variables",
            entries: [
              { name: "left1", value: 3, highlight: true },
              { name: "left2", value: 2, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Total elements = 6 (even). Median = (max(left1,left2) + min(right1,right2)) / 2 = (max(3,2) + min(∞,4)) / 2 = (3 + 4) / 2 = 3.5. We only did 2 binary search iterations — O(log(min(2,4))) = O(1) here.",
        codeHighlightLines: [15, 16],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "max(left)", value: 3 },
              { name: "min(right)", value: 4 },
              { name: "median", value: 3.5, highlight: true },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

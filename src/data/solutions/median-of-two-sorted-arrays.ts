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
          "Find the median of two sorted arrays in O(log(min(m,n))). The idea: binary search on the partition point of the smaller array. A valid partition splits both arrays so that all left elements ≤ all right elements, with exactly half the total elements on each side. nums1=[1,3], nums2=[2,4,5,6]. Ensure nums1 is smaller (it is). half = (2+4+1)//2 = 3.",
        codeHighlightLines: [1, 2, 3, 4, 5, 6],
        structures: [
          { type: "array", label: "nums1 (smaller)", values: [1, 3], highlights: {} },
          { type: "array", label: "nums2", values: [2, 4, 5, 6], highlights: {} },
          { type: "variables", entries: [{ name: "m", value: 2 }, { name: "n", value: 4 }, { name: "half", value: "3 (left side gets 3 elements)" }, { name: "lo", value: 0 }, { name: "hi", value: 2 }] },
        ],
      },
      {
        description:
          "Iteration 1: i = (0+2)//2 = 1 (take 1 element from nums1), j = 3-1 = 2 (take 2 from nums2). Left half: nums1[:1]=[1], nums2[:2]=[2,4]. Right half: nums1[1:]=[3], nums2[2:]=[5,6]. Check cross conditions: left1=1 ≤ right2=5 ✓. But left2=4 > right1=3 ✗! The largest left element from nums2 exceeds the smallest right element from nums1. We need more elements from nums1 → move lo right.",
        codeHighlightLines: [7, 8, 9, 10, 11, 12, 13],
        structures: [
          { type: "array", label: "nums1", values: [1, 3], highlights: { 0: "active" }, pointers: [{ index: 1, label: "i=1" }] },
          { type: "array", label: "nums2", values: [2, 4, 5, 6], highlights: { 0: "active", 1: "active" }, pointers: [{ index: 2, label: "j=2" }] },
          { type: "variables", entries: [{ name: "left1", value: "1 (nums1[0])" }, { name: "right1", value: "3 (nums1[1])" }, { name: "left2", value: "4 (nums2[1])", highlight: true }, { name: "right2", value: "5 (nums2[2])" }, { name: "left2 > right1?", value: "4 > 3 → YES, invalid!" }] },
        ],
      },
      {
        description:
          "left2 > right1 means nums2's left side has too-large elements. Fix: take more from nums1 (push partition right). lo = i+1 = 2. Iteration 2: i = (2+2)//2 = 2 (take all of nums1), j = 3-2 = 1 (take 1 from nums2). Left half: nums1[:2]=[1,3], nums2[:1]=[2]. Right half: nums1[2:]=[] (empty → right1=∞), nums2[1:]=[4,5,6].",
        codeHighlightLines: [18, 19, 7, 8, 9],
        structures: [
          { type: "array", label: "nums1", values: [1, 3], highlights: { 0: "success", 1: "success" }, pointers: [{ index: 2, label: "i=2" }] },
          { type: "array", label: "nums2", values: [2, 4, 5, 6], highlights: { 0: "success" }, pointers: [{ index: 1, label: "j=1" }] },
          { type: "variables", entries: [{ name: "left half", value: "[1, 2, 3] — 3 elements" }, { name: "right half", value: "[4, 5, 6] — 3 elements" }, { name: "lo", value: 2 }, { name: "hi", value: 2 }] },
        ],
      },
      {
        description:
          "Check conditions: left1=3 (nums1[1]), right1=∞ (i=m, nothing right of partition in nums1). left2=2 (nums2[0]), right2=4 (nums2[1]). left1=3 ≤ right2=4 ✓. left2=2 ≤ right1=∞ ✓. Valid partition! All left elements [1,2,3] ≤ all right elements [4,5,6]. The binary search converged in just 2 iterations.",
        codeHighlightLines: [14],
        structures: [
          { type: "variables", entries: [{ name: "left1", value: "3 (nums1[1])", highlight: true }, { name: "right1", value: "∞ (past end)" }, { name: "left2", value: "2 (nums2[0])", highlight: true }, { name: "right2", value: "4 (nums2[1])" }, { name: "3 ≤ 4 and 2 ≤ ∞", value: "Both ✓ — valid!" }] },
        ],
      },
      {
        description:
          "Total elements = 6 (even), so median = average of the two middle elements. The max of the left side: max(left1, left2) = max(3, 2) = 3. The min of the right side: min(right1, right2) = min(∞, 4) = 4. Median = (3 + 4) / 2 = 3.5. For odd totals, we'd just return max(left1, left2).",
        codeHighlightLines: [15, 16],
        structures: [
          { type: "array", label: "merged (conceptual)", values: [1, 2, 3, 4, 5, 6], highlights: { 2: "success", 3: "success" }, pointers: [{ index: 2, label: "mid" }, { index: 3, label: "mid" }] },
          { type: "variables", entries: [{ name: "max(left)", value: "max(3, 2) = 3" }, { name: "min(right)", value: "min(∞, 4) = 4" }, { name: "median", value: "(3 + 4) / 2 = 3.5", highlight: true }] },
        ],
      },
      {
        description:
          "Return 3.5. We found the median without merging the arrays! Binary search on the smaller array's partition point: O(log(min(m,n))). Each iteration tests one partition, adjusting based on the cross-condition (left1 ≤ right2 and left2 ≤ right1). Space: O(1). This is optimal — you can't do better than log time for finding a median of sorted arrays.",
        codeHighlightLines: [15, 16, 17],
        structures: [
          { type: "variables", entries: [{ name: "return", value: 3.5, highlight: true }, { name: "iterations", value: "2 (binary search)" }, { name: "Time", value: "O(log(min(m, n)))" }, { name: "Space", value: "O(1)" }] },
        ],
      },
    ],
  },
];

export default solutions;

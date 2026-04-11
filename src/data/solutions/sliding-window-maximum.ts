import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Monotonic Deque",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    code: `from collections import deque

def maxSlidingWindow(nums, k):
    dq = deque()  # indices of useful elements
    result = []
    for i in range(len(nums)):
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result`,
    steps: [
      {
        description:
          "Find the maximum in each sliding window of size k. Brute force checks every window: O(nk). The monotonic decreasing deque maintains candidate maximums — the front is always the window max. We store indices (not values) to know when elements leave the window. Two rules: (1) remove front if outside window, (2) remove back elements smaller than current (they'll never be the max). nums=[1,3,-1,-3,5,3,6,7], k=3.",
        codeHighlightLines: [3, 4, 5],
        structures: [
          { type: "array", label: "nums", values: [1, 3, -1, -3, 5, 3, 6, 7] },
          { type: "variables", entries: [{ name: "k", value: 3 }] },
          { type: "stack", label: "deque (indices)", values: [] },
        ],
      },
      {
        description:
          "i=0, nums[0]=1: Deque empty, append index 0. deque=[0]. Window not complete yet (need k=3 elements). i=1, nums[1]=3: nums[0]=1 < 3, so index 0 can never be the max — pop it from the back. Append 1. deque=[1]. Still building the first window.",
        codeHighlightLines: [9, 10, 11],
        structures: [
          { type: "array", label: "nums", values: [1, 3, -1, -3, 5, 3, 6, 7], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "i" }] },
          { type: "stack", label: "deque", values: ["1"], topHighlight: true },
          { type: "variables", entries: [{ name: "removed idx 0", value: "nums[0]=1 < nums[1]=3" }] },
        ],
      },
      {
        description:
          "i=2, nums[2]=-1: nums[1]=3 > -1, so keep index 1. Append 2. deque=[1,2]. Window [0..2] complete! Max = nums[dq[0]] = nums[1] = 3. result=[3]. The deque is decreasing: values at indices 1,2 are 3,-1. The front always holds the maximum.",
        codeHighlightLines: [9, 10, 11, 12, 13],
        structures: [
          { type: "array", label: "nums", values: [1, 3, -1, -3, 5, 3, 6, 7], highlights: { 0: "active", 1: "active", 2: "active" }, pointers: [{ index: 0, label: "window" }, { index: 2, label: "" }] },
          { type: "stack", label: "deque (decreasing)", values: ["1 (val=3)", "2 (val=-1)"] },
          { type: "array", label: "result", values: [3], highlights: { 0: "success" } },
        ],
      },
      {
        description:
          "i=3, nums[3]=-3: -1 > -3, keep. Append 3. deque=[1,2,3]. Check front: index 1 >= 3-3+1=1, still in window. Max = nums[1] = 3. result=[3,3]. i=4, nums[4]=5: Remove back elements smaller than 5: pop 3(-3), pop 2(-1), pop 1(3 < 5). deque=[4]. Also check front: dq[0]=4 is in window. Max=5. result=[3,3,5].",
        codeHighlightLines: [7, 8, 9, 10, 11, 12, 13],
        structures: [
          { type: "array", label: "nums", values: [1, 3, -1, -3, 5, 3, 6, 7], highlights: { 2: "active", 3: "active", 4: "active" }, pointers: [{ index: 2, label: "window" }, { index: 4, label: "" }] },
          { type: "stack", label: "deque", values: ["4 (val=5)"], topHighlight: true },
          { type: "array", label: "result", values: [3, 3, 5], highlights: { 2: "success" } },
        ],
      },
      {
        description:
          "i=5, nums[5]=3: 5 > 3, keep index 4. Append 5. deque=[4,5]. Max=nums[4]=5. result=[3,3,5,5]. i=6, nums[6]=6: Pop 5(3<6), pop 4(5<6). Append 6. deque=[6]. Max=6. result=[3,3,5,5,6]. The deque clears completely when a new global maximum appears.",
        codeHighlightLines: [9, 10, 11, 12, 13],
        structures: [
          { type: "array", label: "nums", values: [1, 3, -1, -3, 5, 3, 6, 7], highlights: { 4: "checked", 5: "checked", 6: "active" }, pointers: [{ index: 4, label: "window" }, { index: 6, label: "" }] },
          { type: "stack", label: "deque", values: ["6 (val=6)"], topHighlight: true },
          { type: "array", label: "result", values: [3, 3, 5, 5, 6], highlights: { 4: "success" } },
        ],
      },
      {
        description:
          "i=7, nums[7]=7: Pop 6(6<7). Append 7. deque=[7]. Max=7. Final result=[3,3,5,5,6,7]. Each index is pushed and popped from the deque at most once, so total operations across all iterations = O(n). The deque stores at most k elements. Time: O(n). Space: O(k) for the deque.",
        codeHighlightLines: [9, 10, 11, 12, 13, 14],
        structures: [
          { type: "array", label: "result (final)", values: [3, 3, 5, 5, 6, 7], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
          { type: "variables", entries: [{ name: "return", value: "[3,3,5,5,6,7]", highlight: true }, { name: "Time", value: "O(n) amortized" }, { name: "Space", value: "O(k)" }] },
        ],
      },
    ],
  },
];

export default solutions;

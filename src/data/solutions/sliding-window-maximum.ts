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
          "Find the maximum in each sliding window of size k. A brute force O(nk) approach checks every window. Instead, use a monotonic decreasing deque that always has the window max at the front. We store indices, removing elements that leave the window or are smaller than the current element.",
        codeHighlightLines: [3, 4, 5],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 3, -1, -3, 5, 3, 6, 7],
            highlights: {},
          },
          {
            type: "variables",
            entries: [{ name: "k", value: 3 }],
          },
          { type: "stack", label: "deque (indices)", values: [] },
        ],
      },
      {
        description:
          "i=0: deque empty, append 0. i=1: nums[0]=1 < nums[1]=3, pop 0. Append 1. i=2: nums[1]=3 > nums[2]=-1, keep. Append 2. deque=[1,2]. Window complete: max = nums[1] = 3.",
        codeHighlightLines: [9, 10, 11, 12, 13],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 3, -1, -3, 5, 3, 6, 7],
            highlights: { 0: "checked", 1: "active", 2: "active" },
          },
          { type: "stack", label: "deque", values: ["1", "2"] },
          {
            type: "array",
            label: "result",
            values: [3],
            highlights: { 0: "success" },
          },
        ],
      },
      {
        description:
          "i=3: nums[2]=-1 > nums[3]=-3, keep. Append 3. deque=[1,2,3]. max=nums[1]=3. i=4: Remove index 1 (out of window). Pop -3, pop -1 (both < 5). Append 4. deque=[4]. max=5.",
        codeHighlightLines: [7, 8, 9, 10, 11, 13],
        structures: [
          {
            type: "array",
            label: "nums",
            values: [1, 3, -1, -3, 5, 3, 6, 7],
            highlights: { 4: "active" },
            pointers: [{ index: 4, label: "i" }],
          },
          { type: "stack", label: "deque", values: ["4"], topHighlight: true },
          {
            type: "array",
            label: "result",
            values: [3, 3, 5],
            highlights: { 2: "success" },
          },
        ],
      },
      {
        description:
          "i=5: nums[4]=5>3, keep 4. Append 5. deque=[4,5]. max=5. i=6: Pop 5 (3<6), pop 4 (5<6). Append 6. max=6. i=7: Pop 6 (6<7). Append 7. max=7.",
        codeHighlightLines: [9, 10, 11, 13],
        structures: [
          {
            type: "array",
            label: "result",
            values: [3, 3, 5, 5, 6, 7],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: "[3, 3, 5, 5, 6, 7]", highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

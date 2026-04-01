import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Greedy — BFS-like Jumps",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def jump(nums):
    jumps = 0
    current_end = 0
    farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == current_end:
            jumps += 1
            current_end = farthest
    return jumps`,
  steps: [
    {
      description:
        "Find minimum jumps to reach the last index. Greedy: track the farthest reachable position. When we reach the end of current jump range, take a new jump. nums=[2,3,1,1,4].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4] },
        { type: "variables", entries: [{ name: "jumps", value: 0 }, { name: "current_end", value: 0 }, { name: "farthest", value: 0 }] },
      ],
    },
    {
      description:
        "i=0: farthest=max(0, 0+2)=2. i==current_end(0), so jump! jumps=1, current_end=2. Jump 1 can reach indices 1 or 2.",
      codeHighlightLines: [5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "success", 1: "active", 2: "active" } },
        { type: "variables", entries: [{ name: "jumps", value: 1, highlight: true }, { name: "current_end", value: 2 }, { name: "farthest", value: 2 }] },
      ],
    },
    {
      description:
        "i=1: farthest=max(2, 1+3)=4. i=2: farthest=max(4, 2+1)=4. i==current_end(2), so jump! jumps=2, current_end=4. We can reach index 4 (the end)!",
      codeHighlightLines: [5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "checked", 1: "success", 2: "checked", 3: "active", 4: "success" } },
        { type: "variables", entries: [{ name: "jumps", value: 2, highlight: true }, { name: "current_end", value: 4 }, { name: "path", value: "0→1→4" }] },
      ],
    },
    {
      description:
        "Return 2 (jump 0→1, then 1→4). O(n) time — single pass. This is essentially BFS where each 'level' is the range of positions reachable with one more jump.",
      codeHighlightLines: [10],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "success", 1: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "return", value: 2, highlight: true }] },
      ],
    },
  ],
};

export default solution;

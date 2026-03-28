import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def canJump(nums):
    max_reach = 0

    for i in range(len(nums)):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])
        if max_reach >= len(nums) - 1:
            return True

    return True`,
  steps: [
    {
      description:
        "Greedy approach: track the farthest index we can reach. Start at index 0 with max_reach=0.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "active" }, pointers: [{ index: 0, label: "i" }] },
        { type: "variables", entries: [{ name: "max_reach", value: 0 }, { name: "goal", value: "index 4" }] },
      ],
    },
    {
      description:
        "i=0, nums[0]=2. We can jump up to 2 steps. max_reach = max(0, 0+2) = 2. We can reach index 2.",
      codeHighlightLines: [6],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "active", 1: "pointer-j", 2: "pointer-j" }, pointers: [{ index: 0, label: "i" }, { index: 2, label: "max_reach", color: "cyan" }] },
        { type: "variables", entries: [{ name: "max_reach", value: 2, highlight: true }] },
      ],
    },
    {
      description:
        "i=1, is 1 > max_reach(2)? No, so we can visit this index. nums[1]=3. max_reach = max(2, 1+3) = 4. We can now reach index 4!",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 1: "active", 2: "pointer-j", 3: "pointer-j", 4: "pointer-j" }, pointers: [{ index: 1, label: "i" }, { index: 4, label: "max_reach", color: "cyan" }] },
        { type: "variables", entries: [{ name: "max_reach", value: 4, highlight: true }] },
      ],
    },
    {
      description:
        "Check: max_reach(4) >= len(nums)-1 = 4. Yes! We can reach the last index. Return True immediately.",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "max_reach", value: 4, highlight: true }, { name: "return", value: "True", highlight: true }] },
      ],
    },
    {
      description:
        "The greedy insight: we never need to simulate actual jumps. Just track the farthest reachable position. If it ever reaches the end, return True. If we land on an index beyond max_reach, return False.",
      codeHighlightLines: [1, 2, 3, 4, 5, 6, 7, 8, 10],
      structures: [
        {
          type: "array",
          label: "nums (one possible path: 0 → 1 → 4)",
          values: [2, 3, 1, 1, 4],
          highlights: { 0: "success", 1: "success", 4: "success" },
          pointers: [{ index: 0, label: "jump 2" }, { index: 1, label: "jump 3" }],
        },
        { type: "variables", entries: [{ name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

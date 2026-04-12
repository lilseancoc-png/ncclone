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
        "Determine if you can reach the last index from index 0. Each element = max jump length from that position. Greedy: track the farthest reachable index (max_reach). If at any point i > max_reach, there's an uncrossable gap. nums=[2,3,1,1,4], goal=index 4.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 4: "pointer-j" } },
        { type: "variables", entries: [{ name: "max_reach", value: 0 }, { name: "goal", value: "index 4" }] },
      ],
    },
    {
      description:
        "i=0: Is 0 > max_reach(0)? No, we can be here. max_reach = max(0, 0+2) = 2. From index 0 (value 2), we can reach up to index 2. Frontier expanded. max_reach(2) < 4, haven't reached end yet.",
      codeHighlightLines: [4, 5, 6, 7],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "active", 1: "pointer-j", 2: "pointer-j" } },
        { type: "variables", entries: [{ name: "i=0, nums[0]=2", value: "can reach up to index 2" }, { name: "max_reach", value: 2, highlight: true }, { name: "2 >= 4?", value: "No, keep going" }] },
      ],
    },
    {
      description:
        "i=1: Is 1 > max_reach(2)? No. max_reach = max(2, 1+3) = 4. From index 1 (value 3), we can jump all the way to index 4! Check: max_reach(4) >= len(nums)-1 = 4. YES! Return True immediately — we don't need to visit remaining indices.",
      codeHighlightLines: [4, 5, 6, 7, 8],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 1: "active", 4: "success" } },
        { type: "variables", entries: [{ name: "i=1, nums[1]=3", value: "can reach up to index 4!" }, { name: "max_reach", value: 4, highlight: true }, { name: "4 >= 4?", value: "YES → return True!", highlight: true }] },
      ],
    },
    {
      description:
        "Now consider nums=[3,2,1,0,4] (False case). i=0: max_reach=3. i=1: max(3,3)=3. i=2: max(3,3)=3. i=3: nums[3]=0, max(3,3)=3. i=4: Is 4 > max_reach(3)? YES — we can't reach index 4. The 0 at index 3 creates a barrier: no position before it can jump past it.",
      codeHighlightLines: [4, 5],
      structures: [
        { type: "array", label: "nums (False case)", values: [3, 2, 1, 0, 4], highlights: { 3: "active", 4: "checked" } },
        { type: "variables", entries: [{ name: "max_reach stuck at 3", value: "can't pass index 3" }, { name: "i=4 > max_reach=3", value: "unreachable → False", highlight: true }] },
      ],
    },
    {
      description:
        "Return True for [2,3,1,1,4]. Path: 0→1→4 (jump 1 then jump 3). The greedy works because max_reach monotonically increases — it captures ALL reachable positions in one variable. No need to track which specific jumps to take. Time: O(n) single pass. Space: O(1).",
      codeHighlightLines: [7, 8, 10],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "success", 1: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "return", value: "True", highlight: true }, { name: "path", value: "0 → 1 → 4" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

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
        "Determine if you can reach the last index starting from index 0. Each element represents the maximum jump length from that position. The key greedy insight: we don't need to find an actual path — we just need to know the farthest position reachable so far. If at any index i we have i > max_reach, there's a gap we can't cross. If max_reach ever reaches the end, we're done. This avoids the exponential cost of trying all possible jump sequences. nums=[2,3,1,1,4].",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "active" }, pointers: [{ index: 0, label: "i" }] },
        { type: "variables", entries: [{ name: "max_reach", value: 0 }, { name: "goal", value: "reach index 4" }] },
      ],
    },
    {
      description:
        "i=0: Can we be here? 0 ≤ max_reach(0), yes. From index 0, nums[0]=2 means we can jump up to 2 steps (to index 1 or 2). max_reach = max(0, 0+2) = 2. We've expanded our reachable frontier to index 2. Haven't reached the end yet (2 < 4), keep going.",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "active", 1: "pointer-j", 2: "pointer-j" }, pointers: [{ index: 0, label: "i" }, { index: 2, label: "max_reach", color: "cyan" }] },
        { type: "variables", entries: [{ name: "max_reach", value: 2, highlight: true }, { name: "reached end?", value: "2 < 4, no" }] },
      ],
    },
    {
      description:
        "i=1: Can we be here? 1 ≤ max_reach(2), yes. nums[1]=3 means from index 1 we can jump to index 4. max_reach = max(2, 1+3) = 4. The frontier just reached the last index! Check: max_reach(4) >= len(nums)-1 = 4. Yes — return True immediately without visiting the remaining indices. We don't even need to know which specific path works, just that one exists.",
      codeHighlightLines: [4, 5, 6, 7, 8],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 1: "active", 4: "pointer-j" }, pointers: [{ index: 1, label: "i" }, { index: 4, label: "max_reach", color: "cyan" }] },
        { type: "variables", entries: [{ name: "max_reach", value: 4, highlight: true }, { name: "4 >= 4?", value: "Yes → return True!", highlight: true }] },
      ],
    },
    {
      description:
        "Return True. One possible path is 0→1→4 (jump 1, then jump 3). For the False case (e.g., [3,2,1,0,4]): at index 3, nums[3]=0 and max_reach is still 3, so we're stuck — i=4 > max_reach=3, return False. The 0 creates an impassable barrier. Time: O(n) — single pass. Space: O(1) — just one variable. This greedy approach works because max_reach monotonically increases and captures all reachable positions.",
      codeHighlightLines: [7, 8, 10],
      structures: [
        {
          type: "array",
          label: "nums (path: 0 → 1 → 4)",
          values: [2, 3, 1, 1, 4],
          highlights: { 0: "success", 1: "success", 4: "success" },
        },
        { type: "variables", entries: [{ name: "return", value: "True", highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

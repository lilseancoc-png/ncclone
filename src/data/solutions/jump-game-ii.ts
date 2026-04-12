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
        "Find minimum jumps to reach the last index. Think of it as BFS: each 'level' = positions reachable with one more jump. Track current_end (farthest reachable with current jumps) and farthest (best reach with one MORE jump). When we hit current_end, we must jump. nums=[2,3,1,1,4].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4] },
        { type: "variables", entries: [{ name: "jumps", value: 0 }, { name: "current_end", value: 0 }, { name: "farthest", value: 0 }, { name: "BFS analogy", value: "levels = jump count" }] },
      ],
    },
    {
      description:
        "i=0: farthest = max(0, 0+2) = 2. i == current_end (0==0) — we've scanned all positions in level 0 (just the start). Must jump! jumps=1, current_end=2. Level 1 = indices 1 and 2 (reachable with 1 jump from start).",
      codeHighlightLines: [5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "success", 1: "active", 2: "active" } },
        { type: "variables", entries: [{ name: "i=0, i==current_end", value: "jump! (level 0 done)", highlight: true }, { name: "jumps", value: 1 }, { name: "current_end", value: 2 }, { name: "level 1", value: "indices 1-2" }] },
      ],
    },
    {
      description:
        "i=1: farthest = max(2, 1+3) = 4. Index 1 can reach all the way to index 4 — the best landing spot from this level. i≠current_end (1≠2), keep scanning level 1. i=2: farthest = max(4, 2+1) = 4 (no improvement). i == current_end (2==2) — level 1 fully scanned!",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 1: "active", 2: "active", 4: "pointer-j" } },
        { type: "variables", entries: [{ name: "i=1: farthest=4", value: "best in level 1!", highlight: true }, { name: "i=2: farthest=4", value: "no improvement" }, { name: "i==current_end at i=2", value: "level 1 done" }] },
      ],
    },
    {
      description:
        "At i=2 == current_end: jump again! jumps=2, current_end=4. Level 2 includes index 4 (the last index). The loop only goes to len(nums)-2=3, but current_end=4 already covers the destination. We chose the optimal jump from level 1: index 1 (reach 4) over index 2 (reach 3).",
      codeHighlightLines: [7, 8, 9],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "checked", 1: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "jumps", value: 2, highlight: true }, { name: "current_end", value: 4 }, { name: "path", value: "0 → 1 → 4" }] },
      ],
    },
    {
      description:
        "Return 2. Optimal path: 0→1→4 (jump 1, then jump 3). The BFS guarantee: at each level we find the farthest reach, meaning we maximize distance per jump. No backtracking needed — greedy works because reaching farther with fewer jumps is always optimal. Time: O(n) single pass. Space: O(1).",
      codeHighlightLines: [10],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "success", 1: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "path", value: "0 → 1 → 4" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

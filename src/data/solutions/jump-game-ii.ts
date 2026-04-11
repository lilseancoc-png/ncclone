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
        "Find the minimum number of jumps to reach the last index. The greedy insight: think of it like BFS on a graph. Each 'level' is the set of positions reachable with one more jump. We track current_end (the farthest index reachable with the current number of jumps) and farthest (the farthest index reachable with one additional jump). When we reach current_end, we must take another jump. nums=[2,3,1,1,4].",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4] },
        { type: "variables", entries: [{ name: "jumps", value: 0 }, { name: "current_end", value: 0 }, { name: "farthest", value: 0 }] },
      ],
    },
    {
      description:
        "i=0: farthest = max(0, 0+2) = 2. From index 0 with value 2, we can reach up to index 2. i == current_end (both 0), so we MUST jump now — we've exhausted all positions in the current level. jumps=1, current_end=2. This means: with 1 jump from the start, we can reach any index from 1 to 2.",
      codeHighlightLines: [5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "success", 1: "active", 2: "active" }, pointers: [{ index: 0, label: "i" }, { index: 2, label: "current_end" }] },
        { type: "variables", entries: [{ name: "jumps", value: 1, highlight: true }, { name: "current_end", value: 2 }, { name: "farthest", value: 2 }, { name: "level 1 range", value: "indices 1-2" }] },
      ],
    },
    {
      description:
        "i=1: farthest = max(2, 1+3) = 4. From index 1 (value 3), we could jump all the way to index 4! This is the best we've seen. i=2: farthest = max(4, 2+1) = 4. Index 2 can only reach 3 — doesn't improve our farthest. i == current_end (both 2), time to jump! jumps=2, current_end=4. With 2 jumps, we can reach index 4 (the last index). The optimal path: 0→1→4.",
      codeHighlightLines: [5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "checked", 1: "success", 2: "checked", 4: "success" }, pointers: [{ index: 1, label: "best jump" }, { index: 4, label: "farthest" }] },
        { type: "variables", entries: [{ name: "jumps", value: 2, highlight: true }, { name: "current_end", value: 4 }, { name: "farthest", value: 4 }, { name: "path", value: "0 → 1 → 4" }] },
      ],
    },
    {
      description:
        "Loop ends (we only iterate to len(nums)-2 = 3, but current_end already covers index 4). Return 2. Why this works: at each 'level' of BFS, we find the farthest reachable position. When we run out of positions in the current level (i == current_end), we expand to the next level. This guarantees minimum jumps because we always maximize our reach before committing to a jump. Time: O(n) single pass. Space: O(1).",
      codeHighlightLines: [10],
      structures: [
        { type: "array", label: "nums", values: [2, 3, 1, 1, 4], highlights: { 0: "success", 1: "success", 4: "success" } },
        { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "path", value: "0 → 1 → 4" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

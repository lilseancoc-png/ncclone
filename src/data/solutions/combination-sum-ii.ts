import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Backtracking with Duplicate Skipping",
    timeComplexity: "O(2^n)",
    spaceComplexity: "O(n)",
    code: `def combinationSum2(candidates, target):
    candidates.sort()
    result = []
    def backtrack(start, remain, combo):
        if remain == 0:
            result.append(combo[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remain:
                break
            if i > start and candidates[i] == candidates[i-1]:
                continue
            combo.append(candidates[i])
            backtrack(i + 1, remain - candidates[i], combo)
            combo.pop()
    backtrack(0, target, [])
    return result`,
    steps: [
      {
        description:
          "Find all unique combinations from candidates that sum to target, where each number can be used at most once. This differs from Combination Sum I (unlimited use) — here we must avoid both reusing elements and generating duplicate combinations. The strategy: sort candidates, then use backtracking with two pruning rules: (1) if candidate > remaining target, break (since array is sorted, all subsequent candidates are too large). (2) if candidates[i] == candidates[i-1] at the same decision level, skip (prevents duplicate combos). candidates=[1,1,2,5,6,7,10], target=8.",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          {
            type: "array",
            label: "candidates (sorted)",
            values: [1, 1, 2, 5, 6, 7, 10],
            highlights: {},
          },
          { type: "variables", entries: [{ name: "target", value: 8 }, { name: "rule 1", value: "break if candidate > remain" }, { name: "rule 2", value: "skip duplicates at same level" }] },
        ],
      },
      {
        description:
          "Pick candidates[0]=1 (remain=7). From idx 1: pick candidates[1]=1 (remain=6) — using both 1's is valid since they're different elements. From idx 2: pick 2 (remain=4). From idx 3: 5 > 4, break — sorted array guarantees 6, 7, 10 are also too big. Backtrack. From idx 2, skip 2, try 5>4 break. Backtrack more. From idx 1 with first 1 chosen: try 6 (remain=1), then 7>1 break. Try 6: 1+1+6=8 ✓! Found [1,1,6].",
        codeHighlightLines: [5, 8, 9, 10, 11, 12, 13, 14],
        structures: [
          {
            type: "array",
            label: "candidates",
            values: [1, 1, 2, 5, 6, 7, 10],
            highlights: { 0: "active", 1: "active", 4: "active" },
          },
          {
            type: "variables",
            entries: [
              { name: "combo [1,1,6]", value: "1+1+6 = 8 ✓", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Continue: [1,2,5] (1+2+5=8 ✓), [1,7] (1+7=8 ✓). Back at top level, try idx 1: candidates[1]=1. But i=1 > start=0 and candidates[1]==candidates[0]=1 → SKIP! Without this, we'd regenerate [1,2,5] and [1,7] using the second '1' — exact duplicates. Skip to idx 2: pick 2, try [2,6] (2+6=8 ✓). This is the crucial duplicate-avoidance mechanism: at any decision level, only the first occurrence of each value is used as a starting point.",
        codeHighlightLines: [10, 11],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "combos found", value: "[1,1,6], [1,2,5], [1,7], [2,6]", highlight: true },
              { name: "skip at idx 1", value: "prevents duplicate [1,...] combos" },
            ],
          },
        ],
      },
      {
        description:
          "Result: [[1,1,6], [1,2,5], [1,7], [2,6]] — 4 unique combinations. The two pruning rules make this efficient: the sorted-break prunes the entire right subtree when a candidate is too large, and the duplicate-skip prevents exponential blowup from repeated values. Time: O(2^n) worst case but heavily pruned in practice. This sort+skip pattern is reusable for Subsets II, Permutations II, and any backtracking with duplicates.",
        codeHighlightLines: [16, 17],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "return", value: "[[1,1,6],[1,2,5],[1,7],[2,6]]", highlight: true },
              { name: "total combos", value: 4 },
              { name: "Time", value: "O(2^n)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

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
          "Find all unique combinations from candidates that sum to target. Each number used at most once. Two key challenges: (1) avoid reusing elements (pass i+1 to next level). (2) avoid duplicate combinations from duplicate values in candidates. Strategy: sort first, then skip duplicates at the same decision level. candidates=[1,1,2,5,6,7,10], target=8.",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          { type: "array", label: "candidates (sorted)", values: [1, 1, 2, 5, 6, 7, 10], highlights: {} },
          { type: "variables", entries: [{ name: "target", value: 8 }, { name: "rule 1", value: "break if candidate > remain" }, { name: "rule 2", value: "skip if same as prev at same level" }] },
        ],
      },
      {
        description:
          "Pick candidates[0]=1 (remain=7). From index 1: pick candidates[1]=1 (remain=6). This is valid — we're using two different 1's from different positions. From index 2: pick 2 (remain=4). From index 3: 5>4, break. Backtrack. Try 5 from index 3: 5>4, break. All options exhausted for [1,1,2,...]. Backtrack to [1,1] and try index 4: pick 6 (remain=0). Found [1,1,6]!",
        codeHighlightLines: [5, 8, 9, 10, 11, 12, 13, 14],
        structures: [
          { type: "array", label: "candidates", values: [1, 1, 2, 5, 6, 7, 10], highlights: { 0: "active", 1: "active", 4: "success" } },
          { type: "variables", entries: [{ name: "combo", value: "[1, 1, 6]", highlight: true }, { name: "sum", value: "1+1+6 = 8 ✓" }] },
        ],
      },
      {
        description:
          "Continue exploring from [1,...]: [1,2,5] (1+2+5=8 ✓), [1,7] (1+7=8 ✓). Now at the top level, try index 1: candidates[1]=1. But i=1 > start=0 AND candidates[1]==candidates[0]=1 → SKIP! This is the duplicate-avoidance rule. Without it, we'd regenerate [1,2,5] and [1,7] using the second '1', producing exact duplicates.",
        codeHighlightLines: [10, 11],
        structures: [
          { type: "array", label: "candidates", values: [1, 1, 2, 5, 6, 7, 10], highlights: { 1: "checked" } },
          { type: "variables", entries: [{ name: "found so far", value: "[1,1,6], [1,2,5], [1,7]" }, { name: "skip idx 1", value: "candidates[1]==candidates[0], same level!", highlight: true }, { name: "prevents", value: "duplicate [1,...] combinations" }] },
        ],
      },
      {
        description:
          "Skip to index 2: pick 2 (remain=6). Try [2,5]=7≠8, [2,6]=8 ✓! Found [2,6]. Try [2,7]=9>8, break. Index 3: pick 5 (remain=3). 6>3 break. Index 4: pick 6 (remain=2). 7>2 break. Index 5: pick 7 (remain=1). 10>1 break. Index 6: pick 10>8, break. All top-level choices exhausted.",
        codeHighlightLines: [8, 9, 12, 13, 14],
        structures: [
          { type: "array", label: "candidates", values: [1, 1, 2, 5, 6, 7, 10], highlights: { 2: "active", 4: "success" } },
          { type: "variables", entries: [{ name: "combo [2,6]", value: "2+6 = 8 ✓", highlight: true }, { name: "5+? ≥ 8?", value: "no valid partner" }, { name: "6,7,10 alone", value: "all < or > 8, no combos" }] },
        ],
      },
      {
        description:
          "Result: [[1,1,6], [1,2,5], [1,7], [2,6]]. The two pruning rules work together: sorting enables the break optimization (everything after a too-large value is also too large) and the duplicate skip (identical values are adjacent). Time: O(2^n) worst case but heavily pruned. This sort-then-skip pattern applies to Subsets II, Permutations II — any backtracking with duplicate input values.",
        codeHighlightLines: [16, 17],
        structures: [
          { type: "variables", entries: [{ name: "return", value: "[[1,1,6],[1,2,5],[1,7],[2,6]]", highlight: true }, { name: "total", value: "4 unique combinations" }, { name: "duplicates avoided", value: "sort + skip at same level" }, { name: "Time", value: "O(2^n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

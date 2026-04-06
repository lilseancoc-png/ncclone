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
          "Find all unique combinations that sum to target. Each number used at most once. Sort candidates, use backtracking with two pruning rules: (1) if candidate > remaining, break (sorted, so all after are larger). (2) skip duplicates at same level.",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          {
            type: "array",
            label: "candidates (sorted)",
            values: [1, 1, 2, 5, 6, 7, 10],
            highlights: {},
          },
          { type: "variables", entries: [{ name: "target", value: 8 }] },
        ],
      },
      {
        description:
          "Start with remain=8. Pick 1 (idx 0), remain=7. Pick 1 (idx 1), remain=6. Pick 2, remain=4. Pick 5 > 4? No. But remaining choices: 5>4, break. Backtrack. Try 6>4, break. Combo [1,1,6]? 1+1+6=8 ✓!",
        codeHighlightLines: [8, 9, 10, 11, 12, 13, 14],
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
              { name: "combo", value: "[1, 1, 6]", highlight: true },
              { name: "remain", value: 0 },
            ],
          },
        ],
      },
      {
        description:
          "Continue exploring: [1,2,5] (1+2+5=8 ✓), [1,7] (1+7=8 ✓), [2,6] (2+6=8 ✓). At each level, skip i > start where candidates[i] == candidates[i-1] to avoid duplicate combos like picking the second '1' first.",
        codeHighlightLines: [5, 6, 10, 11],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "found", value: "[1,1,6], [1,2,5], [1,7], [2,6]", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Result: [[1,1,6], [1,2,5], [1,7], [2,6]]. The sort + skip pattern is the standard way to handle duplicates in backtracking. Breaking when candidate > remain prunes large branches early.",
        codeHighlightLines: [16, 17],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "return", value: "[[1,1,6],[1,2,5],[1,7],[2,6]]", highlight: true },
              { name: "total combos", value: 4 },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

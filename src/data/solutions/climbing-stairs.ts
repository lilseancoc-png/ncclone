import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Recursive (Top-Down DP)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: `def climb_stairs(n):
    memo = {}
    def dp(i):
        if i <= 1:
            return 1
        if i in memo:
            return memo[i]
        memo[i] = dp(i - 1) + dp(i - 2)
        return memo[i]
    return dp(n)`,
    steps: [
      {
        description:
          "How many distinct ways to climb n=5 stairs, taking 1 or 2 steps at a time? This is the Fibonacci pattern: to reach step i, you either came from step i-1 (took 1 step) or step i-2 (took 2 steps). So ways(i) = ways(i-1) + ways(i-2). We memoize to avoid recomputation.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "stairs", values: [0, 1, 2, 3, 4, 5] },
          { type: "variables", entries: [{ name: "n", value: 5 }] },
          { type: "hashmap", label: "memo", entries: [] },
        ],
      },
      {
        description:
          "Base cases: dp(0)=1 (one way to stay at ground), dp(1)=1 (one way: single step). dp(2) = dp(1) + dp(0) = 1 + 1 = 2. Two ways: [1,1] or [2].",
        codeHighlightLines: [4, 5, 8],
        structures: [
          { type: "array", label: "stairs", values: [0, 1, 2, 3, 4, 5], highlights: { 0: "success", 1: "success", 2: "active" } },
          { type: "hashmap", label: "memo", entries: [[2, 2]], highlightKeys: [2] },
          { type: "variables", entries: [{ name: "dp(0)", value: 1 }, { name: "dp(1)", value: 1 }, { name: "dp(2)", value: 2, highlight: true }] },
        ],
      },
      {
        description:
          "dp(3) = dp(2) + dp(1) = 2 + 1 = 3. Three ways: [1,1,1], [1,2], [2,1]. dp(4) = dp(3) + dp(2) = 3 + 2 = 5.",
        codeHighlightLines: [8, 9],
        structures: [
          { type: "array", label: "stairs", values: [0, 1, 2, 3, 4, 5], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "active" } },
          { type: "hashmap", label: "memo", entries: [[2, 2], [3, 3], [4, 5]], highlightKeys: [3, 4] },
          { type: "variables", entries: [{ name: "dp(3)", value: 3 }, { name: "dp(4)", value: 5, highlight: true }] },
        ],
      },
      {
        description:
          "dp(5) = dp(4) + dp(3) = 5 + 3 = 8. Return 8 — there are 8 distinct ways to climb 5 stairs. Time: O(n) with memoization. Space: O(n) for the memo dict + recursion stack. The bottom-up approach (Approach 2) eliminates the recursion overhead.",
        codeHighlightLines: [8, 9, 10],
        structures: [
          { type: "array", label: "stairs", values: [0, 1, 2, 3, 4, 5], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
          { type: "hashmap", label: "memo", entries: [[2, 2], [3, 3], [4, 5], [5, 8]], highlightKeys: [5] },
          { type: "variables", entries: [{ name: "return dp(5)", value: 8, highlight: true }] },
        ],
      },
    ],
  },
  {
    label: "Optimal — Bottom-Up O(1) Space",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def climb_stairs(n):
    if n <= 1:
        return 1
    prev2, prev1 = 1, 1
    for i in range(2, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1`,
    steps: [
      {
        description:
          "Since we only need the previous two values (like Fibonacci), we don't need an array or memo — just two variables! Start with prev2=1 (step 0) and prev1=1 (step 1).",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          { type: "array", label: "stairs", values: [0, 1, 2, 3, 4, 5] },
          { type: "variables", entries: [{ name: "prev2", value: 1 }, { name: "prev1", value: 1 }, { name: "n", value: 5 }] },
        ],
      },
      {
        description:
          "i=2: curr = 1 + 1 = 2. Slide: prev2=1, prev1=2. i=3: curr = 2 + 1 = 3. Slide: prev2=2, prev1=3.",
        codeHighlightLines: [5, 6, 7, 8],
        structures: [
          { type: "array", label: "stairs", values: [0, 1, 2, 3, 4, 5], highlights: { 2: "checked", 3: "active" }, pointers: [{ index: 3, label: "i" }] },
          { type: "variables", entries: [{ name: "prev2", value: 2 }, { name: "prev1", value: 3, highlight: true }] },
        ],
      },
      {
        description:
          "i=4: curr = 3 + 2 = 5. Slide: prev2=3, prev1=5. i=5: curr = 5 + 3 = 8. Slide: prev2=5, prev1=8.",
        codeHighlightLines: [5, 6, 7, 8],
        structures: [
          { type: "array", label: "stairs", values: [0, 1, 2, 3, 4, 5], highlights: { 2: "checked", 3: "checked", 4: "checked", 5: "active" }, pointers: [{ index: 5, label: "i" }] },
          { type: "variables", entries: [{ name: "prev2", value: 5 }, { name: "prev1", value: 8, highlight: true }] },
        ],
      },
      {
        description:
          "Return prev1 = 8. Same answer, but O(1) space — we only tracked two variables instead of an array or hashmap. This is the optimal solution: O(n) time, O(1) space. It's essentially computing Fibonacci numbers.",
        codeHighlightLines: [9],
        structures: [
          { type: "array", label: "stairs", values: [0, 1, 2, 3, 4, 5], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
          { type: "variables", entries: [{ name: "return", value: 8, highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

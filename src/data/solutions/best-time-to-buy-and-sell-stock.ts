import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  // ── Approach 1: Brute Force — Check All Pairs ────────────────────────
  {
    label: "Brute Force — All Pairs",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    code: `def max_profit(prices):
    max_profit = 0
    for i in range(len(prices)):
        for j in range(i + 1, len(prices)):
            profit = prices[j] - prices[i]
            max_profit = max(max_profit, profit)
    return max_profit`,
    steps: [
      {
        description:
          "Find the maximum profit from one buy-sell transaction. The brute force approach: try every possible (buy, sell) pair where buy comes before sell. Compare all profits and keep the maximum. This checks n*(n-1)/2 pairs, giving O(n²) time.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4] },
          { type: "variables", entries: [{ name: "max_profit", value: 0 }] },
        ],
      },
      {
        description:
          "i=0 (buy at 7): Try selling at every later day. j=1: 1-7=-6. j=2: 5-7=-2. j=3: 3-7=-4. j=4: 6-7=-1. j=5: 4-7=-3. All negative — buying at the peak is never profitable. max_profit stays 0.",
        codeHighlightLines: [3, 4, 5, 6],
        structures: [
          { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 0: "active" }, pointers: [{ index: 0, label: "buy" }] },
          { type: "variables", entries: [{ name: "best profit from day 0", value: -1 }, { name: "max_profit", value: 0 }] },
        ],
      },
      {
        description:
          "i=1 (buy at 1): j=2: 5-1=4. j=3: 3-1=2. j=4: 6-1=5. j=5: 4-1=3. Best is 5 (sell at 6). Update max_profit to 5.",
        codeHighlightLines: [3, 4, 5, 6],
        structures: [
          { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 0: "checked", 1: "active", 4: "found" }, pointers: [{ index: 1, label: "buy" }, { index: 4, label: "best sell" }] },
          { type: "variables", entries: [{ name: "profit (sell day 4)", value: 5, highlight: true }, { name: "max_profit", value: 5, highlight: true }] },
        ],
      },
      {
        description:
          "i=2 (buy at 5): Best sell is day 4 at 6, profit=1. i=3 (buy at 3): Best sell is day 4, profit=3. i=4 (buy at 6): Only j=5, profit=-2. None beat max_profit=5.",
        codeHighlightLines: [3, 4, 5, 6],
        structures: [
          { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked" }, pointers: [{ index: 4, label: "i" }] },
          { type: "variables", entries: [{ name: "max_profit", value: 5 }] },
        ],
      },
      {
        description:
          "Return 5 (buy at price 1, sell at price 6). Time: O(n²) — we check every pair. Space: O(1) — only a few variables. This works but is slow for large inputs. The one-pass approach (Approach 2) solves it in O(n).",
        codeHighlightLines: [7],
        structures: [
          { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 1: "success", 4: "success" }, pointers: [{ index: 1, label: "buy" }, { index: 4, label: "sell" }] },
          { type: "variables", entries: [{ name: "return", value: 5, highlight: true }] },
        ],
      },
    ],
  },

  // ── Approach 2: Optimal — One Pass (Track Min) ───────────────────────
  {
    label: "Optimal — One Pass",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def max_profit(prices):
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        profit = price - min_price
        max_profit = max(max_profit, profit)
    return max_profit`,
    steps: [
      {
        description:
          "Key insight: at each day, the best profit if we sell today is today's price minus the cheapest price we've seen so far. So we just track the running minimum and compute the profit at each step. One pass through the array gives us O(n) time.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4] },
          { type: "variables", entries: [{ name: "min_price", value: "∞" }, { name: "max_profit", value: 0 }] },
        ],
      },
      {
        description:
          "price=7. It's less than ∞, so min_price=7. Profit = 7-7 = 0. max_profit stays 0. (If we bought and sold on the same day, no profit.)",
        codeHighlightLines: [4, 5, 6, 7, 8],
        structures: [
          { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 0: "active" }, pointers: [{ index: 0, label: "buy?" }] },
          { type: "variables", entries: [{ name: "min_price", value: 7, highlight: true }, { name: "profit", value: 0 }, { name: "max_profit", value: 0 }] },
        ],
      },
      {
        description:
          "price=1. New minimum! min_price=1. This is the cheapest we've seen — if there's a higher price later, this is our best buy point. Profit = 1-1 = 0.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "buy!" }] },
          { type: "variables", entries: [{ name: "min_price", value: 1, highlight: true }, { name: "profit", value: 0 }, { name: "max_profit", value: 0 }] },
        ],
      },
      {
        description:
          "price=5. Not a new min. Profit = 5-1 = 4. New max_profit = 4! If we bought at 1 and sold at 5, that's a profit of 4.",
        codeHighlightLines: [7, 8],
        structures: [
          { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 1: "success", 2: "active" }, pointers: [{ index: 1, label: "buy" }, { index: 2, label: "sell?" }] },
          { type: "variables", entries: [{ name: "min_price", value: 1 }, { name: "profit", value: 4, highlight: true }, { name: "max_profit", value: 4, highlight: true }] },
        ],
      },
      {
        description:
          "price=3. Profit = 3-1 = 2. Less than max_profit=4, no update. Not every day is worth selling.",
        codeHighlightLines: [7, 8],
        structures: [
          { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 1: "success", 2: "checked", 3: "active" }, pointers: [{ index: 1, label: "buy" }, { index: 3, label: "sell?" }] },
          { type: "variables", entries: [{ name: "min_price", value: 1 }, { name: "profit", value: 2 }, { name: "max_profit", value: 4 }] },
        ],
      },
      {
        description:
          "price=6. Profit = 6-1 = 5. New max_profit = 5! Best so far: buy at 1, sell at 6.",
        codeHighlightLines: [7, 8],
        structures: [
          { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 1: "success", 4: "active" }, pointers: [{ index: 1, label: "buy" }, { index: 4, label: "sell!" }] },
          { type: "variables", entries: [{ name: "min_price", value: 1 }, { name: "profit", value: 5, highlight: true }, { name: "max_profit", value: 5, highlight: true }] },
        ],
      },
      {
        description:
          "price=4. Profit = 4-1 = 3. Less than 5, no update. Done! Return max_profit = 5. Time: O(n) — single pass. Space: O(1) — just two variables. We went from O(n²) brute force to O(n) by realizing we only need the minimum price seen so far.",
        codeHighlightLines: [9],
        structures: [
          { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 1: "success", 4: "success" }, pointers: [{ index: 1, label: "buy" }, { index: 4, label: "sell" }] },
          { type: "variables", entries: [{ name: "return", value: 5, highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

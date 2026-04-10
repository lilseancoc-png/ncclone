import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "State Machine DP",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def maxProfit(prices):
    sold = 0        # just sold
    held = float('-inf')  # holding stock
    rest = 0        # cooldown / idle
    for price in prices:
        prev_sold = sold
        sold = held + price
        held = max(held, rest - price)
        rest = max(rest, prev_sold)
    return max(sold, rest)`,
    steps: [
      {
        description:
          "Maximize profit from buying and selling stocks, but after each sell you must wait one day (cooldown) before buying again. This creates a state machine with three states: 'held' (currently holding a stock), 'sold' (just sold today — must cooldown tomorrow), 'rest' (idle/cooldown — can buy or stay idle). Transitions: rest→held (buy), held→held (hold), held→sold (sell), sold→rest (mandatory cooldown). Each day, update all three states. prices=[1,2,3,0,2].",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          {
            type: "array",
            label: "prices",
            values: [1, 2, 3, 0, 2],
            highlights: {},
          },
          {
            type: "variables",
            entries: [
              { name: "sold", value: "0 (just sold profit)" },
              { name: "held", value: "-∞ (holding stock profit)" },
              { name: "rest", value: "0 (idle profit)" },
            ],
          },
        ],
      },
      {
        description:
          "Day 0 (price=1): sold = held+price = -∞+1 = -∞ (can't sell, not holding). held = max(held, rest-price) = max(-∞, 0-1) = -1 (buy at 1, spent 1 from rest profit). rest = max(rest, prev_sold) = max(0, 0) = 0. Day 1 (price=2): sold = -1+2 = 1 (sell stock bought at 1, profit = 1). held = max(-1, 0-2) = -1 (keep holding, buying at 2 would be worse). rest = max(0, -∞) = 0.",
        codeHighlightLines: [5, 6, 7, 8, 9],
        structures: [
          {
            type: "array",
            label: "prices",
            values: [1, 2, 3, 0, 2],
            highlights: { 0: "checked", 1: "active" },
          },
          {
            type: "variables",
            entries: [
              { name: "sold", value: "1 (sell at 2)", highlight: true },
              { name: "held", value: "-1 (bought at 1)" },
              { name: "rest", value: 0 },
            ],
          },
        ],
      },
      {
        description:
          "Day 2 (price=3): sold = -1+3 = 2 (if we held from day 0, sell now for 2 profit). rest = max(0, prev_sold=1) = 1 (cooling down after selling on day 1). Day 3 (price=0): sold = held+0 = -1 (selling now is bad). held = max(-1, rest-0) = max(-1, 1-0) = 1 (buy at price 0 with rest=1 means total held profit = 1!). rest = max(1, prev_sold=2) = 2. Buying at 0 after cooling down is a great move.",
        codeHighlightLines: [6, 7, 8, 9],
        structures: [
          {
            type: "array",
            label: "prices",
            values: [1, 2, 3, 0, 2],
            highlights: { 2: "checked", 3: "active" },
          },
          {
            type: "variables",
            entries: [
              { name: "held", value: "1 (buy at 0!)", highlight: true },
              { name: "rest", value: 2 },
            ],
          },
        ],
      },
      {
        description:
          "Day 4 (price=2): sold = 1+2 = 3 (sell stock bought at 0 for 2, total profit 3). held = max(1, 2-2) = 1. rest = max(2, -1) = 2. Return max(sold=3, rest=2) = 3. Optimal strategy: buy at 1, sell at 2 (profit 1), cooldown day 2, buy at 0, sell at 2 (profit 2). Total: 3. The state machine naturally handles the cooldown constraint. Time: O(n). Space: O(1) — just three variables.",
        codeHighlightLines: [10],
        structures: [
          {
            type: "array",
            label: "prices",
            values: [1, 2, 3, 0, 2],
            highlights: { 0: "success", 1: "success", 3: "success", 4: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: 3, highlight: true }, { name: "strategy", value: "buy@1,sell@2,cool,buy@0,sell@2" }, { name: "Time", value: "O(n)" }],
          },
        ],
      },
    ],
  },
];

export default solutions;

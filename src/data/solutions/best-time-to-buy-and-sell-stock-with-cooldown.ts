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
          "Maximize profit from buying and selling stocks, but after each sell you must wait one day (cooldown) before buying again. This creates a state machine with three states: 'held' (holding a stock), 'sold' (just sold today — must cooldown tomorrow), 'rest' (idle/cooldown — can buy or stay idle). Transitions: rest→held (buy), held→held (hold), held→sold (sell), sold→rest (mandatory cooldown). prices=[1,2,3,0,2].",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          { type: "array", label: "prices", values: [1, 2, 3, 0, 2] },
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
          "Day 0 (price=1): sold = held+1 = -∞ (can't sell, not holding anything). held = max(-∞, rest-1) = max(-∞, -1) = -1 (buy at 1, spending 1 from rest profit). rest = max(0, prev_sold=0) = 0. First action: buy stock at price 1. held=-1 means 'holding a stock, net profit is -1 so far'.",
        codeHighlightLines: [5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "prices", values: [1, 2, 3, 0, 2], highlights: { 0: "active" } },
          {
            type: "variables",
            entries: [
              { name: "sold", value: "-∞ (can't sell yet)" },
              { name: "held", value: "-1 (bought at 1)", highlight: true },
              { name: "rest", value: 0 },
            ],
          },
        ],
      },
      {
        description:
          "Day 1 (price=2): sold = held+2 = -1+2 = 1 (sell stock bought at 1, profit=1!). held = max(-1, 0-2) = -1 (keep holding — buying at 2 is worse than our position). rest = max(0, prev_sold=-∞) = 0. Selling at price 2 locks in profit of 1, but we enter mandatory cooldown tomorrow.",
        codeHighlightLines: [5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "prices", values: [1, 2, 3, 0, 2], highlights: { 0: "checked", 1: "active" } },
          {
            type: "variables",
            entries: [
              { name: "sold", value: "1 (sell at 2, profit 1)", highlight: true },
              { name: "held", value: "-1 (still holding)" },
              { name: "rest", value: 0 },
            ],
          },
        ],
      },
      {
        description:
          "Day 2 (price=3): sold = -1+3 = 2 (could sell held stock for profit 2). held = max(-1, 0-3) = -1 (buying at 3 is worse). rest = max(0, prev_sold=1) = 1 (cooling down from day 1 sell). Day 3 (price=0): sold = -1+0 = -1 (selling now is terrible). held = max(-1, rest-0) = max(-1, 1) = 1 (BUY at 0! With rest=1 from prior profit, held becomes 1). rest = max(1, prev_sold=2) = 2.",
        codeHighlightLines: [6, 7, 8, 9],
        structures: [
          { type: "array", label: "prices", values: [1, 2, 3, 0, 2], highlights: { 2: "checked", 3: "active" } },
          {
            type: "variables",
            entries: [
              { name: "day 3: held", value: "1 (buy at 0 — great deal!)", highlight: true },
              { name: "day 3: rest", value: "2 (from prior sell profit)" },
              { name: "strategy so far", value: "buy@1, sell@2, cool, buy@0" },
            ],
          },
        ],
      },
      {
        description:
          "Day 4 (price=2): sold = 1+2 = 3 (sell stock bought at 0, total profit 3!). held = max(1, 2-2) = 1. rest = max(2, prev_sold=-1) = 2. Return max(sold=3, rest=2) = 3. Optimal: buy@1, sell@2 (+1), cooldown, buy@0, sell@2 (+2) = 3. The state machine naturally handles cooldown — 'rest' absorbs prior sell profits, and 'held' can only transition from 'rest' (enforcing the 1-day gap). Time: O(n). Space: O(1).",
        codeHighlightLines: [10],
        structures: [
          { type: "array", label: "prices", values: [1, 2, 3, 0, 2], highlights: { 0: "success", 1: "success", 3: "success", 4: "success" } },
          {
            type: "variables",
            entries: [
              { name: "return", value: 3, highlight: true },
              { name: "strategy", value: "buy@1,sell@2,cool,buy@0,sell@2" },
              { name: "Time", value: "O(n), Space: O(1)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

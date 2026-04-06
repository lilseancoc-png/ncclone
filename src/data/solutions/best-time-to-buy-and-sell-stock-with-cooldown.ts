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
          "Buy and sell stocks with a cooldown day after selling. Three states: 'held' (own stock), 'sold' (just sold), 'rest' (cooldown/idle). Transitions: held→sold (sell), rest→held (buy), sold→rest (cooldown), rest→rest (wait).",
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
              { name: "sold", value: 0 },
              { name: "held", value: "-inf" },
              { name: "rest", value: 0 },
            ],
          },
        ],
      },
      {
        description:
          "Day 0 (price=1): sold = -inf+1 = -inf. held = max(-inf, 0-1) = -1 (buy). rest = max(0, 0) = 0. Day 1 (price=2): sold = -1+2 = 1 (sell). held = max(-1, 0-2) = -1. rest = max(0, -inf) = 0.",
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
              { name: "sold", value: 1, highlight: true },
              { name: "held", value: -1 },
              { name: "rest", value: 0 },
            ],
          },
        ],
      },
      {
        description:
          "Day 2 (price=3): sold = -1+3 = 2. held = max(-1, 0-3) = -1. rest = max(0, 1) = 1 (cooldown after day 1 sell). Day 3 (price=0): sold = -1+0 = -1. held = max(-1, 1-0) = 1 (buy at 0!). rest = max(1, 2) = 2.",
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
              { name: "sold", value: -1 },
              { name: "held", value: 1, highlight: true },
              { name: "rest", value: 2 },
            ],
          },
        ],
      },
      {
        description:
          "Day 4 (price=2): sold = 1+2 = 3. held = max(1, 2-2) = 1. rest = max(2, -1) = 2. Return max(3, 2) = 3. Strategy: buy@1, sell@2, cooldown, buy@0, sell@2. Profit = 1+2 = 3.",
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
            entries: [{ name: "return", value: 3, highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

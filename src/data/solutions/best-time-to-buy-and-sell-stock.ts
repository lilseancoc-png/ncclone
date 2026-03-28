import { SolutionData } from "../types";

const solution: SolutionData = {
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
      description: "Find max profit from buying and selling stock once. Track the minimum price seen so far.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4] },
        { type: "variables", entries: [{ name: "min_price", value: "∞" }, { name: "max_profit", value: 0 }] },
      ],
    },
    {
      description: "price=7. It's less than ∞, so min_price=7. Profit = 7-7 = 0. max_profit stays 0.",
      codeHighlightLines: [4, 5, 6, 7, 8],
      structures: [
        { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 0: "active" }, pointers: [{ index: 0, label: "buy?" }] },
        { type: "variables", entries: [{ name: "min_price", value: 7, highlight: true }, { name: "profit", value: 0 }, { name: "max_profit", value: 0 }] },
      ],
    },
    {
      description: "price=1. New minimum! min_price=1. Profit = 1-1 = 0. max_profit stays 0.",
      codeHighlightLines: [4, 5, 6],
      structures: [
        { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "buy!" }] },
        { type: "variables", entries: [{ name: "min_price", value: 1, highlight: true }, { name: "profit", value: 0 }, { name: "max_profit", value: 0 }] },
      ],
    },
    {
      description: "price=5. Not a new min. Profit = 5-1 = 4. New max_profit = 4!",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 1: "success", 2: "active" }, pointers: [{ index: 1, label: "buy" }, { index: 2, label: "sell?" }] },
        { type: "variables", entries: [{ name: "min_price", value: 1 }, { name: "profit", value: 4, highlight: true }, { name: "max_profit", value: 4, highlight: true }] },
      ],
    },
    {
      description: "price=3. Profit = 3-1 = 2. Less than max_profit=4, no update.",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 1: "success", 2: "checked", 3: "active" }, pointers: [{ index: 1, label: "buy" }, { index: 3, label: "sell?" }] },
        { type: "variables", entries: [{ name: "min_price", value: 1 }, { name: "profit", value: 2 }, { name: "max_profit", value: 4 }] },
      ],
    },
    {
      description: "price=6. Profit = 6-1 = 5. New max_profit = 5! Best so far: buy at 1, sell at 6.",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 1: "success", 4: "active" }, pointers: [{ index: 1, label: "buy" }, { index: 4, label: "sell!" }] },
        { type: "variables", entries: [{ name: "min_price", value: 1 }, { name: "profit", value: 5, highlight: true }, { name: "max_profit", value: 5, highlight: true }] },
      ],
    },
    {
      description: "price=4. Profit = 4-1 = 3. Less than 5, no update. Done! Max profit = 5.",
      codeHighlightLines: [9],
      structures: [
        { type: "array", label: "prices", values: [7, 1, 5, 3, 6, 4], highlights: { 1: "success", 4: "success" }, pointers: [{ index: 1, label: "buy" }, { index: 4, label: "sell" }] },
        { type: "variables", entries: [{ name: "return", value: 5, highlight: true }] },
      ],
    },
  ],
};

export default solution;

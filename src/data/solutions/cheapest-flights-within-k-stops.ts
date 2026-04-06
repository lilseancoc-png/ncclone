import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Bellman-Ford (k+1 iterations)",
    timeComplexity: "O(k * E)",
    spaceComplexity: "O(n)",
    code: `def findCheapestPrice(n, flights, src, dst, k):
    prices = [float('inf')] * n
    prices[src] = 0
    for i in range(k + 1):
        temp = prices[:]
        for s, d, cost in flights:
            if prices[s] != float('inf'):
                temp[d] = min(temp[d], prices[s] + cost)
        prices = temp
    return prices[dst] if prices[dst] != float('inf') else -1`,
    steps: [
      {
        description:
          "Find cheapest flight from src to dst with at most k stops. Use Bellman-Ford relaxation for k+1 rounds (k stops = k+1 edges). Each round we copy prices to avoid using updates from the same round (ensures stop count is correct).",
        codeHighlightLines: [1, 2, 3, 4],
        structures: [
          {
            type: "array",
            label: "prices",
            values: ["0", "INF", "INF", "INF"],
            highlights: { 0: "success" },
          },
          {
            type: "variables",
            entries: [
              { name: "src", value: 0 },
              { name: "dst", value: 3 },
              { name: "k", value: 1 },
              { name: "flights", value: "0→1:100, 1→2:100, 2→3:100, 0→3:500" },
            ],
          },
        ],
      },
      {
        description:
          "Round 1 (i=0, max 1 edge): Relax all edges using original prices. 0→1: temp[1] = min(INF, 0+100) = 100. 0→3: temp[3] = min(INF, 0+500) = 500. Others: src is INF, skip.",
        codeHighlightLines: [5, 6, 7, 8],
        structures: [
          {
            type: "array",
            label: "prices after round 1",
            values: [0, 100, "INF", 500],
            highlights: { 1: "active", 3: "active" },
          },
        ],
      },
      {
        description:
          "Round 2 (i=1, max 2 edges): 1→2: temp[2] = min(INF, 100+100) = 200. 2→3: prices[2]=INF, skip. 0→3: temp[3] = min(500, 500) = 500. With k=1 stop, best to dst=3 is 500 (direct flight).",
        codeHighlightLines: [6, 7, 8, 9],
        structures: [
          {
            type: "array",
            label: "prices after round 2",
            values: [0, 100, 200, 500],
            highlights: { 2: "active", 3: "success" },
          },
          {
            type: "variables",
            entries: [
              { name: "return", value: 500, highlight: true },
              { name: "note", value: "0→1→2→3 costs 300 but needs 2 stops > k=1" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

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
          "Find the cheapest flight from src to dst with at most k stops. Standard Dijkstra doesn't work here because it doesn't limit the number of edges. Instead, use Bellman-Ford: relax all edges k+1 times (k stops = k+1 flight segments). Critical detail: we copy prices each round to prevent using values updated in the SAME round — this ensures each round adds exactly one more flight segment. n=4, src=0, dst=3, k=1. Flights: 0→1:$100, 1→2:$100, 2→3:$100, 0→3:$500.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "array",
            label: "prices (cost to reach each city)",
            values: ["0", "∞", "∞", "∞"],
            highlights: { 0: "success" },
          },
          {
            type: "graph",
            label: "flight network",
            nodes: [{ id: 0, highlight: "active" }, { id: 1 }, { id: 2 }, { id: 3 }],
            edges: [
              { from: 0, to: 1, label: "$100" },
              { from: 1, to: 2, label: "$100" },
              { from: 2, to: 3, label: "$100" },
              { from: 0, to: 3, label: "$500" },
            ],
            directed: true,
          },
        ],
      },
      {
        description:
          "Round 1 (i=0): Relax all edges using original prices. This finds all cities reachable with 1 flight (0 stops). Flight 0→1: temp[1] = min(∞, 0+100) = 100. Flight 0→3: temp[3] = min(∞, 0+500) = 500. Flights from cities 1,2: prices[1]=prices[2]=∞, so skip (can't fly from unreached cities). After round 1: cities 1 and 3 are reachable with 1 flight.",
        codeHighlightLines: [4, 5, 6, 7, 8],
        structures: [
          {
            type: "array",
            label: "prices after round 1 (1 flight max)",
            values: [0, 100, "∞", 500],
            highlights: { 1: "active", 3: "active" },
          },
          { type: "variables", entries: [{ name: "round", value: "1 of 2 (k+1=2)" }, { name: "0→1", value: "$100", highlight: true }, { name: "0→3", value: "$500 (direct)", highlight: true }] },
        ],
      },
      {
        description:
          "Round 2 (i=1): Relax all edges again. Now we can use 2 flights (1 stop). Flight 1→2: temp[2] = min(∞, 100+100) = 200. Flight 2→3: prices[2] was ∞ (from previous round's snapshot!), so skip. This is why we copy — if we didn't, we'd use round 2's updated price for city 2, which would let us chain 3 flights (0→1→2→3 = $300), violating the k=1 stop limit. Flight 0→3: temp[3] = min(500, 500) = 500, no improvement.",
        codeHighlightLines: [4, 5, 6, 7, 8, 9],
        structures: [
          {
            type: "array",
            label: "prices after round 2 (2 flights max)",
            values: [0, 100, 200, 500],
            highlights: { 2: "active", 3: "success" },
          },
          { type: "variables", entries: [{ name: "round", value: "2 of 2 (done)" }, { name: "1→2", value: "$200 (via 0→1→2)" }, { name: "2→3 skipped", value: "prices[2]=∞ in snapshot!" }] },
        ],
      },
      {
        description:
          "Return prices[dst] = prices[3] = 500. The cheapest way to reach city 3 with at most 1 stop is the direct flight 0→3 for $500. The route 0→1→2→3 costs only $300 but requires 2 stops (exceeds k=1). The copy trick in Bellman-Ford correctly prevented us from chaining too many flights. Time: O(k × E) — k+1 rounds, each processing all edges. Space: O(n) for the price arrays.",
        codeHighlightLines: [10],
        structures: [
          {
            type: "array",
            label: "final prices",
            values: [0, 100, 200, 500],
            highlights: { 3: "success" },
          },
          { type: "variables", entries: [{ name: "return", value: 500, highlight: true }, { name: "path", value: "0→3 (direct, $500)" }, { name: "0→1→2→3", value: "$300 but 2 stops > k=1" }, { name: "Time", value: "O(k × E)" }] },
        ],
      },
    ],
  },
];

export default solutions;

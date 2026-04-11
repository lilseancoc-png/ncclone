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
          "Find the cheapest flight from src to dst with at most k stops. Dijkstra doesn't work — it doesn't limit edge count. Bellman-Ford with k+1 rounds does: each round relaxes all edges, extending paths by one more flight. Critical: copy prices each round to prevent using values updated in the SAME round (which would chain too many flights). n=4, src=0, dst=3, k=1. Flights: 0→1:$100, 1→2:$100, 2→3:$100, 0→3:$500.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "prices", values: ["0", "∞", "∞", "∞"], highlights: { 0: "success" } },
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
          "Round 1 (i=0): Copy prices to temp. Relax all edges using ORIGINAL prices (not temp). This finds cities reachable with exactly 1 flight (0 stops). 0→1: temp[1] = min(∞, 0+100) = 100. 1→2: prices[1]=∞, skip (can't fly from unreached city). 2→3: prices[2]=∞, skip. 0→3: temp[3] = min(∞, 0+500) = 500. After round 1: can reach city 1 ($100) and city 3 ($500).",
        codeHighlightLines: [4, 5, 6, 7, 8, 9],
        structures: [
          { type: "array", label: "prices after round 1 (0 stops)", values: [0, 100, "∞", 500], highlights: { 1: "active", 3: "active" } },
          { type: "variables", entries: [{ name: "0→1", value: "$100 (1 flight)", highlight: true }, { name: "0→3", value: "$500 direct", highlight: true }, { name: "1→2, 2→3", value: "skipped (source unreached)" }] },
        ],
      },
      {
        description:
          "Round 2 (i=1): Copy prices to temp. Relax all edges. Now prices[1]=100, so 1→2 works: temp[2] = min(∞, 100+100) = 200. But 2→3: prices[2] is still ∞ in the ORIGINAL copy! If we hadn't copied, prices[2] would be 200 from this round, and we'd compute temp[3] = min(500, 200+100) = 300. That's 3 flights (0→1→2→3), violating k=1 stop. The copy prevents exactly this.",
        codeHighlightLines: [5, 6, 7, 8],
        structures: [
          { type: "array", label: "prices after round 2 (1 stop max)", values: [0, 100, 200, 500], highlights: { 2: "active", 3: "success" } },
          { type: "variables", entries: [{ name: "1→2", value: "$200 (0→1→2, 1 stop)", highlight: true }, { name: "2→3 skipped!", value: "prices[2]=∞ in snapshot" }, { name: "why copy?", value: "prevents chaining 3 flights in 1 round" }] },
        ],
      },
      {
        description:
          "k+1 = 2 rounds complete. prices[3] = 500. The cheapest way with at most 1 stop is the direct flight 0→3 for $500. The route 0→1→2→3 costs $300 but needs 2 stops — exceeds k=1. Without the copy trick, Bellman-Ford would have found $300 incorrectly. This is the key difference from standard Bellman-Ford.",
        codeHighlightLines: [9, 10],
        structures: [
          {
            type: "graph",
            label: "result",
            nodes: [{ id: 0, highlight: "success" }, { id: 1 }, { id: 2 }, { id: 3, highlight: "success" }],
            edges: [
              { from: 0, to: 1, label: "$100" },
              { from: 1, to: 2, label: "$100" },
              { from: 2, to: 3, label: "$100" },
              { from: 0, to: 3, label: "$500" },
            ],
            directed: true,
          },
          { type: "variables", entries: [{ name: "best with k=1 stop", value: "$500 (direct 0→3)", highlight: true }, { name: "0→1→2→3 = $300", value: "invalid: 2 stops > k=1" }] },
        ],
      },
      {
        description:
          "Return 500. Time: O(k × E) — k+1 rounds, each scanning all edges. Space: O(n) for the price arrays. The copy-per-round technique is specific to the k-stops constraint; standard Bellman-Ford (which finds shortest paths with unlimited edges) modifies prices in-place. If prices[dst] remains ∞ after all rounds, return -1 (destination unreachable within k stops).",
        codeHighlightLines: [10],
        structures: [
          { type: "variables", entries: [{ name: "return", value: 500, highlight: true }, { name: "key insight", value: "copy prices each round → limits flight count" }, { name: "Time", value: "O(k × E)" }, { name: "Space", value: "O(n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

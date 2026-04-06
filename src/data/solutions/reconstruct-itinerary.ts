import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Hierholzer's Algorithm (Eulerian Path)",
    timeComplexity: "O(E log E)",
    spaceComplexity: "O(E)",
    code: `def findItinerary(tickets):
    graph = defaultdict(list)
    for src, dst in sorted(tickets, reverse=True):
        graph[src].append(dst)
    route = []
    def dfs(airport):
        while graph[airport]:
            dfs(graph[airport].pop())
        route.append(airport)
    dfs('JFK')
    return route[::-1]`,
    steps: [
      {
        description:
          "Reconstruct an itinerary using all tickets starting from JFK. This is finding an Eulerian path. Build adjacency list sorted in reverse (so pop gives lexicographically smallest). DFS post-order gives the route in reverse.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "hashmap",
            label: "graph (reverse sorted)",
            entries: [
              ["JFK", "[SFO, ATL]"],
              ["SFO", "[ATL]"],
              ["ATL", "[SFO, JFK]"],
            ],
          },
        ],
      },
      {
        description:
          "DFS from JFK: pop ATL. DFS(ATL): pop JFK. DFS(JFK): pop SFO. DFS(SFO): pop ATL. DFS(ATL): pop SFO. DFS(SFO): no more edges → append SFO to route.",
        codeHighlightLines: [6, 7, 8, 9],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "path", value: "JFK→ATL→JFK→SFO→ATL→SFO", highlight: true },
              { name: "route (building)", value: "[SFO]" },
            ],
          },
        ],
      },
      {
        description:
          "Backtrack: ATL has no edges → append ATL. SFO empty → append SFO. JFK empty → append JFK. ATL empty → append ATL. JFK empty → append JFK. Route = [SFO, ATL, SFO, JFK, ATL, JFK].",
        codeHighlightLines: [8, 9],
        structures: [
          {
            type: "array",
            label: "route (reverse)",
            values: ["SFO", "ATL", "SFO", "JFK", "ATL", "JFK"],
            highlights: {},
          },
        ],
      },
      {
        description:
          "Reverse: [JFK, ATL, JFK, SFO, ATL, SFO]. This is the lexicographically smallest valid itinerary using all tickets. Hierholzer's algorithm finds Eulerian paths in O(E) after sorting.",
        codeHighlightLines: [10, 11],
        structures: [
          {
            type: "array",
            label: "itinerary",
            values: ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" },
          },
        ],
      },
    ],
  },
];

export default solutions;

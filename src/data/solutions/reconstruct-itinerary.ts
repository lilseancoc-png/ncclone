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
          "Reconstruct an itinerary using ALL tickets exactly once, starting from 'JFK'. If multiple valid itineraries exist, return the lexicographically smallest one. This is finding an Eulerian path (visits every edge exactly once). Hierholzer's algorithm: build adjacency lists sorted in reverse alphabetical order (so pop() gives the smallest destination). DFS greedily takes the smallest edge; when stuck, backtrack and append to route (post-order). Tickets: JFK→SFO, JFK→ATL, SFO→ATL, ATL→JFK, ATL→SFO.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "hashmap",
            label: "graph (reverse-sorted for pop())",
            entries: [
              ["JFK", "[SFO, ATL]"],
              ["SFO", "[ATL]"],
              ["ATL", "[SFO, JFK]"],
            ],
          },
          { type: "variables", entries: [{ name: "pop() gives", value: "lexicographically smallest" }, { name: "route", value: "[] (built in reverse)" }] },
        ],
      },
      {
        description:
          "DFS from JFK: pop 'ATL' (smallest). DFS(ATL): pop 'JFK' (smallest). DFS(JFK): pop 'SFO' (only option left). DFS(SFO): pop 'ATL'. DFS(ATL): pop 'SFO'. DFS(SFO): no more edges — stuck! Append 'SFO' to route. This is the key: when a node has no more outgoing edges, it becomes the END of a sub-path, so we record it.",
        codeHighlightLines: [6, 7, 8, 9],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "DFS path", value: "JFK→ATL→JFK→SFO→ATL→SFO" },
              { name: "SFO stuck!", value: "no more edges → append to route", highlight: true },
              { name: "route", value: "[SFO]" },
            ],
          },
        ],
      },
      {
        description:
          "Backtracking: unwind the recursion. ATL: no more edges → append 'ATL'. SFO: no more edges → append 'SFO'. JFK: no more edges → append 'JFK'. ATL: no more edges → append 'ATL'. JFK: no more edges → append 'JFK'. route = [SFO, ATL, SFO, JFK, ATL, JFK]. Post-order recording means the route is built in reverse — dead-ends go first.",
        codeHighlightLines: [8, 9],
        structures: [
          {
            type: "array",
            label: "route (built in reverse)",
            values: ["SFO", "ATL", "SFO", "JFK", "ATL", "JFK"],
          },
          { type: "variables", entries: [{ name: "need to reverse", value: "route is backwards" }] },
        ],
      },
      {
        description:
          "Reverse the route: [JFK, ATL, JFK, SFO, ATL, SFO]. This is the lexicographically smallest valid itinerary using all 5 tickets. Why Hierholzer's works: by greedily choosing the smallest edge and recording nodes in post-order, dead-end detours are naturally placed in the middle of the path. Time: O(E log E) for sorting edges. Space: O(E) for the graph and recursion stack.",
        codeHighlightLines: [10, 11],
        structures: [
          {
            type: "array",
            label: "final itinerary",
            values: ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: "[JFK,ATL,JFK,SFO,ATL,SFO]", highlight: true }, { name: "Time", value: "O(E log E)" }, { name: "Space", value: "O(E)" }],
          },
        ],
      },
    ],
  },
];

export default solutions;

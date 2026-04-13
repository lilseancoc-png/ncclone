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
          "Reconstruct an itinerary using ALL tickets exactly once, starting from 'JFK'. If multiple valid itineraries exist, return the lexicographically smallest. This is finding an Eulerian path (visits every edge once). Hierholzer's: build adjacency lists sorted in reverse so pop() gives smallest destination. DFS greedily takes smallest edge; when stuck, append to route (post-order). Tickets: JFK→SFO, JFK→ATL, SFO→ATL, ATL→JFK, ATL→SFO.",
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
          { type: "variables", entries: [{ name: "pop() gives", value: "lex smallest" }, { name: "route", value: "[]" }] },
        ],
      },
      {
        description:
          "DFS from JFK: pop 'ATL' (smallest). DFS(ATL): pop 'JFK' (smallest of [SFO,JFK]). DFS(JFK): pop 'SFO' (only option left). We're following the greedy path: JFK→ATL→JFK→SFO, always choosing the alphabetically smallest next airport.",
        codeHighlightLines: [6, 7, 8],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "DFS path so far", value: "JFK→ATL→JFK→SFO", highlight: true },
              { name: "JFK edges left", value: "[] (exhausted)" },
              { name: "ATL edges left", value: "[SFO]" },
            ],
          },
        ],
      },
      {
        description:
          "DFS(SFO): pop 'ATL'. DFS(ATL): pop 'SFO'. DFS(SFO): no more edges — STUCK! Append 'SFO' to route. This is the key: when a node has no outgoing edges, it's the END of a sub-path. Post-order recording captures dead-ends first.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "full DFS path", value: "JFK→ATL→JFK→SFO→ATL→SFO" },
              { name: "SFO stuck!", value: "no edges → append", highlight: true },
              { name: "route", value: "[SFO]" },
            ],
          },
        ],
      },
      {
        description:
          "Backtrack: ATL has no more edges → append 'ATL'. SFO: none → append 'SFO'. JFK: none → append 'JFK'. ATL: none → append 'ATL'. JFK: none → append 'JFK'. route = [SFO, ATL, SFO, JFK, ATL, JFK]. Post-order means dead-ends recorded first, start recorded last.",
        codeHighlightLines: [8, 9],
        structures: [
          { type: "array", label: "route (reverse order)", values: ["SFO", "ATL", "SFO", "JFK", "ATL", "JFK"] },
          { type: "variables", entries: [{ name: "built backwards", value: "dead-ends first, start last" }] },
        ],
      },
      {
        description:
          "Reverse: [JFK, ATL, JFK, SFO, ATL, SFO]. This is the lexicographically smallest valid itinerary using all 5 tickets. Why post-order works: by recording dead-end detours first, they naturally end up in the middle of the final path after reversal. Time: O(E log E) for sorting. Space: O(E).",
        codeHighlightLines: [10, 11],
        structures: [
          { type: "array", label: "final itinerary", values: ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success" } },
          { type: "variables", entries: [{ name: "return", value: "[JFK,ATL,JFK,SFO,ATL,SFO]", highlight: true }, { name: "Time", value: "O(E log E)" }] },
        ],
      },
    ],
  },
];

export default solutions;

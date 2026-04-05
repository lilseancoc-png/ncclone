import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Hierholzer's Algorithm",
  timeComplexity: "O(E log E)",
  spaceComplexity: "O(E)",

  steps: [
    {
      description: "Build adjacency list sorted in reverse (so pop gives lexical order). Start DFS from JFK.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "hashmap", label: "Graph", entries: [["JFK", "[MUC]"], ["MUC", "[LHR]"], ["LHR", "[SFO]"], ["SFO", "[SJC]"]], highlights: {} },
        { type: "variables", label: "Start", entries: [{ name: "airport", value: "JFK" }] },
      ],
    },
    {
      description: "DFS: JFK→MUC→LHR→SFO→SJC. SJC has no outgoing edges, add to route (post-order).",
      codeHighlightLines: [7, 8, 9],
      structures: [
        { type: "stack", label: "DFS Call Stack", values: ["JFK", "MUC", "LHR", "SFO", "SJC"], highlights: { 4: "active" } },
        { type: "array", label: "Route (building reversed)", values: ["SJC"], highlights: { 0: "success" } },
      ],
    },
    {
      description: "Unwind: SFO, LHR, MUC, JFK added. Reverse to get final itinerary.",
      codeHighlightLines: [11],
      structures: [
        { type: "array", label: "Result", values: ["JFK", "MUC", "LHR", "SFO", "SJC"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
      ],
    },
  ],
};

export default solution;

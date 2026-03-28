import { Category } from "../types";

export const advancedGraphs: Category = {
  name: "Advanced Graphs",
  slug: "advanced-graphs",
  problems: [
    {
      id: 332,
      title: "Reconstruct Itinerary",
      slug: "reconstruct-itinerary",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/reconstruct-itinerary/",
      description:
        "Given a list of airline tickets represented as [from, to] pairs, reconstruct the itinerary starting from 'JFK'. If multiple valid itineraries exist, return the one with the smallest lexical order. All tickets must be used exactly once.",
      functionName: "findItinerary",
      starterCode: {
        javascript: "function findItinerary(tickets) {\n  \n}",
        python: "def find_itinerary(tickets):\n    pass",
        java: "class Solution {\n    public List<String> findItinerary(List<List<String>> tickets) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<string> findItinerary(vector<vector<string>>& tickets) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]',
          inputArgs: [
            [
              ["MUC", "LHR"],
              ["JFK", "MUC"],
              ["SFO", "SJC"],
              ["LHR", "SFO"],
            ],
          ],
          expected: ["JFK", "MUC", "LHR", "SFO", "SJC"],
        },
      ],
      approach:
        "Use Hierholzer's algorithm for finding an Eulerian path. Build an adjacency list sorted in reverse lexical order (so we can pop from the end). Perform DFS, post-order appending airports to the result, then reverse the result.",
      timeComplexity: "O(E log E)",
      spaceComplexity: "O(E)",
    },
    {
      id: 1584,
      title: "Min Cost to Connect All Points",
      slug: "min-cost-to-connect-all-points",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/min-cost-to-connect-all-points/",
      description:
        "Given an array of points on a 2D plane, return the minimum cost to connect all points such that every point has a path to every other point. The cost of connecting two points is the Manhattan distance between them.",
      functionName: "minCostConnectPoints",
      starterCode: {
        javascript:
          "function minCostConnectPoints(points) {\n  \n}",
        python: "def min_cost_connect_points(points):\n    pass",
        java: "class Solution {\n    public int minCostConnectPoints(int[][] points) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int minCostConnectPoints(vector<vector<int>>& points) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]",
          inputArgs: [
            [
              [0, 0],
              [2, 2],
              [3, 10],
              [5, 2],
              [7, 0],
            ],
          ],
          expected: 20,
        },
        {
          id: 2,
          input: "points = [[3,12],[-2,5],[-4,1]]",
          inputArgs: [
            [
              [3, 12],
              [-2, 5],
              [-4, 1],
            ],
          ],
          expected: 18,
        },
      ],
      approach:
        "Use Prim's algorithm for minimum spanning tree. Start from any point and greedily add the nearest unvisited point. Use a min heap to efficiently select the next closest point based on Manhattan distance.",
      timeComplexity: "O(n^2 log n)",
      spaceComplexity: "O(n^2)",
    },
    {
      id: 743,
      title: "Network Delay Time",
      slug: "network-delay-time",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/network-delay-time/",
      description:
        "Given a network of n nodes and weighted directed edges representing signal travel times, determine how long it takes for a signal sent from node k to reach all other nodes. Return -1 if not all nodes can be reached.",
      functionName: "networkDelayTime",
      starterCode: {
        javascript:
          "function networkDelayTime(times, n, k) {\n  \n}",
        python: "def network_delay_time(times, n, k):\n    pass",
        java: "class Solution {\n    public int networkDelayTime(int[][] times, int n, int k) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int networkDelayTime(vector<vector<int>>& times, int n, int k) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
          inputArgs: [
            [
              [2, 1, 1],
              [2, 3, 1],
              [3, 4, 1],
            ],
            4,
            2,
          ],
          expected: 2,
        },
        {
          id: 2,
          input: "times = [[1,2,1]], n = 2, k = 2",
          inputArgs: [[[1, 2, 1]], 2, 2],
          expected: -1,
        },
      ],
      approach:
        "Use Dijkstra's algorithm from the source node k. Build an adjacency list with weights and use a min heap to process nodes in order of shortest distance. The answer is the maximum distance to any node, or -1 if not all nodes are reachable.",
      timeComplexity: "O(E log V)",
      spaceComplexity: "O(V+E)",
    },
    {
      id: 778,
      title: "Swim in Rising Water",
      slug: "swim-in-rising-water",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/swim-in-rising-water/",
      description:
        "Given an n x n grid where grid[i][j] represents the elevation at that point, find the minimum time t such that you can swim from the top-left corner to the bottom-right corner. At time t, water is at depth t, and you can swim through any cell with elevation at most t.",
      functionName: "swimInWater",
      starterCode: {
        javascript: "function swimInWater(grid) {\n  \n}",
        python: "def swim_in_water(grid):\n    pass",
        java: "class Solution {\n    public int swimInWater(int[][] grid) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int swimInWater(vector<vector<int>>& grid) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "grid = [[0,2],[1,3]]",
          inputArgs: [
            [
              [0, 2],
              [1, 3],
            ],
          ],
          expected: 3,
        },
        {
          id: 2,
          input:
            "grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]",
          inputArgs: [
            [
              [0, 1, 2, 3, 4],
              [24, 23, 22, 21, 5],
              [12, 13, 14, 15, 16],
              [11, 17, 18, 19, 20],
              [10, 9, 8, 7, 6],
            ],
          ],
          expected: 16,
        },
      ],
      approach:
        "Use Dijkstra's algorithm or binary search + BFS. With Dijkstra, start at (0,0) and always expand to the neighbor with the minimum elevation using a min heap. The answer is the maximum elevation along the optimal path to (n-1,n-1).",
      timeComplexity: "O(n^2 log n)",
      spaceComplexity: "O(n^2)",
    },
    {
      id: 269,
      title: "Alien Dictionary",
      slug: "alien-dictionary",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/alien-dictionary/",
      description:
        "Given a sorted list of words in an alien language, derive the order of characters in that alphabet. If the order is invalid or ambiguous, return an empty string. If multiple valid orderings exist, return any of them.",
      functionName: "alienOrder",
      starterCode: {
        javascript: "function alienOrder(words) {\n  \n}",
        python: "def alien_order(words):\n    pass",
        java: "class Solution {\n    public String alienOrder(String[] words) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    string alienOrder(vector<string>& words) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 'words = ["wrt","wrf","er","ett","rftt"]',
          inputArgs: [["wrt", "wrf", "er", "ett", "rftt"]],
          expected: "wertf",
        },
        {
          id: 2,
          input: 'words = ["z","x"]',
          inputArgs: [["z", "x"]],
          expected: "zx",
        },
        {
          id: 3,
          input: 'words = ["z","x","z"]',
          inputArgs: [["z", "x", "z"]],
          expected: "",
        },
      ],
      approach:
        "Compare adjacent words to determine character ordering (find the first differing character). Build a directed graph of character precedences and perform topological sort. If a cycle exists, there's no valid ordering.",
      timeComplexity: "O(C)",
      spaceComplexity: "O(1)",
    },
    {
      id: 787,
      title: "Cheapest Flights Within K Stops",
      slug: "cheapest-flights-within-k-stops",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
      description:
        "Given n cities connected by flights with prices, find the cheapest price from a source to a destination with at most k stops. Return -1 if no such route exists.",
      functionName: "findCheapestPrice",
      starterCode: {
        javascript:
          "function findCheapestPrice(n, flights, src, dst, k) {\n  \n}",
        python:
          "def find_cheapest_price(n, flights, src, dst, k):\n    pass",
        java: "class Solution {\n    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
          inputArgs: [
            4,
            [
              [0, 1, 100],
              [1, 2, 100],
              [2, 0, 100],
              [1, 3, 600],
              [2, 3, 200],
            ],
            0,
            3,
            1,
          ],
          expected: 700,
        },
      ],
      approach:
        "Use Bellman-Ford with at most k+1 iterations. In each iteration, relax all edges. Use a copy of the price array to ensure only edges from the previous iteration contribute, preventing cascading updates.",
      timeComplexity: "O(k*E)",
      spaceComplexity: "O(V)",
    },
  ],
};

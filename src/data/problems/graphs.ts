import { Category } from "../types";

export const graphs: Category = {
  name: "Graphs",
  slug: "graphs",
  problems: [
    {
      id: 200,
      title: "Number of Islands",
      slug: "number-of-islands",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/number-of-islands/",
      description:
        "Given an m x n 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent land cells horizontally or vertically.",
      functionName: "numIslands",
      starterCode: {
        javascript: "function numIslands(grid) {\n  \n}",
        python: "def num_islands(grid):\n    pass",
        java: "class Solution {\n    public int numIslands(char[][] grid) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
          inputArgs: [
            [
              ["1", "1", "1", "1", "0"],
              ["1", "1", "0", "1", "0"],
              ["1", "1", "0", "0", "0"],
              ["0", "0", "0", "0", "0"],
            ],
          ],
          expected: 1,
        },
        {
          id: 2,
          input:
            'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
          inputArgs: [
            [
              ["1", "1", "0", "0", "0"],
              ["1", "1", "0", "0", "0"],
              ["0", "0", "1", "0", "0"],
              ["0", "0", "0", "1", "1"],
            ],
          ],
          expected: 3,
        },
      ],
      approach:
        "Iterate through the grid and when a '1' is found, perform BFS or DFS to mark all connected land cells as visited. Each BFS/DFS initiation counts as one island. Mark visited cells by setting them to '0'.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
    },
    {
      id: 695,
      title: "Max Area of Island",
      slug: "max-area-of-island",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/max-area-of-island/",
      description:
        "Given an m x n binary grid, find the maximum area of an island. An island is a group of 1's connected 4-directionally. If there is no island, return 0.",
      functionName: "maxAreaOfIsland",
      starterCode: {
        javascript: "function maxAreaOfIsland(grid) {\n  \n}",
        python: "def max_area_of_island(grid):\n    pass",
        java: "class Solution {\n    public int maxAreaOfIsland(int[][] grid) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int maxAreaOfIsland(vector<vector<int>>& grid) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            "grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]",
          inputArgs: [
            [
              [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
              [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
              [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            ],
          ],
          expected: 6,
        },
      ],
      approach:
        "DFS from each unvisited land cell, counting cells in the connected component. Track the maximum area found across all islands. Mark cells as visited to avoid recounting.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
    },
    {
      id: 133,
      title: "Clone Graph",
      slug: "clone-graph",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/clone-graph/",
      description:
        "Given a reference to a node in a connected undirected graph, return a deep copy of the graph. Each node contains a value and a list of its neighbors. The graph is represented as an adjacency list.",
      functionName: "cloneGraph",
      starterCode: {
        javascript: "function cloneGraph(adjList) {\n  \n}",
        python: "def clone_graph(adj_list):\n    pass",
        java: "class Solution {\n    public Node cloneGraph(Node node) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
          inputArgs: [[[2, 4], [1, 3], [2, 4], [1, 3]]],
          expected: [[2, 4], [1, 3], [2, 4], [1, 3]],
        },
      ],
      approach:
        "Use BFS or DFS with a HashMap mapping original nodes to clones. For each unvisited node, create a clone and recursively clone its neighbors. The HashMap prevents revisiting and duplicating nodes.",
      timeComplexity: "O(V+E)",
      spaceComplexity: "O(V)",
    },
    {
      id: 286,
      title: "Walls and Gates",
      slug: "walls-and-gates",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/walls-and-gates/",
      description:
        "Given an m x n grid where -1 represents a wall, 0 represents a gate, and 2147483647 represents an empty room, fill each empty room with the distance to its nearest gate. If no gate is reachable, leave the value as 2147483647.",
      functionName: "wallsAndGates",
      starterCode: {
        javascript: "function wallsAndGates(rooms) {\n  \n}",
        python: "def walls_and_gates(rooms):\n    pass",
        java: "class Solution {\n    public void wallsAndGates(int[][] rooms) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    void wallsAndGates(vector<vector<int>>& rooms) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            "rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]",
          inputArgs: [
            [
              [2147483647, -1, 0, 2147483647],
              [2147483647, 2147483647, 2147483647, -1],
              [2147483647, -1, 2147483647, -1],
              [0, -1, 2147483647, 2147483647],
            ],
          ],
          expected: [
            [3, -1, 0, 1],
            [2, 2, 1, -1],
            [1, -1, 2, -1],
            [0, -1, 3, 4],
          ],
        },
      ],
      approach:
        "Perform multi-source BFS starting from all gate cells (value 0) simultaneously. Each BFS level increments the distance by 1. This naturally fills each empty room with the distance to its nearest gate.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
    },
    {
      id: 994,
      title: "Rotting Oranges",
      slug: "rotting-oranges",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/rotting-oranges/",
      description:
        "In a grid, 0 represents empty, 1 represents a fresh orange, and 2 represents a rotten orange. Every minute, fresh oranges adjacent (4-directionally) to rotten ones become rotten. Return the minimum minutes until no fresh orange remains, or -1 if impossible.",
      functionName: "orangesRotting",
      starterCode: {
        javascript: "function orangesRotting(grid) {\n  \n}",
        python: "def oranges_rotting(grid):\n    pass",
        java: "class Solution {\n    public int orangesRotting(int[][] grid) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int orangesRotting(vector<vector<int>>& grid) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "grid = [[2,1,1],[1,1,0],[0,1,1]]",
          inputArgs: [
            [
              [2, 1, 1],
              [1, 1, 0],
              [0, 1, 1],
            ],
          ],
          expected: 4,
        },
        {
          id: 2,
          input: "grid = [[2,1,1],[0,1,1],[1,0,1]]",
          inputArgs: [
            [
              [2, 1, 1],
              [0, 1, 1],
              [1, 0, 1],
            ],
          ],
          expected: -1,
        },
      ],
      approach:
        "Use multi-source BFS starting from all initially rotten oranges. Each BFS level represents one minute. After BFS completes, check if any fresh oranges remain. If so, return -1; otherwise, return the total minutes elapsed.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
    },
    {
      id: 417,
      title: "Pacific Atlantic Water Flow",
      slug: "pacific-atlantic-water-flow",
      difficulty: "Medium",
      compareMode: "unordered",
      leetcodeUrl:
        "https://leetcode.com/problems/pacific-atlantic-water-flow/",
      description:
        "Given an m x n matrix of heights, water can flow from a cell to its neighbor if the neighbor's height is less than or equal to the current cell. The Pacific ocean touches the top and left edges; the Atlantic touches the bottom and right edges. Return all cells where water can flow to both oceans.",
      functionName: "pacificAtlantic",
      starterCode: {
        javascript: "function pacificAtlantic(heights) {\n  \n}",
        python: "def pacific_atlantic(heights):\n    pass",
        java: "class Solution {\n    public List<List<Integer>> pacificAtlantic(int[][] heights) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
          inputArgs: [
            [
              [1, 2, 2, 3, 5],
              [3, 2, 3, 4, 4],
              [2, 4, 5, 3, 1],
              [6, 7, 1, 4, 5],
              [5, 1, 1, 2, 4],
            ],
          ],
          expected: [
            [0, 4],
            [1, 3],
            [1, 4],
            [2, 2],
            [3, 0],
            [3, 1],
            [4, 0],
          ],
        },
      ],
      approach:
        "Run DFS/BFS from the Pacific border (top and left edges) and separately from the Atlantic border (bottom and right edges). Track which cells can reach each ocean. The answer is the intersection of both sets.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
    },
    {
      id: 130,
      title: "Surrounded Regions",
      slug: "surrounded-regions",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/surrounded-regions/",
      description:
        "Given an m x n board containing 'X' and 'O', capture all regions of 'O' that are completely surrounded by 'X'. A region is captured by flipping all 'O's to 'X's. 'O' cells on the border and any 'O' connected to a border 'O' are not captured.",
      functionName: "solve",
      starterCode: {
        javascript: "function solve(board) {\n  \n}",
        python: "def solve(board):\n    pass",
        java: "class Solution {\n    public void solve(char[][] board) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    void solve(vector<vector<char>>& board) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]',
          inputArgs: [
            [
              ["X", "X", "X", "X"],
              ["X", "O", "O", "X"],
              ["X", "X", "O", "X"],
              ["X", "O", "X", "X"],
            ],
          ],
          expected: [
            ["X", "X", "X", "X"],
            ["X", "X", "X", "X"],
            ["X", "X", "X", "X"],
            ["X", "O", "X", "X"],
          ],
        },
      ],
      approach:
        "DFS/BFS from all border 'O' cells, marking them as safe. Then iterate through the board: flip remaining 'O' cells to 'X' (they are surrounded), and restore safe cells back to 'O'.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
    },
    {
      id: 207,
      title: "Course Schedule",
      slug: "course-schedule",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
      description:
        "There are numCourses courses labeled from 0 to numCourses-1. Given an array of prerequisites where prerequisites[i] = [a, b] means you must take course b before course a, determine if it is possible to finish all courses.",
      functionName: "canFinish",
      starterCode: {
        javascript:
          "function canFinish(numCourses, prerequisites) {\n  \n}",
        python: "def can_finish(num_courses, prerequisites):\n    pass",
        java: "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "numCourses = 2, prerequisites = [[1,0]]",
          inputArgs: [2, [[1, 0]]],
          expected: true,
        },
        {
          id: 2,
          input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
          inputArgs: [
            2,
            [
              [1, 0],
              [0, 1],
            ],
          ],
          expected: false,
        },
      ],
      approach:
        "Build a directed graph and detect cycles using DFS with three states: unvisited, in-progress, and completed. If a cycle is found (visiting an in-progress node), courses cannot be completed. Alternatively, use Kahn's algorithm (BFS topological sort).",
      timeComplexity: "O(V+E)",
      spaceComplexity: "O(V+E)",
    },
    {
      id: 210,
      title: "Course Schedule II",
      slug: "course-schedule-ii",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/course-schedule-ii/",
      description:
        "There are numCourses courses labeled from 0 to numCourses-1. Given prerequisite pairs, return a valid ordering of courses to take. If there are multiple valid orderings, return any of them. If it is impossible, return an empty array.",
      functionName: "findOrder",
      starterCode: {
        javascript:
          "function findOrder(numCourses, prerequisites) {\n  \n}",
        python: "def find_order(num_courses, prerequisites):\n    pass",
        java: "class Solution {\n    public int[] findOrder(int numCourses, int[][] prerequisites) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "numCourses = 2, prerequisites = [[1,0]]",
          inputArgs: [2, [[1, 0]]],
          expected: [0, 1],
        },
        {
          id: 2,
          input:
            "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
          inputArgs: [
            4,
            [
              [1, 0],
              [2, 0],
              [3, 1],
              [3, 2],
            ],
          ],
          expected: [0, 1, 2, 3],
        },
      ],
      approach:
        "Perform topological sort using Kahn's algorithm: compute in-degrees, start BFS from nodes with in-degree 0, and process neighbors by decrementing their in-degrees. Return the order if all courses are processed, otherwise return empty array.",
      timeComplexity: "O(V+E)",
      spaceComplexity: "O(V+E)",
    },
    {
      id: 261,
      title: "Graph Valid Tree",
      slug: "graph-valid-tree",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/graph-valid-tree/",
      description:
        "Given n nodes labeled from 0 to n-1 and a list of undirected edges, determine if these edges form a valid tree. A valid tree is a connected graph with no cycles.",
      functionName: "validTree",
      starterCode: {
        javascript: "function validTree(n, edges) {\n  \n}",
        python: "def valid_tree(n, edges):\n    pass",
        java: "class Solution {\n    public boolean validTree(int n, int[][] edges) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool validTree(int n, vector<vector<int>>& edges) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
          inputArgs: [
            5,
            [
              [0, 1],
              [0, 2],
              [0, 3],
              [1, 4],
            ],
          ],
          expected: true,
        },
        {
          id: 2,
          input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
          inputArgs: [
            5,
            [
              [0, 1],
              [1, 2],
              [2, 3],
              [1, 3],
              [1, 4],
            ],
          ],
          expected: false,
        },
      ],
      approach:
        "A valid tree has exactly n-1 edges and is fully connected. Use Union-Find: for each edge, union the two nodes. If they're already in the same set, there's a cycle. After processing, check there's exactly one connected component.",
      timeComplexity: "O(V+E)",
      spaceComplexity: "O(V)",
    },
    {
      id: 323,
      title: "Number of Connected Components in an Undirected Graph",
      slug: "number-of-connected-components-in-an-undirected-graph",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
      description:
        "Given n nodes labeled from 0 to n-1 and a list of undirected edges, return the number of connected components in the graph.",
      functionName: "countComponents",
      starterCode: {
        javascript: "function countComponents(n, edges) {\n  \n}",
        python: "def count_components(n, edges):\n    pass",
        java: "class Solution {\n    public int countComponents(int n, int[][] edges) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int countComponents(int n, vector<vector<int>>& edges) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "n = 5, edges = [[0,1],[1,2],[3,4]]",
          inputArgs: [
            5,
            [
              [0, 1],
              [1, 2],
              [3, 4],
            ],
          ],
          expected: 2,
        },
        {
          id: 2,
          input: "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]",
          inputArgs: [
            5,
            [
              [0, 1],
              [1, 2],
              [2, 3],
              [3, 4],
            ],
          ],
          expected: 1,
        },
      ],
      approach:
        "Use Union-Find to group connected nodes. Initialize each node as its own component. For each edge, union the two nodes (decrementing component count when a merge occurs). The final count is the number of components.",
      timeComplexity: "O(V+E)",
      spaceComplexity: "O(V)",
    },
    {
      id: 684,
      title: "Redundant Connection",
      slug: "redundant-connection",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/redundant-connection/",
      description:
        "Given a graph that started as a tree with n nodes and had one additional edge added, find and return the edge that can be removed to restore the tree. If there are multiple answers, return the one that occurs last in the input.",
      functionName: "findRedundantConnection",
      starterCode: {
        javascript:
          "function findRedundantConnection(edges) {\n  \n}",
        python: "def find_redundant_connection(edges):\n    pass",
        java: "class Solution {\n    public int[] findRedundantConnection(int[][] edges) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "edges = [[1,2],[1,3],[2,3]]",
          inputArgs: [
            [
              [1, 2],
              [1, 3],
              [2, 3],
            ],
          ],
          expected: [2, 3],
        },
        {
          id: 2,
          input: "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]",
          inputArgs: [
            [
              [1, 2],
              [2, 3],
              [3, 4],
              [1, 4],
              [1, 5],
            ],
          ],
          expected: [1, 4],
        },
      ],
      approach:
        "Use Union-Find to process edges in order. For each edge, try to union the two nodes. If they are already connected (same root), this edge creates a cycle and is the redundant connection. Return the first such edge found.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 127,
      title: "Word Ladder",
      slug: "word-ladder",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/word-ladder/",
      description:
        "Given beginWord, endWord, and a word list, find the length of the shortest transformation sequence from beginWord to endWord, where each step changes exactly one letter and each intermediate word must be in the word list. Return 0 if no such sequence exists.",
      functionName: "ladderLength",
      starterCode: {
        javascript:
          "function ladderLength(beginWord, endWord, wordList) {\n  \n}",
        python:
          "def ladder_length(begin_word, end_word, word_list):\n    pass",
        java: "class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
          inputArgs: [
            "hit",
            "cog",
            ["hot", "dot", "dog", "lot", "log", "cog"],
          ],
          expected: 5,
        },
        {
          id: 2,
          input:
            'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
          inputArgs: [
            "hit",
            "cog",
            ["hot", "dot", "dog", "lot", "log"],
          ],
          expected: 0,
        },
      ],
      approach:
        "Use BFS where each node is a word and edges connect words differing by one letter. For each word, try changing each character to all 26 letters and check if the result is in the word set. Track the transformation count (BFS level).",
      timeComplexity: "O(n*m^2)",
      spaceComplexity: "O(n*m)",
    },
  ],
};

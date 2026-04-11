import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "DFS Cycle Detection",
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V + E)",
  code: `def can_finish(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    for course, prereq in prerequisites:
        graph[course].append(prereq)
    # 0=unvisited, 1=in current path, 2=done
    state = [0] * numCourses
    def has_cycle(node):
        if state[node] == 1:
            return True   # cycle!
        if state[node] == 2:
            return False  # already verified
        state[node] = 1
        for neighbor in graph[node]:
            if has_cycle(neighbor):
                return True
        state[node] = 2
        return False
    return not any(has_cycle(i) for i in range(numCourses))`,
  steps: [
    {
      description:
        "Can you finish all courses given prerequisites? This is cycle detection in a directed graph — a cycle means circular dependencies (impossible). Build adjacency list: edge course→prereq means 'course requires prereq'. Use DFS with 3 states: 0=unvisited, 1=in current DFS path, 2=verified safe. numCourses=4, prereqs=[[1,0],[2,1],[3,2]].",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        {
          type: "graph",
          label: "prerequisite graph",
          directed: true,
          nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
          edges: [
            { from: 1, to: 0 },
            { from: 2, to: 1 },
            { from: 3, to: 2 },
          ],
        },
        { type: "array", label: "state (0=unvisited, 1=exploring, 2=done)", values: [0, 0, 0, 0] },
      ],
    },
    {
      description:
        "DFS from course 0: Mark state[0]=1 (exploring). Course 0 has no prerequisites (empty neighbor list). No cycle found from this path, so mark state[0]=2 (done). A node marked 2 is permanently safe — if we encounter it again from another DFS, we skip it immediately.",
      codeHighlightLines: [7, 8, 11, 12, 15, 16],
      structures: [
        {
          type: "graph",
          label: "course 0 verified",
          directed: true,
          nodes: [{ id: 0, highlight: "success" }, { id: 1 }, { id: 2 }, { id: 3 }],
          edges: [{ from: 1, to: 0 }, { from: 2, to: 1 }, { from: 3, to: 2 }],
        },
        { type: "array", label: "state", values: [2, 0, 0, 0], highlights: { 0: "success" } },
      ],
    },
    {
      description:
        "DFS from course 1: Mark state[1]=1. Course 1 requires course 0. Check course 0 — state[0]=2 (already verified safe), return False (no cycle). All of course 1's prereqs are safe, so mark state[1]=2. The state=2 check prevents redundant work — each node is fully explored at most once.",
      codeHighlightLines: [7, 10, 11, 12, 13, 14, 15, 16],
      structures: [
        {
          type: "graph",
          label: "course 1 verified",
          directed: true,
          nodes: [{ id: 0, highlight: "success" }, { id: 1, highlight: "success" }, { id: 2 }, { id: 3 }],
          edges: [{ from: 1, to: 0, highlight: "success" }, { from: 2, to: 1 }, { from: 3, to: 2 }],
        },
        { type: "array", label: "state", values: [2, 2, 0, 0], highlights: { 0: "success", 1: "success" } },
      ],
    },
    {
      description:
        "DFS from course 2: Mark state[2]=1. Prereq is course 1 — state[1]=2, safe. Mark state[2]=2. DFS from course 3: Mark state[3]=1. Prereq is course 2 — state[2]=2, safe. Mark state[3]=2. All 4 courses explored with no cycles found.",
      codeHighlightLines: [10, 11, 12, 13, 14, 15, 16],
      structures: [
        {
          type: "graph",
          label: "all courses verified",
          directed: true,
          nodes: [
            { id: 0, highlight: "success" },
            { id: 1, highlight: "success" },
            { id: 2, highlight: "success" },
            { id: 3, highlight: "success" },
          ],
          edges: [
            { from: 1, to: 0, highlight: "success" },
            { from: 2, to: 1, highlight: "success" },
            { from: 3, to: 2, highlight: "success" },
          ],
        },
        { type: "array", label: "state", values: [2, 2, 2, 2], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
      ],
    },
    {
      description:
        "Return True — all courses completable. How would a cycle be detected? If during DFS we hit a node with state=1, that means we're revisiting a node already in the current path — a back edge, proving a cycle. For example, if course 0 required course 3, the chain 0→3→2→1→0 would trigger state[0]=1 during the DFS from course 0. Time: O(V+E) — each node and edge visited once. Space: O(V+E) for graph + O(V) for state and recursion.",
      codeHighlightLines: [18],
      structures: [
        { type: "variables", entries: [{ name: "return", value: "True (no cycles)", highlight: true }, { name: "cycle detection", value: "state[node]==1 → back edge!" }, { name: "Time", value: "O(V + E)" }, { name: "Space", value: "O(V + E)" }] },
      ],
    },
  ],
};

export default solution;

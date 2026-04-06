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
        "Can you finish all courses given prerequisites? This is cycle detection in a directed graph. numCourses=4, prereqs=[[1,0],[2,1],[3,2]]: 1→0, 2→1, 3→2.",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        {
          type: "graph",
          label: "prerequisite graph",
          directed: true,
          nodes: [
            { id: 0 },
            { id: 1 },
            { id: 2 },
            { id: 3 },
          ],
          edges: [
            { from: 1, to: 0 },
            { from: 2, to: 1 },
            { from: 3, to: 2 },
          ],
        },
        { type: "array", label: "state", values: [0, 0, 0, 0] },
      ],
    },
    {
      description:
        "DFS from course 0: no prereqs → mark done (2). DFS from course 1: prereq 0 is done → mark 1 done.",
      codeHighlightLines: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      structures: [
        {
          type: "graph",
          label: "exploring courses 0, 1",
          directed: true,
          nodes: [
            { id: 0, highlight: "success" },
            { id: 1, highlight: "success" },
            { id: 2 },
            { id: 3 },
          ],
          edges: [
            { from: 1, to: 0, highlight: "success" },
            { from: 2, to: 1 },
            { from: 3, to: 2 },
          ],
        },
        { type: "array", label: "state", values: [2, 2, 0, 0], highlights: { 0: "success", 1: "success" } },
      ],
    },
    {
      description:
        "DFS from course 2: prereq 1 done → mark 2 done. DFS from course 3: prereq 2 done → mark 3 done. No cycles!",
      codeHighlightLines: [12, 13, 14, 15, 16],
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
        "Return True — all courses can be finished. If state[node]==1 during DFS, we found a back edge (cycle) and would return False. Time: O(V+E).",
      codeHighlightLines: [18],
      structures: [
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
      ],
    },
  ],
};

export default solution;

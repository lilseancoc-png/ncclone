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
        "Can you finish all courses given prerequisites? This is cycle detection in a directed graph. If there's a cycle (A requires B, B requires A), it's impossible. Use DFS with 3 states: unvisited (0), in-progress (1), done (2). numCourses=4, prereqs=[[1,0],[2,1],[3,2]].",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        { type: "array", label: "graph (course → prereqs)", values: ["0:[]", "1:[0]", "2:[1]", "3:[2]"] },
        { type: "array", label: "state", values: [0, 0, 0, 0] },
      ],
    },
    {
      description:
        "DFS from course 0: no prereqs → mark done (2). DFS from course 1: prereq is 0 (already done) → mark 1 as done. No cycles found so far.",
      codeHighlightLines: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      structures: [
        { type: "array", label: "state", values: [2, 2, 0, 0], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "course 0", value: "no prereqs → done" }, { name: "course 1", value: "prereq 0 done → done", highlight: true }] },
      ],
    },
    {
      description:
        "DFS from course 2: prereq 1 is done → mark 2 as done. DFS from course 3: prereq 2 is done → mark 3 as done. All courses processed, no cycles detected!",
      codeHighlightLines: [12, 13, 14, 15, 16],
      structures: [
        { type: "array", label: "state", values: [2, 2, 2, 2], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", entries: [{ name: "cycles found", value: 0 }] },
      ],
    },
    {
      description:
        "Return True — all courses can be finished. The 3-state approach is key: state=1 means \"currently being explored.\" If we revisit a node with state=1, we've found a back edge (cycle). State=2 means fully verified — skip it. Time: O(V+E). Space: O(V+E) for the graph + state array.",
      codeHighlightLines: [18],
      structures: [
        { type: "array", label: "state (all done)", values: [2, 2, 2, 2], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
      ],
    },
  ],
};

export default solution;

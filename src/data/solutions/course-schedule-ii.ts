import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Topological Sort (BFS)",
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V + E)",
  code: `from collections import deque

def findOrder(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    in_degree = [0] * numCourses
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1

    queue = deque(i for i in range(numCourses) if in_degree[i] == 0)
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    return order if len(order) == numCourses else []`,
  steps: [
    {
      description:
        "Return a valid ordering to complete all courses given prerequisites. This is a topological sort problem: find an ordering where every course appears after its prerequisites. Kahn's algorithm (BFS) works by repeatedly selecting courses with no remaining prerequisites (in_degree=0). Build an adjacency list (prereq → courses it unlocks) and track in-degree (number of unmet prerequisites) for each course. numCourses=4, prereqs=[[1,0],[2,0],[3,1],[3,2]]. Course 0 has no prereqs, courses 1 and 2 need course 0, course 3 needs both 1 and 2.",
      codeHighlightLines: [3, 4, 5, 6, 7, 8],
      structures: [
        { type: "array", label: "graph (prereq → unlocks)", values: ["0→[1,2]", "1→[3]", "2→[3]", "3→[]"] },
        { type: "array", label: "in_degree", values: [0, 1, 1, 2], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "queue (in_degree=0)", value: "[0]" }, { name: "order", value: "[]" }] },
      ],
    },
    {
      description:
        "Start with courses having in_degree=0: only course 0 (no prerequisites). Dequeue 0, add to order. Now \"complete\" course 0 by decrementing in_degree of all courses it unlocks: courses 1 and 2 each drop from 1 to 0. Since their in_degree is now 0 (all prerequisites met), enqueue both. The queue acts as a frontier of courses that are ready to take.",
      codeHighlightLines: [10, 11, 12, 13, 14, 15, 16, 17],
      structures: [
        { type: "array", label: "in_degree", values: [0, 0, 0, 2], highlights: { 0: "checked", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "queue", value: "[1, 2]" }, { name: "order", value: "[0]", highlight: true }, { name: "course 0 unlocked", value: "courses 1 and 2" }] },
      ],
    },
    {
      description:
        "Dequeue course 1, add to order. Course 1 unlocks course 3: in_degree[3] drops from 2 to 1 (still has unmet prereq from course 2). Dequeue course 2, add to order. Course 2 also unlocks course 3: in_degree[3] drops from 1 to 0 — all prereqs met! Enqueue course 3. Note: courses 1 and 2 could be taken in either order (both are valid), reflecting the flexibility of topological sort — multiple valid orderings often exist.",
      codeHighlightLines: [12, 13, 14, 15, 16, 17],
      structures: [
        { type: "array", label: "in_degree", values: [0, 0, 0, 0], highlights: { 1: "checked", 2: "checked", 3: "success" } },
        { type: "variables", entries: [{ name: "queue", value: "[3]" }, { name: "order", value: "[0, 1, 2]", highlight: true }, { name: "course 3 ready", value: "both prereqs done" }] },
      ],
    },
    {
      description:
        "Dequeue course 3, add to order. No courses to unlock. Queue empty, order = [0,1,2,3] — all 4 courses included, so a valid ordering exists. If len(order) < numCourses, there's a cycle (some courses have permanently unresolvable prerequisites) and we return []. Cycle detection is built-in: nodes in a cycle never reach in_degree=0 and are never added to the order. Time: O(V+E) — each node and edge processed once. Space: O(V+E) for the graph.",
      codeHighlightLines: [18],
      structures: [
        { type: "array", label: "valid course order", values: [0, 1, 2, 3], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[0, 1, 2, 3]", highlight: true }, { name: "cycle?", value: "No (all courses in order)" }, { name: "Time", value: "O(V + E)" }] },
      ],
    },
  ],
};

export default solution;

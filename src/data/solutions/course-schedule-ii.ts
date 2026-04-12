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
        "Find a valid course ordering given prerequisites. This is topological sort: courses must appear after all their prereqs. Kahn's BFS: repeatedly take courses with no remaining prereqs (in_degree=0). numCourses=4, prereqs=[[1,0],[2,0],[3,1],[3,2]]. Course 0 has no prereqs. Course 3 needs both 1 and 2.",
      codeHighlightLines: [3, 4, 5, 6, 7, 8],
      structures: [
        { type: "array", label: "graph (prereq → unlocks)", values: ["0→[1,2]", "1→[3]", "2→[3]", "3→[]"] },
        { type: "array", label: "in_degree", values: [0, 1, 1, 2], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "queue", value: "[0]" }, { name: "order", value: "[]" }] },
      ],
    },
    {
      description:
        "Dequeue course 0 (in_degree=0, no prereqs). Add to order. Course 0 unlocks courses 1 and 2. Decrement: in_degree[1] = 1→0, in_degree[2] = 1→0. Both reach 0, so enqueue both. They're now ready to take — all their prereqs are done.",
      codeHighlightLines: [12, 13, 14, 15, 16, 17],
      structures: [
        { type: "array", label: "in_degree", values: [0, 0, 0, 2], highlights: { 0: "checked", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "dequeued", value: "course 0", highlight: true }, { name: "queue", value: "[1, 2]" }, { name: "order", value: "[0]" }] },
      ],
    },
    {
      description:
        "Dequeue course 1. Add to order=[0,1]. Course 1 unlocks course 3. Decrement: in_degree[3] = 2→1. Course 3 still has an unmet prereq (course 2), so it stays off the queue. We can't take course 3 yet.",
      codeHighlightLines: [12, 13, 14, 15, 16, 17],
      structures: [
        { type: "array", label: "in_degree", values: [0, 0, 0, 1], highlights: { 1: "checked", 3: "active" } },
        { type: "variables", entries: [{ name: "dequeued", value: "course 1", highlight: true }, { name: "in_degree[3]", value: "2→1 (still waiting for course 2)" }, { name: "queue", value: "[2]" }, { name: "order", value: "[0, 1]" }] },
      ],
    },
    {
      description:
        "Dequeue course 2. Add to order=[0,1,2]. Course 2 also unlocks course 3. Decrement: in_degree[3] = 1→0. NOW course 3 has all prereqs met — enqueue it. This shows why in_degree tracking works: course 3 needed BOTH courses 1 and 2 done before it could proceed.",
      codeHighlightLines: [12, 13, 14, 15, 16, 17],
      structures: [
        { type: "array", label: "in_degree", values: [0, 0, 0, 0], highlights: { 2: "checked", 3: "success" } },
        { type: "variables", entries: [{ name: "dequeued", value: "course 2", highlight: true }, { name: "in_degree[3]", value: "1→0 (all prereqs done!)" }, { name: "queue", value: "[3]" }, { name: "order", value: "[0, 1, 2]" }] },
      ],
    },
    {
      description:
        "Dequeue course 3. Add to order=[0,1,2,3]. No courses to unlock. Queue empty. len(order)=4 == numCourses → valid ordering exists, return it. If there were a cycle (e.g., 1→2→1), those nodes would never reach in_degree=0 and len(order) < numCourses → return []. Time: O(V+E). Space: O(V+E).",
      codeHighlightLines: [18],
      structures: [
        { type: "array", label: "valid course order", values: [0, 1, 2, 3], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[0, 1, 2, 3]", highlight: true }, { name: "cycle?", value: "No (all 4 courses in order)" }, { name: "Time", value: "O(V + E)" }] },
      ],
    },
  ],
};

export default solution;

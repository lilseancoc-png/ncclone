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
        "Return a valid course ordering given prerequisites. Use Kahn's algorithm (BFS topological sort). Build adjacency list and track in-degrees. numCourses=4, prereqs=[[1,0],[2,0],[3,1],[3,2]].",
      codeHighlightLines: [3, 4, 5, 6, 7, 8],
      structures: [
        { type: "array", label: "graph (prereq → courses)", values: ["0:[1,2]", "1:[3]", "2:[3]", "3:[]"] },
        { type: "array", label: "in_degree", values: [0, 1, 1, 2], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "queue", value: "[0]" }, { name: "order", value: "[]" }] },
      ],
    },
    {
      description:
        "Start with nodes having in_degree=0: course 0. Dequeue 0, add to order. Decrement in_degree of neighbors 1 and 2. Both become 0 — enqueue them.",
      codeHighlightLines: [10, 11, 12, 13, 14, 15, 16, 17],
      structures: [
        { type: "array", label: "in_degree", values: [0, 0, 0, 2], highlights: { 0: "checked", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "queue", value: "[1, 2]" }, { name: "order", value: "[0]", highlight: true }] },
      ],
    },
    {
      description:
        "Dequeue 1, add to order. Neighbor 3: in_degree 2→1. Dequeue 2, add to order. Neighbor 3: in_degree 1→0 — enqueue 3.",
      codeHighlightLines: [12, 13, 14, 15, 16, 17],
      structures: [
        { type: "array", label: "in_degree", values: [0, 0, 0, 0], highlights: { 1: "checked", 2: "checked", 3: "success" } },
        { type: "variables", entries: [{ name: "queue", value: "[3]" }, { name: "order", value: "[0, 1, 2]", highlight: true }] },
      ],
    },
    {
      description:
        "Dequeue 3, add to order. No neighbors to process. Queue empty. order has all 4 courses — return [0,1,2,3]. If len(order) < numCourses, a cycle exists and we'd return [].",
      codeHighlightLines: [18],
      structures: [
        { type: "array", label: "in_degree (all zero)", values: [0, 0, 0, 0], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[0, 1, 2, 3]", highlight: true }] },
      ],
    },
  ],
};

export default solution;

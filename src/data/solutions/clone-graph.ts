import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "BFS with HashMap",
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V)",
  code: `from collections import deque

def clone_graph(node):
    if not node:
        return None
    clones = {node: Node(node.val)}
    queue = deque([node])
    while queue:
        curr = queue.popleft()
        for neighbor in curr.neighbors:
            if neighbor not in clones:
                clones[neighbor] = Node(neighbor.val)
                queue.append(neighbor)
            clones[curr].neighbors.append(clones[neighbor])
    return clones[node]`,
  steps: [
    {
      description:
        "Deep copy a graph. The challenge: nodes reference each other, so we must clone nodes before wiring up their neighbor lists. Use a hashmap {original → clone} to track what's been cloned. BFS ensures we visit every node. Graph: 1—2, 1—4, 2—3, 3—4.",
      codeHighlightLines: [1, 3, 4, 5, 6, 7],
      structures: [
        { type: "array", label: "adjacency", values: ["1:[2,4]", "2:[1,3]", "3:[2,4]", "4:[1,3]"] },
        { type: "hashmap", label: "clones (orig → clone)", entries: [[1, "Node(1)"]] },
      ],
    },
    {
      description:
        "Dequeue node 1. Neighbors: 2 and 4. Neither is in clones → create clone(2) and clone(4), enqueue 2 and 4. Wire clone(1).neighbors = [clone(2), clone(4)].",
      codeHighlightLines: [8, 9, 10, 11, 12, 13, 14],
      structures: [
        { type: "hashmap", label: "clones", entries: [[1, "Node(1)"], [2, "Node(2)"], [4, "Node(4)"]], highlightKeys: [2, 4] },
        { type: "array", label: "queue", values: [2, 4], highlights: { 0: "active", 1: "active" } },
        { type: "variables", entries: [{ name: "clone(1).neighbors", value: "[clone(2), clone(4)]", highlight: true }] },
      ],
    },
    {
      description:
        "Dequeue 2. Neighbors: 1 (already cloned), 3 (new → create clone(3), enqueue). Wire clone(2).neighbors = [clone(1), clone(3)]. Dequeue 4. Neighbors: 1 (cloned), 3 (cloned). Wire clone(4).neighbors = [clone(1), clone(3)].",
      codeHighlightLines: [10, 11, 12, 13, 14],
      structures: [
        { type: "hashmap", label: "clones", entries: [[1, "Node(1)"], [2, "Node(2)"], [4, "Node(4)"], [3, "Node(3)"]], highlightKeys: [3] },
        { type: "array", label: "queue", values: [3], highlights: { 0: "active" } },
      ],
    },
    {
      description:
        "Dequeue 3. Neighbors: 2 (cloned), 4 (cloned). Wire clone(3).neighbors = [clone(2), clone(4)]. Queue empty. Return clones[node] = clone(1). Time: O(V+E) — visit each node and edge once. Space: O(V) for the hashmap and queue.",
      codeHighlightLines: [15],
      structures: [
        { type: "hashmap", label: "clones (complete)", entries: [[1, "Node(1)"], [2, "Node(2)"], [3, "Node(3)"], [4, "Node(4)"]] },
        { type: "variables", entries: [{ name: "return", value: "clone(1)", highlight: true }] },
      ],
    },
  ],
};

export default solution;

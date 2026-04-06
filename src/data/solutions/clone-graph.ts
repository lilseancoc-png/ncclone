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
        "Deep copy a graph. Use a hashmap {original → clone} and BFS. Graph: 1—2, 1—4, 2—3, 3—4.",
      codeHighlightLines: [1, 3, 4, 5, 6, 7],
      structures: [
        {
          type: "graph",
          label: "original graph",
          nodes: [
            { id: 1, highlight: "active" },
            { id: 2 },
            { id: 3 },
            { id: 4 },
          ],
          edges: [
            { from: 1, to: 2 },
            { from: 1, to: 4 },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
          ],
        },
        { type: "hashmap", label: "clones (orig → clone)", entries: [[1, "Node(1)"]], highlightKeys: [1] },
      ],
    },
    {
      description:
        "Dequeue 1. Neighbors 2, 4 not cloned → create clones, enqueue. Wire clone(1).neighbors = [clone(2), clone(4)].",
      codeHighlightLines: [8, 9, 10, 11, 12, 13, 14],
      structures: [
        {
          type: "graph",
          label: "BFS from node 1",
          nodes: [
            { id: 1, highlight: "checked" },
            { id: 2, highlight: "active" },
            { id: 3 },
            { id: 4, highlight: "active" },
          ],
          edges: [
            { from: 1, to: 2, highlight: "active" },
            { from: 1, to: 4, highlight: "active" },
            { from: 2, to: 3 },
            { from: 3, to: 4 },
          ],
        },
        { type: "hashmap", label: "clones", entries: [[1, "Node(1)"], [2, "Node(2)"], [4, "Node(4)"]], highlightKeys: [2, 4] },
      ],
    },
    {
      description:
        "Dequeue 2: clone neighbor 3. Dequeue 4: neighbors 1,3 already cloned. Dequeue 3: neighbors 2,4 already cloned. All wired up.",
      codeHighlightLines: [10, 11, 12, 13, 14],
      structures: [
        {
          type: "graph",
          label: "all nodes cloned",
          nodes: [
            { id: 1, highlight: "success" },
            { id: 2, highlight: "success" },
            { id: 3, highlight: "success" },
            { id: 4, highlight: "success" },
          ],
          edges: [
            { from: 1, to: 2, highlight: "success" },
            { from: 1, to: 4, highlight: "success" },
            { from: 2, to: 3, highlight: "success" },
            { from: 3, to: 4, highlight: "success" },
          ],
        },
        { type: "hashmap", label: "clones (complete)", entries: [[1, "Node(1)"], [2, "Node(2)"], [3, "Node(3)"], [4, "Node(4)"]] },
      ],
    },
    {
      description:
        "Return clone(1). The entire graph has been deep copied with all neighbor relationships preserved. Time: O(V+E). Space: O(V).",
      codeHighlightLines: [15],
      structures: [
        { type: "variables", entries: [{ name: "return", value: "clone(1)", highlight: true }] },
      ],
    },
  ],
};

export default solution;

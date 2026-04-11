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
        "We need to create a deep copy of an undirected graph — every node and every edge must be duplicated so that the clone has no references to the original. The challenge: nodes reference each other through neighbor lists, so we can't just copy one node at a time without tracking what we've already cloned. Our strategy: use BFS to traverse the graph and a hashmap {original → clone} to avoid duplicating nodes. Graph: 1—2, 1—4, 2—3, 3—4.",
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
        { type: "variables", entries: [{ name: "queue", value: "[1]" }] },
      ],
    },
    {
      description:
        "Dequeue node 1. It has two neighbors: 2 and 4. Neither has been cloned yet (not in our hashmap), so we create clone nodes for both and add them to the BFS queue. Then we wire up clone(1)'s neighbor list: clone(1).neighbors = [clone(2), clone(4)]. This mirrors the original's connections exactly.",
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
        { type: "variables", entries: [{ name: "queue", value: "[2, 4]" }, { name: "clone(1).neighbors", value: "[clone(2), clone(4)]" }] },
      ],
    },
    {
      description:
        "Dequeue node 2. Its neighbors are 1 and 3. Node 1 is already in our hashmap — we don't clone it again, but we DO add clone(1) to clone(2)'s neighbors. Node 3 is new — create clone(3), enqueue it, and add clone(3) to clone(2)'s neighbors. The hashmap prevents infinite loops and duplicate nodes.",
      codeHighlightLines: [10, 11, 12, 13, 14],
      structures: [
        {
          type: "graph",
          label: "processing node 2",
          nodes: [
            { id: 1, highlight: "checked" },
            { id: 2, highlight: "checked" },
            { id: 3, highlight: "active" },
            { id: 4 },
          ],
          edges: [
            { from: 1, to: 2, highlight: "success" },
            { from: 1, to: 4 },
            { from: 2, to: 3, highlight: "active" },
            { from: 3, to: 4 },
          ],
        },
        { type: "hashmap", label: "clones", entries: [[1, "Node(1)"], [2, "Node(2)"], [3, "Node(3)"], [4, "Node(4)"]], highlightKeys: [3] },
        { type: "variables", entries: [{ name: "queue", value: "[4, 3]" }, { name: "clone(2).neighbors", value: "[clone(1), clone(3)]" }] },
      ],
    },
    {
      description:
        "Dequeue node 4. Neighbors are 1 and 3 — both already cloned. Just wire: clone(4).neighbors = [clone(1), clone(3)]. Dequeue node 3. Neighbors are 2 and 4 — both already cloned. Wire: clone(3).neighbors = [clone(2), clone(4)]. Queue is now empty — BFS complete. Every node has been cloned and every neighbor relationship has been reproduced.",
      codeHighlightLines: [10, 11, 12, 13, 14],
      structures: [
        {
          type: "graph",
          label: "all nodes cloned & wired",
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
        "Return clones[node] — the clone of our starting node. The entire graph has been deep copied with all neighbor relationships preserved. Time: O(V+E) — we visit each node once and process each edge once. Space: O(V) for the hashmap and queue. This pattern (BFS + hashmap for visited tracking) works for any graph traversal where you need to avoid revisiting nodes.",
      codeHighlightLines: [15],
      structures: [
        { type: "variables", entries: [{ name: "return", value: "clone(1)", highlight: true }, { name: "Time", value: "O(V + E)" }, { name: "Space", value: "O(V)" }] },
      ],
    },
  ],
};

export default solution;

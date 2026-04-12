import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Topological Sort (BFS)",
    timeComplexity: "O(C) where C = total chars",
    spaceComplexity: "O(U + E) where U = unique chars",
    code: `from collections import deque

def alienOrder(words):
    adj = {c: set() for w in words for c in w}
    indegree = {c: 0 for c in adj}
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        min_len = min(len(w1), len(w2))
        if w1[:min_len] == w2[:min_len] and len(w1) > len(w2):
            return ""  # invalid
        for j in range(min_len):
            if w1[j] != w2[j]:
                if w2[j] not in adj[w1[j]]:
                    adj[w1[j]].add(w2[j])
                    indegree[w2[j]] += 1
                break
    queue = deque(c for c in indegree if indegree[c] == 0)
    result = []
    while queue:
        c = queue.popleft()
        result.append(c)
        for nei in adj[c]:
            indegree[nei] -= 1
            if indegree[nei] == 0:
                queue.append(nei)
    return ''.join(result) if len(result) == len(indegree) else ""`,
    steps: [
      {
        description:
          "Given words sorted in alien lexicographic order, derive the alphabet ordering. Comparing adjacent words reveals constraints: the FIRST differing character tells us char1 < char2. Build a directed graph and topologically sort it. words=['wrt','wrf','er','ett','rftt']. Unique chars: {w, r, t, f, e}.",
        codeHighlightLines: [3, 4, 5],
        structures: [
          { type: "array", label: "words (alien-sorted)", values: ["wrt", "wrf", "er", "ett", "rftt"] },
          { type: "variables", entries: [{ name: "unique chars", value: "{w, r, t, f, e}" }, { name: "strategy", value: "compare pairs → graph → topo sort" }] },
        ],
      },
      {
        description:
          "Compare pair 1: 'wrt' vs 'wrf'. First diff at index 2: t ≠ f → t < f. Compare pair 2: 'wrf' vs 'er'. First diff at index 0: w ≠ e → w < e. Two edges so far: t→f and w→e.",
        codeHighlightLines: [6, 7, 8, 11, 12, 13, 14, 15, 16],
        structures: [
          { type: "array", label: "words", values: ["wrt", "wrf", "er", "ett", "rftt"], highlights: { 0: "active", 1: "active", 2: "active" } },
          { type: "hashmap", label: "edges found", entries: [["t → f", "from wrt vs wrf"], ["w → e", "from wrf vs er"]], highlightKeys: ["t → f", "w → e"] },
        ],
      },
      {
        description:
          "Compare pair 3: 'er' vs 'ett'. First diff at index 1: r ≠ t → r < t. Compare pair 4: 'ett' vs 'rftt'. First diff at index 0: e ≠ r → e < r. Full edge set: t→f, w→e, r→t, e→r. Chain: w→e→r→t→f. Compute in-degrees: w=0, e=1, r=1, t=1, f=1.",
        codeHighlightLines: [6, 7, 8, 11, 12, 13, 14, 15, 16],
        structures: [
          { type: "array", label: "words", values: ["wrt", "wrf", "er", "ett", "rftt"], highlights: { 2: "active", 3: "active", 4: "active" } },
          { type: "hashmap", label: "all edges", entries: [["t → f", "wrt vs wrf"], ["w → e", "wrf vs er"], ["r → t", "er vs ett"], ["e → r", "ett vs rftt"]], highlightKeys: ["r → t", "e → r"] },
          { type: "variables", entries: [{ name: "in-degrees", value: "w:0, e:1, r:1, t:1, f:1" }] },
        ],
      },
      {
        description:
          "Kahn's BFS: start with in-degree 0 chars. Only 'w' qualifies. Dequeue w, add to result. w→e: decrement e's in-degree to 0, enqueue e. Dequeue e, add to result. e→r: decrement r to 0, enqueue r. Dequeue r, add. r→t: decrement t to 0, enqueue t.",
        codeHighlightLines: [17, 18, 19, 20, 21, 22, 23, 24, 25],
        structures: [
          { type: "array", label: "processing order", values: ["w", "e", "r", "t"], highlights: { 0: "success", 1: "success", 2: "success", 3: "active" } },
          { type: "variables", entries: [{ name: "queue flow", value: "[w]→[e]→[r]→[t]→..." }, { name: "result so far", value: "w, e, r, t", highlight: true }] },
        ],
      },
      {
        description:
          "Dequeue t, add to result. t→f: decrement f to 0, enqueue f. Dequeue f, add. Queue empty. result=['w','e','r','t','f'], len=5 == 5 unique chars → valid! Return 'wertf'. If len(result) < unique chars, there's a cycle (contradictory ordering) → return ''. Time: O(C) total characters for building edges. Space: O(U+E).",
        codeHighlightLines: [26],
        structures: [
          { type: "array", label: "alien alphabet order", values: ["w", "e", "r", "t", "f"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
          { type: "variables", entries: [{ name: "return", value: "'wertf'", highlight: true }, { name: "order", value: "w < e < r < t < f" }, { name: "Time", value: "O(C)" }] },
        ],
      },
    ],
  },
];

export default solutions;

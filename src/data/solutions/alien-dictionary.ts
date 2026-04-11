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
          "Given a list of words sorted in an alien language's lexicographic order, derive the alphabet ordering. The key insight: comparing adjacent words reveals ordering constraints. The FIRST character where two adjacent words differ tells us 'char1 comes before char2' in the alien alphabet. This builds a directed graph of character ordering, which we then topologically sort. Edge cases: if a longer word appears before its prefix (e.g., 'abc' before 'ab'), the input is invalid. words=['wrt','wrf','er','ett','rftt'].",
        codeHighlightLines: [3, 4, 5, 6, 7, 8, 9, 10],
        structures: [
          {
            type: "array",
            label: "words (alien-sorted)",
            values: ["wrt", "wrf", "er", "ett", "rftt"],
            highlights: {},
          },
          { type: "variables", entries: [{ name: "strategy", value: "compare pairs → build graph → topo sort" }] },
        ],
      },
      {
        description:
          "Compare adjacent pairs to extract ordering rules. 'wrt' vs 'wrf': first difference at index 2 → t comes before f. 'wrf' vs 'er': first difference at index 0 → w comes before e. 'er' vs 'ett': index 1 → r before t. 'ett' vs 'rftt': index 0 → e before r. We only get ONE edge per word pair (the first differing character), because subsequent characters' ordering is ambiguous. Build adjacency graph and track in-degrees for topological sort.",
        codeHighlightLines: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        structures: [
          {
            type: "hashmap",
            label: "edges (before → after)",
            entries: [
              ["t → f", "from wrt vs wrf"],
              ["w → e", "from wrf vs er"],
              ["r → t", "from er vs ett"],
              ["e → r", "from ett vs rftt"],
            ],
            highlightKeys: ["t → f", "w → e", "r → t", "e → r"],
          },
        ],
      },
      {
        description:
          "Topological sort (Kahn's BFS): find characters with in-degree 0. Only 'w' has no incoming edges — it's first in the alphabet. Process w: reduce in-degree of 'e' to 0 → enqueue. Process e: reduce 'r' to 0. Process r: reduce 't' to 0. Process t: reduce 'f' to 0. Process f. The chain: w → e → r → t → f. If a character never appeared in any ordering constraint, it can go anywhere (BFS handles this).",
        codeHighlightLines: [17, 18, 19, 20, 21, 22, 23, 24, 25],
        structures: [
          {
            type: "array",
            label: "topological order",
            values: ["w", "e", "r", "t", "f"],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" },
          },
        ],
      },
      {
        description:
          "Return 'wertf' — all 5 unique characters are in the result, confirming no cycle exists. If len(result) < len(unique chars), there's a cycle (contradictory ordering), and we return ''. The alien alphabet order is: w < e < r < t < f. Time: O(C) where C = total characters across all words (for building edges) plus O(U + E) for topological sort. Space: O(U + E).",
        codeHighlightLines: [26],
        structures: [
          {
            type: "variables",
            entries: [{ name: "return", value: "'wertf'", highlight: true }, { name: "alien order", value: "w < e < r < t < f" }, { name: "Time", value: "O(C)" }],
          },
        ],
      },
    ],
  },
];

export default solutions;

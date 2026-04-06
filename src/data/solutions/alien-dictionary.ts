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
          "Derive the alien alphabet order from sorted words. Compare adjacent words to find ordering rules (first differing char gives an edge). Then topological sort the character graph. If there's a cycle, no valid ordering exists.",
        codeHighlightLines: [3, 4, 5, 6, 7],
        structures: [
          {
            type: "array",
            label: "words",
            values: ["wrt", "wrf", "er", "ett", "rftt"],
            highlights: {},
          },
        ],
      },
      {
        description:
          "Compare adjacent pairs: 'wrt' vs 'wrf': first diff at index 2: t→f. 'wrf' vs 'er': first diff at index 0: w→e. 'er' vs 'ett': first diff at index 1: r→t. 'ett' vs 'rftt': first diff at index 0: e→r.",
        codeHighlightLines: [8, 11, 12, 13, 14, 15, 16],
        structures: [
          {
            type: "hashmap",
            label: "adjacency",
            entries: [
              ["t", "{f}"],
              ["w", "{e}"],
              ["r", "{t}"],
              ["e", "{r}"],
            ],
            highlightKeys: ["t", "w", "r", "e"],
          },
        ],
      },
      {
        description:
          "Topological sort: indegree 0 → w. Process w → e's indegree drops to 0. Process e → r drops to 0. Process r → t drops to 0. Process t → f drops to 0. Process f.",
        codeHighlightLines: [17, 18, 19, 20, 21, 22, 23, 24, 25],
        structures: [
          {
            type: "array",
            label: "processing order",
            values: ["w", "e", "r", "t", "f"],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" },
          },
        ],
      },
      {
        description:
          "Result: 'wertf'. All characters included (no cycle). The alien dictionary order is w < e < r < t < f. Topological sort produces a valid linear ordering of the partial order defined by adjacent word comparisons.",
        codeHighlightLines: [26],
        structures: [
          {
            type: "variables",
            entries: [{ name: "return", value: "wertf", highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

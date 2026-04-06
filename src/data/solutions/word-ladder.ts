import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "BFS — Level by Level",
    timeComplexity: "O(n * m * 26)",
    spaceComplexity: "O(n)",
    code: `from collections import deque

def ladderLength(beginWord, endWord, wordList):
    wordSet = set(wordList)
    if endWord not in wordSet:
        return 0
    queue = deque([(beginWord, 1)])
    visited = {beginWord}
    while queue:
        word, steps = queue.popleft()
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                new_word = word[:i] + c + word[i+1:]
                if new_word == endWord:
                    return steps + 1
                if new_word in wordSet and new_word not in visited:
                    visited.add(new_word)
                    queue.append((new_word, steps + 1))
    return 0`,
    steps: [
      {
        description:
          "Transform beginWord to endWord by changing one letter at a time, using only words in the wordList. BFS finds the shortest transformation sequence. For each word, try all 26 letters at each position to find valid neighbors.",
        codeHighlightLines: [3, 4, 5, 6, 7, 8],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "begin", value: "hit" },
              { name: "end", value: "cog" },
              { name: "wordList", value: "[hot,dot,dog,lot,log,cog]" },
            ],
          },
        ],
      },
      {
        description:
          "BFS level 1: 'hit'. Try all 1-letter changes. 'hot' is in wordSet → add to queue (steps=2). No other valid words from 'hit'.",
        codeHighlightLines: [10, 11, 12, 13, 16, 17, 18],
        structures: [
          {
            type: "array",
            label: "queue",
            values: ["(hot, 2)"],
            highlights: { 0: "active" },
          },
          { type: "set", label: "visited", values: ["hit", "hot"] },
        ],
      },
      {
        description:
          "Level 2: 'hot'. Changes: 'dot' (valid), 'lot' (valid). Add both. Level 3: 'dot' → 'dog' (valid). 'lot' → 'log' (valid). Level 4: 'dog' → try 'cog': endWord found! Return 4+1 = 5.",
        codeHighlightLines: [14, 15],
        structures: [
          {
            type: "array",
            label: "shortest path",
            values: ["hit", "hot", "dot", "dog", "cog"],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: 5, highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

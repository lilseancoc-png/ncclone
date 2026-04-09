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
          "Transform beginWord to endWord by changing exactly one letter at a time. Each intermediate word must exist in wordList. Find the SHORTEST transformation sequence (or 0 if impossible). This is a shortest-path problem in disguise — model each word as a graph node, with edges between words that differ by one letter. BFS finds the shortest path. begin='hit', end='cog', wordList=[hot,dot,dog,lot,log,cog].",
        codeHighlightLines: [3, 4, 5, 6, 7, 8],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "begin", value: "hit" },
              { name: "end", value: "cog" },
              { name: "wordList", value: "[hot,dot,dog,lot,log,cog]" },
              { name: "strategy", value: "BFS — try all 1-letter changes" },
            ],
          },
        ],
      },
      {
        description:
          "BFS Level 1 (steps=1): Start with 'hit'. For each position (h,i,t), try all 26 letters. Position 0: ait, bit, ... hot! 'hot' is in wordSet → add to queue with steps=2. No other valid 1-letter changes from 'hit'. The trick of trying all 26 letters × m positions is O(26m) per word, which is faster than comparing against all n words when n is large.",
        codeHighlightLines: [9, 10, 11, 12, 15, 16, 17, 18],
        structures: [
          {
            type: "array",
            label: "BFS queue",
            values: ["(hot, 2)"],
            highlights: { 0: "active" },
          },
          { type: "set", label: "visited", values: ["hit", "hot"] },
          { type: "variables", entries: [{ name: "hit → hot", value: "change h→h: no, h→a..z at pos 0: 'hot' found!", highlight: true }] },
        ],
      },
      {
        description:
          "Level 2 (steps=2): Process 'hot'. Changes: 'dot' ✓ (h→d), 'lot' ✓ (h→l). Both added with steps=3. Level 3 (steps=3): Process 'dot' → 'dog' ✓ (t→g). Process 'lot' → 'log' ✓ (t→g). Both added with steps=4. BFS explores level by level, guaranteeing we find the shortest path first.",
        codeHighlightLines: [11, 12, 13, 15, 16, 17, 18],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "level 2", value: "hot → dot, lot" },
              { name: "level 3", value: "dot → dog, lot → log" },
              { name: "steps so far", value: 4 },
            ],
          },
          { type: "set", label: "visited", values: ["hit", "hot", "dot", "lot", "dog", "log"] },
        ],
      },
      {
        description:
          "Level 4 (steps=4): Process 'dog'. Try changes: d→c at position 0 → 'cog'. That's our endWord! Return steps+1 = 4+1 = 5. The sequence: hit → hot → dot → dog → cog (5 words, 4 transformations). BFS guarantees this is the shortest sequence. Time: O(n × m × 26) where n=words, m=word length. Space: O(n) for visited set and queue.",
        codeHighlightLines: [13, 14],
        structures: [
          {
            type: "array",
            label: "shortest transformation sequence",
            values: ["hit", "hot", "dot", "dog", "cog"],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: 5, highlight: true }, { name: "sequence length", value: "5 words" }, { name: "Time", value: "O(n × m × 26)" }],
          },
        ],
      },
    ],
  },
];

export default solutions;

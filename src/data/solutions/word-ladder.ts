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
          "Transform beginWord to endWord changing one letter at a time, where each intermediate word must be in wordList. Find the shortest sequence length (or 0 if impossible). This is a shortest-path problem: each word is a graph node, edges connect words differing by one letter. BFS finds the shortest path. begin='hit', end='cog', wordList=[hot,dot,dog,lot,log,cog].",
        codeHighlightLines: [3, 4, 5, 6, 7, 8],
        structures: [
          { type: "variables", entries: [{ name: "begin", value: "'hit'" }, { name: "end", value: "'cog'" }, { name: "wordList", value: "[hot,dot,dog,lot,log,cog]" }, { name: "strategy", value: "BFS — each level = one transformation" }] },
        ],
      },
      {
        description:
          "Level 1 (steps=1): Process 'hit'. For each position, try all 26 letters. Position 0: ait, bit, ..., hot! 'hot' is in wordSet → add to queue (steps=2). Position 1: hat, hbt, ..., none valid. Position 2: hia, hib, ..., none valid. Only 'hot' found from 'hit'. This O(26×m) neighbor-finding is faster than comparing against all n words when n >> 26×m.",
        codeHighlightLines: [9, 10, 11, 12, 15, 16, 17, 18],
        structures: [
          { type: "array", label: "BFS queue", values: ["(hot, 2)"], highlights: { 0: "active" } },
          { type: "set", label: "visited", values: ["hit", "hot"] },
          { type: "variables", entries: [{ name: "hit → ?", value: "try h→a..z, i→a..z, t→a..z" }, { name: "found", value: "'hot' (h→h already, but 'h'→'h': it's hit→hot: i→o)", highlight: true }] },
        ],
      },
      {
        description:
          "Level 2 (steps=2): Process 'hot'. Position 0: h→d → 'dot' ✓, h→l → 'lot' ✓. Both added with steps=3. Position 1: o→a..z, nothing new. Position 2: t→a..z, nothing new. Queue now has [(dot,3), (lot,3)]. BFS explores level by level — all words reachable in 2 transformations before any words reachable in 3.",
        codeHighlightLines: [10, 11, 12, 15, 16, 17, 18],
        structures: [
          { type: "array", label: "BFS queue", values: ["(dot, 3)", "(lot, 3)"], highlights: { 0: "active", 1: "active" } },
          { type: "set", label: "visited", values: ["hit", "hot", "dot", "lot"] },
          { type: "variables", entries: [{ name: "hot → dot", value: "h→d at pos 0", highlight: true }, { name: "hot → lot", value: "h→l at pos 0", highlight: true }] },
        ],
      },
      {
        description:
          "Level 3 (steps=3): Process 'dot' → 'dog' ✓ (t→g). Process 'lot' → 'log' ✓ (t→g). Both added with steps=4. Queue: [(dog,4), (log,4)]. Level 4 (steps=4): Process 'dog'. Position 0: d→c → 'cog'. That's endWord! Return steps+1 = 4+1 = 5 immediately. BFS guarantees this is the shortest path.",
        codeHighlightLines: [13, 14],
        structures: [
          { type: "array", label: "BFS queue processing", values: ["(dog, 4)", "(log, 4)"], highlights: { 0: "success" } },
          { type: "set", label: "visited", values: ["hit", "hot", "dot", "lot", "dog", "log"] },
          { type: "variables", entries: [{ name: "dog → cog", value: "d→c at pos 0 = endWord!", highlight: true }, { name: "return", value: "4 + 1 = 5" }] },
        ],
      },
      {
        description:
          "Return 5. The sequence: hit → hot → dot → dog → cog (5 words, 4 letter changes). BFS guarantees shortest path because it explores all k-step transformations before any (k+1)-step ones. Time: O(n × m × 26) — n words in queue, each generating m×26 candidates, set lookup is O(m). Space: O(n) for visited and queue. If endWord isn't in wordList, return 0 immediately.",
        codeHighlightLines: [14],
        structures: [
          { type: "array", label: "shortest path", values: ["hit", "hot", "dot", "dog", "cog"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success" } },
          { type: "variables", entries: [{ name: "return", value: 5, highlight: true }, { name: "transformations", value: "4 letter changes" }, { name: "Time", value: "O(n × m × 26)" }, { name: "Space", value: "O(n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

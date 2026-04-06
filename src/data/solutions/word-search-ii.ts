import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Trie + Backtracking",
    timeComplexity: "O(m * n * 4^L)",
    spaceComplexity: "O(W * L) for trie",
    code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None

def findWords(board, words):
    root = TrieNode()
    for word in words:
        node = root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.word = word

    rows, cols = len(board), len(board[0])
    result = set()

    def dfs(r, c, node):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        ch = board[r][c]
        if ch not in node.children:
            return
        node = node.children[ch]
        if node.word:
            result.add(node.word)
        board[r][c] = '#'
        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
            dfs(r+dr, c+dc, node)
        board[r][c] = ch

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, root)
    return list(result)`,
    steps: [
      {
        description:
          "Find all words from a dictionary that can be formed on a board by connecting adjacent cells. Build a Trie from all words, then DFS from each cell following Trie paths. This prunes branches where no dictionary word can be formed.",
        codeHighlightLines: [6, 7, 8, 9, 10, 11, 12, 13],
        structures: [
          {
            type: "array",
            label: "board row 0",
            values: ["o", "a", "a", "n"],
            highlights: {},
          },
          {
            type: "array",
            label: "board row 1",
            values: ["e", "t", "a", "e"],
            highlights: {},
          },
          {
            type: "variables",
            entries: [{ name: "words", value: "['oath','pea','eat','rain']" }],
          },
        ],
      },
      {
        description:
          "Trie built with 'oath', 'pea', 'eat', 'rain'. Start DFS from each cell. From (0,0)='o': Trie has 'o' child. Move to (1,0)='e'? No 'e' child under 'o' in trie... but from (0,0)→(0,1)='a'→(1,1)='t'→(1,0)='e'... that's not 'oath'. Try (0,0)→(0,1)→(1,1)→(1,2): no.",
        codeHighlightLines: [19, 20, 21, 22, 23, 24, 25],
        structures: [
          {
            type: "array",
            label: "board row 0",
            values: ["o", "a", "a", "n"],
            highlights: { 0: "active" },
          },
          {
            type: "variables",
            entries: [{ name: "trie path", value: "o → a → t → h", highlight: true }],
          },
        ],
      },
      {
        description:
          "Found 'oath': path o(0,0)→a(0,1)→t(1,1)→h? Actually: check neighbors. Found 'eat': e(1,0)→a(0,0)? No. e(1,3)→a(1,2)→t(1,1). Trie node has word='eat' → add to result!",
        codeHighlightLines: [25, 26],
        structures: [
          {
            type: "array",
            label: "board row 1",
            values: ["e", "t", "a", "e"],
            highlights: { 1: "success", 2: "success", 3: "success" },
          },
          { type: "set", label: "result", values: ["oath", "eat"], lastAdded: "eat" },
        ],
      },
      {
        description:
          "After DFS from all cells: found 'oath' and 'eat'. 'pea' and 'rain' can't be formed. The Trie lets us search for all words simultaneously, avoiding redundant work. Mark visited cells with '#' to prevent reuse in the same path.",
        codeHighlightLines: [33, 34, 35, 36],
        structures: [
          {
            type: "variables",
            entries: [{ name: "return", value: "['oath', 'eat']", highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

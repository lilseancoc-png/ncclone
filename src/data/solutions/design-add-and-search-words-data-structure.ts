import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Trie with DFS for Wildcards",
  timeComplexity: "O(n) add, O(26^n) search worst",
  spaceComplexity: "O(total chars)",
  code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        def dfs(node, i):
            if i == len(word):
                return node.is_end
            if word[i] == '.':
                for child in node.children.values():
                    if dfs(child, i + 1):
                        return True
                return False
            if word[i] not in node.children:
                return False
            return dfs(node.children[word[i]], i + 1)
        return dfs(self.root, 0)`,
  steps: [
    {
      description:
        "Design a data structure supporting addWord and search, where search can contain '.' wildcards matching any character. A regular hash set can't handle wildcards efficiently. A Trie (prefix tree) lets us walk character by character, and when we hit '.', we branch into ALL children using DFS.",
      codeHighlightLines: [1, 2, 3, 4, 6, 7, 8],
      structures: [
        { type: "variables", entries: [{ name: "root", value: "TrieNode (empty)" }, { name: "'.' wildcard", value: "matches any single character" }] },
      ],
    },
    {
      description:
        'addWord("bad"): Walk from root, creating nodes: root→b→a→d. Mark d.is_end=True. addWord("dad"): root→d→a→d. addWord("mad"): root→m→a→d. The trie now has 3 branches from root (b, d, m), sharing the "ad" suffix pattern.',
      codeHighlightLines: [10, 11, 12, 13, 14, 15],
      structures: [
        {
          type: "hashmap",
          label: "trie structure (root children → paths)",
          entries: [
            ["b", "b → a → d*"],
            ["d", "d → a → d*"],
            ["m", "m → a → d*"],
          ],
          highlightKeys: ["b", "d", "m"],
        },
        { type: "variables", entries: [{ name: "words added", value: "bad, dad, mad" }, { name: "* = is_end", value: "complete word marker" }] },
      ],
    },
    {
      description:
        'search("pad"): Start at root, look for child \'p\'. Root has children {b, d, m} — no \'p\'! Return False immediately. search("bad"): root→b (found)→a (found)→d (found, is_end=True). Return True. Exact matches work like a standard Trie lookup.',
      codeHighlightLines: [23, 24, 25],
      structures: [
        { type: "array", label: 'search "pad"', values: ["p", "a", "d"], highlights: { 0: "found" } },
        { type: "array", label: 'search "bad"', values: ["b", "a", "d"], highlights: { 0: "checked", 1: "checked", 2: "success" } },
        { type: "variables", entries: [{ name: '"pad"', value: "False (no 'p' child)" }, { name: '"bad"', value: "True (exact match)", highlight: true }] },
      ],
    },
    {
      description:
        'search(".ad"): The "." at position 0 means try ALL children of root. DFS tries child \'b\': walk b→a→d, is_end=True — match found! Return True immediately (no need to try d or m). The "." triggers branching: we explore every possible character at that position.',
      codeHighlightLines: [18, 19, 20, 21, 22],
      structures: [
        { type: "array", label: 'search ".ad"', values: [".", "a", "d"], highlights: { 0: "active" } },
        {
          type: "hashmap",
          label: "DFS branches at '.'",
          entries: [
            ["try 'b'", "b→a→d* ✓ MATCH!"],
            ["try 'd'", "(not needed)"],
            ["try 'm'", "(not needed)"],
          ],
          highlightKeys: ["try 'b'"],
        },
        { type: "variables", entries: [{ name: "result", value: "True (found via 'b' branch)", highlight: true }] },
      ],
    },
    {
      description:
        'search("b.."): \'b\' matches exactly → walk to b node. First "." at position 1: b has child \'a\', try it. Second "." at position 2: a has child \'d\', try it. is_end=True → match! search("..d"): both dots branch, all 3 paths (bad, dad, mad) reach \'d\' with is_end=True.',
      codeHighlightLines: [18, 19, 20, 21, 22, 23, 24, 25, 26],
      structures: [
        { type: "array", label: 'search "b.."', values: ["b", ".", "."], highlights: { 0: "checked", 1: "active", 2: "active" } },
        { type: "variables", entries: [{ name: '"b.."', value: "True (b→a→d)", highlight: true }, { name: '"..d"', value: "True (all 3 words match)" }] },
      ],
    },
    {
      description:
        'Why Trie over hash set? A hash set needs O(26^k) to try all possible words for k wildcards. A Trie prunes branches early — if no words start with the matched prefix so far, that branch dies immediately. addWord: O(n) — just walks the trie. search without dots: O(n). search with dots: O(26^n) worst case (all dots, wide trie), but typically much faster due to pruning. Space: O(total characters across all words).',
      codeHighlightLines: [27],
      structures: [
        { type: "variables", entries: [{ name: "addWord", value: "O(n)" }, { name: "search (no dots)", value: "O(n)" }, { name: "search (dots)", value: "O(26^n) worst, usually fast", highlight: true }, { name: "Space", value: "O(total chars)" }] },
      ],
    },
  ],
};

export default solution;

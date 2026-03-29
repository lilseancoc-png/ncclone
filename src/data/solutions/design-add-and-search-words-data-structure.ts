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
        'Like a Trie, but search supports "." wildcard matching any character. We use DFS to explore all branches when we hit a dot. Add "bad", "dad", "mad".',
      codeHighlightLines: [1, 2, 3, 4, 9, 10, 11, 12, 13, 14],
      structures: [
        { type: "array", label: "words", values: ["bad", "dad", "mad"] },
        { type: "variables", entries: [{ name: "trie", value: "3 words inserted" }] },
      ],
    },
    {
      description:
        'Search "pad": traverse p — not in root.children → return False. Search "bad": traverse b→a→d, is_end=True → return True.',
      codeHighlightLines: [24, 25],
      structures: [
        { type: "array", label: 'search "pad"', values: ["p", "a", "d"], highlights: { 0: "found" } },
        { type: "array", label: 'search "bad"', values: ["b", "a", "d"], highlights: { 0: "checked", 1: "checked", 2: "success" } },
        { type: "variables", entries: [{ name: 'search("pad")', value: false }, { name: 'search("bad")', value: true, highlight: true }] },
      ],
    },
    {
      description:
        'Search ".ad": dot at index 0 matches any char. DFS tries all children: b→a→d (is_end=True, found!). The wildcard branches to b, d, and m.',
      codeHighlightLines: [18, 19, 20, 21, 22],
      structures: [
        { type: "array", label: 'search ".ad"', values: [".", "a", "d"], highlights: { 0: "active" } },
        { type: "array", label: "branches tried", values: ["b→a→d", "d→a→d", "m→a→d"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: 'search(".ad")', value: true, highlight: true }, { name: "note", value: "all 3 match!" }] },
      ],
    },
    {
      description:
        'Search "b..": b exists, then "." matches a, then "." matches d → True. Worst case with all dots is O(26^n), but typical usage is much faster. addWord is always O(n).',
      codeHighlightLines: [18, 19, 20, 21, 22, 23, 24, 25, 26],
      structures: [
        { type: "array", label: 'search "b.."', values: ["b", ".", "."], highlights: { 0: "checked", 1: "active", 2: "active" } },
        { type: "variables", entries: [{ name: 'search("b..")', value: true, highlight: true }, { name: "time (add)", value: "O(n)" }, { name: "time (search)", value: "O(26^n) worst" }] },
      ],
    },
  ],
};

export default solution;

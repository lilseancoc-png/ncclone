import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Hash Map Trie",
  timeComplexity: "O(n) per operation",
  spaceComplexity: "O(total chars)",
  code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end

    def startsWith(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True`,
  steps: [
    {
      description:
        'A Trie (prefix tree) is a tree data structure where each node represents a character, and paths from root to nodes represent prefixes of stored words. Unlike a hash set of words (which needs O(n) to check prefixes), a Trie supports prefix queries in O(k) where k is the prefix length. Each node has: (1) a map of children (char → child node) and (2) an is_end flag marking whether a complete word ends here. We\'ll insert "apple", then demonstrate search vs startsWith.',
      codeHighlightLines: [1, 2, 3, 4, 5, 6, 7, 8],
      structures: [
        { type: "variables", entries: [{ name: "root", value: "{children: {}, is_end: false}" }, { name: "advantage over hash set", value: "efficient prefix queries" }] },
      ],
    },
    {
      description:
        'Insert "apple": starting from root, for each character, check if a child node exists. If not, create one. Walk down: root→a (create), a→p (create), p→p (create), p→l (create), l→e (create). Mark e.is_end = True to indicate "apple" is a complete stored word. If we later insert "app", we\'d walk the existing path root→a→p→p and just mark the second p\'s is_end = True — no new nodes needed. Shared prefixes reuse existing nodes, saving space.',
      codeHighlightLines: [10, 11, 12, 13, 14, 15],
      structures: [
        { type: "array", label: "insert path", values: ["a", "p", "p", "l", "e"], highlights: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "success" } },
        { type: "variables", entries: [{ name: "trie structure", value: "root→a→p→p→l→e*" }, { name: "e.is_end", value: "True (word ends here)", highlight: true }] },
      ],
    },
    {
      description:
        'search("apple"): traverse root→a→p→p→l→e. Each character found in children? Yes. Reached end: check is_end = True. Return True — "apple" exists. search("app"): traverse root→a→p→p. All characters found, but is_end at second p = False. Return False — "app" was never inserted as a complete word, even though it\'s a prefix of "apple". This is the key distinction: search requires is_end = True at the final node.',
      codeHighlightLines: [17, 18, 19, 20, 21, 22],
      structures: [
        { type: "array", label: 'search "apple"', values: ["a", "p", "p", "l", "e"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "success" } },
        { type: "array", label: 'search "app"', values: ["a", "p", "p"], highlights: { 0: "checked", 1: "checked", 2: "found" } },
        { type: "variables", entries: [{ name: 'search("apple")', value: "True (is_end ✓)", highlight: true }, { name: 'search("app")', value: "False (is_end ✗)" }] },
      ],
    },
    {
      description:
        'startsWith("app"): traverse root→a→p→p — all characters found in the trie. Return True immediately. Unlike search, startsWith doesn\'t check is_end — it only cares that the prefix path exists. This is the Trie\'s killer feature: prefix checking in O(k) time. search("b"): root has no child \'b\', return False in one step. Time: O(n) per operation where n = word/prefix length. Space: O(total characters stored). Tries excel at autocomplete, spell-checking, and IP routing.',
      codeHighlightLines: [24, 25, 26, 27, 28, 29],
      structures: [
        { type: "array", label: 'startsWith "app"', values: ["a", "p", "p"], highlights: { 0: "checked", 1: "checked", 2: "success" } },
        { type: "variables", entries: [{ name: 'startsWith("app")', value: "True (prefix exists)", highlight: true }, { name: "Time", value: "O(n) per operation" }, { name: "Space", value: "O(total chars)" }] },
      ],
    },
  ],
};

export default solution;

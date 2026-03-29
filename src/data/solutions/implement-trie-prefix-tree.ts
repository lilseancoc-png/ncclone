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
        'A Trie (prefix tree) stores strings character by character. Each node has a map of children and an is_end flag. We\'ll insert "apple", then search for "apple" and "app".',
      codeHighlightLines: [1, 2, 3, 4, 5, 6, 7, 8],
      structures: [
        { type: "variables", entries: [{ name: "root", value: "{}" }, { name: "operation", value: 'insert("apple")' }] },
      ],
    },
    {
      description:
        'Insert "apple": create nodes for a→p→p→l→e, mark e.is_end=True. Each character becomes a key in the parent\'s children map.',
      codeHighlightLines: [10, 11, 12, 13, 14, 15],
      structures: [
        { type: "array", label: "path", values: ["a", "p", "p", "l", "e"], highlights: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "success" } },
        { type: "variables", entries: [{ name: "trie", value: "root→a→p→p→l→e*" }, { name: "e.is_end", value: true, highlight: true }] },
      ],
    },
    {
      description:
        'Search "apple": traverse a→p→p→l→e, check is_end=True. Found! Search "app": traverse a→p→p, but is_end=False. Not a complete word.',
      codeHighlightLines: [17, 18, 19, 20, 21, 22],
      structures: [
        { type: "array", label: 'search "apple"', values: ["a", "p", "p", "l", "e"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "success" } },
        { type: "array", label: 'search "app"', values: ["a", "p", "p"], highlights: { 0: "checked", 1: "checked", 2: "found" } },
        { type: "variables", entries: [{ name: 'search("apple")', value: true, highlight: true }, { name: 'search("app")', value: false }] },
      ],
    },
    {
      description:
        'startsWith("app"): traverse a→p→p — node exists, so return True. Unlike search, we don\'t check is_end. Each operation is O(n) where n is the word/prefix length.',
      codeHighlightLines: [24, 25, 26, 27, 28, 29],
      structures: [
        { type: "array", label: 'startsWith "app"', values: ["a", "p", "p"], highlights: { 0: "checked", 1: "checked", 2: "success" } },
        { type: "variables", entries: [{ name: 'startsWith("app")', value: true, highlight: true }, { name: "time", value: "O(n) per op" }, { name: "space", value: "O(total chars)" }] },
      ],
    },
  ],
};

export default solution;

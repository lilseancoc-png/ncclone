import { Category } from "../types";

export const tries: Category = {
  name: "Tries",
  slug: "tries",
  problems: [
    {
      id: 208,
      title: "Implement Trie (Prefix Tree)",
      slug: "implement-trie-prefix-tree",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/implement-trie-prefix-tree/",
      description:
        "Implement a Trie (prefix tree) with insert, search, and startsWith methods. Insert adds a word, search checks if a word exists, and startsWith checks if any word begins with the given prefix.",
      functionName: "Trie",
      starterCode: {
        javascript:
          "class Trie {\n  constructor() {\n    \n  }\n\n  insert(word) {\n    \n  }\n\n  search(word) {\n    \n  }\n\n  startsWith(prefix) {\n    \n  }\n}",
        python:
          "class Trie:\n    def __init__(self):\n        pass\n\n    def insert(self, word):\n        pass\n\n    def search(self, word):\n        pass\n\n    def starts_with(self, prefix):\n        pass",
        java: "class Trie {\n    public Trie() {\n        \n    }\n\n    public void insert(String word) {\n        \n    }\n\n    public boolean search(String word) {\n        \n    }\n\n    public boolean startsWith(String prefix) {\n        \n    }\n}",
        cpp: "class Trie {\npublic:\n    Trie() {\n        \n    }\n\n    void insert(string word) {\n        \n    }\n\n    bool search(string word) {\n        \n    }\n\n    bool startsWith(string prefix) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            'operations: ["Trie","insert","search","search","startsWith","insert","search"], args: [[],["apple"],["apple"],["app"],["app"],["app"],["app"]]',
          inputArgs: [
            ["Trie", "insert", "search", "search", "startsWith", "insert", "search"],
            [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]],
          ],
          expected: [null, null, true, false, true, null, true],
        },
      ],
      approach:
        "Each TrieNode contains a map of children (one per character) and a boolean marking end-of-word. Insert builds the path character by character, search follows the path checking the end marker, and startsWith follows the path without checking the end marker.",
      timeComplexity: "O(m) per operation",
      spaceComplexity: "O(m)",
    },
    {
      id: 211,
      title: "Design Add and Search Words Data Structure",
      slug: "design-add-and-search-words-data-structure",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
      description:
        "Design a data structure that supports adding words and searching for them. The search method can include '.' as a wildcard that matches any single character.",
      functionName: "WordDictionary",
      starterCode: {
        javascript:
          "class WordDictionary {\n  constructor() {\n    \n  }\n\n  addWord(word) {\n    \n  }\n\n  search(word) {\n    \n  }\n}",
        python:
          "class WordDictionary:\n    def __init__(self):\n        pass\n\n    def add_word(self, word):\n        pass\n\n    def search(self, word):\n        pass",
        java: "class WordDictionary {\n    public WordDictionary() {\n        \n    }\n\n    public void addWord(String word) {\n        \n    }\n\n    public boolean search(String word) {\n        \n    }\n}",
        cpp: "class WordDictionary {\npublic:\n    WordDictionary() {\n        \n    }\n\n    void addWord(string word) {\n        \n    }\n\n    bool search(string word) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            'operations: ["WordDictionary","addWord","addWord","addWord","search","search","search","search"], args: [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]',
          inputArgs: [
            [
              "WordDictionary",
              "addWord",
              "addWord",
              "addWord",
              "search",
              "search",
              "search",
              "search",
            ],
            [[], ["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]],
          ],
          expected: [null, null, null, null, false, true, true, true],
        },
      ],
      approach:
        "Build a Trie structure where addWord inserts character by character. For search, handle the '.' wildcard by branching to all children at that position using DFS. Regular characters follow the standard Trie path.",
      timeComplexity: "O(m) per operation",
      spaceComplexity: "O(m)",
    },
    {
      id: 212,
      title: "Word Search II",
      slug: "word-search-ii",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/word-search-ii/",
      description:
        "Given an m x n board of characters and a list of words, return all words that can be formed by sequentially adjacent cells (horizontally or vertically neighboring). The same cell may not be used more than once per word.",
      functionName: "findWords",
      starterCode: {
        javascript: "function findWords(board, words) {\n  \n}",
        python: "def find_words(board, words):\n    pass",
        java: "class Solution {\n    public List<String> findWords(char[][] board, String[] words) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
          inputArgs: [
            [
              ["o", "a", "a", "n"],
              ["e", "t", "a", "e"],
              ["i", "h", "k", "r"],
              ["i", "f", "l", "v"],
            ],
            ["oath", "pea", "eat", "rain"],
          ],
          expected: ["eat", "oath"],
        },
      ],
      approach:
        "Build a Trie from the word list, then perform DFS from each cell on the board, following Trie paths. When a word end is reached, add it to results. Prune Trie nodes after finding words to avoid duplicates and speed up subsequent searches.",
      timeComplexity: "O(m*n*4^L)",
      spaceComplexity: "O(N*L)",
    },
  ],
};

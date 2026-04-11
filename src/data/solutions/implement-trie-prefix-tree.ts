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
        "A Trie (prefix tree) stores strings character by character. Each node has a children map (char→child) and an is_end flag. Paths from root represent prefixes. Unlike a hash set, a Trie supports prefix queries in O(k). We'll insert \"apple\", then search and check prefixes.",
      codeHighlightLines: [1, 2, 3, 4, 5, 6, 7, 8],
      structures: [
        { type: "variables", entries: [{ name: "root", value: "{children: {}, is_end: false}" }, { name: "operations", value: "insert, search, startsWith" }] },
      ],
    },
    {
      description:
        "insert(\"apple\"): Start at root. 'a': not in root.children → create node. Move to 'a' node. 'p': not in children → create. Move to 'p'. Second 'p': not in children → create another 'p' node. 'l': create. 'e': create. Five new nodes created, one per character.",
      codeHighlightLines: [10, 11, 12, 13, 14],
      structures: [
        { type: "array", label: "insert path: a → p → p → l → e", values: ["root", "a", "p", "p", "l", "e"], highlights: { 1: "active", 2: "active", 3: "active", 4: "active", 5: "active" } },
        { type: "variables", entries: [{ name: "nodes created", value: "5 (a, p, p, l, e)" }, { name: "each node.children", value: "points to next letter" }] },
      ],
    },
    {
      description:
        "Mark e.is_end = True — \"apple\" is a complete word. Now insert \"app\": root→a (exists!)→p (exists!)→p (exists!). No new nodes needed — the path already exists as a prefix of \"apple\". Just mark the second p's is_end = True. Shared prefixes reuse nodes, saving space.",
      codeHighlightLines: [15],
      structures: [
        { type: "array", label: "trie paths", values: ["root", "a", "p", "p*", "l", "e*"], highlights: { 3: "success", 5: "success" } },
        { type: "variables", entries: [{ name: "e.is_end", value: "True (\"apple\" ends here)", highlight: true }, { name: "p.is_end", value: "True (\"app\" ends here)", highlight: true }, { name: "insert \"app\"", value: "0 new nodes — reuses prefix!" }] },
      ],
    },
    {
      description:
        "search(\"apple\"): Traverse root→a→p→p→l→e. Each char found in children? Yes. At node 'e': is_end = True → return True. search(\"app\"): root→a→p→p. is_end = True (we inserted \"app\") → True. search(\"ap\"): root→a→p. is_end = False → return False. \"ap\" was never inserted.",
      codeHighlightLines: [17, 18, 19, 20, 21, 22],
      structures: [
        { type: "array", label: "search \"apple\"", values: ["a", "p", "p", "l", "e"], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "success" } },
        { type: "array", label: "search \"app\"", values: ["a", "p", "p"], highlights: { 0: "checked", 1: "checked", 2: "success" } },
        { type: "variables", entries: [{ name: "search(\"apple\")", value: "True ✓", highlight: true }, { name: "search(\"app\")", value: "True ✓" }, { name: "search(\"ap\")", value: "False (is_end=false)" }] },
      ],
    },
    {
      description:
        "startsWith(\"app\"): root→a→p→p — all found. Return True. Unlike search, startsWith ignores is_end — it only checks if the path exists. startsWith(\"b\"): root has no 'b' child → False in one step. This is the Trie's killer feature: O(k) prefix checking.",
      codeHighlightLines: [24, 25, 26, 27, 28, 29],
      structures: [
        { type: "array", label: "startsWith \"app\"", values: ["a", "p", "p"], highlights: { 0: "checked", 1: "checked", 2: "success" } },
        { type: "variables", entries: [{ name: "startsWith(\"app\")", value: "True (path exists)", highlight: true }, { name: "startsWith(\"b\")", value: "False (no 'b' child)" }, { name: "search vs startsWith", value: "search checks is_end, startsWith doesn't" }] },
      ],
    },
    {
      description:
        "Time: O(n) per operation where n = word/prefix length. Space: O(total characters) across all inserted words — shared prefixes save space. Tries excel at autocomplete (find all words starting with prefix), spell checking (suggest corrections), and IP routing (longest prefix match). The children map can also be a fixed array of 26 for lowercase-only inputs.",
      codeHighlightLines: [29],
      structures: [
        { type: "variables", entries: [{ name: "Time", value: "O(n) per operation" }, { name: "Space", value: "O(total chars)" }, { name: "use cases", value: "autocomplete, spell check, IP routing" }, { name: "optimization", value: "array[26] instead of hashmap for lowercase" }] },
      ],
    },
  ],
};

export default solution;

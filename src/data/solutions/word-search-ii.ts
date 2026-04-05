import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Trie + Backtracking",
  timeComplexity: "O(m·n·4^L)",
  spaceComplexity: "O(W·L)",

  steps: [
    {
      description: "Build trie from words list. Each path from root to a word-end stores the complete word.",
      codeHighlightLines: [8, 9, 10, 12, 14],
      structures: [
        { type: "array", label: "Words", values: ["oath", "pea", "eat", "rain"], highlights: {} },
        { type: "hashmap", label: "Trie Root Children", entries: [["o", "→a→t→h (oath)"], ["p", "→e→a (pea)"], ["e", "→a→t (eat)"], ["r", "→a→i→n (rain)"]], highlights: {} },
      ],
    },
    {
      description: "DFS from each cell. At 'o' (0,0), follow trie: o→a→t→h — found 'oath'!",
      codeHighlightLines: [18, 19],
      structures: [
        { type: "array", label: "Board row 0", values: ["o", "a", "a", "n"], highlights: { 0: "success" } },
        { type: "array", label: "Board row 1", values: ["e", "t", "a", "e"], highlights: {} },
        { type: "array", label: "Found words", values: ["oath"], highlights: { 0: "success" } },
      ],
    },
    {
      description: "Continue DFS. Find 'eat' starting from (1,0). 'pea' and 'rain' not found on board.",
      codeHighlightLines: [30, 31],
      structures: [
        { type: "array", label: "Board row 1", values: ["e", "t", "a", "e"], highlights: { 0: "success" } },
        { type: "array", label: "Found words", values: ["oath", "eat"], highlights: { 0: "success", 1: "success" } },
      ],
    },
  ],
};

export default solution;

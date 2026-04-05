import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "HashMap + Doubly Linked List",
  timeComplexity: "O(1) per operation",
  spaceComplexity: "O(capacity)",

  steps: [
    {
      description: "put(1,1), put(2,2): Both added to cache and linked list. MRU is rightmost.",
      codeHighlightLines: [20, 21],
      structures: [
        { type: "array", label: "Linked List (LRU → MRU)", values: ["1:1", "2:2"], highlights: { 0: "checked", 1: "active" } },
        { type: "hashmap", label: "Cache", entries: [["1", "1"], ["2", "2"]], highlights: {} },
        { type: "variables", label: "State", entries: [{ name: "capacity", value: 2 }, { name: "size", value: 2 }] },
      ],
    },
    {
      description: "get(1): Move key 1 to MRU position. put(3,3): Capacity exceeded, evict LRU (key 2).",
      codeHighlightLines: [22, 23, 24],
      structures: [
        { type: "array", label: "Linked List (LRU → MRU)", values: ["1:1", "3:3"], highlights: { 0: "checked", 1: "success" } },
        { type: "hashmap", label: "Cache", entries: [["1", "1"], ["3", "3"]], highlights: { "3": "success" } },
        { type: "variables", label: "State", entries: [{ name: "evicted", value: "key 2" }, { name: "reason", value: "LRU" }] },
      ],
    },
    {
      description: "get(2) returns -1 (evicted). get(3) returns 3 and moves it to MRU.",
      codeHighlightLines: [11, 14, 15],
      structures: [
        { type: "hashmap", label: "Cache", entries: [["1", "1"], ["3", "3"]], highlights: {} },
        { type: "variables", label: "Results", entries: [{ name: "get(2)", value: "-1 (evicted)" }, { name: "get(3)", value: 3 }] },
      ],
    },
  ],
};

export default solution;

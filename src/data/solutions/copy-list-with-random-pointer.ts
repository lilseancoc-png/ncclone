import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "HashMap — Old to New",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "First pass: create a clone of each node and store mapping in hashmap.",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "linkedlist", label: "Original List", nodes: [{ value: 7, highlight: "active" }, { value: 13, highlight: "active" }, { value: 11, highlight: "active" }, { value: 10, highlight: "active" }, { value: 1, highlight: "active" }], pointers: [{ index: 0, label: "head" }] },
        { type: "hashmap", label: "old -> new", entries: [["Node(7)", "Copy(7)"], ["Node(13)", "Copy(13)"], ["Node(11)", "Copy(11)"], ["Node(10)", "Copy(10)"], ["Node(1)", "Copy(1)"]], highlights: {} },
      ],
    },
    {
      description: "Second pass: wire up next and random pointers using the hashmap.",
      codeHighlightLines: [12, 13],
      structures: [
        { type: "linkedlist", label: "Original List", nodes: [{ value: 7 }, { value: 13 }, { value: 11, highlight: "active" }, { value: 10 }, { value: 1 }], pointers: [{ index: 2, label: "curr" }] },
        { type: "linkedlist", label: "Copy List", nodes: [{ value: 7, highlight: "success" }, { value: 13, highlight: "success" }, { value: 11, highlight: "active" }, { value: 10 }, { value: 1 }], pointers: [{ index: 2, label: "wiring" }] },
        { type: "variables", label: "Wiring node 11", entries: [{ name: "next", value: "-> Copy(10)" }, { name: "random", value: "-> Copy(7)" }] },
      ],
    },
    {
      description: "All pointers wired. Deep copy complete with both next and random references.",
      codeHighlightLines: [15],
      structures: [
        { type: "linkedlist", label: "Deep Copy", nodes: [{ value: 7, highlight: "success" }, { value: 13, highlight: "success" }, { value: 11, highlight: "success" }, { value: 10, highlight: "success" }, { value: 1, highlight: "success" }], pointers: [{ index: 0, label: "head" }] },
      ],
    },
  ],
};

export default solution;

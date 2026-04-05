import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "HashMap + Binary Search",
  timeComplexity: "O(log n) per get",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "set('foo','bar',1) and set('foo','bar2',4). Values stored in timestamp order.",
      codeHighlightLines: [8],
      structures: [
        { type: "hashmap", label: "Store", entries: [["foo", "[(1,'bar'), (4,'bar2')]"]], highlights: { "foo": "active" } },
      ],
    },
    {
      description: "get('foo',1): Binary search finds exact match at timestamp 1 → 'bar'.",
      codeHighlightLines: [16, 17],
      structures: [
        { type: "array", label: "Timestamps for 'foo'", values: [1, 4], highlights: { 0: "success" } },
        { type: "variables", label: "Binary Search", entries: [{ name: "lo", value: 0 }, { name: "hi", value: 1 }, { name: "mid", value: 0 }, { name: "result", value: "bar" }] },
      ],
    },
    {
      description: "get('foo',3): No exact match, binary search finds largest timestamp ≤ 3 → 'bar'.",
      codeHighlightLines: [14, 15],
      structures: [
        { type: "array", label: "Timestamps for 'foo'", values: [1, 4], highlights: { 0: "success", 1: "found" } },
        { type: "variables", label: "Binary Search", entries: [{ name: "timestamp", value: 3 }, { name: "result", value: "bar" }, { name: "reason", value: "1 ≤ 3 ✓, 4 > 3 ✗" }] },
      ],
    },
  ],
};

export default solution;

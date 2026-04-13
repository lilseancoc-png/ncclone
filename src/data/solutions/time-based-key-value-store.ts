import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Hash Map + Binary Search",
    timeComplexity: "O(log n) per get, O(1) per set",
    spaceComplexity: "O(n)",
    code: `class TimeMap:
    def __init__(self):
        self.store = {}  # key -> [(timestamp, value)]

    def set(self, key, value, timestamp):
        if key not in self.store:
            self.store[key] = []
        self.store[key].append((timestamp, value))

    def get(self, key, timestamp):
        if key not in self.store:
            return ""
        vals = self.store[key]
        lo, hi = 0, len(vals) - 1
        result = ""
        while lo <= hi:
            mid = (lo + hi) // 2
            if vals[mid][0] <= timestamp:
                result = vals[mid][1]
                lo = mid + 1
            else:
                hi = mid - 1
        return result`,
    steps: [
      {
        description:
          "Design a time-based key-value store. set() stores values with timestamps (always increasing). get(key, timestamp) returns the value with the largest timestamp ≤ given timestamp. Since timestamps arrive in order, each key's list is pre-sorted — perfect for binary search!",
        codeHighlightLines: [1, 2, 3, 5, 6, 7, 8],
        structures: [
          { type: "hashmap", label: "store", entries: [] },
          { type: "variables", entries: [{ name: "set() is O(1)", value: "just append" }, { name: "get() is O(log n)", value: "binary search" }] },
        ],
      },
      {
        description:
          "set('foo', 'bar', 1), set('foo', 'bar2', 4). The list for 'foo' is sorted: [(1,'bar'), (4,'bar2')]. Now get('foo', 3): find the largest timestamp ≤ 3. Binary search: lo=0, hi=1.",
        codeHighlightLines: [5, 6, 7, 8, 10, 11, 12, 13, 14],
        structures: [
          { type: "hashmap", label: "store", entries: [["foo", "[(1,bar), (4,bar2)]"]], highlightKeys: ["foo"] },
          { type: "variables", entries: [{ name: "query", value: "get('foo', 3)" }, { name: "lo=0, hi=1", value: "binary search begins" }] },
        ],
      },
      {
        description:
          "mid=0: timestamp 1 ≤ 3 ✓. Save result='bar', move lo=1. mid=1: timestamp 4 > 3 ✗. Move hi=0. lo > hi → loop ends. Return 'bar' — the most recent value at or before timestamp 3. We found the rightmost valid entry.",
        codeHighlightLines: [15, 16, 17, 18, 19, 20, 21, 22],
        structures: [
          { type: "array", label: "foo values", values: ["(1,bar)", "(4,bar2)"], highlights: { 0: "success", 1: "checked" }, pointers: [{ index: 0, label: "result" }] },
          { type: "variables", entries: [{ name: "mid=0: 1≤3", value: "✓ result='bar'" }, { name: "mid=1: 4>3", value: "✗ too new", highlight: true }, { name: "return", value: "bar", highlight: true }] },
        ],
      },
      {
        description:
          "get('foo', 5): mid=0: 1≤5 ✓ result='bar', lo=1. mid=1: 4≤5 ✓ result='bar2', lo=2. Loop ends → 'bar2'. get('foo', 0): mid=0: 1>0 ✗, hi=-1. No valid timestamp → return ''.",
        codeHighlightLines: [15, 16, 17, 18, 19, 20, 21, 22, 23],
        structures: [
          { type: "variables", entries: [{ name: "get('foo', 5)", value: "bar2 (timestamp 4 ≤ 5)", highlight: true }, { name: "get('foo', 0)", value: "'' (no timestamp ≤ 0)" }] },
        ],
      },
      {
        description:
          "The binary search pattern: find rightmost entry where timestamp ≤ target. Each valid match updates result and moves lo right (searching for a newer one). Invalid timestamps move hi left. set() is O(1) append. get() is O(log n) binary search. Space: O(n) for all stored entries.",
        codeHighlightLines: [23],
        structures: [
          { type: "variables", entries: [{ name: "set()", value: "O(1)" }, { name: "get()", value: "O(log n)", highlight: true }, { name: "Space", value: "O(n)" }, { name: "key insight", value: "timestamps pre-sorted → binary search" }] },
        ],
      },
    ],
  },
];

export default solutions;

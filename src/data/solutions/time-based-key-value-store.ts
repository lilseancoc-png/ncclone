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
          "Design a time-based key-value store. set() stores values with timestamps (always increasing). get(key, timestamp) returns the value with the largest timestamp <= the given timestamp. Since timestamps are sorted, we can binary search!",
        codeHighlightLines: [1, 2, 3, 5, 6, 7, 8],
        structures: [
          {
            type: "hashmap",
            label: "store",
            entries: [],
          },
        ],
      },
      {
        description:
          "set('foo', 'bar', 1), set('foo', 'bar2', 4). The list for 'foo' is sorted by timestamp: [(1,'bar'), (4,'bar2')]. Now get('foo', 3): find the largest timestamp <= 3.",
        codeHighlightLines: [8],
        structures: [
          {
            type: "hashmap",
            label: "store",
            entries: [["foo", "[(1,bar), (4,bar2)]"]],
            highlightKeys: ["foo"],
          },
          {
            type: "variables",
            entries: [
              { name: "query", value: "get('foo', 3)" },
            ],
          },
        ],
      },
      {
        description:
          "Binary search on foo's list: lo=0, hi=1. mid=0: timestamp 1 <= 3 ✓, result='bar', lo=1. mid=1: timestamp 4 > 3 ✗, hi=0. Loop ends. Return 'bar' — the most recent value at or before timestamp 3.",
        codeHighlightLines: [14, 15, 16, 17, 18, 19, 20, 21, 22],
        structures: [
          {
            type: "array",
            label: "foo values",
            values: ["(1,bar)", "(4,bar2)"],
            highlights: { 0: "success", 1: "checked" },
            pointers: [
              { index: 0, label: "result" },
            ],
          },
          {
            type: "variables",
            entries: [
              { name: "timestamp", value: 3 },
              { name: "return", value: "bar", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "get('foo', 5): Binary search finds timestamp 4 <= 5, so result='bar2'. get('foo', 0): No timestamp <= 0, return ''. The binary search gives O(log n) per get, much better than linear scan.",
        codeHighlightLines: [23],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "get('foo', 5)", value: "bar2", highlight: true },
              { name: "get('foo', 0)", value: "(empty string)" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;

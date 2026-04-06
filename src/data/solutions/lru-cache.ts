import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Hash Map + Doubly Linked List",
    timeComplexity: "O(1) per operation",
    spaceComplexity: "O(capacity)",
    code: `class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = {}  # key -> node
        self.head = Node(0, 0)  # dummy
        self.tail = Node(0, 0)  # dummy
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key):
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.val
        return -1

    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._add(node)
        if len(self.cache) > self.cap:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]`,
    steps: [
      {
        description:
          "LRU Cache needs O(1) get and put. Use a hash map for O(1) key lookup and a doubly linked list for O(1) insertion/removal to track recency. Most recently used goes to tail; least recently used is at head.",
        codeHighlightLines: [1, 2, 3, 4, 5, 6, 7, 8],
        structures: [
          {
            type: "variables",
            entries: [{ name: "capacity", value: 2 }],
          },
          { type: "hashmap", label: "cache", entries: [] },
          {
            type: "array",
            label: "DLL: head ↔ ... ↔ tail",
            values: ["HEAD", "TAIL"],
            highlights: {},
          },
        ],
      },
      {
        description:
          "put(1, 1): Create node, add to map and tail of list. put(2, 2): Same. Cache is now full (capacity=2). List order: HEAD ↔ 1 ↔ 2 ↔ TAIL (1 is LRU).",
        codeHighlightLines: [18, 19, 20, 21, 22],
        structures: [
          {
            type: "hashmap",
            label: "cache",
            entries: [[1, 1], [2, 2]],
            highlightKeys: [1, 2],
          },
          {
            type: "array",
            label: "DLL order (LRU → MRU)",
            values: [1, 2],
            highlights: { 0: "checked", 1: "active" },
          },
        ],
      },
      {
        description:
          "get(1): Found! Move node 1 to tail (most recent). Return 1. Now list: HEAD ↔ 2 ↔ 1 ↔ TAIL. Key 2 is now the LRU.",
        codeHighlightLines: [10, 11, 12, 13, 14, 15],
        structures: [
          {
            type: "array",
            label: "DLL order (LRU → MRU)",
            values: [2, 1],
            highlights: { 1: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: 1, highlight: true }],
          },
        ],
      },
      {
        description:
          "put(3, 3): Cache full! Evict LRU (key=2, at head.next). Remove from list and map. Add node 3. Cache: {1:1, 3:3}. get(2) would return -1 (evicted).",
        codeHighlightLines: [23, 24, 25, 26],
        structures: [
          {
            type: "hashmap",
            label: "cache",
            entries: [[1, 1], [3, 3]],
            highlightKeys: [3],
          },
          {
            type: "array",
            label: "DLL order (LRU → MRU)",
            values: [1, 3],
            highlights: { 1: "active" },
          },
          {
            type: "variables",
            entries: [{ name: "evicted", value: "key=2", highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;

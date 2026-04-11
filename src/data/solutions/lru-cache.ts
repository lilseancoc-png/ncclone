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
          "LRU Cache needs O(1) get and put with automatic eviction of the least recently used item. The data structure combines: (1) a hash map for O(1) key lookup, and (2) a doubly linked list for O(1) insertion/removal to track recency order. Most recently used goes near the tail; the LRU item is always at head.next. Two dummy nodes (head/tail) eliminate null-checking edge cases.",
        codeHighlightLines: [1, 2, 3, 4, 5, 6, 7, 8],
        structures: [
          { type: "variables", entries: [{ name: "capacity", value: 2 }] },
          { type: "hashmap", label: "cache (empty)", entries: [] },
          {
            type: "linkedlist",
            label: "DLL: head ↔ tail",
            nodes: [{ value: "H", label: "head" }, { value: "T", label: "tail" }],
          },
        ],
      },
      {
        description:
          "put(1, 1): Create node(key=1, val=1). Add to cache map. Insert before tail in the DLL. This node is both the MRU (most recent) and LRU (least recent) since it's the only item.",
        codeHighlightLines: [18, 19, 20, 21, 22],
        structures: [
          {
            type: "hashmap",
            label: "cache",
            entries: [[1, "node(1,1)"]],
            highlightKeys: [1],
          },
          {
            type: "linkedlist",
            label: "DLL",
            nodes: [
              { value: "H", label: "head" },
              { value: "1:1", highlight: "active", label: "MRU & LRU" },
              { value: "T", label: "tail" },
            ],
          },
        ],
      },
      {
        description:
          "put(2, 2): Create node(key=2, val=2). Insert before tail. Cache now has 2 items (at capacity). Node 2 is MRU (closest to tail), node 1 is now LRU (closest to head). The DLL maintains recency order: head ↔ LRU ↔ ... ↔ MRU ↔ tail.",
        codeHighlightLines: [18, 19, 20, 21, 22],
        structures: [
          {
            type: "hashmap",
            label: "cache",
            entries: [[1, "node(1,1)"], [2, "node(2,2)"]],
            highlightKeys: [2],
          },
          {
            type: "linkedlist",
            label: "DLL (LRU → MRU)",
            nodes: [
              { value: "H", label: "head" },
              { value: "1:1", highlight: "checked", label: "LRU" },
              { value: "2:2", highlight: "active", label: "MRU" },
              { value: "T", label: "tail" },
            ],
          },
        ],
      },
      {
        description:
          "get(1): Key 1 found in cache! But accessing it makes it the most recently used. Remove node 1 from its current position in the DLL (O(1) with doubly linked pointers), then re-insert it before tail. Now node 2 becomes LRU and node 1 is MRU. Return value 1.",
        codeHighlightLines: [10, 11, 12, 13, 14, 15],
        structures: [
          {
            type: "linkedlist",
            label: "DLL after get(1) — node 1 moved to MRU",
            nodes: [
              { value: "H", label: "head" },
              { value: "2:2", highlight: "checked", label: "LRU" },
              { value: "1:1", highlight: "success", label: "MRU" },
              { value: "T", label: "tail" },
            ],
          },
          { type: "variables", entries: [{ name: "return", value: 1, highlight: true }, { name: "action", value: "remove + re-add → move to MRU" }] },
        ],
      },
      {
        description:
          "put(3, 3): Cache is at capacity (2). Create node(3,3) and add it. Now cache size = 3 > capacity! Evict LRU: head.next = node(2,2). Remove it from DLL and delete from cache map. Cache: {1:1, 3:3}. The eviction is O(1) because the LRU is always at head.next — no searching required.",
        codeHighlightLines: [18, 19, 20, 21, 22, 23, 24, 25, 26],
        structures: [
          {
            type: "hashmap",
            label: "cache (after eviction)",
            entries: [[1, "node(1,1)"], [3, "node(3,3)"]],
            highlightKeys: [3],
          },
          {
            type: "linkedlist",
            label: "DLL — node 2 evicted",
            nodes: [
              { value: "H", label: "head" },
              { value: "1:1", highlight: "checked", label: "LRU" },
              { value: "3:3", highlight: "active", label: "MRU" },
              { value: "T", label: "tail" },
            ],
          },
          { type: "variables", entries: [{ name: "evicted", value: "key=2 (was LRU)", highlight: true }] },
        ],
      },
      {
        description:
          "get(2) → returns -1 (key 2 was evicted). get(3) → key 3 found, move to MRU position, return 3. The combination of hash map + DLL gives us the best of both worlds: O(1) random access by key AND O(1) recency tracking. Neither data structure alone could do both. This pattern appears in many real systems (browser caches, database buffer pools, OS page caches).",
        codeHighlightLines: [10, 11, 15, 16],
        structures: [
          {
            type: "linkedlist",
            label: "DLL after get(3)",
            nodes: [
              { value: "H", label: "head" },
              { value: "1:1", highlight: "checked", label: "LRU" },
              { value: "3:3", highlight: "success", label: "MRU" },
              { value: "T", label: "tail" },
            ],
          },
          { type: "variables", entries: [{ name: "get(2)", value: "-1 (evicted)" }, { name: "get(3)", value: "3", highlight: true }, { name: "Time", value: "O(1) per operation" }, { name: "Space", value: "O(capacity)" }] },
        ],
      },
    ],
  },
];

export default solutions;

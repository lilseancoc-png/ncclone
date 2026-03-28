import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def top_k_frequent(nums, k):
    count = {}
    for num in nums:
        count[num] = count.get(num, 0) + 1
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in count.items():
        buckets[freq].append(num)
    result = []
    for i in range(len(buckets) - 1, 0, -1):
        for num in buckets[i]:
            result.append(num)
            if len(result) == k:
                return result`,
  steps: [
    {
      description:
        "Find the top k=2 most frequent elements. We'll use bucket sort: first count frequencies, then place numbers into buckets indexed by their frequency, then collect from highest frequency down. This avoids the O(n log n) of sorting — bucket sort gives us O(n).",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "nums", values: [1, 1, 1, 2, 2, 3] },
        { type: "variables", entries: [{ name: "k", value: 2 }] },
        { type: "hashmap", label: "count", entries: [] },
      ],
    },
    {
      description:
        "nums[0] = 1. First time seeing 1. count.get(1, 0) returns the default 0, so count[1] = 0 + 1 = 1.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [1, 1, 1, 2, 2, 3], highlights: { 0: "active" }, pointers: [{ index: 0, label: "i" }] },
        { type: "hashmap", label: "count", entries: [[1, 1]], highlightKeys: [1] },
      ],
    },
    {
      description:
        "nums[1] = 1. Already in count. count.get(1, 0) returns 1, so count[1] = 1 + 1 = 2.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [1, 1, 1, 2, 2, 3], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "i" }] },
        { type: "hashmap", label: "count", entries: [[1, 2]], highlightKeys: [1] },
      ],
    },
    {
      description:
        "nums[2] = 1. Increment again: count[1] = 2 + 1 = 3.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [1, 1, 1, 2, 2, 3], highlights: { 0: "checked", 1: "checked", 2: "active" }, pointers: [{ index: 2, label: "i" }] },
        { type: "hashmap", label: "count", entries: [[1, 3]], highlightKeys: [1] },
      ],
    },
    {
      description:
        "nums[3] = 2. First time seeing 2. count[2] = 0 + 1 = 1.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [1, 1, 1, 2, 2, 3], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "active" }, pointers: [{ index: 3, label: "i" }] },
        { type: "hashmap", label: "count", entries: [[1, 3], [2, 1]], highlightKeys: [2] },
      ],
    },
    {
      description:
        "nums[4] = 2. Increment: count[2] = 1 + 1 = 2.",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [1, 1, 1, 2, 2, 3], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "active" }, pointers: [{ index: 4, label: "i" }] },
        { type: "hashmap", label: "count", entries: [[1, 3], [2, 2]], highlightKeys: [2] },
      ],
    },
    {
      description:
        "nums[5] = 3. First time seeing 3. count[3] = 1. Counting phase complete!",
      codeHighlightLines: [3, 4],
      structures: [
        { type: "array", label: "nums", values: [1, 1, 1, 2, 2, 3], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "active" }, pointers: [{ index: 5, label: "i" }] },
        { type: "hashmap", label: "count", entries: [[1, 3], [2, 2], [3, 1]], highlightKeys: [3] },
      ],
    },
    {
      description:
        "Create a bucket array of size len(nums)+1 = 7. The index represents frequency. Place each number into its frequency's bucket: 3 appears 1 time → bucket[1]. 2 appears 2 times → bucket[2]. 1 appears 3 times → bucket[3].",
      codeHighlightLines: [5, 6, 7],
      structures: [
        { type: "hashmap", label: "count", entries: [[1, 3], [2, 2], [3, 1]] },
        { type: "array", label: "buckets (index = frequency)", values: ["[]", "[3]", "[2]", "[1]", "[]", "[]", "[]"], highlights: { 1: "active", 2: "active", 3: "active" } },
      ],
    },
    {
      description:
        "Walk buckets from right to left (highest frequency first). bucket[6], bucket[5], bucket[4] are empty. bucket[3] = [1]. Add 1 to result. result has 1 element, but we need k=2.",
      codeHighlightLines: [9, 10, 11],
      structures: [
        { type: "array", label: "buckets", values: ["[]", "[3]", "[2]", "[1]", "[]", "[]", "[]"], highlights: { 3: "active" }, pointers: [{ index: 3, label: "i" }] },
        { type: "array", label: "result", values: [1], highlights: { 0: "success" } },
        { type: "variables", entries: [{ name: "k", value: 2 }, { name: "len(result)", value: 1 }] },
      ],
    },
    {
      description:
        "Move to bucket[2] = [2]. Add 2 to result. Now len(result) = 2 = k. Return [1, 2]! Time: O(n) — counting is O(n), bucket creation O(n), collection O(n). Space: O(n) for the count map and buckets.",
      codeHighlightLines: [9, 10, 11, 12, 13],
      structures: [
        { type: "array", label: "buckets", values: ["[]", "[3]", "[2]", "[1]", "[]", "[]", "[]"], highlights: { 2: "active" }, pointers: [{ index: 2, label: "i" }] },
        { type: "array", label: "result", values: [1, 2], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[1, 2]", highlight: true }] },
      ],
    },
  ],
};

export default solution;

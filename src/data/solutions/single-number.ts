import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  // ── Approach 1: Hash Set ─────────────────────────────────────────────
  {
    label: "Hash Set",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: `def singleNumber(nums):
    seen = set()
    for num in nums:
        if num in seen:
            seen.remove(num)
        else:
            seen.add(num)
    return seen.pop()`,
    steps: [
      {
        description:
          "Every number appears twice except one — find the single number. One approach: use a hash set. If we see a number for the first time, add it. If we see it again, remove it. At the end, only the single number remains.",
        codeHighlightLines: [1, 2],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2] },
          { type: "set", label: "seen", values: [] },
        ],
      },
      {
        description:
          "nums[0] = 4. Not in seen → add it. seen = {4}.",
        codeHighlightLines: [3, 6, 7],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 0: "active" }, pointers: [{ index: 0, label: "i" }] },
          { type: "set", label: "seen", values: [4], lastAdded: 4 },
        ],
      },
      {
        description:
          "nums[1] = 1. Not in seen → add it. seen = {4, 1}.",
        codeHighlightLines: [3, 6, 7],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "i" }] },
          { type: "set", label: "seen", values: [4, 1], lastAdded: 1 },
        ],
      },
      {
        description:
          "nums[2] = 2. Not in seen → add it. seen = {4, 1, 2}.",
        codeHighlightLines: [3, 6, 7],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 0: "checked", 1: "checked", 2: "active" }, pointers: [{ index: 2, label: "i" }] },
          { type: "set", label: "seen", values: [4, 1, 2], lastAdded: 2 },
        ],
      },
      {
        description:
          "nums[3] = 1. Already in seen → remove it! The pair of 1s cancel out. seen = {4, 2}.",
        codeHighlightLines: [3, 4, 5],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 1: "pointer-j", 3: "pointer-j" }, pointers: [{ index: 3, label: "i" }] },
          { type: "set", label: "seen", values: [4, 2], highlightValues: [1] },
          { type: "variables", entries: [{ name: "removed", value: 1, highlight: true }] },
        ],
      },
      {
        description:
          "nums[4] = 2. Already in seen → remove it! seen = {4}. Only the single number remains.",
        codeHighlightLines: [3, 4, 5],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 2: "pointer-j", 4: "pointer-j" }, pointers: [{ index: 4, label: "i" }] },
          { type: "set", label: "seen", values: [4], highlightValues: [4] },
          { type: "variables", entries: [{ name: "removed", value: 2, highlight: true }] },
        ],
      },
      {
        description:
          "Return seen.pop() = 4. Time: O(n) — one pass. Space: O(n) — the set can hold up to n/2 elements. This works well, but the XOR approach (Approach 2) achieves O(1) space using a bit manipulation trick.",
        codeHighlightLines: [8],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 0: "success" } },
          { type: "variables", entries: [{ name: "return", value: 4, highlight: true }] },
        ],
      },
    ],
  },

  // ── Approach 2: Optimal — XOR ────────────────────────────────────────
  {
    label: "Optimal — XOR",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: `def singleNumber(nums):
    result = 0
    for num in nums:
        result = result ^ num
    return result`,
    steps: [
      {
        description:
          "XOR has two key properties: a ^ a = 0 (same numbers cancel) and a ^ 0 = a (identity). If we XOR every number together, all pairs cancel out and only the single number survives. This gives O(1) space — just one integer variable!",
        codeHighlightLines: [1, 2],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2] },
          { type: "variables", entries: [{ name: "result", value: 0 }] },
        ],
      },
      {
        description:
          "XOR with nums[0]=4: result = 0 ^ 4 = 4. In binary: 000 ^ 100 = 100. We've \"recorded\" the bits of 4.",
        codeHighlightLines: [3, 4],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 0: "active" }, pointers: [{ index: 0, label: "num" }] },
          { type: "variables", entries: [{ name: "result", value: "0 ^ 4 = 4", highlight: true }] },
        ],
      },
      {
        description:
          "XOR with nums[1]=1: result = 4 ^ 1 = 5. In binary: 100 ^ 001 = 101.",
        codeHighlightLines: [3, 4],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 1: "active" }, pointers: [{ index: 1, label: "num" }] },
          { type: "variables", entries: [{ name: "result", value: "4 ^ 1 = 5", highlight: true }] },
        ],
      },
      {
        description:
          "XOR with nums[2]=2: result = 5 ^ 2 = 7. In binary: 101 ^ 010 = 111.",
        codeHighlightLines: [3, 4],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 2: "active" }, pointers: [{ index: 2, label: "num" }] },
          { type: "variables", entries: [{ name: "result", value: "5 ^ 2 = 7", highlight: true }] },
        ],
      },
      {
        description:
          "XOR with nums[3]=1: result = 7 ^ 1 = 6. The second 1 cancels the first! In binary: 111 ^ 001 = 110. The pair of 1s has been eliminated.",
        codeHighlightLines: [3, 4],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 1: "pointer-j", 3: "pointer-j" }, pointers: [{ index: 3, label: "num" }] },
          { type: "variables", entries: [{ name: "result", value: "7 ^ 1 = 6", highlight: true }] },
        ],
      },
      {
        description:
          "XOR with nums[4]=2: result = 6 ^ 2 = 4. The second 2 cancels the first! In binary: 110 ^ 010 = 100 = 4. Now only 4 remains.",
        codeHighlightLines: [3, 4],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 2: "pointer-j", 4: "pointer-j" }, pointers: [{ index: 4, label: "num" }] },
          { type: "variables", entries: [{ name: "result", value: "6 ^ 2 = 4", highlight: true }] },
        ],
      },
      {
        description:
          "Return 4. Both pairs (1,1) and (2,2) cancelled via XOR, leaving only 4 — the single number. Time: O(n) — one pass. Space: O(1) — just one variable. This is the most elegant solution: no extra data structures, no branching, just XOR.",
        codeHighlightLines: [5],
        structures: [
          { type: "array", label: "nums", values: [4, 1, 2, 1, 2], highlights: { 0: "success", 1: "checked", 2: "checked", 3: "checked", 4: "checked" } },
          { type: "variables", entries: [{ name: "return result", value: 4, highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;

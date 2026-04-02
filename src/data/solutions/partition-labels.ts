import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Greedy — Last Occurrence",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def partition_labels(s):
    last = {}
    for i, c in enumerate(s):
        last[c] = i
    result = []
    start = end = 0
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            result.append(end - start + 1)
            start = i + 1
    return result`,
  steps: [
    {
      description:
        "Partition \"ababcbacadefegdehijhklij\" so each letter appears in at most one part. First, record the last occurrence index of each character.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "s", values: ["a", "b", "a", "b", "c", "b", "a", "c", "a", "d", "e", "f", "e", "g", "d", "e", "h", "i", "j", "h", "k", "l", "i", "j"] },
        { type: "hashmap", label: "last occurrence", entries: [["a", 8], ["b", 5], ["c", 7], ["d", 14], ["e", 15], ["f", 11], ["g", 13], ["h", 19], ["i", 22], ["j", 23], ["k", 20], ["l", 21]] },
      ],
    },
    {
      description:
        "Scan left to right. start=0, end=0. At i=0, char 'a' last appears at 8, so end=8. We must include indices 0-8 in this partition. Keep expanding end as we encounter chars with later last occurrences.",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "array", label: "s[0..8]", values: ["a", "b", "a", "b", "c", "b", "a", "c", "a"], highlights: { 0: "pointer-i", 8: "pointer-j" } },
        { type: "variables", entries: [{ name: "start", value: 0 }, { name: "end", value: 8 }, { name: "last['a']", value: 8, highlight: true }] },
      ],
    },
    {
      description:
        "At i=8, i==end. First partition complete! Size = 8-0+1 = 9. Start new partition at 9. Scan 'defegde': d last at 14, e last at 15, f at 11, g at 13. end expands to 15. At i=15, i==end. Size = 15-9+1 = 7.",
      codeHighlightLines: [8, 9, 10, 11],
      structures: [
        { type: "array", label: "s", values: ["a", "b", "a", "b", "c", "b", "a", "c", "a", "d", "e", "f", "e", "g", "d", "e", "h", "i", "j", "h", "k", "l", "i", "j"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success", 9: "active", 10: "active", 11: "active", 12: "active", 13: "active", 14: "active", 15: "active" } },
        { type: "array", label: "result", values: [9, 7], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "start", value: 16 }, { name: "end", value: 15 }] },
      ],
    },
    {
      description:
        "Third partition starts at 16. 'hijhklij': h last at 19, i at 22, j at 23. end expands to 23. At i=23, i==end. Size = 23-16+1 = 8. Return [9, 7, 8]. O(n) time, O(1) space (26 letters max).",
      codeHighlightLines: [12],
      structures: [
        { type: "array", label: "s", values: ["a", "b", "a", "b", "c", "b", "a", "c", "a", "d", "e", "f", "e", "g", "d", "e", "h", "i", "j", "h", "k", "l", "i", "j"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success", 9: "checked", 10: "checked", 11: "checked", 12: "checked", 13: "checked", 14: "checked", 15: "checked", 16: "success", 17: "success", 18: "success", 19: "success", 20: "success", 21: "success", 22: "success", 23: "success" } },
        { type: "array", label: "result", values: [9, 7, 8], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[9, 7, 8]", highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

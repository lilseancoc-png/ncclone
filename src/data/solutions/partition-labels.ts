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
        "Partition string so each letter appears in at most one part. First pass: record the last occurrence index of each character. This tells us the minimum extent each partition must cover to contain all instances of any character it includes. s='ababcbacadefegdehijhklij'.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "s", values: ["a", "b", "a", "b", "c", "b", "a", "c", "a", "d", "e", "f", "e", "g", "d", "e", "h", "i", "j", "h", "k", "l", "i", "j"] },
        { type: "hashmap", label: "last occurrence", entries: [["a", 8], ["b", 5], ["c", 7], ["d", 14], ["e", 15], ["f", 11], ["g", 13], ["h", 19], ["i", 22], ["j", 23], ["k", 20], ["l", 21]] },
      ],
    },
    {
      description:
        "Second pass: scan left to right with start=0, end=0. i=0 char 'a': last['a']=8, end=max(0,8)=8. i=1 'b': last['b']=5, end stays 8. i=2 'a': 8, no change. i=3 'b': 5, no change. i=4 'c': last['c']=7, end stays 8. As we scan, end keeps expanding to cover all occurrences of seen characters.",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "array", label: "s[0..8]", values: ["a", "b", "a", "b", "c", "b", "a", "c", "a"], highlights: { 0: "pointer-i", 8: "pointer-j" } },
        { type: "variables", entries: [{ name: "start", value: 0 }, { name: "end", value: "8 (driven by last['a'])", highlight: true }, { name: "scanning", value: "chars a,b,c all end by index 8" }] },
      ],
    },
    {
      description:
        "Continue scanning to i=8: i==end! All characters in s[0..8] have their last occurrence within this range. First partition complete: size = 8-0+1 = 9. Set start=9. Begin second partition at 'd'. last['d']=14 → end=14. i=10 'e': last['e']=15 → end=15. i=11 'f': 11, no change. Scan to i=15: i==end. Second partition size = 15-9+1 = 7.",
      codeHighlightLines: [8, 9, 10, 11],
      structures: [
        { type: "array", label: "s", values: ["a", "b", "a", "b", "c", "b", "a", "c", "a", "d", "e", "f", "e", "g", "d", "e", "h", "i", "j", "h", "k", "l", "i", "j"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success", 9: "active", 10: "active", 11: "active", 12: "active", 13: "active", 14: "active", 15: "active" } },
        { type: "array", label: "result", values: [9, 7], highlights: { 0: "success", 1: "success" } },
        { type: "variables", entries: [{ name: "partition 1", value: "s[0..8] = 'ababcbaca'" }, { name: "partition 2", value: "s[9..15] = 'defegde'" }] },
      ],
    },
    {
      description:
        "Third partition starts at 16. i=16 'h': last['h']=19, end=19. i=17 'i': last['i']=22, end=22. i=18 'j': last['j']=23, end=23. i=19 'h': 19, no change. i=20 'k': 20, no change. i=21 'l': 21, no change. i=22 'i': 22, no change. i=23: i==end. Size = 23-16+1 = 8.",
      codeHighlightLines: [7, 8, 9, 10, 11],
      structures: [
        { type: "array", label: "s[16..23]", values: ["h", "i", "j", "h", "k", "l", "i", "j"], highlights: { 0: "active", 1: "active", 2: "active", 3: "active", 4: "active", 5: "active", 6: "active", 7: "active" } },
        { type: "variables", entries: [{ name: "end expansion", value: "h→19, i→22, j→23", highlight: true }, { name: "at i=23", value: "i == end → cut partition" }] },
      ],
    },
    {
      description:
        "Return [9, 7, 8]. Three partitions: 'ababcbaca' (9), 'defegde' (7), 'hijhklij' (8). Each character appears in exactly one partition. The greedy insight: end = max(end, last[c]) ensures we never cut a partition before all characters in it have had their last occurrence. O(n) time (two passes), O(1) space (26 chars max).",
      codeHighlightLines: [12],
      structures: [
        { type: "array", label: "s", values: ["a", "b", "a", "b", "c", "b", "a", "c", "a", "d", "e", "f", "e", "g", "d", "e", "h", "i", "j", "h", "k", "l", "i", "j"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success", 9: "checked", 10: "checked", 11: "checked", 12: "checked", 13: "checked", 14: "checked", 15: "checked", 16: "found", 17: "found", 18: "found", 19: "found", 20: "found", 21: "found", 22: "found", 23: "found" } },
        { type: "array", label: "result", values: [9, 7, 8], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: "[9, 7, 8]", highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;

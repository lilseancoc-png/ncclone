import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Backtracking",
    timeComplexity: "O(n * 2^n)",
    spaceComplexity: "O(n)",
    code: `def partition(s):
    result = []
    def backtrack(start, path):
        if start == len(s):
            result.append(path[:])
            return
        for end in range(start + 1, len(s) + 1):
            substring = s[start:end]
            if substring == substring[::-1]:
                path.append(substring)
                backtrack(end, path)
                path.pop()
    backtrack(0, [])
    return result`,
    steps: [
      {
        description:
          "Partition a string so every substring is a palindrome. Return ALL valid partitions. At each position, try every possible cut point. If the substring from current position to cut point is a palindrome, include it and recurse on the remainder. This is a decision tree: at position i, branch into cuts of length 1, 2, ..., n-i. s='aab'.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "string", values: ["a", "a", "b"], highlights: {} },
          { type: "variables", entries: [{ name: "goal", value: "every piece must be a palindrome" }, { name: "approach", value: "try all cuts, prune non-palindromes" }] },
        ],
      },
      {
        description:
          "start=0: Try cut of length 1 → 'a'. Palindrome? Yes (single char). path=['a'], recurse with start=1. At start=1: try cut of length 1 → 'a'. Palindrome? Yes. path=['a','a'], recurse with start=2. At start=2: try 'b'. Palindrome? Yes. path=['a','a','b'], recurse start=3. start=3 == len(s) → add ['a','a','b'] to result! First partition found.",
        codeHighlightLines: [4, 5, 6, 7, 8, 9, 10, 11],
        structures: [
          { type: "array", label: "string", values: ["a", "a", "b"], highlights: { 0: "active", 1: "active", 2: "active" } },
          { type: "variables", entries: [{ name: "path", value: "['a', 'a', 'b']", highlight: true }, { name: "cuts", value: "a | a | b (finest partition)" }] },
        ],
      },
      {
        description:
          "Backtrack to start=1, try longer cut: 'ab'. Is 'ab' a palindrome? 'ab' ≠ 'ba' → No! Skip this branch entirely. This pruning is powerful — we never recurse into paths with non-palindrome segments. Backtrack further to start=0, try cut of length 2 → 'aa'. Is 'aa' a palindrome? 'aa' == 'aa' → Yes! path=['aa'], recurse with start=2.",
        codeHighlightLines: [8, 9, 10, 11],
        structures: [
          { type: "array", label: "string", values: ["a", "a", "b"], highlights: { 0: "success", 1: "success" } },
          { type: "variables", entries: [{ name: "'ab' palindrome?", value: "No → pruned" }, { name: "'aa' palindrome?", value: "Yes → explore!", highlight: true }, { name: "path so far", value: "['aa']" }] },
        ],
      },
      {
        description:
          "At start=2 with path=['aa']: try 'b'. Palindrome? Yes. path=['aa','b']. start=3 == len(s) → add ['aa','b'] to result! Second partition found. Backtrack to start=0, try cut of length 3 → 'aab'. Is 'aab' a palindrome? 'aab' ≠ 'baa' → No! Skip. No more cuts to try from start=0. Backtracking complete.",
        codeHighlightLines: [4, 5, 6, 8, 9],
        structures: [
          { type: "array", label: "string", values: ["a", "a", "b"], highlights: { 0: "success", 1: "success", 2: "success" } },
          { type: "variables", entries: [{ name: "path", value: "['aa', 'b']", highlight: true }, { name: "'aab' palindrome?", value: "No → pruned" }, { name: "all from start=0", value: "lengths 1,2,3 tried" }] },
        ],
      },
      {
        description:
          "Result: [['a','a','b'], ['aa','b']]. The decision tree explored 3 branches from start=0 (lengths 1, 2, 3), pruned 'ab' and 'aab' as non-palindromes, and found 2 valid partitions. Time: O(n × 2^n) — up to 2^(n-1) partitions (each gap between characters is either cut or not), each taking O(n) to copy. Space: O(n) recursion depth. Can optimize palindrome checks with DP precomputation.",
        codeHighlightLines: [13, 14],
        structures: [
          { type: "variables", entries: [{ name: "return", value: "[['a','a','b'], ['aa','b']]", highlight: true }, { name: "partitions found", value: 2 }, { name: "branches pruned", value: "'ab', 'aab' (not palindromes)" }, { name: "Time", value: "O(n × 2^n)" }] },
        ],
      },
    ],
  },
];

export default solutions;

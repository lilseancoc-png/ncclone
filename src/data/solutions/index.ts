import type { SolutionData } from "../types";

type SolutionModule = { default: SolutionData | SolutionData[] };

const solutionLoaders: Record<string, () => Promise<SolutionModule>> = {
  // Arrays & Hashing
  "contains-duplicate": () => import("./contains-duplicate"),
  "two-sum": () => import("./two-sum"),
  "valid-anagram": () => import("./valid-anagram"),
  "group-anagrams": () => import("./group-anagrams"),
  "top-k-frequent-elements": () => import("./top-k-frequent-elements"),
  "product-of-array-except-self": () => import("./product-of-array-except-self"),
  "valid-sudoku": () => import("./valid-sudoku"),
  "encode-and-decode-strings": () => import("./encode-and-decode-strings"),
  "longest-consecutive-sequence": () => import("./longest-consecutive-sequence"),
  // Two Pointers
  "valid-palindrome": () => import("./valid-palindrome"),
  "two-sum-ii-input-array-is-sorted": () => import("./two-sum-ii-input-array-is-sorted"),
  "3sum": () => import("./3sum"),
  "container-with-most-water": () => import("./container-with-most-water"),
  // Sliding Window
  "best-time-to-buy-and-sell-stock": () => import("./best-time-to-buy-and-sell-stock"),
  "longest-substring-without-repeating-characters": () => import("./longest-substring-without-repeating-characters"),
  // Stack
  "valid-parentheses": () => import("./valid-parentheses"),
  "min-stack": () => import("./min-stack"),
  "evaluate-reverse-polish-notation": () => import("./evaluate-reverse-polish-notation"),
  "generate-parentheses": () => import("./generate-parentheses"),
  "daily-temperatures": () => import("./daily-temperatures"),
  // Binary Search
  "binary-search": () => import("./binary-search"),
  "search-a-2d-matrix": () => import("./search-a-2d-matrix"),
  "koko-eating-bananas": () => import("./koko-eating-bananas"),
  // Trees
  "invert-binary-tree": () => import("./invert-binary-tree"),
  "maximum-depth-of-binary-tree": () => import("./maximum-depth-of-binary-tree"),
  "same-tree": () => import("./same-tree"),
  "balanced-binary-tree": () => import("./balanced-binary-tree"),
  "binary-tree-level-order-traversal": () => import("./binary-tree-level-order-traversal"),
  "validate-binary-search-tree": () => import("./validate-binary-search-tree"),
  // Linked List
  "reverse-linked-list": () => import("./reverse-linked-list"),
  "merge-two-sorted-lists": () => import("./merge-two-sorted-lists"),
  "linked-list-cycle": () => import("./linked-list-cycle"),
  // Heap / Priority Queue
  "kth-largest-element-in-a-stream": () => import("./kth-largest-element-in-a-stream"),
  "last-stone-weight": () => import("./last-stone-weight"),
  // Graphs
  "number-of-islands": () => import("./number-of-islands"),
  // Greedy
  "maximum-subarray": () => import("./maximum-subarray"),
  "jump-game": () => import("./jump-game"),
  // Intervals
  "merge-intervals": () => import("./merge-intervals"),
  // Bit Manipulation
  "single-number": () => import("./single-number"),
  "missing-number": () => import("./missing-number"),
  // Backtracking
  "subsets": () => import("./subsets"),
  "combination-sum": () => import("./combination-sum"),
  "permutations": () => import("./permutations"),
  // 1-D Dynamic Programming
  "climbing-stairs": () => import("./climbing-stairs"),
  "house-robber": () => import("./house-robber"),
  "coin-change": () => import("./coin-change"),
  "word-break": () => import("./word-break"),
  "longest-increasing-subsequence": () => import("./longest-increasing-subsequence"),
  // 2-D Dynamic Programming
  "unique-paths": () => import("./unique-paths"),
  "longest-common-subsequence": () => import("./longest-common-subsequence"),
};

export async function loadSolutions(slug: string): Promise<SolutionData[]> {
  const loader = solutionLoaders[slug];
  if (!loader) return [];
  const mod = await loader();
  const data = mod.default;
  return Array.isArray(data) ? data : [data];
}

export function hasSolution(slug: string): boolean {
  return slug in solutionLoaders;
}

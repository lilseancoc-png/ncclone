import type { SolutionData } from "../types";

const solutionLoaders: Record<string, () => Promise<{ default: SolutionData }>> = {
  "contains-duplicate": () => import("./contains-duplicate"),
  "two-sum": () => import("./two-sum"),
  "valid-anagram": () => import("./valid-anagram"),
  "group-anagrams": () => import("./group-anagrams"),
  "top-k-frequent-elements": () => import("./top-k-frequent-elements"),
  "valid-palindrome": () => import("./valid-palindrome"),
  "valid-parentheses": () => import("./valid-parentheses"),
  "best-time-to-buy-and-sell-stock": () => import("./best-time-to-buy-and-sell-stock"),
  "binary-search": () => import("./binary-search"),
  "reverse-linked-list": () => import("./reverse-linked-list"),
  "product-of-array-except-self": () => import("./product-of-array-except-self"),
  "valid-sudoku": () => import("./valid-sudoku"),
  "longest-consecutive-sequence": () => import("./longest-consecutive-sequence"),
  "encode-and-decode-strings": () => import("./encode-and-decode-strings"),
};

export async function loadSolution(slug: string): Promise<SolutionData | null> {
  const loader = solutionLoaders[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

export function hasSolution(slug: string): boolean {
  return slug in solutionLoaders;
}

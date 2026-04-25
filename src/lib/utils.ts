import { Category, Difficulty, Problem } from "@/data/types";

const DIFFICULTY_RANK: Record<Difficulty, number> = {
  Easy: 0,
  Medium: 1,
  Hard: 2,
};

export function findProblemBySlug(categories: Category[], slug: string) {
  for (const category of categories) {
    const problem = category.problems.find((p) => p.slug === slug);
    if (problem) return { problem, category };
  }
  return null;
}

export function getTotalProblems(categories: Category[]) {
  return categories.reduce((sum, cat) => sum + cat.problems.length, 0);
}

export interface SimilarProblem {
  problem: Problem;
  category: Category;
  sharedPatterns: string[];
}

export function findSimilarProblems(
  categories: Category[],
  slug: string,
  limit = 3,
): SimilarProblem[] {
  const current = findProblemBySlug(categories, slug);
  if (!current) return [];
  const currentPatterns = new Set(current.problem.patterns ?? []);
  if (currentPatterns.size === 0) return [];

  const currentRank = DIFFICULTY_RANK[current.problem.difficulty];

  const scored: { entry: SimilarProblem; score: number }[] = [];
  for (const category of categories) {
    for (const problem of category.problems) {
      if (problem.slug === slug) continue;
      const patterns = problem.patterns ?? [];
      const shared = patterns.filter((p) => currentPatterns.has(p));
      if (shared.length === 0) continue;

      const diffGap = Math.abs(DIFFICULTY_RANK[problem.difficulty] - currentRank);
      const sameCategoryBonus = category.slug === current.category.slug ? 1 : 0;
      // Patterns dominate; difficulty proximity and same-category act as tiebreakers.
      const score =
        shared.length * 10 + (diffGap === 0 ? 3 : diffGap === 1 ? 1 : 0) + sameCategoryBonus;

      scored.push({
        entry: { problem, category, sharedPatterns: shared },
        score,
      });
    }
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    // Stable-ish secondary: lower id first (gives "classic" problems priority).
    return a.entry.problem.id - b.entry.problem.id;
  });

  return scored.slice(0, limit).map((s) => s.entry);
}

export function getAdjacentProblems(categories: Category[], slug: string) {
  for (const category of categories) {
    const idx = category.problems.findIndex((p) => p.slug === slug);
    if (idx === -1) continue;
    const prev = idx > 0 ? category.problems[idx - 1] : null;
    const next = idx < category.problems.length - 1 ? category.problems[idx + 1] : null;
    return { prev, next, position: idx + 1, total: category.problems.length };
  }
  return { prev: null, next: null, position: 0, total: 0 };
}

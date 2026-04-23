import { Category } from "@/data/types";

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

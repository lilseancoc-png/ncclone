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

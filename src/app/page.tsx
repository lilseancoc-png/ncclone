"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import CategorySection from "@/components/CategorySection";
import { categories } from "@/data/problems";
import { useProgress } from "@/hooks/useProgress";
import type { Difficulty } from "@/data/types";

type DifficultyFilter = Difficulty | "All";

export default function Home() {
  const router = useRouter();
  const { isCompleted } = useProgress();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");

  const goToRandomProblem = useCallback(() => {
    const allProblems = categories.flatMap((c) => c.problems);
    const unsolved = allProblems.filter((p) => !isCompleted(p.slug));
    const pool = unsolved.length > 0 ? unsolved : allProblems;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    router.push(`/problem/${pick.slug}`);
  }, [isCompleted, router]);

  const filteredCategories = useMemo(() => {
    const q = search.toLowerCase().trim();
    return categories
      .map((category) => {
        const filtered = category.problems.filter((p) => {
          if (difficulty !== "All" && p.difficulty !== difficulty) return false;
          if (q && !p.title.toLowerCase().includes(q) && !String(p.id).includes(q))
            return false;
          return true;
        });
        return { ...category, problems: filtered };
      })
      .filter((c) => c.problems.length > 0);
  }, [search, difficulty]);

  const hasFilters = search.length > 0 || difficulty !== "All";
  const filteredProblemCount = filteredCategories.reduce((sum, c) => sum + c.problems.length, 0);
  const totalProblems = categories.reduce((sum, c) => sum + c.problems.length, 0);

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 flex gap-2">
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search problems..."
                className="w-full pl-10 pr-9 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={goToRandomProblem}
              title="Random unsolved problem"
              className="px-3 py-2.5 bg-card border border-border rounded-lg text-gray-400 hover:text-foreground hover:border-gray-500 transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
            </button>
          </div>
          <div className="flex gap-1.5">
            {(["All", "Easy", "Medium", "Hard"] as DifficultyFilter[]).map(
              (d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors border flex-1 sm:flex-none ${
                    difficulty === d
                      ? d === "Easy"
                        ? "bg-easy/20 text-easy border-easy/40"
                        : d === "Medium"
                          ? "bg-medium/20 text-medium border-medium/40"
                          : d === "Hard"
                            ? "bg-hard/20 text-hard border-hard/40"
                            : "bg-card-hover text-foreground border-border"
                      : "bg-card text-gray-400 border-border hover:text-foreground hover:bg-card-hover"
                  }`}
                >
                  {d}
                </button>
              )
            )}
          </div>
        </div>

        {/* Result count when filtering */}
        {hasFilters && (
          <div className="text-xs text-gray-500 mb-3">
            Showing {filteredProblemCount} of {totalProblems} problems
            {hasFilters && (
              <button
                onClick={() => { setSearch(""); setDifficulty("All"); }}
                className="ml-2 text-gray-400 hover:text-foreground transition-colors underline underline-offset-2"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <CategorySection
              key={category.slug}
              category={category}
              defaultOpen={hasFilters}
            />
          ))}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No problems match your search.</p>
              <button
                onClick={() => { setSearch(""); setDifficulty("All"); }}
                className="mt-2 text-sm text-gray-400 hover:text-foreground transition-colors underline underline-offset-2"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

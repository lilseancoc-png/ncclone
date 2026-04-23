"use client";

import { useState } from "react";
import { Category } from "@/data/types";
import ProblemRow from "./ProblemRow";
import ProgressBar from "./ProgressBar";
import { useProgress } from "@/hooks/useProgress";

export default function CategorySection({
  category,
  defaultOpen = false,
}: {
  category: Category;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const { completedInCategory, mounted } = useProgress();
  const slugs = category.problems.map((p) => p.slug);
  const done = mounted ? completedInCategory(slugs) : 0;
  const total = category.problems.length;
  const easyCount = category.problems.filter((p) => p.difficulty === "Easy").length;
  const medCount = category.problems.filter((p) => p.difficulty === "Medium").length;
  const hardCount = category.problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-card-hover transition-colors text-left"
      >
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
            open ? "rotate-90" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="font-medium flex-1">{category.name}</span>
        <span className="hidden sm:flex items-center gap-1.5 text-[10px] mr-2">
          {easyCount > 0 && <span className="text-easy tabular-nums">{easyCount}E</span>}
          {medCount > 0 && <span className="text-medium tabular-nums">{medCount}M</span>}
          {hardCount > 0 && <span className="text-hard tabular-nums">{hardCount}H</span>}
        </span>
        {mounted ? (
          <span className="text-sm text-gray-400 tabular-nums">
            {done} / {total}
          </span>
        ) : (
          <span className="inline-block w-10 h-4 bg-gray-700 rounded animate-pulse" />
        )}
      </button>

      <div className="px-4 pb-1">
        <ProgressBar completed={done} total={total} />
      </div>

      {open && (
        <div className="border-t border-border divide-y divide-border/50">
          {category.problems.map((problem) => (
            <ProblemRow key={problem.slug} problem={problem} />
          ))}
        </div>
      )}
    </div>
  );
}

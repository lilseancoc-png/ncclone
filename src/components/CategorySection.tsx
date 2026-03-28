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
        <span className="text-sm text-gray-400">
          {mounted ? `${done} / ${total}` : `0 / ${total}`}
        </span>
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

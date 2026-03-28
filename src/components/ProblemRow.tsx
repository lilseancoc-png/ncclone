"use client";

import Link from "next/link";
import { Problem } from "@/data/types";
import DifficultyBadge from "./DifficultyBadge";
import { useProgress } from "@/hooks/useProgress";

export default function ProblemRow({ problem }: { problem: Problem }) {
  const { isCompleted, toggleCompleted, mounted } = useProgress();
  const done = mounted && isCompleted(problem.slug);

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-card-hover transition-colors group">
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleCompleted(problem.slug);
        }}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          done
            ? "bg-easy border-easy text-background"
            : "border-gray-500 hover:border-gray-300"
        }`}
        aria-label={done ? "Mark incomplete" : "Mark complete"}
      >
        {done && (
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>

      <Link
        href={`/problem/${problem.slug}`}
        className="flex-1 text-sm text-foreground/90 hover:text-foreground transition-colors"
      >
        {problem.id}. {problem.title}
      </Link>

      <DifficultyBadge difficulty={problem.difficulty} />

      <a
        href={problem.leetcodeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Open on LeetCode"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </div>
  );
}

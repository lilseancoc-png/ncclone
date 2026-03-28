"use client";

import { useProgress } from "@/hooks/useProgress";
import { getTotalProblems } from "@/lib/utils";
import { categories } from "@/data/problems";
import ProgressBar from "./ProgressBar";

export default function Header() {
  const { completedCount, mounted } = useProgress();
  const total = getTotalProblems(categories);

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Neetcode 150</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            {mounted ? completedCount : 0} / {total}
          </span>
          <div className="w-32">
            <ProgressBar
              completed={mounted ? completedCount : 0}
              total={total}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

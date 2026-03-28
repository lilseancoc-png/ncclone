"use client";

import { useEffect, useState } from "react";
import { SolutionData } from "@/data/types";
import AlgorithmVisualizer from "@/components/visualizer/AlgorithmVisualizer";
import { loadSolution } from "@/data/solutions";

export default function SolutionTab({ slug }: { slug: string }) {
  const [solution, setSolution] = useState<SolutionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadSolution(slug).then((data) => {
      setSolution(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
        <svg className="w-4 h-4 animate-spin mr-2" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Loading solution...
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500 text-sm">
        Solution walkthrough coming soon.
      </div>
    );
  }

  return <AlgorithmVisualizer solution={solution} />;
}

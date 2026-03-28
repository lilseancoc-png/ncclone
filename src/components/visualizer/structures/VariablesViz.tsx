"use client";

import { VariableVisualState } from "@/data/types";

export default function VariablesViz({ state }: { state: VariableVisualState }) {
  return (
    <div className="flex flex-wrap gap-2">
      {state.entries.map((entry) => (
        <div
          key={entry.name}
          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono transition-all duration-300 ${
            entry.highlight
              ? "bg-yellow-500/20 border border-yellow-400/50"
              : "bg-card border border-border/30"
          }`}
        >
          <span className="text-gray-400">{entry.name}:</span>
          <span className={entry.highlight ? "text-yellow-300" : "text-foreground/80"}>
            {String(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

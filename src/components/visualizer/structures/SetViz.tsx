"use client";

import { SetVisualState } from "@/data/types";

export default function SetViz({ state }: { state: SetVisualState }) {
  return (
    <div className="space-y-1.5">
      {state.label && (
        <div className="text-[11px] text-gray-400 font-mono">{state.label}</div>
      )}
      <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 rounded-lg border border-border/30 bg-[#151525]">
        {state.values.length === 0 && (
          <span className="text-[10px] text-gray-600 italic">empty</span>
        )}
        {state.values.map((val, i) => {
          const isLast = val === state.lastAdded;
          const isHighlighted = state.highlightValues?.includes(val);
          return (
            <span
              key={`${val}-${i}`}
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono transition-all duration-300 ${
                isHighlighted
                  ? "bg-red-500/30 border border-red-400 text-red-300"
                  : isLast
                  ? "bg-green-500/30 border border-green-400 text-green-300 animate-pulse"
                  : "bg-card border border-border/50 text-foreground/80"
              }`}
            >
              {String(val)}
            </span>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { ArrayVisualState } from "@/data/types";

const HIGHLIGHT_COLORS: Record<string, string> = {
  active: "bg-blue-500/30 border-blue-400",
  found: "bg-red-500/30 border-red-400",
  checked: "bg-yellow-500/20 border-yellow-400/60",
  success: "bg-green-500/30 border-green-400",
  "pointer-i": "bg-purple-500/30 border-purple-400",
  "pointer-j": "bg-cyan-500/30 border-cyan-400",
  default: "bg-card border-border/50",
};

export default function ArrayViz({ state }: { state: ArrayVisualState }) {
  return (
    <div className="space-y-1.5">
      {state.label && (
        <div className="text-[11px] text-gray-400 font-mono">{state.label}</div>
      )}
      <div className="flex flex-wrap gap-1">
        {state.values.map((val, i) => {
          const highlight = state.highlights?.[i];
          const colorClass = highlight
            ? HIGHLIGHT_COLORS[highlight] || HIGHLIGHT_COLORS.default
            : HIGHLIGHT_COLORS.default;
          return (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-md border text-xs font-mono font-medium transition-all duration-300 ${colorClass}`}
              >
                {String(val)}
              </div>
              {state.pointers?.some((p) => p.index === i) && (
                <div className="flex flex-col items-center">
                  <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[5px] border-transparent border-b-gray-400" />
                  {state.pointers
                    .filter((p) => p.index === i)
                    .map((p) => (
                      <span
                        key={p.label}
                        className="text-[9px] font-mono text-gray-400"
                      >
                        {p.label}
                      </span>
                    ))}
                </div>
              )}
              <span className="text-[9px] text-gray-600">{i}</span>
            </div>
          );
        })}
      </div>
      {state.caption && (
        <div className="text-[11px] text-gray-400">{state.caption}</div>
      )}
    </div>
  );
}

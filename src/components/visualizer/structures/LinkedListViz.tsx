"use client";

import { LinkedListVisualState } from "@/data/types";

const HIGHLIGHT_COLORS: Record<string, string> = {
  active: "bg-blue-500/30 border-blue-400",
  found: "bg-red-500/30 border-red-400",
  checked: "bg-yellow-500/20 border-yellow-400/60",
  success: "bg-green-500/30 border-green-400",
  "pointer-i": "bg-purple-500/30 border-purple-400",
  "pointer-j": "bg-cyan-500/30 border-cyan-400",
  default: "bg-card border-border/50",
};

export default function LinkedListViz({ state }: { state: LinkedListVisualState }) {
  return (
    <div className="space-y-1.5">
      {state.label && (
        <div className="text-[11px] text-gray-400 font-mono">{state.label}</div>
      )}
      <div className="flex flex-wrap items-center gap-0">
        {state.nodes.map((node, i) => {
          const colorClass = node.highlight
            ? HIGHLIGHT_COLORS[node.highlight] || HIGHLIGHT_COLORS.default
            : HIGHLIGHT_COLORS.default;
          const pointersHere = state.pointers?.filter((p) => p.index === i) || [];
          const isCycleTarget = state.cycleIndex === i;

          return (
            <div key={i} className="flex flex-col items-center">
              <div className="flex items-center">
                <div
                  className={`w-10 h-9 flex items-center justify-center rounded-md border text-xs font-mono font-medium transition-all duration-300 ${colorClass} ${isCycleTarget ? "ring-1 ring-red-400" : ""}`}
                >
                  {String(node.value)}
                </div>
                {i < state.nodes.length - 1 && (
                  <div className="flex items-center mx-0.5">
                    <div className="w-3 h-px bg-gray-500" />
                    <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-transparent border-l-gray-500" />
                  </div>
                )}
                {i === state.nodes.length - 1 && state.cycleIndex != null && (
                  <div className="flex items-center mx-0.5">
                    <div className="w-3 h-px bg-red-400" />
                    <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-transparent border-l-red-400" />
                    <span className="text-[8px] text-red-400 ml-0.5">↩{state.cycleIndex}</span>
                  </div>
                )}
              </div>
              {pointersHere.length > 0 && (
                <div className="flex flex-col items-center mt-0.5">
                  <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[5px] border-transparent border-b-gray-400" />
                  {pointersHere.map((p) => (
                    <span key={p.label} className="text-[9px] font-mono text-gray-400">
                      {p.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {!state.cycleIndex && state.nodes.length > 0 && (
          <div className="flex items-center mx-0.5">
            <div className="w-3 h-px bg-gray-500" />
            <span className="text-[9px] text-gray-500 font-mono">null</span>
          </div>
        )}
      </div>
    </div>
  );
}

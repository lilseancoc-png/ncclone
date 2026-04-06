"use client";

import { MatrixVisualState } from "@/data/types";

const HIGHLIGHT_COLORS: Record<string, string> = {
  active: "bg-blue-500/30 border-blue-400",
  found: "bg-red-500/30 border-red-400",
  checked: "bg-yellow-500/20 border-yellow-400/60",
  success: "bg-green-500/30 border-green-400",
  water: "bg-cyan-500/15 border-cyan-400/40",
  wall: "bg-gray-600/40 border-gray-500",
  path: "bg-purple-500/30 border-purple-400",
  rotten: "bg-orange-500/30 border-orange-400",
  fresh: "bg-green-500/15 border-green-400/40",
  default: "bg-card border-border/40",
};

export default function MatrixViz({ state }: { state: MatrixVisualState }) {
  const { rows } = state;
  if (!rows || rows.length === 0) return null;

  return (
    <div className="space-y-1.5">
      {state.label && (
        <div className="text-[11px] text-gray-400 font-mono">{state.label}</div>
      )}
      <div className="inline-block">
        {/* Column headers */}
        {state.colHeaders && (
          <div className="flex" style={{ paddingLeft: state.rowHeaders ? 28 : 0 }}>
            {state.colHeaders.map((h, i) => (
              <div
                key={i}
                className="w-9 h-4 flex items-center justify-center text-[9px] text-gray-500 font-mono"
              >
                {h}
              </div>
            ))}
          </div>
        )}
        {/* Rows */}
        {rows.map((row, r) => (
          <div key={r} className="flex items-center">
            {/* Row header */}
            {state.rowHeaders && (
              <div className="w-7 h-9 flex items-center justify-center text-[9px] text-gray-500 font-mono shrink-0">
                {state.rowHeaders[r]}
              </div>
            )}
            {/* Cells */}
            <div className="flex gap-[2px]">
              {row.map((cell, c) => {
                const colorClass = cell.highlight
                  ? HIGHLIGHT_COLORS[cell.highlight] || HIGHLIGHT_COLORS.default
                  : HIGHLIGHT_COLORS.default;
                return (
                  <div key={c} className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 flex items-center justify-center rounded border text-[11px] font-mono font-medium transition-all duration-300 ${colorClass}`}
                    >
                      {String(cell.value)}
                    </div>
                    {cell.label && (
                      <span className="text-[8px] font-mono text-gray-500 mt-0.5">
                        {cell.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

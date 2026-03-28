"use client";

import { HashMapVisualState } from "@/data/types";

export default function HashMapViz({ state }: { state: HashMapVisualState }) {
  return (
    <div className="space-y-1.5">
      {state.label && (
        <div className="text-[11px] text-gray-400 font-mono">{state.label}</div>
      )}
      <div className="rounded-lg border border-border/30 bg-[#151525] overflow-hidden">
        {state.entries.length === 0 ? (
          <div className="px-3 py-2 text-[10px] text-gray-600 italic">empty</div>
        ) : (
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-3 py-1 text-left text-[10px] text-gray-500 font-medium">Key</th>
                <th className="px-3 py-1 text-left text-[10px] text-gray-500 font-medium">Value</th>
              </tr>
            </thead>
            <tbody>
              {state.entries.map(([key, value], i) => {
                const isHighlighted = state.highlightKeys?.includes(key);
                return (
                  <tr
                    key={i}
                    className={`transition-all duration-300 ${
                      isHighlighted
                        ? "bg-yellow-500/15"
                        : i % 2 === 0
                        ? ""
                        : "bg-white/[0.02]"
                    }`}
                  >
                    <td
                      className={`px-3 py-1.5 ${
                        isHighlighted
                          ? "text-yellow-300 border-l-2 border-yellow-400"
                          : "text-foreground/80"
                      }`}
                    >
                      {String(key)}
                    </td>
                    <td className="px-3 py-1.5 text-foreground/60">{String(value)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

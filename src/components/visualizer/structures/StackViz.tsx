"use client";

import { StackVisualState } from "@/data/types";

export default function StackViz({ state }: { state: StackVisualState }) {
  return (
    <div className="space-y-1.5">
      {state.label && (
        <div className="text-[11px] text-gray-400 font-mono">{state.label}</div>
      )}
      <div className="inline-flex flex-col-reverse gap-0.5 min-h-[32px]">
        {state.values.length === 0 && (
          <span className="text-[10px] text-gray-600 italic px-2">empty</span>
        )}
        {state.values.map((val, i) => {
          const isTop = i === state.values.length - 1;
          const highlight = isTop && state.topHighlight;
          return (
            <div
              key={i}
              className={`w-16 h-8 flex items-center justify-center rounded border text-xs font-mono transition-all duration-300 ${
                highlight
                  ? "bg-green-500/30 border-green-400 text-green-300"
                  : "bg-card border-border/50 text-foreground/80"
              }`}
            >
              {String(val)}
              {isTop && (
                <span className="ml-1 text-[8px] text-gray-500">top</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
